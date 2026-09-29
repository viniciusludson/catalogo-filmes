import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites, type Serie } from '../context/FavoritesContext';

export const SerieDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [serie, setSerie] = useState<Serie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSerieDetalhes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        
        if (!response.ok) {
          throw new Error('Série não encontrada.');
        }

        const data = await response.json();
        setSerie(data);
      } catch (err) {
        setError('Erro ao carregar detalhes da série.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSerieDetalhes();
    }
  }, [id]);

  if (loading) return <div className="loading">Carregando detalhes da série...</div>;
  if (error || !serie) return <div className="error">{error || 'Série não encontrada.'}</div>;

  const favoritado = isFavorite(serie.id);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn-back">
        &larr; Voltar
      </button>

      <div className="details-container">
        <img
          src={serie.image?.original || serie.image?.medium || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
          alt={serie.name}
          className="details-img"
        />

        <div className="details-info">
          <h1>{serie.name}</h1>
          <p><strong>Nota:</strong>  {serie.rating?.average ?? 'N/A'}</p>
          <p><strong>Gêneros:</strong> {serie.genres.join(', ') || 'N/A'}</p>

          <div className="summary">
            <h3>Resumo:</h3>
    
            <div dangerouslySetInnerHTML={{ __html: serie.summary || 'Sem resumo disponível.' }} />
          </div>

          <div className="actions">
            {favoritado ? (
              <button onClick={() => removeFavorite(serie.id)} className="btn-remove">
                Remover dos Favoritos
              </button>
            ) : (
              <button onClick={() => addFavorite(serie)} className="btn-add">
                Adicionar aos Favoritos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};