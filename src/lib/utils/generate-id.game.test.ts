import { describe, expect, it } from 'vitest';

import type { GameResponse } from '../DTO';
import { Genre, Platform } from '../enums';
import { generateId } from './generate-id';

function createGame(id: number): GameResponse {
    return {
        id,
        title: `Game ${id}`,
        genre: Genre.ACTION,
        platform: Platform.PC,
        description: 'Description',
        releaseYear: 2026,
        averageRating: null,
    };
}

describe('generateId for games', () => {
    it('returns 1 when there are no games', () => {
        expect(generateId([] as GameResponse[])).toBe(1);
    });

    it('returns the next ID for sequential game IDs', () => {
        const games = [createGame(1), createGame(2), createGame(3)];

        expect(generateId(games)).toBe(4);
    });

    it('returns one more than the highest game ID', () => {
        const games = [createGame(8), createGame(2), createGame(5)];

        expect(generateId(games)).toBe(9);
    });
});
