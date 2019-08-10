<template>
  <div>
    <v-layout row wrap align-center class="task-row">
      <v-checkbox hide-details class="shrink ml-2 mt-0" v-model="completedMutable" @change="updateCompletedFlag()"></v-checkbox>
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
          <v-menu
            bottom
            offset-y
          >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              small
              v-on="on"
            >
              <v-icon
              :color="tag.color"
              >
              {{ tag.icon }}
              </v-icon>
             </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-chip color="default" @click="changeMission(null, '')" > 
                <v-icon>mdi-close-circle-outline</v-icon> 
                  Quitar Misión 
                </v-chip>
            </v-list-item>
            <v-list-item :id="element._id" v-for="(element) in allMissions" 
                    :key="element._id" >
              <v-chip :color="element.displayColor" dark @click="changeMission(element._id, element.displayColor)" > {{ element.missionName }}</v-chip>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-list-item-avatar v-if="delegated&&!allowEdit">
          <v-img :src="avatar"></v-img>
        </v-list-item-avatar>

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
import axios from "axios";

export default {
  name: "TaskItem",
  props: {
    taskname: String,
    completed: Boolean,
    allowEdit: Boolean,
    taskId: String,
    missionTags: Array,
    delegated: Boolean,
    assignedTo: Array,
    allMissions: Array
  },
  data() {
    return {
      editMode: false,
      tag: {icon: 'bookmark', color: 'blue'},
      // missionList: [],
      avatar: '',
      completedMutable: false,
      tagsMutable: []
    }
  },
  mounted() {
    this.tagsMutable = this.missionTags
    this.renderMissionTag()
    // this.getMyMissions()
    this.renderAvatar()
    this.completedMutable = this.completed
  },
  computed: {
    updateColor() {
      this.renderMissionTag()
    },
    updateAvatar() {
      this.renderAvatar()
    },
    udpdateAvailableMissions() {
      // this.getMyMissions()
    }
  },
  methods: {
    editTask() {
        this.editMode = !this.editMode
    },
    updateTask() {
      // TODO: Read user ID off the current session
      const currentUser = '5d46632ebfbbe11ab5f5e5f0'

      const url = `${process.env.VUE_APP_URL}/${currentUser}/${this.taskId}/changeTaskName`

      axios
        .put(url, {
          name: this.taskname, 
          completed: this.completed 
        })
        .then(res => {
          // Disable edit mode
          this.editMode = false

        })
        .catch(err => {
          alert(
            "Lo sentimos, no se pudo modificar la tarea, favor de intentar más tarde.", err
          );
        }); 
    },
    deleteTask() {
      // TODO: Implementar ruta para borrar task
      // TODO: Usar splice para eliminar el índice en específico
      // Creo que necesito invocar el método del componente padre
    },
    updateCompletedFlag() {
      console.log("Changing complete flag")
        // TODO: Read user ID off the current session
        const currentUser = '5d46632ebfbbe11ab5f5e5f0'

        const url = `${process.env.VUE_APP_URL}/${currentUser}/${this.taskId}/updateCompleteFlag`

        console.log(url)
        axios
          .put(url, {
            completed: this.completedMutable 
          })
          .then(res => {
            this.completed = res.data.completedMutable
            console.log('New value for flag is', this.completedMutable)
            this.updateDashboard('Flag Change')
          })
          .catch(err => {
            alert(
              "Lo sentimos, hubo un problema al cambiar el estatus de completado. Inténtalo más tarde", err
            );
        });
    },
    changeMission(missionId, newColor) {
        console.log("Changing Mission")
        // TODO: Read user ID off the current session
        const currentUser = '5d46632ebfbbe11ab5f5e5f0'

        const url = `${process.env.VUE_APP_URL}/${currentUser}/${this.taskId}/assignMission`

        // console.log(url)
        axios
          .put(url, {
            missionId: missionId 
          })
          .then(res => {
            this.missionTags = res.data
            this.tag.color = newColor
            this.tag.icon = 'bookmark'
            this.updateDashboard('Mission Change')
          })
          .catch(err => {
            alert(
              "Lo sentimos, hubo un problema al modificar la misión (reasignar). Inténtalo más tarde", err
            );
        });

    },
    renderMissionTag() {
      if ( this.tagsMutable === null || this.tagsMutable.length === 0 ){
        this.tag.color = ''
        this.tag.icon = 'mdi-bookmark-outline'
      } else {
        this.tag.color = this.tagsMutable[0].displayColor
        this.tag.icon = 'bookmark'
      }

    },
    renderAvatar() {
      if ( this.assignedTo === null || this.assignedTo.length === 0 ){
        this.avatar = ''
      } else {
        this.avatar = this.assignedTo[0].profilePic
      }

    },
    updateDashboard(origin) {
      // let outputObject = { missionId: this.missionTags._id, completed: this.completed }
      this.$emit('valueChange', 'whatever')
      console.log('Testing method from', origin)
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

// TODO: Preguntarle a Chan cómo cambiar esto
.theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
    color: #424242 !important;
    // color: red !important;
}
input {
    color: #424242 !important;
    // color: red !important;
}
textarea {
    color: #424242 !important;
    // color: red !important;
}
</style>
