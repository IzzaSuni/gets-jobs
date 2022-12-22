import logo from "./logo.svg";
import "./App.scss";
import { useEffect } from "react";
import { getJobs } from "./services";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./pages/login";
import JobsList from "./pages/jobsList";
import Details from "./pages/jobDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <LoginPage />
          </Route>
          <Route exact path={"/jobs"}>
            <JobsList />
          </Route>
          <Route exact path={"/jobs/:id"}>
            <Details />
          </Route>
          <Route path="*">
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
