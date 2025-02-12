import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom"
import Layout from "./components/layout"
import TaskListPage from "./pages/task-page"
import TaskPage from "./pages/task-page"

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<TaskListPage />} />
                <Route path="/tasks" element={<TaskListPage />} />
                <Route path="/task-page" element={<TaskPage />} />
                
            </Route>
        )
    )

    return <RouterProvider router={router} />
}

export default App