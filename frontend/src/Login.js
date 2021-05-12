import React from 'react'
import './App.css';


function Login() {
  return (
<html>   
<head>  
<title> Login Page </title> 
</head>    
<body>    
    <center> <h1> eSale Login </h1> </center>   
    <form>  
        <div class="container">   
            <label>Username : </label>
			<input type="text" placeholder="Enter Username" name="username" required></input>
			<br></br>
            <label>Password : </label>   
			<input type="text" placeholder="Enter Password" name="password" required></input>
			<br></br>
            <button type="submit">Login</button>  
			<br></br>
        </div>   
    </form>     
</body>     
</html>    
  );
}


export default Login;
