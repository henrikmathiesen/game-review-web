import type { ReviewRequest, ReviewResponse } from '../DTO';
import type { ReviewRepository } from '../interfaces';
import { generateId } from '../utils';

export class LocalStorageReviewRepository implements ReviewRepository {
  private readonly storageKey = 'reviews';

  constructor(private readonly storage: Storage = localStorage) {}

  async getByGameId(gameId: number): Promise<ReviewResponse[]> {
    const storedReviews = this.storage.getItem(this.storageKey);

    if (storedReviews === null) {
      return [];
    }

    const parsedReviews = JSON.parse(storedReviews) as ReviewResponse[];

    return parsedReviews.filter((review) => review.gameId === gameId);
  }

  async getById(id: number): Promise<ReviewResponse | null> {
    const storedReviews = this.storage.getItem(this.storageKey);

    if (storedReviews === null) {
      return null;
    }

    const parsedReviews = JSON.parse(storedReviews) as ReviewResponse[];

    return parsedReviews.find((review) => review.id === id) ?? null;
  }

  async create(gameId: number, review: ReviewRequest): Promise<ReviewResponse> {
    // Unlike the Java backend, this demo adapter assumes that
    // gameId is valid and does not verify that the game exists.

    const storedReviews = this.storage.getItem(this.storageKey);
    let parsedReviews: ReviewResponse[];

    if (storedReviews === null) {
      parsedReviews = [];
    } else {
      parsedReviews = JSON.parse(storedReviews) as ReviewResponse[];
    }

    const createdReview: ReviewResponse = {
      ...review,
      id: generateId(parsedReviews),
      gameId,
      createdAt: new Date().toISOString()
    };

    parsedReviews.push(createdReview);

    this.storage.setItem(this.storageKey, JSON.stringify(parsedReviews));

    return createdReview;
  }
}
