<template>
<div>
  <div v-for="(res, i) in results"
       v-bind:key="i">
    {{res.name}} <b> {{ res.score }} </b> <br/>
    <input type="text"
           name="words"
           text
           v-on:keyup='updateName($event, res.uid)'
           v-model="res.name">
    <button @click='givePoints(res.uid)'> Add points</button>
    <button @click='updateArr(res.uid)'> Test add to array</button>
    <br/>
    <span v-for="(xy, i) in res.tales" v-bind:key="i">
      {{ xy }}
    </span>
    <i> {{ res.uid }}</i>
  </div>
</div>

</template>

<script>
import connection from '../connection'

export default {
  name: 'hello',
  data () {
    return {
      results: '',
      idMatch: {}
    }
  },
  mounted () {
    const update = () => {
      this.idMatch = query.results.map(e => e).reduce((a, t) => ({ ...a, [t.data.uid]: { sid: t.id } }), {})
      this.results = query.results.map(e => e.data)
    }

    var query = connection.createSubscribeQuery('players', {
      $sort: {
        uid: -1
      }
    })
    query.on('ready', update)
    query.on('changed', update)
  },
  methods: {
    givePoints (id) {
      id = this.idMatch[id].sid
      var op = [ { p: [ 'score' ], na: 20 } ]
      connection.get('players', id).submitOp(op, function (err) {
        if (err) {
          console.error(err)
        }
      })
    },
    updateName (text, id) {
      id = this.idMatch[id].sid
      text = text.target.value
      var op = [ { p: [ 'name' ], oi: text } ]
      connection.get('players', id).submitOp(op, function (err) {
        if (err) {
          console.error(err)
        }
      })
    },
    updateArr (id) {
      id = this.idMatch[id].sid
      // var op = [ { p: [ 'name' ], oi: text } ]
      var op = [{p: ['tales', 0], li: Math.floor(Math.random() * 300) + 1}]
      connection.get('players', id).submitOp(op, function (err) {
        if (err) {
          console.error(err)
        }
      })
    }

  }

}

</script>
