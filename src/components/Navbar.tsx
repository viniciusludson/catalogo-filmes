import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export const Navbar: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <h2>Catálogo de Séries</h2>
      <div className="nav-links">
        <Link to="/">Séries</Link>
        <Link to="/favoritos">
          Favoritos <span>({favorites.length})</span>
        </Link>
      </div>
    </nav>
  );
};