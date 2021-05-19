import React from 'react'
import {Button, TextField, Container} from '@material-ui/core';
import {useState} from 'react'
import makePostCall from './axiosMethods'
import './App.css';
import ReactDOM from 'react-dom'

//We also need a SignUp element written similarly (with more info of course).
//This function returns the html element that is a login box.
function Login(props) {
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
                        onChange={updateUsername} // <- This line and the following one are how we will handle use states.
                        value={user.username} // <- The format is readable and it can be used on any element.
                    required/>
                    <br/>
                    <TextField type="password"
                        helperText="Password"
                        onChange={updatePassword}
                        value={user.password}
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
