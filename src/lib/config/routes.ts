import { wrap } from "svelte-spa-router/wrap";
import type { GameResponse, ReviewResponse } from "../DTO";
import { canActivateCreateReview, canActivateCreateGame } from "../auth/route-guards";
import Start from "../routes/Start.svelte";
import Login from "../routes/Login.svelte";
import GameDetails from "../routes/GameDetails.svelte";
import ReviewDetails from "../routes/ReviewDetails.svelte";
import CreateReview from "../routes/CreateReview.svelte";
import CreateGame from "../routes/CreateGame.svelte";

export function createRoutes(
  gamesPromise: Promise<GameResponse[]>,
  latestReviewsPromise: Promise<ReviewResponse[]>,
) {
  return {
    "/": wrap({
      component: Start,
      props: {
        gamesPromise,
        latestReviewsPromise,
      },
    }),
    "/login": Login,
    "/game/:id": GameDetails,
    "/review/:id": ReviewDetails,
    "/game/:id/create-review": wrap({
      component: CreateReview,
      conditions: [canActivateCreateReview],
    }),
    "/create-game": wrap({
      component: CreateGame,
      conditions: [canActivateCreateGame],
    })
  };
}
