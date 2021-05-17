import React from 'react'
import {Button, TextField, Container} from '@material-ui/core';
import {useState} from 'react'
import makePostCall from './axiosMethods'
import './App.css';

//We also need a SignUp element written similarly (with more info of course).
//This function returns the html element that is a login box.
function Login(props) {
    //Always use a use state.
    const [user, setUser] = useState({
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
    });
    
    //Updates one property of the usestate, and then checks for errors.
    function updateProperty(property, value){
        var stateCopy = Object.assign({}, user);
        stateCopy[property] = value;
        if(stateCopy["password"].length>=6){
            stateCopy["passwordError"] = "";
        }
        if(stateCopy["username"]!=""){
            stateCopy["usernameError"] = "";
        }
        setUser(stateCopy);
    }

    //This function makes a post call, then has to-be-implemented logic based off of the response.
    //TODO
    function submitForm(){
        if(user.username==""){
            updateProperty("usernameError", "Must provide a username");
            return;
        }else if(user.password.length<6){
            updateProperty("passwordError", "Password must be at least 6 characters");
            return;
        }
        makePostCall('/login', user).then(response => {
            if(response.status==201){
                console.log("login request succeded");
                console.log(response);
            }else{
                console.log("login request failed");
                //TODO tell user why it failed. wrong password, non-existant username, etc.
            }
        });
	}

    //<Container/> is Material-UI's way of centering.
    return (<Container>
        <div>
            <h1>Login</h1>
            <form>
                <div class="container">
                    <TextField 
                        helperText="Username" 
                        onChange={(event) => updateProperty("username", event.target.value)} // <- This line and the following one are how we will handle use states.
                        value={user.username} // <- The format is readable and it can be used on any element.
                        error={user.usernameError}
                        title={user.usernameError}
                    required/>
                    <br/>
                    <TextField type="password"
                        helperText="Password"
                        onChange={(event) => updateProperty("password", event.target.value)}
                        value={user.password}
                        error={user.passwordError}
                        title={user.passwordError}
                    required/>
                    <br/><br/>
                    <Button variant="contained" onClick={submitForm}>Login</Button>
                    <br/>
                </div> 
            </form>
        </div>
    </Container>);
}



export default Login;
