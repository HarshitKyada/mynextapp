// src/middleware/ClearPersistedStateMiddleware.js

const ClearPersistedStateMiddleware = (store) => (next) => (action) => {
  if (action.type === "auth/logout") {
    localStorage.clear(); // Clear localStorage
    // store.dispatch({ type: 'RESET_STATE' }); // Dispatch a RESET_STATE action to clear Redux state
  }
  return next(action);
};

export default ClearPersistedStateMiddleware;
