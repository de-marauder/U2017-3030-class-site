export const API_BASE_URL = `${import.meta.env.VITE_APP_API_BASE_URL_DEV}/api/v1`

export const matNoRegex = /^U201[7, 8]\/30300[0-6][0-9]$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
export const phoneNumberRegex = /^[0-9]+$/;

export const initialSignUpFormData = {
    email: '',
    matriculation_number: '',
    password: '',
    confirmPassword: ''
}

export const defaultUpdateUserMessage = 'Error updating user...'