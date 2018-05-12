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
    var doc = connection.get('examples', 'counter')
    doc.subscribe(this.showNumbers)
    doc.on('op', this.showNumbers)
  },
  methods: {
    showNumbers () {
      var doc = connection.get('examples', 'counter')
      this.res = doc.data.numClicks
    },
    testShare () {
      var doc = connection.get('examples', 'counter')
      doc.submitOp([{p: ['numClicks'], na: 1}])
      // console.log( doc.data.numClicks)
      // var op = [{p: ['score'], na: 15}]
      // connection.get('players', 1).submitOp(op, function (err) {
      //   console.log('adding this?', connection.get('players', 1).data)
      //   if (err) { console.error(err) }
      // })
      // this.res = connection.get('players', 1).data.score
      // console.log('see', connection.get('players', 1).data )
    }

  }

}
</script>
