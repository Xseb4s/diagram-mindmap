import { createContext, useState } from "react";
import { DeleteInteract } from "@/services/interact.routes";

// eslint-disable-next-line react-refresh/only-export-components
export const ChatbotContext = createContext();


// eslint-disable-next-line react/prop-types
export const ChatbotProvider = ({children}) => {
    const [map, setMap] = useState('');
    const [modal, setModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(0);
    const [login, setLogin] = useState(false);
    

    const handleDelete = async (id) => {
        try {
            const {error} = await DeleteInteract(id);
            // console.log(data)
            if (error) {
                console.log(error);
                return;
            }
            alert('Item eliminado con exito');

        setModal(false);
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleOpenModal = (id) => {
        setModal(true);
        setDeleteItem(id);
    };

    const handleCloseModal = () => {
        setModal(false);
        setDeleteItem([]);
    };

    return(
        <>
            <ChatbotContext.Provider value={{
                modal,
                setModal,
                deleteItem,
                setDeleteItem,
                handleOpenModal,
                handleCloseModal,
                handleDelete,
                login,
                setLogin,
                map,
                setMap,            
            }}>
                {children}
            </ChatbotContext.Provider>
        </>
    )
}