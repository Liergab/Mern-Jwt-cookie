import { useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import {Button} from 'react-bootstrap';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [updatetheuser,{isLoading}] = useUpdateUserMutation()
  const schema = yup.object().shape({
    username:yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required('password is Required').max(12).min(6),
    ConfirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password does not match').required('password does not match!')
  })
    const {userInfo} = useSelector((state) => state.auth)

    const{handleSubmit,control, formState:{errors}} = useForm({resolver:yupResolver(schema)})
    const onSubmit = async(data) => {
      console.log(data)
      try {
       const res =  await updatetheuser(data).unwrap()
        dispatch(setCredentials({...res}))
        navigate('/')
        toast.success('Update successfull')
      } catch (error) {
        toast.error(error.data.message)
      }
    }

    
  return (
   <FormContainer>
     <h1>Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" style={{gap:'1rem'}}>
      <Controller 
      name="username"
      control={control}
      defaultValue={userInfo?.username}
      render={({field}) => (
          <input 
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
      )}
      />
       {errors.username && <span>{errors.username.message}</span>}
       <Controller 
      name="email"
      control={control}
      defaultValue={userInfo?.email}
      render={({field}) => (
          <input 
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
      )}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <Controller 
      name="password"
      control={control}
      defaultValue='password'
      render={({field}) => (
          <input 
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
      )}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <Controller 
      name="ConfirmPassword"
      control={control}
      defaultValue='Confirm Password'
      render={({field}) => (
          <input 
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
      )}
      />
      {errors.ConfirmPassword && <span>{errors.ConfirmPassword.message}</span>}
       <Button type="submit">
        {isLoading ? <span>Loading..</span> : 'update'}
       </Button>
      </form>
   </FormContainer>
  )
}

export default Profile
