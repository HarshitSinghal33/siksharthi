import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordAsync } from '../../Redux/Slice/userAuthSlice'
import { useDispatch } from 'react-redux'
import { validateEmail } from '../../utils/formValidation'
import { toast } from 'react-toastify'
import InputField from '../../Component/ui/InputField'
import AuthFormContainer from '../../Component/Auth/AuthFormContainer'

export default function ForgetPassword() {
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        email: validateEmail()
    })

    const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            await dispatch(changePasswordAsync(data.email)).unwrap();
            toast.success('Email send successfully.')
            setValue('email', '')
        } catch (error) {
            const errMessage =
                error === "auth/invalid-email"
                    ? 'Enter a valid email!'
                    : 'An error occurred! Please contact to developer.';
            setError('email', {
                type: 'manual',
                message: errMessage,
            })
        }

    }

    return (
        <AuthFormContainer
            submit={handleSubmit(onSubmit)}
            formName={'Forget Password'}
            submitButtonText={'Send Email'}
            navigationPath={'/login'}
            navigationDescription={'Back to'}
            navigationText={'Login!'}
        >
            <InputField
                label={'Email'}
                register={register('email')}
                error={errors.email}
                type={'email'}
                name={'emailfield'}
                placeHolder={'Youremail@email.com'}
            />
        </AuthFormContainer>
    )
}