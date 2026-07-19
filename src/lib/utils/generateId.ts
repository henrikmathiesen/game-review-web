type EntityWithId = {
    id: number;
};

export function generateId(entities: EntityWithId[]): number {
    if (entities.length === 0) {
        return 1;
    }

    return Math.max(...entities.map((entity) => entity.id)) + 1;
}
