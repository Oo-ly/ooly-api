module.exports = {
  scenario: {
    uuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
    name: 'Batman',
  },
  oos: [
    {
      scenarioUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      scenarioUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      ooUuid: 'ca5f71b5-8dc0-4acd-9d58-3c3035622afe',
    },
  ],
  audios: [
    {
      uuid: '93da8348-9fc6-4eae-92ad-20f8e1a121e1',
      name: 'Hey ! Ca vous dis une petite blague ?',
      url: 'scenario-batman/BatmanComique_2.mp3',
      type: 'entry',
      interaction: true,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: '64f387a9-28de-4c94-87f1-e13b30bc047d',
      name: 'Oh... Tant pis, une autre fois ...',
      url: 'scenario-batman/BatmanComique_4.mp3',
      type: 'dislike',
      audibleUuid: '93da8348-9fc6-4eae-92ad-20f8e1a121e1',
      audibleType: 'audio',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'e3f64c87-f5de-488a-8eb6-1eca77fec54a',
      name: 'Est-ce que tu préfères une petite blague plutot ?',
      url: 'scenario-batman/BatmanComique_1.mp3',
      type: 'entry:negative',
      interaction: true,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'e77b8b68-7d78-443f-869b-aab6c2a1e58d',
      name: 'Oh... Tant pis, une autre fois ...',
      url: 'scenario-batman/BatmanComique_4.mp3',
      type: 'dislike',
      audibleUuid: 'e3f64c87-f5de-488a-8eb6-1eca77fec54a',
      audibleType: 'audio',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'fc0b8a08-1867-45dc-88f9-49a1f78da920',
      name: 'Oh... Tant pis, une autre fois ...',
      url: 'scenario-batman/BatmanComique_4.mp3',
      type: 'exit',
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: '2506bd60-a1a3-4ce8-8bea-915863af835e',
      name: 'Je pense qu’elle va te plaire Végét’Oo !',
      url: 'scenario-batman/BatmanComique_3.mp3',
      type: null,
      order: 0,
      interaction: false,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'c468cf24-8c43-489f-b3d0-1ef25f368784',
      name: 'Ah oui ? Vas-y !',
      url: 'scenario-batman/BatmanVegeto_1.mp3',
      type: null,
      order: 1,
      interaction: false,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: 'ca5f71b5-8dc0-4acd-9d58-3c3035622afe',
    },
    {
      uuid: 'd16936e7-2520-46b6-9c78-43b8ca7a5d64',
      name: 'Batcave, batmobile, batharang ... Du coup c’est quoi le légume préféré de batman ?',
      url: 'scenario-batman/BatmanComique_5.mp3',
      type: null,
      order: 2,
      interaction: false,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'aac62eb5-96e7-4bba-9fb5-6b57867c13a8',
      name: 'Hum ... Aucune idée !',
      url: 'scenario-batman/BatmanVegeto_2.mp3',
      type: null,
      order: 3,
      interaction: false,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: 'ca5f71b5-8dc0-4acd-9d58-3c3035622afe',
    },
    {
      uuid: '0554a962-7496-4ca9-8826-bdbb8f09be3a',
      name: 'La Batavia !',
      url: 'scenario-batman/BatmanComique_6.mp3',
      type: null,
      order: 4,
      interaction: false,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: '55a7bed3-a9a5-4c6c-9913-d8966d8dfc59',
    },
    {
      uuid: 'eab7ead6-39c3-4109-9abd-903eac128a97',
      name: 'Haha ! J’avoue elle est pas mal ! Bien joué C’Oo’mique !',
      url: 'scenario-batman/BatmanVegeto_3.mp3',
      type: null,
      order: 5,
      interaction: false,
      audibleUuid: 'ae20f2ed-0bbe-4bdc-9c02-d9680044b9bc',
      audibleType: 'scenario',
      ooUuid: 'ca5f71b5-8dc0-4acd-9d58-3c3035622afe',
    },
  ],
}
