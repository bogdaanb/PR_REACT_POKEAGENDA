function ThemeToggle({ theme, onToggle }) {
  return (
    <button 
      className="theme-toggle" 
      onClick={onToggle}
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? '🌑' : '☀️'}
    </button>
  );
}

export default ThemeToggle;