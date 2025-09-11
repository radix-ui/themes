/**
 * Shell Schema Usage Examples
 *
 * This file demonstrates how to use the Shell component schemas for:
 * - Type-safe prop validation
 * - Development-time validation
 * - JSON schema generation for AI/Copilot integration
 */

import {
  ShellRootSchema,
  ShellSidebarSchema,
  ShellPanelSchema,
  ShellTriggerSchema,
  parseShellRootProps,
  parseShellSidebarProps,
  parseShellPanelProps,
  parseShellTriggerProps,
  type ShellRootProps,
  type ShellSidebarProps,
  type ShellPanelProps,
  type ShellTriggerProps,
} from '../src/components/schemas/shell.schema.js';

// Example 1: Basic Shell Root validation
const basicShellProps: ShellRootProps = {
  height: 'full',
  className: 'my-shell',
  children: 'Shell content',
};

// Validate props in development
const validatedRootProps = parseShellRootProps(basicShellProps);

// Example 2: Responsive Sidebar configuration
const responsiveSidebarProps: ShellSidebarProps = {
  defaultMode: {
    initial: 'collapsed',
    sm: 'thin',
    lg: 'expanded',
  },
  presentation: {
    initial: 'overlay',
    md: 'fixed',
  },
  expandedSize: 320,
  thinSize: 80,
  resizable: true,
  collapsible: true,
  snapPoints: [200, 320, 400],
  snapTolerance: 12,
  collapseThreshold: 150,
  paneId: 'main-sidebar',
  onModeChange: (mode) => console.log('Sidebar mode changed:', mode),
  onResize: (size) => console.log('Sidebar resized to:', size),
};

const validatedSidebarProps = parseShellSidebarProps(responsiveSidebarProps);

// Example 3: Panel with persistence
const panelProps: ShellPanelProps = {
  expandedSize: 288,
  minSize: 200,
  maxSize: 600,
  resizable: true,
  collapsible: true,
  snapPoints: [200, 288, 400, 600],
  collapseThreshold: 180,
  paneId: 'navigation-panel',
  persistence: {
    load: () => {
      const saved = localStorage.getItem('nav-panel-size');
      return saved ? Number(saved) : undefined;
    },
    save: (size) => {
      localStorage.setItem('nav-panel-size', String(size));
    },
  },
  onResizeStart: (size) => console.log('Resize started at:', size),
  onResize: (size) => console.log('Resizing to:', size),
  onResizeEnd: (size) => console.log('Resize ended at:', size),
};

const validatedPanelProps = parseShellPanelProps(panelProps);

// Example 4: Trigger with accessibility
const triggerProps: ShellTriggerProps = {
  target: 'sidebar',
  action: 'toggle',
  peekOnHover: true,
  'aria-label': 'Toggle navigation sidebar',
  'aria-describedby': 'sidebar-description',
  onClick: () => console.log('Sidebar toggled'),
  onMouseEnter: () => console.log('Hovering trigger'),
  onMouseLeave: () => console.log('Left trigger'),
};

const validatedTriggerProps = parseShellTriggerProps(triggerProps);

// Example 5: Schema validation with error handling
function validateShellProps<T>(schema: any, props: unknown): T | null {
  try {
    return schema.parse(props);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Schema validation failed:', error.message);
    }
    return null;
  }
}

// Example usage with error handling
const invalidProps = {
  height: 'invalid-height', // This should fail validation
  expandedSize: 'not-a-number', // This should also fail
};

const result = validateShellProps(ShellRootSchema, invalidProps);
if (!result) {
  console.log('Props validation failed - using defaults');
}

// Example 6: Type-safe prop building
function createSidebarConfig(
  mode: 'collapsed' | 'thin' | 'expanded' = 'expanded',
  resizable: boolean = false,
): ShellSidebarProps {
  return {
    defaultMode: mode,
    expandedSize: 288,
    thinSize: 64,
    resizable,
    collapsible: true,
    presentation: {
      initial: 'overlay',
      md: 'fixed',
    },
  };
}

const sidebarConfig = createSidebarConfig('expanded', true);
const validatedConfig = parseShellSidebarProps(sidebarConfig);

// Example 7: Responsive configuration builder
function createResponsiveShellConfig() {
  return {
    root: {
      height: 'full' as const,
      className: 'app-shell',
    },
    sidebar: {
      defaultMode: {
        initial: 'collapsed' as const,
        sm: 'thin' as const,
        lg: 'expanded' as const,
      },
      presentation: {
        initial: 'overlay' as const,
        md: 'fixed' as const,
      },
      expandedSize: 320,
      thinSize: 80,
      resizable: true,
      collapsible: true,
    },
    panel: {
      expandedSize: 288,
      resizable: true,
      collapsible: true,
      snapPoints: [200, 288, 400],
    },
    trigger: {
      target: 'sidebar' as const,
      action: 'toggle' as const,
      peekOnHover: true,
      'aria-label': 'Toggle navigation',
    },
  };
}

const responsiveConfig = createResponsiveShellConfig();

// Validate all configurations
const validatedRoot = parseShellRootProps(responsiveConfig.root);
const validatedSidebar = parseShellSidebarProps(responsiveConfig.sidebar);
const validatedPanel = parseShellPanelProps(responsiveConfig.panel);
const validatedTrigger = parseShellTriggerProps(responsiveConfig.trigger);

console.log('All configurations validated successfully!');

export {
  validatedRootProps,
  validatedSidebarProps,
  validatedPanelProps,
  validatedTriggerProps,
  validatedRoot,
  validatedSidebar,
  validatedPanel,
  validatedTrigger,
};
