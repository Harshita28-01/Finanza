import React from "react";
import { Button, Form,Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pic from "./images/checked.png";
function Delete(){
    const navigate = useNavigate();
    const [isLogin,setIsLogin]=React.useState(false);
    const [login,setLogin]=React.useState("");
    React.useEffect(() =>{
        checkLogin();
      },[])
  
    function checkLogin(){
        if(localStorage.getItem('user')===null){
            setIsLogin(false);
            navigate("/logout");
        }else{
            setIsLogin(true);
            setLogin(localStorage.getItem('user'));
        }
    }

    const [fullDelete,setFullDelete]=React.useState({
        acNo:"",
        certiNo:""
    });
    const [isDelete,setIsDelete]=React.useState(false);
    const [status,setStatus]=React.useState("");

    function handleCancel(){
        navigate("/view");
    }

    function handleChange(event){
        const name=event.target.name;
        const value=event.target.value;
    
        setFullDelete({
        ...fullDelete,
        [name]:value
        });
    }

    function handleSubmit(event){
        event.preventDefault();

        fetch("http://localhost:3001/delete",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            username:login,
            acNo:fullDelete.acNo,
            certiNo:fullDelete.certiNo
            })
        }).then(response => response.json())
        .then((data) =>{
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        //Clearing Data after submitting it to server
        setFullDelete({
            acNo:"",
            certiNo:""
        });
        setIsDelete(true);
        setStatus("Deleted Successfully!");
    }

    return(
        <div>
        { isLogin === true && (<div className="animate__animated animate__fadeIn">
        
        <Form className="deleteTab" onSubmit={handleSubmit}>
        <Form.Label className="formLabel" style={{fontSize:30 }}>Deletion Details</Form.Label>
        <Form.Group className="mb-3" controlId="acNo">
            <Form.Label className="formLabel" style={{fontSize:25 }}>Account Number</Form.Label>
            <Form.Control className="SLinputData" name="acNo" type="text" value={fullDelete.acNo} placeholder="Enter Account Number" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="certiNo">
            <Form.Label className="formLabel" style={{fontSize:25 }}>Certificate Number</Form.Label>
            <Form.Control  className="SLinputData" name="certiNo" type="text" value={fullDelete.certiNo} placeholder="Enter Certificate Number" onChange={handleChange}/>
        </Form.Group>

        {isDelete===false?(<Button className="deleteButton" variant="light" type="button" style={{fontSize:20,marginRight:10,marginTop:5 }} onClick={handleCancel}>
        Cancel
        </Button>):
        (<Button className="deleteButton" variant="light" type="button" style={{fontSize:20,marginRight:10, marginTop:5 }} onClick={handleCancel}>
        Back
        </Button>)}

        <Button className="deleteButton" variant="light" type="submit" style={{fontSize:20 ,marginTop:5}}>
        Delete
        </Button>
        
         {/* <p className="status">{status}</p> */}
        {isDelete===true && <Alert variant={'success'} className="Alert"><img src={pic} height={30} width={30} style={{marginRight:10}}/> {status}</Alert>}
        </Form>
        
        </div>)}
        </div>);
}

export default Delete;