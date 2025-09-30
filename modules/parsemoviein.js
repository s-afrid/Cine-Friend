export const parseMovieInput = (input) => {
  // Remove leading/trailing spaces
  const trimmed = input.trim();

  // Try to match: "Movie Name 2010"
  const match = trimmed.match(/^(.*?)(?:\s+(\d{4}))?$/);

  if (match) {
    const name = match[1].trim();       // Always a string
    const year = match[2] || null;      // Either 4-digit year or null
    return { name, year };
  }

  return { name: trimmed, year: null };
}
