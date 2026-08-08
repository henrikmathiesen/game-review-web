import type { RouteDetailLoaded } from "svelte-spa-router";
import type { BreadcrumbItem } from "../components/shell/Breadcrumb.svelte";

import type { GameResponse, ReviewResponse } from "../DTO";

export async function createBreadcrumbItems(
  detail: RouteDetailLoaded,
  gamesPromise: Promise<GameResponse[]>,
  reviewsPromise: Promise<ReviewResponse[]>,
): Promise<BreadcrumbItem[]> {
  switch (detail.route) {
    case "/login": {
      return [{ label: "Start", href: "/" }, { label: "Login" }];
    }
    case "/game/:id": {
      const id = Number(detail.params?.id);
      const games = await gamesPromise;
      const game = games.find((g) => g.id === id);

      return [{ label: "Start", href: "/" }, { label: game?.title ?? "Game" }];
    }
    case "/review/:id": {
      const id = Number(detail.params?.id);
      const reviews = await reviewsPromise;
      const review = reviews.find((review) => review.id === id);

      return [
        { label: "Start", href: "/" },
        { label: review ? `Review: ${review.gameTitle}` : "Review" },
      ];
    }
    case "/game/:id/create-review": {
      const id = Number(detail.params?.id);
      const games = await gamesPromise;
      const game = games.find((g) => g.id === id);

      return [
        { label: "Start", href: "/" },
        { label: game ? game.title : "Game", href: game ? `/game/${game.id}` : '/' },
        { label: "Create review" }
      ];
    }
    case "/create-game": {
      return [
        { label: "Start", href: "/" },
        { label: "Create game" }
      ];
    }
    case "/delete-reviews": {
      return [
        { label: "Start", href: "/" },
        { label: "Delete reviews" }
      ];
    }
    case "/delete-games": {
      return [
        { label: "Start", href: "/" },
        { label: "Delete games" }
      ];
    }
    default: {
      return [{ label: "Start" }];
    }
  }
}
