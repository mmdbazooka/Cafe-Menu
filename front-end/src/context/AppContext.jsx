import { createContext, useState } from "react"

export const context = createContext(null)

const AppContext = ({ children }) => {
  
    const [ordersList, setOrdersList] = useState(true)
    const [isLogin, setIsLogin] = useState(localStorage.getItem("account") ? true : false)
    const [isModal, setIsModal] = useState(false)
    const [isFood, setIsFood] = useState(false)
    const [items, setItems] = useState([])

    return (

        <context.Provider value={{ isLogin , setIsLogin , isModal, setIsModal , items , setItems , isFood, setIsFood , ordersList, setOrdersList}}>
            { children }
        </context.Provider>

    )

}

export default AppContext