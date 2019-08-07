<template>
  <div>
    <v-layout row wrap align-center class="task-row">
      <v-checkbox hide-details class="shrink ml-2 mt-0" v-model="completed" ></v-checkbox>
        <v-text-field
          name="taskName" 
          type="text" 
          v-model="taskname"
          hide-details
          solo
          :flat="!editMode"
          :disabled="!editMode"
          @keyup.enter="updateTask"
          background-color="rgba(0, 0, 0, 0)"
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-speed-dial
        right
        direction="right"
        open-on-hover

        transition="slide-x"
        >
          <template v-slot:activator v-if="allowEdit">
            <v-btn
            icon
            @click="editTask"
            >
            <v-icon>edit</v-icon>
            </v-btn>
          </template>
          <v-btn
              fab
              dark
              small
              color="red"
              @click="deleteTask"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-layout>
    </div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    taskname: String,
    completed: Boolean,
    allowEdit: Boolean
  },
  data() {
    return {
      editMode: false
    }
  },
  methods: {
    editTask() {
        this.editMode = !this.editMode
    },
    updateTask() {
      // TODO: Read user ID off the current session
      const currentUser = '5d46632ebfbbe11ab5f5e5f0'

      axios
        .post("http://localhost:3000/"+currentUser+"/addTask", {
          name: this.allLists[0].newTask, 
          completed: false 
        })
        .then(res => {
          this.allLists[0].addTaskFlg = false 
          
          // Disable edit mode
          this.editMode = false

        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo agregar la nueva tarea, favor de intentar más tarde.", err
          );
        }); 
    },
    deleteTask() {
      // TODO: Implementar ruta para borrar task
      // TODO: Usar splice para eliminar el índice en específico
      // Creo que necesito invocar el método del componente padre
    }
  }
}
</script>
<style scoped lang="scss">
    .task-row {
        padding: 0;
        cursor: move;
        &:hover {
            background: lightgrey;
        }
    }
</style>
