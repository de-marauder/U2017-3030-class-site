import { Modal } from "./Modal/Modal"

type ErrorMessageModalProps = {
    errorMessage: string;
    onClick: () => void
}

export const ErrorMessageModal: React.FC<ErrorMessageModalProps> = ({ errorMessage, onClick }) => {
    return (
        <Modal onClick={onClick}>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </Modal>
    )
}