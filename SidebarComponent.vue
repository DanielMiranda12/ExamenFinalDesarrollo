// src/components/SidebarComponent.vue (COMPLETO Y CORREGIDO)
<template>
    <div :class="['sidebar', { 'sidebar-collapsed': isToggled }]">
        
        <h4 class="p-3 text-white text-center sidebar-brand-text">
            <span v-if="!isToggled">M-33</span> 
            <span v-else>33</span> 
        </h4>

        <ul class="list-unstyled">
            <li v-for="item in menuItems" :key="item.path">
                <router-link :to="item.path" class="sidebar-link d-flex align-items-center">
                    <i :class="['bi', item.icon, 'me-2']"></i> 
                    <span v-if="!isToggled" class="menu-text">{{ item.name }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SidebarComponent",
    props: {
        isToggled: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            menuItems: [
                { name: 'Pagina Principal', path: '/dashboard', icon: 'bi-speedometer' },
                { name: 'Productos', path: '/dashboard/productos', icon: 'bi-box-seam' },
                { name: 'Acerca de Nosotros', path: '/dashboard/acerca-de', icon: 'bi-info-circle' },
                { name: 'Contacto', path: '/dashboard/contacto', icon: 'bi-headset' }
            ]
        };
    }
};
</script>

<style scoped>
.sidebar { width: 250px; min-height: 100vh; background: black; transition: width 0.3s ease; position: fixed; top: 0; left: 0; z-index: 1030; overflow-x: hidden; }
.sidebar-collapsed { width: 70px; }
.sidebar ul.list-unstyled { padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important; }
.sidebar-brand-text { font-size: 1.5rem; padding-left: 0 !important; padding-right: 0 !important; }
.sidebar-link { display: flex; padding: 10px; color: #ccc; text-decoration: none; border-left: 2px solid transparent; white-space: nowrap; width: 100%; }
.sidebar-collapsed .sidebar-link { justify-content: center; padding-left: 0; padding-right: 0; }
.sidebar-collapsed .sidebar-link i { margin-right: 0 !important; font-size: 1.2rem; }
.sidebar-link:hover { background: rgba(255, 255, 255, 0.2); color: #fff; border-left: 2px solid #28a745; }
</style>