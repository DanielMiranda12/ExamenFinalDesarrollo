<template>
    <div class="d-flex flex-column min-vh-100">
        
        <div class="container mt-5 col-md-4 flex-grow-1">
            <h3>Iniciar Sesión</h3>
            <input v-model="usuario" class="form-control mb-2" placeholder="Usuario" />
            <input v-model="clave" type="password" class="form-control mb-2" placeholder="Contraseña" />
            <button class="btn btn-primary w-100" @click="login">Entrar</button>
            <p v-if="error" class="text-danger mt-2">{{ error }}</p>
        </div> 

        <FooterComponent />
    </div> 
</template>

<script>
// Importación Necesaria
import FooterComponent from '@/components/FooterComponent.vue'

export default{
    // Registro Necesario
    components: {
        FooterComponent
    },
    data(){
        return {usuario: '', clave: '', error: ''}
    },
    methods: {
        login() {
            // Este JSON debe ir en un archivo externo según la regla del profesor, pero lo dejamos aquí por ahora
            const users = [
                {user: 'admin', pass: '1234'},
                {user: 'daniel', pass: '5678'}
            ]
            const valido = users.find(u => u.user === this.usuario && u.pass === this.clave)
            
            if (valido) {
                localStorage.setItem('logueado', 'true')
                this.$router.push('/dashboard')
            }else {
                this.error = 'Credenciales Incorrectas'
            }
        }
    }
}
</script>