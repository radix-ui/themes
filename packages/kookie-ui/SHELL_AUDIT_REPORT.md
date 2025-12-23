# Shell Component Audit Report

## Executive Summary

The Shell component is a complex layout engine managing expandable/collapsible panes, responsive presentation modes, resize functionality, and composition rules. Overall architecture is sound, but several issues need attention.

**Status**: Production-ready with known issues  
**Test Coverage**: 43 test files, good coverage of core functionality  
**Accessibility**: Needs improvement (P1 priority)

### Recent Fixes (This Session)
- ✅ Fixed `onExpand`/`onCollapse` callbacks firing incorrectly on mount
- ✅ Added proper initial state detection for Sidebar and Bottom in Root
- ✅ Consolidated CSS for collapsed panes with proper flex properties
- ✅ Added 29 new tests for callback and layout behavior

---

## Bug Report

### P0 - Critical

#### 1. ~~Double Callback Firing on Mount~~ ✅ FIXED
**Status**: Fixed  
**Files**: `shell-inspector.tsx`, `shell-sidebar.tsx`, `shell-bottom.tsx`  
**Issue**: `onExpand`/`onCollapse` fired during initialization  
**Fix**: Added `breakpointReady` check and state transition tracking

#### 2. Panel `_wasControlled` Shared Static State
**Status**: Open  
**File**: `shell.tsx` (lines 937-944)  
**Issue**: `(Panel as any)._wasControlled` is shared across all Panel instances
```typescript
// BUG: This is shared across ALL Panel instances!
(Panel as any)._wasControlled = (Panel as any)._wasControlled ?? isControlled;
```
**Impact**: Controlled/uncontrolled warning may fire incorrectly  
**Fix**: Use `useRef` instead of static property

#### 3. Missing `aria-label` on Resize Handles
**Status**: Open  
**File**: `shell-handles.tsx`  
**Issue**: Resize handles have no accessible name
**Impact**: Screen reader users can't identify the handle purpose  
**Fix**: Add `aria-label="Resize {pane} panel"`

---

### P1 - High Priority

#### 4. Trigger Missing ARIA Attributes
**Status**: Open  
**File**: `shell.tsx` (Trigger component, ~line 1196)  
**Issue**: Trigger button lacks `aria-expanded` and `aria-controls`
```tsx
// Current
<button {...props} onClick={handleClick} data-shell-trigger={target}>

// Should be
<button 
  {...props} 
  onClick={handleClick} 
  aria-expanded={!isCollapsed}
  aria-controls={`shell-${target}`}
>
```

#### 5. Throttle/Debounce Memory Leak
**Status**: Open  
**Files**: `shell-inspector.tsx`, `shell-sidebar.tsx`, `shell-bottom.tsx`, `shell.tsx` (Panel)  
**Issue**: `emitSizeChange` creates new timeout/throttle state in useMemo but never cleans up
```typescript
const emitSizeChange = React.useMemo(() => {
  // Creates closure with `let t = null` but no cleanup
  if (strategy === 'debounce') {
    let t: any = null;  // Never cleared on unmount!
    return (s: number, meta: ...) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => cb(s, meta), ms);
    };
  }
}, [onSizeChange, sizeUpdate, sizeUpdateMs]);
```
**Fix**: Return cleanup function from useEffect or use `useCallback` with cleanup

#### 6. Resize Handle Missing Dynamic `aria-valuenow`
**Status**: Open  
**File**: `shell-resize.tsx`  
**Issue**: During resize, handle should announce current size to screen readers
**Fix**: Add `aria-valuenow`, `aria-valuemin`, `aria-valuemax` during drag

#### 7. Stale Closure in `togglePane`
**Status**: Open  
**File**: `shell.tsx` (line 328-338)  
**Issue**: `togglePane` captures `paneState.sidebarMode` but may be stale
```typescript
const togglePane = React.useCallback(
  (target: PaneTarget) => {
    if (target === 'sidebar') {
      // sidebarToggleComputerRef.current uses current mode correctly
      const next = sidebarToggleComputerRef.current(paneState.sidebarMode as SidebarMode);
      setSidebarMode(next);
      return;
    }
    // ...
  },
  [paneState.sidebarMode, setSidebarMode],  // Dependency is correct but pattern is fragile
);
```

---

### P2 - Medium Priority

#### 8. Inconsistent Callback Signatures
**Status**: Open  
**Issue**: Different panes use different callback patterns
```typescript
// Inspector/Bottom
onOpenChange?: (open: boolean, meta: { reason: 'init' | 'toggle' | 'responsive' }) => void

// Sidebar  
onStateChange?: (state: SidebarMode, meta: { reason: 'init' | 'toggle' | 'responsive' }) => void

// Panel
onOpenChange?: (open: boolean, meta: { reason: 'toggle' | 'left' | 'init' }) => void
```
**Recommendation**: Standardize meta reasons across all panes

#### 9. Left Container Composition Detection
**Status**: Open  
**File**: `shell.tsx`  
**Issue**: `isShellComponent` relies on `displayName` which may be stripped in production
```typescript
const isType = (el: React.ReactElement, comp: any) => 
  React.isValidElement(el) && (el.type === comp || (el as any).type?.displayName === comp.displayName);
```
**Note**: `SHELL_SLOT` symbol approach is used but not consistently

---

## Code Smells

### 1. Duplicate `normalizeToPx` Function
**Files**: `shell-inspector.tsx`, `shell-sidebar.tsx`, `shell-bottom.tsx`, `shell.tsx` (Panel)  
**Issue**: Same 15-line function duplicated 4 times
**Fix**: Extract to `shell-helpers.ts`

### 2. Large Root Component
**File**: `shell.tsx`  
**Issue**: Root component is ~300 lines with complex child scanning logic
**Recommendation**: Extract child scanning to custom hook

### 3. Multiple Context Providers
**File**: `shell.tsx` (lines 465-525)  
**Issue**: 9 nested context providers
```tsx
<ShellProvider>
  <PresentationContext.Provider>
    <LeftModeContext.Provider>
      <PanelModeContext.Provider>
        <SidebarModeContext.Provider>
          <InspectorModeContext.Provider>
            <BottomModeContext.Provider>
              <CompositionContext.Provider>
                <PeekContext.Provider>
                  <ActionsContext.Provider>
```
**Note**: This is intentional for render optimization but adds complexity

### 4. Magic Numbers
**Files**: Various  
**Examples**:
- `expandedSize = 320` (Inspector default)
- `expandedSize = 288` (Sidebar/Panel default)  
- `thinSize = 64` (Sidebar thin mode)
- `minSize = 200`, `maxSize = 500`

**Recommendation**: Extract to constants file or CSS custom properties

---

## Accessibility Gaps

| Issue | Component | Priority | Status |
|-------|-----------|----------|--------|
| Missing `aria-label` on resize handles | PaneHandle | P0 | Open |
| Missing `aria-expanded` on Trigger | Trigger | P1 | Open |
| Missing `aria-controls` on Trigger | Trigger | P1 | Open |
| No `aria-valuenow` during resize | PaneHandle | P1 | Open |
| Focus not managed when pane closes | All panes | P2 | Open |
| No keyboard shortcut hints | Trigger | P3 | Open |

---

## Testing Gaps

### Missing Test Coverage

1. **Responsive Breakpoint Tests**
   - Responsive `open` prop transitions
   - Responsive `presentation` mode switches
   - `onOpenChange` with `reason: 'responsive'`

2. **Resize Tests**
   - Keyboard resize (arrow keys)
   - Snap point behavior
   - Collapse threshold
   - RTL resize direction

3. **Peek Functionality**
   - Peek in stacked mode
   - Peek with multiple panes
   - Peek timeout/cleanup

4. **Composition Rules**
   - Rail+Panel cascade behavior
   - Sidebar exclusivity warning
   - Dynamic child changes

5. **Edge Cases**
   - SSR hydration mismatch
   - React.StrictMode double mount
   - Rapid open/close toggling

---

## Recommended Fixes (Prioritized)

### Immediate (P0)
| Task | Effort | File |
|------|--------|------|
| Fix Panel `_wasControlled` static bug | 15 min | shell.tsx |
| Add `aria-label` to resize handles | 30 min | shell-handles.tsx |

### This Week (P1)
| Task | Effort | File |
|------|--------|------|
| Add `aria-expanded`/`aria-controls` to Trigger | 30 min | shell.tsx |
| Fix throttle/debounce cleanup | 1 hour | Multiple |
| Add `aria-valuenow` to resize | 1 hour | shell-resize.tsx |

### Next Sprint (P2)
| Task | Effort | File |
|------|--------|------|
| Extract `normalizeToPx` to helper | 30 min | New file |
| Standardize callback signatures | 2 hours | Multiple |
| Add responsive breakpoint tests | 3 hours | New test files |

---

## Architecture Assessment

### Strengths
- ✅ Reducer pattern centralizes state transitions
- ✅ Context slicing prevents unnecessary re-renders
- ✅ Responsive design via breakpoint detection
- ✅ Composition rules enforced at runtime
- ✅ Good separation of concerns (internal components)

### Weaknesses
- ⚠️ Child prop scanning in Root is fragile
- ⚠️ Multiple initialization effects can race
- ⚠️ No SSR-specific handling
- ⚠️ Accessibility not fully implemented

### Recommendations
1. Consider using a state machine (XState) for complex pane transitions
2. Add E2E tests with Playwright for visual regression
3. Document composition rules in JSDoc/TSDoc
4. Add Storybook stories for all states

---

*Generated: December 2024*  
*Last Updated: After callback fix implementation*

