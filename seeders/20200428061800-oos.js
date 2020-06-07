'use strict'

const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'oos',
      [
        {
          uuid: uuidv4(),
          name: "Disc'Oo",
          description:
            'Disc’Oo adore la musique. Il est super calé, il connait pleins d’artistes différents et il aime tous les styles. Parfois d’humeur à réécouter les classiques et parfois voulant plutôt découvrir de nouveaux morceaux, Disc’Oo trouve toujours une musique à écouter et à partager. C’est d’ailleurs très important pour lui, de partager. Il adore créer une bonne ambiance pour tous ceux qui l’accompagnent.',
          color: '#0085FF',
          objectName: 'Disc_Oo',
          toreObjectName: 'Tore_3',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "Cin'Oo'che",
          description:
            'Le truc de Cin’Oo’che, c’est le cinéma et les séries. Il en a vu un paquet et de tous les genres, comiques, épiques, animation, horreur, romantiques, etc. Le 7eme art n’a pas de secret pour lui. Il en connait un rayon sur les acteurs, les réalisateurs, les effets spéciaux. Mais ce qu’il aime le plus, c’est les textes, les répliques de films cultes, les dialogues alambiqués, les citations qui parlent à tout le monde, les références qu’il est le seul à connaitre. Il a une super mémoire Cin’Oo’che, donc les répliques, il les apprend vite, et il adore les partager avec les autres.',
          color: '#CA0024',
          objectName: 'Cinoche_1',
          toreObjectName: 'Tore_5',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "Inf'Oo",
          description:
            'Inf’Oo en connait un rayon sur les faits rigolos et surprenants qui agrémentent la vie, et ce dans tous les domaines : la culture, l’histoire, la biologie, etc. Ça lui fait beaucoup d’histoires à raconter. Il se tient aussi toujours au courant des dernières nouvelles, pour continuer d’apprendre et de raconter. Il adore discuter avec tous les autres Oo et leur poser des questions, car ils connaissent tous pleins d’anecdotes dans des domaines différents, du coup, il peut apprendre pleins de choses et partager ses propres informations.',
          color: '#77CEFF',
          objectName: 'Infoo',
          toreObjectName: 'Tore_8',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "Y'Oo'ga",
          description:
            'Y’Oo’ga est le plus calme des Oo. Il connaît plein d’exercices de relaxation et de détente. Passionné de méditation, de Taï-chï et de sophrologie, Y’Oo’ga est toujours présent pour proposer des occupations relaxantes. Quand il est là, il instaure une ambiance calme qui plaît aux autres Oo pendant la nuit.',
          color: '#53BA9A',
          objectName: 'Yoga',
          toreObjectName: 'Tore_1',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "Végét'Oo",
          description:
            'La passion de Végét’Oo, c’est les plantes. Il est fasciné par cette vie à la fois si délicate et si complexe. C’est vrai que certaines utilisent des mécanismes assez étonnants pour survivre. Que ce soit les plantes d’Europe, d’Amérique, d’Asie, d’Afrique ou d’Océanie, Végét’Oo les découvre toutes avec autant de joie. Grâce à elles, il fait le tour du monde sans quitter la tribu.',
          color: '#7AEC70',
          objectName: 'Vegeto_1',
          toreObjectName: 'Tore_4',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "Wh'Oo'w",
          description:
            'Wh’Oo’w est un Oo plein de surprises, avec lui, on ne sait jamais à quoi s’attendre ! Il apporte un peu de piment dans les discussions et occupations de ses compagnons, en leur proposant d’ajouter un peu de hasard et de surprise dans ce qu’ils font. Que ce soit en s’inspirant d’un mot pris au hasard dans le dictionnaire, ou en faisant des choix à pile ou face, avec lui, les situations deviennent toujours un peu décalées et étonnantes !',
          color: '#FFB300',
          objectName: 'Whow_1',
          toreObjectName: 'Tore_7',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          name: "C'Oo'mique",
          description:
            'C’Oo’mique est le roi des plaisanteries. Il a un humour un peu potache et décalé et il adore les blagues, les charades, les devinettes et les jeux de mot. Il en connait des classiques, mais il essaie aussi d’en inventer lui-même. D’ailleurs ce qu’il préfère, c’est trouver des plaisanteries en lien avec ce que disent ses compagnons Oo.',
          color: '#FFE92D',
          objectName: 'Comique_1',
          toreObjectName: 'Tore_6',
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oos', null, {})
  },
}
