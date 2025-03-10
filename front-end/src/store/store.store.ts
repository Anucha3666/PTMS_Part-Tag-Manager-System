import { combineReducers, configureStore } from "@reduxjs/toolkit";

import partsFeatures from "./features/parts.features";
import printFeatures from "./features/print.features";
import utilsFeatures from "./features/utils.features";

const rootReducer = combineReducers({
  utils: utilsFeatures,
  parts: partsFeatures,
  print: printFeatures,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
