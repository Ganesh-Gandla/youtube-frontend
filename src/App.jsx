// src/App.jsx
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { loadUserFromStorage } from "./redux/authSlice";
import { Outlet } from "react-router-dom";

function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  return <Outlet />;
}

function App() {
  return (
    <Provider store={store}>
      <AuthLoader />
    </Provider>
  );
}

export default App;
