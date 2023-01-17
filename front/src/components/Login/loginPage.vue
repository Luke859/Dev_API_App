<template>
    <div class="q-pa-xl">
      <div class="flex flex-center column">
        <h1>Login</h1>
        <q-card style="margin-top: 20px" >
            <q-card-section>
                <q-input required="" label="Email" type="email" outlined class="q-mb-md" v-model="form.email" />
                <q-input label="Mot de passe" type="password" required="" outlined class="q-mb-md" v-model="form.password" :rules="[ val => val.length >= 6 || 'Minimum 6 caractère']" />
                <q-btn label="Connexion" class="full-width" color="primary" @click="handleLogin"/>
                <p style="margin-top: 20px" >Vous avez pas encore de compte ? <Router-link to="/register">Inscrivez-vous</Router-link></p>
            </q-card-section>
        </q-card>
      </div>
    </div>
</template>
<script setup>
import { Notify } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user-store'

const userStore = useUserStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await userStore.handleLogin(form.value)
    router.push({ name: 'dashboard' })
  } catch (e) {
    Notify.create('Error during login')
  }
}
</script>
