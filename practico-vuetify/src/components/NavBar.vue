<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title class="cursor-pointer" @click="$router.push('/')">
      Mi Tienda
    </v-app-bar-title>
    <v-spacer></v-spacer>

    <template v-if="auth.isAuthenticated">
      <v-btn variant="text" to="/">Inicio</v-btn>
      <v-btn variant="text" to="/productos">Productos</v-btn>
      <v-btn variant="text" to="/clientes">Clientes</v-btn>
      <v-divider vertical class="mx-2"></v-divider>
      <v-btn variant="text" @click="logout">Salir</v-btn>
    </template>

    <template v-else>
      <v-btn variant="text" to="/login">Login</v-btn>
      <v-btn variant="outlined" to="/register">Registro</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { auth } from '@/auth/session'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

