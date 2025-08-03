import React, { useState, useEffect } from 'react';
import { getAvailableSlots } from '../services/api';
import { Typography, Grid, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Ensure this import is correct

const CalendarView = ({ doctorId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (doctorId) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      getAvailableSlots(doctorId, dateStr).then(response => setSlots(response.data.availableSlots));
    }
  }, [doctorId, selectedDate]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Select a Date</Typography>
      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
      <Typography variant="h6" gutterBottom>Available Slots</Typography>
      <Grid container spacing={2}>
        {slots.map(slot => (
          <Grid item key={slot}>
            <Button variant="contained" onClick={() => alert(`Book slot: ${slot}`)}>{slot}</Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CalendarView;
