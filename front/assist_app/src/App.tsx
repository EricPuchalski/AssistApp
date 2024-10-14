import CreateStudent from './admin/CreateStudent';
import Login from './admin/LogIn';
import Managment from './admin/Managment';
import UpdateStudent from './admin/UpdateStudent';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Managment/>} />
        <Route path='/students/new' element={<CreateStudent/>}></Route>
        <Route path='/students/edit' element={<UpdateStudent/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
