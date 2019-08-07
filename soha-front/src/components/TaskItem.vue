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
            this.editMode = false
        },
        deleteTask() {
            // TODO: Implementar ruta para borrar task
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
