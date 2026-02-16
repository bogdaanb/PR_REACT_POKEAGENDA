import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import PokemonGrid from './components/PokemonGrid.jsx';
import Feedback from './components/Feedback.jsx';
import { fetchPokemonList } from './services/pokeapi.js';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('pokeagenda-query') || '';
  });
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pokeagenda-theme') || 'light';
  });

  // useEffect para aplicar el tema al document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pokeagenda-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };


  useEffect(() => {
    async function loadPokemons() {
      try {
        setStatus('loading');
        setError(null);
        const data = await fetchPokemonList();
        setPokemons(data);
        setStatus('success');
      } catch (error) {
        setError(error.message);
        setStatus('error');
      }
    }

    loadPokemons();
  }, []);

  useEffect(() => {
    localStorage.setItem('pokeagenda-query', query);
  }, [query]);

  const filteredPokemons = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return pokemons;
    }

    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(trimmedQuery)
    );
  }, [pokemons, query]);

  const noResults = status === 'success' && !filteredPokemons.length;

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Layout>
        <Header />
        <SearchForm
          value={query}
          onChange={setQuery}
          onReset={() => setQuery('')}
        />
        <Feedback status={status} errorMessage={error} />
        {!noResults && <PokemonGrid items={filteredPokemons} />}
        {noResults && (
          <p className="empty">
            No encontramos ningún Pokémon con ese nombre. Intenta con otro.
          </p>
        )}
      </Layout>
    </div>
  );
}

export default App;