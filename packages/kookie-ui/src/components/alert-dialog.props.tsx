import { dialogContentPropDefs } from './dialog.props.js';
import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const materials = ['solid', 'translucent'] as const;

const alertDialogContentPropDefs = {
  ...dialogContentPropDefs,
  material: { type: 'enum', values: materials, default: undefined },
} satisfies {
  align: PropDef<'start' | 'center'>;
  size: PropDef<'1' | '2' | '3' | '4'>;
  panelBackground: PropDef<'solid' | 'translucent' | undefined>;
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
  material: PropDef<'solid' | 'translucent' | undefined>;
};

type AlertDialogContentOwnProps = GetPropDefTypes<typeof alertDialogContentPropDefs>;

export { alertDialogContentPropDefs };
export type { AlertDialogContentOwnProps };
