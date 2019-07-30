<template>
    <div>
        <h3>
        This is the Dashboard page
        </h3>
        <TaskList listType = 'misTareas'/>
        <!-- <TaskList listType = 'meDeben'/>
        <TaskList /> -->
    </div>
</template>

<script>

import Signup from '../components/Signup';
import TaskList from '../components/TaskList';

export default {
    components: {
    Signup,
    TaskList,
  },
}
</script>