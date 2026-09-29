import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SerieDetalhes } from './pages/SerieDetalhes';
import { Favoritos } from './pages/Favoritos';
import './App.css';

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/serie/:id" element={<SerieDetalhes />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  );
};

export default App;