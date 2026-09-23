import { destinations, services, properties, siteImages, ui } from './content.js';
import { OWNER_CONFIG, brandName, brandByline, brandTitle, BRAND } from './config.js';
import { getCollectionProperties, getPropertyBySlug } from './data/properties.js';
import { getCollectionPrivateJets, getPrivateJetBySlug } from './data/privateJets.js';
import { getCollectionYachts, getYachtBySlug } from './data/yachts.js';
import { getCollectionExperiences, getExperienceBySlug } from './data/experiences.js';
import { renderPropertyCardList } from './components/propertyCard.js';
import { renderCollectionCardList } from './components/collectionCard.js';
import { renderPropertyModalShell, renderPropertyModalContent } from './components/propertyModal.js';
import { renderCollectionModalContent } from './components/collectionModal.js';
import {
  createEmptyFilters,
  getFilterOptions,
  filterProperties,
  filtersAreActive,
  renderPropertyFilters,
  renderFilterEmptyState,
  formatFilterTriggerLabel
} from './components/propertyFilters.js';

const app = document.querySelector('#app');
const BASE = (() => {
  const configured = document.querySelector('meta[name="app-base"]')?.content.replace(/\/$/, '') || '';
  return configured && location.pathname.startsWith(configured) ? configured : '';
})();
const pathWithoutBase = () => {
  let path = location.pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || '/';
  return path;
};
const isArabic = () => {
  const path = pathWithoutBase();
  return path === '/ar' || path.startsWith('/ar/');
};
const lang = () => isArabic() ? 'ar' : 'en';
const rootPath = (path = '/') => {
  const localized = isArabic() ? `/ar${path === '/' ? '' : path}` : path;
  return `${BASE}${localized}`;
};
const stripLang = () => {
  let path = pathWithoutBase();
  if (isArabic()) path = path.slice(3) || '/';
  return path;
};
const whatsappHref = (context = '') => {
  const greeting = `Hello ${brandName()}, I would like to enquire about ${context}.`;
  return `https://wa.me/${OWNER_CONFIG.whatsappNumber.replace(/\D/g,'')}${context ? `?text=${encodeURIComponent(greeting)}` : ''}`;
};
const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const pick = (en, ar) => isArabic() ? ar : en;

const arMap = new Map(Object.entries({
  "North & South Malé Atolls":"أتول ماليه الشمالية والجنوبية","Raa Atoll":"أتول را","Noonu Atoll":"أتول نونو","Baa Atoll":"أتول با",
  "Overwater pool villas":"فلل فوق الماء مع مسابح","Beach residences":"مساكن شاطئية","Private-island buyouts":"حجز جزيرة خاصة بالكامل",
  "House-reef snorkelling":"الغطس في الشعاب المرجانية","Private sandbank dining":"عشاء خاص على ضفة رملية","Marine discovery":"استكشاف الحياة البحرية","Restorative wellness":"تجارب عافية وتجدد",
  "Beachfront residences":"مساكن على الشاطئ","Countryside estates":"منازل ريفية خاصة","Ski and lake homes":"منازل للتزلج والبحيرات","Design-led city residences":"مساكن حضرية مميزة التصميم",
  "Food and culture":"الطعام والثقافة","Wellness and renewal":"العافية والتجدد","Ocean and nature":"البحر والطبيعة","Celebrations and family travel":"الاحتفالات والسفر العائلي",
  "Beach resorts":"منتجعات شاطئية","Family villas":"فلل عائلية","Private sailing":"إبحار خاص","Nature walks":"جولات في الطبيعة","Art and architecture":"الفن والعمارة","Food and wine":"الطعام وفنون المائدة",
  "Historic hotels":"فنادق تاريخية","Private villas":"فلل خاصة","Remote design retreats":"ملاذات نائية مميزة التصميم","Private time on the water":"وقت خاص على الماء"
}));
const localItem = s => isArabic() ? (arMap.get(s) || s) : s;

const propertyHelpers = () => ({ rootPath, esc, pick, whatsappHref, designLabel: ui[lang()].design });

let modalScrollY = 0;
let modalGalleryIndex = 0;
let modalProperty = null;
let modalKind = 'property';
let lastFocusEl = null;
let modalKeyHandler = null;
let villaProperties = [];
let villaFilterState = createEmptyFilters();
let villaFilterOutsideHandler = null;
let villaFilterKeyHandler = null;
let jetItems = [];
let yachtItems = [];
let experienceItems = [];

function navigate(path){ history.pushState({},'',path); window.scrollTo({top:0,behavior:'instant'}); render(); }
document.addEventListener('click', e => {
  const link = e.target.closest('a[data-link]');
  if(!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault(); navigate(link.getAttribute('href'));
});
window.addEventListener('popstate', render);

function logo(){
  const by = brandByline(isArabic());
  const byline = by ? `<small>${esc(by)}</small>` : '';
  return `<a class="brand" data-link href="${rootPath('/')}">${esc(brandName(isArabic()))}${byline}</a>`;
}
const navLinks = () => [
  ['/destinations',ui[lang()].nav[0]],['/collection',ui[lang()].nav[1]],['/services/private-villas',ui[lang()].nav[2]],['/services/private-aviation',ui[lang()].nav[3]],['/services/private-yachts',ui[lang()].nav[4]],['/services/experiences',ui[lang()].nav[5]],['/about',ui[lang()].nav[6]]
];
function header(){
  return `<header class="site-header" id="header"><div class="head-top"><span>${ui[lang()].division}</span><button class="lang" id="langSwitch" aria-label="${pick('Switch to Arabic','التبديل إلى الإنجليزية')}">${pick('EN | عربي','English | عربي')}</button></div><div class="header-inner container">${logo()}<nav class="nav" aria-label="${pick('Primary navigation','التنقل الرئيسي')}">${navLinks().map(([h,l])=>`<a data-link href="${rootPath(h)}">${l}</a>`).join('')}</nav><div class="head-actions"><a class="button header-cta" href="${whatsappHref()}">${ui[lang()].design}</a><button class="icon-btn menu-btn" id="menuOpen" aria-label="${pick('Open menu','فتح القائمة')}">☰</button></div></div></header>`;
}
function drawer(){return `<aside class="mobile-drawer" id="drawer" aria-hidden="true"><div class="drawer-top">${logo()}<button class="icon-btn" id="menuClose" aria-label="${pick('Close menu','إغلاق القائمة')}">✕</button></div><nav class="drawer-links">${navLinks().map(([h,l])=>`<a data-link href="${rootPath(h)}">${l}</a>`).join('')}</nav><div class="drawer-bottom"><a class="button" href="${whatsappHref()}">${ui[lang()].design}</a><button class="lang" id="drawerLang">${pick('العربية','English')}</button></div></aside>`}
function footer(){return `<footer class="footer"><div class="container"><div class="footer-grid"><div>${logo()}<p>${pick('Extraordinary destinations, private residences and seamless journeys, thoughtfully designed around you.','وجهات استثنائية ومساكن خاصة ورحلات سلسة، مصممة بعناية من أجلكم.')}</p></div><nav class="footer-nav" aria-label="${pick('Footer navigation','روابط التذييل')}">${[['/destinations',pick('Destinations','الوجهات')],['/collection',pick('The Collection','المجموعة')],['/services/private-islands',pick('Private Islands','الجزر الخاصة')],['/services/private-villas',pick('Private Villas','الفلل الخاصة')],['/services/private-aviation',pick('Private Aviation','الطيران الخاص')],['/services/private-yachts',pick('Private Yachts','اليخوت الخاصة')],['/services/experiences',pick('Experiences','التجارب')],['/about',pick('About','من نحن')]].map(([h,l])=>`<a data-link href="${rootPath(h)}">${l}</a>`).join('')}</nav><div><h4>${pick('Begin with a conversation.','ابدأوا بمحادثة.')}</h4><a class="button" href="${whatsappHref()}">${ui[lang()].design} →</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${esc(brandName().toUpperCase())}</span><div><a data-link href="${rootPath('/privacy')}">${pick('Privacy','الخصوصية')}</a><a data-link href="${rootPath('/terms')}">${pick('Terms','الشروط')}</a></div></div></div></footer>`}
function shell(content, pageClass=''){return `${header()}${drawer()}<main id="main" class="${pageClass}">${content}</main>${footer()}${renderPropertyModalShell()}<a class="contact-float" href="${whatsappHref()}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg class="whatsapp-logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.437-9.884 9.89-9.884 2.64 0 5.122 1.03 6.986 2.897a9.837 9.837 0 0 1 2.893 6.988c-.002 5.45-4.438 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654a11.9 11.9 0 0 0 5.684 1.447h.005c6.554 0 11.89-5.335 11.893-11.89a11.821 11.821 0 0 0-3.479-8.415"/></svg></a>`}

const card = (title,desc,image,href,large=false) => `<a class="image-card ${large?'feature-card':''}" data-link href="${rootPath(href)}"><img src="${image}" alt="${esc(title)}" loading="lazy" width="900" height="700"><div class="image-card-content"><h3>${title}</h3><p>${desc}</p><span class="eyebrow">${pick('Explore →','اكتشف ←')}</span></div></a>`;
const legacyPropertyCard = p => `<a class="property-card" data-link href="${rootPath(`/collection/${p.slug}`)}"><img src="${p.image}" alt="${esc(p.title)} — illustrative Maldives imagery" loading="lazy" width="700" height="470"><h3>${p.title}</h3><p>${p.line}</p></a>`;

function home(){
 const small = ['seychelles','mauritius','greece','italy','france','switzerland'].map(s=>destinations.find(d=>d.slug===s));
 return shell(`<section class="hero" style="background-image:url('${siteImages.hero}')"><div class="container"><div class="hero-content"><div class="hero-kicker eyebrow"><span>${pick('Extraordinary Destinations','وجهات استثنائية')}</span><span>${pick('Private Residences','مساكن خاصة')}</span><span>${pick('Exceptional Experiences','تجارب استثنائية')}</span></div><h1>${pick('Travel,<br>Exceptionally Curated.','سفرٌ<br>مصمم باستثنائية.')}</h1><p>${pick('Extraordinary destinations, private residences and seamless journeys, thoughtfully designed around you.','وجهات استثنائية ومساكن خاصة ورحلات سلسة، مصممة بعناية من أجلكم.')}</p><a class="button" href="${whatsappHref()}">${ui[lang()].design} →</a><div class="hero-destinations">${['maldives','seychelles','mauritius','dubai'].map(s=>{const x=destinations.find(d=>d.slug===s);return `<a data-link href="${rootPath(`/destinations/${s}`)}">${isArabic()?x.arTitle:x.title}</a>`}).join('<span>·</span>')}</div></div></div><button class="scroll-cue" id="scrollCue"><span class="scroll-circle">↓</span>${pick('Scroll to explore','مرر للاستكشاف')}</button></section>
 <section class="section intro" id="intro"><div class="container intro-grid"><div><h2>${pick('Beyond Luxury.<br>Entirely Personal.','أبعد من الفخامة.<br>شخصية بالكامل.')}</h2><p><strong>${esc(brandName(isArabic()))}</strong> ${pick('creates exceptional journeys for travellers who expect more than a destination.','تصنع رحلات استثنائية للمسافرين الذين يتطلعون إلى ما هو أبعد من مجرد وجهة.')}</p><p>${pick('From private islands and remarkable villas to private aviation, yachts and rare experiences, every element is personally selected and seamlessly arranged around you.','من الجزر الخاصة والفلل المميزة إلى الطيران الخاص واليخوت والتجارب النادرة، يُختار كل تفصيل بعناية ويُرتب حولكم بسلاسة.')}</p><a class="text-link" data-link href="${rootPath('/jana-standard')}">${pick('Discover our standard →','اكتشفوا معيارنا ←')}</a></div><img class="intro-photo" src="${siteImages.introStory}" alt="A private infinity pool overlooking an open ocean horizon" loading="lazy" width="1000" height="850"><div class="handwritten">More Than<br>a Journey<small>${pick("It's a personal experience","إنها تجربة شخصية")}</small></div></div></section>
 <section class="section explore"><div class="container"><div class="section-title"><div class="rule-title"><h2>${pick('Explore Our World','اكتشفوا عالمنا')}</h2></div><p>${pick('Exceptional places. Extraordinary possibilities.','أماكن استثنائية. إمكانات غير محدودة.')}</p></div><div class="service-grid">${services.slice(0,4).map(s=>card(isArabic()?s.arTitle:s.title,isArabic()?({"private-islands":"عالمكم. لكم وحدكم.","private-villas":"منازل استثنائية في أماكن استثنائية.","private-aviation":"العالم وفق جدولكم.","private-yachts":"منظور مختلف للعالم."}[s.slug]):s.tagline,s.image,`/services/${s.slug}`)).join('')}</div></div></section>
 <section class="section destinations"><div class="container"><div class="section-title"><div class="rule-title"><h2>${pick('Featured Destinations','وجهات مختارة')}</h2></div><p>${pick('Iconic places. Remarkable experiences.','أماكن أيقونية. تجارب استثنائية.')}</p></div><div class="destination-layout">${card(pick('Maldives','المالديف'),pick('Private islands. Extraordinary residences.<br>Endless horizons.','جزر خاصة. مساكن استثنائية.<br>آفاق بلا نهاية.'),siteImages.maldives,'/destinations/maldives',true)}<div class="small-grid">${small.map(x=>card(isArabic()?x.arTitle:x.title,isArabic()?x.arTagline:x.tagline,x.image,`/destinations/${x.slug}`)).join('')}</div></div><div class="destination-links"><div>${['turkey','dubai','thailand','bali'].map(s=>{let x=destinations.find(d=>d.slug===s);return `<a data-link href="${rootPath(`/destinations/${s}`)}">${isArabic()?x.arTitle:x.title}</a>`}).join('<span>·</span>')}</div><a class="text-link" data-link href="${rootPath('/destinations')}">${pick('Explore all destinations →','اكتشفوا جميع الوجهات ←')}</a></div></div></section>
 <section class="section collection"><div class="container"><div class="section-title"><div class="rule-title"><h2>${pick('The Collection','المجموعة')}</h2></div><p>${pick('Places we believe are worth travelling for.','أماكن نؤمن أنها تستحق السفر من أجلها.')}</p></div><div class="carousel-wrap"><button class="carousel-btn prev" id="prevProperty" aria-label="Previous properties">←</button><div class="property-row" id="propertyRow">${properties.map(legacyPropertyCard).join('')}</div><button class="carousel-btn next" id="nextProperty" aria-label="Next properties">→</button></div><div class="collection-cta"><a class="button dark" data-link href="${rootPath('/collection')}">${pick('Discover the collection →','اكتشفوا المجموعة ←')}</a></div></div></section>`);
}

const breadcrumbs = (current,parentHref='/') => `<div class="breadcrumbs"><a data-link href="${rootPath('/')}">${pick('Home','الرئيسية')}</a> / ${parentHref!=='/'?`<a data-link href="${rootPath(parentHref)}">${parentHref.includes('collection')?pick('Collection','المجموعة'):parentHref.includes('service')?pick('Services','الخدمات'):pick('Destinations','الوجهات')}</a> / `:''}${current}</div>`;
function pageHero(title,tagline,image,parent,extraClass=''){return `<section class="page-hero${extraClass?` ${extraClass}`:''}" style="background-image:url('${image}')"><div class="container">${breadcrumbs(title,parent)}<h1>${title}</h1><p>${tagline}</p></div></section>`}
function cta(prefill=''){return `<section class="cta-band"><h2>${pick('Begin your journey.','ابدأوا رحلتكم.')}</h2><p>${pick('Tell us what you are imagining. We will shape the details around you and confirm every proposed element before you travel.','شاركونا ما تتخيلونه، وسنصمم التفاصيل حولكم ونؤكد كل عنصر مقترح قبل السفر.')}</p><a class="button" href="${whatsappHref(prefill)}">${ui[lang()].design} →</a></section>`}
function janaTravelBridge(x){if(!x.janaTravelUrl)return'';const title=isArabic()?x.arTitle:x.title;return `<section class="editorial jana-travel-bridge"><div class="container lead-grid"><div class="eyebrow">JANA TRAVEL</div><div><p class="lead">${pick(`${title} is part of the broader JANA Travel destination ecosystem. This page offers a selective Luxury Collection introduction—when you are ready to explore further, continue into JANA’s dedicated destination guide.`,`${title} جزء من منظومة وجهات جنى ترافل الأوسع. تقدم هذه الصفحة مقدمة تحريرية انتقائية من المجموعة الفاخرة—وعندما تكونون مستعدين للمزيد، تابعوا إلى دليل جنى المخصص للوجهة.`)}</p><a class="button dark" href="${x.janaTravelUrl}" target="_blank" rel="noopener">${pick(`Explore ${title} with JANA →`,`استكشفوا ${title} مع جنى ←`)}</a></div></div></section>`}

function destinationOverview(){return shell(`${pageHero(pick('Destinations','الوجهات'),pick('Iconic places. Remarkable experiences.','أماكن أيقونية. تجارب استثنائية.'),siteImages.greece)}<section class="editorial"><div class="container"><div class="lead-grid"><div class="eyebrow">${esc(brandName().toUpperCase())}</div><p class="lead">${pick('A considered collection of islands, cities, coastlines and landscapes—each chosen for the possibilities it can hold.','مجموعة مدروسة من الجزر والمدن والسواحل والمناظر، اختير كل منها لما يحمله من إمكانات.')}</p></div><div class="overview-grid" style="margin-top:70px">${destinations.map(x=>card(isArabic()?x.arTitle:x.title,isArabic()?x.arTagline:x.tagline,x.image,`/destinations/${x.slug}`)).join('')}</div></div></section>${cta()}`)}

function destinationPage(x){
 const title=isArabic()?x.arTitle:x.title, intro=isArabic()?x.arIntro:x.intro;
 return shell(`${pageHero(title,isArabic()?x.arTagline:x.tagline,x.image,'/destinations')}<section class="editorial"><div class="container"><div class="lead-grid"><div class="eyebrow">${pick('Our perspective','منظورنا')}</div><p class="lead">${intro}</p></div></div></section><section class="info-band"><div class="container info-columns"><div><h2>${pick('Places to explore','أماكن للاستكشاف')}</h2><ul class="clean-list">${x.places.map(i=>`<li>${localItem(i)}</li>`).join('')}</ul></div><div><h2>${pick('Ways to stay','أساليب الإقامة')}</h2><ul class="clean-list">${x.stays.map(i=>`<li>${localItem(i)}</li>`).join('')}</ul></div><div><h2>${pick('Ideas to consider','أفكار للرحلة')}</h2><ul class="clean-list">${x.ideas.map(i=>`<li>${localItem(i)}</li>`).join('')}</ul></div></div></section><section class="content-block"><div class="container content-grid"><div><div class="eyebrow">${pick('Illustrative only','مثال توضيحي')}</div><h2>${pick('An example journey','مثال لمسار الرحلة')}</h2><p class="notice">${pick('This is not a fixed package. Every stay, route and experience is subject to your brief and supplier confirmation.','هذا ليس برنامجاً ثابتاً. تخضع كل إقامة ومسار وتجربة لرغباتكم وتأكيد الموردين.')}</p><ol class="itinerary">${x.itinerary.map(i=>`<li>${isArabic()?'مرحلة مصممة بحسب إيقاعكم':i}</li>`).join('')}</ol></div><div><h2>${pick('Who it may suit','لمن تناسب الوجهة')}</h2><p>${isArabic()?'تلائم هذه الوجهة المسافرين الباحثين عن رحلة متوازنة تجمع بين الخصوصية والاكتشاف، مع اختيار الإقامة والإيقاع وفق اهتماماتهم.':x.suits}</p><h2>${pick('Planning considerations','اعتبارات التخطيط')}</h2><p>${isArabic()?'تتغير ترتيبات الدخول والمواسم ووسائل الانتقال. نتحقق من التفاصيل الحالية لكل مسافر قبل تأكيد أي عنصر.':x.planning}</p><a class="button dark" href="${whatsappHref(x.title)}">${pick(`Enquire about ${x.title} →`,'استفسروا عن هذه الوجهة ←')}</a></div></div></section>${janaTravelBridge(x)}<section class="editorial"><div class="container content-grid"><div><div class="section-title"><h2>${pick('A few questions','أسئلة شائعة')}</h2></div><div class="faq">${x.faqs.map(([q,a])=>`<details><summary>${isArabic()?'كيف تُخطط هذه الرحلة؟':q}</summary><p>${isArabic()?'نبدأ بوتيرة الرحلة واهتماماتكم وأسلوب الإقامة المفضل، ثم نؤكد كل عنصر مع المورد المختص.':a}</p></details>`).join('')}</div></div><div><h2>${pick('Continue exploring','تابعوا الاستكشاف')}</h2><p>${pick('Discover our private residences, aviation and yacht enquiry services, or begin with a conversation.','اكتشفوا خدمات المساكن الخاصة والطيران واليخوت، أو ابدأوا بمحادثة معنا.')}</p><a class="text-link" data-link href="${rootPath('/services/private-villas')}">${pick('Explore private villas →','اكتشفوا الفلل الخاصة ←')}</a></div></div></section>${cta(x.title)}`)}

function servicesOverview(){return shell(`${pageHero(pick('Travel, shaped around you.','سفرٌ مصمم حولكم.'),pick('Private access, thoughtful service and every detail considered.','خصوصية وخدمة مدروسة وعناية بكل تفصيل.'),siteImages.aviation)}<section class="editorial"><div class="container overview-grid">${services.map(s=>card(isArabic()?s.arTitle:s.title,s.tagline,s.image,`/services/${s.slug}`)).join('')}</div></section>${cta()}`)}

async function servicePage(s){
 const collectionDiscovery =
   s.slug === 'private-villas' ? await renderVillaDiscoverySection()
   : s.slug === 'private-aviation' ? await renderServiceCollectionSection('jet')
   : s.slug === 'private-yachts' ? await renderServiceCollectionSection('yacht')
   : s.slug === 'experiences' ? await renderServiceCollectionSection('experience')
   : '';
 const introCopy = isArabic()?'نبدأ بفهم احتياجاتكم الفعلية ثم ننسق الاستفسار مع موردين مختصين، مع تأكيد التوافر والتفاصيل قبل أي التزام.':s.intro;
 const introSection = s.slug === 'private-villas'
   ? `<section class="editorial editorial--villas-intro"><div class="container"><div class="lead-centered"><p class="lead">${introCopy}</p></div></div></section>`
   : `<section class="editorial"><div class="container"><div class="lead-grid"><div class="eyebrow">${pick('Personally arranged','ترتيب شخصي')}</div><p class="lead">${introCopy}</p></div></div></section>`;
 return shell(`${pageHero(isArabic()?s.arTitle:s.title,isArabic()?'خدمة مصممة بعناية وفق تفاصيل رحلتكم.':s.tagline,s.image,'/services',s.slug==='private-yachts'?'page-hero--yachts':'')}${introSection}${collectionDiscovery}<section class="info-band"><div class="container info-columns"><div><h2>${pick('Enquiry types','أنواع الاستفسار')}</h2><ul class="clean-list">${s.types.map(i=>`<li>${localItem(i)}</li>`).join('')}</ul></div><div><h2>${pick('What we consider','ما نأخذه في الاعتبار')}</h2><ul class="clean-list">${s.consider.map(i=>`<li>${localItem(i)}</li>`).join('')}</ul></div><div><h2>${pick('How it works','كيف تعمل الخدمة')}</h2><ul class="clean-list"><li>${pick('Share the essential brief','شاركونا التفاصيل الأساسية')}</li><li>${pick('We assess suitable options','نقيّم الخيارات المناسبة')}</li><li>${pick('You review a clear proposal','تراجعون عرضاً واضحاً')}</li><li>${pick('Nothing is assumed until confirmed','لا يُفترض شيء قبل التأكيد')}</li></ul></div></div></section><section class="content-block"><div class="container content-grid"><div><h2>${pick('A tailored arrangement','ترتيب مفصّل لكم')}</h2><p>${pick('Your journey may begin with this service or it may support a wider itinerary. Either way, we consider timing, comfort, privacy and the transitions around it—not just the service in isolation.','قد تبدأ رحلتكم بهذه الخدمة أو تكون جزءاً من مسار أوسع. وفي الحالتين نراعي التوقيت والراحة والخصوصية والانتقالات المحيطة بها.')}</p></div><div><h2>${pick('Important to know','من المهم معرفته')}</h2><p class="notice">${s.slug==='private-aviation'?pick('Jana Travel is not an aircraft operator and does not claim an owned fleet or guaranteed availability. Options are assessed and confirmed by appropriately qualified providers.','جنى ترافل ليست مشغلاً للطائرات ولا تدّعي امتلاك أسطول أو ضمان التوافر. تُقيّم الخيارات وتؤكد عبر مزودين مؤهلين.'):s.slug==='private-yachts'?pick('Yacht inventory, crew credentials, pricing, routing and availability are supplied and confirmed by the charter provider.','تُقدم وتؤكد تفاصيل اليخت والطاقم والأسعار والمسار والتوافر من مزود خدمات التأجير.'):pick('Services and inclusions vary. Every proposed element is checked with the relevant property or supplier.','تختلف الخدمات والمزايا، ويُتحقق من كل عنصر مقترح مع المنشأة أو المورد المعني.')}</p></div></div></section>${cta(s.title)}`)}

async function renderVillaDiscoverySection(){
 villaProperties = await getCollectionProperties();
 villaFilterState = createEmptyFilters();
 const options = getFilterOptions(villaProperties);
 return `<section class="section villa-discovery" id="villa-discovery">
  <div class="container">
    <div class="section-title">
      <div class="rule-title"><h2>${pick('Residences to consider','إقامات للاختيار')}</h2></div>
      <p>${pick('A selective starting point','نقطة بداية انتقائية')}</p>
    </div>
    <p class="villa-discovery__lead">${pick('Explore a few illustrative residences. Select any card to open a fuller editorial presentation without leaving this page.','استكشفوا بعض الإقامات التوضيحية. اختاروا أي بطاقة لفتح عرض تحريري أوضح دون مغادرة هذه الصفحة.')}</p>
    ${renderPropertyFilters(options, villaFilterState, propertyHelpers())}
    <div class="jana-property-grid" id="villaPropertyGrid">${renderPropertyCardList(villaProperties, propertyHelpers())}</div>
    <div id="villaFilterEmpty" hidden>${renderFilterEmptyState(propertyHelpers())}</div>
  </div>
</section>`;
}

async function renderServiceCollectionSection(kind){
 const helpers = propertyHelpers();
 let items = [];
 let titleEn; let titleAr; let leadEn; let leadAr; let emptyEn; let emptyAr;
 try {
  if(kind === 'jet'){
   jetItems = await getCollectionPrivateJets();
   items = jetItems;
   titleEn = 'Aircraft to consider'; titleAr = 'طائرات للاختيار';
   leadEn = 'A selective starting point. Select any card to open a fuller presentation without leaving this page.';
   leadAr = 'نقطة بداية انتقائية. اختاروا أي بطاقة لفتح عرض أوضح دون مغادرة هذه الصفحة.';
   emptyEn = 'Published private jets will appear here when available.';
   emptyAr = 'ستظهر الطائرات الخاصة المنشورة هنا عند توافرها.';
  } else if(kind === 'yacht'){
   yachtItems = await getCollectionYachts();
   items = yachtItems;
   titleEn = 'Yachts to consider'; titleAr = 'يخوت للاختيار';
   leadEn = 'A selective starting point. Select any card to open a fuller presentation without leaving this page.';
   leadAr = 'نقطة بداية انتقائية. اختاروا أي بطاقة لفتح عرض أوضح دون مغادرة هذه الصفحة.';
   emptyEn = 'Published yachts will appear here when available.';
   emptyAr = 'ستظهر اليخوت المنشورة هنا عند توافرها.';
  } else {
   experienceItems = await getCollectionExperiences();
   items = experienceItems;
   titleEn = 'Experiences to consider'; titleAr = 'تجارب للاختيار';
   leadEn = 'A selective starting point. Select any card to open a fuller presentation without leaving this page.';
   leadAr = 'نقطة بداية انتقائية. اختاروا أي بطاقة لفتح عرض أوضح دون مغادرة هذه الصفحة.';
   emptyEn = 'Published experiences will appear here when available.';
   emptyAr = 'ستظهر التجارب المنشورة هنا عند توافرها.';
  }
 } catch (error) {
  console.warn(`[collection] Failed to load ${kind} collection.`, error);
  items = [];
 }

 const grid = items.length
   ? `<div class="jana-collection-grid" data-collection-grid="${kind}">${renderCollectionCardList(items, helpers, kind)}</div>`
   : `<div class="villa-filters__empty" data-collection-empty="${kind}"><p>${pick(emptyEn, emptyAr)}</p></div>`;

 return `<section class="section villa-discovery" id="${kind}-discovery">
  <div class="container">
    <div class="section-title">
      <div class="rule-title"><h2>${pick(titleEn, titleAr)}</h2></div>
      <p>${pick('A selective starting point','نقطة بداية انتقائية')}</p>
    </div>
    <p class="villa-discovery__lead">${pick(leadEn, leadAr)}</p>
    ${grid}
  </div>
</section>`;
}

function refreshVillaCollection({ rebuildFilters = true, keepMenu = '' } = {}){
 const grid = document.querySelector('#villaPropertyGrid');
 const empty = document.querySelector('#villaFilterEmpty');
 if(!grid) return;
 const filtered = filterProperties(villaProperties, villaFilterState);
 const helpers = propertyHelpers();
 const options = getFilterOptions(villaProperties);

 if(rebuildFilters){
  const root = document.querySelector('[data-villa-filters]');
  const sheetOpen = root && !root.querySelector('[data-filter-sheet]')?.hidden;
  const openMenu = keepMenu || root?.querySelector('.villa-filter.is-open')?.getAttribute('data-filter-group') || '';
  if(root){
   root.outerHTML = renderPropertyFilters(options, villaFilterState, helpers);
   if(sheetOpen){
    const sheet = document.querySelector('[data-filter-sheet]');
    if(sheet){
     sheet.hidden = false;
     sheet.setAttribute('aria-hidden','false');
     document.body.classList.add('filter-sheet-open');
    }
   }
  }
  bindVillaFilterControls();
  if(openMenu){
   const group = document.querySelector(`.villa-filters__desktop [data-filter-group="${openMenu}"]`);
   const menu = group?.querySelector('[data-filter-menu]');
   const trigger = group?.querySelector('[data-filter-trigger]');
   if(menu && trigger){
    menu.hidden = false;
    trigger.setAttribute('aria-expanded','true');
    group.classList.add('is-open');
   }
  }
 } else {
  syncFilterChrome();
 }

 grid.innerHTML = filtered.length ? renderPropertyCardList(filtered, helpers) : '';
 if(empty){
  empty.hidden = filtered.length > 0;
  if(!filtered.length){
   empty.innerHTML = renderFilterEmptyState(helpers);
   empty.querySelectorAll('[data-filter-clear]').forEach(btn => {
    btn.addEventListener('click', () => {
     villaFilterState = createEmptyFilters();
     setVillaFilterSheet(false);
     refreshVillaCollection();
    });
   });
  }
 }
 bindPropertyCards();
}

function syncFilterChrome(){
 const active = filtersAreActive(villaFilterState);
 document.querySelectorAll('[data-filter-clear]').forEach(btn => {
  if(btn.closest('[data-filter-empty]')) return;
  btn.hidden = !active;
  btn.classList.toggle('is-visible', active);
 });
 const mobileTrigger = document.querySelector('[data-filter-sheet-open]');
 if(mobileTrigger){
  const count = [
   villaFilterState.destination,
   villaFilterState.propertyType,
   villaFilterState.bedrooms != null,
   villaFilterState.guests != null,
   villaFilterState.amenities?.length
  ].filter(Boolean).length;
  mobileTrigger.innerHTML = `${document.querySelector('.villa-filters__icon')?.outerHTML || ''}<span>${pick('Filters', 'تصفية')}</span>${count ? `<span class="villa-filters__mobile-count">${count}</span>` : ''}`;
 }
 document.querySelectorAll('.villa-filters__desktop [data-filter-group]').forEach(group => {
  const key = group.getAttribute('data-filter-group');
  let on = false;
  if(key === 'destination') on = Boolean(villaFilterState.destination);
  else if(key === 'propertyType') on = Boolean(villaFilterState.propertyType);
  else if(key === 'bedrooms') on = villaFilterState.bedrooms != null;
  else if(key === 'guests') on = villaFilterState.guests != null;
  else if(key === 'amenities') on = Boolean(villaFilterState.amenities?.length);
  group.classList.toggle('is-active', on);
  const name = group.querySelector('.villa-filter__name');
  if(name) name.textContent = formatFilterTriggerLabel(key, villaFilterState, pick);
 });
}

function closeVillaFilterMenus(){
 document.querySelectorAll('[data-filter-menu]').forEach(menu => {
  menu.hidden = true;
 });
 document.querySelectorAll('[data-filter-trigger]').forEach(btn => {
  btn.setAttribute('aria-expanded','false');
  btn.closest('.villa-filter')?.classList.remove('is-open');
 });
}

function setVillaFilterSheet(open){
 const sheet = document.querySelector('[data-filter-sheet]');
 if(!sheet) return;
 sheet.hidden = !open;
 sheet.setAttribute('aria-hidden', String(!open));
 document.body.classList.toggle('filter-sheet-open', open);
 if(!open) closeVillaFilterMenus();
}

function bindPropertyCards(){
 document.querySelectorAll('#villaPropertyGrid [data-property-slug]').forEach(btn => {
  btn.addEventListener('click', () => openPropertyModal(btn.getAttribute('data-property-slug'), btn));
 });
}

function bindVillaFilterControls(){
 const root = document.querySelector('[data-villa-filters]');
 if(!root) return;

 root.querySelectorAll('[data-filter-trigger]').forEach(trigger => {
  trigger.addEventListener('click', e => {
   e.stopPropagation();
   const group = trigger.closest('.villa-filter');
   const menu = group?.querySelector('[data-filter-menu]');
   const willOpen = menu?.hidden;
   closeVillaFilterMenus();
   if(willOpen && menu){
    menu.hidden = false;
    trigger.setAttribute('aria-expanded','true');
    group.classList.add('is-open');
   }
  });
 });

 root.querySelectorAll('[data-filter-set]').forEach(btn => {
  btn.addEventListener('click', () => {
   const key = btn.getAttribute('data-filter-set');
   const raw = btn.getAttribute('data-value') ?? '';
   if(key === 'bedrooms' || key === 'guests'){
    villaFilterState[key] = raw === '' ? null : Number(raw);
   } else {
    villaFilterState[key] = raw;
   }
   refreshVillaCollection();
  });
 });

 root.querySelectorAll('[data-filter-amenity]').forEach(input => {
  input.addEventListener('change', () => {
   const value = input.value;
   const current = new Set(villaFilterState.amenities || []);
   if(input.checked) current.add(value);
   else current.delete(value);
   villaFilterState.amenities = [...current];
   refreshVillaCollection({ rebuildFilters: true, keepMenu: 'amenities' });
  });
 });

 root.querySelectorAll('[data-filter-clear-one]').forEach(btn => {
  btn.addEventListener('click', e => {
   e.preventDefault();
   e.stopPropagation();
   const key = btn.getAttribute('data-filter-clear-one');
   if(key === 'bedrooms' || key === 'guests') villaFilterState[key] = null;
   else if(key === 'amenities') villaFilterState.amenities = [];
   else villaFilterState[key] = '';
   refreshVillaCollection();
  });
 });

 root.querySelectorAll('[data-filter-clear]').forEach(btn => {
  btn.addEventListener('click', () => {
   villaFilterState = createEmptyFilters();
   setVillaFilterSheet(false);
   refreshVillaCollection();
  });
 });

 root.querySelector('[data-filter-sheet-open]')?.addEventListener('click', () => setVillaFilterSheet(true));
 root.querySelectorAll('[data-filter-sheet-close]').forEach(btn => {
  btn.addEventListener('click', () => setVillaFilterSheet(false));
 });

 if(villaFilterOutsideHandler) document.removeEventListener('click', villaFilterOutsideHandler);
 villaFilterOutsideHandler = e => {
  if(!e.target.closest('[data-villa-filters]')) closeVillaFilterMenus();
 };
 document.addEventListener('click', villaFilterOutsideHandler);

 if(villaFilterKeyHandler) document.removeEventListener('keydown', villaFilterKeyHandler);
 villaFilterKeyHandler = e => {
  if(e.key !== 'Escape') return;
  if(!document.querySelector('[data-filter-sheet]')?.hidden) setVillaFilterSheet(false);
  else closeVillaFilterMenus();
 };
 document.addEventListener('keydown', villaFilterKeyHandler);
}

function collectionOverview(){return shell(`${pageHero(pick('The Collection','المجموعة'),pick('Places we believe are worth travelling for.','أماكن نؤمن أنها تستحق السفر من أجلها.'),siteImages.property1)}<section class="editorial"><div class="container"><div class="lead-grid"><div class="eyebrow">${pick('Considered selection','اختيار مدروس')}</div><p class="lead">${pick('Four distinctive Maldivian island resorts, presented as a starting point—not an ownership claim, official partnership or guarantee of availability.','أربعة منتجعات مالديفية مميزة كنقطة بداية، دون ادعاء ملكية أو شراكة رسمية أو ضمان للتوافر.')}</p></div><div class="overview-grid" style="margin-top:70px">${properties.map(p=>card(p.title,p.line,p.image,`/collection/${p.slug}`)).join('')}</div></div></section>${cta(brandName())}`)}
function propertyPage(p){return shell(`${pageHero(p.title,p.line,p.image,'/collection')}<section class="editorial"><div class="container property-meta"><div><div class="eyebrow">${pick('The Collection','المجموعة')}</div><p class="lead">${isArabic()?'منتجع جزيرة خاص في المالديف، اختير لما يقدمه من إحساس بالمكان وإقامة مدروسة وتجارب متنوعة. تُراجع كل التفاصيل والتوافر مباشرة مع المنشأة.':p.intro}</p></div><div><h2>${pick('Location','الموقع')}</h2><p>${p.location}</p><p class="source-note">${pick(`Property facts reviewed against the official hotel website. ${BRAND.parentName} does not own or operate this property.`,`رُوجعت معلومات المنشأة وفق موقع الفندق الرسمي. ${BRAND.parentNameAr} لا تملك أو تدير هذه المنشأة.`)}</p><a class="text-link" href="${p.source}" target="_blank" rel="noopener">${pick('Official property source ↗','المصدر الرسمي للمنشأة ↗')}</a></div></div></section><section class="info-band"><div class="container info-columns"><div><h2>${pick('Accommodation','الإقامة')}</h2><p>${isArabic()?'خيارات إقامة على الشاطئ وفوق الماء، مع فئات أكبر للعائلات والمجموعات وفق ما تعرضه المنشأة رسمياً.':p.stay}</p></div><div><h2>${pick('Design & atmosphere','التصميم والأجواء')}</h2><p>${isArabic()?'أجواء جزيرية معاصرة ومساحات داخلية وخارجية صُممت للاستفادة من المشهد والخصوصية.':p.design}</p></div><div><h2>${pick('Dining & wellness','الطعام والعافية')}</h2><p>${isArabic()?'تتوافر تجارب متنوعة للطعام والعافية بحسب ما تؤكده المنشأة، وتخضع البرامج والمواعيد للتوافر.':p.dining}</p></div></div></section><section class="content-block"><div class="container content-grid"><div><h2>${pick('Experiences','التجارب')}</h2><ul>${p.experiences.map(i=>`<li>${localItem(i)}</li>`).join('')}</ul></div><div><h2>${pick('Traveller considerations','اعتبارات للمسافر')}</h2><p>${isArabic()?'يجب اختيار موقع الفيلا وفئتها وأسلوب الوصول وفق الخصوصية المطلوبة وأعمار الضيوف ووتيرة الإقامة. تُراجع التفاصيل الحالية قبل التأكيد.':p.considerations}</p><a class="button dark" href="${whatsappHref(p.title)}">${pick('Enquire about this property →','استفسروا عن هذه المنشأة ←')}</a></div></div></section><section class="editorial"><div class="container"><div class="section-title"><h2>${pick('A sense of place','إحساس بالمكان')}</h2><p>${pick('Illustrative Maldives imagery','صور توضيحية من المالديف')}</p></div><div class="gallery">${[p.image,siteImages.gallery2,siteImages.gallery3].map((i,n)=>`<img src="${i}" alt="${pick('Illustrative Maldives island view','مشهد توضيحي لجزيرة في المالديف')} ${n+1}" loading="lazy" width="900" height="650">`).join('')}</div><p class="gallery-caption">${pick('Destination imagery is illustrative and is not represented as official property photography.','صور الوجهة توضيحية ولا تُقدّم على أنها صور رسمية للمنشأة.')}</p></div></section>${cta(p.title)}`)}

function about(){
  const by = brandByline(isArabic());
  const byNote = by
    ? pick(` ${by}.`,' من جنى ترافل.')
    : '';
  return shell(`${pageHero(pick(`About ${brandName()}`,'عن عطلات فاخرة خاصة'),pick('Travel planning that begins with the person, not the product.','تخطيط سفر يبدأ بالإنسان، لا بالمنتج.'),siteImages.story)}<section class="editorial"><div class="container lead-grid"><div class="eyebrow">${esc(brandName().toUpperCase())}</div><div><p class="lead">${pick(`${brandName()} is a private travel house focused on personal planning, considered property selection and journeys that feel coherent from beginning to end.${byNote}`,`${brandName(true)} دار سفر خاصة تركز على التخطيط الشخصي واختيار الإقامات بعناية ورحلات مترابطة من البداية إلى النهاية.${byNote}`)}</p><p>${pick('We listen before recommending. We prefer a shorter, stronger selection to an endless catalogue, and we treat the transitions between places as part of the journey itself.','نستمع قبل أن نوصي. نفضل اختياراً أقصر وأقوى من قائمة لا تنتهي، ونتعامل مع الانتقالات بين الأماكن كجزء من الرحلة نفسها.')}</p><p>${pick('No invented history, memberships, awards or testimonials are used on this site. Brand credentials and owner-supplied business details should be added only after verification.','لا يستخدم هذا الموقع تاريخاً أو عضويات أو جوائز أو شهادات مختلقة. يجب إضافة بيانات العلامة والمعلومات التجارية من المالك بعد التحقق فقط.')}</p></div></div></section>${cta()}`)
}
function janaStandard(){const ps=[["Personal attention","We begin with how you want to feel and travel—not with a predetermined package."],["Thoughtful selection","Every recommendation should earn its place in the journey."],["Privacy & discretion","Personal information and preferences are handled with care and shared only as needed to arrange the enquiry."],["Attention to detail","Rooms, relationships, luggage, pacing and transitions matter."],["Coherent planning","A journey should feel like one story, even when it crosses several places."]];return shell(`${pageHero(pick('Our Standard','معيارنا'),pick('Beyond luxury. Entirely personal.','أبعد من الفخامة. شخصية بالكامل.'),siteImages.villas)}<section class="editorial"><div class="container"><div class="lead-grid"><div class="eyebrow">${esc(brandName().toUpperCase())}</div><p class="lead">${pick('Luxury is not simply what is included. It is the confidence that each choice belongs, each transition has been considered and the journey still feels like your own.','الفخامة ليست مجرد ما تتضمنه الرحلة، بل الثقة بأن كل اختيار في مكانه، وكل انتقال مدروس، وأن الرحلة تظل خاصة بكم.')}</p></div><div class="principles" style="margin-top:75px">${ps.map((p,i)=>`<article class="principle"><span>0${i+1}</span><h3>${isArabic()?['اهتمام شخصي','اختيار مدروس','خصوصية وتكتم','عناية بالتفاصيل','تخطيط مترابط'][i]:p[0]}</h3><p>${isArabic()?'مبدأ يوجّه طريقة الاستماع والبحث والتنسيق والتأكيد في كل رحلة.':p[1]}</p></article>`).join('')}</div></div></section>${cta()}`)}

function legal(type){const privacy=type==='privacy';return shell(`${pageHero(pick(privacy?'Privacy template':'Terms template',privacy?'نموذج الخصوصية':'نموذج الشروط'),pick('For business and legal review before publication.','للمراجعة التجارية والقانونية قبل النشر.'),siteImages.europe)}<section class="editorial"><article class="container legal"><p class="review"><strong>${pick('Draft template — not legal advice.','مسودة نموذج — ليست استشارة قانونية.')}</strong> ${pick('The business owner and qualified counsel must review, complete and approve this text before publication.','يجب على مالك النشاط ومستشار قانوني مؤهل مراجعة هذا النص واستكماله واعتماده قبل النشر.')}</p>${privacy?`<h2>${pick('Information this site may collect','المعلومات التي قد يجمعها الموقع')}</h2><p>${pick('An enquiry may include your name, contact details, travel interests, dates, party composition, budget indication and preferences. Do not send passport, payment or sensitive identity information through the enquiry form.','قد يتضمن الاستفسار الاسم وبيانات التواصل واهتمامات السفر والمواعيد وتكوين المجموعة والميزانية والتفضيلات. لا ترسلوا بيانات الجواز أو الدفع أو معلومات الهوية الحساسة عبر النموذج.')}</p><h2>${pick('Purpose and sharing','الغرض والمشاركة')}</h2><p>${pick('Complete this section with the verified business identity, lawful basis, retention period, form provider, hosting provider and the suppliers with whom enquiry data may be shared.','يجب استكمال هذا القسم بهوية النشاط والأساس القانوني وفترة الاحتفاظ ومزود النموذج والاستضافة والموردين الذين قد تُشارك معهم بيانات الاستفسار.')}</p><h2>${pick('Your choices','خياراتكم')}</h2><p>${pick('Add the owner-supplied contact method for privacy requests and the rights applicable in each market where the business operates.','أضيفوا وسيلة التواصل المقدمة من المالك لطلبات الخصوصية والحقوق المطبقة في كل سوق يعمل فيه النشاط.')}</p>`:`<h2>${pick('Scope of service','نطاق الخدمة')}</h2><p>${pick('Describe the verified legal entity, role as agent or organiser, booking process, supplier relationships and jurisdiction. Do not publish until these details are confirmed.','يجب وصف الكيان القانوني ودوره كوكيل أو منظم وآلية الحجز وعلاقات الموردين والاختصاص القضائي، وعدم النشر قبل التأكيد.')}</p><h2>${pick('Quotes, availability and payment','العروض والتوافر والدفع')}</h2><p>${pick('State how long proposals remain valid, when a booking becomes binding, accepted payment methods, currency handling and any supplier-specific conditions.','اذكروا مدة صلاحية العروض ووقت إلزام الحجز وطرق الدفع والعملات وأي شروط خاصة بالموردين.')}</p><h2>${pick('Changes and cancellation','التغييرات والإلغاء')}</h2><p>${pick('Insert reviewed cancellation, amendment, force majeure, insurance, liability and complaints language appropriate to the business and customer location.','أضيفوا نصوصاً مراجعة بشأن الإلغاء والتعديل والقوة القاهرة والتأمين والمسؤولية والشكاوى بما يناسب النشاط وموقع العميل.')}</p>`}</article></section>`)}
function notFound(){return shell(`<section class="not-found"><div class="eyebrow">404</div><h1>${pick('Lost, beautifully.','ضللتم الطريق بأناقة.')}</h1><p>${pick('The page you requested could not be found.','تعذر العثور على الصفحة المطلوبة.')}</p><a class="button dark" data-link href="${rootPath('/')}">${pick('Return home','العودة للرئيسية')}</a></section>`)}

async function openPropertyModal(slug, triggerEl){
 const property = await getPropertyBySlug(slug);
 if(!property) return;
 openCollectionModalItem(property, 'property', triggerEl);
}

async function openCollectionModal(kind, slug, triggerEl){
 let item = null;
 if(kind === 'jet') item = await getPrivateJetBySlug(slug);
 else if(kind === 'yacht') item = await getYachtBySlug(slug);
 else if(kind === 'experience') item = await getExperienceBySlug(slug);
 else if(kind === 'property') item = await getPropertyBySlug(slug);
 if(!item) return;
 openCollectionModalItem(item, kind, triggerEl);
}

function openCollectionModalItem(item, kind, triggerEl){
 modalProperty = item;
 modalKind = kind;
 modalGalleryIndex = 0;
 lastFocusEl = triggerEl || document.activeElement;
 modalScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
 const modal = document.querySelector('#propertyModal');
 const content = document.querySelector('#propertyModalContent');
 if(!modal || !content) return;
 content.innerHTML = kind === 'property'
   ? renderPropertyModalContent(item, propertyHelpers())
   : renderCollectionModalContent(item, propertyHelpers(), kind);
 modal.hidden = false;
 modal.setAttribute('aria-hidden','false');
 const scrollbar = window.innerWidth - document.documentElement.clientWidth;
 document.documentElement.classList.add('modal-open');
 document.body.classList.add('modal-open');
 if(scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
 window.scrollTo({ top: modalScrollY, left: 0, behavior: 'instant' });
 bindModalInteractions();
 const closeBtn = modal.querySelector('.property-modal__close');
 closeBtn?.focus({ preventScroll: true });
}

function closePropertyModal({ restoreScroll = true } = {}){
 const modal = document.querySelector('#propertyModal');
 if(!modal || modal.hidden) return;
 modal.hidden = true;
 modal.setAttribute('aria-hidden','true');
 document.documentElement.classList.remove('modal-open');
 document.body.classList.remove('modal-open');
 document.body.style.paddingRight = '';
 document.body.style.top = '';
 if(restoreScroll) window.scrollTo({ top: modalScrollY, left: 0, behavior: 'instant' });
 if(modalKeyHandler){
  document.removeEventListener('keydown', modalKeyHandler);
  modalKeyHandler = null;
 }
 modalProperty = null;
 modalKind = 'property';
 lastFocusEl?.focus?.({ preventScroll: true });
}

function setGalleryIndex(index){
 if(!modalProperty) return;
 const gallery = modalProperty.gallery?.length ? modalProperty.gallery : [modalProperty.heroImage];
 const total = gallery.length;
 modalGalleryIndex = (index + total) % total;
 document.querySelectorAll('[data-slide-index]').forEach(slide => {
  slide.classList.toggle('is-active', Number(slide.dataset.slideIndex) === modalGalleryIndex);
 });
 const count = document.querySelector('[data-gallery-count]');
 if(count) count.textContent = `${modalGalleryIndex + 1} / ${total}`;
}

function bindModalInteractions(){
 const modal = document.querySelector('#propertyModal');
 if(!modal) return;
 modal.querySelectorAll('[data-modal-close]').forEach(el => {
  el.addEventListener('click', closePropertyModal);
 });
 modal.querySelector('[data-gallery-prev]')?.addEventListener('click', () => setGalleryIndex(modalGalleryIndex - 1));
 modal.querySelector('[data-gallery-next]')?.addEventListener('click', () => setGalleryIndex(modalGalleryIndex + 1));

 const gallery = modal.querySelector('[data-gallery]');
 if(gallery){
  let touchX = null;
  gallery.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
  gallery.addEventListener('touchend', e => {
   if(touchX == null) return;
   const delta = e.changedTouches[0].clientX - touchX;
   if(Math.abs(delta) > 40) setGalleryIndex(modalGalleryIndex + (delta < 0 ? 1 : -1));
   touchX = null;
  }, {passive:true});
 }

 if(modalKeyHandler) document.removeEventListener('keydown', modalKeyHandler);
 modalKeyHandler = e => {
  if(e.key === 'Escape'){ e.preventDefault(); closePropertyModal(); }
  else if(e.key === 'ArrowLeft'){ e.preventDefault(); setGalleryIndex(modalGalleryIndex - 1); }
  else if(e.key === 'ArrowRight'){ e.preventDefault(); setGalleryIndex(modalGalleryIndex + 1); }
 };
 document.addEventListener('keydown', modalKeyHandler);
}

async function render(){
 document.documentElement.lang=lang();document.documentElement.dir=isArabic()?'rtl':'ltr';
 closePropertyModal({ restoreScroll: false });
 const path=stripLang().replace(/\/$/,'')||'/'; let html;
 if(path==='/') html=home();
 else if(path==='/destinations') html=destinationOverview();
 else if(path.startsWith('/destinations/')) {const d=destinations.find(x=>x.slug===path.split('/')[2]);html=d?destinationPage(d):notFound()}
 else if(path==='/services') html=servicesOverview();
 else if(path.startsWith('/services/')) {const s=services.find(x=>x.slug===path.split('/')[2]);html=s?await servicePage(s):notFound()}
 else if(path==='/collection') html=collectionOverview();
 else if(path.startsWith('/collection/')) {const p=properties.find(x=>x.slug===path.split('/')[2]);html=p?propertyPage(p):notFound()}
 else if(path==='/about') html=about();
 else if(path==='/jana-standard') html=janaStandard();
 else if(path==='/design-your-journey') { window.location.replace(whatsappHref()); return; }
 else if(path==='/privacy'||path==='/terms') html=legal(path.slice(1));
 else if(path==='/properties' || path.startsWith('/properties/')) { navigate(rootPath('/services/private-villas')); return; }
 else html=notFound();
 app.innerHTML=html; bind(); updateMetadata(path);
}

function updateMetadata(path){
  const h=document.querySelector('h1');
  const titleBase = h?.textContent.trim() || brandName();
  document.title = `${titleBase} — ${brandTitle()}`;
  document.querySelector('meta[name="description"]').content =
    document.querySelector('.lead,.page-hero p,.hero p')?.textContent.trim()
    || `${brandName()} creates exceptionally curated private journeys.`;
}
function switchLanguage(){const base=stripLang();const target=isArabic()?base:`/ar${base==='/'?'':base}`;navigate(target+location.search)}
function bind(){
 const head=document.querySelector('#header');const onScroll=()=>head?.classList.toggle('sticky',scrollY>70);addEventListener('scroll',onScroll,{passive:true});onScroll();
 document.querySelector('#langSwitch')?.addEventListener('click',switchLanguage);document.querySelector('#drawerLang')?.addEventListener('click',switchLanguage);
 const drawer=document.querySelector('#drawer');const toggleDrawer=open=>{drawer?.classList.toggle('open',open);drawer?.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('lock',open)};document.querySelector('#menuOpen')?.addEventListener('click',()=>toggleDrawer(true));document.querySelector('#menuClose')?.addEventListener('click',()=>toggleDrawer(false));
 document.querySelector('#scrollCue')?.addEventListener('click',()=>document.querySelector('#intro')?.scrollIntoView({behavior:'smooth'}));
 const row=document.querySelector('#propertyRow'),prev=document.querySelector('#prevProperty'),next=document.querySelector('#nextProperty');const scrollProps=dir=>row?.scrollBy({left:dir*row.clientWidth*.8,behavior:'smooth'});prev?.addEventListener('click',()=>scrollProps(isArabic()?1:-1));next?.addEventListener('click',()=>scrollProps(isArabic()?-1:1));if(row&&prev&&next){const state=()=>{prev.disabled=row.scrollLeft<=2;next.disabled=Math.abs(row.scrollWidth-row.clientWidth-row.scrollLeft)<=3};row.addEventListener('scroll',state,{passive:true});state()}

 document.querySelectorAll('[data-property-slug]').forEach(btn => {
  btn.addEventListener('click', () => openPropertyModal(btn.getAttribute('data-property-slug'), btn));
 });
 document.querySelectorAll('[data-collection-slug]').forEach(btn => {
  btn.addEventListener('click', () => openCollectionModal(
   btn.getAttribute('data-collection-kind'),
   btn.getAttribute('data-collection-slug'),
   btn
  ));
 });
 bindVillaFilterControls();
 document.querySelector('#villaFilterEmpty')?.querySelectorAll('[data-filter-clear]').forEach(btn => {
  btn.addEventListener('click', () => {
   villaFilterState = createEmptyFilters();
   refreshVillaCollection();
  });
 });
}

render();
