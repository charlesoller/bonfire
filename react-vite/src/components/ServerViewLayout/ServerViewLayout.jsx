import { Outlet } from "react-router-dom"
import ServerNav from "../ServerNav/ServerNav"
import ChannelNav from "../ChannelNav/ChannelNav"
import UserList from "../UserList/UserList"
import HeaderInfo from "../HeaderInfo/HeaderInfo"

import styles from "./ServerViewLayout.module.css"

export default function ServerViewLayout(){
    return (
        <main className={styles.body}> 
            <ServerNav />
            <ChannelNav />
            <section className={styles.main}>
                <HeaderInfo />
                <Outlet />
            </section>
            <UserList />
        </main>
    )
}