# Fix Controlled/Uncontrolled Input Error in AddressAutocomplete

## Problem Summary

The `AddressAutocomplete` component is triggering a React warning: "A component is changing an uncontrolled input to be controlled." This occurs because the component has multiple rendering paths that treat the input differently - some paths render the input without a `value` prop (uncontrolled) while others render it with a `value` prop (controlled).

## Root Cause

The component uses a two-phase rendering pattern required by Google Maps API:

1. **Before library loads**: Renders a disabled input WITHOUT a `value` prop (uncontrolled)
2. **After library loads**: Renders the main input WITH `value={inputValue || ""}` (controlled)

When the Google Maps Places library loads and the component transitions between these phases, React detects the input changing from uncontrolled to controlled, triggering the warning. React 19 is stricter about this transition than previous versions.

## Recommended Solution

**Ensure all input rendering paths are consistently controlled from initial render.**

This approach:
- Fixes the immediate warning with minimal changes
- Maintains the component's self-contained state management
- Preserves all existing functionality
- Follows React best practices

## Implementation Steps

### Step 1: Fix Loading State Input (Required)

**File**: `src/components/site-plans/address-autocomplete.tsx`

**Location**: Lines 133-146 (the loading state render path)

**Change**:
```tsx
// BEFORE:
<Input
  id="address-input"
  disabled
  placeholder="Loading Google Maps..."
/>

// AFTER:
<Input
  id="address-input"
  value=""
  onChange={() => {}}
  disabled
  placeholder="Loading Google Maps..."
/>
```

**Rationale**: Makes the loading state input explicitly controlled, preventing the uncontrolled→controlled transition.

### Step 2: Fix Missing API Key Input (Required)

**File**: `src/components/site-plans/address-autocomplete.tsx`

**Location**: Lines 209-224 (the missing API key render path)

**Change**:
```tsx
// BEFORE:
<Input
  id="address-input"
  disabled
  placeholder="Google Maps API Key Required"
/>

// AFTER:
<Input
  id="address-input"
  value=""
  onChange={() => {}}
  disabled
  placeholder="Google Maps API Key Required"
/>
```

**Rationale**: Ensures consistency across all rendering paths.

### Step 3: Add Optional initialValue Prop (Optional Enhancement)

**File**: `src/components/site-plans/address-autocomplete.tsx`

**Purpose**: Allows parent component to set an initial value for future features (pre-filled addresses, editing existing site plans, etc.)

**Changes**:

1. Update interface (lines 13-17):
```tsx
interface AddressAutocompleteProps {
  apiKey: string;
  onAddressSelect: (address: string, lat: number, lng: number) => void;
  className?: string;
  initialValue?: string;  // NEW
}
```

2. Accept prop in inner component (line 36):
```tsx
function AddressAutocompleteInner({
  onAddressSelect,
  className,
  initialValue,  // NEW
}: Omit<AddressAutocompleteProps, "apiKey">) {
```

3. Use in state initialization (line 42):
```tsx
const [inputValue, setInputValue] = useState(initialValue || "");
```

4. Pass through wrapper (line 227):
```tsx
<AddressAutocompleteInner
  onAddressSelect={onAddressSelect}
  className={className}
  initialValue={initialValue}  // NEW
/>
```

**Note**: This step is optional but recommended for future flexibility.

## Testing Plan

### 1. Console Verification
- Open browser DevTools console
- Navigate to `/site-plans/new`
- Verify NO "uncontrolled to controlled" warnings appear

### 2. Functional Testing
- [ ] Page loads with "Loading Google Maps..." placeholder
- [ ] Input becomes active after library loads
- [ ] Type in address and see suggestions
- [ ] Select an address from dropdown
- [ ] Verify address appears in parent component display below
- [ ] Click clear button (X) to reset
- [ ] Repeat selection process

### 3. Edge Cases
- [ ] Test without API key configured (should show disabled input)
- [ ] Test with slow network (loading state persists)
- [ ] Test rapid typing (debounce should work)
- [ ] Test multiple select/clear cycles

### 4. Build Verification
```bash
pnpm run lint
pnpm run typecheck
```

## Files to Modify

### Primary File (Required Changes)
- `src/components/site-plans/address-autocomplete.tsx` - Add `value=""` and `onChange={() => {}}` to disabled inputs in all rendering paths

### Optional Enhancement
- Same file - Add `initialValue` prop support

## Success Criteria

1. No "uncontrolled to controlled" warnings in browser console
2. All existing functionality works correctly
3. TypeScript compilation succeeds
4. ESLint passes without errors
5. Address search, selection, and clearing all work as before

## Implementation Notes

- The main input (lines 152-160) is already correctly controlled with `value={inputValue || ""}` - no changes needed there
- Only the conditional rendering paths (loading and missing API key) need updating
- Changes are isolated to one component file
- No changes to parent component required (though optional initialValue support could be used later)
- No other components in the codebase have similar issues

## Risk Assessment

**Low Risk**: These changes only affect disabled, non-interactive input states. The functional input is already correct.
