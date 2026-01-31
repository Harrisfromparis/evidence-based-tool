# Input Component

## Props

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  id: string
  name?: string
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
}
```

## States

### Default (Rest)
- Background: White
- Border: 1px solid input border colour
- Text: Foreground colour
- Padding: 12px 16px
- Border radius: 2px (minimal)
- Font size: 16px (prevent zoom on mobile)

### Hover
- Border: 1px solid primary colour
- Background: Unchanged

### Focused
- Border: 2px solid ring colour
- Background: Light green tint (`oklch(0.92 0.01 150)`)
- Outline: None (border provides focus indicator)
- Box shadow: Subtle glow (optional)

### Filled (with content)
- Maintains default appearance
- Clear indicator if field has error

### Disabled
- Background: Muted colour
- Border: Muted border
- Text: Muted foreground
- Cursor: not-allowed
- Opacity: 0.6

### Error State
- Border: 2px solid destructive colour
- Icon: Error icon (optional)
- Associated error message below input

### Success State (optional)
- Border: 2px solid success colour (green)
- Icon: Checkmark (optional)

## Accessibility Requirements

- Always include associated label (visible or aria-label)
- Use descriptive placeholder text (not as replacement for label)
- Error messages must be associated with input (aria-describedby)
- Ensure sufficient colour contrast for text
- Minimum touch target: 44px height
- Required fields clearly indicated (not colour alone)
- Type attribute matches expected input format
- Autocomplete attributes when appropriate

## Usage Rules

- Always provide clear label above or beside input
- Use placeholder for format examples, not instructions
- Provide inline validation feedback when appropriate
- Group related inputs logically
- Use appropriate input type for better mobile keyboards
- Mark required fields clearly
- Provide helpful error messages, not just "Invalid"
- Consider input masking for formatted data (phone numbers, dates)
- Use appropriate field widths - full width for long text, narrow for short codes

## Use Cases

- Form inputs for text, email, numbers
- Search functionality
- Filter inputs
- Settings and configuration
- User-generated content entry
