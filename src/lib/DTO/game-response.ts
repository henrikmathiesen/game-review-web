import { Platform, Genre } from '../enums';

export type GameResponse = {
    id: number;
    title: string;
    genre: Genre;
    platform: Platform;
    description: string;
    releaseYear: number;
    averageRating: number | null;
}