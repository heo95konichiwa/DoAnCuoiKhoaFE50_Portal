import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/css/bootstrap.min.scss'
import './assets/css/open-sans.scss'
import './assets/css/simple-line-icon.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import './i18n'

ReactDOM.render(
  // <React.StrictMode>

  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
