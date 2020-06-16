module.exports = {
  scenario: {
    uuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
    name: 'Pépito',
  },
  oos: [
    {
      scenarioUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      scenarioUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
  ],
  audios: [
    {
      uuid: '5fb765e6-8efd-4d57-bbbf-cc3577682a44',
      name: 'Hey ! Ca vous dis une petite devinette ?',
      url: 'scenario-pepito/PepitoComique_2.mp3',
      type: 'entry',
      interaction: true,
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: '134d36e7-56b1-41b8-ae39-69dc3436f1ff',
      name: 'Oh... Tant pis, une prochaine fois alors !',
      url: 'scenario-pepito/PepitoComique_3.mp3',
      type: 'dislike',
      audibleUuid: '5fb765e6-8efd-4d57-bbbf-cc3577682a44',
      audibleType: 'audio',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: '2e892ae9-163e-41bc-9c54-b83bfd65b09f',
      name: 'Est-ce que tu préfères une petite devinette plutot ?',
      url: 'scenario-pepito/PepitoComique_1.mp3',
      type: 'entry:negative',
      interaction: true,
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: '192a0e16-8978-4c99-a4b2-d432129d2a58',
      name: 'Oh... Tant pis, une prochaine fois alors !',
      url: 'scenario-pepito/PepitoComique_3.mp3',
      type: 'dislike',
      audibleUuid: '2e892ae9-163e-41bc-9c54-b83bfd65b09f',
      audibleType: 'audio',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'ffa02242-75d1-4e07-a2fa-7cb9164facfb',
      name: 'Oh... Tant pis, une prochaine fois alors !',
      url: 'scenario-pepito/PepitoComique_3.mp3',
      type: 'exit',
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: '7f1b58b0-abf3-491e-baf0-4d0a5f9e76c7',
      name: ' Oh ouiiiii j’adore les devinettes !',
      url: 'scenario-pepito/PepitoMelimelo_1.mp3',
      type: null,
      order: 0,
      interaction: false,
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '41c8153b-bcfd-485d-83a5-bb587832920c',
      name: 'Qu’est ce qu’il se passe si tu manges un pépito à minuit ?',
      url: 'scenario-pepito/PepitoComique_4.mp3',
      type: null,
      order: 1,
      interaction: false,
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: '4c12a0f0-1552-4f48-bd61-0e1ada39a5d5',
      name: 'Oh lala c’est dur ... je sais pas ...',
      url: 'scenario-pepito/PepitoMelimelo_2.mp3',
      type: null,
      order: 2,
      interaction: false,
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '50ace4d2-8f6e-4c1d-998b-b457b221af86',
      name: 'Ca devient un pépitard !',
      url: 'scenario-pepito/PepitoComique_5.mp3',
      type: null,
      order: 3,
      interaction: false,
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'b0b1c553-3fb5-4951-aa4c-ebc2a5df64ba',
      name: 'Hihihihihi ! Elle est bien bonne !',
      url: 'scenario-pepito/PepitoMelimelo_3.mp3',
      type: null,
      order: 4,
      interaction: false,
      audibleUuid: 'af1d843b-d5cc-4148-a215-e175a6029637',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
  ],
}
