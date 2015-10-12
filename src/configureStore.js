// third party libs
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; 

// app libs
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware (
  thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}