import type { ThemeOptions } from '@radix-ui/themes';

type Person = {
  image: string;
  name: string;
};

const person01: Person = {
  image: avatar('1507003211169-0a1dd7228f2d', { x: 0.3, y: 0.35, zoom: 1.1 }),
  name: 'Joaquin Verdugo',
};
const person02: Person = {
  image: avatar('1502823403499-6ccfcf4fb453', { y: 0.3 }),
  name: 'Sayako Imamura',
};
const person03: Person = {
  image: avatar('1522075469751-3a6694fb2f61'),
  name: 'Zac Wight',
};
const person04: Person = {
  image: avatar('1526835746352-0b9da4054862', { y: 0.45, zoom: 1.8 }),
  name: 'Alice Correia',
};
const person05: Person = {
  image: avatar('1544005313-94ddf0286df2'),
  name: 'Emmeline Labrie',
};
const person06: Person = {
  image: avatar('1534528741775-53994a69daeb', { x: 0.55, y: 0.4, zoom: 1.35 }),
  name: 'Mei T’ang',
};
const person07: Person = {
  image: avatar('1521119989659-a83eee488004', { x: 0.45, y: 0.37, zoom: 3.5 }),
  name: 'Danilo Sousa',
};
const person08: Person = {
  image: avatar('1570158268183-d296b2892211'),
  name: 'Teodros Girmay',
};
const person09: Person = {
  image: avatar('1632765854612-9b02b6ec2b15', { x: 0.4, y: 0.35, zoom: 1.05 }),
  name: 'Zahra Ambessa',
};
const person10: Person = {
  image: avatar('1554727242-741c14fa561c', { x: 0.48, y: 0.32, zoom: 1.8 }),
  name: 'Lucy Walters',
};
const person11: Person = {
  image: avatar('1638727295415-286409421143', { x: 0.52, zoom: 1.5 }),
  name: 'Aixa Díaz',
};
const person12: Person = {
  image: avatar('1540331547168-8b63109225b7', { y: 0.43, zoom: 1.4 }),
  name: 'Claudia Schroeder',
};
const person13: Person = {
  image: avatar('1526510747491-58f928ec870f', { x: 0.48, y: 0.48, zoom: 1.3 }),
  name: 'Poppy Nicholls',
};
const person14: Person = {
  image: avatar('1548361403-cb0c785eea54', { x: 0.48, y: 0.38, zoom: 1.5 }),
  name: 'Lin Chu',
};
const person15: Person = {
  image: avatar('1533933269825-da140ad3132f', { y: 0.46, zoom: 1.25 }),
  name: 'Tilde Thygesen',
};
const person16: Person = {
  image: avatar('1529111290557-82f6d5c6cf85'),
  name: 'Craig Caldwell',
};
const person17: Person = {
  image: avatar('1532073150508-0c1df022bdd1', { x: 0.48, y: 0.35, zoom: 2 }),
  name: 'Marisa Palermo',
};
const person18: Person = {
  image: avatar('1492633423870-43d1cd2775eb', { x: 0.52, y: 0.48, zoom: 1.6 }),
  name: 'Branda Sousa',
};
const person19: Person = {
  image: avatar('1530653535919-df7cc2bee192', { y: 0.45 }),
  name: 'Grace Ford',
};
const person20: Person = {
  image: avatar('1535207010348-71e47296838a', { y: 0.35, zoom: 1.3 }),
  name: 'Freja Johnsen',
};
const person21: Person = {
  image: avatar('1541823709867-1b206113eafd', { y: 0.3, zoom: 1.5 }),
  name: 'Da-Xia Wu',
};
const person22: Person = {
  image: avatar('1482849297070-f4fae2173efe', { x: 0.475, y: 0.38, zoom: 2 }),
  name: 'Klara Grubišić',
};
const person23: Person = {
  image: avatar('1492681591534-d1f062f4c5c3', { x: 0.46, y: 0.25, zoom: 1.65 }),
  name: 'Tómas Njálsson',
};
const person24: Person = {
  image: avatar('1496345875659-11f7dd282d1d', { x: 0.49, y: 0.5, zoom: 2.5 }),
  name: 'Harrison Mellor',
};
const person25: Person = {
  image: avatar('1508179640279-deaa2ea35e82', { x: 0.42, y: 0.4, zoom: 2.5 }),
  name: 'Thiery Sicard',
};
const person26: Person = {
  image: avatar('1525304937537-4d586f394674'),
  name: 'Gizela Kavková',
};
const person27: Person = {
  image: avatar('1564564321837-a57b7070ac4f', { x: 0.52, y: 0.47, zoom: 1.3 }),
  name: 'Travis Ross',
};
const person28: Person = {
  image: avatar('1535467728855-93fe6218a7b1', { x: 0.42, y: 0.4, zoom: 1.1 }),
  name: 'Cathy Downs',
};
const person29: Person = {
  image: avatar('1586822339087-80cc375ac083', { y: 0.6 }),
  name: 'Jasper Eriksson',
};
const person30: Person = {
  image: avatar('1529940605533-4f4e7b28595a', { y: 0.3 }),
  name: 'Matias Hanski',
};

const allPeople = [
  person01,
  person02,
  person03,
  person04,
  person05,
  person06,
  person07,
  person08,
  person09,
  person10,
  person11,
  person12,
  person13,
  person14,
  person15,
  person16,
  person17,
  person18,
  person19,
  person20,
  person21,
  person22,
  person23,
  person24,
  person25,
  person26,
  person27,
  person28,
  person29,
  person30,
];

// neutral
const neutralPeople = [person15, person03, person05, person01, person09, person16, person24];

function getPeopleForColor(color: ThemeOptions['accentColor']) {
  switch (color) {
    case 'gray':
      return neutralPeople;
    case 'tomato':
    case 'red':
    case 'ruby':
      return [person07, person17, person19];
    case 'crimson':
    case 'pink':
      return [person02, person14, person30, person19];
    case 'plum':
    case 'purple':
    case 'violet':
      return [person02, person06, person14, person30];
    case 'iris':
    case 'indigo':
    case 'blue':
    case 'sky':
      return [person11, person20, person27];
    case 'cyan':
    case 'teal':
    case 'mint':
    case 'jade':
      return [person10, person20, person23, person28];
    case 'green':
    case 'lime':
      return [person21, person26, person29];
    case 'grass':
      return [person21, person22, person26, person29];
    case 'brown':
      return [person04, person13, person18, person25];
    case 'orange':
    case 'amber':
      return [person08, person12, person13, person25];
    case 'yellow':
      return [person12, person24, person29];
    case 'gold':
    case 'bronze':
      return neutralPeople;
  }
}

function avatar(id: string, params?: { x?: number; y?: number; zoom?: number }) {
  let crop = '';
  if (params === undefined) {
    crop = 'faces';
  } else {
    const { x = 0.5, y = 0.5, zoom = 1 } = params ?? {};
    crop = `focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`;
  }
  return `https://images.unsplash.com/photo-${id}?&w=128&h=128&dpr=2&q=70&crop=${crop}&fit=crop`;
}

export { getPeopleForColor };
