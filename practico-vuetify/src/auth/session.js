import { reactive, computed } from 'vue'

const state = reactive({
  user: null,
  error: null,
})

// Computed reactivo
const isAuthenticated = computed(() => !!state.user)

function load() {
  try {
    const sessionRaw = localStorage.getItem('session')
    state.user = sessionRaw ? JSON.parse(sessionRaw) : null
  } catch (error) {
    console.error('Error en load():', error)
    state.user = null
  }
}

async function register({ nombre, apellido, email, password }) {
  state.error = null
  const usersRaw = localStorage.getItem('my_app_users')
  const users = usersRaw ? JSON.parse(usersRaw) : []

  if (users.find(u => u.email === email)) {
    state.error = 'El correo electrónico ya está registrado.'
    throw new Error('USER_EXISTS')
  }

  users.push({ nombre, apellido, email, password })
  localStorage.setItem('my_app_users', JSON.stringify(users))
}

async function login({ email, password }) {
  state.error = null
  const usersRaw = localStorage.getItem('my_app_users')
  const users = usersRaw ? JSON.parse(usersRaw) : []

  const found = users.find(u => u.email === email && u.password === password)
  if (!found) {
    state.error = 'Credenciales inválidas.'
    throw new Error('INVALID_CREDENTIALS')
  }

  state.user = { email: found.email, nombre: found.nombre, apellido: found.apellido }
  localStorage.setItem('session', JSON.stringify(state.user))
}

function logout() {
  state.user = null
  state.error = null
  localStorage.removeItem('session')
}

export const auth = {
  state,
  isAuthenticated,
  load,
  register,
  login,
  logout
}
