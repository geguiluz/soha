<template>
  <v-flex xs12 sm8 md4>
      <v-container
    fluid
    fill-height
    >
      <v-layout justify-center>
        <v-card max-width="344" class="mx-auto" :id="element.id" v-for="(element) in allLists" :key="element.id">
          <v-card-title>{{ element.listTitle }}</v-card-title>
          <draggable class="list-group" :list="element.listItems" group="TaskList" @change="log" ghost-class="ghost">
              <transition-group type = "transition" name="flip-list">
                <div class="sortable" :id="element.id" v-for="(element) in element.listItems" :key="element.name">
                  <v-checkbox hide-details class="shrink mr-2 mt-0" v-model="element.completed" :label="element.name"></v-checkbox> 
                </div>
              </transition-group>
          </draggable>
        </v-card>
      </v-layout>
      </v-container>
    </v-flex>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      allLists: [{
        listTitle: "Primera Lista",
        listItems: [
          { name: "Primera tarea", id: 1, completed: false },
          { name: "Segunda Tarea", id: 2, completed: true },
          { name: "Tercera Tarea", id: 3, completed: false },
          { name: "Cuarta Tarea", id: 4, completed: false }
        ]
      },
      {
        listTitle: "Segunda Lista",
        listItems: [
          { name: "Quinta Tarea", id: 5, completed: true },
          { name: "Sexta Tarea", id: 6, completed: true },
          { name: "Séptima Tarea", id: 7, completed: false }
        ]
      }]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>

<style scoped lang="scss">

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