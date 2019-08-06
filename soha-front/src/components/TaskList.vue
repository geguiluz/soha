<template>
  <v-card outlined width='500' max-width="344" class="mx-auto">
    <v-layout justify-end>
    <v-btn class="mx-2" fab small dark color="green" @click="addTask">
      <v-icon dark>add</v-icon>
    </v-btn>
    </v-layout>
    <v-card-title class="dark-color">
      {{ listTitle }}
    </v-card-title>
    <v-card-text>
      <v-text-field v-if="allLists[0].addTaskFlg" 
      label="Escribe una tarea nueva" 
      name="newTask" 
      type="text" 
      v-model="newTask"
      @keyup.enter="saveTask"
      :autofocus="allLists[0].addTaskFlg"
      hint="Para agregarla a la lista, sólo da enter"
      >
      </v-text-field>
      <v-list-item-group>
        <draggable class="list-group" :list="listItems" group="TaskList" @change="log" ghost-class="ghost">
            <transition-group type = "transition" name="flip-list">
              
            </transition-group>
        </draggable>
      </v-list-item-group>
    </v-card-text>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'TaskList',
  props: {
    listTitle: '',
    addTaskFlg: '',
    newTask: '',
    addTaskFlg: '',
    listItems: [],
  },
  
  components: {
    draggable
  },
  props: {
    msg: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    onEnd: function(evt) {
      console.log(evt)
      this.oldIndex = evt.oldIndex
      this.newIndex = evt.newIndex
    }
  },
}
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

