import React from "react";
import { Button, Form,Alert } from "react-bootstrap";
//Used for redirecting
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import pic from "./images/remove.png";

function Login(props){
    const navigate = useNavigate();

    const [login,setLogin]=React.useState({
        username:"",
        password:""
    });

    const [error,setError]=React.useState("");
    const [isError,setIsError]=React.useState(false);

    function handleChange(event){
        const name=event.target.name;
        const value=event.target.value;
        
        setLogin(prev =>{
          if(name==="username"){
           return{
            username:value,
            password:prev.password
           };
          }
          else if(name==="password"){
            return{
                username:prev.username,
                password:value,
            };
          }
        });
    }

    function handleSubmit(event){
        event.preventDefault();

        fetch("http://localhost:3001/log-in",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            username:login.username,
            password:login.password
            })
        }).then(response => response.json())
        .then((result) => {
            // result.data===0? setError("Log In Failed! Try Again!"):navigate("/view");
            if(result.data===0){
                setError("Log In Failed! Try Again!");
                setIsError(true);
            }else{
                navigate("/");
                localStorage.setItem('user',login.username );
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        //Clearing Data after submitting it to server
        setLogin({
            username:"",
            password:""
        });
        
    }

    return(
        <div className="animate__animated animate__fadeIn">
        {/* <NavBar /> */}
        <Form className="login" onSubmit={handleSubmit}>
        <Form.Label className="formLabel" style={{fontSize:30 }}>F I N A N Z A</Form.Label>
            <Form.Group className="mb-3" controlId="Username">
                <Form.Label className="formLabel" style={{fontSize:25 }}>Username</Form.Label>
                <Form.Control className="SLinputData" name="username" type="text" value={login.username} placeholder="Enter Username" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
                <Form.Label className="formLabel" style={{fontSize:25 }}>Password</Form.Label>
                <Form.Control  className="SLinputData" name="password" type="password" value={login.password} placeholder="Enter Password" onChange={handleChange}/>
            </Form.Group>

            <Button variant="light" type="submit" style={{fontSize:20 }}>
            Log In
            </Button>
            <p className="signUpLink animate__animated animate__heartBeat animate__delay-2s">
            <span>New to Finanza? </span>
            <a className="signLoginLink" href="/sign-up">Join Now</a>
            </p>
            {isError===true && <Alert variant={'danger'} className="Alert"><img src={pic} height={30} width={30} style={{marginRight:10}}/> {error}</Alert>}
        </Form>
        
        </div>
    );
}

export default Login;