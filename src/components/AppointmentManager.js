// File: src/components/AppointmentManager.js
import React, { useState } from 'react';
import { Table, Button, Badge, Spinner, Alert, Modal } from 'react-bootstrap';
import moment from 'moment';
import { useAppointment } from '../context/AppointmentContext';
import EditAppointment from './EditAppointment';

const AppointmentManager = () => {
  const { appointments, doctors, cancelAppointment, loading, error } = useAppointment();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const confirmCancel = async () => {
    try {
      await cancelAppointment(selectedAppointment.id);
      setShowConfirmModal(false);
    } catch (err) {
      console.error('Error canceling appointment:', err);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditingAppointment(null);
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  const formatAppointmentDate = (dateString) => {
    return moment(dateString).format('MMM D, YYYY [at] h:mm A');
  };

  const isUpcoming = (dateString) => {
    return moment(dateString).isAfter(moment());
  };

  if (loading && appointments.length === 0) {
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

  // Sort appointments by date (newest first)
  const sortedAppointments = [...appointments].sort((a, b) => 
    moment(b.date).valueOf() - moment(a.date).valueOf()
  );

  return (
    <>
      <h2 className="mb-4">My Appointments</h2>
      
      {sortedAppointments.length === 0 ? (
        <Alert variant="info">
          You don't have any appointments yet. <Button variant="link" href="/">Book an appointment</Button>
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped hover className="appointment-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Patient</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{getDoctorName(appointment.doctor_id)}</td>
                  <td>{formatAppointmentDate(appointment.date)}</td>
                  <td>{appointment.appointment_type}</td>
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.patient_email}</td>
                  <td>
                    {isUpcoming(appointment.date) ? (
                      <Badge bg="success">Upcoming</Badge>
                    ) : (
                      <Badge bg="secondary">Past</Badge>
                    )}
                  </td>
                  <td>
                    {isUpcoming(appointment.date) && (
                      <div className="d-flex gap-1">
                        <Button 
                          variant="warning" 
                          size="sm"
                          onClick={() => handleEditClick(appointment)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleCancelClick(appointment)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this appointment?
          {selectedAppointment && (
            <div className="mt-2">
              <p>
                <strong>Doctor:</strong> {getDoctorName(selectedAppointment.doctor_id)}<br />
                <strong>Date:</strong> {formatAppointmentDate(selectedAppointment.date)}<br />
                <strong>Patient:</strong> {selectedAppointment.patient_name}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Keep Appointment
          </Button>
          <Button variant="danger" onClick={confirmCancel} disabled={loading}>
            {loading ? 'Canceling...' : 'Confirm Cancellation'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Appointment Modal */}
      <EditAppointment
        appointment={editingAppointment}
        show={showEditModal}
        onClose={handleEditClose}
        onSuccess={() => {
          // Refresh appointments after successful edit
        }}
      />
    </>
  );
};

export default AppointmentManager;
