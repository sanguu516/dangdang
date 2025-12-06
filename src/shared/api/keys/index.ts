import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { userKeys } from "./user";

export const queries = mergeQueryKeys(userKeys);
