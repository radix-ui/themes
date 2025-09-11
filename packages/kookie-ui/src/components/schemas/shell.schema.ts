import { z } from 'zod';

/**
 * Shell Zod schema - Single source of truth for Shell component props
 *
 * The Shell component is a layout engine that provides structural patterns for building
 * application interfaces. It manages layout state, composition rules, and responsive
 * behavior across seven core slots.
 *
 * @example
 * ```tsx
 * // Basic shell validation
 * const props = ShellRootSchema.parse({ height: 'full' });
 *
 * // Shell with responsive sidebar
 * const sidebarProps = ShellSidebarSchema.parse({
 *   defaultMode: { initial: 'collapsed', md: 'expanded' },
 *   presentation: { initial: 'overlay', lg: 'fixed' }
 * });
 * ```
 */

// Common types
const PaneModeSchema = z.enum(['expanded', 'collapsed']).describe('Pane state mode');
const SidebarModeSchema = z.enum(['collapsed', 'thin', 'expanded']).describe('Sidebar state mode');
const PresentationValueSchema = z
  .enum(['fixed', 'overlay', 'stacked'])
  .describe('Presentation mode');
const BreakpointSchema = z
  .enum(['initial', 'xs', 'sm', 'md', 'lg', 'xl'])
  .describe('Responsive breakpoint');
const PaneTargetSchema = z
  .enum(['left', 'rail', 'panel', 'sidebar', 'inspector', 'bottom'])
  .describe('Pane target');
const TriggerActionSchema = z.enum(['toggle', 'expand', 'collapse']).describe('Trigger action');

// Responsive schemas
const ResponsiveModeSchema = z
  .union([
    PaneModeSchema,
    z.object({
      initial: PaneModeSchema.optional(),
      xs: PaneModeSchema.optional(),
      sm: PaneModeSchema.optional(),
      md: PaneModeSchema.optional(),
      lg: PaneModeSchema.optional(),
      xl: PaneModeSchema.optional(),
    }),
  ])
  .describe('Responsive pane mode configuration');

const ResponsiveSidebarModeSchema = z
  .union([
    SidebarModeSchema,
    z.object({
      initial: SidebarModeSchema.optional(),
      xs: SidebarModeSchema.optional(),
      sm: SidebarModeSchema.optional(),
      md: SidebarModeSchema.optional(),
      lg: SidebarModeSchema.optional(),
      xl: SidebarModeSchema.optional(),
    }),
  ])
  .describe('Responsive sidebar mode configuration');

const ResponsivePresentationSchema = z
  .union([
    PresentationValueSchema,
    z.object({
      initial: PresentationValueSchema.optional(),
      xs: PresentationValueSchema.optional(),
      sm: PresentationValueSchema.optional(),
      md: PresentationValueSchema.optional(),
      lg: PresentationValueSchema.optional(),
      xl: PresentationValueSchema.optional(),
    }),
  ])
  .describe('Responsive presentation configuration');

// Size persistence adapter
const PaneSizePersistenceSchema = z
  .object({
    load: z
      .function()
      .returns(z.union([z.number(), z.promise(z.number()), z.undefined()]))
      .optional(),
    save: z
      .function()
      .args(z.number())
      .returns(z.union([z.void(), z.promise(z.void())]))
      .optional(),
  })
  .describe('Size persistence adapter');

// Common pane props
const PanePropsSchema = z
  .object({
    presentation: ResponsivePresentationSchema.optional(),
    mode: PaneModeSchema.optional(),
    defaultMode: ResponsiveModeSchema.optional(),
    onModeChange: z.function().args(PaneModeSchema).returns(z.void()).optional(),
    expandedSize: z.number().optional(),
    minSize: z.number().optional(),
    maxSize: z.number().optional(),
    resizable: z.boolean().optional(),
    collapsible: z.boolean().optional(),
    onExpand: z.function().returns(z.void()).optional(),
    onCollapse: z.function().returns(z.void()).optional(),
    onResize: z.function().args(z.number()).returns(z.void()).optional(),
    resizer: z.any().optional(),
    onResizeStart: z.function().args(z.number()).returns(z.void()).optional(),
    onResizeEnd: z.function().args(z.number()).returns(z.void()).optional(),
    snapPoints: z.array(z.number()).optional(),
    snapTolerance: z.number().optional(),
    collapseThreshold: z.number().optional(),
    paneId: z.string().optional(),
    persistence: PaneSizePersistenceSchema.optional(),
    className: z.string().optional(),
    style: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
    children: z.any().optional(),
  })
  .strict();

/**
 * Shell.Root component schema
 */
export const ShellRootSchema = z
  .object({
    height: z
      .union([z.literal('full'), z.literal('auto'), z.string(), z.number()])
      .default('full')
      .describe('Height of the shell container'),
    className: z.string().optional().describe('Additional CSS class name'),
    style: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .describe('Inline styles'),
    children: z.any().optional().describe('Shell components'),
  })
  .strict();

/**
 * Shell.Header component schema
 */
export const ShellHeaderSchema = z
  .object({
    height: z.union([z.string(), z.number()]).default(64).describe('Height of the header'),
    className: z.string().optional().describe('Additional CSS class name'),
    style: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .describe('Inline styles'),
    children: z.any().optional().describe('Header content'),
  })
  .strict();

/**
 * Shell.Rail component schema
 */
export const ShellRailSchema = z
  .object({
    presentation: ResponsivePresentationSchema.optional(),
    mode: PaneModeSchema.optional(),
    defaultMode: ResponsiveModeSchema.optional(),
    onModeChange: z.function().args(PaneModeSchema).returns(z.void()).optional(),
    expandedSize: z.number().default(64).describe('Default width in pixels'),
    collapsible: z.boolean().optional(),
    onExpand: z.function().returns(z.void()).optional(),
    onCollapse: z.function().returns(z.void()).optional(),
    className: z.string().optional().describe('Additional CSS class name'),
    style: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .describe('Inline styles'),
    children: z.any().optional().describe('Rail content'),
  })
  .strict();

/**
 * Shell.Panel component schema
 */
export const ShellPanelSchema = PanePropsSchema.extend({
  expandedSize: z.number().default(288).describe('Default width in pixels'),
  minSize: z.number().default(200).describe('Minimum width when resizing'),
  maxSize: z.number().default(800).describe('Maximum width when resizing'),
  resizable: z.boolean().default(false).describe('Whether the panel can be resized'),
  collapsible: z
    .boolean()
    .default(true)
    .describe('Whether the panel can be collapsed via resize handle'),
}).strict();

/**
 * Shell.Sidebar component schema
 */
export const ShellSidebarSchema = PanePropsSchema.extend({
  mode: SidebarModeSchema.optional(),
  defaultMode: ResponsiveSidebarModeSchema.default('expanded').describe('Initial sidebar mode'),
  expandedSize: z.number().default(288).describe('Default width in pixels'),
  minSize: z.number().default(200).describe('Minimum width when resizing'),
  maxSize: z.number().default(400).describe('Maximum width when resizing'),
  thinSize: z.number().default(64).describe('Width in thin mode'),
  toggleModes: z.enum(['both', 'single']).optional().describe('Available modes in toggle sequence'),
  resizable: z.boolean().default(false).describe('Whether the sidebar can be resized'),
  collapsible: z
    .boolean()
    .default(true)
    .describe('Whether the sidebar can be collapsed via resize handle'),
}).strict();

/**
 * Shell.Content component schema
 */
export const ShellContentSchema = z
  .object({
    className: z.string().optional().describe('Additional CSS class name'),
    style: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .describe('Inline styles'),
    children: z.any().optional().describe('Main content'),
  })
  .strict();

/**
 * Shell.Inspector component schema
 */
export const ShellInspectorSchema = PanePropsSchema.extend({
  presentation: ResponsivePresentationSchema.default({ initial: 'overlay', lg: 'fixed' }).describe(
    'Presentation mode',
  ),
  expandedSize: z.number().default(320).describe('Default width in pixels'),
  minSize: z.number().default(200).describe('Minimum width when resizing'),
  maxSize: z.number().default(500).describe('Maximum width when resizing'),
  resizable: z.boolean().default(false).describe('Whether the inspector can be resized'),
  collapsible: z
    .boolean()
    .default(true)
    .describe('Whether the inspector can be collapsed via resize handle'),
}).strict();

/**
 * Shell.Bottom component schema
 */
export const ShellBottomSchema = PanePropsSchema.extend({
  presentation: ResponsivePresentationSchema.default('fixed').describe('Presentation mode'),
  expandedSize: z.number().default(200).describe('Default height in pixels'),
  minSize: z.number().default(100).describe('Minimum height when resizing'),
  maxSize: z.number().default(400).describe('Maximum height when resizing'),
  resizable: z.boolean().default(false).describe('Whether the bottom panel can be resized'),
  collapsible: z
    .boolean()
    .default(true)
    .describe('Whether the bottom panel can be collapsed via resize handle'),
}).strict();

/**
 * Shell.Trigger component schema
 */
export const ShellTriggerSchema = z
  .object({
    target: PaneTargetSchema.describe('Which pane to control'),
    action: TriggerActionSchema.default('toggle').describe('Action to perform'),
    peekOnHover: z
      .boolean()
      .default(false)
      .describe('Whether to show peek preview on hover when collapsed'),
    className: z.string().optional().describe('Additional CSS class name'),
    style: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .describe('Inline styles'),
    children: z.any().optional().describe('Trigger content'),
    onClick: z.function().optional().describe('Click handler'),
    onMouseEnter: z.function().optional().describe('Mouse enter handler'),
    onMouseLeave: z.function().optional().describe('Mouse leave handler'),
    'aria-label': z.string().optional().describe('ARIA label for accessibility'),
    'aria-labelledby': z.string().optional().describe('ARIA labelled by reference'),
    'aria-describedby': z.string().optional().describe('ARIA described by reference'),
  })
  .strict();

/**
 * Shell.Handle component schema (for resize handles)
 */
export const ShellHandleSchema = z
  .object({
    className: z.string().optional().describe('Additional CSS class name'),
    style: z
      .record(z.string(), z.union([z.string(), z.number()]))
      .optional()
      .describe('Inline styles'),
    children: z.any().optional().describe('Handle content'),
  })
  .strict();

// Type exports
export type ShellRootProps = z.infer<typeof ShellRootSchema>;
export type ShellHeaderProps = z.infer<typeof ShellHeaderSchema>;
export type ShellRailProps = z.infer<typeof ShellRailSchema>;
export type ShellPanelProps = z.infer<typeof ShellPanelSchema>;
export type ShellSidebarProps = z.infer<typeof ShellSidebarSchema>;
export type ShellContentProps = z.infer<typeof ShellContentSchema>;
export type ShellInspectorProps = z.infer<typeof ShellInspectorSchema>;
export type ShellBottomProps = z.infer<typeof ShellBottomSchema>;
export type ShellTriggerProps = z.infer<typeof ShellTriggerSchema>;
export type ShellHandleProps = z.infer<typeof ShellHandleSchema>;

// Common type exports
export type PaneMode = z.infer<typeof PaneModeSchema>;
export type SidebarMode = z.infer<typeof SidebarModeSchema>;
export type PresentationValue = z.infer<typeof PresentationValueSchema>;
export type Breakpoint = z.infer<typeof BreakpointSchema>;
export type PaneTarget = z.infer<typeof PaneTargetSchema>;
export type TriggerAction = z.infer<typeof TriggerActionSchema>;
export type ResponsiveMode = z.infer<typeof ResponsiveModeSchema>;
export type ResponsiveSidebarMode = z.infer<typeof ResponsiveSidebarModeSchema>;
export type ResponsivePresentation = z.infer<typeof ResponsivePresentationSchema>;
export type PaneSizePersistence = z.infer<typeof PaneSizePersistenceSchema>;

/**
 * Development-only helper to validate and normalize Shell props
 * This function should only be used in development mode
 *
 * @param props - Props to validate and normalize
 * @returns Validated and normalized props
 *
 * @example
 * ```tsx
 * // In development, this will validate props and show helpful errors
 * const validatedProps = parseShellRootProps({ height: 'invalid' });
 * // Throws validation errors for invalid values
 * ```
 */
export function parseShellRootProps(props: unknown): ShellRootProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellRootSchema.parse(props);
  }
  return props as ShellRootProps;
}

export function parseShellHeaderProps(props: unknown): ShellHeaderProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellHeaderSchema.parse(props);
  }
  return props as ShellHeaderProps;
}

export function parseShellRailProps(props: unknown): ShellRailProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellRailSchema.parse(props);
  }
  return props as ShellRailProps;
}

export function parseShellPanelProps(props: unknown): ShellPanelProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellPanelSchema.parse(props);
  }
  return props as ShellPanelProps;
}

export function parseShellSidebarProps(props: unknown): ShellSidebarProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellSidebarSchema.parse(props);
  }
  return props as ShellSidebarProps;
}

export function parseShellContentProps(props: unknown): ShellContentProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellContentSchema.parse(props);
  }
  return props as ShellContentProps;
}

export function parseShellInspectorProps(props: unknown): ShellInspectorProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellInspectorSchema.parse(props);
  }
  return props as ShellInspectorProps;
}

export function parseShellBottomProps(props: unknown): ShellBottomProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellBottomSchema.parse(props);
  }
  return props as ShellBottomProps;
}

export function parseShellTriggerProps(props: unknown): ShellTriggerProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellTriggerSchema.parse(props);
  }
  return props as ShellTriggerProps;
}

export function parseShellHandleProps(props: unknown): ShellHandleProps {
  if (process.env.NODE_ENV === 'development') {
    return ShellHandleSchema.parse(props);
  }
  return props as ShellHandleProps;
}
