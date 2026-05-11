import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NOTICE_IMAGE_SRC = '/elections/2027-primaries-notice.jpeg';
export const NOTICE_IMAGE_FILENAME = '2027-primaries-notice.jpeg';

export const PRIMARIES_NOTICE_DOCUMENT_TITLE =
  'Publication of the primaries for nomination of candidates for the 2027 elections — official SDP publication (National Secretariat)';

export const PRIMARIES_NOTICE_IMG_ALT =
  'Social Democratic Party official publication: Publication of the primaries for nomination of candidates for the 2027 elections. SDP logo and schedule table covering membership updates, digital register submission to INEC, presidential primaries at Tafawa Balewa Stadium Bauchi, governorship, Senate, House, and State Assembly primaries May 2026, time eleven a.m., guidelines and procedures, other information for members, and signatures of National Organising Secretary Barrister Joseph Achile Abu and National Secretary Dr Olu Agunloye with phone numbers.';

type Primaries2027PosterBlockProps = {
  /** Full route: sticky toolbar; home: inline toolbar matching homepage card */
  variant: 'page' | 'home';
};

export const Primaries2027PosterBlock: React.FC<Primaries2027PosterBlockProps> = ({ variant }) => {
  const handlePrint = () => window.print();
  const isPage = variant === 'page';

  return (
    <>
      <div
        className={cn(
          'print:hidden border-b border-gray-300/80 bg-[#eef0f3]/98 backdrop-blur-sm',
          isPage && 'sticky top-14 z-30',
          !isPage && 'rounded-t-2xl border border-b-0 border-slate-200/70 bg-[#eef0f3]/95'
        )}
      >
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
        className={cn(
          'sdp-primaries-notice-print-sheet primaries-notice-print-sheet mx-auto max-w-4xl',
          isPage ? 'px-4 py-6 sm:px-6 sm:py-10 print:max-w-none print:py-4 print:px-2' : 'px-3 py-4 sm:px-5 sm:py-6 print:max-w-none print:py-4 print:px-2'
        )}
      >
        <figure className="overflow-hidden rounded-sm border border-slate-200/90 bg-white shadow-sm print:border-0 print:shadow-none">
          <img
            className="sdp-primaries-notice-poster-img block w-full bg-white print:mx-auto print:max-h-[calc(297mm-10mm)] print:w-auto print:max-w-none"
            src={NOTICE_IMAGE_SRC}
            alt={PRIMARIES_NOTICE_IMG_ALT}
            decoding="async"
            fetchPriority={isPage ? 'high' : 'auto'}
            width={1200}
            height={1700}
          />
          <figcaption className="print:hidden border-t border-slate-100 px-4 py-3 text-center text-sm text-slate-600">
            Official notice — National Secretariat, Social Democratic Party (SDP), Nigeria
          </figcaption>
        </figure>
      </div>
    </>
  );
};
