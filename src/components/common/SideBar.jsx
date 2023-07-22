import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations/userAPI'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { ACCOUNT_TYPE } from '../../utils/constants'
import HamburgerButton from '../common/HamburgerMenuButton/HamburgerButton'
import {employeeMenus, adminMenus} from '../../data/sidebar-links'
import { useDispatch, useSelector } from 'react-redux'

const SideBar = () => {
  const [open, setOpen] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.profile)


    const Menus = user.accountType === ACCOUNT_TYPE.EMPLOYEE ? 
    (employeeMenus)
    :(adminMenus)

    const logoutHandler = ()=>{
        dispatch(logout(navigate))
    }

return (
    <>
      <div
        className={`${
          open ? 'w-60' : 'w-fit'
        } hidden sm:block relative h-screen duration-300 bg-richblack-800 border-r border-richblack-900  p-5 `}
      >
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 `}
          onClick={() => setOpen(!open)}
        />
        <Link to='/dasboard/profile'>
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
            
            {open && (
                <div className='flex justify-center gap-5'>
                    <div className=' rounded-full border-solid border-white w-10 '>
                        <img src={user?.image} alt="dp" className=' text-white' />
                    </div>
                    <span className=' text-2xl text-caribbeangreen-100 font-medium whitespace-nowrap '>
                        {user.firstName}
                    </span>
                </div>

            )}
          </div>
        </Link>


        <ul className='pt-6 '>
          {Menus.map((menu, index) => (
            <Link to={menu.path} 
                key={index}
                onClick={menu.title === "Log Out"?(logoutHandler):(null)}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base text-caribbeangreen-50  font-semibold rounded-lg cursor-pointer transition duration-200  hover:font-bold hover:bg-white hover:text-caribbeangreen-300
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                  location.pathname === menu.path &&
                  'bg-white text-caribbeangreen-300'
                }`}
              >
                <span className='text-2xl'>{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
         
        </ul>

      </div>
      {/* Mobile Menu */}
      <div className="pt-3 bg-richblack-800">
        <HamburgerButton
          setMobileMenu={setMobileMenu}



          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 bg-richblack-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={menu.title !== "Log Out"?(() => setMobileMenu(false)):(logoutHandler)}
              className=' text-caribbeangreen-50 font-semibold '
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  'bg-white w-[4rem]'
                } p-2 rounded-xl hover:bg-white `}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
    </div>

</>
  )
}

export default SideBar

