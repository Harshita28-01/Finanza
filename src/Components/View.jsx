import React,{useEffect} from "react";
import {Table} from "react-bootstrap";
import NavBar from "./Navbar";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import pic from "./images/money.png";

function View(){
  const navigate = useNavigate();
  const [isLogin,setIsLogin]=React.useState(false);
  const [login,setLogin]=React.useState("");
  const [data, setData] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [query,setQuery] = React.useState("");

    useEffect(() => {
       fetch("http://localhost:3001/stored-data")
       .then(res=>res.json())
       .then(data =>{
          setData(data);
          if(data.length===0){
            setIsEmpty(true);
            console.log(data);
          }else{
            setIsEmpty(false);
          }
       });
    },[])

    useEffect(() =>{
      checkLogin()
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

    return(
      <div>
      <NavBar />
      {isLogin===true && (<div>
        {isEmpty===true? (<div>
        <img src={pic} className="emptyPic animate__animated animate__fadeIn" height={400} width={400}/>
        <h3 className="emptyText animate__animated animate__fadeInUp animate__delay-1s">No Records Available!</h3> 
        </div>) : (
        <div>
        <div className="searchBox">
        <input className="searchBar animate__animated animate__fadeInUp" placeholder="Search Bank Name" onChange={event => setQuery(event.target.value)}/>
        </div>
        <Table className="table animate__animated animate__fadeInUp" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Certificate Number</th>
            <th>Account Holder Name</th>
            <th>Customer Id</th>
            <th>Joint Account Holder Name</th>
            <th>Joint Customer Id</th>
            <th>Bank Name/Address</th>
            <th>Initial Amount</th>
            <th>Date Of Issue</th>
            <th>Date Of Maturity</th>
            <th>Rate Of Interest</th>
            <th>Type Of Account</th>
            <th>Nominee Name</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(record => {
              if (record.username.indexOf(login)>-1){
                if(query === '') {
                  return record;
                } 
                else if (record.bankNameAdd.toLowerCase().includes(query.toLowerCase())) {
                  return record;
                }
              }
          }).map((record) => (            
            <tr>
              <th>{record.acNo}</th>
              <th>{record.certiNo}</th>
              <th>{record.acHolder}</th>
              <th>{record.custId}</th>
              <th>{record.jointAcHolder}</th>
              <th>{record.jointCustId}</th>
              <th>{record.bankNameAdd}</th>
              <th>{record.amount}</th>
              <th className="date">{moment(record.DOI).format('L')}</th>
              <th className="date">{moment(record.DOM).format('L')}</th>
              <th>{record.ROI}</th>
              <th>{record.typeAc}</th>
              <th>{record.nominee}</th>
            </tr>
          ))}
        </tbody>
    </Table>
    {/* <Button className="edit animate__animated animate__fadeInLeft animate__delay-1s" variant="dark" type="submit" onClick={handleEdit}>
      Edit
    </Button>
    <Button className="delete animate__animated animate__fadeInRight animate__delay-1s" variant="dark" type="submit" onClick={handleDelete}>
      Delete
    </Button> */}
      </div> )}
    </div>)}
    </div>);
}

export default View;