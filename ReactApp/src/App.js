import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/pages/Footer/Footer";
import Home from "./components/pages/HomePage/Home";
import Services from "./components/pages/Services/Services";
import Products from "./components/pages/Products/Products";
import SignUp from "./components/pages/SignUp/SignUp";

import { Provider } from "react-redux";
import PostMessages from "./components/pages/PostMessages/PostMessages";
import { store } from "./actions/store";
import Auth from "./components/pages/Auth/Auth";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/products" component={Products} />
          <Route path="/postmessages" component={PostMessages} />
          <Route path="/sign-up" component={Auth} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
