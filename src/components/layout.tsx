import { Link, Outlet } from "react-router-dom"
import { List, Plus } from "lucide-react"
import { Button }from "antd";

const Layout = () => {
    return (
        <div className="w-screen">
            <nav className="bg-blue-800 p-4 w-full">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-xl">
                        Personal Task Manager
                    </h1>
                    <div className="ml-auto flex gap-4">
                        <Button type="primary" className="bg-blue-700">
                        <Plus/>
                        <Link to="/add-task" > 
                                
                         Add New Task
                        </Link>
                        </Button>

                        <Button type="primary" className="bg-blue-700">
                        <List/>
                        <Link  to="/task-page">      
                         Task List
                        </Link>
                        </Button>
                    </div>
                </div>
                
            </nav>

            <div className="container mx-auto my-6">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
