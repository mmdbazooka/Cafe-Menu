import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import customAxios from "../../interceptor/customAxios"
import { toast } from "react-toastify"
import { context } from "../../context/AppContext"
import getAnything from "../../core/utils/getAnything.utils"

const UserDetials = () => {

    const params = useParams()
    const [order, setOrder] = useState({})
    const { setIsModal , isModal }  = useContext(context)

    const deleteOrder = async (_id) => {
        setIsModal(true)
        yes.setAttribute("data-url", `/orders/${_id}`)
    } 

    const changeStatus = async () => {

        let { data } = await customAxios.put(`/orders/${params.id}`,{
            status : order.status ? false : true
        })
        setOrder(data)
        toast.success("عملیات با موفقیت انجام شد") 

    }

    useEffect(() => {getAnything(`/orders/${params.id}` , setOrder)}, [])
    useEffect(() => {getAnything(`/orders/${params.id}` , setOrder)}, [isModal])
    

    return (

        <div dir="rtl" className="grid grid-cols-12 gap-4"> 

            <div className="col-span-4 shadow pb-5 rounded-lg border-t bg-white max-md:col-span-12">

                <div className="center-col my-10">
                    <div className="w-20 h-20">
                        <img src={`https://backend-digital-menu.liara.run/uploads/Profile1.png`} className="rounded-full" alt="" />
                    </div>
                    <div className="text-[20px] px-2">{order.name}</div>
                </div>

                <div className="items-start flex-col pr-5">

                    <div className="mb-5 text-[20px]">جزییات</div>

                    <div>شماره همراه :  <span className="text-[14px] text-[#949299]">0{order.phone}</span></div>
                    <div className="my-2">شماره میز :  <span className="text-[14px] text-[#949299]">{order.table}</span></div>
                    <div>توضیحات : </div>
                    <div className="text-[14px] text-[#949299] break-words mt-2 px-2">{order.description}</div>

                    <div className={`w-[120px] mt-5 py-2 mx-auto rounded-lg cursor-pointer center-row ${order.status ? "bg-[#e5f8ed] text-[#28c76f]" : "bg-[#fdeaea] text-[#ea5455]" }`} onClick={() => changeStatus(order.status)}>{order.status ? "پرداخت شده" : "پرداخت نشده"}</div> 
                </div>

            </div>

            <div className="col-span-8 relative shadow rounded-lg pb-5 border-t bg-white px-2 max-md:col-span-12">

                <div className="center-row !justify-between p-5 mb-5">
                    <div className="text-[22px]"> زمان ثبت : {order.date?.slice(10)}</div>

                    <div className="w-[90px] py-2 rounded-lg cursor-pointer center-row bg-[#fdeaea] text-[#ea5455]" onClick={() => deleteOrder(order._id)}>حذف</div> 
                </div>

                <div className="w-[90%] mx-auto center-row !justify-between h-[50px] text-[18px] rtl">

                    <div> سفارش </div>
                    <div> تعداد </div>

                </div>

                <div className="w-[95%] mx-auto center-col gap-5 !justify-between px-2 mt-2 rtl mb-[60px]">

                    {
                        order?.order?.map((el,index) => {
                            
                            return (

                                <div key={index} className="center-row !justify-between w-full h-[50px] px-2 text-[#6e6b7b] rtl shadow rounded-md">
                                    
                                    <div className="center-row">
                                        <div className="w-12 h-12 ml-2">
                                            <img src={`https://backend-digital-menu.liara.run${el.img}`} alt="" className="w-full h-full rounded-lg" />
                                        </div>
                                        <div>{el.name}</div>
                                    </div>
                                    <div className="ml-3">{el.qty}</div>
                                    
                                </div>

                            )

                        })
                    }

                </div>

                <div className="h-[50px] w-[85%] mx-auto center-row !justify-between absolute bottom-2 right-10">
                    <span className="rtl text-[20px]">هزینه کل :</span>
                    <span>{ new Intl.NumberFormat("fa-IR").format(order.totalPrice) } تومان</span>
                </div>
                
            </div>

        </div>

    )

}

export default UserDetials