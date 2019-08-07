<template>
  <v-flex xs12 sm12 md12>
      <v-container
    fluid
    fill-height
    >
      <v-layout justify-center>
        <v-card outlined width="500" max-width="344" class="mx-auto" >
          <v-layout justify-end>
            <v-btn class="mx-2" icon small>
              <v-icon>mdi-bullseye-arrow</v-icon>
            </v-btn>
            <v-btn class="mx-2" icon small @click="toggleEdition">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab small dark color="green" @click="addTask">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-layout>
          <v-card-title class="dark-color">
            {{ allLists[0].listTitle }}
          </v-card-title>
          <v-card-text>
            <v-text-field v-if="allLists[0].addTaskFlg" 
            label="Escribe una tarea nueva" 
            name="newTask" 
            type="text" 
            v-model="allLists[0].newTask"
            @keyup.enter="saveTask"
            :autofocus="allLists[0].addTaskFlg"
            hint="Para agregarla a la lista, sólo da enter"
            >
            </v-text-field>
              <draggable class="list-group" :list="allLists[0].listItems" group="TaskList" @change="log" ghost-class="ghost">
                  <transition-group type = "transition" name="flip-list">
                    <taskItem :id="element._id" v-for="(element, index) in allLists[0].listItems" :key="index" :taskname="element.name" :completed="element.completed" :allowEdit="allLists[0].allowEdit">
                    </taskItem>
                  </transition-group>
              </draggable>
          </v-card-text>
        </v-card>

        <v-card outlined width='500' max-width="344" class="mx-auto">
          <v-layout justify-end>
          <v-btn class="mx-2" fab small dark color="green">
            <v-icon dark>add</v-icon>
          </v-btn>
          </v-layout>
          <v-card-title class="dark-color">
            {{ allLists[1].listTitle }}
          </v-card-title>
          <v-card-text>
            <v-text-field v-if="allLists[1].addTaskFlg" 
            label="Escribe una tarea nueva" 
            name="newTask" 
            type="text" 
            v-model="allLists[1].newTask"
            @keyup.enter="saveTask"
            :autofocus="allLists[1].addTaskFlg"
            >
            </v-text-field>
              <draggable class="list-group" :list="allLists[1].listItems" group="TaskList" @change="log" ghost-class="ghost">
                  <transition-group type = "transition" name="flip-list">
                    <taskItem :id="element._id" v-for="(element, index) in allLists[1].listItems" :key="index" :taskname="element.name" :completed="element.completed">
                    </taskItem>
                  </transition-group>
              </draggable>
          </v-card-text>
        </v-card>
        
        <v-card outlined  max-width="344" class="mx-auto" >
            <v-card-title>Mission Status</v-card-title>
            <v-card-text>
              <roundKpi :id="element.id" v-for="(element) in kpiList" :key="element.id" :name="element.name" :value="element.value" :width="12">
              </roundKpi>
            </v-card-text>
        </v-card>
      </v-layout>
      </v-container>
    </v-flex>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";
import taskItem from "../components/TaskItem";
import roundKpi from "../components/RoundKpi";

export default {
  name: "DraggableLists",
  display: "Draggable Lists",
  order: 1,
  components: {
    draggable,
    taskItem,
    roundKpi
  },
  data() {
    return {
      allLists: [{
        listTitle: "Mis Tareas",
        addTaskFlg: false,
        allowEdit: false,
        newTask: '',
        persistentHint: false,
        listItems: [
        ]
      },
      {
        listTitle: "Tareas Delegadas",
        listItems: [
          { name: "Quinta Tarea", _id: 5, completed: true },
          { name: "Sexta Tarea", _id: 6, completed: true },
          { name: "Séptima Tarea", _id: 7, completed: false }
        ]
      }],
      kpiList: [
          { name: "Primer KPI", id: 1, value: 58, displayColor: "green" },
          { name: "Segundo KPI", id: 2, value: 90, displayColor: "green" },
          { name: "Tercer KPI", id: 3, value: 30, displayColor: "green" }
        
      ]
    };
  },
  mounted() {
    this.getMyTasks()
    // this.getMissionStats()
  },
  computed: {
    updateMyTasks() {
      this.getMyTasks()
      // this.getMissionStats()
    }
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    toggleEdition() {
      // This flag helps us setting focus on newTask field and showing the field
      // itself
      this.allLists[0].allowEdit = !this.allLists[0].allowEdit
      console.log('Toggling edition', this.allLists[0].allowEdit)
    },
    addTask() {
      // This flag helps us setting focus on newTask field and showing the field
      // itself
      this.allLists[0].addTaskFlg = true 
      console.log('Toggling addTaskFlg', this.allLists[0].addTaskFlg)
    },
    dummySave() {
      console.log("My Tasks List (Dummy Save)",this.allLists[0].listItems)
      this.allLists[0].addTaskFlg = false 
      // console.log('Toggling addTaskFlg', this.allLists[0].addTaskFlg)
      // Push task to the beginning of task array
      this.allLists[0].listItems.unshift({name: this.allLists[0].newTask, id: this.allLists[0].length, completed: false})
      this.allLists[0].newTask = ''
    },
    saveTask() {
      // this.allLists[0].addTaskFlg = false 
      // console.log('Toggling addTaskFlg', this.allLists[0].addTaskFlg)
      // Push new task to the beginning of task array
      // this.allLists[0].listItems.unshift({name: this.allLists[0].newTask, id: this.allLists[0].length, completed: false})
      // this.allLists[0].newTask = ''
      // TODO: Read user ID off the current session
      const currentUser = '5d46632ebfbbe11ab5f5e5f0'

      axios
        .post("http://localhost:3000/"+currentUser+"/addTask", {
           name: this.allLists[0].newTask, 
           completed: false 
        })
        .then(res => {
          this.allLists[0].addTaskFlg = false 
          // console.log('Toggling addTaskFlg', this.allLists[0].addTaskFlg)
          // Push task to the beginning of task array
          this.allLists[0].listItems.unshift({name: this.allLists[0].newTask, id: this.allLists[0].length, completed: false})
          this.allLists[0].newTask = ''
        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo agregar la nueva tarea, favor de intentar más tarde.", err
          );
        });
    },
    getMyTasks() {
      // Get my tasks from myTasks route, then render them to
      // this.allLists[0].listItems[]
      // TODO: Read user ID off the current session
      const currentUser = '5d46632ebfbbe11ab5f5e5f0'

      const url = "http://localhost:3000/"+currentUser+"/myTasks"
      axios
        .get(url)
        .then(res => {
          this.allLists[0].listItems = res.data
          console.log("My Tasks List",this.allLists[0].listItems)
        })
        .catch(err => {
          alert(
            "Lo sentimos, hubo un problema al traer tu lista de tareas. Inténtalo más tarde", err
          );
        });
    },
    getMyMissions() {
      // Get my tasks from myTasks route, then render them to
      // this.kpiList[]
      // TODO: Read user ID off the current session
      const currentUser = '5d46632ebfbbe11ab5f5e5f0'

      const url = "http://localhost:3000/"+currentUser+"/myMissions"
      axios
        .get(url)
        .then(res => {
          this.this.kpiList = res.data
          console.log("My Mission List",this.kpiList)
        })
        .catch(err => {
          alert(
            "Lo sentimos, hubo un problema al traer tus misiones. Inténtalo más tarde", err
          );
        });
    },
    getMissionStats() {
      // Get my tasks from myTasks route, then render them to
      // this.kpiList[]
      // TODO: Read user ID off the current session
      const currentUser = '5d46632ebfbbe11ab5f5e5f0'

      const url = "http://localhost:3000/"+currentUser+"/myMissionStats"
      axios
        .get(url)
        .then(res => {
          this.this.kpiList = res.data
          console.log("My Mission List",this.kpiList)
        })
        .catch(err => {
          alert(
            "Lo sentimos, hubo un problema al traer el resumen de tus misiones. Inténtalo más tarde", err
          );
        });
    }
  }
};
</script>

<style scoped lang="scss">

.dark-color {
  background-color: black;
  color: whitesmoke;
}

span {
  font-size: 1.1rem;
  margin-left: 10px;
}

.kpi-row {
  margin: 10px 0 10px 0;
}

h3 {
  margin: 40px 0 0;
}

strong {
  display: inline-block;
}

.sortable {
  width: 100%;
  background: white;
  // padding: 1em;
  // cursor: move;
  // margin-bottom: 2px;
  // &:hover {
  //   background: lightgray;
  // }

  span {
    float: right;
  }
}

.hello .sortable-drag {
  opacity: 0;
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  border-left: 6px solid blue;
  margin-left: -20px;
  box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
  opacity: 0.7;
  &::before {
    content: " ";
    position: absolute;
    widows: 20px;
    height: 20px;
    margin-left: -50px;
  }
}

</style>