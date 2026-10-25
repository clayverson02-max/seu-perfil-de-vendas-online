# Seu Perfil de Vendas Online

Build a mobile-first lead-generation QUIZ funnel in Brazilian Portuguese (pt-BR) for an online education offer called "Loja no Celular 45+" — a course that teaches people aged 45+ how to find a good product and sell it from home using only a smartphone: finding the right product, building a simple online store, selling on Facebook Marketplace and Instagram, and running small Meta ads with low investment.

AUDIENCE: adults 45+, many not very tech-savvy, high distrust of online "scams". Design must be: very large readable fonts (min 18px body), high contrast, big tap targets (min 56px), one question per screen, simple vocabulary, warm and trustworthy, no clutter. Colors: deep navy (#12263F) + warm orange (#F28C28) accent + off-white background. Rounded cards, subtle animations, progress bar at the top ("Pergunta 2 de 8").

FLOW:
1. Landing/intro screen (route "/"): bold hook headline: "Depois dos 45, o celular na sua mão pode virar o seu próprio negócio." Subheadline: "Responda 8 perguntas rápidas (2 minutos) e descubra qual é o seu perfil de vendedora/vendedor online e por onde começar." Big button "COMEÇAR AGORA". Below: 3 short trust lines ("Sem precisar de computador", "Comece com pouco investimento", "Explicado passo a passo, sem enrolação"). Small footer disclaimer (see below).
2. Quiz (8 questions, single choice, auto-advance on tap, back button):
   Q1 Faixa de idade: 45-49 / 50-59 / 60+ / Menos de 45
   Q2 Hoje, como você usa o celular? Só WhatsApp e redes sociais / Já compro e vendo algo online às vezes / Uso bem, aprendo rápido com apps / Tenho dificuldade, preciso de ajuda passo a passo
   Q3 Já tentou ganhar dinheiro pela internet? Nunca tentei / Tentei e não deu certo / Já vendi algumas coisas / Já tenho um pequeno negócio
   Q4 Quanto tempo por dia você teria para isso? Até 1 hora / 1 a 2 horas / 3 horas ou mais
   Q5 Quanto você se sentiria confortável em investir para começar? Quase nada, quero começar do zero / Até R$ 100 / R$ 100 a R$ 500 / Mais de R$ 500
   Q6 O que mais combina com você? Gosto de conversar e atender pessoas / Gosto de organizar e pesquisar / Gosto de criar e mostrar coisas bonitas / Gosto de números e estratégia
   Q7 Qual é o seu principal objetivo? Uma renda extra no fim do mês / Ajudar a pagar as contas da casa / Transformar em minha principal fonte de renda / Ter um hobby que também gera dinheiro
   Q8 O que mais te trava hoje? Medo de cair em golpe / Não sei qual produto vender / Não sei criar loja ou anúncio / Falta de tempo
3. Short "analisando suas respostas..." loading screen (about 3 seconds) with reassuring text.
4. LEAD CAPTURE before showing the result: "Seu perfil está pronto! Para ver o resultado e receber seu mapa personalizado, informe:" fields: Nome, WhatsApp (with BR phone mask), E-mail. Checkbox consent (LGPD): "Concordo em receber contato sobre o curso." Save each lead plus all quiz answers and the computed profile to a database table `quiz_leads` using Lovable Cloud (enable the backend). Add UTM params capture (utm_source, utm_medium, utm_campaign, utm_content) stored in the same row.
5. RESULT page: compute one of 4 profiles from answers (rule-based, no AI needed):
   - "Vendedora(o) de Relacionamento" (likes talking to people → best path: Instagram + WhatsApp + Facebook Marketplace)
   - "Criadora(or) de Vitrine" (likes creating/showing → best path: Instagram + simple online store)
   - "Estrategista de Produto" (organizes/researches/numbers → best path: choosing winning products + small Meta ads)
   - "Iniciante Protegida(o)" (fear of scams / low tech confidence → best path: safe step-by-step start with minimal investment)
   Each result shows: profile name, 3-4 sentence personalized description, "Seu primeiro passo recomendado", and a mini checklist of 3 steps. Then a strong CTA button "QUERO COMEÇAR PELO MEU PERFIL" linking to a configurable URL constant (placeholder "https://wa.me/5500000000000?text=Quero%20saber%20mais%20sobre%20o%20Loja%20no%20Celular%2045%2B") defined in one config file so it is easy to change.
6. Fire Meta Pixel standard events through a small helper: PageView on load, a custom "QuizStart", "QuizComplete", and "Lead" when the lead form is submitted. Leave the Pixel ID in a config constant (empty by default) so it can be filled later.

MANDATORY COMPLIANCE COPY (footer on every screen, small but readable): "Este conteúdo é educacional. Os resultados variam de pessoa para pessoa e dependem do esforço, do produto escolhido e do mercado. Não garantimos ganhos específicos." NEVER include income promises, fake testimonials, fake counters, or invented statistics anywhere in the copy.

TECH: React + TypeScript + Tailwind + shadcn/ui (default stack), React Router, clean file structure, config in src/config.ts, all copy in src/content.ts for easy editing. Fully responsive, tested for 360px-wide phones first. Page title "Loja no Celular 45+ | Descubra seu perfil".

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5e4c06f0-62b8-46a0-9505-90835026af2b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
