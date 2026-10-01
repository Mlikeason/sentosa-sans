'use strict';

const translations = {
  en: {
    skip: 'Skip to content', navigation: 'Main navigation', navTry: 'Try it', navLanguages: 'Languages', navDownload: 'Download',
    heroEyebrow: 'A type family with a common rhythm', heroIntro: 'A little closer.<br>A world of expression.',
    heroDescription: 'Compact proportions, warm geometry and a shared voice for English, Vietnamese and Thai. Made for the words and numbers of everyday interfaces.', heroLink: 'Make yourself at home',
    tryLabel: 'TYPE TESTER', tryTitle: 'Put it into words.', tryIntro: 'A headline, a product name, a little everyday detail. Try your own words in either of our two weights.',
    sampleLanguage: 'Sample language', weight: 'Weight', size: 'Size', reset: 'Reset sample', sampleTextLabel: 'Editable type specimen', testerHint: 'Click the text to make it yours.', fallbackHint: 'Some characters use your device’s fallback font.', priceFigures: 'Price figures', tabularFigures: 'Align numbers',
    fontError: 'The font could not be loaded. Please refresh to see Sentosa Sans.',
    characterLabel: 'A CLOSER LOOK', characterTitle: 'Quiet details. Distinct character.', regularCaption: 'Single-storey forms. A relaxed, familiar rhythm.', boldCaption: 'Rounded figures. A little presence in every price.',
    languagesLabel: 'IN GOOD COMPANY', languagesTitle: 'One family.<br>Three languages.', languagesIntro: 'English, Vietnamese and Thai share a family, with room for each language to be itself. The Latin character set also supports everyday Malay, Indonesian and Filipino text.',
    numbersLabel: 'LOCAL BY NATURE', numbersTitle: 'Numbers that<br>feel at home.', numbersIntro: 'Currency signs with their own character. Proportional figures for natural spacing, tabular figures when the numbers need to line up.',
    singapore: 'Singapore', malaysia: 'Malaysia', indonesia: 'Indonesia', vietnam: 'Vietnam', philippines: 'Philippines', thailand: 'Thailand', priceNote: 'Illustrative amounts, shown in local formats.',
    downloadLabel: 'TAKE IT FROM HERE', downloadTitle: 'Your next words,<br>in Sentosa Sans.', downloadIntro: 'Free to use, embed and modify under the Open Font License. No subscription required.', downloadButton: 'Download Sentosa Sans',
    footerLine: 'A shared voice. Room to be yourself.', creditsLead: 'Based on', creditsAnd: 'and', creditsLicense: 'Released under', backTop: 'Back to top'
  },
  zh: {
    skip: '跳至正文', navigation: '主导航', navTry: '试用字体', navLanguages: '多语言', navDownload: '下载',
    heroEyebrow: '相通的节奏，各自的表达', heroIntro: '字形更紧凑。<br>表达更开阔。',
    heroDescription: '紧凑的比例，温和的几何形态。让英语、越南语与泰语拥有相通的气质，融入日常界面中的每一句话、每一个数字。', heroLink: '从你的文字开始',
    tryLabel: '字体试用', tryTitle: '写下你的表达。', tryIntro: '一句标题、一个商品名，或是一段日常文字。用 Regular 与 Bold，试试你的内容。',
    sampleLanguage: '样文语言', weight: '字重', size: '字号', reset: '还原样文', sampleTextLabel: '可编辑的字体样文', testerHint: '点击文字，写下你想说的。', fallbackHint: '部分字符由设备的备用字体显示。', priceFigures: '价格数字', tabularFigures: '数字等宽对齐',
    fontError: '字体未能加载，请刷新页面查看 Sentosa Sans。',
    characterLabel: '细看字形', characterTitle: '细节安静，个性鲜明。', regularCaption: '单层 a、g，自然亲近的阅读节奏。', boldCaption: '圆润的数字，让价格也有自己的表情。',
    languagesLabel: '语言相伴', languagesTitle: '一个家族。<br>三种语言。', languagesIntro: '英语、越南语与泰语共享一个家族，也保有各自的表达。拉丁字符集同时支持日常马来语、印尼语与菲律宾语文本。',
    numbersLabel: '在地表达', numbersTitle: '数字之间，<br>也有亲切感。', numbersIntro: '有个性的货币符号。比例数字带来自然间距；需要纵向对齐时，切换等宽数字。',
    singapore: '新加坡', malaysia: '马来西亚', indonesia: '印尼', vietnam: '越南', philippines: '菲律宾', thailand: '泰国', priceNote: '示例金额，按各地习惯呈现。',
    downloadLabel: '从这里开始', downloadTitle: '下一次表达，<br>用 Sentosa Sans。', downloadIntro: '以开放字体许可证发布，可免费使用、嵌入与修改，无需订阅。', downloadButton: '下载 Sentosa Sans',
    footerLine: '相通的声音，自在的表达。', creditsLead: '基于', creditsAnd: '与', creditsLicense: '采用', backTop: '回到顶部'
  }
};

const samples = { en: 'Good things,\nevery day.', vi: 'Điều tốt đẹp\nmỗi ngày.', th: 'สิ่งดี ๆ\nในทุกวัน' };
const $ = id => document.getElementById(id);
const state = { ui: 'en', language: 'en', drafts: {...samples} };
// Shared Unicode coverage of the released Regular and Bold font files.
const characterRanges = [[13,13],[32,126],[160,263],[266,275],[278,283],[286,289],[294,299],[302,305],[313,314],[317,318],[321,324],[327,328],[332,333],[336,341],[344,347],[350,363],[366,382],[416,417],[431,432],[486,487],[710,711],[728,732],[768,772],[774,780],[786,786],[795,795],[803,803],[806,808],[3585,3642],[3647,3675],[7712,7713],[7808,7813],[7838,7838],[7840,7929],[8211,8212],[8216,8218],[8220,8222],[8224,8226],[8230,8230],[8240,8240],[8249,8250],[8260,8260],[8304,8304],[8308,8313],[8320,8329],[8363,8364],[8369,8369],[8482,8482],[8539,8542],[8722,8722],[8725,8725],[8776,8776],[8800,8800],[8804,8805],[9676,9676]];
function isCovered(character) {
  const code = character.codePointAt(0);
  return /\s/u.test(character) || characterRanges.some(([first,last]) => code >= first && code <= last);
}
function updateHint() {
  const missing = [...$('sample-text').value].some(character => !isCovered(character) && ![...character.normalize('NFD')].every(isCovered));
  $('tester-hint').textContent = translations[state.ui][missing ? 'fallbackHint' : 'testerHint'];
}

function setUILanguage(language) {
  state.ui = language;
  const copy = translations[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = copy[element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
  });
  $('ui-language').innerHTML = language === 'en' ? '中文 <span aria-hidden="true">↗</span>' : 'EN <span aria-hidden="true">↗</span>';
  $('ui-language').lang = language === 'en' ? 'zh-CN' : 'en';
  $('ui-language').setAttribute('aria-label', language === 'en' ? '切换为中文界面' : 'Switch interface to English');
  document.title = language === 'en' ? 'Sentosa Sans — A type family for Southeast Asian interfaces' : 'Sentosa Sans — 面向东南亚界面的字体家族';
  updateHint();
}

function updateTester() {
  const size = Number($('sample-size').value);
  const tabular = $('tabular-figures').checked;
  const specimen = $('sample-text');
  specimen.style.fontWeight = $('sample-weight').value;
  specimen.style.fontSize = `${size}px`;
  specimen.style.fontFeatureSettings = `"ss01" ${$('price-figures').checked ? 1 : 0}, "tnum" ${tabular ? 1 : 0}, "pnum" ${tabular ? 0 : 1}`;
  $('size-value').textContent = `${size} px`;
  $('sample-size').setAttribute('aria-valuetext', `${size} px`);
  updateHint();
}

$('ui-language').addEventListener('click', () => setUILanguage(state.ui === 'en' ? 'zh' : 'en'));
$('sample-language').addEventListener('change', () => {
  state.drafts[state.language] = $('sample-text').value;
  state.language = $('sample-language').value;
  $('sample-text').value = state.drafts[state.language];
  $('sample-text').lang = state.language;
  $('sample-text').scrollTop = 0;
  updateHint();
});
$('sample-text').addEventListener('input', () => { state.drafts[state.language] = $('sample-text').value; updateHint(); });
$('reset-sample').addEventListener('click', () => {
  state.drafts[state.language] = samples[state.language];
  $('sample-text').value = samples[state.language];
  $('sample-text').scrollTop = 0;
  updateHint();
});
['sample-weight', 'sample-size', 'price-figures', 'tabular-figures'].forEach(id => $(id).addEventListener('input', updateTester));

const markets = [
  {id:'SG', locale:'en-SG', currency:'SGD', digits:2, amount:69.90},
  {id:'MY', locale:'ms-MY', currency:'MYR', digits:2, amount:69.90},
  {id:'ID', locale:'id-ID', currency:'IDR', digits:0, amount:699000},
  {id:'VN', locale:'vi-VN', currency:'VND', digits:0, amount:699000},
  {id:'PH', locale:'en-PH', currency:'PHP', digits:2, amount:699},
  {id:'TH', locale:'th-TH', currency:'THB', digits:2, amount:699}
];
markets.forEach(market => {
  document.querySelector(`[data-market="${market.id}"] .market-price`).textContent = new Intl.NumberFormat(market.locale, {
    style:'currency', currency:market.currency, numberingSystem:'latn', minimumFractionDigits:market.digits, maximumFractionDigits:market.digits
  }).format(market.amount);
});

if (window.matchMedia('(max-width: 600px)').matches) $('sample-size').value = '46';
updateTester();
Promise.all([400,700].map(weight => document.fonts.load(`${weight} 20px "Sentosa Sans"`, 'Sentosa 069 Điều tốt đẹp สิ่งดี ๆ ฿ ₫'))).then(faces => {
  if (faces.some(group => group.length === 0 || group.some(face => face.status !== 'loaded'))) throw new Error('Font unavailable');
  document.documentElement.classList.add('fonts-ready');
}).catch(() => { $('font-error').hidden = false; });
