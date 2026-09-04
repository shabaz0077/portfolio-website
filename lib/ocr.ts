export type OcrMedicine = {
  name: string;
  dosage?: string;
  frequency?: string;
};

export type OcrJson = {
  extractedAt: string;
  sourceFile: string;
  confidence: number | null;
  rawText: string;
  lines: string[];
  fields: {
    patient: string | null;
    doctor: string | null;
    date: string | null;
    hospital: string | null;
    medicines: OcrMedicine[];
  };
  keywords: string[];
};

function matchField(lines: string[], labels: RegExp) {
  for (const line of lines) {
    const match = line.match(labels);
    if (match?.[1]) {
      return match[1].replace(/^[:\-]\s*/, "").trim();
    }
  }
  return null;
}

function parseMedicines(lines: string[]): OcrMedicine[] {
  const medicines: OcrMedicine[] = [];
  const dosage = /\b(\d+(?:\.\d+)?\s?(?:mg|ml|g|mcg|iu))\b/i;
  const frequency = /\b(od|bd|bid|tid|qid|hs|prn|once daily|twice daily|three times|every \d+ hours?)\b/i;

  for (const line of lines) {
    if (line.length < 3 || /patient|doctor|hospital|date|address|phone/i.test(line)) {
      continue;
    }
    const dose = line.match(dosage)?.[1];
    const freq = line.match(frequency)?.[1];
    if (dose || freq || /tab|cap|syrup|inj|tablet|capsule/i.test(line)) {
      medicines.push({
        name: line.replace(dosage, "").replace(frequency, "").replace(/[-:,]/g, " ").trim(),
        dosage: dose,
        frequency: freq,
      });
    }
  }

  return medicines.slice(0, 12);
}

export function textToOcrJson(
  rawText: string,
  sourceFile: string,
  confidence?: number,
): OcrJson {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    extractedAt: new Date().toISOString(),
    sourceFile,
    confidence: typeof confidence === "number" ? Number(confidence.toFixed(2)) : null,
    rawText,
    lines,
    fields: {
      patient: matchField(lines, /(?:patient|name)\s*[:\-]\s*(.+)/i),
      doctor: matchField(lines, /(?:doctor|dr\.?|physician)\s*[:\-]\s*(.+)/i),
      date: matchField(lines, /(?:date|dt)\s*[:\-]\s*(.+)/i),
      hospital: matchField(lines, /(?:hospital|clinic|pharmacy)\s*[:\-]\s*(.+)/i),
      medicines: parseMedicines(lines),
    },
    keywords: Array.from(
      new Set(
        rawText
          .toLowerCase()
          .match(/\b[a-z][a-z0-9-]{3,}\b/g)
          ?.filter((word) => !["this", "that", "with", "from", "have"].includes(word)) ?? [],
      ),
    ).slice(0, 20),
  };
}
