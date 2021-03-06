module.exports = {
  scenario: {
    uuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
    name: 'Les bols tibétains',
  },
  oos: [
    {
      scenarioUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      scenarioUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      scenarioUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
  ],
  audios: [
    {
      uuid: '937be763-8916-4719-a4ef-1dd6b87e8e07',
      name: 'Ça vous dit une petite anecdote marrante ? ',
      url: 'scenario-bol/TibetainsInfo_2.mp3',
      type: 'entry',
      order: 0,
      interaction: true,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '7492c74a-8254-4fc2-b383-e8433f6a6b33',
      name: 'Oh... Dommage. Ce sera pour une prochaine fois alors !',
      url: 'scenario-bol/TibetainsInfo_4.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: '937be763-8916-4719-a4ef-1dd6b87e8e07',
      audibleType: 'audio',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '1302c4a0-85d4-45b2-9038-8adb15e0b03a',
      name: 'Ok, est ce que tu préfères une petite anecdote marrante plutot ?',
      url: 'scenario-bol/TibetainsInfo_1.mp3',
      type: 'entry:negative',
      interaction: true,
      order: 0,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '75071bf6-57a6-418f-a160-12646a202146',
      name: 'Oh... Dommage. Ce sera pour une prochaine fois alors !',
      url: 'scenario-bol/TibetainsInfo_4.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: '1302c4a0-85d4-45b2-9038-8adb15e0b03a',
      audibleType: 'audio',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '01ce86d8-a05c-4868-a6e0-916148766142',
      name: 'Oh... Dommage. Ce sera pour une prochaine fois alors !',
      url: 'scenario-bol/TibetainsInfo_4.mp3',
      type: 'exit',
      order: 0,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '7c488a61-f8c8-4b0a-9fe0-0b1b8a232895',
      name:
        'Est ce que vous saviez que pour se saluer, certains moines tibétains se tirent la langue ? C’est rigolo, on devrait essayer aussi.',
      url: 'scenario-bol/TibetainsInfo_3.mp3',
      type: null,
      order: 0,
      interaction: false,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '498ad214-303e-4fc1-8923-ace51210dafc',
      name: 'Ce serait plus pratique si on avait une langue Inf’Oo ... ',
      url: 'scenario-bol/TibetainsDisco_1.mp3',
      type: null,
      order: 1,
      interaction: false,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: '4c73f81b-b78d-47b8-9abc-e6cf2a0a54e9',
      name: 'Moi j’ai pas de langue !',
      url: 'scenario-bol/TibetainsMelimelo_1.mp3',
      type: null,
      order: 2,
      interaction: false,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: 'ffee243a-686d-4e25-9150-16221223ad0e',
      name:
        'Oui effectivement on avait remarqué... Par contre, on peut s’inspirer des moines tibétains pour leur musique. Ils la composent en frappant sur des bols.',
      url: 'scenario-bol/TibetainsDisco_2.mp3',
      type: null,
      order: 3,
      interaction: false,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: 'f6aeb91e-5ed7-479b-9c0a-9fb430b801d7',
      name:
        'Oui, d’ailleurs ces bols sont composés de 7 métaux différents, représentant les planètes du système solaire.',
      url: 'scenario-bol/TibetainsInfo_5.mp3',
      type: null,
      order: 4,
      interaction: false,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '4d8cf885-f681-452f-97a6-5077744eb4be',
    },
    {
      uuid: '4f89f879-9b08-4a4c-8b69-82cb03dd287d',
      name: 'Ah ouais je le savais pas tiens ! On s’en écoute un morceau, voir ce que ça donne ? Ca te dit Duke ?',
      url: 'scenario-bol/TibetainsDisco_3.mp3',
      type: null,
      order: 5,
      interaction: true,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: 'dac8988e-cc87-4f59-832a-9de86582dd0b',
      name: 'Ok, une autre fois peut-être ! ',
      url: 'scenario-bol/TibetainsDisco_6.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: '4f89f879-9b08-4a4c-8b69-82cb03dd287d',
      audibleType: 'audio',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: '67d469aa-9a6d-452d-89c5-b72e459af55b',
      name: 'Super, écoute ça !',
      url: 'scenario-bol/TibetainsDisco_4.mp3',
      type: null,
      order: 6,
      interaction: false,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: '4bbbe043-0de3-4f5a-955a-875d0d92febb',
      name: 'C’était chouette, tu as aimé ?',
      url: 'scenario-bol/TibetainsDisco_5.mp3',
      type: null,
      order: 7,
      interaction: true,
      audibleUuid: '7a8bec8a-0f7b-4b07-a78f-965acbff3b2a',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
  ],
}
