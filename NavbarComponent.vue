<template>
    <nav class="navbar bg-body-tertiary fixed-top"> 
        <div class="container-fluid justify-content-start">
            
            <button class="btn btn-outline-secondary me-3" type="button" @click="$emit('toggle-sidebar')">
                <i class="bi bi-list"></i> Menu
            </button>

            <router-link to="/dashboard" class="btn btn-outline-success me-2" role="button">Pagina Principal</router-link>
            <router-link to="/dashboard/productos" class="btn btn-outline-success me-2" role="button">productos</router-link>
            <router-link to="/dashboard/acerca-de" class="btn btn-outline-success me-2" role="button">Acerca De Nosotros</router-link>
            
            <button class="btn btn-danger ms-auto" type="button" @click="logout">Cerrar Sesión</button>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "NavbarComponent",
        emits: ['toggle-sidebar'],
        methods: {
            logout() {
                localStorage.removeItem('logueado')
                this.$router.push('/login')
            }
        }
    };
</script>