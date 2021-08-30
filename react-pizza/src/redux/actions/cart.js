export const addPizzaToCart = (pizzaObj) => ({
  type: 'ADD_PIZZA_TO_CART',
  payload: {
    id: `id_${pizzaObj.id}_${pizzaObj.type}_${pizzaObj.size}`,
    obj: pizzaObj,
  },
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const removeCartItem = (id, type, size) => ({
  type: 'REMOVE_CART_ITEM',
  payload: {
    id: `id_${id}_${type}_${size}`,
  },
});

export const plusCartItem = (id, type, size) => ({
  type: 'PLUS_CART_ITEM',
  payload: {
    id: `id_${id}_${type}_${size}`,
  },
});

export const minusCartItem = (id, type, size) => ({
  type: 'MINUS_CART_ITEM',
  payload: {
    id: `id_${id}_${type}_${size}`,
  },
});
