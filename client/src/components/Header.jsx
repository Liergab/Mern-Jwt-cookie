import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
function Header() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state) => state.auth);
  const [ApiCall] = useLogoutMutation();
  
  const logoutHandler = async() => {
    try {
      await ApiCall().unwrap()
      dispatch(setCredentials(null))
      localStorage.removeItem('userInfo');
      if(userInfo){
        navigate('/login')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>Auth + Mern</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav>
              {userInfo ?(
              <> 
                <NavDropdown title={userInfo?.username} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
               ): (
                <> 
                  <LinkContainer to='/login'>
                        <Nav.Link>
                        <FaSignInAlt/> Sign in
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                        <Nav.Link >
                        <FaSignOutAlt/> Sign up
                        </Nav.Link>
                    </LinkContainer>
                  </>
                )}
               
                
            </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;