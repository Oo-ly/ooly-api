const redis = require('redis')
const raccoon = require('raccoon')

const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const Oo = require('./schemas/Oo')
const Feedback = require('./schemas/Feedback').Feedback

var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm)

const setupRaccoon = async () => {
  await ger.initialize_namespace('oos')
  const feedbacks = await Feedback.findAll({ include: [Oo] })
  const events = []

  feedbacks.forEach(async feedback => {
    if (feedback.status !== null) {
      feedback.oos.forEach(async oo => {
        events.push({
          namespace: 'oos',
          person: feedback.userId,
          action: feedback.status ? 'likes' : 'dislikes',
          thing: oo.id,
          expires_at: '2100-01-01',
        })
      })
    }
  })

  await ger.events(events)

  return await ger.recommendations_for_person('oos', 3, {
    actions: { likes: 1 },
  })
}

setupRaccoon().then(recs => {
  console.log(recs)

  // ToDo : Save suggestions
  return null
})
