export default {
  LIST_ADD: 'addList',        // Add a list with action.name
  LIST_REMOVE: 'removeList',  // Remove a list with action.index
  LIST_MODIFY: 'modifyList',  // Raname the list at action.index to action.name
  LIST_UP: 'moveListUp',      // Move the list at action.index up one
  LIST_DOWN: 'moveListDown',  // Move the list at action.index down one
  LIST_SELECT: 'selectList',  // Select the list at index action.index - set to null to reset
  ITEM_ADD: 'addItem',        // Add an item with action.name
  ITEM_REMOVE: 'removeItem',  // Remove an item with action.index
  ITEM_MODIFY: 'modifyItem',  // Modify item at action.index with
                              // action.name and action.checked
  ITEM_UP: 'moveItemUp',      // Move the item at action.index up one
  ITEM_DOWN: 'moveItemDown'   // Move the item at action.index down one
};
