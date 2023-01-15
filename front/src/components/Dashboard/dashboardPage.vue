<!-- eslint-disable vue/require-v-for-key -->
<template>
  <q-page class="flex">
    <div class="home">
      <div class="right-block">
        <div v-if="loading">
          <q-circular-progress indeterminate rounded size="50px" color="lime" class="q-ma-md" />
        </div>
        <div v-else>
          <table style="width:100%">
            <div class="cursor-pointer">
              <div v-for="list_all in lists" :key="list_all._id">
                <q-card flat bordered class="my-card bg-grey-1">
                  <q-card-section class="bg-lightgrey">
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <!-- <div class="text-h6">{{ list_all._id }}</div> -->
                        <div class="text-h6">{{ list_all.title }}</div>
                        <!-- <div class="text-subtitle2"></div> -->
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
                                <q-item-section>
                                  <form className="form" @submit.prevent="deleteCurrentList(list_all._id)" >
                                    <q-btn type="submit" class="btn btn-block">Supprimer</q-btn>
                                  </form>
                                </q-item-section>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="bg-white" align="left">
                    <q-btn color="purple" to="/Dashboard/Tasks" >
                      Voir ma liste
                    </q-btn>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </table>
        </div>
      </div>
      <div class="left-block">
        <h3>Mes listes
          <q-btn style="border: black 1px solid" color="grey-7" round flat icon="add">
            <q-menu>
                <q-item clickable>
                  <form className="form" @submit.prevent="addnewList">
                    <q-input v-model="newList" clearable filled label="Add" />
                    <q-btn type="submit" class="btn btn-block"> Add new list </q-btn>
                  </form>
                </q-item>
            </q-menu>
          </q-btn>
        </h3>
        <div v-if="loading">
          <q-circular-progress indeterminate rounded size="50px" color="lime" class="q-ma-md" />
        </div>
        <div v-else>
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

const loading = ref(false)
// const users = ref([])
const lists = ref([])
const newList = ref('')
const modList = ref('')

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
  column-gap: 60px;
  border-radius: 30px;
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
