# Niroggyan Healthcare Appointment Booking System

A comprehensive healthcare appointment booking system built with React frontend and Node.js backend, featuring real-time slot availability, doctor management, and appointment scheduling.

## 🌐 Live Demo

- **Frontend:** https://healthcare-appointment-booking-fron.vercel.app/
- **Backend:** https://healthcare-appointment-booking-backend-4.onrender.com

## 🚀 Features

- **Doctor Management:** Browse and search doctors by specialization
- **Real-time Slot Availability:** View available time slots for each doctor
- **Smart Time Validation:** Prevents booking past time slots for today
- **Appointment Booking:** Easy appointment scheduling with patient details
- **Appointment Management:** View, edit, and cancel appointments
- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Professional UI:** Clean, modern interface with professional doctor images

## 🛠️ Tools/Libraries Used

### Frontend Technologies
- **React.js 18.2.0** - Modern JavaScript library for building user interfaces
- **React Router DOM 6.8.1** - Client-side routing for single-page applications
- **React Bootstrap 2.7.4** - UI components built on Bootstrap for React
- **Bootstrap 5.2.3** - CSS framework for responsive design
- **Axios 1.3.4** - HTTP client for API communication
- **Moment.js 2.29.4** - Date and time manipulation library

### Backend Technologies
- **Node.js 18.x** - JavaScript runtime environment
- **Express.js 4.21.2** - Web application framework for Node.js
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware
- **Moment.js with Timezone 2.30.1** - Date/time handling with timezone support
- **Express Validator 7.2.1** - Input validation and sanitization

### Development Tools
- **Nodemon 3.1.9** - Development server with auto-restart
- **Git** - Version control system
- **Render** - Cloud platform for backend deployment

### Architecture
- **RESTful API** - Standard HTTP methods for data operations
- **In-Memory Storage** - Fast data storage for development and demo
- **CORS Enabled** - Cross-origin requests support
- **Modular Design** - Separated frontend and backend concerns

## 📁 Project Structure

```
niroggyan-healthcare-booking/
├── appointment-frontend/          # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── context/              # React context for state management
│   │   └── App.js               # Main application component
│   ├── package.json
│   └── README.md
├── appointment-backend/           # Node.js backend API
│   ├── app.js                   # Main server file
│   ├── package.json
│   └── README.md
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/niroggyan-healthcare-booking.git
   cd niroggyan-healthcare-booking
   ```

2. **Install backend dependencies**
   ```bash
   cd appointment-backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../appointment-frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../appointment-backend
   npm start
   ```
   Backend will run on `http://localhost:3008`

5. **Start the frontend application**
   ```bash
   cd ../appointment-frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 📋 API Endpoints

### Doctors
- `GET /doctors` - Get all doctors
- `POST /doctors` - Add a new doctor
- `GET /doctors/:id/slots` - Get available slots for a doctor

### Appointments
- `GET /appointments` - Get all appointments
- `POST /appointments` - Book a new appointment
- `PUT /appointments/:id` - Update an appointment
- `DELETE /appointments/:id` - Cancel an appointment
- `DELETE /appointments/cleanup/all` - Clear all appointments

## 🔧 Challenges Faced and Solutions

### 1. **SQLite3 Deployment Issues on Render**
**Challenge:** The original backend used SQLite3 which failed to deploy on Render due to native compilation issues and platform incompatibility.

**Solution:** 
- Replaced SQLite3 with in-memory storage using JavaScript arrays
- Implemented proper data structures for doctors and appointments
- Added data persistence through application lifecycle
- This approach eliminated deployment issues while maintaining full functionality

### 2. **CORS Configuration for Production**
**Challenge:** Frontend couldn't communicate with the deployed backend due to CORS policy restrictions.

**Solution:**
- Implemented comprehensive CORS configuration with proper headers
- Added support for multiple origins (localhost, production domains)
- Configured allowed methods and headers for all API operations
- Tested and verified cross-origin requests work correctly

### 3. **Timezone Handling for Indian Users**
**Challenge:** Time slots were being generated in server timezone instead of Indian Standard Time (IST).

**Solution:**
- Integrated moment-timezone library for proper timezone support
- Updated all time calculations to use 'Asia/Kolkata' timezone
- Modified slot generation logic to respect Indian time
- Ensured appointment times are displayed correctly for Indian users

### 4. **Past Time Slot Prevention**
**Challenge:** Users could book appointments in past time slots when booking for today.

**Solution:**
- Implemented real-time validation using moment.js
- Added logic to filter out past time slots for current day
- Created dynamic slot generation based on current time
- Enhanced user experience by showing only available future slots

### 5. **Professional Image Integration**
**Challenge:** Random avatar images were showing inappropriate content (children's faces) for a healthcare application.

**Solution:**
- Replaced random avatars with professional doctor images from Unsplash
- Selected high-quality, appropriate medical professional photos
- Implemented proper image sizing and cropping for consistent display
- Enhanced application credibility and user trust

## 🚀 Improvements with More Time

### **Database Integration**
- **PostgreSQL Implementation:** Replace in-memory storage with a proper PostgreSQL database
- **Data Persistence:** Ensure data survives server restarts and deployments
- **Database Migrations:** Implement proper schema management and versioning
- **Connection Pooling:** Optimize database connections for better performance

### **Authentication & Authorization**
- **User Registration/Login:** Implement JWT-based authentication system
- **Role-based Access:** Different access levels for patients, doctors, and admins
- **Password Security:** Bcrypt hashing and secure password policies
- **Session Management:** Secure session handling and token refresh

### **Advanced Features**
- **Email Notifications:** Send confirmation emails for appointments
- **SMS Reminders:** Text message reminders for upcoming appointments
- **Video Consultations:** Integrate video calling for telemedicine
- **Payment Integration:** Stripe/PayPal integration for appointment fees
- **Prescription Management:** Digital prescription system for doctors

### **Enhanced UI/UX**
- **Dark Mode:** Implement theme switching functionality
- **Multi-language Support:** Internationalization for different languages
- **Accessibility:** WCAG compliance and screen reader support
- **Progressive Web App:** PWA features for mobile app-like experience
- **Real-time Updates:** WebSocket integration for live updates

### **Performance Optimizations**
- **Caching:** Redis implementation for frequently accessed data
- **Image Optimization:** CDN integration for faster image loading
- **Code Splitting:** Lazy loading for better initial load times
- **API Rate Limiting:** Prevent abuse and ensure fair usage
- **Database Indexing:** Optimize query performance

### **Security Enhancements**
- **Input Validation:** Comprehensive server-side validation
- **SQL Injection Prevention:** Parameterized queries and input sanitization
- **XSS Protection:** Content Security Policy implementation
- **HTTPS Enforcement:** SSL/TLS configuration for all communications
- **API Security:** API key management and request signing

### **Monitoring & Analytics**
- **Error Tracking:** Sentry integration for error monitoring
- **Performance Monitoring:** Application performance metrics
- **User Analytics:** Track user behavior and appointment patterns
- **Health Checks:** Automated system health monitoring
- **Logging:** Comprehensive logging for debugging and auditing

### **Mobile Application**
- **React Native App:** Cross-platform mobile application
- **Push Notifications:** Real-time push notifications for appointments
- **Offline Support:** Offline functionality for basic features
- **Biometric Authentication:** Fingerprint/face recognition login

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/madhu-chinna)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Unsplash for professional doctor images
- React Bootstrap for UI components
- Moment.js for timezone handling
- Render for backend hosting

---
