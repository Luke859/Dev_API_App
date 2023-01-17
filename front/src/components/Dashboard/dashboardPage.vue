<!-- eslint-disable vue/require-v-for-key -->
<template>
  <q-page class="flex"  style="min-height: 100px">
    <div class="home">
      <div class="right-block">
        <h1 style="padding: 70px 0px 0px 0px">Hello, bienvenue !</h1>
        <div v-if="lists.length == 0" class="q-pa-md ">
          <hr>
          <h4 style="color: red; margin-top: 60px">Tu n’as aucune liste de tâches disponible !</h4>
          <h4 style="margin-top: 60px">Pour en créer une, cliquez sur le bouton ci-dessous</h4>
          <h4 style=" margin-top: 20px">ou en haut à gauche de la page</h4>
          <div class="flex flex-center q-ma-xl">
            <q-btn style="border: black 1px solid" color="purple" icon="add" label="Ajouter une liste">
              <q-menu>
                <q-item clickable>
                  <form className="form" @submit.prevent="addnewList">
                    <q-input v-model="newList" required="" clearable filled label="Add"/>
                    <q-btn type="submit" class="btn btn-block"> Add new list </q-btn>
                  </form>
                </q-item>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div v-else>
          <hr>
          <h3 style="margin-top: 60px">Voici les dernières tâches que tu as ajoutés</h3>
            <div class="q-pa-md row items-center q-gutter-md" style="margin-top: 60px">
              <div v-for="list_all in lists" :key="list_all._id">
                <q-card flat bordered class="my-card bg-grey-1" >
                  <q-card-section class="bg-grey-4">
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h3">{{ list_all.title }}</div>
                      </div>

                      <div class="col-auto">
                        <q-btn color="grey-7" round flat icon="more_vert">
                          <q-menu>
                            <q-list dense style="min-width: 100px">
                                <q-btn>Editer
                                  <q-menu>
                                    <q-item clickable>
                                      <form className="form" @submit.prevent="modifyCurrentList(list_all._id)">
                                        <q-input v-model="modList" clearable filled label="Modify" />
                                        <q-btn type="submit" class="btn btn-block">Modify list</q-btn>
                                      </form>
                                    </q-item>
                                  </q-menu>
                                </q-btn>
                                <q-btn>Supprimer
                                  <q-menu>
                                    <q-item>
                                      <form className="form" @submit.prevent="deleteCurrentList(list_all._id)" >
                                        <h4 class="text-h4" style="text-align: cente; padding: 20px">Supprimer la liste</h4>
                                        <p class="text-h6" style="text-align: cente; padding: 20px">Vous êtes sur le point de supprimer votre liste, êtes vous sûr de vouloir faire ça ?</p>
                                        <q-btn class="btn btn-block" label="Annuler" v-close-popup />
                                        <q-btn type="submit" class="btn btn-block" style="color: red">Supprimer</q-btn>
                                      </form>
                                    </q-item>
                                  </q-menu>
                                </q-btn>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="bg-white" align="center" style="padding: 30px">
                  <h4 align="left" style="padding-bottom: 20px">Task(s) :</h4>
                    <div v-if="list_all.tasks && list_all.tasks.length > 0" >
                      <div v-for="(task, index) in list_all.tasks" :key="index">
                        <div align="left" class="text-h4 text-grey" >
                          {{ task.title }}
                          <hr>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                        <h4 class="text-h4 text-weight-light text-dark q-ma-lg text-accent">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</h4 >
                    </div>
                    <q-btn color="purple" @click="redirectToTasks(list_all._id)" label="Voir ma liste" class="q-mb-md" />
                  </q-card-section>
                </q-card>
              </div>
            </div>
        </div>
      </div>
      <div class="left-block">
        <h3>Mes listes
          <q-btn style="border: black 1px solid" color="purple" icon="add" label="Add">
            <q-menu>
                <q-item clickable>
                  <form className="form" @submit.prevent="addnewList">
                    <q-input v-model="newList" required="" clearable filled label="Add" />
                    <q-btn type="submit" class="btn btn-block"> Add new list </q-btn>
                  </form>
                </q-item>
            </q-menu>
          </q-btn>
        </h3>
        <div v-if="lists.length == 0" class="q-pa-md ">
          <hr>
          <h4 class="text-h4 text-weight-thin text-dark q-ma-lg flex flex-center">Pas de liste disponible </h4>
        </div>
        <div v-else>
          <hr>
          <table style="width:100%">
            <div class="cursor-pointer">
              <tr v-for="list_all in lists" :key="list_all._id">
                <td>{{ list_all.title }}</td>
              </tr>
            </div>
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
import { getAllLists, addList, modifyList, deleteList } from 'src/services/lists'
import { useRouter } from 'vue-router'

const loading = ref(false)
// const users = ref([])
const lists = ref([])
const newList = ref('')
const modList = ref('')
const router = useRouter()

const redirectToTasks = (getId) => {
  router.push({ name: 'tasks', params: { id: getId } })
}

const addnewList = async () => {
  const listForm = { title: newList.value }
  const response = await addList(listForm)
  window.location.reload()
  console.log(response)
}

const modifyCurrentList = async (getId) => {
  const modifylistForm = { title: modList.value }
  const response = await modifyList(getId, modifylistForm)
  window.location.reload()
  console.log(response)
}

const deleteCurrentList = async (getId) => {
  const response = await deleteList(getId)
  window.location.reload()
  console.log(response)
}

const asyncCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
      ])
    }, 1000)
  })
}

onMounted(async () => {
  loading.value = true
  await asyncCall()
  try {
    const res = await getAllLists()
    // console.log(res)
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
  border-radius: 30px;
  column-gap: 0px;
  margin-bottom: 0px
}

.right-block {
  grid-area: right;
  text-align: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding-right: 250px
}

.left-block {
  grid-area: left;
  background-color: lightgrey;
  max-width: 50%;
  min-width: 350px;
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
