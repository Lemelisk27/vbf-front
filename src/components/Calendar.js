import React, {useState, useEffect} from 'react';
import Auth from "../utils/auth"
import API from "../utils/API"
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

function Calendar (props) {
    const token = Auth.getToken()
    const [appointments, setAppointments] = useState([])

    useEffect (() => {
        API.getAppts(token)
        .then(res=>{
            setAppointments(res.data)
            console.log(res.data)
        })
    },[])

    return (
        <Paper>
            <Scheduler
                data={appointments}
                height={590}
            >
                <ViewState
                    defaultCurrentViewName="Week"
                />
                <DayView
                    startDayHour={9}
                    endDayHour={19}
                />
                <WeekView
                    startDayHour={9}
                    endDayHour={19}
                />
                <MonthView />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AppointmentTooltip
                    showCloseButton
                    showOpenButton
                />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    )
}

export default Calendar