from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

WIDTH, HEIGHT = 1600, 1000


def create_map(path: Path) -> None:
  background = (255, 238, 158)
  accent = (249, 168, 37)
  highlight = (245, 124, 0)

  image = Image.new("RGB", (WIDTH, HEIGHT), background)
  draw = ImageDraw.Draw(image)

  # Draw simplified road grid.
  for offset in range(200, WIDTH, 220):
    draw.line((offset, 80, offset - 120, HEIGHT - 80), fill=(230, 190, 80), width=10)
  for offset in range(120, HEIGHT, 200):
    draw.line((80, offset, WIDTH - 80, offset + 60), fill=(230, 190, 80), width=10)

  # Highlight primary axis
  draw.line((200, 120, WIDTH - 200, HEIGHT - 140), fill=accent, width=18)
  draw.line((WIDTH - 300, 140, 320, HEIGHT - 160), fill=accent, width=14)

  # Location marker
  pin_x, pin_y = WIDTH // 2 + 120, HEIGHT // 2
  draw.ellipse(
    (pin_x - 60, pin_y - 60, pin_x + 60, pin_y + 60),
    fill=highlight,
    outline=(11, 11, 11),
    width=4,
  )
  draw.ellipse(
    (pin_x - 20, pin_y - 20, pin_x + 20, pin_y + 20),
    fill=(255, 255, 255),
  )

  # Legend card
  card_w, card_h = 320, 160
  card_x, card_y = 120, HEIGHT - card_h - 120
  draw.rounded_rectangle(
    (card_x, card_y, card_x + card_w, card_y + card_h),
    radius=24,
    fill=(255, 255, 255),
    outline=(230, 190, 80),
    width=3,
  )
  draw.text((card_x + 32, card_y + 40), "Plot 610 Terraces", fill=(11, 11, 11))
  draw.text(
    (card_x + 32, card_y + 84),
    "Daki Biyu - Abuja - Nigeria",
    fill=(90, 90, 90),
  )

  path.parent.mkdir(parents=True, exist_ok=True)
  image.save(path)
  print(f"[placeholder] Created location map at {path}")


def main() -> None:
  repo_root = Path(__file__).resolve().parents[1]
  output = repo_root / "public" / "images" / "location-map.png"
  create_map(output)


if __name__ == "__main__":
  main()
