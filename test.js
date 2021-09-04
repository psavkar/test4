module.exports = defineComponent({
  async run({steps, $}) {
    return steps.trigger.event
  },
})
