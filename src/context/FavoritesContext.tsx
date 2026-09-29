import React, { createContext, useState, useContext, type ReactNode } from 'react';

export interface Serie {
  id: number;
  name: string;
  genres: string[];
  image?: {
    medium: string;
    original: string;
  };
  rating?: {
    average: number | null;
  };
  summary?: string;
}

interface FavoritesContextData {
  favorites: Serie[];
  addFavorite: (serie: Serie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Serie[]>([]);

  const addFavorite = (serie: Serie) => {
    setFavorites((prevFavorites) => {
      const alreadyExists = prevFavorites.some((item) => item.id === serie.id);
      if (alreadyExists) return prevFavorites;
      return [...prevFavorites, serie];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((serie) => serie.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((serie) => serie.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);