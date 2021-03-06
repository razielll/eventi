newEventiObject = {
  _id: ObjectId('5b5850336329dd4b6b6ca7d1'),
  ownerId: '5b5849a76329dd4b6b6ca7cc',
  name: 'Garage Sale',
  description:
    'Our weekly garage sale next friday, come join us and find your best products here.',
  startTime: '1532498983000',
  endTime: '1532509783000',
  recurringEventi: 'weekly',
  feed: [],
  category: 'sale',
  goingUserId: ['5b584a0f6329dd4b6b6ca7cd', '5b5849a76329dd4b6b6ca7cc'],
  clapsCount: 75,
  gallery: ['https://www.hiyabucks.com/wp-content/uploads/2018/06/SALE.jpg'],
  location: {
    type: 'Point',
    coordinates: [34.805424, 32.089911]
  },
  address: 'Ruth St 7 Ramat Gan'
};

let Eventi = {
  ownerId: ObjectId('5b5849a76329dd4b6b6ca7cc'),
  name: 'Roof Party',
  description: 'The best live music happening now in TLV. ',
  startTime: '1532498983000',
  endTime: '1532509783000',
  recurringEventi: '', // weekly ,monthly
  feed: [],
  category: ['Party'],
  goingUsersIds: [
    ObjectId('5b584a0f6329dd4b6b6ca7cd'),
    ObjectId('5b584a486329dd4b6b6ca7ce')
  ],
  clapsCount: 500,
  gallery: ['https://seda.college/wp-content/uploads/party.jpg'],
  location: {
    lat: 32.0879749,
    lng: 34.8009112,
    address: 'Derech Menachem Begin 9 Ramat Gan'
  }
};

let user = {
  fullName: 'Nir Cohen',
  email: 'nir.cohen@gmail.com',
  password: '123456',
  phone: '054222076',
  location: {
    lat: 32.0879749,
    lng: 34.8009112,
    address: 'HaBonim St 4 Ramat Gan'
  },
  myEventiIds: [], // my Eventis
  eventiHistory: [
    {
      evnentiId: '',
      clapCount: 50,
      isRelevant: true
    },
    {
      evnentiId: '',
      clapCount: 10,
      isRelevant: false
    }
  ]
};
