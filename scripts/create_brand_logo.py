from __future__ import annotations

from pathlib import Path

from PIL import Image

COLORS = [
    (255, 238, 158),
    (255, 213, 79),
    (249, 168, 37),
    (245, 124, 0),
]


def lerp_color(start: tuple[int, int, int], end: tuple[int, int, int], t: float):
    return tuple(int(start[i] + (end[i] - start[i]) * t) for i in range(3))


def build_logo(path: Path) -> None:
    width, height = 600, 320
    gradient = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels = gradient.load()
    for x in range(width):
        pos = x / (width - 1)
        segment = min(int(pos * (len(COLORS) - 1)), len(COLORS) - 2)
        local = pos * (len(COLORS) - 1) - segment
        color = lerp_color(COLORS[segment], COLORS[segment + 1], local)
        for y in range(height):
            pixels[x, y] = (*color, 255)

    mask = Image.new("L", (width, height), 0)
    mask_pixels = mask.load()
    for x in range(width):
        for y in range(height):
            nx = (x - width / 2) / (width / 2)
            ny = (y - height / 2) / (height / 2)
            if nx * nx + ny * ny <= 1:
                mask_pixels[x, y] = 255

    capsule = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    capsule.paste(gradient, (0, 0), mask)

    final = Image.new("RGBA", (720, 720), (0, 0, 0, 0))
    final.paste(capsule, ((720 - width) // 2, (720 - height) // 2), capsule)
    final = final.resize((512, 512), Image.LANCZOS)

    path.parent.mkdir(parents=True, exist_ok=True)
    final.save(path)
    favicon = final.resize((256, 256), Image.LANCZOS)
    favicon_path = path.parent.parent / "favicon.ico"
    favicon.save(favicon_path, format="ICO", sizes=[(256, 256), (128, 128), (64, 64)])
    print(f"[placeholder] Created logo at {path}")
    print(f"[placeholder] Created favicon at {favicon_path}")


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    output = repo_root / "public" / "brand" / "logo.png"
    build_logo(output)


if __name__ == "__main__":
    main()
