import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import moment from 'moment';
import { useAppointment } from '../context/AppointmentContext';
import BookingForm from './BookingForm';

const AppointmentScheduler = () => {
  const { doctorId } = useParams();
  const { doctors, fetchAvailableSlots, loading, error } = useAppointment();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [slotMessage, setSlotMessage] = useState('');

  const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(doctorId));

  // Generate next 7 days
  useEffect(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(moment().add(i, 'days').format('YYYY-MM-DD'));
    }
    setDateRange(days);
    setSelectedDate(days[0]);
  }, []);

  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const getSlots = async () => {
        try {
          const response = await fetchAvailableSlots(doctorId, selectedDate);
          if (response && response.availableSlots) {
            setAvailableSlots(response.availableSlots);
            setSlotMessage(response.message || '');
          } else {
            setAvailableSlots(response || []);
            setSlotMessage('');
          }
        } catch (error) {
          console.error('Error fetching slots:', error);
          setAvailableSlots([]);
          setSlotMessage('Failed to load available slots. Please try again.');
        }
      };
      getSlots();
    }
  }, [doctorId, selectedDate, fetchAvailableSlots]);

  const [selectedDuration, setSelectedDuration] = useState(30);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
    setSelectedSlot(null);
    // Refresh slots after booking
    fetchAvailableSlots(doctorId, selectedDate).then(response => {
      if (response && response.availableSlots) {
        setAvailableSlots(response.availableSlots);
        setSlotMessage(response.message || '');
      } else {
        setAvailableSlots(response || []);
        setSlotMessage('');
      }
    }).catch(error => {
      console.error('Error refreshing slots after booking:', error);
      setAvailableSlots([]);
      setSlotMessage('Failed to refresh available slots. Please try again.');
    });
  };

  if (loading && availableSlots.length === 0) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!selectedDoctor) {
    return <Alert variant="danger">Doctor not found</Alert>;
  }

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <div className="d-flex align-items-center mb-3">
                            <img 
                  src={selectedDoctor.profile_image || 'https://i.pravatar.cc/80?img=0'} 
                  alt={selectedDoctor.name}
                  className="rounded-circle me-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://i.pravatar.cc/80?img=0';
                  }}
                />
                          <div>
                <h2 className="mb-1">Schedule with {selectedDoctor.name}</h2>
                <p className="text-muted mb-1">{selectedDoctor.specialization}</p>
                <p className="mb-0">Working Hours: {JSON.parse(selectedDoctor.working_hours || '{"start":"09:00","end":"17:00"}').start} - {JSON.parse(selectedDoctor.working_hours || '{"start":"09:00","end":"17:00"}').end}</p>
              </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Select Date</h5>
            </Card.Header>
            <Card.Body className="date-selector">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {dateRange.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "primary" : "outline-primary"}
                    onClick={() => setSelectedDate(date)}
                    className="date-button"
                  >
                    {moment(date).format('ddd, MMM D')}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Available Time Slots for {moment(selectedDate).format('dddd, MMMM D, YYYY')}</h5>
            </Card.Header>
            <Card.Body>
              {availableSlots.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant="outline-success"
                      onClick={() => handleSlotSelect(slot)}
                      className="time-slot-button"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              ) : (
                <Alert variant={slotMessage.includes('leave') ? "warning" : "info"}>
                  {slotMessage || 'No available slots for this date.'}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showBookingForm && (
        <BookingForm
          doctorId={parseInt(doctorId)}
          doctorName={selectedDoctor.name}
          date={selectedDate}
          time={selectedSlot}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
};

export default AppointmentScheduler;
