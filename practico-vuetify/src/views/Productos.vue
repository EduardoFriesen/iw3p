<template>
  <v-container fluid>
    <v-row>
      <!-- Si el carrito está vacío, los productos ocupan todo -->
      <v-col
        :cols="12"
        :md="carrito.length === 0 ? 12 : 8"
      >
        <ProductList
          :productos="productos"
          @add-to-cart="addToCart"
        />
      </v-col>

      <!-- El carrito solo aparece si tiene elementos -->
      <v-col
        v-if="carrito.length > 0"
        md="4"
      >
        <Cart
          :productos="productos"
          :carrito-ids="carrito"
          @add-to-cart="addToCart"
          @remove-from-cart="removeFromCart"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import ProductList from "../components/ProductList.vue";
import Cart from "../components/Cart.vue";

const productos = ref([
  { id: 1, nombre: "Café", precio: 300, stock: 5, imagen: "/img/cafe.png"},
  { id: 2, nombre: "Té", precio: 200, stock: 0, imagen: "/img/te.jpg"},
  { id: 3, nombre: "Yerba", precio: 400, stock: 10, imagen: "/img/yerba.jpeg"},
  { id: 4, nombre: "Azúcar", precio: 150, stock: 8, imagen: "/img/azucar.jpg"},
  { id: 5, nombre: "Leche", precio: 250, stock: 0 , imagen: "/img/leche.jpg"}
]);

const carrito = ref([]);

function addToCart(id) {
  const producto = productos.value.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    carrito.value.push(id);
    producto.stock--;
  }
}

function removeFromCart(id) {
  const producto = productos.value.find(p => p.id === id);
  const index = carrito.value.indexOf(id);
  if (index !== -1) carrito.value.splice(index, 1);
  if (producto) producto.stock++;
}

watch(carrito, () => {
  console.log("Carrito actualizado:", carrito.value);
}, { deep: true });
</script>
