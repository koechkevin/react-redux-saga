import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducer';
import saga from './saga';


const sagaStore = ({ middlewares, saga }) => {
  const sagaMiddleware = createSagaMiddleware();
  const _ = [...middlewares, sagaMiddleware];
  const middleware = composeWithDevTools(applyMiddleware(..._));
  const store =  createStore(reducer, middleware);
  sagaMiddleware.run(saga);
  return store;
};

export default sagaStore({ middlewares: [logger], saga});
