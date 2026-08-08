import { describe, expect, it } from "vitest";

import type { GameResponse } from "../DTO";
import { Genre, Platform } from "../enums";
import { filterGames } from "./filter-games";

function createGame(id: number, title: string): GameResponse {
  return {
    id,
    title,
    genre: Genre.RPG,
    platform: Platform.PC,
    description: "Game description",
    releaseYear: 2020,
    averageRating: 5,
  };
}

describe("filterGames", () => {
  const games = [
    createGame(1, "The Witcher 3: Wild Hunt"),
    createGame(2, "Super Mario Odyssey"),
    createGame(3, "Civilization VI"),
    createGame(4, "Witcher 2: Assasin of Kings"),
  ];

  it("finds games by a partial title", () => {
    const filteredGames = filterGames(games, "Witcher");

    expect(filteredGames).toEqual([games[0], games[3]]);
  });

  it("matches titles case-insensitively", () => {
    const filteredGames = filterGames(games, "SUPER MARIO");

    expect(filteredGames).toEqual([games[1]]);
  });

  it("ignores surrounding whitespace in the search term", () => {
    const filteredGames = filterGames(games, "  civilization  ");

    expect(filteredGames).toEqual([games[2]]);
  });

  it("returns an empty array when no games match", () => {
    const filteredGames = filterGames(games, "Zelda");

    expect(filteredGames).toEqual([]);
  });

  it("returns all games when the normalized search term is too short", () => {
    const filteredGames = filterGames(games, "  wi  ");

    expect(filteredGames).toBe(games);
  });

  it("treats internal whitespace as part of the search term", () => {
    const filteredGames = filterGames(games, "  w   i  ");

    expect(filteredGames).toEqual([]);
  });
});
