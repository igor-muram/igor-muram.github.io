import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене по убыванию', type: 'price', order: 'desc' },
  { name: 'цене по возрастанию', type: 'price', order: 'asc' },
  { name: 'названию', type: 'name', order: 'asc' },
];

export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  // get total count for every selected pizza of any selected type
  const pizzasWithModifiersCount = Object.keys(cartItems) // get complex ids like ["id_7_тонкое_26", "id_7_тонкое_40", "id_8_тонкое_40", "id_8_традиционное_30"]
    .map((key) => cartItems[key].items) // get arrays for complex ids like [Array(2), Array(3), Array(2), Array(1)]
    .map((el) => el.length); // get array with lengths of Arrays like [2, 3, 2, 1]

  const totalCount = Object.keys(cartItems) // get complex ids like ["id_7_тонкое_26", "id_7_тонкое_40", "id_8_тонкое_40", "id_8_традиционное_30"]
    .map((el) => el.split('_')[1]) // get real ids of pizzas from complex ids like ["7", "7", "8", "8"]
    .map((elem, index) => Array(pizzasWithModifiersCount[index]).fill(elem)) // get array of real ids pizzasWithModifiersCount[index] times for every real id like [["7", "7"], ["7", "7", "7"], ["8", "8"], ["8"]]
    .flat() // get array with real ids like ["7", "7", "7", "7", "7", "8", "8", "8"]
    .reduce((acc, i) => {
      acc[i] = (acc[i] || 0) + 1;
      return acc;
    }, {}); // get object with real ids and their total count of any type like {7: 5, 8: 3}

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const onAddPizza = React.useCallback((obj) => {
    dispatch(addPizzaToCart(obj));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          activeSortOrder={sortBy.order}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">{categoryNames[category] ?? 'Все'} пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items?.map((obj) => (
              <PizzaBlock
                onAddToCart={onAddPizza}
                key={obj.id}
                pizzasCount={totalCount[obj.id]}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}
