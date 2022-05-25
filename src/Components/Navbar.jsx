import React, { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {
  const [isLogin,setIsLogin]=React.useState(false);

  useEffect(() =>{
    checkLogin();
  },[]);

  function checkLogin(){
    if(localStorage.getItem('user')===null){
      setIsLogin(false);
    }else{
      setIsLogin(true);
    }
  }

  function logout(){
    localStorage.removeItem("user");
    checkLogin();
  }
  return (
    <Navbar className="navbr animate__animated animate__fadeInDown" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">F I N A N Z A</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isLogin && <Nav.Link className="item" href="/add">Account Master</Nav.Link>}
            {isLogin && <Nav.Link className="item" href="/view">View Records</Nav.Link>}
            {isLogin && <Nav.Link className="item" href="/edit">Edit Record</Nav.Link>}
            {isLogin && <Nav.Link className="item" href="/delete">Delete Record</Nav.Link>}
            {!isLogin && <Nav.Link className="item" href="/sign-up">Sign Up</Nav.Link>}
            {isLogin?<Nav.Link className="item" onClick={logout} href="/logout">Log Out</Nav.Link>:<Nav.Link className="item" href="/login">Log In</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
