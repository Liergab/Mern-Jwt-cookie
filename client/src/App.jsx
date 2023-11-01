import LandingPage from "./Page/LandingPage"
import Header from "./components/Header"
import {Route, Routes} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Register from "./Page/Register"
import Login from "./Page/login"
import {Toaster} from 'react-hot-toast'
import Profile from "./Page/Profile"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {

  return (
    <div className=''>
       <Header/>
       <Toaster position='top-right' toastOptions={{duration:2000}} />
       <Container className="my-2">
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile />} />
          </Route>
         
        </Routes>
       
       </Container>
     
    </div>
  )
}

export default App