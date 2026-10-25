import type { ProfileKey, QuestionId } from "@/content";

export type Answers = Partial<Record<QuestionId, string>>;

/** Regras: medo de golpe ou dificuldade com o celular → Iniciante; senão pelo que combina (Q6). */
export function computeProfile(a: Answers): ProfileKey {
  if (a.q8 === "scam" || a.q2 === "difficulty") return "iniciante";
  if (a.q6 === "talk") return "relacionamento";
  if (a.q6 === "create") return "vitrine";
  return "estrategista";
}
