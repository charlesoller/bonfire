import { useState } from "react";
import { useDispatch} from "react-redux";
import { addNewServer } from "../../redux/server";
import { useModal } from "../../context/Modal";

function NewServerModal() {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState("");
    const [serverDescription, setServerDescription] = useState("");
    const [serverImage, setServerImage] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            addNewServer({
                name: serverName,
                description: serverDescription,
                server_image: serverImage,
                csrf_token: "ImZiNDQ1Njc1OTFkNmRkM2MwOTllZDU4ZTQ2MThlYmJiMGRjZGE0YjUi.ZmDzRw.24RHXbr5qlG3aeLf-ICrUY6vVig"
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal()
        }
    };

    return (
        <>
            <h1>Create a Server</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        required
                    />
                </label>
                {errors.serverName && <p>{errors.email}</p>}
                <label>
                    Description
                    <input
                        type="text"
                        value={serverDescription}
                        onChange={(e) => setServerDescription(e.target.value)}
                    />
                </label>
                {errors.serverDescription && <p>{errors.serverDescription}</p>}
                <label>
                    Server Image
                    <input
                        type="text"
                        value={serverImage}
                        onChange={(e) => setServerImage(e.target.value)}
                    />
                </label>
                {errors.serverImage && <p>{errors.serverImage}</p>}
                <button type="submit">Create Server</button>
            </form>
        </>
    )
}

export default NewServerModal;