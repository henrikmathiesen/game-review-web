import type { ReviewRequest, ReviewResponse } from '../DTO';

export interface ReviewRepository {
  getByGameId(gameId: number): Promise<ReviewResponse[]>;
  getById(id: number): Promise<ReviewResponse | null>;
  create(gameId: number, review: ReviewRequest): Promise<ReviewResponse>;
}
