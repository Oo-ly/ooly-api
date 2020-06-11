const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const { v4: uuidv4 } = require('uuid')
// return 0

const Oo = require('./schemas/Oo')
const Feedback = require('./schemas/Feedback')
const User = require('./schemas/User')
const AudioSuggestion = require('./schemas/Suggestion').AudioSuggestion
const OoSuggestion = require('./schemas/Suggestion').OoSuggestion

var g = require('ger')
var esm = new g.MemESM()
var ger = new g.GER(esm)

const setupRaccoon = async () => {
  await ger.initialize_namespace('users')
  await ger.initialize_namespace('sentences')
  // await ger.initialize_namespace('oos')
  const feedbacks = await Feedback.findAll()
  const events = []

  feedbacks.forEach(async feedback => {
    events.push({
      namespace: 'users',
      person: feedback.userUuid,
      action: feedback.status ? 'likes' : 'dislikes',
      thing: feedback.audio.oo.uuid,
      expires_at: '2100-01-01',
    })

    events.push({
      namespace: 'sentences',
      person: feedback.userUuid,
      action: feedback.status ? 'likes' : 'dislikes',
      thing: feedback.audio.uuid,
      expires_at: '2100-01-01',
    })
  })

  return ger.events(events)
}

setupRaccoon()
  .then(async () => {
    const users = await User.findAll()
    // const oos = await Oo.findAll()

    users.forEach(async user => {
      const recommendations = await ger.recommendations_for_person('users', user.uuid, { actions: { likes: 1 } })

      recommendations.recommendations.map(async recommendation => {
        await OoSuggestion.create({
          uuid: uuidv4(),
          userUuid: user.uuid,
          suggestedOoUuid: recommendation.thing,
          weight: recommendation.weight,
        })
      })
    })

    return users
  })
  .then(async users => {
    console.log('------- Done OoSuggestion -------')

    users.forEach(async user => {
      const recommendations = await ger.recommendations_for_person('sentences', user.uuid, { actions: { likes: 1 } })

      recommendations.recommendations.map(async recommendation => {
        await AudioSuggestion.create({
          uuid: uuidv4(),
          userUuid: user.uuid,
          suggestedAudioUuid: recommendation.thing,
          weight: recommendation.weight,
        })
      })
    })
  })
  .then(async () => {
    console.log('------- Done AudioSuggestion -------')
  })
