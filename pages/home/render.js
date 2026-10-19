// 首页渲染及链接、图片替换规则；常规文字请改 content.js。
function renderHomepage() {
 main.innerHTML=HOME_HTML.replace(/<img src="assets\/([^"]+)" alt="([^"]*)">/g,(_,file,alt)=>image(file,alt,'',file==='image20.jpeg'));
 main.querySelectorAll('[data-t]').forEach(el=>el.textContent=HOME_COPY[lang][el.dataset.t]);
 main.querySelectorAll('a[href="#projects"]').forEach(a=>a.href=href('projects'));
 main.querySelectorAll('a[href="#contact"]').forEach(a=>a.href=href('contact'));
 const about=main.querySelector('#about');about.querySelector('div:last-child').insertAdjacentHTML('beforeend',link('about',UI.more,'textlink home-more'));
 const serviceRoutes=['industrial-construction','mep','cleanrooms','design-coordination'];
 main.querySelectorAll('#services article').forEach((article,i)=>{const a=document.createElement('a');a.className='home-card-link';a.href=href(serviceRoutes[i]);a.innerHTML=article.innerHTML+`<span class="textlink">${t(UI.more)} ↗</span>`;article.replaceChildren(a)});
 main.querySelector('#services .topline').insertAdjacentHTML('beforeend',link('services',L('All services','全部服务','Todos los servicios'),'textlink'));
 main.querySelectorAll('#projects article').forEach((article,i)=>{const a=document.createElement('a');a.className='home-card-link';a.href=href(PROJECT_IDS[i]);a.innerHTML=article.innerHTML+`<span class="textlink">${t(UI.viewProject)} ↗</span>`;article.replaceChildren(a)});
 main.querySelector('#projects .topline>.textlink').outerHTML=link('projects',UI.all,'textlink');
 main.querySelector('#approach .wrap').insertAdjacentHTML('beforeend',link('safety-quality',PAGES['safety-quality'].title,'textlink light-link'));
 main.querySelector('#careerButton').outerHTML=link('careers',UI.careers,'button');
 main.querySelector('#contact .contact-main>div').insertAdjacentHTML('beforeend',`<p class="contact-phone">${t(L('Phone','电话'))}: ${phoneLink()}</p>`);
 const alts=[L('Foxlink Texas factory exterior','Foxlink Texas 厂房外景','Exterior de la fábrica de Foxlink Texas'),L('Terahop site personnel','Terahop 项目现场人员','Personal de obra de Terahop'),L('Terahop MEP installation','Terahop 机电安装','Instalaciones MEP de Terahop'),PAGES.kunshan.title,L('Company office team','公司资料中的办公团队','Equipo de oficina en la documentación'),PAGES.terahop.title,PAGES.foxlink.title,PAGES.delta.title,L('Foxlink project team from the company presentation','公司宣传册中的 Foxlink 项目团队','Equipo del proyecto Foxlink en la presentación')];
 main.querySelectorAll('img').forEach((img,i)=>img.alt=tr(alts[i]));
 main.querySelector('#projects').insertAdjacentHTML('afterend',renderGroupClients());
}
