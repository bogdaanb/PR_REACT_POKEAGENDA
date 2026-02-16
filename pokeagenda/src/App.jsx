import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import PokemonGrid from './components/PokemonGrid.jsx';
import Feedback from './components/Feedback.jsx';
import { fetchPokemonList } from './services/pokeapi.js';

function App() {
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

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