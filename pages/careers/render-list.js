// careers 页面布局。正文见同目录对应的内容文件。
function renderCareerList() {
 let body='';
  body=`<section class="section wrap job-list-section"><div class="jobs-heading"><div><p class="eyebrow">${t(L('Project engineering team','项目工程团队'))}</p><h2>${t(L('Explore our positions','招聘职位'))} <span>04</span></h2></div><p>${t(applicationNote)}</p></div><div class="job-list">${JOB_IDS.map(jobCard).join('')}</div></section>`;
  return body;
}
