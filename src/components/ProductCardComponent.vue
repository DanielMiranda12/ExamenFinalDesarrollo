<template>
  <div class="card product-card h-100">
    <img :src="producto.imagen" class="card-img-top" :alt="producto.nombre" />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text flex-grow-1">{{ producto.descripcion }}</p>
      <p class="fw-bold text-success">Precio: ${{ producto.precio }}</p>

      <button class="btn btn-primary w-100" @click="abrirModal">
        Ver detalles
      </button>
    </div>

    <!-- Modal (con :key para mantener estado) -->
    <Teleport to="body">
      <div class="modal fade" :id="'modal-' + producto.id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content rounded-3 shadow">
            <div class="modal-header">
              <h5 class="modal-title">{{ producto.nombre }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <img :src="producto.imagen" class="img-fluid mb-3 rounded" :alt="producto.nombre" style="max-height:400px; width:100%; object-fit:cover;" />
              <ul class="list-group">
                <li class="list-group-item"><strong>Nombre:</strong> {{ producto.nombre }}</li>
                <li class="list-group-item"><strong>Descripción:</strong> {{ producto.descripcion }}</li>
                <li class="list-group-item"><strong>Precio:</strong> ${{ producto.precio }}</li>
                <li class="list-group-item"><strong>CPU:</strong> {{ producto.cpu }}</li>
                <li class="list-group-item"><strong>RAM:</strong> {{ producto.ram }}</li>
                <li class="list-group-item"><strong>Almacenamiento:</strong> {{ producto.almacenamiento }}</li>
                <li class="list-group-item"><strong>GPU:</strong> {{ producto.gpu }}</li>
                <li class="list-group-item"><strong>Pantalla:</strong> {{ producto.pantalla }}</li>
                <li class="list-group-item"><strong>ID:</strong> {{ producto.id }}</li>
              </ul>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button class="btn btn-primary">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Modal } from 'bootstrap';

const props = defineProps({
  producto: { type: Object, required: true }
});

function abrirModal() {
  const modalId = 'modal-' + props.producto.id;
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.show();
  }
}
</script>

<style scoped>
.product-card { transition: transform 0.2s, box-shadow 0.2s; border: none; }
.product-card:hover { transform: scale(1.03); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
.card-img-top { height: 180px; object-fit: cover; }
</style>