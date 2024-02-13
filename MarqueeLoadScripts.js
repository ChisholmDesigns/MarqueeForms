const scriptSources = [
  
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmscombine@1/cmscombine.js", async: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsnest@1/cmsnest.js", async: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-modal@1/modal.js", async: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-countitems@1/countitems.js", defer: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-mirrorclick@1/mirrorclick.js", defer: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-copyclip@1/copyclip.js", defer: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-smartlightbox@1/smartlightbox.js", defer: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsselect@1/cmsselect.js", async: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js", async: true },
  { src: "https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js", async: true },
  { src: "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/js/splide.min.js", async: true },
  { src: "https://unpkg.com/popper.js@1", async: true },
  { src: "https://unpkg.com/tippy.js@4", async: true }
];



const stylesheetHref = "https://fengyuanchen.github.io/datepicker/css/datepicker.css";

scriptSources.forEach(scriptSource => {
  const script = document.createElement('script');
  script.src = scriptSource.src;
  if (scriptSource.defer) script.defer = true;
  if (scriptSource.async) script.async = true;
  document.head.appendChild(script);
});

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = stylesheetHref;
document.head.appendChild(link);
