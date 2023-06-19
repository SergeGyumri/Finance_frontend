import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function WrapperLogOut(props) {
  const token = useSelector(store => store.users.token);
  const account = useSelector(store => store.users.account)

  if (token) {
    if (account.firstName) {
    }
    return <Navigate to="/history" replace/>
  }

  return (
    <div className={'wrapper'}>
      {props.children}
    </div>
  );
}

export default WrapperLogOut;
