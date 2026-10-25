import { describe, it, expect } from "vitest";
import { computeProfile } from "./profile";

describe("computeProfile", () => {
  it("fear of scams → iniciante", () => expect(computeProfile({ q6: "talk", q8: "scam" })).toBe("iniciante"));
  it("low tech confidence → iniciante", () => expect(computeProfile({ q2: "difficulty", q6: "create" })).toBe("iniciante"));
  it("likes talking → relacionamento", () => expect(computeProfile({ q6: "talk", q8: "time" })).toBe("relacionamento"));
  it("likes creating → vitrine", () => expect(computeProfile({ q6: "create", q8: "store" })).toBe("vitrine"));
  it("organize → estrategista", () => expect(computeProfile({ q6: "organize" })).toBe("estrategista"));
  it("numbers → estrategista", () => expect(computeProfile({ q6: "numbers" })).toBe("estrategista"));
});
