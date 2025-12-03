
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import WhoWeAre from "./pages/WhoWeAre";
import OurStand from "./pages/OurStand";
import EMembership from "./pages/EMembership";
import ElectionCenter from "./pages/ElectionCenter";
import MediaRoom from "./pages/MediaRoom";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollIndicator from "./components/ScrollIndicator";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/who-we-are" element={<WhoWeAre />} />
              <Route path="/our-stand" element={<OurStand />} />
              <Route path="/e-membership" element={<EMembership />} />
              <Route path="/election-center" element={<ElectionCenter />} />
              <Route path="/media-room" element={<MediaRoom />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
