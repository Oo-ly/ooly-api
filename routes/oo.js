const Oo = require('../schemas/Oo')

module.exports = app => {
  /**
   * @api {get} /oos Oo list
   * @apiName Oo list
   * @apiGroup Oo
   *
   * @apiSuccess {Object[]} oos List of Oos
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "oos": [
   *            {
   *                "id": 1,
   *                "name": "Oo'la",
   *                "description": "Accueil",
   *                "isAvailable": true,
   *            }
   *        ]
   *     }
   */
  app.get('/oos', (req, res) => {
    Oo.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'color',
        'objectName',
        'toreObjectName',
        'isAvailable',
      ],
    }).then(oos => {
      res.send({ oos })
    })
  })

  /**
   * @api {get} /oos/:id Oo detail
   * @apiName Oo
   * @apiGroup Oo
   *
   * @apiSuccess {Object} oo Oo requested
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "oo": {
   *                "id": 1,
   *                "name": "Oo'la",
   *                "description": "Accueil",
   *                "isAvailable": true,
   *            }
   *     }
   *
   * @apiErrorExample Wrong ID:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Oo not found"
   *     }
   */
  app.get('/oos/:id', (req, res) => {
    Oo.findOne({
      attributes: ['id', 'name', 'description', 'isAvailable'],
      where: {
        id: req.params.id,
      },
    }).then(oo => {
      if (oo) {
        res.send({
          oo,
        })
      } else {
        res.status(400).send({
          message: 'Oo not found',
        })
      }
    })
  })
}
