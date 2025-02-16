import { Link, Outlet } from "react-router-dom"
import "../index.css"

const Layout = () => {
    return (
        <div>
            <nav className="bg-blue-800 p-4 w-full">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-xl">
                        Personal Task Manager
                    </h1>
                    
                 </div>
                
            </nav>

            <div className="container mx-auto my-6">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
