import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const pythonExecutable = process.env.PYTHON ?? "python";
const preferredSource =
  process.env.CHROMALAND_PDF ??
  "/mnt/data/PLOT 610 PROPOSED TERRACE OPTION 2.pdf";
const outputDir = resolve(repoRoot, "public", "images", "property");
const pythonScript = resolve(__dirname, "pdf_to_images.py");

const bundledPopplerPath = resolve(
  repoRoot,
  "tools",
  "poppler-24.07.0",
  "Library",
  "bin",
);

const popplerPath =
  process.env.POPPLER_PATH ??
  (existsSync(bundledPopplerPath) ? bundledPopplerPath : undefined);
const fallbackSource = resolve(
  repoRoot,
  "assets",
  "PLOT 610 PROPOSED TERRACE OPTION 2.pdf",
);

let pdfSource = preferredSource;

if (!existsSync(pdfSource) && existsSync(fallbackSource)) {
  pdfSource = fallbackSource;
}

async function run() {
  if (!existsSync(pdfSource)) {
    console.warn(
      `[extract-renders] PDF source not found at "${pdfSource}". ` +
        "Place the architectural PDF there or provide CHROMALAND_PDF env var."
    );
  }

mkdirSync(outputDir, { recursive: true });

const defaultRenderTargets = Array.from({ length: 6 }, (_, index) =>
  resolve(outputDir, `render-0${index + 1}.jpg`),
);

if (
  process.env.CHROMALAND_FORCE_RENDER?.toLowerCase() !== "true" &&
  defaultRenderTargets.every((file) => existsSync(file))
) {
  console.info(
    "[extract-renders] Existing render images detected. Skipping extraction.",
  );
  console.info(
    "Set CHROMALAND_FORCE_RENDER=true to overwrite the current assets.",
  );
  return;
}

const args = [
  pythonScript,
  "--input",
  pdfSource,
    "--from",
    "6",
    "--to",
    "11",
    "--out",
    outputDir,
    "--width",
    "1920",
  ];

  if (popplerPath) {
    args.push("--poppler-path", popplerPath);
  }

  await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(pythonExecutable, args, {
      stdio: "inherit",
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise(code);
      } else {
        rejectPromise(
          new Error(`[extract-renders] python exited with code ${code}`),
        );
      }
    });
  });
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
