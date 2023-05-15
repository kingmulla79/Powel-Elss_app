import React from 'react'
import './home.css';
import {AiOutlineHome} from 'react-icons/ai';
import {BsPeople} from 'react-icons/bs';
import {FaWpforms} from 'react-icons/fa';
import {HiOutlineDocumentText} from 'react-icons/hi';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';


function Home() {
  return (
    <div className='homeContainer'>
      <aside>
        <h2 className='name'>powel-elss</h2>
        <div className="dashboard">
          <span>DASHBOARD</span>
          <p className='active'><AiOutlineHome/> Home</p>
        </div>
        <div className="pages">
          <span>PAGES</span>
          <p > <BsPeople /> Staff</p>
          <p> <FaWpforms />Job Card</p>
          <p> <HiOutlineDocumentText style={{fontSize: '20px'}}/>Sales</p>
          <p> <AiOutlineUsergroupAdd style={{fontSize: '20px'}} />New Staff</p>
        </div>
        <button>Log out</button>
      </aside>
      <main></main>
    </div>
  )
}

export default Home