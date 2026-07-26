import { describe, expect, it } from "vitest";

import type { ReviewResponse } from "../DTO";
import { generateId } from "./generate-id";

function createReview(id: number): ReviewResponse {
  return {
    id,
    gameId: 1,
    gameTitle: "Legolas prickar mitten",
    header: `Review ${id}`,
    body: "Review body",
    rating: 5,
    createdAt: "2026-01-01T00:00:00.000Z",
  };
}

describe("generateId for reviews", () => {
  it("returns 1 when there are no reviews", () => {
    expect(generateId([] as ReviewResponse[])).toBe(1);
  });

  it("returns the next ID for sequential review IDs", () => {
    const reviews = [createReview(1), createReview(2), createReview(3)];

    expect(generateId(reviews)).toBe(4);
  });

  it("returns one more than the highest review ID", () => {
    const reviews = [createReview(4), createReview(10), createReview(7)];

    expect(generateId(reviews)).toBe(11);
  });
});
