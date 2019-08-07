<template>
    <div class="kpi-row">
        <v-progress-circular rotate=90 size=80 :value="value" :width="width" :color="this.color">{{ value }}%</v-progress-circular>
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
      name: String
    },
  data() {
    return {
        color: 'green'
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
        let percentage = this.value
            console.log('Color', this.color)
            // this.color = 'green'
            if (percentage === 100) {
                this.color = 'green'
            } else if (percentage >= 80 && percentage < 100) {
                // Generic primary blue
                this.color = '#1177CC'
            } else if (percentage >= 50 && percentage < 80) {
                // Orange
                this.color = '#FB8801'
            } else if (percentage <= 30) {
                // Red
                this.color = '#D21717'
            }
        }
  }
};
</script>


<style scoped lang="scss">

</style>

