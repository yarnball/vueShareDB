<template>
  <div>
    {{ JSON.stringify(res) }}
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
    var query = connection.createSubscribeQuery('players', {$sort: {score: -1}});
    query.on('ready', update);
    query.on('changed', update);
    var _this = this
    function update () {
      // console.log('play', query.results.map(e=>e.data))
      _this.res = query.results.map(e=>e.data)
    };
  },
  methods: {
    testShare () {
    var op = [{p: ['score'], na: 15}];
      connection.get('players', 1).submitOp(op, function(err) {
        console.log('adding this?', connection.get('players', 1).data)
        const rest = connection.get('players', 1).data
        if (err) { console.error(err); return; }
      });
    }

  }

}
</script>
