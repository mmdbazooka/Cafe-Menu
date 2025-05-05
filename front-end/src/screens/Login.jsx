import { Field, Form, Formik } from "formik"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { context } from "../context/AppContext"
import { ToastContainer, toast } from "react-toastify"

const Login = () => {

    const { setIsLogin }  = useContext(context)
    let navigate = useNavigate()
    
    const onSubmit = async (e) => {
        if(e.name == "amin" && e.password == "amin00112233") {
        if(!localStorage.getItem("account")) localStorage.setItem("account",JSON.stringify({ name : "hamid" , password : "nikzad123" }))
            setIsLogin(true)
            navigate("/adminPanel")
        }
        else toast.error("نام کاربری یا رمز عبور صحیح نیست")
    }

  return (

    <div className="max-w-[1920px] center-row mx-auto">

        <div className="w-[600px] h-[600px] center-col my-[100px]">


            <Formik initialValues={{name : "" , password : "" }} onSubmit={value => onSubmit(value)}>
                            
                <Form className="border rounded-lg p-3 [&>div]:my-2 rtl bg-white">

                    <img src="https://backend-digital-menu.liara.run/uploads/sign-in.png" alt="" className="h-[500px] mx-auto max-sl:h-[400px] max-mini:h-[300px]" />

                    <span className='fieldTitle'>نام کاربری : </span>
                    <Field name="name" className="field" placeholder="نام کاربری..." />
                    
                    <span className='fieldTitle'>رمز عبور : </span>
                    <Field name="password" type="password" className="field" placeholder="رمز عبور..." />
                    
                    <button type="submit" className="mx-auto w-full cursor-pointer rounded-md bg-gradient-to-r from-[#70d276] to-[#47bf80] hover:bg-gradient-to-l transition center-row text-white text-[15px] p-2">ورود</button>

                </Form>

            </Formik>

        </div>
        
        <ToastContainer autoClose={2000} position="top-center" draggable={true} />
    </div>
  )

}

export default Login