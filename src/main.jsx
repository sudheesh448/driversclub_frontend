import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'; // Import Provider
import store from './Components/Redux/store.jsx'; // Import your Redux store


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode>, */}
  </Provider>
)
