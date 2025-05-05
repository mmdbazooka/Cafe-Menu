import { createBrowserRouter } from "react-router-dom";
import Home from "../../screens/Home";
import Details from "../../components/Details";
import Orders from "../../components/panel/Orders";
import AdminPanel from "../../components/panel/AdminPanel";
import AddItem from "../../components/panel/AddItem";
import DeleteItem from "../../components/panel/DeleteItem";
import EditItem from "../../components/panel/EditItem";
import EditSelectedItem from "../../components/panel/EditSelectedItem";
import UserDetials from "../../components/panel/UserDetials";
import AddCategory from "../../components/panel/AddCategory";
import DeleteCategory from "../../components/panel/DeleteCategory";
import Basket from "../../screens/Basket";
import Login from "../../screens/Login";


const AdminRouter = createBrowserRouter([
    {
        path : "/" ,
        element : <Home />,
        children : [
            { 
                path : "/" , 
                element : <Details />
            },
            { 
                path : "/:address" , 
                element : <Details />
            },
        ]
    },
    { 
        path : "/basket" , 
        element : <Basket />
    },
    { 
        path : "/adminPanel" , 
        element : <AdminPanel />,
        children : [
            {
                path : "/adminPanel/add-category",
                element : <AddCategory/>
            },
            {
                path : "/adminPanel/delete-category",
                element : <DeleteCategory />
            },
            {
                path : "/adminPanel/add-item",
                element : <AddItem/>
            },
            {
                path : "/adminPanel/delete-item",
                element : <DeleteItem />
            },
            {
                path : "/adminPanel/edit-item",
                element : <EditItem /> , 
            },
            {
                path : "/adminPanel/edit/:id",
                element : <EditSelectedItem /> , 
            },
            { 
                path : "/adminPanel/orders" , 
                element : <Orders />
            },
            { 
                path : "/adminPanel/orders/:id" , 
                element : <UserDetials />
            },
        ]
    },
])


const Router = createBrowserRouter([
    {
        path : "/" ,
        element : <Home />,
        children : [
            { 
                path : "/" , 
                element : <Details />
            },
            { 
                path : "/:address" , 
                element : <Details />
            },
        ]
    },
    { 
        path : "/login" , 
        element : <Login />
    },
    { 
        path : "/basket" , 
        element : <Basket />
    },
])

export { AdminRouter , Router }