'use strict'

const User = require('../schemas/User')
const Audio = require('../schemas/Audio')
const { v4: uuidv4 } = require('uuid')

const randomBetween = (a, b) => {
  return Math.round(Math.random() * (b - a) + a)
}

const feedbacks = []

const CHANCE_TO_FEEDBACK = 0.7
const CHANCE_TO_POSITIVE_FEEDBACK = 0.5
const MINIMUM_FEEDBACKS = 5
const MAXIMUM_FEEDBACKS = 10

const createFeedbacks = async () => {
  const users = await User.scope(null).findAll()
  const audios = await Audio.scope(null).findAll({
    raw: true,
    where: {
      type: null,
      audibleType: 'scenario',
    },
  })

  return new Promise((resolve, reject) => {
    users.forEach(async user => {
      if (Math.random() < CHANCE_TO_FEEDBACK) {
        const numberFeedbacks = randomBetween(MINIMUM_FEEDBACKS, MAXIMUM_FEEDBACKS)

        for (let i = 0; i < numberFeedbacks; i += 1) {
          const audioIndex = randomBetween(0, audios.length - 1)
          const audio = audios[audioIndex]

          let status = false

          if (Math.random() < CHANCE_TO_POSITIVE_FEEDBACK) status = true

          feedbacks.push({
            uuid: uuidv4(),
            userUuid: user.uuid,
            audioUuid: audio.uuid,
            status,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
      }
    })
    resolve()
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await createFeedbacks()

    await queryInterface.bulkInsert('feedbacks', feedbacks)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('feedbacks', null, {})
  },
}
