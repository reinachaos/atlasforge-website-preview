// 全站公共框架：页头、页脚、语言切换、通用页面模板及导航交互。
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params=new URLSearchParams(location.search);
let stored;try{stored=localStorage.getItem('atlasforge-preview-language')}catch{}
const requested=params.get('lang')||stored||'en';
const lang=['en','zh'].includes(requested)?requested:'en';
if(params.has('lang')&&params.get('lang')!==lang){params.set('lang',lang);history.replaceState(null,'',location.pathname+'?'+params+location.hash)}
try{localStorage.setItem('atlasforge-preview-language',lang)}catch{}
const rawPage=location.pathname.split('/').pop().replace(/\.html$/,'')||'index';
const pageId=Object.hasOwn(PAGES,rawPage)?rawPage:'index';
const page=PAGES[pageId];
const tr=value=>typeof value==='string'?value:(value?.[lang]??value?.en??'');
const t=value=>escapeHTML(tr(value));
function href(key,extra={}){const [route,query]=key.split('?');const p=new URLSearchParams(query||'');p.set('lang',lang);p.set('rev','20261016r8');Object.entries(extra).forEach(([k,v])=>p.set(k,v));return `${route}.html?${p}`}
function link(key,label,cls=''){return `<a class="${cls}" href="${href(key)}">${t(label)}${cls==='textlink'?' ↗':''}</a>`}
function langLinks(){return `<div class="langs" aria-label="Language / 语言">${['en','zh'].map(l=>{const p=new URLSearchParams(location.search);p.set('lang',l);return `<a data-lang="${l}" lang="${l==='zh'?'zh-CN':l}" aria-label="${({en:'English',zh:'中文'})[l]}" ${l===lang?'aria-current="true"':''} class="${l===lang?'active':''}" href="${pageId}.html?${p}${escapeHTML(location.hash)}">${({en:'EN',zh:'中文'})[l]}</a>`}).join('<span>·</span>')}</div>`}
function navItem(group){const active=page.group===group;const children=MENU[group];let submenu='';if(children){submenu=`<button class="drop-toggle" aria-label="${t(UI[group])} — ${t(UI.menu)}" aria-expanded="false" aria-controls="menu-${group}">${t(L('Expand','展开'))}</button><ul class="dropdown" id="menu-${group}" hidden>${children.map((id,i)=>{const label=group==='projects'?(i===0?UI.all:i===1?UI.us:UI.global):(i===0?UI.overview:PAGES[id].title);return `<li><a href="${href(id)}" ${pageId===id?'aria-current="page"':''}>${t(label)}</a></li>`}).join('')}</ul>`}return `<div class="nav-group ${active?'current':''}"><a href="${href(group)}" ${pageId===group?'aria-current="page"':''}>${t(UI[group])}</a>${submenu}</div>`}
document.documentElement.lang=lang==='zh'?'zh-CN':lang;
document.title=`${tr(page.title)} — Atlasforge`;
document.getElementById('site-header').innerHTML=`<header class="header"><div class="wrap nav"><a class="brand" href="${href('index')}" aria-label="Atlasforge ${t(UI.home)}"><img class="brand-logo" src="assets/atlasforge-logo.png" width="1370" height="334" alt="Atlasforge Engineering &amp; Construction"></a><button class="mobile-toggle" aria-controls="main-nav" aria-expanded="false">${t(UI.menu)} <span>☰</span></button><nav id="main-nav" class="links" aria-label="${t(UI.menu)}">${['about','services','projects','careers'].map(navItem).join('')}${link('contact',UI.contact,'button')}</nav>${langLinks()}</div></header>`;
document.getElementById('site-footer').innerHTML=`<footer class="footer"><div class="wrap"><a class="brand" href="${href('index')}"><b>ATLASFORGE</b><small>ENGINEERING &amp; CONSTRUCTION</small></a><div class="footer-note">${t(UI.companyName)}<br>${t(UI.footer)}</div>${langLinks()}</div><div class="wrap footer-links">${['about','services','projects','careers','contact'].map(id=>link(id,UI[id])).join('')}</div></footer>`;
const image=(file,alt,cls='',priority=false)=>{const variant=IMAGE_VARIANTS[file];const responsive=variant?`src="${variant.src}" srcset="${variant.srcset}" sizes="${priority?'100vw':'(max-width: 600px) 88vw, 50vw'}" width="${variant.width}" height="${variant.height}"`:`src="assets/${file}"`;return `<img class="${cls}" ${responsive} alt="${t(alt)}" loading="${priority?'eager':'lazy'}" decoding="async"${priority?' fetchpriority="high"':''}>`};
const breadcrumb=()=>`<div class="wrap breadcrumb">${link('index',UI.home)}<span>/</span>${page.group&&pageId!==page.group?link(page.group,UI[page.group])+'<span>/</span>':''}<span>${t(page.title)}</span></div>`;
function pageHero(){return `<section class="page-hero ${page.image?'with-image':''}"><div class="page-intro"><p class="eyebrow">${t(UI[page.group]||UI.home)}</p><h1>${t(page.title)}</h1><p>${t(page.intro)}</p></div>${page.image?image(page.image,page.title,'',true):''}</section>`}
function blocks(items){return `<div class="detail-blocks">${(items||[]).map((block,i)=>`<article><span class="block-index">${String(i+1).padStart(2,'0')}</span><div><h2>${t(block.title)}</h2><p>${t(block.body)}</p></div></article>`).join('')}</div>`}
function card(id){const p=PAGES[id];return `<a class="destination-card" href="${href(id)}">${p.image?image(p.image,p.title):p.type==='video'?`<div class="video-tile"><span class="play-symbol" aria-hidden="true">▶</span><span>ATLASFORGE</span><small>${t(p.title)} · 02:51</small></div>`:''}<div><p class="eyebrow">${t(UI[p.group])}</p><h3>${t(p.title)}</h3><p>${t(p.intro)}</p><span class="textlink">${t(UI.more)} ↗</span></div></a>`}
function projectCard(id){const p=PAGES[id];return `<article class="project"><a href="${href(id)}">${image(p.image,p.title)}<div class="place">${t(p.place)}</div><h3>${t(p.title)}</h3><p>${t(p.scope)}</p><span class="textlink">${t(UI.viewProject)} ↗</span></a></article>`}
function related(ids){return ids?.length?`<section class="section wrap related"><p class="eyebrow">${t(UI.related)}</p><div class="related-grid">${ids.map(id=>`<a href="${href(id)}"><span>${t(PAGES[id].title)}</span><b>↗</b></a>`).join('')}</div></section>`:''}
function contactBand(){return `<section class="contact wrap"><div class="contact-main"><h2>${t(UI.contactTitle)}</h2>${link('contact',UI.contactAction,'button copper')}</div></section>`}
const phoneLink=()=>`<a href="tel:+17185599260">${t(UI.phone)}</a>`;
const main=document.getElementById('main');
if(page.type==='home'){
 renderHomepage();
}else{
 let body='';
 if(page.type==='services'){body=`<section class="section wrap"><div class="destination-grid">${SERVICE_IDS.map(card).join('')}</div></section>`}
 else if(page.type==='projects'){
  body=renderPortfolio();
 }else if(page.type==='project'){
  body=renderProjectDetail(page);
 }else if(page.type==='careers'){
  body=renderCareerList();
 }else if(page.type==='opening'){
  body=renderPosition();
 }else if(page.type==='video'){
  body=renderDataCenters();
 }else if(page.type==='job'){
  body=`<section class="section wrap"><div class="sample-alert">${t(L('LAYOUT EXAMPLE ONLY — NOT A JOB POSTING','仅为版式示例 — 非真实招聘信息','SOLO EJEMPLO DE DISEÑO — NO ES UNA OFERTA DE EMPLEO'))}</div>${blocks(page.blocks)}<button class="button" disabled>${t(L('Applications not enabled','暂未开放申请','Solicitudes no habilitadas'))}</button></section>`;
 }else if(page.type==='contact'){
  body=renderContact();
 }else{body=`<section class="section wrap service-detail">${blocks(page.blocks)}${renderGallery(page)}</section>`+renderCaseLinks(page.scopeCases)}
 main.innerHTML=breadcrumb()+`<div class="wrap">${pageHero()}</div>`+body+related(page.related)+(!['contact','job','opening','careers'].includes(page.type)?contactBand():'');
}
function setDropdown(button, open) {
 button.setAttribute('aria-expanded', String(open));
 button.textContent = tr(open ? L('Collapse','收起') : L('Expand','展开'));
 document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
 const anchor = button.previousElementSibling;
 anchor.setAttribute('aria-expanded', String(open));
}
function closeDropdowns(except) {
 document.querySelectorAll('.drop-toggle').forEach(button => {if (button !== except) setDropdown(button, false)});
}
const desktopMenu = () => matchMedia('(min-width: 881px) and (hover: hover)').matches;
let restoringMenuFocus = false;
document.querySelectorAll('.drop-toggle').forEach(button => {
 const group = button.closest('.nav-group');
 const anchor = button.previousElementSibling;
 anchor.setAttribute('aria-haspopup','true');
 anchor.setAttribute('aria-expanded','false');
 anchor.setAttribute('aria-controls',button.getAttribute('aria-controls'));
 const open = () => {closeDropdowns(button);setDropdown(button,true)};
 button.addEventListener('click', () => {const expanded = button.getAttribute('aria-expanded') === 'true';closeDropdowns(button);setDropdown(button,!expanded)});
 group.addEventListener('pointerenter', () => {if (desktopMenu()) open()});
 group.addEventListener('pointerleave', () => {if (desktopMenu() && !group.contains(document.activeElement)) setDropdown(button,false)});
 group.addEventListener('focusin', () => {if (desktopMenu() && !restoringMenuFocus) open()});
 group.addEventListener('focusout', event => {if (!group.contains(event.relatedTarget)) setDropdown(button,false)});
 anchor.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown') {event.preventDefault();open();document.getElementById(button.getAttribute('aria-controls')).querySelector('a').focus()}
 });
});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-group'))closeDropdowns()});
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 const open=document.querySelector('.drop-toggle[aria-expanded="true"]');
 closeDropdowns();
 if(open){restoringMenuFocus=true;(desktopMenu()?open.previousElementSibling:open).focus();restoringMenuFocus=false}
 else if(document.getElementById('main-nav').classList.contains('mobile-open')){document.querySelector('.mobile-toggle').click();document.querySelector('.mobile-toggle').focus()}
});
const mobile=document.querySelector('.mobile-toggle');
mobile.addEventListener('click',()=>{
 const open=mobile.getAttribute('aria-expanded')!=='true';
 mobile.setAttribute('aria-expanded',String(open));
 document.getElementById('main-nav').classList.toggle('mobile-open',open);
 mobile.innerHTML=`${t(open?UI.close:UI.menu)} <span>${open?'×':'☰'}</span>`;
 if(!open)closeDropdowns();
});

initPortfolio();
