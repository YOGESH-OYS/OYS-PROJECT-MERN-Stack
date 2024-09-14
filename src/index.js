import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LinkedInLogin from './AUTHENTICATIONS/Linked';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const ro = ReactDOM.createRoot(document.getElementById('ro'));
ro.render(
  <React.StrictMode>
    <LinkedInLogin />
  </React.StrictMode>
);



// const bt = ReactDOM.createRoot(document.getElementById('bt'));
// bt.render(
//   <React.StrictMode>
//     <Ap />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
