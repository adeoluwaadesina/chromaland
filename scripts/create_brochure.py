from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

COLORS = [
    (255, 238, 158),
    (255, 213, 79),
    (249, 168, 37),
    (245, 124, 0),
]


def create_brochure(path: Path) -> None:
    width, height = 1240, 1754  # A4 at ~150dpi
    image = Image.new("RGB", (width, height))
    pixels = image.load()
    for x in range(width):
        pos = x / (width - 1)
        segment = min(int(pos * (len(COLORS) - 1)), len(COLORS) - 2)
        local = pos * (len(COLORS) - 1) - segment
        start = COLORS[segment]
        end = COLORS[segment + 1]
        color = tuple(int(start[i] + (end[i] - start[i]) * local) for i in range(3))
        for y in range(height):
            pixels[x, y] = color

    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        (120, 200, width - 120, height - 200),
        radius=48,
        outline=(11, 11, 11),
        width=6,
    )
    draw.text((200, 300), "Chromaland Developers", fill=(11, 11, 11))
    draw.text((200, 420), "Plot 610 Terraces · Abuja", fill=(11, 11, 11))
    draw.text(
        (200, 540),
        "Smart, sunlit terraces engineered for effortless living.",
        fill=(11, 11, 11),
    )

    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "PDF")
    print(f"[placeholder] Created brochure at {path}")


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    output = repo_root / "public" / "Chromaland-Brochure.pdf"
    create_brochure(output)


if __name__ == "__main__":
    main()
