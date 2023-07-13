import { radiusProp } from '../helpers';

const tablePropDefs = {
  radius: radiusProp,
} satisfies {
  radius: typeof radiusProp;
};

export { tablePropDefs };
