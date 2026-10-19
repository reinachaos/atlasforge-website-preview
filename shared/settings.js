// 全站公共文字与导航顺序。页面正文请改 pages/ 对应文件。
const L = (en, zh) => ({en, zh});
const UI = {
  "home": {
    "en": "Home",
    "zh": "首页"
  },
  "overview": {
    "en": "Overview",
    "zh": "栏目总览"
  },
  "about": {
    "en": "About Us",
    "zh": "关于我们"
  },
  "services": {
    "en": "Services",
    "zh": "工程服务"
  },
  "projects": {
    "en": "Projects",
    "zh": "项目案例"
  },
  "careers": {
    "en": "Careers",
    "zh": "加入我们"
  },
  "contact": {
    "en": "Contact",
    "zh": "联系我们"
  },
  "more": {
    "en": "Explore",
    "zh": "了解更多"
  },
  "related": {
    "en": "Explore related pages",
    "zh": "相关内容"
  },
  "contactTitle": {
    "en": "Let’s discuss your project.",
    "zh": "一起讨论你的项目"
  },
  "contactAction": {
    "en": "Contact our team",
    "zh": "联系团队"
  },
  "all": {
    "en": "All projects",
    "zh": "全部项目"
  },
  "us": {
    "en": "U.S. projects",
    "zh": "美国项目"
  },
  "global": {
    "en": "Group international projects",
    "zh": "集团国际项目"
  },
  "viewProject": {
    "en": "View project",
    "zh": "查看项目"
  },
  "menu": {
    "en": "Menu",
    "zh": "菜单"
  },
  "close": {
    "en": "Close menu",
    "zh": "关闭菜单"
  },
  "preview": {
    "en": "INDEPENDENT DESIGN PREVIEW · Applications via Airtable",
    "zh": "独立设计预览 · 通过 Airtable 提交求职申请"
  },
  "footer": {
    "en": "Industrial construction · MEP · Cleanrooms",
    "zh": "工业建设 · 机电工程 · 洁净室"
  },
  "note": {
    "en": "Company source material informs this preview. Project attribution, current status and publication details require confirmation before release.",
    "zh": "本预览依据公司资料编排。项目归属、当前状态和公开口径需在正式发布前确认。"
  },
  "scope": {
    "en": "Documented scope",
    "zh": "资料列明的工作范围"
  },
  "location": {
    "en": "Location",
    "zh": "项目地点"
  },
  "source": {
    "en": "Source",
    "zh": "资料来源"
  },
  "photos": {
    "en": "Project photographs",
    "zh": "项目现场照片"
  },
  "backProjects": {
    "en": "Back to projects",
    "zh": "返回项目列表"
  },
  "companyName": {
    "en": "Atlasforge Construction LLC",
    "zh": "美国阿特拉斯建设责任有限公司"
  },
  "phone": {
    "en": "+1 (718) 559-9260",
    "zh": "+1 (718) 559-9260"
  }
};

const MENU = {
  "about": [
    "about",
    "us-operations",
    "safety-quality"
  ],
  "services": [
    "services",
    "industrial-construction",
    "mep",
    "cleanrooms",
    "data-centers",
    "design-coordination",
    "procurement"
  ],
  "projects": [
    "projects",
    "projects?region=us",
    "projects?region=global"
  ]
};

const SERVICE_IDS = [
  "industrial-construction",
  "mep",
  "cleanrooms",
  "data-centers",
  "design-coordination",
  "procurement"
];

const PROJECT_IDS = [
  "terahop",
  "foxlink",
  "delta",
  "kunshan",
  "bw-logistics",
  "neway-valve",
  "foxlink-da-nang"
];

const JOB_IDS = [
  "mep-engineer",
  "structural-engineer",
  "mep-engineering-intern",
  "structural-engineering-intern"
];
