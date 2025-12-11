import bcrypt from 'bcryptjs';
import { 
  User, Patient, Doctor, Hospital, Area, Specialty, 
  Turno, Appointment, Stats 
} from '../models/userModel.sql.js';

// Controlador de Usuarios (Administración)
export const userController = {
  getAllUsers: async (req, res) => {
    try {
      const { search, role } = req.query;
      const filters = {};
      
      if (search) filters.search = search;
      if (role) filters.role = role;
      
      const users = await User.findAll(filters);
      res.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getRoles: async (req, res) => {
    try {
      const roles = await User.getRoles();
      res.json(roles);
    } catch (error) {
      console.error('Error al obtener roles:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { nombre, dni, email, password, id_rol } = req.body;

      // Verificar si el email ya existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const userData = {
        nombre,
        dni: dni || null,
        email,
        password: hashedPassword,
        id_rol: parseInt(id_rol)
      };

      const newUser = await User.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;

      // Si se envía nueva contraseña, hashearla
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      const updatedUser = await User.update(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  toggleUserStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.toggleActive(id);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json({ 
        message: 'Estado actualizado',
        user 
      });
    } catch (error) {
      console.error('Error al cambiar estado del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Pacientes (para admin)
export const patientController = {
  getAllPatients: async (req, res) => {
    try {
      const { search } = req.query;
      const filters = {};
      
      if (search) filters.search = search;
      
      const patients = await Patient.findAll(filters);
      res.json(patients);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getPatientById: async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await Patient.findById(id);
      
      if (!patient) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }

      res.json(patient);
    } catch (error) {
      console.error('Error al obtener paciente:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Doctores (para admin)
export const doctorController = {
  getAllDoctors: async (req, res) => {
    try {
      const { search, especialidad } = req.query;
      const filters = {};
      
      if (search) filters.search = search;
      if (especialidad) filters.especialidad = especialidad;
      
      const doctors = await Doctor.findAll(filters);
      res.json(doctors);
    } catch (error) {
      console.error('Error al obtener doctores:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  updateDoctor: async (req, res) => {
    try {
      const { id } = req.params;
      const doctorData = req.body;

      const updatedDoctor = await Doctor.update(id, doctorData);
      
      if (!updatedDoctor) {
        return res.status(404).json({ error: 'Doctor no encontrado' });
      }

      res.json(updatedDoctor);
    } catch (error) {
      console.error('Error al actualizar doctor:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Hospitales
export const hospitalController = {
  getAllHospitals: async (req, res) => {
    try {
      const hospitals = await Hospital.findAll();
      res.json(hospitals);
    } catch (error) {
      console.error('Error al obtener hospitales:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  createHospital: async (req, res) => {
    try {
      const hospital = await Hospital.create(req.body);
      res.status(201).json(hospital);
    } catch (error) {
      console.error('Error al crear hospital:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  updateHospital: async (req, res) => {
    try {
      const { id } = req.params;
      const hospital = await Hospital.update(id, req.body);
      
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital no encontrado' });
      }

      res.json(hospital);
    } catch (error) {
      console.error('Error al actualizar hospital:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  deleteHospital: async (req, res) => {
    try {
      const { id } = req.params;
      await Hospital.delete(id);
      res.json({ message: 'Hospital eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar hospital:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Áreas
export const areaController = {
  getAreasByHospital: async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const areas = await Area.findByHospital(hospitalId);
      res.json(areas);
    } catch (error) {
      console.error('Error al obtener áreas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  createArea: async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const areaData = { ...req.body, id_hospital: hospitalId };
      const area = await Area.create(areaData);
      res.status(201).json(area);
    } catch (error) {
      console.error('Error al crear área:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  updateArea: async (req, res) => {
    try {
      const { id } = req.params;
      const area = await Area.update(id, req.body);
      
      if (!area) {
        return res.status(404).json({ error: 'Área no encontrada' });
      }

      res.json(area);
    } catch (error) {
      console.error('Error al actualizar área:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  deleteArea: async (req, res) => {
    try {
      const { id } = req.params;
      await Area.delete(id);
      res.json({ message: 'Área eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar área:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Especialidades
export const specialtyController = {
  getAllSpecialties: async (req, res) => {
    try {
      const specialties = await Specialty.findAll();
      res.json(specialties);
    } catch (error) {
      console.error('Error al obtener especialidades:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  createSpecialty: async (req, res) => {
    try {
      const specialty = await Specialty.create(req.body);
      res.status(201).json(specialty);
    } catch (error) {
      console.error('Error al crear especialidad:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  updateSpecialty: async (req, res) => {
    try {
      const { id } = req.params;
      const specialty = await Specialty.update(id, req.body);
      
      if (!specialty) {
        return res.status(404).json({ error: 'Especialidad no encontrada' });
      }

      res.json(specialty);
    } catch (error) {
      console.error('Error al actualizar especialidad:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  deleteSpecialty: async (req, res) => {
    try {
      const { id } = req.params;
      await Specialty.delete(id);
      res.json({ message: 'Especialidad eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar especialidad:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Turnos
export const shiftController = {
  getShiftsByDoctor: async (req, res) => {
    try {
      const { doctorId } = req.params;
      const shifts = await Turno.findByDoctor(doctorId);
      res.json(shifts);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  createShift: async (req, res) => {
    try {
      const { doctorId } = req.params;
      const shiftData = { ...req.body, id_doctor: doctorId };
      const shift = await Turno.create(shiftData);
      res.status(201).json(shift);
    } catch (error) {
      console.error('Error al crear turno:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  updateShift: async (req, res) => {
    try {
      const { id } = req.params;
      const shift = await Turno.update(id, req.body);
      
      if (!shift) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }

      res.json(shift);
    } catch (error) {
      console.error('Error al actualizar turno:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  deleteShift: async (req, res) => {
    try {
      const { id } = req.params;
      await Turno.delete(id);
      res.json({ message: 'Turno eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar turno:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Citas (para reportes)
export const appointmentController = {
  getAllAppointments: async (req, res) => {
    try {
      const { startDate, endDate, specialty, estado } = req.query;
      const filters = {};
      
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;
      if (specialty) filters.specialty = specialty;
      if (estado) filters.estado = estado;
      
      const appointments = await Appointment.findAll(filters);
      res.json(appointments);
    } catch (error) {
      console.error('Error al obtener citas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Controlador de Estadísticas
export const statsController = {
  getAdminSummary: async (req, res) => {
    try {
      const summary = await Stats.getAdminSummary();
      res.json(summary);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getUsersByRole: async (req, res) => {
    try {
      const usersByRole = await User.countByRole();
      res.json(usersByRole);
    } catch (error) {
      console.error('Error al obtener usuarios por rol:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getActivityReport: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Se requieren fechas de inicio y fin' });
      }
      
      const report = await Stats.getActivityReport(startDate, endDate);
      res.json(report);
    } catch (error) {
      console.error('Error al generar reporte de actividad:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};