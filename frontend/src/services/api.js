const API_BASE_URL = 'http://localhost:4000/api';

// Función para hacer peticiones HTTP
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Servicios para Admin Dashboard
export const adminAPI = {
  // ==================== ESTADÍSTICAS ====================
  getStatsSummary: () => fetchAPI('/admin/stats/summary'),
  getUsersByRole: () => fetchAPI('/admin/stats/users-by-role'),
  getActivityReport: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/stats/activity${query ? `?${query}` : ''}`);
  },

  // ==================== USUARIOS ====================
  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/users${query ? `?${query}` : ''}`);
  },
  
  getRoles: () => fetchAPI('/admin/users/roles'),
  
  createUser: (userData) => 
    fetchAPI('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  updateUser: (id, userData) => 
    fetchAPI(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  
  toggleUserStatus: (id) => 
    fetchAPI(`/admin/users/${id}/toggle-status`, {
      method: 'PATCH',
    }),

  // ==================== PACIENTES ====================
  getPatients: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/patients${query ? `?${query}` : ''}`);
  },
  
  getPatientById: (id) => fetchAPI(`/admin/patients/${id}`),

  // ==================== DOCTORES ====================
  getDoctors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/doctors${query ? `?${query}` : ''}`);
  },
  
  updateDoctor: (id, doctorData) => 
    fetchAPI(`/admin/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(doctorData),
    }),

  // ==================== HOSPITALES ====================
  getHospitals: () => fetchAPI('/admin/hospitals'),
  
  createHospital: (hospitalData) => 
    fetchAPI('/admin/hospitals', {
      method: 'POST',
      body: JSON.stringify(hospitalData),
    }),
  
  updateHospital: (id, hospitalData) => 
    fetchAPI(`/admin/hospitals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hospitalData),
    }),
  
  deleteHospital: (id) => 
    fetchAPI(`/admin/hospitals/${id}`, {
      method: 'DELETE',
    }),

  // ==================== ÁREAS ====================
  getAreasByHospital: (hospitalId) => 
    fetchAPI(`/admin/hospitals/${hospitalId}/areas`),
  
  createArea: (hospitalId, areaData) => 
    fetchAPI(`/admin/hospitals/${hospitalId}/areas`, {
      method: 'POST',
      body: JSON.stringify(areaData),
    }),
  
  updateArea: (id, areaData) => 
    fetchAPI(`/admin/areas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(areaData),
    }),
  
  deleteArea: (id) => 
    fetchAPI(`/admin/areas/${id}`, {
      method: 'DELETE',
    }),

  // ==================== ESPECIALIDADES ====================
  getSpecialties: () => fetchAPI('/admin/specialties'),
  
  createSpecialty: (specialtyData) => 
    fetchAPI('/admin/specialties', {
      method: 'POST',
      body: JSON.stringify(specialtyData),
    }),
  
  updateSpecialty: (id, specialtyData) => 
    fetchAPI(`/admin/specialties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(specialtyData),
    }),
  
  deleteSpecialty: (id) => 
    fetchAPI(`/admin/specialties/${id}`, {
      method: 'DELETE',
    }),

  // ==================== TURNOS ====================
  getShiftsByDoctor: (doctorId) => 
    fetchAPI(`/admin/doctors/${doctorId}/shifts`),
  
  createShift: (doctorId, shiftData) => 
    fetchAPI(`/admin/doctors/${doctorId}/shifts`, {
      method: 'POST',
      body: JSON.stringify(shiftData),
    }),
  
  updateShift: (id, shiftData) => 
    fetchAPI(`/admin/shifts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(shiftData),
    }),
  
  deleteShift: (id) => 
    fetchAPI(`/admin/shifts/${id}`, {
      method: 'DELETE',
    }),

  // ==================== CITAS (REPORTES) ====================
  getAppointments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/appointments${query ? `?${query}` : ''}`);
  }
};