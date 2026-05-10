import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

/** Official flyer from National Secretariat (public/elections/…). Option A — image-first page & download. */
const NOTICE_IMAGE_SRC = '/elections/2027-primaries-notice.jpeg';
const NOTICE_IMAGE_FILENAME = '2027-primaries-notice.jpeg';

const DOCUMENT_TITLE =
  'Publication of the primaries for nomination of candidates for the 2027 elections — official SDP publication (National Secretariat)';

const IMG_ALT =
  'Social Democratic Party official publication: Publication of the primaries for nomination of candidates for the 2027 elections. SDP logo and schedule table covering membership updates, digital register submission to INEC, presidential primaries at Tafawa Balewa Stadium Bauchi, governorship, Senate, House, and State Assembly primaries May 2026, time eleven a.m., guidelines and procedures, other information for members, and signatures of National Organising Secretary Barrister Joseph Achile Abu and National Secretary Dr Olu Agunloye with phone numbers.';

const Primaries2027Notice: React.FC = () => {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-[#eef0f3] print:min-h-0 print:bg-white">
      <div className="print:hidden">
        <Navbar onDonateClick={() => {}} activeSection="" setActiveSection={() => {}} />
      </div>

      <div className="print:hidden">
        <Breadcrumbs
          customItems={[
            { label: 'Election Center', path: '/election-center' },
            { label: '2027 Primaries Notice', path: '/elections/2027-primaries' },
          ]}
        />
      </div>

      <main id="sdp-primaries-2027-notice" className="pb-16 print:bg-white print:pb-0">
        <h1 className="sr-only print:hidden">{DOCUMENT_TITLE}</h1>

        <div className="print:hidden sticky top-14 z-30 border-b border-gray-300/80 bg-[#eef0f3]/98 backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6">
            <p className="text-center text-xs text-gray-600 sm:flex-1 sm:text-left">
              Official publication provided by National Secretariat — download the file or save as PDF.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              <Button type="button" variant="outline" size="sm" asChild className="border-slate-600 text-slate-800 hover:bg-slate-100">
                <a href={NOTICE_IMAGE_SRC} download={NOTICE_IMAGE_FILENAME}>
                  <Download className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                  Download JPEG
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-800 hover:bg-slate-100"
                onClick={handlePrint}
              >
                <Printer className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                Print / Save as PDF
              </Button>
            </div>
          </div>
        </div>

        <div
          id="sdp-primaries-notice-print-sheet"
          className="primaries-notice-print-sheet mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10 print:max-w-none print:py-4 print:px-2"
        >
          <figure className="overflow-hidden rounded-sm border border-slate-200/90 bg-white shadow-sm print:border-0 print:shadow-none">
            <img
              id="sdp-primaries-notice-poster-img"
              src={NOTICE_IMAGE_SRC}
              alt={IMG_ALT}
              className="block w-full bg-white print:mx-auto print:max-h-[calc(297mm-10mm)] print:w-auto print:max-w-none"
              decoding="async"
              fetchPriority="high"
              width={1200}
              height={1700}
            />
            <figcaption className="print:hidden border-t border-slate-100 px-4 py-3 text-center text-sm text-slate-600">
              Official notice — National Secretariat, Social Democratic Party (SDP), Nigeria
            </figcaption>
          </figure>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Primaries2027Notice;
