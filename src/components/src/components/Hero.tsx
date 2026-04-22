// src/components/Hero.tsx
import hero from '../assets/hero.png'

export default function Hero() {
  return (
    <section className="app-shell py-6 md:py-10">
      <div className="hero-surface grid items-center gap-8 overflow-hidden p-6 md:grid-cols-2 md:p-10">

        <div className="animate-fade-up space-y-6">
          <p className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            autismandme.ie
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Evidence-based support for autistic learners
          </h1>

          <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Practical tools, calm guidance, and trusted support for educators, parents, and professionals.
          </p>

          <p className="text-lg font-medium text-primary">
            We are here for you
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="premium-button">
              Get started
            </button>

            <button className="secondary-button">
              Explore tools
            </button>
          </div>
        </div>

        <div className="relative animate-float-in">
          <img
            src={hero}
            alt="A smiling child beside the Autism and Me blue mascot"
            className="w-full rounded-[1.75rem] object-cover"
          />

          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-black/5 to-transparent" />
        </div>

      </div>
    </section>
  )
}
