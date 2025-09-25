<template>
  <v-main>
  <div v-if="items.length > 0" class="pa-4">
    <h3>Carrito</h3>
    <div v-if="items.length === 0">El carrito está vacío</div>

    <v-list v-else>
      <v-list-item v-for="item in items" :key="item.id">
        <v-list-item-title>
          {{ item.nombre }} — ${{ item.precio }} × {{ item.cantidad }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Subtotal: ${{ item.precio * item.cantidad }}
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn icon @click="decrementar(item.id)">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn icon @click="incrementar(item.id)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>

    <div v-if="items.length > 0" class="mt-4 text-h6">
      Total: ${{ total }}
    </div>
    <div>
      <v-btn
      color="success"
      @click="registrar"
    >

      Finalizar Compra
    </v-btn>

    <p v-if="mensaje" class="mt-4 text-green">
      {{ mensaje }}
    </p>

    </div>
  </div>
  </v-main>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  productos: Array,
  carritoIds: Array
});

const emit = defineEmits(["add-to-cart", "remove-from-cart"]);

function contarItems(ids) {
  const map = {};
  ids.forEach(id => {
    map[id] = (map[id] || 0) + 1;
  });
  return Object.keys(map).map(id => {
    const prod = props.productos.find(p => p.id === parseInt(id));
    return { ...prod, cantidad: map[id] };
  });
}

const items = computed(() => contarItems(props.carritoIds));

function incrementar(id) {
  emit("add-to-cart", id);
}
function decrementar(id) {
  emit("remove-from-cart", id);
}

const total = computed(() =>
  items.value.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
);

function registrar() {
  mensaje.value = `Gracias por su compra!`;
}
</script>