<template>
    <div class="q-pa-xl">
      <div class="flex flex-center column">
        <h1>Inscrivez-vous</h1>
        <q-card style="margin-top: 20px">
            <q-card-section>
                <q-input required="" label="Email" type="email" outlined class="q-mb-md" v-model="form.email" />
                <q-input required="" label="Mot de passe" type="password" outlined class="q-mb-md" v-model="form.password" :rules="[ val => val.length >= 6 || 'Minimum 6 caractère']" />
                <q-checkbox label="terms and conditions" v-model="form.terms_and_conditions"/>
                <q-btn style="margin-top: 20px" label="S'incrire" class="full-width" color="primary" @click="handleRegister"/>
                <p style="margin-top: 20px" >Vous avez déjà un compte ? <Router-link to="/login">Connectez-vous</Router-link></p>
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
  password: '',
  terms_and_conditions: false
})

const handleRegister = async () => {
  try {
    await userStore.handleRegister(form.value)
    router.push({ name: 'dashboard' })
  } catch (e) {
    Notify.create('Error during register')
  }
}
</script>
