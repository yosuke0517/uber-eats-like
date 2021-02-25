import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// components
import { Restaurants } from './containers/Restaurants.jsx';
import { Foods } from './containers/Foods.jsx';
import { Orders } from './containers/Orders.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          // 店舗一覧ページ
          <Route
              exact
              path="/">
            <Restaurants />
          </Route>
          // フード一覧ページ
          <Route
              exact
              path="/restaurants/:restaurantsId/foods"
              render={({match}) =>
                  <Foods match={match}/>
              }
          >
          </Route>
          // 注文ページ
          <Route
              exact
              path="/orders">
            <Orders />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
