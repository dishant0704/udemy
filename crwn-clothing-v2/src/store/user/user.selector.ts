import { createSelector } from "reselect";

import { UserState } from "./user.reducer";

export const selectCurrentReducer = (state):UserState => state.user;

export const selectCurrentUser = createSelector( 
    selectCurrentReducer,
    (user) => user.currentUser
) 
