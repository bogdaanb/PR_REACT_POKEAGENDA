function SearchForm({ value, onChange, onReset }) {
  return (
    <form className="search-form" onSubmit={(event) => event.preventDefault()}>
      <label className="search-form__label" htmlFor="query">Busca un Pokémon</label>
      <div className="search-form__controls">
        <input
          id="query"
          name="query"
          type="text"
          placeholder="pikachu, bulbasaur, charmander..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
        <button type="button" onClick={onReset}>Limpiar</button>
      </div>
    </form>
  );
}

export default SearchForm;