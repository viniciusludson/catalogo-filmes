import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export const Favoritos: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container">
        <h1>Minhas Séries Favoritas</h1>
        <p>Você ainda não adicionou nenhuma série aos favoritos.</p>
        <Link to="/" className="btn-details">
          Explorar Séries
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Minhas Séries Favoritas ({favorites.length})</h1>
      <div className="grid">
        {favorites.map((serie) => (
          <div key={serie.id} className="card">
            <img
              src={serie.image?.medium || 'https://via.placeholder.com/210x295?text=Sem+Imagem'}
              alt={serie.name}
            />
            <h3>{serie.name}</h3>
            <p><strong>Gêneros:</strong> {serie.genres.join(', ') || 'N/A'}</p>
            <div className="card-actions">
              <Link to={`/serie/${serie.id}`} className="btn-details">
                Ver detalhes
              </Link>
              <button onClick={() => removeFavorite(serie.id)} className="btn-remove">
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};