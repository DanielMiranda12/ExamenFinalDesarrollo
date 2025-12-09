<template>
  <div class="d-flex flex-column min-vh-100 bg-light">

    <!-- NAVBAR  -->
    <nav class="navbar navbar-expand-lg shadow navbar-lima">
      <div class="container">
        <a class="navbar-brand fw-bold fs-4 text-dark" href="#">TecnoShop</a>
      </div>
    </nav>

    <!-- ALERTA -->
    <div class="container mt-4">
      <!--  5.5: Alertas Bootstrap (informativa) -->
      <div class="alert alert-warning alert-dismissible fade show shadow-sm" role="alert">
        <strong>¡Atención!</strong> Primero inicia sesión para continuar.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </div>

    <!-- CONTENEDOR PRINCIPAL -->
    <div class="container d-flex justify-content-center align-items-center flex-grow-1">

      <div class="row w-100 justify-content-center align-items-center">

        <!-- CARD CENTRAL -->
        <div class="col-md-4">
          <div class="card shadow-lg border-0 p-4 login-card">

            <!-- Título -->
            <h2 class="text-center mb-3 fw-bold text-lima">
              {{ modoRegistro ? "Crear Cuenta" : "Iniciar Sesión" }}
            </h2>
            <!-- Descripción dinámica -->
            <p class="text-center text-muted mb-4">
              {{ modoRegistro ? "Registra un usuario nuevo" : "Accede a tu panel administrativo" }}
            </p>

            <!-- NOMBRE SOLO EN REGISTRO -->
            <div v-if="modoRegistro" class="mb-3">
              <!-- 5.1 Autenticación: captura de nombre para registro -->
              <label class="form-label fw-semibold">Nombre completo</label>
              <input v-model="nombre" class="form-control" placeholder="Ingresa tu nombre" />
            </div>

            <!-- USUARIO -->
            <div class="mb-3">
              <!-- 5.1 Autenticación: captura de username -->
              <label class="form-label fw-semibold">Usuario</label>
              <input v-model="usuario" class="form-control" placeholder="Ingresa tu usuario" />
            </div>

            <!-- CONTRASEÑA -->
            <div class="mb-3">
              <!-- 5.1 Autenticación: captura de contraseña -->
              <label class="form-label fw-semibold">Contraseña</label>
              <input v-model="clave" type="password" class="form-control" placeholder="Ingresa tu contraseña" />
            </div>

            <!-- BOTÓN LOGIN O REGISTRO -->
            <button class="btn btn-lima w-100 py-2 fw-bold" @click="modoRegistro ? registrar() : login()">
              {{ modoRegistro ? "Crear Cuenta" : "Iniciar Sesión" }}
            </button>

            <!-- CAMBIAR MODO -->
            <p class="text-center mt-3">
              <a href="#" @click.prevent="modoRegistro = !modoRegistro">
                {{ modoRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate" }}
              </a>
            </p>

            <!-- ERROR -->
            <p v-if="error" class="text-danger text-center mt-3 fw-semibold">
              <!-- 5.1 Autenticación: manejo de errores -->
              {{ error }}
            </p>

            <!-- APROBACION -->
            <p v-if="exito" class="text-success text-center mt-3 fw-semibold">
              <!-- 5.1 Autenticación: mensajes de éxito al crear cuenta -->
              {{ exito }}
            </p>

          </div>
        </div>

      </div>
    </div>
    
    <!-- Footer como componente reutilizable (6. Requerimientos no funcionales: buen uso de componentes) -->
    <FooterComponent />

  </div>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue'

// URL de MockAPI
const API_URL = "https://6931faa111a8738467d128b6.mockapi.io/api/v1";

export default {
  components: { FooterComponent },
  data() {
    return {
      nombre: "",
      usuario: "",
      clave: "",
      modoRegistro: false,
      error: "",
      exito: ""
    }
  },
  methods: {

    // LOGIN
    async login() {
      this.error = ""
      this.exito = ""

      // Validación de campos obligatorios (5.1)
      if (!this.usuario || !this.clave) {
        this.error = "Todos los campos son obligatorios"
        return
      }

      try {
        // Consulta a MockAPI para validar credenciales (5.1)
        const res = await fetch(`${API_URL}/usuarios`)
        const data = await res.json()

        // Buscar usuario que coincida
        const user = data.find(u =>
          u.username === this.usuario && u.password === this.clave
        )

        if (user) {
          // Guardar token simulado en localStorage (5.1)
          localStorage.setItem("logueado", "true")
          localStorage.setItem("usuario", user.username)
          // Redirección a dashboard (5.2 rutas protegidas)
          this.$router.push("/dashboard")
        } else {
          this.error = "Usuario o contraseña incorrectos"
        }

      } catch (e) {
        this.error = "Error al conectar con el servidor"
      }
    },

    // REGISTRO
    async registrar() {
      this.error = ""
      this.exito = ""

      // Validación de campos obligatorios (5.1)
      if (!this.nombre || !this.usuario || !this.clave) {
        this.error = "Todos los campos son obligatorios"
        return
      }

      try {
        // Guardar usuario en MockAPI (5.1)
        const res = await fetch(`${API_URL}/usuarios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.nombre,
            username: this.usuario,
            password: this.clave
          })
        })

        if (!res.ok) {
          this.error = "No se pudo crear el usuario"
          return
        }

        // Mensaje de éxito
        this.exito = "Cuenta creada exitosamente. Ahora inicia sesión."
        this.modoRegistro = false
        this.nombre = ""
        this.usuario = ""
        this.clave = ""

      } catch (e) {
        this.error = "Error al conectar con el servidor"
      }
    }

  }
}
</script>

<style scoped>
/* Estilos personalizados (5.5 uso de Bootstrap + diseño limpio 6) */
.text-lima {
  color: #28a745;
}
.navbar-lima {
  background-color: #28a745;
}
.btn-lima {
  background-color: #28a745;
  color: #000;
  border: none;
}
.login-card {
  border-radius: 1.2rem;
  background: white;
  animation: fadeIn 0.5s ease;
}
.info-card {
  border-radius: 1rem;
  background: #ffffff;
  border-left: 5px solid #28a745;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
