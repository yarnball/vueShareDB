<template>
  <div>
    <div v-for="(res, i) in results"
      v-bind:key="i">
      {{res.name}} <b> {{ res.score }} </b>
      <i> {{i }} </i>
    </div>
    <button @click='testShare()'> Test shareDB</button>
  </div>
</template>

<script>
import connection from '../connection'

export default {
  name: 'hello',
  data () {
    return {
      results: ''
    }
  },
  mounted () {
    const update = () => {
      this.results = query.results.map(e => e.data)
    }
    var query = connection.createSubscribeQuery('players', {$sort: {score: -1}})
    query.on('ready', update)
    query.on('changed', update)
  },
  methods: {
    testShare () {
      var op = [{p: ['name'], oi: 'CC!'}]
      connection.get('players', 1).submitOp(op, function (err) {
        if (err) { console.error(err) }
      })
    }

  }

}
</script>
