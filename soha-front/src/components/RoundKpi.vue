<template>
    <div class="kpi-row">
        <v-progress-circular rotate=90 size=110 
        :value="value" 
        :width="width" 
        :color="this.progressColor"
        >
        {{ value }}%
        </v-progress-circular>
        <span>
        {{ name }}
        </span>
    </div>
</template>

<script>
export default {
  name: "RoundKpi",
  props: {
      value: String,
      width: Number,
      name: String,
      color: String
    },
  data() {
    return {
        progressColor: 'blue'
    }
  },
  mounted() {
    this.calcProgressColor()
  },
  computed: {
    updateColor() {
      this.calcProgressColor()
    }
  },
  methods: {
    calcProgressColor() {
      if ( this.color === '' )
      {
        let percentage = this.value
          // this.color = 'green'
          if (percentage === 100) {
              this.progressColor = 'green'
          } else if (percentage >= 80 && percentage < 100) {
              // Generic primary blue
              this.progressColor = '#1177CC'
          } else if (percentage >= 50 && percentage < 80) {
              // Orange
              this.progressColor = '#FB8801'
          } else if (percentage <= 30) {
              // Red
              this.progressColor = '#D21717'
          }
        } else {
          this.progressColor = this.color
        }
      }
  }
};
</script>


<style scoped lang="scss">

</style>

