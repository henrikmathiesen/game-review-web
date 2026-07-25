import type { GameRepository, ReviewRepository } from '../interfaces';

import { ApiGameRepository } from '../api/api-game-repository';
import { ApiReviewRepository } from '../api/api-review-repository';

import { LocalStorageGameRepository } from '../localstorage/localstorage-game-repository';
import { LocalStorageReviewRepository } from '../localstorage/localstorage-review-repository';

const apiUrl = 'http://localhost:8080';

export const reviewRepository: ReviewRepository = import.meta.env.DEV
  ? new ApiReviewRepository(apiUrl)
  : new LocalStorageReviewRepository();

export const gameRepository: GameRepository = import.meta.env.DEV
  ? new ApiGameRepository(apiUrl)
  : new LocalStorageGameRepository(reviewRepository);
