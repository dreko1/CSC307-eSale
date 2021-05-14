import React from 'react'
import {Button, Container} from '@material-ui/core';
import {useState} from 'react'
import makePostCall from './axiosMethods'
import Login from './Login'
import './App.css';

//We also need a SignUp element written similarly (with more info of course).
//This function returns the html element that is a login box.
function SignIn(props) {
    //Always use a use state.
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    
    //Updates the username property of the usestate, while keeping password the same.
    function updateUsername(event) {
        setUser({username: event.target.value, password: user['password']});
    }
    //Updates the password property of the usestate, while keeping username the same.
    function updatePassword(event) {
        setUser({username: user['username'], password: event.target.value});
    }
    //This function makes a post call, then has to-be-implemented logic based off of the response.
    //TODO
    function submitForm(){
        makePostCall('/login', user).then(response => {
            if(response.status==201){
                console.log("login request succeded");
                console.log(response);
            }else{
                console.log("login request failed");
            }
        });
	}

    function showLogin(){
        var box = document.getElementById("SignInBox");
        var login = box.children[1];
        var signup = box.children[2];
        signup.hidden = true;
        login.toggleAttribute("hidden")
    }

    function showSignUp(){
        var box = document.getElementById("SignInBox");
        var login = box.children[1];
        var signup = box.children[2];
        login.hidden = true;
        signup.toggleAttribute("hidden")
    }
    
    function continueAsGuest(){
        var box = document.getElementById("SignInBox");
        var login = box.children[1];
        var signup = box.children[2];
        login.hidden = true;
        signup.hidden = true;
        //To show the login window again, set this property to an empty string.
        box.style.display = "none";
    }

    //<Container/> is Material-UI's way of centering.
    //There are css properties in app.css that handle making the login box look pretty and float above the page.
    return (<Container>
        <div class="floatAbovePage">
            <div id="SignInBox">
                <div>
                    <Button variant="contained" onClick={showLogin}>Login</Button>
                    <Button variant="contained" onClick={showSignUp}>Sign Up</Button>
                    <Button variant="contained" onClick={continueAsGuest}>Continue As Guest</Button>
                </div>
                <div hidden><Login/></div>
                <div hidden><Login/></div>
            </div>
        </div>
    </Container>);
    //That second login in the right column will say SignUp when that's written.
}

export default SignIn;
