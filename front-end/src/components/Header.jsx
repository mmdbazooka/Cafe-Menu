import { useContext } from "react"
import { Link } from "react-router-dom"
import { context } from "../context/AppContext"

const Header = () => {

    const { isLogin } = useContext(context)

    return (
        
        <div className="max-w-[1920px] mx-auto flex [&>div]:w-1/3 px-4">

            <div className="flex gap-6 col-span-4 max-sl:flex-col">
                <Link to={"/basket"} className="h-[60px]"> 

                    <div className="relative">

                        <img src="../src/assets/basket.png" alt="" className="h-[60px] max-lm:h-[55px] max-sl:h-[50px] cursor-pointer"/>
                        <div id="orderCounter" className={`w-4 h-4 text-[13px] bg-[#ea5455] rounded-md absolute left-[42px] max-lm:left-[37px] max-sl:left-[32px] bottom-0 center-row text-white ${localStorage.getItem("basket") !== null ? JSON.parse(localStorage.getItem("basket")).length ? "" : "!hidden" : "!hidden"}`}>{localStorage.getItem("basket") !== null ? JSON.parse(localStorage.getItem("basket")).length : 0}</div>
                    
                    </div>

                </Link>
                {
                    isLogin && <Link to={"/AdminPanel/orders"} className="dashboardBtn max-sl:w-[60%] mt-2 max-sl:-mt-2 px-4 h-8 max-lm:text-[14px] max-sl:text-[12px] text-white rounded-lg cursor-pointer relative center-row">داشبورد</Link>
                }

            </div>

            <div className="center-col col-span-4">

                <img src="../src/assets/barg-logo.png" alt="" className="w-24 max-lm:w-20 max-md:w-18" />
                <div className="my-3 max-lm:text-[16px] max-md:text-[14px] whitespace-nowrap">کافه برگ</div>

            </div>

            <div className="col-span-4 flex justify-end">
                
                <Link to="https://www.instagram.com/cafebarg.32" className="socialIcon w-[50px] h-[50px] max-lm:w-[45px] max-lm:h-[45px] max-sl:w-[40px] max-sl:h-[40px] rounded-[15px] max-sx:rounded-[5px] bg-[#EEE6F6] cursor-pointer flex justify-center items-center relative overflow-hidden [&>div]:w-[90%] [&>div]:h-[90%] [&>div]:z-[10] [&>span]:w-full [&>span]:h-0 [&>span]:z-[0] [&>span]:absolute [&>span]:left-0 [&>span]:top-0 [&>span]:transition-all [&>span]:duration-300 [&:hover>span]:h-full">
                    <div></div>
                    <span className="instaLogo"></span>
                </Link>

            </div>

        </div>

    )

}

export default Header