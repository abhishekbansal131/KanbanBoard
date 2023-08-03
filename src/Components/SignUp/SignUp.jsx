import React, { useState } from "react";
import './SignUp.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SignUp = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [records, setRecords] = useState(JSON.parse(localStorage.getItem("userdata")) || []);
  const history = useHistory();




  const submitForm = (e) => {
    e.preventDefault();
    if(name.trim() === ""){
      alert("Please enter your name");
      return;
    }
    else if(!/^[a-zA-Z\s]+$/.test(name)){
      alert("Please enter a valid name");
      return;
    }
    const mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    }
    else if (!mailFormat.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (password.trim() === "") {
      alert("Please enter your password");
      return;
    }
    else if (password.length < 8) {
      alert("Password must be of at least 8 characters");
      return;
    }
    const objRecord = {
      name: name,
      email: email,
      password: password
    }
    let flag = 0;
    for (let i = 0; i < records.length; i++) {
      if (records[i].email === email) {
        alert("User Already Registered");
        flag = 1;
      }
    }
    if (flag === 0) {
      records.push(objRecord);
      setRecords(records);
      console.log(records);
      localStorage.setItem("userdata", JSON.stringify(records));
      alert("User Registered Successfully!!")
      history.push("/login")
    }
  }

  return (

    <>

      <div className="main-container">
        <form className="form-container">

          <div className="header">

            <h1 className="register-heading">

              Sign Up

            </h1>

          </div>

          <div className="input-field">

            <label htmlFor="name">Name:</label>

            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email</label>

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          </div>

          <div className="button-container">

            <button onClick={submitForm} className="submit-button">Register</button>

          </div>

          <p>Already a user... <a onClick={() => { history.push('/login') }}>Login</a></p>

        </form>

      </div>

    </>

  )

}

export default SignUp;