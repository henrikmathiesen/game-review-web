import { describe, expect, it } from "vitest";

import type { ReviewResponse } from "../DTO";
import { sortReviewsByNewest } from "./sort-reviews-by-newest";

function createReview(id: number, createdAt: string): ReviewResponse {
    return {
        id,
        gameId: 1,
        gameTitle: "Test game",
        header: `Review ${id}`,
        body: "Review body",
        rating: 5,
        createdAt,
        createdBy: `User ${id}`,
    };
}

describe("sortReviewsByNewest", () => {
    it("sorts reviews from newest to oldest", () => {
        const oldest = createReview(1, "2024-01-01T12:00:00.000Z");
        const newest = createReview(2, "2026-01-01T12:00:00.000Z");
        const middle = createReview(3, "2025-01-01T12:00:00.000Z");

        const sortedReviews = sortReviewsByNewest([
            oldest,
            newest,
            middle,
        ]);

        expect(sortedReviews.map((review) => review.id)).toEqual([2, 3, 1]);
    });

    it("sorts reviews created on the same day by their exact time", () => {
        const morning = createReview(1, "2026-07-29T08:00:00.000Z");
        const evening = createReview(2, "2026-07-29T18:00:00.000Z");
        const afternoon = createReview(3, "2026-07-29T13:00:00.000Z");

        const sortedReviews = sortReviewsByNewest([
            morning,
            evening,
            afternoon,
        ]);

        expect(sortedReviews.map((review) => review.id)).toEqual([2, 3, 1]);
    });

    it("does not mutate the original review array", () => {
        const oldest = createReview(1, "2024-01-01T12:00:00.000Z");
        const newest = createReview(2, "2026-01-01T12:00:00.000Z");
        const reviews = [oldest, newest];

        const sortedReviews = sortReviewsByNewest(reviews);

        expect(reviews).toEqual([oldest, newest]);
        expect(sortedReviews).toEqual([newest, oldest]);
        expect(sortedReviews).not.toBe(reviews);
    });
});
