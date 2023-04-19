import moment = require('moment/moment');
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillTrashFill, BsToggleOff, BsToggleOn } from 'react-icons/bs';
import Swal from 'sweetalert2';
import './style.css';
import { Alarm } from './types';
import useSound from 'use-sound';
import boopSfx from '';
export default function App() {
  const [timeDate, setTimeDate] = useState(new Date());
  const [alarms, setAlarms] = useState([] as Alarm[]);
  const [play] = useSound(boopSfx);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const addAlarm = (data) => {
    let nowDate = moment();
    let dateNew = new Date(
      nowDate.year(),
      nowDate.month(),
      Number(nowDate.format('DD')),
      data.hour,
      data.minute,
      0
    );
    setAlarms([
      ...alarms,
      {
        date: dateNew,
        status: true,
      },
    ]);
    setValue('hour', '');
    setValue('minute', '');
  };

  const deleteAlarm = (index: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        setAlarms(alarms.filter((_, i) => i != index));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const changeStatusAlarm = (index) => {
    setAlarms(
      alarms.map((data, i) => {
        if (i == index) {
          data.status = !data.status;
        }
        return data;
      })
    );
  };

  setTimeout(() => {
    setTimeDate(new Date());
    if(alarms.find(el=>moment(el.date).format('HH:mm:ss')==moment(timeDate).format('HH:mm:ss'))){

    }
  }, 1000);

  return (
    <div className="content">
      <div className="card">
        <h1 className="center">App de Alarma</h1>
        <h6 className="center">{moment(timeDate).format('HH:mm:ss')}</h6>
        <form onSubmit={handleSubmit(addAlarm)}>
          <div className="form-group">
            <input
              type="number"
              placeholder="HH"
              max="23"
              {...register('hour', { required: true, maxLength: 2, max: 23 })}
            />
            <span className="stag">:</span>
            <input
              type="number"
              placeholder="MM"
              {...register('minute', { required: true, maxLength: 2, max: 60 })}
            />
          </div>
          <div className="center">
            <button className="btn-alarm" type="submit">
              Add Alarm
            </button>
          </div>
        </form>

        {alarms.map((el, index) => (
          <div className="context-item" key={index}>
            {moment(el.date).format('HH:mm')}
            <div>
              <button
                className="btn-icon"
                onClick={() => changeStatusAlarm(index)}
              >
                {el.status ? <BsToggleOn /> : <BsToggleOff />}
              </button>
              <button className="btn-icon" onClick={() => deleteAlarm(index)}>
                <BsFillTrashFill />
              </button>
            </div>
          </div>
        ))}
        {alarms.length == 0 ? <span>No content alarms.</span> : null}
      </div>
    </div>
  );
}
