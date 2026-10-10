import { chromium } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const root=process.cwd()
const browser=await chromium.launch({channel:'chrome'})
const page=await browser.newPage()
const captures=[]
mkdirSync('/tmp/bkw-v3-after',{recursive:true}); mkdirSync(`${root}/docs/v3/after`,{recursive:true})
for(const width of [320,375,390,430,768,1024,1440]) for(const route of ['','onderhoud','slotenservice','isolatie','zakelijk','contact']) {
 await page.setViewportSize({width,height:900}); await page.goto(`http://127.0.0.1:4175/bkwgroep-preview/${route?route+'/':''}`)
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()))})
 const name=route||'home'; await page.screenshot({path:`/tmp/bkw-v3-after/${name}-${width}.png`})
 if([390,1440].includes(width))await page.screenshot({path:`${root}/docs/v3/after/${name}-${width}.png`,fullPage:true})
 captures.push({route:route||'/',width,height:900,source:'local V3 candidate',overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)})
}
writeFileSync(`${root}/docs/v3/after/browser-captures.json`,JSON.stringify(captures,null,2))
await browser.close()
console.log('42 actual viewport captures; 12 full-page durable screenshots')
