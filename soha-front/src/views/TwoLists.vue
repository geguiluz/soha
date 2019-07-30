<template>
  <div>
    <v-card max-width="344" class="mx-auto">
      <v-card-title>Draggable 1</v-card-title>
      <draggable class="list-group" :list="list1" group="people" @change="log" ghost-class="ghost">
          <transition-group type = "transition" name="flip-list">
            <div class="sortable" :id="element.id" v-for="(element) in list1" :key="element.name">
              <v-checkbox hide-details class="shrink mr-2 mt-0" v-model="element.completed" :label="element.name"></v-checkbox> 
            </div>
          </transition-group>
      </draggable>
    </v-card>

    <v-card max-width="344" class="mx-auto">
      <v-card-title>Draggable 2</v-card-title>
      <draggable class="list-group" :list="list2" group="people" @change="log" ghost-class="ghost">
          <transition-group type = "transition" name="flip-list">
            <div class="sortable" :id="element.id" v-for="(element) in list2" :key="element.name">
              <v-checkbox hide-details class="shrink mr-2 mt-0" v-model="element.completed" :label="element.name"></v-checkbox> 
            </div>
          </transition-group>
      </draggable>
    </v-card>

    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />

    <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
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
      list1: [
        { name: "John", id: 1, completed: false },
        { name: "Joao", id: 2, completed: true },
        { name: "Jean", id: 3, completed: false },
        { name: "Gerard", id: 4, completed: false }
      ],
      list2: [
        { name: "Juan", id: 5, completed: true },
        { name: "Edgard", id: 6, completed: true },
        { name: "Johnson", id: 7, completed: false }
      ]
    };
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
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