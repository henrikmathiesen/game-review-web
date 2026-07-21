import type { GameRequest, GameResponse } from "../DTO";
import type { GameRepository } from '../interfaces';
import { generateId } from '../utils';

export class LocalStorageGameRepository implements GameRepository {
  private readonly storageKey = 'games';

  constructor(private readonly storage: Storage = localStorage) {}

  async getAll(): Promise<GameResponse[]> {
    const storedGames = this.storage.getItem(this.storageKey);

    if (storedGames === null) {
      return [];
    }

    return JSON.parse(storedGames) as GameResponse[];
  }

  async getById(id: number): Promise<GameResponse | null> {
    const games = await this.getAll();

    return games.find((game) => game.id === id) ?? null;
  }

  async create(game: GameRequest): Promise<GameResponse> {
    const games = await this.getAll();
    const createdGame: GameResponse = {
      ...game,
      id: generateId(games),
      averageRating: null
    };

    games.push(createdGame);
    this.storage.setItem(this.storageKey, JSON.stringify(games));

    return createdGame;
  }
}
