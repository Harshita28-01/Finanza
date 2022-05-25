import React from "react";
import NavBar from "./Navbar";

function Logout(){
    const [isLogin,setIsLogin]=React.useState(false);

    function checkLogin(){
        if(localStorage.getItem('user')===null){
          setIsLogin(false);
        }else{
          setIsLogin(true);
        }  
    }

    React.useEffect(() =>{
        checkLogin();
      },[])

    return(
    <div style={{textAlign:"center"}}>
    <NavBar />
    {isLogin===true?(
        <h1 className="logOut animate__animated animate__fadeInUp">You are already logged in!
        </h1>)
        :(<div className="animate__animated animate__fadeInUp">
        <h1 className="logOut">You have been logged out :(</h1>
        <h3>Would you like to continue?</h3>
        <a href="/login" style={{textDecoration:"none",fontSize:30,fontWeight:"bold"}}>Log in</a></div>)}
    </div>);
}

export default Logout;