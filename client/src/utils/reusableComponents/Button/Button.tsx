import { ReactNode } from "react"

type ButtonProps = {
    style?: Record<string, string>
    children: ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({ children, style, onClick }) => {
    return <button style={style} onClick={onClick}>
        {children}
    </button>
}