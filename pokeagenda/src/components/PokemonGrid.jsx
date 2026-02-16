import PokemonCard from './PokemonCard.jsx';

function PokemonGrid({ items }) {
  if (!items.length) {
    return (
      <p className="empty">No hay resultados que coincidan con tu búsqueda.</p>
    );
  }

  return (
    <section className="grid" aria-live="polite">
      {items.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}

export default PokemonGrid;