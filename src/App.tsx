import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import QuoteCalculator from './pages/QuoteCalculator';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
export default function App(){return <BrowserRouter><ScrollToTop/><Routes>
<Route path="/" element={<Index/>}/><Route path="/quote" element={<QuoteCalculator/>}/>
<Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<ServiceDetail/>}/>
<Route path="*" element={<NotFound/>}/></Routes></BrowserRouter>}
