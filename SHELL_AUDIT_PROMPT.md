# Shell Component Comprehensive Audit

## Overview

Perform a thorough audit of the Shell component - a complex layout engine for application chrome. The Shell manages expandable/collapsible panes, responsive presentation modes, resize functionality, and keyboard navigation.

## Files to Audit

### Core Files
- `packages/kookie-ui/src/components/shell.tsx` - Root component, reducer, composition logic
- `packages/kookie-ui/src/components/shell.context.tsx` - React contexts for state distribution
- `packages/kookie-ui/src/components/shell.hooks.ts` - Custom hooks (useResponsivePresentation, useResponsiveInitialState)
- `packages/kookie-ui/src/components/shell.types.ts` - TypeScript types and breakpoint definitions
- `packages/kookie-ui/src/components/shell.css` - All layout and animation styles

### Internal Components
- `packages/kookie-ui/src/components/_internal/shell-inspector.tsx` - Right-side panel
- `packages/kookie-ui/src/components/_internal/shell-sidebar.tsx` - Left-side navigation (3-state: collapsed/thin/expanded)
- `packages/kookie-ui/src/components/_internal/shell-bottom.tsx` - Bottom panel
- `packages/kookie-ui/src/components/_internal/shell-handles.tsx` - Resize handle components
- `packages/kookie-ui/src/components/_internal/shell-resize.tsx` - Resize logic and context
- `packages/kookie-ui/src/components/_internal/shell-prop-helpers.tsx` - Prop extraction utilities

### Test Files
- `packages/kookie-ui/tests/components/shell/` - All shell test files

---

## Audit Areas

### 1. Architecture & State Management

**Questions to Answer:**
- Is the reducer pattern (`paneReducer`) the right choice? Are there simpler alternatives?
- Is state properly colocated or is there unnecessary prop drilling?
- Are the multiple React contexts (`LeftModeContext`, `PanelModeContext`, etc.) justified, or could they be consolidated?
- Is the `useResponsiveInitialState` hook too complex? Could it be simplified?
- Are there race conditions between effects that sync controlled/uncontrolled state?

**Check for:**
- Unnecessary re-renders due to context value changes
- Stale closure issues in callbacks
- Missing dependency array items in useEffect/useMemo/useCallback
- Circular dependencies between hooks

### 2. Controlled vs Uncontrolled State

**Current API:**
- Inspector: `open` (controlled) or `defaultOpen` (uncontrolled)
- Sidebar: `state` (controlled) or `defaultState` (uncontrolled)
- Panel: `open` (controlled) or `defaultOpen` (uncontrolled)
- Bottom: `open` (controlled) or `defaultOpen` (uncontrolled)

**Questions to Answer:**
- Is the controlled/uncontrolled pattern consistent across all panes?
- Are the `onOpenChange`, `onStateChange`, `onExpand`, `onCollapse` callbacks firing at the right times?
- Is there proper detection of switching between controlled/uncontrolled modes?
- Do responsive props (e.g., `open={{ initial: false, md: true }}`) work correctly?

**Check for:**
- Callbacks firing during initialization (they shouldn't)
- Callbacks not firing on user actions (they should)
- Double-firing of callbacks
- Inconsistent callback signatures across panes

### 3. Composition Rules

**Expected Behavior:**
- Rail + Panel: Can coexist (Rail collapse → Panel collapse cascade)
- Sidebar: Cannot coexist with Rail or Panel (exclusive)
- Content: Always required
- Inspector/Bottom: Optional, independent

**Questions to Answer:**
- Are composition rules properly enforced?
- Are dev warnings helpful and accurate?
- Does the `isShellComponent` helper work after minification?
- Is the `SHELL_SLOT` symbol approach robust?

**Check for:**
- Silent failures when composition rules are violated
- Incorrect slot detection after bundling/minification
- Memory leaks from missing cleanup in composition detection

### 4. Presentation Modes

**Modes:**
- `fixed`: Pane takes up space in layout, pushes content
- `overlay`: Pane renders as Sheet/modal, doesn't affect layout
- `stacked`: Pane floats over content with shadow, doesn't affect layout

**Questions to Answer:**
- Are transitions between presentation modes smooth?
- Does responsive presentation (e.g., `presentation={{ initial: 'overlay', lg: 'fixed' }}`) work correctly?
- Is the Sheet integration for overlay mode correct?
- Do stacked panes have correct z-index ordering?

**Check for:**
- Layout jumps when switching presentation modes
- Incorrect z-index causing overlap issues
- Missing accessibility attributes in overlay mode
- Sheet not closing when clicking outside

### 5. Resize Functionality

**Features:**
- Drag handle to resize panes
- Snap points for common sizes
- Collapse threshold (drag past to collapse)
- Size persistence (localStorage)
- Controlled size (`size` prop) and uncontrolled (`defaultSize`)

**Questions to Answer:**
- Is the resize calculation correct for RTL layouts?
- Are snap points working correctly?
- Is size persistence reliable across page loads?
- Does `onResize`/`onResizeStart`/`onResizeEnd` fire correctly?
- Is throttling/debouncing of `onSizeChange` working?

**Check for:**
- Jank during resize (too many re-renders)
- Incorrect resize direction in RTL
- Size jumping when starting resize
- Handle not visible or hard to grab
- Keyboard resize not working (arrow keys)

### 6. Peek Functionality

**Behavior:**
- Hover over trigger with `peekOnHover` → pane previews without opening
- Pane should render at full size but with `position: absolute`
- Click should clear peek and toggle pane

**Questions to Answer:**
- Does peek work in all presentation modes?
- Is peek correctly disabled in overlay mode?
- Does the peek preview show the correct "next" state for Sidebar (thin vs expanded)?
- Are there z-index issues with peeked panes?

**Check for:**
- Peek state getting stuck
- Peek conflicting with actual open state
- Flash of content when exiting peek
- Incorrect peek width calculation

### 7. CSS & Animations

**Animation Principle:**
- Collapse: Fade content → collapse container
- Expand: Expand container → fade content

**Questions to Answer:**
- Are animations smooth and performant?
- Is `transition-delay` used correctly for sequencing?
- Are collapsed panes truly removed from layout flow?
- Does `prefers-reduced-motion` work?

**Check for:**
- Layout shift during animations
- Collapsed panes taking up space (width: 0 not applying)
- Content visible during collapse animation
- Animations janky on low-end devices
- CSS specificity conflicts

### 8. Accessibility

**Requirements:**
- Proper focus management when panes open/close
- Keyboard navigation for resize handles
- Screen reader announcements for state changes
- Proper ARIA attributes on triggers

**Questions to Answer:**
- Can all functionality be accessed via keyboard?
- Are resize handles focusable and operable with arrow keys?
- Do screen readers announce pane state changes?
- Is focus trapped correctly in overlay mode?

**Check for:**
- Missing `aria-expanded` on triggers
- Missing `aria-label` on resize handles
- Focus getting lost when pane closes
- No keyboard alternative for resize drag

### 9. Performance

**Concerns:**
- Many context providers may cause cascade re-renders
- Resize calculations during drag
- Responsive breakpoint listeners

**Questions to Answer:**
- Are context values properly memoized?
- Is the resize handler throttled appropriately?
- Are unnecessary re-renders occurring?
- Is the breakpoint listener cleaned up properly?

**Check for:**
- Components re-rendering when unrelated state changes
- Memory leaks from event listeners
- Performance degradation with many panes
- Slow initial render due to breakpoint detection

### 10. Edge Cases

**Scenarios to Test:**
1. SSR/hydration - Does the component handle server rendering?
2. Strict mode - Does it work with React.StrictMode double-mounting?
3. Hot reload - Does state persist across HMR?
4. Concurrent mode - Are there tearing issues?
5. RTL layouts - Is everything mirrored correctly?
6. Touch devices - Does resize work with touch?
7. Very small/large viewports - Does responsive logic handle extremes?

---

## Code Quality Checks

### TypeScript
- Are types accurate and comprehensive?
- Are there any `any` casts that should be removed?
- Are discriminated unions used correctly for props?
- Are generic types used where appropriate?

### React Patterns
- Are refs used correctly (not in render)?
- Are effects properly cleaned up?
- Are dependencies arrays complete?
- Is state co-located appropriately?

### Testing
- Is test coverage adequate for all features?
- Are edge cases tested?
- Are integration tests present for composition rules?
- Are accessibility tests included?

---

## Deliverables

1. **Bug Report**: List of confirmed bugs with reproduction steps
2. **Code Smells**: Patterns that should be refactored
3. **Performance Issues**: Identified bottlenecks with profiling data
4. **Accessibility Gaps**: Missing ARIA attributes or keyboard support
5. **API Inconsistencies**: Differences in prop patterns across panes
6. **Recommended Fixes**: Prioritized list of changes with estimated effort

---

## Priority Levels

- **P0 (Critical)**: Bugs causing incorrect behavior, accessibility blockers
- **P1 (High)**: Performance issues, confusing API patterns
- **P2 (Medium)**: Code quality, missing tests
- **P3 (Low)**: Nice-to-have improvements, documentation

---

## Notes

- The Shell component is used as the primary layout for applications, so stability is critical
- Breaking changes to the API should be avoided if possible
- Performance is important as the Shell is always rendered
- Accessibility is a requirement, not a nice-to-have

