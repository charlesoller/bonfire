import styles from "./NewServerModal.module.css"
import { useState } from "react";
import { useDispatch} from "react-redux";
import { addNewServer, fetchAllServersThunk, updateOldServer, deleteAServer } from "../../redux/server";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";

function NewServerModal({server, formType}) {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState(server ? server.name : "");
    const [serverDescription, setServerDescription] = useState(server ? server.description : "");
    const [serverImage, setServerImage] = useState(server ? server.server_images[0].url : "");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formType === "Update Server") {
            const serverResponse = dispatch(
                updateOldServer({
                    id: server.id,
                    name: serverName,
                    description: serverDescription,
                    server_image: serverImage,
                })
            );

            // if (serverResponse) {
            //     setErrors(serverResponse);
            // } else {
                socket.emit('server', { type: "edit", server });
                dispatch(fetchAllServersThunk());
                closeModal()
            // }
            

        } else {
            const serverResponse = dispatch(
                addNewServer({
                    name: serverName,
                    description: serverDescription,
                    server_image: serverImage,
                })
            );
    
            // if (serverResponse) {
            //     setErrors(serverResponse);
            // } else {
                socket.emit('server', { type: "add", server });
                dispatch(fetchAllServersThunk());
                closeModal()
            // }
        }
    };

    const deleteServer = async (e) => {
        e.preventDefault();
        dispatch(deleteAServer(server.id));
        socket.emit('server', { type: "delete", server });
        dispatch(fetchAllServersThunk());
        closeModal();
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
                <div className={styles.buttons}>
                    <button className={formType !== "Update Server" ? styles.hidden : styles.deleteButton} onClick={deleteServer}>Delete Server</button> 
                    <button type="submit" className={`${styles.createServerButton} ${formType !== "Update Server" ? styles.fullWidth : undefined}`}>{formType === "Update Server" ? "Update" : "Create"}</button>
                </div>

            </form>
        </div>
        </>
    )
}

export default NewServerModal;