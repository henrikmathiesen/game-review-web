import type { ReviewRequest, ReviewResponse, GameResponse } from '../DTO';
import type { ReviewRepository } from '../interfaces';
import { generateId } from '../utils';

export class LocalStorageReviewRepository implements ReviewRepository {
  private readonly storageKey = 'reviews';

  constructor(private readonly storage: Storage = localStorage) {}

  async getAll(): Promise<ReviewResponse[]> {
    const storedReviews = this.storage.getItem(this.storageKey);

    if (storedReviews === null) {
      return [];
    }

    return JSON.parse(storedReviews) as ReviewResponse[];
  }

  async getByGameId(gameId: number): Promise<ReviewResponse[]> {
    const reviews = await this.getAll();

    return reviews.filter((review) => review.gameId === gameId);
  }

  async getById(id: number): Promise<ReviewResponse | null> {
    const reviews = await this.getAll();
    return reviews.find((review) => review.id === id) ?? null;
  }

  async create(game: Pick<GameResponse, 'id' | 'title'>, review: ReviewRequest): Promise<ReviewResponse> {
    // Unlike the Java backend, this demo adapter assumes that
    // the provided game reference is valid.

    const reviews = await this.getAll();

    const createdReview: ReviewResponse = {
      ...review,
      id: generateId(reviews),
      gameId: game.id,
      gameTitle: game.title,
      createdAt: new Date().toISOString()
    };

    reviews.push(createdReview);

    this.storage.setItem(this.storageKey, JSON.stringify(reviews));

    return createdReview;
  }

  async deleteById(id: number): Promise<void> {
    let reviews = await this.getAll();
    const withoutDeletedReview = reviews.filter(v => v.id !== id);

    reviews = withoutDeletedReview;
    this.storage.setItem(this.storageKey, JSON.stringify(reviews));
  }
}
