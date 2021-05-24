import React from 'react'
import {Button, Popover, Card} from '@material-ui/core';
import {useState} from 'react'
import Signup from './Signup'
import Login from './Login'
import './App.css';

//This function returns the html element that is a login box.
function SignIn(props) {
    
    const [loginFormHidden, setLoginFormHidden] = useState(true);
    const [signupFormHidden, setSignupFormHidden] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    
    function showLogin(){
        setLoginFormHidden(!loginFormHidden);
        setSignupFormHidden(true);
    }

    function showSignUp(){
        setSignupFormHidden(!signupFormHidden);
        setLoginFormHidden(true);
    }
    
    return (
        <Popover
            open={isOpen}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <div>
                <Button style={{margin: "10px 10px 10px 10px"}} variant="contained" onClick={() => showLogin()}>Login</Button>
                <Button style={{margin: "10px 10px 10px 0px"}} variant="contained" onClick={() => showSignUp()}>Sign Up</Button>
                <Button style={{margin: "10px 10px 10px 0px"}} variant="contained" onClick={() => setIsOpen(false)}>Continue As Guest</Button>
            </div>
            <div hidden={loginFormHidden}><Login/></div>
            <div hidden={signupFormHidden}><Signup/></div>
        </Popover>
    );
}
export default SignIn;
