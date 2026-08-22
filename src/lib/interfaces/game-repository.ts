import type { GameRequest, GameResponse } from "../DTO";

export interface GameRepository {
  getAll(): Promise<GameResponse[]>;
  getById(id: number): Promise<GameResponse | null>;
  create(game: GameRequest): Promise<GameResponse>;
  deleteById(id: number): Promise<void>;
}
