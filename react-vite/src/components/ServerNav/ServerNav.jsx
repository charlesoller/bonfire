import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewServer } from "../../redux/server";
import styles from "./ServerNav.module.css"
import { FaUserCircle } from "react-icons/fa"
import { CiCirclePlus } from "react-icons/ci";

export default function ServerNav({ servers }){
    console.log("Servers: ", servers)
    const dispatch = useDispatch();

    const newServer = async (e) => {
        e.preventDefault();
        const server = {
            name: "Button Server",
            description: "This server was made by clicking a button",
            csrf_token: "ImEzMDQ0NzlkNjBjNDAyYzQ0MjRjODdjYmI2ZjdjMGMyYjRlNmM1NDMi.Zl_Bwg.xotKL4lt2YfZDcY5alI9Pr6Zk7o",
            server_image: "not/a/url.jpg"
        }
        console.log("NEW SERVER", server)
        dispatch(addNewServer(server))
    }

    return (
        <aside className={styles.serverNav}>
            <div className={styles.directMessageIcon}>
                <FaUserCircle size={40}/>
            </div>
            <button onClick={newServer}>
                <CiCirclePlus size={44}/>
            </button>
        </aside>
    )
}