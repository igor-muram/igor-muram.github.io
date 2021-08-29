import React from 'react';
import { useDispatch } from 'react-redux';

import { Header } from './components';
import { Home, Cart } from './pages';
import { Route } from 'react-router-dom';
import { fetchPizzas } from './redux/actions/pizzas';

export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPizzas());
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}
