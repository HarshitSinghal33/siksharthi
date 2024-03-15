import * as Yup from 'yup'

export const validateEmail = () => {
    return Yup.string().email("Invalid email address!").required('Email is required!')
}

export const validatePassword = () => {
    return Yup.string().required('Password is required!').trim().min(6, 'Password must be of 6 and more digit')
}

export const recheckPassword = () => {
    return Yup.string().required('Confirm your password').oneOf([Yup.ref('password')], 'Password must match')
}