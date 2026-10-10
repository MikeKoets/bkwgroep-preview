import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
const browser = await chromium.launch({channel:'chrome'})
const page = await browser.newPage()
const results = []
function lum(rgb) {
  const c = rgb.match(/[\d.]+/g).slice(0,3).map(Number).map(v => {v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4})
  return c[0]*.2126+c[1]*.7152+c[2]*.0722
}
function ratio(a,b) {a=lum(a);b=lum(b);return Math.round(((Math.max(a,b)+.05)/(Math.min(a,b)+.05))*100)/100}
for(const route of ['','onderhoud/','slotenservice/','isolatie/','zakelijk/','contact/']) {
  await page.goto('http://127.0.0.1:4175/bkwgroep-preview/'+route)
  for(const selector of ['.button--primary','.text-link','.desktop-nav .nav-link','.footer-links a','.contact-form .button','.contact-form input','.contact-form textarea']) {
    const el=page.locator(selector).first()
    if(!await el.count()||!await el.isVisible())continue
    for(const state of ['default','hover','focus']) {
      if(state==='hover')await el.hover()
      if(state==='focus'){await el.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab')}
      const styles=await el.evaluate(el=>{
        let parent=el
        while(parent&&['rgba(0, 0, 0, 0)','transparent'].includes(getComputedStyle(parent).backgroundColor))parent=parent.parentElement
        const s=getComputedStyle(el)
        return {color:s.color,background:getComputedStyle(parent||document.documentElement).backgroundColor,border:s.borderColor,outline:s.outlineColor,outlineStyle:s.outlineStyle}
      })
      const textContrast=ratio(styles.color,styles.background)
      const input=selector.includes('input')||selector.includes('textarea')
      results.push({route:route||'/',selector,state,...styles,contrast:textContrast,textPass:textContrast>=4.5,inputBorderContrast:input?ratio(styles.border,styles.background):null})
    }
  }
}
const context=await browser.newContext({javaScriptEnabled:false})
const noJS=await context.newPage();await noJS.goto('http://127.0.0.1:4175/bkwgroep-preview/contact/')
const disabled=await noJS.getByRole('button',{name:'Demo controleren'}).evaluate(el=>{const s=getComputedStyle(el);return {color:s.color,background:s.backgroundColor,disabled:el.disabled}})
results.push({route:'contact/',selector:'.contact-form .button',state:'disabled/no-JS',...disabled,contrast:ratio(disabled.color,disabled.background),textPass:ratio(disabled.color,disabled.background)>=4.5})
if(!results.every(r=>r.textPass && (r.inputBorderContrast===null||r.inputBorderContrast===undefined||r.inputBorderContrast>=3)))throw new Error('Contrast gate failed')
writeFileSync('docs/v3/contrast-states.json',JSON.stringify(results,null,2)+'\n')
await browser.close();console.log('Contrast default/hover/keyboard focus/disabled and input borders PASS')
