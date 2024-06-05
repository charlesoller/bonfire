import { useSelector, useDispatch } from 'react-redux';
import { fetchAllServersThunk, clearServerDetails } from '../../redux/server';
import { useEffect } from 'react';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NewServerModal from "../NewServerModal/NewServerModal";
import styles from "./ServerNav.module.css"
import { FaUserCircle } from "react-icons/fa"
import { CiCirclePlus } from "react-icons/ci";

export default function ServerNav({ servers }){
    // console.log("Servers: ", servers)
    const dispatch = useDispatch();
    const listedServers = Object.values(useSelector(state => state.servers));

    useEffect(() => {
        dispatch(fetchAllServersThunk());

        return () => {
            dispatch(clearServerDetails());
        }
    }, [dispatch]);

    return (
        <aside className={styles.serverNav}>
            <div className={styles.directMessageIcon}>
                <FaUserCircle size={40}/>
            </div>
            {listedServers.map(server => {
                return (
                    <FaUserCircle size={44}/>
                )
            })}

            <OpenModalButton
                buttonText={<CiCirclePlus size={44}/>}
                modalComponent={<NewServerModal/>}
            />
        </aside>
    )
}