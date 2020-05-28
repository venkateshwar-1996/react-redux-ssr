import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import renderer from "./helpers/renderer";
import Routes from "./client/Routes/Routes";
import createStore from "./helpers/createStore";

const app = express();
app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore();

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });
  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("listeing to PORT " + PORT);
});
