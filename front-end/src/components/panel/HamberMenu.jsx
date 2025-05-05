import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { context } from '../../context/AppContext'

const HamberMenu = () => {

    let className = "h-[70px] rounded-lg shadow-lg center-row cursor-pointer !justify-end [&>img]:mx-4 my-2 transition max-xl:text-[14px]"
    const { setIsModal }  = useContext(context)

    const closeMenu = () => menu.parentNode.classList.replace("right-0","right-[-100%]")
    const logout = () => {
        setIsModal(true)
        yes.setAttribute("data-url", `log-out`)
    }

    return (
        <div className='px-2'>
            
            <NavLink onClick={closeMenu} to={"/adminPanel/add-item"} className={({ isActive }) => (isActive ? `bg-[#e5f8ed] border-[3px] border-[#28c76f] ${className}` : `bg-white ${className}`)}>
                <span>اضافه کردن آیتم</span>
                <img src="../src/assets/panel/addItem.png" className="w-8 h-8" alt="" />
            </NavLink>
            <NavLink onClick={closeMenu} to={"/adminPanel/delete-item"} className={({ isActive }) => (isActive ? `bg-[#fbd9d9] border-[3px] border-[#ea5455] ${className}` : `bg-white ${className}`)}>
                <span>پاک کردن آیتم</span>
                <img src="../src/assets/panel/deleteItem.png" className="w-8 h-8" alt="" />
            </NavLink>
            <NavLink onClick={closeMenu} to={"/adminPanel/edit-item"} className={({ isActive }) => (isActive ? `bg-[#ffe9d5] border-[3px] border-[#ff9f43] ${className}` : `bg-white ${className}`)}>
                <span>ویرایش آیتم</span>
                <img src="../src/assets/panel/editItem.png" className="w-8 h-8" alt="" />
            </NavLink>
            <NavLink onClick={closeMenu} to={"/adminPanel/orders"} className={({ isActive }) => (isActive ? `bg-[#d9e6f0] border-[3px] border-[#3684fa] ${className}` : `bg-white ${className}`)}>
                <span>سفارشات</span>
                <img src="../src/assets/panel/order.png" className="w-8 h-8" alt="" />
            </NavLink>
            <NavLink onClick={closeMenu} to={"/adminPanel/add-category"} className={({ isActive }) => (isActive ? `bg-[#e5f8ed] border-[3px] border-[#28c76f] ${className}`: `bg-white ${className}`)}>
                <span>اضافه کردن دسته بندی</span>
                <img src="../src/assets/panel/addItem.png" className="w-8 h-8" alt="" />
            </NavLink>
            <NavLink onClick={closeMenu} to={"/adminPanel/delete-category"} className={({ isActive }) => (isActive ? `bg-[#fbd9d9] border-[3px] border-[#ea5455] ${className}`: `bg-white ${className}`)}>
                <span>پاک کردن دسته بندی</span>
                <img src="../src/assets/panel/deleteItem.png" className="w-8 h-8" alt="" />
            </NavLink>
            <Link to={"/"} className={className + " bg-white"}>
                <span>برگشت به خانه</span>
                <img src="../src/assets/panel/home.png" className="w-8 h-8" alt="" />
            </Link>
            <div className={className + " bg-white"} onClick={logout}>
                <span>خروج از حساب</span>
                <img src="../src/assets/panel/log-out.png" className="w-8 h-8" alt="" />
            </div>

        </div>
    )

}

export default HamberMenu