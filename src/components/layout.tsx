import { Link, Outlet } from "react-router-dom"
import { Button } from "./ui/button"
import { List, Plus } from "lucide-react"

const Layout = () => {
    return (
        <div className="w-screen">
            <nav className="bg-blue-800 p-4 w-full">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-xl">
                        Personal Task Manager
                    </h1>
                    <div className="ml-auto flex gap-4">
                        <Button className="mr-2  py-1 bg-blue-500  text-white rounded  hover:bg-blue-700">
                        <Plus/>
                        <Link to="/add-task" > 
                                
                         Add New Task
                        </Link>
                        </Button>

                        <Button className="mr-2  py-1 bg-blue-500  text-white rounded  hover:bg-blue-700">
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
