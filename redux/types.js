export default {
/* Saga actions */
  AUTH_LISTEN: 'authListen',    // Listen for a login: { nav, inScreen, outScreen }
  AUTH_CREATE: 'createUser',    // Create a user from: { email, pass }
  AUTH_LOGIN: 'authLogin',      // Login with { uname } and { pass }
  AUTH_LOGOUT: 'authLogout',    // Logout
  LIST_ADD: 'addList',          // Add a list with { name }
  LIST_REMOVE: 'removeList',    // Remove a list with { index }
  LIST_MODIFY: 'modifyList',    // Raname the list at { index } to { name }
  LIST_UP: 'moveListUp',        // Move the list at { index } up one
  LIST_DOWN: 'moveListDown',    // Move the list at { index } down one
  LIST_SELECT: 'selectList',    // Select the list at index { index }
                                // - set to null to reset
  ITEM_ADD: 'addItem',          // Add an item with { name }
  ITEM_REMOVE: 'removeItem',    // Remove an item with { index }
  ITEM_MODIFY: 'modifyItem',    // Modify item at action.index with
                                // { name } and { checked }
  ITEM_UP: 'moveItemUp',        // Move the item at { index } up one
  ITEM_DOWN: 'moveItemDown',    // Move the item at { index } down one
/* store notifying actions */
  SET_USER: 'setUser',          // Set the user to { user }
  LIST_ADDED: 'listAdded',      // Add a list to the array. { name }
  LIST_REMOVED: 'listRemoved',  // Removes the list at { index }
};
