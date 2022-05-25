import React from "react";
import { Button, Form,Alert } from "react-bootstrap";
import NavBar from "./Navbar";
//Used for redirecting
import { useNavigate } from "react-router-dom";
import pic from "./images/remove.png";
function SignUp(){
    const navigate = useNavigate();
    const [isError,setIsError]=React.useState(false);
    const [signUp,setSignUp]=React.useState({
        username:"",
        password:"",
        confirmPassword:""
    });

    const [error,setError]=React.useState("");

    function handleChange(event){
        const name=event.target.name;
        const value=event.target.value;
        
        setSignUp(prev =>{
          if(name==="username"){
           return{
            username:value,
            password:prev.password,
            confirmPassword:prev.confirmPassword
           };
          }
          else if(name==="password"){
            return{
                username:prev.username,
                password:value,
                confirmPassword:prev.confirmPassword
            };
          }
          else if(name==="confirmPassword"){
            return{
                username:prev.username,
                password:prev.password,
                confirmPassword:value
            };
          }
        });
      }

    function handleSubmit(event){
        event.preventDefault();
        if(signUp.password===signUp.confirmPassword){
            fetch("http://localhost:3001/signUp",{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                username:signUp.username,
                password:signUp.password
            })
            }).then(response => response.json())
            .then((result) => {
                if(result.data===0){
                    setError("Already have a user with this username!");
                    setIsError(true);
                }else{
                    setError("");
                    localStorage.setItem('user',signUp.username );
                    navigate("/view");
                }
            })
            .catch((error) => {
            console.error('Error:', error);
            });
            //Clearing Data after submitting it to server
            setSignUp({
                username:"",
                password:"",
                confirmPassword:""
            });
        }
        else{
            setError("Your passwords do not match!");
            setSignUp((prev) => {
                return {username:prev.username,
                password:"",
                confirmPassword:""
            }});
        }
    }

    return(
        <div className="animate__animated animate__fadeIn">
        {/* <NavBar /> */}
        <Form className="signup" onSubmit={handleSubmit}>
        <Form.Label className="formLabel" style={{fontSize:30 }}>F I N A N Z A</Form.Label>
            <Form.Group className="mb-3" controlId="Username">
                <Form.Label className="formLabel" style={{fontSize:25 }} >Username</Form.Label>
                <Form.Control className="SLinputData" name="username" type="text" value={signUp.username} placeholder="Enter Username" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
                <Form.Label className="formLabel" style={{fontSize:25 }}>Password</Form.Label>
                <Form.Control  className="SLinputData" name="password" type="password" value={signUp.password} placeholder="Enter Password" onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label className="formLabel" style={{fontSize:25 }}>Confirm Password</Form.Label>
                <Form.Control className="SLinputData" name="confirmPassword" type="password" value={signUp.confirmPassword} placeholder="Confirm Password" onChange={handleChange}/>
            </Form.Group>

            <Button variant="light" type="submit" style={{fontSize:20 }}>
            Sign Up
            </Button>
            <p className="signUpLink animate__animated animate__heartBeat animate__delay-2s">
            <span>Already have an account? </span>
            <a className="signLoginLink" href="/login">Login</a>
            </p>
            {isError===true && <Alert variant={'danger'} className="Alert"><img src={pic} height={30} width={30} style={{marginRight:10}}/> {error}</Alert>}
        </Form>
        </div>
    );
}

export default SignUp;