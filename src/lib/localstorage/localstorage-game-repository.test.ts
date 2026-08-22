import { describe, expect, it } from 'vitest';

import type { GameResponse, ReviewResponse } from '../DTO';
import { Genre, Platform } from '../enums';
import type { ReviewRepository } from '../interfaces';
import { LocalStorageGameRepository } from './localstorage-game-repository';

function createStorage(games: GameResponse[]): Storage {
  const items = new Map<string, string>([
    ['games', JSON.stringify(games)]
  ]);

  return {
    get length() {
      return items.size;
    },
    clear() {
      items.clear();
    },
    getItem(key: string) {
      return items.get(key) ?? null;
    },
    key(index: number) {
      return [...items.keys()][index] ?? null;
    },
    removeItem(key: string) {
      items.delete(key);
    },
    setItem(key: string, value: string) {
      items.set(key, value);
    }
  };
}

function createReviewRepository(reviews: ReviewResponse[]): ReviewRepository {
  return {
    async getAll() {
      return reviews;
    },
    async getByGameId(gameId: number) {
      return reviews.filter((review) => review.gameId === gameId);
    },
    async getById(id: number) {
      return reviews.find((review) => review.id === id) ?? null;
    },
    async create() {
      throw new Error('Not implemented in this test');
    },
    async deleteById(id) {
      throw new Error('Not implemented in this test');
    }
  };
}

function createGame(): GameResponse {
  return {
    id: 1,
    title: 'Test game',
    genre: Genre.STRATEGY,
    platform: Platform.PC,
    description: 'A game used in unit tests',
    releaseYear: 2026,
    averageRating: null
  };
}

function createReview(id: number, rating: number): ReviewResponse {
  return {
    id,
    gameId: 1,
    gameTitle: `Game Title ${id}`,
    header: `Review ${id}`,
    body: 'Review body',
    rating,
    createdAt: '2026-01-01T00:00:00.000Z',
    createdBy: `User ${id}`
  };
}

describe('LocalStorageGameRepository.getAll', () => {
  it('sets averageRating to null when the game has no reviews', async () => {
    // averageRating is set to 5 here to really show it becomes null
    const storage = createStorage([{ ...createGame(), averageRating: 5 }]);
    const reviewRepository = createReviewRepository([]);
    const repository = new LocalStorageGameRepository(reviewRepository, storage);

    const games = await repository.getAll();

    expect(games[0].averageRating).toBeNull();
  });

  it('uses the rating from a single review', async () => {
    const storage = createStorage([createGame()]);
    const reviewRepository = createReviewRepository([createReview(1, 4)]);
    const repository = new LocalStorageGameRepository(reviewRepository, storage);

    const games = await repository.getAll();

    expect(games[0].averageRating).toBe(4);
  });

  it('calculates the average rating from multiple reviews', async () => {
    const storage = createStorage([createGame()]);
    const reviewRepository = createReviewRepository([
      createReview(1, 3),
      createReview(2, 4),
      createReview(3, 5)
    ]);
    const repository = new LocalStorageGameRepository(reviewRepository, storage);

    const games = await repository.getAll();

    expect(games[0].averageRating).toBe(4);
  });
});
