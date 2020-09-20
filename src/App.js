import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Search from "./components/pages/Seach";
import Fridge from "./components/pages/Fridge";
import About from "./components/pages/About";
import RecipeState from "./context/RecipeState";
import RecipeDetail from "./components/recipes/RecipeDetail";

function App() {
  return (
    <RecipeState>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/fridge" component={Fridge} />
            <Route exact path="/about" component={About} />
            <Route exact path="/:from/recipe/:id" component={RecipeDetail} />
          </Switch>
        </div>
      </Router>
    </RecipeState>
  );
}

export default App;
