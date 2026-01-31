# Button Component

## Props

```typescript
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
}
```

## States

### Default (Rest)
- Background: Black (`var(--primary)`)
- Text: White (`var(--primary-foreground)`)
- Border: None
- Padding: 16px 24px
- Border radius: 2px (minimal for anti-aliasing only)

### Hover
- Background: Forest Green (`var(--secondary)`)
- Text: White
- No shadow, no transform
- Transition: 200ms ease-out

### Active/Pressed
- Background: Darker forest green
- Slight inset appearance
- No bounce or elastic effects

### Focused
- Outline: 2px solid ring colour
- Outline offset: 2px
- Maintains hover state if applicable

### Disabled
- Background: Muted grey
- Text: Muted foreground
- Cursor: not-allowed
- Reduced opacity: 0.5

## Accessibility Requirements

- Minimum touch target: 44x44px
- Clear, visible focus indicator
- Sufficient colour contrast (WCAG AA minimum)
- Descriptive labels - never icon-only without aria-label
- Keyboard accessible
- Screen reader announces state (disabled, pressed)

## Usage Rules

- Use 'default' variant for primary actions
- Use 'secondary' for less important actions
- Use 'outline' for tertiary actions
- Use 'ghost' for minimal-emphasis actions
- Use 'destructive' only for irreversible delete/remove actions
- Always provide clear, action-oriented labels ("Save changes", not "OK")
- Group related buttons with consistent spacing
- Place primary action on right in multi-button layouts (UK/Irish convention)
