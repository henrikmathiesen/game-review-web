import type { ReviewRequest, ReviewResponse, GameResponse } from '../DTO';
import type { ReviewRepository } from '../interfaces';
import { createJsonRequestOptions } from '../utils';

export class ApiReviewRepository implements ReviewRepository {
  constructor(private url: string) {}

  async getAll(): Promise<ReviewResponse[]> {
    const response = await fetch(`${this.url}/reviews`);
    const reviews: ReviewResponse[] = await response.json();

    return reviews;
  }

  async getByGameId(gameId: number): Promise<ReviewResponse[]> {
    const response = await fetch(`${this.url}/games/${gameId}/reviews`);
    const reviews: ReviewResponse[] = await response.json();

    return reviews;
  }

  async getById(id: number): Promise<ReviewResponse | null> {
    const response = await fetch(`${this.url}/reviews/${id}`);
    const review: ReviewResponse = await response.json();

    return review;
  }

  async create(game: Pick<GameResponse, 'id' | 'title'>, review: ReviewRequest): Promise<ReviewResponse> {
    const response = await fetch(
      `${this.url}/games/${game.id}/reviews`,
      createJsonRequestOptions('POST', review)
    );

    const createdReview: ReviewResponse = await response.json();

    return createdReview;
  }

  async deleteById(id: number): Promise<void> {
    await fetch(`${this.url}/reviews/${id}`, { method: 'DELETE' });
  }
}
