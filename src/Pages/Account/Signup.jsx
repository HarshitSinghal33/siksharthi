import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { signupAsync } from '../../Redux/Slice/userAuthSlice'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword, recheckPassword } from '../../utils/formValidation';
import useRedirectChange from '../../hook/useRedirectChange'
import AuthFormContainer from '../../Component/Auth/AuthFormContainer'
import InputField from '../../Component/ui/InputField'
import Loader from '../../Component/Loader'

export default function Signup() {
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
        errMessage = 'Email is Already in use.'
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
    <AuthFormContainer
      submit={handleSubmit(onSubmit)}
      formName='Signup Here'
      isGoogleAuth={true}
      submitButtonText={'Create Account'}
      navigationDescription={'Already have an account?'}
      navigationPath={'/login'}
      navigationText={'Login'}
    >
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
    </AuthFormContainer>
  )
}