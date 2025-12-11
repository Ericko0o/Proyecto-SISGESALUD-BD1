import { pool } from "../config/db.sql.js";

// Modelo de Usuarios (para login/autenticación)
export const User = {
  // Obtener todos los usuarios con sus roles
  findAll: async (filters = {}) => {
    let query = `
      SELECT 
        u.id_usuario,
        u.nombre,
        u.dni,
        u.email,
        u.creado_en,
        r.nombre as rol_nombre,
        r.id_rol,
        CASE 
          WHEN p.id_paciente IS NOT NULL THEN 'Paciente'
          WHEN d.id_doctor IS NOT NULL THEN 'Doctor'
          ELSE 'Usuario'
        END as tipo_usuario
      FROM usuarios u
      JOIN roles r ON u.id_rol = r.id_rol
      LEFT JOIN pacientes p ON u.id_usuario = p.id_usuario
      LEFT JOIN doctores d ON u.id_usuario = d.id_usuario
      WHERE 1=1
    `;
    
    const values = [];

    if (filters.search) {
      query += ` AND (u.nombre ILIKE $${values.length + 1} OR u.email ILIKE $${values.length + 1} OR u.dni ILIKE $${values.length + 1})`;
      values.push(`%${filters.search}%`);
    }

    if (filters.role) {
      query += ` AND r.nombre = $${values.length + 1}`;
      values.push(filters.role);
    }

    query += ` ORDER BY u.creado_en DESC`;
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener usuario por ID
  findById: async (id) => {
    try {
      const result = await pool.query(
        `SELECT u.*, r.nombre as rol_nombre
         FROM usuarios u
         JOIN roles r ON u.id_rol = r.id_rol
         WHERE u.id_usuario = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Crear usuario
  create: async (userData) => {
    const { nombre, dni, email, password, id_rol } = userData;
    try {
      const result = await pool.query(
        `INSERT INTO usuarios (nombre, dni, email, password, id_rol)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id_usuario, nombre, email, dni, creado_en`,
        [nombre, dni, email, password, id_rol]
      );
      
      // Si es paciente, crear registro en pacientes
      if (id_rol === 1) { // 1 = Paciente
        const roleResult = await pool.query('SELECT nombre FROM roles WHERE id_rol = $1', [id_rol]);
        const rolNombre = roleResult.rows[0]?.nombre;
        
        if (rolNombre === 'Paciente') {
          await pool.query(
            `INSERT INTO pacientes (id_usuario, dni, nombres, apellidos)
             VALUES ($1, $2, $3, $4)`,
            [result.rows[0].id_usuario, dni, nombre.split(' ')[0], nombre.split(' ').slice(1).join(' ')]
          );
        }
      }
      
      // Si es doctor, crear registro en doctores
      if (id_rol === 2) { // 2 = Doctor
        await pool.query(
          `INSERT INTO doctores (id_usuario, dni, nombres, apellidos)
           VALUES ($1, $2, $3, $4)`,
          [result.rows[0].id_usuario, dni, nombre.split(' ')[0], nombre.split(' ').slice(1).join(' ')]
        );
      }
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Actualizar usuario
  update: async (id, userData) => {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(userData).forEach((key) => {
      if (userData[key] !== undefined && key !== 'password') {
        fields.push(`${key} = $${paramCount}`);
        values.push(userData[key]);
        paramCount++;
      }
    });

    // Si hay contraseña, hashearla
    if (userData.password) {
      fields.push(`password = $${paramCount}`);
      values.push(userData.password); // Asumimos que ya viene hasheada del controller
      paramCount++;
    }

    values.push(id);
    const query = `
      UPDATE usuarios 
      SET ${fields.join(', ')}
      WHERE id_usuario = $${paramCount}
      RETURNING id_usuario, nombre, email, dni
    `;

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Desactivar usuario (en tu esquema no hay estado, así que podríamos marcarlo de otra forma)
  toggleActive: async (id) => {
    try {
      // Como no hay campo estado, podríamos agregar uno o simplemente no hacer nada
      // Por ahora solo retornamos el usuario
      const result = await pool.query(
        `SELECT id_usuario, nombre, email FROM usuarios WHERE id_usuario = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Verificar si email existe
  findByEmail: async (email) => {
    try {
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Contar usuarios por rol
  countByRole: async () => {
    try {
      const result = await pool.query(`
        SELECT 
          r.nombre as rol,
          COUNT(u.id_usuario) as total
        FROM usuarios u
        JOIN roles r ON u.id_rol = r.id_rol
        GROUP BY r.nombre
        ORDER BY total DESC
      `);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener todos los roles
  getRoles: async () => {
    try {
      const result = await pool.query('SELECT * FROM roles ORDER BY id_rol');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Pacientes (basado en tu esquema)
export const Patient = {
  findAll: async (filters = {}) => {
    let query = `
      SELECT 
        p.*,
        u.email,
        u.creado_en as fecha_registro
      FROM pacientes p
      LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
      WHERE 1=1
    `;
    
    const values = [];

    if (filters.search) {
      query += ` AND (p.nombres ILIKE $${values.length + 1} OR p.apellidos ILIKE $${values.length + 1} OR p.dni ILIKE $${values.length + 1})`;
      values.push(`%${filters.search}%`);
    }

    query += ` ORDER BY p.nombres, p.apellidos`;
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const result = await pool.query(
        `SELECT p.*, u.email 
         FROM pacientes p
         LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
         WHERE p.id_paciente = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Doctores (basado en tu esquema)
export const Doctor = {
  findAll: async (filters = {}) => {
    let query = `
      SELECT 
        d.*,
        e.nombre as especialidad_nombre,
        u.email
      FROM doctores d
      LEFT JOIN especialidades e ON d.id_especialidad = e.id_especialidad
      LEFT JOIN usuarios u ON d.id_usuario = u.id_usuario
      WHERE 1=1
    `;
    
    const values = [];

    if (filters.search) {
      query += ` AND (d.nombres ILIKE $${values.length + 1} OR d.apellidos ILIKE $${values.length + 1})`;
      values.push(`%${filters.search}%`);
    }

    if (filters.especialidad) {
      query += ` AND e.nombre = $${values.length + 1}`;
      values.push(filters.especialidad);
    }

    query += ` ORDER BY d.nombres, d.apellidos`;
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const result = await pool.query(
        `SELECT d.*, e.nombre as especialidad_nombre, u.email
         FROM doctores d
         LEFT JOIN especialidades e ON d.id_especialidad = e.id_especialidad
         LEFT JOIN usuarios u ON d.id_usuario = u.id_usuario
         WHERE d.id_doctor = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Para el admin: actualizar doctor
  update: async (id, doctorData) => {
    const { nombres, apellidos, id_especialidad } = doctorData;
    try {
      const result = await pool.query(
        `UPDATE doctores 
         SET nombres = $1, apellidos = $2, id_especialidad = $3
         WHERE id_doctor = $4
         RETURNING *`,
        [nombres, apellidos, id_especialidad, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Hospitales (basado en tu esquema)
export const Hospital = {
  findAll: async () => {
    try {
      const result = await pool.query(`
        SELECT 
          h.*,
          (SELECT COUNT(*) FROM areas a WHERE a.id_hospital = h.id_hospital) as areas_count,
          (SELECT COUNT(*) FROM citas c WHERE c.id_hospital = h.id_hospital) as citas_count
        FROM hospitales h
        ORDER BY h.nombre
      `);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const result = await pool.query(
        'SELECT * FROM hospitales WHERE id_hospital = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  create: async (hospitalData) => {
    const { nombre, direccion, tipo } = hospitalData;
    try {
      const result = await pool.query(
        `INSERT INTO hospitales (nombre, direccion, tipo)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nombre, direccion, tipo]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (id, hospitalData) => {
    const { nombre, direccion, tipo } = hospitalData;
    try {
      const result = await pool.query(
        `UPDATE hospitales 
         SET nombre = $1, direccion = $2, tipo = $3
         WHERE id_hospital = $4
         RETURNING *`,
        [nombre, direccion, tipo, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await pool.query('DELETE FROM hospitales WHERE id_hospital = $1', [id]);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Áreas (basado en tu esquema)
export const Area = {
  findByHospital: async (hospitalId) => {
    try {
      const result = await pool.query(
        'SELECT * FROM areas WHERE id_hospital = $1 ORDER BY nombre',
        [hospitalId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (areaData) => {
    const { id_hospital, nombre, tipo_servicio } = areaData;
    try {
      const result = await pool.query(
        `INSERT INTO areas (id_hospital, nombre, tipo_servicio)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [id_hospital, nombre, tipo_servicio]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (id, areaData) => {
    const { nombre, tipo_servicio } = areaData;
    try {
      const result = await pool.query(
        `UPDATE areas 
         SET nombre = $1, tipo_servicio = $2
         WHERE id_area = $3
         RETURNING *`,
        [nombre, tipo_servicio, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await pool.query('DELETE FROM areas WHERE id_area = $1', [id]);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Especialidades (basado en tu esquema)
export const Specialty = {
  findAll: async () => {
    try {
      const result = await pool.query(
        'SELECT * FROM especialidades ORDER BY nombre'
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (specialtyData) => {
    const { nombre } = specialtyData;
    try {
      const result = await pool.query(
        `INSERT INTO especialidades (nombre)
         VALUES ($1)
         RETURNING *`,
        [nombre]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (id, specialtyData) => {
    const { nombre } = specialtyData;
    try {
      const result = await pool.query(
        `UPDATE especialidades 
         SET nombre = $1
         WHERE id_especialidad = $2
         RETURNING *`,
        [nombre, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await pool.query('DELETE FROM especialidades WHERE id_especialidad = $1', [id]);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Turnos (basado en tu esquema)
export const Turno = {
  findByDoctor: async (doctorId) => {
    try {
      const result = await pool.query(
        `SELECT 
          t.*,
          a.nombre as area_nombre,
          h.nombre as hospital_nombre
         FROM turnos t
         LEFT JOIN areas a ON t.id_area = a.id_area
         LEFT JOIN hospitales h ON a.id_hospital = h.id_hospital
         WHERE t.id_doctor = $1
         ORDER BY 
           CASE 
             WHEN t.hora_inicio IS NOT NULL THEN 1
             ELSE 2
           END,
           t.hora_inicio`,
        [doctorId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (turnoData) => {
    const { id_doctor, id_area, hora_inicio, hora_fin } = turnoData;
    try {
      const result = await pool.query(
        `INSERT INTO turnos (id_doctor, id_area, hora_inicio, hora_fin)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [id_doctor, id_area, hora_inicio, hora_fin]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (id, turnoData) => {
    const { id_area, hora_inicio, hora_fin } = turnoData;
    try {
      const result = await pool.query(
        `UPDATE turnos 
         SET id_area = $1, hora_inicio = $2, hora_fin = $3
         WHERE id_turno = $4
         RETURNING *`,
        [id_area, hora_inicio, hora_fin, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await pool.query('DELETE FROM turnos WHERE id_turno = $1', [id]);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Citas (para reportes)
export const Appointment = {
  findAll: async (filters = {}) => {
    let query = `
      SELECT 
        c.*,
        p.nombres || ' ' || p.apellidos as paciente_nombre,
        d.nombres || ' ' || d.apellidos as doctor_nombre,
        h.nombre as hospital_nombre,
        es.nombre as especialidad_nombre
      FROM citas c
      JOIN pacientes p ON c.id_paciente = p.id_paciente
      JOIN doctores d ON c.id_doctor = d.id_doctor
      JOIN hospitales h ON c.id_hospital = h.id_hospital
      LEFT JOIN especialidades es ON d.id_especialidad = es.id_especialidad
      WHERE 1=1
    `;
    
    const values = [];

    if (filters.startDate) {
      query += ` AND c.fecha_hora >= $${values.length + 1}`;
      values.push(filters.startDate);
    }

    if (filters.endDate) {
      query += ` AND c.fecha_hora <= $${values.length + 1}`;
      values.push(filters.endDate);
    }

    if (filters.specialty) {
      query += ` AND es.nombre = $${values.length + 1}`;
      values.push(filters.specialty);
    }

    if (filters.estado) {
      query += ` AND c.estado = $${values.length + 1}`;
      values.push(filters.estado);
    }

    query += ` ORDER BY c.fecha_hora DESC`;
    
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

// Modelo de Estadísticas
export const Stats = {
  getAdminSummary: async () => {
    try {
      const [
        usersResult,
        doctorsResult,
        hospitalsResult,
        patientsResult,
        appointmentsResult
      ] = await Promise.all([
        pool.query("SELECT COUNT(*) as total FROM usuarios"),
        pool.query("SELECT COUNT(*) as total FROM doctores"),
        pool.query("SELECT COUNT(*) as total FROM hospitales"),
        pool.query("SELECT COUNT(*) as total FROM pacientes"),
        pool.query("SELECT COUNT(*) as total FROM citas WHERE estado != 'Cancelada'")
      ]);

      return {
        totalUsers: parseInt(usersResult.rows[0].total),
        totalDoctors: parseInt(doctorsResult.rows[0].total),
        totalHospitals: parseInt(hospitalsResult.rows[0].total),
        totalPatients: parseInt(patientsResult.rows[0].total),
        totalAppointments: parseInt(appointmentsResult.rows[0].total)
      };
    } catch (error) {
      throw error;
    }
  },

  getActivityReport: async (startDate, endDate) => {
    try {
      const query = `
        SELECT 
          DATE_TRUNC('month', fecha_hora) as month,
          COUNT(*) as appointments,
          COUNT(DISTINCT id_paciente) as new_patients
        FROM citas
        WHERE fecha_hora BETWEEN $1 AND $2
        GROUP BY DATE_TRUNC('month', fecha_hora)
        ORDER BY month
      `;
      
      const result = await pool.query(query, [startDate, endDate]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};