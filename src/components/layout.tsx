import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="w-screen">
            <nav className="bg-blue-800 p-4 w-full">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-xl">
                        Personal Task Manager
                    </h1>
                    <div className="ml-auto flex gap-4">
                        <Link
                            to="/add-task"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Task
                        </Link>
                   
                        <Link
                            to="/task-page"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Task List
                        </Link>
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
