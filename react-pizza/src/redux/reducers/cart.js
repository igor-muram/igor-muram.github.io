const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART': {
      const newItems = {
        ...state.items,
        [action.payload.id]: state.items[action.payload.id]
          ? [...state.items[action.payload.id], action.payload]
          : [action.payload],
      };

      const allPizzas = Object.values(newItems).flat();
      const totalPrice = allPizzas.reduce(
        (sum, { price, typePrice, sizePrice }) => price + typePrice + sizePrice + sum,
        0,
      );

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

export default cart;
