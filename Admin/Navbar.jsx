import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { ServiceContext } from '../context/ServiceContext'


const Navbar = () => {


   const { aToken, setAToken } = useContext(AdminContext)
   const { oToken, setOToken } = useContext(ServiceContext)


   const navigate = useNavigate()


   const logout = ()=>{
       navigate('/')
       aToken && setAToken('')
       aToken && localStorage.removeItem('aToken')
       oToken && setOToken('')
       oToken && localStorage.removeItem('oToken')
   }


 return (
   <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
       <div className='flex items-center gap-2 text-xs cursor-pointer'>
           <img className='w-20 sm:w-20' src={ assets.round_logo } alt="logo" />
           <p className='text-lg border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{ aToken ? 'Admin' : 'Other' } Panel</p>
       </div>
       <button onClick={logout} className='bg-primary-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
   </div>
 )
}


export default Navbar