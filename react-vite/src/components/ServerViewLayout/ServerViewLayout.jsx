import { Outlet } from "react-router-dom"

export default function ServerViewLayout(){
    return (
        <main>
            <h1>Layout</h1>
            <Outlet />
        </main>
    )
}