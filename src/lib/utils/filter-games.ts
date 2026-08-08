import { type GameResponse } from "../DTO";

export function filterGames(games: GameResponse[], term: string) {
  const normalizedTerm = term.trim().toLowerCase();

  if (normalizedTerm.length < 3) {
    return games;
  }

  return games.filter(g => g.title.toLowerCase().includes(normalizedTerm));
}
