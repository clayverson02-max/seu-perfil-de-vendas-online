import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Check, CheckCircle2, Loader2, ShieldCheck, Smartphone, Wallet, ListChecks } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CTA_URL, ANALYZING_MS } from "@/config";
import { DISCLAIMER, intro, questions, quizUi, analyzing, leadForm, profiles, result, type ProfileKey } from "@/content";
import { computeProfile, type Answers } from "@/lib/profile";
import { initPixel, track, trackCustom } from "@/lib/pixel";

const TITLE = "Tienda en el Celular 45+ | Descubre tu perfil";
const DESC = "Responde 8 preguntas rápidas y descubre tu perfil para vender desde el celular después de los 45.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Funnel,
});

type Step = { kind: "intro" } | { kind: "quiz"; i: number } | { kind: "analyzing" } | { kind: "lead" } | { kind: "result"; profile: ProfileKey };
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function Funnel() {
  const [step, setStep] = useState<Step>({ kind: "intro" });
  const [answers, setAnswers] = useState<Answers>({});
  const utm = useRef<Utm>({});

  useEffect(() => {
    initPixel();
    const p = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((k) => { const v = p.get(k); if (v) utm.current[k] = v.slice(0, 200); });
  }, []);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [step]);

  useEffect(() => {
    if (step.kind !== "analyzing") return;
    const t = setTimeout(() => setStep({ kind: "lead" }), ANALYZING_MS);
    return () => clearTimeout(t);
  }, [step]);

  const choose = (i: number, value: string) => {
    const q = questions[i]!;
    setAnswers((a) => ({ ...a, [q.id]: value }));
    setTimeout(() => {
      if (i + 1 < questions.length) setStep({ kind: "quiz", i: i + 1 });
      else { trackCustom("QuizComplete"); setStep({ kind: "analyzing" }); }
    }, 250);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-8 pt-6">
        {step.kind === "intro" && (
          <Intro onStart={() => { trackCustom("QuizStart"); setStep({ kind: "quiz", i: 0 }); }} />
        )}
        {step.kind === "quiz" && (
          <Quiz i={step.i} answers={answers} onChoose={choose}
            onBack={() => setStep(step.i === 0 ? { kind: "intro" } : { kind: "quiz", i: step.i - 1 })} />
        )}
        {step.kind === "analyzing" && <Analyzing />}
        {step.kind === "lead" && (
          <LeadForm answers={answers} utm={utm.current}
            onDone={(profile) => setStep({ kind: "result", profile })} />
        )}
        {step.kind === "result" && (
          <Result profile={step.profile} onRestart={() => { setAnswers({}); setStep({ kind: "intro" }); }} />
        )}
      </main>
      <footer className="border-t bg-secondary px-5 py-5">
        <p className="mx-auto max-w-xl text-center text-[15px] leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
      </footer>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  const icons = [Smartphone, Wallet, ListChecks];
  return (
    <section className="animate-fade-up flex flex-col gap-7 pt-4">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 font-display text-base font-bold text-primary-foreground">
        <Smartphone className="size-5 text-accent" aria-hidden /> {intro.brand}
      </span>
      <h1 className="text-[2rem] font-extrabold sm:text-[2.6rem]">
        {intro.headline}
      </h1>
      <p className="text-xl text-muted-foreground">{intro.sub}</p>
      <button className="btn-cta text-xl" onClick={onStart}>{intro.button}</button>
      <ul className="flex flex-col gap-3">
        {intro.trust.map((t, i) => {
          const Icon = icons[i]!;
          return (
            <li key={t} className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                <Icon className="size-6 text-primary" aria-hidden />
              </span>
              <span className="text-lg font-bold">{t}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Quiz({ i, answers, onChoose, onBack }: { i: number; answers: Answers; onChoose: (i: number, v: string) => void; onBack: () => void }) {
  const q = questions[i]!;
  const pct = ((i + 1) / questions.length) * 100;
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="-ml-2 flex min-h-14 items-center gap-2 rounded-xl px-2 text-lg font-bold">
            <ArrowLeft className="size-6" aria-hidden /> {quizUi.back}
          </button>
          <span className="text-lg font-bold">{quizUi.progress(i + 1, questions.length)}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={questions.length}>
          <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div key={q.id} className="animate-fade-up flex flex-col gap-5">
        <h2 className="text-[1.65rem] font-bold">{q.title}</h2>
        <div className="flex flex-col gap-3">
          {q.options.map((o) => {
            const sel = answers[q.id] === o.value;
            return (
              <button key={o.value} className="option-card" data-selected={sel} onClick={() => onChoose(i, o.value)}>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-input bg-background">
                  {sel && <Check className="size-5 text-primary" aria-hidden />}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Analyzing() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((x) => Math.min(x + 1, analyzing.lines.length - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="animate-fade-up flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <Loader2 className="size-16 animate-spin text-accent" aria-hidden />
      <h2 className="text-[1.75rem] font-bold">{analyzing.title}</h2>
      <p key={n} className="animate-fade-up text-xl text-muted-foreground">{analyzing.lines[n]}</p>
    </section>
  );
}

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const schema = z.object({
  name: z.string().trim().min(2, leadForm.errors.name).max(100),
  whatsapp: z.string().refine((v) => { const d = v.replace(/\D/g, ""); return d.length === 10 || d.length === 11; }, leadForm.errors.whatsapp),
  email: z.string().trim().email(leadForm.errors.email).max(255),
  consent: z.literal(true, { errorMap: () => ({ message: leadForm.errors["consent"] }) }),
});

function LeadForm({ answers, utm, onDone }: { answers: Answers; utm: Utm; onDone: (p: ProfileKey) => void }) {
  const [f, setF] = useState({ name: "", whatsapp: "", email: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [fail, setFail] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFail("");
    const r = schema.safeParse(f);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const profile = computeProfile(answers);
    const { error } = await supabase.from("quiz_leads").insert({
      name: r.data.name, whatsapp: r.data.whatsapp.replace(/\D/g, ""), email: r.data.email.toLowerCase(),
      consent: true, answers, profile, ...utm,
    });
    setSending(false);
    if (error) { setFail(leadForm.errors.generic); return; }
    track("Lead");
    onDone(profile);
  };

  const field = "min-h-14 w-full rounded-xl border-2 border-input bg-card px-4 text-lg outline-none focus:border-accent";
  return (
    <section className="animate-fade-up flex flex-col gap-5 pt-2">
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="size-14 text-accent" aria-hidden />
        <h2 className="text-[1.75rem] font-bold">{leadForm.title}</h2>
        <p className="text-lg text-muted-foreground">{leadForm.sub}</p>
      </div>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-3xl bg-card p-5 shadow-card">
        {([
          ["name", leadForm.name, "text", "name"],
          ["whatsapp", leadForm.whatsapp, "tel", "tel"],
          ["email", leadForm.email, "email", "email"],
        ] as const).map(([k, label, type, ac]) => (
          <label key={k} className="flex flex-col gap-2">
            <span className="text-lg font-bold">{label}</span>
            <input type={type} autoComplete={ac} inputMode={k === "whatsapp" ? "numeric" : undefined}
              placeholder={k === "whatsapp" ? "(11) 91234-5678" : undefined}
              className={field} value={f[k]} aria-invalid={!!errors[k]}
              onChange={(e) => setF({ ...f, [k]: k === "whatsapp" ? maskPhone(e.target.value) : e.target.value })} />
            {errors[k] && <span className="text-base font-bold text-destructive">{errors[k]}</span>}
          </label>
        ))}
        <label className="flex min-h-14 cursor-pointer items-start gap-3 pt-1">
          <input type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })}
            className="mt-0.5 size-7 shrink-0 accent-[var(--accent)]" />
          <span className="text-lg">{leadForm.consent}</span>
        </label>
        {errors["consent"] && <span className="text-base font-bold text-destructive">{errors["consent"]}</span>}
        <p className="flex items-start gap-2 text-base text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden /> {leadForm.privacy}
        </p>
        {fail && <p className="text-base font-bold text-destructive">{fail}</p>}
        <button type="submit" disabled={sending} className="btn-cta">
          {sending ? leadForm.sending : leadForm.submit}
        </button>
      </form>
    </section>
  );
}

function Result({ profile, onRestart }: { profile: ProfileKey; onRestart: () => void }) {
  const p = profiles[profile];
  return (
    <section className="animate-fade-up flex flex-col gap-5">
      <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-card">
        <p className="text-lg opacity-90">{result.eyebrow}</p>
        <h1 className="mt-1 text-[2rem] font-extrabold text-accent">{p.name}</h1>
        <p className="mt-4 text-base font-bold uppercase tracking-wide opacity-80">{result.pathLabel}</p>
        <p className="text-lg font-bold">{p.path}</p>
      </div>
      <p className="text-lg">{p.description}</p>
      <div className="rounded-2xl border-2 border-accent bg-accent-soft p-5">
        <h2 className="text-xl font-bold">{result.firstStepLabel}</h2>
        <p className="mt-2 text-lg">{p.firstStep}</p>
      </div>
      <div className="rounded-2xl bg-card p-5 shadow-card">
        <h2 className="text-xl font-bold">{result.checklistLabel}</h2>
        <ol className="mt-3 flex flex-col gap-3">
          {p.checklist.map((c, i) => (
            <li key={c} className="flex items-start gap-3 text-lg">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-display font-bold text-accent-foreground">{i + 1}</span>
              <span className="pt-1">{c}</span>
            </li>
          ))}
        </ol>
      </div>
      <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">{result.cta}</a>
      <button onClick={onRestart} className="min-h-14 text-lg font-bold underline underline-offset-4">{result.restart}</button>
    </section>
  );
}
