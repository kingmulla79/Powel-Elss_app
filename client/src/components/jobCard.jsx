import React from 'react'
import './jobCard.css';

function jobCard() {
  return (
    <div className='jobCardContainer'>
        <div className="jobCard">
            <div className="header">
                <div className="leftHeader">
                    <p>Naivasha Moi South Lake Road</p>
                    <p>P.o.Box 1530-20117 Naivasha</p>
                    <p>Cell: +254 722 171 416</p>
                    <p className='ourEmail'>E-mail: <a href="mailto:ligogoanthony02@gmail.com">powel-elssltd@outlook.com</a> </p>
                </div>
                <div className="rightHeader">
                    <div className="logoName">
                        <p>Powel-elss <sup>KE</sup> </p>
                    </div>
                    <div className="logotext">
                        <p>Energy Efficieny Services</p>
                    </div>
                </div>
            </div>
            <h4 className='formTitle'>Installation services, facility management & Industrial Maintenance</h4>
            <span className='jobcardTitle'>
                <p>JOB CARD</p>
                <span className='date'>
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" id="date" />
                </span>
            </span>
            <form>
                <div><label htmlFor="clientDetails">Client's details</label>
                <input type="text" name='clientDetails' id='clientDetails'/></div>
                <div><label htmlFor="location">Location</label>
                <input type="text" name='location' id='location' /></div>
                <div><label htmlFor="requestedBy">Requested by</label>
                <input type="text" name='requestedBy' id='requestedBy' /></div>
                <div><label htmlFor="designation">Designation</label>
                <input type="text" name='designation' id='designation' /></div>
                <div><label htmlFor="scope">Scope</label> <br />
                <textarea name="scope" id="scope" cols="60" rows="1"></textarea></div>
                <div><label htmlFor="description">Description of the Scope</label> <br />
                <textarea name="description" id="description" cols="60" rows="6"></textarea></div>
                <div><label htmlFor="workDuration">Work duration</label>
                <input type="number" name='workDuration' id='workDuration' placeholder='0' /></div>
                <div><label htmlFor="attendants">Service attended by</label>
                <input type="text" name='attendants' id='attendants' /> <br />
                <input type="text" name='attendants' id='attendants' /> <br />
                <input type="text" name='attendants' id='attendants' /></div>
                <div><label htmlFor="comments">Comments</label> <br />
                <textarea name="comments" id="comments" cols="60" rows="3"></textarea></div>
                <p>I <input type="text" /> agree that all work has been performed to my satisfaction.</p>
                <div><label htmlFor="completedDate">Completed date</label>
                <input type="date" name="completedDate" id="completedDate" /></div>
                <button>Save</button>
            </form>
        </div>

    </div>
  )
}

export default jobCard