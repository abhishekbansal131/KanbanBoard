import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Protected(props) {
    const {Component} = props;
    const history = useHistory();
    useEffect(()=>{
        localStorage.getItem("userCredentials") === null ? history.push('/login') : history.push('/')
    })
  return (
    <>
    <Component/>
    </>
  )
}

export default Protected