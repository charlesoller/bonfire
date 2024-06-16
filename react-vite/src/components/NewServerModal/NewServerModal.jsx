import styles from "./NewServerModal.module.css"
import { useState } from "react";
import { useDispatch} from "react-redux";
import { addNewServer, fetchAllServersThunk, updateOldServer, deleteAServer } from "../../redux/server";
import { useModal } from "../../context/Modal";

function NewServerModal({server, formType}) {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState(server ? server.name : "");
    const [serverDescription, setServerDescription] = useState(server ? server.description : "");
    const [serverImage, setServerImage] = useState(server ? server.server_images[0].url : "");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    console.log("FORM TYPE", formType)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === "Update Server") {
            console.log("UPDATE SERVER", serverImage)
            const serverResponse = await dispatch(
                updateOldServer({
                    id: server.id,
                    name: serverName,
                    description: serverDescription,
                    server_image: serverImage,
                })
            );

            if (serverResponse) {
                setErrors(serverResponse);
            } else {
                closeModal()
            }
    
            dispatch(fetchAllServersThunk());
        } else {
            const serverResponse = dispatch(
                addNewServer({
                    name: serverName,
                    description: serverDescription,
                    server_image: serverImage,
                })
            );
    
            if (serverResponse) {
                setErrors(serverResponse);
            } else {
                closeModal()
            }
    
            dispatch(fetchAllServersThunk());
        }
    };

    const deleteServer = async (e) => {
        e.preventDefault();
        dispatch(deleteAServer(server.id));
        closeModal();
        dispatch(fetchAllServersThunk());
    }

    return (
        <>
        <div className={styles.modalLayout}>
            <h1>{formType !== "Update Server" ? "Create a Server" : "Update Your Server"}</h1>
            <form onSubmit={handleSubmit} className={styles.createServerForm}>
                <input
                    type="text"
                    className={styles.input}
                    value={serverName}
                    placeholder={"Name"}
                    onChange={(e) => setServerName(e.target.value)}
                    required
                />
                {errors.serverName && <p>{errors.serverName}</p>}
                <textarea
                    type="text"
                    className={styles.input}
                    value={serverDescription}
                    placeholder={"Description"}
                    onChange={(e) => setServerDescription(e.target.value)}
                />
                {errors.serverDescription && <p>{errors.serverDescription}</p>}
                <input
                    type="text"
                    className={styles.input}
                    value={serverImage}
                    placeholder={"Image URL"}
                    onChange={(e) => setServerImage(e.target.value)}
                />
                {errors.serverImage && <p>{errors.serverImage}</p>}
                <button type="submit" className={styles.createServerButton}>{formType === "Update Server" ? "Update" : "Create"}</button>
            </form>
            <form onSubmit={deleteServer}>
                <button type="submit" className={formType !== "Update Server" ? styles.hidden : ""}>Delete Server</button> 
            </form>
        </div>
        </>
    )
}

export default NewServerModal;