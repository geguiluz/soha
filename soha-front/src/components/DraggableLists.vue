<template>
  <v-flex xs12 sm12 md12>
      <v-container
    fluid
    fill-height
    >
      <v-layout justify-center>
        <v-card outlined width='500' max-width="344" class="mx-auto">
          <v-layout justify-end>
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
            >
            </v-text-field>
            <draggable class="list-group" :list="allLists[0].listItems" group="TaskList" @change="log" ghost-class="ghost">
                <transition-group type = "transition" name="flip-list">
                  <div class="sortable" :id="element.id" v-for="(element) in allLists[0].listItems" :key="element.name">
                    <v-checkbox hide-details class="shrink mr-2 mt-0" v-model="element.completed" :label="element.name"></v-checkbox> 
                  </div>
                </transition-group>
            </draggable>
          </v-card-text>
        </v-card>
        <v-card outlined width='500' max-width="344" class="mx-auto">
          <v-layout justify-end>
          <v-btn class="mx-2" fab small dark color="primary" >
            <v-icon dark>add</v-icon>
          </v-btn>
          </v-layout>
          <v-card-title class="dark-color">
            {{ allLists[1].listTitle }}
          </v-card-title>
          <v-card-text>
            <v-text-field v-if="allLists[1].addTaskFlg" label="Escribe una tarea nueva" name="newTask" type="text" v-model="newTask">
            </v-text-field>
            <draggable class="list-group" :list="allLists[1].listItems" group="TaskList" @change="log" ghost-class="ghost">
                <transition-group type = "transition" name="flip-list">
                  <div class="sortable" :id="element.id" v-for="(element) in allLists[1].listItems" :key="element.name">
                    <v-checkbox hide-details class="shrink mr-2 mt-0" v-model="element.completed" :label="element.name"></v-checkbox> 
                  </div>
                </transition-group>
            </draggable>
          </v-card-text>
        </v-card>
        
        <v-card outlined  max-width="344" class="mx-auto" >
            <v-card-title>KPI's</v-card-title>
            <v-card-text>
              <div class="kpi-row" :id="element.id" v-for="(element) in kpiList" :key="element.id">
                <v-progress-circular rotate=90 size=80 :value="element.value" width=8 color="green">{{ element.value }}%</v-progress-circular>
                <span>
                {{ element.name }}
                </span>
              </div>
            </v-card-text>
        </v-card>
      </v-layout>
      </v-container>
    </v-flex>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: "DraggableLists",
  display: "Draggable Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      allLists: [{
        listTitle: "Mis Tareas",
        addTaskFlg: false,
        newTask: '',
        listItems: [
          { name: "Primera tarea", id: 1, completed: false },
          { name: "Segunda Tarea", id: 2, completed: true },
          { name: "Tercera Tarea", id: 3, completed: false },
          { name: "Cuarta Tarea", id: 4, completed: false }
        ]
      },
      {
        listTitle: "Tareas Delegadas",
        listItems: [
          { name: "Quinta Tarea", id: 5, completed: true },
          { name: "Sexta Tarea", id: 6, completed: true },
          { name: "Séptima Tarea", id: 7, completed: false }
        ]
      }],
      kpiList: [
          { name: "Primer KPI", id: 1, value: 58 },
          { name: "Segundo KPI", id: 2, value: 90 },
          { name: "Tercer KPI", id: 3, value: 30 }
        
      ]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    addTask() {
      this.allLists[0].addTaskFlg = true 
      console.log('Toggling addTaskFlg', this.allLists[0].addTaskFlg)
      // TODO: Set focus on newTask field
    },
    saveTask() {
      this.allLists[0].addTaskFlg = false 
      console.log('Toggling addTaskFlg', this.allLists[0].addTaskFlg)
      // TODO: Push task to task array
      this.allLists[0].listItems.push({name: this.allLists[0].newTask, id: this.allLists[0].length, completed: false})
      this.allLists[0].newTask = ''
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
  padding: 1em;
  cursor: move;
  margin-bottom: 2px;
  &:hover {
    background: lightgray;
  }

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
  box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
  opacity: 0.7;
  &::before {
    content: " ";
    position: absolute;
    widows: 20px;
    height: 20px;
    margin-left: -50px;
    background-image: url('../assets/logo.png');
  }
}

</style>