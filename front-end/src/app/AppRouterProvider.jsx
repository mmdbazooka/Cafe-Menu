import { RouterProvider } from "react-router-dom";
import { context } from "../context/AppContext";
import { AdminRouter, Router } from "./config/Router"
import { useContext } from "react";

const AppRouterProvider = () => {

  const { isLogin } = useContext(context)

    return (

      <RouterProvider router={isLogin ? AdminRouter : Router}></RouterProvider>

    )

}

export default AppRouterProvider