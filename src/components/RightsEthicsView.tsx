import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'
import { rightsContent } from '@/lib/data'
import type { RightsContent } from '@/lib/types'
import { NarrationControls } from '@/components/NarrationControls'
import { NarrationText } from '@/components/NarrationText'

export function RightsEthicsView() {
  const [selectedContent, setSelectedContent] = useState<RightsContent | null>(null)

  const contentCards = [
    {
      category: 'uncrpd' as const,
      title: 'UNCRPD Article 24',
      description: 'UN Convention on the Rights of Persons with Disabilities: Right to inclusive education'
    },
    {
      category: 'irish-law' as const,
      title: 'Irish Legal Framework',
      description: 'Education Act, EPSEN Act, Disability Act, and Equal Status Acts'
    },
    {
      category: 'masking' as const,
      title: 'Understanding Masking',
      description: 'What masking is, why it happens, and how to create environments where students can be authentic'
    },
    {
      category: 'red-flags' as const,
      title: 'Ethical Red Flags',
      description: 'Warning signs of harmful practices and interventions to avoid'
    }
  ]

  if (selectedContent) {
    const plainText = selectedContent.content.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\n\n/g, ' ')
    const paragraphs = selectedContent.content.split(/\n\n/)
    
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setSelectedContent(null)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Rights & Ethics
        </Button>

        <div className="flex items-start justify-between">
          <h2 className="text-foreground mb-4">{selectedContent.title}</h2>
          <NarrationControls 
            text={`${selectedContent.title}. ${plainText}`}
            variant="minimal"
          />
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {paragraphs.map((para, index) => {
                const parts = para.split(/(\*\*.*?\*\*)/)
                return (
                  <NarrationText
                    key={index}
                    text={para.replace(/\*\*/g, '')}
                    className="mb-4"
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-foreground mb-2">Rights & Ethics</h2>
          <p className="text-muted-foreground">
            Ground your practice in rights-based frameworks and ethical principles. All interventions must respect 
            the dignity, autonomy, and identity of autistic students.
          </p>
        </div>
        <NarrationControls 
          text="Rights and Ethics. Ground your practice in rights-based frameworks and ethical principles. All interventions must respect the dignity, autonomy, and identity of autistic students."
          variant="minimal"
        />
      </div>

      <div className="bg-accent/10 border-l-4 border-l-accent p-6">
        <div className="flex items-start justify-between mb-2">
          <p className="text-foreground font-semibold">
            Core Principle
          </p>
          <NarrationControls 
            text="Core Principle. If an intervention would be considered unacceptable for a neurotypical student, it is unacceptable for a neurodivergent student. Dignity and autonomy are non-negotiable."
            variant="minimal"
          />
        </div>
        <p className="text-muted-foreground">
          If an intervention would be considered unacceptable for a neurotypical student, it is unacceptable 
          for a neurodivergent student. Dignity and autonomy are non-negotiable.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {contentCards.map((card) => {
          const content = rightsContent.find(rc => rc.category === card.category)
          return (
            <Card 
              key={card.category}
              className="cursor-pointer transition-colors hover:bg-secondary border-2"
              onClick={() => content && setSelectedContent(content)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription className="text-base">
                  {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <Card className="bg-muted">
        <CardHeader>
          <CardTitle>Using This Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            This section provides the legal and ethical foundation for all educational practice with autistic students.
          </p>
          <ul className="space-y-2 ml-4">
            <li>• Review UNCRPD Article 24 to understand international human rights standards</li>
            <li>• Familiarize yourself with Irish legislation to know students' legal entitlements</li>
            <li>• Learn about masking to recognize when students may be struggling despite appearing "fine"</li>
            <li>• Know the ethical red flags to identify and challenge harmful practices</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
