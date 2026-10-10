"""Build-time-only font optimization. Requires FontTools[woff]==4.60.2.
Run against the original Manrope WOFF2 extracted from the V2 Git revision:
  git show e7b2fbb:public/assets/fonts/manrope-latin.woff2 > /tmp/bkw-manrope-original.woff2
  python scripts/subset-font.py /tmp/bkw-manrope-original.woff2
The license and original variable weight range remain unchanged.
"""
import sys
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
source = Path(sys.argv[1])
font = TTFont(source)
options = subset.Options()
options.flavor = 'woff2'
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
optimizer = subset.Subsetter(options=options)
optimizer.populate(unicodes=list(range(0x100)) + list(range(0x2000, 0x2070)) + [0x20ac, 0x2122])
optimizer.subset(font)
font.flavor = 'woff2'
destination = Path(__file__).resolve().parents[1] / 'public/assets/fonts/manrope-latin.woff2'
font.save(destination)
print(f'{source.stat().st_size} -> {destination.stat().st_size} bytes')
