'use strict'

const User = require('../schemas/User')
const Oo = require('../schemas/Oo')
const { v4: uuidv4 } = require('uuid')

const randomBetween = (a, b) => {
  return Math.round(Math.random() * (b - a) + a)
}

const feedbacks = []
const feedbackOos = []

const CHANCE_TO_FEEDBACK = 0.7
const MINIMUM_FEEDBACKS = 5
const MAXIMUM_FEEDBACKS = 10
const CHANCE_POSITIVE_FEEDBACK = [0.7, 0.4, 0.6, 0.65, 0.75, 0.3, 0.2]

const MINIMUM_OOS = 3
const MAXIMUM_OOS = 5

const createFeedbacks = async () => {
  const users = await User.findAll()
  const oos = await Oo.findAll()

  return new Promise((resolve, reject) => {
    users.forEach(async user => {
      if (Math.random() < CHANCE_TO_FEEDBACK) {
        const numberFeedbacks = randomBetween(
          MINIMUM_FEEDBACKS,
          MAXIMUM_FEEDBACKS,
        )

        for (let i = 0; i < numberFeedbacks; i += 1) {
          const numberOos = randomBetween(MINIMUM_OOS, MAXIMUM_OOS)
          const currentFeedbackOo = []
          const usedOoId = []

          while (currentFeedbackOo.length < numberOos) {
            const randomOoId = randomBetween(1, oos.length - 1)
            const oo = oos[randomOoId].uuid
            if (usedOoId.indexOf(oo) === -1) {
              currentFeedbackOo.push({
                oo: oo,
                idx: randomOoId,
              })
              usedOoId.push(oo)
            }
          }

          let meanSuccess = 0

          currentFeedbackOo.map(oo => {
            meanSuccess += CHANCE_POSITIVE_FEEDBACK[oo.idx - 1]
          })

          meanSuccess /= currentFeedbackOo.length

          let status = false

          if (Math.random() < meanSuccess) status = true

          const uuid = uuidv4()

          feedbacks.push({
            uuid: uuid,
            userUuid: user.uuid,
            status,
            createdAt: new Date(),
            updatedAt: new Date(),
          })

          currentFeedbackOo.map(oo => {
            feedbackOos.push({
              uuid: uuidv4(),
              feedbackUuid: uuid,
              ooUuid: oo.oo,
            })
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
    return queryInterface.bulkInsert('feedback_oos', feedbackOos)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('feedbacks', null, {})
  },
}
