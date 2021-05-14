import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function main(){
    //This is where you can add to the header of the document.
    //Add a <link/> to the Roboto font (What Google Material-UI prefers)
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
    document.head.appendChild(link);

    //Idk what this does
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
main();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
