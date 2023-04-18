import moment = require('moment/moment');
import * as React from 'react';
import { useState } from 'react';
import './style.css';

export default function App() {
  const [timeDate, setTimeDate] = useState(new Date());
  const [alarms, setAlarms] = useState([]);

  setTimeout(() => {
    setTimeDate(new Date());
  }, 1000);

  return (
    <div className="content">
      <div className="card">
        <h1 className="center">App de Alarma</h1>
        <h6 className="center">{moment(timeDate).format('hh:mm:ss')}</h6>

        <div className="form-group">
          <input type="number" />
          <span className="stag">:</span>
          <input type="number" />
        </div>
        <div className="center">
          <button>Add Alarm</button>
        </div>

        <p>Start editing to see some magic happen :)</p>
      </div>
    </div>
  );
}
