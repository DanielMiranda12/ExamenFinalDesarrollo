<template>
  <div class="container mt-4">

    <!-- ALERTA -->
    <!-- 5.5 Uso de Bootstrap 5: alerta estilizada para mostrar mensajes de error o éxito -->
    <div v-if="alerta.mensaje" :class="['alert', 'alert-' + alerta.tipo, 'alert-dismissible', 'fade', 'show']" role="alert">
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="alerta.mensaje = ''"></button>
    </div>

    <div class="d-flex justify-content-between mb-3">
      <h2>Usuarios</h2>
      <!-- 5.5 Uso de Bootstrap 5: botón estilizado con ícono + para crear un nuevo usuario -->
      <button class="btn btn-success" @click="abrirCrearModal">+ Crear Usuario</button>
    </div>

    <!-- TABLA DE USUARIOS -->
    <!-- 5.3 CRUD de Usuarios: listado de usuarios -->
    <table class="table table-striped shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- 5.3 CRUD: usamos v-for para recorrer usuarios -->
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.name }}</td> <!-- Muestra nombre -->
          <td>{{ usuario.username }}</td> <!-- Muestra username -->
          <td>
            <!-- 5.5 Íconos de Bootstrap Icons y modales para editar/eliminar -->
            <button class="btn btn-primary btn-sm me-2" @click="abrirEditarModal(usuario)">
              <i class="bi bi-pencil"></i> <!-- ícono de lápiz para editar -->
            </button>
            <button class="btn btn-danger btn-sm" @click="eliminarUsuario(usuario)">
              <i class="bi bi-trash"></i> <!-- ícono de bote de basura para eliminar -->
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL CREAR / EDITAR -->
    <!-- 5.3 CRUD: Modal reutilizable para crear y editar usuario -->
    <div class="modal fade show" tabindex="-1" style="display: block;" v-if="modalUsuario">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!-- Dinámica: cambiar título según si es creación o edición -->
            <h5 class="modal-title">{{ editarUsuario ? 'Editar Usuario' : 'Crear Usuario' }}</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <!-- 5.5 Formularios estilizados de Bootstrap -->
            <div class="mb-3">
              <label class="form-label">Nombre *</label>
              <input type="text" class="form-control" v-model="formulario.name">
            </div>
            <div class="mb-3">
              <label class="form-label">Usuario *</label>
              <input type="text" class="form-control" v-model="formulario.username">
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña *</label>
              <input type="password" class="form-control" v-model="formulario.password">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
            <button type="button" class="btn btn-success" @click="editarUsuario ? guardarEdicion() : crearUsuario()">
              {{ editarUsuario ? 'Guardar cambios' : 'Crear' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

// URL base de la API de usuarios
const API_URL = "https://6931faa111a8738467d128b6.mockapi.io/api/v1/usuarios";

export default {
  data() {
    return {
      usuarios: [], // 5.3 listado de usuarios
      modalUsuario: false, // 5.3 control de modal
      editarUsuario: null, // 5.3 saber si estamos editando
      formulario: { name: "", username: "", password: "" }, // 5.3 formulario único para crear/editar
      alerta: { mensaje: "", tipo: "" } // 5.5 alertas de Bootstrap
    };
  },
  mounted() {
    this.cargarUsuarios(); // 5.3 cargar usuarios al montar
  },
  methods: {
    async cargarUsuarios() {
      // 5.3 llamada GET a la API para obtener usuarios
      try {
        const res = await axios.get(API_URL);
        this.usuarios = res.data;
      } catch (error) {
        console.error(error);
        this.alerta = { mensaje: "Error al cargar usuarios", tipo: "danger" }; // 5.5 alerta de error
      }
    },
    abrirCrearModal() {
      // 5.3 abrir modal para crear
      this.formulario = { name: "", username: "", password: "" };
      this.editarUsuario = null;
      this.modalUsuario = true;
    },
    abrirEditarModal(usuario) {
      // 5.3 abrir modal para editar con datos cargados
      this.editarUsuario = usuario;
      this.formulario = { ...usuario };
      this.modalUsuario = true;
    },
    cerrarModal() {
      // 5.3 cerrar modal y limpiar formulario
      this.modalUsuario = false;
      this.formulario = { name: "", username: "", password: "" };
      this.editarUsuario = null;
    },
    async crearUsuario() {
      // VALIDACIÓN DE CAMPOS OBLIGATORIOS
      if (!this.formulario.name || !this.formulario.username || !this.formulario.password) {
        this.alerta = { mensaje: "Todos los campos son obligatorios", tipo: "warning" };
        return;
      }

      // 5.3 POST a la API para crear usuario
      try {
        await axios.post(API_URL, this.formulario);
        this.cerrarModal();
        this.alerta = { mensaje: "Usuario creado correctamente", tipo: "success" }; // 5.5 alerta de éxito
        this.cargarUsuarios();
      } catch (error) {
        console.error(error);
        this.alerta = { mensaje: "Error al crear usuario", tipo: "danger" }; // 5.5 alerta de error
      }
    },
    async guardarEdicion() {
      // VALIDACIÓN DE CAMPOS OBLIGATORIOS
      if (!this.formulario.name || !this.formulario.username || !this.formulario.password) {
        this.alerta = { mensaje: "Todos los campos son obligatorios", tipo: "warning" };
        return;
      }

      // 5.3 PUT a la API para editar usuario
      try {
        await axios.put(`${API_URL}/${this.editarUsuario.id}`, this.formulario);
        this.cerrarModal();
        this.alerta = { mensaje: "Usuario actualizado correctamente", tipo: "success" }; // 5.5 alerta de éxito
        this.cargarUsuarios();
      } catch (error) {
        console.error(error);
        this.alerta = { mensaje: "Error al actualizar usuario", tipo: "danger" }; // 5.5 alerta de error
      }
    },
    async eliminarUsuario(usuario) {
      // 5.3 DELETE a la API para eliminar usuario
      if (!confirm(`Eliminar usuario ${usuario.username}?`)) return; // confirmación modal nativa
      try {
        await axios.delete(`${API_URL}/${usuario.id}`);
        this.alerta = { mensaje: "Usuario eliminado", tipo: "success" }; // 5.5 alerta de éxito
        this.cargarUsuarios();
      } catch (error) {
        console.error(error);
        this.alerta = { mensaje: "Error al eliminar usuario", tipo: "danger" }; // 5.5 alerta de error
      }
    }
  }
};
</script>

<style scoped>
/* 5.5 modal semi-transparente para enfocarse en el contenido */
.modal.fade.show {
  background: rgba(0,0,0,0.5);
}
</style>
