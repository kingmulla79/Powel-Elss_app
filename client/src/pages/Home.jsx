import React from 'react'
import './home.css';
import Sidebar from '../components/sidebar/sidebar';
import Widget from '../components/widgets/widget';
import Recents from '../components/recents/recents'
import RecentService from '../components/recentservice/recentService'
import BarChart from '../components/chart/BarChart';
import Navbar from "../components/navbar/Navbar"

function Home() {

  return (
    <div className='home'>
      <Sidebar/>
      <div className='homeContainer'>
        <Navbar/>
        <div className="widgets">
          <Widget type="sales"/>
          <Widget type="expenses"/>
          <Widget type="services"/>
          <Widget type="serviceForm"/>
        </div>
        <div className="middleContainer">
            <h3>Recent Services</h3>
            <div className="recentServiceContainer">
              <RecentService/>
              <RecentService/>
              <RecentService/>
            </div>
          </div>
        <div className="bottomContainer">
          <div className="barChart">
            <BarChart/>
          </div>
          <div className="rightContainer">
            <div className="bottomWidgets widgets">
              <Widget type="newItem"/>
            </div>
            <h3>Recent Purchases</h3>
            <div className="recentsContainer">
              <Recents/>
              <Recents/>
              <Recents/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home