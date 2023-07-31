import { Dispatch, SetStateAction } from "react";
import { GetUserAPIResponse, ObjectWithAnyProperties, TypeUser, UserFormData } from "./types";
import { emailRegex, matNoRegex, passwordRegex, phoneNumberRegex } from "./vars";

export const storeTokenAndUser = (user: TypeUser, token: string) => {
    window.localStorage.setItem("user", JSON.stringify(user))
    window.localStorage.setItem("token", token)
}

export const checkCanSubmit = ({ formData, setCanSubmit, setErrorMessage }: { formData: ObjectWithAnyProperties, setErrorMessage: Dispatch<SetStateAction<ObjectWithAnyProperties>>, setCanSubmit: Dispatch<SetStateAction<boolean>> }, { isLogin, isSignup, isUserDetails }: { isLogin?: boolean, isSignup?: boolean, isUserDetails?: boolean }) => {
    //Decouple cases better
    let errorMessageCounter = 0
    if (!emailRegex.test(formData.email as string)) { errorMessageCounter++; setErrorMessage((prevState) => { prevState.email = 'Email format incorrect'; return { ...prevState } }) } else { setErrorMessage((prevState) => { prevState.email = ''; return { ...prevState } }) }
    if (!matNoRegex.test(formData.matriculation_number as string)) { errorMessageCounter++; setErrorMessage((prevState) => { prevState.matriculation_number = 'Matriculation number format incorrect'; return { ...prevState } }) } else { setErrorMessage((prevState) => { prevState.matriculation_number = ''; return { ...prevState } }) }
    if (isLogin || isSignup) {
        if (!passwordRegex.test(formData.password as string) || (formData.password as string).length < 8) { errorMessageCounter++; setErrorMessage((prevState) => { prevState.password = 'Password must be alphanumeric and must be greater than 8 characters'; return { ...prevState } }) } else { setErrorMessage((prevState) => { prevState.password = ''; return { ...prevState } }) }
    }
    if (isUserDetails) {
        if (!phoneNumberRegex.test(formData.phone as string) || formData.phone.length !== 11) {
            errorMessageCounter++;
            setErrorMessage((prevState) => { prevState.phone = 'Phone number must be 11 characters all numbers'; return { ...prevState } })
        } else { setErrorMessage((prevState) => { prevState.phone = ''; return { ...prevState } }) }
    }
    if (isSignup) if (formData.password !== formData.confirmPassword) { errorMessageCounter++; setErrorMessage((prevState) => { prevState.confirmPassword = 'Password does not match'; return { ...prevState } }) } else { setErrorMessage((prevState) => { prevState.confirmPassword = ''; return { ...prevState } }) }
    console.log('errorMessageCounter: ', errorMessageCounter)
    if (errorMessageCounter === 0) { setCanSubmit(true); return true }
    setCanSubmit(false); return false
}

export const buildPayload = (data: UserFormData) => {
    return {
        firstName: data.first_name,
        otherName: data.other_name,
        lastName: data.last_name,
        dob: data.dob,
        lga: data.lga,
        state: data.state,
        phone: data.phone,
        email: data.email,
    }
}

export const formatDate = (date: string, config?: {normal?: boolean}) => {
    // new Date(date).toLocaleDateString()
    const da = new Date(date).toLocaleDateString().replace(/\//g, '-')
    const d = da.split('-')
    if (d[0].length === 1) d[0] = `0` + d[0]
    if (d[1].length === 1) d[1] = `0` + d[1]
    return config && config.normal ? `${d[1]}-${d[0]}-${d[2]}` : `${d[2]}-${d[0]}-${d[1]}`
}

export const setFormDataHelper = (response: GetUserAPIResponse, prevData: UserFormData) => {
    const newData: Partial<TypeUser> = {}
    for (const [k, v] of Object.entries(response.data.user)) {
        if (k in prevData) newData[k as keyof typeof newData] = v as string;
    }
    console.log('newData: ', newData)
    return {
        ...prevData,
        ...newData,
        first_name: response.data.user.firstName,
        last_name: response.data.user.lastName,
        other_name: response.data.user.otherName,
        matriculation_number: response.data.user.matNo,
        dob: newData.dob ? formatDate(newData.dob) : '',
    }
}

export const toTitleCase = (s: string) => {
    return s.replace(/(?:^|\s|_)\w/g, (match) => match.replace(/_/g, ' ').toUpperCase())
}