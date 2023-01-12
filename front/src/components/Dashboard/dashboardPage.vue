<!-- eslint-disable vue/require-v-for-key -->
<template>
  <q-page class="flex">
    <div class="home">
        <div class="right-block">
            <p>Hello</p>
        </div>
        <div class="left-block">
            <h3>Mes listes <button> + </button></h3>
            <div v-if="loading">
                ...Loading data
            </div>
            <div v-else>
              <table style="width:100%">
                <tr v-for="list_all in lists" :key="list_all._id">
                  <td>{{ list_all.title }}</td>
                </tr>
              </table>
            </div>
        </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue'
// import { getUserProfile } from 'src/services/users'
import { Notify } from 'quasar'
import { getAllLists } from 'src/services/lists'

const loading = ref(false)
// const users = ref([])
const lists = ref([])

const asyncCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
      ])
    }, 3000)
  })
}

onMounted(async () => {
  loading.value = true
  await asyncCall()
  try {
    const res = await getAllLists()
    console.log(res)
    lists.value = res.data
  } catch {
    Notify.create('Error on user load')
  }
  loading.value = false
})

</script>

<style>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'left right';
  column-gap: 60px;
  border-radius : 30px;
}

.right-block {
  grid-area: right;
  align-content: center;
  background-color: white;
  border-radius: 10px;
}

.left-block {
  grid-area: left;
  background-color: lightgrey;
  width: 100%;
  height: 2000px;
  padding: 35px;
}

.left-block q-btn {
  align-content: left;
}

.left-block h3 {
  height: 50px
}

left-block .lists {
  margin-bottom: 100px
}
</style>
