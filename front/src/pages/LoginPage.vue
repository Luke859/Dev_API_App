<template>
    <q-page class="flex flex-center">
      <h1>Hello</h1>
      <!-- <p>{{firstname}}</p> -->
      <q-input type="test" v-model="firstname"/>
      <q-btn @click="reverse" label="reverse"/>
    </q-page>
</template>
<script setup>
import { ref } from 'vue'

const firstname = ref('luke')
const reverse = () => {
  firstname.value = firstname.value.split('').reverse().join('')
}

</script>
