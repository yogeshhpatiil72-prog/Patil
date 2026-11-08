let titles = [
 {id:1,title:"Midnight Run",category:"Hollywood",genre:"Action",year:2025,rating:"8.1",type:"Movie",label:"TRENDING",colors:["#190d36","#7b2fff"],description:"A night-time chase through a city that never sleeps. Every choice brings the truth closer.",progress:62},
 {id:2,title:"Dil Se Again",category:"Bollywood",genre:"Romance",year:2025,rating:"7.8",type:"Movie",label:"NEW",colors:["#3d1026","#e74c8e"],description:"Two old friends meet again and discover that some feelings never really left.",progress:34},
 {id:3,title:"Southern Storm",category:"South",genre:"Action",year:2024,rating:"8.4",type:"Movie",label:"HOT",colors:["#092c35","#18a4b7"],description:"One fearless officer takes on a powerful network in a high-stakes action drama.",progress:0},
 {id:4,title:"Neon City",category:"Hollywood",genre:"Sci-Fi",year:2025,rating:"8.6",type:"Series",label:"PATILNEO PICK",colors:["#271044","#c52cff"],description:"In a city powered by memories, one hacker finds a secret that could change everything.",progress:0},
 {id:5,title:"Mumbai Files",category:"Bollywood",genre:"Drama",year:2024,rating:"8.2",type:"Series",label:"TOP SERIES",colors:["#351323","#e4476d"],description:"A rookie journalist follows a story that reaches the highest levels of the city.",progress:0},
 {id:6,title:"The Last Orbit",category:"Hollywood",genre:"Sci-Fi",year:2024,rating:"8.7",type:"Movie",label:"SCI-FI",colors:["#102c4b","#58c8ff"],description:"A stranded crew receives a signal from beyond the edge of the known universe.",progress:0},
 {id:7,title:"Premachi Goshta",category:"Marathi",genre:"Romance",year:2025,rating:"7.9",type:"Movie",label:"MARATHI",colors:["#4b1c31","#ff8eab"],description:"A small-town love story about timing, family, and the courage to start over.",progress:0},
 {id:8,title:"Shadow Protocol",category:"Hollywood",genre:"Action",year:2023,rating:"8.0",type:"Movie",label:"ACTION",colors:["#181b32","#6878ff"],description:"An ex-agent must solve a coded message before it triggers a global crisis.",progress:0},
 {id:9,title:"Laughing Stock",category:"Bollywood",genre:"Comedy",year:2025,rating:"7.5",type:"Series",label:"COMEDY",colors:["#3e270b","#f5a72f"],description:"A chaotic family turns a failing business into the city's most unlikely hit.",progress:0},
 {id:10,title:"The Blue Hour",category:"South",genre:"Drama",year:2024,rating:"8.3",type:"Movie",label:"CRITICS' PICK",colors:["#0e2c42","#2c91c9"],description:"A quiet village is shaken when a long-buried mystery resurfaces.",progress:0},
 {id:11,title:"City of Stars",category:"Bollywood",genre:"Romance",year:2023,rating:"7.7",type:"Movie",label:"ROMANCE",colors:["#2d123e","#e04ba9"],description:"Two artists chase their dreams and find a connection in the middle of a crowded city.",progress:0},
 {id:12,title:"Wild Frontier",category:"Hollywood",genre:"Action",year:2024,rating:"8.1",type:"Series",label:"ADVENTURE",colors:["#332414","#c78b43"],description:"A rescue team ventures into uncharted territory after a storm cuts off all communication.",progress:0}
];
const gradients = t => `linear-gradient(145deg, ${t.colors[0]}, ${t.colors[1]} 130%)`;
let activeCategory = "All", activeView = "home", query = "";
let watchlist = JSON.parse(localStorage.getItem("patilneo-watchlist") || "[]");
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2300)}
function art(title, className="poster-art"){return `<div class="${className}" style="--art:${gradients(title)};${title.poster ? `background-image:linear-gradient(0deg,#080611bb,#08061122),url(&quot;${title.poster}&quot;);background-size:cover;background-position:center` : ""}"><span class="poster-badge">${title.label}</span><strong class="poster-title">${title.title}</strong></div>`}
function posterCard(t){return `<article class="poster-card" data-id="${t.id}">${art(t)}<div class="poster-info"><h3>${t.title}</h3><p>${t.year} · ${t.genre} <span class="rating">★ ${t.rating}</span></p></div></article>`}
function catalogCard(t){return `<article class="catalog-card" data-id="${t.id}">${art(t)}<div class="catalog-info"><h3>${t.title}</h3><div class="catalog-meta"><span>${t.category} · ${t.year}</span><span class="rating">★ ${t.rating}</span></div></div><div class="card-actions"><button class="watch-btn" data-watch="${t.id}">▶ &nbsp; Details</button><button class="save-btn" data-save="${t.id}" aria-label="Save to My List">${watchlist.includes(t.id)?"♥":"♡"}</button></div></article>`}
function renderContinue(){const list=titles.filter(t=>t.progress>0);$("#continueRow").innerHTML=list.map(t=>`<article class="continue-card" data-id="${t.id}"><div class="continue-art" style="--art:${gradients(t)}"><strong>${t.title}</strong></div><div class="progress"><span style="width:${t.progress}%"></span></div><div class="continue-caption"><span>${t.title}</span><span>${Math.max(1,Math.round((100-t.progress)/10))} min left</span></div></article>`).join("");$("#continueSection").classList.toggle("hidden",!list.length)}
function renderTrending(){const list=[titles[3],titles[0],titles[5],titles[1],titles[7],titles[6]];$("#trendingRow").innerHTML=list.map(posterCard).join("")}
function renderCatalog(){let list=titles.filter(t=>(activeCategory==="All"||t.genre===activeCategory||t.category===activeCategory)&&(activeView!=="movies"||t.type==="Movie")&&(activeView!=="series"||t.type==="Series")&&(activeView!=="mylist"||watchlist.includes(t.id))&&(!query||(t.title+" "+t.genre+" "+t.category+" "+t.type).toLowerCase().includes(query.toLowerCase())));if(activeView==="profile"){showProfile();return}$("#catalogTitle").innerHTML=activeView==="mylist"?'My <span class="neo-text">List</span>':activeView==="movies"?'Explore <span class="neo-text">Movies</span>':activeView==="series"?'Binge-worthy <span class="neo-text">Series</span>':'Popular on <span class="neo-text">PATILNEO</span>';$("#titleCount").textContent=`${list.length} titles`;$("#catalogGrid").innerHTML=list.map(catalogCard).join("");$("#emptyState").classList.toggle("hidden",list.length>0);$("#popularSection").classList.remove("hidden");if(activeView==="mylist"&&!list.length)$("#emptyState").textContent="Your list is empty. Tap ♡ on any title to save it here.";else $("#emptyState").textContent="No titles found. Try another search or category."}
function showProfile(){ $("#catalogTitle").innerHTML='Your <span class="neo-text">Profile</span>';$("#titleCount").textContent="PATILNEO";$("#catalogGrid").innerHTML=`<div class="profile-card"><div class="profile-orb">P</div><h2>Patilneo Viewer</h2><p>Your personal entertainment universe.</p><div class="profile-stats"><span><b>${watchlist.length}</b>Saved titles</span><span><b>${titles.length}</b>Catalogue titles</span></div><button class="primary-btn" id="profileListBtn">♡ &nbsp; View My List</button></div>`;$("#emptyState").classList.add("hidden");$("#popularSection").classList.remove("hidden");$("#profileListBtn")?.addEventListener("click",()=>setView("mylist"))}
function setView(view){activeView=view;$$("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));if(view==="home"){activeCategory="All";query="";$("#searchInput").value="";$("#searchPanel").classList.add("hidden");$("#hero").classList.remove("hidden");$("#categories").classList.remove("hidden");$("#continueSection").classList.remove("hidden");$("#trendingSection").classList.remove("hidden")}else{$("#hero").classList.add("hidden");$("#continueSection").classList.add("hidden");$("#trendingSection").classList.toggle("hidden",view==="mylist"||view==="profile");$("#categories").classList.remove("hidden")}renderCatalog();window.scrollTo({top:0,behavior:"smooth"})}

function videoEmbedUrl(raw){
  let u; try { u=new URL(raw); } catch(e) { return null; }
  const host=u.hostname.replace(/^www\./,'').toLowerCase();
  if(host==='youtu.be'){const id=u.pathname.slice(1);return id?`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`:null;}
  if(host==='youtube.com'||host==='m.youtube.com'||host==='youtube-nocookie.com'){
    let id=u.searchParams.get('v');
    if(u.pathname.startsWith('/embed/')) id=u.pathname.split('/')[2];
    if(u.pathname.startsWith('/shorts/')) id=u.pathname.split('/')[2];
    return id?`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`:null;
  }
  if(host==='drive.google.com'){
    const m=u.pathname.match(/\/file\/d\/([^/]+)/);
    return m?`https://drive.google.com/file/d/${m[1]}/preview`:null;
  }
  if(/\.(mp4|webm|ogg)(\?.*)?$/i.test(u.pathname+u.search)) return raw;
  // Generic web pages are attempted in an iframe; some sites block embedding.
  return raw;
}
function openWatchPage(t){
  const page=document.getElementById('watchPage');
  const frame=document.getElementById('watchFrame');
  const video=document.getElementById('watchVideo');
  document.getElementById('watchPageTitle').textContent=t.title;
  document.getElementById('watchPageMeta').textContent=`${t.year} · ${t.category} · ${t.genre}`;
  document.getElementById('watchPageDescription').textContent=t.description||'';
  frame.src='about:blank'; frame.classList.add('hidden'); video.pause(); video.removeAttribute('src'); video.load(); video.classList.add('hidden');
  const source=videoEmbedUrl(t.video||'');
  if(!source){toast('No valid video link has been added.');return;}
  if(/\.(mp4|webm|ogg)(\?.*)?$/i.test(source)){
    video.src=source; video.classList.remove('hidden'); video.play().catch(()=>{});
  }else{
    frame.src=source; frame.classList.remove('hidden');
  }
  page.classList.remove('hidden'); document.body.style.overflow='hidden';
  document.getElementById('detailModal').classList.add('hidden');
}
function closeWatchPage(){
  const page=document.getElementById('watchPage');
  const frame=document.getElementById('watchFrame');
  const video=document.getElementById('watchVideo');
  frame.src='about:blank'; video.pause(); video.removeAttribute('src'); video.load();
  page.classList.add('hidden'); document.body.style.overflow='';
}

function openDetail(id){const t=titles.find(x=>x.id===Number(id));if(!t)return;$("#modalArt").style.setProperty("--art",gradients(t));$("#modalArt").innerHTML=`<strong>${t.title}</strong>`;$("#modalTitle").textContent=t.title;$("#modalType").textContent=`${t.label} · ${t.type.toUpperCase()}`;$("#modalMeta").textContent=`${t.year}  •  ${t.category}  •  ${t.genre}  •  ★ ${t.rating}`;$("#modalDescription").textContent=t.description;$("#modalSave").innerHTML=watchlist.includes(t.id)?"♥ &nbsp; Saved":"＋ &nbsp; My List";$("#modalSave").dataset.save=t.id;$("#modalWatch").onclick=()=>{if(t.video){openWatchPage(t);}else{toast("No video link has been added yet.");}};$("#detailModal").classList.remove("hidden");document.body.style.overflow="hidden"}
function closeModal(){$("#detailModal").classList.add("hidden");document.body.style.overflow=""}
function toggleSave(id){id=Number(id);if(watchlist.includes(id)){watchlist=watchlist.filter(x=>x!==id);toast("Removed from My List")}else{watchlist.push(id);toast("Added to My List ♡")}localStorage.setItem("patilneo-watchlist",JSON.stringify(watchlist));renderCatalog();renderTrending();if(!$("#detailModal").classList.contains("hidden"))$("#modalSave").innerHTML=watchlist.includes(id)?"♥ &nbsp; Saved":"＋ &nbsp; My List"}
function filterCategory(cat){activeCategory=cat;$$(".category-chip").forEach(b=>b.classList.toggle("selected",b.dataset.category===cat));if(activeView!=="home")activeView="home";renderCatalog()}
$("#searchToggle").addEventListener("click",()=>{$("#searchPanel").classList.toggle("hidden");if(!$("#searchPanel").classList.contains("hidden"))$("#searchInput").focus()});
$("#searchInput").addEventListener("input",e=>{query=e.target.value;renderCatalog()});
$("#clearSearch").addEventListener("click",()=>{$("#searchInput").value="";query="";renderCatalog()});
$("#categories").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(b)filterCategory(b.dataset.category)});
document.addEventListener("click",e=>{const view=e.target.closest("[data-view]");if(view){setView(view.dataset.view);return}const save=e.target.closest("[data-save]");if(save){e.stopPropagation();toggleSave(save.dataset.save);return}const watch=e.target.closest("[data-watch]");if(watch){openDetail(watch.dataset.watch);return}const card=e.target.closest("[data-id]");if(card){openDetail(card.dataset.id)}});
$("#modalClose").addEventListener("click",closeModal);$("#modalBackdrop").addEventListener("click",closeModal);
$("#heroExplore").addEventListener("click",()=>setView("movies"));$("#promoExplore").addEventListener("click",()=>setView("movies"));$("#heroList").addEventListener("click",()=>{const t=titles[0];toggleSave(t.id)});
$("#profileBtn").addEventListener("click",()=>setView("profile"));$("#menuBtn").addEventListener("click",()=>toast("Use the bottom navigation to explore PATILNEO."));
document.getElementById("watchBack").addEventListener("click",closeWatchPage);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeWatchPage();closeModal();}});

// PATIL NEO shared catalogue: built-in demo titles plus Firestore titles.
const PATILNEO_ADMIN_UID = "mc7ClIcpnDXFfhMFYVnDsIw1Qo13";
let patilneoDb = null;
try {
  if (window.firebase && window.PATILNEO_FIREBASE_CONFIG) {
    if (!firebase.apps.length) firebase.initializeApp(window.PATILNEO_FIREBASE_CONFIG);
    patilneoDb = firebase.firestore();
  }
} catch (err) { console.error("PATIL NEO Firebase init:", err); }

function startSharedCatalogue() {
  if (!patilneoDb) return;
  patilneoDb.collection("movies").onSnapshot(snapshot => {
    const shared = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: "fb_" + doc.id,
        firestoreId: doc.id,
        title: d.title || "Untitled",
        category: d.category || "Custom",
        genre: d.genre || "Other",
        year: Number(d.year) || 2026,
        rating: d.rating || "—",
        type: d.type || "Movie",
        label: d.label || "NEW",
        colors: d.colors || ["#201035", "#8e3cff"],
        description: d.description || "",
        poster: d.poster || "",
        video: d.video || "",
        progress: 0
      };
    });
    titles = [...shared, ...titles.filter(t => !String(t.id).startsWith("fb_"))];
    renderContinue(); renderTrending(); renderCatalog();
  }, err => console.error("PATIL NEO catalogue read:", err));
}

startSharedCatalogue();
renderContinue();renderTrending();renderCatalog();
