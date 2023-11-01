import FormContainer from "../components/FormContainer";
import {  Button } from "react-bootstrap";
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login,{isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state) => state.auth)

    useEffect(() => {
      if(userInfo){
        navigate('/')
      }
    },[userInfo, navigate])

    const {register, handleSubmit} = useForm()

    const onSubmit = async(data) => {
       try {
       const res =  await login(data).unwrap();
       dispatch(setCredentials({...res}))
       navigate('/')
       } catch (error) {
        toast.error(error.data.message )
       }
    }
    

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" style={{gap:'1rem'}}>
       <input type="text" placeholder="email" {...register('email')} className=""/>
       <input type="password" placeholder="password" {...register('password')}/>
       <Button type="submit">
        {isLoading ? 'loading' : 'submit'}
       </Button>
      </form>
    </FormContainer>

  )
}

export default Login