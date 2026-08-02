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
