<!-- eslint-disable vue/require-v-for-key -->
<template>
    <q-page class="flex">
        <div class="home">
            <div class="right-block" style="align-items: center, width: auto, margin-top: 100px">
                <div class="row" style="align-items: center ">
                    <q-btn color="grey" style="border: black 1px solid" round flat icon="arrow_back_ios_new" to="/Dashboard" >
                    </q-btn>
                    <div class="text-h2" style="padding-left: 20px" >{{ oneList.title }}</div>
                </div>
                <q-btn color="purple" icon="add" style="margin-top: 40px" label="Ajouter une tâche">
                    <q-menu>
                        <q-item clickable>
                            <form className="form" @submit.prevent="addnewTask(route.params.id)">
                                <q-input v-model="newTask" clearable filled label="Task" style="margin-top: 5px" required=""/>
                                <q-input v-model="newDescriptionTask" clearable filled label="Decription" style="margin-top: 5px" required=""/>
                                <q-btn type="submit" class="btn btn-block" style="margin-top: 5px"> Add new task </q-btn>
                            </form>
                        </q-item>
                    </q-menu>
                </q-btn>
                <div v-if="loading">
                    <q-circular-progress indeterminate rounded size="50px" color="purple" class="q-ma-md" />
                </div>
                <div v-else>
                    <div class="q-pa-md row items-center q-gutter-md">
                        <div class="cursor-pointer">
                            <h1>Tâches</h1>
                            <!-- {{ tasks.length }}  -->
                            <hr>
                            <div v-for="tasks_all in tasks" :key="tasks_all._id">
                                <div v-if="!tasks_all.done">
                                    <q-card flat bordered class="my-card bg-grey-1" style="margin-top: 20px" >
                                        <q-card-section class="bg-lightgrey">
                                            <div class="row items-center no-wrap">
                                                <div class="q-gutter-sm">
                                                    <q-checkbox v-model="tasks_all.done" color="purple" @click="sendData(tasks_all._id, tasks_all)" />
                                                </div>
                                                <div class="col">
                                                    <!-- <div class="text-h6">{{ list_all._id }}</div> -->
                                                    <div class="text-h5" style="color: black">{{ tasks_all.title }}</div>
                                                    <div class="text-h7" style="color: grey">{{ tasks_all.description }}</div>
                                                </div>

                                                <div class="col-auto">
                                                    <q-btn color="grey-7" round flat icon="more_vert">
                                                        <q-menu>
                                                            <q-list dense style="min-width: 100px">
                                                                <q-btn>Editer
                                                                    <q-menu>
                                                                        <q-item clickable>
                                                                            <form className="form"
                                                                                @submit.prevent="modifyCurrentTask(tasks_all._id)">
                                                                                <q-input v-model="modTask" clearable filled
                                                                                    label="Modify" />
                                                                                <q-btn type="submit"
                                                                                    class="btn btn-block">
                                                                                    Modify task
                                                                                </q-btn>
                                                                            </form>
                                                                        </q-item>
                                                                    </q-menu>
                                                                </q-btn>
                                                                <q-btn>Supprimer
                                                                    <q-menu>
                                                                        <q-item>
                                                                        <form className="form" @submit.prevent="deleteCurrentTask(tasks_all._id)" >
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
                                    </q-card>
                                </div>
                            </div>
                            <h1 style="padding-top: 30px">Tâches complétées</h1>
                            <hr>
                            <div v-for="tasks_all in tasks" :key="tasks_all._id">
                                <div v-if="tasks_all.done">
                                    <q-card flat bordered class="my-card bg-grey-1" style="margin-top: 20px" >
                                        <q-card-section class="bg-lightgrey">
                                            <div class="row items-center no-wrap">
                                                <div class="q-gutter-sm">
                                                    <q-checkbox v-model="tasks_all.done" color="purple" @click="sendData(tasks_all._id, tasks_all)" />
                                                </div>
                                                <div class="col">
                                                    <!-- <div class="text-h6">{{ list_all._id }}</div> -->
                                                    <div class="text-h5" style="color: black"><strike>{{ tasks_all.title }}</strike></div>
                                                    <div class="text-h7" style="color: grey"><strike>{{ tasks_all.description }}</strike></div>
                                                </div>

                                                <div class="col-auto">
                                                    <q-btn color="grey-7" round flat icon="more_vert">
                                                        <q-menu>
                                                            <q-list dense style="min-width: 100px">
                                                                <q-btn>Editer
                                                                    <q-menu>
                                                                        <q-item clickable>
                                                                            <form className="form"
                                                                                @submit.prevent="modifyCurrentTask(tasks_all._id)">
                                                                                <q-input v-model="modTask" clearable filled
                                                                                    label="Modify" />
                                                                                <q-btn type="submit"
                                                                                    class="btn btn-block">
                                                                                    Modify task
                                                                                </q-btn>
                                                                            </form>
                                                                        </q-item>
                                                                    </q-menu>
                                                                </q-btn>
                                                                <q-btn>Supprimer
                                                                    <q-menu>
                                                                        <q-item>
                                                                        <form className="form" @submit.prevent="deleteCurrentTask(tasks_all._id)" >
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
                                    </q-card>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <q-circular-progress indeterminate rounded size="50px" color="purple" class="q-ma-md" />
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
import { getTasksByList, addTask, modifyTask, deleteTask } from 'src/services/tasks'
import { useRoute } from 'vue-router'
import { getAllLists, addList, getOneList } from 'src/services/lists'

const route = useRoute()
const loading = ref(false)
// const users = ref([])
const tasks = ref([])
const newTask = ref('')
const newDescriptionTask = ref('')
const modTask = ref('')
const lists = ref([])
const oneList = ref('')
const newList = ref('')

const loadTask = async () => {
  const res = await getTasksByList(route.params.id)
  tasks.value = res.data
}

const sendData = async (getTaskId, tasksAll) => {
  const modifyCheckbox = {
    done: tasksAll.done
  }
  const response = await modifyTask(getTaskId, modifyCheckbox)
  loadTask()
  console.log(response)
}

const addnewTask = async (getListId) => {
  const taskForm = {
    list: getListId,
    title: newTask.value,
    description: newDescriptionTask.value
  }
  loadTask()
  window.location.reload()
  const response = await addTask(taskForm)
  console.log(response)
}

const modifyCurrentTask = async (getTaskId) => {
  const modifyTaskForm = {
    title: modTask.value
  }
  const response = await modifyTask(getTaskId, modifyTaskForm)
  loadTask()
  window.location.reload()
  console.log(response)
}

const deleteCurrentTask = async (getId) => {
  const response = await deleteTask(getId)
  loadTask()
  window.location.reload()
  console.log(response)
}

const addnewList = async () => {
  const listForm = { title: newList.value }
  const response = await addList(listForm)
  loadTask()
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
    const resOneList = await getOneList(route.params.id)
    oneList.value = resOneList.data
    const resAllLists = await getAllLists()
    lists.value = resAllLists.data
    const getListId = route.params.id
    const res = await getTasksByList(getListId)
    tasks.value = res.data
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
    padding: 40px;
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
