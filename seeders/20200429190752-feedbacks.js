'use strict'

const User = require('../schemas/User')
const Oo = require('../schemas/Oo')

const randomBetween = (a, b) => {
  return Math.round(Math.random() * (b - a) + a)
}

const feedbacks = []
const feedbackOos = []

const CHANCE_TO_FEEDBACK = 0.7
const MINIMUM_FEEDBACKS = 2
const MAXIMUM_FEEDBACKS = 5
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

          while (currentFeedbackOo.length < numberOos) {
            const randomOoId = randomBetween(1, oos.length - 1)
            if (currentFeedbackOo.indexOf(randomOoId) === -1) {
              currentFeedbackOo.push(oos[randomOoId])
            }
          }

          let meanSuccess = 0

          currentFeedbackOo.map(oo => {
            meanSuccess += CHANCE_POSITIVE_FEEDBACK[oo.id - 1]
          })

          meanSuccess /= currentFeedbackOo.length

          let status = false

          if (Math.random() < meanSuccess) status = true

          feedbacks.push({
            userId: user.id,
            status,
            createdAt: new Date(),
            updatedAt: new Date(),
          })

          currentFeedbackOo.map(oo => {
            feedbackOos.push({
              feedbackId: feedbacks.length,
              ooId: oo.id,
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
