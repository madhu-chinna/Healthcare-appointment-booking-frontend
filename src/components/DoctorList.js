import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner, Alert, Form, Badge } from 'react-bootstrap';
import { useAppointment } from '../context/AppointmentContext';

const DoctorList = () => {
  const { doctors, loading, error } = useAppointment();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter doctors based on search term
  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctors;
    
    return doctors.filter(doctor => 
      (doctor.name && doctor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [doctors, searchTerm]);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Available Today':
        return 'success';
      case 'Fully Booked':
        return 'warning';
      case 'On Leave':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) {
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

  return (
    <>
      <h2 className="mb-4">Select a Doctor</h2>
      
      {/* Search Bar */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredDoctors.map((doctor) => (
          <Col key={doctor.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={doctor.profile_image || 'https://i.pravatar.cc/60?img=0'} 
                    alt={doctor.name}
                    className="rounded-circle me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://i.pravatar.cc/60?img=0';
                    }}
                  />
                  <div>
                    <Card.Title className="mb-1">{doctor.name}</Card.Title>
                    <Card.Text className="text-muted mb-1">{doctor.specialization}</Card.Text>
                    <Badge bg={getStatusBadgeVariant(doctor.availability_status)}>
                      {doctor.availability_status}
                    </Badge>
                  </div>
                </div>
                <Card.Text>
                  <small className="text-muted">
                    Working Hours: {JSON.parse(doctor.working_hours || '{"start":"09:00","end":"17:00"}').start} - {JSON.parse(doctor.working_hours || '{"start":"09:00","end":"17:00"}').end}
                  </small>
                </Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => navigate(`/schedule/${doctor.id}`)}
                  disabled={doctor.availability_status === 'On Leave' || doctor.availability_status === 'Fully Booked'}
                >
                  {doctor.availability_status === 'On Leave' ? 'On Leave' : 
                   doctor.availability_status === 'Fully Booked' ? 'Fully Booked' : 
                   'Schedule Appointment'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {filteredDoctors.length === 0 && !loading && (
        <Alert variant="info">
          No doctors found matching your search criteria.
        </Alert>
      )}
    </>
  );
};

export default DoctorList;



