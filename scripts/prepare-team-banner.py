"""Export the already-authorized original BKW team panorama; no new imagery."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / 'public/assets/images/home-hero.webp'
image = Image.open(source).convert('RGB')
variants = []
for width in [480, 800, 1200, 1800]:
    width = min(width, image.width)
    height = round(image.height * width / image.width)
    name = f'teamBanner-{width}.webp'
    image.resize((width, height), Image.Resampling.LANCZOS).save(
        root / 'public/assets/photos' / name, 'WEBP', quality=76, method=6
    )
    variants.append({'src': name, 'width': width, 'height': height})

manifest_path = root / 'src/data/images.json'
manifest = json.loads(manifest_path.read_text())
manifest['teamBanner'] = {'variants': variants}
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
print('Prepared original BKW team banner at source resolution or smaller')
