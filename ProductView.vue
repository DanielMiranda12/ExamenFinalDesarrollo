<template>
  <div class="container py-4">
    <h1 class="mb-4">Catálogo de Productos</h1>

    <!-- BUSCADOR -->
    <div class="controls mb-4">
      <div class="input-group" style="max-width: 500px;">
        <input 
          v-model="query" 
          placeholder="Buscar producto..." 
          class="form-control"
        />
        <button @click="fetchProducts" class="btn btn-outline-primary">
          Refrescar
        </button>
      </div>
    </div>

    <!-- ESTADO: CARGANDO -->
    <div v-if="loading" class="alert alert-info">Cargando...</div>

    <!-- ESTADO: ERROR -->
    <div v-else-if="error" class="alert alert-danger">Error: {{ error }}</div>

    <!-- ESTADO: SIN RESULTADOS -->
    <div v-else-if="filteredProducts.length === 0" class="alert alert-warning">
      No se encontraron productos.
    </div>

    <!-- GRID DE PRODUCTOS -->
    <div v-else class="row g-4">
      <div v-for="p in filteredProducts" :key="p.id" class="col-md-6 col-lg-4 col-xl-3">
        <ProductCardComponent :producto="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCardComponent from '../components/ProductCardComponent.vue';

const API_URL = 'https://6917dc8b21a96359486e1b10.mockapi.io/api/1/aquie_estan_los_productos';

// ===== PRODUCTOS =====
const products = ref([]);
const mappedProducts = ref([]);
const loading = ref(false);
const error = ref(null);
const query = ref('');

function resolveImagePath(path) {
  if (!path) return 'https://via.placeholder.com/300?text=Sin+Imagen';
  if (typeof path !== 'string') return 'https://via.placeholder.com/300?text=Sin+Imagen';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return path.startsWith('/') ? path : '/' + path;
}

function mapProducto(p) {
  return {
    id: p.id ?? p._id ?? '',
    nombre: p.nombre ?? p.name ?? p.title ?? 'Sin nombre',
    descripcion: p.descripcion ?? p.description ?? 'Sin descripción disponible',
    precio: p.precio ?? p.price ?? '0',
    imagen: resolveImagePath(p.imagen ?? p.image ?? p.img),
    cpu: p.cpu ?? 'N/A',
    ram: p.ram ?? 'N/A',
    almacenamiento: p.almacenamiento ?? p.storage ?? 'N/A',
    gpu: p.gpu ?? 'N/A',
    pantalla: p.pantalla ?? p.screen ?? 'N/A',
    raw: p
  };
}

async function fetchProducts() {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    products.value = Array.isArray(data) ? data : [];
    mappedProducts.value = products.value.map(mapProducto);
  } catch (err) {
    console.error(err);
    error.value = err.message || 'Error al obtener productos';
  } finally {
    loading.value = false;
  }
}

// Filtrar por nombre (con debounce para evitar re-renders excesivos)
const filteredProducts = computed(() =>
  mappedProducts.value.filter((p) =>
    p.nombre.toLowerCase().includes(query.value.trim().toLowerCase())
  )
);

onMounted(fetchProducts);
</script>

<style scoped>
.container { max-width: 1200px; }
.controls { display: flex; gap: 0.5rem; }
</style>