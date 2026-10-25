CREATE TABLE public.quiz_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  whatsapp text NOT NULL CHECK (char_length(whatsapp) BETWEEN 10 AND 20),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  consent boolean NOT NULL CHECK (consent = true),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  profile text NOT NULL,
  utm_source text, utm_medium text, utm_campaign text, utm_content text
);
GRANT INSERT ON public.quiz_leads TO anon, authenticated;
GRANT ALL ON public.quiz_leads TO service_role;
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.quiz_leads FOR INSERT TO anon, authenticated WITH CHECK (consent = true);