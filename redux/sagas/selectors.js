export const getUser = state => state.user;

export const getUID = state => {
  if (state.user) {
    return state.user.uid;
  }

  return null;
};
