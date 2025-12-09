// src/views/DashboardView.vue (CORREGIDO)
<template>
  <div id="app-wrapper">
    <SidebarComponent :isToggled="isToggled" /> 

    <div id="page-content-wrapper" :class="{ 'sidebar-toggled': isToggled }">
      
      <NavbarComponent @toggle-sidebar="toggleSidebar" />
      
      <div class="content-body">
          <router-view></router-view> 
      </div>
      
      <FooterComponent class="dashboard-footer" />
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: "DashboardView",
  components: {
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  },
  data() {
    return {
      isToggled: true 
    };
  },
  methods: {
    toggleSidebar() {
      this.isToggled = !this.isToggled; 
    }
  }
};
</script>

<style scoped>
#app-wrapper { overflow-x: hidden; }
#page-content-wrapper { padding-left: 70px; min-height: 100vh; transition: padding-left 0.3s ease; display: flex; flex-direction: column; }
#page-content-wrapper.sidebar-toggled { padding-left: 250px; }
.content-body { flex-grow: 1; padding-left: 0 !important; padding-right: 0 !important; padding-top: 56px; }
.dashboard-footer { margin-top: auto; width: 100%; z-index: 999; }
</style>