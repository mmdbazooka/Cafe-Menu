import { useEffect, useState } from "react"
import increase from '../../core/utils/increase.utils'
import { useLocation } from "react-router-dom"

const ItemsMap = ({ array }) => {
    
    const location = useLocation()
    const [item, setitem] = useState([])
    const [flag, setFlag] = useState(false)


    const addToBasket = (element) => {

        let basket = JSON.parse(localStorage.getItem("basket")) 
        if(basket == undefined) {
            basket = []
        }
        let foundObjInLocalStorage = basket.find((el) => {
            return (+el.id) == (+element.id)
        })
        
        if(foundObjInLocalStorage) {
            foundObjInLocalStorage.qty = foundObjInLocalStorage.qty + 1 
        }
        else {
            basket.push({...element ,qty : 1})
        }

        localStorage.setItem("basket",JSON.stringify(basket))
        setFlag(!flag)
        orderCounter.innerText = Math.ceil(orderCounter.innerText) + 1
        orderCounter.classList.remove("!hidden")
    }  

    const decrease = (e,element) => {
        let basket = JSON.parse(localStorage.getItem("basket"))
        let num = (+e.target.previousElementSibling.innerText)
        if(num == 1) {
            let filtered = basket.filter((el) => {
                return el._id !== element._id
            })
            localStorage.setItem("basket",JSON.stringify(filtered))
            setFlag(!flag)
            orderCounter.innerText = Math.ceil(orderCounter.innerText) - 1
            if(basket.length == 1) orderCounter.classList.add("!hidden")
        }
        else {
            e.target.previousElementSibling.innerText = --num
            let found = basket.find((el) => {
                return el._id == element._id
            })
            found.qty = --found.qty 
            localStorage.setItem("basket",JSON.stringify(basket))
        }
    } 

    useEffect(() => {
        
        setitem(array)

    }, [location.pathname])

    return (
        array?.map((element , index) => {

            let foundObjInLocalStorage = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")).find((el) => {
                return el._id == element._id
            }) : undefined
            return (
                <div key={index} className="rounded-md border-t shadow bg-white col-span-6 p-3 grid grid-cols-12 max-xl:col-span-2 max-xl:p-2 max-xl:flex max-xl:flex-col gap-y-1 max-mini:scale-y-95">

                    <div className="col-span-4 max-xl:col-span-12 pl-3 max-xl:pl-0">
                        <img src={`https://backend-digital-menu.liara.run${ element.img }`} alt="" className="w-full h-[170px] max-lm:h-[150px] max-md:h-[130px] max-sx:h-[150px] max-mini:h-[130px] rounded-lg shadow border" />
                    </div>

                    <div className="h-full col-span-8 px-2 max-xl:col-span-12 max-xl:px-0 max-xl:h-1/2">

                        <div className="h-[70%] rtl relative max-xl:h-[60%] max-xl:pr-1">

                            <div className="text-[19px] max-xl:text-[14px] max-md:text-[13px]"> {element.name} </div>
                            <div className="border border-transparent text-[15px] text-[#888] mt-2 max-xl:text-[12px] max-md:text-[11px] max-xl:mt-1 max-xl:h-[20px] truncate"> {element.recipe} </div>
                            <div className="hidden max-xl:block text-[13px] max-md:text-[11px] max-mini:text-[10px] text-left my-1 pl-1"> {new Intl.NumberFormat('fa-IR').format(element.price)} تومان </div>
                        </div>

                        <div className="h-[30%] flex justify-between max-xl:h-[40%] items-end">

                            <div className="h-full whitespace-nowrap max-xl:hidden center-row"> {new Intl.NumberFormat('fa-IR').format(element.price)} تومان</div>
                            <div className="h-full flex items-end justify-center gap-2 max-xl:w-full max-xl:h-[90%] max-lm:h-[80%] max-mini:h-[70%]">
                                {
                                    foundObjInLocalStorage &&
                                    <>
                                        <div className="w-[50px] max-lg:w-[40px] max-mini:w-[30px] h-full cursor-pointer rounded-md border center-row text-[18px]" onClick={(e) => increase(e,element)}>+</div>
                                        <div className="w-[25px] h-full rounded-md center-row text-[18px] mt-1">{foundObjInLocalStorage.qty}</div>
                                        <div className="w-[50px] max-lg:w-[40px] max-mini:w-[30px] h-full cursor-pointer rounded-md border center-row text-[18px]" onClick={(e) => decrease(e,element)}>-</div>
                                        
                                    </>
                                }
                                {
                                    !foundObjInLocalStorage &&
                                    <div className="w-[150px] h-full mb cursor-pointer rounded-md bg-gradient-to-r from-[#70d276] to-[#47bf80] hover:bg-gradient-to-l transition center-row text-white text-[17px] max-md:text-[11px] p-2 max-xl:w-full" onClick={()=> addToBasket(element)}>افزودن</div>
                                }
                            </div>

                        </div>
                    </div>

                </div>
            )
        })
    )                                    


}

export default ItemsMap