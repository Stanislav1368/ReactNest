import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const Settings = () => {
  return (
    <div className='shadow  bg-body rounded'>
        <div className='row'>
          <Sidebar className='col-1'></Sidebar>
          <div className='col-10'>
            <Navbar></Navbar>
            <h1>Settings</h1>
            //Элементы для настройки
          </div>
        </div>
     </div>
  )
}

export default Settings
