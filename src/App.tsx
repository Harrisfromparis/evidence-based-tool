import Hero from './components/Hero'
import { UserMenu } from './components/auth/UserMenu'

function FeatureCard({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="premium-panel animate-float-in">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  )
}

function AudienceCard({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
      <button className="secondary-button mt-5">Explore</button>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="app-shell py-5">
        <div className="glass-card flex items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="text-sm font-medium text-primary">autismandme.ie</p>
            <h1 className="font-serif text-xl font-semibold tracking-tight md:text-2xl">
              Autism and Me
            </h1>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#features">
              Features
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#audiences">
              For You
            </a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#support">
              Support
            </a>
          </nav>

          <UserMenu />
        </div>
      </header>

      <Hero />

      <section id="features" className="app-shell py-10 md:py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="section-title font-serif">Practical tools built for real support</h2>
          <p className="section-subtitle mt-3">
            Clear evidence-based guidance for teachers, families, and professionals in Irish educational settings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <FeatureCard
            title="Evidence-based practice guides"
            text="Clear and usable guidance across core evidence-based practices, with examples that work in real settings."
          />
          <FeatureCard
            title="Lesson and intervention planning"
            text="Build support plans, visual supports, social narratives, and task analysis resources in a structured way."
          />
          <FeatureCard
            title="Case studies and examples"
            text="Use grounded examples to help teams apply good practice with more confidence and consistency."
          />
          <FeatureCard
            title="Parent-friendly support"
            text="Make home-school support easier with practical language, templates, and tools families can use."
          />
          <FeatureCard
            title="Accessible outputs"
            text="Create printable and shareable outputs that look clear, calm, and professional."
          />
          <FeatureCard
            title="Private by design"
            text="Each deployment keeps its own isolated data, so saved content and analytics stay separate."
          />
        </div>
      </section>

      <section id="audiences" className="app-shell py-10 md:py-16">
        <div className="hero-surface p-6 md:p-10">
          <div className="mb-8 max-w-2xl">
            <h2 className="section-title font-serif">Designed for the people who support autistic learners</h2>
            <p className="section-subtitle mt-3">
              The platform is structured to help different users find what they need quickly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <AudienceCard
              title="For educators"
              text="Support classroom practice with evidence-based strategies, planning tools, and ready-to-use guidance."
            />
            <AudienceCard
              title="For parents"
              text="Find practical tools and clearer ways to support learning, communication, and consistency at home."
            />
            <AudienceCard
              title="For professionals"
              text="Use shared language, structured planning, and strong examples to support joined-up practice."
            />
          </div>
        </div>
      </section>

      <section id="support" className="app-shell py-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="premium-panel">
            <p className="text-sm font-medium text-primary">autismandme.ie</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight">
              We are here for you
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              This platform is built to reduce friction, give clear guidance, and help people feel supported while planning for autistic learners.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="premium-button">Start now</button>
              <button className="secondary-button">Browse support tools</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-serif text-xl font-semibold">Why it feels different</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>Clearer navigation</li>
              <li>Calmer design</li>
              <li>Friendly visual identity</li>
              <li>Professional outputs</li>
              <li>Better trust and usability</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
