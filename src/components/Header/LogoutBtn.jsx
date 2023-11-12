import React from 'react'
import authServices from '../../appwrite/auth-service'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch();

    const onLogout = () => {
        authServices.logout().then(() => {
            dispatch(logout());
        })
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-lg' onClick={onLogout} >LogoutBtn</button>
  )
}

export default LogoutBtn