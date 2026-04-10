import type { Dispatch, SetStateAction, ReactNode } from "react";

export type Movie = {
  Title: string;
  Genre: string;
  Rated: string;
  Poster: string;
  isWatchList: boolean;
  Year: number;
  imdbRating: number;
  id: string;
};

export type WatchListProps = {
  arrayList: Movie[];
};

export type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export type SortProps = {
  sortBy: string;
  setSortBy: (value: string) => void;
};

export type HeaderProps = {
  tab: number;
  setTab: (value: number) => void;
};

export type CardProps = {
  title: string;
  year: number;
  rating: number;
  img: string;
  isWatch: boolean;
  movieId: string;
  onDeleteMovie: (value: string) => void;
  onEditMovie: (value: string) => void;
  isAdmin: boolean;
  onWishlist: (value: string) => void;
};

export type CardListProps = {
  isLoading: boolean;
  arrayList: Movie[];
  onDeleteMovie: (value: string) => void;
  onEditMovie: (value: string) => void;
  isAdmin: boolean;
  onWishlist: (value: string) => void;
};

export type ErrorProps = {
  errorMsg: string;
};

export type UseGetMoviesProps = {
  arrayList: Movie[];
  filteredMovies: Movie[];
  setFilteredMovies: Dispatch<SetStateAction<Movie[]>>;
  loading: boolean;
  error: string;
};

export type SuccessPopupProps = {
  open: boolean;
  handleOk: (event: any) => void;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  title: string;
};

export type contextProps = {
  children: ReactNode;
};

export type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        role: AuthRole;
      };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "USER_ROLE";
      payload: AuthRole;
    };

export type AuthContextType = {
  isLoggedIn: any;
  loginFn: () => void;
  logoutFn: () => void;
  state: AuthState;
  dispatch: React.ActionDispatch<[action: AuthAction]>;
};

export type AuthRole = "admin" | "user" | null;

export type AuthState = {
  isLoggedIn: boolean;
  userRole: AuthRole;
};
