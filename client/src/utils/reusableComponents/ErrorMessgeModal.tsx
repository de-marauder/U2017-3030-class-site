import { Modal } from "./Modal"

type ErrorMessageModalProps = {
    errorMessage: string
}

export const ErrorMessageModal: React.FC<ErrorMessageModalProps> = ({errorMessage}) => {
    return <Modal>
        <p style={{color: 'red'}}>{errorMessage}</p>
    </Modal>
}