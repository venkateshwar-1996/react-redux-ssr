import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../Client/reducers";

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  console.log({ store: store.getState() });

  return store;
};
