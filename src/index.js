import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App'
import {
    SearchkitManager,
    SearchkitProvider
} from 'searchkit'


const sk = new SearchkitManager("http://demo.searchkit.co/api/movies/", {
})
console.log("move api",sk)

ReactDOM.render(
    <SearchkitProvider searchkit={sk}>
        <App/>
    </SearchkitProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
