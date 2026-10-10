import { chromium, webkit } from '@playwright/test'
import { writeFileSync } from 'node:fs'
const root=process.cwd()
const report={time:new Date().toISOString(),scope:'candidate local; real browser keyboard events and accessibility tree, not actual VoiceOver/NVDA speech',routes:[],touch:[],contrast:[]}
const browser=await chromium.launch({channel:'chrome'})
const page=await browser.newPage({viewport:{width:1440,height:900}})
await page.coverage.startCSSCoverage({resetOnNavigation:false})
for(const route of ['','onderhoud/','slotenservice/','isolatie/','zakelijk/','contact/']) {
 await page.goto('http://127.0.0.1:4175/bkwgroep-preview/'+route)
 await page.keyboard.press('Tab');const skip=await page.locator(':focus').textContent();await page.keyboard.press('Enter')
 const mainFocused=await page.locator('main').evaluate(el=>el===document.activeElement)
 const cycle=[]
 for(let i=0;i<35;i++){await page.keyboard.press('Tab');cycle.push(await page.evaluate(()=>{const el=document.activeElement;return {tag:el.tagName,label:el.getAttribute('aria-label')||el.getAttribute('name')||el.textContent?.slice(0,100),outline:getComputedStyle(el).outlineStyle}}))}
 const cdp=await page.context().newCDPSession(page);const ax=await cdp.send('Accessibility.getFullAXTree')
 const nodes=ax.nodes.filter(n=>!n.ignored&&['heading','banner','main','navigation','contentinfo','textbox','button','link'].includes(n.role?.value)).map(n=>({role:n.role.value,name:n.name?.value,description:n.description?.value,properties:n.properties}))
 report.routes.push({route:route||'/',skip,mainFocused,keyboard:cycle,accessibilityTree:nodes,h1:await page.locator('h1').count()})
 await cdp.detach()
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4175/bkwgroep-preview/contact/')
await page.getByRole('button',{name:'Menu openen'}).click();const links=[]
for(let i=0;i<9;i++){links.push(await page.locator(':focus').evaluate(el=>el.getAttribute('aria-label')||el.textContent));await page.keyboard.press('Tab')}
report.menu={tabCycle:links,backgroundInert:await page.locator('.site-shell').evaluate(el=>el.inert)}
await page.keyboard.press('Escape');await page.getByRole('button',{name:'Demo controleren'}).click()
const cdp=await page.context().newCDPSession(page);const ax=await cdp.send('Accessibility.getFullAXTree');report.formAX=ax.nodes.filter(n=>!n.ignored&&['textbox','alert','StaticText'].includes(n.role?.value)).filter(n=>n.role.value!=='StaticText'||/gemarkeerde|naam in|e-mailadres in|Beschrijf/.test(n.name?.value)).map(n=>({role:n.role.value,name:n.name?.value,description:n.description?.value,properties:n.properties}));await cdp.detach()
const coverage=await page.coverage.stopCSSCoverage();report.cssCoverage=coverage.map(c=>({url:c.url,totalBytes:c.text.length,usedBytes:c.ranges.reduce((n,r)=>n+r.end-r.start,0)}))
await browser.close()
const wk=await webkit.launch();const mobile=await wk.newPage({isMobile:true,hasTouch:true,viewport:{width:390,height:844},deviceScaleFactor:3})
for(const width of [375,390,430]){
 await mobile.setViewportSize({width,height:844});await mobile.goto('http://127.0.0.1:4175/bkwgroep-preview/')
 await mobile.getByRole('button',{name:'Menu openen'}).tap();const menu=mobile.getByRole('dialog');const texts=[];for(let i=0;i<9;i++){texts.push(await mobile.locator(':focus').evaluate(el=>el.getAttribute('aria-label')||el.textContent));await mobile.keyboard.press('Tab')}
 const box=await menu.boundingBox();await mobile.keyboard.press('Escape');report.touch.push({width,box,texts,phoneHref:await mobile.locator('.mobile-phone').getAttribute('href'),inertReleased:await mobile.locator('.site-shell').evaluate(el=>!el.inert)})
}
await wk.close()
writeFileSync(root+'/docs/v3/keyboard-accessibility-tree.json',JSON.stringify(report,null,2));console.log('Keyboard/AX walkthrough 6 routes and touch WebKit 375/390/430 recorded')
