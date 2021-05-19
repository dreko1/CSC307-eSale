import React from 'react'
import {Button, TextField, Container, unstable_createMuiStrictModeTheme} from '@material-ui/core';
import {useState} from 'react'
import makePostCall from './axiosMethods'
import './App.css';


//We also need a SignUp element written similarly (with more info of course).
//This function returns the html element that is a login box.
function Signup(props) {
    //Always use a use state.
    const [user, setUser] = useState({
        username: '',
        password: '',
        password2: '',
        email: '',
        usernameError: '',
        passwordError: '',
        password2Error: '',
        emailError: '',
    });
    
    //Updates some property of the usestate to a given value.
    function updateProperty(property, value){
        var stateCopy = Object.assign({}, user);
        stateCopy[property] = value;
        if(stateCopy["password"]!=stateCopy["password2"]){
            stateCopy["password2Error"] = "Passwords must match";
        }else{
            stateCopy["password2Error"] = "";
        }
        if(stateCopy["password"].length<6){
            stateCopy["passwordError"] = "Password must be at least 6 characters";
        }else{
            stateCopy["passwordError"] = "";
        }
        if(stateCopy["username"]!=""){
            stateCopy["usernameError"] = "";
        }
        if(stateCopy["email"].includes("@")){
            stateCopy["emailError"] = "";
        }else{
            stateCopy["emailError"] = "Must provide a valid email address";
        }
        setUser(stateCopy);
    }
    function handlePostError(errorField, errorMessage){
                    
        //updateProperty("usernameError", "User doesn't exist")
        //updateProperty("usernameError", "Must provide a username")
        //TODO handle why it failed (username taken, email taken, etc.)
    }
    //This function checks password equivalence, makes a post call, then has to-be-implemented logic based off of the response.
    //TODO
    function submitForm(){
        if(user.password!=user.password2){
            return;
        }else if(user.password.length<6){
            return;
        }else if(user.username==""){
            updateProperty("usernameError", "Must provide a username");
        }else if(!user.email.includes("@")){
            return;
        }else{
            makePostCall('/signup', user).then(response => {
                if(response.status==201){
                    console.log("signup request succeded");
                    console.log(response);
                    //send the username and password to the app to auto-login and hide the sign-in form.
                }else{
                    console.log("signup request failed");
                    //handlePostError(the_field_that_has_an_error, what_the_error_is);
                }
            });
        }
	}

    //<Container/> is Material-UI's way of centering.
    return (<Container>
        <div>
            <h1>Sign Up</h1>
            <form>
                <div class="container">
                    <TextField 
                        helperText="Choose Username" 
                        onChange={(event) => updateProperty("username", event.target.value)}
                        value={user.username}
                        error={user.usernameError}
                        title={user.usernameError}
                    required/>
                    <br/>
                    <TextField type="password"
                        helperText="Choose Password"
                        onChange={(event) => updateProperty("password", event.target.value)}
                        value={user.password}
                        error={user.passwordError}
                        title={user.passwordError}
                    required/>
                    <br/>
                    <TextField type="password"
                        helperText="Confirm Password"
                        onChange={(event) => updateProperty("password2", event.target.value)}
                        value={user.password2}
                        error={user.password2Error}
                        title={user.password2Error}
                    required/>
                    <br/>
                    <TextField
                        helperText="Enter Email"
                        onChange={(event) => updateProperty("email", event.target.value)}
                        value={user.email}
                        error={user.emailError}
                        title={user.emailError}
                    required/>
                    <br/><br/>
                    <Button variant="contained" onClick={submitForm}>Login</Button>
                    <br/>
                </div> 
            </form>
        </div>
    </Container>);
}



export default Signup;
