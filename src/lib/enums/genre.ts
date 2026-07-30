export const Genre = {
    RPG: 'RPG',
    ACTION: 'ACTION',
    ADVENTURE: 'ADVENTURE',
    STRATEGY: 'STRATEGY',
    SIMULATION: 'SIMULATION',
    SPORTS: 'SPORTS',
    RACING: 'RACING',
    PUZZLE: 'PUZZLE',
} as const;

export type Genre = keyof typeof Genre;
