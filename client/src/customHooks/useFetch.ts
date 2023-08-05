// import { useEffect, useState } from "react"


// const useFetch = <ReturnDataType>(url: string, config: RequestInit) => {

//     const [data, setData] = useState<ReturnDataType>();
//     const [isLoading, setisLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('')

//     useEffect(() => {
//         setisLoading(true)
//         fetch(url, config).then(
//             (res) => res.json()
//         ).then((response) => {
//             if (response.status === 'failed') setError(response.message);
//             setData(response.data as ReturnDataType)
//             setisLoading(false)
//         })
//             .catch((err) => {
//                 setError(err.message || 'Something went wrong')
//             })
//     }, [])

//     return { data, isLoading, error }
// }