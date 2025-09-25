<template>
  <v-main>
  <div class="pa-4">
    <v-text-field
      v-model="busqueda"
      label="Buscar producto"
      prepend-icon="mdi-magnify"
      clearable
    />
    <v-container>
      <v-row>
        <v-col
          v-for="producto in productosFiltrados" :key="producto.id" cols="12" sm="6" md="4"
        >
          <v-card class="ma-2" :class="{ 'bg-red-lighten-4': producto.stock === 0 }" elevation="4" @click="goToDetalle(producto.id)" style="cursor: pointer;">
  <v-img :src="producto.imagen" height="180" cover />

  <v-card-title>{{ producto.nombre }}</v-card-title>
  <v-card-subtitle>${{ producto.precio }}</v-card-subtitle>

  <v-card-text>
    <span v-if="producto.stock === 0">(Sin stock)</span>
    <span v-else>Stock: {{ producto.stock }}</span>
  </v-card-text>

  <v-card-actions>
    <v-btn
      color="primary"
      @click.stop="$emit('add-to-cart', producto.id)" 
      :disabled="producto.stock === 0"
      block
    >
      Agregar al carrito
    </v-btn>

    <v-btn
      color="secondary"
      @click="goToDetalle(producto.id)"
      block
    >
      Ver Detalle
    </v-btn>
  </v-card-actions>
</v-card> </v-col>
      </v-row>
    </v-container>

    <p v-if="productosFiltrados.length === 0" class="text-center mt-4">
      No se encontraron productos.
    </p>
  </div>
  </v-main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()

function goToDetalle(id) {
  router.push(`/productos/${id}`)
}

const props = defineProps({
  productos: Array
});

const busqueda = ref("");

const productosFiltrados = computed(() => {
  // Asegúrate de que props.productos exista antes de filtrar para evitar errores
  if (!props.productos) return [];
  
  return props.productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});
</script>