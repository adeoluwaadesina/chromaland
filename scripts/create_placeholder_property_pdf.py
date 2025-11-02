from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

BRAND_COLORS = [
    (255, 238, 158),
    (255, 213, 79),
    (249, 168, 37),
    (245, 124, 0),
]

TEXT = [
    "Plot 610 Terraces — Perspective A",
    "Plot 610 Terraces — Perspective B",
    "Plot 610 Terraces — Evening Glow",
    "Plot 610 Terraces — Courtyard",
    "Plot 610 Terraces — Balcony Detail",
    "Plot 610 Terraces — Interior Lounge",
    "Plot 610 Terraces — Kitchen Concept",
    "Plot 610 Terraces — Master Suite",
    "Plot 610 Terraces — Facade Rhythm",
    "Plot 610 Terraces — Skyline View",
    "Plot 610 Terraces — Entry Approach",
]


def lerp(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def create_gradient(width: int, height: int) -> Image.Image:
    image = Image.new("RGB", (width, height))
    for y in range(height):
        pos = y / (height - 1)
        segment = min(int(pos * (len(BRAND_COLORS) - 1)), len(BRAND_COLORS) - 2)
        local_t = pos * (len(BRAND_COLORS) - 1) - segment
        start_color = BRAND_COLORS[segment]
        end_color = BRAND_COLORS[segment + 1]
        color = lerp(start_color, end_color, local_t)
        for x in range(width):
            image.putpixel((x, y), color)
    return image


def add_overlay(image: Image.Image, text: str, index: int) -> Image.Image:
    overlay = image.copy()
    draw = ImageDraw.Draw(overlay)
    margin = 120
    box_height = 420
    draw.rounded_rectangle(
        [margin, image.height - box_height - margin, image.width - margin, image.height - margin],
        radius=36,
        fill=(11, 11, 11, 180),
    )
    draw.text(
        (margin + 48, image.height - box_height + 40),
        text,
        fill=(255, 255, 255),
        align="left",
    )
    draw.text(
        (margin + 48, image.height - 120),
        f"Render {index:02}",
        fill=(255, 238, 158),
    )
    return overlay


def build_pdf(target_path: Path) -> None:
    width, height = 1920, 1080
    pages = []
    for index, caption in enumerate(TEXT, start=1):
        base = create_gradient(width, height)
        page = add_overlay(base, caption, index)
        pages.append(page.convert("RGB"))
    target_path.parent.mkdir(parents=True, exist_ok=True)
    pages[0].save(target_path, save_all=True, append_images=pages[1:])
    print(f"[placeholder] Created placeholder PDF at {target_path}")


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    pdf_path = repo_root / "assets" / "PLOT 610 PROPOSED TERRACE OPTION 2.pdf"
    build_pdf(pdf_path)


if __name__ == "__main__":
    main()
