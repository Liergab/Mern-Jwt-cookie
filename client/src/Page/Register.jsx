import FormContainer from "../components/FormContainer"
import {useForm} from 'react-hook-form'
import { Button } from "react-bootstrap"
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { useRegisterMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate()
  const [registerData] = useRegisterMutation()
  const Schema = yup.object().shape({
    username:yup.string().required('Username is Required!'),
    email: yup.string().email().required('Email is Required!'),
    password: yup.string().required('password is Required').max(12).min(6),
    ConfirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password does not match').required('password does not match!')

  })
    const {register, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(Schema)})
    
    const onSubmit = async(data) => {
        try {
          await registerData(data)
          navigate('/login')
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" style={{gap:'1rem'}}>
       <input type="text" placeholder="username" {...register('username')} className=""/>
       {errors.username && <span>{errors.username.message}</span>}
       <input type="text" placeholder="email" {...register('email')} className=""/>
       {errors.email && <span>{errors.email.message}</span>}
       <input type="password" placeholder="password" {...register('password')}/>
       {errors.password && <span>{errors.password.message}</span>}
       <input type="password" placeholder="Confirm Password" {...register('ConfirmPassword')}/>
       {errors.ConfirmPassword && <span>{errors.ConfirmPassword.message}</span>}
       <Button type="submit">
        sign Up
       </Button>
      </form>
    </FormContainer>
  )
}

export default Register
