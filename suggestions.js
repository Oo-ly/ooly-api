const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const { v4: uuidv4 } = require('uuid')
return 0

const Oo = require('./schemas/Oo')
const Feedback = require('./schemas/Feedback')
const User = require('./schemas/User')
const UserSuggestion = require('./schemas/Suggestion').UserSuggestion
const OoSuggestion = require('./schemas/Suggestion').OoSuggestion

var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm)

const setupRaccoon = async () => {
  await ger.initialize_namespace('users')
  await ger.initialize_namespace('oos')
  const feedbacks = await Feedback.findAll({ include: [Oo] })
  const events = []

  feedbacks.forEach(async feedback => {
    if (feedback.status !== null) {
      feedback.oos.forEach(async oo => {
        events.push({
          namespace: 'users',
          person: feedback.userUuid,
          action: feedback.status ? 'likes' : 'dislikes',
          thing: oo.uuid,
          expires_at: '2100-01-01',
        })

        feedback.oos.forEach(async anotherOo => {
          if (anotherOo.uuid !== oo.uuid) {
            events.push({
              namespace: 'oos',
              person: oo.uuid,
              action: feedback.status ? 'likes' : 'dislikes',
              thing: anotherOo.uuid,
              expires_at: '2100-01-01',
            })
          }
        })
      })
    }
  })

  return ger.events(events)
}

setupRaccoon().then(async () => {
  const users = await User.findAll()
  const oos = await Oo.findAll()

  users.forEach(async user => {
    const recommendations = await ger.recommendations_for_person(
      'users',
      user.uuid,
      { actions: { likes: 1 } },
    )

    recommendations.recommendations.map(async recommendation => {
      await UserSuggestion.create({
        uuid: uuidv4(),
        userUuid: user.uuid,
        suggestedOoUuid: recommendation.thing,
        weight: recommendation.weight,
      })
    })
  })

  console.log('Done users')

  oos.forEach(async oo => {
    const recommendations = await ger.recommendations_for_person('oos', oo.id, {
      actions: { likes: 1 },
    })

    recommendations.recommendations.map(async recommendation => {
      await OoSuggestion.create({
        uuid: uuidv4(),
        ooUuid: oo.uuid,
        suggestedOoUuid: recommendation.thing,
        weight: recommendation.weight,
      })
    })
  })

  console.log('Done Oo')
})
