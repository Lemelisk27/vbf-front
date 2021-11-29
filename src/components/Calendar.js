import React, {useState, useEffect} from 'react';
import Auth from "../utils/auth"
import API from "../utils/API"
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
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
  EditRecurrenceMenu,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

function Calendar (props) {
    const [appointments, setAppointments] = useState([])
    const [addedAppointment, changeAddedAppointment] = useState({})
    const [appointmentChanges, changeAppointmentChanges] = useState({})
    const [editingAppointment, changeEditingAppointment] = useState(undefined)
    const token = Auth.getToken()

    const commitChanges = ({ added, changed, deleted }) => {
        const newToken = Auth.getToken()
        if (added) {
            console.log("added")
            console.log(added)
        }
        if (changed) {
            console.log("changed")
            console.log(changed)
        }
        if (deleted !== undefined) {
            API.deleteAppt(deleted,newToken)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    useEffect (() => {
        API.getAppts(token)
        .then(res=>{
            setAppointments(res.data)
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
                <EditingState
                    onCommitChanges={commitChanges}
                    addedAppointment={addedAppointment}
                    onAddedAppointmentChange={changeAddedAppointment}
                    appointmentChanges={appointmentChanges}
                    onAppointmentChangesChange={changeAppointmentChanges}
                    editingAppointment={editingAppointment}
                    onEditingAppointmentChange={changeEditingAppointment}
                />
                <DayView
                    startDayHour={8}
                    endDayHour={19}
                />
                <WeekView
                    startDayHour={8}
                    endDayHour={19}
                />
                <MonthView />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
                <EditRecurrenceMenu />
                <ConfirmationDialog />
                <Appointments />
                <AppointmentTooltip
                    showCloseButton
                    showOpenButton
                    showDeleteButton
                />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    )
}

export default Calendar