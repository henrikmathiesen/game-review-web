import { describe, expect, it } from "vitest";

import type { GameResponse } from "../DTO";
import { Genre, Platform } from "../enums";
import { sortGames } from "./sort-games";

function createGame(
    id: number,
    overrides: Partial<GameResponse> = {},
): GameResponse {
    return {
        id,
        title: `Game ${id}`,
        genre: Genre.RPG,
        platform: Platform.PC,
        description: "Game description",
        releaseYear: 2020,
        averageRating: 5,
        ...overrides,
    };
}

describe("sortGames by title", () => {
    it("sorts games alphabetically by title", () => {
        const games = [
            createGame(1, { title: "Zulu" }),
            createGame(2, { title: "Alpha" }),
            createGame(3, { title: "Mike" }),
        ];

        const sortedGames = sortGames(games, "title");

        expect(sortedGames.map((game) => game.title)).toEqual([
            "Alpha",
            "Mike",
            "Zulu",
        ]);
    });

    it("does not mutate the original game array", () => {
        const zulu = createGame(1, { title: "Zulu" });
        const alpha = createGame(2, { title: "Alpha" });
        const games = [zulu, alpha];

        const sortedGames = sortGames(games, "title");

        expect(games).toEqual([zulu, alpha]);
        expect(sortedGames).toEqual([alpha, zulu]);
        expect(sortedGames).not.toBe(games);
    });
});

describe("sortGames by platform", () => {
    it("sorts games alphabetically by platform", () => {
        const games = [
            createGame(1, { platform: Platform.XBOX }),
            createGame(2, { platform: Platform.NINTENDO }),
            createGame(3, { platform: Platform.PC }),
        ];

        const sortedGames = sortGames(games, "platform");

        expect(sortedGames.map((game) => game.platform)).toEqual([
            Platform.NINTENDO,
            Platform.PC,
            Platform.XBOX,
        ]);
    });
});

describe("sortGames by genre", () => {
    it("sorts games alphabetically by genre", () => {
        const games = [
            createGame(1, { genre: Genre.STRATEGY }),
            createGame(2, { genre: Genre.ACTION }),
            createGame(3, { genre: Genre.RPG }),
        ];

        const sortedGames = sortGames(games, "genre");

        expect(sortedGames.map((game) => game.genre)).toEqual([
            Genre.ACTION,
            Genre.RPG,
            Genre.STRATEGY,
        ]);
    });
});

describe("sortGames by release year", () => {
    it("sorts games from newest to oldest release year", () => {
        const games = [
            createGame(1, { releaseYear: 1998 }),
            createGame(2, { releaseYear: 2025 }),
            createGame(3, { releaseYear: 2015 }),
        ];

        const sortedGames = sortGames(games, "releaseYear");

        expect(sortedGames.map((game) => game.releaseYear)).toEqual([
            2025,
            2015,
            1998,
        ]);
    });
});

describe("sortGames by rating", () => {
    it("sorts games from highest to lowest rating with unrated games last", () => {
        const games = [
            createGame(1, { averageRating: null }),
            createGame(2, { averageRating: 7.5 }),
            createGame(3, { averageRating: 9.2 }),
        ];

        const sortedGames = sortGames(games, "rating");

        expect(sortedGames.map((game) => game.averageRating)).toEqual([
            9.2,
            7.5,
            null,
        ]);
    });
});
