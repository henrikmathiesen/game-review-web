import type { ReviewRequest, ReviewResponse, GameResponse } from '../DTO';

export interface ReviewRepository {
  getAll(): Promise<ReviewResponse[]>;
  getByGameId(gameId: number): Promise<ReviewResponse[]>;
  getById(id: number): Promise<ReviewResponse | null>;
  create(game: Pick<GameResponse, 'id' | 'title'>, review: ReviewRequest): Promise<ReviewResponse>;
  deleteById(id: number): Promise<void>;
}
