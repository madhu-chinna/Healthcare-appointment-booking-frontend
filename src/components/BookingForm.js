import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAppointment } from '../context/AppointmentContext';

const BookingForm = ({ doctorId, doctorName, date, time, onClose }) => {
  const { bookAppointment, loading } = useAppointment();
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    appointment_type: 'Regular',
    duration: 30,
    notes: ''
  });
  const [validated, setValidated] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    
    try {
      const appointmentData = {
        doctor_id: doctorId,
        date: `${date} ${time}`,
        ...formData
      };
      
      await bookAppointment(appointmentData);
      alert('Appointment booked successfully! You will receive a confirmation email.');
      onClose();
    } catch (err) {
      setFormError('Failed to book appointment. Please try again.');
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Doctor:</strong> {doctorName}<br />
          <strong>Date:</strong> {date}<br />
          <strong>Time:</strong> {time}
        </p>
        
        {formError && <Alert variant="danger">{formError}</Alert>}
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a patient name.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Patient Email</Form.Label>
            <Form.Control
              type="email"
              name="patient_email"
              value={formData.patient_email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Appointment Type</Form.Label>
            <Form.Select
              name="appointment_type"
              value={formData.appointment_type}
              onChange={handleChange}
              required
            >
              <option value="Regular">Regular Checkup</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Emergency">Emergency</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
          
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingForm;