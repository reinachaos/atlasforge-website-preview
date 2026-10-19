const SECTOR_LABELS={all:L('All sectors','全部类型'),industrial:L('Industrial manufacturing','工业制造'),electronics:L('Electronics & cleanrooms','电子与洁净室'),logistics:L('Warehousing & logistics','仓储与物流'),renovation:L('Renovation & fit-out','改造与装修')};
function readPortfolioState(query,hash=''){
 const ids=COMPACT_PROJECTS.map(p=>p.id);
 const validAnchors=[...ids,...PROJECT_IDS.map(id=>'project-'+id),...PROJECT_ARCHIVE.map(p=>'project-'+p.id)];
 const anchor=validAnchors.includes(hash.slice(1))?hash.slice(1):'';
 const openIds=[...new Set((query.get('open')||'').split(',').filter(id=>ids.includes(id)))];
 if(ids.includes(anchor)&&!openIds.includes(anchor))openIds.push(anchor);
 const count=Number(query.get('shown'));
 return {openIds,archiveVisible:Number.isInteger(count)&&count>=6?Math.min(count,PROJECT_ARCHIVE.length):6,anchor};
}
function portfolioDestination(id){return PAGES[id]?href(id):href('projects',{region:'us'})+'#'+id;}
function renderCaseLinks(ids){
 if(!ids?.length)return '';
 return `<section class="section wrap service-cases"><p class="eyebrow">${t(L('Relevant experience','相关项目经验'))}</p><h2>${t(L('Services in practice','服务对应的项目'))}</h2><div class="case-link-grid">${ids.map(id=>{const p=PAGES[id]||COMPACT_PROJECTS.find(p=>p.id===id);return `<a href="${portfolioDestination(id)}"><small>${t(p.region==='global'?UI.global:UI.us)}</small><h3>${t(p.title)}</h3><p>${t(p.scope)}</p><span class="textlink">${t(UI.viewProject)}</span></a>`}).join('')}</div></section>`;
}
function renderGallery(p){return p.gallery?.length?`<section class="gallery-section"><h2 class="gallery-title">${t(p.galleryTitle||UI.photos)}</h2><div class="project-gallery">${p.gallery.map((f,i)=>`<figure>${image(f,L(p.title.en+' — view '+(i+1),p.title.zh+' — 图片 '+(i+1)))}</figure>`).join('')}</div></section>`:'';}
function renderProjectDetail(p){
 const facts=[[L('Experience','项目类别'),p.region==='global'?UI.global:UI.us],[UI.location,p.place],[UI.scope,p.scope]];
 if(p.client)facts.push([L('Client','业主／客户'),p.client]);
 if(p.area)facts.push([L('Floor area','建筑面积'),p.area]);
 return `<section class="section wrap"><dl class="project-facts">${facts.map(([label,v])=>`<div><dt>${t(label)}</dt><dd>${t(v)}</dd></div>`).join('')}</dl><div class="project-description">${blocks(p.blocks)}</div>${renderGallery(p)}${link('projects',UI.backProjects,'textlink')}</section>`;
}
function portfolioPhotoCard(p,detail){
 const body=`${p.image?image(p.image,p.title):''}<div class="portfolio-card-copy"><p class="eyebrow">${t(p.region==='global'?UI.global:UI.us)}</p><h3>${t(p.title)}</h3><p class="portfolio-place">${t(p.place)}</p><p>${t(p.scope)}</p>${p.area?`<p class="portfolio-area">${t(L('Floor area','建筑面积'))} · ${t(p.area)}</p>`:''}${detail?`<span class="textlink">${t(UI.viewProject)}</span>`:''}</div>`;
 return `<article id="project-${p.id}" class="portfolio-photo-card ${p.image?'':'portfolio-text-card'}" data-project-id="${p.id}" tabindex="-1">${detail?`<a href="${href(p.id)}">${body}</a>`:body}</article>`;
}
function portfolioCompactCard(p){
 const opened=readPortfolioState(params,typeof location!=='undefined'?location.hash:'').openIds.includes(p.id);
 return `<details class="compact-project" id="${p.id}" data-project-id="${p.id}" ${opened?'open':''}><summary><span class="compact-title"><span class="eyebrow">${t(p.place)}</span><strong>${t(p.title)}</strong><span>${t(p.scope)}</span></span><span class="compact-toggle" aria-hidden="true"><span class="when-closed">+</span><span class="when-open">−</span></span></summary><div class="compact-body"><h3>${t(L('Work scope','工作范围'))}</h3><ul>${p.items.map(i=>`<li>${t(i)}</li>`).join('')}</ul><div class="compact-links">${p.related.map(id=>link(id,PAGES[id].title,'textlink')).join('')}</div></div></details>`;
}
function renderPortfolio(){
 const region=['us','global'].includes(params.get('region'))?params.get('region'):'all';
 const sector=Object.hasOwn(SECTOR_LABELS,params.get('sector'))?params.get('sector'):'all';
 const matches=p=>(region==='all'||p.region===region)&&(sector==='all'||p.sectors.includes(sector));
 const featured=PROJECT_IDS.map(id=>({id,...PAGES[id]})).filter(matches);
 const compact=COMPACT_PROJECTS.filter(matches),archive=PROJECT_ARCHIVE.filter(matches);
 const total=featured.length+compact.length+archive.length;
 const controls=`<div class="portfolio-controls"><nav class="filters region-filters" aria-label="${t(L('Project region','项目地区'))}">${['all','us','global'].map(r=>`<a href="${href('projects',{region:r,sector})}" class="${region===r?'selected':''}" ${region===r?'aria-current="true"':''}>${t(UI[r])}</a>`).join('')}</nav><details class="sector-disclosure" open><summary>${t(L('Project type','项目类型'))}: ${t(SECTOR_LABELS[sector])}</summary><nav class="filters sector-filters" aria-label="${t(L('Project type','项目类型'))}">${Object.entries(SECTOR_LABELS).map(([s,label])=>`<a href="${href('projects',{region,sector:s})}" class="${sector===s?'selected':''}" ${sector===s?'aria-current="true"':''}>${t(label)}</a>`).join('')}</nav></details><p class="portfolio-count">${t(L(total+' matching projects','共 '+total+' 个匹配项目'))}</p></div>`;
 return `<section class="section wrap portfolio-section">${controls}${featured.length?`<div class="portfolio-heading"><p class="eyebrow">${t(L('Selected projects','代表项目'))}</p><h2>${t(L('Explore the project details','了解项目详情'))}</h2></div><div class="portfolio-grid">${featured.map(p=>portfolioPhotoCard(p,true)).join('')}</div>`:''}${compact.length?`<div class="portfolio-heading"><p class="eyebrow">${t(UI.us)}</p><h2>${t(L('More U.S. project experience','更多美国项目经验'))}</h2><p>${t(L('Select a project to explore its work scope.','点击项目，展开查看工作范围。'))}</p></div><div class="compact-project-grid">${compact.map(portfolioCompactCard).join('')}</div>`:''}${archive.length?`<div class="portfolio-heading"><p class="eyebrow">${t(UI.global)}</p><h2>${t(L('More Group projects','更多集团项目'))}</h2></div><div class="portfolio-grid archive-grid" id="group-project-archive">${archive.map(p=>portfolioPhotoCard(p,false)).join('')}</div><div class="archive-load-controls" hidden><p class="archive-progress" role="status" aria-live="polite"></p><button class="button archive-load-more" type="button" aria-controls="group-project-archive">${t(L('Load more','加载更多'))}</button></div>`:''}${!total?`<div class="portfolio-empty"><h2>${t(L('No projects in this combination','该筛选组合下暂无项目'))}</h2>${link('projects',L('View all projects','查看全部项目'),'textlink')}</div>`:''}</section>`;
}

function initPortfolio(){
 const section=document.querySelector('.portfolio-section');
 if(!section)return;
 const state=readPortfolioState(params,location.hash);
 const compact=[...section.querySelectorAll('.compact-project')];
 const cards=[...section.querySelectorAll('.archive-grid [data-project-id]')];
 const controls=section.querySelector('.archive-load-controls');
 const more=section.querySelector('.archive-load-more');
 const progress=section.querySelector('.archive-progress');
 const disclosure=section.querySelector('.sector-disclosure');
 const mobile=matchMedia('(max-width: 700px)');
 let shown=state.archiveVisible,activeAnchor=state.anchor,mobileFiltersOpen=false;
 const targetIndex=cards.findIndex(card=>card.id===activeAnchor);
 if(targetIndex>=shown)shown=Math.ceil((targetIndex+1)/6)*6;

 function syncLanguages(){
  const opened=compact.filter(el=>el.open).map(el=>el.id);
  document.querySelectorAll('a[data-lang]').forEach(a=>{
   const query=new URLSearchParams(location.search);
   query.set('lang',a.dataset.lang);query.set('rev','20261016r8');
   if(opened.length)query.set('open',opened.join(','));else query.delete('open');
   if(cards.length&&shown>6)query.set('shown',String(Math.min(shown,cards.length)));else query.delete('shown');
   const anchor=activeAnchor&&document.getElementById(activeAnchor)?'#'+encodeURIComponent(activeAnchor):'';
   a.href='projects.html?'+query+anchor;
  });
 }
 function updateArchive(){
  cards.forEach((card,i)=>card.hidden=mobile.matches&&i>=shown);
  if(controls){
   controls.hidden=!mobile.matches;
   const count=Math.min(shown,cards.length);
   progress.textContent=tr(L(`Showing ${count} of ${cards.length} Group projects`,`已显示 ${count} / ${cards.length} 个集团项目`));
   more.hidden=count>=cards.length;
  }
  syncLanguages();
 }
 disclosure.open=!mobile.matches;
 disclosure.addEventListener('toggle',()=>{if(mobile.matches)mobileFiltersOpen=disclosure.open;});
 const openStates=new Map(compact.map(el=>[el.id,el.open]));
 compact.forEach(el=>el.addEventListener('toggle',()=>{
  if(openStates.get(el.id)!==el.open){
   openStates.set(el.id,el.open);
   if(el.open)activeAnchor=el.id;
   else if(activeAnchor===el.id)activeAnchor=compact.find(item=>item.open)?.id||'';
  }
  syncLanguages();
 }));
 more?.addEventListener('click',()=>{
  const first=cards.find(card=>card.hidden);
  shown=Math.min(shown+6,cards.length);
  if(first)activeAnchor=first.id;
  updateArchive();
  if(first){first.focus({preventScroll:true});first.scrollIntoView({block:'start',behavior:'instant'});}
 });
 mobile.addEventListener('change',()=>{
  disclosure.open=mobile.matches?mobileFiltersOpen:true;
  updateArchive();
 });
 updateArchive();
 if(activeAnchor){
  const target=document.getElementById(activeAnchor);
  if(target)target.scrollIntoView({block:'start',behavior:'instant'});
 }
}
