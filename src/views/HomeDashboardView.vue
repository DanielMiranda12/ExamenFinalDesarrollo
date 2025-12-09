<template>
  <div class="container-fluid py-5 px-4">

    <h1 class="display-5 fw-bold text-dark mb-4">
      <i class="bi bi-cpu me-2 text-success"></i> Panel de Gestión TecnoShop
    </h1>

    <div class="row mb-5">
      <div class="col-lg-8">
        <p class="lead">
          Bienvenido al <strong>panel de control de TecnoShop</strong>. 
          Aquí podrás gestionar de manera eficiente todo el inventario de 
          <strong>computadores, portátiles y accesorios</strong>. 
          Mantén tu stock actualizado, revisa los productos más recientes y
          visualiza rápidamente los detalles desde el dashboard.
        </p>
        <ul>
          <li>Gestiona usuarios y productos de manera sencilla.</li>
          <li>Visualiza productos destacados en el carrusel interactivo.</li>
          <li>Mantén control total de tu inventario en tiempo real.</li>
        </ul>
      </div>
      <div class="col-lg-4 text-center d-none d-lg-block">
        <i class="bi bi-laptop" style="font-size: 8rem; color: #ced4da;"></i>
      </div>
    </div>

    <!-- ===== CARRUSEL DE PRODUCTOS ===== -->
    <h3 class="mb-3">Productos Destacados</h3>
    <div v-if="productos.length" id="carouselProductos" class="carousel slide" data-bs-ride="carousel">
      
      <!-- INDICADORES -->
      <div class="carousel-indicators">
        <button 
          v-for="(p, index) in productos" 
          :key="p.id" 
          type="button" 
          data-bs-target="#carouselProductos" 
          :data-bs-slide-to="index" 
          :class="{ active: index === 0 }" 
          aria-current="true" 
          :aria-label="'Slide ' + (index+1)">
        </button>
      </div>

      <!-- ITEMS -->
      <div class="carousel-inner">
        <div 
          v-for="(p, index) in productos" 
          :key="p.id" 
          :class="['carousel-item', { active: index === 0 }]">
          <div class="card text-center mx-auto" style="width: 18rem;">
            <img :src="p.imagen" class="card-img-top" :alt="p.nombre">
            <div class="card-body">
              <h5 class="card-title">{{ p.nombre }}</h5>
              <p class="card-text text-success fw-bold">${{ Number(p.precio).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTROLES -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselProductos" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselProductos" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>

    </div>
    <div v-else class="alert alert-info mt-3">
      No hay productos disponibles para mostrar.
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_URL = 'https://6931faa111a8738467d128b6.mockapi.io/api/v1/productos';

const productos = ref([]);

async function fetchProductos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    productos.value = data;
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchProductos);
</script>

<style scoped>
.card {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
}

.carousel-item {
  padding: 1rem 0;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgba(0,0,0,0.5);
  border-radius: 50%;
}
</style>
