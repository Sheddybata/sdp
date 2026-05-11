import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  PRIMARIES_NOTICE_DOCUMENT_TITLE,
  Primaries2027PosterBlock,
} from '@/components/Primaries2027PosterBlock';

const Primaries2027Notice: React.FC = () => (
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

    <main id="sdp-primaries-2027-notice" className="sdp-primaries-notice-print-scope pb-16 print:bg-white print:pb-0">
      <h1 className="sr-only print:hidden">{PRIMARIES_NOTICE_DOCUMENT_TITLE}</h1>
      <Primaries2027PosterBlock variant="page" />
    </main>

    <div className="print:hidden">
      <Footer />
    </div>
  </div>
);

export default Primaries2027Notice;
