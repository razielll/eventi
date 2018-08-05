export function getDemoEventi(idx) {
//   console.log('idx', idx);
  let eventi = eventis[idx];
  eventi = {
    ...eventi,
    ..._getRecurring(),
    ..._getCategory(),
    ..._getEvntiTime(),
    ..._mongoObjectId()
  };

  eventi.feed = [];
  eventi.goingUserId = [];
  eventi.clapsCount = _getRandomIntInclusive(0, 100);

  return eventi;
}

let eventis = [
  {
    name: 'Music Night - Sounds of Protest in Punk, Disco and Blues',
    description:
      '"Windows" and Levontin 7 are inviting you to an evening with some of the exciting local bands who found music as a way to express their views on the hottest social / political topics. A special opportunity to meet local and international activists, enjoy the music, move with the beat and have fun while supporting a good cause. The bands are performing for free, all income goes to "Windows", to support its work towards a fair, inclusive & equal society. ',
    gallery:
      'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/37923499_10156766809653729_6427355882006249472_n.jpg?_nc_cat=0&oh=d6f5d78692fd1f93d387261b2fe387a5&oe=5BCDC988',
    location: {
      coordinates: [34.7726057, 32.0617758],
      type: 'Point'
    },
    address: 'Levontin 7, Levontin Street, Tel Aviv-Yafo'
  },
  {
    name: 'Estas Tonne & friends: "The Breath of Sound", Tel Aviv, Israel',
    description:
      'Sound with its different acoustic frequency and vibrational level has a tremendous effect on all living matter, while structurally changing and qualitatively transforming it. The fact is that absolutely everything in the Universe, even "Silence", has its own "Voice". Its development and expansion represent a true Music of Life. In such a perception the Breath of Life reveals Itself as the Breath of Sound.',
    gallery:
      'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/31732269_1764259753634992_7838864147595919360_n.jpg?_nc_cat=0&oh=3522627e1e0e5305cec74e298c74f577&oe=5C115D83',
    location: {
      coordinates: [34.7573357, 32.0557966],
      type: 'Point'
    },
    address: 'Theatre Club, Yerushalaim Avenue, Tel Aviv-Yafo'
  },
  {
    name: 'Got No Shame 23.8 Levontin 7 TLV',
    description:
      "After years of quiet Gott Noem Shime the punk band rock n'roll returns to only one evening of madness, sweat, tattoos, red hair and lots of distortion.",
    gallery:
      'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/36188911_10156475097208454_5895392588617220096_n.jpg?_nc_cat=0&oh=730b5da621e1dcf1c16f94c96ccfb6aa&oe=5C075945',
    location: {
      coordinates: [34.7726057, 32.0617758],
      type: 'Point'
    },
    address: 'Levontin 7, Levontin Street, Tel Aviv-Yafo'
  },
  {
    name: 'Knaan Shabtay ￨ EP Launch Show ￨Levontin 7',
    description:
      'Join the five-day digital launch that reveals every day a song from the island of Pi with the stories and inspiration behind the songs.',
    gallery:
      'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/36256829_1328423673956740_1408392588938969088_o.jpg?_nc_cat=0&oh=d535a9de7d0355505efba9225b288832&oe=5C0CA0C2',
    location: {
      coordinates: [34.7726057, 32.0617758],
      type: 'Point'
    },
    address: 'Levontin 7, Levontin Street, Tel Aviv-Yafo'
  },
  {
    name: 'Triple Threat [DIYY, The Wound;Dead,Renegades]',
    description:
      'Live performances from: Death In Your Yard Who recently released their debut album and are ready to embark on a mass murder column Fast and furious Crossover!',
    gallery:
      'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/37215654_2098094580464979_1951255362568978432_n.jpg?_nc_cat=0&oh=b47e10e8c0160c5a4afb32c4e7f3bd21&oe=5BD30916',
    location: {
      coordinates: [34.7573357, 32.0557966],
      type: 'Point'
    },
    address: 'Theatre Club, Yerushalaim Avenue, Tel Aviv-Yafo'
  },
  {
    name: 'Community Garden Building',
    description:
      'We invite you to a unique event in a community garden. We will be gardening, cleaning, and renovating the garden so the community that lives there will enjoy it.',
    gallery:
      'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/37230126_2114315528785421_3376410371345612800_n.jpg?_nc_cat=0&oh=7b6f872cabb7c9bba9419e36c2214130&oe=5BD47344',
    location: {
      coordinates: [34.791284, 32.0717951],
      type: 'Point'
    },
    address: 'Ramat Gan'
  }
];

function _mongoObjectId() {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return {
    _id:
      timestamp +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, function() {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
  };
}

function _getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function _getRecurring() {
  let recurringEventi = ['', 'weekly', 'monthly'];
  let idx = _getRandomIntInclusive(0, 2);

  return { recurringEventi: recurringEventi[idx] };
}
function _getCategory() {
  let categories = [
    'lecture',
    'party',
    'gathering',
    'sale',
    'needhelp',
    'lostfound'
  ];

  let idx = _getRandomIntInclusive(0, 5);
  return { category: categories[idx] };
}
function _getEvntiTime() {
  let d = new Date();
  let h = d.getHours();

  let eventiTime = {};
  d.setHours(h + _getRandomIntInclusive(2, 8));
  eventiTime.startTime = d.toISOString();

  d.setHours(h + _getRandomIntInclusive(8, 12));
  eventiTime.endTime = d.toISOString();

  return eventiTime;
}
