import logo from './logo.svg';
import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
           <Routes>
              <Route path='/' element={<Navigate to='/login'/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/Home' element={<Home/>}/>
              <Route path='/add-product' element={<AddProduct/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
