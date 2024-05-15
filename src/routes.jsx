import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from './pages/Home';
import TabelaAmazon from "./pages/Amazon/TabelaAmazon";
import CardAmazon from './pages/Amazon/CardAmazon';
import TabelaFifa from "./pages/FIFA/TabelaFifa";
import CardFifa from "./pages/FIFA/CardFifa";
import TabelaNetflix from "./pages/Netflix/TabelaNetflix";
import CardNetflix from "./pages/Netflix/CardNetflix";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tabela/amazon" element={<TabelaAmazon />} />
                <Route path="/tabela/fifa" element={<TabelaFifa />} />
                <Route path="/tabela/netflix" element={<TabelaNetflix />} />
                {<Route path="/card/amazon" element={<CardAmazon />} /> }
                {<Route path="/card/fifa" element={<CardFifa />} />}
                {<Route path="/card/netflix" element={<CardNetflix />} /> }
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}