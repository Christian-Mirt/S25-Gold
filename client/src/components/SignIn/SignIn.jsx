import './SignIn.css'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  return( 
    <>
    <div className = "loginInfo">
      <form action = "">
        <h1 className = "loginHeader">Login</h1>
        <input type = "text" placeholder='Username' required className = "user"></input><br/>
        <input type = "password" placeholder='Password' required className = "pass"></input><br/><br />
        <label className = "remember"><input id="rememberme" name="rememberme" value="remember" type="checkbox"/>Remember Me</label><br/> 
        <a href = "#" className = "forgot">Forgot Password?</a>
      </form>
    </div>
    <h2 className = "subtitle">Let's find your next favorite study spot!</h2>
    <div className="card">
      <button type = "submit" className = "signBttn">Login</button>
    </div>
  </>
  )
}

export default SignIn;