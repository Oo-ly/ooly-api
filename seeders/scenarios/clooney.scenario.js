module.exports = {
  scenario: {
    uuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
    name: 'Georges Clooney',
  },
  oos: [
    {
      scenarioUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      scenarioUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
  ],
  audios: [
    {
      uuid: '2d9fbad7-9079-494e-9d7b-a1f173a2207a',
      name: ' Hé ! Je viens d’apprendre une info croustillante ! Tu veux la connaitre ? ',
      url: 'scenario-clooney/ClooneyInfo_2.mp3',
      type: 'entry',
      interaction: true,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: 'd6d3902b-fba1-48bb-9fea-3c2a91793315',
      name: 'Pas de soucis, peut être une autre fois alors.',
      url: 'scenario-clooney/ClooneyInfo_3.mp3',
      type: 'dislike',
      audibleUuid: '2d9fbad7-9079-494e-9d7b-a1f173a2207a',
      audibleType: 'audio',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '0bf5ac7c-929b-406e-a026-82f8b5ef12be',
      name: 'Bon, et si je te partage une info croustillante, ça te tente ?',
      url: 'scenario-clooney/ClooneyInfo_1.mp3',
      type: 'entry:negative',
      interaction: true,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '38a0b367-9ef8-4236-bb2a-872624472630',
      name: 'Pas de soucis, peut être une autre fois alors.',
      url: 'scenario-clooney/ClooneyInfo_3.mp3',
      type: 'dislike',
      audibleUuid: '0bf5ac7c-929b-406e-a026-82f8b5ef12be',
      audibleType: 'audio',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '543df400-50f8-4f5d-9e16-c1b014342ba1',
      name: 'Pas de soucis, peut être une autre fois alors.',
      url: 'scenario-clooney/ClooneyInfo_3.mp3',
      type: 'exit',
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: 'c32612b3-9edc-4d1e-97cf-7222e8b2b5f7',
      name: 'Allez raconte ! Je veux savoir moi !',
      url: 'scenario-clooney/ClooneyMelimelo_1.mp3',
      type: null,
      order: 0,
      interaction: false,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: 'ba1d47b4-85d9-4378-b7a1-3741add327cc',
      name: ' Et bien est-ce que tu sais que Georges Clooney est insomniaque ? ',
      url: 'scenario-clooney/ClooneyInfo_4.mp3',
      type: null,
      order: 1,
      interaction: false,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: 'bdd1007c-0819-4063-ab36-a4d8ecdc5079',
      name: 'Oh ! Non je savais pas...',
      url: 'scenario-clooney/ClooneyMelimelo_2.mp3',
      type: null,
      order: 2,
      interaction: false,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '57b0aeb9-ee46-4a4a-b881-100f427bbd18',
      name:
        'Hé oui ! Il a affirmé se réveiller environ 5 fois par nuit... Comme quoi, l’insomnie ça n’empeche pas de devenir célebre !',
      url: 'scenario-clooney/ClooneyInfo_5.mp3',
      type: null,
      order: 3,
      interaction: false,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: 'e0a9b308-0617-4304-bc4b-aaf45d628bf7',
      name: 'Tu crois que Duke deviendra célèbre un jour ? Ce serait drolement chouette !',
      url: 'scenario-clooney/ClooneyMelimelo_3.mp3',
      type: null,
      order: 4,
      interaction: false,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: 'a2b76e88-3b5f-4b70-8320-c85ef70d6864',
      name: 'C’est possible, qui sait !',
      url: 'scenario-clooney/ClooneyInfo_6.mp3',
      type: null,
      order: 5,
      interaction: false,
      audibleUuid: '1598dd2c-1951-4a99-a00b-2ea852782bb3',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
  ],
}
