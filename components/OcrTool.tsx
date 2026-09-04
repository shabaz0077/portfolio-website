"use client";

import { ChangeEvent, useState } from "react";
import { textToOcrJson, type OcrJson } from "@/lib/ocr";

export function OcrTool() {
  const [data, setData] = useState<OcrJson | null>(null);
  const [status, setStatus] = useState("Upload an image to extract structured JSON.");
  const [busy, setBusy] = useState(false);

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setBusy(true);
    setStatus("Reading image and converting to JSON...");
    try {
      const Tesseract = (await import("tesseract.js")).default;
      const result = await Tesseract.recognize(file, "eng");
      const rawText = result.data.text.trim();
      if (!rawText) {
        setData(null);
        setStatus("No text found in that image.");
        return;
      }
      setData(textToOcrJson(rawText, file.name, result.data.confidence));
      setStatus("Extraction complete. JSON is ready.");
    } catch {
      setStatus("Could not extract text from that image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="ocr" className="card rounded-2xl p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">OCR Tool</p>
      <p className="mt-2 text-sm text-muted">{status}</p>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => void onFile(event)}
        disabled={busy}
        className="mt-3 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-ink"
      />
      {data ? (
        <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-input p-3 text-xs text-foreground">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : null}
    </section>
  );
}
