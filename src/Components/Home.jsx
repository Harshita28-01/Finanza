import React from "react";
import NavBar from "./Navbar";
import pic from "./images/photo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Home(){
    const navigate = useNavigate();
    const [isLogin,setIsLogin]=React.useState(false);

  React.useEffect(() =>{
    checkLogin();
  },[]);

  function checkLogin(){
    if(localStorage.getItem('user')===null){
      setIsLogin(false);
    }else{
      setIsLogin(true);
    }
  }
  function handleButton(){
      navigate("/sign-up");
  }
    return <div>
        <NavBar />
        <div>
            <img className="homePic animate__animated animate__fadeInLeft" src={pic} height={400} width={400} alt=" " />
            <h3 className="homeTitle animate__animated animate__flipInX">F I N A N Z A</h3>
            <p className="desc animate__animated animate__fadeInUp  animate__delay-1s">This is an application which can help you manage with your bank services, may it be Fixed Deposit or saving account. It sorts your records according to the date of maturity so that you can easily track them and take the required action.</p>
        </div>
        {!isLogin && <Button className="homeButton animate__animated animate__fadeInUp animate__delay-1s" size="lg" variant="dark" type="submit" onClick={handleButton}>
        LET'S GET STARTED
    </Button>}
    </div>
}

export default Home;