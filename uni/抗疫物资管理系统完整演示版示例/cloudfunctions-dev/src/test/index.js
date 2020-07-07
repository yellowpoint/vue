/**
 * @name
 * @author SunSeekerX
 * @time 2020-01-31 21:20:03
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-02 19:44:02
 */

const jwt = require('jwt-simple')
const tokenExp = 7 * 24 * 60 * 60 * 1000
// const config = require('../config/config')

try {
  var decoded = jwt.decode(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjEzODAwMDAwMDAwIiwiZGF0ZSI6MTU4MDY0MzA3NDgyOH0.J_v1kN63jBY-9xAOzhcIWDwCzJLJec9GmzNdaUoJjBU',
    '35cfd805-716f-42c1-901c-8f431a155b0e'
  )

  console.log(decoded.date + tokenExp < new Date().getTime())
  console.log(decoded)
} catch (error) {
  console.log(error.message)
}
