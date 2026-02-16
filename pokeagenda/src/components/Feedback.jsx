function Feedback({ status, errorMessage }) {
  if (status === 'loading') {
    return <p className="feedback">Cargando Pokémon...</p>;
  }

  if (status === 'error') {
    return (
      <p className="feedback feedback--error">
        {errorMessage || 'Ha ocurrido un error inesperado.'}
      </p>
    );
  }


  return null;
}

export default Feedback;