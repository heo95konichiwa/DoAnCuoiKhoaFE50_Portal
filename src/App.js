
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import React, { Suspense } from 'react'
import PrivateRoute from './PrivateRoute'
import Login from './pages/login'
import BanLamViec from './pages/banlamviec'
import DanhSachPhim from './pages/danhsachphim'
import HeThongRap from './pages/hethongrap'
import DanhSachTaiKhoan from './pages/taikhoan'

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
              <PrivateRoute exact path="/danh-sach-phim" component={DanhSachPhim}>
              </PrivateRoute>
              <PrivateRoute exact path="/he-thong-rap" component={HeThongRap}>
              </PrivateRoute>
              <PrivateRoute exact path="/danh-sach-tai-khoan" component={DanhSachTaiKhoan}>
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
