import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NarrationControls } from '@/components/NarrationControls'
import brandingImage from '@/assets/images/logo_for_wix_Steffen.png'

interface HomeViewProps {
  onNavigate: (tab: string) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const welcomeText = `Welcome. This navigator provides Irish educators with evidence-based practices for supporting autistic students. All content is grounded in neuro-affirming principles, the UN Convention on the Rights of Persons with Disabilities, UNCRPD Article 24, and Irish educational legislation. Use this resource to plan interventions, understand rights-based frameworks, and access practical tools for creating inclusive, respectful learning environments.`

  return (
    <div className="space-y-12">
      <section className="relative rounded-xl overflow-hidden shadow-lg border-2 border-border">
        <img 
          src={brandingImage} 
          alt="Autism and Me" 
          className="w-full h-40 object-cover object-center"
        />
      </section>

      <section>
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-foreground">Welcome</h2>
          <NarrationControls text={welcomeText} variant="minimal" />
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            This navigator provides Irish educators with evidence-based practices for supporting autistic students. 
            All content is grounded in neuro-affirming principles, the UN Convention on the Rights of Persons with 
            Disabilities (UNCRPD Article 24), and Irish educational legislation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Use this resource to plan interventions, understand rights-based frameworks, and access practical tools 
            for creating inclusive, respectful learning environments.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-foreground mb-6">Quick Access</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card 
            className="cursor-pointer border-2 card-hover"
            onClick={() => onNavigate('ebps')}
          >
            <CardHeader>
              <CardTitle className="text-xl handwritten mb-2">EBP Library</CardTitle>
              <CardDescription>
                Browse 28 evidence-based practices with plain-English definitions, Irish classroom examples, 
                quick-start guides, and ethical considerations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer border-2 card-hover"
            onClick={() => onNavigate('cases')}
          >
            <CardHeader>
              <CardTitle className="text-xl handwritten mb-2">Case Studies</CardTitle>
              <CardDescription>
                Real-world Irish examples showing how EBPs are implemented in primary and post-primary settings. 
                Search by age, setting, or challenge type.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer border-2 card-hover"
            onClick={() => onNavigate('rights')}
          >
            <CardHeader>
              <CardTitle className="text-xl handwritten mb-2">Rights & Ethics</CardTitle>
              <CardDescription>
                Understand UNCRPD Article 24, Irish legal frameworks, masking awareness, and ethical red flags. 
                Ground your practice in rights-based approaches.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer border-2 card-hover"
            onClick={() => onNavigate('tools')}
          >
            <CardHeader>
              <CardTitle className="text-xl handwritten mb-2">Quick Tools</CardTitle>
              <CardDescription>
                Practical planning tools including the "Choose 3 EBPs" planner, sensory checklist, 
                behaviour-as-communication analyzer, and transition support builder.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer transition-colors hover:bg-secondary border-2 warm-card"
            onClick={() => onNavigate('parents')}
          >
            <CardHeader>
              <CardTitle className="text-xl handwritten mb-2">Parent & Caregiver Hub</CardTitle>
              <CardDescription className="text-foreground/80">
                Home implementation guides for all 28 EBPs, child profile creator with export options, 
                and practical tools for supporting your family.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer border-2 card-hover border-accent/50 bg-accent/5"
            onClick={() => onNavigate('saved-plans')}
          >
            <CardHeader>
              <CardTitle className="text-xl handwritten mb-2">Saved Plans</CardTitle>
              <CardDescription>
                View and manage all your saved plans from across all tools. Export multiple plans 
                as a combined PDF for easy sharing and documentation.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="bg-muted p-8 border border-border">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-foreground">Neuro-Affirming Principles</h3>
          <NarrationControls 
            text="Neuro-Affirming Principles. Autism is a neurological difference, not a deficit or disorder to cure. Autistic students have the right to inclusive education under UNCRPD Article 24. Behaviour is communication, our role is to understand, not eliminate. Masking harms wellbeing, we create environments where students can be authentic. Evidence-based practices must respect dignity, autonomy, and identity."
            variant="minimal" 
          />
        </div>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Autism is a neurological difference, not a deficit or disorder to cure</li>
          <li>• Autistic students have the right to inclusive education (UNCRPD Article 24)</li>
          <li>• Behaviour is communication—our role is to understand, not eliminate</li>
          <li>• Masking harms wellbeing—we create environments where students can be authentic</li>
          <li>• Evidence-based practices must respect dignity, autonomy, and identity</li>
        </ul>
      </section>
    </div>
  )
}
