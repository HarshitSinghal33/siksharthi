import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { signupAsync, isLoading } from '../../Redux/Slice/userAuthSlice'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword, recheckPassword } from '../../utils/formValidation';
import useRedirectChange from '../../hook/useRedirectChange'
import GoogleAuth from '../../Component/Auth/GoogleAuth'
import FormContainer from '../../Component/Form/FormContainer'
import SubmitBtn from '../../Component/Form/SubmitBtn'
import InputField from '../../Component/Form/InputField'
import Loader from '../../Component/Loaders/Loader'

export default function Signup() {
  const isLoad = useSelector(isLoading)
  const navigate = useNavigate()
  const isRedirectLoading = useRedirectChange()
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    email: validateEmail(),
    password: validatePassword(),
    confirmPassword: recheckPassword()
  })

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ email, password } = data) => {
    try {
      await dispatch(signupAsync({ email, password })).unwrap();
      navigate('/')
    } catch (error) {
      let errMessage;
      if (error === "auth/invalid-email") {
        errMessage = 'Enter a valid email!'
      } else if (error === "auth/email-already-in-use") {
        errMessage = 'Email is Already in use. Try another one!'
      } else {
        errMessage = 'An error occurred! Please contact to developer.'
      }
      setError('email', {
        type: 'manual',
        message: errMessage,
      })
    }
  }


  if (isRedirectLoading) return <Loader />


  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[90%]'>
        <h3 className='text-center'>Signup Here</h3>
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

        <InputField
          label={'Confirm Password'}
          register={register('confirmPassword')}
          error={errors.confirmPassword}
          type={'password'}
          name={'confirm passwordfield'}
          placeHolder={'Confirm your Password'}
        />

        <SubmitBtn name={'Create Account'} isLoad={isLoad}/>
        <GoogleAuth />
        <div className='text-center'>
          <span>Already have an account? </span>
          <Link to={'/login'} className='underline'>Login</Link>
        </div>
      </form>
    </FormContainer>
  )
}
