export type TypeUser = {
    firstName: string,
    lastName: string,
    otherName: string,
    state: string,
    lga: string,
    dob: string,
    phone: string,
    matNo: string,
    email: string,
    img: string,
    password?: string
}
export type TypeUserWithId = TypeUser & { _id?: string }

export type SignUpData = Pick<TypeUser, 'matNo' | 'email'> & { password: string }
export type LoginData = Pick<TypeUser, 'matNo' | 'email'> & { password: string }


export type FormInputType = Pick<TypeUser, | 'email'> & { password: string, matriculation_number: string }

export type DefaultHeadersType = {
    'content-type'?: string,
    'authorization'?: string
}

export type ObjectWithAnyProperties = Record<string, string>

export type FailedResponse = { status: string, message: string }
export type GetUserAPIResponse = { data: { user: Required<TypeUserWithId> }, status: string, message?: string }

export type UserFormData = Partial<TypeUser> &
{
    first_name?: string,
    last_name?: string,
    other_name?: string,
    matriculation_number?: string,
    file?: string
}