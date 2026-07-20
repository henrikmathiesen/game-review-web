import type { GameRequest, GameResponse } from "../DTO";
import type { GameRepository } from "../interfaces";
import { createJsonRequestOptions } from '../utils';

export class ApiGameRepository implements GameRepository {
  constructor(private url: string) {}

  async getAll(): Promise<GameResponse[]> {
    const response = await fetch(`${this.url}/games`);
    const games: GameResponse[] = await response.json();

    return games;
  }

  async getById(id: number): Promise<GameResponse | null> {
    const response = await fetch(`${this.url}/games/${id}`);
    const game: GameResponse = await response.json();

    return game;
  }

  async create(game: GameRequest): Promise<GameResponse> {
    const response = await fetch(`${this.url}/games`, createJsonRequestOptions('POST', game));

    const createdGame: GameResponse = await response.json();

    return createdGame;
  }
}
