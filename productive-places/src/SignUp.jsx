import { useNavigate } from 'react-router-dom';
import './SignUp.css'

function SignUp(){
    const navigate = useNavigate();
    return (
        <>
          <h1 className = "Main_Title">Productive Places</h1>
          <div className = "nav_buttons">
            <button className = "Home" onClick = {() => {navigate("/")}}>Home</button>
            <button className = "search">Search by Filter</button>
            <button className = "places">Places</button>
            <button className = "contact">Contact</button>
            <button className = "signUp">Sign-Up</button>
            <button className = "signIn">Sign-in</button>
          </div>
          <input type="text" placeholder="Search.." class = "searchBttn"></input>
          <div className = "loginInfo">
            <form action = "">
              <h1 className = "signHeader">Sign Up</h1>
              <input type = "text" placeholder='Username' required class = "user"></input><br/>
              <input type = "text" placeholder='Password' required class = "pass"></input><br/><br />
              <label className = "remember"><input id="rememberme" name="rememberme" value="remember" type="checkbox"/>Remember Me</label><br/> 
              <a href = "#" class = "forgot">Forgot Password?</a>
            </form>
          </div>
          <h2 className = "subtitle">Let's find your next favorite study spot!</h2>
          <div className="card">
            <button type = "submit" className = "signBttn">Sign Up</button>
          </div>
        </>
      )
}

export default SignUp