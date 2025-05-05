import { useContext } from "react"
import { context } from "../../context/AppContext"
import { toast } from "react-toastify"
import customAxios from "../../interceptor/customAxios"
import { useLocation, useNavigate } from "react-router-dom"

const YesOrNo = () => {

    const location = useLocation()
    const navigate = useNavigate()
    
    const { isModal , setIsModal , setIsLogin}  = useContext(context)

    const deleteModal = async (e) => {
        if(e.target.getAttribute("data-url") == "log-out") {
            setIsLogin(false)
            localStorage.removeItem("account")
            navigate("/")
        }
        else {
            await customAxios.delete(e.target.getAttribute("data-url"))
            toast.success("عملیات با موفقیت انجام شد") 
            setIsModal(false)
            if(location.pathname.indexOf("/orders/") !== -1) navigate("/adminPanel/orders")
        }
    }

    return (
            
        <div className={`fixed top-0 left-0 w-full h-full bg-[#00000075] ${isModal ? "center-row" : "hidden"}`}>
            
            <div className="w-[600px] max-lx:scale-90 max-md:scale-75 max-sl:scale-[65%]  h-[300px] max-sl:h-[250px] bg-white border-t shadow rounded-xl center-col !justify-around">

                <span className="text-[20px] max-sl:text-[18px] max-mini:text-[17px]">آیا مطمئن به انجام این عملیات هستید؟</span>

                <div className="w-full center-row gap-2 text-[20px]">
                    <div id="yes" onClick={e => deleteModal(e)} className="w-[150px] max-mini:w-[130px] py-3 text-center mx-2 hover:bg-[#1ee2a1b3] cursor-pointer bg-[#1ee2a2] text-shadow text-white shadow rounded-lg">بله</div>
                    <div onClick={() => setIsModal(false)} className="w-[150px] max-mini:w-[130px] py-3 text-center mx-2 hover:bg-[#ff5a65c9] cursor-pointer bg-[#ff5a64] text-shadow text-white shadow rounded-lg">خیر</div>
                </div>

            </div>

        </div>

    )

}

export default YesOrNo