import React from 'react'
import {Button, TextField, Container} from '@material-ui/core';
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
    });
    
    //Updates some property of the usestate to a given value.
    function updateProperty(property, value){
        var stateCopy = Object.assign({}, user);
        stateCopy[property] = value;
        setUser(stateCopy);
    }
    //This function checks password equivalence, makes a post call, then has to-be-implemented logic based off of the response.
    //TODO
    function submitForm(){
        if(user.password!=user.password2){
            //TODO handle mismatched passowrds (also bad passwords, and invalid emails)
            return;
        }
        makePostCall('/signin', user).then(response => {
            if(response.status==201){
                console.log("login request succeded");
                console.log(response);
            }else{
                console.log("login request failed");
                //TODO handle why it failed (username taken, email taken, etc.)
            }
        });
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
                    required/>
                    <br/>
                    <TextField type="password"
                        helperText="Choose Password"
                        onChange={(event) => updateProperty("password", event.target.value)}
                        value={user.password}
                    required/>
                    <br/>
                    <TextField
                        helperText="Confirm Password"
                        onChange={(event) => updateProperty("password2", event.target.value)}
                        value={user.password2}
                    required/>
                    <br/>
                    <TextField
                        helperText="Enter Email"
                        onChange={(event) => updateProperty("email", event.target.value)}
                        value={user.email}
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
