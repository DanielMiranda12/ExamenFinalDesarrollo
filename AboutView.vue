// src/views/AboutView.vue (SE MANTIENE)
<template>
    <div class="container py-5">
        
        <h1 class="display-4 text-primary mb-4">Acerca de TecnoShop</h1>
        
        <section class="panel-acerca">
            <p class="lead">
                En <strong>TecnoShop</strong> somos apasionados por la tecnología. 
                Desde nuestros inicios, hemos buscado ofrecer a nuestros clientes las
                mejores soluciones en computadores, accesorios y servicios
                tecnológicos.
            </p>
            
            <p>
                Nuestro compromiso es brindarte equipos de calidad, asesoría
                personalizada y un soporte confiable para que siempre tengas la mejor
                experiencia en el mundo digital.
            </p>
            
            <p>
                Contamos con un equipo especializado que se mantiene actualizado con
                las últimas tendencias en hardware y software para garantizar que
                siempre encuentres lo que necesitas.
            </p>
        </section>

        <div class="mt-5 p-4 bg-light rounded shadow-sm text-center">
            <p class="mb-0 text-dark">¡Gracias por ser parte de la comunidad TecnoShop!</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutView'
}
</script>

<style scoped>
.panel-acerca p { font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem; }
.text-primary { color: #28a745 !important; font-weight: 600; } 
</style>