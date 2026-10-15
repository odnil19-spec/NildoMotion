/* ====== ADD YOUR LINKS AND PICTURE HERE ====== */
var PROFILE_PIC = "nildo2.png";            // e.g. "https://.../picture.jpg"
var LINKS = {
  facebook:  "https://www.facebook.com/profile.php?id=61592896529212",                 // Facebook Page link
  instagram: "https://instagram.com/nildomotionart?cplk=eGR5bmdvcXp4ODRl",                 // Instagram link
  tiktok:    "tiktok.com/@nildomotion",                 // TikTok link
  youtube:   "https://www.youtube.com/@NildoMotion"                  // YouTube Channel link
};
/* ===================================================== */

var ICONS = {
  facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8S15.6 3.5 14.4 3.5c-2.6 0-4.2 1.600-4.200 4.400v2.600H7.400v3.300h2.800V22z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200"><rect x="3" y="3" width="18" height="18" rx="5.500"/><circle cx="12" cy="12" r="4.200"/><circle cx="17.300" cy="6.700" r="1" fill="currentColor" stroke="none"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.900v3.100c-1.400.1-2.700-.3-3.900-1.100v5.600c0 3.600-2.600 5.800-5.600 5.800-3.200 0-5.600-2.400-5.600-5.400 0-3.300 2.800-5.700 6.300-5.200v3.200c-1.700-.5-3.100.6-3.100 2 0 1.200.9 2.100 2.200 2.100 1.300 0 2.200-.9 2.200-2.400V3z"/></svg>',
  youtube:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.600 7.200c-.2-.9-.9-1.600-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4c-.9.2-1.600.9-1.800 1.800C2 8.800 2 12 2 12s0 3.200.4 4.800c.2.900.9 1.600 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4c.9-.2 1.600-.9 1.800-1.800.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3z"/></svg>'
};
var NAMES = {facebook:"Facebook Page",instagram:"Instagram",tiktok:"TikTok",youtube:"YouTube Channel"};
var COLORS = {facebook:"#F8650C",instagram:"#F00000",tiktok:"#F8650C",youtube:"#F00000"};

function href(k){
  var u = (LINKS[k] || "").trim();
  if (!u) return "#";
  return /^https?:\/\//i.test(u) ? u : "https://" + u;
}
var COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.500"/><path d="M5 15H4.500A1.500 1.500 0 0 1 3 13.500v-9A1.500 1.500 0 0 1 4.500 3h9A1.500 1.500 0 0 1 15 4.500V5"/></svg>';
var toastEl = document.getElementById("toast"), toastT;
function toast(msg){
  toastEl.textContent = msg; toastEl.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(function(){ toastEl.classList.remove("show"); }, 1800);
}
function copyText(text){
  if (navigator.clipboard && window.isSecureContext){
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function(res, rej){
    var t = document.createElement("textarea");
    t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    try { document.execCommand("copy") ? res() : rej(); } catch(e){ rej(e); }
    document.body.removeChild(t);
  });
}
var L = document.getElementById("links"), I = document.getElementById("icons");
Object.keys(NAMES).forEach(function(k){
  var a = document.createElement("a");
  a.className = "link"; a.href = href(k); a.target = "_blank"; a.rel = "noopener";
  a.innerHTML = '<span style="color:'+COLORS[k]+';display:flex">'+ICONS[k]+'</span><span>'+NAMES[k]+'</span>';
  var row = document.createElement("div"); row.className = "row";
  var c = document.createElement("button");
  c.type = "button"; c.className = "copy"; c.innerHTML = COPY_ICON;
  c.setAttribute("aria-label", "Copy link for " + NAMES[k]); c.title = "Copy link";
  c.addEventListener("click", function(){
    copyText(href(k)).then(function(){
      c.classList.add("done"); toast(NAMES[k] + " link copied!");
      setTimeout(function(){ c.classList.remove("done"); }, 1500);
    }, function(){ toast("Couldn't copy. Please try again."); });
  });
  row.appendChild(a); row.appendChild(c); L.appendChild(row);
  var b = document.createElement("a");
  b.className = "ic"; b.href = href(k); b.target = "_blank"; b.rel = "noopener";
  b.setAttribute("aria-label", NAMES[k]); b.innerHTML = ICONS[k];
  I.appendChild(b);
});
if (PROFILE_PIC){
  var img = document.createElement("img");
  img.src = PROFILE_PIC; img.alt = "Nildo Motion";
  var p = document.getElementById("pfp"); p.textContent = ""; p.appendChild(img);
}
