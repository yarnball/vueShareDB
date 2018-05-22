import connection from '@/connection'

export const getArrIndx = (res, uid, val, field) => {
  const itmOnly = res.find(r => r.uid === uid)
  return itmOnly[field].indexOf(val)
}

export const rmvArr = (field, inx, val, id) => {
  // THIS requires the index of the ARRAY
  var op = [{ p: [field, inx], ld: val }]
  connection.get('players', id).submitOp(op, function (err) {
    if (err) {
      console.error(err)
    }
  })
}
