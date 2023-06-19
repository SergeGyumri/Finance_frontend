import React from 'react';
import Auth from "./pages/Auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import History from "./pages/History";
import Verify from "./pages/Verify";
import Forgot from "./pages/Forgot";
import ResetPass from "./pages/ResetPass";
import DeletedHistory from "./pages/DeletedHistory";
import RepeatHistory from "./pages/RepeatHistory";
import Account from "./pages/Account";
import Password from "./pages/Password";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth"/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/repeat" element={<RepeatHistory/>}/>
        <Route path="/deleted" element={<DeletedHistory/>}/>
        <Route path="/settings" element={<Navigate to="account"/>}/>
        <Route path="/settings/account" element={<Account/>}/>
        <Route path="/settings/password" element={<Password/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/forgot-pass" element={<Forgot/>}/>
        <Route path="/reset-password" element={<ResetPass/>}/>
        <Route path="/*" element={<Navigate to=""/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
