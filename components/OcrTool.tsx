"use client";

import { ChangeEvent, useState } from "react";

export function OcrTool() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Upload an image to extract text.");
  const [busy, setBusy] = useState(false);

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setBusy(true);
    setStatus("Reading image...");
    try {
      const Tesseract = (await import("tesseract.js")).default;
      const result = await Tesseract.recognize(file, "eng");
      setText(result.data.text.trim() || "No text found in that image.");
      setStatus("Extraction complete.");
    } catch {
      setStatus("Could not extract text from that image.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="ocr" className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">OCR Tool</p>
      <p className="mt-2 text-sm text-zinc-400">{status}</p>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => void onFile(event)}
        disabled={busy}
        className="mt-3 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-cyan-400 file:px-3 file:py-2 file:text-black"
      />
      {text ? (
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-black/40 p-3 text-sm text-zinc-200">
          {text}
        </pre>
      ) : null}
    </section>
  );
}
