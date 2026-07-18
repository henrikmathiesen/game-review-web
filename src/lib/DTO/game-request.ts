import type { Genre, Platform } from '../enums';

export type GameRequest = {
    title: string;
    genre: Genre;
    platform: Platform;
    description: string;
    releaseYear: number;
};