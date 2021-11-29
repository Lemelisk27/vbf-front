import React, {useState, useEffect} from 'react';
import Auth from "../utils/auth"
import API from "../utils/API"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
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
    const [updatePage, setUpdatePage] = useState(true)
    const token = Auth.getToken()

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            console.log("added")
            console.log(added)
        }
        if (changed) {
            console.log("changed")
            console.log(changed)
        }
        if (deleted !== undefined) {
            API.deleteAppt(deleted,token)
            .then(res=>{
                console.log(res)
                setUpdatePage(!updatePage)
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
        .catch(err=>{
            console.log(err)
        })
    },[])

    useEffect (() => {
        API.getAppts(token)
        .then(res=>{
            setAppointments(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[updatePage])

    const style = ({ palette }) => ({
        textCenter: {
            textAlign: 'center'
        }
    })

    const Content = withStyles(style, { name: 'Content' })(({ children, appointmentData, classes, ...restProps}) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Grid className="mx-auto col-11">
                    <h5 className="my-1 border-bottom border-secondary">{appointmentData.Animal.name}</h5>
                    <div className="col-11 mx-auto">
                        <p className="mb-0">Species: {appointmentData.Animal.Species.species}</p>
                        <p className="mb-0">Breed: {appointmentData.Animal.Breed.breed}</p>
                        <div className="mt-2 p-2 col-12 border border-secondary">
                            <p className="mb-0">Notes:</p>
                            <p className="mb-0">{appointmentData.notes}</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </AppointmentTooltip.Content>
    ))

    return (
        <Paper>
            <Scheduler
                data={appointments}
                height={700}
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
                    contentComponent={Content}
                />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    )
}

export default Calendar