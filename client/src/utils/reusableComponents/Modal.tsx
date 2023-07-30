import { ReactNode } from "react"

export const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <Backdrop />
            <div>
                {children}
            </div>
        </div>
    )
}

const Backdrop = () => {
    return <div></div>
}