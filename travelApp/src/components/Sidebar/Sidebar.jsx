import React from 'react';
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <div className='Sidebar'>
        <div className="Sidebar-logo ">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Logo_icon.svg/2048px-Logo_icon.svg.png" alt="" />
            <input className='Sidebar-search' type="text" placeholder='Search...' autoFocus />
        </div>
    </div>
  )
}
