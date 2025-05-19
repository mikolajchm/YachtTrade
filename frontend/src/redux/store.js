import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import adsReducer from './adsRedux';
import userReducer from './userRedux';
import searchReducer from './searchRedux';

const subreducers = {
  ads: adsReducer,
  user: userReducer,
  search: searchReducer
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;