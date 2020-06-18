module.exports = {
  scenario: {
    uuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
    name: '',
  },
  oos: [
    {
      scenarioUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      scenarioUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      ooUuid: '23c7e653-f1a6-435c-9f58-24f9efb8c5e1',
    },
  ],
  audios: [
    {
      uuid: '354cab39-baa5-43f8-bb85-b5a14f5e90dc',
      name: 'Hé les copains ! Je viens de voir un super film, ça s’appelle Star Wars ! Vous voulez en parler ?',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_2.mp3',
      type: 'entry',
      order: 0,
      interaction: true,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: 'aba5d1c7-8e84-44bb-be46-0878b5184539',
      name: 'Ah bon... D’accord... Tant pis alors.',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_4.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: '354cab39-baa5-43f8-bb85-b5a14f5e90dc',
      audibleType: 'audio',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '5966a806-9660-49ac-9f2b-173f2d785f2f',
      name: 'Hé sinon, moi je viens de voir un super film, ça s’appelle Star Wars ! Vous voulez en parler ? ',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_1.mp3',
      type: 'entry:negative',
      order: 0,
      interaction: true,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '3da68f1d-c703-4b92-a0e5-c196d1cf3e52',
      name: 'Ah bon... D’accord... Tant pis alors.',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_4.mp3',
      type: 'dislike',
      order: 0,
      audibleUuid: '5966a806-9660-49ac-9f2b-173f2d785f2f',
      audibleType: 'audio',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: 'ffdb4d19-8bff-478e-8c58-0f7860313ce6',
      name: 'Ah bon... D’accord... Tant pis alors.',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_4.mp3',
      type: 'exit',
      order: 0,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '3bda8a05-7160-4e7b-9c4f-328dda2cebbe',
      name:
        'Ok super ! Alors, du coup c’est l’histoire d’une bande de Jedi qui vont sauver le monde de la destruction.  ...',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_3.mp3',
      type: null,
      order: 0,
      interaction: false,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '7f2008ff-5e44-4eac-bba5-c15404ac1270',
      name:
        'Oulà ! Mais tu es en train de tout mélanger là ! Tu nous fais un cross-over entre Star Wars, Harry Potter et Le Seigneur des Anneaux... Tu es sûr d’avoir bien regardé le film ?',
      url: 'scenario-seigneur/SeigneurAgneauxCinoche_1.mp3',
      type: null,
      order: 1,
      interaction: false,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '23c7e653-f1a6-435c-9f58-24f9efb8c5e1',
    },
    {
      uuid: '56beb5b4-3b99-4438-a8dd-e02c7ef75b4b',
      name:
        'Le seigneur des Agneaux ? Oui je l’ai vu le film, il fait super peur. Mais j’aime bien Anthony Hopkins du coup j’ai regardé quand même !',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_5.mp3',
      type: null,
      order: 2,
      interaction: false,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '82cdbd45-2be1-4bd5-b299-e40d3284400b',
      name: 'Tu veux parler du SILENCE des Agneaux. Le Seigneur des Anneaux c’est encore un autre film...',
      url: 'scenario-seigneur/SeigneurAgneauxCinoche_2.mp3',
      type: null,
      order: 3,
      interaction: false,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '23c7e653-f1a6-435c-9f58-24f9efb8c5e1',
    },
    {
      uuid: '24ff5773-737c-4cb4-b327-6756022681fa',
      name:
        'QUOI ? Mais... Roh non, j’ai encore tout mélangé... Désolé Duke, je voulais te faire un résumé sympa du film Star Wars et j’ai tout gaché...',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_6.mp3',
      type: null,
      order: 4,
      interaction: false,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
    {
      uuid: '1ab8498c-81b8-45b4-a829-a024de7827ad',
      name:
        'Pas de panique Meli-Melo, il y a des milliers de vidéos sur internet qui parlent du film et qui proposent des résumés de la saga en 5 minutes. ...',
      url: 'scenario-seigneur/SeigneurAgneauxCinoche_3.mp3',
      type: null,
      order: 5,
      interaction: false,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '23c7e653-f1a6-435c-9f58-24f9efb8c5e1',
    },
    {
      uuid: 'a19a6747-2b47-4e92-8bec-1864fa981d3e',
      name: 'Super idée ça ! Bon allez Duke, bon vent, que la force soit avec toi !',
      url: 'scenario-seigneur/SeigneurAgneauxMelimelo_7.mp3',
      type: null,
      order: 6,
      interaction: false,
      audibleUuid: 'd46aed5f-904e-4828-838d-1ae6e59bb90f',
      audibleType: 'scenario',
      ooUuid: '1fd0f001-5950-4f22-983d-11d08cee3add',
    },
  ],
}
