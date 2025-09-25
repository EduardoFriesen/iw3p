<template>
  <v-main>
    <v-container class="pa-4">
      <v-text-field
        v-model="nombre" label="Nombre del cliente" 
        :error="nombre.length > 0 && nombre.length < 3"
        :class="{
          'border-red': nombre.length > 0 && nombre.length < 3,
          'border-green': nombre.length >= 3
        }"
      />
      <v-btn color="success" :disabled="nombre.length < 3" @click="registrar">
        Registrar
      </v-btn>

      <p v-if="mensaje" class="mt-4 text-green">
        {{ mensaje }}
      </p>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";

const nombre = ref("");
const mensaje = ref("");

function registrar() {
  mensaje.value = `Bienvenido, ${nombre.value}`;
  console.log("Cliente registrado:", nombre.value);
  nombre.value = "";
}
</script>

<style scoped>
.border-red {
  border: 1px solid red;
}
.border-green {
  border: 1px solid green;
}
</style>