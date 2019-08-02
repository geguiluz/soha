<template>
    <v-card max-width="344" class="mx-auto">
        <v-card-title>List Title</v-card-title>
        <draggable v-model="taskArray" ghost-class="ghost" @end="onEnd">
            <transition-group type = "transition" name="flip-list">
                <div class="sortable" :id="element.id" v-for="element in taskArray" :key="element.id">
                    <v-checkbox hide-details class="shrink mr-2 mt-0" v-model="element.completed" :label="element.name"></v-checkbox> 
                </div>
            </transition-group>
        </draggable>
    </v-card>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'TaskList',
  
  components: {
    draggable
  },
  props: {
    msg: String
  },
  data() {
    return {
      taskArray: [
        {name: 'First Task', id: 0, completed: false},
        {name: 'Second Task', id: 1, completed: false},
        {name: 'Third Task', id: 2, completed: false},
        {name: 'Fourth Task', id: 3, completed: true},
        {name: 'Fifth Task', id: 4, completed: true},
        {name: 'Sixth Task', id: 5, completed: true},
      ],
      oldIndex: '',
      newIndex: ''
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

