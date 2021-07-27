import React, { useEffect } from "react";
import { notification } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectToastProps } from "./common/Toast/selector";
import { Employees, Counter } from "./pages";

function App() {
  const toastProps = useAppSelector(selectToastProps);

  useEffect(() => {
    const { isOpen, ...props } = toastProps;
    isOpen && notification.open(props);
  }, [toastProps]);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page1">Page1</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <div className="App">
            <Route exact path="/">
              <Employees />
            </Route>
            <Route path="/page1">
              <Counter />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
