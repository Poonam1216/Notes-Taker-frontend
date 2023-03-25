import './App.css';
import Login from './component/login/login';
import Signup from './component/signup/signup';
import Navbar from './component/header/header'
import HomePage from './component/home/homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addnote from './component/addnote/addnote';
import ProtectedRoute from './component/protectedRoute/protectedRoute';


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<ProtectedRoute> <HomePage /></ProtectedRoute>} />
          <Route path="/addnote" element={<ProtectedRoute><Addnote /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
