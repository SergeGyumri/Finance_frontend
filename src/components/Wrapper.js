import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./Header";

function Wrapper(props) {
  const token = useSelector(store => store.users.token);
  if (!token) {
    return <Navigate to="/auth" replace/>
  }

  return (
    <div className={'wrapper'}>
      <Header/>
      {props.children}
    </div>
  );
}

export default Wrapper;
