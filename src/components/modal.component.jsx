import { useContext } from "react"
import { ChatbotContext } from "@/context"
import WarningIcon from '@mui/icons-material/Warning';


const Modal = () => {
    const {modal, handleCloseModal, deleteItem, handleDelete} = useContext(ChatbotContext);

    const onDeleteClick = async () => {
        await handleDelete(deleteItem);
    };

    const renderView = () => {
        if (modal) {
            return(
                <div style={{
                    zIndex:9,
                    backgroundColor:"rgba(128, 128, 128, 0.75)",
                    width:"100vw",
                    height:"100vh"
                }} className="absolute top-0 flex flex-col justify-center items-center backdrop-blur-sm">
                    <div className="bg-white relative w-[25%] p-4 rounded-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Seguro que deseas <span className="text-red-500 font-bold">ELIMINAR ITEM {deleteItem}</span>?</h4>
                                <button type="button" className="btn-close" onClick={()=>handleCloseModal()} aria-label="Close"></button>
                            </div>
                            <div className="modal-body pb-4">
                               <p className="m-5">Estas a punto de <span className="text-red-500 font-bold">ELIMINAR</span> un contenido potencialmente 
                                <span className="fw-bold"> importante. </span>¿Deseas <span className="text-red-500 font-bold">eliminar</span> de todas formas?</p>
                            </div>
                            <div className="modal-footer w-full flex justify-between">
                                <button type="button" className="btn bg-gray-500 text-white rounded-md p-2 " onClick={()=>handleCloseModal()}>Close</button>
                                <button type="button" className="btn bg-red-500 text-white rounded-md p-2" onClick={onDeleteClick}><WarningIcon />Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
  return (
    <>
    {renderView()}
    </>
  )
}

export default Modal