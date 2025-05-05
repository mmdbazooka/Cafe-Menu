import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { useParams } from 'react-router-dom'
import customAxios from '../../interceptor/customAxios'
import { toast } from 'react-toastify';
import getAnything from '../../core/utils/getAnything.utils';

const EditSelectedItem = () => {

    const params = useParams()
    const [item, setItem] = useState([])
    const [options, setOptions] = useState()

    let selectedCat = "" ;
    let selectedImg = "" ;

    const getCat = async () => {

        let { data } = await customAxios.get("/category")
        data = data.map((el) => {
            return { label : el.name[0] , value : el.name[0] }
        })
        setOptions(data)

    }

    const handleImg = async (e) => {
        selectedImg = e.target.files[0]; 

        const formData = new FormData();
        formData.append("img", selectedImg); 
        await customAxios.post("/uploads", formData);
        
        const { data } = await customAxios.get(`/uploads/${selectedImg.name}`, { 
            responseType: 'blob' 
        }); 
        const reader = new FileReader(); 
        reader.readAsDataURL(data);  

        reader.onloadend = () => { 
            const img = document.createElement('img'); 
            img.src = reader.result; 
            img.className = "w-[150px] h-[150px]"
            e.target.nextElementSibling.innerHTML = ""
            e.target.nextElementSibling.appendChild(img);  
        }; 
         

    }

    const handleChange = (e) => {
        selectedCat = e.value
    }

    const onSubmit = async (values) => { 
        
        const formData = new FormData(); 
     
        formData.append("name", values.name ? values.name : item.name); 
        formData.append("price", values.price ? values.price : item.price); 
        formData.append("category", selectedCat ? selectedCat : item.category); 
        formData.append("recipe", values.recipe ? values.recipe : item.recipe); 
     
        if (selectedImg) formData.append("img", selectedImg); 
    
        await customAxios.put(`/items/${params.id}`, formData, { 
            headers: { 
                'Content-Type': 'multipart/form-data', 
            }, 
        }); 
        toast.success("عملیات با موفقیت انجام شد") 
    
        getAnything(`/items/${params.id}` , setItem)
    }


    useEffect(() => {
        getCat()
        getAnything(`/items/${params.id}` , setItem)
    }, [])
    

    return (
        <div className='grid grid-cols-12 gap-4'>

            <div className="col-span-8 px-6 center-row py-4 max-md:col-span-12 max-md:order-2">

                <Formik initialValues={{name : "" , price : "" , category : "" , recipe : ""}} onSubmit={value => onSubmit(value)}>
                    
                    <Form className="w-full border rounded-md p-3 [&>div]:my-2 rtl">
                        
                            <span className="fieldTitle">اسم آیتم</span>
                            <Field name="name" className="field" placeholder="اسم آیتم..." />
                            
                            <span className="fieldTitle">عکس آیتم</span>
                            <input type="file" id="imgInput" onChange={handleImg} className="hidden" placeholder="عکس آیتم..." />
                            <label htmlFor="imgInput" className="inline-block field !h-[300px] bg-white !border-2 !border-dashed cursor-pointer center-row gap-4">
                                <span className="text-[14px] text-[#666]">انتخاب فایل</span>
                                <img src={`https://backend-digital-menu.liara.run/uploads/panel/uploadPic.png`} alt="" className="w-8" />
                            </label>
                            
                            <span className="fieldTitle">قیمت آیتم</span>
                            <Field name="price" type="number" className="field" placeholder="قیمت آیتم..." />
                            
                            <span className="fieldTitle">دسته بندی آیتم</span>
                            <Select onChange={handleChange} options={options} placeholder="دسته بندی آیتم..." className="[&>div>div>div]:text-[12px] [&>div>div>div>input]:outline-none"/>
                            
                            <span className="fieldTitle">دستورالعمل آیتم</span>
                            <Field name="recipe" className="field" placeholder="دستورالعمل آیتم..." />

                        <button type="submit" className="mx-auto w-full cursor-pointer rounded-md bg-gradient-to-r from-[#70d276] to-[#47bf80] hover:bg-gradient-to-l transition center-row text-white text-[15px] p-2">ویرایش آیتم</button>

                    </Form>

                </Formik>

            </div>
            <div className="col-span-4 py-4 max-md:col-span-12 max-md:order-1 max-md:mx-auto ">
                
                <div className="w-[250px] max-md:w-[300px] p-4 shadow rounded-lg bg-[#fff] rtl">
            
                    <div className='my-2 '>
                        <img src={`https://backend-digital-menu.liara.run${ item?.img }`} alt="" className="w-[80%] h-[150px] mx-auto rounded-[15px] brightness-[85%]"/>
                    </div>
    
                    <div className="h-[50px] center-row px-1 !justify-between text-[#777] [&>span]:text-[14px]">
                        <span>{item?.name}</span>
                        <span>{new Intl.NumberFormat('fa-IR').format(item?.price)} تومان</span>
                    </div>
                    <div className="text-[#777] text-[14px] px-1 break-words">{item?.recipe	}</div>
                
                </div>
                
            </div>

        </div>
    )
}

export default EditSelectedItem