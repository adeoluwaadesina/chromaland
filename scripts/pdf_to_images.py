from __future__ import annotations

import argparse
import sys
from pathlib import Path

from pdf2image import convert_from_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract selected pages from a PDF as resized JPEG renders."
    )
    parser.add_argument("--input", required=True, help="Path to the source PDF file.")
    parser.add_argument(
        "--from",
        dest="start_page",
        type=int,
        required=True,
        help="First page number to extract (1-indexed).",
    )
    parser.add_argument(
        "--to",
        dest="end_page",
        type=int,
        required=True,
        help="Last page number to extract (1-indexed).",
    )
    parser.add_argument(
        "--out",
        dest="output_dir",
        required=True,
        help="Directory where the JPEG renders will be saved.",
    )
    parser.add_argument(
        "--width",
        dest="width",
        type=int,
        default=1920,
        help="Target width in pixels for the exported images.",
    )
    parser.add_argument(
        "--poppler-path",
        dest="poppler_path",
        default=None,
        help="Optional path to Poppler binaries (only required on Windows).",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    pdf_path = Path(args.input).expanduser().resolve()
    output_dir = Path(args.output_dir).expanduser().resolve()

    if not pdf_path.exists():
        print(f"[extract-renders] Input PDF not found: {pdf_path}", file=sys.stderr)
        return 1

    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        images = convert_from_path(
            str(pdf_path),
            first_page=args.start_page,
            last_page=args.end_page,
            fmt="jpeg",
            size=(args.width, None),
            poppler_path=args.poppler_path,
        )
    except Exception as exc:  # pragma: no cover - runtime conversion errors
        print(f"[extract-renders] Failed to convert PDF: {exc}", file=sys.stderr)
        return 1

    for idx, image in enumerate(images, start=1):
        output_path = output_dir / f"render-{idx:02}.jpg"
        image.save(output_path, "JPEG", quality=90, optimize=True, progressive=True)
        print(f"[extract-renders] Saved {output_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
