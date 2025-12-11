import express from 'express';
import {
  userController,
  patientController,
  doctorController,
  hospitalController,
  areaController,
  specialtyController,
  shiftController,
  appointmentController,
  statsController
} from '../controllers/adminController.js';

const router = express.Router();

// ==================== ESTADÍSTICAS ====================
router.get('/stats/summary', statsController.getAdminSummary);
router.get('/stats/users-by-role', statsController.getUsersByRole);
router.get('/stats/activity', statsController.getActivityReport);

// ==================== USUARIOS ====================
router.get('/users', userController.getAllUsers);
router.get('/users/roles', userController.getRoles);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.patch('/users/:id/toggle-status', userController.toggleUserStatus);

// ==================== PACIENTES ====================
router.get('/patients', patientController.getAllPatients);
router.get('/patients/:id', patientController.getPatientById);

// ==================== DOCTORES ====================
router.get('/doctors', doctorController.getAllDoctors);
router.put('/doctors/:id', doctorController.updateDoctor);

// ==================== HOSPITALES ====================
router.get('/hospitals', hospitalController.getAllHospitals);
router.post('/hospitals', hospitalController.createHospital);
router.put('/hospitals/:id', hospitalController.updateHospital);
router.delete('/hospitals/:id', hospitalController.deleteHospital);

// ==================== ÁREAS ====================
router.get('/hospitals/:hospitalId/areas', areaController.getAreasByHospital);
router.post('/hospitals/:hospitalId/areas', areaController.createArea);
router.put('/areas/:id', areaController.updateArea);
router.delete('/areas/:id', areaController.deleteArea);

// ==================== ESPECIALIDADES ====================
router.get('/specialties', specialtyController.getAllSpecialties);
router.post('/specialties', specialtyController.createSpecialty);
router.put('/specialties/:id', specialtyController.updateSpecialty);
router.delete('/specialties/:id', specialtyController.deleteSpecialty);

// ==================== TURNOS ====================
router.get('/doctors/:doctorId/shifts', shiftController.getShiftsByDoctor);
router.post('/doctors/:doctorId/shifts', shiftController.createShift);
router.put('/shifts/:id', shiftController.updateShift);
router.delete('/shifts/:id', shiftController.deleteShift);

// ==================== CITAS (REPORTES) ====================
router.get('/appointments', appointmentController.getAllAppointments);

export default router;