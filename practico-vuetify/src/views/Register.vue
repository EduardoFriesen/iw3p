<template>
  <v-row class="d-flex justify-center align-center" style="height: 100%;">
    <v-col cols="12" sm="8" md="6" lg="5">
      <v-card elevation="8" class="pa-6 rounded-xl">
        <v-card-title class="text-center text-h5 font-weight-bold">
          Crear cuenta
        </v-card-title>

        <v-card-text>
          <v-form ref="form" @submit.prevent="onSubmit">
            <v-text-field v-model="nombre" label="Nombre" :rules="[rules.required]" class="mb-2"/>
            <v-text-field v-model="apellido" label="Apellido" :rules="[rules.required]" class="mb-2"/>
            <v-text-field v-model="email" label="Email" type="email" :rules="[rules.required, rules.email]" class="mb-2"/>
            <v-text-field v-model="password" label="Contraseña" type="password" :rules="[rules.required, rules.min6]" class="mb-2"/>

            <v-alert v-if="errorMsg" type="error" density="compact" variant="tonal" class="mb-4">
              {{ errorMsg }}
            </v-alert>

            <v-btn :loading="loading" color="primary" type="submit" block size="large">
              Crear cuenta
            </v-btn>
          </v-form>
        </v-card-text>

        <v-card-subtitle class="mt-4 text-center">
          ¿Ya tenés cuenta? <router-link to="/login">Iniciá sesión</router-link>
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/auth/session'

const router = useRouter()
const nombre = ref('')
const apellido = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref(null)
const form = ref(null)

const rules = {
  required: v => !!v || 'Campo requerido',
  email: v => /.+@.+\..+/.test(v) || 'Formato inválido',
  min6: v => (v && v.length >= 6) || 'Mínimo 6 caracteres'
}

async function onSubmit() {
  const valid = form.value.validate()
  if (!valid) return

  loading.value = true
  errorMsg.value = null

  try {
    await auth.register({ nombre: nombre.value, apellido: apellido.value, email: email.value, password: password.value })
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (err) {
    errorMsg.value = auth.state.error
    console.error(err.message)
  } finally {
    loading.value = false
  }
}
</script>

