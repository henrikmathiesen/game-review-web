import { replace } from "svelte-spa-router";
import type { RoutePrecondition } from "svelte-spa-router";
import { authState } from "./auth-state.svelte";

export const canActivateCreateReview: RoutePrecondition = async () => {
  if (authState.canCreateReviews) {
    return true;
  }

  await replace("/login");
  return false;
};

export const canActivateCreateGame: RoutePrecondition = async () => {
  if (authState.canCreateGames) {
    return true;
  }

  await replace("/login");
  return false;
};

export const canActivateDeleteReviews: RoutePrecondition = async () => {
  if (authState.canDeleteReviews) {
    return true;
  }

  await replace("/login");
  return false;
};

export const canActivateDeleteGames: RoutePrecondition = async () => {
  if (authState.canDeleteGames) {
    return true;
  }

  await replace("/login");
  return false;
};
