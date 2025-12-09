// src/views/ContactView.vue (¡NUEVO ARCHIVO!)
<template>
    <div class="container py-5 px-4">
        
        <h1 class="display-4 fw-bold text-success mb-4">
            <i class="bi bi-headset me-2"></i> Contacta a TecnoShop
        </h1>
        
        <p class="lead mb-4">
            Estamos listos para ayudarte con cualquier consulta sobre nuestros productos de electrónica. 
            Elige la opción que mejor se adapte a tus necesidades.
        </p>

        <div class="row g-4">
            <div class="col-md-6 col-lg-4">
                <div class="card shadow-sm h-100 border-success">
                    <div class="card-body">
                        <h5 class="card-title text-success"><i class="bi bi-envelope-fill me-2"></i> Correo Electrónico</h5>
                        <p class="card-text">Envíanos un correo y te responderemos en menos de 24 horas hábiles.</p>
                        <a href="mailto:soporte@tecnoshop.com" class="btn btn-sm btn-outline-success">soporte@tecnoshop.com</a>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="card shadow-sm h-100 border-success">
                    <div class="card-body">
                        <h5 class="card-title text-success"><i class="bi bi-telephone-fill me-2"></i> Llámanos</h5>
                        <p class="card-text">Línea directa para soporte técnico y consultas de inventario.</p>
                        <a href="tel:+573001234567" class="btn btn-sm btn-outline-success">+57 3027813491</a>
                    </div>
                </div>
            </div>

             <div class="col-md-6 col-lg-4">
                <div class="card shadow-sm h-100 border-success">
                    <div class="card-body">
                        <h5 class="card-title text-success"><i class="bi bi-geo-alt-fill me-2"></i> Dirección</h5>
                        <p class="card-text">Visítanos en nuestra oficina principal para soporte presencial.</p>
                        <p class="text-muted mb-0">mi casa, Ocaña, Colombia</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'ContactView'
}
</script>

<style scoped>
.text-success {
    color: #28a745 !important;
}
.border-success {
    border-color: #28a745 !important;
}
</style>