export const getUser = state => state.user;

export const getUID = state => {
  return state.user.uid || '';
};

export const getLists = state => state.lists;

export const getItems = state => state.items;
