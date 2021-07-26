import React, { useEffect } from "react";
import { notification } from "antd";
import { useAppSelector } from "./app/hooks";
import { selectToastProps } from "./common/Toast/selector";
import { Employees } from "./pages";

function App() {
  const toastProps = useAppSelector(selectToastProps);

  useEffect(() => {
    const { isOpen, ...props } = toastProps;
    isOpen && notification.open(props);
  }, [toastProps]);

  return (
    <div className="App">
      <Employees />
    </div>
  );
}

export default App;
