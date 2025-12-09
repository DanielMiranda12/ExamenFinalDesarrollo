<template>
    <footer class="footer py-3 bg-dark text-white"> 
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 text-center text-md-start">
                    <span class="text-muted">
                        &copy; {{ currentYear }} M-33 | Desarrollo de Aplicaciones Web.
                    </span>
                </div>
                
                <div class="col-md-6 text-center text-md-end">
                    <span class="text-muted small">
                        Proyecto Segundo Parcial Vue 3 + Bootstrap 5.
                    </span>
                    <a href="#" class="text-white ms-3 text-decoration-none small">Acerca de</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
}
</script>

<style scoped>
.footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.text-muted {
    color: #adb5bd !important;
}
</style>