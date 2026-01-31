# Accordion Component

## Props

```typescript
interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  children: React.ReactNode
  className?: string
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}
```

## States

### Trigger (Closed)
- Background: Transparent
- Border: Bottom border only
- Icon: Chevron down or plus icon
- Hover: Subtle background tint

### Trigger (Open)
- Icon rotates or changes (chevron up or minus)
- Bold text weight to indicate active state
- Background remains same

### Content (Expanded)
- Animates height smoothly (200-300ms)
- Padding: 16px vertical, 0 horizontal
- No additional background colour
- Clear typography hierarchy

### Content (Collapsed)
- Height: 0, overflow hidden
- No visible content

## Accessibility Requirements

- Proper ARIA attributes (aria-expanded, aria-controls)
- Keyboard navigation (Enter/Space to toggle)
- Focus indicator on trigger
- Logical heading hierarchy (triggers are typically headings)
- Screen reader announces expanded/collapsed state

## Usage Rules

- Use for collapsible content sections
- Keep trigger labels concise and descriptive
- Ensure content is scannable even when collapsed (descriptive titles)
- Consider starting with first item expanded for context
- Limit nesting - nested accordions are confusing
- Use consistent icon position (right-aligned typically)
- Don't hide critical information in accordions
- On mobile, accordions reduce scrolling and cognitive load

## Use Cases

- FAQ sections
- EBP detailed information (Overview, Quick Start, Examples)
- Long content that benefits from progressive disclosure
- Comparison information where users want to focus on specific sections
