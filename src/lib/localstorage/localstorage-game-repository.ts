import type { GameRequest, GameResponse } from "../DTO";
import type { GameRepository, ReviewRepository } from "../interfaces";
import { generateId } from "../utils";

export class LocalStorageGameRepository implements GameRepository {
  private readonly storageKey = "games";

  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly storage: Storage = localStorage,
  ) {}

  async getAll(): Promise<GameResponse[]> {
    const storedGames = this.storage.getItem(this.storageKey);

    if (storedGames === null) {
      return [];
    }

    const parsedGames = JSON.parse(storedGames) as GameResponse[];
    await this.calculateAverageRatings(parsedGames);

    return parsedGames;
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
      averageRating: null,
    };

    games.push(createdGame);
    this.storage.setItem(this.storageKey, JSON.stringify(games));

    return createdGame;
  }

  async deleteById(id: number): Promise<void> {
    let games = await this.getAll();
    const withoutDeletedGame = games.filter(v => v.id !== id);

    games = withoutDeletedGame;
    this.storage.setItem(this.storageKey, JSON.stringify(games));
  }

  private async calculateAverageRatings(games: GameResponse[]): Promise<void> {
    for (const game of games) {
      const reviews = await this.reviewRepository.getByGameId(game.id);

      if (reviews.length === 0) {
        game.averageRating = null;
        continue;
      }

      let ratingSum = 0;

      for (const review of reviews) {
        ratingSum += review.rating;
      }

      game.averageRating = ratingSum / reviews.length;
    }
  }
}
