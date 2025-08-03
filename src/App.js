// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorList from './components/DoctorList';
import AppointmentScheduler from './components/AppointmentScheduler';
import AppointmentManager from './components/AppointmentManager';
import Header from './components/Header';
import { AppointmentProvider } from './context/AppointmentContext';

function App() {
  return (
    <Router>
      <AppointmentProvider>
        <Header />
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<DoctorList />} />
            <Route path="/schedule/:doctorId" element={<AppointmentScheduler />} />
            <Route path="/appointments" element={<AppointmentManager />} />
          </Routes>
        </Container>
      </AppointmentProvider>
    </Router>
  );
}

export default App;
