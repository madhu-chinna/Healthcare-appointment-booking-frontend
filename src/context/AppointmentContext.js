// File: src/context/AppointmentContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://healthcare-appointment-booking-backend-4.onrender.com';

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch doctors
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching doctors from:', `${API_BASE_URL}/doctors`);
      const response = await axios.get(`${API_BASE_URL}/doctors`);
      console.log('Doctors response:', response.data);
      setDoctors(response.data);
    } catch (err) {
      console.error('Error details:', err.response || err);
      setError('Failed to fetch doctors. Please try again later. We are working on it.');
      console.error('Error fetching doctors:', err);
    }
    setLoading(false);
  }, []);

  // Fetch available slots
  const fetchAvailableSlots = useCallback(async (doctorId, date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/doctors/${doctorId}/slots?date=${date}`
      );
      return response.data;
    } catch (err) {
      setError('Failed to fetch available slots. Please try again later.');
      console.error('Error fetching slots:', err);
      return { availableSlots: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch appointments
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching appointments from:', `${API_BASE_URL}/appointments`);
      const response = await axios.get(`${API_BASE_URL}/appointments`);
      console.log('Appointments response:', response.data);
      setAppointments(response.data || []); // Handle empty response gracefully
    } catch (err) {
      console.error('Error details:', err.response || err);
      // Only show error if it's a real network error, not empty data
      if (err.response && err.response.status >= 400) {
        setError('Failed to fetch appointments. Please try again later. We are working on it.');
      }
      console.error('Error fetching appointments:', err);
    }
    setLoading(false);
  }, []);

  // Book appointment
  const bookAppointment = useCallback(async (appointmentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/appointments`,
        appointmentData
      );
      await fetchAppointments();
      return response.data;
    } catch (err) {
      setError('Failed to book appointment. Please try again later.');
      console.error('Error booking appointment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAppointments]);

  // Update appointment
  const updateAppointment = useCallback(async (appointmentId, appointmentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/appointments/${appointmentId}`,
        appointmentData
      );
      await fetchAppointments();
      return response.data;
    } catch (err) {
      setError('Failed to update appointment. Please try again later.');
      console.error('Error updating appointment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAppointments]);

  // Cancel appointment
  const cancelAppointment = useCallback(async (appointmentId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
      await fetchAppointments();
      return { success: true };
    } catch (err) {
      setError('Failed to cancel appointment. Please try again later.');
      console.error('Error canceling appointment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAppointments]);

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, [fetchDoctors, fetchAppointments]);

  const value = {
    doctors,
    appointments,
    loading,
    error,
    fetchDoctors,
    fetchAvailableSlots,
    fetchAppointments,
    bookAppointment,
    updateAppointment,
    cancelAppointment,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

