// Script to extract wards, LGAs, and states from PDF and generate JSON for the app.
// CommonJS runner (easier to execute via `node extract-wards-from-pdf.cjs`).
const fs = require('fs');
const path = require('path');

const { PDFParse } = require('pdf-parse');

const pdfPath = path.join(__dirname, 'public', 'nigerian wards and lga.pdf');
const outputJsonPath = path.join(__dirname, 'public', 'nigeria-wards.json');

async function extractDataFromPDF() {
  try {
    console.log('Reading PDF file...');
    const dataBuffer = fs.readFileSync(pdfPath);

    console.log('Parsing PDF text...');
    const parser = new PDFParse({ data: dataBuffer });
    const textResult = await parser.getText();
    await parser.destroy();

    const text = textResult.text || '';
    fs.writeFileSync('extracted-text.txt', text, 'utf8');
    console.log('Text extracted and saved to extracted-text.txt for inspection');

    const lines = text
      .split('\n')
      .map(l => l.replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    console.log(`\nTotal lines extracted: ${lines.length}`);
    console.log('\nFirst 80 lines:');
    lines.slice(0, 80).forEach((line, i) => {
      console.log(`${i + 1}: ${line.substring(0, 120)}`);
    });

    const parsedData = parsePDFText(lines);

    console.log(`\n✅ Parsed ${Object.keys(parsedData.byState).length} states`);
    console.log(`✅ Total LGAs with wards: ${parsedData.totalLGAs}`);
    console.log(`✅ Total Wards: ${parsedData.totalWards}`);

    fs.writeFileSync(outputJsonPath, JSON.stringify(parsedData.byState, null, 2), 'utf8');
    console.log(`\n✅ Wards JSON written to ${outputJsonPath}`);

  } catch (error) {
    console.error('Error extracting PDF:', error);
    throw error;
  }
}

function parsePDFText(lines) {
  // Output: byState[STATE_KEY][LGA_KEY] = [WARD_NAME...]
  const byState = Object.create(null);

  // The PDF begins with Abia LGAs without an explicit "ABIA STATE" header,
  // so we default to ABIA until we encounter the first "{STATE} STATE" marker.
  let currentStateKey = 'ABIA';
  let currentLgaKey = null;
  let pendingLgaNameParts = [];
  let currentMode = 'basic'; // 'basic' (no PU count) | 'pu' (includes NO OF PU column)
  let prevWasPageBreak = true;
  let prevWasFooter = false;
  let pendingWardNameParts = [];
  let pendingPuCount = null;

  const ensureState = (stateKey) => {
    if (!byState[stateKey]) byState[stateKey] = Object.create(null);
  };

  const startLga = (lgaKey) => {
    if (!lgaKey) return;
    ensureState(currentStateKey);
    currentLgaKey = lgaKey;
    if (!byState[currentStateKey][currentLgaKey]) byState[currentStateKey][currentLgaKey] = [];
  };

  const addWard = (wardName) => {
    if (!currentStateKey || !currentLgaKey || !wardName) return;
    byState[currentStateKey][currentLgaKey].push(wardName);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = (lines[i] || '').trim();
    if (!line) continue;

    if (isFooterLine(line)) {
      prevWasFooter = true;
      prevWasPageBreak = true;
      continue;
    }

    // Digits-only lines can be: page numbers, ward codes (often on their own line), or PU counts.
    if (/^\d+$/.test(line)) {
      // If we're in the middle of assembling a wrapped ward name, interpret this as either PU count or ward code.
      if (currentMode === 'basic' && pendingWardNameParts.length > 0 && /^\d{2}$/.test(line)) {
        addWard(normalizeName(pendingWardNameParts.join(' ')));
        pendingWardNameParts = [];
        prevWasPageBreak = false;
        continue;
      }

      if (currentMode === 'pu' && pendingWardNameParts.length > 0) {
        if (pendingPuCount == null && /^\d{1,3}$/.test(line) && !/^\d{2}$/.test(line)) {
          pendingPuCount = line;
          prevWasPageBreak = false;
          continue;
        }
        if (pendingPuCount == null && /^\d{1,3}$/.test(line)) {
          // Ambiguous (2 digits). Treat it as PU count first; ward code will come next.
          pendingPuCount = line;
          prevWasPageBreak = false;
          continue;
        }
        if (pendingPuCount != null && /^\d{2}$/.test(line)) {
          addWard(normalizeName(pendingWardNameParts.join(' ')));
          pendingWardNameParts = [];
          pendingPuCount = null;
          prevWasPageBreak = false;
          continue;
        }
      }

      // Page-number detection
      const nextLooksLikeStateHeader = lookAheadHasStateHeaderContext(lines, i);
      if (prevWasFooter || nextLooksLikeStateHeader) {
        prevWasFooter = false;
        prevWasPageBreak = true;
        continue;
      }

      // Otherwise, ignore stray numeric lines.
      prevWasPageBreak = false;
      continue;
    }

    const mode = detectModeOrNull(line);
    if (mode) {
      currentMode = mode;
      continue;
    }

    if (isSkippableLine(line)) continue;

    const allowBareStateName = prevWasPageBreak || lookAheadHasStateHeaderContext(lines, i);
    const stateKey = normalizeStateHeaderToKey(line, allowBareStateName);
    if (stateKey) {
      currentStateKey = stateKey;
      currentLgaKey = null;
      pendingLgaNameParts = [];
      currentMode = 'basic';
      pendingWardNameParts = [];
      pendingPuCount = null;
      ensureState(currentStateKey);
      prevWasPageBreak = false;
      continue;
    }

    // If we're currently collecting a wrapped ward name, append only if this line doesn't look like a new row start.
    if (pendingWardNameParts.length > 0) {
      const looksLikeNewRow = /\d{2}$/.test(line) || /\b\d{2}\b/.test(line);
      if (!looksLikeNewRow) {
        pendingWardNameParts.push(line);
        // Wrapped ward names are usually at most 2 extra lines; cap to avoid runaway buffering.
        if (pendingWardNameParts.length > 3) {
          pendingWardNameParts = [];
          pendingPuCount = null;
        } else {
          prevWasPageBreak = false;
          continue;
        }
      } else {
        // Abort the wrap if we encounter something that likely starts a new row.
        pendingWardNameParts = [];
        pendingPuCount = null;
      }
    }

    const tokens = line.split(' ').filter(Boolean);

    // Ward code is always the last token and is usually 2 digits.
    const last = tokens[tokens.length - 1];
    const hasWardCode = /^\d{2}$/.test(last);

    if (currentMode === 'pu') {
      if (!hasWardCode) {
        // Wrapped ward name (no code on this line); treat as start of a wrapped ward row under current LGA
        if (currentLgaKey) {
          pendingWardNameParts = [line];
          pendingPuCount = null;
        } else if (looksLikeLgaNameFragment(line)) {
          pendingLgaNameParts = pushPending(pendingLgaNameParts, line);
        }
        prevWasPageBreak = false;
        continue;
      }

      // PU-mode patterns (Plateau and possibly other states):
      // - LGA row:  "LGA NAME <LGA_CODE> WARD NAME <PU_COUNT> <WARD_CODE>"
      // - Ward row: "WARD NAME <PU_COUNT> <WARD_CODE>"
      const puToken = tokens[tokens.length - 2];
      const puIsNumber = /^\d{1,3}$/.test(puToken);

      // Identify a likely LGA code: the first 2-digit token that appears before PU/ward-code tail.
      // Example: "BARKIN LADI 01 BARKIN LADI 15 01" => lgaCodeIdx=2
      const lgaCodeIdx = findFirstTwoDigitTokenIdx(tokens, 0, Math.max(0, tokens.length - 2));

      // If we have a current LGA already and line looks like a ward-only row (no LGA code, just PU + ward code)
      if (currentLgaKey && puIsNumber && (lgaCodeIdx === -1 || lgaCodeIdx >= tokens.length - 2)) {
        const wardName = tokens.slice(0, -2).join(' ').trim();
        addWard(normalizeName(wardName));
        prevWasPageBreak = false;
        continue;
      }

      // LGA row (including split LGA name where row starts with code)
      if (puIsNumber && lgaCodeIdx !== -1 && lgaCodeIdx < tokens.length - 2) {
        if (lgaCodeIdx === 0) {
          const lgaNameFromParts = pendingLgaNameParts.join(' ').trim();
          pendingLgaNameParts = [];
          const wardName = tokens.slice(1, -2).join(' ').trim();
          if (lgaNameFromParts) startLga(normalizeName(lgaNameFromParts));
          addWard(normalizeName(wardName));
          prevWasPageBreak = false;
          continue;
        }

        const lgaName = tokens.slice(0, lgaCodeIdx).join(' ').trim();
        const wardName = tokens.slice(lgaCodeIdx + 1, -2).join(' ').trim();
        if (lgaName) startLga(normalizeName(lgaName));
        addWard(normalizeName(wardName));
        pendingLgaNameParts = [];
        prevWasPageBreak = false;
        continue;
      }

      // Fall back: treat as LGA fragment (some pages have broken headers)
      if (looksLikeLgaNameFragment(line)) pendingLgaNameParts = pushPending(pendingLgaNameParts, line);
      prevWasPageBreak = false;
      continue;
    }

    // Basic mode patterns:
    // - LGA row:  "LGA NAME <LGA_CODE> WARD NAME <WARD_CODE>"
    // - Split LGA: "<LGA_CODE> WARD NAME <WARD_CODE>" (LGA name split above)
    // - Ward row: "WARD NAME <WARD_CODE>"

    if (!hasWardCode) {
      // Wrapped ward name or wrapped LGA+ward row (like "APAPA 05 APAPA I (MARINE ROAD" then ward code appears on its own line)
      const lgaCodeIdx = findFirstTwoDigitTokenIdx(tokens, 0, tokens.length);
      if (lgaCodeIdx !== -1) {
        if (lgaCodeIdx === 0) {
          const lgaNameFromParts = pendingLgaNameParts.join(' ').trim();
          pendingLgaNameParts = [];
          if (lgaNameFromParts) startLga(normalizeName(lgaNameFromParts));
          const wardNameStart = tokens.slice(1).join(' ').trim();
          if (wardNameStart) pendingWardNameParts = [wardNameStart];
        } else {
          const lgaName = tokens.slice(0, lgaCodeIdx).join(' ').trim();
          if (lgaName) startLga(normalizeName(lgaName));
          const wardNameStart = tokens.slice(lgaCodeIdx + 1).join(' ').trim();
          if (wardNameStart) pendingWardNameParts = [wardNameStart];
        }
      } else if (currentLgaKey) {
        pendingWardNameParts = [line];
      } else if (looksLikeLgaNameFragment(line)) {
        pendingLgaNameParts = pushPending(pendingLgaNameParts, line);
      }
      prevWasPageBreak = false;
      continue;
    }

    const twoDigitIdx = [];
    for (let i = 0; i < tokens.length; i++) {
      if (/^\d{2}$/.test(tokens[i])) twoDigitIdx.push(i);
    }

    // Ward-only line
    if (twoDigitIdx.length === 1 && twoDigitIdx[0] === tokens.length - 1) {
      const wardName = tokens.slice(0, -1).join(' ').trim();
      addWard(normalizeName(wardName));
      prevWasPageBreak = false;
      continue;
    }

    // LGA row with LGA code + ward code at end
    if (twoDigitIdx.length >= 2 && twoDigitIdx[twoDigitIdx.length - 1] === tokens.length - 1) {
      const lgaCodeIdx = twoDigitIdx[0];
      const wardCodeIdx = twoDigitIdx[twoDigitIdx.length - 1];

      // Split LGA row (starts with LGA code)
      if (lgaCodeIdx === 0) {
        const lgaNameFromParts = pendingLgaNameParts.join(' ').trim();
        pendingLgaNameParts = [];
        const wardName = tokens.slice(1, wardCodeIdx).join(' ').trim();
        if (lgaNameFromParts) startLga(normalizeName(lgaNameFromParts));
        addWard(normalizeName(wardName));
        prevWasPageBreak = false;
        continue;
      }

      const lgaName = tokens.slice(0, lgaCodeIdx).join(' ').trim();
      const wardName = tokens.slice(lgaCodeIdx + 1, wardCodeIdx).join(' ').trim();
      if (lgaName) startLga(normalizeName(lgaName));
      addWard(normalizeName(wardName));
      pendingLgaNameParts = [];
      prevWasPageBreak = false;
      continue;
    }

    if (looksLikeLgaNameFragment(line)) pendingLgaNameParts = pushPending(pendingLgaNameParts, line);
    prevWasPageBreak = false;
  }

  // Cleanup: drop empty LGAs and de-dupe wards
  for (const stateKey of Object.keys(byState)) {
    const lgas = byState[stateKey];
    for (const lgaKey of Object.keys(lgas)) {
      const wards = Array.isArray(lgas[lgaKey]) ? lgas[lgaKey] : [];
      const cleaned = Array.from(new Set(wards.filter(Boolean)));
      if (cleaned.length === 0) delete lgas[lgaKey];
      else lgas[lgaKey] = cleaned;
    }
  }

  const totalLGAs = Object.values(byState).reduce((sum, lgas) => sum + Object.keys(lgas).length, 0);
  const totalWards = Object.values(byState).reduce(
    (sum, lgas) => sum + Object.values(lgas).reduce((s2, wards) => s2 + (wards ? wards.length : 0), 0),
    0
  );

  return { byState, totalLGAs, totalWards };
}

function detectModeOrNull(line) {
  const u = line.toUpperCase().replace(/\s+/g, ' ').trim();
  // Plateau-style header often includes "NO OF PU"
  if (u === 'PU' || u === 'NO OF PU' || u.includes('NO OF PU')) return 'pu';
  return null;
}

function isFooterLine(line) {
  const u = line.toUpperCase().trim();
  if (/^--\s*\d+\s+OF\s+\d+\s*--$/.test(u)) return true;
  return false;
}

function lookAheadHasStateHeaderContext(lines, idx) {
  // Some state headers in this PDF are bare (e.g., "LAGOS") and are NOT preceded by a page number.
  // They *are* typically followed immediately by table headers like "LGA NAME", "LGA", "CODE", etc.
  // We use a short lookahead window to confirm it's a real state header.
  const window = 8;
  for (let j = idx + 1; j <= Math.min(lines.length - 1, idx + window); j++) {
    const u = String(lines[j] || '').toUpperCase().replace(/\s+/g, ' ').trim();
    if (!u) continue;
    if (u.startsWith('LGA NAME')) return true;
    // If we hit a data-looking row before header, bail out.
    if (/\d{2}$/.test(u) && u.split(' ').length > 2) return false;
  }
  return false;
}

function findFirstTwoDigitTokenIdx(tokens, startIdx, endExclusive) {
  for (let i = startIdx; i < endExclusive; i++) {
    if (/^\d{2}$/.test(tokens[i])) return i;
  }
  return -1;
}

function normalizeName(s) {
  return (s || '').replace(/\s+/g, ' ').trim();
}

function pushPending(pending, part) {
  const next = pending.concat([part]);
  // Avoid unbounded concatenation from broken layouts: keep only the last 3 fragments.
  if (next.length > 3) return next.slice(-3);
  return next;
}

function normalizeStateHeaderToKey(line, allowBareStateName) {
  const cleaned = line.replace(/\s+/g, ' ').trim();

  // Most states show up as "<STATE> STATE" headers.
  const m = cleaned.match(/^([A-Z][A-Z\s]+?)\s+STATE$/);
  if (m) return m[1].trim().toUpperCase();

  // Some documents use this for Abuja.
  if (cleaned.toUpperCase() === 'FEDERAL CAPITAL TERRITORY' || cleaned.toUpperCase() === 'FCT') return 'FCT';

  // In this PDF, some state headers appear without the "STATE" suffix (e.g., "CROSS RIVER").
  if (!allowBareStateName) return null;

  const knownStates = new Set([
    'ABIA','ADAMAWA','AKWA IBOM','ANAMBRA','BAUCHI','BAYELSA','BENUE','BORNO','CROSS RIVER','DELTA','EBONYI','EDO','EKITI','ENUGU',
    'GOMBE','IMO','JIGAWA','KADUNA','KANO','KATSINA','KEBBI','KOGI','KWARA','LAGOS','NASARAWA','NIGER','OGUN','ONDO','OSUN','OYO',
    'PLATEAU','RIVERS','SOKOTO','TARABA','YOBE','ZAMFARA','FCT'
  ]);
  const u = cleaned.toUpperCase();
  if (knownStates.has(u)) return u === 'FCT' ? 'FCT' : u;

  return null;
}

function isSkippableLine(line) {
  const u = line.toUpperCase();
  if (/^--\s*\d+\s+OF\s+\d+\s*--$/.test(u)) return true; // page footer like "-- 1 of 230 --"
  if (/^\d+$/.test(u)) return true; // page number
  if (u === 'LGA NAME LGA' || u === 'LGA NAME') return true;
  if (u === 'CODE') return true;
  if (u === 'WARD NAME WARD' || u === 'WARD NAME' || u === 'WARD') return true;
  if (u === 'NO' || u === 'OF' || u === 'PU') return true;
  if (u === 'WARD NAME NO') return true;
  if (u === 'OF PU') return true;
  if (u === 'OF PU WARD CODE') return true;
  return false;
}

function looksLikeLgaNameFragment(line) {
  // Many LGA names are split across lines in the PDF text extraction, e.g. "ISIALA NGWA" + "NORTH".
  // We treat short ALL-CAPS fragments as LGA name parts.
  if (!/^[A-Z0-9\s'’\/\-\(\)\.]+$/.test(line)) return false;
  if (line.length > 40) return false;
  // Avoid accidentally treating ward lines (which usually end with a 2-digit code) as LGA fragments.
  if (/\s\d{2}$/.test(line)) return false;
  return true;
}

// Note: we no longer try to rewrite the TS source file in-place.
// Instead we generate `public/nigeria-wards.json` and load it client-side.

// Run the extraction
extractDataFromPDF().catch(console.error);

