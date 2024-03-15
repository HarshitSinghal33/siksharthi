import React from 'react'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordAsync, isLoading } from '../../Redux/Slice/userAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { validateEmail } from '../../utils/formValidation'
import { toast } from 'react-toastify'
import SubmitBtn from '../../Component/Form/SubmitBtn'
import InputField from '../../Component/Form/InputField'
import FormContainer from '../../Component/Form/FormContainer'

export default function ForgetPassword() {
    const isLoad = useSelector(isLoading)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        email: validateEmail()
    })

    const { register, handleSubmit, setError,setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            await dispatch(changePasswordAsync(data.email)).unwrap();
            toast.success('Email send successfully.')
            setValue('email','')
        } catch (error) {
            const errMessage = 
            error === "auth/invalid-email"
                ? 'Enter a valid email!'
                : 'An error occurred! Please conatct to developer.';
            setError('email', {
                type: 'manual',
                message: errMessage,
            })
        }

    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[90%]'>
                <h3 className='text-center'>Forget Password</h3>
                <InputField
                    label={'Email'}
                    register={register('email')}
                    error={errors.email}
                    type={'email'}
                    name={'emailfield'}
                    placeHolder={'Youremail@email.com'}
                />

                <SubmitBtn name={'Send Email'} isLoad={isLoad}/>

                <div className='text-center'>
                    <span>Back to </span>
                    <Link to={'/login'} className='underline'>Login!</Link>
                </div>
            </form>
        </FormContainer>
    )
}