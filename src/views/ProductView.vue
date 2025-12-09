<template>
  <div class="container py-4">
    <h1 class="mb-4">Catálogo de Productos</h1>

    <!-- ALERTA: Uso de Bootstrap alertas para errores, éxito o validación (5.5) -->
    <div v-if="alerta.mensaje" :class="['alert', 'alert-' + alerta.tipo, 'alert-dismissible', 'fade', 'show']" role="alert">
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="alerta.mensaje = ''"></button>
    </div>

    <!-- BUSCADOR Y CREAR: Formulario estilizado + icono botón para crear (+) (5.5) -->
    <div class="d-flex justify-content-between mb-4 flex-wrap gap-2">
      <div class="input-group" style="max-width: 400px;">
        <input v-model="query" placeholder="Buscar producto..." class="form-control" />
        <button @click="fetchProducts" class="btn btn-outline-primary">Refrescar</button>
      </div>
      <button class="btn btn-success" @click="abrirCrearModal">+ Crear Producto</button>
    </div>

    <!-- ESTADO: Manejo adecuado de estados y errores (6) -->
    <div v-if="loading" class="alert alert-info">Cargando...</div>
    <div v-else-if="error" class="alert alert-danger">Error: {{ error }}</div>
    <div v-else-if="filteredProducts.length === 0" class="alert alert-warning">
      No se encontraron productos.
    </div>

    <!-- GRID DE PRODUCTOS: Uso de grid / responsive (5.5) y diseño limpio / ordenado (6) -->
    <div v-else class="row g-4">
      <div v-for="p in filteredProducts" :key="p.id" class="col-md-6 col-lg-4 col-xl-3">
        <div class="card h-100 shadow-sm">
          <img :src="p.imagen" class="card-img-top" style="height:200px; object-fit:cover;" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ p.nombre }}</h5>
            <p class="card-text mb-1"><strong>Precio:</strong> ${{ p.precio }}</p>
            <p class="card-text mb-1"><strong>CPU:</strong> {{ p.cpu }}</p>
            <p class="card-text mb-1"><strong>RAM:</strong> {{ p.ram }}</p>
            <p class="card-text mb-1"><strong>GPU:</strong> {{ p.gpu }}</p>
            <p class="card-text mb-1"><strong>Pantalla:</strong> {{ p.pantalla }}</p>
            <!-- Botón para abrir modal de ver detalles / editar (5.4 CRUD de Productos) -->
            <button class="btn btn-primary mt-auto" @click="abrirEditarModal(p)">Editar detalles</button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CREAR / EDITAR: Uso de modal para CRUD (5.4, 5.5) -->
    <div class="modal fade show" tabindex="-1" style="display: block;" v-if="modalProducto">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <!-- Título dinámico según acción crear/editar (5.4) -->
            <h5 class="modal-title">{{ editarProducto ? 'Editar Producto' : 'Crear Producto' }}</h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <!-- Formularios estilizados con Bootstrap (5.5) -->
            <div class="mb-3">
              <label class="form-label">Nombre *</label>
              <input type="text" class="form-control" v-model="formulario.nombre" />
            </div>
            <div class="mb-3">
              <label class="form-label">Precio *</label>
              <input type="number" class="form-control" v-model="formulario.precio" />
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción *</label>
              <textarea class="form-control" v-model="formulario.descripcion"></textarea>
            </div>
            <!-- Otros campos opcionales para detalles del producto -->
            <div class="mb-3">
              <label class="form-label">Imagen (URL)</label>
              <input type="text" class="form-control" v-model="formulario.imagen" />
            </div>
            <div class="mb-3">
              <label class="form-label">CPU</label>
              <input type="text" class="form-control" v-model="formulario.cpu" />
            </div>
            <div class="mb-3">
              <label class="form-label">RAM</label>
              <input type="text" class="form-control" v-model="formulario.ram" />
            </div>
            <div class="mb-3">
              <label class="form-label">Almacenamiento</label>
              <input type="text" class="form-control" v-model="formulario.almacenamiento" />
            </div>
            <div class="mb-3">
              <label class="form-label">GPU</label>
              <input type="text" class="form-control" v-model="formulario.gpu" />
            </div>
            <div class="mb-3">
              <label class="form-label">Pantalla</label>
              <input type="text" class="form-control" v-model="formulario.pantalla" />
            </div>
          </div>
          <div class="modal-footer">
            <!-- Botones cancelar, eliminar, guardar (5.4 CRUD) y uso de íconos/colores para distinguir acciones (5.5) -->
            <button class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
            <button class="btn btn-danger me-auto" v-if="editarProducto" @click="confirmarEliminar">Eliminar</button>
            <button class="btn btn-success" @click="editarProducto ? guardarEdicion() : crearProducto()">
              {{ editarProducto ? 'Guardar cambios' : 'Crear' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    // URL de la API (5.4 CRUD de Productos)
    const API_URL = 'https://6931faa111a8738467d128b6.mockapi.io/api/v1/productos';

    // ===== ESTADOS =====
    const products = ref([]); // lista de productos cruda
    const mappedProducts = ref([]); // lista mapeada para consistencia (6, manejo adecuado de datos)
    const loading = ref(false); // estado de carga (6)
    const error = ref(null); // estado de error (6)
    const query = ref(''); // para el buscador (5.4)

    // Modal y formulario (5.4)
    const modalProducto = ref(false);
    const editarProducto = ref(null);
    const formulario = ref({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '',
      cpu: '',
      ram: '',
      almacenamiento: '',
      gpu: '',
      pantalla: ''
    });
    const alerta = ref({ mensaje: '', tipo: '' }); // alertas dinámicas (5.5)

    // ===== FUNCIONES AUXILIARES =====
    const resolveImagePath = (path) => {
      // Asegura imagen válida o placeholder (6, manejo adecuado de errores)
      if (!path) return 'https://via.placeholder.com/300?text=Sin+Imagen';
      if (typeof path !== 'string') return 'https://via.placeholder.com/300?text=Sin+Imagen';
      if (path.startsWith('http://') || path.startsWith('https://')) return path;
      return path.startsWith('/') ? path : '/' + path;
    };

    const mapProducto = (p) => ({
      id: p.id ?? '',
      nombre: p.nombre ?? 'Sin nombre',
      descripcion: p.descripcion ?? 'Sin descripción disponible',
      precio: p.precio ?? '0',
      imagen: resolveImagePath(p.imagen),
      cpu: p.cpu ?? 'N/A',
      ram: p.ram ?? 'N/A',
      almacenamiento: p.almacenamiento ?? 'N/A',
      gpu: p.gpu ?? 'N/A',
      pantalla: p.pantalla ?? 'N/A',
      raw: p
    });

    // ===== CRUD =====
    const fetchProducts = async () => {
      loading.value = true;
      error.value = null;
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        products.value = Array.isArray(data) ? data : [];
        mappedProducts.value = products.value.map(mapProducto); // mapeo uniforme (6)
      } catch (err) {
        console.error(err);
        error.value = err.message || 'Error al obtener productos';
      } finally {
        loading.value = false;
      }
    };

    const filteredProducts = computed(() =>
      mappedProducts.value.filter((p) =>
        p.nombre.toLowerCase().includes(query.value.trim().toLowerCase())
      )
    );

    const abrirCrearModal = () => {
      // Abrir modal con formulario vacío (5.4)
      formulario.value = {
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: '',
        cpu: '',
        ram: '',
        almacenamiento: '',
        gpu: '',
        pantalla: ''
      };
      editarProducto.value = null;
      modalProducto.value = true;
    };

    const abrirEditarModal = (producto) => {
      // Abrir modal para edición con los datos existentes (5.4)
      editarProducto.value = producto;
      formulario.value = { ...producto.raw };
      modalProducto.value = true;
    };

    const cerrarModal = () => {
      modalProducto.value = false;
      formulario.value = {
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: '',
        cpu: '',
        ram: '',
        almacenamiento: '',
        gpu: '',
        pantalla: ''
      };
      editarProducto.value = null;
    };

    const crearProducto = async () => {
      // Validación campos obligatorios (5.4)
      if (!formulario.value.nombre || !formulario.value.precio || !formulario.value.descripcion) {
        alerta.value = { mensaje: 'Por favor completa los campos obligatorios (*)', tipo: 'warning' };
        return;
      }
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario.value)
        });
        alerta.value = { mensaje: 'Producto creado correctamente', tipo: 'success' }; // alerta éxito (5.5)
        cerrarModal();
        fetchProducts();
      } catch (err) {
        console.error(err);
        alerta.value = { mensaje: 'Error al crear producto', tipo: 'danger' }; // alerta error (5.5)
      }
    };

    const guardarEdicion = async () => {
      if (!formulario.value.nombre || !formulario.value.precio || !formulario.value.descripcion) {
        alerta.value = { mensaje: 'Por favor completa los campos obligatorios (*)', tipo: 'warning' };
        return;
      }
      try {
        await fetch(`${API_URL}/${editarProducto.value.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario.value)
        });
        alerta.value = { mensaje: 'Producto actualizado correctamente', tipo: 'success' };
        cerrarModal();
        fetchProducts();
      } catch (err) {
        console.error(err);
        alerta.value = { mensaje: 'Error al actualizar producto', tipo: 'danger' };
      }
    };

    const confirmarEliminar = async () => {
      if (!confirm(`¿Eliminar producto ${formulario.value.nombre}?`)) return;
      try {
        await fetch(`${API_URL}/${editarProducto.value.id}`, { method: 'DELETE' });
        alerta.value = { mensaje: 'Producto eliminado', tipo: 'success' };
        cerrarModal();
        fetchProducts();
      } catch (err) {
        console.error(err);
        alerta.value = { mensaje: 'Error al eliminar producto', tipo: 'danger' };
      }
    };

    // Cargar productos al montar (6: manejo adecuado de estados)
    onMounted(fetchProducts);

    return {
      products,
      mappedProducts,
      filteredProducts,
      loading,
      error,
      query,
      modalProducto,
      editarProducto,
      formulario,
      alerta,
      abrirCrearModal,
      abrirEditarModal,
      cerrarModal,
      crearProducto,
      guardarEdicion,
      confirmarEliminar,
      fetchProducts
    };
  }
};
</script>

<style scoped>
.container { max-width: 1200px; }
.card { cursor: pointer; transition: transform 0.2s; }
.card:hover { transform: scale(1.03); }
.modal.fade.show { background: rgba(0,0,0,0.5); }
/* Diseño limpio, responsive, buen uso de sombras y transición (6) */
</style>
