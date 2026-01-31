import brandingImage from '@/assets/images/logo_for_wix_Steffen.png'

interface SectionHeaderProps {
  title: string
  description?: string
  variant?: 'default' | 'compact' | 'minimal'
}

export function SectionHeader({ title, description, variant = 'default' }: SectionHeaderProps) {
  if (variant === 'minimal') {
    return (
      <div className="relative mb-8">
        <div className="flex items-center gap-3">
          <img 
            src={brandingImage} 
            alt="" 
            className="w-12 h-12 object-cover rounded-lg shadow-sm"
          />
          <div>
            <h2 className="text-foreground">{title}</h2>
            {description && (
              <p className="text-muted-foreground text-sm mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="relative mb-6">
        <div className="h-20 rounded-lg overflow-hidden border border-border shadow-sm">
          <img 
            src={brandingImage} 
            alt="" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-foreground">{title}</h2>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative mb-8">
      <div className="h-32 rounded-lg overflow-hidden border border-border shadow-md">
        <img 
          src={brandingImage} 
          alt="" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-lg mt-3 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}
