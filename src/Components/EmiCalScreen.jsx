import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation';

function EmiCalScreen() {
  const [amount, setAmount] = useState(0);
  const [months, setMonths] = useState(0);
  const [monInterest, setMoninst] = useState(0);
  const [show, setShow] = useState(false);
  const [pay, setPay] = useState(0);
  const [result, setRes] = useState();
  const [data , setData] = useState(false);
  const [emiInfo, setEmiInfo] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem('user');
    setRes(JSON.parse(auth));
    if (!auth)
      window.location.reload(true);
  }, []);

  const calculate = async (e) => {
    const email = result.data.email;
    const userId = result.data._id;
    e.preventDefault();
    const emi = (amount * (monInterest * 0.01)) / months;
    const total = ((amount / months) + emi).toFixed(2);
    setPay(total);
    setShow(true);
    try {
      await axios.post('http://localhost:4500/emi/calemi', {
        userId,
        email,
        total: {
          amount,
          months,
          monInterest,
          total,
        },
      });
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }

  const getData = async() =>{
    try {
      const logemail = result.data.email;
      const res = await axios.get(`http://localhost:4500/emi/allemi/${logemail}`);
      setEmiInfo(res.data.total);
    } 
    catch (error) {
      toast.error(error);
    }
  }

  useEffect(()=>{
    getData();
  })

  

  const showTable = async() =>{
    getData();
    setData(true);
  }
  return (
    <>
    <Navigation/>
    {
      data ? <div className="fullScreen">
      <div className='emiDiv fullScreenCal'>
        <form onClick={showTable}>
          <label htmlFor="fname">Enter Amount</label><br />
          <input type="number" id="fname" name="firstname" value={amount} onChange={(e) => setAmount(e.target.value)} /><br /><br />

          <label htmlFor="lname">Enter Months</label><br />
          <input type="number" id="lname" name="lastname" value={months} onChange={(e) => setMonths(e.target.value)} /><br /><br />

          <label htmlFor="lname">Monthly Interest Rate</label><br />
          <input type="number" id="lname" name="lastname" value={monInterest} onChange={(e) => setMoninst(e.target.value)} /><br /><br />


          <input type="submit" value="Calculate" onClick={calculate} />
        </form>
        <div className='divEmi'>
          {
            (show) ? <h5 className='showEmi'>EMI : ₹ {pay}</h5> : <></>
          }
        </div>
      </div>
      <div className="tableDiv">
        <h4 className='tableHead'>Total EMI </h4>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr.No.</th>
          <th>Amount</th>
          <th>No. of Months</th>
          <th>Interest Rate</th>
          <th>Monthly EMI</th>
        </tr>
      </thead>
      <tbody>
        {
          emiInfo.map((item,index)=>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.amount}</td>
                <td>{item.months}</td>
                <td>{item.intrate}</td>
                <td>{item.emitotal}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
      </div>
      </div> 
      :
    <>
        <div className='emiDiv'>
      <form>
        <label htmlFor="fname">Enter Amount</label><br />
        <input type="number" id="fname" name="firstname"  value={amount} onChange={(e) => setAmount(e.target.value)} /><br /><br />

        <label htmlFor="lname">Enter Months</label><br />
        <input type="number" id="lname" name="lastname" value={months} onChange={(e) => setMonths(e.target.value)} /><br /><br />

        <label htmlFor="lname">Monthly Interest Rate</label><br />
        <input type="number" id="lname" name="lastname" value={monInterest} onChange={(e) => setMoninst(e.target.value)} /><br /><br />


        <input type="submit" value="Calculate" onClick={calculate} />
      </form>
      <div className='divEmi'>
        {
          (show) ? <h5 className='showEmi'>EMI : ₹ {pay}</h5> : <></>
        }
    </div> 
    </div>
    <div className="totalCount">
      <h4>Total EMI : {
                    (emiInfo.length < 10) ? <span>0{emiInfo.length}</span> : <span>{emiInfo.length}</span>
                    } </h4>
      <button className='btn see' onClick={showTable}>See All</button>
    </div>
    </>
    } 
    <ToastContainer />
    </>
  )
}

export default EmiCalScreen