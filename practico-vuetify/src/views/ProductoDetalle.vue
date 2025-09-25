<template>
  <v-main>
  <v-container class="pa-4" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="producto" elevation="6">
          <v-img :src="producto.imagen" height="180" cover />
          <v-card-title>{{ producto.nombre }}</v-card-title>
          <v-card-subtitle>Precio: ${{ producto.precio }}</v-card-subtitle>
          <v-card-text>
            <div v-if="producto.stock > 0">Stock: {{ producto.stock }}</div>
            <div v-else class="red--text font-weight-bold">Sin stock</div>
            <p>{{ producto.descripcion }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="$router.push('/productos')">
              Volver
            </v-btn>
          </v-card-actions>
        </v-card>

        <div v-else>
          Producto no encontrado.
        </div>
      </v-col>
    </v-row>
  </v-container>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const productos = [
  { id: 1, nombre: "Cafe", precio: 300, stock: 5, imagen: "/img/cafe.png", descripcion: "Cafe Instantaneo" },
  { id: 2, nombre: "Te", precio: 200, stock: 0, imagen: "/img/te.jpg", descripcion: "Te negro Taragui" },
  { id: 3, nombre: "Yerba", precio: 400, stock: 10, imagen: "/img/yerba.jpeg", descripcion: "Yerba mate Playadito 1kg" },
  { id: 4, nombre: "Azúcar", precio: 150, stock: 8, imagen: "/img/azucar.jpg", descripcion: "Azucar Ledezma 1kg"},
  { id: 5, nombre: "Leche", precio: 250, stock: 0 , imagen: "/img/leche.jpg", descripcion: "Leche larga vida la serenisima descremada"}
]

const producto = computed(() =>
  productos.find(p => p.id === Number(route.params.id)) || null
)
</script>
