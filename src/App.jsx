import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import TheHouse from '@/pages/TheHouse';
import Experiences from '@/pages/Experiences';
import TastingRoom from '@/pages/TastingRoom';
import Library from '@/pages/Library';
import Contact from '@/pages/Contact';
// Add page imports here

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/the-house" element={<TheHouse />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/tasting-room" element={<TastingRoom />} />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
