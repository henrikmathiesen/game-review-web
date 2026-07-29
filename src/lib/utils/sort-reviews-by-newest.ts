import { type ReviewResponse } from '../DTO';

export function sortReviewsByNewest(
    reviews: ReviewResponse[],
): ReviewResponse[] {
    return [...reviews].sort(
        (first, second) =>
            Date.parse(second.createdAt) -
            Date.parse(first.createdAt),
    );
}
