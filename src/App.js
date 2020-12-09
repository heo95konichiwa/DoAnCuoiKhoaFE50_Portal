
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import React, { Suspense } from 'react'
import Login from "./pages/login"
import BanLamViec from "./pages/banlamviec"
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/dang-nhap" component={Login}>
              </Route>
              <PrivateRoute exact path="/ban-lam-viec" component={BanLamViec}>
              </PrivateRoute>
              <Route exact path="/" component={Login}>
                <Redirect to="/dang-nhap"></Redirect>
              </Route>
            </Switch>
          </BrowserRouter>
        </Suspense>
    </>
  );
}

export default App;
