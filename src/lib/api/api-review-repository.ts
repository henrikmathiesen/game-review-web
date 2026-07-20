import type { ReviewRequest, ReviewResponse } from '../DTO';
import type { ReviewRepository } from '../interfaces';
import { createJsonRequestOptions } from '../utils';

export class ApiReviewRepository implements ReviewRepository {
  constructor(private url: string) {}

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

  async create(gameId: number, review: ReviewRequest): Promise<ReviewResponse> {
    const response = await fetch(
      `${this.url}/games/${gameId}/reviews`,
      createJsonRequestOptions('POST', review)
    );

    const createdReview: ReviewResponse = await response.json();

    return createdReview;
  }
}
