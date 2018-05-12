<template>
  <div>
    {{ res }}
    <button @click='testShare()'> Test shareDB</button>
  </div>
</template>

<script>
import connection from '../connection'

export default {
  name: 'hello',
  data () {
    return {
      res: ''
    }
  },
  mounted () {
    var query = connection.createSubscribeQuery('players', {$sort: {score: -1}})
    query.on('ready', update)
    query.on('changed', update)
    function update () {
      console.log('magic', query.results)
      this.res = query.results
      // comp.setState({players: query.results});
    }
    console.log(this.$el) // I'm text inside the component.
  },
  methods: {
    testShare () {
      var op = [{p: ['score'], na: 15}]
      connection.get('players', 1).submitOp(op, function (err) {
        console.log('adding this?', connection.get('players', 1).data)
        if (err) { console.error(err) }
      })
      this.res = connection.get('players', 1).data.score
      // console.log('see', connection.get('players', 1).data )
    }

  }

}
</script>
