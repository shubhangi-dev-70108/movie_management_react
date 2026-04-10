import { createContext } from "react";
import type { AuthContextType } from "../types";

//create a context
export const AuthContext = createContext<AuthContextType | null>(null);
