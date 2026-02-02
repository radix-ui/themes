type User = {
  id: string;
  image?: string;
  name: string;
  handle: string;
  role: 'admin' | 'maintainer' | 'contributor' | 'viewer';
};

export const users: User[] = [
  {
    id: 'user1',
    image: avatar('1544005313-94ddf0286df2'),
    name: 'Emmeline Labrie',
    handle: '@emmeline_labrie',
    role: 'contributor',
  },
  {
    id: 'user2',
    image: avatar('1522075469751-3a6694fb2f61'),
    name: 'Zac Wight',
    handle: '@zacwight',
    role: 'admin',
  },
  {
    id: 'user3',
    image: avatar('1632765854612-9b02b6ec2b15', { x: 0.4, y: 0.35, zoom: 1.05 }),
    name: 'Zahra Ambessa',
    handle: '@zahraambessa',
    role: 'viewer',
  },
  {
    id: 'user4',
    image: avatar('1533933269825-da140ad3132f', { y: 0.46, zoom: 1.25 }),
    name: 'Tilde Thygesen',
    handle: '@tildethygesen',
    role: 'maintainer',
  },
  {
    id: 'user5',
    name: 'Joaquin Verdugo',
    handle: '@joaquinverdugo',
    role: 'viewer',
  },
  {
    id: 'user6',
    image: avatar('1496345875659-11f7dd282d1d', { x: 0.49, y: 0.5, zoom: 2.5 }),
    name: 'Craig Caldwell',
    handle: '@craigcaldwell',
    role: 'contributor',
  },
  {
    id: 'user7',
    name: 'Harrison Mellor',
    handle: '@harrison_mellor',
    role: 'viewer',
  },
];

//
//
//
//
//
//
//
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
