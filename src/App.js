import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";

//Import containers
import Home from "./containers/Home";
import ProductCreation from "./containers/ProductCreation";
import ProducerCreation from "./containers/ProducerCreation";
import CategoryCreation from "./containers/CategoryCreation";
import ProducerUpdate from "./containers/ProducerUpdate";

//Import components
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState();
  const [loged, setLoged] = useState(false);
  const loginOK = token => {
    setToken(token);
    Cookies.set("token", token);
    setLoged(true);
  };
  const unLog = () => {
    Cookies.remove("token");
    setToken(null);
    alert("déconnecté :(");
    setLoged(false);
  };

  const findTheCookie = async () => {
    const userToken = await Cookies.get("token");
    if (userToken) {
      setLoged(true);
      setToken(userToken);
    }
  };
  findTheCookie();

  return (
    <div>
      <Header loginOK={loginOK} loged={loged} unLog={unLog} />
      <Router>
        <Switch>
          {/* # # # # # # # # ROUTE FOR PRODUCER CREATION # # # # # # # # # */}
          <Route path="/producer_creation">
            <ProducerCreation token={token} />
          </Route>
          {/* # # # # # # # # ROUTE FOR PRODUCT CREATION # # # # # # # # # */}
          <Route path="/product_creation">
            <ProductCreation token={token} />
          </Route>

          {/* # # # # # # # # ROUTE FOR CATEGORY CREATION # # # # # # # # # */}
          <Route path="/category_creation">
            <CategoryCreation token={token} />
          </Route>

          {/* # # # # # # # # ROUTE FOR PRODUCER UPDATE # # # # # # # # # */}
          <Route path="/producer_update">
            <ProducerUpdate token={token} />
          </Route>

          {/* # # # # # # # # DEFAULT ROUTE : HOME * # # # # # # # # */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
