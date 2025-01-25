export function parseDate(dateString: string): Date | null {
  if (!dateString) {
    return null;
  }

  // Rozdzielenie daty po separatorze "."
  const dateParts = dateString.split('.');

  // Sprawdzenie, czy tablica ma odpowiednią ilość elementów
  if (dateParts.length !== 3) {
    return null; // Zwróć null, jeśli format nie jest poprawny
  }

  // Konwersja na liczby: day, month, year
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Miesiące w JavaScript są liczone od 0 (styczeń to 0)
  const year = parseInt(dateParts[2], 10);

  // Zwrócenie obiektu Date
  return new Date(year, month, day);
}
