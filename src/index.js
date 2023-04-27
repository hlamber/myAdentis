import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore} from 'redux';
import allReducers from './context/reducers/';
import { Provider } from 'react-redux';


const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

export default store;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );