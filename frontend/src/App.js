import './App.css';
import Header from './Header'
import Content from './Content';
import Sidebar from './Sidebar'
import SignIn from './Signin'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState } from 'react';

//I do not know how to present different html based on whether you are on the main page or some sub-page.
//Right now it just renders the main page (which only has <Login> at the moment)
//Eventually it will have something like a <Signin /> tag instead which gives options for new account, login, and continue as guest.
//This <Signin /> (or <Login />) floats above the main page, which also needs a .js file
//You can add <MainPage /> somewhere inside of the App div.



function App() {

    const [credentials, setCredentials] = useState({username: "",password: ""});
    const [listings, setListings] = useState([]);
    //I just put some random lorem ipsum text in there to make sure the sign in works. Remove it if you want.
    return (
    <div className="App" style={{display:'flex'}}>
        <CssBaseline />
        <SignIn onSuccess={(u,p) =>{setCredentials({username: u, password: p}); console.log(credentials)}}/>
        <Header credentials={credentials}/>
        <Sidebar setListings={setListings}/>
        <Content listings={listings}/>
    </div>
    );
}

export default App;
