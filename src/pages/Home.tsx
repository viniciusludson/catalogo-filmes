import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Serie } from '../context/FavoritesContext';

export const Home: React.FC = () => {
  const [series, setSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.tvmaze.com/shows');
        if (!response.ok) {
          throw new Error('Falha ao buscar séries.');
        }
        const data = await response.json();
        setSeries(data);
      } catch (err) {
        setError('Ocorreu um erro ao carregar as séries.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) return <div className="loading">Carregando séries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Séries em Destaque</h1>
      <div className="grid">
        {series.map((serie) => (
          <div key={serie.id} className="card">
            <img
              src={serie.image?.medium || 'https://via.placeholder.com/210x295?text=Sem+Imagem'}
              alt={serie.name}
            />
            <h3>{serie.name}</h3>
            <p><strong>Gêneros:</strong> {serie.genres.join(', ') || 'N/A'}</p>
            <Link to={`/serie/${serie.id}`} className="btn-details">
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};