# Tab Component

## Props

```typescript
interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}
```

## States

### Tab Trigger (Inactive)
- Background: Transparent
- Text: Muted foreground colour
- Border bottom: None
- Padding: 12px 16px

### Tab Trigger (Active)
- Background: Transparent
- Text: Primary colour (black)
- Border bottom: 2px solid primary colour
- Font weight: 600 (semi-bold)

### Tab Trigger (Hover)
- Background: Light green tint
- Text: Foreground colour
- Transition: 200ms ease-out

### Tab Trigger (Focused)
- Outline: 2px solid ring colour
- Outline offset: 2px

### Tab Trigger (Disabled)
- Text: Muted colour
- Cursor: not-allowed
- Opacity: 0.5
- No hover effect

## Accessibility Requirements

- Role="tablist" on container
- Role="tab" on triggers
- Role="tabpanel" on content areas
- aria-selected on active tab
- aria-controls linking tabs to panels
- Keyboard navigation (Arrow keys to switch tabs, Enter/Space to activate)
- Focus management (focus moves to newly selected tab)

## Usage Rules

- Use for switching between related views or content sections
- Limit to 3-6 tabs for usability
- Keep tab labels concise (1-2 words ideally)
- Ensure content in each tab is substantial enough to warrant separate view
- Never use tabs for sequential processes (use stepped progression instead)
- On mobile, tabs may need to scroll horizontally or convert to dropdown
- Maintain consistent content layout across tabs
- Avoid nesting tabs within tabs

## Use Cases

- Main navigation (Home, EBPs, Case Studies, Rights & Ethics, Tools)
- Switching between different views of same content
- Filtering or categorising content
- Settings or configuration panels with multiple sections
