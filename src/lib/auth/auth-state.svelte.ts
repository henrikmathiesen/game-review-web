import { Role } from "../enums";

type AuthUser = {
  username: string;
  role: Role;
};

class AuthState {
  private currentUserState = $state<AuthUser | null>(null);

  get currentUser() {
    return this.currentUserState;
  }

  get isAuthenticated() {
    return this.currentUserState !== null;
  }

  get canCreateGames() {
    return this.currentUserState?.role === Role.ADMIN;
  }

  get canDeleteGames() {
    return this.currentUserState?.role === Role.ADMIN;
  }

  get canCreateReviews() {
    return (
      this.currentUserState?.role === Role.ADMIN ||
      this.currentUserState?.role === Role.USER
    );
  }

  login(user: AuthUser) {
    this.currentUserState = user;
  }

  logout() {
    this.currentUserState = null;
  }
}

export const authState = new AuthState();
