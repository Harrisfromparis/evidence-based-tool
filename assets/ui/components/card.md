# Card Component

## Props

```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}
```

## States

### Default (Rest)
- Background: White or Card colour
- Border: 1px solid border colour
- Border radius: 2px (minimal)
- Padding: 24px
- Box shadow: None (flat design)

### Hover (when interactive)
- Background: Light green tint (`oklch(0.92 0.01 150)`)
- Border: Unchanged
- No elevation or shadow
- Transition: 200ms ease-out
- Cursor: pointer (if onClick provided)

### Focused (when interactive)
- Outline: 2px solid ring colour
- Outline offset: 2px
- Maintains hover state

### Selected/Active
- Border: 2px solid primary colour
- Background: Subtle highlight

## Accessibility Requirements

- If interactive (onClick), must have appropriate role and keyboard access
- Focus indicator must be clearly visible
- Sufficient contrast for text content
- Heading hierarchy within cards must be logical
- Touch targets within card must meet 44x44px minimum

## Usage Rules

- Use for grouping related information
- Generous padding (24px standard, 32px for feature cards)
- Clear visual hierarchy within card
- Limit nesting - avoid cards within cards
- If clickable, entire card should be interactive area
- Maintain consistent card height in grid layouts when possible
- On mobile, reduce padding to 16px

## Internal Structure

Cards typically contain:
- **Header**: Title and optional actions
- **Content**: Main information or media
- **Footer**: Optional metadata or actions
