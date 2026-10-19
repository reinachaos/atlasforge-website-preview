// video 页面布局。正文见同目录对应的内容文件。
function renderDataCenters() {
 let body='';
  body=`<section class="section wrap video-section"><div class="video-heading"><h2>Atlasforge</h2><span>02:51</span></div><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/sBuXz2pN5uE?rel=0&amp;playsinline=1&amp;hl=${lang==='zh'?'zh-CN':'en'}" title="${t(L('Atlasforge — Data Centers video','Atlasforge — 数据中心视频'))}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="video-caption"><span>${t(L('Atlasforge · Data Centers','Atlasforge · 数据中心'))}</span><a class="textlink" href="https://youtu.be/sBuXz2pN5uE" target="_blank" rel="noopener noreferrer">${t(L('Watch on YouTube','在 YouTube 观看'))} ↗</a></div></section>`;
  body=`<section class="section wrap data-center-overview">${blocks(page.blocks)}</section>`+body;
  return body;
}
