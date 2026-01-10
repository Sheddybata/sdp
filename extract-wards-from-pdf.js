// Script to extract wards, LGAs, and states from PDF and update the data file
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
// pdf-parse can be called directly as a function
const pdfParse = require('pdf-parse');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(__dirname, 'public', 'nigerian wards and lga.pdf');
const outputPath = path.join(__dirname, 'src', 'data', 'nigeria-locations.ts');

async function extractDataFromPDF() {
  try {
    console.log('Reading PDF file...');
    const dataBuffer = fs.readFileSync(pdfPath);
    
    // pdf-parse is callable directly
    const pdfData = await pdfParse(dataBuffer);
    
    console.log('PDF extracted. Total pages:', pdfData.numpages);
    console.log('Extracting text...');
    
    // Get the text content
    const text = pdfData.text;
    
    // Save extracted text to a file for inspection
    fs.writeFileSync('extracted-text.txt', text, 'utf8');
    console.log('Text extracted and saved to extracted-text.txt for inspection');
    
    // Try to parse the data
    // The structure will depend on how the PDF is formatted
    // Let's analyze the text structure first
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    console.log(`\nTotal lines extracted: ${lines.length}`);
    console.log('\nFirst 50 lines:');
    lines.slice(0, 50).forEach((line, i) => {
      console.log(`${i + 1}: ${line}`);
    });
    
    // Parse the data based on the structure
    // This will need to be adjusted based on the actual PDF format
    const parsedData = parsePDFText(lines);
    
    console.log(`\nParsed ${parsedData.states.length} states`);
    console.log(`Total LGAs: ${parsedData.totalLGAs}`);
    console.log(`Total Wards: ${parsedData.totalWards}`);
    
    // Update the TypeScript file
    updateLocationsFile(parsedData);
    
    console.log('\n✅ Data extraction complete!');
    console.log('Please review the extracted-text.txt file to verify the parsing is correct.');
    
  } catch (error) {
    console.error('Error extracting PDF:', error);
    throw error;
  }
}

function parsePDFText(lines) {
  const states = [];
  let currentState = null;
  let currentLGA = null;
  
  // This is a basic parser - will need adjustment based on actual PDF format
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Try to identify state names (usually in uppercase or have "STATE" suffix)
    if (isStateName(line)) {
      if (currentState) {
        states.push(currentState);
      }
      currentState = {
        name: normalizeStateName(line),
        lgas: []
      };
      currentLGA = null;
      continue;
    }
    
    // Try to identify LGA names
    if (isLGAName(line) && currentState) {
      if (currentLGA) {
        currentState.lgas.push(currentLGA);
      }
      currentLGA = {
        name: normalizeLGAName(line),
        wards: []
      };
      continue;
    }
    
    // Try to identify ward names
    if (isWardName(line) && currentLGA && currentState) {
      currentLGA.wards.push({
        name: normalizeWardName(line)
      });
      continue;
    }
    
    // If we have a current LGA but no wards yet, this might be a ward
    if (currentLGA && currentLGA.wards.length === 0 && line.length > 0) {
      // Try to parse as ward
      const wardName = normalizeWardName(line);
      if (wardName) {
        currentLGA.wards.push({ name: wardName });
      }
    }
  }
  
  // Add the last state
  if (currentState) {
    if (currentLGA) {
      currentState.lgas.push(currentLGA);
    }
    states.push(currentState);
  }
  
  // Calculate totals
  const totalLGAs = states.reduce((sum, state) => sum + state.lgas.length, 0);
  const totalWards = states.reduce((sum, state) => 
    sum + state.lgas.reduce((lgaSum, lga) => lgaSum + lga.wards.length, 0), 0
  );
  
  return {
    states,
    totalLGAs,
    totalWards
  };
}

function isStateName(line) {
  // Common patterns for state names in Nigerian administrative documents
  const statePatterns = [
    /^(ABIA|ADAMAWA|AKWA IBOM|ANAMBRA|BAUCHI|BAYELSA|BENUE|BORNO|CROSS RIVER|DELTA|EBONYI|EDO|EKITI|ENUGU|FCT|FEDERAL CAPITAL TERRITORY|GOMBE|IMO|JIGAWA|KADUNA|KANO|KATSINA|KEBBI|KOGI|KWARA|LAGOS|NASARAWA|NIGER|OGUN|ONDO|OSUN|OYO|PLATEAU|RIVERS|SOKOTO|TARABA|YOBE|ZAMFARA)\s*(STATE)?$/i,
    /^STATE:\s*(.+)$/i,
    /^(.+)\s+STATE$/i
  ];
  
  return statePatterns.some(pattern => pattern.test(line));
}

function isLGAName(line) {
  // LGA names are usually shorter and don't match state patterns
  // They might have "LGA" suffix or be in a specific format
  if (isStateName(line)) return false;
  
  // Common patterns
  const lgaPatterns = [
    /^LGA:\s*(.+)$/i,
    /^(.+)\s+LGA$/i,
    /^LOCAL GOVERNMENT:\s*(.+)$/i
  ];
  
  // If line is reasonably short and doesn't look like a ward, it might be an LGA
  if (line.length < 50 && !/ward|polling|unit/i.test(line)) {
    return true;
  }
  
  return lgaPatterns.some(pattern => pattern.test(line));
}

function isWardName(line) {
  // Ward names might have "WARD" prefix or be numbered
  const wardPatterns = [
    /^WARD\s*\d*[:\-]?\s*(.+)$/i,
    /^(.+)\s+WARD$/i,
    /^\d+\.\s*(.+)$/,
    /^Ward\s+\d+/i
  ];
  
  return wardPatterns.some(pattern => pattern.test(line));
}

function normalizeStateName(line) {
  // Remove common prefixes/suffixes
  return line
    .replace(/^STATE:\s*/i, '')
    .replace(/\s+STATE$/i, '')
    .trim();
}

function normalizeLGAName(line) {
  return line
    .replace(/^LGA:\s*/i, '')
    .replace(/\s+LGA$/i, '')
    .replace(/^LOCAL GOVERNMENT:\s*/i, '')
    .trim();
}

function normalizeWardName(line) {
  return line
    .replace(/^WARD\s*\d*[:\-]?\s*/i, '')
    .replace(/\s+WARD$/i, '')
    .replace(/^\d+\.\s*/, '')
    .trim();
}

function updateLocationsFile(parsedData) {
  // Read the current file structure
  let fileContent = fs.readFileSync(outputPath, 'utf8');
  
  // For now, just log what we found
  // The actual update will depend on the PDF structure
  console.log('\n📊 Parsed Data Summary:');
  parsedData.states.forEach(state => {
    console.log(`\n${state.name}: ${state.lgas.length} LGAs`);
    state.lgas.forEach(lga => {
      console.log(`  - ${lga.name}: ${lga.wards.length} wards`);
    });
  });
  
  // TODO: Generate the updated TypeScript file with actual data
  // This will be done after we verify the parsing is correct
}

// Run the extraction
extractDataFromPDF().catch(console.error);

