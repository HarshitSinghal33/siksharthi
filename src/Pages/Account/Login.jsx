import React from 'react'
import *  as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginAsync,isLoading } from '../../Redux/Slice/userAuthSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/formValidation';
import useRedirectChange from '../../hook/useRedirectChange';
import FormContainer from '../../Component/Form/FormContainer';
import SubmitBtn from '../../Component/Form/SubmitBtn';
import InputField from '../../Component/Form/InputField';
import GoogleAuth from '../../Component/Auth/GoogleAuth';
import Loader from '../../Component/Loader';

export default function Login() {
  const navigate = useNavigate()
  const isLoad = useSelector(isLoading);
  const dispatch = useDispatch();
  const isRedirectLoading = useRedirectChange()
  const schema = yup.object().shape({
    email: validateEmail(),
    password: validatePassword(),
  })

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ email, password } = data) => {
    try {
      await dispatch(loginAsync({ email, password })).unwrap();
      navigate('/')
    } catch (error) {
      const errMessage = error === 'auth/invalid-credential'
        ? 'User not found! Please recheck your password and email'
        : 'An error occurred! Please conatct to developer.';

      setError('email', {
        type: 'manual',
        message: errMessage,
      })
    }
  }

  if (isRedirectLoading) return <Loader />;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[90%]'>
        <h3 className='text-center'>Login Here</h3>
        <InputField
          label={'Email'}
          register={register('email')}
          error={errors.email}
          type={'email'}
          name={'emailfield'}
          placeHolder={'Youremail@email.com'}
        />
        <InputField
          label={'Password'}
          register={register('password')}
          error={errors.password}
          type={'password'}
          name={'passwordfield'}
          placeHolder={'Your Password'}
        />

        <div className='text-center underline'>
          <Link to={'/forgetpassword'}>Forget Password?</Link>
        </div>
        <SubmitBtn name='Log In' isLoad={isLoad}/>
        <GoogleAuth />
      </form>
      <div className='text-center '>
        <span>Create a new Account! </span>
        <Link to={'/signup'} className='underline'>Signup</Link>
      </div>
    </FormContainer>
  )
}