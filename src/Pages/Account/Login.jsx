import React from 'react'
import *  as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginAsync } from '../../Redux/Slice/userAuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/formValidation';
import AuthFormContainer from '../../Component/Auth/AuthFormContainer';
import InputField from '../../Component/ui/InputField';

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
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
      let errMessage;
      if(error === 'auth/user-not-found' || error === 'auth/wrong-password' || error === 'auth/invalid-credential'){
        errMessage = 'User not found! Please recheck your password and email'
      }else{
        errMessage = 'An error occurred! Please contact to developer.'
      }

      setError('email', {
        type: 'manual',
        message: errMessage,
      })
    }
  }

  return (
    <AuthFormContainer
      submit={handleSubmit(onSubmit)}
      formName={'Login Here'}
      submitButtonText={'Log In'}
      isGoogleAuth={true}
      navigationDescription={'Create a new Account!'}
      navigationPath={'/signup'}
      navigationText={'Signup'}
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

      <div className='text-center underline mb-3'>
        <Link to={'/forgetpassword'}>Forget Password?</Link>
      </div>
    </AuthFormContainer>
  )
}