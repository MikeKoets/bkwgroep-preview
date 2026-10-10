"""Reproducible BKW-authorized crops. Fetches public original assets only."""
from PIL import Image, ImageEnhance
import json, pathlib, urllib.request
root=pathlib.Path(__file__).resolve().parents[1]
sources=json.loads((root/'docs/v2/source-assets/manifest.json').read_text())
urls={x['file']:x['url'] for x in sources}
urls['bkw-professionals.jpg']='https://bkwgroep.nl/media/filer_public/ff/bb/ffbb62bc-f3ce-488b-adb5-9e7011a7a46a/bkw-professionals.jpg'
choices={
 'heroWork': ('bkw-professionals.jpg',(300,0,1090,530)),
 'craft': ('schuin_rechterkant_scherm-min.png',(610,0,2180,1266)),
 'maintenance': ('professioneel-woningonderhoud-bkw.jpg',(460,0,1636,950)),
 'locks': ('slotenmaker-slotenservice-berkel.png',(600,0,2199,1272)),
 'insulation': ('woning-laten-isoleren-min.png',(490,0,1650,955)),
 'property': ('zakelijk-onderhoud.png',(640,0,2180,1266)),
 'workshop': ('bkw-onderhoud-zaag.png',(0,0,1710,1266)),
 'team': ('photo-2025-10-27-20-26-51_3.jpg',(0,0,1600,1200)),
 'fleet': ('schuin_linkerkant_scherm.png',(0,0,1660,1266)),
 'detail': ('bkw-storingsdienst.png',(450,0,1650,954)),
}
cache=pathlib.Path('/tmp/bkw-v2');cache.mkdir(exist_ok=True)
out=root/'public/assets/photos';out.mkdir(exist_ok=True)
manifest={};report=[]
for name,(filename,box) in choices.items():
 p=cache/filename
 if not p.exists():urllib.request.urlretrieve(urls[filename],p)
 image=Image.open(p).convert('RGB').crop(box)
 # Modest tonal normalization only. No AI-generated or reconstructed content.
 brightness=1.22 if name=='property' else 1.035
 image=ImageEnhance.Brightness(image).enhance(brightness)
 variants=[]
 for w in sorted(set(min(s,image.width) for s in ([480,640,720,790] if name=='heroWork' else [480,640,720,800,1200,1600]))):
  h=round(image.height*w/image.width);dst=out/f'{name}-{w}.webp'
  image.resize((w,h),Image.Resampling.LANCZOS).save(dst,'WEBP',quality=(70 if name=='heroWork' else 78),method=6)
  variants.append({'src':dst.name,'width':w,'height':h})
 manifest[name]={'variants':variants}
 report.append({'name':name,'source':urls[filename],'original':list(Image.open(p).size),'crop':list(box),'transforms':f'crop, brightness x{brightness}, Lanczos resize, WebP quality70(hero)/78(other)','variants':[{**v,'bytes':(out/v['src']).stat().st_size} for v in variants]})
(root/'src/data/images.json').write_text(json.dumps(manifest,indent=2)+'\n')
(root/'docs/v3/optimized-manifest.json').write_text(json.dumps(report,indent=2))
print('Prepared',len(manifest),'real BKW images with responsive variants')
