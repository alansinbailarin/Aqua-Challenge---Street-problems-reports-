export function useUtils() {
  const setGravityText = (gravity) => {
    if (gravity >= 0 && gravity < 26) {
      return "Muy Baja";
    } else if (gravity >= 26 && gravity < 51) {
      return "Baja";
    } else if (gravity >= 51 && gravity < 76) {
      return "Media";
    } else if (gravity >= 76 && gravity <= 100) {
      return "Alta";
    } else {
      return "Fuera de rango";
    }
  };

  return { setGravityText };
}
