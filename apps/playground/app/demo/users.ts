type User = {
  id: string;
  image?: string;
  name: string;
  handle: string;
  role: 'admin' | 'maintainer' | 'contributor' | 'viewer';
};

const user1: User = {
  id: 'user1',
  image: avatar('1533933269825-da140ad3132f', { y: 0.46, zoom: 1.25 }),
  name: 'Tilde Thygesen',
  handle: '@tildethygesen',
  role: 'maintainer',
};
const user2: User = {
  id: 'user2',
  image: avatar('1522075469751-3a6694fb2f61'),
  name: 'Zac Wight',
  handle: '@zacwight',
  role: 'admin',
};
const user3: User = {
  id: 'user3',
  image: avatar('1544005313-94ddf0286df2'),
  name: 'Emmeline Labrie',
  handle: '@emmeline_labrie',
  role: 'contributor',
};
const user4: User = {
  id: 'user4',
  image: avatar('1632765854612-9b02b6ec2b15', { x: 0.4, y: 0.35, zoom: 1.05 }),
  name: 'Zahra Ambessa',
  handle: '@zahraambessa',
  role: 'viewer',
};
const user5: User = {
  id: 'user5',
  // image: avatar('1507003211169-0a1dd7228f2d', { x: 0.3, y: 0.35, zoom: 1.1 }),
  name: 'Joaquin Verdugo',
  handle: '@joaquinverdugo',
  role: 'viewer',
};
const user6: User = {
  id: 'user6',
  image: avatar('1529111290557-82f6d5c6cf85'),
  name: 'Craig Caldwell',
  handle: '@craigcaldwell',
  role: 'contributor',
};
const user7: User = {
  id: 'user7',
  image: avatar('1496345875659-11f7dd282d1d', { x: 0.49, y: 0.5, zoom: 2.5 }),
  name: 'Harrison Mellor',
  handle: '@harrison_mellor',
  role: 'viewer',
};

const users = [user1, user2, user3, user4, user5, user6, user7];

function avatar(id: string, params?: { x?: number; y?: number; zoom?: number }) {
  let crop = '';
  if (params === undefined) {
    crop = 'faces';
  } else {
    const { x = 0.5, y = 0.5, zoom = 1 } = params ?? {};
    crop = `focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`;
  }
  return `https://images.unsplash.com/photo-${id}?&w=64&h=64&dpr=2&q=70&crop=${crop}&fit=crop`;
}

export { users };
