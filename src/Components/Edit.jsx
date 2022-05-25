import React from "react";
import { Button, Form } from "react-bootstrap";
//Used for redirecting
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
function FormSub() {
  const navigate = useNavigate();
  const [isLogin,setIsLogin]=React.useState(false);
  const [login,setLogin]=React.useState("");
  const [fullBankDetail,setFullBankDetail]=React.useState({
    acNo:"",
    certiNo:"",
    acHolder:"",
    custId:"",
    jointAcHolder:"",
    jointCustId:"",
    bankNameAdd:"",
    amount:"",
    DOI:"",
    DOM:"",
    ROI:"",
    typeAc:"",
    nominee:""
  });

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

  //Joint ke liye
  const [isChecked,setIsChecked]=React.useState(false);

  //Nomination
  const [isNom,setIsNom]=React.useState(false);

  function handleCheckBoxChange(){
    setIsChecked(!isChecked);
  }

  function handleIsNom(){
    setIsNom(!isNom);
  }
  function handleChange(event){
    const name=event.target.name;
    const value=event.target.value;
    
    setFullBankDetail({
      ...fullBankDetail,
      [name]:value
    });
  }

  function handleSubmit(event){
    alert("A form was submitted: "+fullBankDetail.acHolder);

    event.preventDefault();
    fetch("http://localhost:3001/edit",{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username:login,
        acNo:fullBankDetail.acNo ,
        certiNo:fullBankDetail.certiNo ,
        acHolder:fullBankDetail.acHolder ,
        custId:fullBankDetail.custId,
        jointAcHolder:fullBankDetail.jointAcHolder,
        jointCustId:fullBankDetail.jointCustId,
        bankNameAdd: fullBankDetail.bankNameAdd,
        amount:fullBankDetail.amount,
        DOI:fullBankDetail.DOI,
        DOM:fullBankDetail.DOM,
        ROI:fullBankDetail.ROI,
        typeAc:fullBankDetail.typeAc,
        nominee:fullBankDetail.nominee
        })
    }).then(response => response.json())
    .then(() => {
      console.log('Success');
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    //Clearing Data after submitting it to server
    setFullBankDetail({
      acNo:"",
      certiNo:"",
      acHolder:"",
      custId:"",
      jointAcHolder:"",
      jointCustId:"",
      bankNameAdd:"",
      amount:"",
      DOI:"",
      DOM:"",
      ROI:"",
      typeAc:"",
      nominee:""
    });
    navigate("/view");
  }

  function handleCancel(){
    navigate("/view");
  }

  return (
    <div>
    {isLogin===true &&(<div> 
    <NavBar />     
    <Form className="formalign normalBackground animate__animated animate__fadeIn" onSubmit={handleSubmit}>
      <h2 className="formTitle">Account Details</h2>
      <hr></hr>
      <div className="row">
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formBasicAcNo">
        <Form.Label className="field">Account Number</Form.Label>
        <Form.Control className="inputData" name="acNo" type="text" value={fullBankDetail.acNo} placeholder="Enter Account Details" onChange={handleChange} required={true}/>
      </Form.Group>
      </div> 
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formBasicCertiNo">
        <Form.Label className="field">Certificate Number</Form.Label>
        <Form.Control  className="inputData" name="certiNo" type="text" value={fullBankDetail.certiNo} placeholder="Enter Certificate Number" onChange={handleChange} required={true}/>
      </Form.Group>
      </div> 
      </div>

      <div className="row">
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formBasicAcHolder">
        <Form.Label className="field">Account Holder Name</Form.Label>
        <Form.Control className="inputData" name="acHolder" type="text" value={fullBankDetail.acHolder} placeholder="Enter Account Holder Name" onChange={handleChange} required={true}/>
      </Form.Group>
      </div> 
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formBasicCustId">
        <Form.Label className="field">Customer Id</Form.Label>
        <Form.Control className="inputData" name="custId" type="text" value={fullBankDetail.custId} placeholder="Enter Customer Id" onChange={handleChange} required={true}/>
      </Form.Group>
      </div> 
      </div>

      <Form.Group className="mb-3" controlId="formBasicJoint">
        <Form.Check className="field" type="checkbox" label="Joint Account?" onChange={handleCheckBoxChange} />
      </Form.Group>

      {isChecked && (<div className="row">
      <div className="col m6"><Form.Group className="mb-3" controlId="formBasicJointAcHolder">
        <Form.Label className="field">Joint Account Holder Name</Form.Label>
        <Form.Control className="inputData" name="jointAcHolder" type="text" value={fullBankDetail.jointAcHolder} placeholder="Enter Joint Account Holder Name" onChange={handleChange} required={true} />
      </Form.Group>
      </div> 
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formBasicJointCustId">
        <Form.Label className="field">Joint Customer Id</Form.Label>
        <Form.Control className="inputData" name="jointCustId" type="text" value={fullBankDetail.jointCustId} placeholder="Enter Joint Customer Id" onChange={handleChange} required={true} />
      </Form.Group></div></div>)}

      <div className="row">
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formBankName">
        <Form.Label className="field">Bank Name/Address</Form.Label>
        <Form.Control className="inputData" name="bankNameAdd" type="text" value={fullBankDetail.bankNameAdd} placeholder="Enter Bank Name And Address" onChange={handleChange} required={true}/>
      </Form.Group>
      </div>
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formAmount">
        <Form.Label className="field">Initial Amount</Form.Label>
        <Form.Control className="inputData" name="amount" type="text" value={fullBankDetail.amount} placeholder="Enter Initial Amount" onChange={handleChange} required={true}/>
      </Form.Group>
      </div>
      </div>

      <div className="row">
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formDOI">
        <Form.Label className="field">Date Of Issue</Form.Label>
        <Form.Control className="inputData" name="DOI" type="date" value={fullBankDetail.DOI} placeholder="Enter Date Of Issue" onChange={handleChange} required={true}/>
      </Form.Group>
      </div>
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formDOM">
        <Form.Label className="field">Date Of Maturity</Form.Label>
        <Form.Control className="inputData" name="DOM" type="date" value={fullBankDetail.DOM} placeholder="Enter Date Of Maturity" onChange={handleChange} required={true}/>
      </Form.Group>
      </div>
      </div>

      <div className="row">
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formROI">
        <Form.Label className="field">Rate Of Interest</Form.Label>
        <Form.Control className="inputData" name="ROI" type="text" value={fullBankDetail.ROI} placeholder="Enter Rate Of Interest" onChange={handleChange} required={true}/>
      </Form.Group>
      </div>
      <div className="col m6">
      <Form.Group className="mb-3" controlId="formTypeAc">
        <Form.Label className="field">Type Of Account</Form.Label>
        <Form.Control className="inputData" name="typeAc" type="text" value={fullBankDetail.typeAc} placeholder="Enter Type Of Account" onChange={handleChange} required={true}/>
      </Form.Group>
      </div>
      </div>
      <Form.Group className="mb-3" controlId="formBasicNominee">
        <Form.Check className="field" type="checkbox" label="Nomination?" onChange={handleIsNom} />
      </Form.Group>
      
      {isNom && 
      <Form.Group className="mb-3" controlId="formBasicNominee">
        <Form.Label className="field">Nominee Name</Form.Label>
        <Form.Control className="inputData" name="nominee" type="text" value={fullBankDetail.nominee} placeholder="Enter Nominee Name" onChange={handleChange} required={true}/>
      </Form.Group>}
      
      <Button variant="dark" type="button" style={{marginRight:10 }} onClick={handleCancel}>
        Back
      </Button>
      <Button variant="dark" type="submit">
        Edit
      </Button>
    </Form></div>)}
    </div>
  );
}

export default FormSub;
