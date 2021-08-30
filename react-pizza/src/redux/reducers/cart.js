const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) =>
  arr.reduce((sum, { obj }) => obj.price + obj.typePrice + obj.sizePrice + sum, 0);

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => sum + _get(obj, path), 0);
};

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');

  return keys.reduce((val, key) => val[key], obj[firstKey]);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART': {
      const currentPizzaItems = state.items[action.payload.id]
        ? [...state.items[action.payload.id].items, action.payload]
        : [action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'REMOVE_CART_ITEM': {
      const newItems = JSON.parse(JSON.stringify(state.items));

      const currentTotalPrice = newItems[action.payload.id].totalPrice;
      const currentTotalCount = newItems[action.payload.id].items.length;

      delete newItems[action.payload.id];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case 'PLUS_CART_ITEM': {
      const newObjItems = [
        ...state.items[action.payload.id].items,
        state.items[action.payload.id].items[0],
      ];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload.id].items;
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload.id].items.slice(1) : oldItems;

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };

    default:
      return state;
  }
};

export default cart;
