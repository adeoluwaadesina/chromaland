from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

COLORS = [
    (255, 238, 158),
    (255, 213, 79),
    (249, 168, 37),
    (245, 124, 0),
]


def create_gradient(width: int, height: int) -> Image.Image:
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
    return image


def add_content(image: Image.Image) -> Image.Image:
    draw = ImageDraw.Draw(image)
    width, height = image.size
    pad = 96
    draw.rounded_rectangle(
        (pad, pad, width - pad, height - pad),
        radius=48,
        outline=(11, 11, 11, 60),
        width=8,
    )
    heading = "Chromaland Developers"
    subtitle = "Plot 610 Terraces · Smart Luxury Living in Abuja"
    draw.text(
        (pad + 96, pad + 120),
        heading,
        fill=(11, 11, 11),
        anchor="lt",
    )
    draw.text(
        (pad + 96, pad + 240),
        subtitle,
        fill=(20, 20, 20),
        anchor="lt",
    )
    return image


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    output = repo_root / "public" / "og.png"

    base = create_gradient(1200, 630).convert("RGBA")
    composed = add_content(base)
    composed.save(output)
    print(f"[placeholder] Created OG image at {output}")


if __name__ == "__main__":
    main()
