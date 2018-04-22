import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import storeFactory from './helper/store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = storeFactory();

ReactDOM.render(
  <Provider store={store}>
    {/* <App store={store}/> */}
    <App/>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
