// opening 页面布局。正文见同目录对应的内容文件。
function renderPosition() {
 let body='';
  body=`<section class="section wrap job-detail"><div class="job-metadata"><span>${t(L('Reports to','汇报对象'))}: <strong>${t(page.reportsTo)}</strong></span><span>${t(L('Project engineering team','项目工程团队'))}</span><span class="job-location">${t(L('Work location','工作地点'))}: <strong>${t(page.location)}</strong></span></div>${jobSection(L('Key Responsibilities','主要职责'),page.responsibilities)}${jobSection(L('Requirements & Qualifications','任职要求'),page.requirements)}<div class="application-status"><h2>${t(L('Applications','申请方式'))}</h2><p>${t(applicationNote)}</p>${applyLink(pageId)}</div>${link('careers',L('Back to all positions','返回全部职位'),'textlink')}</section>`;
  return body;
}
