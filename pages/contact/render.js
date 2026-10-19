// 联系我们布局及电话／邮箱链接；标题与地址在 contact.js。
function renderContact() {
 let body='';
  body=`<section class="section wrap"><div class="contact-card"><h2>${t(page.blocks[0].title)}</h2><p>${t(page.blocks[0].body)}</p><dl class="contact-details"><div><dt>${t(L('Phone','电话'))}</dt><dd>${phoneLink()}</dd></div><div><dt>${t(L('Address','地址'))}</dt><dd><address>${t(page.blocks[1].body)}</address></dd></div><div><dt>${t(L('Email','邮箱'))}</dt><dd><a href="mailto:contactus@afconstruct.com">contactus@afconstruct.com</a></dd></div></dl></div></section>`;
  return body;
}
