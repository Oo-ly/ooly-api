module.exports = {
  scenario: {
    uuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
    name: 'Méditation et musique',
  },
  oos: [
    {
      scenarioUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      scenarioUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
  ],
  audios: [
    {
      uuid: 'f3203b89-8fb4-4fd4-8218-58511b48c343',
      name: 'Je ferais bien un brin de méditation moi, ca te dit Duke ?',
      url: 'scenario-meditation-musique/MeditationYoga_2.mp3',
      type: 'entry',
      order: 0,
      interaction: true,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '588a4c4f-971f-43a8-a9e3-069d99a04393',
      name: ' T’aurais pas envie de faire de la méditation plutôt ?',
      url: 'scenario-meditation-musique/MeditationYoga_1.mp3',
      type: 'entry:negative',
      order: 0,
      interaction: true,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '6fb9d65c-7883-4807-9e35-cdc085e919ce',
      name: 'Pas de soucis, une prochaine fois peut-être !',
      url: 'scenario-meditation-musique/MeditationYoga_4.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: 'f3203b89-8fb4-4fd4-8218-58511b48c343',
      audibleType: 'audio',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '6fb9d65c-7883-4807-9e35-cdc085e918ce',
      name: 'Pas de soucis, une prochaine fois peut-être !',
      url: 'scenario-meditation-musique/MeditationYoga_4.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: '588a4c4f-971f-43a8-a9e3-069d99a04393',
      audibleType: 'audio',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '389f657e-0420-47da-9007-c43d6de0252e',
      name: 'Chouette ! Installe toi bien confortablement alors ! ',
      url: 'scenario-meditation-musique/MeditationYoga_3.mp3',
      type: null,
      order: 0,
      interaction: false,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '064121b8-b352-471a-8ab4-e00f26297896',
      name: 'Est-ce que vous voulez que je vous mette un peu de musique douce pour vous accompagner ?',
      url: 'scenario-meditation-musique/MeditationDisco_1.mp3',
      type: null,
      order: 1,
      interaction: true,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: '648e69c3-a22b-4bca-828f-d7f90e52e393',
      name: ' Pas de soucis, méditez bien !',
      url: 'scenario-meditation-musique/MeditationDisco_3.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: '064121b8-b352-471a-8ab4-e00f26297896',
      audibleType: 'audio',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: '7ca9689b-8a92-48d6-bbae-54902b72b4fd',
      name: 'C’est parti !',
      url: 'scenario-meditation-musique/MeditationYoga_7.mp3',
      type: 'dislike',
      order: 1,
      audibleUuid: '064121b8-b352-471a-8ab4-e00f26297896',
      audibleType: 'audio',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '10a3be83-a160-4654-b9fb-be567d0f1cb5',
      name: 'Haaaaaa ça fait du bien !',
      url: 'scenario-meditation-musique/MeditationYoga_9.mp3',
      type: 'dislike',
      order: 2,
      audibleUuid: '064121b8-b352-471a-8ab4-e00f26297896',
      audibleType: 'audio',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: 'e067d352-90ec-49c0-9605-cc28974a32f8',
      name: 'Nickel, je vous trouve ça !',
      url: 'scenario-meditation-musique/MeditationDisco_2.mp3',
      type: null,
      order: 2,
      interaction: false,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
    {
      uuid: '1c141d55-4239-4647-a059-8eccf50a10f0',
      name: 'Merci Disc’Oo. C’est parti !',
      url: 'scenario-meditation-musique/MeditationYoga_6.mp3',
      type: null,
      order: 3,
      interaction: false,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '0ba999b9-f106-4017-a0df-bafc04bfe853',
      name: 'Haaaaaa ça fait du bien, merci pour la musique Disc’Oo, ca allait très bien !',
      url: 'scenario-meditation-musique/MeditationYoga_8.mp3',
      type: null,
      order: 4,
      interaction: false,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: 'a10058d0-46e0-4e54-bf54-72bef1ae283f',
    },
    {
      uuid: '103be665-ebee-421c-b1fa-2da233cd79a9',
      name: 'Je t’en prie !',
      url: 'scenario-meditation-musique/MeditationDisco_4.mp3',
      type: null,
      order: 5,
      interaction: false,
      audibleUuid: 'e07adf2b-939e-4d2f-8352-7b9941d1dee7',
      audibleType: 'scenario',
      ooUuid: '1c115903-1aa5-4216-b438-5e455124f66d',
    },
  ],
}
