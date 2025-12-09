<template>
    <div class="container-fluid py-5 px-4">
        
        <h1 class="display-5 fw-bold text-dark mb-3">
            <i class="bi bi-cpu me-2 text-success"></i> Panel de Gestión TecnoShop
        </h1>
        
        <div class="row">
            <div class="col-lg-8">
                <p class="lead">
                    Bienvenido al panel de control central de **TecnoShop**. Aquí podrás gestionar
                    de manera integral todo el inventario de **computadores, portátiles y accesorios**.
                    Utiliza el menú lateral para acceder a la gestión de productos, la configuración del sistema
                    y la información de la empresa.
                </p>
                <hr>
            </div>
            <div class="col-lg-4 text-center d-none d-lg-block">
                <i class="bi bi-laptop" style="font-size: 8rem; color: #ced4da;"></i>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'HomeDashboardView'
}
</script>

<style scoped>
/* Ajuste de color para el ícono */
.text-success {
    color: #28a745 !important;
}
</style>