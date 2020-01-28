import React from 'react';

import {Provider} from 'react-redux';

import ShopNavigator from './navigation/ShopNavigator';
import configureStore from './store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
