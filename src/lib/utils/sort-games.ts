import { type GameResponse } from "../DTO";

export type GameSort =
  "title" | "platform" | "genre" | "releaseYear" | "rating";

export function sortGames(
  games: GameResponse[],
  sortOrder: GameSort,
): GameResponse[] {
  const copy = [...games];

  switch (sortOrder) {
    case "title": {
      return copy.sort((a, b) => a.title.localeCompare(b.title, "sv-SE"));
    }
    case "platform": {
      return copy.sort((a, b) => a.platform.localeCompare(b.platform, "sv-SE"));
    }
    case "genre": {
      return copy.sort((a, b) => a.genre.localeCompare(b.genre, "sv-SE"));
    }
    case "releaseYear": {
      return copy.sort((a, b) => b.releaseYear - a.releaseYear);
    }
    case "rating": {
      return copy.sort(
        (a, b) => (b.averageRating ?? -1) - (a.averageRating ?? -1),
      );
    }
  }
}
