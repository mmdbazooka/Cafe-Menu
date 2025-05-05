import React, { useEffect, useState } from 'react'
import increase from '../core/utils/increase.utils'
import decrease from '../core/utils/decrease.utils'
import customAxios from '../interceptor/customAxios'
import Header from '../components/Header'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Basket = () => {

    const [array, setArray] = useState([])
    let navigate = useNavigate()
    let price = 0

    const getItems = () => {
        if(JSON.parse(localStorage.getItem("basket"))) setArray(JSON.parse(localStorage.getItem("basket")))
    }

    const onSubmit = async (e) => {

        let basket = JSON.parse(localStorage.getItem("basket"))

        if(basket && basket.length > 0) {
            
            try {
                
                let order = basket.map((el) => {
                    return { name : el.name , qty : el.qty , img : el.img }
                })

                await customAxios.post("/orders",{
                    name : e.name,
                    phone : e.phone,
                    table : e.table,
                    totalPrice : price,
                    description : e.description,
                    order
                })
                localStorage.removeItem("basket")
                setTimeout(() => {
                    toast.success("سفارش شما با موفقیت ثبت شد") 
                }, 500); 
                navigate("/") 
            }
            catch {
                toast.error("شما هیچ فیلدی را پر نکردید")
            }
        }
        else toast.error("شما چیزی به  سبد خرید اضافه نکردید")

    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <>
            <Header/>
            <div className='max-w-[1920px] mx-auto grid grid-cols-12 gap-4 p-4 rtl'>
                <div className='col-span-8 bg-white rounded-lg grid-cols-12 border px-16 py-10 max-2xl:p-6 max-lg:p-2 max-lg:col-span-12'>
                    {
                    array.map((element , index) => {
            
                        let foundObjInLocalStorage = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")).find((el) => {
                            return el._id == element._id
                        }) : undefined
            
                        return (
                            <div key={index} className="mx-auto rounded-lg border-t shadow p-3 grid grid-cols-11 max-lg:grid-cols-12 col-span-10 my-2 bg-white max-sm:col-span-6">
            
                                <div className="col-span-3 max-sl:col-span-4">
                                    <img src={`https://backend-digital-menu.liara.run${ element.img }`} alt="" className="w-[300px] max-sl:h-[100px] rounded-2xl shadow border-t" />
                                </div>
            
                                <div className="h-full col-span-8 max-lg:col-span-9 px-2 py-1 max-sl:col-span-8">
                                    <div className="h-[70%] pr-1 rtl relative">
                                        <div className="text-[17px] max-sx:text-[14px] max-sl:text-[12px] text-black"> {element.name} </div>
                                        <div className="border  border-transparent text-[13px] max-sx:text-[11px] max-sl:text-[10px] text-[#888] mt-2"> {element.recipe} </div>
                                    </div>
                                    <div className="h-[30%] flex justify-between">
                                        <div className="w-[30%] mt-2 whitespace-nowrap max-xl:text-[16px] max-sx:text-[13px] max-sl:text-[11px]"> {new Intl.NumberFormat('fa-IR').format(element.price)} تومان</div>
                                        <div className="w-[70%] flex justify-end gap-2">
                                            {
                                                foundObjInLocalStorage &&
                                                <>
                                                    <div className="w-[14%] cursor-pointer rounded-md border center-row text-[18px]" onClick={(e) => increase(e,element,"basket")}>+</div>
                                                    <div className="w-[5%] cursor-pointer rounded-md center-row text-[18px] max-sx:text-[13px]">{foundObjInLocalStorage.qty}</div>
                                                    <div className="w-[14%] cursor-pointer rounded-md border center-row text-[18px]" onClick={(e) => decrease(e,element,setArray,true)}>-</div>
                                                </>
                                            }
                                            {
                                                !foundObjInLocalStorage &&
                                                <div className="w-[40%] cursor-pointer rounded-md bg-gradient-to-r from-[#70d276] to-[#47bf80] hover:bg-gradient-to-l transition center-row text-white text-[15px] p-2" onClick={()=> addToBasket(element)}>افزودن</div>
                                            }
                                        </div>
                                    </div>
                                </div>
            
                            </div>
                        )
                    })
                }
                </div>
                <div className='col-span-4 rounded-lg bg-white max-lg:col-span-12'>

                    <Formik initialValues={{name : "" , phone : "" , table : "" , description : ""}} onSubmit={value => onSubmit(value)}>
                            
                        <Form className="border rounded-md p-3 [&>div]:my-2">
                            <div className="rtl [&>span]:text-[17px] max-xl:[&>span]:text-[15px] [&>input]:placeholder:text-[14px] max-xl:[&>input]:placeholder:text-[12px]">

                                <span className='fieldTitle'>نام و نام خانوادگی</span>
                                <Field name="name" className="field" placeholder="نام و نام خانوادگی..." />
                                
                                <span className='fieldTitle'>شماره تلفن</span>
                                <Field name="phone" type="number" className="field" placeholder="شماره تلفن..." />
                                
                                <span className='fieldTitle'>شماره میز</span>
                                <Field name="table" className="field" placeholder="شماره میز..." />

                            </div>

                            <Field name="description" as="textarea" className="resize-none field !h-[100px] !pt-2" placeholder="توضیحات سفارش..."></Field>
                            
                            <div className='center-row !justify-between px-1 [&>span]:text-[17px] max-xl:[&>span]:text-[15px]'>
                                {
                                    JSON.parse(localStorage.getItem("basket")) &&
                                    JSON.parse(localStorage.getItem("basket")).map((el) => {
                                        price = price + el.price*el.qty
                                    })
                                }

                                <span>هزینه کل :</span>

                                <span className='rtl' id="par">{ new Intl.NumberFormat('fa-IR').format(price) } تومان</span>

                            </div>
                            
                            <button type="submit" className="mx-auto w-full cursor-pointer rounded-md bg-gradient-to-r from-[#70d276] to-[#47bf80] hover:bg-gradient-to-l transition center-row text-white text-[15px] p-2">ثبت سفارش</button>

                        </Form>

                    </Formik>


                </div>
                
            </div>

            <ToastContainer autoClose={2000} position="top-center" draggable={true} limit={3} />
        </>

    )                                    

}

export default Basket