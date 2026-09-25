import { createFileRoute } from "@tanstack/react-router";
import { ChatPanel } from "@/components/ChatPanel";
import { PROFILE } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shreya Bhattacharya — AI / Software Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Shreya Bhattacharya, AI / Software Engineer. Ask the built-in assistant about her skills, projects, education, achievements and resume.",
      },
      { property: "og:title", content: "Shreya Bhattacharya — AI / Software Engineer" },
      {
        property: "og:description",
        content:
        "An interactive resume: ask about Shreya's skills, projects, education and achievements, or download her resume.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#top" className="font-mono text-sm font-medium tracking-tight text-heading">
            sb<span className="text-primary">.</span>ai
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-heading">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={PROFILE.resumeFile}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-contrast px-3 py-2 text-sm font-medium text-contrast-foreground transition-colors hover:opacity-90"
          >
            <span className="font-mono text-xs text-primary-border">↓</span> Resume
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 20% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-primary-ink">
              <span className="size-1.5 rounded-full bg-success" /> {PROFILE.badge}
            </div>
            <h1 className="max-w-[18ch] text-5xl font-semibold leading-[1.02] tracking-tight text-heading sm:text-6xl">
              {PROFILE.name}
            </h1>
            <p className="mt-3 font-mono text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {PROFILE.title}
            </p>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {PROFILE.intro}
              </p>
            <div className="mt-6 flex justify-center lg:justify-start">
              <img
              src={`${import.meta.env.BASE_URL}78.png`}
              alt="Shreya working on AI and software projects"
              className="w-full max-w-md rounded-2xl object-contain"
              />
              </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#chat"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm ring-1 ring-primary transition-transform hover:-translate-y-0.5"
              >
                <span className="font-mono text-xs">›</span> Ask About Me
              </a>
              <a
                href={PROFILE.resumeFile}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
              >
                Download Resume
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {PROFILE.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-2xl font-semibold text-heading">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <ChatPanel />
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-heading">Skills</h2>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
            01 / Capability
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILE.skills.map((s) => (
            <div
              key={s.group}
              className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                {s.group}
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span key={i} className="rounded-md bg-muted px-2.5 py-1 text-sm text-foreground">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-surface/60 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-heading">Selected work</h2>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
              02 / Projects
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {PROFILE.projects.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-transform hover:-translate-y-1"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-faint">{p.version}</span>
                  <span
                    className={
                      p.status === "production"
                        ? "rounded-full bg-success-soft px-2 py-0.5 font-mono text-[11px] text-success-ink"
                        : "rounded-full bg-primary-soft px-2 py-0.5 font-mono text-[11px] text-primary"
                    }
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-heading">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {p.stack.map((t, i) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-muted-foreground">{t}</span>
                      {i < p.stack.length - 1 && (
                        <span className="font-mono text-[11px] text-border">·</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 border-t border-border-soft pt-4 text-xs text-primary">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} className="transition-colors hover:text-primary-ink">
                      → {l.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-heading">Education</h2>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">03</span>
            </div>
            <ol className="relative space-y-6 border-l border-border pl-6">
              {PROFILE.education.map((e) => (
                <li key={e.degree} className="relative">
                  <span
                    className={
                      e.current
                        ? "absolute -left-[27px] top-1 size-3 rounded-full border-2 border-primary bg-card"
                        : "absolute -left-[27px] top-1 size-3 rounded-full border-2 border-border bg-card"
                    }
                  />
                  <div className="font-mono text-xs text-faint">{e.period}</div>
                  <div className="mt-1 font-semibold text-heading">{e.degree}</div>
                  <div className="text-sm text-muted-foreground">{e.detail}</div>
                </li>
              ))}
            </ol>
          </div>
          <div id="achievements">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-heading">Achievements</h2>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">04</span>
            </div>
            <ul className="space-y-3">
              {PROFILE.achievements.map((a, i) => (
                <li
                  key={a}
                  className="flex gap-3 rounded-lg border border-border bg-card/60 p-3.5 text-sm text-foreground backdrop-blur-sm"
                >
                  <span className="font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>{" "}
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="bg-surface/60 py-16">
        <div id="resume" className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
              05 / About
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-heading">
              A résumé that answers back
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted-foreground">
              {PROFILE.about}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/70 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs text-faint">{PROFILE.resumeFileName}</div>
              <span className="font-mono text-xs text-faint">PDF</span>
            </div>
            <div className="my-4 h-px bg-border-soft" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-muted" />
              <div className="h-2 w-4/5 rounded bg-muted" />
              <div className="h-2 w-3/5 rounded bg-muted" />
            </div>
            <a
              href={PROFILE.resumeFile}
              download
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-contrast py-2.5 text-sm font-medium text-contrast-foreground transition-transform hover:-translate-y-0.5"
            >
              <span className="font-mono text-xs">↓</span> Download Resume
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="font-mono text-xs">© 2026 {PROFILE.name}</div>
          <div className="flex items-center gap-5">
            {PROFILE.links.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-heading">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
