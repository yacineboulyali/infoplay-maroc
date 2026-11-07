(()=>{function x(i,e,...t){let n=document.createElement(i);if(e)for(let s in e){let r=e[s];r==null||r===!1||(s==="class"?n.className=r:s.startsWith("on")&&typeof r=="function"?n.addEventListener(s.slice(2),r):s==="value"?n.value=r:n.setAttribute(s,r===!0?"":String(r)))}return zh(n,t),n}function zh(i,e){for(let t of e)t==null||t===!1||(Array.isArray(t)?zh(i,t):i.append(t.nodeType?t:document.createTextNode(String(t))))}var bm=Math.random;function fi(i,e=!0){let t=i.length,n=i.slice();for(let s=0;s<10;s++){n=i.slice();for(let r=t-1;r>0;r--){let a=Math.floor(bm()*(r+1));[n[r],n[a]]=[n[a],n[r]]}if(!e||t<2||n.some((r,a)=>r!==i[a]))break}return n}var at=i=>String(i??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[’']/g,"'").replace(/\s+/g," ").trim(),Gi=i=>typeof i=="number"?String(Math.round(i*1e6)/1e6).replace(".",","):String(i);function Oa(i){let e=document.createElement("template");return e.innerHTML=i.trim(),e.content.firstElementChild}var It=()=>typeof document<"u"&&(document.body?.classList?.contains("reduced-motion")||typeof window<"u"&&window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);function Hh(){if(typeof window>"u"||typeof document>"u"||It())return;let i=document.createElement("canvas");i.className="confetti-canvas",i.setAttribute("aria-hidden","true"),Object.assign(i.style,{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",pointerEvents:"none",zIndex:"9999"}),document.body.append(i);let e=i.width=window.innerWidth||800,t=i.height=window.innerHeight||600,n=i.getContext&&i.getContext("2d");if(!n){i.remove();return}let s=["#f2b418","#2b3fc4","#c8431a","#15703f","#9159cf","#0a7467"],r=Array.from({length:60},()=>({x:e*(.2+Math.random()*.6),y:t*.35,vx:(Math.random()-.5)*12,vy:(Math.random()-.9)*14,size:Math.random()*7+4,color:s[Math.floor(Math.random()*s.length)],rot:Math.random()*360,vrot:(Math.random()-.5)*10,gravity:.38,alpha:1})),a=0;function o(){n.clearRect(0,0,e,t);let l=!1;for(let c of r)c.x+=c.vx,c.y+=c.vy,c.vy+=c.gravity,c.rot+=c.vrot,a>25&&(c.alpha-=.02),c.alpha>0&&(l=!0,n.save(),n.globalAlpha=Math.max(0,c.alpha),n.translate(c.x,c.y),n.rotate(c.rot*Math.PI/180),n.fillStyle=c.color,n.fillRect(-c.size/2,-c.size/2,c.size,c.size*.6),n.restore());a++,l&&a<90?requestAnimationFrame(o):i.remove()}requestAnimationFrame(o)}var Cc="infoplay.v1",Wh=/^m[1-4]-s\d{1,2}-a[1-4]$/,Vh=/^[A-Za-z0-9_-]{1,64}$/;var Ba=()=>globalThis.crypto&&crypto.randomUUID?crypto.randomUUID():"id-"+Date.now().toString(36)+Math.random().toString(36).slice(2,10);function Mm(){let i={};return{persistent:!1,get:e=>i[e]??null,set:(e,t)=>{i[e]=t},del:e=>{delete i[e]}}}function Pc(){try{let i="__ip_test";return localStorage.setItem(i,"1"),localStorage.removeItem(i),{persistent:!0,get:e=>localStorage.getItem(e),set:(e,t)=>localStorage.setItem(e,t),del:e=>localStorage.removeItem(e)}}catch{return Mm()}}var Rc=()=>({schemaVersion:1,installationId:Ba(),profiles:[],activeProfileId:null,progressByProfile:{}}),_s=(i,e)=>String(i??"").replace(/[\u0000-\u001f\u007f<>]/g,"").trim().slice(0,e),Gh=i=>{let e=new Date(i);return isNaN(e)?new Date().toISOString():e.toISOString()};function qh(i,e=()=>!0){if(!i||typeof i!="object"||Array.isArray(i))return{ok:!1,error:"Le fichier ne contient pas une sauvegarde InfoPlay."};if(i.app!==void 0&&i.app!=="InfoPlay Maroc")return{ok:!1,error:"Ce fichier ne provient pas d\u2019InfoPlay Maroc."};if(i.schemaVersion!==1)return{ok:!1,error:"Version de sauvegarde non prise en charge ("+String(i.schemaVersion)+")."};if(!Array.isArray(i.profiles)||i.profiles.length>200)return{ok:!1,error:"Liste de profils invalide."};let t=[],n={},s=0,r=new Set;for(let a of i.profiles){if(!a||typeof a!="object"||typeof a.id!="string"||!Vh.test(a.id)||r.has(a.id)){s++;continue}let o=_s(a.displayName,24);if(!o){s++;continue}r.add(a.id),t.push({id:a.id,displayName:o,className:_s(a.className,12),createdAt:Gh(a.createdAt),preferences:Ic(a.preferences)});let l=i.progressByProfile&&typeof i.progressByProfile=="object"?i.progressByProfile[a.id]:null,c={};if(l&&typeof l=="object")for(let u of Object.keys(l)){if(!Wh.test(u)||!e(u)){s++;continue}let h=Array.isArray(l[u]?.attempts)?l[u].attempts.slice(0,100):[],p=[];for(let g of h){if(!g||typeof g.id!="string"||!Vh.test(g.id)||typeof g.score!="number"||!isFinite(g.score)){s++;continue}p.push({id:g.id,score:Math.round(Math.min(5,Math.max(0,g.score))*10)/10,maxScore:5,completedAt:Gh(g.completedAt),contentVersion:Number.isInteger(g.contentVersion)&&g.contentVersion>0?g.contentVersion:1})}p.sort((g,v)=>g.completedAt.localeCompare(v.completedAt)),p.length&&(c[u]={attempts:p})}n[a.id]=c}return{ok:!0,data:{profiles:t,progressByProfile:n},ignored:s}}function Ic(i){i=i&&typeof i=="object"?i:{};let e=Number(i.volume);return{reducedMotion:!!i.reducedMotion,largeText:!!i.largeText,highContrast:!!i.highContrast,soundEnabled:i.soundEnabled===void 0?!0:!!i.soundEnabled,hoverSound:!!i.hoverSound,volume:Number.isFinite(e)?Math.min(1,Math.max(0,e)):.45}}function $h(i=Pc(),e=()=>!0){let t,n=!1;function s(){let l=i.get(Cc);if(!l)return Rc();try{let c=JSON.parse(l),u=qh({...c,app:void 0},e);if(!u.ok)throw new Error(u.error);return{schemaVersion:1,installationId:typeof c.installationId=="string"?c.installationId.slice(0,64):Ba(),profiles:u.data.profiles,progressByProfile:u.data.progressByProfile,activeProfileId:u.data.profiles.some(h=>h.id===c.activeProfileId)?c.activeProfileId:null}}catch{try{i.set(Cc+".corrupt",l)}catch{}return n=!0,Rc()}}t=s();let r=!1,a=()=>{try{i.set(Cc,JSON.stringify(t)),r=!1}catch{r=!0}},o={get persistent(){return i.persistent!==!1&&!r},get recovered(){return n},state:()=>t,profiles:()=>t.profiles,active:()=>t.profiles.find(l=>l.id===t.activeProfileId)||null,setActive(l){t.activeProfileId=t.profiles.some(c=>c.id===l)?l:null,a()},logout(){t.activeProfileId=null,a()},createProfile(l,c=""){let u=_s(l,24);if(!u)throw new Error("Le pr\xE9nom ou pseudo est obligatoire.");if(t.profiles.length>=200)throw new Error("Trop de profils sur cet ordinateur.");let h={id:Ba().replace(/[^A-Za-z0-9_-]/g,"").slice(0,40),displayName:u,className:_s(c,12),createdAt:new Date().toISOString(),preferences:Ic({})};return t.profiles.push(h),t.progressByProfile[h.id]={},t.activeProfileId=h.id,a(),h},updateProfile(l,c){let u=t.profiles.find(h=>h.id===l);if(u){if(c.displayName!==void 0){let h=_s(c.displayName,24);if(!h)throw new Error("Le pr\xE9nom ou pseudo est obligatoire.");u.displayName=h}c.className!==void 0&&(u.className=_s(c.className,12)),c.preferences&&(u.preferences=Ic({...u.preferences,...c.preferences})),a()}},deleteProfile(l){t.profiles=t.profiles.filter(c=>c.id!==l),delete t.progressByProfile[l],t.activeProfileId===l&&(t.activeProfileId=null),a()},record(l,c){return(t.progressByProfile[l]||{})[c]},recordAttempt(l,c,u,h=1){if(!t.profiles.some(m=>m.id===l))throw new Error("Profil inconnu.");if(!Wh.test(c))throw new Error("Activit\xE9 inconnue.");let p=t.progressByProfile[l]||(t.progressByProfile[l]={}),g=p[c]||(p[c]={attempts:[]}),v={id:Ba().replace(/[^A-Za-z0-9_-]/g,"").slice(0,40),score:Math.round(Math.min(5,Math.max(0,u))*10)/10,maxScore:5,completedAt:new Date().toISOString(),contentVersion:h};return g.attempts.push(v),a(),g.attempts.length},first(l,c){let u=o.record(l,c);return u&&u.attempts.length?u.attempts[0].score:null},best(l,c){let u=o.record(l,c);return u&&u.attempts.length?Math.max(...u.attempts.map(h=>h.score)):null},exportJSON(l){let c=l?new Set(l):null,u=t.profiles.filter(p=>!c||c.has(p.id)),h={};for(let p of u)h[p.id]=t.progressByProfile[p.id]||{};return JSON.stringify({app:"InfoPlay Maroc",schemaVersion:1,exportedAt:new Date().toISOString(),installationId:t.installationId,profiles:u,progressByProfile:h},null,1)},importJSON(l){if(typeof l!="string"||l.length>5242880)return{ok:!1,error:"Fichier trop volumineux (maximum 5 Mo)."};let c;try{c=JSON.parse(l)}catch{return{ok:!1,error:"Fichier illisible : ce n\u2019est pas un JSON valide."}}let u=qh(c,e);if(!u.ok)return u;let h={ok:!0,profilesAdded:0,profilesMerged:0,attemptsAdded:0,ignored:u.ignored};for(let p of u.data.profiles){t.profiles.find(m=>m.id===p.id)?h.profilesMerged++:(t.profiles.push(p),t.progressByProfile[p.id]={},h.profilesAdded++);let v=t.progressByProfile[p.id]||(t.progressByProfile[p.id]={});for(let[m,d]of Object.entries(u.data.progressByProfile[p.id]||{})){let f=v[m]||(v[m]={attempts:[]}),b=new Set(f.attempts.map(M=>M.id));for(let M of d.attempts)b.has(M.id)||(f.attempts.push(M),h.attemptsAdded++);f.attempts.sort((M,y)=>M.completedAt.localeCompare(y.completedAt))}}return a(),h},resetAll(){t=Rc(),a()},csv(l){let c=h=>(h=String(h??""),/^[=+\-@\t\r]/.test(h)&&(h="'"+h),'"'+h.replace(/"/g,'""')+'"'),u=[["Profil","Classe","Module","S\xE9ance","Activit\xE9","Titre","Premier essai","Meilleur essai","Nombre d\u2019essais"].map(c).join(";")];for(let h of t.profiles)for(let p of l){let g=(t.progressByProfile[h.id]||{})[p.id];!g||!g.attempts.length||u.push([h.displayName,h.className,p.moduleId,p.sessionId,p.id,p.title,String(g.attempts[0].score).replace(".",","),String(Math.max(...g.attempts.map(v=>v.score))).replace(".",","),g.attempts.length].map(c).join(";"))}return"\uFEFF"+u.join(`\r
`)}};return o}var Tn=(i,e,t,n,s={})=>({mech:i,title:e,objective:t,data:n,...s}),ht=(i,e,t,n)=>Tn("match",i,e,{pairs:t},n),Nt=(i,e,t,n,s)=>Tn("sort",i,e,{cats:t,items:n},s),on=(i,e,t,n={})=>Tn("order",i,e,{steps:t,eq:n.eq,explain:n.explain},n),Pt=(i,e,t,n)=>Tn("fill",i,e,{lines:t},n),Lt=(i,e,t,n)=>Tn("quiz",i,e,{qs:t},n),Xt=(i,e,t,n,s={})=>Tn("hot",i,e,{scene:t,prompts:n,lines:s.lines},s),Xh=(i,e,t,n,s)=>Tn("asm",i,e,{parts:t,slots:n},s),Yh=(i,e,t,n,s)=>Tn("net",i,e,{devices:t,links:n},s),Zh=(i,e,t,n)=>Tn("robot",i,e,{levels:t},n),bs=(i,e,t,n,s)=>Tn("prog:"+t,i,e,{mode:t,tasks:n},s),Ft=(i,e,t,n,s,r)=>Tn("sim:"+t,i,e,{view:t,cfg:n,tasks:s},r),jh={match:"Clique sur un \xE9l\xE9ment de la colonne de gauche, puis sur la r\xE9ponse qui lui correspond \xE0 droite. Pour changer, recommence avec le m\xEAme \xE9l\xE9ment.",sort:"Clique sur une carte, puis sur la cat\xE9gorie o\xF9 la ranger (tu peux aussi la faire glisser). Clique sur une carte rang\xE9e pour la reprendre.",order:"Remets les \xE9l\xE9ments dans le bon ordre avec les boutons \u25B2 et \u25BC, puis clique sur \xAB V\xE9rifier \xBB.",fill:"Dans chaque phrase, choisis dans la liste le mot ou l\u2019expression qui convient.",quiz:"Lis chaque question et choisis une seule r\xE9ponse.",hot:"Choisis une consigne dans la liste, puis clique sur la zone correspondante de l\u2019image (ou choisis-la dans la liste de zones).",asm:"Choisis un composant, puis clique sur l\u2019emplacement qui lui correspond dans le bo\xEEtier.",net:"Relie les \xE9quipements deux par deux en cliquant dessus. Ne branche que les c\xE2bles n\xE9cessaires.",robot:"Programme le robot niveau par niveau : ajoute des commandes, ex\xE9cute, corrige. Clique sur \xAB V\xE9rifier \xBB quand tu as fini.",prog:"R\xE9ponds en suivant l\u2019algorithme pas \xE0 pas, comme le ferait l\u2019ordinateur.",sim:"Fais l\u2019action demand\xE9e dans la simulation, puis clique sur \xAB Valider l\u2019\xE9tape \xBB. Rien de r\xE9el n\u2019est modifi\xE9 sur ton ordinateur."},Jh={match:"Commence par les associations dont tu es s\xFBr(e), les autres deviennent plus faciles.",sort:"Demande-toi ce que fait chaque \xE9l\xE9ment : il re\xE7oit, transforme, affiche ou conserve ?",order:"Rep\xE8re d\u2019abord la premi\xE8re et la derni\xE8re \xE9tape.",fill:"Relis la phrase \xE0 voix basse avec chaque proposition.",quiz:"\xC9limine d\u2019abord les r\xE9ponses qui n\u2019ont aucun rapport avec la question.",hot:"Regarde la forme, la position et le texte de chaque zone avant de cliquer.",asm:"Les indices d\xE9crivent la forme et la place de chaque emplacement.",net:"Chaque poste doit \xEAtre reli\xE9 au commutateur, pas directement aux autres.",robot:"Dessine le chemin sur une feuille puis traduis-le en commandes.",prog:"Note la valeur de chaque variable apr\xE8s chaque ligne.",sim:"Relis l\u2019\xE9tape : elle d\xE9crit exactement l\u2019\xE9tat attendu \xE0 la fin."};var Kh={id:1,title:"G\xE9n\xE9ralit\xE9s sur les syst\xE8mes informatiques",short:"Syst\xE8mes informatiques",icon:"\u{1F5A5}\uFE0F",color:"m1",sessions:[{title:"D\xE9finitions et vocabulaire de base",topics:["information","traitement","informatique","syst\xE8me informatique"],acts:[ht("Associe les d\xE9finitions","Associer chaque notion de base \xE0 sa d\xE9finition.",[["Information","\xC9l\xE9ment de connaissance (texte, nombre, image, son) que l\u2019on peut repr\xE9senter, conserver ou communiquer."],["Traitement","Op\xE9ration appliqu\xE9e \xE0 des informations pour obtenir un r\xE9sultat (calculer, trier, classer\u2026)."],["Informatique","Science du traitement automatique de l\u2019information par des ordinateurs."],["Syst\xE8me informatique","Ensemble form\xE9 du mat\xE9riel (ordinateur, p\xE9riph\xE9riques) et des logiciels qui traitent l\u2019information."],["Donn\xE9e","Information brute, avant tout traitement, comme la note 14 ou le mot \xAB Rabat \xBB."]]),Nt("Information ou traitement ?","Distinguer une information d\u2019une op\xE9ration de traitement.",["Information","Traitement"],[["25 \xB0C",0,"C\u2019est une donn\xE9e mesur\xE9e."],["La note 15/20",0,"C\u2019est une donn\xE9e."],["Le pr\xE9nom \xAB Salma \xBB",0,"C\u2019est une donn\xE9e de type texte."],["La ville de F\xE8s",0,"C\u2019est une donn\xE9e."],["Une photo de classe",0,"C\u2019est une information sous forme d\u2019image."],["Calculer une moyenne",1,"On transforme des donn\xE9es en r\xE9sultat."],["Trier des noms par ordre alphab\xE9tique",1,"Trier est une op\xE9ration."],["Convertir des dirhams en euros",1,"Op\xE9ration de calcul."],["Corriger les fautes d\u2019un texte",1,"Op\xE9ration de modification."],["Rechercher un mot dans un document",1,"Op\xE9ration sur l\u2019information."]]),Pt("Compl\xE9ter le sch\xE9ma Entr\xE9e \u2192 Traitement \u2192 Sortie","Placer les trois \xE9tapes du fonctionnement d\u2019un syst\xE8me informatique.",[["Les informations de d\xE9part (deux nombres tap\xE9s au clavier) constituent l\u2019[[entr\xE9e|sortie|traitement]].","Ce qui est fourni au syst\xE8me au d\xE9part s\u2019appelle l\u2019entr\xE9e."],["Additionner ces deux nombres est une op\xE9ration de [[traitement|entr\xE9e|sortie]].","Le calcul transforme les donn\xE9es."],["Le r\xE9sultat affich\xE9 \xE0 l\u2019\xE9cran est la [[sortie|entr\xE9e|donn\xE9e brute]].","Ce que le syst\xE8me restitue est la sortie."],["Dans l\u2019ordre logique, c\u2019est le [[traitement|r\xE9sultat|clavier]] qui transforme l\u2019information d\u2019entr\xE9e en information de sortie.","Le traitement est l\u2019\xE9tape interm\xE9diaire."],["Un correcteur re\xE7oit un texte (entr\xE9e), le corrige (traitement) et affiche un texte [[corrig\xE9|inchang\xE9|supprim\xE9]] (sortie).","La sortie est le r\xE9sultat du traitement."]]),Lt("Mission : le bulletin scolaire","Identifier entr\xE9e, traitement et sortie dans la production d\u2019un bulletin.",[["Pour calculer la moyenne de Sara, quelles sont les informations d\u2019entr\xE9e ?",["Ses notes dans chaque mati\xE8re et les coefficients","La moyenne finale","Le bulletin imprim\xE9","Le nom de l\u2019\xE9cole seulement"],"Les notes sont les donn\xE9es de d\xE9part."],["Quelle op\xE9ration constitue le traitement ?",["Multiplier chaque note par son coefficient, additionner, puis diviser par la somme des coefficients","\xC9crire le nom de l\u2019\xE9l\xE8ve","Imprimer la feuille","Brancher l\u2019imprimante"],"Le traitement transforme les notes en moyenne."],["Que repr\xE9sente la moyenne affich\xE9e sur le bulletin ?",["Une information de sortie, r\xE9sultat du traitement","Une information d\u2019entr\xE9e","Un logiciel","Un p\xE9riph\xE9rique"],"Elle est produite par le traitement."],["Le professeur corrige une note. Que faut-il refaire ?",["Relancer le traitement avec la note corrig\xE9e pour obtenir une nouvelle moyenne","Rien, la moyenne se corrige seule","Changer d\u2019ordinateur","Supprimer tous les bulletins"],"Une entr\xE9e modifi\xE9e impose un nouveau traitement."],["Le bulletin complet est produit par :",["Un syst\xE8me informatique (mat\xE9riel + logiciels + donn\xE9es)","Le seul clavier","La seule imprimante","Uniquement l\u2019\xE9cran"],"Plusieurs \xE9l\xE9ments travaillent ensemble."]])]},{title:"Sch\xE9ma fonctionnel d\u2019un ordinateur",topics:["entr\xE9e","traitement","sortie","stockage"],acts:[Nt("Construis le sch\xE9ma","Placer chaque \xE9l\xE9ment dans le bloc fonctionnel qui lui correspond.",["Entr\xE9e","Traitement","Sortie","Stockage"],[["Clavier",0,"Il envoie des informations \xE0 l\u2019ordinateur."],["Souris",0,"Elle envoie des positions et des clics."],["Scanner",0,"Il fait entrer une image dans l\u2019ordinateur."],["Processeur (CPU)",1,"Il ex\xE9cute les calculs."],["M\xE9moire vive (RAM)",1,"Elle contient ce que le processeur utilise en ce moment."],["\xC9cran",2,"Il affiche le r\xE9sultat."],["Haut-parleurs",2,"Ils restituent le son."],["Imprimante",2,"Elle produit le r\xE9sultat sur papier."],["Disque dur / SSD",3,"Il conserve les fichiers durablement."],["Cl\xE9 USB",3,"Elle conserve des fichiers et se transporte."]]),ht("Relie les p\xE9riph\xE9riques","Associer chaque p\xE9riph\xE9rique \xE0 son r\xF4le.",[["Clavier","Saisir du texte et des commandes"],["Souris","Pointer et s\xE9lectionner \xE0 l\u2019\xE9cran"],["\xC9cran","Afficher le r\xE9sultat sous forme visuelle"],["Imprimante","Produire le r\xE9sultat sur papier"],["Disque dur","Conserver durablement les fichiers"]]),on("Le parcours de l\u2019information","Ordonner les \xE9tapes entre la frappe d\u2019une touche et l\u2019affichage.",["Tu tapes la touche A sur le clavier.","Le clavier envoie le signal \xE0 l\u2019unit\xE9 centrale.","Le processeur traite l\u2019information avec la m\xE9moire.","Le syst\xE8me pr\xE9pare l\u2019image de la lettre.","La lettre A s\u2019affiche sur l\u2019\xE9cran."],{explain:"Le chemin suit toujours entr\xE9e \u2192 traitement \u2192 sortie."}),Ft("Mission ordinateur","Simuler la saisie de deux nombres, leur addition, l\u2019affichage et l\u2019enregistrement.","calc",{},[["Saisis le nombre 12 dans la premi\xE8re case (entr\xE9e).",{a:12},"La saisie est l\u2019\xE9tape d\u2019entr\xE9e."],["Saisis le nombre 30 dans la deuxi\xE8me case.",{b:30},"Les deux donn\xE9es sont pr\xEAtes."],["Lance le traitement : clique sur \xAB Additionner \xBB.",{calc:!0},"Le processeur calcule 12 + 30."],["Fais afficher le r\xE9sultat sur l\u2019\xE9cran (sortie).",{shown:!0},"On ne peut afficher qu\u2019un r\xE9sultat d\xE9j\xE0 calcul\xE9."],["Conserve le r\xE9sultat dans le stockage.",{saved:!0},"Le stockage garde le r\xE9sultat apr\xE8s l\u2019extinction."]])]},{title:"P\xE9riph\xE9riques et unit\xE9 centrale",topics:["processeur","m\xE9moire vive","stockage","carte m\xE8re","p\xE9riph\xE9riques"],acts:[Xt("Reconnais les composants","Identifier les composants principaux sur un sch\xE9ma de l\u2019int\xE9rieur du bo\xEEtier.","pc",[["ram","Clique sur la m\xE9moire vive (RAM).","La RAM est form\xE9e de barrettes longues enfich\xE9es dans des fentes."],["cpu","Clique sur le processeur (CPU).","Le processeur est le cerveau qui ex\xE9cute les instructions."],["mobo","Clique sur la carte m\xE8re.","Elle relie tous les composants."],["ssd","Clique sur l\u2019unit\xE9 de stockage SSD.","Elle conserve les fichiers m\xEAme \xE9teinte."],["psu","Clique sur l\u2019alimentation.","Elle transforme le courant de la prise pour les composants."]]),Nt("Classe les p\xE9riph\xE9riques","Classer des p\xE9riph\xE9riques selon leur r\xF4le (entr\xE9e, sortie, les deux, stockage).",["Entr\xE9e","Sortie","Entr\xE9e et sortie","Stockage"],[["Souris",0,"Elle envoie des informations seulement."],["Microphone",0,"Il capte le son."],["Scanner",0,"Il num\xE9rise un document."],["Vid\xE9oprojecteur",1,"Il projette l\u2019image."],["Haut-parleurs",1,"Ils restituent le son."],["\xC9cran tactile",2,"Il affiche et re\xE7oit les touches."],["Casque avec micro",2,"Il \xE9coute et capte la voix."],["Imprimante multifonction",2,"Elle imprime (sortie) et num\xE9rise (entr\xE9e)."],["Cl\xE9 USB",3,"Elle conserve des fichiers."],["Disque dur externe",3,"Il conserve de grands volumes de donn\xE9es."]]),Xh("Assemble l\u2019ordinateur","Placer les composants au bon endroit dans le bo\xEEtier.",[{name:"Carte m\xE8re",icon:"\u{1F7E9}"},{name:"Processeur (CPU)",icon:"\u{1F532}"},{name:"M\xE9moire vive (RAM)",icon:"\u{1F4CF}"},{name:"Disque SSD",icon:"\u{1F4BE}"},{name:"Ventilateur",icon:"\u{1F300}"},{name:"Alimentation",icon:"\u{1F50C}"}],[{x:3,y:4,w:62,h:92,hint:"Grande plaque fix\xE9e au fond du bo\xEEtier, elle relie tous les composants",part:0,why:"la carte m\xE8re se fixe au fond du bo\xEEtier et re\xE7oit tous les autres composants."},{x:20,y:40,w:17,h:24,hint:"Support carr\xE9 au centre de la plaque",part:1,why:"le processeur se place dans le support (socket) de la carte m\xE8re."},{x:44,y:12,w:15,h:64,hint:"Fentes longues et fines \xE0 c\xF4t\xE9 du processeur",part:2,why:"les barrettes de RAM s\u2019enfichent dans les fentes de la carte m\xE8re."},{x:72,y:8,w:25,h:18,hint:"Baie de stockage au bord, reli\xE9e par un c\xE2ble de donn\xE9es",part:3,why:"le SSD se fixe dans une baie et se relie \xE0 la carte m\xE8re par c\xE2ble ; il ne se confond pas avec la RAM."},{x:18,y:10,w:22,h:24,hint:"Se pose au\u2011dessus du processeur pour \xE9vacuer la chaleur",part:4,why:"le ventilateur refroidit le processeur, qui chauffe beaucoup."},{x:72,y:64,w:25,h:30,hint:"Bloc en bas du bo\xEEtier qui re\xE7oit le courant de la prise",part:5,why:"l\u2019alimentation fournit le courant \xE0 tous les composants."}]),Lt("Mission d\xE9pannage","Choisir le mat\xE9riel adapt\xE9 \xE0 une situation et expliquer pourquoi.",[["L\u2019ordinateur est tr\xE8s lent quand on ouvre plusieurs programmes lourds. Quel composant ajouter en priorit\xE9 ?",["De la m\xE9moire vive (RAM)","Un second clavier","Un \xE9cran plus grand","Une imprimante"],"La RAM contient les programmes en cours d\u2019utilisation : plus elle est grande, plus l\u2019ordinateur respire."],["Le disque est plein : impossible d\u2019enregistrer de nouveaux fichiers. Que faire ?",["Lib\xE9rer de l\u2019espace ou ajouter un disque de stockage","Ajouter une souris","Changer le ventilateur","Brancher des haut-parleurs"],"Le stockage conserve les fichiers ; il manque de la place."],["Un \xE9l\xE8ve veut \xE9couter une vid\xE9o mais n\u2019entend rien. Quel p\xE9riph\xE9rique manque ?",["Des haut-parleurs ou un casque","Un scanner","Un microphone","Une imprimante"],"Le son est une sortie."],["L\u2019ordinateur chauffe beaucoup et ralentit. Quel \xE9l\xE9ment v\xE9rifier ?",["Le ventilateur de refroidissement (poussi\xE8re, panne)","Le clavier","La souris","Le fond d\u2019\xE9cran"],"Un mauvais refroidissement fait chauffer le processeur."],["Le professeur veut projeter la le\xE7on au tableau. Quel p\xE9riph\xE9rique de sortie choisir ?",["Un vid\xE9oprojecteur","Un scanner","Un microphone","Une webcam"],"Projeter une image est une sortie."]])]},{title:"Types de logiciels et domaines d\u2019application",topics:["logiciel de base","logiciel d\u2019application","domaines d\u2019utilisation"],acts:[ht("Associe les logiciels","Associer des logiciels courants \xE0 leur fonction.",[["Windows","Syst\xE8me d\u2019exploitation de nombreux PC : il g\xE8re le mat\xE9riel et lance les programmes"],["Android","Syst\xE8me d\u2019exploitation des t\xE9l\xE9phones et tablettes"],["Writer","Application pour r\xE9diger des documents"],["Calc","Application pour faire des calculs dans un tableau"],["Navigateur web","Application pour consulter des pages sur Internet"]]),Nt("Classe les logiciels","Distinguer logiciels de base et logiciels d\u2019application.",["Logiciel de base","Logiciel d\u2019application"],[["Windows",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["Linux",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["Android",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["macOS",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["iOS",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["Writer",1,"Application de r\xE9daction."],["Calc",1,"Application de calcul."],["Navigateur web",1,"Application de navigation."],["Lecteur de musique",1,"Application multim\xE9dia."],["Logiciel de dessin",1,"Application graphique."]]),Lt("Trouve le bon outil","Choisir le logiciel adapt\xE9 \xE0 un besoin.",[["Tu dois \xE9crire une lettre \xE0 la directrice. Quel outil choisis\u2011tu ?",["Un traitement de texte","Un tableur","Un navigateur","Un lecteur de musique"],"Le traitement de texte sert \xE0 r\xE9diger."],["Tu veux calculer les moyennes de la classe. Quel outil ?",["Un tableur","Un traitement de texte","Un logiciel de dessin","Un lecteur vid\xE9o"],"Le tableur calcule avec des formules."],["Tu veux chercher des informations sur Internet. Quel outil ?",["Un navigateur web","Un tableur","Un traitement de texte","Un antivirus"],"Le navigateur affiche les pages web."],["Tu veux cr\xE9er une affiche illustr\xE9e. Quel outil ?",["Un logiciel de dessin ou de mise en page","Un tableur","Un syst\xE8me d\u2019exploitation","Un navigateur"],"On dessine et on dispose images et texte."],["Tu dois pr\xE9senter un expos\xE9 avec des diapositives. Quel outil ?",["Un logiciel de pr\xE9sentation","Un antivirus","Un tableur","Un lecteur audio"],"Il sert \xE0 projeter des diapositives."]]),Pt("Mission \xE9cole num\xE9rique","\xC9quiper une salle informatique avec les logiciels adapt\xE9s et justifier.",[["Pour que les ordinateurs fonctionnent, chaque poste doit d\u2019abord avoir un [[syst\xE8me d\u2019exploitation|tableur|navigateur]].","Sans lui, aucun autre logiciel ne peut tourner."],["Les \xE9l\xE8ves r\xE9digent leurs comptes rendus avec un [[traitement de texte|lecteur audio|antivirus]].","Il sert \xE0 \xE9crire et \xE0 mettre en forme."],["Le professeur de math\xE9matiques calcule les moyennes avec un [[tableur|navigateur|logiciel de dessin]].","Le tableur fait les calculs automatiquement."],["Pour faire des recherches sur Internet, on installe un [[navigateur web|traitement de texte|tableur]].","Il affiche les pages web."],["Pour cr\xE9er l\u2019affiche de la f\xEAte de l\u2019\xE9cole, on utilise un [[logiciel de dessin ou de mise en page|tableur|syst\xE8me d\u2019exploitation]].","Il permet d\u2019assembler image et texte."]])]}]};var Qh=i=>i.text.trim().split(`
`),ed={id:2,title:"Les logiciels",short:"Les logiciels",icon:"\u{1F5C2}\uFE0F",color:"m2",groups:[{label:"Syst\xE8me d\u2019exploitation (6 h)",sessions:[1,2,3]},{label:"Traitement de texte (10 h)",sessions:[4,5,6,7,8]},{label:"Tableur (6 h)",sessions:[9,10,11]}],sessions:[{title:"Fonctionnalit\xE9s de base d\u2019un syst\xE8me d\u2019exploitation",topics:["gestion des programmes","des fichiers","des p\xE9riph\xE9riques","interface"],acts:[ht("Associe fonctions et d\xE9finitions","Relier chaque fonction d\u2019un syst\xE8me d\u2019exploitation \xE0 son r\xF4le.",[["Gestion des programmes","Lancer, arr\xEAter et r\xE9partir le temps du processeur entre les applications"],["Gestion de la m\xE9moire","Attribuer la m\xE9moire vive aux programmes en cours"],["Gestion des fichiers","Organiser, nommer, ranger et retrouver les donn\xE9es sur le stockage"],["Gestion des p\xE9riph\xE9riques","Dialoguer avec le clavier, la souris ou l\u2019imprimante gr\xE2ce aux pilotes"],["Interface utilisateur","Permettre \xE0 l\u2019utilisateur de dialoguer avec l\u2019ordinateur (bureau, fen\xEAtres, ic\xF4nes)"]]),Lt("Identifie les syst\xE8mes d\u2019exploitation","Reconna\xEEtre des exemples de syst\xE8mes d\u2019exploitation.",[["Lequel de ces logiciels est un syst\xE8me d\u2019exploitation ?",["Windows","Writer","Calc","Un navigateur web"],"Windows g\xE8re le mat\xE9riel et lance les autres logiciels."],["Quel syst\xE8me \xE9quipe la plupart des smartphones de la classe (hors iPhone) ?",["Android","Writer","Calc","Un tableur"],"Android est un syst\xE8me d\u2019exploitation pour t\xE9l\xE9phones et tablettes."],["Linux est :",["Un syst\xE8me d\u2019exploitation libre","Un traitement de texte","Un navigateur","Un type de cl\xE9 USB"],"Linux existe en de nombreuses versions gratuites."],["macOS est le syst\xE8me d\u2019exploitation :",["Des ordinateurs de la marque Apple","De toutes les imprimantes","Des cl\xE9s USB","Des routeurs uniquement"],"Chaque famille de machines a ses syst\xE8mes."],["Un syst\xE8me d\u2019exploitation s\u2019installe :",["Avant les logiciels d\u2019application, car ils en ont besoin pour fonctionner","Apr\xE8s chaque document cr\xE9\xE9","Uniquement dans l\u2019imprimante","Dans la souris"],"Il est la base sur laquelle tournent les applications."]]),Nt("Classe les responsabilit\xE9s","S\xE9parer ce que fait le syst\xE8me d\u2019exploitation et ce que fait une application.",["R\xF4le du syst\xE8me d\u2019exploitation","R\xF4le d\u2019une application"],[["G\xE9rer la m\xE9moire vive",0,"Il r\xE9partit la m\xE9moire entre les programmes."],["Lancer et arr\xEAter les programmes",0,"C\u2019est sa mission de base."],["G\xE9rer les fichiers et dossiers",0,"Il organise le stockage."],["Piloter l\u2019imprimante gr\xE2ce \xE0 son pilote",0,"Il fait le lien avec le mat\xE9riel."],["G\xE9rer les comptes des utilisateurs",0,"Il contr\xF4le les acc\xE8s."],["R\xE9diger une lettre",1,"T\xE2che d\u2019un traitement de texte."],["Calculer une moyenne",1,"T\xE2che d\u2019un tableur."],["Naviguer sur un site web",1,"T\xE2che d\u2019un navigateur."],["Dessiner un logo",1,"T\xE2che d\u2019un logiciel de dessin."],["Lire une vid\xE9o",1,"T\xE2che d\u2019un lecteur multim\xE9dia."]]),Pt("Mission OS","Choisir les bonnes actions pour lancer des applications, g\xE9rer des fichiers et du mat\xE9riel.",[["Pour ouvrir un programme, on double\u2011clique sur son [[ic\xF4ne|pilote|extension]] ; le syst\xE8me d\u2019exploitation le charge en m\xE9moire.","L\u2019ic\xF4ne est le point d\u2019entr\xE9e du programme."],["Quand on branche une cl\xE9 USB, le syst\xE8me la reconna\xEEt gr\xE2ce \xE0 un [[pilote|traitement de texte|fond d\u2019\xE9cran]].","Le pilote fait dialoguer syst\xE8me et mat\xE9riel."],["Pour retrouver un document, on passe par le [[gestionnaire de fichiers|tableur|navigateur]] du syst\xE8me.","Il montre dossiers et fichiers."],["Si deux programmes tournent ensemble, le syst\xE8me leur r\xE9partit la [[m\xE9moire et le temps du processeur|couleur du bureau|batterie de la souris]].","C\u2019est la gestion des programmes et de la m\xE9moire."],["Pour \xE9teindre proprement l\u2019ordinateur, on utilise la commande [[Arr\xEAter|Supprimer|Copier]] du menu D\xE9marrer.","Arr\xEAter ferme les programmes en s\xE9curit\xE9."]])]},{title:"Environnement d\u2019un syst\xE8me d\u2019exploitation",topics:["bureau","barre des t\xE2ches","menu D\xE9marrer","fen\xEAtres"],acts:[Xt("Explore le bureau","Rep\xE9rer les \xE9l\xE9ments de l\u2019environnement de travail.","desktop",[["start","Clique sur le bouton qui ouvre le menu D\xE9marrer.","Il se trouve \xE0 gauche de la barre du bas."],["taskbar","Clique sur la barre des t\xE2ches.","Elle montre les programmes ouverts."],["bin","Clique sur la corbeille.","Elle garde les fichiers supprim\xE9s."],["win","Clique sur une fen\xEAtre.","Une fen\xEAtre affiche le contenu d\u2019un programme."],["tray","Clique sur la zone de notification (heure).","Elle affiche l\u2019heure et l\u2019\xE9tat du syst\xE8me."]]),ht("Associe ic\xF4nes et r\xF4les","Relier chaque \xE9l\xE9ment \xE0 son r\xF4le.",[["\u{1F5D1}\uFE0F Corbeille","Contient les fichiers supprim\xE9s, qui peuvent \xEAtre restaur\xE9s"],["\u{1F4C1} Dossier","Regroupe des fichiers et d\u2019autres dossiers"],["\u{1F4C4} Fichier","Contient des donn\xE9es : texte, image, son\u2026"],["\u{1F517} Raccourci","Ouvre rapidement un programme ou un fichier situ\xE9 ailleurs"],["\u229E D\xE9marrer","Ouvre la liste des programmes et les commandes du syst\xE8me"]]),Ft("Manipule la fen\xEAtre","R\xE9duire, agrandir, restaurer et fermer une fen\xEAtre.","window",{init:{state:"normal"}},[["R\xE9duis la fen\xEAtre dans la barre des t\xE2ches.",{state:"min"},"R\xE9duire cache la fen\xEAtre mais le programme reste actif."],["Rouvre la fen\xEAtre depuis la barre des t\xE2ches.",{state:"normal"},"Un clic sur son bouton la fait r\xE9appara\xEEtre."],["Agrandis la fen\xEAtre pour occuper tout l\u2019\xE9cran.",{state:"max"},"Agrandir utilise tout l\u2019\xE9cran."],["Restaure la fen\xEAtre \xE0 sa taille pr\xE9c\xE9dente.",{state:"normal"},"Restaurer ram\xE8ne la taille habituelle."],["Ferme la fen\xEAtre.",{state:"closed"},"Fermer arr\xEAte le programme."]]),Lt("Mission Bureau","Choisir la bonne action sur le bureau dans une situation concr\xE8te.",[["Tu veux lancer un programme qui n\u2019est pas sur le bureau. O\xF9 cliques\u2011tu ?",["Sur le bouton D\xE9marrer","Sur la corbeille","Sur l\u2019horloge","Sur le bureau vide"],"Le menu D\xE9marrer liste les programmes install\xE9s."],["Tu as trop de fen\xEAtres ouvertes. Comment passer de l\u2019une \xE0 l\u2019autre ?",["En cliquant sur leurs boutons dans la barre des t\xE2ches","En vidant la corbeille","En changeant le fond d\u2019\xE9cran","En \xE9teignant l\u2019ordinateur"],"La barre des t\xE2ches liste les fen\xEAtres ouvertes."],["Tu as supprim\xE9 un fichier par erreur (il est dans la corbeille). Que faire ?",["Ouvrir la corbeille et restaurer le fichier","Red\xE9marrer l\u2019ordinateur","R\xE9installer le syst\xE8me","Renommer le bureau"],"La corbeille permet de restaurer."],["Comment conna\xEEtre l\u2019heure et l\u2019\xE9tat du r\xE9seau ?",["Regarder la zone de notification \xE0 droite de la barre des t\xE2ches","Ouvrir la corbeille","Agrandir une fen\xEAtre","Regarder le menu Fichier"],"La zone de notification donne ces informations."],["Tu veux un acc\xE8s rapide \xE0 un document souvent utilis\xE9. Quelle solution ?",["Cr\xE9er un raccourci sur le bureau","Supprimer le document","Imprimer le document","R\xE9duire la fen\xEAtre"],"Un raccourci \xE9vite de chercher le fichier."]])]},{title:"Gestion des fichiers et dossiers",topics:["fichier","dossier","extension","cr\xE9er, renommer, copier, d\xE9placer, supprimer"],acts:[Lt("Fichier, dossier ou raccourci ?","Identifier un fichier, un dossier et un raccourci.",[["Un fichier est :",["Un ensemble de donn\xE9es enregistr\xE9 sous un nom, par exemple devoir.docx","Un endroit qui contient seulement d\u2019autres \xE9l\xE9ments","Un c\xE2ble r\xE9seau","Un composant de la carte m\xE8re"],"Un fichier contient des donn\xE9es."],["Un dossier sert \xE0 :",["Regrouper et ranger des fichiers et d\u2019autres dossiers","Calculer des moyennes","Afficher une image \xE0 l\u2019\xE9cran","Imprimer sans papier"],"Les dossiers organisent le stockage."],["Un raccourci est :",["Un lien qui ouvre un \xE9l\xE9ment situ\xE9 ailleurs","Une copie compl\xE8te du fichier","Un virus","Un dossier vide"],"Il renvoie vers l\u2019original."],["Quelle ic\xF4ne repr\xE9sente un dossier ?",["\u{1F4C1}","\u{1F4C4}","\u{1F517}","\u{1F5BC}\uFE0F"],"Le dossier ressemble \xE0 une chemise."],["Si on supprime un raccourci, que devient le fichier d\u2019origine ?",["Il reste \xE0 son emplacement","Il est supprim\xE9 aussi","Il devient un dossier","Il change de nom"],"Seul le lien dispara\xEEt."]]),ht("Extensions et types de fichiers","Associer chaque extension au type de fichier.",[[".docx","Document de traitement de texte"],[".xlsx","Classeur de tableur"],[".jpg","Image (photo)"],[".mp3","Fichier audio"],[".mp4","Vid\xE9o"]]),Nt("Organise tes fichiers","Ranger des fichiers dans le bon dossier.",["Dossier Maths","Dossier Photos","Dossier Musique"],[["cours_geometrie.docx",0,"Un cours de g\xE9om\xE9trie va avec les math\xE9matiques."],["fractions.xlsx",0,"Des calculs de fractions : math\xE9matiques."],["theoreme_Pythagore.pdf",0,"Un th\xE9or\xE8me : math\xE9matiques."],["voyage_Marrakech.jpg",1,"Une photo de voyage."],["classe_2AC.png",1,"Une image de classe."],["portrait_Atlas.jpg",1,"Une photo."],["chanson_ecole.mp3",2,"Un fichier audio."],["concert.mp3",2,"Un fichier audio."],["rythme.wav",2,"Un fichier audio."],["hymne.mp3",2,"Un fichier audio."]]),Ft("Mission Explorateur","Cr\xE9er, renommer, copier, d\xE9placer, supprimer et restaurer dans un explorateur simul\xE9.","fs",{tree:{n:"Mes documents",k:[{n:"Cours",k:[{n:"maths.docx"}]},{n:"Photos",k:[{n:"plage.jpg"}]},{n:"notes.txt"},{n:"brouillon.txt"}]}},[["Cr\xE9e un nouveau dossier nomm\xE9 Sciences dans Mes documents (s\xE9lectionne le dossier racine, \xE9cris le nom, clique sur \xAB Nouveau dossier \xBB).",(i,e)=>!!e.find("Sciences")?.dir,"Un nouveau dossier se cr\xE9e l\xE0 o\xF9 l\u2019on est plac\xE9.",(i,e)=>e.mkdir("","Sciences")],["Renomme le fichier notes.txt en notes_2AC.txt.",(i,e)=>!!e.find("notes_2AC.txt")&&!e.find("notes.txt"),"Renommer change le nom sans changer le contenu.",(i,e)=>e.rename("notes.txt","notes_2AC.txt")],["Copie plage.jpg dans le dossier Sciences : l\u2019original doit rester dans Photos.",(i,e)=>!!e.find("Sciences/plage.jpg")&&!!e.find("Photos/plage.jpg"),"Copier cr\xE9e un double ; l\u2019original reste en place.",(i,e)=>e.copy("Photos/plage.jpg","Sciences")],["D\xE9place maths.docx du dossier Cours vers Sciences (couper puis coller).",(i,e)=>!!e.find("Sciences/maths.docx")&&!e.find("Cours/maths.docx"),"D\xE9placer retire le fichier de son ancien dossier.",(i,e)=>e.move("Cours/maths.docx","Sciences")],["Supprime brouillon.txt : il doit se retrouver dans la corbeille.",(i,e)=>e.inBin("brouillon.txt")&&!e.find("brouillon.txt"),"Un fichier supprim\xE9 va d\u2019abord dans la corbeille.",(i,e)=>e.remove("brouillon.txt")],["Restaure brouillon.txt depuis la corbeille.",(i,e)=>!!e.find("brouillon.txt")&&!e.inBin("brouillon.txt"),"Restaurer remet le fichier dans son dossier d\u2019origine.",(i,e)=>e.restore("brouillon.txt")]])]},{title:"Traitement de texte : fonctionnalit\xE9s et environnement",topics:["fonctions d\u2019un traitement de texte","ruban","espace de travail"],acts:[Xt("D\xE9couvre la fen\xEAtre","Identifier les zones de l\u2019environnement d\u2019un traitement de texte.","word",[["ribbon","Clique sur le ruban qui regroupe les outils.","Le ruban contient les boutons de commande."],["tabs","Clique sur la zone des onglets.","Chaque onglet regroupe des commandes d\u2019un m\xEAme domaine."],["page","Clique sur la feuille o\xF9 l\u2019on tape le texte.","C\u2019est la zone d\u2019\xE9dition du document."],["status","Clique sur la barre d\u2019\xE9tat.","Elle indique la page et le nombre de mots."],["title","Clique sur la barre de titre.","Elle affiche le nom du document."]]),ht("Commandes et ic\xF4nes","Associer chaque ic\xF4ne \xE0 sa commande.",[["\u{1F4BE}","Enregistrer le document"],["\u21A9","Annuler la derni\xE8re action"],["\u{1F5A8}","Imprimer le document"],["\u{1F4C2}","Ouvrir un document existant"],["\u{1F50D}","Rechercher un mot dans le texte"]]),Nt("\xC9dition, mise en forme ou insertion ?","Classer des commandes selon leur famille.",["\xC9dition","Mise en forme","Insertion"],[["Copier",0,"Copier modifie le contenu."],["Couper",0,"Couper retire du texte."],["Coller",0,"Coller ajoute du texte copi\xE9."],["Gras",1,"Change l\u2019aspect des lettres."],["Centrer",1,"Change la position du texte."],["Soulign\xE9",1,"Change l\u2019aspect des lettres."],["Image",2,"Ajoute un objet."],["Tableau",2,"Ajoute un objet."],["Forme",2,"Ajoute un objet."],["Num\xE9ro de page",2,"Ajoute un \xE9l\xE9ment dans la page."]]),Ft("Mission Word","Cr\xE9er, nommer et enregistrer un document virtuel.","office",{show:["type","save"]},[["Clique dans la page et tape le mot \xAB Bonjour \xBB.",{text:"~bonjour"},"La saisie cr\xE9e le contenu."],["\xC9cris le nom \xAB exposeMaroc \xBB dans la case du nom de fichier.",{name:"=exposeMaroc"},"Un nom clair permet de retrouver le document."],["Choisis le dossier \xAB Mes documents \xBB.",{folder:"Mes documents"},"Le dossier d\xE9termine o\xF9 le fichier sera rang\xE9."],["Clique sur Enregistrer.",{saved:!0},"Tant qu\u2019on n\u2019enregistre pas, le travail n\u2019est pas conserv\xE9 (l\u2019\xE9toile * le rappelle)."],["Ajoute le mot \xAB Maroc \xBB dans le texte, puis enregistre de nouveau.",i=>at(i.text).includes("maroc")&&i.saved,"Apr\xE8s une modification, il faut r\xE9enregistrer.",i=>{i.text="Bonjour Maroc",i.saved=!0}]])]},{title:"Saisie et \xE9dition",topics:["saisie au clavier","correction","s\xE9lectionner, copier, couper, coller"],acts:[Lt("Le clavier en situation","Conna\xEEtre le r\xF4le des touches principales.",[["Quelle touche efface le caract\xE8re \xE0 gauche du curseur ?",["Retour arri\xE8re (\u232B)","Suppr","Entr\xE9e","Tabulation"],"Retour arri\xE8re efface vers la gauche."],["Quelle touche donne une lettre majuscule quand on la maintient avec une lettre ?",["Maj (Shift)","Ctrl","Alt","\xC9chap"],"Maj sert aux majuscules."],["Pour passer \xE0 la ligne et cr\xE9er un nouveau paragraphe, on appuie sur :",["Entr\xE9e","Espace","Suppr","\xC9chap"],"Entr\xE9e valide la ligne."],["Quelle touche efface le caract\xE8re \xE0 droite du curseur ?",["Suppr","Retour arri\xE8re","Entr\xE9e","Maj"],"Suppr efface vers la droite."],["Pour s\xE9parer deux mots, on utilise :",["La barre d\u2019espace","Verr. Maj","Ctrl","Alt"],"L\u2019espace s\xE9pare les mots."]]),Pt("Corrige le texte tap\xE9 trop vite","Rep\xE9rer et corriger des fautes de frappe et d\u2019orthographe.",[["Le professeur [[explique|esplique|expliquer]] la le\xE7on aux \xE9l\xE8ves.","Verbe expliquer conjugu\xE9."],["Les \xE9l\xE8ves [[sont|son|sons]] dans la salle informatique.","Verbe \xEAtre : \xAB sont \xBB."],["Nous [[utilisons|utilisont|utilisions]] un ordinateur pour \xE9crire.","Pr\xE9sent : \xAB nous utilisons \xBB."],["Il faut [[enregistrer|enregistr\xE9|enregistrait]] le document avant de fermer.","Apr\xE8s \xAB il faut \xBB, on met l\u2019infinitif."],["Ce texte contient des [[fautes|fautent|faute]] \xE0 corriger.","Le nom au pluriel s\u2019\xE9crit \xAB fautes \xBB."]]),on("Copier\u2011coller un mot","Ordonner les \xE9tapes pour copier un mot \xE0 un autre endroit.",["S\xE9lectionner le mot \xE0 copier.","Cliquer sur Copier (Ctrl + C).","Placer le curseur \xE0 l\u2019endroit voulu.","Cliquer sur Coller (Ctrl + V).","V\xE9rifier que le mot appara\xEEt \xE0 la nouvelle place."],{explain:"On s\xE9lectionne, on copie, on se place, on colle, puis on v\xE9rifie."}),Ft("Mission Secr\xE9taire","R\xE9diger un avis scolaire court.","office",{show:["type"]},[["\xC9cris le titre \xAB AVIS \xBB en majuscules.",i=>i.text.trim().startsWith("AVIS"),"Les majuscules s\u2019obtiennent avec Maj.",i=>{i.text="AVIS"}],["Passe \xE0 la ligne (touche Entr\xE9e) et \xE9cris : R\xE9union des parents le lundi",i=>i.text.includes(`
`)&&at(i.text).replace(/\s+/g," ").includes("avis reunion des parents le lundi"),"Entr\xE9e cr\xE9e un nouveau paragraphe.",i=>{i.text=`AVIS
R\xE9union des parents le lundi`}],["Ajoute \xE0 la suite : \xAB \xE0 17 h \xBB.",i=>at(i.text).includes("lundi a 17 h"),"L\u2019heure pr\xE9cise l\u2019information.",i=>{i.text=`AVIS
R\xE9union des parents le lundi \xE0 17 h`}],["Corrige : remplace \xAB lundi \xBB par \xAB mardi \xBB.",i=>!at(i.text).includes("lundi")&&at(i.text).includes("mardi a 17 h"),"Corriger \xE9vite de diffuser une erreur.",i=>{i.text=`AVIS
R\xE9union des parents le mardi \xE0 17 h`}],["Termine par une signature sur une nouvelle ligne : La direction",i=>Qh(i).length>=3&&at(Qh(i).at(-1))==="la direction","La signature se place \xE0 la fin.",i=>{i.text=`AVIS
R\xE9union des parents le mardi \xE0 17 h
La direction`}]])]},{title:"Mise en forme",topics:["gras, italique, soulign\xE9","police, taille, couleur","alignement"],acts:[ht("Effets et boutons","Associer chaque commande de mise en forme \xE0 son effet visible.",[["Gras (G)","Rend le texte plus \xE9pais"],["Italique (I)","Incline le texte"],["Soulign\xE9 (S)","Trace une ligne sous le texte"],["Centrer","Place le texte au milieu de la ligne"],["Couleur de police","Change la couleur des lettres"]]),Xt("Rep\xE8re les outils","Identifier la taille, la couleur et l\u2019alignement sur la barre d\u2019outils.","toolbar",[["size","Clique sur la zone de la taille de police.","Elle contient un nombre."],["color","Clique sur le bouton de la couleur du texte.","Le A color\xE9 change la couleur."],["alignC","Clique sur le bouton qui centre le texte.","Les traits sont au milieu."],["alignR","Clique sur le bouton qui aligne \xE0 droite.","Les traits sont coll\xE9s \xE0 droite."],["font","Clique sur la zone du nom de la police.","Elle est large et \xE0 gauche."]]),Lt("R\xE9pare le paragraphe","Corriger une mise en forme maladroite.",[["Le titre est petit et coll\xE9 \xE0 gauche. Pour le rendre bien visible, que faire ?",["L\u2019agrandir et le centrer","Le souligner cinq fois","Le mettre en blanc sur fond blanc","Le supprimer"],"Taille et alignement renforcent le titre."],["Tout le texte est en gras : on ne distingue plus l\u2019important. Que faire ?",["Garder le gras pour les mots importants seulement","Mettre aussi tout en italique","Tout souligner","R\xE9duire la taille \xE0 4"],"Le gras n\u2019a de sens que s\u2019il est rare."],["Le texte est en jaune clair sur fond blanc, illisible. Que faire ?",["Choisir une couleur fonc\xE9e et contrast\xE9e","Augmenter la luminosit\xE9 de l\u2019\xE9cran","Le souligner","Le mettre en italique"],"Le contraste permet la lecture."],["La date est mal plac\xE9e. Pour l\u2019aligner \xE0 droite, on utilise :",["Le bouton Aligner \xE0 droite","Le bouton Souligner","Le bouton Italique","Le bouton Enregistrer"],"L\u2019alignement se r\xE8gle avec les boutons d\u2019alignement."],["Le paragraphe est \xE9crit en taille 4, trop petit. Que faire ?",["Le s\xE9lectionner puis augmenter la taille (par exemple 12)","L\u2019imprimer en plus grand sans le changer","Le mettre en italique","Le centrer"],"La taille se change apr\xE8s s\xE9lection."]]),Ft("Mission Designer","Reproduire une annonce en respectant des consignes de mise en forme.","office",{show:["fmt"]},[["S\xE9lectionne le titre et mets-le en gras.",{"title.b":!0},"Le gras renforce un titre."],["Centre le titre.",{"title.al":"centre"},"Un titre est souvent centr\xE9."],["Mets le titre en taille 24.",{"title.sz":24},"Un titre est plus grand que le texte."],["Mets le titre en rouge.",{"title.col":"rouge"},"La couleur attire le regard (avec un bon contraste)."],["S\xE9lectionne le paragraphe et mets-le en italique.",{"para.i":!0},"L\u2019italique distingue un passage."]])]},{title:"Insertion d\u2019objets",topics:["image","tableau","formes"],acts:[Lt("Image, tableau ou forme ?","Identifier les objets que l\u2019on peut ins\xE9rer dans un document.",[["Quel objet permet d\u2019illustrer un texte avec une photo ?",["Une image","Un tableau","Une forme","Un saut de page"],"On ins\xE8re une image."],["Quel objet range des donn\xE9es en lignes et en colonnes ?",["Un tableau","Une image","Un titre","Une marge"],"Un tableau organise les donn\xE9es."],["Un cercle, un rectangle ou une fl\xE8che sont des :",["Formes","Images","Tableaux","Extensions"],"Ce sont des formes dessin\xE9es."],["Quel onglet contient les commandes pour ins\xE9rer image, tableau et forme ?",["Insertion","Accueil","R\xE9vision","Affichage"],"L\u2019onglet Insertion regroupe les objets."],["Pour num\xE9roter les pages, on choisit :",["Insertion puis Num\xE9ro de page","Accueil puis Gras","Affichage puis Zoom","R\xE9vision puis Orthographe"],"Le num\xE9ro de page est un \xE9l\xE9ment ins\xE9r\xE9."]]),ht("Objet et utilit\xE9","Associer chaque objet \xE0 son utilit\xE9.",[["Image","Illustrer ou d\xE9corer un document"],["Tableau","Pr\xE9senter des donn\xE9es organis\xE9es"],["Forme","Dessiner des fl\xE8ches, cadres ou symboles"],["Zone de texte","Placer un texte \xE0 un endroit libre de la page"],["Num\xE9ro de page","Rep\xE9rer chaque page du document"]]),on("Compose l\u2019affiche","Organiser les \xE9l\xE9ments d\u2019une affiche de haut en bas.",["Titre de l\u2019affiche","Image principale","Texte de pr\xE9sentation","Tableau des horaires","Coordonn\xE9es de contact en bas de page"],{explain:"Une affiche se lit de haut en bas : le titre attire, l\u2019image illustre, le texte explique, le tableau pr\xE9cise, le contact conclut."}),Ft("Mission Affiche","Assembler une affiche \xE9ducative dans un \xE9diteur simul\xE9.","office",{show:["fmt","insert"],title:"Journ\xE9e de l\u2019informatique",para:"Venez d\xE9couvrir les ordinateurs de la salle 12 !"},[["Ins\xE8re une image.",{img:!0},"Une image attire l\u2019\u0153il."],["Ins\xE8re un tableau.",{table:!0},"Un tableau pr\xE9sente les horaires."],["Ins\xE8re une forme.",{shape:!0},"Une forme met en valeur une information."],["Centre le titre.",{"title.al":"centre"},"Un titre d\u2019affiche est centr\xE9."],["Mets le titre en taille 18 ou plus.",i=>i["title.sz"]>=18,"Le titre doit \xEAtre lisible de loin.",{"title.sz":24}]])]},{title:"Mise en page et impression",topics:["marges","orientation","format du papier","aper\xE7u","impression"],acts:[ht("R\xE9glages de page","Associer chaque r\xE9glage \xE0 sa signification.",[["Marges","Espaces blancs entre le texte et le bord de la page"],["Orientation","Portrait (vertical) ou paysage (horizontal)"],["Format du papier","Dimensions de la feuille : A4, A5\u2026"],["Nombre de copies","Combien d\u2019exemplaires imprimer"],["Aper\xE7u avant impression","Voir le rendu avant de gaspiller du papier"]]),Xt("La fen\xEAtre d\u2019impression","Rep\xE9rer les parties de la bo\xEEte de dialogue d\u2019impression.","printdlg",[["copies","Clique sur la zone du nombre de copies.","Elle contient un nombre."],["preview","Clique sur l\u2019aper\xE7u de la page.","Il montre la page avant impression."],["printbtn","Clique sur le bouton qui lance l\u2019impression.","Le gros bouton en bas \xE0 droite."],["printer","Clique sur la zone du choix de l\u2019imprimante.","Elle est tout en haut."],["orient","Clique sur la zone de l\u2019orientation.","Elle contient \xAB Portrait \xBB."]]),Pt("Configure selon la situation","Choisir les r\xE9glages d\u2019impression adapt\xE9s \xE0 un sc\xE9nario.",[["Pour imprimer un tableau tr\xE8s large, on choisit l\u2019orientation [[paysage|portrait|diagonale]].","Le paysage offre plus de largeur."],["Pour donner 30 exemplaires \xE0 la classe, on r\xE8gle le nombre de [[copies|marges|polices]] sur 30.","Le champ \xAB copies \xBB fixe le nombre d\u2019exemplaires."],["Pour \xE9conomiser l\u2019encre d\u2019un brouillon, on imprime en [[noir et blanc|couleur|3D]].","Le noir et blanc consomme moins d\u2019encre color\xE9e."],["Pour n\u2019imprimer que la page 2, on choisit l\u2019\xE9tendue [[page 2 uniquement|tout le document|aucune page]].","On limite l\u2019impression aux pages voulues."],["Avant d\u2019imprimer, on consulte l\u2019[[aper\xE7u|enregistrement|copier\u2011coller]] pour v\xE9rifier la mise en page.","L\u2019aper\xE7u \xE9vite le gaspillage."]]),Ft("Mission Impression","Pr\xE9visualiser un document virtuel et choisir les bons r\xE9glages.","office",{show:["print"],title:"Emploi du temps de la classe",para:"Lundi \xE0 vendredi, de 8 h \xE0 17 h."},[["Choisis l\u2019orientation paysage.",{orient:"paysage"},"Un emploi du temps large tient mieux en paysage."],["Choisis le format de papier A4.",{paper:"A4"},"A4 est le format courant des classes."],["Choisis des marges \xE9troites.",{margins:"\xE9troites"},"Des marges \xE9troites donnent plus de place au contenu."],["R\xE8gle le nombre de copies sur 3.",{copies:3},"Le champ copies fixe le nombre d\u2019exemplaires."],["Clique sur Imprimer (impression simul\xE9e).",{printed:!0},"On lance l\u2019impression apr\xE8s avoir v\xE9rifi\xE9 les r\xE9glages."]])]},{title:"Tableur : fonctionnalit\xE9s et environnement",topics:["cellule","ligne","colonne","feuille","classeur"],acts:[Xt("D\xE9couvre le tableur","Identifier les \xE9l\xE9ments de l\u2019espace de travail d\u2019un tableur.","sheet",[["colhead","Clique sur l\u2019en\u2011t\xEAte d\u2019une colonne.","Les colonnes portent des lettres."],["rowhead","Clique sur l\u2019en\u2011t\xEAte d\u2019une ligne.","Les lignes portent des num\xE9ros."],["fbar","Clique sur la barre de formule.","Elle montre le contenu de la cellule active."],["tabs","Clique sur les onglets de feuilles.","Un classeur peut contenir plusieurs feuilles."],["namebox","Clique sur la zone qui donne l\u2019adresse de la cellule.","Elle affiche par exemple B3."]]),ht("Vocabulaire du tableur","Associer chaque terme \xE0 sa d\xE9finition.",[["Cellule","Intersection d\u2019une ligne et d\u2019une colonne"],["Ligne","Suite horizontale de cellules, rep\xE9r\xE9e par un num\xE9ro"],["Colonne","Suite verticale de cellules, rep\xE9r\xE9e par une lettre"],["Feuille","Page de calcul contenant des cellules"],["Classeur","Fichier du tableur contenant une ou plusieurs feuilles"]]),Ft("Place les valeurs par adresse","Saisir des valeurs dans des cellules d\xE9sign\xE9es par leur adresse.","sheet",{rows:5,cols:4,init:{}},[["Dans la cellule A1, \xE9cris le mot Nom.",{c:"A1",v:"Nom"},"A1 : colonne A, ligne 1."],["Dans la cellule B1, \xE9cris le mot Note.",{c:"B1",v:"Note"},"B1 : colonne B, ligne 1."],["Dans la cellule A2, \xE9cris le pr\xE9nom Sara.",{c:"A2",v:"Sara"},"A2 : colonne A, ligne 2."],["Dans la cellule B2, \xE9cris le nombre 14.",{c:"B2",v:14},"B2 : colonne B, ligne 2."],["Dans la cellule B3, \xE9cris le nombre 12.",{c:"B3",v:12},"B3 : colonne B, ligne 3."]]),Pt("Mission Notes : construire le tableau","Concevoir un tableau de notes.",[["Dans un tableau de notes, on \xE9crit les noms des \xE9l\xE8ves dans une [[colonne|feuille|barre de formule]] (par exemple la colonne A).","Une colonne est verticale."],["Chaque \xE9l\xE8ve occupe une [[ligne|extension|police]] du tableau.","Une ligne est horizontale."],["La cellule \xE0 l\u2019intersection de la colonne B et de la ligne 4 s\u2019appelle [[B4|4B|B\u20114]].","On \xE9crit d\u2019abord la lettre, puis le num\xE9ro."],["La premi\xE8re ligne contient souvent les [[en\u2011t\xEAtes (titres des colonnes)|r\xE9sultats cach\xE9s|formules d\u2019impression]].","Elle nomme chaque colonne."],["Pour calculer le total des notes, on \xE9crira une [[formule|image|marge]] qui commence par le signe =.","Une formule d\xE9bute par =."]])]},{title:"Formules, adressage et fonctions",topics:["formule","adresse de cellule","plage","SOMME, MOYENNE, MAX, MIN"],acts:[ht("Adresses et plages","Associer chaque adresse \xE0 sa position.",[["A1","Colonne A, ligne 1 (coin sup\xE9rieur gauche)"],["B3","Colonne B, ligne 3"],["C5","Colonne C, ligne 5"],["D2","Colonne D, ligne 2"],["A1:A5","Plage : les cellules de A1 jusqu\u2019\xE0 A5"]]),Pt("Compl\xE8te les formules","Compl\xE9ter des formules simples.",[["Une formule commence toujours par le signe [[=|+|#]].","Le signe = annonce un calcul."],["Pour additionner A1 et B1, on \xE9crit =[[A1+B1|A1B1|A1 et B1]].","On relie les adresses avec +."],["Pour additionner les cellules de B2 \xE0 B6 : =[[SOMME(B2:B6)|SOMME(B2;B6)|ADD(B2\u2011B6)]]","Les deux\u2011points d\xE9signent la plage enti\xE8re."],["Pour la moyenne des cellules C2 \xE0 C6 : =[[MOYENNE(C2:C6)|MOYEN(C2;C6)|MOY(C2\u2011C6)]]","La fonction s\u2019appelle MOYENNE."],["Si B2 contient 10 et C2 contient 4, la formule =B2*C2 affiche [[40|14|6]].","Le signe * multiplie."]]),Lt("D\xE9bogue les formules","Trouver les erreurs dans des formules.",[[`Formule saisie : SOMME(B2:B6)
Que faut\u2011il corriger ?`,["Ajouter le signe = au d\xE9but","Remplacer B2:B6 par B2\u2011B6","Supprimer les parenth\xE8ses","Rien, c\u2019est correct"],"Sans =, le tableur lit du texte."],["En C1, la formule =A1+B1 avec A1 = 5 et B1 = 7. Quel r\xE9sultat s\u2019affiche ?",["12","57","5+7","#NOM?"],"Les cellules sont additionn\xE9es : 5 + 7 = 12."],[`Formule : =MOYENNE(B2:B5
Que manque\u2011t\u2011il ?`,["La parenth\xE8se fermante )","Un point\u2011virgule final","Une seconde parenth\xE8se ouvrante","Le signe $"],"Chaque parenth\xE8se ouverte doit \xEAtre ferm\xE9e."],["La formule =B2*C2 est recopi\xE9e une ligne plus bas. Elle devient :",["=B3*C3","=B2*C2","=B2*C3","=B3*C2"],"Les adresses relatives avancent d\u2019une ligne."],["Une cellule affiche #DIV/0! avec =A1/B1. Cause probable :",["B1 contient 0 ou est vide","A1 contient un grand nombre","Le signe / n\u2019existe pas","La feuille est trop grande"],"On ne peut pas diviser par z\xE9ro."]]),Ft("Mission Moyennes","Calculer des moyennes, un total et un maximum avec des formules.","sheet",{rows:6,cols:4,init:{A1:"Nom",B1:"Maths",C1:"Physique",D1:"Moyenne",A2:"Sara",B2:"14",C2:"12",A3:"Omar",B3:"10",C3:"14",A4:"Lina",B4:"18",C4:"12",A5:"Total"}},[["En D2, calcule la moyenne de Sara avec une formule (=MOYENNE(B2:C2)).",{c:"D2",v:13,f:"=MOYENNE(B2:C2)"},"En fran\xE7ais on \xE9crit MOYENNE et les arguments se s\xE9parent par ;."],["En D3, calcule la moyenne d\u2019Omar avec une formule.",{c:"D3",v:12,f:"=MOYENNE(B3:C3)"},"(10 + 14) / 2 = 12."],["En D4, calcule la moyenne de Lina avec une formule.",{c:"D4",v:15,f:"=MOYENNE(B4:C4)"},"(18 + 12) / 2 = 15."],["En B5, calcule le total des notes de Maths avec SOMME.",{c:"B5",v:42,f:"=SOMME(B2:B4)"},"14 + 10 + 18 = 42."],["En C5, trouve la meilleure note de Physique avec MAX.",{c:"C5",v:14,f:"=MAX(C2:C4)"},"MAX renvoie la plus grande valeur de la plage."]])]},{title:"Graphiques",topics:["diagramme en barres","courbe","diagramme circulaire","titre, axes, l\xE9gende"],acts:[Xt("Reconnais les graphiques","Identifier des types de graphiques et leurs \xE9l\xE9ments.","charts",[["bar","Clique sur le diagramme en barres.","Il compare des valeurs avec des rectangles."],["line","Clique sur la courbe.","Elle suit une \xE9volution."],["pie","Clique sur le diagramme circulaire.","Il montre des parts d\u2019un total."],["axis","Clique sur l\u2019axe horizontal du diagramme en barres.","L\u2019axe horizontal porte les cat\xE9gories."],["legend","Clique sur la l\xE9gende.","Elle explique les couleurs."]]),ht("Quel graphique pour quelles donn\xE9es ?","Choisir le type de graphique adapt\xE9 aux donn\xE9es.",[["Comparer les notes de 5 \xE9l\xE8ves","Diagramme en barres"],["Suivre la temp\xE9rature heure par heure","Courbe"],["Montrer la part de chaque sport pr\xE9f\xE9r\xE9 en pourcentage","Diagramme circulaire"],["Relier la taille et le poids de chaque \xE9l\xE8ve","Nuage de points"],["Garder une liste de noms et de num\xE9ros","Tableau seul (pas de graphique)"]]),Pt("Compl\xE8te les \xE9l\xE9ments du graphique","Compl\xE9ter titre, axes et l\xE9gende.",[["Un graphique doit avoir un [[titre|virus|pilote]] qui dit ce qu\u2019il montre.","Le titre explique le sujet."],["L\u2019axe horizontal affiche souvent les [[cat\xE9gories (par exemple les mati\xE8res)|num\xE9ros de ligne|noms de fichiers]].","Ce sont les \xE9l\xE9ments compar\xE9s."],["L\u2019axe vertical affiche l\u2019[[\xE9chelle (les valeurs)|auteur|imprimante]].","Il permet de lire les valeurs."],["La [[l\xE9gende|barre d\u2019\xE9tat|r\xE8gle]] explique la signification des couleurs ou des s\xE9ries.","Sans l\xE9gende, on ne sait pas quelle couleur correspond \xE0 quoi."],["Un diagramme circulaire convient pour montrer des [[parts d\u2019un total|\xE9volutions dans le temps|adresses]].","Chaque secteur est une part du tout."]]),Ft("Mission Statistiques","Construire et interpr\xE9ter un graphique \xE0 partir des moyennes d\u2019une classe.","chart",{data:[["Maths",14],["Fran\xE7ais",12],["Anglais",15],["SVT",11],["Physique",13]],init:{type:"courbe"}},[["Choisis le type de graphique le plus adapt\xE9 pour comparer les mati\xE8res.",{type:"barres"},"Des barres comparent bien plusieurs cat\xE9gories."],["Donne un titre qui contient le mot \xAB moyennes \xBB.",{title:"~moyennes"},"Le titre pr\xE9cise ce que montre le graphique."],["Affiche les titres des axes.",{axes:!0},"Les axes doivent \xEAtre nomm\xE9s."],["Affiche la l\xE9gende.",{legend:!0},"La l\xE9gende aide \xE0 lire les couleurs."],["Interpr\xE8te : quelle mati\xE8re a la meilleure moyenne ?",{answer:"Anglais"},"La barre la plus haute est celle d\u2019Anglais (15)."]])]}]};var td={id:3,title:"Algorithmique et programmation",short:"Algorithmique",icon:"\u{1F916}",color:"m3",groups:[{label:"Notion d\u2019algorithme (4 h)",sessions:[1,2]},{label:"Structures de contr\xF4le de base (6 h)",sessions:[3,4,5]},{label:"Langages de programmation (6 h)",sessions:[6,7,8]}],languageNote:"Langage cible des s\xE9ances 7 et 8 : Python (valeur par d\xE9faut \xE0 confirmer avec le programme de l\u2019\xE9tablissement).",sessions:[{title:"Notion d\u2019algorithme, constantes, variables et types",topics:["algorithme","instruction","donn\xE9e","constante","variable","type"],acts:[ht("Associe les notions","Relier algorithme, instruction, donn\xE9e, variable et constante \xE0 leur d\xE9finition.",[["Algorithme","Suite ordonn\xE9e d\u2019instructions qui r\xE9sout un probl\xE8me"],["Instruction","Action \xE9l\xE9mentaire de l\u2019algorithme"],["Donn\xE9e","Valeur utilis\xE9e ou produite par l\u2019algorithme"],["Variable","Zone de m\xE9moire nomm\xE9e dont la valeur peut changer"],["Constante","Valeur nomm\xE9e qui ne change pas pendant l\u2019ex\xE9cution"]]),Nt("Constante ou variable ?","Distinguer ce qui reste fixe de ce qui change.",["Constante","Variable"],[["\u03C0 (3,14)",0,"Sa valeur ne change pas."],["Le nombre de jours d\u2019une semaine (7)",0,"Valeur fixe."],["La TVA fix\xE9e \xE0 20 % dans le programme",0,"Valeur fix\xE9e une fois pour toutes."],["Le nombre d\u2019heures dans un jour (24)",0,"Valeur fixe."],["Le nombre de lettres de l\u2019alphabet latin (26)",0,"Valeur fixe."],["La note saisie par l\u2019\xE9l\xE8ve",1,"Elle change \xE0 chaque saisie."],["Le total qui augmente \xE0 chaque achat",1,"Il \xE9volue."],["L\u2019\xE2ge de l\u2019utilisateur",1,"Il d\xE9pend de la personne."],["Le r\xE9sultat d\u2019une addition",1,"Il d\xE9pend des nombres."],["Le score d\u2019un jeu",1,"Il change pendant la partie."]]),Lt("Quel type de donn\xE9e ?","Identifier entier, r\xE9el, cha\xEEne de caract\xE8res et bool\xE9en.",[["Quel est le type de la valeur 14 ?",["Entier","R\xE9el","Cha\xEEne de caract\xE8res","Bool\xE9en"],"14 est un nombre sans partie d\xE9cimale."],["Quel est le type de la valeur 3,75 ?",["R\xE9el","Entier","Cha\xEEne de caract\xE8res","Bool\xE9en"],"Elle a une partie d\xE9cimale."],["Quel est le type de la valeur \xAB Rabat \xBB ?",["Cha\xEEne de caract\xE8res","Entier","R\xE9el","Bool\xE9en"],"C\u2019est du texte."],["Quel est le type de la valeur Vrai ?",["Bool\xE9en","Entier","R\xE9el","Cha\xEEne de caract\xE8res"],"Un bool\xE9en vaut Vrai ou Faux."],["Quel est le type de la valeur \xAB 2026 \xBB \xE9crite entre guillemets ?",["Cha\xEEne de caract\xE8res","Entier","R\xE9el","Bool\xE9en"],"Entre guillemets, c\u2019est du texte, m\xEAme si ce sont des chiffres."]]),Zh("Mission robot","Ordonner des actions pour atteindre un objectif sur une grille.",[{grid:["S..G"],max:6},{grid:["S..","##.","..G"],max:9},{grid:["S.#.","#.#.","#...","###G"],max:12},{grid:["S...#","###.#","G...#"],max:14},{grid:["S..#.","##.#.",".....",".####","....G"],max:20}])]},{title:"Instructions de base : lire, \xE9crire, affecter",topics:["lecture","\xE9criture","affectation"],acts:[ht("Lire, \xE9crire, affecter","Associer chaque instruction \xE0 son effet.",[["Lire(a)","Saisir une valeur au clavier et la ranger dans a"],["\xC9crire(a)","Afficher la valeur de a \xE0 l\u2019\xE9cran"],["a \u2190 5","Ranger la valeur 5 dans a"],["a \u2190 a + 1","Augmenter a de 1"],['\xC9crire("Bonjour")',"Afficher le texte Bonjour tel quel"]]),Pt("Compl\xE8te les instructions","Compl\xE9ter des instructions de pseudo\u2011code.",[["Pour demander l\u2019\xE2ge \xE0 l\u2019utilisateur on \xE9crit : [[Lire|\xC9crire|Affecter]](age)","Lire attend une saisie."],["Pour afficher le r\xE9sultat on \xE9crit : [[\xC9crire|Lire|Fin]](resultat)","\xC9crire affiche une valeur."],["Pour mettre 10 dans n on \xE9crit : n [[\u2190|\u2192|\u2260]] 10","La fl\xE8che vers la gauche est l\u2019affectation."],["Pour doubler n on \xE9crit : n \u2190 [[n * 2|2n|n x 2 =]]","* est le signe de multiplication."],['Dans \xC9crire("Total"), le mot Total est [[un texte affich\xE9 tel quel|une variable|une constante num\xE9rique]].',"Entre guillemets, c\u2019est du texte."]]),bs("Simule les variables","Suivre la valeur des variables apr\xE8s des affectations successives.","predict",[[`a \u2190 5
b \u2190 3
a \u2190 a + b
\xC9crire(a)`,[],"out","a re\xE7oit 5 + 3."],[`x \u2190 10
y \u2190 x
x \u2190 4
\xC9crire(y)`,[],"out","y a copi\xE9 la valeur de x avant que x change."],[`n \u2190 2
n \u2190 n * n
n \u2190 n + 1`,[],"n","n passe de 2 \xE0 4 puis \xE0 5."],[`a \u2190 7
b \u2190 2
t \u2190 a
a \u2190 b
b \u2190 t`,[],"b","On \xE9change a et b gr\xE2ce \xE0 t."],[`Lire(x)
x \u2190 x + 3
\xC9crire(x)`,[4],"out","x re\xE7oit 4 puis 4 + 3."]]),on("Mission calculatrice","\xC9crire dans l\u2019ordre un algorithme qui lit deux nombres et affiche leur somme.",["D\xE9but","Lire(a)","Lire(b)","s \u2190 a + b","\xC9crire(s)"],{eq:[[1,2]],explain:"On lit les deux nombres (dans un ordre indiff\xE9rent), on calcule la somme, puis on l\u2019affiche."})]},{title:"Structure s\xE9quentielle",topics:["instructions ex\xE9cut\xE9es l\u2019une apr\xE8s l\u2019autre"],acts:[on("Ordonne l\u2019algorithme","Remettre dans l\u2019ordre un algorithme s\xE9quentiel.",["D\xE9but","Lire(rayon)","aire \u2190 3,14 * rayon * rayon","\xC9crire(aire)","Fin"],{explain:"On ne peut calculer l\u2019aire qu\u2019apr\xE8s avoir lu le rayon, et l\u2019afficher qu\u2019apr\xE8s l\u2019avoir calcul\xE9e."}),bs("Pr\xE9dis le r\xE9sultat","D\xE9terminer ce qu\u2019affiche un algorithme s\xE9quentiel.","predict",[[`Lire(a)
Lire(b)
c \u2190 a * b
\xC9crire(c)`,[6,7],"out","c = 6 \xD7 7."],[`x \u2190 20
x \u2190 x - 5
x \u2190 x * 2
\xC9crire(x)`,[],"out","Les instructions se suivent : 20, 15, 30."],[`Lire(n)
d \u2190 n * 2
t \u2190 d + n
\xC9crire(t)`,[4],"out","d = 8 puis t = 12."],[`a \u2190 5
b \u2190 a + 2
a \u2190 b * 2
\xC9crire(a)`,[],"out","b = 7 puis a = 14."],[`Lire(p)
r \u2190 p * 20 / 100
\xC9crire(r)`,[150],"out","20 % de 150 = 30."]]),Pt("Compl\xE8te et d\xE9bogue","R\xE9parer un algorithme s\xE9quentiel.",[["Ligne 1 : [[Lire|\xC9crire|Fin]](note1)","On lit d\u2019abord les donn\xE9es."],["Ligne 3 : moyenne \u2190 (note1 + note2) [[/|*|-]] 2","La moyenne de deux notes se calcule en divisant la somme par 2."],["Ligne 4 : [[\xC9crire|Lire|D\xE9but]](moyenne)","Le r\xE9sultat s\u2019affiche \xE0 la fin."],["Dans un algorithme s\xE9quentiel, les instructions sont ex\xE9cut\xE9es [[l\u2019une apr\xE8s l\u2019autre, dans l\u2019ordre|toutes en m\xEAme temps|dans un ordre al\xE9atoire]].","L\u2019ordre d\u2019\xE9criture est l\u2019ordre d\u2019ex\xE9cution."],["Si on \xE9crit \xC9crire(moyenne) avant de calculer moyenne, l\u2019algorithme est [[faux|plus rapide|meilleur]].","moyenne n\u2019a pas encore de valeur."]]),Sm("Mission distributeur","Calculer le total de plusieurs achats.")]},{title:"Structure s\xE9lective simple",topics:["condition","Si \u2026 Alors \u2026 FinSi"],acts:[Nt("Vrai ou faux ?","\xC9valuer des comparaisons.",["Vrai","Faux"],[["7 > 3",0,"7 est plus grand que 3."],["5 = 5",0,"Les deux valeurs sont \xE9gales."],["10 <= 10",0,"\u2264 accepte l\u2019\xE9galit\xE9."],["3 * 3 = 9",0,"3 \xD7 3 vaut bien 9."],["8 <> 2",0,"<> signifie \xAB diff\xE9rent de \xBB."],["2 + 2 = 5",1,"2 + 2 = 4."],["4 <> 4",1,"4 est \xE9gal \xE0 4, donc pas diff\xE9rent."],["9 < 1",1,"9 est plus grand que 1."],["15 >= 20",1,"15 est plus petit que 20."],["6 - 1 = 4",1,"6 \u2212 1 = 5."]]),ht("Condition et action","Associer une condition \xE0 l\u2019action qui lui correspond.",[["Si age < 18",'\xC9crire("Mineur")'],["Si temperature > 30",'\xC9crire("Il fait chaud")'],["Si solde = 0",'\xC9crire("Compte vide")'],["Si note >= 10",'\xC9crire("R\xE9ussi")'],['Si mdp = "ok"','\xC9crire("Acc\xE8s autoris\xE9")']]),Pt("Si \u2026 Alors \u2026 FinSi","Compl\xE9ter une structure s\xE9lective simple.",[["La structure s\xE9lective simple commence par [[Si|Pour|Lire]] suivi d\u2019une condition.","Si introduit la condition."],["Apr\xE8s la condition, on \xE9crit le mot [[Alors|Sinon|D\xE9but]].","Alors annonce l\u2019action."],["Le bloc se termine par [[FinSi|Fin|\xC9crire]].","FinSi ferme la structure."],["Les instructions entre Alors et FinSi ne sont ex\xE9cut\xE9es que si la condition est [[vraie|fausse|\xE9crite en minuscules]].","Une condition fausse saute le bloc."],["Si la condition est fausse, l\u2019algorithme [[passe directement apr\xE8s FinSi|s\u2019arr\xEAte avec une erreur|recommence au d\xE9but]].","On continue apr\xE8s FinSi."]]),bs("Mission acc\xE8s","Trouver les valeurs \xE0 saisir pour qu\u2019une r\xE8gle d\u2019acc\xE8s soit satisfaite.","run",[[`Lire(age)
Si age >= 12 Alors
\xC9crire("Acc\xE8s autoris\xE9")
FinSi`,"Acc\xE8s autoris\xE9",[14],"Il faut un \xE2ge d\u2019au moins 12."],[`Lire(code)
Si code = 1234 Alors
\xC9crire("Porte ouverte")
FinSi`,"Porte ouverte",[1234],"Le code doit \xEAtre exactement 1234."],[`Lire(note)
Si note >= 10 Alors
\xC9crire("R\xE9ussi")
FinSi`,"R\xE9ussi",[12],"La note doit \xEAtre au moins 10."],[`Lire(t)
Si t > 30 Alors
\xC9crire("Chaud")
FinSi`,"Chaud",[35],"La temp\xE9rature doit d\xE9passer 30."],[`Lire(a)
Lire(b)
Si a > b Alors
\xC9crire("a est plus grand")
FinSi`,"a est plus grand",[9,4],"Saisis d\u2019abord le plus grand nombre."]])]},{title:"Structure s\xE9lective compl\xE8te",topics:["Si \u2026 Alors \u2026 Sinon \u2026 FinSi"],acts:[bs("Quelle branche est ex\xE9cut\xE9e ?","Pr\xE9dire le r\xE9sultat d\u2019une structure s\xE9lective compl\xE8te.","predict",[[`Lire(n)
Si n > 0 Alors
\xC9crire("positif")
Sinon
\xC9crire("n\xE9gatif ou nul")
FinSi`,[5],"out","5 > 0 est vrai."],[`Lire(n)
Si n > 0 Alors
\xC9crire("positif")
Sinon
\xC9crire("n\xE9gatif ou nul")
FinSi`,[0],"out","0 > 0 est faux : on passe au Sinon."],[`Lire(note)
Si note >= 10 Alors
\xC9crire("Admis")
Sinon
\xC9crire("Refus\xE9")
FinSi`,[9],"out","9 est inf\xE9rieur \xE0 10."],[`Lire(a)
Lire(b)
Si a > b Alors
m \u2190 a
Sinon
m \u2190 b
FinSi
\xC9crire(m)`,[4,9],"out","a n\u2019est pas plus grand que b : m re\xE7oit b."],[`Lire(age)
Si age >= 18 Alors
\xC9crire("majeur")
Sinon
\xC9crire("mineur")
FinSi`,[18],"out","18 >= 18 est vrai."]]),Pt("Si \u2026 Sinon \u2026 FinSi","Compl\xE9ter des structures s\xE9lectives compl\xE8tes.",[['Si note >= 10 [[Alors|Sinon|FinSi]] \xC9crire("Admis")',"Alors suit la condition."],["Pour ex\xE9cuter autre chose quand la condition est fausse, on utilise [[Sinon|Alors|Lire]].","Sinon couvre le cas contraire."],["Dans Si \u2026 Alors \u2026 Sinon \u2026 FinSi, exactement [[un seul|les deux|aucun]] des deux blocs est ex\xE9cut\xE9.","Soit l\u2019un, soit l\u2019autre."],["Le contraire de la condition n > 0 est n [[<=|<|>=]] 0.","Si n n\u2019est pas strictement positif, alors n \u2264 0."],["Un algorithme qui affiche \xAB pair \xBB ou \xAB impair \xBB utilise une structure s\xE9lective [[compl\xE8te|simple sans Sinon|s\xE9quentielle]].","Il y a deux cas \xE0 traiter."]]),Lt("Corrige les erreurs de logique","Trouver et r\xE9parer des erreurs de logique.",[[`\xAB Admis si la note est d\u2019au moins 10. \xBB Quel est le d\xE9faut ?
Si note > 10 Alors
\xC9crire("Admis")
Sinon
\xC9crire("Refus\xE9")
FinSi`,["Une note \xE9gale \xE0 10 est refus\xE9e : il faut >=","Il manque Lire","Sinon est interdit","Le mot Admis est mal \xE9crit"],"> exclut 10 ; >= l\u2019inclut."],[`Pour tester \xAB n est pair \xBB, que penser de cette condition ?
Si n mod 2 = 1 Alors
\xC9crire("pair")
FinSi`,["n mod 2 = 1 signifie impair : il faut = 0","mod n\u2019existe pas","Il faut Sinon","Il faut \xE9crire impair partout"],"Un nombre pair a pour reste 0 dans la division par 2."],[`Quel est le d\xE9faut ?
Si age < 18 Alors
\xC9crire("majeur")
FinSi`,["Le message ne correspond pas \xE0 la condition : age < 18 signifie mineur","Il manque Lire","FinSi est inutile","age ne peut pas \xEAtre compar\xE9"],"Le message doit \xEAtre coh\xE9rent avec la condition."],[`Que se passe\u2011t\u2011il si a est plus petit que b ?
Si a > b Alors
m \u2190 a
FinSi
\xC9crire(m)`,["m n\u2019a pas de valeur : il manque Sinon m \u2190 b","m vaut a","Rien, tout va bien","L\u2019algorithme affiche b"],"Sans Sinon, m reste sans valeur."],[`O\xF9 est l\u2019erreur de structure ?
Si x > 5 Alors
\xC9crire("grand")
FinSi
Sinon
\xC9crire("petit")`,["Sinon doit se trouver avant FinSi","x > 5 est interdit","Alors est de trop","\xC9crire est interdit apr\xE8s Si"],"FinSi ferme toute la structure, Sinon doit \xEAtre \xE0 l\u2019int\xE9rieur."]]),Nt("Mission bulletin","Classer des \xE9l\xE8ves en Admis ou Non admis selon la moyenne.",["Admis (moyenne \u2265 10)","Non admis (moyenne < 10)"],[["Moyenne 12",0,"12 \u2265 10."],["Moyenne 10",0,"10 \u2265 10."],["Moyenne 15,25",0,"15,25 \u2265 10."],["Moyenne 10,5",0,"10,5 \u2265 10."],["Moyenne 13",0,"13 \u2265 10."],["Moyenne 9,5",1,"9,5 < 10."],["Moyenne 7",1,"7 < 10."],["Moyenne 9,99",1,"9,99 < 10."],["Moyenne 4",1,"4 < 10."],["Moyenne 8",1,"8 < 10."]])]},{title:"Notion de programme",topics:["code source","programme","ex\xE9cution","r\xE9sultat"],acts:[ht("Le vocabulaire du programme","Associer les termes du cycle d\u2019un programme.",[["Code source","Texte des instructions \xE9crit par le programmeur"],["Programme","Ensemble d\u2019instructions compr\xE9hensibles par l\u2019ordinateur"],["Ex\xE9cution","Moment o\xF9 l\u2019ordinateur applique les instructions"],["R\xE9sultat (sortie)","Ce que le programme affiche ou produit"],["Interpr\xE9teur","Outil qui lit le code et le fait ex\xE9cuter"]]),on("Du probl\xE8me au programme","Ordonner les \xE9tapes de la cr\xE9ation d\u2019un programme.",["Analyser le probl\xE8me","\xC9crire l\u2019algorithme","\xC9crire le code du programme","Ex\xE9cuter le programme","Tester et corriger les erreurs"],{explain:"Concevoir (analyser, algorithme), coder, ex\xE9cuter, puis tester et corriger."}),Xt("Lignes et instructions","Rep\xE9rer le r\xF4le de chaque ligne d\u2019un programme.","lines",[["l1","Clique sur la ligne qui demande une saisie \xE0 l\u2019utilisateur.","Lire demande une valeur."],["l2","Clique sur la ligne qui range directement la valeur 3 dans une variable.","C\u2019est une affectation."],["l3","Clique sur la ligne qui calcule le total.","Elle multiplie prix et quantit\xE9."],["l4","Clique sur la ligne qui affiche la variable total.","\xC9crire(total) montre le r\xE9sultat."],["l5","Clique sur la ligne qui affiche un texte fixe.","Le texte entre guillemets est affich\xE9 tel quel."]],{lines:["Lire(prix)","quantite \u2190 3","total \u2190 prix * quantite","\xC9crire(total)",'\xC9crire("Merci")']}),bs("Mission ex\xE9cution","Ex\xE9cuter un programme \xE9ducatif s\xE9curis\xE9 et trouver les bonnes valeurs.","run",[[`Lire(n)
\xC9crire(n * 2)`,18,[9],"Il double la valeur lue."],[`Lire(a)
Lire(b)
\xC9crire(a + b)`,25,[10,15],"Il additionne les deux valeurs."],[`Lire(x)
\xC9crire(x * x)`,49,[7],"Il calcule le carr\xE9."],[`Lire(c)
\xC9crire(c * 9 / 5 + 32)`,212,[100],"Conversion Celsius \u2192 Fahrenheit."],[`Lire(p)
\xC9crire(p - p * 20 / 100)`,80,[100],"Prix apr\xE8s une r\xE9duction de 20 %."]])]},{title:"Langages de programmation",topics:["langages","\xE9diteur / IDE","syntaxe"],acts:[ht("Reconnais les langages","Reconna\xEEtre des exemples de langages de programmation.",[["Python","Langage tr\xE8s utilis\xE9 pour d\xE9buter, \xE0 la syntaxe lisible"],["Scratch","Langage visuel qui assemble des blocs"],["JavaScript","Langage qui rend les pages web interactives"],["C","Langage proche de la machine, utilis\xE9 pour les syst\xE8mes"],["Pascal","Langage historique cr\xE9\xE9 pour enseigner la programmation"]]),Nt("Langage, IDE ou application ?","Distinguer un langage, un environnement de d\xE9veloppement et une application ordinaire.",["Langage de programmation","Environnement de d\xE9veloppement (IDE)","Application ordinaire"],[["Python",0,"On \xE9crit du code dans ce langage."],["JavaScript",0,"C\u2019est un langage."],["C",0,"C\u2019est un langage."],["IDLE",1,"\xC9diteur fourni avec Python."],["Thonny",1,"\xC9diteur pour d\xE9butants."],["Visual Studio Code",1,"\xC9diteur de code."],["Writer",2,"Traitement de texte, pas un outil de programmation."],["Calc",2,"Tableur."],["Lecteur de musique",2,"Application multim\xE9dia."],["Scratch",0,"Langage visuel."]]),Pt("Compl\xE8te le code Python","Compl\xE9ter de courts extraits de code source.",[['En Python, pour afficher un message on \xE9crit [[print|Ecrire|show]]("Bonjour").',"print affiche."],['Pour lire une valeur saisie on \xE9crit nom = [[input|read|lire]]("Ton nom ? ").',"input lit au clavier."],["En Python, l\u2019affectation s\u2019\xE9crit avec le signe [[=|\u2190|:=]], par exemple x = 5.","On utilise le signe =."],["Les commentaires commencent par le caract\xE8re [[#|//|--]].","En Python, # introduit un commentaire."],["Les fichiers Python ont l\u2019extension [[.py|.exe|.docx]].",".py d\xE9signe un programme Python."]]),Lt("Mission d\xE9bogage","R\xE9parer de simples erreurs de syntaxe.",[[`Quelle est l\u2019erreur ?
print("Bonjour"`,["Il manque la parenth\xE8se fermante )","print est interdit","Il manque un point\u2011virgule","Les guillemets sont inutiles"],"Chaque parenth\xE8se ouverte doit \xEAtre ferm\xE9e."],[`Quelle est l\u2019erreur ?
Print("Salut")`,["Python distingue majuscules et minuscules : il faut \xE9crire print","Il manque des guillemets","Salut est interdit","Il manque un deux\u2011points"],"Les noms de fonctions sont sensibles \xE0 la casse."],[`Quelle est l\u2019erreur ?
x = 5
print(y)`,["La variable y n\u2019a jamais re\xE7u de valeur","x est mal \xE9crit","print ne sait pas afficher","Il manque une parenth\xE8se"],"On ne peut utiliser que des variables d\xE9finies."],[`Quelle est l\u2019erreur ?
if x > 3
    print("grand")`,["Il manque les deux\u2011points : apr\xE8s la condition","if est interdit","x > 3 est faux","print est mal \xE9crit"],"La ligne du if se termine par :"],[`Quelle est l\u2019erreur ?
nom = input("Nom ? ")
 print(nom)`,["La deuxi\xE8me ligne commence par un espace (indentation inattendue)","input est interdit","nom est un mot r\xE9serv\xE9","Il manque un point"],"En Python, l\u2019indentation a un sens."]])]},{title:"Transcription d\u2019algorithme",topics:["pseudo\u2011code vers programme","comparaison des r\xE9sultats"],acts:[ht("Pseudo\u2011code \u2194 Python","Associer des instructions de pseudo\u2011code \xE0 leur transcription en Python.",[["\xC9crire(x)","print(x)"],["x \u2190 5","x = 5"],["Lire(n) (nombre entier)","n = int(input())"],["Si a > b Alors","if a > b:"],["Sinon","else:"]]),Pt("Compl\xE8te le programme","Compl\xE9ter le code d\u2019un programme traduit d\u2019un algorithme.",[['Ligne 1 : a = int([[input|print|lire]]("a ? "))',"input lit une saisie."],["Ligne 3 : s = a [[+|-|and]] b","Une somme utilise +."],["Ligne 4 : [[print|input|Ecrire]](s)","print affiche le r\xE9sultat."],["Pour tester l\u2019\xE9galit\xE9 en Python on \xE9crit if a [[==|=|:=]] b:","== compare, = affecte."],["Apr\xE8s le if et sa condition, on termine la ligne par [[:|;|.]]","Les deux\u2011points ouvrent le bloc."]]),Lt("Compare avec le r\xE9sultat attendu","R\xE9parer un programme pour qu\u2019il produise le r\xE9sultat attendu.",[[`Le programme doit afficher 10 pour a = 4 et b = 6. Quelle correction ?
a = 4
b = 6
print(a * b)`,["Remplacer * par +","Remplacer print par input","Supprimer la variable b","Ajouter un #"],"4 \xD7 6 = 24 mais on attend 4 + 6 = 10."],[`Le programme doit afficher \xAB Admis \xBB pour note = 12. Quelle correction ?
note = 12
if note >= 10
    print("Admis")`,["Ajouter : \xE0 la fin de la ligne du if","Remplacer >= par =","Supprimer print","Mettre note entre guillemets"],"La ligne du if doit se terminer par :"],[`Le programme doit afficher la moyenne de 8 et 12, soit 10. Quelle correction ?
m = 8 + 12 / 2
print(m)`,["Ajouter des parenth\xE8ses : (8 + 12) / 2","Remplacer / par *","Supprimer print","\xC9crire 8 + 12 + 2"],"La division est prioritaire sur l\u2019addition."],[`Le programme doit afficher 25. Quelle correction ?
x = 5
print(x x)`,["\xC9crire x * x","\xC9crire x + x","Supprimer x","\xC9crire print(5, 5)"],"Le carr\xE9 de 5 s\u2019obtient avec *."],[`Le programme doit afficher 7 pour a = 3 et b = 4. Quelle correction ?
a = 3
b = 4
print(a + c)`,["Remplacer c par b : la variable c n\u2019existe pas","Remplacer a par 7","Supprimer b","Ajouter print(7)"],"On ne peut utiliser que des variables d\xE9j\xE0 d\xE9finies."]]),on("Mission finale : la moyenne","Transcrire l\u2019algorithme de calcul de moyenne en un petit programme Python.",["# Programme : moyenne de deux notes",'n1 = float(input("Note 1 : "))','n2 = float(input("Note 2 : "))',"moyenne = (n1 + n2) / 2",'print("Moyenne :", moyenne)'],{eq:[[1,2]],explain:"Commentaire, lecture des deux notes (ordre indiff\xE9rent), calcul, affichage."})]}]};function Sm(i,e){return{mech:"sim:vending",title:i,objective:e,data:{view:"vending",cfg:{items:[["jus","Jus",5,"\u{1F9C3}"],["gateau","G\xE2teau",3,"\u{1F370}"],["eau","Eau",2,"\u{1F4A7}"]]},tasks:[["Ach\xE8te 2 jus (5 DH l\u2019un), puis saisis le total \xE0 payer.",{jus:2,gateau:0,eau:0,total:10},"total \u2190 5 \xD7 2 = 10 DH."],["Ach\xE8te 1 jus et 1 g\xE2teau, puis saisis le total.",{jus:1,gateau:1,eau:0,total:8},"total \u2190 5 + 3 = 8 DH."],["Ach\xE8te 2 g\xE2teaux et 3 eaux, puis saisis le total.",{jus:0,gateau:2,eau:3,total:12},"total \u2190 2 \xD7 3 + 3 \xD7 2 = 12 DH."],["Ach\xE8te 3 jus, 1 g\xE2teau et 2 eaux, puis saisis le total.",{jus:3,gateau:1,eau:2,total:22},"total \u2190 15 + 3 + 4 = 22 DH."],["Ach\xE8te 1 jus, 2 g\xE2teaux et 4 eaux, puis saisis le total.",{jus:1,gateau:2,eau:4,total:19},"total \u2190 5 + 6 + 8 = 19 DH."]]}}}var nd={id:4,title:"R\xE9seaux et Internet",short:"R\xE9seaux et Internet",icon:"\u{1F310}",color:"m4",sessions:[{title:"Notion de r\xE9seau informatique",topics:["r\xE9seau","poste","commutateur","liaison"],acts:[ht("Associe les \xE9l\xE9ments du r\xE9seau","Relier chaque \xE9l\xE9ment du r\xE9seau \xE0 sa d\xE9finition.",[["R\xE9seau informatique","Ensemble d\u2019ordinateurs et d\u2019\xE9quipements reli\xE9s pour \xE9changer des donn\xE9es"],["Ordinateur (poste)","Machine qui envoie ou re\xE7oit des informations sur le r\xE9seau"],["Commutateur (switch)","\xC9quipement qui relie plusieurs ordinateurs d\u2019un m\xEAme r\xE9seau"],["Liaison (c\xE2ble ou Wi\u2011Fi)","Moyen de transmission entre deux \xE9quipements"],["Imprimante r\xE9seau","P\xE9riph\xE9rique partag\xE9, accessible par plusieurs ordinateurs"]]),Xt("Identifie les \xE9quipements","Reconna\xEEtre les \xE9quipements d\u2019un sch\xE9ma de r\xE9seau local.","lan",[["switch","Clique sur le commutateur (switch).","Tous les c\xE2bles arrivent sur lui."],["printer","Clique sur l\u2019imprimante partag\xE9e.","Elle est reli\xE9e au switch comme les postes."],["server","Clique sur le serveur.","Il stocke des ressources partag\xE9es."],["pc","Clique sur l\u2019un des postes de travail.","Un poste est un ordinateur d\u2019utilisateur."],["link","Clique sur l\u2019un des c\xE2bles.","Un c\xE2ble relie un \xE9quipement au switch."]]),Yh("Construis le r\xE9seau de la salle","Relier des postes \xE0 un commutateur.",[{id:"sw",label:"Switch",icon:"\u21C4",x:50,y:50},{id:"p1",label:"PC 1",icon:"\u{1F5A5}",x:12,y:14},{id:"p2",label:"PC 2",icon:"\u{1F5A5}",x:12,y:82},{id:"p3",label:"PC 3",icon:"\u{1F5A5}",x:88,y:14},{id:"p4",label:"PC 4",icon:"\u{1F5A5}",x:88,y:82},{id:"p5",label:"PC 5",icon:"\u{1F5A5}",x:50,y:12}],[["p1","sw","chaque poste se branche sur le switch"],["p2","sw","chaque poste se branche sur le switch"],["p3","sw","chaque poste se branche sur le switch"],["p4","sw","chaque poste se branche sur le switch"],["p5","sw","chaque poste se branche sur le switch"]]),Ft("Mission : le r\xE9seau de la classe","Valider logiquement la connectivit\xE9 d\u2019un r\xE9seau local.","toggles",{init:{sw:!1,c1:!1,c2:!1,c3:!1,imp:!1},items:[["sw","Switch aliment\xE9","\u21C4"],["c1","C\xE2ble du PC 1 branch\xE9","\u{1F50C}"],["c2","C\xE2ble du PC 2 branch\xE9","\u{1F50C}"],["c3","C\xE2ble du PC 3 branch\xE9","\u{1F50C}"],["imp","Imprimante partag\xE9e allum\xE9e","\u{1F5A8}"]],status:i=>[["Le switch est aliment\xE9",i.sw],["PC 1 communique avec le r\xE9seau",i.sw&&i.c1],["PC 2 communique avec le r\xE9seau",i.sw&&i.c2],["PC 3 communique avec le r\xE9seau",i.sw&&i.c3],["L\u2019imprimante est utilisable depuis le r\xE9seau",i.sw&&i.imp]]},[["Le switch est \xE9teint : aucun PC ne communique. Alimente\u2011le.",{sw:!0},"Sans courant, le switch ne transmet rien."],["Branche le c\xE2ble du PC 1 pour qu\u2019il rejoigne le r\xE9seau.",{c1:!0},"Un poste a besoin d\u2019un c\xE2ble et d\u2019un switch allum\xE9."],["Branche aussi les PC 2 et 3 (sans d\xE9brancher le PC 1).",{c1:!0,c2:!0,c3:!0},"Chaque poste a son propre c\xE2ble."],["L\u2019imprimante partag\xE9e est \xE9teinte : allume\u2011la.",{imp:!0},"Un \xE9quipement \xE9teint n\u2019est pas joignable."],["Le technicien d\xE9place le PC 3 : d\xE9branche seulement son c\xE2ble.",{c3:!1,c1:!0,c2:!0,sw:!0,imp:!0},"Les autres postes continuent de fonctionner."]])]},{title:"Typologie et avantages des r\xE9seaux",topics:["LAN","MAN","WAN","partage de ressources"],acts:[Nt("LAN, MAN ou WAN ?","Classer des r\xE9seaux selon leur \xE9tendue g\xE9ographique.",["LAN","MAN","WAN"],[["Les ordinateurs d\u2019une salle d\u2019informatique",0,"Un seul local : r\xE9seau local."],["Le r\xE9seau d\u2019un coll\xE8ge",0,"Un seul site : r\xE9seau local."],["Deux ordinateurs reli\xE9s dans une maison",0,"Tr\xE8s petite zone."],["Le r\xE9seau reliant plusieurs \xE9coles d\u2019une m\xEAme ville",1,"\xC0 l\u2019\xE9chelle d\u2019une ville."],["Le r\xE9seau reliant les mairies d\u2019arrondissement d\u2019une ville",1,"\xC0 l\u2019\xE9chelle d\u2019une ville."],["Le r\xE9seau d\u2019une cha\xEEne de biblioth\xE8ques d\u2019une m\xEAme agglom\xE9ration",1,"\xC0 l\u2019\xE9chelle d\u2019une agglom\xE9ration."],["Internet",2,"R\xE9seau mondial."],["Le r\xE9seau d\u2019une banque entre plusieurs pays",2,"Plusieurs pays."],["Les c\xE2bles sous\u2011marins reliant les continents",2,"\xC9chelle intercontinentale."],["Le r\xE9seau d\u2019une compagnie a\xE9rienne pr\xE9sente dans plusieurs pays",2,"Plusieurs pays."]]),ht("Type de r\xE9seau et \xE9tendue","Associer chaque type de r\xE9seau \xE0 son \xE9tendue.",[["LAN","R\xE9seau local : une salle, un b\xE2timent"],["MAN","R\xE9seau m\xE9tropolitain : une ville"],["WAN","R\xE9seau \xE9tendu : pays et continents"],["PAN","R\xE9seau personnel : quelques m\xE8tres autour d\u2019une personne (Bluetooth)"],["Internet","R\xE9seau mondial de r\xE9seaux"]]),Pt("Les avantages du r\xE9seau","Compl\xE9ter les avantages du partage de ressources.",[["Un r\xE9seau permet de [[partager|effacer|\xE9teindre]] des ressources comme une imprimante.","Une seule imprimante peut servir \xE0 toute la classe."],["Les utilisateurs peuvent [[\xE9changer des fichiers|r\xE9parer la souris|changer le clavier]] rapidement.","Le r\xE9seau transporte les fichiers."],["Partager une seule connexion Internet permet d\u2019[[\xE9conomiser de l\u2019argent|augmenter la poussi\xE8re|supprimer les fichiers]].","Un seul abonnement peut servir \xE0 plusieurs postes."],["Un r\xE9seau facilite la [[communication|destruction|d\xE9connexion]] entre utilisateurs (messagerie, visioconf\xE9rence).","Communiquer est un avantage majeur."],["Les donn\xE9es importantes peuvent \xEAtre [[sauvegard\xE9es sur un serveur central|supprim\xE9es automatiquement|cach\xE9es dans la souris]].","Un serveur centralise et prot\xE8ge les donn\xE9es."]]),Lt("Mission : choisis la solution","Choisir la solution r\xE9seau adapt\xE9e \xE0 un sc\xE9nario scolaire.",[["Une salle de 20 PC doit partager une imprimante. Quelle solution ?",["Un r\xE9seau local (LAN) avec un switch","Un r\xE9seau mondial entre pays","Une cl\xE9 USB par poste","Aucun r\xE9seau"],"Un LAN suffit pour partager dans une salle."],["Un coll\xE8ge veut relier ses trois b\xE2timents voisins. Quelle solution ?",["Un LAN \xE9tendu \xE0 tout le coll\xE8ge, avec des switches reli\xE9s","Un r\xE9seau Bluetooth","Un seul c\xE2ble de PC en PC","Un r\xE9seau mondial"],"Le site reste unique : on \xE9tend le r\xE9seau local."],["Une acad\xE9mie veut relier les \xE9tablissements d\u2019une m\xEAme ville. Quelle solution ?",["Un r\xE9seau m\xE9tropolitain (MAN)","Un r\xE9seau personnel Bluetooth","Le r\xE9seau d\u2019une seule salle","Aucun r\xE9seau"],"Une ville correspond \xE0 l\u2019\xE9chelle d\u2019un MAN."],["Une entreprise a des bureaux \xE0 Casablanca et \xE0 Paris. Quelle solution ?",["Un r\xE9seau \xE9tendu (WAN), par exemple via Internet de fa\xE7on s\xE9curis\xE9e","Un LAN d\u2019une seule salle","Un r\xE9seau Bluetooth","Des cl\xE9s USB seulement"],"Deux pays : r\xE9seau \xE9tendu."],["Un \xE9l\xE8ve veut envoyer une photo de son t\xE9l\xE9phone vers l\u2019ordinateur sans fil, \xE0 1 m\xE8tre. Quelle solution ?",["Un r\xE9seau personnel (Bluetooth)","Un r\xE9seau mondial","Un r\xE9seau m\xE9tropolitain","Un c\xE2ble sous\u2011marin"],"Tr\xE8s courte distance : r\xE9seau personnel."]])]},{title:"D\xE9finition d\u2019Internet",topics:["Internet","Web","navigateur","site web","client / serveur"],acts:[ht("Internet, Web, navigateur, site","Distinguer les notions li\xE9es \xE0 Internet.",[["Internet","R\xE9seau mondial qui relie des millions de r\xE9seaux"],["Web","Service d\u2019Internet qui permet de consulter des pages li\xE9es entre elles"],["Navigateur","Logiciel qui affiche les pages web"],["Site web","Ensemble de pages web d\u2019un m\xEAme \xE9diteur"],["Serveur web","Ordinateur qui stocke les pages et les envoie \xE0 la demande"]]),Nt("Service ou infrastructure ?","Distinguer les services d\u2019Internet de son infrastructure mat\xE9rielle.",["Service d\u2019Internet","Infrastructure / mat\xE9riel"],[["Le Web",0,"Service qui affiche des pages."],["La messagerie \xE9lectronique",0,"Service d\u2019\xE9change de messages."],["La visioconf\xE9rence",0,"Service de communication."],["Le t\xE9l\xE9chargement de fichiers",0,"Service de transfert."],["La messagerie instantan\xE9e (chat)",0,"Service de discussion."],["Le c\xE2ble de fibre optique",1,"Support physique."],["Le routeur",1,"\xC9quipement du r\xE9seau."],["Un serveur (la machine)",1,"Mat\xE9riel qui h\xE9berge les services."],["Un satellite de t\xE9l\xE9communication",1,"Support physique."],["Le modem",1,"\xC9quipement d\u2019acc\xE8s."]]),Pt("Client, r\xE9seau, serveur","Compl\xE9ter le sch\xE9ma d\u2019une demande de page web.",[["Quand tu tapes une adresse, ton ordinateur joue le r\xF4le de [[client|serveur|routeur]].","Le client fait la demande."],["Ta demande traverse le [[r\xE9seau|clavier|scanner]] jusqu\u2019au serveur.","Le r\xE9seau transporte la requ\xEAte."],["Le [[serveur|navigateur|moniteur]] cherche la page demand\xE9e.","Le serveur stocke les pages."],["Le serveur envoie la [[r\xE9ponse (la page)|demande|facture]] vers ton ordinateur.","La r\xE9ponse contient la page."],["Enfin, le [[navigateur|serveur|c\xE2ble]] affiche la page \xE0 l\u2019\xE9cran.","Le navigateur affiche."]]),Ft("Mission : requ\xEAte et r\xE9ponse","Simuler la demande et la r\xE9ponse d\u2019une page web.","browser",{start:null,pages:{home:{url:"www.college.exemple",title:"Coll\xE8ge Al Atlas \u2013 Accueil",body:["Bienvenue sur le site du coll\xE8ge."],links:[["Cours d\u2019informatique","cours"]]},cours:{url:"www.college.exemple/cours",title:"Cours d\u2019informatique",body:["Chapitre 1 : les r\xE9seaux. Chapitre 2 : Internet."],links:[["Retour \xE0 l\u2019accueil","home"]]}}},[["Dans la barre d\u2019adresse, tape www.college.exemple",{urlInput:"=www.college.exemple"},"Le client pr\xE9pare sa demande."],["Envoie la requ\xEAte : clique sur \xAB Aller \xBB.",{page:"home"},"Le serveur r\xE9pond 200 OK et envoie la page."],["Clique sur le lien \xAB Cours d\u2019informatique \xBB.",{page:"cours"},"Un lien envoie une nouvelle requ\xEAte."],["Reviens \xE0 l\u2019accueil avec le bouton Retour.",{page:"home"},"Le navigateur garde l\u2019historique."],["Tape l\u2019adresse www.inconnu.exemple puis clique sur \xAB Aller \xBB.",{page:"404"},"Une adresse inexistante renvoie l\u2019erreur 404."]])]},{title:"Connexion \xE0 Internet",topics:["routeur","modem","Wi\u2011Fi","Ethernet","fournisseur d\u2019acc\xE8s"],acts:[Xt("Le routeur vu de l\u2019arri\xE8re","Identifier les \xE9l\xE9ments du routeur.","router",[["wifi","Clique sur une antenne Wi\u2011Fi.","Elle \xE9met et re\xE7oit les ondes radio."],["lan","Clique sur l\u2019un des ports Ethernet du r\xE9seau local (LAN).","Ils servent \xE0 brancher des ordinateurs."],["power","Clique sur le bouton et la prise d\u2019alimentation.","Il met l\u2019appareil sous tension."],["wan","Clique sur le port qui re\xE7oit la ligne vers Internet (WAN).","Il est isol\xE9 des ports du r\xE9seau local."],["leds","Clique sur les voyants lumineux.","Ils indiquent l\u2019\xE9tat de la connexion."]]),ht("Mat\xE9riel de connexion","Associer chaque \xE9quipement ou service \xE0 son r\xF4le.",[["Modem","Convertit le signal de l\u2019op\xE9rateur pour acc\xE9der \xE0 Internet"],["Routeur","Dirige les donn\xE9es entre le r\xE9seau local et Internet"],["Wi\u2011Fi","Connexion sans fil par ondes radio"],["C\xE2ble Ethernet","Connexion filaire entre un PC et le routeur"],["Fournisseur d\u2019acc\xE8s (FAI)","Soci\xE9t\xE9 qui fournit la connexion \xE0 Internet"]]),on("Les \xE9tapes de la connexion","Ordonner les \xE9tapes de connexion d\u2019un ordinateur \xE0 Internet.",["Brancher le modem/routeur \xE0 la prise \xE9lectrique.","Brancher la ligne de l\u2019op\xE9rateur au modem.","Attendre que les voyants indiquent la connexion.","Connecter l\u2019ordinateur (c\xE2ble Ethernet, ou Wi\u2011Fi avec le mot de passe).","Ouvrir le navigateur et tester une page web."],{explain:"On alimente, on relie \xE0 l\u2019op\xE9rateur, on attend, on connecte le poste, puis on teste."}),Ft("Mission diagnostic","Diagnostiquer une panne de connexion simul\xE9e.","toggles",{init:{power:!1,line:!1,cable:!1,wifi:!1,pass:!1},items:[["power","Routeur aliment\xE9","\u{1F50C}"],["line","Ligne de l\u2019op\xE9rateur active","\u{1F4DE}"],["cable","C\xE2ble Ethernet branch\xE9 au PC","\u{1F517}"],["wifi","Wi\u2011Fi activ\xE9 sur le PC","\u{1F4F6}"],["pass","Bon mot de passe Wi\u2011Fi saisi","\u{1F511}"]],derive:i=>{i.internet=!!(i.power&&i.line&&(i.cable||i.wifi&&i.pass))},status:i=>[["Le routeur est sous tension",i.power],["La ligne de l\u2019op\xE9rateur fonctionne",i.line],["Le PC est reli\xE9 au routeur (c\xE2ble, ou Wi\u2011Fi avec bon mot de passe)",i.cable||i.wifi&&i.pass],["Acc\xE8s \xE0 Internet disponible",i.internet]]},[["Tous les voyants sont \xE9teints : alimente le routeur.",{power:!0},"Sans courant, rien ne fonctionne."],["Le voyant Internet est rouge : la ligne de l\u2019op\xE9rateur est coup\xE9e. R\xE9tablis la ligne (simulation).",{line:!0},"Sans ligne, le routeur ne peut pas atteindre Internet."],["Le PC essaie de se connecter en Wi\u2011Fi : active le Wi\u2011Fi du PC.",{wifi:!0},"Le Wi\u2011Fi doit \xEAtre activ\xE9 sur l\u2019ordinateur."],["Le Wi\u2011Fi refuse la connexion : saisis le bon mot de passe.",{pass:!0},"Un mot de passe incorrect bloque l\u2019acc\xE8s."],["V\xE9rifie : l\u2019acc\xE8s \xE0 Internet doit fonctionner.",{internet:!0},"Tous les maillons de la cha\xEEne sont en place."]])]},{title:"Service Web",topics:["navigateur","adresse URL","lien hypertexte","moteur de recherche"],acts:[Xt("Le navigateur","Identifier les contr\xF4les d\u2019un navigateur et la barre d\u2019adresse.","browser",[["urlbar","Clique sur la barre d\u2019adresse.","On y tape l\u2019adresse du site."],["tab","Clique sur l\u2019onglet.","Chaque onglet ouvre une page."],["reload","Clique sur le bouton qui actualise la page.","La fl\xE8che en cercle recharge la page."],["back","Clique sur le bouton Retour.","La fl\xE8che vers la gauche revient en arri\xE8re."],["pagezone","Clique sur la zone qui affiche le contenu de la page.","C\u2019est la grande zone sous la barre d\u2019adresse."]]),ht("Vocabulaire du Web","Associer chaque terme \xE0 sa d\xE9finition.",[["URL","Adresse d\u2019une page web"],["Onglet","Permet d\u2019ouvrir plusieurs pages dans une m\xEAme fen\xEAtre"],["Lien hypertexte","\xC9l\xE9ment cliquable qui m\xE8ne \xE0 une autre page"],["Moteur de recherche","Service qui trouve des pages \xE0 partir de mots\u2011cl\xE9s"],["Favoris (marque\u2011pages)","Liste d\u2019adresses enregistr\xE9es pour y revenir vite"]]),Pt("D\xE9code une adresse","Identifier les \xE9l\xE9ments d\u2019une URL.",[["Dans https://www.ecole.ma/cours/info.html, \xAB https \xBB est le [[protocole|nom de domaine|nom du fichier]].","Il indique comment dialoguer avec le serveur."],["\xAB www.ecole.ma \xBB est le [[nom de domaine (le serveur)|protocole|chemin du dossier]].","Il d\xE9signe le serveur."],["\xAB /cours/ \xBB indique le [[dossier (chemin)|protocole|domaine]].","C\u2019est le chemin dans le site."],["\xAB info.html \xBB est le nom de la [[page (le fichier)|domaine|protocole]].","C\u2019est la page demand\xE9e."],["Le \xAB https \xBB indique que la connexion est [[s\xE9curis\xE9e (chiffr\xE9e)|plus lente|d\xE9connect\xE9e]].","Le s signifie s\xE9curis\xE9."]]),Ft("Mission recherche","Trouver des informations dans un navigateur et un moteur de recherche enti\xE8rement simul\xE9s (hors ligne).","browser",{start:"search",pages:{search:{url:"recherche.exemple",title:"Moteur de recherche",body:["Tape des mots\u2011cl\xE9s puis clique sur Rechercher."],search:!0},rabat:{url:"www.maroc-info.exemple/rabat",title:"Rabat, capitale du Maroc",kw:"capitale maroc rabat administrative royaume",body:["Rabat est la capitale administrative du Royaume du Maroc."]},casa:{url:"www.maroc-info.exemple/casablanca",title:"Casablanca, ville \xE9conomique et grand port",kw:"casablanca port \xE9conomique ville maroc",body:["Casablanca est la plus grande ville et un port majeur."]},atlas:{url:"www.maroc-info.exemple/atlas",title:"Les montagnes de l\u2019Atlas",kw:"montagnes atlas neige maroc",body:["Les montagnes de l\u2019Atlas traversent le pays."]},ifrane:{url:"www.maroc-info.exemple/ifrane",title:"Ifrane, ville de neige",kw:"ifrane neige ville montagne hiver",body:["Ifrane est connue pour ses hivers froids."]},info:{url:"www.ecole.exemple/info",title:"Cours d\u2019informatique du coll\xE8ge",kw:"cours informatique ordinateur coll\xE8ge",body:["Le programme d\u2019informatique du coll\xE8ge."]}}},[["Cherche \xAB capitale Maroc \xBB et ouvre le r\xE9sultat qui donne le nom de la capitale.",{page:"rabat"},"Le bon r\xE9sultat contient les deux mots\u2011cl\xE9s."],["Reviens \xE0 la liste des r\xE9sultats avec le bouton Retour.",{page:"results"},"Retour ram\xE8ne \xE0 la page pr\xE9c\xE9dente."],["Cherche \xAB montagnes Atlas \xBB et ouvre le bon r\xE9sultat.",{page:"atlas"},"Les mots\u2011cl\xE9s guident vers la bonne page."],["Cherche \xAB port \xE9conomique Casablanca \xBB et ouvre le bon r\xE9sultat.",{page:"casa"},"Plus les mots\u2011cl\xE9s sont pr\xE9cis, meilleur est le r\xE9sultat."],["Cherche \xAB cours informatique \xBB et ouvre le r\xE9sultat du coll\xE8ge.",{page:"info"},"Choisis le r\xE9sultat qui correspond \xE0 la demande."]])]},{title:"E\u2011mail et chat p\xE9dagogique",topics:["destinataire","objet","message","pi\xE8ce jointe","chat"],acts:[Xt("Les parties d\u2019un e\u2011mail","Identifier destinataire, objet, message, pi\xE8ce jointe et bouton d\u2019envoi.","mail",[["to","Clique sur la zone du destinataire.","Elle contient l\u2019adresse de la personne."],["subject","Clique sur l\u2019objet du message.","Il r\xE9sume le sujet en quelques mots."],["body","Clique sur le corps du message.","C\u2019est le texte principal."],["attach","Clique sur la pi\xE8ce jointe.","Le trombone signale un fichier joint."],["send","Clique sur le bouton d\u2019envoi.","Il envoie le message."]]),Nt("E\u2011mail ou chat ?","Choisir le bon moyen de communication selon la situation.",["E\u2011mail","Chat p\xE9dagogique"],[["Envoyer un document officiel \xE0 un professeur",0,"\xC9crit formel avec pi\xE8ce jointe."],["\xC9crire une lettre avec objet et formule de politesse",0,"L\u2019e\u2011mail suit un cadre formel."],["Joindre un devoir en pi\xE8ce jointe",0,"Les pi\xE8ces jointes sont naturelles par e\u2011mail."],["R\xE9pondre plus tard, quand on a le temps",0,"L\u2019e\u2011mail n\u2019est pas instantan\xE9."],["Garder une trace \xE9crite formelle",0,"Un e\u2011mail se conserve."],["Discuter en direct avec un camarade pendant un exercice",1,"\xC9change en temps r\xE9el."],["Poser une question rapide en temps r\xE9el",1,"Message court et imm\xE9diat."],["Envoyer un petit message \xAB ok \xBB",1,"Message tr\xE8s court."],["Discuter \xE0 plusieurs en direct dans un groupe de classe",1,"Conversation de groupe."],["\xC9changer rapidement des messages courts",1,"Le chat est rapide et informel."]]),on("Envoyer un e\u2011mail","Ordonner les \xE9tapes d\u2019envoi d\u2019un e\u2011mail.",["Ouvrir la messagerie.","Cliquer sur \xAB Nouveau message \xBB.","Saisir l\u2019adresse du destinataire et l\u2019objet.","R\xE9diger le message (et joindre un fichier).","Cliquer sur \xAB Envoyer \xBB."],{explain:"On ouvre, on cr\xE9e, on adresse, on r\xE9dige, puis on envoie."}),Ft("Mission : \xE9crire et envoyer (simulation)","R\xE9diger et envoyer un message simul\xE9, sans aucune transmission r\xE9elle.","mail",{},[["Dans \xAB \xC0 \xBB, \xE9cris prof.info@ecole.exemple",{to:"=prof.info@ecole.exemple"},"L\u2019adresse identifie le destinataire (adresse fictive)."],["\xC9cris un objet qui contient le mot \xAB devoir \xBB.",{subject:"~devoir"},"L\u2019objet r\xE9sume le sujet."],["R\xE9dige un message qui commence par \xAB Bonjour \xBB.",{body:"~bonjour"},"Une formule de politesse est de mise."],["Joins le fichier devoir.docx.",{att:!0},"La pi\xE8ce jointe accompagne le message."],["Clique sur Envoyer (simulation : rien n\u2019est transmis).",{sent:!0},"Le message simul\xE9 reste sur cet ordinateur."]])]},{title:"Avantages et inconv\xE9nients d\u2019Internet",topics:["avantages","risques","protection","comportement responsable"],acts:[Nt("Avantage, risque ou protection ?","Classer des situations li\xE9es \xE0 Internet.",["Avantage","Risque","Protection"],[["Trouver rapidement des informations",0,"Internet donne acc\xE8s au savoir."],["Communiquer avec des personnes \xE9loign\xE9es",0,"Il rapproche."],["\xC9tudier avec des ressources en ligne",0,"Il aide \xE0 apprendre."],["Les messages d\u2019hame\xE7onnage (phishing)",1,"Ils cherchent \xE0 voler des informations."],["Un virus t\xE9l\xE9charg\xE9 par erreur",1,"Il peut ab\xEEmer l\u2019ordinateur."],["Le harc\xE8lement en ligne",1,"Il fait souffrir."],["Utiliser un mot de passe fort",2,"Il prot\xE8ge un compte."],["Mettre \xE0 jour l\u2019antivirus",2,"Il bloque des menaces."],["Ne pas partager ses donn\xE9es personnelles",2,"Il prot\xE8ge la vie priv\xE9e."],["V\xE9rifier les sources avant de croire une information",2,"Il \xE9vite les fausses informations."]]),Xt("D\xE9tecte le message suspect","Rep\xE9rer les signes d\u2019un message d\u2019hame\xE7onnage.","phish",[["sender","Clique sur l\u2019adresse d\u2019exp\xE9diteur douteuse.","Une adresse inhabituelle imite une banque."],["urgent","Clique sur la phrase qui met la pression avec une menace.","L\u2019urgence et la menace sont des signes d\u2019arnaque."],["link","Clique sur le lien suspect.","Il peut mener \xE0 un faux site."],["ask","Clique sur la demande d\u2019informations confidentielles.","Une vraie banque ne demande jamais un mot de passe par message."],["greet","Clique sur la salutation impersonnelle.","\xAB Cher client \xBB montre que le message n\u2019est pas personnalis\xE9."]]),Lt("Choisis la bonne r\xE9action","Choisir la r\xE9ponse s\xFBre dans des sc\xE9narios en ligne.",[["Un message dit : \xAB Tu as gagn\xE9 un t\xE9l\xE9phone, donne ton mot de passe ! \xBB Que fais\u2011tu ?",["Je ne r\xE9ponds pas, je ne donne rien et je signale ou supprime le message","Je donne mon mot de passe pour recevoir le prix","Je transf\xE8re le message \xE0 tous mes contacts","Je clique sur le lien pour voir"],"Un mot de passe ne se partage jamais."],["Un inconnu te demande ton adresse et ta photo. Que fais\u2011tu ?",["Je refuse et j\u2019en parle \xE0 un adulte de confiance","Je lui envoie ma photo","Je lui donne mon adresse","Je lui demande plus de d\xE9tails"],"Il ne faut pas donner de donn\xE9es personnelles \xE0 un inconnu."],["Un camarade est moqu\xE9 dans le groupe de classe. Que fais\u2011tu ?",["Je ne participe pas, je soutiens mon camarade et je pr\xE9viens un adulte","Je rigole avec les autres","Je partage le message","Je quitte le groupe sans rien dire"],"Le respect et l\u2019aide sont essentiels."],["Un site demande de t\xE9l\xE9charger un programme gratuit inconnu pour voir une vid\xE9o. Que fais\u2011tu ?",["Je ne t\xE9l\xE9charge pas et je demande \xE0 l\u2019enseignant","Je t\xE9l\xE9charge tout de suite","J\u2019envoie le lien \xE0 mes amis","Je d\xE9sactive l\u2019antivirus"],"Un programme inconnu peut contenir un virus."],["Tu trouves une information choquante sans source. Que fais\u2011tu ?",["Je v\xE9rifie avec des sources fiables avant de la partager","Je la partage imm\xE9diatement","Je la crois car elle est choquante","Je l\u2019envoie \xE0 toute la classe"],"V\xE9rifier \xE9vite de propager de fausses informations."]]),on("Mission cybercitoyen","R\xE9soudre un sc\xE9nario de cyberharc\xE8lement en respectant des comportements responsables.",["Ne pas r\xE9pondre sur le coup \xE0 la personne qui t\u2019agresse.","Garder une preuve (capture d\u2019\xE9cran).","Bloquer ou signaler le contact sur la plateforme.","En parler \xE0 un adulte de confiance (parent, enseignant).","Continuer \xE0 utiliser Internet avec prudence et respect."],{explain:"Rester calme, conserver des preuves, se prot\xE9ger, demander de l\u2019aide, puis poursuivre en s\xE9curit\xE9."})]}]};var wm=[Kh,ed,td,nd],zn=wm.map(i=>({...i,sessions:i.sessions.map((e,t)=>{let n={...e,id:`m${i.id}-s${t+1}`,moduleId:i.id,index:t+1,acts:[]};return n.acts=e.acts.map((s,r)=>({...s,id:`m${i.id}-s${t+1}-a${r+1}`,moduleId:i.id,sessionId:n.id,sessionIndex:t+1,index:r+1,version:1,type:s.mech.split(":")[0],instructions:s.instructions||jh[s.mech.split(":")[0]],hint:s.hint||Jh[s.mech.split(":")[0]],estimatedMinutes:s.estimatedMinutes||(s.mech.startsWith("sim")||s.mech==="robot"?8:5),accessibilityAlternative:"Toutes les interactions se font \xE0 la souris ou au clavier (Tab, Entr\xE9e, Espace) ; les glisser\u2011d\xE9poser ont une alternative par clic."})),n})})),Em=zn.flatMap(i=>i.sessions),pi=Em.flatMap(i=>i.acts),id=new Map(pi.map(i=>[i.id,i])),sd=i=>id.get(i),rd=i=>id.has(i),vr=i=>zn.find(e=>e.id===Number(i)),qi=(i,e)=>vr(i)?.sessions[Number(e)-1],Lc=pi.length*5;var Tm={1:"\u0645\u0628\u0627\u062F\u0626 \u0639\u0627\u0645\u0629 \u062D\u0648\u0644 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A\u0629",2:"\u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A",3:"\u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u0628\u0631\u0645\u062C\u0629",4:"\u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0648\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"},Am={"m1-s1":"\u0627\u0644\u062A\u0639\u0631\u064A\u0641\u0627\u062A \u0648\u0627\u0644\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629","m1-s2":"\u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0644\u062D\u0627\u0633\u0648\u0628","m1-s3":"\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0637\u0631\u0641\u064A\u0629 \u0648\u0627\u0644\u0648\u062D\u062F\u0629 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629","m1-s4":"\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0648\u0645\u062C\u0627\u0644\u0627\u062A \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627","m2-s1":"\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s2":"\u0628\u064A\u0626\u0629 \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s3":"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A","m2-s4":"\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0646\u0635\u0648\u0635: \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0648\u0627\u0644\u0628\u064A\u0626\u0629","m2-s5":"\u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0648\u0627\u0644\u062A\u062D\u0631\u064A\u0631","m2-s6":"\u0627\u0644\u062A\u0646\u0633\u064A\u0642","m2-s7":"\u0625\u062F\u0631\u0627\u062C \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A","m2-s8":"\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0637\u0628\u0627\u0639\u0629","m2-s9":"\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A\u0629: \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0648\u0627\u0644\u0628\u064A\u0626\u0629","m2-s10":"\u0627\u0644\u0635\u064A\u063A \u0648\u0627\u0644\u0639\u0646\u0648\u0646\u0629 \u0648\u0627\u0644\u062F\u0648\u0627\u0644","m2-s11":"\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629","m3-s1":"\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629 \u0648\u0627\u0644\u062B\u0648\u0627\u0628\u062A \u0648\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u0646\u0648\u0627\u0639","m3-s2":"\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629: \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0648\u0627\u0644\u0643\u062A\u0627\u0628\u0629 \u0648\u0627\u0644\u0625\u0633\u0646\u0627\u062F","m3-s3":"\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A\u0629","m3-s4":"\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u0634\u0631\u0637\u064A\u0629 \u0627\u0644\u0628\u0633\u064A\u0637\u0629","m3-s5":"\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u0634\u0631\u0637\u064A\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629","m3-s6":"\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s7":"\u0644\u063A\u0627\u062A \u0627\u0644\u0628\u0631\u0645\u062C\u0629","m3-s8":"\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629 \u0625\u0644\u0649 \u0628\u0631\u0646\u0627\u0645\u062C","m4-s1":"\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A\u0629","m4-s2":"\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0648\u0641\u0648\u0627\u0626\u062F\u0647\u0627","m4-s3":"\u062A\u0639\u0631\u064A\u0641 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A","m4-s4":"\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A","m4-s5":"\u062E\u062F\u0645\u0629 \u0627\u0644\u0648\u064A\u0628","m4-s6":"\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0648\u0627\u0644\u062F\u0631\u062F\u0634\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629","m4-s7":"\u0641\u0648\u0627\u0626\u062F \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0645\u062E\u0627\u0637\u0631\u0647"},Cm={"m1-s1-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u062A\u0639\u0631\u064A\u0641\u0627\u062A","m1-s1-a2":"\u0645\u0639\u0644\u0648\u0645\u0629 \u0623\u0645 \u0645\u0639\u0627\u0644\u062C\u0629\u061F","m1-s1-a3":"\u0623\u0643\u0645\u0644 \u0645\u062E\u0637\u0637 \u0625\u062F\u062E\u0627\u0644 \u2190 \u0645\u0639\u0627\u0644\u062C\u0629 \u2190 \u0625\u062E\u0631\u0627\u062C","m1-s1-a4":"\u0645\u0647\u0645\u0629: \u0627\u0644\u0646\u0634\u0631\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u064A\u0629","m1-s2-a1":"\u0627\u0628\u0646\u0650 \u0627\u0644\u0645\u062E\u0637\u0637","m1-s2-a2":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0637\u0631\u0641\u064A\u0629","m1-s2-a3":"\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0629","m1-s2-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u062D\u0627\u0633\u0648\u0628","m1-s3-a1":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A","m1-s3-a2":"\u0635\u0646\u0651\u0641 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0637\u0631\u0641\u064A\u0629","m1-s3-a3":"\u0631\u0643\u0651\u0628 \u0627\u0644\u062D\u0627\u0633\u0648\u0628","m1-s3-a4":"\u0645\u0647\u0645\u0629 \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0639\u0637\u0644","m1-s4-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A","m1-s4-a2":"\u0635\u0646\u0651\u0641 \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A","m1-s4-a3":"\u0627\u062E\u062A\u0631 \u0627\u0644\u0623\u062F\u0627\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629","m1-s4-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629","m2-s1-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0628\u0627\u0644\u062A\u0639\u0631\u064A\u0641\u0627\u062A","m2-s1-a2":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s1-a3":"\u0635\u0646\u0651\u0641 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A","m2-s1-a4":"\u0645\u0647\u0645\u0629 \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s2-a1":"\u0627\u0633\u062A\u0643\u0634\u0641 \u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628","m2-s2-a2":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0628\u0623\u062F\u0648\u0627\u0631\u0647\u0627","m2-s2-a3":"\u062A\u0639\u0627\u0645\u0644 \u0645\u0639 \u0627\u0644\u0646\u0627\u0641\u0630\u0629","m2-s2-a4":"\u0645\u0647\u0645\u0629 \u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628","m2-s3-a1":"\u0645\u0644\u0641 \u0623\u0645 \u0645\u062C\u0644\u062F \u0623\u0645 \u0627\u062E\u062A\u0635\u0627\u0631\u061F","m2-s3-a2":"\u0627\u0645\u062A\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u0623\u0646\u0648\u0627\u0639\u0647\u0627","m2-s3-a3":"\u0646\u0638\u0651\u0645 \u0645\u0644\u0641\u0627\u062A\u0643","m2-s3-a4":"\u0645\u0647\u0645\u0629 \u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0645\u0644\u0641\u0627\u062A","m2-s4-a1":"\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0646\u0627\u0641\u0630\u0629","m2-s4-a2":"\u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0648\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A","m2-s4-a3":"\u062A\u062D\u0631\u064A\u0631 \u0623\u0645 \u062A\u0646\u0633\u064A\u0642 \u0623\u0645 \u0625\u062F\u0631\u0627\u062C\u061F","m2-s4-a4":"\u0645\u0647\u0645\u0629 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0646\u0635\u0648\u0635","m2-s5-a1":"\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0641\u064A \u0648\u0636\u0639\u064A\u0629 \u0639\u0645\u0644\u064A\u0629","m2-s5-a2":"\u0635\u062D\u0651\u062D \u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u0643\u062A\u0648\u0628 \u0628\u0633\u0631\u0639\u0629","m2-s5-a3":"\u0627\u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0648\u0627\u0644\u0635\u0642\u0647\u0627","m2-s5-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0633\u0643\u0631\u062A\u064A\u0631","m2-s6-a1":"\u0627\u0644\u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u0632\u0631\u0627\u0631","m2-s6-a2":"\u062D\u062F\u0651\u062F \u0627\u0644\u0623\u062F\u0648\u0627\u062A","m2-s6-a3":"\u0623\u0635\u0644\u062D \u0627\u0644\u0641\u0642\u0631\u0629","m2-s6-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0635\u0645\u0645","m2-s7-a1":"\u0635\u0648\u0631\u0629 \u0623\u0645 \u062C\u062F\u0648\u0644 \u0623\u0645 \u0634\u0643\u0644\u061F","m2-s7-a2":"\u0627\u0644\u0643\u0627\u0626\u0646 \u0648\u0641\u0627\u0626\u062F\u062A\u0647","m2-s7-a3":"\u0623\u0646\u0634\u0626 \u0627\u0644\u0645\u0644\u0635\u0642","m2-s7-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0644\u0635\u0642","m2-s8-a1":"\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0635\u0641\u062D\u0629","m2-s8-a2":"\u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629","m2-s8-a3":"\u0627\u0636\u0628\u0637 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0648\u0636\u0639\u064A\u0629","m2-s8-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629","m2-s9-a1":"\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A","m2-s9-a2":"\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A","m2-s9-a3":"\u0636\u0639 \u0627\u0644\u0642\u064A\u0645 \u062D\u0633\u0628 \u0627\u0644\u0639\u0646\u0648\u0627\u0646","m2-s9-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0646\u0642\u0637: \u0623\u0646\u0634\u0626 \u0627\u0644\u062C\u062F\u0648\u0644","m2-s10-a1":"\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646 \u0648\u0627\u0644\u0646\u0637\u0627\u0642\u0627\u062A","m2-s10-a2":"\u0623\u0643\u0645\u0644 \u0627\u0644\u0635\u064A\u063A","m2-s10-a3":"\u0635\u062D\u0651\u062D \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0635\u064A\u063A","m2-s10-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0639\u062F\u0644\u0627\u062A","m2-s11-a1":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629","m2-s11-a2":"\u0623\u064A \u0631\u0633\u0645 \u0644\u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A\u061F","m2-s11-a3":"\u0623\u0643\u0645\u0644 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A","m2-s11-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0625\u062D\u0635\u0627\u0621","m3-s1-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645","m3-s1-a2":"\u062B\u0627\u0628\u062A \u0623\u0645 \u0645\u062A\u063A\u064A\u0631\u061F","m3-s1-a3":"\u0645\u0627 \u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u061F","m3-s1-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0631\u0648\u0628\u0648\u062A","m3-s2-a1":"\u0627\u0642\u0631\u0623 \u0648\u0627\u0643\u062A\u0628 \u0648\u0623\u0633\u0646\u062F","m3-s2-a2":"\u0623\u0643\u0645\u0644 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A","m3-s2-a3":"\u062D\u0627\u0643\u0650 \u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A","m3-s2-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0622\u0644\u0629 \u0627\u0644\u062D\u0627\u0633\u0628\u0629","m3-s3-a1":"\u0631\u062A\u0651\u0628 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629","m3-s3-a2":"\u062A\u0648\u0642\u0651\u0639 \u0627\u0644\u0646\u062A\u064A\u062C\u0629","m3-s3-a3":"\u0623\u0643\u0645\u0644 \u0648\u0635\u062D\u0651\u062D","m3-s3-a4":"\u0645\u0647\u0645\u0629 \u0622\u0644\u0629 \u0627\u0644\u0628\u064A\u0639","m3-s4-a1":"\u0635\u062D\u064A\u062D \u0623\u0645 \u062E\u0637\u0623\u061F","m3-s4-a2":"\u0627\u0644\u0634\u0631\u0637 \u0648\u0627\u0644\u0641\u0639\u0644","m3-s4-a3":"\u0625\u0630\u0627\u2026 \u0625\u0630\u0646\u2026 \u0646\u0647\u0627\u064A\u0629 \u0625\u0630\u0627","m3-s4-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0648\u0644\u0648\u062C","m3-s5-a1":"\u0623\u064A \u0641\u0631\u0639 \u064A\u064F\u0646\u0641\u0651\u064E\u0630\u061F","m3-s5-a2":"\u0625\u0630\u0627\u2026 \u0648\u0625\u0644\u0627\u2026 \u0646\u0647\u0627\u064A\u0629 \u0625\u0630\u0627","m3-s5-a3":"\u0635\u062D\u0651\u062D \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0645\u0646\u0637\u0642\u064A\u0629","m3-s5-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0646\u0634\u0631\u0629","m3-s6-a1":"\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s6-a2":"\u0645\u0646 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0625\u0644\u0649 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s6-a3":"\u0627\u0644\u0623\u0633\u0637\u0631 \u0648\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A","m3-s6-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630","m3-s7-a1":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0644\u063A\u0627\u062A","m3-s7-a2":"\u0644\u063A\u0629 \u0623\u0645 \u0628\u064A\u0626\u0629 \u062A\u0637\u0648\u064A\u0631 \u0623\u0645 \u062A\u0637\u0628\u064A\u0642\u061F","m3-s7-a3":"\u0623\u0643\u0645\u0644 \u0634\u064A\u0641\u0631\u0629 \u0628\u0627\u064A\u062B\u0648\u0646","m3-s7-a4":"\u0645\u0647\u0645\u0629 \u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0623\u062E\u0637\u0627\u0621","m3-s8-a1":"\u0627\u0644\u0634\u064A\u0641\u0631\u0629 \u0627\u0644\u0648\u0635\u0641\u064A\u0629 \u2194 \u0628\u0627\u064A\u062B\u0648\u0646","m3-s8-a2":"\u0623\u0643\u0645\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s8-a3":"\u0642\u0627\u0631\u0646 \u0628\u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0645\u0646\u062A\u0638\u0631\u0629","m3-s8-a4":"\u0627\u0644\u0645\u0647\u0645\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629: \u0627\u0644\u0645\u0639\u062F\u0644","m4-s1-a1":"\u0627\u0631\u0628\u0637 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0634\u0628\u0643\u0629","m4-s1-a2":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u062A\u062C\u0647\u064A\u0632\u0627\u062A","m4-s1-a3":"\u0627\u0628\u0646\u0650 \u0634\u0628\u0643\u0629 \u0627\u0644\u0642\u0627\u0639\u0629","m4-s1-a4":"\u0645\u0647\u0645\u0629: \u0634\u0628\u0643\u0629 \u0627\u0644\u0642\u0633\u0645","m4-s2-a1":"LAN \u0623\u0645 MAN \u0623\u0645 WAN\u061F","m4-s2-a2":"\u0646\u0648\u0639 \u0627\u0644\u0634\u0628\u0643\u0629 \u0648\u0646\u0637\u0627\u0642\u0647\u0627","m4-s2-a3":"\u0641\u0648\u0627\u0626\u062F \u0627\u0644\u0634\u0628\u0643\u0629","m4-s2-a4":"\u0645\u0647\u0645\u0629: \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0644","m4-s3-a1":"\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0627\u0644\u0648\u064A\u0628 \u0648\u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0648\u0627\u0644\u0645\u0648\u0642\u0639","m4-s3-a2":"\u062E\u062F\u0645\u0629 \u0623\u0645 \u0628\u0646\u064A\u0629 \u062A\u062D\u062A\u064A\u0629\u061F","m4-s3-a3":"\u0639\u0645\u064A\u0644 \u0648\u0634\u0628\u0643\u0629 \u0648\u062E\u0627\u062F\u0645","m4-s3-a4":"\u0645\u0647\u0645\u0629: \u0627\u0644\u0637\u0644\u0628 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629","m4-s4-a1":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u0648\u062C\u0651\u0647","m4-s4-a2":"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644","m4-s4-a3":"\u0645\u0631\u0627\u062D\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644","m4-s4-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u062A\u0634\u062E\u064A\u0635","m4-s5-a1":"\u0627\u0644\u0645\u062A\u0635\u0641\u062D","m4-s5-a2":"\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u0648\u064A\u0628","m4-s5-a3":"\u0641\u0643\u0651\u0643 \u0639\u0646\u0648\u0627\u0646\u0627\u064B \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B","m4-s5-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0628\u062D\u062B","m4-s6-a1":"\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","m4-s6-a2":"\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0645 \u062F\u0631\u062F\u0634\u0629\u061F","m4-s6-a3":"\u0623\u0631\u0633\u0644 \u0628\u0631\u064A\u062F\u0627\u064B \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B","m4-s6-a4":"\u0645\u0647\u0645\u0629: \u0627\u0643\u062A\u0628 \u0648\u0623\u0631\u0633\u0644 (\u0645\u062D\u0627\u0643\u0627\u0629)","m4-s7-a1":"\u0641\u0627\u0626\u062F\u0629 \u0623\u0645 \u062E\u0637\u0631 \u0623\u0645 \u062D\u0645\u0627\u064A\u0629\u061F","m4-s7-a2":"\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0645\u0634\u0628\u0648\u0647\u0629","m4-s7-a3":"\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0631\u0651\u0641 \u0627\u0644\u0635\u062D\u064A\u062D","m4-s7-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0637\u0646 \u0627\u0644\u0631\u0642\u0645\u064A"},Rm={Information:"\u0645\u0639\u0644\u0648\u0645\u0629",Traitement:"\u0645\u0639\u0627\u0644\u062C\u0629",Informatique:"\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u064A\u0627\u062A","Syst\xE8me informatique":"\u0646\u0638\u0627\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A",Donn\u00E9e:"\u0645\u0639\u0637\u0649",Entr\u00E9e:"\u0625\u062F\u062E\u0627\u0644",Sortie:"\u0625\u062E\u0631\u0627\u062C",Stockage:"\u062A\u062E\u0632\u064A\u0646",Clavier:"\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D",Souris:"\u0627\u0644\u0641\u0623\u0631\u0629",Scanner:"\u0627\u0644\u0645\u0627\u0633\u062D \u0627\u0644\u0636\u0648\u0626\u064A","Processeur (CPU)":"\u0627\u0644\u0645\u0639\u0627\u0644\u062C","M\xE9moire vive (RAM)":"\u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062D\u064A\u0629",\u00C9cran:"\u0627\u0644\u0634\u0627\u0634\u0629","Haut-parleurs":"\u0645\u0643\u0628\u0651\u0631\u0627\u062A \u0627\u0644\u0635\u0648\u062A",Imprimante:"\u0627\u0644\u0637\u0627\u0628\u0639\u0629","Disque dur / SSD":"\u0627\u0644\u0642\u0631\u0635 \u0627\u0644\u0635\u0644\u0628 / SSD","Cl\xE9 USB":"\u0645\u0641\u062A\u0627\u062D USB",Windows:"\u0648\u064A\u0646\u062F\u0648\u0632",Android:"\u0623\u0646\u062F\u0631\u0648\u064A\u062F",Linux:"\u0644\u064A\u0646\u0643\u0633",macOS:"\u0645\u0627\u0643 \u0623\u0648 \u0625\u0633",iOS:"\u0622\u064A \u0623\u0648 \u0625\u0633",Writer:"\u0645\u0639\u0627\u0644\u062C \u0627\u0644\u0646\u0635\u0648\u0635",Calc:"\u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A","Navigateur web":"\u0645\u062A\u0635\u0641\u062D \u0627\u0644\u0648\u064A\u0628",Navigateur:"\u0645\u062A\u0635\u0641\u062D \u0627\u0644\u0648\u064A\u0628","Logiciel de dessin":"\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0631\u0633\u0645","Lecteur de musique":"\u0645\u0634\u063A\u0644 \u0627\u0644\u0645\u0648\u0633\u064A\u0642\u0649","Logiciel de pr\xE9sentation":"\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0639\u0631\u0648\u0636 \u0627\u0644\u062A\u0642\u062F\u064A\u0645\u064A\u0629",Algorithme:"\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629",Instruction:"\u062A\u0639\u0644\u064A\u0645\u0629",Variable:"\u0645\u062A\u063A\u064A\u0631",Constante:"\u062B\u0627\u0628\u062A",Python:"\u0628\u0627\u064A\u062B\u0648\u0646",Scratch:"\u0633\u0643\u0631\u0627\u062A\u0634",JavaScript:"\u062C\u0627\u0641\u0627\u0633\u0643\u0631\u064A\u0628\u062A",IDLE:"\u0628\u064A\u0626\u0629 IDLE",Thonny:"\u0645\u062D\u0631\u0631 \u062B\u0648\u0646\u064A","Visual Studio Code":"\u0641\u064A\u062C\u0648\u0627\u0644 \u0633\u062A\u0648\u062F\u064A\u0648 \u0643\u0648\u062F","Code source":"\u0627\u0644\u0634\u064A\u0641\u0631\u0629 \u0627\u0644\u0645\u0635\u062F\u0631\u064A\u0629",LAN:"\u0634\u0628\u0643\u0629 \u0645\u062D\u0644\u064A\u0629",MAN:"\u0634\u0628\u0643\u0629 \u062D\u0636\u0631\u064A\u0629",WAN:"\u0634\u0628\u0643\u0629 \u0648\u0627\u0633\u0639\u0629",PAN:"\u0634\u0628\u0643\u0629 \u0634\u062E\u0635\u064A\u0629",Internet:"\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A","R\xE9seau informatique":"\u0634\u0628\u0643\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A\u0629","Ordinateur (poste)":"\u062D\u0627\u0633\u0648\u0628 (\u0645\u062D\u0637\u0629 \u0639\u0645\u0644)","Commutateur (switch)":"\u0645\u0628\u062F\u0644 \u0627\u0644\u0634\u0628\u0643\u0629 (\u0633\u0648\u064A\u062A\u0634)","Liaison (c\xE2ble ou Wi\u2011Fi)":"\u0631\u0627\u0628\u0637 (\u0643\u0627\u0628\u0644 \u0623\u0648 \u0648\u0627\u064A \u0641\u0627\u064A)","Imprimante r\xE9seau":"\u0637\u0627\u0628\u0639\u0629 \u0634\u0628\u0643\u064A\u0629",Modem:"\u0645\u0648\u062F\u0645",Routeur:"\u0645\u0648\u062C\u0651\u0647","Wi\u2011Fi":"\u0648\u0627\u064A \u0641\u0627\u064A","C\xE2ble Ethernet":"\u0643\u0627\u0628\u0644 \u0625\u064A\u062B\u0631\u0646\u062A","Fournisseur d\u2019acc\xE8s (FAI)":"\u0645\u0632\u0648\u062F \u062E\u062F\u0645\u0629 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A",Serveur:"\u062E\u0627\u062F\u0645","Serveur web":"\u062E\u0627\u062F\u0645 \u0627\u0644\u0648\u064A\u0628",Microphone:"\u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646",Vid\u00E9oprojecteur:"\u0645\u0633\u0644\u0627\u0637 \u0641\u064A\u062F\u064A\u0648","\xC9cran tactile":"\u0634\u0627\u0634\u0629 \u0644\u0645\u0633\u064A\u0629","Casque avec micro":"\u0633\u0645\u0627\u0639\u0629 \u0631\u0623\u0633 \u0645\u0639 \u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646","Imprimante multifonction":"\u0637\u0627\u0628\u0639\u0629 \u0645\u062A\u0639\u062F\u062F\u0629 \u0627\u0644\u0648\u0638\u0627\u0626\u0641","Disque dur externe":"\u0642\u0631\u0635 \u0635\u0644\u0628 \u062E\u0627\u0631\u062C\u064A","Disque dur":"\u0627\u0644\u0642\u0631\u0635 \u0627\u0644\u0635\u0644\u0628","Disque SSD":"\u0642\u0631\u0635 SSD","Carte m\xE8re":"\u0627\u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u0623\u0645",Alimentation:"\u0648\u062D\u062F\u0629 \u0627\u0644\u062A\u063A\u0630\u064A\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629",Ventilateur:"\u0645\u0631\u0648\u062D\u0629 \u0627\u0644\u062A\u0628\u0631\u064A\u062F","Mot de passe":"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",Antivirus:"\u0645\u0636\u0627\u062F \u0627\u0644\u0641\u064A\u0631\u0648\u0633\u0627\u062A","Mise \xE0 jour":"\u062A\u062D\u062F\u064A\u062B","Pour calculer la moyenne de Sara, quelles sont les informations d\u2019entr\xE9e ?":"\u0644\u062D\u0633\u0627\u0628 \u0645\u0639\u062F\u0644 \u0633\u0627\u0631\u0629\u060C \u0645\u0627 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u062F\u062E\u0627\u0644\u061F","Ses notes dans chaque mati\xE8re et les coefficients":"\u0646\u0642\u0637\u0647\u0627 \u0641\u064A \u0643\u0644 \u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A","La moyenne finale":"\u0627\u0644\u0645\u0639\u062F\u0644 \u0627\u0644\u0646\u0647\u0627\u0626\u064A","Le bulletin imprim\xE9":"\u0627\u0644\u0646\u0634\u0631\u0629 \u0627\u0644\u0645\u0637\u0628\u0648\u0639\u0629","Le nom de l\u2019\xE9cole seulement":"\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0641\u0642\u0637","Quelle op\xE9ration constitue le traitement ?":"\u0645\u0627 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u0645\u062B\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629\u061F","Multiplier chaque note par son coefficient, additionner, puis diviser par la somme des coefficients":"\u0636\u0631\u0628 \u0643\u0644 \u0646\u0642\u0637\u0629 \u0641\u064A \u0645\u0639\u0627\u0645\u0644\u0647\u0627 \u062B\u0645 \u0627\u0644\u062C\u0645\u0639 \u0648\u0627\u0644\u0642\u0633\u0645\u0629 \u0639\u0644\u0649 \u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A","\xC9crire le nom de l\u2019\xE9l\xE8ve":"\u0643\u062A\u0627\u0628\u0629 \u0627\u0633\u0645 \u0627\u0644\u062A\u0644\u0645\u064A\u0630","Imprimer la feuille":"\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0648\u0631\u0642\u0629","Brancher l\u2019imprimante":"\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0637\u0627\u0628\u0639\u0629","Que repr\xE9sente la moyenne affich\xE9e sur le bulletin ?":"\u0645\u0627\u0630\u0627 \u064A\u0645\u062B\u0644 \u0627\u0644\u0645\u0639\u062F\u0644 \u0627\u0644\u0645\u0639\u0631\u0648\u0636 \u0641\u064A \u0627\u0644\u0646\u0634\u0631\u0629\u061F","Une information de sortie, r\xE9sultat du traitement":"\u0645\u0639\u0644\u0648\u0645\u0629 \u0625\u062E\u0631\u0627\u062C \u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","Une information d\u2019entr\xE9e":"\u0645\u0639\u0644\u0648\u0645\u0629 \u0625\u062F\u062E\u0627\u0644","Un logiciel":"\u0628\u0631\u0646\u0627\u0645\u062C","Un p\xE9riph\xE9rique":"\u062C\u0647\u0627\u0632 \u0637\u0631\u0641\u064A","Le professeur corrige une note. Que faut-il refaire ?":"\u0635\u062D\u0651\u062D \u0627\u0644\u0623\u0633\u062A\u0627\u0630 \u0646\u0642\u0637\u0629\u061B \u0645\u0627\u0630\u0627 \u064A\u062C\u0628 \u0623\u0646 \u0646\u0639\u064A\u062F\u061F","Relancer le traitement avec la note corrig\xE9e pour obtenir une nouvelle moyenne":"\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0646\u0642\u0637\u0629 \u0627\u0644\u0645\u0635\u062D\u062D\u0629 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0645\u0639\u062F\u0644 \u062C\u062F\u064A\u062F","Rien, la moyenne se corrige seule":"\u0644\u0627 \u0634\u064A\u0621\u060C \u064A\u062A\u0635\u062D\u062D \u0627\u0644\u0645\u0639\u062F\u0644 \u0648\u062D\u062F\u0647","Changer d\u2019ordinateur":"\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0633\u0648\u0628","Supprimer tous les bulletins":"\u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0646\u0634\u0631\u0627\u062A","Le bulletin complet est produit par :":"\u062A\u064F\u0646\u062A\u062C \u0627\u0644\u0646\u0634\u0631\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0628\u0648\u0627\u0633\u0637\u0629:","Un syst\xE8me informatique (mat\xE9riel + logiciels + donn\xE9es)":"\u0646\u0638\u0627\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A: \u0639\u062A\u0627\u062F \u0648\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0648\u0628\u064A\u0627\u0646\u0627\u062A","Le seul clavier":"\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0648\u062D\u062F\u0647\u0627","La seule imprimante":"\u0627\u0644\u0637\u0627\u0628\u0639\u0629 \u0648\u062D\u062F\u0647\u0627","Uniquement l\u2019\xE9cran":"\u0627\u0644\u0634\u0627\u0634\u0629 \u0641\u0642\u0637"},Im={"\xC9l\xE9ment de connaissance (texte, nombre, image, son) que l\u2019on peut repr\xE9senter, conserver ou communiquer.":"\u0639\u0646\u0635\u0631 \u0645\u0639\u0631\u0641\u064A \u0645\u062B\u0644 \u0646\u0635 \u0623\u0648 \u0639\u062F\u062F \u0623\u0648 \u0635\u0648\u0631\u0629 \u0623\u0648 \u0635\u0648\u062A \u064A\u0645\u0643\u0646 \u062A\u0645\u062B\u064A\u0644\u0647 \u0623\u0648 \u062D\u0641\u0638\u0647 \u0623\u0648 \u0646\u0642\u0644\u0647.","Op\xE9ration appliqu\xE9e \xE0 des informations pour obtenir un r\xE9sultat (calculer, trier, classer\u2026).":"\u0639\u0645\u0644\u064A\u0629 \u062A\u064F\u0637\u0628\u0651\u064E\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0646\u062A\u064A\u062C\u0629 \u0645\u062B\u0644 \u0627\u0644\u062D\u0633\u0627\u0628 \u0623\u0648 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0623\u0648 \u0627\u0644\u062A\u0635\u0646\u064A\u0641.","Science du traitement automatique de l\u2019information par des ordinateurs.":"\u0639\u0644\u0645 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0622\u0644\u064A\u0629 \u0644\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0628\u0648\u0627\u0633\u0637\u0629 \u0627\u0644\u062D\u0648\u0627\u0633\u064A\u0628.","Ensemble form\xE9 du mat\xE9riel (ordinateur, p\xE9riph\xE9riques) et des logiciels qui traitent l\u2019information.":"\u0645\u062C\u0645\u0648\u0639\u0629 \u062A\u062A\u0643\u0648\u0651\u0646 \u0645\u0646 \u0627\u0644\u0639\u062A\u0627\u062F \u0648\u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0639\u0627\u0644\u062C \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A.","Information brute, avant tout traitement, comme la note 14 ou le mot \xAB Rabat \xBB.":"\u0645\u0639\u0644\u0648\u0645\u0629 \u062E\u0627\u0645 \u0642\u0628\u0644 \u0645\u0639\u0627\u0644\u062C\u062A\u0647\u0627\u060C \u0645\u062B\u0644 \u0627\u0644\u0646\u0642\u0637\u0629 14 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0631\u0628\u0627\u0637."},Dc=i=>Tm[i]||"",Uc=i=>Am[i]||"",Nc=i=>Cm[i]||"",Fc=i=>Rm[String(i).trim()]||Im[String(i).trim()]||"",Pm={match:"\u0627\u062E\u062A\u0631 \u0639\u0646\u0635\u0631\u0627\u064B \u0645\u0646 \u0627\u0644\u0639\u0645\u0648\u062F \u0627\u0644\u0623\u064A\u0633\u0631\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0645\u0627 \u064A\u0642\u0627\u0628\u0644\u0647 \u0641\u064A \u0627\u0644\u0639\u0645\u0648\u062F \u0627\u0644\u0623\u064A\u0645\u0646. \u064A\u0645\u0643\u0646\u0643 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0631\u0628\u0637 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0642\u0642.",sort:"\u0627\u062E\u062A\u0631 \u0628\u0637\u0627\u0642\u0629 \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629\u060C \u0623\u0648 \u0627\u0633\u062D\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0648\u0623\u0641\u0644\u062A\u0647\u0627. \u0644\u0646 \u062A\u0638\u0647\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0642\u0642.",order:"\u0631\u062A\u0651\u0628 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0628\u0627\u0633\u062A\u0639\u0645\u0627\u0644 \u0632\u0631\u064A \u0627\u0644\u0635\u0639\u0648\u062F \u0648\u0627\u0644\u0646\u0632\u0648\u0644\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \xAB\u062A\u062D\u0642\u0642\xBB.",fill:"\u0627\u062E\u062A\u0631 \u0627\u0644\u0643\u0644\u0645\u0629 \u0623\u0648 \u0627\u0644\u0639\u0628\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0641\u064A \u0643\u0644 \u0641\u0631\u0627\u063A\u060C \u062B\u0645 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u062C\u0627\u0628\u0627\u062A\u0643.",quiz:"\u0627\u0642\u0631\u0623 \u0627\u0644\u0633\u0624\u0627\u0644 \u0648\u0627\u062E\u062A\u0631 \u062C\u0648\u0627\u0628\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0641\u0642\u0637\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \xAB\u062A\u062D\u0642\u0642\xBB.",hot:"\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0629 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0641\u064A \u0627\u0644\u0635\u0648\u0631\u0629\u060C \u0623\u0648 \u0627\u0633\u062A\u0639\u0645\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0646\u0627\u0637\u0642.",asm:"\u0627\u062E\u062A\u0631 \u0645\u0643\u0648\u0651\u0646\u0627\u064B \u062B\u0645 \u0636\u0639\u0647 \u0641\u064A \u0645\u0643\u0627\u0646\u0647 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u062F\u0627\u062E\u0644 \u0627\u0644\u062D\u0627\u0633\u0648\u0628.",net:"\u0627\u062E\u062A\u0631 \u062C\u0647\u0627\u0632\u064A\u0646 \u0644\u0631\u0628\u0637\u0647\u0645\u0627 \u0628\u0643\u0627\u0628\u0644\u060C \u0648\u0627\u0631\u0628\u0637 \u0641\u0642\u0637 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0636\u0631\u0648\u0631\u064A\u0629.",robot:"\u0643\u0648\u0651\u0646 \u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0631\u0648\u0628\u0648\u062A \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629\u060C \u062B\u0645 \u0634\u063A\u0651\u0644\u0647 \u0648\u0635\u062D\u0651\u062D\u0647 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0642\u0642.",prog:"\u062A\u062A\u0628\u0651\u0639 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629 \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629 \u0643\u0645\u0627 \u064A\u0641\u0639\u0644 \u0627\u0644\u062D\u0627\u0633\u0648\u0628\u060C \u062B\u0645 \u0623\u062F\u062E\u0644 \u0627\u0644\u0646\u062A\u064A\u062C\u0629.",sim:"\u0646\u0641\u0651\u0630 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u062D\u0627\u0643\u0627\u0629\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \xAB\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0631\u062D\u0644\u0629\xBB. \u0644\u0627 \u064A\u062A\u0645 \u062A\u063A\u064A\u064A\u0631 \u0623\u064A \u0634\u064A\u0621 \u062D\u0642\u064A\u0642\u064A \u0641\u064A \u0627\u0644\u062D\u0627\u0633\u0648\u0628."},ad=i=>Pm[i]||"";var od=globalThis.AudioContext||globalThis.webkitAudioContext,Ot=null,mi=null,ka=null,Ha=null,gi={soundEnabled:!0,hoverSound:!1,volume:.45},Bc=i=>Math.min(1,Math.max(0,Number(i)||0)),ld=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.51,1567.98,1760];function Lm(i,e,t){let n=Math.floor(i.sampleRate*e),s=i.createBuffer(2,n,i.sampleRate);for(let r=0;r<2;r++){let a=s.getChannelData(r);for(let o=0;o<n;o++)a[o]=(Math.random()*2-1)*Math.pow(1-o/n,t)}return s}function Va(){if(!od)return null;if(!Ot){try{Ot=new od}catch{return null}let i=Ot.createDynamicsCompressor();i.threshold.value=-16,i.ratio.value=4,i.connect(Ot.destination),mi=Ot.createGain(),mi.gain.value=Bc(gi.volume),mi.connect(i);let e=Ot.createConvolver();e.buffer=Lm(Ot,1.8,2.8),e.connect(mi),ka=Ot.createGain(),ka.gain.value=.9,ka.connect(e),Ha=Ot.createBuffer(1,Ot.sampleRate,Ot.sampleRate);let t=Ha.getChannelData(0);for(let n=0;n<t.length;n++)t[n]=Math.random()*2-1}return Ot.state==="suspended"&&Ot.resume().catch(()=>{}),Ot}var Wi=()=>gi.soundEnabled&&gi.volume>0;function ud(i,e,t,n,s){let r=i.createGain();return r.gain.setValueAtTime(1e-4,e),r.gain.linearRampToValueAtTime(n,e+s),r.gain.exponentialRampToValueAtTime(1e-4,e+t),r}function hd(i,e,t){if(e.connect(mi),t>0){let n=i.createGain();n.gain.value=t,e.connect(n),n.connect(ka)}}function Ct({f:i,end:e=i,dur:t=.1,g:n=.08,type:s="sine",delay:r=0,attack:a=.008,lp:o=0,rev:l=0,detune:c=0}){let u=Va();if(!u)return;let h=u.currentTime+r,p=u.createOscillator();p.type=s,p.detune.value=c,p.frequency.setValueAtTime(i,h),e!==i&&p.frequency.exponentialRampToValueAtTime(Math.max(20,e),h+t);let g=ud(u,h,t,n,a),v=p;if(o){let m=u.createBiquadFilter();m.type="lowpass",m.frequency.value=o,p.connect(m),v=m}v.connect(g),hd(u,g,l),p.start(h),p.stop(h+t+.05)}function Jn({dur:i=.1,g:e=.08,type:t="bandpass",f:n=1e3,to:s=n,q:r=1,delay:a=0,attack:o=.004,rev:l=0}){let c=Va();if(!c)return;let u=c.currentTime+a,h=c.createBufferSource();h.buffer=Ha,h.loop=!0;let p=c.createBiquadFilter();p.type=t,p.Q.value=r,p.frequency.setValueAtTime(n,u),s!==n&&p.frequency.exponentialRampToValueAtTime(s,u+i);let g=ud(c,u,i,e,o);h.connect(p),p.connect(g),hd(c,g,l),h.start(u,Math.random()*.5),h.stop(u+i+.05)}function Hn(i,{dur:e=.5,g:t=.07,delay:n=0,rev:s=.35}={}){Ct({f:i,dur:e,g:t,delay:n,rev:s,attack:.004}),Ct({f:i*2.76,dur:e*.5,g:t*.35,delay:n,rev:s,attack:.002}),Ct({f:i*5.4,dur:e*.25,g:t*.15,delay:n,rev:s,attack:.002})}function Oc(i,e=0,t=.03){for(let n=0;n<i;n++)Hn(1800+Math.random()*1600,{dur:.3,g:t*(.6+Math.random()*.6),delay:e+n*.055+Math.random()*.02,rev:.7})}var Dm={click:()=>{Jn({dur:.03,g:.1,f:3200,q:2}),Ct({f:560,end:420,type:"triangle",dur:.05,g:.05})},hover:()=>{gi.hoverSound&&Ct({f:900,end:980,dur:.035,g:.018})},select:()=>{Ct({f:380,end:780,dur:.1,g:.08}),Ct({f:760,end:1560,dur:.07,g:.02,delay:.01})},snap:()=>{Jn({dur:.06,g:.14,type:"lowpass",f:900,q:.7}),Hn(783.99,{dur:.25,g:.06,rev:.2})},pop:()=>{Ct({f:950,end:280,dur:.08,g:.08}),Jn({dur:.03,g:.05,f:2500,q:3})},move:()=>Jn({dur:.13,g:.07,f:500,to:2200,q:1.3}),hint:()=>{[1318.51,1567.98,2093].forEach((i,e)=>Hn(i,{dur:.45,g:.05,delay:e*.07,rev:.7}))},robot:()=>{Ct({f:300,end:440,type:"square",dur:.08,g:.035,lp:1400}),Jn({dur:.05,g:.04,f:4e3,q:4,delay:.02})},bump:()=>{Ct({f:150,end:55,dur:.22,g:.22}),Jn({dur:.14,g:.12,type:"lowpass",f:350})},correct:(i={})=>Hn(ld[Math.min(ld.length-1,i.i||0)],{dur:.35,g:.065,delay:i.delay||0,rev:.3}),wrong:(i={})=>{let e=i.delay||0;Ct({f:230,end:165,type:"sawtooth",dur:.17,g:.045,lp:900,delay:e}),Ct({f:115,end:90,dur:.2,g:.06,delay:e})},success:(i={})=>{let e=i.delay||0;[523.25,659.25,783.99,1046.5].forEach((t,n)=>Hn(t,{dur:.5,g:.07,delay:e+n*.09,rev:.4})),[523.25,659.25,783.99].forEach(t=>Ct({f:t,type:"triangle",dur:.8,g:.03,attack:.05,lp:2200,delay:e+.36,rev:.4}))},complete:(i={})=>{let e=i.delay||0;[523.25,659.25,783.99,1046.5,1318.51].forEach((t,n)=>Hn(t,{dur:.55,g:.075,delay:e+n*.08,rev:.45})),[523.25,659.25,783.99,1046.5].forEach((t,n)=>Ct({f:t,type:"sawtooth",dur:1.3,g:.022,attack:.08,lp:2600,delay:e+.42,detune:n%2?6:-6,rev:.5})),Jn({dur:1.2,g:.03,f:3e3,to:8e3,q:.6,attack:.4,delay:e+.4,rev:.6}),Oc(9,e+.5)},error:(i={})=>{let e=i.delay||0;Ct({f:330,end:294,type:"triangle",dur:.22,g:.07,lp:1500,delay:e}),Ct({f:294,end:220,type:"triangle",dur:.4,g:.07,lp:1200,delay:e+.22})},star:(i={})=>{Hn([783.99,880,1046.5,1174.66,1318.51][Math.min(4,i.i||0)],{dur:.6,g:.065,delay:i.delay||0,rev:.55}),Oc(2,(i.delay||0)+.05,.02)},whoosh:()=>{Jn({dur:.9,g:.11,f:280,to:2600,q:.9,attack:.35}),Ct({f:90,end:170,dur:.9,g:.05,attack:.3})},portal:()=>{Hn(1046.5,{dur:.7,g:.035,rev:.9}),Hn(1567.98,{dur:.7,g:.025,delay:.06,rev:.9})},open:()=>{Ct({f:300,end:900,dur:.28,g:.05,attack:.05,rev:.4}),Jn({dur:.3,g:.04,f:1500,to:6e3,q:1,attack:.1})},join:()=>Hn(1174.66,{dur:.4,g:.04,rev:.5}),overtake:()=>{Ct({f:400,end:1300,type:"square",dur:.28,g:.035,lp:2400}),Oc(3,.2,.025)},overtaken:()=>Ct({f:1e3,end:280,type:"square",dur:.35,g:.035,lp:1800}),"race-start":()=>{[0,.5,1].forEach(i=>Ct({f:660,dur:.14,g:.07,type:"square",lp:2e3,delay:i})),Ct({f:1320,dur:.5,g:.08,type:"square",lp:2600,delay:1.5})}},yr=null;function kc(){let i=Va();if(!i||yr)return;let e=i.createGain();e.gain.setValueAtTime(1e-4,i.currentTime),e.gain.linearRampToValueAtTime(1,i.currentTime+3),e.connect(mi);let t=i.createBiquadFilter();t.type="lowpass",t.frequency.value=650,t.connect(e);let n=i.createGain();n.gain.value=.03,n.connect(t);let s=[110,164.81,220.5,277.18].map((p,g)=>{let v=i.createOscillator();return v.type=g===3?"triangle":"sine",v.frequency.value=p,v.detune.value=(g-1.5)*4,v.connect(n),v.start(),v}),r=i.createOscillator();r.frequency.value=.06;let a=i.createGain();a.gain.value=260,r.connect(a),a.connect(t.frequency),r.start();let o=i.createBufferSource();o.buffer=Ha,o.loop=!0;let l=i.createBiquadFilter();l.type="bandpass",l.frequency.value=480,l.Q.value=.6;let c=i.createGain();c.gain.value=.012;let u=i.createOscillator();u.frequency.value=.11;let h=i.createGain();h.gain.value=.009,u.connect(h),h.connect(c.gain),u.start(),o.connect(l),l.connect(c),c.connect(e),o.start(),yr={out:e,nodes:[...s,r,u,o]}}function cd(){if(!yr||!Ot)return;let i=yr;yr=null;let e=Ot.currentTime;i.out.gain.cancelScheduledValues(e),i.out.gain.setValueAtTime(i.out.gain.value,e),i.out.gain.linearRampToValueAtTime(1e-4,e+1),setTimeout(()=>i.nodes.forEach(t=>{try{t.stop()}catch{}}),1200)}var za=!1,Ne={configure(i={}){gi={...gi,...i,volume:Bc(i.volume??gi.volume)},mi&&Ot&&mi.gain.setTargetAtTime(Bc(gi.volume),Ot.currentTime,.05),Wi()?za&&Ot&&kc():cd()},play(i,e){if(!Wi())return;let t=Dm[i];if(t)try{t(e)}catch{}},feedback(i,e,t){let s=(i||[]).filter(u=>!u.info).slice(0,10),r=0;Wi()&&s.forEach((u,h)=>{u.ok?Ne.play("correct",{i:r++,delay:h*.11}):Ne.play("wrong",{delay:h*.11})});let a=s.length*.11+.12;Wi()&&Ne.play(e===1?"complete":e>=.6?"success":"error",{delay:a});let o=Math.round(t||0),l=a+(e===1?.9:.6),c=.17;if(Wi())for(let u=0;u<o;u++)Ne.play("star",{i:u,delay:l+u*c});return{step:.11,end:a,starAt:l,starStep:c}},ambient(i){za=!!i,i&&Wi()?kc():cd()},get ambientOn(){return za}};function dd(i=document){i.addEventListener("click",e=>{let t=e.target.closest('button,a,[role="button"],input[type="checkbox"],input[type="radio"],summary');t&&!t.closest("[data-own-sound]")&&Ne.play("click")},!0),i.addEventListener("pointerover",e=>{let t=e.target.closest('button,a,[role="button"]');t&&!t.contains(e.relatedTarget)&&Ne.play("hover")},!0),i.addEventListener("pointerdown",()=>{Va(),za&&Wi()&&kc()},{capture:!0})}var Ga=i=>String.fromCharCode(65+i),Um=[[/preuve|capture d.écran/i,"cyber-citizen",1],[/ne pas répondre|ignorer/i,"cyber-citizen",0],[/bloquer|signaler/i,"cyber-citizen",2],[/adulte de confiance|enseignant|parent/i,"cyber-citizen",3],[/vérifier les sources/i,"cyber-citizen",4],[/prudence et respect|\brespect\b/i,"cyber-citizen",5],[/imprimante.*(multifonction|réseau|partag)/i,"network",5],[/imprimante(?!.*(multifonction|réseau|partag))/i,"peripherals",3],[/scanner/i,"peripherals",4],[/souris/i,"peripherals",2],[/clavier/i,"peripherals",1],[/clé usb/i,"peripherals",5],[/casque.*micro|microphone|haut-parleurs?|lecteur de musique/i,"speakers",0],[/écran tactile|vidéoprojecteur|écran|moniteur/i,"peripherals",0],[/carte mère/i,"components",0],[/processeur|\bcpu\b/i,"components",1],[/mémoire vive|\bram\b/i,"components",2],[/disque dur externe|disque dur|disque.*ssd|\bssd\b/i,"components",3],[/alimentation/i,"components",4],[/ventilateur|refroidissement/i,"components",5],[/routeur|wi[ -]?fi|liaison.*(câble|wi)/i,"network",0],[/commutateur|\bswitch\b/i,"network",1],[/modem/i,"network",2],[/ordinateur\s*\(poste\)|\bordinateur( de bureau)?\b|unité centrale/i,"network",3],[/serveur/i,"network",4],[/windows|linux|android|macos|ios|système d.exploitation/i,"software",0],[/writer|\btraitement de texte\b|\bword\b/i,"software",1],[/\bcalc\b|\btableur\b|\bexcel\b/i,"software",2],[/logiciel de présentation|diaporama|diapositive|\bpowerpoint\b/i,"software",3],[/navigateur( web)?/i,"software",4],[/logiciel de dessin|mise en page|retouche/i,"software",5],[/mot de passe/i,"cyber",0],[/mise à jour/i,"cyber",1],[/antivirus|\bvirus\b/i,"cyber",2],[/e-?mail.*suspect|hameçonnage|phishing|courriel suspect/i,"cyber",3],[/lien inconnu|lien suspect|lien dangereux/i,"cyber",4],[/données personnelles|information privée/i,"cyber",5],[/partager.*connexion|partage.*internet/i,"network-scales",0],[/communication rapide|messagerie instantanée/i,"network-scales",1],[/travailler à plusieurs|collaboration en ligne/i,"network-scales",2],[/sauvegarde automatique|sauvegarde sur serveur/i,"network-scales",3],[/accès à distance|accès aux dossiers/i,"network-scales",4],[/partager.*imprimante|imprimante partagée/i,"network-scales",5],[/définir le problème/i,"algorithm-tools",0],[/décomposer en étapes/i,"algorithm-tools",1],[/ordonner les actions/i,"algorithm-tools",2],[/écrire le code|coder/i,"algorithm-tools",3],[/tester et corriger/i,"algorithm-tools",4],[/exécuter et vérifier/i,"algorithm-tools",5],[/donnée|information brute/i,"cs-concepts",0],[/traitement|programme en cours/i,"cs-concepts",1],[/résultat|information utile/i,"cs-concepts",2],[/mémoire de travail|stockage temporaire/i,"cs-concepts",3],[/mémoire de masse|stockage permanent/i,"cs-concepts",4],[/périphérique d.entrée|périphérique de sortie/i,"cs-concepts",5]];function qa(i){let e=Um.find(([s])=>s.test(i));if(!e)return null;let[,t,n]=e;return x("span",{class:`item-art sheet-${t} cell-${n}`,role:"img","aria-label":`Illustration : ${i}`})}var $i=i=>{let e=Fc(i);return x("span",{class:"visual-label"},qa(i),x("span",{class:"visual-text"},i,e?x("small",{class:"ar-sub",lang:"ar",dir:"rtl"},e):null))};function fd(i,e){let t=e.pairs.length,n=fi([...Array(t).keys()]),s=Array(t).fill(null),r=null,a=x("p",{class:"hint-line","aria-live":"polite"}),o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("match-wires"),o.setAttribute("aria-hidden","true");let l=null,c=[],u=[],h=()=>{o.replaceChildren();let m=o.parentElement;if(!m)return;let d=m.getBoundingClientRect();s.forEach((f,b)=>{if(f==null)return;let M=n.indexOf(f);if(M<0)return;let y=c[b].getBoundingClientRect(),w=u[M].getBoundingClientRect(),C=y.right-d.left,L=y.top+y.height/2-d.top,T=w.left-d.left,S=w.top+w.height/2-d.top,_=document.createElementNS("http://www.w3.org/2000/svg","path"),I=Math.max(30,(T-C)*.45);_.setAttribute("d",`M ${C} ${L} C ${C+I} ${L}, ${T-I} ${S}, ${T} ${S}`),_.setAttribute("class","match-wire c"+b%6+(l===b?" new":"")),o.append(_)}),l=null},p=()=>{c.forEach((m,d)=>{let f=s[d];m.classList.toggle("sel",r===d),m.dataset.c=f==null?"":String(d%6),m.querySelector(".tag").textContent=f==null?"":Ga(n.indexOf(f)),m.setAttribute("aria-pressed",String(r===d)),m.setAttribute("aria-label",`${d+1}. ${e.pairs[d][0]}${f==null?"":", associ\xE9 \xE0 la r\xE9ponse "+Ga(n.indexOf(f))}`)}),u.forEach((m,d)=>{let f=s.indexOf(n[d]);m.dataset.c=f<0?"":String(f%6),m.querySelector(".tag").textContent=f<0?"":String(f+1)}),(globalThis.requestAnimationFrame||(m=>m()))(h)};function g(m,d){let f=s.indexOf(d);f>=0&&(s[f]=null),l=m,s[m]=d,r=null,a.textContent="Association r\xE9ussie ! Tu peux v\xE9rifier ton score.",Ne.play("snap"),p()}e.pairs.forEach((m,d)=>{let f=x("button",{type:"button",class:"card pick match-draggable",draggable:"true",ondragstart:b=>{r=d,f.classList.add("dragging"),b.dataTransfer.setData("text/plain",String(d)),p()},ondragend:()=>{f.classList.remove("dragging")},onclick:()=>{r=r===d?null:d,r!=null&&Ne.play("select"),a.textContent=r==null?"":"Clique maintenant sur la bonne r\xE9ponse \xE0 droite (ou glisse-la).",p()}},x("span",{class:"grip-icon","aria-hidden":"true"},"\u283F"),x("span",{class:"num","aria-hidden":"true"},d+1),x("span",{class:"txt"},$i(m[0])),x("span",{class:"tag","aria-hidden":"true"}));c.push(f)}),n.forEach((m,d)=>{let f=x("button",{type:"button",class:"card pick match-droptarget",ondragenter:b=>{b.preventDefault(),f.classList.add("drag-over")},ondragleave:()=>{f.classList.remove("drag-over")},ondragover:b=>b.preventDefault(),ondrop:b=>{b.preventDefault(),f.classList.remove("drag-over");let M=Number(b.dataTransfer.getData("text/plain"));Number.isInteger(M)&&e.pairs[M]&&g(M,m)},onclick:()=>{if(r==null){a.textContent="Clique d\u2019abord sur un \xE9l\xE9ment \xE0 gauche, ou fais-le glisser ici.";return}g(r,m)}},x("span",{class:"num","aria-hidden":"true"},Ga(d)),x("span",{class:"txt"},$i(e.pairs[m][1])),x("span",{class:"tag","aria-hidden":"true"}));u.push(f)});let v=x("div",{class:"match-area"},o,x("div",{class:"two-col"},x("div",{class:"col"},c),x("div",{class:"col"},u)));return i.append(x("div",{class:"match-intro-banner"},x("span",{class:"banner-badge"},"\u{1F517} Cliquer-d\xE9poser ou Glisser-d\xE9poser"),x("span",{class:"banner-ar",lang:"ar",dir:"rtl"},"\u0627\u0646\u0642\u0631 \u0623\u0648 \u0627\u0633\u062D\u0628 \u0645\u0646 \u0627\u0644\u064A\u0633\u0627\u0631 \u0644\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646")),v,a,x("div",{class:"row",style:"margin-top:.8rem"},x("button",{type:"button",class:"btn ghost small",onclick:()=>{s.fill(null),r=null,p(),Ne.play("pop")}},"\u21BA R\xE9initialiser les liaisons"))),p(),{check(){let m=e.pairs.map((d,f)=>{let b=s[f]===f,M=s[f];return{ok:b,msg:b?`${d[0]} \u2192 ${d[1]}`:`${d[0]} correspond \xE0 : ${d[1]}${M==null?" (non associ\xE9)":""}`+(d[2]?" \u2014 "+d[2]:"")}});return{correct:m.filter(d=>d.ok).length,total:t,items:m,unanswered:s.filter(d=>d==null).length}},reveal(m){m.items.forEach((d,f)=>c[f].classList.add(d.ok?"ok":"ko"))},solve(){for(let m=0;m<t;m++)s[m]=m;p()}}}function pd(i,e){let t=e.items,n=Array(t.length).fill(null),s=null,r=null,a=null,o=x("div",{class:"pool sort-pool","aria-label":"Cartes \xE0 classer"}),l=x("p",{class:"hint-line","aria-live":"polite"}),c=e.cats.map((g,v)=>{let m=x("div",{class:"bucket-body"}),d=x("span",{class:"bucket-count"},"0"),f=x("button",{type:"button",class:"bucket-head",onclick:()=>u(v)},x("span",{class:"bucket-title-box"},x("b",null,g),d),x("small",{class:"bucket-cta"},"\u{1F4E5} D\xE9poser ici (\u0636\u0639 \u0647\u0646\u0627)")),b=x("div",{class:"bucket sort-bucket","data-cat":v,ondragenter:M=>{M.preventDefault(),b.classList.add("drag-over")},ondragleave:M=>{b.contains(M.relatedTarget)||b.classList.remove("drag-over")},ondragover:M=>M.preventDefault(),ondrop:M=>{M.preventDefault(),b.classList.remove("drag-over");let y=Number(M.dataTransfer.getData("text/plain"));Number.isInteger(y)&&t[y]&&(n[y]=v,r=y,a=v,s=null,l.textContent="Carte class\xE9e avec succ\xE8s dans : "+g+".",Ne.play("snap"),p())}},f,m);return{box:b,body:m,countBadge:d}});function u(g){if(s==null){l.textContent="S\xE9lectionne d\u2019abord une carte ci-dessus, puis clique ici.";return}n[s]=g,r=s,a=g,s=null,l.textContent="Carte class\xE9e !",Ne.play("snap"),p()}let h=g=>x("button",{type:"button","data-idx":String(g),class:"chip sort-chip"+(qa(t[g][0])?" has-art":"")+(s===g?" sel":"")+(r===g?" just-dropped":""),draggable:"true","aria-pressed":String(s===g),ondragstart:v=>{v.currentTarget.classList.add("dragging"),v.dataTransfer.effectAllowed="move",v.dataTransfer.setData("text/plain",String(g))},ondragend:v=>{v.currentTarget.classList.remove("dragging"),i.querySelectorAll(".bucket").forEach(m=>m.classList.remove("drag-over"))},onclick:()=>{n[g]!=null?(n[g]=null,s=g,Ne.play("pop"),l.textContent="Carte reprise. Tu peux la ranger ailleurs."):(s=s===g?null:g,s!=null&&Ne.play("select"),l.textContent=s==null?"":"Choisis la cat\xE9gorie o\xF9 ranger cette carte."),p()}},x("span",{class:"grip-icon","aria-hidden":"true"},"\u283F"),$i(t[g][0]));function p(){o.replaceChildren(...t.map((g,v)=>v).filter(g=>n[g]==null).map(h)),o.children.length||o.append(x("p",{class:"pool-empty-msg"},"\u2728 Toutes les cartes sont class\xE9es ! Clique sur \xAB V\xE9rifier \xBB.")),c.forEach((g,v)=>{let m=t.map((d,f)=>f).filter(d=>n[d]===v);g.countBadge.textContent=String(m.length),g.box.classList.toggle("drop-pulse",a===v),g.box.classList.toggle("ready-to-drop",s!=null),g.body.replaceChildren(...m.map(h))}),r=null,a=null}return i.append(x("div",{class:"sort-instruction-bar"},x("span",{class:"banner-badge"},"\u{1F5C2}\uFE0F Classement interactif : Glisse ou clique sur une carte puis sur sa cat\xE9gorie"),x("span",{class:"banner-ar",lang:"ar",dir:"rtl"},"\u0627\u0633\u062D\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0623\u0648 \u0627\u0646\u0642\u0631 \u0639\u0644\u064A\u0647\u0627 \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0644\u0647\u0627")),o,x("div",{class:"buckets",style:""},c.map(g=>g.box)),l),p(),{check(){let g=t.map((v,m)=>({ok:n[m]===v[1],msg:`${v[0]} \u2192 ${e.cats[v[1]]}`+(v[2]?" \u2014 "+v[2]:"")+(n[m]==null?" (non class\xE9)":"")}));return{correct:g.filter(v=>v.ok).length,total:t.length,items:g,unanswered:n.filter(v=>v==null).length}},reveal(g){i.querySelectorAll(".bucket .chip").forEach(v=>{let m=v.dataset.idx!=null?Number(v.dataset.idx):-1;m>=0&&g.items[m]&&v.classList.add(g.items[m].ok?"ok":"ko")})},solve(){t.forEach((g,v)=>{n[v]=g[1]}),s=null,p()}}}function md(i,e){let t=e.steps.length,n=e.steps.map((l,c)=>c);(e.eq||[]).forEach((l,c)=>l.forEach(u=>{n[u]=1e3+c}));let s=fi([...Array(t).keys()].map(l=>l));if((e.eq||[]).length){let l=0;for(;s.every((c,u)=>n[c]===n[u])&&l++<20;)s=fi(s)}let r=x("ol",{class:"order"});function a(l){if(r.replaceChildren(...s.map((c,u)=>{let h=x("li",{class:"ord-row order-draggable-row",draggable:"true",ondragstart:p=>{h.classList.add("dragging"),p.dataTransfer.setData("text/plain",String(u))},ondragend:()=>h.classList.remove("dragging"),ondragenter:p=>{p.preventDefault(),h.classList.add("drag-over")},ondragleave:()=>h.classList.remove("drag-over"),ondragover:p=>p.preventDefault(),ondrop:p=>{p.preventDefault(),h.classList.remove("drag-over");let g=Number(p.dataTransfer.getData("text/plain"));if(Number.isInteger(g)&&g!==u){let v=s.splice(g,1)[0];s.splice(u,0,v),Ne.play("move"),a()}}},x("span",{class:"grip-icon","aria-hidden":"true"},"\u283F"),x("span",{class:"num","aria-hidden":"true"},u+1),x("span",{class:"txt"},$i(e.steps[c])),x("span",{class:"ord-btns"},x("button",{type:"button",class:"icon-btn","aria-label":`Monter l\u2019\xE9tape ${u+1}`,disabled:u===0,"data-f":u+":u",onclick:()=>o(u,-1)},"\u25B2"),x("button",{type:"button",class:"icon-btn","aria-label":`Descendre l\u2019\xE9tape ${u+1}`,disabled:u===t-1,"data-f":u+":d",onclick:()=>o(u,1)},"\u25BC")));return h})),l){let c=r.querySelector(`[data-f="${l}"]`)||r.querySelector("button:not([disabled])");c&&c.focus()}}function o(l,c){let u=l+c;[s[l],s[u]]=[s[u],s[l]],Ne.play("move"),a(u+":"+(c<0?"u":"d"))}return i.append(x("div",{class:"sort-instruction-bar"},x("span",{class:"banner-badge"},"\u{1F522} Ordonner les \xE9tapes : Fais glisser les lignes ou utilise \u25B2 et \u25BC"),x("span",{class:"banner-ar",lang:"ar",dir:"rtl"},"\u0631\u062A\u0628 \u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0628\u0627\u0644\u0633\u062D\u0628 \u0623\u0648 \u0628\u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0633\u0647\u0645")),r),a(),{check(){let l=s.map((u,h)=>{let p=n[u]===n[h];return{ok:p,msg:`\xC9tape ${h+1} : ${e.steps[h]}`+(p?"":` (tu avais mis : ${e.steps[u]})`)}});return e.explain&&l.push({ok:!0,info:!0,msg:e.explain}),{correct:l.filter(u=>!u.info).filter(u=>u.ok).length,total:t,items:l,unanswered:0}},reveal(l){[...r.children].forEach((c,u)=>c.classList.add(l.items[u].ok?"ok":"ko"))},solve(){s=[...Array(t).keys()],a()}}}function gd(i,e){let t=[];return e.lines.map(s=>Array.isArray(s)?s:[s,""]).forEach(([s,r])=>{let a=x("p",{class:"fill-line"}),o=/\[\[(.+?)\]\]/g,l=0,c;for(;c=o.exec(s);){a.append(s.slice(l,c.index));let u=c[1].split("|"),h=t.length,p=x("select",{"aria-label":`R\xE9ponse ${h+1}`,onchange:()=>Ne.play("click")},x("option",{value:""},"\u2014 choisir \u2014"),fi(u).map(v=>x("option",{value:v},v))),g=x("span",{class:"fb"});a.append(p,g),t.push({sel:p,fb:g,ans:u[0],why:r,text:s.replace(/\[\[(.+?)\]\]/g,(v,m)=>m.split("|")[0])}),l=c.index+c[0].length}a.append(s.slice(l)),i.append(a)}),{check(){let s=t.map(r=>({ok:r.sel.value===r.ans,msg:`${r.text}`+(r.why?" \u2014 "+r.why:"")}));return{correct:s.filter(r=>r.ok).length,total:t.length,items:s,unanswered:t.filter(r=>!r.sel.value).length}},reveal(s){t.forEach((r,a)=>{let o=s.items[a].ok;r.sel.classList.add(o?"ok":"ko"),r.fb.textContent=o?" \u2714":" \u2716 \u2192 "+r.ans})},solve(){t.forEach(s=>{s.sel.value=s.ans})}}}var Nm=0;function xd(i,e){let t=e.qs.map((n,s)=>{let[r,a,o]=n,l=r.split(`
`),c="q"+ ++Nm,u=fi(a.map((f,b)=>b)),h=a.length===2&&a.some(f=>/vrai|صحيح/i.test(f))&&a.some(f=>/faux|خطأ/i.test(f)),p=/fausse|faux|intrus|erreur|mauvaise|n'est pas|ne doit pas|interdit/i.test(r),g=null;h?g=x("span",{class:"q-mode-badge tf"},"\u2696\uFE0F VRAI OU FAUX \xB7 \u0635\u062D\u064A\u062D \u0623\u0645 \u062E\u0637\u0623"):p?g=x("span",{class:"q-mode-badge false-mode"},"\u{1F6A8} Trouver la r\xE9ponse fausse / l\u2019intrus \xB7 \u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u062E\u0627\u0637\u0626\u0629"):g=x("span",{class:"q-mode-badge good-mode"},"\u{1F3AF} Trouver la bonne r\xE9ponse \xB7 \u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629");let v=u.map(f=>x("input",{type:"radio",name:c,value:String(f),onchange:()=>Ne.play("click")})),m=u.map((f,b)=>{let M=a[f],y=/vrai|صحيح/i.test(M),w=/faux|خطأ/i.test(M);return x("label",{class:"opt quiz-card"+(h?y?" tf-vrai":w?" tf-faux":"":""),onclick:()=>{v[b].checked=!0,Ne.play("click")}},v[b],x("span",{class:"opt-letter","aria-hidden":"true"},h?y?"\u2714":"\u2716":Ga(b)),$i(M))}),d=Fc(l[0]);return i.append(x("fieldset",{class:"q quiz-fieldset"+(h?" is-tf":p?" is-find-false":"")},x("legend",null,x("span",{class:"q-num"},s+1),g,x("span",{class:"q-title-text"},l[0]),d?x("small",{class:"ar-sub",lang:"ar",dir:"rtl"},d):null),l.length>1?x("pre",{class:"code"},l.slice(1).join(`
`)):null,x("div",{class:"quiz-options-grid"+(h?" tf-grid":"")},m))),{inputs:v,labels:m,order:u,opts:a,why:o,text:l[0]}});return{check(){let n=t.map(s=>{let r=s.inputs.find(o=>o.checked);return{ok:!!r&&r.value==="0",msg:`${s.text} \u2192 ${s.opts[0]}.`+(s.why?" "+s.why:"")}});return{correct:n.filter(s=>s.ok).length,total:t.length,items:n,unanswered:t.filter(s=>!s.inputs.some(r=>r.checked)).length}},reveal(n){t.forEach(s=>{s.labels.forEach((r,a)=>{s.order[a]===0?r.classList.add("good"):s.inputs[a].checked&&r.classList.add("bad")})})},solve(){t.forEach(n=>{n.inputs[n.order.indexOf(0)].checked=!0})}}}var De=(i,e,t,n,s,r,a,o)=>["r",i,e,t,n,s,r,a,o],qt=(i,e,t,n,s,r)=>["l",i,e,t,n,s,r||"ln"],Wa=(i,e,t,n,s,r,a)=>["c",i,e,t,n,s,r,a],Fm=(i,e,t,n,s)=>["t",i,e,t,n||14,s||""];var ot=(i,e)=>["raw",i,e],vd=i=>["defs",i],zc=(i,e,t,n,s)=>{let r=u=>[i+t*Math.cos(u),e+t*Math.sin(u)],[a,o]=r(n),[l,c]=r(s);return`M${i} ${e} L${a.toFixed(1)} ${o.toFixed(1)} A${t} ${t} 0 ${s-n>Math.PI?1:0} 1 ${l.toFixed(1)} ${c.toFixed(1)} Z`},yd={desktop:{w:600,h:360,alt:"V\xE9ritable bureau d\u2019ordinateur avec fond d\u2019\xE9cran, ic\xF4nes, corbeille, fen\xEAtre ouverte et barre des t\xE2ches compl\xE8te",shapes:[vd(`
        <linearGradient id="d-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0a192f"/>
          <stop offset="40%" stop-color="#1e3a8a"/>
          <stop offset="75%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <radialGradient id="d-bloom" cx="65%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="d-bloom2" cx="35%" cy="30%" r="45%">
          <stop offset="0%" stop-color="#c084fc" stop-opacity="0.5"/>
          <stop offset="70%" stop-color="#7c3aed" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0"/>
        </radialGradient>
        <filter id="d-shadow" x="-5%" y="-5%" width="115%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.4"/>
        </filter>
        <filter id="icon-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
        </filter>
      `),ot("desk",`
        <rect x="0" y="0" width="600" height="320" fill="url(#d-bg)"/>
        <rect x="0" y="0" width="600" height="320" fill="url(#d-bloom)"/>
        <rect x="0" y="0" width="600" height="320" fill="url(#d-bloom2)"/>
        <!-- Ondulations graphiques de fond d'\xE9cran moderne -->
        <path d="M0,180 Q150,80 300,160 T600,120 L600,320 L0,320 Z" fill="rgba(255,255,255,0.06)"/>
        <path d="M0,220 Q200,120 400,200 T600,160 L600,320 L0,320 Z" fill="rgba(37,99,235,0.15)"/>
      `),ot("icon",`
        <g filter="url(#icon-sh)">
          <!-- Ce PC -->
          <g transform="translate(18, 16)">
            <rect x="2" y="2" width="28" height="20" rx="3" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>
            <rect x="6" y="5" width="20" height="13" rx="1" fill="#1e293b"/>
            <rect x="13" y="22" width="6" height="4" fill="#94a3b8"/>
            <rect x="8" y="26" width="16" height="2" rx="1" fill="#cbd5e1"/>
            <text x="16" y="38" font-size="9" fill="#fff" font-weight="700" text-anchor="middle">Ce PC</text>
          </g>
          <!-- Dossier Documents -->
          <g transform="translate(18, 70)">
            <path d="M4,4 L12,4 L16,8 L28,8 L28,26 L4,26 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
            <rect x="7" y="10" width="18" height="13" rx="1" fill="#fbbf24"/>
            <text x="16" y="38" font-size="9" fill="#fff" font-weight="700" text-anchor="middle">Documents</text>
          </g>
          <!-- Raccourci Navigateur Web -->
          <g transform="translate(18, 126)">
            <circle cx="16" cy="15" r="13" fill="#fff"/>
            <circle cx="16" cy="15" r="11" fill="#0284c7"/>
            <circle cx="16" cy="15" r="5" fill="#f8fafc"/>
            <text x="16" y="38" font-size="9" fill="#fff" font-weight="700" text-anchor="middle">Internet</text>
          </g>
          <!-- InfoPlay Raccourci -->
          <g transform="translate(18, 182)">
            <rect x="2" y="3" width="28" height="24" rx="6" fill="#6366f1" stroke="#fff" stroke-width="1.2"/>
            <text x="16" y="20" font-size="14" text-anchor="middle">\u{1F3AE}</text>
            <text x="16" y="38" font-size="9" fill="#fef08a" font-weight="700" text-anchor="middle">InfoPlay</text>
          </g>
        </g>
      `),ot("bin",`
        <g transform="translate(528, 240)" filter="url(#icon-sh)">
          <rect x="-6" y="-6" width="56" height="66" rx="8" fill="rgba(255,255,255,0.08)"/>
          <!-- R\xE9cipient corbeille 3D avec papiers -->
          <path d="M8,14 L32,14 L29,42 L11,42 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
          <ellipse cx="20" cy="14" rx="12" ry="3" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
          <!-- Papiers froiss\xE9s qui d\xE9bordent -->
          <path d="M14,12 L19,5 L23,13 L17,14 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          <path d="M22,11 L27,7 L28,14 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
          <!-- Symbole recyclage -->
          <text x="20" y="32" font-size="14" text-anchor="middle" fill="#1e293b" opacity="0.75">\u267B</text>
          <text x="20" y="52" font-size="9" fill="#ffffff" font-weight="700" text-anchor="middle">Corbeille</text>
        </g>
      `),ot("win",`
        <g transform="translate(130, 36)" filter="url(#d-shadow)">
          <!-- Cadre ext\xE9rieur fen\xEAtre -->
          <rect x="0" y="0" width="340" height="216" rx="8" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>
          <!-- Barre de titre moderne -->
          <path d="M0,8 Q0,0 8,0 L332,0 Q340,0 340,8 L340,32 L0,32 Z" fill="#1e293b"/>
          <!-- Ic\xF4ne dossier & Titre -->
          <text x="12" y="21" font-size="14">\u{1F4C1}</text>
          <text x="32" y="20" font-size="12" fill="#f8fafc" font-family="Nunito,sans-serif" font-weight="700">Explorateur \u2014 Mes Documents</text>
          <!-- Boutons R\xE9duire, Agrandir, Fermer -->
          <rect x="252" y="6" width="24" height="20" rx="3" fill="rgba(255,255,255,0.1)"/>
          <text x="264" y="19" font-size="12" fill="#e2e8f0" text-anchor="middle" font-weight="800">\u2014</text>
          <rect x="280" y="6" width="24" height="20" rx="3" fill="rgba(255,255,255,0.1)"/>
          <text x="292" y="19" font-size="12" fill="#e2e8f0" text-anchor="middle">\u25A2</text>
          <rect x="308" y="6" width="26" height="20" rx="3" fill="#dc2626"/>
          <text x="321" y="20" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="800">\u2715</text>
          <!-- Barre d'outils / chemin d'acc\xE8s -->
          <rect x="0" y="32" width="340" height="28" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
          <text x="10" y="50" font-size="12" fill="#64748b">\u25C0  \u25B6  \u2191</text>
          <rect x="62" y="36" width="190" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="70" y="50" font-size="10.5" fill="#334155">\u{1F4C1} Ce PC &gt; Documents &gt; Devoirs</text>
          <rect x="258" y="36" width="74" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="264" y="50" font-size="10" fill="#94a3b8">\u{1F50D} Chercher</text>
          <!-- Volet lat\xE9ral gauche -->
          <rect x="0" y="60" width="85" height="156" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="10" y="80" font-size="9.5" fill="#64748b" font-weight="700">Acc\xE8s rapide</text>
          <text x="12" y="100" font-size="10" fill="#334155">\u{1F5A5} Bureau</text>
          <text x="12" y="122" font-size="10" fill="#2563eb" font-weight="700">\u{1F4C1} Documents</text>
          <text x="12" y="144" font-size="10" fill="#334155">\u2B07 T\xE9l\xE9charg.</text>
          <text x="12" y="166" font-size="10" fill="#334155">\u{1F5BC} Images</text>
          <!-- Zone de contenu / fichiers -->
          <!-- Fichier 1 : Devoir.docx -->
          <g transform="translate(100, 75)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#2563eb"/>
            <text x="18" y="24" font-size="15" fill="#fff" font-weight="800" text-anchor="middle">W</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Devoir.docx</text>
          </g>
          <!-- Fichier 2 : Tableau.xlsx -->
          <g transform="translate(175, 75)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#16a34a"/>
            <text x="18" y="24" font-size="15" fill="#fff" font-weight="800" text-anchor="middle">X</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Notes.xlsx</text>
          </g>
          <!-- Fichier 3 : Photo.jpg -->
          <g transform="translate(250, 75)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#ea580c"/>
            <text x="18" y="24" font-size="15" fill="#fff" text-anchor="middle">\u{1F5BC}</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Photo.jpg</text>
          </g>
          <!-- Fichier 4 : Projet.py -->
          <g transform="translate(100, 140)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#4f46e5"/>
            <text x="18" y="24" font-size="14" fill="#fff" text-anchor="middle">&lt;/&gt;</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Robot.py</text>
          </g>
          <!-- Barre d'\xE9tat fen\xEAtre -->
          <rect x="85" y="196" width="255" height="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="95" y="210" font-size="9" fill="#64748b">4 \xE9l\xE9ments  \xB7  1 \xE9l\xE9ment s\xE9lectionn\xE9 (24 Ko)</text>
        </g>
      `),ot("taskbar",`
        <rect x="0" y="320" width="600" height="40" fill="#0f172a" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <!-- Barre de recherche -->
        <rect x="58" y="326" width="130" height="28" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <text x="70" y="344" font-size="12" fill="#94a3b8">\u{1F50D}</text>
        <text x="88" y="344" font-size="11" fill="#cbd5e1" font-family="Nunito,sans-serif">Rechercher...</text>
        <!-- Ic\xF4nes d'applications \xE9pingl\xE9es -->
        <!-- Explorateur actif avec barre bleue sous l'ic\xF4ne -->
        <g transform="translate(200, 324)">
          <rect x="2" y="2" width="28" height="28" rx="5" fill="rgba(255,255,255,0.15)"/>
          <text x="16" y="21" font-size="16" text-anchor="middle">\u{1F4C1}</text>
          <rect x="8" y="31" width="16" height="3" rx="1.5" fill="#38bdf8"/>
        </g>
        <!-- Navigateur Edge / Chrome -->
        <g transform="translate(236, 324)">
          <text x="16" y="22" font-size="17" text-anchor="middle">\u{1F310}</text>
        </g>
        <!-- Traitement de texte Word -->
        <g transform="translate(270, 324)">
          <rect x="4" y="4" width="22" height="24" rx="3" fill="#2563eb"/>
          <text x="15" y="21" font-size="14" fill="#fff" font-weight="800" text-anchor="middle">W</text>
        </g>
        <!-- Param\xE8tres -->
        <g transform="translate(304, 324)">
          <text x="15" y="22" font-size="16" text-anchor="middle">\u2699\uFE0F</text>
        </g>
      `),ot("start",`
        <g transform="translate(8, 324)">
          <rect x="0" y="0" width="44" height="32" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
          <!-- Logo 4 carr\xE9s bleu vif -->
          <g transform="translate(14, 8)">
            <rect x="0" y="0" width="7" height="7" rx="1" fill="#38bdf8"/>
            <rect x="9" y="0" width="7" height="7" rx="1" fill="#38bdf8"/>
            <rect x="0" y="9" width="7" height="7" rx="1" fill="#38bdf8"/>
            <rect x="9" y="9" width="7" height="7" rx="1" fill="#38bdf8"/>
          </g>
        </g>
      `),ot("tray",`
        <g transform="translate(460, 323)">
          <rect x="0" y="0" width="134" height="34" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <!-- Chevron -->
          <text x="10" y="22" font-size="11" fill="#94a3b8">^</text>
          <!-- Wi-Fi -->
          <text x="24" y="22" font-size="13" fill="#38bdf8">\u{1F4F6}</text>
          <!-- Haut-parleur son -->
          <text x="44" y="22" font-size="13" fill="#f8fafc">\u{1F50A}</text>
          <!-- Batterie -->
          <text x="63" y="22" font-size="12" fill="#4ade80">\u{1F50B}</text>
          <!-- Horloge num\xE9rique et date -->
          <text x="96" y="16" font-size="11" fill="#ffffff" font-weight="800" font-family="Consolas,monospace">14:30</text>
          <text x="83" y="28" font-size="8.5" fill="#94a3b8" font-family="sans-serif">07/11/2026</text>
        </g>
      `)],desc:{desk:"Fond du bureau (papier peint et surface de travail)",icon:"Ic\xF4nes du bureau (raccourcis Ce PC, Documents, Navigateur)",bin:"Corbeille (r\xE9cipient pour r\xE9cup\xE9rer ou supprimer d\xE9finitivement les fichiers)",win:"Fen\xEAtre active (Explorateur de fichiers affichant le contenu du dossier)",taskbar:"Barre des t\xE2ches (longue barre inf\xE9rieure contenant les programmes ouverts)",start:"Bouton D\xE9marrer (ic\xF4ne Windows \u229E en bas \xE0 gauche pour ouvrir le menu)",tray:"Zone de notification (affiche l\u2019horloge 14:30, le volume sonore et le Wi-Fi)"}},pc:{w:600,h:360,alt:"Vue int\xE9rieure r\xE9aliste d\u2019une tour d\u2019ordinateur ouverte : carte m\xE8re, processeur, ventilateur, barrettes de RAM, SSD et bloc d\u2019alimentation",shapes:[vd(`
        <linearGradient id="mobo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#022c22"/>
        </linearGradient>
        <linearGradient id="psu-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      `),De(null,10,10,580,340,"c9"),ot("mobo",`
        <rect x="30" y="24" width="390" height="312" rx="8" fill="url(#mobo-grad)" stroke="#10b981" stroke-width="2"/>
        <!-- Pistes de circuit imprim\xE9 dor\xE9es -->
        <path d="M50,40 L180,40 L180,90 M80,260 L80,180 L180,180 M280,220 L350,220 L350,300" stroke="#f59e0b" stroke-width="1.2" fill="none" opacity="0.6"/>
        <text x="45" y="50" font-size="11" fill="#6ee7b7" font-weight="800">CARTE M\xC8RE (Motherboard)</text>
      `),ot("cpu",`
        <g transform="translate(170, 95)">
          <rect x="0" y="0" width="80" height="80" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
          <rect x="8" y="8" width="64" height="64" rx="4" fill="#334155"/>
          <text x="40" y="38" font-size="11" fill="#38bdf8" font-weight="800" text-anchor="middle">CPU</text>
          <text x="40" y="52" font-size="9" fill="#f8fafc" text-anchor="middle">Intel / AMD</text>
          <text x="40" y="65" font-size="8" fill="#94a3b8" text-anchor="middle">Processeur</text>
        </g>
      `),ot("fan",`
        <g transform="translate(210, 58)">
          <circle cx="0" cy="0" r="32" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <path d="M-22,-8 Q0,0 -8,-22 M8,-22 Q0,0 22,-8 M22,8 Q0,0 8,22 M-8,22 Q0,0 -22,8" stroke="#94a3b8" stroke-width="4" fill="none"/>
          <circle cx="0" cy="0" r="10" fill="#38bdf8"/>
          <text x="0" y="4" font-size="10" fill="#0f172a" font-weight="800" text-anchor="middle">\u2744</text>
        </g>
      `),ot("ram",`
        <g transform="translate(280, 50)">
          <!-- Slot 1 -->
          <rect x="0" y="0" width="16" height="140" rx="3" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5"/>
          <rect x="2" y="10" width="12" height="120" rx="2" fill="#1d4ed8"/>
          <!-- Slot 2 -->
          <rect x="22" y="0" width="16" height="140" rx="3" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5"/>
          <rect x="24" y="10" width="12" height="120" rx="2" fill="#1d4ed8"/>
          <!-- Slot 3 -->
          <rect x="44" y="0" width="16" height="140" rx="3" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5"/>
          <rect x="46" y="10" width="12" height="120" rx="2" fill="#1d4ed8"/>
          <text x="30" y="156" font-size="10" fill="#60a5fa" font-weight="800" text-anchor="middle">RAM (M\xE9moire vive)</text>
        </g>
      `),ot("ssd",`
        <g transform="translate(440, 50)">
          <rect x="0" y="0" width="128" height="42" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
          <rect x="10" y="8" width="24" height="26" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
          <rect x="42" y="8" width="24" height="26" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
          <rect x="74" y="8" width="24" height="26" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
          <text x="112" y="26" font-size="9" fill="#c084fc" font-weight="800">SSD</text>
          <text x="64" y="54" font-size="10" fill="#c084fc" font-weight="700" text-anchor="middle">Stockage SSD NVMe</text>
        </g>
      `),ot("psu",`
        <g transform="translate(440, 220)">
          <rect x="0" y="0" width="130" height="106" rx="8" fill="url(#psu-grad)" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="65" cy="46" r="32" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <!-- Grille alim -->
          <path d="M45,46 L85,46 M65,26 L65,66 M51,32 L79,60 M51,60 L79,32" stroke="#64748b" stroke-width="2"/>
          <text x="65" y="94" font-size="11" fill="#f59e0b" font-weight="800" text-anchor="middle">\u26A1 ALIMENTATION (PSU)</text>
        </g>
      `)],desc:{mobo:"Grande plaque verte du fond (carte m\xE8re), sur laquelle tout se branche",cpu:"Processeur central (CPU), le cerveau qui effectue tous les calculs",fan:"Ventilateur de refroidissement situ\xE9 juste au-dessus du processeur",ram:"Barrettes bleues de m\xE9moire vive (RAM) pour le stockage temporaire",ssd:"Disque SSD de stockage rapide pour conserver le syst\xE8me et les fichiers",psu:"Bloc d\u2019alimentation jaune en bas \xE0 droite fournissant le courant \xE9lectrique"}},word:{w:600,h:360,alt:"Fen\xEAtre compl\xE8te de traitement de texte avec barre de titre, onglets, ruban d\u2019outils, r\xE8gle, feuille blanche et barre d\u2019\xE9tat",shapes:[ot("title",`
        <rect x="0" y="0" width="600" height="28" fill="#1d4ed8"/>
        <text x="12" y="19" font-size="13" fill="#fff" font-weight="700">\u{1F4C4} Document1 \u2014 Traitement de texte</text>
        <text x="540" y="19" font-size="13" fill="#fff">\u2014  \u25A2  \u2715</text>
      `),ot("tabs",`
        <rect x="0" y="28" width="600" height="26" fill="#2563eb"/>
        <text x="16" y="45" font-size="12" fill="#ffffff" font-weight="700">Fichier   Accueil   Insertion   Mise en page   Affichage</text>
      `),ot("ribbon",`
        <rect x="0" y="54" width="600" height="56" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <!-- Outils police -->
        <rect x="12" y="62" width="70" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="18" y="78" font-size="11" fill="#1e293b">Calibri \u25BE</text>
        <rect x="88" y="62" width="40" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="96" y="78" font-size="11" fill="#1e293b">12 \u25BE</text>
        <!-- Boutons format -->
        <rect x="134" y="62" width="24" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="141" y="78" font-size="12" font-weight="900" fill="#1e293b">G</text>
        <rect x="162" y="62" width="24" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="170" y="78" font-size="12" font-style="italic" font-weight="700" fill="#1e293b">I</text>
        <rect x="190" y="62" width="24" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="198" y="78" font-size="12" text-decoration="underline" font-weight="700" fill="#1e293b">S</text>
        <!-- Alignements -->
        <text x="226" y="78" font-size="16">\u2261  \u2637  \u{1F5BC}  \u25A6  \u{1F3A8}</text>
      `),ot("ruler",`
        <rect x="0" y="110" width="600" height="16" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
        <text x="120" y="122" font-size="9" fill="#64748b" font-family="monospace">|\xB7\xB7\xB71\xB7\xB7\xB7|\xB7\xB7\xB72\xB7\xB7\xB7|\xB7\xB7\xB73\xB7\xB7\xB7|\xB7\xB7\xB74\xB7\xB7\xB7|\xB7\xB7\xB75\xB7\xB7\xB7|\xB7\xB7\xB76\xB7\xB7\xB7|\xB7\xB7\xB77\xB7\xB7\xB7|\xB7\xB7\xB78\xB7\xB7\xB7|</text>
      `),ot("page",`
        <g transform="translate(110, 132)">
          <rect x="0" y="0" width="380" height="200" rx="2" fill="#ffffff" stroke="#94a3b8" stroke-width="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
          <!-- Lignes de texte simul\xE9es -->
          <rect x="25" y="25" width="240" height="12" fill="#1e3a8a" rx="2"/>
          <line x1="25" y1="55" x2="355" y2="55" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="25" y1="75" x2="330" y2="75" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="25" y1="95" x2="345" y2="95" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="25" y1="115" x2="280" y2="115" stroke="#cbd5e1" stroke-width="2"/>
        </g>
      `),ot("status",`
        <rect x="0" y="338" width="600" height="22" fill="#1d4ed8"/>
        <text x="14" y="353" font-size="11" fill="#ffffff">Page 1 sur 1     Mots : 142     Fran\xE7ais (Maroc)     100 %</text>
      `)],desc:{title:"Bande bleue tout en haut avec le nom du document et les boutons de contr\xF4le",tabs:"Deuxi\xE8me bande sup\xE9rieure avec les onglets (Fichier, Accueil, Insertion...)",ribbon:"Large bandeau d\u2019outils contenant les polices, tailles et styles de texte",ruler:"Fine r\xE8gle gradu\xE9e horizontale sous le ruban pour mesurer les marges",page:"Grande feuille blanche A4 au centre o\xF9 l\u2019on r\xE9dige le document",status:"Fine bande bleue tout en bas affichant le nombre de pages et de mots"}},toolbar:{w:600,h:120,alt:"Barre d\u2019outils d\xE9taill\xE9e de mise en forme du texte avec polices, gras, italique, alignements",shapes:[De(null,0,0,600,120,"c8"),De("font",14,30,130,36,"c0","Arial \u25BE",14),De("size",152,30,56,36,"c0","14 \u25BE",14),De("bold",224,30,36,36,"c5","G",18),De("italic",266,30,36,36,"c5","I",18),De("underline",308,30,36,36,"c5","S",18),De("color",358,30,44,36,"c4","A",20),De("alignL",420,30,36,36,"c6"),qt("alignL",428,40,448,40),qt("alignL",428,48,440,48),qt("alignL",428,56,448,56),De("alignC",462,30,36,36,"c6"),qt("alignC",470,40,490,40),qt("alignC",474,48,486,48),qt("alignC",470,56,490,56),De("alignR",504,30,36,36,"c6"),qt("alignR",512,40,532,40),qt("alignR",520,48,532,48),qt("alignR",512,56,532,56)],desc:{font:"Menu d\xE9roulant pour choisir la police de caract\xE8res",size:"Menu pour modifier la taille du texte (en points)",bold:"Bouton Gras (lettre G) pour \xE9paissir le texte",italic:"Bouton Italique (lettre I) pour incliner le texte",underline:"Bouton Soulign\xE9 (lettre S) pour souligner les mots",color:"Bouton Couleur de police (lettre A avec barre color\xE9e)",alignL:"Bouton Aligner \xE0 gauche (traits align\xE9s \xE0 gauche)",alignC:"Bouton Centrer (traits centr\xE9s au milieu)",alignR:"Bouton Aligner \xE0 droite (traits align\xE9s \xE0 droite)"}},printdlg:{w:600,h:360,alt:"Bo\xEEte de dialogue compl\xE8te d\u2019impression avec s\xE9lection de l\u2019imprimante, nombre de copies, format et aper\xE7u",shapes:[De(null,50,10,500,340,"c0"),De(null,50,10,500,32,"c3","\u{1F5A8} Imprimer le document",14),De("printer",70,54,460,32,"c8","Imprimante : HP-LaserJet-Salle-Informatique",13),De("range",70,96,220,36,"c8","Pages : Toutes",14),De("copies",310,96,220,36,"c8","Nombre de copies : 1",14),De("orient",70,142,220,32,"c8","Orientation : Portrait",13),De("paper",310,142,220,32,"c8","Format papier : A4 (21 x 29,7 cm)",13),De("preview",70,186,220,150,"c2"),De(null,120,200,120,122,"c0"),De("printbtn",350,290,180,44,"c5","\u2714 Lancer l\u2019impression",15)],desc:{printer:"Menu sup\xE9rieur pour s\xE9lectionner l\u2019imprimante de destination",range:"Option d\u2019\xE9tendue des pages (Toutes, Page actuelle ou s\xE9lection)",copies:"Champ pour r\xE9gler le nombre de copies \xE0 imprimer",orient:"R\xE9glage de l\u2019orientation de la page (Portrait ou Paysage)",paper:"Choix du format de papier (A4, A3, Lettre...)",preview:"Cadre d\u2019aper\xE7u avant impression affichant la feuille simul\xE9e",printbtn:"Bouton principal bleu en bas \xE0 droite pour valider et imprimer"}},sheet:{w:600,h:360,alt:"Fen\xEAtre de tableur avec zone d\u2019adresse, barre de formule, en-t\xEAtes colonnes A-E et lignes 1-7",shapes:[ot("namebox",`
        <rect x="0" y="0" width="75" height="28" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="37" y="19" font-size="13" fill="#16a34a" font-weight="800" text-anchor="middle">B3</text>
      `),ot("fbar",`
        <rect x="80" y="0" width="520" height="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="92" y="19" font-size="12" fill="#16a34a" font-weight="700">fx</text>
        <line x1="110" y1="4" x2="110" y2="24" stroke="#cbd5e1"/>
        <text x="120" y="19" font-size="12" fill="#1e293b" font-family="Consolas,monospace">=SOMME(B2:B6)</text>
      `),ot("colhead",`
        <g transform="translate(0, 32)">
          <rect x="70" y="0" width="530" height="24" fill="#dcfce7" stroke="#86efac"/>
          <text x="123" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">A</text>
          <text x="229" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">B</text>
          <text x="335" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">C</text>
          <text x="441" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">D</text>
          <text x="547" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">E</text>
        </g>
      `),ot("rowhead",`
        <g transform="translate(0, 56)">
          ${[1,2,3,4,5,6,7].map((i,e)=>`
            <rect x="0" y="${e*38}" width="70" height="38" fill="#dcfce7" stroke="#86efac"/>
            <text x="35" y="${e*38+24}" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">${i}</text>
          `).join("")}
        </g>
      `),ot("cell",`
        <g transform="translate(70, 56)">
          ${[0,1,2,3,4,5,6].map(i=>[0,1,2,3,4].map(e=>`
            <rect x="${e*106}" y="${i*38}" width="106" height="38" fill="${e===1&&i===2?"#fef3c7":"#ffffff"}" stroke="${e===1&&i===2?"#f59e0b":"#e2e8f0"}" stroke-width="${e===1&&i===2?2.5:1}"/>
          `).join("")).join("")}
          <text x="159" y="100" font-size="12" fill="#b45309" font-weight="800" text-anchor="middle">14.5</text>
        </g>
      `),ot("tabs",`
        <rect x="0" y="336" width="320" height="24" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="14" y="352" font-size="11" fill="#16a34a" font-weight="700">Feuille1    Feuille2    + Nouvelle</text>
      `)],desc:{namebox:"Zone d\u2019adresse (en haut \xE0 gauche) affichant la r\xE9f\xE9rence de la cellule active (B3)",fbar:"Barre de formule (longue case sup\xE9rieure) pour saisir du texte ou une formule de calcul",colhead:"En-t\xEAtes de colonnes d\xE9sign\xE9es par des lettres majuscules (A, B, C, D, E)",rowhead:"En-t\xEAtes de lignes identifi\xE9es par des num\xE9ros (1, 2, 3, 4, 5, 6, 7)",cell:"Cellule individuelle du quadrillage \xE0 l\u2019intersection d\u2019une colonne et d\u2019une ligne",tabs:"Onglets de classeur situ\xE9s en bas \xE0 gauche pour naviguer entre les feuilles"}},charts:{w:600,h:360,alt:"Trois types de graphiques statistiques : histogramme \xE0 barres color\xE9es, courbe d\u2019\xE9volution et diagramme en secteurs",shapes:[De(null,8,8,584,344,"c0"),ot("bar",`
        <g transform="translate(30, 160)">
          <rect x="0" y="90" width="28" height="50" rx="3" fill="#3b82f6"/>
          <rect x="36" y="30" width="28" height="110" rx="3" fill="#10b981"/>
          <rect x="72" y="60" width="28" height="80" rx="3" fill="#f59e0b"/>
          <rect x="108" y="0" width="28" height="140" rx="3" fill="#8b5cf6"/>
        </g>
      `),qt("axis",22,300,180,300,"ln"),qt(null,22,300,22,140,"ln"),De("legend",40,316,130,24,"c8","\u25A0 Donn\xE9es 1",13),ot("line",`
        <g>
          <polyline points="230,260 275,190 320,230 365,150" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
          <circle cx="230" cy="260" r="5" fill="#b91c1c"/>
          <circle cx="275" cy="190" r="5" fill="#b91c1c"/>
          <circle cx="320" cy="230" r="5" fill="#b91c1c"/>
          <circle cx="365" cy="150" r="5" fill="#b91c1c"/>
        </g>
      `),qt(null,215,300,390,300,"ln"),ot("pie",`
        <g transform="translate(0, 0)">
          <path d="${zc(490,190,75,0,2.2)}" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
          <path d="${zc(490,190,75,2.2,4.2)}" fill="#10b981" stroke="#fff" stroke-width="2"/>
          <path d="${zc(490,190,75,4.2,2*Math.PI)}" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
        </g>
      `)],desc:{bar:"Histogramme en colonnes/barres verticales pour comparer des grandeurs",axis:"Axe horizontal et vertical servant de rep\xE8re pour les valeurs",legend:"L\xE9gende explicative d\xE9crivant les s\xE9ries de donn\xE9es repr\xE9sent\xE9es",line:"Graphique en courbe reliant des points pour montrer une \xE9volution dans le temps",pie:"Diagramme circulaire en secteurs (camembert) montrant la r\xE9partition d\u2019un tout"}},lan:{w:600,h:360,alt:"Topologie d\u2019un r\xE9seau local en \xE9toile avec commutateur switch central, postes clients, serveur et imprimante partag\xE9e",shapes:[qt("link",300,180,110,70),qt("link",300,180,110,290),qt("link",300,180,490,70),qt("link",300,180,490,290),qt("link",300,180,300,40),qt("link",300,180,300,320),ot("switch",`
        <g transform="translate(230, 155)">
          <rect x="0" y="0" width="140" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <!-- Voyants verts clignotants du commutateur -->
          <circle cx="20" cy="16" r="3" fill="#22c55e"/>
          <circle cx="34" cy="16" r="3" fill="#22c55e"/>
          <circle cx="48" cy="16" r="3" fill="#22c55e"/>
          <circle cx="62" cy="16" r="3" fill="#22c55e"/>
          <circle cx="76" cy="16" r="3" fill="#22c55e"/>
          <circle cx="90" cy="16" r="3" fill="#22c55e"/>
          <text x="70" y="38" font-size="11" fill="#f8fafc" font-weight="800" text-anchor="middle">COMMUTATEUR (Switch)</text>
        </g>
      `),De("pc",70,40,80,60,"c8","\u{1F5A5} Poste 1",12),De("pc",70,260,80,60,"c8","\u{1F5A5} Poste 2",12),De("pc",450,40,80,60,"c8","\u{1F5A5} Poste 3",12),De("printer",450,260,80,60,"c7","\u{1F5A8} Imprimante",11),De("server",255,4,90,46,"c2","\u25A6 SERVEUR",12),De("pc",260,300,80,50,"c8","\u{1F5A5} Poste 4",12)],desc:{switch:"Commutateur central (Switch) o\xF9 convergent tous les c\xE2bles r\xE9seau RJ45",pc:"Ordinateur de travail connect\xE9 au r\xE9seau local pour partager des ressources",printer:"Imprimante r\xE9seau partag\xE9e accessible par tous les ordinateurs du LAN",server:"Serveur central h\xE9bergeant les donn\xE9es et services partag\xE9s de l\u2019\xE9tablissement",link:"C\xE2ble r\xE9seau Ethernet reliant chaque appareil directement au commutateur"}},router:{w:600,h:360,alt:"Panneau arri\xE8re r\xE9aliste d\u2019un routeur Wi-Fi avec antennes, port WAN Internet jaune, ports LAN bleus et boutons",shapes:[De("wifi",80,20,20,100,"c6"),De("wifi",500,20,20,100,"c6"),De(null,40,110,520,190,"c9"),De("wan",70,220,60,50,"c4","WAN",12),De("lan",150,220,46,50,"c5","LAN 1",10),De("lan",202,220,46,50,"c5","LAN 2",10),De("lan",254,220,46,50,"c5","LAN 3",10),De("lan",306,220,46,50,"c5","LAN 4",10),De("power",470,214,60,62,"c3","\u23FB",28),Wa("leds",90,150,8,"c2"),Wa("leds",120,150,8,"c2"),Wa("leds",150,150,8,"c4"),Wa("leds",180,150,8,"c6")],desc:{wifi:"Antennes sans-fil pour \xE9mettre et recevoir le signal Wi-Fi dans la pi\xE8ce",wan:"Prise jaune WAN (Internet) reliant le routeur au modem ou \xE0 la fibre optique",lan:"Prises bleues LAN pour brancher les ordinateurs et switchs par c\xE2ble r\xE9seau",power:"Bouton marche/arr\xEAt et prise d\u2019alimentation \xE9lectrique",leds:"Voyants lumineux indiquant l\u2019\xE9tat de l\u2019alimentation, d\u2019Internet et du Wi-Fi"}},browser:{w:600,h:360,alt:"Fen\xEAtre de navigateur web avec onglets, boutons de navigation, barre d\u2019adresse s\xE9curis\xE9e HTTPS et page web",shapes:[De(null,0,0,600,360,"c0"),De(null,0,0,600,38,"c9"),De("tab",10,6,160,32,"c0","\u{1F310} InfoPlay Maroc  \u2715",12),De("back",10,46,34,30,"c8","\u25C0",14),De("reload",50,46,34,30,"c8","\u27F3",16),De("urlbar",92,46,490,30,"c8","\u{1F512} https://www.infoplay.ma/cours",13),De("pagezone",10,88,580,262,"c1"),De(null,40,110,300,24,"c8"),De(null,40,148,480,14,"c8"),De(null,40,172,420,14,"c8")],desc:{tab:"Onglet du haut permettant de basculer entre plusieurs sites web ouverts",back:"Bouton Pr\xE9c\xE9dent (fl\xE8che vers la gauche) pour revenir \xE0 la page visit\xE9e avant",reload:"Bouton Actualiser (fl\xE8che circulaire) pour recharger le contenu de la page",urlbar:"Barre d\u2019adresse avec cadenas de s\xE9curit\xE9 HTTPS indiquant l\u2019URL du site",pagezone:"Zone principale d\u2019affichage o\xF9 appara\xEEt le contenu du site internet"}},mail:{w:600,h:360,alt:"Fen\xEAtre de r\xE9daction d\u2019un message \xE9lectronique avec destinataire, objet, corps du texte et pi\xE8ce jointe",shapes:[De(null,0,0,600,360,"c0"),De("to",20,20,560,30,"c8","\xC0 : professeur.informatique@ecole.ma",13),De("subject",20,58,560,30,"c8","Objet : Devoir S\xE9ance 4 \u2014 InfoPlay",13),De("body",20,96,560,150,"c1","Bonjour Monsieur, voici mon travail sur les r\xE9seaux informatiques.",13),De("attach",20,256,220,34,"c7","\u{1F4CE} expose_reseaux.docx (180 Ko)",12),De("send",430,304,150,42,"c5","\u2709 Envoyer le message",14)],desc:{to:"Champ destinataire (\xC0) contenant l\u2019adresse e-mail de la personne qui recevra le message",subject:"Champ Objet r\xE9sumant en quelques mots le sujet du message",body:"Corps du message : grande zone de saisie pour r\xE9diger le texte complet",attach:"Pi\xE8ce jointe : fichier joint au message (document, photo, devoir)",send:"Bouton Envoyer pour exp\xE9dier le message \xE9lectronique au destinataire"}},phish:{w:600,h:360,alt:"Simulation d\u2019un faux message d\u2019alerte (hame\xE7onnage / phishing) pour apprendre \xE0 d\xE9tecter les pi\xE8ges num\xE9riques",shapes:[De(null,0,0,600,360,"c0"),De("sender",20,14,560,28,"c8","Exp\xE9diteur : securite@banque-maroc-urgence.xyz",13),De("subject",20,48,560,28,"c8","Objet : URGENCE : Votre compte sera suspendu sous 24h !",13),De("greet",20,90,300,28,"c1","Cher client / Ch\xE8re cliente,",14),De("urgent",20,128,560,34,"c4","\u26A0 Attention : votre compte est bloqu\xE9 suite \xE0 une activit\xE9 suspecte.",13),De("ask",20,172,560,34,"c1","Veuillez saisir imm\xE9diatement votre mot de passe et votre code secret.",13),De("link",20,230,280,40,"c3","\u{1F517} Cliquer ici pour d\xE9bloquer votre compte",13),Fm(20,310,"Ne communiquez jamais vos mots de passe par message \xE9lectronique.",12,"muted")],desc:{sender:"Adresse d\u2019exp\xE9diteur suspecte imitant une entreprise connue",subject:"Objet alarmiste utilisant l\u2019urgence et la panique pour pi\xE9ger la victime",greet:"Formule de politesse g\xE9n\xE9rique (\xAB Cher client \xBB) montrant l\u2019absence de personnalisation",urgent:"Message de pression mena\xE7ant de bloquer le compte rapidement",ask:"Demande ill\xE9gitime d\u2019informations confidentielles et secr\xE8tes",link:"Bouton ou lien trompeur menant vers un faux site pirate destin\xE9 \xE0 voler les identifiants"}}},_d=i=>[...new Set((i.shapes||[]).filter(e=>e[0]!=="t"&&e[0]!=="defs"&&e[1]).map(e=>e[1]))];var $a=i=>String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;");function Om(i){let[e]=i;if(e==="defs")return`<defs>${i[1]}</defs>`;if(e==="raw")return`<g class="reg"${i[1]?` data-r="${i[1]}"`:""}>${i[2]}</g>`;if(e==="t")return`<text class="svt ${i[5]}" x="${i[1]}" y="${i[2]}" font-size="${i[4]}">${$a(i[3])}</text>`;let t=i[1]?` data-r="${i[1]}"`:"";if(e==="r"){let[,,n,s,r,a,o,l,c]=i;return`<g class="reg"${t}><rect x="${n}" y="${s}" width="${r}" height="${a}" rx="${o==="c0"||!o?4:6}" class="sv ${o||""}"/>${l?`<text class="svt" x="${n+r/2}" y="${s+a/2}" font-size="${c||14}" text-anchor="middle" dominant-baseline="central">${$a(l)}</text>`:""}</g>`}if(e==="c"){let[,,n,s,r,a,o,l]=i;return`<g class="reg"${t}><circle cx="${n}" cy="${s}" r="${r}" class="sv ${a||""}"/>${o?`<text class="svt" x="${n}" y="${s}" font-size="${l||14}" text-anchor="middle" dominant-baseline="central">${$a(o)}</text>`:""}</g>`}if(e==="l"){let[,,n,s,r,a,o]=i;return`<g class="reg"${t}>${i[1]?`<line x1="${n}" y1="${s}" x2="${r}" y2="${a}" class="hit"/>`:""}<line x1="${n}" y1="${s}" x2="${r}" y2="${a}" class="svl ${o||""}"/></g>`}return e==="p"?`<g class="reg"${t}><path d="${i[2]}" class="sv ${i[3]||""}"/></g>`:""}function bd(i,e){let t=e.prompts,n=t.length,s=Array(n).fill(null),r=0,a=x("p",{class:"hint-line","aria-live":"polite"}),o=x("ol",{class:"prompts"}),l,c=[],u={},h=[];if(e.scene==="lines")h=e.lines.map((m,d)=>"l"+(d+1)),u=Object.fromEntries(h.map((m,d)=>[m,"Ligne "+(d+1)])),l=x("div",{class:"codebox",role:"group","aria-label":"Programme"},e.lines.map((m,d)=>x("button",{type:"button",class:"codeline","data-r":h[d],onclick:()=>g(h[d])},x("span",{class:"ln"},d+1),x("code",null,m))));else{let m=yd[e.scene];h=_d(m),u=m.desc;let d=Oa(`<svg viewBox="0 0 ${m.w} ${m.h}" class="scene" role="img" aria-label="${$a(m.alt)}">${m.shapes.map(Om).join("")}</svg>`);d.addEventListener("click",f=>{let b=f.target.closest("[data-r]");b&&g(b.getAttribute("data-r"))}),l=x("div",{class:"figure"},d),c=h.map((f,b)=>x("button",{type:"button",class:"chip","data-z":f,onclick:()=>g(f)},`Zone ${b+1} : ${u[f]}`))}let p=m=>e.scene==="lines"?u[m]:"Zone "+(h.indexOf(m)+1);function g(m){s[r]=m,Ne.play("click");let d=s.findIndex((f,b)=>f==null&&b!==r);r=d>=0?d:r,a.textContent="R\xE9ponse enregistr\xE9e : "+p(m)+".",v()}function v(){o.replaceChildren(...t.map((m,d)=>x("li",{class:d===r?"cur":""},x("button",{type:"button",class:"prompt-btn","aria-current":d===r?"step":null,onclick:()=>{r=d,Ne.play("select"),v()}},m[1]),x("span",{class:"ans"},s[d]?p(s[d]):"\u2014")))),i.querySelectorAll("[data-r]").forEach(m=>{let d=m.getAttribute("data-r");m.classList.toggle("chosen",s.includes(d)),m.classList.toggle("active",s[r]===d)})}return i.append(x("div",{class:"hot"},x("div",null,l,e.scene==="lines"?null:x("details",{class:"alt"},x("summary",null,"Liste des zones (alternative accessible)"),x("div",{class:"chips"},c))),x("div",null,x("p",{class:"muted"},"\u{1F449} Clique directement sur l\u2019\xE9l\xE9ment correspondant dans l\u2019image ci-contre."),o)),a),v(),{check(){let m=t.map((d,f)=>({ok:s[f]===d[0],msg:`${d[1]} \u2192 ${u[d[0]]||d[0]}.`+(d[2]?" "+d[2]:"")}));return{correct:m.filter(d=>d.ok).length,total:n,items:m,unanswered:s.filter(d=>d==null).length}},reveal(m){o.querySelectorAll("li").forEach((d,f)=>{d.classList.add(m.items[f].ok?"ok":"ko")})},solve(){t.forEach((m,d)=>{s[d]=m[0]}),v()}}}function Md(i,e){let t=e.slots.length,n=Array(t).fill(null),s=null,r=new Set,a=x("p",{class:"hint-line","aria-live":"polite"}),o=x("div",{class:"tray",role:"group","aria-label":"Composants disponibles"}),l=e.slots.map((v,m)=>x("button",{type:"button",class:"slot",style:`left:${v.x}%;top:${v.y}%;width:${v.w}%;height:${v.h}%`,onclick:()=>p(m)})),c=x("div",{class:"case3d"},l),u=x("input",{type:"range",min:"-25",max:"25",value:"-12","aria-label":"Faire pivoter la vue du bo\xEEtier",oninput:()=>{c.style.transform=`rotateY(${u.value}deg) rotateX(8deg)`}});c.style.transform="rotateY(-12deg) rotateX(8deg)";let h=fi(e.parts.map((v,m)=>m));function p(v){if(n[v]!=null){r.delete(n[v]),s=n[v],n[v]=null,Ne.play("pop"),g();return}if(s==null){a.textContent="Choisis d\u2019abord un composant dans la liste.";return}n[v]=s,r.add(s),s=null,a.textContent="",Ne.play("snap"),g()}function g(){o.replaceChildren(...h.filter(v=>!r.has(v)).map(v=>x("button",{type:"button",class:"chip"+(qa(e.parts[v].name)?" has-art":"")+(s===v?" sel":""),"aria-pressed":String(s===v),onclick:()=>{s=s===v?null:v,s!=null&&Ne.play("select"),g()}},$i(e.parts[v].name)))),o.children.length||o.append(x("em",{class:"muted"},"Tous les composants sont pos\xE9s.")),l.forEach((v,m)=>{let d=n[m];v.className="slot"+(d!=null?" filled":"")+(m===0?" base":""),v.replaceChildren(d!=null?x("span",{class:"placed"},e.parts[d].name):x("span",{class:"slot-hint"},e.slots[m].hint)),v.setAttribute("aria-label",`Emplacement ${m+1} : ${e.slots[m].hint}${d!=null?". Contient : "+e.parts[d].name:". Vide"}`)})}return i.append(x("p",{class:"muted"},"Lis l\u2019indice de chaque emplacement, choisis le composant, puis clique sur l\u2019emplacement. Le curseur fait pivoter la vue."),o,x("div",{class:"stage"},c),x("label",{class:"rot"},"Vue : ",u),a),g(),{check(){let v=e.slots.map((m,d)=>({ok:n[d]===m.part,msg:`${e.parts[m.part].name} : ${m.why}`}));return{correct:v.filter(m=>m.ok).length,total:t,items:v,unanswered:n.filter(m=>m==null).length}},reveal(v){l.forEach((m,d)=>m.classList.add(v.items[d].ok?"ok":"ko"))},solve(){e.slots.forEach((v,m)=>{n[m]=v.part,r.add(v.part)}),g()}}}function Sd(i,e){let t=(m,d)=>[m,d].sort().join("~"),n=new Set(e.links.map(m=>t(m[0],m[1]))),s=new Set,r=null,a=Object.fromEntries(e.devices.map(m=>[m.id,m])),o="http://www.w3.org/2000/svg",l=document.createElementNS(o,"svg");l.setAttribute("viewBox","0 0 100 100"),l.setAttribute("preserveAspectRatio","none"),l.setAttribute("class","netlines"),l.setAttribute("aria-hidden","true");let c=x("p",{class:"hint-line","aria-live":"polite"}),u=x("ul",{class:"netlist","aria-label":"C\xE2bles branch\xE9s"}),h=e.devices.map(m=>x("button",{type:"button",class:"node",style:`left:${m.x}%;top:${m.y}%`,onclick:()=>g(m.id)},x("span",{class:"ico"},m.icon),x("span",null,m.label))),p=x("div",{class:"netboard"},l,h);function g(m){if(r==null)r=m,Ne.play("select"),c.textContent=`${a[m].label} s\xE9lectionn\xE9 : choisis l\u2019\xE9quipement \xE0 relier.`;else if(r===m)r=null,c.textContent="";else{let d=t(r,m);s.has(d)?(s.delete(d),Ne.play("pop"),c.textContent="C\xE2ble d\xE9branch\xE9."):(s.add(d),Ne.play("snap"),c.textContent="C\xE2ble branch\xE9."),r=null}v()}function v(m){for(;l.firstChild;)l.removeChild(l.firstChild);for(let d of s){let[f,b]=d.split("~"),M=document.createElementNS(o,"line");M.setAttribute("x1",a[f].x),M.setAttribute("y1",a[f].y),M.setAttribute("x2",a[b].x),M.setAttribute("y2",a[b].y),M.setAttribute("class","netline"+(m?n.has(d)?" ok":" ko":"")),l.append(M)}h.forEach((d,f)=>d.classList.toggle("sel",r===e.devices[f].id)),u.replaceChildren(...[...s].map(d=>{let[f,b]=d.split("~");return x("li",null,`${a[f].label} \u2194 ${a[b].label}`)})),s.size||u.append(x("li",{class:"muted"},"Aucun c\xE2ble pour le moment."))}return i.append(x("p",{class:"muted"},"Clique sur un \xE9quipement, puis sur celui auquel tu veux le relier. Clique de nouveau sur la m\xEAme paire pour retirer le c\xE2ble."),p,c,u),v(),{check(){let m=[...s].filter(b=>!n.has(b)).length,d=e.links.map(b=>({ok:s.has(t(b[0],b[1])),msg:`${a[b[0]].label} \u2194 ${a[b[1]].label}`+(b[2]?" : "+b[2]:"")}));m&&d.push({ok:!1,info:!0,msg:`${m} c\xE2ble(s) en trop : relie seulement ce qui est n\xE9cessaire.`});let f=d.filter(b=>!b.info&&b.ok).length;return{correct:Math.max(0,f-m),total:e.links.length,items:d,unanswered:s.size?0:1}},reveal(m){v(!0)},solve(){s.clear(),e.links.forEach(m=>s.add(t(m[0],m[1]))),v()}}}var Xa=[[0,1],[1,0],[0,-1],[-1,0]];function _r(i){let e=i.map(s=>s.split("")),t,n;return e.forEach((s,r)=>s.forEach((a,o)=>{a==="S"&&(t=[r,o]),a==="G"&&(n=[r,o])})),{g:e,start:t,goal:n,H:e.length,W:e[0].length}}function br(i,e){let[t,n]=i.start,s=0,r=[{r:t,c:n,d:s}];for(let o of e){if(o==="G")s=(s+3)%4;else if(o==="D")s=(s+1)%4;else{let l=t+Xa[s][0],c=n+Xa[s][1];if(l<0||c<0||l>=i.H||c>=i.W||i.g[l][c]==="#")return r.push({r:t,c:n,d:s,bump:!0}),{trace:r,ok:!1,reason:"Le robot heurte un obstacle ou sort de la grille."};t=l,n=c}r.push({r:t,c:n,d:s})}let a=t===i.goal[0]&&n===i.goal[1];return{trace:r,ok:a,reason:a?"Objectif atteint !":"Le robot s\u2019est arr\xEAt\xE9 trop t\xF4t ou au mauvais endroit."}}function Hc(i){let e=[[i.start[0],i.start[1],0,[]]],t=new Set([i.start.join()+",0"]);for(;e.length;){let[n,s,r,a]=e.shift();if(n===i.goal[0]&&s===i.goal[1])return a;for(let o of["A","G","D"]){let l=n,c=s,u=r;if(o==="G")u=(r+3)%4;else if(o==="D")u=(r+1)%4;else if(l+=Xa[r][0],c+=Xa[r][1],l<0||c<0||l>=i.H||c>=i.W||i.g[l][c]==="#")continue;let h=`${l},${c},${u}`;t.has(h)||(t.add(h),e.push([l,c,u,[...a,o]]))}}return null}var wd=["\u25B6","\u25BC","\u25C0","\u25B2"],Ed={A:"Avancer",G:"Pivoter \xE0 gauche",D:"Pivoter \xE0 droite"},Td={A:"\u2B06 Avancer",G:"\u27F2 Gauche",D:"\u27F3 Droite"};function Ya(i,e){let t=e.levels.map(y=>({...y,..._r(y.grid),best:Hc(_r(y.grid))})),n=t.map(()=>[]),s=t.map(()=>!1),r=0,a=null,o=x("div",{class:"lvtabs",role:"tablist"}),l=x("div",{class:"rgrid"}),c=x("ol",{class:"rseq","aria-label":"Programme du robot"}),u=x("p",{class:"hint-line","aria-live":"polite"});function h(y){let w=t[r];l.style.gridTemplateColumns=`repeat(${w.W}, 1fr)`,l.replaceChildren(...w.g.flatMap((C,L)=>C.map((T,S)=>{let _=y&&y.r===L&&y.c===S;return x("div",{class:"rcell"+(T==="#"?" wall":"")+(T==="G"?" goal":""),role:"img","aria-label":T==="#"?"obstacle":T==="G"?"objectif":T==="S"?"d\xE9part":"case libre"},T==="G"?"\u2691":T==="#"?"\u25A9":"",_?x("span",{class:`bot robot-dir-${y.d}`+(y.bump?" bump":"")+(y.victory?" victory":""),"aria-label":`robot orient\xE9 ${wd[y.d]}`},x("i",null,wd[y.d])):null)})))}function p(){o.replaceChildren(...t.map((y,w)=>x("button",{type:"button",role:"tab","aria-selected":String(w===r),class:"tab"+(w===r?" on":"")+(s[w]?" done":""),onclick:()=>{m(),r=w,d()}},`Niveau ${w+1}`+(s[w]?" \u2714":""))))}function g(){let y=n[r];c.replaceChildren(...y.map((w,C)=>x("li",null,Td[w]))),y.length||c.append(x("li",{class:"muted"},"Programme vide")),v.textContent=`${y.length} / ${t[r].max} commandes`}let v=x("span",{class:"muted"});function m(){a&&(clearInterval(a),a=null)}function d(){p(),g(),h({r:t[r].start[0],c:t[r].start[1],d:0}),u.textContent=""}function f(y){if(n[r].length>=t[r].max){u.textContent="Programme complet : retire une commande ou simplifie.";return}n[r].push(y),g()}function b(){m();let y=t[r],w=br(y,n[r]),C=0,L=()=>{w.ok&&(s[r]=!0),u.textContent=w.reason,p()};if(It()){h(w.trace[w.trace.length-1]),L();return}h(w.trace[0]),a=setInterval(()=>{C++;let T=C>=w.trace.length-1,S=w.trace[Math.min(C,w.trace.length-1)];Ne.play(S.bump?"bump":"robot"),h(T&&w.ok?{...S,victory:!0}:S),T&&(m(),w.ok&&Ne.play("success"),L())},380)}let M=x("div",{class:"rbar"},["A","G","D"].map(y=>x("button",{type:"button",class:"btn","aria-label":Ed[y],onclick:()=>f(y)},Td[y])),x("button",{type:"button",class:"btn ghost",onclick:()=>{n[r].pop(),g()}},"\u232B Retirer la derni\xE8re"),x("button",{type:"button",class:"btn ghost",onclick:()=>{n[r]=[],m(),d()}},"Tout effacer"),x("button",{type:"button",class:"btn primary",onclick:b},"\u25B6 Ex\xE9cuter"));return i.append(x("p",{class:"muted"},"Le robot d\xE9marre tourn\xE9 vers la droite (\u25B6). Construis la suite de commandes, ex\xE9cute-la autant de fois que tu veux, puis clique sur \xAB V\xE9rifier \xBB quand tu as termin\xE9."),o,x("div",{class:"rwrap"},l,x("div",null,x("h3",{class:"small-h"},"Programme"),c,v)),M,u),d(),{check(){let y=t.map((w,C)=>({ok:s[C],msg:`Niveau ${C+1} : `+(s[C]?"r\xE9ussi.":"non r\xE9ussi.")+` Une solution en ${w.best.length} commandes : ${w.best.map(L=>Ed[L].toLowerCase()).join(", ")}.`}));return{correct:s.filter(Boolean).length,total:t.length,items:y,unanswered:0}},reveal(){m()},solve(){t.forEach((y,w)=>{n[w]=[...y.best],s[w]=br(y,n[w]).ok}),d()}}}var Mr=/\s*(?:(\d+(?:[.,]\d+)?)|("[^"]*"|«[^»]*»)|([A-Za-zÀ-ÿ_][\wÀ-ÿ]*)|(<=|>=|<>|[-+*\/()<>=]))/y;function Bm(i){let e=[];Mr.lastIndex=0;let t;for(;Mr.lastIndex<i.length&&(t=Mr.exec(i));)if(t[1]!==void 0)e.push({t:"num",v:parseFloat(t[1].replace(",","."))});else if(t[2]!==void 0)e.push({t:"str",v:t[2].slice(1,-1)});else if(t[3]!==void 0){let n=t[3].toLowerCase();e.push(["mod","div","et","ou","non","vrai","faux"].includes(n)?{t:"kw",v:n}:{t:"id",v:t[3]})}else e.push({t:"op",v:t[4]});if(Mr.lastIndex<i.trim().length&&i.slice(Mr.lastIndex).trim())throw new Error("Expression illisible : "+i);return e}function Vc(i){let e=Bm(i),t=0,n=()=>e[t],s=m=>n()&&n().t==="op"&&n().v===m,r=m=>n()&&n().t==="kw"&&n().v===m;function a(){let m=o();for(;r("ou");){t++;let d=o(),f=m;m=b=>f(b)||d(b)}return m}function o(){let m=l();for(;r("et");){t++;let d=l(),f=m;m=b=>f(b)&&d(b)}return m}function l(){if(r("non")){t++;let m=l();return d=>!m(d)}return c()}function c(){let m=u(),d=n();if(d&&d.t==="op"&&["=","<>","<",">","<=",">="].includes(d.v)){t++;let f=u(),b=d.v;return M=>{let y=m(M),w=f(M);switch(b){case"=":return y===w;case"<>":return y!==w;case"<":return y<w;case">":return y>w;case"<=":return y<=w;default:return y>=w}}}return m}function u(){let m=h();for(;s("+")||s("-");){let d=e[t++].v,f=h(),b=m;m=M=>{let y=b(M),w=f(M);return d==="+"?typeof y=="string"||typeof w=="string"?Sr(y)+Sr(w):y+w:y-w}}return m}function h(){let m=p();for(;;){let d=n(),f=null;if(d&&d.t==="op"&&(d.v==="*"||d.v==="/"))f=d.v;else if(d&&d.t==="kw"&&(d.v==="mod"||d.v==="div"))f=d.v;else break;t++;let b=p(),M=m;m=y=>{let w=M(y),C=b(y);if((f==="/"||f==="mod"||f==="div")&&C===0)throw new Error("Division par z\xE9ro");return f==="*"?w*C:f==="/"?w/C:f==="mod"?w%C:Math.trunc(w/C)}}return m}function p(){if(s("-")){t++;let m=p();return d=>-m(d)}return g()}function g(){let m=e[t++];if(!m)throw new Error("Expression incompl\xE8te");if(m.t==="num"||m.t==="str")return()=>m.v;if(m.t==="kw"&&m.v==="vrai")return()=>!0;if(m.t==="kw"&&m.v==="faux")return()=>!1;if(m.t==="id")return d=>{if(!(m.v in d))throw new Error("La variable \xAB "+m.v+" \xBB n\u2019a pas de valeur");return d[m.v]};if(m.t==="op"&&m.v==="("){let d=a();if(!s(")"))throw new Error("Parenth\xE8se fermante manquante");return t++,d}throw new Error("Symbole inattendu : "+m.v)}let v=a();if(t<e.length)throw new Error("Expression mal form\xE9e : "+i);return v}var Sr=i=>typeof i=="number"?Gi(i):i===!0?"Vrai":i===!1?"Faux":String(i),km=/^(algorithme\b.*|variables?\b.*|constantes?\b.*|d[ée]but|fin)$/i;function zm(i){let e=i.split(`
`).map(r=>r.trim()).filter(r=>r&&!km.test(r)),t=0;function n(r){let a=[];for(;t<e.length;){let o=e[t];if(r.some(c=>c.test(o)))return a;let l;if(l=/^lire\s*\((.*)\)$/i.exec(o))a.push({t:"read",vars:l[1].split(/[,;]/).map(c=>c.trim())}),t++;else if(l=/^[ée]crire\s*\((.*)\)$/i.exec(o))a.push({t:"write",e:Vc(l[1])}),t++;else if(l=/^si\s+(.+?)\s+alors$/i.exec(o)){t++;let c=n([/^sinon$/i,/^finsi$/i]),u=[];if(e[t]&&/^sinon$/i.test(e[t])&&(t++,u=n([/^finsi$/i])),!e[t]||!/^finsi$/i.test(e[t]))throw new Error("FinSi manquant");t++,a.push({t:"if",c:Vc(l[1]),yes:c,no:u})}else if(l=/^([A-Za-zÀ-ÿ_][\wÀ-ÿ]*)\s*(?:←|<-)\s*(.+)$/.exec(o))a.push({t:"set",v:l[1],e:Vc(l[2])}),t++;else throw new Error("Instruction inconnue : "+o)}return a}let s=n([]);if(t<e.length)throw new Error("Instruction inattendue : "+e[t]);return s}function Za(i,e=[]){let t=Object.create(null),n=[],s=0,r=0;try{let a=zm(i),o=l=>{for(let c of l){if(++r>5e3)throw new Error("Trop d\u2019instructions");if(c.t==="read")for(let u of c.vars){if(s>=e.length)throw new Error("Pas assez de valeurs saisies pour Lire("+u+")");let h=e[s++],p=typeof h=="number"?h:/^-?\d+([.,]\d+)?$/.test(String(h).trim())?parseFloat(String(h).replace(",",".")):String(h);t[u]=p}else c.t==="write"?n.push(Sr(c.e(t))):c.t==="set"?t[c.v]=c.e(t):c.t==="if"&&o(c.c(t)?c.yes:c.no)}};o(a)}catch(a){return{out:n,vars:t,error:a.message}}return{out:n,vars:t}}function Ad(i){let e=0;return i.split(`
`).map(t=>{let n=t.trim();/^(sinon|finsi)$/i.test(n)&&(e=Math.max(0,e-1));let s="  ".repeat(e)+n;return(/^si\s.+\salors$/i.test(n)||/^sinon$/i.test(n))&&e++,s}).join(`
`)}var Cd=i=>String(i).split(/[;\s]+/).filter(e=>e!==""),Rd=(i,e)=>at(String(i).replace(/["«»]/g,"")).replace(",",".")===at(String(e).replace(/["«»]/g,"")).replace(",",".");function Id(i,e){let t=e.mode==="run",n=e.tasks.map((r,a)=>{let o=r[0],l=x("div",{class:"ptask"}),c=x("input",{type:"text",class:"ans",autocomplete:"off","aria-label":t?`Valeurs \xE0 saisir pour le programme ${a+1}`:`R\xE9ponse ${a+1}`,placeholder:t?"ex. 12 ou 4 7":"Ta r\xE9ponse"}),u=x("output",{class:"pout","aria-live":"polite"}),h,p,g,v;return t?(g=r[1],v=r[2],l.append(x("p",null,x("b",null,`${a+1}. `),"Trouve les valeurs \xE0 saisir pour que le programme affiche ",x("code",null,String(g)),"."),x("pre",{class:"code"},Ad(o)),x("div",{class:"prow"},c,x("button",{type:"button",class:"btn small",onclick:()=>{let m=Za(o,Cd(c.value).map(d=>d));u.textContent=m.error?"\u26A0 "+m.error:"Affiche : "+(m.out.join(" ; ")||"(rien)")}},"\u25B6 Tester"),u))):(p=r[1],h=r[2],l.append(x("p",null,x("b",null,`${a+1}. `),h==="out"?"Qu\u2019affiche cet algorithme ?":`Quelle est la valeur de ${h} \xE0 la fin ?`,p.length?x("span",null," Valeurs saisies au clavier : ",x("code",null,p.map(Gi).join(" ; ")),"."):null),x("pre",{class:"code"},Ad(o)),x("div",{class:"prow"},c))),i.append(l),{code:o,input:c,body:l,ask:h,inputs:p,target:g,sol:v,why:r[3]}}),s=r=>{let a=Za(r.code,r.inputs||[]);return a.error?null:r.ask==="out"?a.out[0]:Sr(a.vars[r.ask])};return{check(){let r=n.map(a=>{if(t){let h=Za(a.code,Cd(a.input.value)),p=!h.error&&h.out.length>0&&Rd(h.out[0],a.target);return{ok:p,msg:p?`Programme : affiche ${a.target} avec \xAB ${a.input.value} \xBB.`:`Il fallait obtenir ${a.target}`+(a.input.value?` (tes valeurs \xAB ${a.input.value} \xBB donnent : ${h.error?h.error:h.out[0]??"rien"})`:"")+`. Exemple : ${a.sol.join(" ; ")}.`+(a.why?" "+a.why:"")}}let o=s(a),l=o!=null&&a.input.value.trim()!==""&&Rd(a.input.value,o),c=Za(a.code,a.inputs),u=Object.entries(c.vars).map(([h,p])=>`${h} = ${Sr(p)}`).join(", ");return{ok:l,msg:`R\xE9sultat : ${o}. Variables \xE0 la fin : ${u}.`+(a.why?" "+a.why:"")}});return{correct:r.filter(a=>a.ok).length,total:n.length,items:r,unanswered:n.filter(a=>!a.input.value.trim()).length}},reveal(r){n.forEach((a,o)=>a.body.classList.add(r.items[o].ok?"ok":"ko"))},solve(){n.forEach(r=>{r.input.value=t?r.sol.join(" "):s(r)})}}}var Ja=i=>String.fromCharCode(65+i),ja=/\s*(?:(\d+(?:[.,]\d+)?)|"([^"]*)"|([A-Za-z]+\d+:[A-Za-z]+\d+)|([A-Za-z]+\d+)(?![A-Za-z(\d])|([A-Za-zÀ-ÿ.]+)(?=\s*\()|([-+*\/()^;]))/y,Hm={SOMME:"sum",SUM:"sum",MOYENNE:"avg",AVERAGE:"avg",MAX:"max",MIN:"min",NB:"count",COUNT:"count"};function Ka(i,e,t=[]){i=i.toUpperCase();let n=e[i];if(n==null||n==="")return"";let s=String(n).trim();if(s[0]!=="=")return/^-?\d+([.,]\d+)?$/.test(s)?parseFloat(s.replace(",",".")):s;if(t.includes(i))return"#REF!";try{return Gm(s.slice(1),r=>Ka(r,e,[...t,i]))}catch(r){return String(r.message).startsWith("#")?r.message:"#NOM?"}}function Vm(i,e){let t=/^([A-Za-z])(\d+)$/.exec(i),n=/^([A-Za-z])(\d+)$/.exec(e);if(!t||!n)throw new Error("#REF!");let s=Math.min(t[1].toUpperCase().charCodeAt(0),n[1].toUpperCase().charCodeAt(0)),r=Math.max(t[1].toUpperCase().charCodeAt(0),n[1].toUpperCase().charCodeAt(0)),a=Math.min(+t[2],+n[2]),o=Math.max(+t[2],+n[2]),l=[];for(let c=s;c<=r;c++)for(let u=a;u<=o;u++)l.push(String.fromCharCode(c)+u);return l}function Gm(i,e){let t=[];ja.lastIndex=0;let n;for(;ja.lastIndex<i.length&&(n=ja.exec(i))&&(n[1]!==void 0?t.push({t:"n",v:parseFloat(n[1].replace(",","."))}):n[2]!==void 0?t.push({t:"s",v:n[2]}):n[3]!==void 0?t.push({t:"r",v:n[3].toUpperCase()}):n[4]!==void 0?t.push({t:"c",v:n[4].toUpperCase()}):n[5]!==void 0?t.push({t:"f",v:n[5].toUpperCase()}):t.push({t:"o",v:n[6]}),!!n[0]););if(i.slice(ja.lastIndex).trim())throw new Error("#NOM?");let s=0,r=v=>t[s]&&t[s].t==="o"&&t[s].v===v,a=v=>{if(v==="")return 0;if(typeof v!="number")throw typeof v=="string"&&v.startsWith("#")?new Error(v):new Error("#VALEUR!");return v};function o(){let v=l();for(;r("+")||r("-");){let m=t[s++].v,d=l();v=m==="+"?a(v)+a(d):a(v)-a(d)}return v}function l(){let v=c();for(;r("*")||r("/");){let m=t[s++].v,d=c();if(m==="*")v=a(v)*a(d);else{if(a(d)===0)throw new Error("#DIV/0!");v=a(v)/a(d)}}return v}function c(){let v=u();for(;r("^");)s++,v=Math.pow(a(v),a(u()));return v}function u(){return r("-")?(s++,-a(u())):p()}function h(){let v=[];if(!r("("))throw new Error("#NOM?");if(s++,r(")"))return s++,v;for(;;){if(t[s]&&t[s].t==="r"){let[m,d]=t[s++].v.split(":");v.push(...Vm(m,d).map(e))}else v.push(o());if(r(";")){s++;continue}if(r(")"))return s++,v;throw new Error("#NOM?")}}function p(){let v=t[s++];if(!v)throw new Error("#NOM?");if(v.t==="n"||v.t==="s")return v.v;if(v.t==="c")return e(v.v);if(v.t==="f"){let m=Hm[v.v];if(!m)throw new Error("#NOM?");let f=h().filter(b=>typeof b=="number");if(m==="sum")return f.reduce((b,M)=>b+M,0);if(m==="count")return f.length;if(m==="avg"){if(!f.length)throw new Error("#DIV/0!");return f.reduce((b,M)=>b+M,0)/f.length}return f.length?m==="max"?Math.max(...f):Math.min(...f):0}if(v.t==="o"&&v.v==="("){let m=o();if(!r(")"))throw new Error("#NOM?");return s++,m}throw new Error("#NOM?")}let g=o();if(s<t.length)throw new Error("#NOM?");return g}var Pd={noir:"#1d1d2b",rouge:"#c0392b",bleu:"#1f4fd8",vert:"#1b7f4b"},wr=(i,e,t,n)=>x("select",{"aria-label":n,onchange:s=>t(s.target.value)},i.map(s=>x("option",{value:String(s),selected:String(s)===String(e)},String(s))));function qm(i,e,t){let n=t.cfg,s=new Set(n.show||[]),r={name:"",folder:"Bureau",text:"",saved:!1,sel:"title",img:!1,table:!1,shape:!1,orient:"portrait",margins:"normales",paper:"A4",copies:1,color:"couleur",printed:!1};for(let[w,C]of Object.entries(r))e[w]??=C;for(let w of["title","para"])e[w+".b"]??=!1,e[w+".i"]??=!1,e[w+".u"]??=!1,e[w+".al"]??="gauche",e[w+".sz"]??=12,e[w+".col"]??="noir";let a=s.has("fmt")||s.has("insert"),o=(w,C,L=!0)=>{e[w]=C,L&&(e.saved=!1),e.printed=w==="printed"?C:e.printed,y()},l=x("p",{class:"hint-line","aria-live":"polite"}),c=x("div",{class:"otitle"}),u=x("div",{class:"opage"}),h=x("div",{class:"otools"}),p=null;s.has("type")&&(p=x("textarea",{class:"otext",rows:"8","aria-label":"Page du document : zone de saisie",oninput:w=>{e.text=w.target.value,e.saved=!1,c.textContent=g()}}));let g=()=>`${e.saved&&e.name?e.name:e.name||"Document1"}${e.saved?"":" *"} \u2014 Traitement de texte`,v=(w,C,L)=>x("button",{type:"button",class:"tb","aria-label":L||C,"aria-pressed":"false","data-k":w,onclick:()=>o(e.sel+"."+w,!e[e.sel+"."+w])},C);s.has("fmt")&&h.append(x("div",{class:"tgrp"},x("span",{class:"lbl"},"Texte s\xE9lectionn\xE9 :"),...["title","para"].map(w=>x("button",{type:"button",class:"tb sel-"+w,"aria-pressed":"false",onclick:()=>o("sel",w,!1)},w==="title"?"Titre":"Paragraphe")),v("b","G","Gras"),v("i","I","Italique"),v("u","S","Soulign\xE9"),...["gauche","centre","droite"].map(w=>x("button",{type:"button",class:"tb al-"+w,"aria-label":"Aligner : "+w,"aria-pressed":"false",onclick:()=>o(e.sel+".al",w)},w==="gauche"?"\u21E4":w==="centre"?"\u2194":"\u21E5")),x("label",null,"Taille ",x("select",{"aria-label":"Taille de police",class:"szsel",onchange:w=>o(e.sel+".sz",Number(w.target.value))},[10,12,14,18,24,32].map(w=>x("option",{value:w},w)))),x("label",null,"Couleur ",x("select",{"aria-label":"Couleur du texte",class:"colsel",onchange:w=>o(e.sel+".col",w.target.value)},Object.keys(Pd).map(w=>x("option",{value:w},w)))))),s.has("insert")&&h.append(x("div",{class:"tgrp"},x("span",{class:"lbl"},"Insertion :"),[["img","\u{1F5BC} Image"],["table","\u25A6 Tableau"],["shape","\u2605 Forme"]].map(([w,C])=>x("button",{type:"button",class:"tb wide","aria-pressed":"false","data-ins":w,onclick:()=>o(w,!e[w])},C))));let m,d,f=s.has("save")?x("div",{class:"tgrp"},x("label",null,"Nom du fichier ",m=x("input",{type:"text",maxlength:"30",autocomplete:"off",oninput:w=>{e.name=w.target.value.replace(/[^\w.\- ]/g,""),e.saved=!1,c.textContent=g()}})),x("label",null,"Dossier ",d=x("select",{"aria-label":"Dossier d\u2019enregistrement",onchange:w=>{e.folder=w.target.value,e.saved=!1}},["Bureau","Mes documents","T\xE9l\xE9chargements"].map(w=>x("option",{value:w},w)))),x("button",{type:"button",class:"btn small",onclick:()=>{e.name.trim()?(e.saved=!0,l.textContent=`Document \xAB ${e.name} \xBB enregistr\xE9 dans ${e.folder}.`):l.textContent="Donne un nom au document avant de l\u2019enregistrer.",y()}},"\u{1F4BE} Enregistrer")):null,b=null,M=x("div",{class:"pvw"});s.has("print")&&(b=x("div",{class:"tgrp printp"},x("label",null,"Orientation ",wr(["portrait","paysage"],e.orient,w=>o("orient",w,!1),"Orientation")),x("label",null,"Format ",wr(["A4","A5","Lettre"],e.paper,w=>o("paper",w,!1),"Format du papier")),x("label",null,"Marges ",wr(["normales","\xE9troites","larges"],e.margins,w=>o("margins",w,!1),"Marges")),x("label",null,"Copies ",x("input",{type:"number",min:"1",max:"99",value:e.copies,"aria-label":"Nombre de copies",oninput:w=>{e.copies=Math.max(1,Math.min(99,Number(w.target.value)||1))}})),x("label",null,"Couleur ",wr(["couleur","noir et blanc"],e.color,w=>o("color",w,!1),"Couleur d\u2019impression")),x("button",{type:"button",class:"btn small",onclick:()=>{e.printed=!0,l.textContent=`Impression simul\xE9e : ${e.copies} copie(s), ${e.paper}, ${e.orient}, marges ${e.margins}.`,y()}},"\u{1F5A8} Imprimer"),M));function y(){if(c.textContent=g(),p&&p.value!==e.text&&(p.value=e.text),a||s.has("print")){let L=(T,S,_)=>{let I=x(S,{class:"blk "+(e.sel===T&&s.has("fmt")?"selected":""),tabindex:"0",onclick:()=>o("sel",T,!1)},_);return Object.assign(I.style,{fontWeight:e[T+".b"]?"800":"400",fontStyle:e[T+".i"]?"italic":"normal",textDecoration:e[T+".u"]?"underline":"none",textAlign:e[T+".al"]==="gauche"?"left":e[T+".al"]==="centre"?"center":"right",fontSize:e[T+".sz"]*1.3+"px",color:Pd[e[T+".col"]]}),I};u.replaceChildren(L("title","h3",n.title||"F\xEAte de l\u2019\xE9cole"),L("para","p",n.para||"Rendez-vous le samedi \xE0 15 h dans la cour. Entr\xE9e libre pour toutes les familles."),e.img?x("div",{class:"imgph"},"\u{1F5BC} Image"):null,e.table?x("table",{class:"mt"},x("tbody",null,x("tr",null,x("td",null,"Heure"),x("td",null,"Activit\xE9")),x("tr",null,x("td",null,"15 h"),x("td",null,"Jeux")))):null,e.shape?x("div",{class:"shape"},"\u2605"):null)}else p&&u.replaceChildren(p);h.querySelectorAll("[data-k]").forEach(L=>L.setAttribute("aria-pressed",String(!!e[e.sel+"."+L.dataset.k]))),h.querySelectorAll("[data-ins]").forEach(L=>L.setAttribute("aria-pressed",String(!!e[L.dataset.ins]))),h.querySelectorAll(".sel-title").forEach(L=>L.setAttribute("aria-pressed",String(e.sel==="title"))),h.querySelectorAll(".sel-para").forEach(L=>L.setAttribute("aria-pressed",String(e.sel==="para"))),["gauche","centre","droite"].forEach(L=>h.querySelectorAll(".al-"+L).forEach(T=>T.setAttribute("aria-pressed",String(e[e.sel+".al"]===L))));let w=h.querySelector(".szsel");w&&(w.value=String(e[e.sel+".sz"]));let C=h.querySelector(".colsel");if(C&&(C.value=e[e.sel+".col"]),m&&m!==document.activeElement&&(m.value=e.name),d&&(d.value=e.folder),b){b.querySelectorAll("select").forEach((O,G)=>{O.value=[e.orient,e.paper,e.margins,e.color][G]});let L=b.querySelector("input[type=number]");L&&(L.value=e.copies);let T=e.orient==="paysage",S=e.margins==="\xE9troites"?4:e.margins==="larges"?22:12,_=e.paper==="A5"?.82:1;M.replaceChildren(x("div",{class:"sheetp "+(T?"land":"port"),"aria-label":`Aper\xE7u ${e.paper} ${e.orient}`},x("div",{class:"inner"},`${e.paper} \xB7 ${e.orient}`,x("br"),`marges ${e.margins}`)));let I=M.firstChild;I.style.padding=S+"px",I.style.transform=`scale(${_})`}}return i.append(x("div",{class:"office"},c,s.has("fmt")||s.has("insert")?h:null,f,b,u,l)),y(),{refresh(){m&&(m.value=e.name),y()}}}function Wm(i,e,t){let n=t.cfg;e.urlInput??="",e.page??=n.start??null,e.q??="";let s=[],r=[],a=m=>at(m).replace(/^https?:\/\//,"").replace(/\/$/,""),o=m=>Object.keys(n.pages).find(d=>a(n.pages[d].url)===a(m))||null,l=x("input",{type:"text",class:"urlin","aria-label":"Barre d\u2019adresse",autocomplete:"off",placeholder:"Tape une adresse",oninput:m=>{e.urlInput=m.target.value},onkeydown:m=>{m.key==="Enter"&&p()}}),c=x("div",{class:"bpage"}),u=x("ul",{class:"blog","aria-live":"polite"}),h=(m,d=!0)=>{d&&e.page&&e.page!==m&&s.push(e.page),e.page=m,m&&n.pages[m]&&(e.urlInput=n.pages[m].url),v()};function p(){let m=o(e.urlInput),d=e.urlInput.trim()||"(vide)";r.push(`Le navigateur (client) envoie une requ\xEAte \xE0 ${d}.`),r.push(m?"Le serveur r\xE9pond : 200 OK et envoie la page.":"Le serveur r\xE9pond : 404 \u2013 page introuvable."),h(m||"404")}function g(){let m=at(e.q).split(/\s+/).filter(d=>d.length>2);e.results=Object.keys(n.pages).filter(d=>n.pages[d].kw).map(d=>({id:d,s:m.filter(f=>at(n.pages[d].kw+" "+n.pages[d].title).includes(f)).length})).filter(d=>d.s>0).sort((d,f)=>f.s-d.s).slice(0,4),r.push("Requ\xEAte envoy\xE9e au moteur de recherche : \xAB "+e.q+" \xBB."),h("results"),e.urlInput="recherche.exemple/?q="+encodeURIComponent(e.q),l.value=e.urlInput}function v(){l.value=e.urlInput;let m=e.page,d;if(!m)d=[x("p",{class:"muted"},"Page vide : tape une adresse puis clique sur \xAB Aller \xBB.")];else if(m==="404")d=[x("h3",null,"Erreur 404"),x("p",null,"Le serveur n\u2019a pas trouv\xE9 la page demand\xE9e. V\xE9rifie l\u2019adresse.")];else if(m==="results")d=[x("h3",null,"R\xE9sultats"),...e.results?.length?e.results.map(f=>x("p",null,x("button",{type:"button",class:"link",onclick:()=>h(f.id)},n.pages[f.id].title),x("br"),x("small",{class:"muted"},n.pages[f.id].url))):[x("p",null,"Aucun r\xE9sultat.")],x("p",null,x("button",{type:"button",class:"link",onclick:()=>h(n.start)},"\u2190 Nouvelle recherche"))];else{let f=n.pages[m];d=[x("h3",null,f.title),(f.body||[]).map(b=>x("p",null,b)),f.search?x("div",{class:"prow"},x("input",{type:"text","aria-label":"Mots \xE0 rechercher",value:e.q,oninput:b=>{e.q=b.target.value},onkeydown:b=>{b.key==="Enter"&&g()}}),x("button",{type:"button",class:"btn small",onclick:g},"\u{1F50D} Rechercher")):null,(f.links||[]).map(([b,M])=>x("p",null,x("button",{type:"button",class:"link",onclick:()=>h(M)},b)))]}c.replaceChildren(...d),u.replaceChildren(...r.slice(-4).map(f=>x("li",null,f)))}return i.append(x("div",{class:"browser"},x("div",{class:"bbar"},x("button",{type:"button",class:"icon-btn","aria-label":"Retour",onclick:()=>{let m=s.pop();m&&(e.page=m,n.pages[m]&&(e.urlInput=n.pages[m].url),v())}},"\u25C0"),l,x("button",{type:"button",class:"btn small",onclick:p},"Aller")),c,x("p",{class:"small-h"},"\xC9changes client \u2194 serveur"),u)),v(),{refresh:v}}function $m(i,e,t){let s=t.cfg.data;e.type??="barres",e.title??="",e.axes??=!1,e.legend??=!1,e.answer??="";let r=x("div",{class:"chartfig"}),a=x("h4",{class:"ctitle"}),o=Math.max(...s.map(m=>m[1])),l=["c5","c4","c2","c6","c3"];function c(){a.textContent=e.title||"(sans titre)";let m="";if(e.type==="barres")s.forEach(([d,f],b)=>{let M=f/o*150;m+=`<rect class="sv ${l[b%5]}" x="${60+b*62}" y="${190-M}" width="44" height="${M}"/><text class="svt" x="${82+b*62}" y="${184-M}" font-size="12" text-anchor="middle">${f}</text>`});else if(e.type==="courbe"){let d=s.map(([,f],b)=>[70+b*62,190-f/o*150]);m+=`<polyline class="svl thick" fill="none" points="${d.map(f=>f.join(",")).join(" ")}"/>`+d.map(f=>`<circle class="sv c4" cx="${f[0]}" cy="${f[1]}" r="5"/>`).join("")}else{let d=s.reduce((b,M)=>b+M[1],0),f=-Math.PI/2;s.forEach(([,b],M)=>{let y=f+b/d*2*Math.PI,w=_=>[190+85*Math.cos(_),105+85*Math.sin(_)],[C,L]=w(f),[T,S]=w(y);m+=`<path class="sv ${l[M%5]}" d="M190 105 L${C.toFixed(1)} ${L.toFixed(1)} A85 85 0 ${y-f>Math.PI?1:0} 1 ${T.toFixed(1)} ${S.toFixed(1)} Z"/>`,f=y})}e.type!=="circulaire"?(m+=`<line class="svl" x1="48" y1="190" x2="${60+s.length*62}" y2="190"/><line class="svl" x1="48" y1="190" x2="48" y2="30"/>`,s.forEach(([d],f)=>{m+=`<text class="svt" x="${(e.type==="barres"?82:70)+f*62}" y="206" font-size="11" text-anchor="middle">${d}</text>`}),e.axes&&(m+=`<text class="svt" x="${60+s.length*31}" y="226" font-size="12" text-anchor="middle">Mati\xE8res</text><text class="svt" transform="translate(14 110) rotate(-90)" font-size="12" text-anchor="middle">Moyenne /20</text>`)):e.legend,e.legend&&(m+=s.map(([d],f)=>`<rect class="sv ${l[f%5]}" x="${e.type==="circulaire"?300:340}" y="${40+f*20}" width="12" height="12"/><text class="svt" x="${(e.type==="circulaire"?300:340)+18}" y="${50+f*20}" font-size="12">${d}</text>`).join("")),r.replaceChildren(Oa(`<svg viewBox="0 0 440 240" class="chart" role="img" aria-label="Graphique de type ${e.type} avec les moyennes par mati\xE8re">${m}</svg>`))}let u=x("input",{type:"text",maxlength:"60","aria-label":"Titre du graphique",placeholder:"Titre du graphique",oninput:m=>{e.title=m.target.value,c()}}),h=wr(["barres","courbe","circulaire"],e.type,m=>{e.type=m,c()},"Type de graphique"),p=x("select",{"aria-label":"Interpr\xE9tation",onchange:m=>{e.answer=m.target.value}},x("option",{value:""},"\u2014 choisir \u2014"),s.map(([m])=>x("option",{value:m},m))),g=x("input",{type:"checkbox",onchange:m=>{e.axes=m.target.checked,c()}}),v=x("input",{type:"checkbox",onchange:m=>{e.legend=m.target.checked,c()}});return i.append(x("div",{class:"chartbox"},x("table",{class:"mt"},x("thead",null,x("tr",null,x("th",null,"Mati\xE8re"),x("th",null,"Moyenne"))),x("tbody",null,s.map(([m,d])=>x("tr",null,x("td",null,m),x("td",null,d))))),x("div",{class:"ctl"},x("label",null,"Type : ",h),x("label",null,"Titre : ",u),x("label",{class:"chk"},g," Titres des axes"),x("label",{class:"chk"},v," L\xE9gende"),x("label",null,"La meilleure moyenne est en : ",p)),a,r)),c(),{refresh(){h.value=e.type,u.value=e.title,g.checked=e.axes,v.checked=e.legend,p.value=e.answer,c()}}}function Xm(i,e,t){let n=0,s=(T,S)=>{let _={id:++n,name:T.n,dir:!!T.k,kids:[],parent:S};return T.k&&(_.kids=T.k.map(I=>s(I,_))),_},r=s(t.cfg.tree,null),a=[],o=r,l=null,c=null,u=T=>{let S=r;if(!T)return S;for(let _ of T.split("/"))if(S=S.kids.find(I=>at(I.name)===at(_)),!S)return null;return S},h=(T,S)=>{let _=S,I=1;for(;T.kids.some(O=>at(O.name)===at(_));)_=S+" ("+ ++I+")";return _},p=(T,S)=>{let _={id:++n,name:h(S,T.name),dir:T.dir,kids:[],parent:S};return _.kids=T.kids.map(I=>p(I,_)),_},g={find:u,inBin:T=>a.some(S=>at(S.n.name)===at(T)),mkdir(T,S){let _=u(T);return!_||!_.dir||!S.trim()?!1:(_.kids.push({id:++n,name:h(_,S.trim()),dir:!0,kids:[],parent:_}),y(),!0)},rename(T,S){let _=u(T);return!_||!_.parent||!S.trim()?!1:(_.name=h({kids:_.parent.kids.filter(I=>I!==_)},S.trim()),y(),!0)},copy(T,S){let _=u(T),I=u(S);return!_||!I||!I.dir?!1:(I.kids.push(p(_,I)),y(),!0)},move(T,S){let _=u(T),I=u(S);return!_||!I||!I.dir||!_.parent||I===_?!1:(_.parent.kids=_.parent.kids.filter(O=>O!==_),_.name=h(I,_.name),_.parent=I,I.kids.push(_),y(),!0)},remove(T){let S=u(T);return!S||!S.parent?!1:(S.parent.kids=S.parent.kids.filter(_=>_!==S),a.push({n:S,from:S.parent}),y(),!0)},restore(T){let S=a.findIndex(I=>at(I.n.name)===at(T));if(S<0)return!1;let[_]=a.splice(S,1);return _.n.name=h(_.from,_.n.name),_.from.kids.push(_.n),_.n.parent=_.from,y(),!0}},v=T=>{let S=[];for(;T&&T.parent;)S.unshift(T.name),T=T.parent;return S.join("/")},m=x("div",{class:"fslist",role:"tree","aria-label":"Explorateur de fichiers (simulation)"}),d=x("input",{type:"text",maxlength:"30","aria-label":"Nom du dossier ou du fichier",placeholder:"Nom\u2026"}),f=x("p",{class:"hint-line","aria-live":"polite"}),b=(T,S,_)=>x("button",{type:"button",role:"treeitem",class:"fsrow"+((_?l===T:o===T&&!l)?" on":""),style:`padding-left:${10+S*20}px`,onclick:()=>{_?l=T:(o=T,l=null),f.textContent="",y()}},(T.dir?"\u{1F4C1} ":"\u{1F4C4} ")+T.name);function M(T,S,_){_.push(b(T,S,!1)),T.kids.forEach(I=>M(I,S+1,_))}function y(){let T=[];M(r,0,T),T.push(x("div",{class:"fsbin"},"\u{1F5D1} Corbeille",a.length?"":" (vide)")),a.forEach(S=>T.push(b(S.n,1,!0))),m.replaceChildren(...T)}let w=()=>l||!o.parent?(f.textContent="S\xE9lectionne d\u2019abord un fichier ou un dossier (pas le dossier racine).",!1):!0,C=(T,S)=>x("button",{type:"button",class:"btn small",onclick:S},T),L=()=>o.dir?o:o.parent;return i.append(x("div",{class:"fsbox"},x("div",{class:"fsbar"},d,C("\u{1F4C1} Nouveau dossier",()=>{if(!d.value.trim()){f.textContent="\xC9cris un nom dans la case.";return}if(l)return;let T=L();T.kids.push({id:++n,name:h(T,d.value.trim()),dir:!0,kids:[],parent:T}),d.value="",y()}),C("\u270F Renommer",()=>{if(!w()||!d.value.trim()){d.value.trim()||(f.textContent="\xC9cris le nouveau nom dans la case.");return}g.rename(v(o),d.value),d.value=""}),C("\u29C9 Copier",()=>{w()&&(c={n:o,cut:!1},f.textContent=`\xAB ${o.name} \xBB copi\xE9.`)}),C("\u2702 Couper",()=>{w()&&(c={n:o,cut:!0},f.textContent=`\xAB ${o.name} \xBB coup\xE9.`)}),C("\u{1F4CB} Coller",()=>{if(!c){f.textContent="Rien \xE0 coller : copie ou coupe d\u2019abord un \xE9l\xE9ment.";return}let T=L();c.cut?(c.n.parent&&T!==c.n&&g.move(v(c.n),v(T)),c=null):T.kids.push(p(c.n,T)),y()}),C("\u{1F5D1} Supprimer",()=>{w()&&(g.remove(v(o)),o=r)}),C("\u21A9 Restaurer",()=>{if(!l){f.textContent="S\xE9lectionne un \xE9l\xE9ment dans la corbeille.";return}g.restore(l.name),l=null})),m,f)),y(),{...g,refresh:y}}function Ym(i,e,t){let n=t.cfg,s=n.rows||6,r=n.cols||5,a={...n.init||{}},o={},l=m=>{let d=Ka(m,a);return typeof d=="number"?Gi(Math.round(d*1e6)/1e6):String(d)},c=x("output",{class:"fbarv","aria-live":"off"},""),u=x("output",{class:"namebox"},"A1"),h=()=>{for(let m in o)document.activeElement!==o[m]&&(o[m].value=l(m))},p=x("tr",null,x("th",null),...Array.from({length:r},(m,d)=>x("th",null,Ja(d)))),g=Array.from({length:s},(m,d)=>x("tr",null,x("th",null,d+1),...Array.from({length:r},(f,b)=>{let M=Ja(b)+(d+1),y=x("input",{type:"text",autocomplete:"off","aria-label":"Cellule "+M,spellcheck:"false"});return o[M]=y,y.addEventListener("focus",()=>{y.value=a[M]??"",u.textContent=M,c.textContent=a[M]??""}),y.addEventListener("input",()=>{c.textContent=y.value}),y.addEventListener("blur",()=>{a[M]=y.value,h()}),y.addEventListener("keydown",w=>{if(w.key==="Enter"){a[M]=y.value,h();let C=o[Ja(b)+(d+2)];C?C.focus():y.blur()}}),x("td",null,y)})));i.append(x("div",{class:"sheetbox"},x("p",{class:"muted"},"Tableur simplifi\xE9 : commence une formule par =, \xE9cris les fonctions en fran\xE7ais (SOMME, MOYENNE, MAX, MIN) et s\xE9pare les arguments par un point\u2011virgule ; (ex. =SOMME(B2:B4)). Valide avec Entr\xE9e."),x("div",{class:"fx"},u,x("span",{"aria-hidden":"true"},"\u0192x"),c),x("div",{class:"tablewrap"},x("table",{class:"grid"},x("thead",null,p),x("tbody",null,g))))),h();let v=m=>typeof m=="string"?at(m):m;return{refresh:h,checkCell(m){let d=m.c.toUpperCase();document.activeElement===o[d]&&(a[d]=o[d].value);let f=Ka(d,a),b=String(a[d]??"").trim();return(typeof m.v=="number"?typeof f=="number"&&Math.abs(f-m.v)<1e-9:v(f)===v(m.v))&&(!m.f||b.startsWith("="))},solveCell(m){a[m.c.toUpperCase()]=m.f?m.f:String(m.v),h()}}}var Ld={office:qm,browser:Wm,chart:$m,fs:Xm,sheet:Ym};var Dd=/^[~=^]/;function Zm(i,e){if(typeof i=="string"&&Dd.test(i)){let t=i[0],n=i.slice(1),s=String(e??"");return t==="~"?at(s).includes(at(n)):t==="="?at(s)===at(n):s.includes(n)}return typeof i=="number"?Number(String(e??"").replace(",","."))===i:e===i}var jm=i=>typeof i=="string"&&Dd.test(i)?i.slice(1):i;function Jm(i,e,t){return typeof i=="function"?!!i(e,t):i&&i.c?t.checkCell(i):Object.entries(i).every(([n,s])=>Zm(s,e[n]))}var Km={calc(i,e){e.a??=null,e.b??=null;let t=x("input",{type:"number",step:"any","aria-label":"Premier nombre",oninput:c=>o("a",c.target.value)}),n=x("input",{type:"number",step:"any","aria-label":"Deuxi\xE8me nombre",oninput:c=>o("b",c.target.value)}),s=x("p",{class:"hint-line","aria-live":"polite"}),r=x("output",{class:"screen"}),a=x("output",{class:"disk"});function o(c,u){e[c]=u===""?null:Number(u),e.calc=!1,e.shown=!1,e.saved=!1,l()}function l(){e.calc&&(e.res=e.a+e.b),r.textContent=e.shown?Gi(e.res):"\u2026",a.textContent=e.saved?"\u{1F4BE} somme.txt enregistr\xE9":"\u{1F4BE} (rien d\u2019enregistr\xE9)"}return i.append(x("div",{class:"flow"},x("div",{class:"blk"},x("h4",null,"\u2328 Entr\xE9e"),x("label",null,"Nombre 1 ",t),x("label",null,"Nombre 2 ",n)),x("div",{class:"arrow","aria-hidden":"true"},"\u2192"),x("div",{class:"blk"},x("h4",null,"\u2699 Traitement"),x("button",{type:"button",class:"btn small",onclick:()=>{e.a==null||e.b==null?s.textContent="Il faut d\u2019abord saisir les deux nombres.":(e.calc=!0,e.shown=!1,e.saved=!1,s.textContent="Somme calcul\xE9e dans le processeur."),l()}},"Additionner")),x("div",{class:"arrow","aria-hidden":"true"},"\u2192"),x("div",{class:"blk"},x("h4",null,"\u{1F5A5} Sortie"),r,x("button",{type:"button",class:"btn small",onclick:()=>{e.calc?(e.shown=!0,s.textContent=""):s.textContent="Rien \xE0 afficher : le traitement n\u2019a pas encore \xE9t\xE9 fait.",l()}},"Afficher")),x("div",{class:"blk"},x("h4",null,"\u{1F4BD} Stockage"),a,x("button",{type:"button",class:"btn small",onclick:()=>{e.calc?(e.saved=!0,s.textContent=""):s.textContent="Il n\u2019y a pas encore de r\xE9sultat \xE0 conserver.",l()}},"Enregistrer"))),s),l(),{refresh(){t.value=e.a??"",n.value=e.b??"",l()}}},window(i,e){e.state??="normal";let t=x("div",{class:"desk"}),n=x("div",{class:"tbar"}),s=a=>{e.state=a,r()};function r(){let a=e.state,o=x("div",{class:"mwin "+a,role:"group","aria-label":"Fen\xEAtre de d\xE9monstration"},x("div",{class:"mtitle"},x("span",null,"\u{1F4C4} Mon document"),x("span",{class:"mbtns"},x("button",{type:"button","aria-label":"R\xE9duire",onclick:()=>s("min")},"\u2013"),x("button",{type:"button","aria-label":a==="max"?"Restaurer":"Agrandir",onclick:()=>s(a==="max"?"normal":"max")},a==="max"?"\u2750":"\u25A1"),x("button",{type:"button","aria-label":"Fermer",class:"x",onclick:()=>s("closed")},"\u2715"))),x("div",{class:"mbody"},"Contenu du document\u2026"));t.replaceChildren(a==="closed"?x("div",{class:"closedmsg"},"La fen\xEAtre est ferm\xE9e.",x("button",{type:"button",class:"btn small",onclick:()=>s("normal")},"Rouvrir")):a==="min"?x("div",{class:"closedmsg"},"La fen\xEAtre est r\xE9duite : le programme continue dans la barre des t\xE2ches."):o),n.replaceChildren(x("span",{class:"start"},"\u229E"),a==="closed"?null:x("button",{type:"button",class:"tbtn"+(a!=="min"?" on":""),onclick:()=>s(a==="min"?"normal":"min")},"\u{1F4C4} Mon document"),x("span",{class:"clock"},"14:30"))}return i.append(t,n),r(),{refresh:r}},vending(i,e,t){let n=t.cfg.items;n.forEach(([l])=>{e[l]??=0}),e.total??=null;let s={},r=x("input",{type:"number",step:"any","aria-label":"Total \xE0 payer en dirhams",oninput:l=>{e.total=l.target.value===""?null:Number(l.target.value)}}),a=n.map(([l,c,u,h])=>(s[l]=x("output",{class:"count"},"0"),x("div",{class:"vrow"},x("span",{class:"ico"},h),x("span",{class:"lbl"},`${c} \u2014 ${u} DH`),x("button",{type:"button",class:"icon-btn","aria-label":`Retirer un ${c}`,onclick:()=>{e[l]=Math.max(0,e[l]-1),o()}},"\u2212"),s[l],x("button",{type:"button",class:"icon-btn","aria-label":`Ajouter un ${c}`,onclick:()=>{e[l]++,o()}},"+")))),o=()=>n.forEach(([l])=>{s[l].textContent=e[l]});return i.append(x("div",{class:"vend"},x("div",{class:"activity-hero vending-hero",role:"img","aria-label":"Illustration d\u2019un distributeur scolaire"}),a,x("label",{class:"vtot"},"Total \xE0 payer (DH) : ",r))),o(),{refresh(){o(),r.value=e.total??""}}},toggles(i,e,t){let n=t.cfg,s={},r=x("ul",{class:"status","aria-live":"polite"}),a=()=>{n.derive&&n.derive(e)},o=()=>{a();for(let[l]of n.items)s[l].checked=!!e[l];r.replaceChildren(...n.status(e).map(([l,c])=>x("li",{class:c?"ok":"ko"},(c?"\u2714 ":"\u2716 ")+l)))};return i.append(x("div",{class:"tgl"},n.items.map(([l,c,u])=>(s[l]=x("input",{type:"checkbox",onchange:h=>{e[l]=h.target.checked,o()}}),x("label",{class:"sw"},s[l],x("span",{class:"ico"},u),x("span",null,c))))),x("h4",{class:"small-h"},"\xC9tat du r\xE9seau"),r),o(),{refresh:o}},mail(i,e){e.to??="",e.subject??="",e.body??="",e.att??=!1,e.sent??=!1;let t=(u,h,p)=>(p.setAttribute("aria-label",h),p.addEventListener("input",g=>{e[u]=g.target.value,e.sent=!1,c()}),x("label",{class:"mrow"},x("span",null,h),p)),n=x("input",{type:"text",autocomplete:"off",placeholder:"adresse@ecole.exemple"}),s=x("input",{type:"text",autocomplete:"off"}),r=x("textarea",{rows:"5"}),a=x("p",{class:"hint-line","aria-live":"polite"}),o=x("button",{type:"button",class:"btn ghost small","aria-pressed":"false",onclick:()=>{e.att=!e.att,e.sent=!1,c()}}),l=x("button",{type:"button",class:"btn primary",onclick:()=>{e.to.trim()?e.subject.trim()?(e.sent=!0,a.textContent="Message simul\xE9 \xAB envoy\xE9 \xBB : rien n\u2019a quitt\xE9 cet ordinateur."):a.textContent="\xC9cris un objet pour que le destinataire comprenne le sujet.":a.textContent="Il manque l\u2019adresse du destinataire.",c()}},"\u2709 Envoyer");function c(){o.textContent=e.att?"\u{1F4CE} devoir.docx joint (retirer)":"\u{1F4CE} Joindre devoir.docx",o.setAttribute("aria-pressed",String(e.att))}return i.append(x("div",{class:"mailbox"},x("p",{class:"muted"},"Simulation : aucun message r\xE9el n\u2019est envoy\xE9 et aucune adresse r\xE9elle n\u2019est utilis\xE9e."),t("to","\xC0 (destinataire)",n),t("subject","Objet",s),t("body","Message",r),o,l,a)),c(),{refresh(){n.value=e.to,s.value=e.subject,r.value=e.body,c()}}},...Ld};function Ud(i,e){let t=JSON.parse(JSON.stringify(e.cfg?.init||{})),n=x("div",{class:"sim sim-"+e.view}),s=e.tasks.length,r=0,a=[],o=Km[e.view](n,t,{cfg:e.cfg||{}}),l=x("div",{class:"taskbox","aria-live":"polite"}),c=x("ul",{class:"steplog"}),u=x("button",{type:"button",class:"btn primary",onclick:p},"Valider l\u2019\xE9tape");function h(){l.replaceChildren(x("p",{class:"step-h"},r<s?`\xC9tape ${r+1} sur ${s}`:"Termin\xE9"),x("p",{class:"step-t"},r<s?e.tasks[r][0]:"Toutes les \xE9tapes sont faites : clique sur \xAB V\xE9rifier \xBB."),r<s?u:null)}function p(){if(r>=s)return;let g=e.tasks[r],v=Jm(g[1],t,o);a.push({ok:v,msg:g[0]+(g[2]?" \u2014 "+g[2]:"")}),c.append(x("li",{class:v?"ok":"ko"},(v?"\u2714 R\xE9ussi. ":"\u2716 Pas encore tout \xE0 fait. ")+(g[2]||""))),r++,h()}return i.append(l,n,c),h(),{check(){return r<s?{incomplete:`Valide d\u2019abord les ${s-r} \xE9tape(s) restante(s) de la simulation.`}:{correct:a.filter(g=>g.ok).length,total:s,items:a,unanswered:0}},reveal(){u.disabled=!0},solve(){for(;r<s;){let g=e.tasks[r],v=g[3];if(typeof v=="function")v(t,o);else if(v&&typeof v=="object")Object.assign(t,v);else if(typeof g[1]!="function")if(g[1].c)o.solveCell(g[1]);else for(let[m,d]of Object.entries(g[1]))t[m]=jm(d);o.refresh&&o.refresh(),p()}}}}var Qm={match:fd,sort:pd,order:md,fill:gd,quiz:xd,hot:bd,asm:Md,net:Sd,robot:Ya,prog:Id,sim:Ud},Gc=i=>Qm[i.split(":")[0]];function Nd(i,e){if(!e||e<=0)return 0;let t=Math.round(Math.max(0,i)/e*5*10)/10;return Math.min(5,Math.max(0,t))}function Fd(i){return i>=16?{label:"Tr\xE8s bien",tone:"top"}:i>=12?{label:"Bien",tone:"good"}:i>=10?{label:"En cours d\u2019acquisition",tone:"mid"}:{label:"\xC0 renforcer",tone:"low"}}var Er=i=>Math.round(i*10)/10,Wt=i=>String(Er(i)).replace(".",",");function Kn(i,e){let t=0,n=0,s=0,r=0;for(let o of i.acts){let l=e(o.id)?.attempts||[];l.length&&(s++,t+=l[0].score,n+=Math.max(...l.map(c=>c.score)),r+=l.length)}let a=i.acts.length;return{first:Er(t),best:Er(n),done:s,n:a,tries:r,status:s===0?"todo":s===a?"done":"doing",max:a*5}}function xi(i,e){let t=0,n=0,s=0,r=0,a=0;for(let o of i.sessions){let l=Kn(o,e);t+=l.best,n+=l.first,s+=l.done,r+=l.n,l.status==="done"&&a++}return{best:Er(t),first:Er(n),done:s,n:r,max:r*5,pct:r?Math.round(s/r*100):0,sessionsDone:a}}var Pi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Li={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bf=0,Pu=1,Mf=2;var Lu=1,nr=2,Xn=3,ai=0,Yt=1,sn=2,Nn=0,Ki=1,Di=2,Du=3,Uu=4,Sf=5,Ei=100,wf=101,Ef=102,Tf=103,Af=104,Cf=200,Rf=201,If=202,Pf=203,Io=204,Po=205,Lf=206,Df=207,Uf=208,Nf=209,Ff=210,Of=211,Bf=212,kf=213,zf=214,ul=0,hl=1,dl=2,Qi=3,fl=4,pl=5,ml=6,gl=7,Nu=0,Hf=1,Vf=2,ui=0,xl=1,vl=2,yl=3,Ui=4,_l=5,bl=6,Ml=7;var Fu=300,ds=301,fs=302,Sl=303,wl=304,ba=306,zs=1e3,wi=1001,Lo=1002,ln=1003,Gf=1004;var Ma=1005;var Ln=1006,El=1007;var Ni=1008;var Fn=1009,Ou=1010,Bu=1011,ir=1012,Tl=1013,Fi=1014,On=1015,wn=1016,Al=1017,Cl=1018,sr=1020,ku=35902,zu=35899,Hu=1021,Vu=1022,En=1023,Hs=1026,rr=1027,Rl=1028,Il=1029,Gu=1030,Pl=1031;var Ll=1033,Sa=33776,wa=33777,Ea=33778,Ta=33779,Dl=35840,Ul=35841,Nl=35842,Fl=35843,Ol=36196,Bl=37492,kl=37496,zl=37808,Hl=37809,Vl=37810,Gl=37811,ql=37812,Wl=37813,$l=37814,Xl=37815,Yl=37816,Zl=37817,jl=37818,Jl=37819,Kl=37820,Ql=37821,ec=36492,tc=36494,nc=36495,ic=36283,sc=36284,rc=36285,ac=36286;var Vr=2300,Do=2301,Ro=2302,vu=2400,yu=2401,_u=2402;var qf=3200,Wf=3201;var qu=0,$f=1,hi="",Bt="srgb",es="srgb-linear",Gr="linear",it="srgb";var Ji=7680;var bu=519,Xf=512,Yf=513,Zf=514,Wu=515,jf=516,Jf=517,Kf=518,Qf=519,Uo=35044;var $u="300 es",Pn=2e3,qr=2001;var qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Od=1234567,Br=Math.PI/180,Vs=180/Math.PI;function Gn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function Xu(i,e){return(i%e+e)%e}function eg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function tg(i,e,t){return i!==e?(t-i)/(e-i):0}function kr(i,e,t){return(1-t)*i+t*e}function ng(i,e,t,n){return kr(i,e,1-Math.exp(-t*n))}function ig(i,e=1){return e-Math.abs(Xu(i,e*2)-e)}function sg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function rg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ag(i,e){return i+Math.floor(Math.random()*(e-i+1))}function og(i,e){return i+Math.random()*(e-i)}function lg(i){return i*(.5-Math.random())}function cg(i){i!==void 0&&(Od=i);let e=Od+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ug(i){return i*Br}function hg(i){return i*Vs}function dg(i){return(i&i-1)===0&&i!==0}function fg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function pg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function mg(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),p=a((e-n)/2),g=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*h,l*p,o*c);break;case"YZY":i.set(l*p,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*p,o*u,o*c);break;case"XZX":i.set(o*u,l*v,l*g,o*c);break;case"YXY":i.set(l*g,o*u,l*v,o*c);break;case"ZYZ":i.set(l*v,l*g,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function In(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Yu={DEG2RAD:Br,RAD2DEG:Vs,generateUUID:Gn,clamp:je,euclideanModulo:Xu,mapLinear:eg,inverseLerp:tg,lerp:kr,damp:ng,pingpong:ig,smoothstep:sg,smootherstep:rg,randInt:ag,randFloat:og,randFloatSpread:lg,seededRandom:cg,degToRad:ug,radToDeg:hg,isPowerOfTwo:dg,ceilPowerOfTwo:fg,floorPowerOfTwo:pg,setQuaternionFromProperEuler:mg,normalize:lt,denormalize:In},ne=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Sn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],p=r[a+0],g=r[a+1],v=r[a+2],m=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=p,e[t+1]=g,e[t+2]=v,e[t+3]=m;return}if(h!==m||l!==p||c!==g||u!==v){let d=1-o,f=l*p+c*g+u*v+h*m,b=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){let w=Math.sqrt(M),C=Math.atan2(w,f*b);d=Math.sin(d*C)/w,o=Math.sin(o*C)/w}let y=o*b;if(l=l*d+p*y,c=c*d+g*y,u=u*d+v*y,h=h*d+m*y,d===1-o){let w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],p=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+u*h+l*g-c*p,e[t+1]=l*v+u*p+c*h-o*g,e[t+2]=c*v+u*g+o*p-l*h,e[t+3]=u*v-o*h-l*p-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),p=l(n/2),g=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=p*u*h+c*g*v,this._y=c*g*h-p*u*v,this._z=c*u*v+p*g*h,this._w=c*u*h-p*g*v;break;case"YXZ":this._x=p*u*h+c*g*v,this._y=c*g*h-p*u*v,this._z=c*u*v-p*g*h,this._w=c*u*h+p*g*v;break;case"ZXY":this._x=p*u*h-c*g*v,this._y=c*g*h+p*u*v,this._z=c*u*v+p*g*h,this._w=c*u*h-p*g*v;break;case"ZYX":this._x=p*u*h-c*g*v,this._y=c*g*h+p*u*v,this._z=c*u*v-p*g*h,this._w=c*u*h+p*g*v;break;case"YZX":this._x=p*u*h+c*g*v,this._y=c*g*h+p*u*v,this._z=c*u*v-p*g*h,this._w=c*u*h-p*g*v;break;case"XZY":this._x=p*u*h-c*g*v,this._y=c*g*h-p*u*v,this._z=c*u*v+p*g*h,this._w=c*u*h+p*g*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],p=n+o+h;if(p>0){let g=.5/Math.sqrt(p+1);this._w=.25/g,this._x=(u-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(n>o&&n>h){let g=2*Math.sqrt(1+n-o-h);this._w=(u-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>h){let g=2*Math.sqrt(1+o-n-h);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+u)/g}else{let g=2*Math.sqrt(1+h-n-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let g=1-t;return this._w=g*a+t*this._w,this._x=g*n+t*this._x,this._y=g*s+t*this._y,this._z=g*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,p=Math.sin(t*u)/c;return this._w=a*h+this._w*p,this._x=n*h+this._x*p,this._y=s*h+this._y*p,this._z=r*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qc.copy(this).projectOnVector(e),this.sub(qc)}reflect(e){return this.sub(qc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},qc=new D,Bd=new Sn,Ze=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],p=n[2],g=n[5],v=n[8],m=s[0],d=s[3],f=s[6],b=s[1],M=s[4],y=s[7],w=s[2],C=s[5],L=s[8];return r[0]=a*m+o*b+l*w,r[3]=a*d+o*M+l*C,r[6]=a*f+o*y+l*L,r[1]=c*m+u*b+h*w,r[4]=c*d+u*M+h*C,r[7]=c*f+u*y+h*L,r[2]=p*m+g*b+v*w,r[5]=p*d+g*M+v*C,r[8]=p*f+g*y+v*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,p=o*l-u*r,g=c*r-a*l,v=t*h+n*p+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/v;return e[0]=h*m,e[1]=(s*c-u*n)*m,e[2]=(o*n-s*a)*m,e[3]=p*m,e[4]=(u*t-s*l)*m,e[5]=(s*r-o*t)*m,e[6]=g*m,e[7]=(n*l-c*t)*m,e[8]=(a*t-n*r)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Wc.makeScale(e,t)),this}rotate(e){return this.premultiply(Wc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Wc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Wc=new Ze;function Zu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ep(){let i=Wr("canvas");return i.style.display="block",i}var kd={};function Gs(i){i in kd||(kd[i]=!0,console.warn(i))}function tp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var zd=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hd=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gg(){let i={enabled:!0,workingColorSpace:es,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===it&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(s.r=ks(s.r),s.g=ks(s.g),s.b=ks(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===hi?Gr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[es]:{primaries:e,whitePoint:n,transfer:Gr,toXYZ:zd,fromXYZ:Hd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:zd,fromXYZ:Hd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),i}var et=gg();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ms,No=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=Wr("canvas")),Ms.width=e.width,Ms.height=e.height;let s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Wr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ri(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},xg=0,qs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=Gn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($c(s[a].image)):r.push($c(s[a]))}else r=$c(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function $c(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?No.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var vg=0,Xc=new D,nn=class i extends qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=wi,s=wi,r=Ln,a=Ni,o=En,l=Fn,c=i.DEFAULT_ANISOTROPY,u=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Gn(),this.name="",this.source=new qs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Xc).x}get height(){return this.source.getSize(Xc).y}get depth(){return this.source.getSize(Xc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zs:e.x=e.x-Math.floor(e.x);break;case wi:e.x=e.x<0?0:1;break;case Lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zs:e.y=e.y-Math.floor(e.y);break;case wi:e.y=e.y<0?0:1;break;case Lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Fu;nn.DEFAULT_ANISOTROPY=1;var ct=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],p=l[1],g=l[5],v=l[9],m=l[2],d=l[6],f=l[10];if(Math.abs(u-p)<.01&&Math.abs(h-m)<.01&&Math.abs(v-d)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+m)<.1&&Math.abs(v+d)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,y=(g+1)/2,w=(f+1)/2,C=(u+p)/4,L=(h+m)/4,T=(v+d)/4;return M>y&&M>w?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=C/n,r=L/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=C/s,r=T/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=L/r,s=T/r),this.set(n,s,r,t),this}let b=Math.sqrt((d-v)*(d-v)+(h-m)*(h-m)+(p-u)*(p-u));return Math.abs(b)<.001&&(b=1),this.x=(d-v)/b,this.y=(h-m)/b,this.z=(p-u)/b,this.w=Math.acos((c+g+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Fo=class extends qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new nn(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Ln,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new qs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kt=class extends Fo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$r=class extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oo=class extends nn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wn=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qa.copy(n.boundingBox)),Qa.applyMatrix4(e.matrixWorld),this.union(Qa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),eo.subVectors(this.max,Tr),Ss.subVectors(e.a,Tr),ws.subVectors(e.b,Tr),Es.subVectors(e.c,Tr),vi.subVectors(ws,Ss),yi.subVectors(Es,ws),Xi.subVectors(Ss,Es);let t=[0,-vi.z,vi.y,0,-yi.z,yi.y,0,-Xi.z,Xi.y,vi.z,0,-vi.x,yi.z,0,-yi.x,Xi.z,0,-Xi.x,-vi.y,vi.x,0,-yi.y,yi.x,0,-Xi.y,Xi.x,0];return!Yc(t,Ss,ws,Es,eo)||(t=[1,0,0,0,1,0,0,0,1],!Yc(t,Ss,ws,Es,eo))?!1:(to.crossVectors(vi,yi),t=[to.x,to.y,to.z],Yc(t,Ss,ws,Es,eo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new D,new D,new D,new D,new D,new D,new D,new D],An=new D,Qa=new Wn,Ss=new D,ws=new D,Es=new D,vi=new D,yi=new D,Xi=new D,Tr=new D,eo=new D,to=new D,Yi=new D;function Yc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Yi.fromArray(i,r);let o=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),l=e.dot(Yi),c=t.dot(Yi),u=n.dot(Yi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var yg=new Wn,Ar=new D,Zc=new D,$n=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):yg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);let t=Ar.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(Zc)),this.expandByPoint(Ar.copy(e.center).sub(Zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ei=new D,jc=new D,no=new D,_i=new D,Jc=new D,io=new D,Kc=new D,oi=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){jc.copy(e).add(t).multiplyScalar(.5),no.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(jc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(no),o=_i.dot(this.direction),l=-_i.dot(no),c=_i.lengthSq(),u=Math.abs(1-a*a),h,p,g,v;if(u>0)if(h=a*l-o,p=a*o-l,v=r*u,h>=0)if(p>=-v)if(p<=v){let m=1/u;h*=m,p*=m,g=h*(h+a*p+2*o)+p*(a*h+p+2*l)+c}else p=r,h=Math.max(0,-(a*p+o)),g=-h*h+p*(p+2*l)+c;else p=-r,h=Math.max(0,-(a*p+o)),g=-h*h+p*(p+2*l)+c;else p<=-v?(h=Math.max(0,-(-a*r+o)),p=h>0?-r:Math.min(Math.max(-r,-l),r),g=-h*h+p*(p+2*l)+c):p<=v?(h=0,p=Math.min(Math.max(-r,-l),r),g=p*(p+2*l)+c):(h=Math.max(0,-(a*r+o)),p=h>0?r:Math.min(Math.max(-r,-l),r),g=-h*h+p*(p+2*l)+c);else p=a>0?-r:r,h=Math.max(0,-(a*p+o)),g=-h*h+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(jc).addScaledVector(no,p),g}intersectSphere(e,t){ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),s=ei.dot(ei)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,s=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,s=(e.min.x-p.x)*c),u>=0?(r=(e.min.y-p.y)*u,a=(e.max.y-p.y)*u):(r=(e.max.y-p.y)*u,a=(e.min.y-p.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(o=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,s,r){Jc.subVectors(t,e),io.subVectors(n,e),Kc.crossVectors(Jc,io);let a=this.direction.dot(Kc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);let l=o*this.direction.dot(io.crossVectors(_i,io));if(l<0)return null;let c=o*this.direction.dot(Jc.cross(_i));if(c<0||l+c>a)return null;let u=-o*_i.dot(Kc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},rt=class i{constructor(e,t,n,s,r,a,o,l,c,u,h,p,g,v,m,d){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,p,g,v,m,d)}set(e,t,n,s,r,a,o,l,c,u,h,p,g,v,m,d){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=p,f[3]=g,f[7]=v,f[11]=m,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Ts.setFromMatrixColumn(e,0).length(),r=1/Ts.setFromMatrixColumn(e,1).length(),a=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let p=a*u,g=a*h,v=o*u,m=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=g+v*c,t[5]=p-m*c,t[9]=-o*l,t[2]=m-p*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){let p=l*u,g=l*h,v=c*u,m=c*h;t[0]=p+m*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=g*o-v,t[6]=m+p*o,t[10]=a*l}else if(e.order==="ZXY"){let p=l*u,g=l*h,v=c*u,m=c*h;t[0]=p-m*o,t[4]=-a*h,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*u,t[9]=m-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let p=a*u,g=a*h,v=o*u,m=o*h;t[0]=l*u,t[4]=v*c-g,t[8]=p*c+m,t[1]=l*h,t[5]=m*c+p,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let p=a*l,g=a*c,v=o*l,m=o*c;t[0]=l*u,t[4]=m-p*h,t[8]=v*h+g,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=g*h+v,t[10]=p-m*h}else if(e.order==="XZY"){let p=a*l,g=a*c,v=o*l,m=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=p*h+m,t[5]=a*u,t[9]=g*h-v,t[2]=v*h-g,t[6]=o*u,t[10]=m*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_g,e,bg)}lookAt(e,t,n){let s=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),bi.crossVectors(n,fn),bi.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),bi.crossVectors(n,fn)),bi.normalize(),so.crossVectors(fn,bi),s[0]=bi.x,s[4]=so.x,s[8]=fn.x,s[1]=bi.y,s[5]=so.y,s[9]=fn.y,s[2]=bi.z,s[6]=so.z,s[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],p=n[9],g=n[13],v=n[2],m=n[6],d=n[10],f=n[14],b=n[3],M=n[7],y=n[11],w=n[15],C=s[0],L=s[4],T=s[8],S=s[12],_=s[1],I=s[5],O=s[9],G=s[13],j=s[2],K=s[6],J=s[10],le=s[14],X=s[3],he=s[7],Me=s[11],we=s[15];return r[0]=a*C+o*_+l*j+c*X,r[4]=a*L+o*I+l*K+c*he,r[8]=a*T+o*O+l*J+c*Me,r[12]=a*S+o*G+l*le+c*we,r[1]=u*C+h*_+p*j+g*X,r[5]=u*L+h*I+p*K+g*he,r[9]=u*T+h*O+p*J+g*Me,r[13]=u*S+h*G+p*le+g*we,r[2]=v*C+m*_+d*j+f*X,r[6]=v*L+m*I+d*K+f*he,r[10]=v*T+m*O+d*J+f*Me,r[14]=v*S+m*G+d*le+f*we,r[3]=b*C+M*_+y*j+w*X,r[7]=b*L+M*I+y*K+w*he,r[11]=b*T+M*O+y*J+w*Me,r[15]=b*S+M*G+y*le+w*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],p=e[10],g=e[14],v=e[3],m=e[7],d=e[11],f=e[15];return v*(+r*l*h-s*c*h-r*o*p+n*c*p+s*o*g-n*l*g)+m*(+t*l*g-t*c*p+r*a*p-s*a*g+s*c*u-r*l*u)+d*(+t*c*h-t*o*g-r*a*h+n*a*g+r*o*u-n*c*u)+f*(-s*o*u-t*l*h+t*o*p+s*a*h-n*a*p+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],p=e[10],g=e[11],v=e[12],m=e[13],d=e[14],f=e[15],b=h*d*c-m*p*c+m*l*g-o*d*g-h*l*f+o*p*f,M=v*p*c-u*d*c-v*l*g+a*d*g+u*l*f-a*p*f,y=u*m*c-v*h*c+v*o*g-a*m*g-u*o*f+a*h*f,w=v*h*l-u*m*l-v*o*p+a*m*p+u*o*d-a*h*d,C=t*b+n*M+s*y+r*w;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/C;return e[0]=b*L,e[1]=(m*p*r-h*d*r-m*s*g+n*d*g+h*s*f-n*p*f)*L,e[2]=(o*d*r-m*l*r+m*s*c-n*d*c-o*s*f+n*l*f)*L,e[3]=(h*l*r-o*p*r-h*s*c+n*p*c+o*s*g-n*l*g)*L,e[4]=M*L,e[5]=(u*d*r-v*p*r+v*s*g-t*d*g-u*s*f+t*p*f)*L,e[6]=(v*l*r-a*d*r-v*s*c+t*d*c+a*s*f-t*l*f)*L,e[7]=(a*p*r-u*l*r+u*s*c-t*p*c-a*s*g+t*l*g)*L,e[8]=y*L,e[9]=(v*h*r-u*m*r-v*n*g+t*m*g+u*n*f-t*h*f)*L,e[10]=(a*m*r-v*o*r+v*n*c-t*m*c-a*n*f+t*o*f)*L,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*g-t*o*g)*L,e[12]=w*L,e[13]=(u*m*s-v*h*s+v*n*p-t*m*p-u*n*d+t*h*d)*L,e[14]=(v*o*s-a*m*s-v*n*l+t*m*l+a*n*d-t*o*d)*L,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*p+t*o*p)*L,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,p=r*c,g=r*u,v=r*h,m=a*u,d=a*h,f=o*h,b=l*c,M=l*u,y=l*h,w=n.x,C=n.y,L=n.z;return s[0]=(1-(m+f))*w,s[1]=(g+y)*w,s[2]=(v-M)*w,s[3]=0,s[4]=(g-y)*C,s[5]=(1-(p+f))*C,s[6]=(d+b)*C,s[7]=0,s[8]=(v+M)*L,s[9]=(d-b)*L,s[10]=(1-(p+m))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Ts.set(s[0],s[1],s[2]).length(),a=Ts.set(s[4],s[5],s[6]).length(),o=Ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Cn.copy(this);let c=1/r,u=1/a,h=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=h,Cn.elements[9]*=h,Cn.elements[10]*=h,t.setFromRotationMatrix(Cn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Pn,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-s),p=(t+e)/(t-e),g=(n+s)/(n-s),v,m;if(l)v=r/(a-r),m=a*r/(a-r);else if(o===Pn)v=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===qr)v=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=h,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Pn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-s),p=-(t+e)/(t-e),g=-(n+s)/(n-s),v,m;if(l)v=1/(a-r),m=a/(a-r);else if(o===Pn)v=-2/(a-r),m=-(a+r)/(a-r);else if(o===qr)v=-1/(a-r),m=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=h,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ts=new D,Cn=new rt,_g=new D(0,0,0),bg=new D(1,1,1),bi=new D,so=new D,fn=new D,Vd=new rt,Gd=new Sn,Dn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],p=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gd.setFromEuler(this),this.setFromQuaternion(Gd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Dn.DEFAULT_ORDER="XYZ";var Ws=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Mg=0,qd=new D,As=new Sn,ti=new rt,ro=new D,Cr=new D,Sg=new D,wg=new Sn,Wd=new D(1,0,0),$d=new D(0,1,0),Xd=new D(0,0,1),Yd={type:"added"},Eg={type:"removed"},Cs={type:"childadded",child:null},Qc={type:"childremoved",child:null},Rt=class i extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new Dn,n=new Sn,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ze}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(Wd,e)}rotateY(e){return this.rotateOnAxis($d,e)}rotateZ(e){return this.rotateOnAxis(Xd,e)}translateOnAxis(e,t){return qd.copy(e).applyQuaternion(this.quaternion),this.position.add(qd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wd,e)}translateY(e){return this.translateOnAxis($d,e)}translateZ(e){return this.translateOnAxis(Xd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ro.copy(e):ro.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(Cr,ro,this.up):ti.lookAt(ro,Cr,this.up),this.quaternion.setFromRotationMatrix(ti),s&&(ti.extractRotation(s.matrixWorld),As.setFromRotationMatrix(ti),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yd),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Eg),Qc.child=e,this.dispatchEvent(Qc),Qc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yd),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,e,Sg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,wg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),p=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Rt.DEFAULT_UP=new D(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=new D,ni=new D,eu=new D,ii=new D,Rs=new D,Is=new D,Zd=new D,tu=new D,nu=new D,iu=new D,su=new ct,ru=new ct,au=new ct,si=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Rn.subVectors(e,t),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Rn.subVectors(s,t),ni.subVectors(n,t),eu.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(ni),l=Rn.dot(eu),c=ni.dot(ni),u=ni.dot(eu),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let p=1/h,g=(c*l-o*u)*p,v=(a*u-o*l)*p;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ii.x),l.addScaledVector(a,ii.y),l.addScaledVector(o,ii.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return su.setScalar(0),ru.setScalar(0),au.setScalar(0),su.fromBufferAttribute(e,t),ru.fromBufferAttribute(e,n),au.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(su,r.x),a.addScaledVector(ru,r.y),a.addScaledVector(au,r.z),a}static isFrontFacing(e,t,n,s){return Rn.subVectors(n,t),ni.subVectors(e,t),Rn.cross(ni).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),Rn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Rs.subVectors(s,n),Is.subVectors(r,n),tu.subVectors(e,n);let l=Rs.dot(tu),c=Is.dot(tu);if(l<=0&&c<=0)return t.copy(n);nu.subVectors(e,s);let u=Rs.dot(nu),h=Is.dot(nu);if(u>=0&&h<=u)return t.copy(s);let p=l*h-u*c;if(p<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Rs,a);iu.subVectors(e,r);let g=Rs.dot(iu),v=Is.dot(iu);if(v>=0&&g<=v)return t.copy(r);let m=g*c-l*v;if(m<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(Is,o);let d=u*v-g*h;if(d<=0&&h-u>=0&&g-v>=0)return Zd.subVectors(r,s),o=(h-u)/(h-u+(g-v)),t.copy(s).addScaledVector(Zd,o);let f=1/(d+m+p);return a=m*f,o=p*f,t.copy(n).addScaledVector(Rs,a).addScaledVector(Is,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},np={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},ao={h:0,s:0,l:0};function ou(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Xu(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ou(a,r,e+1/3),this.g=ou(a,r,e),this.b=ou(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Bt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){let n=np[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return et.workingToColorSpace(Jt.copy(this),e),Math.round(je(Jt.r*255,0,255))*65536+Math.round(je(Jt.g*255,0,255))*256+Math.round(je(Jt.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Jt.copy(this),t);let n=Jt.r,s=Jt.g,r=Jt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Bt){et.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,n=Jt.g,s=Jt.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(ao);let n=kr(Mi.h,ao.h,t),s=kr(Mi.s,ao.s,t),r=kr(Mi.l,ao.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new Oe;Oe.NAMES=np;var Tg=0,Un=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Gn(),this.name="",this.type="Material",this.blending=Ki,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Po,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Io&&(n.blendSrc=this.blendSrc),this.blendDst!==Po&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},cn=class extends Un{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=Nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Dt=new D,oo=new ne,Ag=0,Ut=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ag++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Uo,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oo.fromBufferAttribute(this,t),oo.applyMatrix3(e),this.setXY(t,oo.x,oo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=In(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=In(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=In(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=In(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uo&&(e.usage=this.usage),e}};var Xr=class extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Yr=class extends Ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var tt=class extends Ut{constructor(e,t,n){super(new Float32Array(e),t,n)}},Cg=0,bn=new rt,lu=new Rt,Ps=new D,pn=new Wn,Rr=new Wn,$t=new D,xt=class i extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zu(e)?Yr:Xr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return lu.lookAt(e),lu.updateMatrix(),this.applyMatrix4(lu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new tt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Rr.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(pn.min,Rr.min),pn.expandByPoint($t),$t.addVectors(pn.max,Rr.max),pn.expandByPoint($t)):(pn.expandByPoint(Rr.min),pn.expandByPoint(Rr.max))}pn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared($t));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)$t.fromBufferAttribute(o,c),l&&(Ps.fromBufferAttribute(e,c),$t.add(Ps)),s=Math.max(s,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ut(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<n.count;T++)o[T]=new D,l[T]=new D;let c=new D,u=new D,h=new D,p=new ne,g=new ne,v=new ne,m=new D,d=new D;function f(T,S,_){c.fromBufferAttribute(n,T),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,_),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,S),v.fromBufferAttribute(r,_),u.sub(c),h.sub(c),g.sub(p),v.sub(p);let I=1/(g.x*v.y-v.x*g.y);isFinite(I)&&(m.copy(u).multiplyScalar(v.y).addScaledVector(h,-g.y).multiplyScalar(I),d.copy(h).multiplyScalar(g.x).addScaledVector(u,-v.x).multiplyScalar(I),o[T].add(m),o[S].add(m),o[_].add(m),l[T].add(d),l[S].add(d),l[_].add(d))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let T=0,S=b.length;T<S;++T){let _=b[T],I=_.start,O=_.count;for(let G=I,j=I+O;G<j;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let M=new D,y=new D,w=new D,C=new D;function L(T){w.fromBufferAttribute(s,T),C.copy(w);let S=o[T];M.copy(S),M.sub(w.multiplyScalar(w.dot(S))).normalize(),y.crossVectors(C,S);let I=y.dot(l[T])<0?-1:1;a.setXYZW(T,M.x,M.y,M.z,I)}for(let T=0,S=b.length;T<S;++T){let _=b[T],I=_.start,O=_.count;for(let G=I,j=I+O;G<j;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,g=n.count;p<g;p++)n.setXYZ(p,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let p=0,g=e.count;p<g;p+=3){let v=e.getX(p+0),m=e.getX(p+1),d=e.getX(p+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,d),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,d),o.add(u),l.add(u),c.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let p=0,g=t.count;p<g;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,p=new c.constructor(l.length*u),g=0,v=0;for(let m=0,d=l.length;m<d;m++){o.isInterleavedBufferAttribute?g=l[m]*o.data.stride+o.offset:g=l[m]*u;for(let f=0;f<u;f++)p[v++]=c[g++]}return new Ut(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let p=c[u],g=e(p,n);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,p=c.length;h<p;h++){let g=c[h];u.push(g.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let p=0,g=h.length;p<g;p++)u.push(h[p].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},jd=new rt,Zi=new oi,lo=new $n,Jd=new D,co=new D,uo=new D,ho=new D,cu=new D,fo=new D,Kd=new D,po=new D,Ke=class extends Rt{constructor(e=new xt,t=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){fo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(cu.fromBufferAttribute(h,e),a?fo.addScaledVector(cu,u):fo.addScaledVector(cu.sub(t),u))}t.add(fo)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(lo.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(lo,Jd)===null||Zi.origin.distanceToSquared(Jd)>(e.far-e.near)**2))&&(jd.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(jd),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,p=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,m=p.length;v<m;v++){let d=p[v],f=a[d.materialIndex],b=Math.max(d.start,g.start),M=Math.min(o.count,Math.min(d.start+d.count,g.start+g.count));for(let y=b,w=M;y<w;y+=3){let C=o.getX(y),L=o.getX(y+1),T=o.getX(y+2);s=mo(this,f,e,n,c,u,h,C,L,T),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),m=Math.min(o.count,g.start+g.count);for(let d=v,f=m;d<f;d+=3){let b=o.getX(d),M=o.getX(d+1),y=o.getX(d+2);s=mo(this,a,e,n,c,u,h,b,M,y),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,m=p.length;v<m;v++){let d=p[v],f=a[d.materialIndex],b=Math.max(d.start,g.start),M=Math.min(l.count,Math.min(d.start+d.count,g.start+g.count));for(let y=b,w=M;y<w;y+=3){let C=y,L=y+1,T=y+2;s=mo(this,f,e,n,c,u,h,C,L,T),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),m=Math.min(l.count,g.start+g.count);for(let d=v,f=m;d<f;d+=3){let b=d,M=d+1,y=d+2;s=mo(this,a,e,n,c,u,h,b,M,y),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}};function Rg(i,e,t,n,s,r,a,o){let l;if(e.side===Yt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ai,o),l===null)return null;po.copy(o),po.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(po);return c<t.near||c>t.far?null:{distance:c,point:po.clone(),object:i}}function mo(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,co),i.getVertexPosition(l,uo),i.getVertexPosition(c,ho);let u=Rg(i,e,t,n,co,uo,ho,Kd);if(u){let h=new D;si.getBarycoord(Kd,co,uo,ho,h),s&&(u.uv=si.getInterpolatedAttribute(s,o,l,c,h,new ne)),r&&(u.uv1=si.getInterpolatedAttribute(r,o,l,c,h,new ne)),a&&(u.normal=si.getInterpolatedAttribute(a,o,l,c,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let p={a:o,b:l,c,normal:new D,materialIndex:0};si.getNormal(co,uo,ho,p.normal),u.face=p,u.barycoord=h}return u}var vt=class i extends xt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],p=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(h,2));function v(m,d,f,b,M,y,w,C,L,T,S){let _=y/L,I=w/T,O=y/2,G=w/2,j=C/2,K=L+1,J=T+1,le=0,X=0,he=new D;for(let Me=0;Me<J;Me++){let we=Me*I-G;for(let ae=0;ae<K;ae++){let Ae=ae*_-O;he[m]=Ae*b,he[d]=we*M,he[f]=j,c.push(he.x,he.y,he.z),he[m]=0,he[d]=0,he[f]=C>0?1:-1,u.push(he.x,he.y,he.z),h.push(ae/L),h.push(1-Me/T),le+=1}}for(let Me=0;Me<T;Me++)for(let we=0;we<L;we++){let ae=p+we+K*Me,Ae=p+we+K*(Me+1),ke=p+(we+1)+K*(Me+1),$e=p+(we+1)+K*Me;l.push(ae,Ae,$e),l.push(Ae,ke,$e),X+=6}o.addGroup(g,X,S),g+=X,p+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ps(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Qt(i){let e={};for(let t=0;t<i.length;t++){let n=ps(i[t]);for(let s in n)e[s]=n[s]}return e}function Ig(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ju(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}var di={clone:ps,merge:Qt},Pg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Tt=class extends Un{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pg,this.fragmentShader=Lg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ps(e.uniforms),this.uniformsGroups=Ig(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Zr=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Si=new D,Qd=new ne,ef=new ne,kt=class extends Zr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,Qd,ef),t.subVectors(ef,Qd)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Br*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ls=-90,Ds=1,Bo=class extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new kt(Ls,Ds,e,t);s.layers=this.layers,this.add(s);let r=new kt(Ls,Ds,e,t);r.layers=this.layers,this.add(r);let a=new kt(Ls,Ds,e,t);a.layers=this.layers,this.add(a);let o=new kt(Ls,Ds,e,t);o.layers=this.layers,this.add(o);let l=new kt(Ls,Ds,e,t);l.layers=this.layers,this.add(l);let c=new kt(Ls,Ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===qr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,p,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}},jr=class extends nn{constructor(e=[],t=ds,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ko=class extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new jr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new vt(5,5,5),r=new Tt({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:Nn});r.uniforms.tEquirect.value=t;let a=new Ke(s,r),o=t.minFilter;return t.minFilter===Ni&&(t.minFilter=Ln),new Bo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Mt=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Dg={type:"move"},$s=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let m of e.hand.values()){let d=t.getJointPose(m,n),f=this._getHandJoint(c,m);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=u.position.distanceTo(h.position),g=.02,v=.005;c.inputState.pinching&&p>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Jr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ts=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},zo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Uo,this.updateRanges=[],this.version=0,this.uuid=Gn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},tn=new D,Kr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=In(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=In(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=In(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=In(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=In(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ti=class extends Un{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Us,Ir=new D,Ns=new D,Fs=new D,Os=new ne,Pr=new ne,ip=new rt,go=new D,Lr=new D,xo=new D,tf=new ne,uu=new ne,nf=new ne,ns=class extends Rt{constructor(e=new Ti){if(super(),this.isSprite=!0,this.type="Sprite",Us===void 0){Us=new xt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zo(t,5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute("position",new Kr(n,3,0,!1)),Us.setAttribute("uv",new Kr(n,2,3,!1))}this.geometry=Us,this.material=e,this.center=new ne(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ns.setFromMatrixScale(this.matrixWorld),ip.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Fs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ns.multiplyScalar(-Fs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;vo(go.set(-.5,-.5,0),Fs,a,Ns,s,r),vo(Lr.set(.5,-.5,0),Fs,a,Ns,s,r),vo(xo.set(.5,.5,0),Fs,a,Ns,s,r),tf.set(0,0),uu.set(1,0),nf.set(1,1);let o=e.ray.intersectTriangle(go,Lr,xo,!1,Ir);if(o===null&&(vo(Lr.set(-.5,.5,0),Fs,a,Ns,s,r),uu.set(0,1),o=e.ray.intersectTriangle(go,xo,Lr,!1,Ir),o===null))return;let l=e.ray.origin.distanceTo(Ir);l<e.near||l>e.far||t.push({distance:l,point:Ir.clone(),uv:si.getInterpolation(Ir,go,Lr,xo,tf,uu,nf,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function vo(i,e,t,n,s,r){Os.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Pr.x=r*Os.x-s*Os.y,Pr.y=s*Os.x+r*Os.y):Pr.copy(Os),i.copy(e),i.x+=Pr.x,i.y+=Pr.y,i.applyMatrix4(ip)}var Ho=class extends nn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=ln,u=ln,h,p){super(null,a,o,l,c,u,s,r,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qr=class extends Ut{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Bs=new rt,sf=new rt,yo=[],rf=new Wn,Ug=new rt,Dr=new Ke,Ur=new $n,ea=class extends Ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ug)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Bs),rf.copy(e.boundingBox).applyMatrix4(Bs),this.boundingBox.union(rf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new $n),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Bs),Ur.copy(e.boundingSphere).applyMatrix4(Bs),this.boundingSphere.union(Ur)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Dr.geometry=this.geometry,Dr.material=this.material,Dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ur.copy(this.boundingSphere),Ur.applyMatrix4(n),e.ray.intersectsSphere(Ur)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Bs),sf.multiplyMatrices(n,Bs),Dr.matrixWorld=sf,Dr.raycast(e,yo);for(let a=0,o=yo.length;a<o;a++){let l=yo[a];l.instanceId=r,l.object=this,t.push(l)}yo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Qr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ho(new Float32Array(s*this.count),s,this.count,Rl,On));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},hu=new D,Ng=new D,Fg=new Ze,Mn=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=hu.subVectors(n,t).cross(Ng.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(hu),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fg.getNormalMatrix(e),s=this.coplanarPoint(hu).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ji=new $n,Og=new ne(.5,.5),_o=new D,Xs=class{constructor(e=new Mn,t=new Mn,n=new Mn,s=new Mn,r=new Mn,a=new Mn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],p=r[6],g=r[7],v=r[8],m=r[9],d=r[10],f=r[11],b=r[12],M=r[13],y=r[14],w=r[15];if(s[0].setComponents(c-a,g-u,f-v,w-b).normalize(),s[1].setComponents(c+a,g+u,f+v,w+b).normalize(),s[2].setComponents(c+o,g+h,f+m,w+M).normalize(),s[3].setComponents(c-o,g-h,f-m,w-M).normalize(),n)s[4].setComponents(l,p,d,y).normalize(),s[5].setComponents(c-l,g-p,f-d,w-y).normalize();else if(s[4].setComponents(c-l,g-p,f-d,w-y).normalize(),t===Pn)s[5].setComponents(c+l,g+p,f+d,w+y).normalize();else if(t===qr)s[5].setComponents(l,p,d,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){ji.center.set(0,0,0);let t=Og.distanceTo(e.center);return ji.radius=.7071067811865476+t,ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(_o.x=s.normal.x>0?e.max.x:e.min.x,_o.y=s.normal.y>0?e.max.y:e.min.y,_o.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(_o)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ys=class extends Un{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Vo=new D,Go=new D,af=new rt,Nr=new oi,bo=new $n,du=new D,of=new D,qo=class extends Rt{constructor(e=new xt,t=new Ys){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Vo.fromBufferAttribute(t,s-1),Go.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Vo.distanceTo(Go);e.setAttribute("lineDistance",new tt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bo.copy(n.boundingSphere),bo.applyMatrix4(s),bo.radius+=r,e.ray.intersectsSphere(bo)===!1)return;af.copy(s).invert(),Nr.copy(e.ray).applyMatrix4(af);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){let g=Math.max(0,a.start),v=Math.min(u.count,a.start+a.count);for(let m=g,d=v-1;m<d;m+=c){let f=u.getX(m),b=u.getX(m+1),M=Mo(this,e,Nr,l,f,b,m);M&&t.push(M)}if(this.isLineLoop){let m=u.getX(v-1),d=u.getX(g),f=Mo(this,e,Nr,l,m,d,v-1);f&&t.push(f)}}else{let g=Math.max(0,a.start),v=Math.min(p.count,a.start+a.count);for(let m=g,d=v-1;m<d;m+=c){let f=Mo(this,e,Nr,l,m,m+1,m);f&&t.push(f)}if(this.isLineLoop){let m=Mo(this,e,Nr,l,v-1,g,v-1);m&&t.push(m)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Mo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Vo.fromBufferAttribute(o,s),Go.fromBufferAttribute(o,r),t.distanceSqToSegment(Vo,Go,du,of)>n)return;du.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(du);if(!(c<e.near||c>e.far))return{distance:c,point:of.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var lf=new D,cf=new D,ta=class extends qo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)lf.fromBufferAttribute(t,s),cf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+lf.distanceTo(cf);e.setAttribute("lineDistance",new tt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ai=class extends Un{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},uf=new rt,Mu=new oi,So=new $n,wo=new D,is=class extends Rt{constructor(e=new xt,t=new Ai){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),So.copy(n.boundingSphere),So.applyMatrix4(s),So.radius+=r,e.ray.intersectsSphere(So)===!1)return;uf.copy(s).invert(),Mu.copy(e.ray).applyMatrix4(uf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let p=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let v=p,m=g;v<m;v++){let d=c.getX(v);wo.fromBufferAttribute(h,d),hf(wo,d,l,s,e,t,this)}}else{let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,m=g;v<m;v++)wo.fromBufferAttribute(h,v),hf(wo,v,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function hf(i,e,t,n,s,r,a){let o=Mu.distanceSqToPoint(i);if(o<t){let l=new D;Mu.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var na=class extends nn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ia=class extends nn{constructor(e,t,n=Fi,s,r,a,o=ln,l=ln,c,u=Hs,h=1){if(u!==Hs&&u!==rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let p={width:e,height:t,depth:h};super(p,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},sa=class extends nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Zs=class i extends xt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],u=t/2,h=Math.PI/2*e,p=t,g=2*h+p,v=n*2+r,m=s+1,d=new D,f=new D;for(let b=0;b<=v;b++){let M=0,y=0,w=0,C=0;if(b<=n){let S=b/n,_=S*Math.PI/2;y=-u-e*Math.cos(_),w=e*Math.sin(_),C=-e*Math.cos(_),M=S*h}else if(b<=n+r){let S=(b-n)/r;y=-u+S*t,w=e,C=0,M=h+S*p}else{let S=(b-n-r)/n,_=S*Math.PI/2;y=u+e*Math.sin(_),w=e*Math.cos(_),C=e*Math.sin(_),M=h+p+S*h}let L=Math.max(0,Math.min(1,M/g)),T=0;b===0?T=.5/s:b===v&&(T=-.5/s);for(let S=0;S<=s;S++){let _=S/s,I=_*Math.PI*2,O=Math.sin(I),G=Math.cos(I);f.x=-w*G,f.y=y,f.z=w*O,o.push(f.x,f.y,f.z),d.set(-w*G,C,w*O),d.normalize(),l.push(d.x,d.y,d.z),c.push(_+T,L)}if(b>0){let S=(b-1)*m;for(let _=0;_<s;_++){let I=S+_,O=S+_+1,G=b*m+_,j=b*m+_+1;a.push(I,O,G),a.push(O,j,G)}}}this.setIndex(a),this.setAttribute("position",new tt(o,3)),this.setAttribute("normal",new tt(l,3)),this.setAttribute("uv",new tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var zt=class i extends xt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],p=[],g=[],v=0,m=[],d=n/2,f=0;b(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new tt(h,3)),this.setAttribute("normal",new tt(p,3)),this.setAttribute("uv",new tt(g,2));function b(){let y=new D,w=new D,C=0,L=(t-e)/n;for(let T=0;T<=r;T++){let S=[],_=T/r,I=_*(t-e)+e;for(let O=0;O<=s;O++){let G=O/s,j=G*l+o,K=Math.sin(j),J=Math.cos(j);w.x=I*K,w.y=-_*n+d,w.z=I*J,h.push(w.x,w.y,w.z),y.set(K,L,J).normalize(),p.push(y.x,y.y,y.z),g.push(G,1-_),S.push(v++)}m.push(S)}for(let T=0;T<s;T++)for(let S=0;S<r;S++){let _=m[S][T],I=m[S+1][T],O=m[S+1][T+1],G=m[S][T+1];(e>0||S!==0)&&(u.push(_,I,G),C+=3),(t>0||S!==r-1)&&(u.push(I,O,G),C+=3)}c.addGroup(f,C,0),f+=C}function M(y){let w=v,C=new ne,L=new D,T=0,S=y===!0?e:t,_=y===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,d*_,0),p.push(0,_,0),g.push(.5,.5),v++;let I=v;for(let O=0;O<=s;O++){let j=O/s*l+o,K=Math.cos(j),J=Math.sin(j);L.x=S*J,L.y=d*_,L.z=S*K,h.push(L.x,L.y,L.z),p.push(0,_,0),C.x=K*.5+.5,C.y=J*.5*_+.5,g.push(C.x,C.y),v++}for(let O=0;O<s;O++){let G=w+O,j=I+O;y===!0?u.push(j,j+1,G):u.push(j+1,j,G),T+=3}c.addGroup(f,T,y===!0?1:2),f+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ra=class i extends zt{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},aa=class i extends xt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new tt(r,3)),this.setAttribute("normal",new tt(r.slice(),3)),this.setAttribute("uv",new tt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let M=new D,y=new D,w=new D;for(let C=0;C<t.length;C+=3)g(t[C+0],M),g(t[C+1],y),g(t[C+2],w),l(M,y,w,b)}function l(b,M,y,w){let C=w+1,L=[];for(let T=0;T<=C;T++){L[T]=[];let S=b.clone().lerp(y,T/C),_=M.clone().lerp(y,T/C),I=C-T;for(let O=0;O<=I;O++)O===0&&T===C?L[T][O]=S:L[T][O]=S.clone().lerp(_,O/I)}for(let T=0;T<C;T++)for(let S=0;S<2*(C-T)-1;S++){let _=Math.floor(S/2);S%2===0?(p(L[T][_+1]),p(L[T+1][_]),p(L[T][_])):(p(L[T][_+1]),p(L[T+1][_+1]),p(L[T+1][_]))}}function c(b){let M=new D;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(b),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function u(){let b=new D;for(let M=0;M<r.length;M+=3){b.x=r[M+0],b.y=r[M+1],b.z=r[M+2];let y=d(b)/2/Math.PI+.5,w=f(b)/Math.PI+.5;a.push(y,1-w)}v(),h()}function h(){for(let b=0;b<a.length;b+=6){let M=a[b+0],y=a[b+2],w=a[b+4],C=Math.max(M,y,w),L=Math.min(M,y,w);C>.9&&L<.1&&(M<.2&&(a[b+0]+=1),y<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function p(b){r.push(b.x,b.y,b.z)}function g(b,M){let y=b*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function v(){let b=new D,M=new D,y=new D,w=new D,C=new ne,L=new ne,T=new ne;for(let S=0,_=0;S<r.length;S+=9,_+=6){b.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),y.set(r[S+6],r[S+7],r[S+8]),C.set(a[_+0],a[_+1]),L.set(a[_+2],a[_+3]),T.set(a[_+4],a[_+5]),w.copy(b).add(M).add(y).divideScalar(3);let I=d(w);m(C,_+0,b,I),m(L,_+2,M,I),m(T,_+4,y,I)}}function m(b,M,y,w){w<0&&b.x===1&&(a[M]=b.x-1),y.x===0&&y.z===0&&(a[M]=w/2/Math.PI+.5)}function d(b){return Math.atan2(b.z,-b.x)}function f(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],p=n[s+1]-u,g=(a-u)/p;return(s+g)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ne:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new rt;for(let g=0;g<=e;g++){let v=g/e;s[g]=this.getTangentAt(v,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),h=Math.abs(s[0].y),p=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let g=1;g<=e;g++){if(r[g]=r[g-1].clone(),a[g]=a[g-1].clone(),o.crossVectors(s[g-1],s[g]),o.length()>Number.EPSILON){o.normalize();let v=Math.acos(je(s[g-1].dot(s[g]),-1,1));r[g].applyMatrix4(l.makeRotationAxis(o,v))}a[g].crossVectors(s[g],r[g])}if(t===!0){let g=Math.acos(je(r[0].dot(r[e]),-1,1));g/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(g=-g);for(let v=1;v<=e;v++)r[v].applyMatrix4(l.makeRotationAxis(s[v],g*v)),a[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},js=class extends mn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ne){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=l-this.aX,g=c-this.aY;l=p*u-g*h+this.aX,c=p*h+g*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Wo=class extends js{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ju(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,h){let p=(a-r)/c-(o-r)/(c+u)+(o-a)/u,g=(o-a)/u-(l-a)/(u+h)+(l-o)/h;p*=u,g*=u,s(a,o,p,g)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Eo=new D,fu=new Ju,pu=new Ju,mu=new Ju,$o=class extends mn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Eo.subVectors(s[0],s[1]).add(s[0]),c=Eo);let h=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Eo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Eo),this.curveType==="centripetal"||this.curveType==="chordal"){let g=this.curveType==="chordal"?.5:.25,v=Math.pow(c.distanceToSquared(h),g),m=Math.pow(h.distanceToSquared(p),g),d=Math.pow(p.distanceToSquared(u),g);m<1e-4&&(m=1),v<1e-4&&(v=m),d<1e-4&&(d=m),fu.initNonuniformCatmullRom(c.x,h.x,p.x,u.x,v,m,d),pu.initNonuniformCatmullRom(c.y,h.y,p.y,u.y,v,m,d),mu.initNonuniformCatmullRom(c.z,h.z,p.z,u.z,v,m,d)}else this.curveType==="catmullrom"&&(fu.initCatmullRom(c.x,h.x,p.x,u.x,this.tension),pu.initCatmullRom(c.y,h.y,p.y,u.y,this.tension),mu.initCatmullRom(c.z,h.z,p.z,u.z,this.tension));return n.set(fu.calc(l),pu.calc(l),mu.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function df(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Bg(i,e){let t=1-i;return t*t*e}function kg(i,e){return 2*(1-i)*i*e}function zg(i,e){return i*i*e}function zr(i,e,t,n){return Bg(i,e)+kg(i,t)+zg(i,n)}function Hg(i,e){let t=1-i;return t*t*t*e}function Vg(i,e){let t=1-i;return 3*t*t*i*e}function Gg(i,e){return 3*(1-i)*i*i*e}function qg(i,e){return i*i*i*e}function Hr(i,e,t,n,s){return Hg(i,e)+Vg(i,t)+Gg(i,n)+qg(i,s)}var oa=class extends mn{constructor(e=new ne,t=new ne,n=new ne,s=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ne){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hr(e,s.x,r.x,a.x,o.x),Hr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xo=class extends mn{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Hr(e,s.x,r.x,a.x,o.x),Hr(e,s.y,r.y,a.y,o.y),Hr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},la=class extends mn{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yo=class extends mn{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ca=class extends mn{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(zr(e,s.x,r.x,a.x),zr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zo=class extends mn{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(zr(e,s.x,r.x,a.x),zr(e,s.y,r.y,a.y),zr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ua=class extends mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(df(o,l.x,c.x,u.x,h.x),df(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ne().fromArray(s))}return this}},Su=Object.freeze({__proto__:null,ArcCurve:Wo,CatmullRomCurve3:$o,CubicBezierCurve:oa,CubicBezierCurve3:Xo,EllipseCurve:js,LineCurve:la,LineCurve3:Yo,QuadraticBezierCurve:ca,QuadraticBezierCurve3:Zo,SplineCurve:ua}),jo=class extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Su[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Su[s.type]().fromJSON(s))}return this}},ha=class extends jo{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new la(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new ca(this.currentPoint.clone(),new ne(e,t),new ne(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new oa(this.currentPoint.clone(),new ne(e,t),new ne(n,s),new ne(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ua(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new js(e,t,n,s,r,a,o,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ss=class extends ha{constructor(e){super(e),this.uuid=Gn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ha().fromJSON(s))}return this}};function Wg(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=sp(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=jg(i,e,r,t)),i.length>80*t){o=1/0,l=1/0;let u=-1/0,h=-1/0;for(let p=t;p<s;p+=t){let g=i[p],v=i[p+1];g<o&&(o=g),v<l&&(l=v),g>u&&(u=g),v>h&&(h=v)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return da(r,a,t,o,l,c,0),a}function sp(i,e,t,n,s){let r;if(s===o0(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=ff(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=ff(a/n|0,i[a],i[a+1],r);return r&&Js(r,r.next)&&(pa(r),r=r.next),r}function rs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Js(t,t.next)||Et(t.prev,t,t.next)===0)){if(pa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function da(i,e,t,n,s,r,a){if(!i)return;!a&&r&&t0(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Xg(i,n,s,r):$g(i)){e.push(l.i,i.i,c.i),pa(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Yg(rs(i),e),da(i,e,t,n,s,r,2)):a===2&&Zg(i,e,t,n,s,r):da(rs(i),e,t,n,s,r,1);break}}}function $g(i){let e=i.prev,t=i,n=i.next;if(Et(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),h=Math.min(o,l,c),p=Math.max(s,r,a),g=Math.max(o,l,c),v=n.next;for(;v!==e;){if(v.x>=u&&v.x<=p&&v.y>=h&&v.y<=g&&Or(s,o,r,l,a,c,v.x,v.y)&&Et(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function Xg(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Et(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,h=r.y,p=a.y,g=Math.min(o,l,c),v=Math.min(u,h,p),m=Math.max(o,l,c),d=Math.max(u,h,p),f=wu(g,v,e,t,n),b=wu(m,d,e,t,n),M=i.prevZ,y=i.nextZ;for(;M&&M.z>=f&&y&&y.z<=b;){if(M.x>=g&&M.x<=m&&M.y>=v&&M.y<=d&&M!==s&&M!==a&&Or(o,u,l,h,c,p,M.x,M.y)&&Et(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=g&&y.x<=m&&y.y>=v&&y.y<=d&&y!==s&&y!==a&&Or(o,u,l,h,c,p,y.x,y.y)&&Et(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=f;){if(M.x>=g&&M.x<=m&&M.y>=v&&M.y<=d&&M!==s&&M!==a&&Or(o,u,l,h,c,p,M.x,M.y)&&Et(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=b;){if(y.x>=g&&y.x<=m&&y.y>=v&&y.y<=d&&y!==s&&y!==a&&Or(o,u,l,h,c,p,y.x,y.y)&&Et(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Yg(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Js(n,s)&&ap(n,t,t.next,s)&&fa(n,s)&&fa(s,n)&&(e.push(n.i,t.i,s.i),pa(t),pa(t.next),t=i=s),t=t.next}while(t!==i);return rs(t)}function Zg(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&s0(a,o)){let l=op(a,o);a=rs(a,a.next),l=rs(l,l.next),da(a,e,t,n,s,r,0),da(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function jg(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=sp(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(i0(c))}s.sort(Jg);for(let r=0;r<s.length;r++)t=Kg(s[r],t);return t}function Jg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Kg(i,e){let t=Qg(i,e);if(!t)return e;let n=op(t,i);return rs(n,n.next),rs(t,t.next)}function Qg(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Js(i,t))return t;do{if(Js(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&rp(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let h=Math.abs(s-t.y)/(n-t.x);fa(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&e0(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function e0(i,e){return Et(i.prev,i,e.prev)<0&&Et(e.next,i,i.next)<0}function t0(i,e,t,n){let s=i;do s.z===0&&(s.z=wu(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,n0(s)}function n0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function wu(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function i0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function rp(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Or(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&rp(i,e,t,n,s,r,a,o)}function s0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!r0(i,e)&&(fa(i,e)&&fa(e,i)&&a0(i,e)&&(Et(i.prev,i,e.prev)||Et(i,e.prev,e))||Js(i,e)&&Et(i.prev,i,i.next)>0&&Et(e.prev,e,e.next)>0)}function Et(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Js(i,e){return i.x===e.x&&i.y===e.y}function ap(i,e,t,n){let s=Ao(Et(i,e,t)),r=Ao(Et(i,e,n)),a=Ao(Et(t,n,i)),o=Ao(Et(t,n,e));return!!(s!==r&&a!==o||s===0&&To(i,t,e)||r===0&&To(i,n,e)||a===0&&To(t,i,n)||o===0&&To(t,e,n))}function To(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ao(i){return i>0?1:i<0?-1:0}function r0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&ap(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function fa(i,e){return Et(i.prev,i,i.next)<0?Et(i,e,i.next)>=0&&Et(i,i.prev,e)>=0:Et(i,e,i.prev)<0||Et(i,i.next,e)<0}function a0(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function op(i,e){let t=Eu(i.i,i.x,i.y),n=Eu(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ff(i,e,t,n){let s=Eu(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function pa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Eu(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function o0(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Tu=class{static triangulate(e,t,n=2){return Wg(e,t,n)}},Vn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];pf(e),mf(n,e);let a=e.length;t.forEach(pf);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,mf(n,t[l]);let o=Tu.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function pf(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function mf(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var ma=class i extends xt{constructor(e=new ss([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,g=t.bevelThickness!==void 0?t.bevelThickness:.2,v=t.bevelSize!==void 0?t.bevelSize:g-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3,f=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:l0,M,y=!1,w,C,L,T;f&&(M=f.getSpacedPoints(u),y=!0,p=!1,w=f.computeFrenetFrames(u,!1),C=new D,L=new D,T=new D),p||(d=0,g=0,v=0,m=0);let S=o.extractPoints(c),_=S.shape,I=S.holes;if(!Vn.isClockWise(_)){_=_.reverse();for(let se=0,te=I.length;se<te;se++){let ee=I[se];Vn.isClockWise(ee)&&(I[se]=ee.reverse())}}function G(se){let ee=10000000000000001e-36,Q=se[0];for(let ge=1;ge<=se.length;ge++){let ce=ge%se.length,_e=se[ce],qe=_e.x-Q.x,Ve=_e.y-Q.y,R=qe*qe+Ve*Ve,E=Math.max(Math.abs(_e.x),Math.abs(_e.y),Math.abs(Q.x),Math.abs(Q.y)),P=ee*E*E;if(R<=P){se.splice(ce,1),ge--;continue}Q=_e}}G(_),I.forEach(G);let j=I.length,K=_;for(let se=0;se<j;se++){let te=I[se];_=_.concat(te)}function J(se,te,ee){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(te,ee)}let le=_.length;function X(se,te,ee){let Q,ge,ce,_e=se.x-te.x,qe=se.y-te.y,Ve=ee.x-se.x,R=ee.y-se.y,E=_e*_e+qe*qe,P=_e*R-qe*Ve;if(Math.abs(P)>Number.EPSILON){let N=Math.sqrt(E),V=Math.sqrt(Ve*Ve+R*R),k=te.x-qe/N,$=te.y+_e/N,W=ee.x-R/V,oe=ee.y+Ve/V,ye=((W-k)*R-(oe-$)*Ve)/(_e*R-qe*Ve);Q=k+_e*ye-se.x,ge=$+qe*ye-se.y;let ie=Q*Q+ge*ge;if(ie<=2)return new ne(Q,ge);ce=Math.sqrt(ie/2)}else{let N=!1;_e>Number.EPSILON?Ve>Number.EPSILON&&(N=!0):_e<-Number.EPSILON?Ve<-Number.EPSILON&&(N=!0):Math.sign(qe)===Math.sign(R)&&(N=!0),N?(Q=-qe,ge=_e,ce=Math.sqrt(E)):(Q=_e,ge=qe,ce=Math.sqrt(E/2))}return new ne(Q/ce,ge/ce)}let he=[];for(let se=0,te=K.length,ee=te-1,Q=se+1;se<te;se++,ee++,Q++)ee===te&&(ee=0),Q===te&&(Q=0),he[se]=X(K[se],K[ee],K[Q]);let Me=[],we,ae=he.concat();for(let se=0,te=j;se<te;se++){let ee=I[se];we=[];for(let Q=0,ge=ee.length,ce=ge-1,_e=Q+1;Q<ge;Q++,ce++,_e++)ce===ge&&(ce=0),_e===ge&&(_e=0),we[Q]=X(ee[Q],ee[ce],ee[_e]);Me.push(we),ae=ae.concat(we)}let Ae;if(d===0)Ae=Vn.triangulateShape(K,I);else{let se=[],te=[];for(let ee=0;ee<d;ee++){let Q=ee/d,ge=g*Math.cos(Q*Math.PI/2),ce=v*Math.sin(Q*Math.PI/2)+m;for(let _e=0,qe=K.length;_e<qe;_e++){let Ve=J(K[_e],he[_e],ce);xe(Ve.x,Ve.y,-ge),Q===0&&se.push(Ve)}for(let _e=0,qe=j;_e<qe;_e++){let Ve=I[_e];we=Me[_e];let R=[];for(let E=0,P=Ve.length;E<P;E++){let N=J(Ve[E],we[E],ce);xe(N.x,N.y,-ge),Q===0&&R.push(N)}Q===0&&te.push(R)}}Ae=Vn.triangulateShape(se,te)}let ke=Ae.length,$e=v+m;for(let se=0;se<le;se++){let te=p?J(_[se],ae[se],$e):_[se];y?(L.copy(w.normals[0]).multiplyScalar(te.x),C.copy(w.binormals[0]).multiplyScalar(te.y),T.copy(M[0]).add(L).add(C),xe(T.x,T.y,T.z)):xe(te.x,te.y,0)}for(let se=1;se<=u;se++)for(let te=0;te<le;te++){let ee=p?J(_[te],ae[te],$e):_[te];y?(L.copy(w.normals[se]).multiplyScalar(ee.x),C.copy(w.binormals[se]).multiplyScalar(ee.y),T.copy(M[se]).add(L).add(C),xe(T.x,T.y,T.z)):xe(ee.x,ee.y,h/u*se)}for(let se=d-1;se>=0;se--){let te=se/d,ee=g*Math.cos(te*Math.PI/2),Q=v*Math.sin(te*Math.PI/2)+m;for(let ge=0,ce=K.length;ge<ce;ge++){let _e=J(K[ge],he[ge],Q);xe(_e.x,_e.y,h+ee)}for(let ge=0,ce=I.length;ge<ce;ge++){let _e=I[ge];we=Me[ge];for(let qe=0,Ve=_e.length;qe<Ve;qe++){let R=J(_e[qe],we[qe],Q);y?xe(R.x,R.y+M[u-1].y,M[u-1].x+ee):xe(R.x,R.y,h+ee)}}}B(),q();function B(){let se=s.length/3;if(p){let te=0,ee=le*te;for(let Q=0;Q<ke;Q++){let ge=Ae[Q];Se(ge[2]+ee,ge[1]+ee,ge[0]+ee)}te=u+d*2,ee=le*te;for(let Q=0;Q<ke;Q++){let ge=Ae[Q];Se(ge[0]+ee,ge[1]+ee,ge[2]+ee)}}else{for(let te=0;te<ke;te++){let ee=Ae[te];Se(ee[2],ee[1],ee[0])}for(let te=0;te<ke;te++){let ee=Ae[te];Se(ee[0]+le*u,ee[1]+le*u,ee[2]+le*u)}}n.addGroup(se,s.length/3-se,0)}function q(){let se=s.length/3,te=0;de(K,te),te+=K.length;for(let ee=0,Q=I.length;ee<Q;ee++){let ge=I[ee];de(ge,te),te+=ge.length}n.addGroup(se,s.length/3-se,1)}function de(se,te){let ee=se.length;for(;--ee>=0;){let Q=ee,ge=ee-1;ge<0&&(ge=se.length-1);for(let ce=0,_e=u+d*2;ce<_e;ce++){let qe=le*ce,Ve=le*(ce+1),R=te+Q+qe,E=te+ge+qe,P=te+ge+Ve,N=te+Q+Ve;He(R,E,P,N)}}}function xe(se,te,ee){l.push(se),l.push(te),l.push(ee)}function Se(se,te,ee){Ye(se),Ye(te),Ye(ee);let Q=s.length/3,ge=b.generateTopUV(n,s,Q-3,Q-2,Q-1);U(ge[0]),U(ge[1]),U(ge[2])}function He(se,te,ee,Q){Ye(se),Ye(te),Ye(Q),Ye(te),Ye(ee),Ye(Q);let ge=s.length/3,ce=b.generateSideWallUV(n,s,ge-6,ge-3,ge-2,ge-1);U(ce[0]),U(ce[1]),U(ce[3]),U(ce[1]),U(ce[2]),U(ce[3])}function Ye(se){s.push(l[se*3+0]),s.push(l[se*3+1]),s.push(l[se*3+2])}function U(se){r.push(se.x),r.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return c0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Su[s.type]().fromJSON(s)),new i(n,e.options)}},l0={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new ne(r,a),new ne(o,l),new ne(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],p=e[s*3],g=e[s*3+1],v=e[s*3+2],m=e[r*3],d=e[r*3+1],f=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-h),new ne(p,1-v),new ne(m,1-f)]:[new ne(o,1-l),new ne(u,1-h),new ne(g,1-v),new ne(d,1-f)]}};function c0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ci=class i extends aa{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var as=class i extends aa{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},li=class i extends xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,p=t/l,g=[],v=[],m=[],d=[];for(let f=0;f<u;f++){let b=f*p-a;for(let M=0;M<c;M++){let y=M*h-r;v.push(y,-b,0),m.push(0,0,1),d.push(M/o),d.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<o;b++){let M=b+c*f,y=b+c*(f+1),w=b+1+c*(f+1),C=b+1+c*f;g.push(M,y,C),g.push(y,w,C)}this.setIndex(g),this.setAttribute("position",new tt(v,3)),this.setAttribute("normal",new tt(m,3)),this.setAttribute("uv",new tt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ks=class i extends xt{constructor(e=new ss([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new tt(s,3)),this.setAttribute("normal",new tt(r,3)),this.setAttribute("uv",new tt(a,2));function c(u){let h=s.length/3,p=u.extractPoints(t),g=p.shape,v=p.holes;Vn.isClockWise(g)===!1&&(g=g.reverse());for(let d=0,f=v.length;d<f;d++){let b=v[d];Vn.isClockWise(b)===!0&&(v[d]=b.reverse())}let m=Vn.triangulateShape(g,v);for(let d=0,f=v.length;d<f;d++){let b=v[d];g=g.concat(b)}for(let d=0,f=g.length;d<f;d++){let b=g[d];s.push(b.x,b.y,0),r.push(0,0,1),a.push(b.x,b.y)}for(let d=0,f=m.length;d<f;d++){let b=m[d],M=b[0]+h,y=b[1]+h,w=b[2]+h;n.push(M,y,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return u0(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let a=t[e.shapes[s]];n.push(a)}return new i(n,e.curveSegments)}};function u0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var ci=class i extends xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new D,p=new D,g=[],v=[],m=[],d=[];for(let f=0;f<=n;f++){let b=[],M=f/n,y=0;f===0&&a===0?y=.5/t:f===n&&l===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){let C=w/t;h.x=-e*Math.cos(s+C*r)*Math.sin(a+M*o),h.y=e*Math.cos(a+M*o),h.z=e*Math.sin(s+C*r)*Math.sin(a+M*o),v.push(h.x,h.y,h.z),p.copy(h).normalize(),m.push(p.x,p.y,p.z),d.push(C+y,1-M),b.push(c++)}u.push(b)}for(let f=0;f<n;f++)for(let b=0;b<t;b++){let M=u[f][b+1],y=u[f][b],w=u[f+1][b],C=u[f+1][b+1];(f!==0||a>0)&&g.push(M,y,C),(f!==n-1||l<Math.PI)&&g.push(y,w,C)}this.setIndex(g),this.setAttribute("position",new tt(v,3)),this.setAttribute("normal",new tt(m,3)),this.setAttribute("uv",new tt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ga=class i extends xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],u=new D,h=new D,p=new D;for(let g=0;g<=n;g++)for(let v=0;v<=s;v++){let m=v/s*r,d=g/n*Math.PI*2;h.x=(e+t*Math.cos(d))*Math.cos(m),h.y=(e+t*Math.cos(d))*Math.sin(m),h.z=t*Math.sin(d),o.push(h.x,h.y,h.z),u.x=e*Math.cos(m),u.y=e*Math.sin(m),p.subVectors(h,u).normalize(),l.push(p.x,p.y,p.z),c.push(v/s),c.push(g/n)}for(let g=1;g<=n;g++)for(let v=1;v<=s;v++){let m=(s+1)*g+v-1,d=(s+1)*(g-1)+v-1,f=(s+1)*(g-1)+v,b=(s+1)*g+v;a.push(m,d,b),a.push(d,f,b)}this.setIndex(a),this.setAttribute("position",new tt(o,3)),this.setAttribute("normal",new tt(l,3)),this.setAttribute("uv",new tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var xa=class extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},bt=class extends Un{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qu,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Jo=class extends Un{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ko=class extends Un{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Co(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function h0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var os=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qo=class extends os{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vu,endingEnd:vu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case yu:r=e,o=2*t-n;break;case _u:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case yu:a=e,l=2*n-t;break;case _u:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,p=this._weightPrev,g=this._weightNext,v=(n-t)/(s-t),m=v*v,d=m*v,f=-p*d+2*p*m-p*v,b=(1+p)*d+(-1.5-2*p)*m+(-.5+p)*v+1,M=(-1-g)*d+(1.5+g)*m+.5*v,y=g*d-g*m;for(let w=0;w!==o;++w)r[w]=f*a[u+w]+b*a[c+w]+M*a[l+w]+y*a[h+w];return r}},el=class extends os{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),h=1-u;for(let p=0;p!==o;++p)r[p]=a[c+p]*h+a[l+p]*u;return r}},tl=class extends os{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},gn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Co(t,this.TimeBufferType),this.values=Co(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Co(e.times,Array),values:Co(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new el(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Vr:t=this.InterpolantFactoryMethodDiscrete;break;case Do:t=this.InterpolantFactoryMethodLinear;break;case Ro:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vr;case this.InterpolantFactoryMethodLinear:return Do;case this.InterpolantFactoryMethodSmooth:return Ro}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&h0(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ro,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*n,p=h-n,g=h+n;for(let v=0;v!==n;++v){let m=t[h+v];if(m!==t[p+v]||m!==t[g+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,p=a*n;for(let g=0;g!==n;++g)t[p+g]=t[h+g]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=Do;var Ri=class extends gn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=Vr;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var nl=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};nl.prototype.ValueTypeName="color";var il=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};il.prototype.ValueTypeName="number";var sl=class extends os{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)Sn.slerpFlat(r,0,a,c-o,a,c,l);return r}},va=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new sl(this.times,this.values,this.getValueSize(),e)}};va.prototype.ValueTypeName="quaternion";va.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends gn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=Vr;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var rl=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};rl.prototype.ValueTypeName="vector";var al=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,p=c.length;h<p;h+=2){let g=c[h],v=c[h+1];if(g.global&&(g.lastIndex=0),g.test(u))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},lp=new al,ol=class{constructor(e){this.manager=e!==void 0?e:lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ol.DEFAULT_MATERIAL_NAME="__DEFAULT";var Qs=class extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ls=class extends Qs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},gu=new rt,gf=new D,xf=new D,ll=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=Fn,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xs,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;gf.setFromMatrixPosition(e.matrixWorld),t.position.copy(gf),xf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xf),t.updateMatrixWorld(),gu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gu,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(gu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var vf=new rt,Fr=new D,xu=new D,Au=class extends ll{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Fr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Fr),xu.copy(n.position),xu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(xu),n.updateMatrixWorld(),s.makeTranslation(-Fr.x,-Fr.y,-Fr.z),vf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vf,n.coordinateSystem,n.reversedDepth)}},er=class extends Qs{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Au}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},cs=class extends Zr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Cu=class extends ll{constructor(){super(new cs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},us=class extends Qs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Cu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var cl=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},hs=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Ku="\\[\\]\\.:\\/",d0=new RegExp("["+Ku+"]","g"),Qu="[^"+Ku+"]",f0="[^"+Ku.replace("\\.","")+"]",p0=/((?:WC+[\/:])*)/.source.replace("WC",Qu),m0=/(WCOD+)?/.source.replace("WCOD",f0),g0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qu),x0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qu),v0=new RegExp("^"+p0+m0+g0+x0+"$"),y0=["material","materials","bones","map"],Ru=class{constructor(e,t,n){let s=n||_t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_t=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(d0,"")}static parseTrackName(e){let t=v0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);y0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_t.Composite=Ru;_t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_t.prototype.GetterByBindingType=[_t.prototype._getValue_direct,_t.prototype._getValue_array,_t.prototype._getValue_arrayElement,_t.prototype._getValue_toArray];_t.prototype.SetterByBindingTypeAndVersioning=[[_t.prototype._setValue_direct,_t.prototype._setValue_direct_setNeedsUpdate,_t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_array,_t.prototype._setValue_array_setNeedsUpdate,_t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_arrayElement,_t.prototype._setValue_arrayElement_setNeedsUpdate,_t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_t.prototype._setValue_fromArray,_t.prototype._setValue_fromArray_setNeedsUpdate,_t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var AM=new Float32Array(1);var yf=new rt,ya=class{constructor(e,t,n=0,s=1/0){this.ray=new oi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ws,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return yf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yf),this}intersectObject(e,t=!0,n=[]){return Iu(e,this,n,t),n.sort(_f),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Iu(e[s],this,n,t);return n.sort(_f),n}};function _f(i,e){return i.distance-e.distance}function Iu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Iu(r[a],e,t,!0)}}var tr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var _a=class extends qn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function eh(i,e,t,n){let s=_0(n);switch(t){case Hu:return i*e;case Rl:return i*e/s.components*s.byteLength;case Il:return i*e/s.components*s.byteLength;case Gu:return i*e*2/s.components*s.byteLength;case Pl:return i*e*2/s.components*s.byteLength;case Vu:return i*e*3/s.components*s.byteLength;case En:return i*e*4/s.components*s.byteLength;case Ll:return i*e*4/s.components*s.byteLength;case Sa:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ea:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ul:case Fl:return Math.max(i,16)*Math.max(e,8)/4;case Dl:case Nl:return Math.max(i,8)*Math.max(e,8)/2;case Ol:case Bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case kl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Hl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Vl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Gl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ql:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Wl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case $l:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Yl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Zl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case jl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Jl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Kl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ql:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ec:case tc:case nc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ic:case sc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case rc:case ac:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function _0(i){switch(i){case Fn:case Ou:return{byteLength:1,components:1};case ir:case Bu:case wn:return{byteLength:2,components:1};case Al:case Cl:return{byteLength:2,components:4};case Fi:case Tl:case On:return{byteLength:4,components:1};case ku:case zu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Lp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function M0(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,u),o.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((g,v)=>g.start-v.start);let p=0;for(let g=1;g<h.length;g++){let v=h[p],m=h[g];m.start<=v.start+v.count+1?v.count=Math.max(v.count,m.start+m.count-v.start):(++p,h[p]=m)}h.length=p+1;for(let g=0,v=h.length;g<v;g++){let m=h[g];i.bufferSubData(c,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var S0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,w0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,E0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,T0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,C0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,R0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,I0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,P0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,L0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,D0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,U0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,N0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,F0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,O0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,V0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,G0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,q0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,W0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,$0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,X0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Y0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Z0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,j0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,J0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,K0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Q0="gl_FragColor = linearToOutputTexel( gl_FragColor );",ex=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ix=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ax=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ux=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,px=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_x=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ax=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ix=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Px=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ux=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ox=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$x=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Kx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ev=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,iv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,rv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,av=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ov=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Mv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ev=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Av=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Iv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ov=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$v=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ey=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ty=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Je={alphahash_fragment:S0,alphahash_pars_fragment:w0,alphamap_fragment:E0,alphamap_pars_fragment:T0,alphatest_fragment:A0,alphatest_pars_fragment:C0,aomap_fragment:R0,aomap_pars_fragment:I0,batching_pars_vertex:P0,batching_vertex:L0,begin_vertex:D0,beginnormal_vertex:U0,bsdfs:N0,iridescence_fragment:F0,bumpmap_pars_fragment:O0,clipping_planes_fragment:B0,clipping_planes_pars_fragment:k0,clipping_planes_pars_vertex:z0,clipping_planes_vertex:H0,color_fragment:V0,color_pars_fragment:G0,color_pars_vertex:q0,color_vertex:W0,common:$0,cube_uv_reflection_fragment:X0,defaultnormal_vertex:Y0,displacementmap_pars_vertex:Z0,displacementmap_vertex:j0,emissivemap_fragment:J0,emissivemap_pars_fragment:K0,colorspace_fragment:Q0,colorspace_pars_fragment:ex,envmap_fragment:tx,envmap_common_pars_fragment:nx,envmap_pars_fragment:ix,envmap_pars_vertex:sx,envmap_physical_pars_fragment:mx,envmap_vertex:rx,fog_vertex:ax,fog_pars_vertex:ox,fog_fragment:lx,fog_pars_fragment:cx,gradientmap_pars_fragment:ux,lightmap_pars_fragment:hx,lights_lambert_fragment:dx,lights_lambert_pars_fragment:fx,lights_pars_begin:px,lights_toon_fragment:gx,lights_toon_pars_fragment:xx,lights_phong_fragment:vx,lights_phong_pars_fragment:yx,lights_physical_fragment:_x,lights_physical_pars_fragment:bx,lights_fragment_begin:Mx,lights_fragment_maps:Sx,lights_fragment_end:wx,logdepthbuf_fragment:Ex,logdepthbuf_pars_fragment:Tx,logdepthbuf_pars_vertex:Ax,logdepthbuf_vertex:Cx,map_fragment:Rx,map_pars_fragment:Ix,map_particle_fragment:Px,map_particle_pars_fragment:Lx,metalnessmap_fragment:Dx,metalnessmap_pars_fragment:Ux,morphinstance_vertex:Nx,morphcolor_vertex:Fx,morphnormal_vertex:Ox,morphtarget_pars_vertex:Bx,morphtarget_vertex:kx,normal_fragment_begin:zx,normal_fragment_maps:Hx,normal_pars_fragment:Vx,normal_pars_vertex:Gx,normal_vertex:qx,normalmap_pars_fragment:Wx,clearcoat_normal_fragment_begin:$x,clearcoat_normal_fragment_maps:Xx,clearcoat_pars_fragment:Yx,iridescence_pars_fragment:Zx,opaque_fragment:jx,packing:Jx,premultiplied_alpha_fragment:Kx,project_vertex:Qx,dithering_fragment:ev,dithering_pars_fragment:tv,roughnessmap_fragment:nv,roughnessmap_pars_fragment:iv,shadowmap_pars_fragment:sv,shadowmap_pars_vertex:rv,shadowmap_vertex:av,shadowmask_pars_fragment:ov,skinbase_vertex:lv,skinning_pars_vertex:cv,skinning_vertex:uv,skinnormal_vertex:hv,specularmap_fragment:dv,specularmap_pars_fragment:fv,tonemapping_fragment:pv,tonemapping_pars_fragment:mv,transmission_fragment:gv,transmission_pars_fragment:xv,uv_pars_fragment:vv,uv_pars_vertex:yv,uv_vertex:_v,worldpos_vertex:bv,background_vert:Mv,background_frag:Sv,backgroundCube_vert:wv,backgroundCube_frag:Ev,cube_vert:Tv,cube_frag:Av,depth_vert:Cv,depth_frag:Rv,distanceRGBA_vert:Iv,distanceRGBA_frag:Pv,equirect_vert:Lv,equirect_frag:Dv,linedashed_vert:Uv,linedashed_frag:Nv,meshbasic_vert:Fv,meshbasic_frag:Ov,meshlambert_vert:Bv,meshlambert_frag:kv,meshmatcap_vert:zv,meshmatcap_frag:Hv,meshnormal_vert:Vv,meshnormal_frag:Gv,meshphong_vert:qv,meshphong_frag:Wv,meshphysical_vert:$v,meshphysical_frag:Xv,meshtoon_vert:Yv,meshtoon_frag:Zv,points_vert:jv,points_frag:Jv,shadow_vert:Kv,shadow_frag:Qv,sprite_vert:ey,sprite_frag:ty},Ee={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Yn={basic:{uniforms:Qt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Qt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Qt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Qt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Qt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Qt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Qt([Ee.points,Ee.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Qt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Qt([Ee.common,Ee.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Qt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Qt([Ee.sprite,Ee.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:Qt([Ee.common,Ee.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:Qt([Ee.lights,Ee.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Yn.physical={uniforms:Qt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};var oc={r:0,b:0,g:0},ms=new Dn,ny=new rt;function iy(i,e,t,n,s,r,a){let o=new Oe(0),l=r===!0?0:1,c,u,h=null,p=0,g=null;function v(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?t:e).get(y)),y}function m(M){let y=!1,w=v(M);w===null?f(o,l):w&&w.isColor&&(f(w,1),y=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(M,y){let w=v(y);w&&(w.isCubeTexture||w.mapping===ba)?(u===void 0&&(u=new Ke(new vt(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:ps(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,L,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ms.copy(y.backgroundRotation),ms.x*=-1,ms.y*=-1,ms.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ny.makeRotationFromEuler(ms)),u.material.toneMapped=et.getTransfer(w.colorSpace)!==it,(h!==w||p!==w.version||g!==i.toneMapping)&&(u.material.needsUpdate=!0,h=w,p=w.version,g=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Ke(new li(2,2),new Tt({name:"BackgroundMaterial",uniforms:ps(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=et.getTransfer(w.colorSpace)!==it,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||p!==w.version||g!==i.toneMapping)&&(c.material.needsUpdate=!0,h=w,p=w.version,g=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,y){M.getRGB(oc,ju(i)),n.buffers.color.setClear(oc.r,oc.g,oc.b,y,a)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,y=1){o.set(M),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(o,l)},render:m,addToRenderList:d,dispose:b}}function sy(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null),r=s,a=!1;function o(_,I,O,G,j){let K=!1,J=h(G,O,I);r!==J&&(r=J,c(r.object)),K=g(_,G,O,j),K&&v(_,G,O,j),j!==null&&e.update(j,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,y(_,I,O,G),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function h(_,I,O){let G=O.wireframe===!0,j=n[_.id];j===void 0&&(j={},n[_.id]=j);let K=j[I.id];K===void 0&&(K={},j[I.id]=K);let J=K[G];return J===void 0&&(J=p(l()),K[G]=J),J}function p(_){let I=[],O=[],G=[];for(let j=0;j<t;j++)I[j]=0,O[j]=0,G[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:G,object:_,attributes:{},index:null}}function g(_,I,O,G){let j=r.attributes,K=I.attributes,J=0,le=O.getAttributes();for(let X in le)if(le[X].location>=0){let Me=j[X],we=K[X];if(we===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(we=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(we=_.instanceColor)),Me===void 0||Me.attribute!==we||we&&Me.data!==we.data)return!0;J++}return r.attributesNum!==J||r.index!==G}function v(_,I,O,G){let j={},K=I.attributes,J=0,le=O.getAttributes();for(let X in le)if(le[X].location>=0){let Me=K[X];Me===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(Me=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(Me=_.instanceColor));let we={};we.attribute=Me,Me&&Me.data&&(we.data=Me.data),j[X]=we,J++}r.attributes=j,r.attributesNum=J,r.index=G}function m(){let _=r.newAttributes;for(let I=0,O=_.length;I<O;I++)_[I]=0}function d(_){f(_,0)}function f(_,I){let O=r.newAttributes,G=r.enabledAttributes,j=r.attributeDivisors;O[_]=1,G[_]===0&&(i.enableVertexAttribArray(_),G[_]=1),j[_]!==I&&(i.vertexAttribDivisor(_,I),j[_]=I)}function b(){let _=r.newAttributes,I=r.enabledAttributes;for(let O=0,G=I.length;O<G;O++)I[O]!==_[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function M(_,I,O,G,j,K,J){J===!0?i.vertexAttribIPointer(_,I,O,j,K):i.vertexAttribPointer(_,I,O,G,j,K)}function y(_,I,O,G){m();let j=G.attributes,K=O.getAttributes(),J=I.defaultAttributeValues;for(let le in K){let X=K[le];if(X.location>=0){let he=j[le];if(he===void 0&&(le==="instanceMatrix"&&_.instanceMatrix&&(he=_.instanceMatrix),le==="instanceColor"&&_.instanceColor&&(he=_.instanceColor)),he!==void 0){let Me=he.normalized,we=he.itemSize,ae=e.get(he);if(ae===void 0)continue;let Ae=ae.buffer,ke=ae.type,$e=ae.bytesPerElement,B=ke===i.INT||ke===i.UNSIGNED_INT||he.gpuType===Tl;if(he.isInterleavedBufferAttribute){let q=he.data,de=q.stride,xe=he.offset;if(q.isInstancedInterleavedBuffer){for(let Se=0;Se<X.locationSize;Se++)f(X.location+Se,q.meshPerAttribute);_.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Se=0;Se<X.locationSize;Se++)d(X.location+Se);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let Se=0;Se<X.locationSize;Se++)M(X.location+Se,we/X.locationSize,ke,Me,de*$e,(xe+we/X.locationSize*Se)*$e,B)}else{if(he.isInstancedBufferAttribute){for(let q=0;q<X.locationSize;q++)f(X.location+q,he.meshPerAttribute);_.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let q=0;q<X.locationSize;q++)d(X.location+q);i.bindBuffer(i.ARRAY_BUFFER,Ae);for(let q=0;q<X.locationSize;q++)M(X.location+q,we/X.locationSize,ke,Me,we*$e,we/X.locationSize*q*$e,B)}}else if(J!==void 0){let Me=J[le];if(Me!==void 0)switch(Me.length){case 2:i.vertexAttrib2fv(X.location,Me);break;case 3:i.vertexAttrib3fv(X.location,Me);break;case 4:i.vertexAttrib4fv(X.location,Me);break;default:i.vertexAttrib1fv(X.location,Me)}}}}b()}function w(){T();for(let _ in n){let I=n[_];for(let O in I){let G=I[O];for(let j in G)u(G[j].object),delete G[j];delete I[O]}delete n[_]}}function C(_){if(n[_.id]===void 0)return;let I=n[_.id];for(let O in I){let G=I[O];for(let j in G)u(G[j].object),delete G[j];delete I[O]}delete n[_.id]}function L(_){for(let I in n){let O=n[I];if(O[_.id]===void 0)continue;let G=O[_.id];for(let j in G)u(G[j].object),delete G[j];delete O[_.id]}}function T(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:m,enableAttribute:d,disableUnusedAttributes:b}}function ry(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v];t.update(g,n,1)}function l(c,u,h,p){if(h===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let v=0;v<c.length;v++)a(c[v],u[v],p[v]);else{g.multiDrawArraysInstancedWEBGL(n,c,0,u,0,p,0,h);let v=0;for(let m=0;m<h;m++)v+=u[m]*p[m];t.update(v,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function ay(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==En&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){let T=L===wn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Fn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==On&&!T)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=v>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:p,maxTextures:g,maxVertexTextures:v,maxTextureSize:m,maxCubemapSize:d,maxAttributes:f,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:w,maxSamples:C}}function oy(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Mn,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){let g=h.length!==0||p||n!==0||s;return s=p,n=h.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,p){t=u(h,p,0)},this.setState=function(h,p,g){let v=h.clippingPlanes,m=h.clipIntersection,d=h.clipShadows,f=i.get(h);if(!s||v===null||v.length===0||r&&!d)r?u(null):c();else{let b=r?0:n,M=b*4,y=f.clippingState||null;l.value=y,y=u(v,p,M,g);for(let w=0;w!==M;++w)y[w]=t[w];f.clippingState=y,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,p,g,v){let m=h!==null?h.length:0,d=null;if(m!==0){if(d=l.value,v!==!0||d===null){let f=g+m*4,b=p.matrixWorldInverse;o.getNormalMatrix(b),(d===null||d.length<f)&&(d=new Float32Array(f));for(let M=0,y=g;M!==m;++M,y+=4)a.copy(h[M]).applyMatrix4(b,o),a.normal.toArray(d,y),d[y+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,d}}function ly(i){let e=new WeakMap;function t(a,o){return o===Sl?a.mapping=ds:o===wl&&(a.mapping=fs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Sl||o===wl)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new ko(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var or=4,cp=[.125,.215,.35,.446,.526,.582],vs=20,th=new cs,up=new Oe,nh=null,ih=0,sh=0,rh=!1,xs=(1+Math.sqrt(5))/2,ar=1/xs,hp=[new D(-xs,ar,0),new D(xs,ar,0),new D(-ar,0,xs),new D(ar,0,xs),new D(0,xs,-ar),new D(0,xs,ar),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],cy=new D,uc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=cy}=r;nh=this._renderer.getRenderTarget(),ih=this._renderer.getActiveCubeFace(),sh=this._renderer.getActiveMipmapLevel(),rh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nh,ih,sh),this._renderer.xr.enabled=rh,e.scissorTest=!1,lc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ds||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nh=this._renderer.getRenderTarget(),ih=this._renderer.getActiveCubeFace(),sh=this._renderer.getActiveMipmapLevel(),rh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:wn,format:En,colorSpace:es,depthBuffer:!1},s=dp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dp(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=uy(r)),this._blurMaterial=hy(r,e,t)}return s}_compileMaterial(e){let t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,th)}_sceneToCubeUV(e,t,n,s,r){let l=new kt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,g=h.toneMapping;h.getClearColor(up),h.toneMapping=ui,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let m=new cn({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),d=new Ke(new vt,m),f=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,f=!0):(m.color.copy(up),f=!0);for(let M=0;M<6;M++){let y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[M],r.y,r.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[M]));let w=this._cubeSize;lc(s,y*w,M>2?w:0,w,w),h.setRenderTarget(s),f&&h.render(d,l),h.render(e,l)}d.geometry.dispose(),d.material.dispose(),h.toneMapping=g,h.autoClear=p,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ds||e.mapping===fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fp());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ke(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;lc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,th)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=hp[(s-r-1)%hp.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Ke(this._lodPlanes[s],c),p=c.uniforms,g=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*vs-1),m=r/v,d=isFinite(r)?1+Math.floor(u*m):vs;d>vs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${vs}`);let f=[],b=0;for(let L=0;L<vs;++L){let T=L/m,S=Math.exp(-T*T/2);f.push(S),L===0?b+=S:L<d&&(b+=2*S)}for(let L=0;L<f.length;L++)f[L]=f[L]/b;p.envMap.value=e.texture,p.samples.value=d,p.weights.value=f,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);let{_lodMax:M}=this;p.dTheta.value=v,p.mipInt.value=M-n;let y=this._sizeLods[s],w=3*y*(s>M-or?s-M+or:0),C=4*(this._cubeSize-y);lc(t,w,C,3*y,2*y),l.setRenderTarget(t),l.render(h,th)}};function uy(i){let e=[],t=[],n=[],s=i,r=i-or+1+cp.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-or?l=cp[a-i+or-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,p=[u,u,h,u,h,h,u,u,h,h,u,h],g=6,v=6,m=3,d=2,f=1,b=new Float32Array(m*v*g),M=new Float32Array(d*v*g),y=new Float32Array(f*v*g);for(let C=0;C<g;C++){let L=C%3*2/3-1,T=C>2?0:-1,S=[L,T,0,L+2/3,T,0,L+2/3,T+1,0,L,T,0,L+2/3,T+1,0,L,T+1,0];b.set(S,m*v*C),M.set(p,d*v*C);let _=[C,C,C,C,C,C];y.set(_,f*v*C)}let w=new xt;w.setAttribute("position",new Ut(b,m)),w.setAttribute("uv",new Ut(M,d)),w.setAttribute("faceIndex",new Ut(y,f)),e.push(w),s>or&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function dp(i,e,t){let n=new Kt(i,e,t);return n.texture.mapping=ba,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function lc(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function hy(i,e,t){let n=new Float32Array(vs),s=new D(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:vs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function fp(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function pp(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function mh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dy(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Sl||l===wl,u=l===ds||l===fs;if(c||u){let h=e.get(o),p=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new uc(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let g=o.image;return c&&g&&g.height>0||u&&g&&s(g)?(t===null&&(t=new uc(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function fy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Gs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function py(i,e,t,n){let s={},r=new WeakMap;function a(h){let p=h.target;p.index!==null&&e.remove(p.index);for(let v in p.attributes)e.remove(p.attributes[v]);p.removeEventListener("dispose",a),delete s[p.id];let g=r.get(p);g&&(e.remove(g),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(h,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function l(h){let p=h.attributes;for(let g in p)e.update(p[g],i.ARRAY_BUFFER)}function c(h){let p=[],g=h.index,v=h.attributes.position,m=0;if(g!==null){let b=g.array;m=g.version;for(let M=0,y=b.length;M<y;M+=3){let w=b[M+0],C=b[M+1],L=b[M+2];p.push(w,C,C,L,L,w)}}else if(v!==void 0){let b=v.array;m=v.version;for(let M=0,y=b.length/3-1;M<y;M+=3){let w=M+0,C=M+1,L=M+2;p.push(w,C,C,L,L,w)}}else return;let d=new(Zu(p)?Yr:Xr)(p,1);d.version=m;let f=r.get(h);f&&e.remove(f),r.set(h,d)}function u(h){let p=r.get(h);if(p){let g=h.index;g!==null&&p.version<g.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function my(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,g){i.drawElements(n,g,r,p*a),t.update(g,n,1)}function c(p,g,v){v!==0&&(i.drawElementsInstanced(n,g,r,p*a,v),t.update(g,n,v))}function u(p,g,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,g,0,r,p,0,v);let d=0;for(let f=0;f<v;f++)d+=g[f];t.update(d,n,1)}function h(p,g,v,m){if(v===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<p.length;f++)c(p[f]/a,g[f],m[f]);else{d.multiDrawElementsInstancedWEBGL(n,g,0,r,p,0,m,0,v);let f=0;for(let b=0;b<v;b++)f+=g[b]*m[b];t.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function gy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function xy(i,e,t){let n=new WeakMap,s=new ct;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,p=n.get(o);if(p===void 0||p.count!==h){let S=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",S)};p!==void 0&&p.texture.dispose();let g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let y=o.attributes.position.count*M,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let C=new Float32Array(y*w*4*h),L=new $r(C,y,w,h);L.type=On,L.needsUpdate=!0;let T=M*4;for(let _=0;_<h;_++){let I=d[_],O=f[_],G=b[_],j=y*w*4*_;for(let K=0;K<I.count;K++){let J=K*T;g===!0&&(s.fromBufferAttribute(I,K),C[j+J+0]=s.x,C[j+J+1]=s.y,C[j+J+2]=s.z,C[j+J+3]=0),v===!0&&(s.fromBufferAttribute(O,K),C[j+J+4]=s.x,C[j+J+5]=s.y,C[j+J+6]=s.z,C[j+J+7]=0),m===!0&&(s.fromBufferAttribute(G,K),C[j+J+8]=s.x,C[j+J+9]=s.y,C[j+J+10]=s.z,C[j+J+11]=G.itemSize===4?s.w:1)}}p={count:h,texture:L,size:new ne(y,w)},n.set(o,p),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];let v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function vy(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return h}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Dp=new nn,mp=new ia(1,1),Up=new $r,Np=new Oo,Fp=new jr,gp=[],xp=[],vp=new Float32Array(16),yp=new Float32Array(9),_p=new Float32Array(4);function ur(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=gp[s];if(r===void 0&&(r=new Float32Array(s),gp[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hc(i,e){let t=xp[e];t===void 0&&(t=new Int32Array(e),xp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function yy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function _y(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function by(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function My(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function Sy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;_p.set(n),i.uniformMatrix2fv(this.addr,!1,_p),Vt(t,n)}}function wy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;yp.set(n),i.uniformMatrix3fv(this.addr,!1,yp),Vt(t,n)}}function Ey(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;vp.set(n),i.uniformMatrix4fv(this.addr,!1,vp),Vt(t,n)}}function Ty(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ay(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function Cy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function Ry(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function Iy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Py(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function Ly(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function Dy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function Uy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(mp.compareFunction=Wu,r=mp):r=Dp,t.setTexture2D(e||r,s)}function Ny(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Np,s)}function Fy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Fp,s)}function Oy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Up,s)}function By(i){switch(i){case 5126:return yy;case 35664:return _y;case 35665:return by;case 35666:return My;case 35674:return Sy;case 35675:return wy;case 35676:return Ey;case 5124:case 35670:return Ty;case 35667:case 35671:return Ay;case 35668:case 35672:return Cy;case 35669:case 35673:return Ry;case 5125:return Iy;case 36294:return Py;case 36295:return Ly;case 36296:return Dy;case 35678:case 36198:case 36298:case 36306:case 35682:return Uy;case 35679:case 36299:case 36307:return Ny;case 35680:case 36300:case 36308:case 36293:return Fy;case 36289:case 36303:case 36311:case 36292:return Oy}}function ky(i,e){i.uniform1fv(this.addr,e)}function zy(i,e){let t=ur(e,this.size,2);i.uniform2fv(this.addr,t)}function Hy(i,e){let t=ur(e,this.size,3);i.uniform3fv(this.addr,t)}function Vy(i,e){let t=ur(e,this.size,4);i.uniform4fv(this.addr,t)}function Gy(i,e){let t=ur(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function qy(i,e){let t=ur(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wy(i,e){let t=ur(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function $y(i,e){i.uniform1iv(this.addr,e)}function Xy(i,e){i.uniform2iv(this.addr,e)}function Yy(i,e){i.uniform3iv(this.addr,e)}function Zy(i,e){i.uniform4iv(this.addr,e)}function jy(i,e){i.uniform1uiv(this.addr,e)}function Jy(i,e){i.uniform2uiv(this.addr,e)}function Ky(i,e){i.uniform3uiv(this.addr,e)}function Qy(i,e){i.uniform4uiv(this.addr,e)}function e_(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Dp,r[a])}function t_(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Np,r[a])}function n_(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Fp,r[a])}function i_(i,e,t){let n=this.cache,s=e.length,r=hc(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Up,r[a])}function s_(i){switch(i){case 5126:return ky;case 35664:return zy;case 35665:return Hy;case 35666:return Vy;case 35674:return Gy;case 35675:return qy;case 35676:return Wy;case 5124:case 35670:return $y;case 35667:case 35671:return Xy;case 35668:case 35672:return Yy;case 35669:case 35673:return Zy;case 5125:return jy;case 36294:return Jy;case 36295:return Ky;case 36296:return Qy;case 35678:case 36198:case 36298:case 36306:case 35682:return e_;case 35679:case 36299:case 36307:return t_;case 35680:case 36300:case 36308:case 36293:return n_;case 36289:case 36303:case 36311:case 36292:return i_}}var oh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=By(t.type)}},lh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=s_(t.type)}},ch=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ah=/(\w+)(\])?(\[|\.)?/g;function bp(i,e){i.seq.push(e),i.map[e.id]=e}function r_(i,e,t){let n=i.name,s=n.length;for(ah.lastIndex=0;;){let r=ah.exec(n),a=ah.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){bp(t,c===void 0?new oh(o,i,e):new lh(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new ch(o),bp(t,h)),t=h}}}var lr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);r_(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Mp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var a_=37297,o_=0;function l_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Sp=new Ze;function c_(i){et._getMatrix(Sp,et.workingColorSpace,i);let e=`mat3( ${Sp.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Gr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function wp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+l_(i.getShaderSource(e),o)}else return r}function u_(i,e){let t=c_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function h_(i,e){let t;switch(e){case xl:t="Linear";break;case vl:t="Reinhard";break;case yl:t="Cineon";break;case Ui:t="ACESFilmic";break;case bl:t="AgX";break;case Ml:t="Neutral";break;case _l:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var cc=new D;function d_(){et.getLuminanceCoefficients(cc);let i=cc.x.toFixed(4),e=cc.y.toFixed(4),t=cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function f_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Aa).join(`
`)}function p_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function m_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Aa(i){return i!==""}function Ep(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Tp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var g_=/^[ \t]*#include +<([\w\d./]+)>/gm;function uh(i){return i.replace(g_,v_)}var x_=new Map;function v_(i,e){let t=Je[e];if(t===void 0){let n=x_.get(e);if(n!==void 0)t=Je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return uh(t)}var y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ap(i){return i.replace(y_,__)}function __(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function b_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===nr?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Xn&&(e="SHADOWMAP_TYPE_VSM"),e}function M_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ds:case fs:e="ENVMAP_TYPE_CUBE";break;case ba:e="ENVMAP_TYPE_CUBE_UV";break}return e}function S_(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===fs&&(e="ENVMAP_MODE_REFRACTION"),e}function w_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Nu:e="ENVMAP_BLENDING_MULTIPLY";break;case Hf:e="ENVMAP_BLENDING_MIX";break;case Vf:e="ENVMAP_BLENDING_ADD";break}return e}function E_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function T_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=b_(t),c=M_(t),u=S_(t),h=w_(t),p=E_(t),g=f_(t),v=p_(r),m=s.createProgram(),d,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Aa).join(`
`),d.length>0&&(d+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Aa).join(`
`),f.length>0&&(f+=`
`)):(d=[Cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Aa).join(`
`),f=[Cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ui?"#define TONE_MAPPING":"",t.toneMapping!==ui?Je.tonemapping_pars_fragment:"",t.toneMapping!==ui?h_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,u_("linearToOutputTexel",t.outputColorSpace),d_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Aa).join(`
`)),a=uh(a),a=Ep(a,t),a=Tp(a,t),o=uh(o),o=Ep(o,t),o=Tp(o,t),a=Ap(a),o=Ap(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,d=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["#define varying in",t.glslVersion===$u?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$u?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let M=b+d+a,y=b+f+o,w=Mp(s,s.VERTEX_SHADER,M),C=Mp(s,s.FRAGMENT_SHADER,y);s.attachShader(m,w),s.attachShader(m,C),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function L(I){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(m)||"",G=s.getShaderInfoLog(w)||"",j=s.getShaderInfoLog(C)||"",K=O.trim(),J=G.trim(),le=j.trim(),X=!0,he=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,w,C);else{let Me=wp(s,w,"vertex"),we=wp(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+K+`
`+Me+`
`+we)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(J===""||le==="")&&(he=!1);he&&(I.diagnostics={runnable:X,programLog:K,vertexShader:{log:J,prefix:d},fragmentShader:{log:le,prefix:f}})}s.deleteShader(w),s.deleteShader(C),T=new lr(s,m),S=m_(s,m)}let T;this.getUniforms=function(){return T===void 0&&L(this),T};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(m,a_)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=o_++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=C,this}var A_=0,hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new dh(e),t.set(e,n)),n}},dh=class{constructor(e){this.id=A_++,this.code=e,this.usedTimes=0}};function C_(i,e,t,n,s,r,a){let o=new Ws,l=new hh,c=new Set,u=[],h=s.logarithmicDepthBuffer,p=s.vertexTextures,g=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(S){return c.add(S),S===0?"uv":`uv${S}`}function d(S,_,I,O,G){let j=O.fog,K=G.geometry,J=S.isMeshStandardMaterial?O.environment:null,le=(S.isMeshStandardMaterial?t:e).get(S.envMap||J),X=le&&le.mapping===ba?le.image.height:null,he=v[S.type];S.precision!==null&&(g=s.getMaxPrecision(S.precision),g!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",g,"instead."));let Me=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,we=Me!==void 0?Me.length:0,ae=0;K.morphAttributes.position!==void 0&&(ae=1),K.morphAttributes.normal!==void 0&&(ae=2),K.morphAttributes.color!==void 0&&(ae=3);let Ae,ke,$e,B;if(he){let st=Yn[he];Ae=st.vertexShader,ke=st.fragmentShader}else Ae=S.vertexShader,ke=S.fragmentShader,l.update(S),$e=l.getVertexShaderID(S),B=l.getFragmentShaderID(S);let q=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),xe=G.isInstancedMesh===!0,Se=G.isBatchedMesh===!0,He=!!S.map,Ye=!!S.matcap,U=!!le,se=!!S.aoMap,te=!!S.lightMap,ee=!!S.bumpMap,Q=!!S.normalMap,ge=!!S.displacementMap,ce=!!S.emissiveMap,_e=!!S.metalnessMap,qe=!!S.roughnessMap,Ve=S.anisotropy>0,R=S.clearcoat>0,E=S.dispersion>0,P=S.iridescence>0,N=S.sheen>0,V=S.transmission>0,k=Ve&&!!S.anisotropyMap,$=R&&!!S.clearcoatMap,W=R&&!!S.clearcoatNormalMap,oe=R&&!!S.clearcoatRoughnessMap,ye=P&&!!S.iridescenceMap,ie=P&&!!S.iridescenceThicknessMap,pe=N&&!!S.sheenColorMap,Ie=N&&!!S.sheenRoughnessMap,Te=!!S.specularMap,be=!!S.specularColorMap,We=!!S.specularIntensityMap,F=V&&!!S.transmissionMap,ue=V&&!!S.thicknessMap,ve=!!S.gradientMap,Re=!!S.alphaMap,fe=S.alphaTest>0,re=!!S.alphaHash,Ue=!!S.extensions,Xe=ui;S.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Xe=i.toneMapping);let gt={shaderID:he,shaderType:S.type,shaderName:S.name,vertexShader:Ae,fragmentShader:ke,defines:S.defines,customVertexShaderID:$e,customFragmentShaderID:B,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:g,batching:Se,batchingColor:Se&&G._colorsTexture!==null,instancing:xe,instancingColor:xe&&G.instanceColor!==null,instancingMorph:xe&&G.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:q===null?i.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:es,alphaToCoverage:!!S.alphaToCoverage,map:He,matcap:Ye,envMap:U,envMapMode:U&&le.mapping,envMapCubeUVHeight:X,aoMap:se,lightMap:te,bumpMap:ee,normalMap:Q,displacementMap:p&&ge,emissiveMap:ce,normalMapObjectSpace:Q&&S.normalMapType===$f,normalMapTangentSpace:Q&&S.normalMapType===qu,metalnessMap:_e,roughnessMap:qe,anisotropy:Ve,anisotropyMap:k,clearcoat:R,clearcoatMap:$,clearcoatNormalMap:W,clearcoatRoughnessMap:oe,dispersion:E,iridescence:P,iridescenceMap:ye,iridescenceThicknessMap:ie,sheen:N,sheenColorMap:pe,sheenRoughnessMap:Ie,specularMap:Te,specularColorMap:be,specularIntensityMap:We,transmission:V,transmissionMap:F,thicknessMap:ue,gradientMap:ve,opaque:S.transparent===!1&&S.blending===Ki&&S.alphaToCoverage===!1,alphaMap:Re,alphaTest:fe,alphaHash:re,combine:S.combine,mapUv:He&&m(S.map.channel),aoMapUv:se&&m(S.aoMap.channel),lightMapUv:te&&m(S.lightMap.channel),bumpMapUv:ee&&m(S.bumpMap.channel),normalMapUv:Q&&m(S.normalMap.channel),displacementMapUv:ge&&m(S.displacementMap.channel),emissiveMapUv:ce&&m(S.emissiveMap.channel),metalnessMapUv:_e&&m(S.metalnessMap.channel),roughnessMapUv:qe&&m(S.roughnessMap.channel),anisotropyMapUv:k&&m(S.anisotropyMap.channel),clearcoatMapUv:$&&m(S.clearcoatMap.channel),clearcoatNormalMapUv:W&&m(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&m(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&m(S.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&m(S.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&m(S.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&m(S.sheenRoughnessMap.channel),specularMapUv:Te&&m(S.specularMap.channel),specularColorMapUv:be&&m(S.specularColorMap.channel),specularIntensityMapUv:We&&m(S.specularIntensityMap.channel),transmissionMapUv:F&&m(S.transmissionMap.channel),thicknessMapUv:ue&&m(S.thicknessMap.channel),alphaMapUv:Re&&m(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Q||Ve),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!K.attributes.uv&&(He||Re),fog:!!j,useFog:S.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:de,skinning:G.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:ae,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xe,decodeVideoTexture:He&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===it,decodeVideoTextureEmissive:ce&&S.emissiveMap.isVideoTexture===!0&&et.getTransfer(S.emissiveMap.colorSpace)===it,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===sn,flipSided:S.side===Yt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ue&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&S.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function f(S){let _=[];if(S.shaderID?_.push(S.shaderID):(_.push(S.customVertexShaderID),_.push(S.customFragmentShaderID)),S.defines!==void 0)for(let I in S.defines)_.push(I),_.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(b(_,S),M(_,S),_.push(i.outputColorSpace)),_.push(S.customProgramCacheKey),_.join()}function b(S,_){S.push(_.precision),S.push(_.outputColorSpace),S.push(_.envMapMode),S.push(_.envMapCubeUVHeight),S.push(_.mapUv),S.push(_.alphaMapUv),S.push(_.lightMapUv),S.push(_.aoMapUv),S.push(_.bumpMapUv),S.push(_.normalMapUv),S.push(_.displacementMapUv),S.push(_.emissiveMapUv),S.push(_.metalnessMapUv),S.push(_.roughnessMapUv),S.push(_.anisotropyMapUv),S.push(_.clearcoatMapUv),S.push(_.clearcoatNormalMapUv),S.push(_.clearcoatRoughnessMapUv),S.push(_.iridescenceMapUv),S.push(_.iridescenceThicknessMapUv),S.push(_.sheenColorMapUv),S.push(_.sheenRoughnessMapUv),S.push(_.specularMapUv),S.push(_.specularColorMapUv),S.push(_.specularIntensityMapUv),S.push(_.transmissionMapUv),S.push(_.thicknessMapUv),S.push(_.combine),S.push(_.fogExp2),S.push(_.sizeAttenuation),S.push(_.morphTargetsCount),S.push(_.morphAttributeCount),S.push(_.numDirLights),S.push(_.numPointLights),S.push(_.numSpotLights),S.push(_.numSpotLightMaps),S.push(_.numHemiLights),S.push(_.numRectAreaLights),S.push(_.numDirLightShadows),S.push(_.numPointLightShadows),S.push(_.numSpotLightShadows),S.push(_.numSpotLightShadowsWithMaps),S.push(_.numLightProbes),S.push(_.shadowMapType),S.push(_.toneMapping),S.push(_.numClippingPlanes),S.push(_.numClipIntersection),S.push(_.depthPacking)}function M(S,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),S.push(o.mask)}function y(S){let _=v[S.type],I;if(_){let O=Yn[_];I=di.clone(O.uniforms)}else I=S.uniforms;return I}function w(S,_){let I;for(let O=0,G=u.length;O<G;O++){let j=u[O];if(j.cacheKey===_){I=j,++I.usedTimes;break}}return I===void 0&&(I=new T_(i,_,S,r),u.push(I)),I}function C(S){if(--S.usedTimes===0){let _=u.indexOf(S);u[_]=u[u.length-1],u.pop(),S.destroy()}}function L(S){l.remove(S)}function T(){l.dispose()}return{getParameters:d,getProgramCacheKey:f,getUniforms:y,acquireProgram:w,releaseProgram:C,releaseShaderCache:L,programs:u,dispose:T}}function R_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function I_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Rp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ip(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,p,g,v,m,d){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:p,material:g,groupOrder:v,renderOrder:h.renderOrder,z:m,group:d},i[e]=f):(f.id=h.id,f.object=h,f.geometry=p,f.material=g,f.groupOrder=v,f.renderOrder=h.renderOrder,f.z=m,f.group=d),e++,f}function o(h,p,g,v,m,d){let f=a(h,p,g,v,m,d);g.transmission>0?n.push(f):g.transparent===!0?s.push(f):t.push(f)}function l(h,p,g,v,m,d){let f=a(h,p,g,v,m,d);g.transmission>0?n.unshift(f):g.transparent===!0?s.unshift(f):t.unshift(f)}function c(h,p){t.length>1&&t.sort(h||I_),n.length>1&&n.sort(p||Rp),s.length>1&&s.sort(p||Rp)}function u(){for(let h=e,p=i.length;h<p;h++){let g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function P_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Ip,i.set(n,[a])):s>=r.length?(a=new Ip,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function L_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Oe};break;case"SpotLight":t={position:new D,direction:new D,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function D_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var U_=0;function N_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function F_(i){let e=new L_,t=D_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new rt,a=new rt;function o(c){let u=0,h=0,p=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let g=0,v=0,m=0,d=0,f=0,b=0,M=0,y=0,w=0,C=0,L=0;c.sort(N_);for(let S=0,_=c.length;S<_;S++){let I=c[S],O=I.color,G=I.intensity,j=I.distance,K=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=O.r*G,h+=O.g*G,p+=O.b*G;else if(I.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(I.sh.coefficients[J],G);L++}else if(I.isDirectionalLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let le=I.shadow,X=t.get(I);X.shadowIntensity=le.intensity,X.shadowBias=le.bias,X.shadowNormalBias=le.normalBias,X.shadowRadius=le.radius,X.shadowMapSize=le.mapSize,n.directionalShadow[g]=X,n.directionalShadowMap[g]=K,n.directionalShadowMatrix[g]=I.shadow.matrix,b++}n.directional[g]=J,g++}else if(I.isSpotLight){let J=e.get(I);J.position.setFromMatrixPosition(I.matrixWorld),J.color.copy(O).multiplyScalar(G),J.distance=j,J.coneCos=Math.cos(I.angle),J.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),J.decay=I.decay,n.spot[m]=J;let le=I.shadow;if(I.map&&(n.spotLightMap[w]=I.map,w++,le.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[m]=le.matrix,I.castShadow){let X=t.get(I);X.shadowIntensity=le.intensity,X.shadowBias=le.bias,X.shadowNormalBias=le.normalBias,X.shadowRadius=le.radius,X.shadowMapSize=le.mapSize,n.spotShadow[m]=X,n.spotShadowMap[m]=K,y++}m++}else if(I.isRectAreaLight){let J=e.get(I);J.color.copy(O).multiplyScalar(G),J.halfWidth.set(I.width*.5,0,0),J.halfHeight.set(0,I.height*.5,0),n.rectArea[d]=J,d++}else if(I.isPointLight){let J=e.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),J.distance=I.distance,J.decay=I.decay,I.castShadow){let le=I.shadow,X=t.get(I);X.shadowIntensity=le.intensity,X.shadowBias=le.bias,X.shadowNormalBias=le.normalBias,X.shadowRadius=le.radius,X.shadowMapSize=le.mapSize,X.shadowCameraNear=le.camera.near,X.shadowCameraFar=le.camera.far,n.pointShadow[v]=X,n.pointShadowMap[v]=K,n.pointShadowMatrix[v]=I.shadow.matrix,M++}n.point[v]=J,v++}else if(I.isHemisphereLight){let J=e.get(I);J.skyColor.copy(I.color).multiplyScalar(G),J.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[f]=J,f++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=p;let T=n.hash;(T.directionalLength!==g||T.pointLength!==v||T.spotLength!==m||T.rectAreaLength!==d||T.hemiLength!==f||T.numDirectionalShadows!==b||T.numPointShadows!==M||T.numSpotShadows!==y||T.numSpotMaps!==w||T.numLightProbes!==L)&&(n.directional.length=g,n.spot.length=m,n.rectArea.length=d,n.point.length=v,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+w-C,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=L,T.directionalLength=g,T.pointLength=v,T.spotLength=m,T.rectAreaLength=d,T.hemiLength=f,T.numDirectionalShadows=b,T.numPointShadows=M,T.numSpotShadows=y,T.numSpotMaps=w,T.numLightProbes=L,n.version=U_++)}function l(c,u){let h=0,p=0,g=0,v=0,m=0,d=u.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){let M=c[f];if(M.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),h++}else if(M.isSpotLight){let y=n.spot[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),g++}else if(M.isRectAreaLight){let y=n.rectArea[v];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),a.identity(),r.copy(M.matrixWorld),r.premultiply(d),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),v++}else if(M.isPointLight){let y=n.point[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),p++}else if(M.isHemisphereLight){let y=n.hemi[m];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(d),m++}}}return{setup:o,setupView:l,state:n}}function Pp(i){let e=new F_(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function O_(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Pp(i),e.set(s,[o])):r>=a.length?(o=new Pp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var B_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,k_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function z_(i,e,t){let n=new Xs,s=new ne,r=new ne,a=new ct,o=new Jo({depthPacking:Wf}),l=new Ko,c={},u=t.maxTextureSize,h={[ai]:Yt,[Yt]:ai,[sn]:sn},p=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:B_,fragmentShader:k_}),g=p.clone();g.defines.HORIZONTAL_PASS=1;let v=new xt;v.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let m=new Ke(v,p),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lu;let f=this.type;this.render=function(C,L,T){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||C.length===0)return;let S=i.getRenderTarget(),_=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Nn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let G=f!==Xn&&this.type===Xn,j=f===Xn&&this.type!==Xn;for(let K=0,J=C.length;K<J;K++){let le=C[K],X=le.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let he=X.getFrameExtents();if(s.multiply(he),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/he.x),s.x=r.x*he.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/he.y),s.y=r.y*he.y,X.mapSize.y=r.y)),X.map===null||G===!0||j===!0){let we=this.type!==Xn?{minFilter:ln,magFilter:ln}:{};X.map!==null&&X.map.dispose(),X.map=new Kt(s.x,s.y,we),X.map.texture.name=le.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let Me=X.getViewportCount();for(let we=0;we<Me;we++){let ae=X.getViewport(we);a.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),O.viewport(a),X.updateMatrices(le,we),n=X.getFrustum(),y(L,T,X.camera,le,this.type)}X.isPointLightShadow!==!0&&this.type===Xn&&b(X,T),X.needsUpdate=!1}f=this.type,d.needsUpdate=!1,i.setRenderTarget(S,_,I)};function b(C,L){let T=e.update(m);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,g.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,g.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Kt(s.x,s.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(L,null,T,p,m,null),g.uniforms.shadow_pass.value=C.mapPass.texture,g.uniforms.resolution.value=C.mapSize,g.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(L,null,T,g,m,null)}function M(C,L,T,S){let _=null,I=T.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)_=I;else if(_=T.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let O=_.uuid,G=L.uuid,j=c[O];j===void 0&&(j={},c[O]=j);let K=j[G];K===void 0&&(K=_.clone(),j[G]=K,L.addEventListener("dispose",w)),_=K}if(_.visible=L.visible,_.wireframe=L.wireframe,S===Xn?_.side=L.shadowSide!==null?L.shadowSide:L.side:_.side=L.shadowSide!==null?L.shadowSide:h[L.side],_.alphaMap=L.alphaMap,_.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,_.map=L.map,_.clipShadows=L.clipShadows,_.clippingPlanes=L.clippingPlanes,_.clipIntersection=L.clipIntersection,_.displacementMap=L.displacementMap,_.displacementScale=L.displacementScale,_.displacementBias=L.displacementBias,_.wireframeLinewidth=L.wireframeLinewidth,_.linewidth=L.linewidth,T.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let O=i.properties.get(_);O.light=T}return _}function y(C,L,T,S,_){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&_===Xn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,C.matrixWorld);let G=e.update(C),j=C.material;if(Array.isArray(j)){let K=G.groups;for(let J=0,le=K.length;J<le;J++){let X=K[J],he=j[X.materialIndex];if(he&&he.visible){let Me=M(C,he,S,_);C.onBeforeShadow(i,C,L,T,G,Me,X),i.renderBufferDirect(T,null,G,Me,C,X),C.onAfterShadow(i,C,L,T,G,Me,X)}}}else if(j.visible){let K=M(C,j,S,_);C.onBeforeShadow(i,C,L,T,G,K,null),i.renderBufferDirect(T,null,G,K,C,null),C.onAfterShadow(i,C,L,T,G,K,null)}}let O=C.children;for(let G=0,j=O.length;G<j;G++)y(O[G],L,T,S,_)}function w(C){C.target.removeEventListener("dispose",w);for(let T in c){let S=c[T],_=C.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}var H_={[ul]:hl,[dl]:ml,[fl]:gl,[Qi]:pl,[hl]:ul,[ml]:dl,[gl]:fl,[pl]:Qi};function V_(i,e){function t(){let F=!1,ue=new ct,ve=null,Re=new ct(0,0,0,0);return{setMask:function(fe){ve!==fe&&!F&&(i.colorMask(fe,fe,fe,fe),ve=fe)},setLocked:function(fe){F=fe},setClear:function(fe,re,Ue,Xe,gt){gt===!0&&(fe*=Xe,re*=Xe,Ue*=Xe),ue.set(fe,re,Ue,Xe),Re.equals(ue)===!1&&(i.clearColor(fe,re,Ue,Xe),Re.copy(ue))},reset:function(){F=!1,ve=null,Re.set(-1,0,0,0)}}}function n(){let F=!1,ue=!1,ve=null,Re=null,fe=null;return{setReversed:function(re){if(ue!==re){let Ue=e.get("EXT_clip_control");re?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ue=re;let Xe=fe;fe=null,this.setClear(Xe)}},getReversed:function(){return ue},setTest:function(re){re?q(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(re){ve!==re&&!F&&(i.depthMask(re),ve=re)},setFunc:function(re){if(ue&&(re=H_[re]),Re!==re){switch(re){case ul:i.depthFunc(i.NEVER);break;case hl:i.depthFunc(i.ALWAYS);break;case dl:i.depthFunc(i.LESS);break;case Qi:i.depthFunc(i.LEQUAL);break;case fl:i.depthFunc(i.EQUAL);break;case pl:i.depthFunc(i.GEQUAL);break;case ml:i.depthFunc(i.GREATER);break;case gl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Re=re}},setLocked:function(re){F=re},setClear:function(re){fe!==re&&(ue&&(re=1-re),i.clearDepth(re),fe=re)},reset:function(){F=!1,ve=null,Re=null,fe=null,ue=!1}}}function s(){let F=!1,ue=null,ve=null,Re=null,fe=null,re=null,Ue=null,Xe=null,gt=null;return{setTest:function(st){F||(st?q(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(st){ue!==st&&!F&&(i.stencilMask(st),ue=st)},setFunc:function(st,jn,kn){(ve!==st||Re!==jn||fe!==kn)&&(i.stencilFunc(st,jn,kn),ve=st,Re=jn,fe=kn)},setOp:function(st,jn,kn){(re!==st||Ue!==jn||Xe!==kn)&&(i.stencilOp(st,jn,kn),re=st,Ue=jn,Xe=kn)},setLocked:function(st){F=st},setClear:function(st){gt!==st&&(i.clearStencil(st),gt=st)},reset:function(){F=!1,ue=null,ve=null,Re=null,fe=null,re=null,Ue=null,Xe=null,gt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},h={},p=new WeakMap,g=[],v=null,m=!1,d=null,f=null,b=null,M=null,y=null,w=null,C=null,L=new Oe(0,0,0),T=0,S=!1,_=null,I=null,O=null,G=null,j=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,le=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(X)[1]),J=le>=1):X.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),J=le>=2);let he=null,Me={},we=i.getParameter(i.SCISSOR_BOX),ae=i.getParameter(i.VIEWPORT),Ae=new ct().fromArray(we),ke=new ct().fromArray(ae);function $e(F,ue,ve,Re){let fe=new Uint8Array(4),re=i.createTexture();i.bindTexture(F,re),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<ve;Ue++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,Re,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ue+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return re}let B={};B[i.TEXTURE_2D]=$e(i.TEXTURE_2D,i.TEXTURE_2D,1),B[i.TEXTURE_CUBE_MAP]=$e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[i.TEXTURE_2D_ARRAY]=$e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),B[i.TEXTURE_3D]=$e(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),q(i.DEPTH_TEST),a.setFunc(Qi),ee(!1),Q(Pu),q(i.CULL_FACE),se(Nn);function q(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function de(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function xe(F,ue){return h[F]!==ue?(i.bindFramebuffer(F,ue),h[F]=ue,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ue),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function Se(F,ue){let ve=g,Re=!1;if(F){ve=p.get(ue),ve===void 0&&(ve=[],p.set(ue,ve));let fe=F.textures;if(ve.length!==fe.length||ve[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Ue=fe.length;re<Ue;re++)ve[re]=i.COLOR_ATTACHMENT0+re;ve.length=fe.length,Re=!0}}else ve[0]!==i.BACK&&(ve[0]=i.BACK,Re=!0);Re&&i.drawBuffers(ve)}function He(F){return v!==F?(i.useProgram(F),v=F,!0):!1}let Ye={[Ei]:i.FUNC_ADD,[wf]:i.FUNC_SUBTRACT,[Ef]:i.FUNC_REVERSE_SUBTRACT};Ye[Tf]=i.MIN,Ye[Af]=i.MAX;let U={[Cf]:i.ZERO,[Rf]:i.ONE,[If]:i.SRC_COLOR,[Io]:i.SRC_ALPHA,[Ff]:i.SRC_ALPHA_SATURATE,[Uf]:i.DST_COLOR,[Lf]:i.DST_ALPHA,[Pf]:i.ONE_MINUS_SRC_COLOR,[Po]:i.ONE_MINUS_SRC_ALPHA,[Nf]:i.ONE_MINUS_DST_COLOR,[Df]:i.ONE_MINUS_DST_ALPHA,[Of]:i.CONSTANT_COLOR,[Bf]:i.ONE_MINUS_CONSTANT_COLOR,[kf]:i.CONSTANT_ALPHA,[zf]:i.ONE_MINUS_CONSTANT_ALPHA};function se(F,ue,ve,Re,fe,re,Ue,Xe,gt,st){if(F===Nn){m===!0&&(de(i.BLEND),m=!1);return}if(m===!1&&(q(i.BLEND),m=!0),F!==Sf){if(F!==d||st!==S){if((f!==Ei||y!==Ei)&&(i.blendEquation(i.FUNC_ADD),f=Ei,y=Ei),st)switch(F){case Ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Di:i.blendFunc(i.ONE,i.ONE);break;case Du:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Di:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Du:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}b=null,M=null,w=null,C=null,L.set(0,0,0),T=0,d=F,S=st}return}fe=fe||ue,re=re||ve,Ue=Ue||Re,(ue!==f||fe!==y)&&(i.blendEquationSeparate(Ye[ue],Ye[fe]),f=ue,y=fe),(ve!==b||Re!==M||re!==w||Ue!==C)&&(i.blendFuncSeparate(U[ve],U[Re],U[re],U[Ue]),b=ve,M=Re,w=re,C=Ue),(Xe.equals(L)===!1||gt!==T)&&(i.blendColor(Xe.r,Xe.g,Xe.b,gt),L.copy(Xe),T=gt),d=F,S=!1}function te(F,ue){F.side===sn?de(i.CULL_FACE):q(i.CULL_FACE);let ve=F.side===Yt;ue&&(ve=!ve),ee(ve),F.blending===Ki&&F.transparent===!1?se(Nn):se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let Re=F.stencilWrite;o.setTest(Re),Re&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ce(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?q(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(F){_!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),_=F)}function Q(F){F!==bf?(q(i.CULL_FACE),F!==I&&(F===Pu?i.cullFace(i.BACK):F===Mf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),I=F}function ge(F){F!==O&&(J&&i.lineWidth(F),O=F)}function ce(F,ue,ve){F?(q(i.POLYGON_OFFSET_FILL),(G!==ue||j!==ve)&&(i.polygonOffset(ue,ve),G=ue,j=ve)):de(i.POLYGON_OFFSET_FILL)}function _e(F){F?q(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function qe(F){F===void 0&&(F=i.TEXTURE0+K-1),he!==F&&(i.activeTexture(F),he=F)}function Ve(F,ue,ve){ve===void 0&&(he===null?ve=i.TEXTURE0+K-1:ve=he);let Re=Me[ve];Re===void 0&&(Re={type:void 0,texture:void 0},Me[ve]=Re),(Re.type!==F||Re.texture!==ue)&&(he!==ve&&(i.activeTexture(ve),he=ve),i.bindTexture(F,ue||B[F]),Re.type=F,Re.texture=ue)}function R(){let F=Me[he];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function E(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function N(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function V(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function W(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pe(F){Ae.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Ae.copy(F))}function Ie(F){ke.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),ke.copy(F))}function Te(F,ue){let ve=c.get(ue);ve===void 0&&(ve=new WeakMap,c.set(ue,ve));let Re=ve.get(F);Re===void 0&&(Re=i.getUniformBlockIndex(ue,F.name),ve.set(F,Re))}function be(F,ue){let Re=c.get(ue).get(F);l.get(ue)!==Re&&(i.uniformBlockBinding(ue,Re,F.__bindingPointIndex),l.set(ue,Re))}function We(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},he=null,Me={},h={},p=new WeakMap,g=[],v=null,m=!1,d=null,f=null,b=null,M=null,y=null,w=null,C=null,L=new Oe(0,0,0),T=0,S=!1,_=null,I=null,O=null,G=null,j=null,Ae.set(0,0,i.canvas.width,i.canvas.height),ke.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:q,disable:de,bindFramebuffer:xe,drawBuffers:Se,useProgram:He,setBlending:se,setMaterial:te,setFlipSided:ee,setCullFace:Q,setLineWidth:ge,setPolygonOffset:ce,setScissorTest:_e,activeTexture:qe,bindTexture:Ve,unbindTexture:R,compressedTexImage2D:E,compressedTexImage3D:P,texImage2D:ye,texImage3D:ie,updateUBOMapping:Te,uniformBlockBinding:be,texStorage2D:W,texStorage3D:oe,texSubImage2D:N,texSubImage3D:V,compressedTexSubImage2D:k,compressedTexSubImage3D:$,scissor:pe,viewport:Ie,reset:We}}function G_(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,u=new WeakMap,h,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,E){return g?new OffscreenCanvas(R,E):Wr("canvas")}function m(R,E,P){let N=1,V=Ve(R);if((V.width>P||V.height>P)&&(N=P/Math.max(V.width,V.height)),N<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let k=Math.floor(N*V.width),$=Math.floor(N*V.height);h===void 0&&(h=v(k,$));let W=E?v(k,$):h;return W.width=k,W.height=$,W.getContext("2d").drawImage(R,0,0,k,$),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+V.width+"x"+V.height+") to ("+k+"x"+$+")."),W}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+V.width+"x"+V.height+")."),R;return R}function d(R){return R.generateMipmaps}function f(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,E,P,N,V=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let k=E;if(E===i.RED&&(P===i.FLOAT&&(k=i.R32F),P===i.HALF_FLOAT&&(k=i.R16F),P===i.UNSIGNED_BYTE&&(k=i.R8)),E===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.R8UI),P===i.UNSIGNED_SHORT&&(k=i.R16UI),P===i.UNSIGNED_INT&&(k=i.R32UI),P===i.BYTE&&(k=i.R8I),P===i.SHORT&&(k=i.R16I),P===i.INT&&(k=i.R32I)),E===i.RG&&(P===i.FLOAT&&(k=i.RG32F),P===i.HALF_FLOAT&&(k=i.RG16F),P===i.UNSIGNED_BYTE&&(k=i.RG8)),E===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.RG8UI),P===i.UNSIGNED_SHORT&&(k=i.RG16UI),P===i.UNSIGNED_INT&&(k=i.RG32UI),P===i.BYTE&&(k=i.RG8I),P===i.SHORT&&(k=i.RG16I),P===i.INT&&(k=i.RG32I)),E===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.RGB8UI),P===i.UNSIGNED_SHORT&&(k=i.RGB16UI),P===i.UNSIGNED_INT&&(k=i.RGB32UI),P===i.BYTE&&(k=i.RGB8I),P===i.SHORT&&(k=i.RGB16I),P===i.INT&&(k=i.RGB32I)),E===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(k=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(k=i.RGBA16UI),P===i.UNSIGNED_INT&&(k=i.RGBA32UI),P===i.BYTE&&(k=i.RGBA8I),P===i.SHORT&&(k=i.RGBA16I),P===i.INT&&(k=i.RGBA32I)),E===i.RGB&&(P===i.UNSIGNED_INT_5_9_9_9_REV&&(k=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(k=i.R11F_G11F_B10F)),E===i.RGBA){let $=V?Gr:et.getTransfer(N);P===i.FLOAT&&(k=i.RGBA32F),P===i.HALF_FLOAT&&(k=i.RGBA16F),P===i.UNSIGNED_BYTE&&(k=$===it?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT_4_4_4_4&&(k=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(k=i.RGB5_A1)}return(k===i.R16F||k===i.R32F||k===i.RG16F||k===i.RG32F||k===i.RGBA16F||k===i.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function y(R,E){let P;return R?E===null||E===Fi||E===sr?P=i.DEPTH24_STENCIL8:E===On?P=i.DEPTH32F_STENCIL8:E===ir&&(P=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Fi||E===sr?P=i.DEPTH_COMPONENT24:E===On?P=i.DEPTH_COMPONENT32F:E===ir&&(P=i.DEPTH_COMPONENT16),P}function w(R,E){return d(R)===!0||R.isFramebufferTexture&&R.minFilter!==ln&&R.minFilter!==Ln?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function C(R){let E=R.target;E.removeEventListener("dispose",C),T(E),E.isVideoTexture&&u.delete(E)}function L(R){let E=R.target;E.removeEventListener("dispose",L),_(E)}function T(R){let E=n.get(R);if(E.__webglInit===void 0)return;let P=R.source,N=p.get(P);if(N){let V=N[E.__cacheKey];V.usedTimes--,V.usedTimes===0&&S(R),Object.keys(N).length===0&&p.delete(P)}n.remove(R)}function S(R){let E=n.get(R);i.deleteTexture(E.__webglTexture);let P=R.source,N=p.get(P);delete N[E.__cacheKey],a.memory.textures--}function _(R){let E=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(E.__webglFramebuffer[N]))for(let V=0;V<E.__webglFramebuffer[N].length;V++)i.deleteFramebuffer(E.__webglFramebuffer[N][V]);else i.deleteFramebuffer(E.__webglFramebuffer[N]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[N])}else{if(Array.isArray(E.__webglFramebuffer))for(let N=0;N<E.__webglFramebuffer.length;N++)i.deleteFramebuffer(E.__webglFramebuffer[N]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let N=0;N<E.__webglColorRenderbuffer.length;N++)E.__webglColorRenderbuffer[N]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[N]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let P=R.textures;for(let N=0,V=P.length;N<V;N++){let k=n.get(P[N]);k.__webglTexture&&(i.deleteTexture(k.__webglTexture),a.memory.textures--),n.remove(P[N])}n.remove(R)}let I=0;function O(){I=0}function G(){let R=I;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),I+=1,R}function j(R){let E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function K(R,E){let P=n.get(R);if(R.isVideoTexture&&_e(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&P.__version!==R.version){let N=R.image;if(N===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(N.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{B(P,R,E);return}}else R.isExternalTexture&&(P.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+E)}function J(R,E){let P=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&P.__version!==R.version){B(P,R,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+E)}function le(R,E){let P=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&P.__version!==R.version){B(P,R,E);return}t.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+E)}function X(R,E){let P=n.get(R);if(R.version>0&&P.__version!==R.version){q(P,R,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+E)}let he={[zs]:i.REPEAT,[wi]:i.CLAMP_TO_EDGE,[Lo]:i.MIRRORED_REPEAT},Me={[ln]:i.NEAREST,[Gf]:i.NEAREST_MIPMAP_NEAREST,[Ma]:i.NEAREST_MIPMAP_LINEAR,[Ln]:i.LINEAR,[El]:i.LINEAR_MIPMAP_NEAREST,[Ni]:i.LINEAR_MIPMAP_LINEAR},we={[Xf]:i.NEVER,[Qf]:i.ALWAYS,[Yf]:i.LESS,[Wu]:i.LEQUAL,[Zf]:i.EQUAL,[Kf]:i.GEQUAL,[jf]:i.GREATER,[Jf]:i.NOTEQUAL};function ae(R,E){if(E.type===On&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Ln||E.magFilter===El||E.magFilter===Ma||E.magFilter===Ni||E.minFilter===Ln||E.minFilter===El||E.minFilter===Ma||E.minFilter===Ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,he[E.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,he[E.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,he[E.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Me[E.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Me[E.minFilter]),E.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,we[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ln||E.minFilter!==Ma&&E.minFilter!==Ni||E.type===On&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let P=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Ae(R,E){let P=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",C));let N=E.source,V=p.get(N);V===void 0&&(V={},p.set(N,V));let k=j(E);if(k!==R.__cacheKey){V[k]===void 0&&(V[k]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,P=!0),V[k].usedTimes++;let $=V[R.__cacheKey];$!==void 0&&(V[R.__cacheKey].usedTimes--,$.usedTimes===0&&S(E)),R.__cacheKey=k,R.__webglTexture=V[k].texture}return P}function ke(R,E,P){return Math.floor(Math.floor(R/P)/E)}function $e(R,E,P,N){let k=R.updateRanges;if(k.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,P,N,E.data);else{k.sort((ie,pe)=>ie.start-pe.start);let $=0;for(let ie=1;ie<k.length;ie++){let pe=k[$],Ie=k[ie],Te=pe.start+pe.count,be=ke(Ie.start,E.width,4),We=ke(pe.start,E.width,4);Ie.start<=Te+1&&be===We&&ke(Ie.start+Ie.count-1,E.width,4)===be?pe.count=Math.max(pe.count,Ie.start+Ie.count-pe.start):(++$,k[$]=Ie)}k.length=$+1;let W=i.getParameter(i.UNPACK_ROW_LENGTH),oe=i.getParameter(i.UNPACK_SKIP_PIXELS),ye=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let ie=0,pe=k.length;ie<pe;ie++){let Ie=k[ie],Te=Math.floor(Ie.start/4),be=Math.ceil(Ie.count/4),We=Te%E.width,F=Math.floor(Te/E.width),ue=be,ve=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,We),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,We,F,ue,ve,P,N,E.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,W),i.pixelStorei(i.UNPACK_SKIP_PIXELS,oe),i.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function B(R,E,P){let N=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(N=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(N=i.TEXTURE_3D);let V=Ae(R,E),k=E.source;t.bindTexture(N,R.__webglTexture,i.TEXTURE0+P);let $=n.get(k);if(k.version!==$.__version||V===!0){t.activeTexture(i.TEXTURE0+P);let W=et.getPrimaries(et.workingColorSpace),oe=E.colorSpace===hi?null:et.getPrimaries(E.colorSpace),ye=E.colorSpace===hi||W===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ie=m(E.image,!1,s.maxTextureSize);ie=qe(E,ie);let pe=r.convert(E.format,E.colorSpace),Ie=r.convert(E.type),Te=M(E.internalFormat,pe,Ie,E.colorSpace,E.isVideoTexture);ae(N,E);let be,We=E.mipmaps,F=E.isVideoTexture!==!0,ue=$.__version===void 0||V===!0,ve=k.dataReady,Re=w(E,ie);if(E.isDepthTexture)Te=y(E.format===rr,E.type),ue&&(F?t.texStorage2D(i.TEXTURE_2D,1,Te,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Te,ie.width,ie.height,0,pe,Ie,null));else if(E.isDataTexture)if(We.length>0){F&&ue&&t.texStorage2D(i.TEXTURE_2D,Re,Te,We[0].width,We[0].height);for(let fe=0,re=We.length;fe<re;fe++)be=We[fe],F?ve&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,be.width,be.height,pe,Ie,be.data):t.texImage2D(i.TEXTURE_2D,fe,Te,be.width,be.height,0,pe,Ie,be.data);E.generateMipmaps=!1}else F?(ue&&t.texStorage2D(i.TEXTURE_2D,Re,Te,ie.width,ie.height),ve&&$e(E,ie,pe,Ie)):t.texImage2D(i.TEXTURE_2D,0,Te,ie.width,ie.height,0,pe,Ie,ie.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){F&&ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Te,We[0].width,We[0].height,ie.depth);for(let fe=0,re=We.length;fe<re;fe++)if(be=We[fe],E.format!==En)if(pe!==null)if(F){if(ve)if(E.layerUpdates.size>0){let Ue=eh(be.width,be.height,E.format,E.type);for(let Xe of E.layerUpdates){let gt=be.data.subarray(Xe*Ue/be.data.BYTES_PER_ELEMENT,(Xe+1)*Ue/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,Xe,be.width,be.height,1,pe,gt)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,be.width,be.height,ie.depth,pe,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,Te,be.width,be.height,ie.depth,0,be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?ve&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,be.width,be.height,ie.depth,pe,Ie,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,Te,be.width,be.height,ie.depth,0,pe,Ie,be.data)}else{F&&ue&&t.texStorage2D(i.TEXTURE_2D,Re,Te,We[0].width,We[0].height);for(let fe=0,re=We.length;fe<re;fe++)be=We[fe],E.format!==En?pe!==null?F?ve&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,be.width,be.height,pe,be.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,Te,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ve&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,be.width,be.height,pe,Ie,be.data):t.texImage2D(i.TEXTURE_2D,fe,Te,be.width,be.height,0,pe,Ie,be.data)}else if(E.isDataArrayTexture)if(F){if(ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Te,ie.width,ie.height,ie.depth),ve)if(E.layerUpdates.size>0){let fe=eh(ie.width,ie.height,E.format,E.type);for(let re of E.layerUpdates){let Ue=ie.data.subarray(re*fe/ie.data.BYTES_PER_ELEMENT,(re+1)*fe/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,re,ie.width,ie.height,1,pe,Ie,Ue)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,pe,Ie,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,ie.width,ie.height,ie.depth,0,pe,Ie,ie.data);else if(E.isData3DTexture)F?(ue&&t.texStorage3D(i.TEXTURE_3D,Re,Te,ie.width,ie.height,ie.depth),ve&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,pe,Ie,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Te,ie.width,ie.height,ie.depth,0,pe,Ie,ie.data);else if(E.isFramebufferTexture){if(ue)if(F)t.texStorage2D(i.TEXTURE_2D,Re,Te,ie.width,ie.height);else{let fe=ie.width,re=ie.height;for(let Ue=0;Ue<Re;Ue++)t.texImage2D(i.TEXTURE_2D,Ue,Te,fe,re,0,pe,Ie,null),fe>>=1,re>>=1}}else if(We.length>0){if(F&&ue){let fe=Ve(We[0]);t.texStorage2D(i.TEXTURE_2D,Re,Te,fe.width,fe.height)}for(let fe=0,re=We.length;fe<re;fe++)be=We[fe],F?ve&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,pe,Ie,be):t.texImage2D(i.TEXTURE_2D,fe,Te,pe,Ie,be);E.generateMipmaps=!1}else if(F){if(ue){let fe=Ve(ie);t.texStorage2D(i.TEXTURE_2D,Re,Te,fe.width,fe.height)}ve&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Ie,ie)}else t.texImage2D(i.TEXTURE_2D,0,Te,pe,Ie,ie);d(E)&&f(N),$.__version=k.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function q(R,E,P){if(E.image.length!==6)return;let N=Ae(R,E),V=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+P);let k=n.get(V);if(V.version!==k.__version||N===!0){t.activeTexture(i.TEXTURE0+P);let $=et.getPrimaries(et.workingColorSpace),W=E.colorSpace===hi?null:et.getPrimaries(E.colorSpace),oe=E.colorSpace===hi||$===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let ye=E.isCompressedTexture||E.image[0].isCompressedTexture,ie=E.image[0]&&E.image[0].isDataTexture,pe=[];for(let re=0;re<6;re++)!ye&&!ie?pe[re]=m(E.image[re],!0,s.maxCubemapSize):pe[re]=ie?E.image[re].image:E.image[re],pe[re]=qe(E,pe[re]);let Ie=pe[0],Te=r.convert(E.format,E.colorSpace),be=r.convert(E.type),We=M(E.internalFormat,Te,be,E.colorSpace),F=E.isVideoTexture!==!0,ue=k.__version===void 0||N===!0,ve=V.dataReady,Re=w(E,Ie);ae(i.TEXTURE_CUBE_MAP,E);let fe;if(ye){F&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,We,Ie.width,Ie.height);for(let re=0;re<6;re++){fe=pe[re].mipmaps;for(let Ue=0;Ue<fe.length;Ue++){let Xe=fe[Ue];E.format!==En?Te!==null?F?ve&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Xe.width,Xe.height,Te,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,We,Xe.width,Xe.height,0,Xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Xe.width,Xe.height,Te,be,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,We,Xe.width,Xe.height,0,Te,be,Xe.data)}}}else{if(fe=E.mipmaps,F&&ue){fe.length>0&&Re++;let re=Ve(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,We,re.width,re.height)}for(let re=0;re<6;re++)if(ie){F?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,pe[re].width,pe[re].height,Te,be,pe[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,pe[re].width,pe[re].height,0,Te,be,pe[re].data);for(let Ue=0;Ue<fe.length;Ue++){let gt=fe[Ue].image[re].image;F?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,gt.width,gt.height,Te,be,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,We,gt.width,gt.height,0,Te,be,gt.data)}}else{F?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Te,be,pe[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,Te,be,pe[re]);for(let Ue=0;Ue<fe.length;Ue++){let Xe=fe[Ue];F?ve&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,Te,be,Xe.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,We,Te,be,Xe.image[re])}}}d(E)&&f(i.TEXTURE_CUBE_MAP),k.__version=V.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function de(R,E,P,N,V,k){let $=r.convert(P.format,P.colorSpace),W=r.convert(P.type),oe=M(P.internalFormat,$,W,P.colorSpace),ye=n.get(E),ie=n.get(P);if(ie.__renderTarget=E,!ye.__hasExternalTextures){let pe=Math.max(1,E.width>>k),Ie=Math.max(1,E.height>>k);V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?t.texImage3D(V,k,oe,pe,Ie,E.depth,0,$,W,null):t.texImage2D(V,k,oe,pe,Ie,0,$,W,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),ce(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,N,V,ie.__webglTexture,0,ge(E)):(V===i.TEXTURE_2D||V>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&V<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,N,V,ie.__webglTexture,k),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(R,E,P){if(i.bindRenderbuffer(i.RENDERBUFFER,R),E.depthBuffer){let N=E.depthTexture,V=N&&N.isDepthTexture?N.type:null,k=y(E.stencilBuffer,V),$=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=ge(E);ce(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,W,k,E.width,E.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,W,k,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,k,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,R)}else{let N=E.textures;for(let V=0;V<N.length;V++){let k=N[V],$=r.convert(k.format,k.colorSpace),W=r.convert(k.type),oe=M(k.internalFormat,$,W,k.colorSpace),ye=ge(E);P&&ce(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,oe,E.width,E.height):ce(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,oe,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,oe,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Se(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let N=n.get(E.depthTexture);N.__renderTarget=E,(!N.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),K(E.depthTexture,0);let V=N.__webglTexture,k=ge(E);if(E.depthTexture.format===Hs)ce(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0);else if(E.depthTexture.format===rr)ce(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0,k):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function He(R){let E=n.get(R),P=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){let N=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),N){let V=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,N.removeEventListener("dispose",V)};N.addEventListener("dispose",V),E.__depthDisposeCallback=V}E.__boundDepthTexture=N}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");let N=R.texture.mipmaps;N&&N.length>0?Se(E.__webglFramebuffer[0],R):Se(E.__webglFramebuffer,R)}else if(P){E.__webglDepthbuffer=[];for(let N=0;N<6;N++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[N]),E.__webglDepthbuffer[N]===void 0)E.__webglDepthbuffer[N]=i.createRenderbuffer(),xe(E.__webglDepthbuffer[N],R,!1);else{let V=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=E.__webglDepthbuffer[N];i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,V,i.RENDERBUFFER,k)}}else{let N=R.texture.mipmaps;if(N&&N.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),xe(E.__webglDepthbuffer,R,!1);else{let V=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,k),i.framebufferRenderbuffer(i.FRAMEBUFFER,V,i.RENDERBUFFER,k)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(R,E,P){let N=n.get(R);E!==void 0&&de(N.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&He(R)}function U(R){let E=R.texture,P=n.get(R),N=n.get(E);R.addEventListener("dispose",L);let V=R.textures,k=R.isWebGLCubeRenderTarget===!0,$=V.length>1;if($||(N.__webglTexture===void 0&&(N.__webglTexture=i.createTexture()),N.__version=E.version,a.memory.textures++),k){P.__webglFramebuffer=[];for(let W=0;W<6;W++)if(E.mipmaps&&E.mipmaps.length>0){P.__webglFramebuffer[W]=[];for(let oe=0;oe<E.mipmaps.length;oe++)P.__webglFramebuffer[W][oe]=i.createFramebuffer()}else P.__webglFramebuffer[W]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){P.__webglFramebuffer=[];for(let W=0;W<E.mipmaps.length;W++)P.__webglFramebuffer[W]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if($)for(let W=0,oe=V.length;W<oe;W++){let ye=n.get(V[W]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&ce(R)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let W=0;W<V.length;W++){let oe=V[W];P.__webglColorRenderbuffer[W]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[W]);let ye=r.convert(oe.format,oe.colorSpace),ie=r.convert(oe.type),pe=M(oe.internalFormat,ye,ie,oe.colorSpace,R.isXRRenderTarget===!0),Ie=ge(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,pe,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,P.__webglColorRenderbuffer[W])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(P.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(k){t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture),ae(i.TEXTURE_CUBE_MAP,E);for(let W=0;W<6;W++)if(E.mipmaps&&E.mipmaps.length>0)for(let oe=0;oe<E.mipmaps.length;oe++)de(P.__webglFramebuffer[W][oe],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,oe);else de(P.__webglFramebuffer[W],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);d(E)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if($){for(let W=0,oe=V.length;W<oe;W++){let ye=V[W],ie=n.get(ye),pe=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(pe=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(pe,ie.__webglTexture),ae(pe,ye),de(P.__webglFramebuffer,R,ye,i.COLOR_ATTACHMENT0+W,pe,0),d(ye)&&f(pe)}t.unbindTexture()}else{let W=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(W=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(W,N.__webglTexture),ae(W,E),E.mipmaps&&E.mipmaps.length>0)for(let oe=0;oe<E.mipmaps.length;oe++)de(P.__webglFramebuffer[oe],R,E,i.COLOR_ATTACHMENT0,W,oe);else de(P.__webglFramebuffer,R,E,i.COLOR_ATTACHMENT0,W,0);d(E)&&f(W),t.unbindTexture()}R.depthBuffer&&He(R)}function se(R){let E=R.textures;for(let P=0,N=E.length;P<N;P++){let V=E[P];if(d(V)){let k=b(R),$=n.get(V).__webglTexture;t.bindTexture(k,$),f(k),t.unbindTexture()}}}let te=[],ee=[];function Q(R){if(R.samples>0){if(ce(R)===!1){let E=R.textures,P=R.width,N=R.height,V=i.COLOR_BUFFER_BIT,k=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=n.get(R),W=E.length>1;if(W)for(let ye=0;ye<E.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,$.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,$.__webglMultisampledFramebuffer);let oe=R.texture.mipmaps;oe&&oe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,$.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,$.__webglFramebuffer);for(let ye=0;ye<E.length;ye++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(V|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(V|=i.STENCIL_BUFFER_BIT)),W){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,$.__webglColorRenderbuffer[ye]);let ie=n.get(E[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,P,N,0,0,P,N,V,i.NEAREST),l===!0&&(te.length=0,ee.length=0,te.push(i.COLOR_ATTACHMENT0+ye),R.depthBuffer&&R.resolveDepthBuffer===!1&&(te.push(k),ee.push(k),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ee)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),W)for(let ye=0;ye<E.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,$.__webglColorRenderbuffer[ye]);let ie=n.get(E[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,$.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,$.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let E=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function ge(R){return Math.min(s.maxSamples,R.samples)}function ce(R){let E=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function _e(R){let E=a.render.frame;u.get(R)!==E&&(u.set(R,E),R.update())}function qe(R,E){let P=R.colorSpace,N=R.format,V=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||P!==es&&P!==hi&&(et.getTransfer(P)===it?(N!==En||V!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),E}function Ve(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=O,this.setTexture2D=K,this.setTexture2DArray=J,this.setTexture3D=le,this.setTextureCube=X,this.rebindTextures=Ye,this.setupRenderTarget=U,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=de,this.useMultisampledRTT=ce}function q_(i,e){function t(n,s=hi){let r,a=et.getTransfer(s);if(n===Fn)return i.UNSIGNED_BYTE;if(n===Al)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Cl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ku)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ou)return i.BYTE;if(n===Bu)return i.SHORT;if(n===ir)return i.UNSIGNED_SHORT;if(n===Tl)return i.INT;if(n===Fi)return i.UNSIGNED_INT;if(n===On)return i.FLOAT;if(n===wn)return i.HALF_FLOAT;if(n===Hu)return i.ALPHA;if(n===Vu)return i.RGB;if(n===En)return i.RGBA;if(n===Hs)return i.DEPTH_COMPONENT;if(n===rr)return i.DEPTH_STENCIL;if(n===Rl)return i.RED;if(n===Il)return i.RED_INTEGER;if(n===Gu)return i.RG;if(n===Pl)return i.RG_INTEGER;if(n===Ll)return i.RGBA_INTEGER;if(n===Sa||n===wa||n===Ea||n===Ta)if(a===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Dl||n===Ul||n===Nl||n===Fl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Dl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ul)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Nl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ol||n===Bl||n===kl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ol||n===Bl)return a===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===kl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===zl||n===Hl||n===Vl||n===Gl||n===ql||n===Wl||n===$l||n===Xl||n===Yl||n===Zl||n===jl||n===Jl||n===Kl||n===Ql)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===zl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Hl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ql)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$l)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Kl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ql)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ec||n===tc||n===nc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ec)return a===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ic||n===sc||n===rc||n===ac)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ic)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ac)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var W_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,fh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new sa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Tt({vertexShader:W_,fragmentShader:$_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ph=class extends qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,p=null,g=null,v=null,m=typeof XRWebGLBinding<"u",d=new fh,f={},b=t.getContextAttributes(),M=null,y=null,w=[],C=[],L=new ne,T=null,S=new kt;S.viewport=new ct;let _=new kt;_.viewport=new ct;let I=[S,_],O=new cl,G=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let q=w[B];return q===void 0&&(q=new $s,w[B]=q),q.getTargetRaySpace()},this.getControllerGrip=function(B){let q=w[B];return q===void 0&&(q=new $s,w[B]=q),q.getGripSpace()},this.getHand=function(B){let q=w[B];return q===void 0&&(q=new $s,w[B]=q),q.getHandSpace()};function K(B){let q=C.indexOf(B.inputSource);if(q===-1)return;let de=w[q];de!==void 0&&(de.update(B.inputSource,B.frame,c||a),de.dispatchEvent({type:B.type,data:B.inputSource}))}function J(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",le);for(let B=0;B<w.length;B++){let q=C[B];q!==null&&(C[B]=null,w[B].disconnect(q))}G=null,j=null,d.reset();for(let B in f)delete f[B];e.setRenderTarget(M),g=null,p=null,h=null,s=null,y=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return p!==null?p:g},this.getBinding=function(){return h===null&&m&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",J),s.addEventListener("inputsourceschange",le),b.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(L),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,xe=null,Se=null;b.depth&&(Se=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=b.stencil?rr:Hs,xe=b.stencil?sr:Fi);let He={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};h=this.getBinding(),p=h.createProjectionLayer(He),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),y=new Kt(p.textureWidth,p.textureHeight,{format:En,type:Fn,depthTexture:new ia(p.textureWidth,p.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let de={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),y=new Kt(g.framebufferWidth,g.framebufferHeight,{format:En,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$e.setContext(s),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function le(B){for(let q=0;q<B.removed.length;q++){let de=B.removed[q],xe=C.indexOf(de);xe>=0&&(C[xe]=null,w[xe].disconnect(de))}for(let q=0;q<B.added.length;q++){let de=B.added[q],xe=C.indexOf(de);if(xe===-1){for(let He=0;He<w.length;He++)if(He>=C.length){C.push(de),xe=He;break}else if(C[He]===null){C[He]=de,xe=He;break}if(xe===-1)break}let Se=w[xe];Se&&Se.connect(de)}}let X=new D,he=new D;function Me(B,q,de){X.setFromMatrixPosition(q.matrixWorld),he.setFromMatrixPosition(de.matrixWorld);let xe=X.distanceTo(he),Se=q.projectionMatrix.elements,He=de.projectionMatrix.elements,Ye=Se[14]/(Se[10]-1),U=Se[14]/(Se[10]+1),se=(Se[9]+1)/Se[5],te=(Se[9]-1)/Se[5],ee=(Se[8]-1)/Se[0],Q=(He[8]+1)/He[0],ge=Ye*ee,ce=Ye*Q,_e=xe/(-ee+Q),qe=_e*-ee;if(q.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(qe),B.translateZ(_e),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),Se[10]===-1)B.projectionMatrix.copy(q.projectionMatrix),B.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{let Ve=Ye+_e,R=U+_e,E=ge-qe,P=ce+(xe-qe),N=se*U/R*Ve,V=te*U/R*Ve;B.projectionMatrix.makePerspective(E,P,N,V,Ve,R),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function we(B,q){q===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(q.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let q=B.near,de=B.far;d.texture!==null&&(d.depthNear>0&&(q=d.depthNear),d.depthFar>0&&(de=d.depthFar)),O.near=_.near=S.near=q,O.far=_.far=S.far=de,(G!==O.near||j!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),G=O.near,j=O.far),O.layers.mask=B.layers.mask|6,S.layers.mask=O.layers.mask&3,_.layers.mask=O.layers.mask&5;let xe=B.parent,Se=O.cameras;we(O,xe);for(let He=0;He<Se.length;He++)we(Se[He],xe);Se.length===2?Me(O,S,_):O.projectionMatrix.copy(S.projectionMatrix),ae(B,O,xe)};function ae(B,q,de){de===null?B.matrix.copy(q.matrixWorld):(B.matrix.copy(de.matrixWorld),B.matrix.invert(),B.matrix.multiply(q.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(q.projectionMatrix),B.projectionMatrixInverse.copy(q.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Vs*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(p===null&&g===null))return l},this.setFoveation=function(B){l=B,p!==null&&(p.fixedFoveation=B),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=B)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(O)},this.getCameraTexture=function(B){return f[B]};let Ae=null;function ke(B,q){if(u=q.getViewerPose(c||a),v=q,u!==null){let de=u.views;g!==null&&(e.setRenderTargetFramebuffer(y,g.framebuffer),e.setRenderTarget(y));let xe=!1;de.length!==O.cameras.length&&(O.cameras.length=0,xe=!0);for(let U=0;U<de.length;U++){let se=de[U],te=null;if(g!==null)te=g.getViewport(se);else{let Q=h.getViewSubImage(p,se);te=Q.viewport,U===0&&(e.setRenderTargetTextures(y,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(y))}let ee=I[U];ee===void 0&&(ee=new kt,ee.layers.enable(U),ee.viewport=new ct,I[U]=ee),ee.matrix.fromArray(se.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(se.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(te.x,te.y,te.width,te.height),U===0&&(O.matrix.copy(ee.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),xe===!0&&O.cameras.push(ee)}let Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&m){h=n.getBinding();let U=h.getDepthInformation(de[0]);U&&U.isValid&&U.texture&&d.init(U,s.renderState)}if(Se&&Se.includes("camera-access")&&m){e.state.unbindTexture(),h=n.getBinding();for(let U=0;U<de.length;U++){let se=de[U].camera;if(se){let te=f[se];te||(te=new sa,f[se]=te);let ee=h.getCameraImage(se);te.sourceTexture=ee}}}}for(let de=0;de<w.length;de++){let xe=C[de],Se=w[de];xe!==null&&Se!==void 0&&Se.update(xe,q,c||a)}Ae&&Ae(B,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),v=null}let $e=new Lp;$e.setAnimationLoop(ke),this.setAnimationLoop=function(B){Ae=B},this.dispose=function(){}}},gs=new Dn,X_=new rt;function Y_(i,e){function t(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function n(d,f){f.color.getRGB(d.fogColor.value,ju(i)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function s(d,f,b,M,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(d,f):f.isMeshToonMaterial?(r(d,f),h(d,f)):f.isMeshPhongMaterial?(r(d,f),u(d,f)):f.isMeshStandardMaterial?(r(d,f),p(d,f),f.isMeshPhysicalMaterial&&g(d,f,y)):f.isMeshMatcapMaterial?(r(d,f),v(d,f)):f.isMeshDepthMaterial?r(d,f):f.isMeshDistanceMaterial?(r(d,f),m(d,f)):f.isMeshNormalMaterial?r(d,f):f.isLineBasicMaterial?(a(d,f),f.isLineDashedMaterial&&o(d,f)):f.isPointsMaterial?l(d,f,b,M):f.isSpriteMaterial?c(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,t(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,t(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===Yt&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,t(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===Yt&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,t(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,t(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);let b=e.get(f),M=b.envMap,y=b.envMapRotation;M&&(d.envMap.value=M,gs.copy(y),gs.x*=-1,gs.y*=-1,gs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),d.envMapRotation.value.setFromMatrix4(X_.makeRotationFromEuler(gs)),d.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap&&(d.lightMap.value=f.lightMap,d.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,d.lightMapTransform)),f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,d.aoMapTransform))}function a(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,t(f.map,d.mapTransform))}function o(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function l(d,f,b,M){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*b,d.scale.value=M*.5,f.map&&(d.map.value=f.map,t(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,t(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function u(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function h(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function p(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,d.roughnessMapTransform)),f.envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function g(d,f,b){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Yt&&d.clearcoatNormalScale.value.negate())),f.dispersion>0&&(d.dispersion.value=f.dispersion),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=b.texture,d.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,d.specularIntensityMapTransform))}function v(d,f){f.matcap&&(d.matcap.value=f.matcap)}function m(d,f){let b=e.get(f).light;d.referencePosition.value.setFromMatrixPosition(b.matrixWorld),d.nearDistance.value=b.shadow.camera.near,d.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Z_(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){let y=M.program;n.uniformBlockBinding(b,y)}function c(b,M){let y=s[b.id];y===void 0&&(v(b),y=u(b),s[b.id]=y,b.addEventListener("dispose",d));let w=M.program;n.updateUBOMapping(b,w);let C=e.render.frame;r[b.id]!==C&&(p(b),r[b.id]=C)}function u(b){let M=h();b.__bindingPointIndex=M;let y=i.createBuffer(),w=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,w,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){let M=s[b.id],y=b.uniforms,w=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let C=0,L=y.length;C<L;C++){let T=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,_=T.length;S<_;S++){let I=T[S];if(g(I,C,S,w)===!0){let O=I.__offset,G=Array.isArray(I.value)?I.value:[I.value],j=0;for(let K=0;K<G.length;K++){let J=G[K],le=m(J);typeof J=="number"||typeof J=="boolean"?(I.__data[0]=J,i.bufferSubData(i.UNIFORM_BUFFER,O+j,I.__data)):J.isMatrix3?(I.__data[0]=J.elements[0],I.__data[1]=J.elements[1],I.__data[2]=J.elements[2],I.__data[3]=0,I.__data[4]=J.elements[3],I.__data[5]=J.elements[4],I.__data[6]=J.elements[5],I.__data[7]=0,I.__data[8]=J.elements[6],I.__data[9]=J.elements[7],I.__data[10]=J.elements[8],I.__data[11]=0):(J.toArray(I.__data,j),j+=le.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(b,M,y,w){let C=b.value,L=M+"_"+y;if(w[L]===void 0)return typeof C=="number"||typeof C=="boolean"?w[L]=C:w[L]=C.clone(),!0;{let T=w[L];if(typeof C=="number"||typeof C=="boolean"){if(T!==C)return w[L]=C,!0}else if(T.equals(C)===!1)return T.copy(C),!0}return!1}function v(b){let M=b.uniforms,y=0,w=16;for(let L=0,T=M.length;L<T;L++){let S=Array.isArray(M[L])?M[L]:[M[L]];for(let _=0,I=S.length;_<I;_++){let O=S[_],G=Array.isArray(O.value)?O.value:[O.value];for(let j=0,K=G.length;j<K;j++){let J=G[j],le=m(J),X=y%w,he=X%le.boundary,Me=X+he;y+=he,Me!==0&&w-Me<le.storage&&(y+=w-Me),O.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=le.storage}}}let C=y%w;return C>0&&(y+=w-C),b.__size=y,b.__cache={},this}function m(b){let M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function d(b){let M=b.target;M.removeEventListener("dispose",d);let y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var cr=class{constructor(e={}){let{canvas:t=ep(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let v=new Uint32Array(4),m=new Int32Array(4),d=null,f=null,b=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,w=!1;this._outputColorSpace=Bt;let C=0,L=0,T=null,S=-1,_=null,I=new ct,O=new ct,G=null,j=new Oe(0),K=0,J=t.width,le=t.height,X=1,he=null,Me=null,we=new ct(0,0,J,le),ae=new ct(0,0,J,le),Ae=!1,ke=new Xs,$e=!1,B=!1,q=new rt,de=new D,xe=new ct,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},He=!1;function Ye(){return T===null?X:1}let U=n;function se(A,z){return t.getContext(A,z)}try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",Re,!1),t.addEventListener("webglcontextcreationerror",fe,!1),U===null){let z="webgl2";if(U=se(z,A),U===null)throw se(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let te,ee,Q,ge,ce,_e,qe,Ve,R,E,P,N,V,k,$,W,oe,ye,ie,pe,Ie,Te,be,We;function F(){te=new fy(U),te.init(),Te=new q_(U,te),ee=new ay(U,te,e,Te),Q=new V_(U,te),ee.reversedDepthBuffer&&p&&Q.buffers.depth.setReversed(!0),ge=new gy(U),ce=new R_,_e=new G_(U,te,Q,ce,ee,Te,ge),qe=new ly(y),Ve=new dy(y),R=new M0(U),be=new sy(U,R),E=new py(U,R,ge,be),P=new vy(U,E,R,ge),ie=new xy(U,ee,_e),W=new oy(ce),N=new C_(y,qe,Ve,te,ee,be,W),V=new Y_(y,ce),k=new P_,$=new O_(te),ye=new iy(y,qe,Ve,Q,P,g,l),oe=new z_(y,P,ee),We=new Z_(U,ge,ee,Q),pe=new ry(U,te,ge),Ie=new my(U,te,ge),ge.programs=N.programs,y.capabilities=ee,y.extensions=te,y.properties=ce,y.renderLists=k,y.shadowMap=oe,y.state=Q,y.info=ge}F();let ue=new ph(y,U);this.xr=ue,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=te.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=te.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(A){A!==void 0&&(X=A,this.setSize(J,le,!1))},this.getSize=function(A){return A.set(J,le)},this.setSize=function(A,z,Y=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=A,le=z,t.width=Math.floor(A*X),t.height=Math.floor(z*X),Y===!0&&(t.style.width=A+"px",t.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(J*X,le*X).floor()},this.setDrawingBufferSize=function(A,z,Y){J=A,le=z,X=Y,t.width=Math.floor(A*Y),t.height=Math.floor(z*Y),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(I)},this.getViewport=function(A){return A.copy(we)},this.setViewport=function(A,z,Y,Z){A.isVector4?we.set(A.x,A.y,A.z,A.w):we.set(A,z,Y,Z),Q.viewport(I.copy(we).multiplyScalar(X).round())},this.getScissor=function(A){return A.copy(ae)},this.setScissor=function(A,z,Y,Z){A.isVector4?ae.set(A.x,A.y,A.z,A.w):ae.set(A,z,Y,Z),Q.scissor(O.copy(ae).multiplyScalar(X).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(A){Q.setScissorTest(Ae=A)},this.setOpaqueSort=function(A){he=A},this.setTransparentSort=function(A){Me=A},this.getClearColor=function(A){return A.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,Y=!0){let Z=0;if(A){let H=!1;if(T!==null){let me=T.texture.format;H=me===Ll||me===Pl||me===Il}if(H){let me=T.texture.type,Ce=me===Fn||me===Fi||me===ir||me===sr||me===Al||me===Cl,Le=ye.getClearColor(),Pe=ye.getClearAlpha(),ze=Le.r,Ge=Le.g,Fe=Le.b;Ce?(v[0]=ze,v[1]=Ge,v[2]=Fe,v[3]=Pe,U.clearBufferuiv(U.COLOR,0,v)):(m[0]=ze,m[1]=Ge,m[2]=Fe,m[3]=Pe,U.clearBufferiv(U.COLOR,0,m))}else Z|=U.COLOR_BUFFER_BIT}z&&(Z|=U.DEPTH_BUFFER_BIT),Y&&(Z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",Re,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),ye.dispose(),k.dispose(),$.dispose(),ce.dispose(),qe.dispose(),Ve.dispose(),P.dispose(),be.dispose(),We.dispose(),N.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",kn),ue.removeEventListener("sessionend",Uh),Hi.stop()};function ve(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Re(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let A=ge.autoReset,z=oe.enabled,Y=oe.autoUpdate,Z=oe.needsUpdate,H=oe.type;F(),ge.autoReset=A,oe.enabled=z,oe.autoUpdate=Y,oe.needsUpdate=Z,oe.type=H}function fe(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function re(A){let z=A.target;z.removeEventListener("dispose",re),Ue(z)}function Ue(A){Xe(A),ce.remove(A)}function Xe(A){let z=ce.get(A).programs;z!==void 0&&(z.forEach(function(Y){N.releaseProgram(Y)}),A.isShaderMaterial&&N.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,Y,Z,H,me){z===null&&(z=Se);let Ce=H.isMesh&&H.matrixWorld.determinant()<0,Le=mm(A,z,Y,Z,H);Q.setMaterial(Z,Ce);let Pe=Y.index,ze=1;if(Z.wireframe===!0){if(Pe=E.getWireframeAttribute(Y),Pe===void 0)return;ze=2}let Ge=Y.drawRange,Fe=Y.attributes.position,Qe=Ge.start*ze,ut=(Ge.start+Ge.count)*ze;me!==null&&(Qe=Math.max(Qe,me.start*ze),ut=Math.min(ut,(me.start+me.count)*ze)),Pe!==null?(Qe=Math.max(Qe,0),ut=Math.min(ut,Pe.count)):Fe!=null&&(Qe=Math.max(Qe,0),ut=Math.min(ut,Fe.count));let At=ut-Qe;if(At<0||At===1/0)return;be.setup(H,Z,Le,Y,Pe);let yt,ft=pe;if(Pe!==null&&(yt=R.get(Pe),ft=Ie,ft.setIndex(yt)),H.isMesh)Z.wireframe===!0?(Q.setLineWidth(Z.wireframeLinewidth*Ye()),ft.setMode(U.LINES)):ft.setMode(U.TRIANGLES);else if(H.isLine){let Be=Z.linewidth;Be===void 0&&(Be=1),Q.setLineWidth(Be*Ye()),H.isLineSegments?ft.setMode(U.LINES):H.isLineLoop?ft.setMode(U.LINE_LOOP):ft.setMode(U.LINE_STRIP)}else H.isPoints?ft.setMode(U.POINTS):H.isSprite&&ft.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Gs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ft.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))ft.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Be=H._multiDrawStarts,St=H._multiDrawCounts,nt=H._multiDrawCount,hn=Pe?R.get(Pe).bytesPerElement:1,ys=ce.get(Z).currentProgram.getUniforms();for(let dn=0;dn<nt;dn++)ys.setValue(U,"_gl_DrawID",dn),ft.render(Be[dn]/hn,St[dn])}else if(H.isInstancedMesh)ft.renderInstances(Qe,At,H.count);else if(Y.isInstancedBufferGeometry){let Be=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,St=Math.min(Y.instanceCount,Be);ft.renderInstances(Qe,At,St)}else ft.render(Qe,At)};function gt(A,z,Y){A.transparent===!0&&A.side===sn&&A.forceSinglePass===!1?(A.side=Yt,A.needsUpdate=!0,Fa(A,z,Y),A.side=ai,A.needsUpdate=!0,Fa(A,z,Y),A.side=sn):Fa(A,z,Y)}this.compile=function(A,z,Y=null){Y===null&&(Y=A),f=$.get(Y),f.init(z),M.push(f),Y.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),A!==Y&&A.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();let Z=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let me=H.material;if(me)if(Array.isArray(me))for(let Ce=0;Ce<me.length;Ce++){let Le=me[Ce];gt(Le,Y,H),Z.add(Le)}else gt(me,Y,H),Z.add(me)}),f=M.pop(),Z},this.compileAsync=function(A,z,Y=null){let Z=this.compile(A,z,Y);return new Promise(H=>{function me(){if(Z.forEach(function(Ce){ce.get(Ce).currentProgram.isReady()&&Z.delete(Ce)}),Z.size===0){H(A);return}setTimeout(me,10)}te.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let st=null;function jn(A){st&&st(A)}function kn(){Hi.stop()}function Uh(){Hi.start()}let Hi=new Lp;Hi.setAnimationLoop(jn),typeof self<"u"&&Hi.setContext(self),this.setAnimationLoop=function(A){st=A,ue.setAnimationLoop(A),A===null?Hi.stop():Hi.start()},ue.addEventListener("sessionstart",kn),ue.addEventListener("sessionend",Uh),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(z),z=ue.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,z,T),f=$.get(A,M.length),f.init(z),M.push(f),q.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ke.setFromProjectionMatrix(q,Pn,z.reversedDepth),B=this.localClippingEnabled,$e=W.init(this.clippingPlanes,B),d=k.get(A,b.length),d.init(),b.push(d),ue.enabled===!0&&ue.isPresenting===!0){let me=y.xr.getDepthSensingMesh();me!==null&&Tc(me,z,-1/0,y.sortObjects)}Tc(A,z,0,y.sortObjects),d.finish(),y.sortObjects===!0&&d.sort(he,Me),He=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,He&&ye.addToRenderList(d,A),this.info.render.frame++,$e===!0&&W.beginShadows();let Y=f.state.shadowsArray;oe.render(Y,A,z),$e===!0&&W.endShadows(),this.info.autoReset===!0&&this.info.reset();let Z=d.opaque,H=d.transmissive;if(f.setupLights(),z.isArrayCamera){let me=z.cameras;if(H.length>0)for(let Ce=0,Le=me.length;Ce<Le;Ce++){let Pe=me[Ce];Fh(Z,H,A,Pe)}He&&ye.render(A);for(let Ce=0,Le=me.length;Ce<Le;Ce++){let Pe=me[Ce];Nh(d,A,Pe,Pe.viewport)}}else H.length>0&&Fh(Z,H,A,z),He&&ye.render(A),Nh(d,A,z);T!==null&&L===0&&(_e.updateMultisampleRenderTarget(T),_e.updateRenderTargetMipmap(T)),A.isScene===!0&&A.onAfterRender(y,A,z),be.resetDefaultState(),S=-1,_=null,M.pop(),M.length>0?(f=M[M.length-1],$e===!0&&W.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?d=b[b.length-1]:d=null};function Tc(A,z,Y,Z){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)Y=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ke.intersectsSprite(A)){Z&&xe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(q);let Ce=P.update(A),Le=A.material;Le.visible&&d.push(A,Ce,Le,Y,xe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ke.intersectsObject(A))){let Ce=P.update(A),Le=A.material;if(Z&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),xe.copy(A.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),xe.copy(Ce.boundingSphere.center)),xe.applyMatrix4(A.matrixWorld).applyMatrix4(q)),Array.isArray(Le)){let Pe=Ce.groups;for(let ze=0,Ge=Pe.length;ze<Ge;ze++){let Fe=Pe[ze],Qe=Le[Fe.materialIndex];Qe&&Qe.visible&&d.push(A,Ce,Qe,Y,xe.z,Fe)}}else Le.visible&&d.push(A,Ce,Le,Y,xe.z,null)}}let me=A.children;for(let Ce=0,Le=me.length;Ce<Le;Ce++)Tc(me[Ce],z,Y,Z)}function Nh(A,z,Y,Z){let H=A.opaque,me=A.transmissive,Ce=A.transparent;f.setupLightsView(Y),$e===!0&&W.setGlobalState(y.clippingPlanes,Y),Z&&Q.viewport(I.copy(Z)),H.length>0&&Na(H,z,Y),me.length>0&&Na(me,z,Y),Ce.length>0&&Na(Ce,z,Y),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function Fh(A,z,Y,Z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[Z.id]===void 0&&(f.state.transmissionRenderTarget[Z.id]=new Kt(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?wn:Fn,minFilter:Ni,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));let me=f.state.transmissionRenderTarget[Z.id],Ce=Z.viewport||I;me.setSize(Ce.z*y.transmissionResolutionScale,Ce.w*y.transmissionResolutionScale);let Le=y.getRenderTarget(),Pe=y.getActiveCubeFace(),ze=y.getActiveMipmapLevel();y.setRenderTarget(me),y.getClearColor(j),K=y.getClearAlpha(),K<1&&y.setClearColor(16777215,.5),y.clear(),He&&ye.render(Y);let Ge=y.toneMapping;y.toneMapping=ui;let Fe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),f.setupLightsView(Z),$e===!0&&W.setGlobalState(y.clippingPlanes,Z),Na(A,Y,Z),_e.updateMultisampleRenderTarget(me),_e.updateRenderTargetMipmap(me),te.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let ut=0,At=z.length;ut<At;ut++){let yt=z[ut],ft=yt.object,Be=yt.geometry,St=yt.material,nt=yt.group;if(St.side===sn&&ft.layers.test(Z.layers)){let hn=St.side;St.side=Yt,St.needsUpdate=!0,Oh(ft,Y,Z,Be,St,nt),St.side=hn,St.needsUpdate=!0,Qe=!0}}Qe===!0&&(_e.updateMultisampleRenderTarget(me),_e.updateRenderTargetMipmap(me))}y.setRenderTarget(Le,Pe,ze),y.setClearColor(j,K),Fe!==void 0&&(Z.viewport=Fe),y.toneMapping=Ge}function Na(A,z,Y){let Z=z.isScene===!0?z.overrideMaterial:null;for(let H=0,me=A.length;H<me;H++){let Ce=A[H],Le=Ce.object,Pe=Ce.geometry,ze=Ce.group,Ge=Ce.material;Ge.allowOverride===!0&&Z!==null&&(Ge=Z),Le.layers.test(Y.layers)&&Oh(Le,z,Y,Pe,Ge,ze)}}function Oh(A,z,Y,Z,H,me){A.onBeforeRender(y,z,Y,Z,H,me),A.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(y,z,Y,Z,A,me),H.transparent===!0&&H.side===sn&&H.forceSinglePass===!1?(H.side=Yt,H.needsUpdate=!0,y.renderBufferDirect(Y,z,Z,H,A,me),H.side=ai,H.needsUpdate=!0,y.renderBufferDirect(Y,z,Z,H,A,me),H.side=sn):y.renderBufferDirect(Y,z,Z,H,A,me),A.onAfterRender(y,z,Y,Z,H,me)}function Fa(A,z,Y){z.isScene!==!0&&(z=Se);let Z=ce.get(A),H=f.state.lights,me=f.state.shadowsArray,Ce=H.state.version,Le=N.getParameters(A,H.state,me,z,Y),Pe=N.getProgramCacheKey(Le),ze=Z.programs;Z.environment=A.isMeshStandardMaterial?z.environment:null,Z.fog=z.fog,Z.envMap=(A.isMeshStandardMaterial?Ve:qe).get(A.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,ze===void 0&&(A.addEventListener("dispose",re),ze=new Map,Z.programs=ze);let Ge=ze.get(Pe);if(Ge!==void 0){if(Z.currentProgram===Ge&&Z.lightsStateVersion===Ce)return kh(A,Le),Ge}else Le.uniforms=N.getUniforms(A),A.onBeforeCompile(Le,y),Ge=N.acquireProgram(Le,Pe),ze.set(Pe,Ge),Z.uniforms=Le.uniforms;let Fe=Z.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Fe.clippingPlanes=W.uniform),kh(A,Le),Z.needsLights=xm(A),Z.lightsStateVersion=Ce,Z.needsLights&&(Fe.ambientLightColor.value=H.state.ambient,Fe.lightProbe.value=H.state.probe,Fe.directionalLights.value=H.state.directional,Fe.directionalLightShadows.value=H.state.directionalShadow,Fe.spotLights.value=H.state.spot,Fe.spotLightShadows.value=H.state.spotShadow,Fe.rectAreaLights.value=H.state.rectArea,Fe.ltc_1.value=H.state.rectAreaLTC1,Fe.ltc_2.value=H.state.rectAreaLTC2,Fe.pointLights.value=H.state.point,Fe.pointLightShadows.value=H.state.pointShadow,Fe.hemisphereLights.value=H.state.hemi,Fe.directionalShadowMap.value=H.state.directionalShadowMap,Fe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Fe.spotShadowMap.value=H.state.spotShadowMap,Fe.spotLightMatrix.value=H.state.spotLightMatrix,Fe.spotLightMap.value=H.state.spotLightMap,Fe.pointShadowMap.value=H.state.pointShadowMap,Fe.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=Ge,Z.uniformsList=null,Ge}function Bh(A){if(A.uniformsList===null){let z=A.currentProgram.getUniforms();A.uniformsList=lr.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function kh(A,z){let Y=ce.get(A);Y.outputColorSpace=z.outputColorSpace,Y.batching=z.batching,Y.batchingColor=z.batchingColor,Y.instancing=z.instancing,Y.instancingColor=z.instancingColor,Y.instancingMorph=z.instancingMorph,Y.skinning=z.skinning,Y.morphTargets=z.morphTargets,Y.morphNormals=z.morphNormals,Y.morphColors=z.morphColors,Y.morphTargetsCount=z.morphTargetsCount,Y.numClippingPlanes=z.numClippingPlanes,Y.numIntersection=z.numClipIntersection,Y.vertexAlphas=z.vertexAlphas,Y.vertexTangents=z.vertexTangents,Y.toneMapping=z.toneMapping}function mm(A,z,Y,Z,H){z.isScene!==!0&&(z=Se),_e.resetTextureUnits();let me=z.fog,Ce=Z.isMeshStandardMaterial?z.environment:null,Le=T===null?y.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:es,Pe=(Z.isMeshStandardMaterial?Ve:qe).get(Z.envMap||Ce),ze=Z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ge=!!Y.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Fe=!!Y.morphAttributes.position,Qe=!!Y.morphAttributes.normal,ut=!!Y.morphAttributes.color,At=ui;Z.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(At=y.toneMapping);let yt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ft=yt!==void 0?yt.length:0,Be=ce.get(Z),St=f.state.lights;if($e===!0&&(B===!0||A!==_)){let en=A===_&&Z.id===S;W.setState(Z,A,en)}let nt=!1;Z.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==St.state.version||Be.outputColorSpace!==Le||H.isBatchedMesh&&Be.batching===!1||!H.isBatchedMesh&&Be.batching===!0||H.isBatchedMesh&&Be.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Be.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Be.instancing===!1||!H.isInstancedMesh&&Be.instancing===!0||H.isSkinnedMesh&&Be.skinning===!1||!H.isSkinnedMesh&&Be.skinning===!0||H.isInstancedMesh&&Be.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Be.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Be.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Be.instancingMorph===!1&&H.morphTexture!==null||Be.envMap!==Pe||Z.fog===!0&&Be.fog!==me||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==W.numPlanes||Be.numIntersection!==W.numIntersection)||Be.vertexAlphas!==ze||Be.vertexTangents!==Ge||Be.morphTargets!==Fe||Be.morphNormals!==Qe||Be.morphColors!==ut||Be.toneMapping!==At||Be.morphTargetsCount!==ft)&&(nt=!0):(nt=!0,Be.__version=Z.version);let hn=Be.currentProgram;nt===!0&&(hn=Fa(Z,z,H));let ys=!1,dn=!1,xr=!1,wt=hn.getUniforms(),yn=Be.uniforms;if(Q.useProgram(hn.program)&&(ys=!0,dn=!0,xr=!0),Z.id!==S&&(S=Z.id,dn=!0),ys||_!==A){Q.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),wt.setValue(U,"projectionMatrix",A.projectionMatrix),wt.setValue(U,"viewMatrix",A.matrixWorldInverse);let an=wt.map.cameraPosition;an!==void 0&&an.setValue(U,de.setFromMatrixPosition(A.matrixWorld)),ee.logarithmicDepthBuffer&&wt.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&wt.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),_!==A&&(_=A,dn=!0,xr=!0)}if(H.isSkinnedMesh){wt.setOptional(U,H,"bindMatrix"),wt.setOptional(U,H,"bindMatrixInverse");let en=H.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),wt.setValue(U,"boneTexture",en.boneTexture,_e))}H.isBatchedMesh&&(wt.setOptional(U,H,"batchingTexture"),wt.setValue(U,"batchingTexture",H._matricesTexture,_e),wt.setOptional(U,H,"batchingIdTexture"),wt.setValue(U,"batchingIdTexture",H._indirectTexture,_e),wt.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&wt.setValue(U,"batchingColorTexture",H._colorsTexture,_e));let _n=Y.morphAttributes;if((_n.position!==void 0||_n.normal!==void 0||_n.color!==void 0)&&ie.update(H,Y,hn),(dn||Be.receiveShadow!==H.receiveShadow)&&(Be.receiveShadow=H.receiveShadow,wt.setValue(U,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(yn.envMap.value=Pe,yn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&z.environment!==null&&(yn.envMapIntensity.value=z.environmentIntensity),dn&&(wt.setValue(U,"toneMappingExposure",y.toneMappingExposure),Be.needsLights&&gm(yn,xr),me&&Z.fog===!0&&V.refreshFogUniforms(yn,me),V.refreshMaterialUniforms(yn,Z,X,le,f.state.transmissionRenderTarget[A.id]),lr.upload(U,Bh(Be),yn,_e)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(lr.upload(U,Bh(Be),yn,_e),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&wt.setValue(U,"center",H.center),wt.setValue(U,"modelViewMatrix",H.modelViewMatrix),wt.setValue(U,"normalMatrix",H.normalMatrix),wt.setValue(U,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){let en=Z.uniformsGroups;for(let an=0,Ac=en.length;an<Ac;an++){let Vi=en[an];We.update(Vi,hn),We.bind(Vi,hn)}}return hn}function gm(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function xm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(A,z,Y){let Z=ce.get(A);Z.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),ce.get(A.texture).__webglTexture=z,ce.get(A.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:Y,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){let Y=ce.get(A);Y.__webglFramebuffer=z,Y.__useDefaultFramebuffer=z===void 0};let vm=U.createFramebuffer();this.setRenderTarget=function(A,z=0,Y=0){T=A,C=z,L=Y;let Z=!0,H=null,me=!1,Ce=!1;if(A){let Pe=ce.get(A);if(Pe.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(U.FRAMEBUFFER,null),Z=!1;else if(Pe.__webglFramebuffer===void 0)_e.setupRenderTarget(A);else if(Pe.__hasExternalTextures)_e.rebindTextures(A,ce.get(A.texture).__webglTexture,ce.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Fe=A.depthTexture;if(Pe.__boundDepthTexture!==Fe){if(Fe!==null&&ce.has(Fe)&&(A.width!==Fe.image.width||A.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_e.setupDepthRenderbuffer(A)}}let ze=A.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Ce=!0);let Ge=ce.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ge[z])?H=Ge[z][Y]:H=Ge[z],me=!0):A.samples>0&&_e.useMultisampledRTT(A)===!1?H=ce.get(A).__webglMultisampledFramebuffer:Array.isArray(Ge)?H=Ge[Y]:H=Ge,I.copy(A.viewport),O.copy(A.scissor),G=A.scissorTest}else I.copy(we).multiplyScalar(X).floor(),O.copy(ae).multiplyScalar(X).floor(),G=Ae;if(Y!==0&&(H=vm),Q.bindFramebuffer(U.FRAMEBUFFER,H)&&Z&&Q.drawBuffers(A,H),Q.viewport(I),Q.scissor(O),Q.setScissorTest(G),me){let Pe=ce.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+z,Pe.__webglTexture,Y)}else if(Ce){let Pe=z;for(let ze=0;ze<A.textures.length;ze++){let Ge=ce.get(A.textures[ze]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+ze,Ge.__webglTexture,Y,Pe)}}else if(A!==null&&Y!==0){let Pe=ce.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pe.__webglTexture,Y)}S=-1},this.readRenderTargetPixels=function(A,z,Y,Z,H,me,Ce,Le=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=ce.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ce!==void 0&&(Pe=Pe[Ce]),Pe){Q.bindFramebuffer(U.FRAMEBUFFER,Pe);try{let ze=A.textures[Le],Ge=ze.format,Fe=ze.type;if(!ee.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ee.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-Z&&Y>=0&&Y<=A.height-H&&(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Le),U.readPixels(z,Y,Z,H,Te.convert(Ge),Te.convert(Fe),me))}finally{let ze=T!==null?ce.get(T).__webglFramebuffer:null;Q.bindFramebuffer(U.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(A,z,Y,Z,H,me,Ce,Le=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=ce.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ce!==void 0&&(Pe=Pe[Ce]),Pe)if(z>=0&&z<=A.width-Z&&Y>=0&&Y<=A.height-H){Q.bindFramebuffer(U.FRAMEBUFFER,Pe);let ze=A.textures[Le],Ge=ze.format,Fe=ze.type;if(!ee.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ee.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Qe),U.bufferData(U.PIXEL_PACK_BUFFER,me.byteLength,U.STREAM_READ),A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Le),U.readPixels(z,Y,Z,H,Te.convert(Ge),Te.convert(Fe),0);let ut=T!==null?ce.get(T).__webglFramebuffer:null;Q.bindFramebuffer(U.FRAMEBUFFER,ut);let At=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await tp(U,At,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Qe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,me),U.deleteBuffer(Qe),U.deleteSync(At),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,z=null,Y=0){let Z=Math.pow(2,-Y),H=Math.floor(A.image.width*Z),me=Math.floor(A.image.height*Z),Ce=z!==null?z.x:0,Le=z!==null?z.y:0;_e.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,Y,0,0,Ce,Le,H,me),Q.unbindTexture()};let ym=U.createFramebuffer(),_m=U.createFramebuffer();this.copyTextureToTexture=function(A,z,Y=null,Z=null,H=0,me=null){me===null&&(H!==0?(Gs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),me=H,H=0):me=0);let Ce,Le,Pe,ze,Ge,Fe,Qe,ut,At,yt=A.isCompressedTexture?A.mipmaps[me]:A.image;if(Y!==null)Ce=Y.max.x-Y.min.x,Le=Y.max.y-Y.min.y,Pe=Y.isBox3?Y.max.z-Y.min.z:1,ze=Y.min.x,Ge=Y.min.y,Fe=Y.isBox3?Y.min.z:0;else{let _n=Math.pow(2,-H);Ce=Math.floor(yt.width*_n),Le=Math.floor(yt.height*_n),A.isDataArrayTexture?Pe=yt.depth:A.isData3DTexture?Pe=Math.floor(yt.depth*_n):Pe=1,ze=0,Ge=0,Fe=0}Z!==null?(Qe=Z.x,ut=Z.y,At=Z.z):(Qe=0,ut=0,At=0);let ft=Te.convert(z.format),Be=Te.convert(z.type),St;z.isData3DTexture?(_e.setTexture3D(z,0),St=U.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(_e.setTexture2DArray(z,0),St=U.TEXTURE_2D_ARRAY):(_e.setTexture2D(z,0),St=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);let nt=U.getParameter(U.UNPACK_ROW_LENGTH),hn=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ys=U.getParameter(U.UNPACK_SKIP_PIXELS),dn=U.getParameter(U.UNPACK_SKIP_ROWS),xr=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,yt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,yt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ze),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ge),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Fe);let wt=A.isDataArrayTexture||A.isData3DTexture,yn=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){let _n=ce.get(A),en=ce.get(z),an=ce.get(_n.__renderTarget),Ac=ce.get(en.__renderTarget);Q.bindFramebuffer(U.READ_FRAMEBUFFER,an.__webglFramebuffer),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ac.__webglFramebuffer);for(let Vi=0;Vi<Pe;Vi++)wt&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ce.get(A).__webglTexture,H,Fe+Vi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ce.get(z).__webglTexture,me,At+Vi)),U.blitFramebuffer(ze,Ge,Ce,Le,Qe,ut,Ce,Le,U.DEPTH_BUFFER_BIT,U.NEAREST);Q.bindFramebuffer(U.READ_FRAMEBUFFER,null),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||A.isRenderTargetTexture||ce.has(A)){let _n=ce.get(A),en=ce.get(z);Q.bindFramebuffer(U.READ_FRAMEBUFFER,ym),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,_m);for(let an=0;an<Pe;an++)wt?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,_n.__webglTexture,H,Fe+an):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,_n.__webglTexture,H),yn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,en.__webglTexture,me,At+an):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,en.__webglTexture,me),H!==0?U.blitFramebuffer(ze,Ge,Ce,Le,Qe,ut,Ce,Le,U.COLOR_BUFFER_BIT,U.NEAREST):yn?U.copyTexSubImage3D(St,me,Qe,ut,At+an,ze,Ge,Ce,Le):U.copyTexSubImage2D(St,me,Qe,ut,ze,Ge,Ce,Le);Q.bindFramebuffer(U.READ_FRAMEBUFFER,null),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else yn?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(St,me,Qe,ut,At,Ce,Le,Pe,ft,Be,yt.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(St,me,Qe,ut,At,Ce,Le,Pe,ft,yt.data):U.texSubImage3D(St,me,Qe,ut,At,Ce,Le,Pe,ft,Be,yt):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,me,Qe,ut,Ce,Le,ft,Be,yt.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,me,Qe,ut,yt.width,yt.height,ft,yt.data):U.texSubImage2D(U.TEXTURE_2D,me,Qe,ut,Ce,Le,ft,Be,yt);U.pixelStorei(U.UNPACK_ROW_LENGTH,nt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,hn),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ys),U.pixelStorei(U.UNPACK_SKIP_ROWS,dn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,xr),me===0&&z.generateMipmaps&&U.generateMipmap(St),Q.unbindTexture()},this.initRenderTarget=function(A){ce.get(A).__webglFramebuffer===void 0&&_e.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?_e.setTextureCube(A,0):A.isData3DTexture?_e.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?_e.setTexture2DArray(A,0):_e.setTexture2D(A,0),Q.unbindTexture()},this.resetState=function(){C=0,L=0,T=null,Q.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}};var Op={type:"change"},xh={type:"start"},kp={type:"end"},fc=new oi,Bp=new Mn,j_=Math.cos(70*Yu.DEG2RAD),Gt=new D,un=2*Math.PI,dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gh=1e-6,hr=class extends _a{constructor(e,t=null){super(e,t),this.state=dt.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Pi.ROTATE,MIDDLE:Pi.DOLLY,RIGHT:Pi.PAN},this.touches={ONE:Li.ROTATE,TWO:Li.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Sn,this._lastTargetPosition=new D,this._quat=new Sn().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new tr,this._sphericalDelta=new tr,this._scale=1,this._panOffset=new D,this._rotateStart=new ne,this._rotateEnd=new ne,this._rotateDelta=new ne,this._panStart=new ne,this._panEnd=new ne,this._panDelta=new ne,this._dollyStart=new ne,this._dollyEnd=new ne,this._dollyDelta=new ne,this._dollyDirection=new D,this._mouse=new ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=K_.bind(this),this._onPointerDown=J_.bind(this),this._onPointerUp=Q_.bind(this),this._onContextMenu=ab.bind(this),this._onMouseWheel=nb.bind(this),this._onKeyDown=ib.bind(this),this._onTouchStart=sb.bind(this),this._onTouchMove=rb.bind(this),this._onMouseDown=eb.bind(this),this._onMouseMove=tb.bind(this),this._interceptControlDown=ob.bind(this),this._interceptControlUp=lb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Op),this.update(),this.state=dt.NONE}update(e=null){let t=this.object.position;Gt.copy(t).sub(this.target),Gt.applyQuaternion(this._quat),this._spherical.setFromVector3(Gt),this.autoRotate&&this.state===dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=un:n>Math.PI&&(n-=un),s<-Math.PI?s+=un:s>Math.PI&&(s-=un),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Gt.setFromSpherical(this._spherical),Gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Gt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(fc.origin.copy(this.object.position),fc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(fc.direction))<j_?this.object.lookAt(this.target):(Bp.setFromNormalAndCoplanarPoint(this.object.up,this.target),fc.intersectPlane(Bp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gh||this._lastTargetPosition.distanceToSquared(this.target)>gh?(this.dispatchEvent(Op),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?un/60*this.autoRotateSpeed*e:un/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Gt.setFromMatrixColumn(t,0),Gt.multiplyScalar(-e),this._panOffset.add(Gt)}_panUp(e,t){this.screenSpacePanning===!0?Gt.setFromMatrixColumn(t,1):(Gt.setFromMatrixColumn(t,0),Gt.crossVectors(this.object.up,Gt)),Gt.multiplyScalar(e),this._panOffset.add(Gt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Gt.copy(s).sub(this.target);let r=Gt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ne,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function J_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function K_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Q_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(kp),this.state=dt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function eb(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Pi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=dt.DOLLY;break;case Pi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=dt.ROTATE}break;case Pi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=dt.PAN}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(xh)}function tb(i){switch(this.state){case dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function nb(i){this.enabled===!1||this.enableZoom===!1||this.state!==dt.NONE||(i.preventDefault(),this.dispatchEvent(xh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(kp))}function ib(i){this.enabled!==!1&&this._handleKeyDown(i)}function sb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Li.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=dt.TOUCH_ROTATE;break;case Li.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=dt.TOUCH_PAN;break;default:this.state=dt.NONE}break;case 2:switch(this.touches.TWO){case Li.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=dt.TOUCH_DOLLY_PAN;break;case Li.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=dt.TOUCH_DOLLY_ROTATE;break;default:this.state=dt.NONE}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(xh)}function rb(i){switch(this._trackPointer(i),this.state){case dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=dt.NONE}}function ab(i){this.enabled!==!1&&i.preventDefault()}function ob(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function lb(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var dr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var xn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},cb=new cs(-1,1,1,-1,0,1),vh=class extends xt{constructor(){super(),this.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new tt([0,2,0,0,2,0],2))}},ub=new vh,Oi=class{constructor(e){this._mesh=new Ke(ub,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cb)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var pc=class extends xn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=di.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Oi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Ca=class extends xn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},mc=class extends xn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var gc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ne);this._width=n.width,this._height=n.height,t=new Kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:wn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pc(dr),this.copyPass.material.blending=Nn,this.clock=new hs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ca!==void 0&&(a instanceof Ca?n=!0:a instanceof mc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var xc=class extends xn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Oe}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var zp={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Oe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var fr=class i extends xn{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ne(e.x,e.y):new ne(256,256),this.clearColor=new Oe(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Kt(r,a,{type:wn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let h=new Kt(r,a,{type:wn});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);let p=new Kt(r,a,{type:wn});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),a=Math.round(a/2)}let o=zp;this.highPassUniforms=di.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Tt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ne(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=di.clone(dr.uniforms),this.blendMaterial=new Tt({uniforms:this.copyUniforms,vertexShader:dr.vertexShader,fragmentShader:dr.fragmentShader,blending:Di,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Oe,this._oldClearAlpha=1,this._basic=new cn,this._fsQuad=new Oi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ne(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Tt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new Tt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};fr.BlurDirectionX=new ne(1,0);fr.BlurDirectionY=new ne(0,1);var Ra={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var vc=class extends xn{constructor(){super(),this.uniforms=di.clone(Ra.uniforms),this.material=new xa({name:Ra.name,uniforms:this.uniforms,vertexShader:Ra.vertexShader,fragmentShader:Ra.fragmentShader}),this._fsQuad=new Oi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},et.getTransfer(this._outputColorSpace)===it&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===xl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===vl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===yl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ui?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===bl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ml?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===_l&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var _h='Nunito,"Segoe UI",system-ui,sans-serif',hb='Cairo,Tahoma,"Segoe UI",system-ui,sans-serif';function Ia(i,e){let t=document.createElement("canvas");return t.width=i,t.height=e,t}function Pa(i,{repeat:e=null}={}){let t=new na(i);return t.colorSpace=Bt,t.anisotropy=4,e&&(t.wrapS=t.wrapT=zs,t.repeat.set(e,e)),t}function bh(i="#0a7467",e="#f2b418",t="#f7f2e8",n="#1c2340"){let r=Ia(256,256),a=r.getContext("2d");a.fillStyle=t,a.fillRect(0,0,256,256);let o=(l,c,u,h,p)=>{a.beginPath();for(let g=0;g<16;g++){let v=Math.PI/8*g-Math.PI/2,m=g%2?h:u;a.lineTo(l+Math.cos(v)*m,c+Math.sin(v)*m)}a.closePath(),a.fillStyle=p,a.fill(),a.lineWidth=4,a.strokeStyle=n,a.stroke()};for(let[l,c]of[[0,0],[256,0],[0,256],[256,256]])o(l,c,70,48,i);o(256/2,256/2,70,48,e);for(let[l,c]of[[256/2,0],[0,256/2],[256,256/2],[256/2,256]])a.beginPath(),a.moveTo(l,c-22),a.lineTo(l+22,c),a.lineTo(l,c+22),a.lineTo(l-22,c),a.closePath(),a.fillStyle="#c8431a",a.fill(),a.lineWidth=3,a.strokeStyle=n,a.stroke();return Pa(r,{repeat:6})}function yc({title:i,sub:e="",ar:t="",color:n="#2b3fc4",pct:s=null}){let a=t?330:260,o=Ia(1024,a),l=o.getContext("2d"),c=46;if(l.beginPath(),l.roundRect(8,8,1008,a-16,c),l.fillStyle="rgba(14,18,40,.82)",l.fill(),l.lineWidth=8,l.strokeStyle=n,l.stroke(),l.fillStyle="#fff",l.font=`800 82px ${_h}`,l.textBaseline="top",l.textAlign="center",l.fillText(yh(l,i,944),1024/2,34),l.font=`700 50px ${_h}`,l.fillStyle="#ffd86b",l.fillText(yh(l,e,944),1024/2,130),t&&(l.font=`700 50px ${hb}`,l.fillStyle="#c9d2ff",l.direction="rtl",l.fillText(yh(l,t,944),1024/2,196),l.direction="ltr"),s!=null){let h=a-48;l.fillStyle="rgba(255,255,255,.18)",l.beginPath(),l.roundRect(80,h,864,18,9),l.fill(),l.fillStyle=n==="#f2b418"?"#fff":"#7dffb0",l.beginPath(),l.roundRect(80,h,Math.max(18,864*s/100),18,9),l.fill()}let u=Pa(o);return u.userData={aspect:1024/a},u}function yh(i,e,t){let n=String(e||"");if(i.measureText(n).width<=t)return n;for(;n.length>3&&i.measureText(n+"\u2026").width>t;)n=n.slice(0,-1);return n+"\u2026"}function La(i,{color:e="#fff",bg:t=null,size:n=256,font:s=800}={}){let r=Ia(n,n),a=r.getContext("2d");return t&&(a.beginPath(),a.arc(n/2,n/2,n/2-6,0,Math.PI*2),a.fillStyle=t,a.fill(),a.lineWidth=10,a.strokeStyle="#fff",a.stroke()),a.fillStyle=e,a.textAlign="center",a.textBaseline="middle",a.font=`${s} ${Math.round(n*(String(i).length>2?.42:.62))}px ${_h},"Segoe UI Emoji","Noto Color Emoji",sans-serif`,a.fillText(String(i),n/2,n/2+n*.04),Pa(r)}function Hp(){let e=Ia(64,64),t=e.getContext("2d"),n=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,.55)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),Pa(e)}function Mh(i="#7dffb0"){let e=Ia(512,320),t=e.getContext("2d"),n=t.createLinearGradient(0,0,0,320);n.addColorStop(0,"#16205a"),n.addColorStop(1,"#0b1030"),t.fillStyle=n,t.fillRect(0,0,512,320);let s=["si","alors","tant que","\xC9crire","Lire","pour","\u2190","fin"];t.font="700 26px Consolas,monospace";for(let r=0;r<9;r++){let a=26+r%3*22;t.fillStyle="rgba(255,255,255,.35)",t.fillText(String(r+1),8,40+r*31);for(let o=0;o<3;o++){let l=s[(r*3+o)%s.length];t.fillStyle=o===0?i:o===1?"#ffd86b":"#c9d2ff",t.fillText(l,a+24,40+r*31),a+=t.measureText(l).width+18}}return Pa(e)}var Bn=(i,e={})=>new bt({color:i,roughness:.55,metalness:.08,...e}),Da=(i,e=2.2)=>new bt({color:i,emissive:i,emissiveIntensity:e,roughness:.4});function pt(i,e,{x:t=0,y:n=0,z:s=0,cast:r=!0}={}){let a=new Ke(i,e);return a.position.set(t,n,s),a.castShadow=r,a.receiveShadow=!0,a}function _c(i="#c8431a"){let e=new Mt,t=Bn(i),n=Bn("#f7f2e8"),s=Bn("#1c2340");e.add(pt(new vt(.9,.75,.7),t,{y:.62})),e.add(pt(new vt(.62,.36,.05),n,{y:.66,z:.36}));let r=new Mt;r.position.y=1.28,e.add(r),r.add(pt(new vt(.78,.52,.62),n)),r.add(pt(new vt(.62,.3,.04),s,{z:.32}));let a=Da("#7dffe0",3);r.add(pt(new ci(.07,12,8),a,{x:-.15,z:.35,cast:!1})),r.add(pt(new ci(.07,12,8),a,{x:.15,z:.35,cast:!1})),r.add(pt(new zt(.025,.025,.3),s,{y:.4}));let o=pt(new ci(.08,12,8),Da("#f2b418",3),{y:.58,cast:!1});r.add(o);for(let l of[-1,1]){e.add(pt(new zt(.2,.2,.18,16).rotateZ(Math.PI/2),s,{x:l*.4,y:.2}));let c=pt(new Zs(.08,.36,4,8),t,{x:l*.56,y:.62});c.rotation.z=l*.25,e.add(c)}return e.userData={head:r,bulb:o,eyeM:a},e}function Vp(){let i=new Mt,e=Bn("#e9ecf7"),t=Bn("#1c2340"),n=new bt({map:Mh(),emissive:"#ffffff",emissiveMap:Mh(),emissiveIntensity:.9});i.add(pt(new vt(2.6,1.7,.16),t,{y:2.05})),i.add(pt(new li(2.4,1.5),n,{y:2.05,z:.085,cast:!1})),i.add(pt(new zt(.09,.12,.9),e,{y:.95,z:-.05})),i.add(pt(new vt(1,.08,.6),e,{y:.5})),i.add(pt(new vt(1.9,.08,.6),e,{y:.5,z:1}));for(let r=0;r<4;r++)for(let a=0;a<12;a++)i.add(pt(new vt(.12,.05,.1),t,{x:-.8+a*.145,y:.56,z:.8+r*.13,cast:!1}));let s=new Mt;return s.position.set(1.9,0,-.1),i.add(s),s.add(pt(new vt(.7,1.7,1.3),e,{y:1.31})),s.add(pt(new vt(.04,.1,.1),Da("#7dffb0",3),{x:.36,y:1.9,z:.4,cast:!1})),i.add(pt(new Zs(.11,.12,4,8).rotateX(Math.PI/2),e,{x:1.2,y:.58,z:1})),i}function Gp(){let i=new Mt;return["#2b3fc4","#0a7467","#c8431a","#f2b418"].forEach((t,n)=>{let s=new Mt;s.position.set((n-1.5)*.55,1.2+n*.55,n%2*.3-n*.15),s.rotation.y=(n-1.5)*.18,s.add(pt(new vt(1.8,1.2,.06),Bn("#ffffff"))),s.add(pt(new vt(1.8,.2,.08),Da(t,.9),{y:.5,cast:!1}));for(let r=0;r<3;r++)s.add(pt(new vt(1.2-r*.25,.08,.07),Bn("#c9d2ff"),{x:-.2+r*.1,y:.18-r*.22,cast:!1}));s.userData.base=s.position.y,s.userData.phase=n,i.add(s)}),i.userData.float=!0,i}function qp(){let i=new Mt,e=new Mt;e.position.y=2.1,i.add(e),e.add(pt(new Ci(1.15,2),Bn("#2b3fc4",{flatShading:!0}))),e.add(new Ke(new Ci(1.2,1),new cn({color:"#9fd8ff",wireframe:!0,transparent:!0,opacity:.55})));let t=[],n=new Ys({color:"#ffd86b",transparent:!0,opacity:.8});for(let r=0;r<6;r++){let a=r/6*Math.PI*2,o=new D(Math.cos(a)*2.1,Math.sin(a*2)*.5,Math.sin(a)*2.1);e.add(pt(new as(.16),Da("#f2b418",2.5),{x:o.x,y:o.y,z:o.z,cast:!1})),t.push(o)}let s=[];return t.forEach((r,a)=>{s.push(new D,r,r,t[(a+1)%t.length])}),e.add(new ta(new xt().setFromPoints(s),n)),i.add(pt(new zt(.12,.3,1,8),Bn("#6d3aa8"),{y:.5})),i.userData.spin=e,i}function Ua(i,e,t=0){let n=new ss;return n.moveTo(-i,t),n.lineTo(-i,e),n.absarc(0,e,i,Math.PI,0,!0),n.lineTo(i,t),n.lineTo(-i,t),n}function Sh(i,e,t,n,s=.25){let r=Ua(i,e);r.holes.push(Ua(i-t,e,t));let a=new ma(r,{depth:s,bevelEnabled:!0,bevelSize:.04,bevelThickness:.04,bevelSegments:2,curveSegments:24});return a.translate(0,0,-s/2),pt(a,Bn(n,{roughness:.45}))}function wh(i,e,t=1,n="#c98b5a"){let s=new zt(i,i*.25,e,10,4),r=s.attributes.position,a=t,o=()=>(a=a*16807%2147483647,a/2147483647);for(let l=0;l<r.count;l++){let c=r.getY(l);if(c>e/2-.01)continue;let u=1+(o()-.5)*.35;r.setX(l,r.getX(l)*u),r.setZ(l,r.getZ(l)*u),r.setY(l,c+(o()-.5)*.4)}return s.computeVertexNormals(),pt(s,Bn(n,{flatShading:!0,roughness:.9}))}var Bi={1:"#4a5fe0",2:"#13a190",3:"#e8683a",4:"#9159cf"},Wp={todo:"#7f8bc4",doing:"#f2b418",done:"#2fd17a"},Eh=17,db=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function Mc(){try{let i=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(i.getContext("webgl2")||i.getContext("webgl")))}catch{return!1}}function $p(i,{modules:e,onPick:t,onHover:n,reduced:s}){let r=new cr({antialias:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),r.setSize(i.clientWidth,i.clientHeight),r.outputColorSpace=Bt,r.toneMapping=Ui,r.toneMappingExposure=1.05,r.shadowMap.enabled=!0,r.shadowMap.type=nr,r.domElement.setAttribute("aria-hidden","true"),i.append(r.domElement);let a=new ts;a.fog=new Jr("#5a3d7e",90,260);let o=new kt(50,i.clientWidth/i.clientHeight,.1,600);o.position.set(0,40,70);let l=new hr(o,r.domElement);l.enableDamping=!0,l.dampingFactor=.07,l.enablePan=!1,l.minDistance=6,l.maxDistance=75,l.maxPolarAngle=Math.PI*.47,l.minPolarAngle=Math.PI*.12,l.target.set(0,1,0),l.addEventListener("start",()=>{l.autoRotate=!1});let c=new Ke(new ci(400,32,16),new Tt({side:Yt,depthWrite:!1,fog:!1,uniforms:{top:{value:new Oe("#0b1036")},mid:{value:new Oe("#3b2a78")},low:{value:new Oe("#f39a5b")}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 top; uniform vec3 mid; uniform vec3 low; varying vec3 vP; void main(){ float y = vP.y; vec3 deep = vec3(0.10, 0.07, 0.24); vec3 c = y > 0.12 ? mix(mid, top, smoothstep(0.12, 0.7, y)) : y > -0.02 ? mix(low, mid, smoothstep(-0.02, 0.12, y)) : mix(low, deep, smoothstep(-0.02, -0.35, y)); gl_FragColor = vec4(c, 1.0); }"}));a.add(c);let u=Hp();{let N=new Float32Array(4200);for(let k=0;k<1400;k++){let $=Math.random()*Math.PI*2,W=Math.acos(Math.random()*.85+.15),oe=350;N.set([oe*Math.sin(W)*Math.cos($),oe*Math.cos(W),oe*Math.sin(W)*Math.sin($)],k*3)}let V=new xt;V.setAttribute("position",new Ut(N,3)),a.add(new is(V,new Ai({size:2.2,map:u,transparent:!0,depthWrite:!1,fog:!1,color:"#fff7d6"})))}{let P=new bt({color:"#3a2457",flatShading:!0,roughness:1});for(let N=0;N<30;N++){let V=N/30*Math.PI*2+Math.random()*.12,k=200+Math.random()*25,$=30+Math.random()*22,W=new Ke(new ra(26+Math.random()*16,$,6),P);W.position.set(Math.cos(V)*k,$/2-30,Math.sin(V)*k),W.rotation.y=Math.random()*3,a.add(W)}}a.add(new ls("#c3ccff","#c98b5a",1));let h=new us("#ffe0b5",2.4);h.position.set(28,40,18),h.castShadow=!0,h.shadow.mapSize.set(2048,2048),Object.assign(h.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:120}),h.shadow.bias=-5e-4,a.add(h);let p=new Mt;a.add(p);let g=new bt({color:"#c8643a",roughness:.8}),v=new bt({map:bh(),roughness:.6}),m=new Ke(new zt(8,8,.7,64),[g,v,g]);m.receiveShadow=!0,m.position.y=-.35,p.add(m);let d=wh(8,7,7);d.position.y=-4.2,p.add(d);let f=new Mt;p.add(f);let b=new bt({color:"#f7f2e8",roughness:.6}),M=new Ke(new zt(2.4,2.6,.6,8),b);M.position.y=.3,M.castShadow=M.receiveShadow=!0,f.add(M);let y=new Ke(new zt(2.2,2.2,.05,8),new bt({color:"#4fd6ff",emissive:"#1aa6d9",emissiveIntensity:.9,roughness:.15,metalness:.2}));y.position.y=.58,f.add(y);let w=new Ke(new zt(.3,.4,1.6,8),b);w.position.y=1.2,w.castShadow=!0,f.add(w);let C=new Ke(new as(.9,0),new bt({color:"#f2b418",emissive:"#f2b418",emissiveIntensity:1.6,flatShading:!0,roughness:.3}));C.position.y=3.4,f.add(C);let L=new Ke(new Ci(1.6,1),new cn({color:"#ffe9a6",wireframe:!0,transparent:!0,opacity:.35}));L.position.y=3.4,f.add(L);let T=new er("#ffcf6b",30,18,2);T.position.y=3.4,f.add(T);let S=bc(yc({title:"InfoPlay Maroc",sub:"Choisis une \xEEle pour commencer",ar:"\u0627\u062E\u062A\u0631 \u062C\u0632\u064A\u0631\u0629 \u0644\u062A\u0628\u062F\u0623",color:"#f2b418"}),10);S.position.y=7.2,p.add(S);let _=[],I={},O={},G=[],j={1:Vp,2:Gp,3:()=>{let P=_c("#c8431a");return P.scale.setScalar(1.7),P},4:qp};e.forEach((P,N)=>{let V=Bi[P.id],k=N/e.length*Math.PI*2+Math.PI/4,$=new D(Math.cos(k),0,Math.sin(k)),W=new Mt;W.position.copy($).multiplyScalar(Eh),W.position.y=.5,a.add(W);let oe=new Ke(new zt(5,5,.5,12),[g,new bt({map:bh(V,"#f2b418"),roughness:.7}),g]);oe.receiveShadow=!0,oe.castShadow=!0,W.add(oe);let ye=wh(5,5.5,11+N*13);ye.position.y=-3,W.add(ye);let ie=new bt({color:V,emissive:V,emissiveIntensity:1.4}),pe=new Ke(new ga(5.15,.09,8,72).rotateX(Math.PI/2),ie);pe.position.y=.26,W.add(pe);let Ie=j[P.id]();Ie.position.y=.25,Ie.rotation.y=Math.atan2($.x,$.z),W.add(Ie);let Te=bc(La(P.icon,{bg:V}),2);Te.position.y=5.6,W.add(Te);let be=bc(yc({title:`Module ${P.id}`,sub:P.short||P.title,color:V,pct:0}),8.5);be.position.y=8.2,W.add(be);let We=new er(V,10,14,2);We.position.set(0,3,0),W.add(We);let F=new Ke(new zt(5.4,5.4,9,12),new cn({visible:!1}));F.position.y=2.5,W.add(F),F.userData.target={type:"module",mi:P.id},_.push(F),I[P.id]={g:W,dir:$,ringMat:ie,lab:be,lm:Ie,icon:Te,color:V,base:W.position.y,phase:N*1.7,hover:0},K($,V);let ue=Sh(1.3,1.7,.32,"#f7f2e8");ue.position.copy($).multiplyScalar(7.2),ue.rotation.y=Math.atan2($.x,$.z),p.add(ue);let ve=new Ke(new Ks(Ua(.98,1.7,.32),16),new cn({color:V,transparent:!0,opacity:.35,side:sn,depthWrite:!1}));ve.position.copy(ue.position),ve.rotation.copy(ue.rotation),p.add(ve),O[P.id]=J(P,W,$,V)});function K(P,N){let k=new vt(1.4,.18,.9),$=new bt({color:"#f7f2e8",emissive:N,emissiveIntensity:.35,roughness:.5}),W=new ea(k,$,9);W.castShadow=!0,W.receiveShadow=!0;let oe=new Rt,ye=Math.atan2(P.x,P.z);for(let ie=0;ie<9;ie++){let pe=(ie+.5)/9,Ie=8+pe*(Eh-5-8);oe.position.copy(P).multiplyScalar(Ie),oe.position.y=-.2+Math.sin(pe*Math.PI)*.6,oe.rotation.set(0,ye,0),oe.updateMatrix(),W.setMatrixAt(ie,oe.matrix)}W.userData={dir:P,n:9,yaw:ye},G.push(W),a.add(W)}function J(P,N,V,k){let $=[],W=P.sessions.length,oe=Math.min(Math.PI*.95,.36*W),ye=Math.atan2(V.z,V.x);return P.sessions.forEach((ie,pe)=>{let Ie=ye+(W===1?0:-oe/2+oe*pe/(W-1)),Te=new Mt;Te.position.set(Math.cos(Ie)*3.6,.25,Math.sin(Ie)*3.6);let be=new D(Math.cos(Ie),0,Math.sin(Ie));Te.rotation.y=Math.atan2(be.x,be.z);let We=Sh(.62,1,.14,"#f7f2e8",.16);Te.add(We);let F=le(Wp.todo),ue=new Ke(new Ks(Ua(.48,1,.14),20),F);ue.position.z=.01,Te.add(ue);let ve=bc(La(String(ie.index),{bg:k}),.55);ve.position.y=1.95,Te.add(ve);let Re=new Ke(new vt(1.35,2.3,.6),new cn({visible:!1}));Re.position.y=1.05,Te.add(Re),Re.userData.target={type:"session",mi:P.id,si:ie.index},_.push(Re),Te.visible=!1,Te.scale.setScalar(.001),N.add(Te),$.push({p:Te,mat:F,outward:be,hover:0,show:0})}),$}function le(P){return new Tt({transparent:!0,depthWrite:!1,side:sn,uniforms:{t:{value:0},col:{value:new Oe(P)},boost:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform float t; uniform vec3 col; uniform float boost; varying vec2 vUv; void main(){ vec2 c = vUv - vec2(0.0, 0.85); float r = length(c); float a = atan(c.y, c.x); float sw = sin(a*4.0 + r*10.0 - t*2.5)*0.5+0.5; float glow = 0.35 + 0.45*sw*(1.0-smoothstep(0.0,1.2,r)); gl_FragColor = vec4(col*(1.6+boost*1.5)*glow + vec3(0.15*boost), 0.75 + 0.2*boost); }"})}let X=(()=>{let N=new Float32Array(1140);for(let $=0;$<380;$++)N.set([(Math.random()-.5)*70,Math.random()*18-2,(Math.random()-.5)*70],$*3);let V=new xt;V.setAttribute("position",new Ut(N,3));let k=new is(V,new Ai({size:.35,map:u,color:"#ffd98a",transparent:!0,depthWrite:!1,blending:Di}));return a.add(k),k})(),he=new gc(r);he.addPass(new xc(a,o));let Me=new fr(new ne(i.clientWidth/2,i.clientHeight/2),.45,.5,.88);he.addPass(Me),he.addPass(new vc);let we=new ya,ae=new ne,Ae=null,ke=null,$e=P=>{let N=r.domElement.getBoundingClientRect();ae.set((P.clientX-N.left)/N.width*2-1,-((P.clientY-N.top)/N.height)*2+1),we.setFromCamera(ae,o);let V=we.intersectObjects(_.filter(k=>B(k)),!1)[0];return V?V.object.userData.target:null},B=P=>{for(let N=P;N;N=N.parent)if(!N.visible)return!1;return!0},q=(P,N)=>P&&N&&P.type===N.type&&P.mi===N.mi&&P.si===N.si;r.domElement.addEventListener("pointermove",P=>{if(Ye)return;let N=$e(P);q(N,Ae)?N&&n&&n(N,P):(Ae=N,r.domElement.style.cursor=N?"pointer":"",n&&n(N,P))}),r.domElement.addEventListener("pointerleave",()=>{Ae=null,n&&n(null)}),r.domElement.addEventListener("pointerdown",P=>{ke=[P.clientX,P.clientY]}),r.domElement.addEventListener("pointerup",P=>{if(!ke||Ye)return;let N=Math.hypot(P.clientX-ke[0],P.clientY-ke[1]);if(ke=null,N<6){let V=$e(P);V&&t(V)}});let de=0,xe=null,Se=null,He=null,Ye=!1,U=!1;function se(P,N,V){if(l.autoRotate=!1,s()){o.position.copy(P),l.target.copy(N),l.update(),V&&V();return}xe={p0:o.position.clone(),t0:l.target.clone(),p1:P,t1:N,start:performance.now(),dur:1500,after:V},l.enabled=!1}function te(P){return I[P].g.position.clone()}function ee(P){for(let N in O)O[N].forEach(V=>{V.wanted=Number(N)===P,V.wanted&&(V.p.visible=!0)})}let Q={focusHub(){Se=null,He=null,ee(null),Ye=!1,U=!1,se(new D(0,19,50),new D(0,0,0),()=>{l.autoRotate=!s(),l.autoRotateSpeed=.35}),l.minDistance=14,l.maxDistance=75},focusModule(P){Se=P,He=null,ee(P),Ye=!1,U=!1;let N=te(P),V=I[P].dir;se(N.clone().add(V.clone().multiplyScalar(14)).add(new D(0,5,0)),N.clone().add(new D(0,1.6,0))),l.minDistance=6,l.maxDistance=30},focusSession(P,N){Se=P,He=N,ee(P),Ye=!1,U=!1;let V=O[P][N-1];if(!V)return;let $=te(P).clone().add(V.p.position);se($.clone().add(V.outward.clone().multiplyScalar(4.6)).add(new D(0,1.7,0)),$.clone().add(new D(0,1.05,0))),l.minDistance=3,l.maxDistance=16},focusActivity(P,N){Q.focusSession(P,N),Ye=!0,U=!0;let V=()=>{l.autoRotate=!s(),l.autoRotateSpeed=.6};xe?xe.after=V:V()},setProgress(P){for(let N of e){let V=P[N.id];if(!V)continue;let k=I[N.id],$=yc({title:`Module ${N.id}`,sub:`${N.short||N.title} \xB7 ${V.pct} %`,color:k.color,pct:V.pct});k.lab.material.map.dispose(),k.lab.material.map=$,k.lab.material.needsUpdate=!0,O[N.id].forEach((W,oe)=>{W.mat.uniforms.col.value.set(Wp[V.sessions[oe+1]||"todo"])})}},burst(P=!1){let N=Se?l.target.clone():new D(0,3.4,0);ce(N,P?260:120,P)},setInset(P){P!==de&&(de=P,Q.resize())},resize(){let P=i.clientWidth,N=i.clientHeight,V=P+de;o.aspect=V/N,de?o.setViewOffset(V,N,de,0,P,N):o.clearViewOffset(),o.updateProjectionMatrix(),r.setSize(P,N),he.setSize(P,N),Me.setSize(P/2,N/2)},setHighlight(P){Ae=P},camera:o,scene:a},ge=[];function ce(P,N,V){if(s())return;let k=new Float32Array(N*3),$=new Float32Array(N*3),W=[],oe=["#f2b418","#2fd17a","#4a5fe0","#e8683a","#ffffff","#9159cf"].map(pe=>new Oe(pe));for(let pe=0;pe<N;pe++){k.set([P.x,P.y,P.z],pe*3);let Ie=oe[pe%oe.length];$.set([Ie.r,Ie.g,Ie.b],pe*3);let Te=new D(Math.random()-.5,Math.random()*.9+.4,Math.random()-.5).normalize().multiplyScalar(4+Math.random()*(V?7:4));W.push(Te)}let ye=new xt;ye.setAttribute("position",new Ut(k,3)),ye.setAttribute("color",new Ut($,3));let ie=new is(ye,new Ai({size:V?.38:.3,map:u,vertexColors:!0,transparent:!0,depthWrite:!1,blending:Di}));a.add(ie),ge.push({pts:ie,vel:W,life:0})}let _e=new hs,qe=0,Ve=0,R=new Rt;function E(){Ve=requestAnimationFrame(E),qe++;let P=Math.min(_e.getDelta(),.05),N=_e.elapsedTime,V=s();if(!(U&&qe%2)){if(xe){let k=Math.min(1,(performance.now()-xe.start)/xe.dur),$=db(k);if(o.position.lerpVectors(xe.p0,xe.p1,$),l.target.lerpVectors(xe.t0,xe.t1,$),k>=1){let W=xe;xe=null,l.enabled=!0,W.after&&W.after()}}if(l.update(),!V){C.rotation.y+=P*.8,C.position.y=3.4+Math.sin(N*1.5)*.18,L.rotation.y-=P*.3,L.rotation.x+=P*.15,S.position.y=7.2+Math.sin(N)*.12,S.material.opacity+=((Se?0:1)-S.material.opacity)*Math.min(1,P*6),S.visible=S.material.opacity>.02;let k=X.geometry.attributes.position;for(let $=0;$<k.count;$++){let W=k.getY($)+P*.4;W>16&&(W=-2),k.setY($,W)}k.needsUpdate=!0;for(let $ of G){let{dir:W,n:oe,yaw:ye}=$.userData;for(let ie=0;ie<oe;ie++){let pe=(ie+.5)/oe,Ie=8+pe*(Eh-5-8);R.position.copy(W).multiplyScalar(Ie),R.position.y=-.2+Math.sin(pe*Math.PI)*.6+Math.sin(N*2+ie*.7)*.08,R.rotation.set(0,ye,0),R.updateMatrix(),$.setMatrixAt(ie,R.matrix)}$.instanceMatrix.needsUpdate=!0}}for(let k in I){let $=I[k],W=Ae&&Ae.type==="module"&&Ae.mi===Number(k);$.hover+=((W?1:0)-$.hover)*Math.min(1,P*8),V||($.g.position.y=$.base+Math.sin(N*.8+$.phase)*.25),$.ringMat.emissiveIntensity=1.2+$.hover*2.5+(Se===Number(k)?1:0),$.icon.position.y=5.6+(V?0:Math.sin(N*2+$.phase)*.15);let oe=$.lm;V||(oe.userData.spin&&(oe.userData.spin.rotation.y+=P*.4),oe.userData.float&&oe.children.forEach(ye=>{ye.position.y=ye.userData.base+Math.sin(N*1.4+ye.userData.phase)*.12}),oe.userData.head&&(oe.userData.head.rotation.y=Math.sin(N*.9)*.5,oe.userData.bulb.material.emissiveIntensity=2+Math.sin(N*5)*1.2))}for(let k in O)O[k].forEach(($,W)=>{let oe=$.wanted?1:0;if($.show+=(oe-$.show)*Math.min(1,P*(V?60:5+W*.05)),$.show<.01&&!$.wanted){$.p.visible=!1,$.p.scale.setScalar(.001);return}let ye=Ae&&Ae.type==="session"&&Ae.mi===Number(k)&&Ae.si===W+1;$.hover+=((ye?1:0)-$.hover)*Math.min(1,P*8),$.p.scale.setScalar(Math.max(.001,$.show*(1+$.hover*.12)));let ie=He===W+1&&Se===Number(k);$.mat.uniforms.t.value=V?0:N,$.mat.uniforms.boost.value=Math.max($.hover,ie?.7+(V?0:Math.sin(N*3)*.3):0)});for(let k=ge.length-1;k>=0;k--){let $=ge[k];$.life+=P;let W=$.pts.geometry.attributes.position;for(let oe=0;oe<$.vel.length;oe++){let ye=$.vel[oe];ye.y-=6*P,W.setXYZ(oe,W.getX(oe)+ye.x*P,W.getY(oe)+ye.y*P,W.getZ(oe)+ye.z*P)}W.needsUpdate=!0,$.pts.material.opacity=Math.max(0,1-$.life/2.2),$.life>2.2&&(a.remove($.pts),$.pts.geometry.dispose(),$.pts.material.dispose(),ge.splice(k,1))}he.render()}}return window.addEventListener("resize",Q.resize),Q.focusHub(),E(),Q.dispose=()=>{cancelAnimationFrame(Ve),window.removeEventListener("resize",Q.resize),r.dispose()},Q}function bc(i,e){let t=new ns(new Ti({map:i,transparent:!0,depthWrite:!1})),n=i.userData?.aspect||1;return t.scale.set(e,e/n,1),t}var Xp={A:"Avancer",G:"Pivoter \xE0 gauche",D:"Pivoter \xE0 droite"},Yp={A:"\u2B06 Avancer",G:"\u27F2 Gauche",D:"\u27F3 Droite"},fb=i=>Math.PI/2-i*(Math.PI/2);function Zp(i,e){if(!Mc())return Ya(i,e);let t=e.levels.map(B=>({...B,..._r(B.grid),best:Hc(_r(B.grid))})),n=t.map(()=>[]),s=t.map(()=>!1),r=0,a=x("div",{class:"lvtabs",role:"tablist"}),o=x("div",{class:"robot3d-view",role:"img","aria-label":"Plateau du robot en 3D"}),l=x("ol",{class:"rseq","aria-label":"Programme du robot"}),c=x("span",{class:"muted"}),u=x("p",{class:"hint-line","aria-live":"polite"}),h=x("p",{class:"vh","aria-live":"polite"}),p=new cr({antialias:!0,alpha:!0});p.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),p.outputColorSpace=Bt,p.toneMapping=Ui,p.shadowMap.enabled=!0,p.shadowMap.type=nr,o.append(p.domElement);let g=new ts,v=new kt(42,1.6,.1,100),m=new hr(v,p.domElement);m.enableDamping=!0,m.enablePan=!1,m.maxPolarAngle=Math.PI*.45,m.minDistance=4,m.maxDistance=22,g.add(new ls("#dfe6ff","#c98b5a",1.3));let d=new us("#fff1d6",2.2);d.position.set(6,10,4),d.castShadow=!0,d.shadow.mapSize.set(1024,1024),Object.assign(d.shadow.camera,{left:-8,right:8,top:8,bottom:-8}),g.add(d);let f=new Mt;g.add(f);let b=_c("#c8431a");b.scale.setScalar(.55),g.add(b);let M=new vt(.94,.2,.94),y=new vt(.9,.8,.9),w={a:new bt({color:"#f7f2e8",roughness:.7}),b:new bt({color:"#e9dfc9",roughness:.7}),wall:new bt({color:"#6b77a8",roughness:.6,flatShading:!0}),goal:new bt({color:"#f2b418",emissive:"#f2b418",emissiveIntensity:.6}),start:new bt({color:"#9fd8ff",roughness:.6})},C=null;function L(){f.clear();let B=t[r];B.g.forEach((Ye,U)=>Ye.forEach((se,te)=>{let ee=new Ke(M,se==="G"?w.goal:se==="S"?w.start:(U+te)%2?w.a:w.b);if(ee.position.set(te,-.1,U),ee.receiveShadow=!0,f.add(ee),se==="#"){let Q=new Ke(y,w.wall);Q.position.set(te,.4,U),Q.castShadow=Q.receiveShadow=!0,f.add(Q)}if(se==="G"){C=new Mt,C.position.set(te,0,U);let Q=new Ke(new zt(.03,.03,1.1),new bt({color:"#1c2340"}));Q.position.y=.55,Q.castShadow=!0,C.add(Q);let ge=new Ke(new li(.45,.3),new bt({color:"#c1272d",side:sn,emissive:"#c1272d",emissiveIntensity:.3}));ge.position.set(.24,.95,0),C.add(ge);let ce=new ns(new Ti({map:La("\u2605",{color:"#0a7467"}),transparent:!0}));ce.scale.setScalar(.22),ce.position.set(.24,.95,.01),C.add(ce),f.add(C)}}));let q=(B.W-1)/2,de=(B.H-1)/2,Se=Math.max(B.W,B.H)*1.15+1.6,He=new D(-.12,.8,.62).normalize();m.target.set(q,0,de),v.position.set(q+He.x*Se,He.y*Se,de+He.z*Se),m.update()}let T=null,S=0,_={x:0,z:0,yaw:0,y:0};function I(B,q=!1){_.x=B.c,_.z=B.r,_.yaw=fb(B.d),_.y=0,O(q)}function O(){b.position.set(_.x,_.y,_.z),b.rotation.y=_.yaw}function G(B,q,de){if(It()){I(B[B.length-1]),de();return}let xe=0;I(B[0]);let Se=()=>{if(xe++,xe>=B.length){q?j(de):de();return}let He=B[xe-1],Ye=B[xe],U=0;Ye.d!==He.d&&(U=((Ye.d-He.d+4)%4===1?-1:1)*(Math.PI/2)),Ne.play(Ye.bump?"bump":"robot"),T={from:{x:_.x,z:_.z,yaw:_.yaw},to:{x:Ye.c,z:Ye.r,yaw:_.yaw+U},bump:!!Ye.bump,start:performance.now(),dur:420,then:Se}};Se()}function j(B){Ne.play("success"),T={victory:!0,start:performance.now(),dur:900,base:_.yaw,then:B}}function K(){if(S=requestAnimationFrame(K),!o.isConnected){X();return}let B=performance.now();if(T){let q=Math.min(1,(B-T.start)/T.dur),de=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;if(T.victory)_.y=Math.sin(q*Math.PI)*.6,_.yaw=T.base+de*Math.PI*2;else if(T.bump){let xe=Math.sin(q*Math.PI),Se=[[1,0],[0,1],[-1,0],[0,-1]][(Math.round((Math.PI/2-T.from.yaw)/(Math.PI/2))%4+4)%4];_.x=T.from.x+Se[0]*xe*.25,_.z=T.from.z+Se[1]*xe*.25}else _.x=T.from.x+(T.to.x-T.from.x)*de,_.z=T.from.z+(T.to.z-T.from.z)*de,_.yaw=T.from.yaw+(T.to.yaw-T.from.yaw)*de,_.y=Math.abs(Math.sin(q*Math.PI))*.08;if(O(),q>=1){let xe=T;T=null,xe.victory&&(_.y=0,_.yaw=xe.base,O()),xe.then&&xe.then()}}C&&!It()&&(C.children[1].rotation.y=Math.sin(B/300)*.25),b.userData.head&&!It()&&(b.userData.bulb.material.emissiveIntensity=2+Math.sin(B/150)*1.2),m.update(),p.render(g,v)}function J(){let B=o.clientWidth||600,q=o.clientHeight||360;p.setSize(B,q,!1),v.aspect=B/q,v.updateProjectionMatrix()}let le=new ResizeObserver(J);le.observe(o);function X(){cancelAnimationFrame(S),le.disconnect(),p.dispose()}function he(){a.replaceChildren(...t.map((B,q)=>x("button",{type:"button",role:"tab","aria-selected":String(q===r),class:"tab"+(q===r?" on":"")+(s[q]?" done":""),onclick:()=>{T=null,r=q,ae()}},`Niveau ${q+1}`+(s[q]?" \u2714":""))))}function Me(){let B=n[r];l.replaceChildren(...B.map(q=>x("li",null,Yp[q]))),B.length||l.append(x("li",{class:"muted"},"Programme vide")),c.textContent=`${B.length} / ${t[r].max} commandes`}function we(){let B=t[r];h.textContent=`Niveau ${r+1} : grille de ${B.H} lignes et ${B.W} colonnes. D\xE9part ligne ${B.start[0]+1}, colonne ${B.start[1]+1}, robot tourn\xE9 vers la droite. Objectif ligne ${B.goal[0]+1}, colonne ${B.goal[1]+1}. Obstacles : ${B.g.flatMap((q,de)=>q.map((xe,Se)=>xe==="#"?`(${de+1},${Se+1})`:null)).filter(Boolean).join(" ")||"aucun"}.`}function ae(){he(),Me(),L(),I({r:t[r].start[0],c:t[r].start[1],d:0}),u.textContent="",we()}function Ae(B){if(n[r].length>=t[r].max){u.textContent="Programme complet : retire une commande ou simplifie.";return}n[r].push(B),Me()}function ke(){T=null;let B=t[r],q=br(B,n[r]),de=r;u.textContent="Ex\xE9cution\u2026",G(q.trace,q.ok,()=>{q.ok&&(s[de]=!0),de===r&&(u.textContent=q.reason),he()})}let $e=x("div",{class:"rbar"},["A","G","D"].map(B=>x("button",{type:"button",class:"btn","aria-label":Xp[B],onclick:()=>Ae(B)},Yp[B])),x("button",{type:"button",class:"btn ghost",onclick:()=>{n[r].pop(),Me()}},"\u232B Retirer la derni\xE8re"),x("button",{type:"button",class:"btn ghost",onclick:()=>{n[r]=[],T=null,ae()}},"Tout effacer"),x("button",{type:"button",class:"btn primary",onclick:ke},"\u25B6 Ex\xE9cuter"));return i.append(x("p",{class:"muted"},"Le robot d\xE9marre tourn\xE9 vers la droite. Fais glisser la sc\xE8ne pour tourner autour du plateau. Construis la suite de commandes, ex\xE9cute-la, puis clique sur \xAB V\xE9rifier \xBB."),a,x("div",{class:"rwrap robot3d-wrap"},o,x("div",null,x("h3",{class:"small-h"},"Programme"),l,c)),$e,u,h),ae(),requestAnimationFrame(()=>{J(),K()}),{check(){let B=t.map((q,de)=>({ok:s[de],msg:`Niveau ${de+1} : `+(s[de]?"r\xE9ussi.":"non r\xE9ussi.")+` Une solution en ${q.best.length} commandes : ${q.best.map(xe=>Xp[xe].toLowerCase()).join(", ")}.`}));return{correct:s.filter(Boolean).length,total:t.length,items:B,unanswered:0}},reveal(){T=null},solve(){t.forEach((B,q)=>{n[q]=[...B.best],s[q]=br(B,n[q]).ok}),ae()},dispose:X}}var wc=[{id:"first",icon:"\u{1F680}",title:"D\xE9collage",desc:"Terminer une premi\xE8re activit\xE9."},{id:"perfect",icon:"\u{1F48E}",title:"Sans faute",desc:"Obtenir 5/5 \xE0 une activit\xE9."},{id:"sharp",icon:"\u{1F3AF}",title:"Tireur d\u2019\xE9lite",desc:"5 activit\xE9s r\xE9ussies \xE0 5/5 d\xE8s le premier essai."},{id:"streak3",icon:"\u{1F525}",title:"En feu",desc:"3 activit\xE9s d\u2019affil\xE9e \xE0 au moins 4/5."},{id:"streak7",icon:"\u2604\uFE0F",title:"Inarr\xEAtable",desc:"7 activit\xE9s d\u2019affil\xE9e \xE0 au moins 4/5."},{id:"session",icon:"\u{1F3C5}",title:"S\xE9ance boucl\xE9e",desc:"Terminer les 4 activit\xE9s d\u2019une s\xE9ance."},{id:"ten",icon:"\u{1F4DA}",title:"Studieux",desc:"Terminer 10 activit\xE9s."},{id:"module",icon:"\u{1F3C6}",title:"Ma\xEEtre d\u2019un module",desc:"Terminer toutes les s\xE9ances d\u2019un module."},{id:"speed",icon:"\u26A1",title:"\xC9clair",desc:"R\xE9ussir une activit\xE9 \xE0 5/5 en moins de 45 secondes."},{id:"comeback",icon:"\u{1F4AA}",title:"Pers\xE9v\xE9rant",desc:"Passer de moins de 3/5 \xE0 5/5 sur une m\xEAme activit\xE9."},{id:"half",icon:"\u{1F317}",title:"Mi-parcours",desc:"Terminer 60 activit\xE9s."},{id:"all",icon:"\u{1F451}",title:"L\xE9gende InfoPlay",desc:"Terminer les 120 activit\xE9s."}],pb=Object.fromEntries(wc.map(i=>[i.id,i])),Sc=i=>120+40*(i-1),Th=["D\xE9butant","Apprenti","Explorateur","Codeur","Technicien","Ing\xE9nieur","Expert","Ma\xEEtre","G\xE9nie"],jp="infoplay.times.v1";function Ah(){try{return JSON.parse(localStorage.getItem(jp)||"{}")||{}}catch{return{}}}function Ec(i,e){return Ah()[i]?.[e]??null}function Jp(i,e,t,n){if(n<4||!(t>0))return!1;let s=Ah(),r=s[i]||(s[i]={}),a=r[e];if(a!=null&&a<=t)return!1;r[e]=Math.round(t);try{localStorage.setItem(jp,JSON.stringify(s))}catch{}return a!=null}var ki=i=>{let e=Math.max(0,Math.round(i/1e3));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`};function pr(i,e=null){let t=e?Ah()[e]||{}:{},n=[],s=0,r=0,a=0,o=!1,l=0,c=!1;for(let f of pi){let b=i(f.id)?.attempts||[];if(!b.length)continue;s++;let M=Math.max(...b.map(y=>y.score));l+=Math.round(M*20),M===5&&(r++,l+=20),b[0].score===5&&(a++,l+=30),M===5&&Math.min(...b.map(y=>y.score))<3&&(o=!0),M===5&&t[f.id]!=null&&t[f.id]<45e3&&(c=!0),b.forEach(y=>n.push({t:y.completedAt||"",s:y.score}))}n.sort((f,b)=>f.t<b.t?-1:f.t>b.t?1:0);let u=0,h=0;for(let f of n)u=f.s>=4?u+1:0,h=Math.max(h,u);let p=0,g=0;for(let f of zn){let b=!0;for(let M of f.sessions)Kn(M,i).status==="done"?p++:b=!1;b&&g++}l+=p*60+g*250+h*10;let v=1,m=l;for(;m>=Sc(v);)m-=Sc(v),v++;let d=new Set;return s>=1&&d.add("first"),r>=1&&d.add("perfect"),a>=5&&d.add("sharp"),h>=3&&d.add("streak3"),h>=7&&d.add("streak7"),p>=1&&d.add("session"),s>=10&&d.add("ten"),g>=1&&d.add("module"),c&&d.add("speed"),o&&d.add("comeback"),s>=60&&d.add("half"),s>=pi.length&&d.add("all"),{xp:l,level:v,into:m,need:Sc(v),pct:Math.round(m/Sc(v)*100),rank:Th[Math.min(Th.length-1,Math.floor((v-1)/2))],streak:u,bestStreak:h,done:s,perfectActs:r,firstPerfect:a,sessionsDone:p,modulesDone:g,badges:d}}function Kp(i,e){return{xpGain:e.xp-i.xp,levelUp:e.level>i.level,newBadges:[...e.badges].filter(t=>!i.badges.has(t)).map(t=>pb[t])}}function em(i,e=.11){i.querySelectorAll(".answer-pin").forEach(n=>n.remove());let t=[...i.querySelectorAll(".ok, .ko, label.opt.good, label.opt.bad")].filter(n=>!(n instanceof SVGElement)&&!n.closest(".answer-pin")&&n.offsetParent!==null).slice(0,40);return t.forEach((n,s)=>{let r=n.classList.contains("ok")||n.classList.contains("good"),a=x("span",{class:"answer-pin "+(r?"ok":"ko"),"aria-hidden":"true",style:`animation-delay:${It()?0:s*e}s`},r?"\u2714":"\u2716");n.matches("select,input,textarea")?(n.insertAdjacentElement("afterend",a),a.classList.add("inline")):(n.classList.add("has-pin"),n.append(a))}),t.length}function Qp(i,e,t,n=s=>String(Math.round(s))){if(It()||t<=0){i.textContent=n(e);return}let s=performance.now(),r=a=>{let o=Math.min(1,(a-s)/t);i.textContent=n(e*(1-Math.pow(1-o,3))),o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function tm(i){let e=i.items||[],t=e.filter(ae=>!ae.info),n=t.filter(ae=>ae.ok).length,s=t.length-n,r=document.activeElement,a=0,o=Math.round(i.ratio*100),l=x("span",{class:"rp-num"},"0"),c=x("div",{class:"rp-ring"+(i.ratio===1?" perfect":i.ratio>=.6?" good":" low"),style:"--p:0",role:"img","aria-label":`Note : ${Wt(i.score)} sur 5`},x("div",{class:"rp-ring-in"},l,x("small",null,"/ 5"))),u=x("div",{class:"rp-stars","aria-hidden":"true"},Array.from({length:5},(ae,Ae)=>x("span",{class:"rp-star"+(Ae<Math.round(i.score)?" on":""),style:Ae<Math.round(i.score)?`animation-delay:${It()?0:(i.starDelay??.6)+Ae*(i.starStep??.17)}s`:null},"\u2605"))),h=i.game,p=x("div",{class:"rp-chips"});if(h){let ae=x("b",null,"+0");p.append(x("span",{class:"rp-chip xp"},"\u2728 ",ae," XP")),Qp(ae,h.xpGain,1200,Ae=>"+"+Math.round(Ae)),h.after.streak>=2&&p.append(x("span",{class:"rp-chip streak"},`\u{1F525} S\xE9rie de ${h.after.streak}`))}i.time&&p.append(x("span",{class:"rp-chip time"+(i.time.record?" record":"")},`\u23F1 ${ki(i.time.ms)}`,i.time.record?" \xB7 Record !":i.time.best!=null?` \xB7 record ${ki(i.time.best)}`:""));let g=null;if(h){let ae=x("i",{style:`width:${h.levelUp?0:h.before.pct}%`});g=x("div",{class:"rp-level"+(h.levelUp?" up":"")},h.levelUp?x("div",{class:"rp-levelup"},`\u2B06 Niveau ${h.after.level} atteint ! \xB7 ${h.after.rank}`):null,x("div",{class:"rp-level-head"},x("b",null,`Niveau ${h.after.level}`),x("span",null,h.after.rank),x("small",null,`${h.after.into} / ${h.after.need} XP`)),x("div",{class:"rp-level-bar"},ae)),setTimeout(()=>{ae.style.width=h.after.pct+"%"},It()?0:500)}let v=h&&h.newBadges.length?x("div",{class:"rp-badges"},x("b",null,"Nouveau badge !"),h.newBadges.map(ae=>x("span",{class:"rp-badge",title:ae.desc},x("span",{class:"ico"},ae.icon),ae.title))):null,m=x("section",{class:"rp-pane rp-score"},x("div",{class:"rp-hero"},c,x("div",null,x("h2",{id:"rp-title",tabindex:"-1"},i.msg),x("p",{class:"rp-ar",lang:"ar",dir:"rtl"},i.arMsg),u,x("p",{class:"rp-sub"},i.attemptLine))),x("div",{class:"rp-tally"},x("span",{class:"ok"},`\u2714 ${n} juste${n>1?"s":""}`),x("span",{class:"ko"},`\u2716 ${s} \xE0 revoir`)),p,g,v),d=x("div",{class:"rp-card","aria-live":"polite"}),f=x("span",{class:"rp-count"}),b=x("div",{class:"rp-dots",role:"tablist","aria-label":"R\xE9ponses"}),M=x("ul",{class:"rp-list",hidden:!0},e.map(ae=>x("li",{class:ae.info?"info":ae.ok?"ok":"ko"},x("span",{class:"ic","aria-hidden":"true"},ae.info?"\u2139":ae.ok?"\u2714":"\u2716"),x("span",null,x("span",{class:"vh"},ae.info?"Information : ":ae.ok?"Correct : ":"\xC0 revoir : "),ae.msg)))),y=x("button",{type:"button",class:"rp-nav","aria-label":"R\xE9ponse pr\xE9c\xE9dente",onclick:()=>T(a-1)},"\u2039"),w=x("button",{type:"button",class:"rp-nav","aria-label":"R\xE9ponse suivante",onclick:()=>T(a+1)},"\u203A"),C=x("button",{type:"button",class:"btn ghost small","aria-pressed":"false",onclick:()=>{let ae=M.hidden;M.hidden=!ae,L.hidden=ae,C.setAttribute("aria-pressed",String(ae)),C.textContent=ae?"\u{1F0CF} Une par une":"\u2630 Toutes les r\xE9ponses"}},"\u2630 Toutes les r\xE9ponses"),L=x("div",{class:"rp-carousel"},y,d,w);function T(ae,Ae=!1){if(!e.length)return;a=(ae+e.length)%e.length;let ke=e[a],$e=ke.info?"info":ke.ok?"ok":"ko";d.className="rp-card "+$e,d.replaceChildren(x("div",{class:"rp-card-ic","aria-hidden":"true"},ke.info?"\u2139":ke.ok?"\u2714":"\u2716"),x("p",{class:"rp-card-kind"},ke.info?"Information":ke.ok?"Bonne r\xE9ponse":"\xC0 revoir"),x("p",{class:"rp-card-msg"},ke.msg)),d.offsetWidth,d.classList.add("in"),f.textContent=`${a+1} / ${e.length}`,[...b.children].forEach((B,q)=>{B.setAttribute("aria-selected",String(q===a)),B.classList.toggle("cur",q===a)}),!Ae&&!ke.info&&Ne.play(ke.ok?"correct":"wrong",{i:Math.min(9,a)})}e.forEach((ae,Ae)=>b.append(x("button",{type:"button",role:"tab",class:"rp-dot "+(ae.info?"info":ae.ok?"ok":"ko"),"aria-label":`R\xE9ponse ${Ae+1} : ${ae.info?"information":ae.ok?"juste":"\xE0 revoir"}`,onclick:()=>T(Ae)})));let S=x("section",{class:"rp-pane rp-answers",hidden:!0},x("div",{class:"rp-answers-head"},x("h2",null,"Correction d\xE9taill\xE9e"),f,C),L,b,M),_=x("button",{type:"button",role:"tab",class:"rp-tab on","aria-selected":"true",onclick:()=>G("score")},"\u{1F3C6} R\xE9sultat"),I=x("button",{type:"button",role:"tab",class:"rp-tab","aria-selected":"false",onclick:()=>G("answers")},`\u{1F50E} R\xE9ponses (${n} \u2714 \xB7 ${s} \u2716)`),O=x("button",{type:"button",class:"btn",onclick:()=>G(S.hidden?"answers":"score")},"Voir les r\xE9ponses \u2192");function G(ae){let Ae=ae==="answers";S.hidden=!Ae,m.hidden=Ae,_.classList.toggle("on",!Ae),I.classList.toggle("on",Ae),_.setAttribute("aria-selected",String(!Ae)),I.setAttribute("aria-selected",String(Ae)),O.textContent=Ae?"\u2190 R\xE9sultat":"Voir les r\xE9ponses \u2192",Ae&&(T(a,!1),setTimeout(()=>w.focus(),0))}let j=x("button",{type:"button",class:"btn",onclick:()=>{we(),i.onRetry&&i.onRetry()}},"\u21BB R\xE9essayer"),K=i.next?x("a",{class:"btn primary",href:i.next.href,onclick:()=>we(!0)},i.next.label):null,J=x("button",{type:"button",class:"rp-close","aria-label":"Fermer et revoir l\u2019activit\xE9 corrig\xE9e",onclick:()=>we()},"\u2715"),le=x("div",{class:"rp",role:"dialog","aria-modal":"true","aria-labelledby":"rp-title",style:i.accent?`--rp-accent:${i.accent}`:null},J,x("div",{class:"rp-tabs",role:"tablist"},_,I),m,S,x("div",{class:"rp-foot"},j,O,K)),X=x("div",{class:"rp-bg"+(i.ratio===1?" perfect":""),onclick:ae=>{ae.target===X&&we()}},le);X.addEventListener("keydown",ae=>{if(ae.key==="Escape")ae.stopPropagation(),we();else if(!S.hidden&&(ae.key==="ArrowRight"||ae.key==="ArrowLeft")&&!ae.target.matches("input,textarea"))ae.preventDefault(),T(a+(ae.key==="ArrowRight"?1:-1));else if(ae.key==="Tab"){let Ae=[...le.querySelectorAll("button,a[href]")].filter(B=>!B.closest("[hidden]")&&B.offsetParent!==null);if(!Ae.length)return;let ke=Ae[0],$e=Ae[Ae.length-1];ae.shiftKey&&document.activeElement===ke?(ae.preventDefault(),$e.focus()):!ae.shiftKey&&document.activeElement===$e&&(ae.preventDefault(),ke.focus())}});let he=!1;function Me(){he||(he=!0,document.body.append(X),document.body.classList.add("rp-open"),requestAnimationFrame(()=>X.classList.add("show")),setTimeout(()=>(K||j).focus({preventScroll:!0}),30))}function we(ae=!1){he&&(he=!1,X.classList.remove("show"),document.body.classList.remove("rp-open"),setTimeout(()=>X.remove(),It()?0:220),ae||(i.onClose&&i.onClose(),r&&r.focus&&document.contains(r)&&r.focus({preventScroll:!0})))}return Me(),requestAnimationFrame(()=>{It()?c.style.setProperty("--p",o):setTimeout(()=>c.style.setProperty("--p",o),120)}),Qp(l,i.score,900,ae=>Wt(Math.round(ae*10)/10)),T(0,!0),{open:Me,close:we}}function nm(i,e=0){if(!i||!i.length)return;let t=document.querySelector(".ach-stack");t||(t=x("div",{class:"ach-stack",role:"status","aria-live":"polite"}),document.body.append(t)),i.forEach((n,s)=>setTimeout(()=>{let r=x("div",{class:"ach"},x("span",{class:"ach-ic","aria-hidden":"true"},n.icon),x("div",null,x("small",null,"Badge d\xE9bloqu\xE9 !"),x("b",null,n.title),x("span",null,n.desc)));t.append(r),Ne.play("star",{i:Math.min(4,s+2)}),setTimeout(()=>{r.classList.add("out"),setTimeout(()=>r.remove(),400)},5200)},(e+s*.6)*1e3))}function im(i,{compact:e=!1}={}){return x("div",{class:"ghud"+(e?" compact":""),role:"group","aria-label":`Niveau ${i.level}, ${i.into} XP sur ${i.need}, s\xE9rie ${i.streak}`},x("span",{class:"ghud-lvl",title:i.rank},x("b",null,i.level),x("small",null,"niv.")),x("span",{class:"ghud-xp"},x("span",{class:"ghud-xp-top"},x("b",null,i.rank),x("small",null,`${i.into}/${i.need} XP`)),x("span",{class:"ghud-bar"},x("i",{style:`width:${i.pct}%`}))),x("span",{class:"ghud-chip"+(i.streak>=3?" hot":""),title:`Meilleure s\xE9rie : ${i.bestStreak}`},"\u{1F525} ",i.streak),x("span",{class:"ghud-chip",title:"Badges d\xE9bloqu\xE9s"},"\u{1F3C5} ",i.badges.size))}var sm=i=>i===1?"Parfait ! \u{1F389}":i>=.8?"Tr\xE8s bien !":i>=.6?"Bien, tu y es presque.":i>=.4?"Pas mal, relis les explications.":"Courage : lis les corrections puis r\xE9essaie.",gb=i=>i===1?"\u0645\u0645\u062A\u0627\u0632! \u0625\u062C\u0627\u0628\u0629 \u0643\u0627\u0645\u0644\u0629 \u0648\u0645\u062A\u0642\u0646\u0629 \u{1F389}":i>=.8?"\u0623\u062D\u0633\u0646\u062A \u062C\u062F\u0627\u064B! \u0623\u062F\u0627\u0621 \u0645\u062A\u0645\u064A\u0632 \u{1F44D}":i>=.6?"\u062C\u064A\u062F\u060C \u0627\u0642\u062A\u0631\u0628\u062A \u0645\u0646 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u062A\u0627\u0645\u0629 \u2728":i>=.4?"\u0644\u0627 \u0628\u0623\u0633\u060C \u0631\u0627\u062C\u0639 \u0627\u0644\u0634\u0631\u0648\u062D\u0627\u062A \u0648\u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u{1F504}":"\u0627\u0642\u0631\u0623 \u0627\u0644\u0634\u0631\u062D \u062C\u064A\u062F\u0627\u064B \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B \u{1F4AA}";function rm(i){let e=f=>i.store.record(i.prof.id,f),t=i.score/5,n=Ec(i.prof.id,i.act.id),s=Jp(i.prof.id,i.act.id,i.elapsedMs,i.score),r=pr(e,i.prof.id),a=Kp(i.before,r),o=e(i.act.id).attempts,l=o[0].score,c=Math.max(...o.map(f=>f.score)),u=i.n===1?"Premier essai enregistr\xE9.":`Essai n\xB0 ${i.n} \xB7 premier essai : ${Wt(l)}/5 \xB7 meilleur : ${Wt(c)}/5`,h=Ne.feedback(i.res.items,t,i.score);em(i.stage,h.step);let p=It()?0:h.end*1e3,g=null,v=()=>{g=tm({score:i.score,ratio:t,items:i.res.items,msg:sm(t),arMsg:gb(t),attemptLine:u,accent:i.accent,game:{before:i.before,after:r,...a},time:i.elapsedMs>0?{ms:i.elapsedMs,record:s,best:n}:null,starDelay:h.starAt-h.end,starStep:h.starStep,onRetry:i.onRetry,next:i.next,onClose:()=>{d.classList.add("show")}})};setTimeout(()=>{v(),i.onPeak&&i.onPeak(t)},p),nm(a.newBadges,p/1e3+1.4);let m="\u2605".repeat(Math.round(i.score))+"\u2606".repeat(5-Math.round(i.score)),d=x("section",{class:"result-bar"+(t===1?" perfect":t>=.6?" good":" low"),"aria-label":"R\xE9sultat"},x("div",{class:"rb-score"},x("b",null,Wt(i.score)),x("small",null,"/5"),x("span",{class:"rb-stars","aria-hidden":"true"},m)),x("div",{class:"rb-text"},x("b",null,sm(t)),x("small",null,`${i.res.items.filter(f=>!f.info&&f.ok).length} juste(s) \xB7 ${i.res.items.filter(f=>!f.info&&!f.ok).length} \xE0 revoir \xB7 +${a.xpGain} XP${i.elapsedMs>0?" \xB7 \u23F1 "+ki(i.elapsedMs):""}`)),x("div",{class:"row"},x("button",{type:"button",class:"btn small",onclick:()=>v()},"\u{1F50E} Revoir la correction"),x("button",{type:"button",class:"btn small",onclick:()=>i.onRetry&&i.onRetry()},"\u21BB R\xE9essayer"),i.next?x("a",{class:"btn primary small",href:i.next.href},i.next.label):null));return d}function am(){let i=x("span",{class:"chrono",role:"timer","aria-label":"Temps pass\xE9"},"\u23F1 0:00"),e=performance.now(),t=null,n=null,s=()=>{i.textContent="\u23F1 "+ki((t??performance.now())-e)},r=()=>{if(!i.isConnected&&n){clearInterval(n),n=null;return}s()};return{el:i,start(){e=performance.now(),t=null,s(),n||(n=setInterval(r,500))},stop(){return t=performance.now(),s(),t-e}}}function om(i=document){i.addEventListener("pointermove",e=>{let t=e.target.closest&&e.target.closest("[data-tilt]");if(!t||It()||e.pointerType==="touch")return;let n=t.getBoundingClientRect(),s=(e.clientX-n.left)/n.width-.5,r=(e.clientY-n.top)/n.height-.5;t.style.setProperty("--rx",(-r*8).toFixed(2)+"deg"),t.style.setProperty("--ry",(s*10).toFixed(2)+"deg"),t.style.setProperty("--mx",((s+.5)*100).toFixed(1)+"%"),t.style.setProperty("--my",((r+.5)*100).toFixed(1)+"%"),t.classList.add("tilting")},{passive:!0}),i.addEventListener("pointerout",e=>{let t=e.target.closest&&e.target.closest("[data-tilt]");!t||t.contains(e.relatedTarget)||(t.classList.remove("tilting"),t.style.setProperty("--rx","0deg"),t.style.setProperty("--ry","0deg"))},{passive:!0}),i.addEventListener("pointerdown",e=>{let t=e.target.closest&&e.target.closest(".btn, .chip, .pick, .rp-tab, .hud-btn");if(!t||It())return;let n=t.getBoundingClientRect(),s=Math.max(n.width,n.height)*2,r=document.createElement("span");r.className="ripple-wrap",r.setAttribute("aria-hidden","true");let a=document.createElement("span");a.className="ripple",a.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-n.left-s/2}px;top:${e.clientY-n.top-s/2}px`,getComputedStyle(t).position==="static"&&(t.style.position="relative"),r.append(a),t.append(r),setTimeout(()=>r.remove(),600)},{passive:!0})}var Zt=$h(Pc(),rd),cm={match:"Associer",sort:"Classer",order:"Ordonner",fill:"Compl\xE9ter",quiz:"Questions",hot:"Rep\xE9rer",asm:"Assembler",net:"Relier",robot:"Robot 3D",prog:"Algorithme",sim:"Simulation"},Lh={match:"\u{1F517}",sort:"\u{1F5C3}\uFE0F",order:"\u{1F522}",fill:"\u270F\uFE0F",quiz:"\u2753",hot:"\u{1F3AF}",asm:"\u{1F9E9}",net:"\u{1F578}\uFE0F",robot:"\u{1F916}",prog:"\u{1F9E0}",sim:"\u{1F5B1}\uFE0F"},xb={todo:"Pas commenc\xE9e",doing:"En cours",done:"Termin\xE9e"},Dh={sessions:zn.flatMap(i=>i.sessions)},Zn=i=>e=>Zt.record(i,e),mr=i=>{location.hash=i},gr=i=>i?x("small",{class:"ar-sub",lang:"ar",dir:"rtl"},i):null,mt={world:document.getElementById("world"),hud:document.getElementById("hud"),panel:document.getElementById("panel"),holo:document.getElementById("holo"),gate:document.getElementById("gate"),tip:document.getElementById("tip"),live:document.getElementById("live")};function Rh(i){let e=i?.preferences||{};document.body.classList.toggle("reduced-motion",!!e.reducedMotion),document.body.classList.toggle("large-text",!!e.largeText),document.body.classList.toggle("high-contrast",!!e.highContrast),Ne.configure(e)}function vb(i){let e=x("div",{class:"toast",role:"status"},i);document.body.append(e),setTimeout(()=>e.remove(),3200)}function yb(i,e="Continuer"){return new Promise(t=>{let n=document.activeElement,s=o=>{a.remove(),n&&n.focus&&n.focus(),t(o)},r=x("button",{type:"button",class:"btn primary",onclick:()=>s(!0)},e),a=x("div",{class:"modal-bg",onkeydown:o=>{o.key==="Escape"&&(o.stopPropagation(),s(!1))}},x("div",{class:"modal",role:"alertdialog","aria-modal":"true","aria-label":i},x("p",null,i),x("div",{class:"row"},r,x("button",{type:"button",class:"btn ghost",onclick:()=>s(!1)},"Annuler"))));document.body.append(a),r.focus()})}var um=(i,e)=>x("div",{class:"bar",role:"progressbar","aria-valuenow":i,"aria-valuemin":0,"aria-valuemax":100,"aria-label":e},x("i",{style:`width:${i}%`})),_b=i=>{mt.live.textContent="",setTimeout(()=>{mt.live.textContent=i},30)},rn=null,lm="",hm="infoplay.ambient",bb=()=>{try{return localStorage.getItem(hm)!=="0"}catch{return!0}};Ne.ambient(bb());if(Mc())try{rn=$p(mt.world,{modules:zn,reduced:It,onPick:i=>{Ne.play("snap"),mr(i.type==="module"?`#/m/${i.mi}`:`#/m/${i.mi}/s/${i.si}`)},onHover:(i,e)=>{let t=i?[i.type,i.mi,i.si].join("/"):"";if(t&&t!==lm&&Ne.play(i.type==="module"?"join":"portal"),lm=t,!i){mt.tip.hidden=!0;return}if(e&&!e.clientX)return;let n=Zt.active(),s=n?Zn(n.id):()=>null;if(i.type==="module"){let r=vr(i.mi),a=xi(r,s);mt.tip.replaceChildren(x("b",null,`${r.icon} Module ${r.id}`),x("span",null,r.title),x("small",null,`${a.pct} % \xB7 ${Wt(a.best)}/${a.max} pts`))}else{let r=qi(i.mi,i.si),a=Kn(r,s);mt.tip.replaceChildren(x("b",null,`S\xE9ance ${r.index}`),x("span",null,r.title),x("small",null,`${xb[a.status]} \xB7 ${Wt(a.best)}/20`))}e&&(mt.tip.style.left=e.clientX+16+"px",mt.tip.style.top=e.clientY+16+"px"),mt.tip.hidden=!1}})}catch(i){console.error(i),rn=null}rn||(mt.world.replaceChildren(x("div",{class:"no3d"},x("h1",null,"La 3D n\u2019est pas disponible"),x("p",null,"Ce navigateur ou cet ordinateur ne prend pas en charge WebGL. Tu peux utiliser toutes les activit\xE9s dans le mode classique, ou continuer ici avec la carte."),x("a",{class:"btn primary",href:"index.html#/dash"},"Ouvrir le mode classique"))),document.body.classList.add("no-webgl"));function dm(){let i=Zt.active();if(!rn||!i)return;let e=Zn(i.id),t={};for(let n of zn){let s=xi(n,e);t[n.id]={pct:s.pct,sessions:Object.fromEntries(n.sessions.map(r=>[r.index,Kn(r,e).status]))}}rn.setProgress(t)}function fm(i,e){let t=[x("a",{href:"#/"},"\u{1F3DD} Place centrale")];e.mi&&t.push(x("span",{"aria-hidden":"true"},"\u203A"),x("a",{href:`#/m/${e.mi}`},`Module ${e.mi}`)),e.si&&t.push(x("span",{"aria-hidden":"true"},"\u203A"),x("a",{href:`#/m/${e.mi}/s/${e.si}`},`S\xE9ance ${e.si}`)),e.ai&&t.push(x("span",{"aria-hidden":"true"},"\u203A"),x("span",{"aria-current":"page"},`Activit\xE9 ${e.ai}`));let n=null,s=null;if(i){let l=xi(Dh,Zn(i.id));n=x("span",{class:"hud-chip",title:"Points (meilleurs essais)"},"\u2B50 ",x("b",null,Wt(l.best)),` / ${Lc}`),s=im(pr(Zn(i.id),i.id),{compact:!0})}let r=i?x("button",{type:"button",class:"hud-btn","aria-pressed":String(i.preferences.soundEnabled),title:i.preferences.soundEnabled?"Couper les sons":"Activer les sons",onclick:()=>{Zt.updateProfile(i.id,{preferences:{soundEnabled:!i.preferences.soundEnabled}}),Rh(Zt.active()),zi()}},i.preferences.soundEnabled?"\u{1F50A}":"\u{1F507}"):null,a=x("button",{type:"button",class:"hud-btn","aria-pressed":String(Ne.ambientOn),title:Ne.ambientOn?"Couper l\u2019ambiance sonore":"Activer l\u2019ambiance sonore",onclick:()=>{let l=!Ne.ambientOn;try{localStorage.setItem(hm,l?"1":"0")}catch{}Ne.ambient(l),zi()}},Ne.ambientOn?"\u{1F3B5}":"\u{1F3B6}"),o=i?x("button",{type:"button",class:"hud-btn","aria-pressed":String(!!i.preferences.reducedMotion),title:"R\xE9duire les animations",onclick:()=>{Zt.updateProfile(i.id,{preferences:{reducedMotion:!i.preferences.reducedMotion}}),Rh(Zt.active()),zi()}},i.preferences.reducedMotion?"\u23F8":"\u2728"):null;mt.hud.replaceChildren(x("div",{class:"hud-in"},x("a",{class:"hud-brand",href:"#/"},x("span",{class:"logo","aria-hidden":"true"},"\u{1F3AE}"),x("span",null,"InfoPlay ",x("b",null,"Immersif"))),x("nav",{class:"hud-crumbs","aria-label":"Fil d\u2019Ariane"},t),x("div",{class:"hud-right"},s,n,r,i&&i.preferences.soundEnabled?a:null,o,i?x("button",{type:"button",class:"hud-chip as-btn",title:"Changer d\u2019\xE9l\xE8ve",onclick:()=>{Zt.logout(),zi()}},"\u{1F464} ",i.displayName):null,x("a",{class:"hud-btn wide",href:"index.html",title:"Revenir \xE0 la premi\xE8re page"},"\u21E6 Accueil"))))}function Mb(){let i=Zt.active();if(mt.gate.hidden=!!i,i){mt.gate.replaceChildren();return}let e=x("input",{type:"text",id:"gname",maxlength:"24",required:!0,autocomplete:"off",placeholder:"Ton pr\xE9nom ou ton pseudo"}),t=x("p",{class:"hint-line",role:"alert"}),n=x("form",{onsubmit:r=>{r.preventDefault();try{Zt.createProfile(e.value),Ne.play("success"),zi()}catch(a){t.textContent=a.message}}},x("label",{class:"f",for:"gname"},"Comment t\u2019appelles-tu ?"),x("div",{class:"row"},e,x("button",{class:"btn primary",type:"submit"},"Entrer dans le monde \u2192")),t),s=Zt.profiles();mt.gate.replaceChildren(x("div",{class:"gate-card glass",role:"dialog","aria-modal":"true","aria-labelledby":"gate-h"},x("p",{class:"eyebrow"},"Mode immersif 3D"),x("h1",{id:"gate-h",tabindex:"-1"},"Bienvenue dans le monde InfoPlay"),x("p",{class:"muted"},"Explore les 4 \xEEles de l\u2019informatique, traverse les portails des s\xE9ances et rel\xE8ve les d\xE9fis. Ta progression est la m\xEAme que dans le mode classique."),x("p",{class:"ar-lead",lang:"ar",dir:"rtl"},"\u0627\u0633\u062A\u0643\u0634\u0641 \u062C\u0632\u0631 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u064A\u0627\u062A \u0627\u0644\u0623\u0631\u0628\u0639 \u0648\u0627\u062F\u062E\u0644 \u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u062D\u0635\u0635"),s.length?x("div",null,x("h2",null,"Qui joue ?"),x("div",{class:"gate-profiles"},s.map(r=>{let a=xi(Dh,Zn(r.id));return x("button",{type:"button",class:"profile-btn",onclick:()=>{Zt.setActive(r.id),Ne.play("snap"),zi()}},x("b",null,r.displayName),x("span",{class:"pill"},`${Wt(a.best)} / ${Lc} pts`))})),x("p",{class:"or"},"ou cr\xE9e un nouveau profil")):null,n,x("p",{class:"notice"},"Pas de mot de passe : n\u2019\xE9cris ni ton nom complet, ni ton adresse, ni ton t\xE9l\xE9phone. Les r\xE9sultats restent dans ce navigateur."))),setTimeout(()=>(s.length?mt.gate.querySelector(".profile-btn"):e)?.focus(),30)}function Sb(i){let e=Zn(i.id),t=xi(Dh,e),n=pi.find(s=>!e(s.id)?.attempts.length);return[x("p",{class:"eyebrow"},"Place centrale"),x("h1",{tabindex:"-1"},`Salam ${i.displayName} \u{1F44B}`),x("p",{class:"muted"},"Fais glisser pour tourner autour du monde, fais rouler la molette pour zoomer, clique sur une \xEEle pour y voyager."),x("div",{class:"panel-stats"},x("div",null,x("b",null,`${t.pct} %`),x("span",null,"progression")),x("div",null,x("b",null,`${t.done}/${t.n}`),x("span",null,"activit\xE9s")),x("div",null,x("b",null,`${t.sessionsDone}/30`),x("span",null,"s\xE9ances"))),n?x("a",{class:"btn primary block",href:`#/m/${n.moduleId}/s/${n.sessionIndex}/a/${n.index}`},`\u25B6 Continuer : ${n.title}`):x("p",{class:"pill done"},"\u{1F3C6} Tout est termin\xE9 !"),(()=>{let s=pr(e,i.id);return x("div",{class:"panel-game"},x("div",{class:"pg-head"},x("span",{class:"pg-lvl"},s.level),x("div",null,x("b",null,`Niveau ${s.level} \xB7 ${s.rank}`),x("small",null,`${s.into} / ${s.need} XP \xB7 \u{1F525} s\xE9rie ${s.streak} (record ${s.bestStreak})`),x("div",{class:"xpbar"},x("i",{style:`width:${s.pct}%`})))),x("div",{class:"pg-badges","aria-label":`Badges : ${s.badges.size} sur ${wc.length}`},wc.map(r=>x("span",{class:"pg-badge"+(s.badges.has(r.id)?" got":""),title:`${r.title} \u2014 ${r.desc}`},s.badges.has(r.id)?r.icon:"\u{1F512}"))))})(),x("h2",null,"Les 4 \xEEles"),x("div",{class:"island-list"},zn.map(s=>{let r=xi(s,e);return x("a",{class:"island-btn",href:`#/m/${s.id}`,style:`--c:${Bi[s.id]}`},x("span",{class:"em","aria-hidden":"true"},s.icon),x("span",null,x("b",null,`Module ${s.id} \u2014 ${s.short||s.title}`),gr(Dc(s.id)),um(r.pct,`Module ${s.id} : ${r.pct} %`)),x("span",{class:"pct"},`${r.pct} %`))}))]}function wb(i,e){let t=vr(e),n=Zn(i.id),s=xi(t,n),r=o=>{let l=Kn(o,n);return x("a",{class:"portal-btn "+l.status,href:`#/m/${e}/s/${o.index}`},x("span",{class:"n"},l.status==="done"?"\u2713":o.index),x("span",null,x("b",null,o.title),gr(Uc(o.id))),x("span",{class:"sc"},`${Wt(l.best)}/20`))},a=t.groups?t.groups.flatMap(o=>[x("h3",{class:"group-h"},o.label),...o.sessions.map(l=>r(t.sessions[l-1]))]):t.sessions.map(r);return[x("p",{class:"eyebrow",style:`color:${Bi[e]}`},`\xCEle ${t.id}`),x("h1",{tabindex:"-1"},`${t.icon} ${t.title}`,gr(Dc(t.id))),x("p",{class:"muted"},`${t.sessions.length} portails \xB7 ${Wt(s.best)} / ${s.max} points`),um(s.pct,`Module ${t.id} : ${s.pct} %`),x("p",{class:"muted small"},"Chaque portail est une s\xE9ance. Couleur : bleu = \xE0 faire, or = en cours, vert = termin\xE9e."),t.languageNote?x("p",{class:"notice"},t.languageNote):null,x("div",{class:"portal-list"},a)]}function Eb(i,e,t){let n=qi(e,t),s=Zn(i.id),r=Kn(n,s),a=n.acts.find(o=>!s(o.id)?.attempts.length)||n.acts[0];return[x("p",{class:"eyebrow",style:`color:${Bi[e]}`},`Module ${e} \xB7 Portail ${t}`),x("h1",{tabindex:"-1"},n.title,gr(Uc(n.id))),x("p",{class:"muted"},x("b",null,"Notions : "),n.topics.join(", "),"."),x("div",{class:"act-cards"},n.acts.map(o=>{let l=s(o.id),c=l?.attempts.length?Math.max(...l.attempts.map(u=>u.score)):null;return x("a",{class:"act-card"+(c!=null?" done":""),href:`#/m/${e}/s/${t}/a/${o.index}`},x("span",{class:"ico","aria-hidden":"true"},Lh[o.type]),x("span",null,x("small",null,`${o.index}. ${cm[o.type]}`),x("b",null,o.title),gr(Nc(o.id))),x("span",{class:"sc"},c!=null?`${Wt(c)}/5`:`~${o.estimatedMinutes} min`))})),x("div",{class:"row"},x("a",{class:"btn primary",href:`#/m/${e}/s/${t}/a/${a.index}`},r.done?"\u25B6 Continuer":"\u25B6 Entrer dans le portail"),r.done?x("a",{class:"btn",href:`#/m/${e}/s/${t}/bilan`},"Bilan"):null),x("p",null,x("a",{href:`#/m/${e}`},"\u2190 Retour \xE0 l\u2019\xEEle"))]}function Tb(i,e,t){let n=qi(e,t),s=Zn(i.id),r=Kn(n,s),a=Fd(r.best),o=n.acts.filter(c=>{let u=s(c.id);return!u?.attempts.length||Math.max(...u.attempts.map(h=>h.score))<3}),l=qi(e,t+1);return[x("p",{class:"eyebrow"},`Bilan \xB7 S\xE9ance ${t}`),x("h1",{tabindex:"-1"},n.title),x("div",{class:"panel-stats"},x("div",null,x("b",null,`${Wt(r.best)}/20`),x("span",null,"meilleurs")),x("div",null,x("b",null,`${Wt(r.first)}/20`),x("span",null,"premiers essais")),x("div",null,x("b",null,a.label),x("span",null,"niveau"))),x("div",{class:"act-cards"},n.acts.map(c=>{let u=s(c.id)?.attempts||[];return x("a",{class:"act-card"+(u.length?" done":""),href:`#/m/${e}/s/${t}/a/${c.index}`},x("span",{class:"ico","aria-hidden":"true"},Lh[c.type]),x("span",null,x("b",null,c.title),x("small",null,`Essais : ${u.length}`)),x("span",{class:"sc"},u.length?`${Wt(Math.max(...u.map(h=>h.score)))}/5`:"\u2014"))})),x("h2",null,o.length?"\xC0 revoir":"Bravo !"),o.length?x("ul",null,o.map(c=>x("li",null,x("a",{href:`#/m/${e}/s/${t}/a/${c.index}`},c.title)))):x("p",null,"Toutes les activit\xE9s sont ma\xEEtris\xE9es (au moins 3/5)."),x("div",{class:"row"},l?x("a",{class:"btn primary",href:`#/m/${e}/s/${t+1}`},"Portail suivant \u2192"):x("a",{class:"btn primary",href:`#/m/${e}`},"Retour \xE0 l\u2019\xEEle"))]}var vn=null;function Ih(){vn&&vn.dispose&&vn.dispose(),vn=null,mt.holo.hidden=!0,mt.holo.replaceChildren(),document.body.classList.remove("holo-open")}function Ab(i,e,t,n){let s=sd(`m${e}-s${t}-a${n}`);if(!s){mr(`#/m/${e}/s/${t}`);return}Ih();let r=Zn(i.id),a=qi(e,t),o=x("div",{class:`stage-card activity-${s.id}`}),l=x("div",{class:"result-slot"}),c=x("div",{class:"hintbox",hidden:!0},"\u{1F4A1} "+s.hint),u=am(),h=!1,p=x("button",{type:"button",class:"btn primary check-btn",onclick:d,"aria-keyshortcuts":"Control+Enter"},x("span",null,"\u2714 V\xE9rifier"),x("kbd",{"aria-hidden":"true"},"Ctrl+\u23CE")),g=x("button",{type:"button",class:"btn ghost","aria-expanded":"false",onclick:()=>{c.hidden=!c.hidden,c.hidden||Ne.play("hint"),g.setAttribute("aria-expanded",String(!c.hidden))}},"\u{1F4A1} Indice"),v=s.type==="robot"?Zp:Gc(s.mech);function m(){vn&&vn.dispose&&vn.dispose(),o.replaceChildren(),o.inert=!1,l.replaceChildren(),h=!1,p.disabled=!1,vn=v(o,s.data),u.start(),window.__ip&&(window.__ip.eng=vn)}async function d(){if(h||!vn)return;let w=vn.check();if(w.incomplete){vb(w.incomplete),o.classList.remove("shake"),o.offsetWidth,o.classList.add("shake"),Ne.play("wrong");return}if(w.unanswered>0&&!await yb(`Il reste ${w.unanswered} r\xE9ponse(s) vide(s). V\xE9rifier quand m\xEAme ?`,"V\xE9rifier")||h)return;h=!0,p.disabled=!0;let C=u.stop(),L=pr(r,i.id),T=Nd(w.correct,w.total),S=Zt.recordAttempt(i.id,s.id,T,s.version);vn.reveal&&vn.reveal(w),o.inert=!0;let _=n<4?`#/m/${e}/s/${t}/a/${n+1}`:`#/m/${e}/s/${t}/bilan`;l.replaceChildren(rm({store:Zt,prof:i,act:s,res:w,score:T,n:S,before:L,elapsedMs:C,stage:o,accent:Bi[e],next:{href:_,label:n<4?"Activit\xE9 suivante \u2192":"Voir le bilan \u2192"},onRetry:()=>{m(),M.scrollTo({top:0,behavior:"smooth"})},onPeak:I=>{I===1&&Hh(),I>=.6&&rn&&rn.burst(I===1)}})),dm(),fm(Zt.active(),{mi:e,si:t,ai:n})}let f=x("nav",{class:"dots","aria-label":"Activit\xE9s de la s\xE9ance"},a.acts.map(w=>x("a",{href:`#/m/${e}/s/${t}/a/${w.index}`,class:(w.index===n?"cur ":"")+(r(w.id)?.attempts.length?"done":""),"aria-label":`Activit\xE9 ${w.index} : ${w.title}`,"aria-current":w.index===n?"step":null},w.index))),b=Ec(i.id,s.id),M=x("div",{class:"holo-body"},x("div",{class:"holo-head"},x("div",null,x("p",{class:"eyebrow",style:`color:${Bi[e]}`},`${Lh[s.type]} ${cm[s.type]} \xB7 Module ${e} \xB7 S\xE9ance ${t}`),x("h1",{tabindex:"-1",id:"holo-h"},s.title,gr(Nc(s.id)))),x("div",{class:"holo-side"},f,x("div",{class:"holo-meta"},u.el,b!=null?x("span",{class:"chrono best",title:"Ton meilleur temps"},"\u{1F3C6} "+ki(b)):null))),x("p",{class:"muted",style:"margin:.2rem 0"},x("b",null,"Objectif : "),s.objective,` \xB7 environ ${s.estimatedMinutes} min \xB7 note sur 5`),x("div",{class:"instr activity-brief"},x("b",null,"Consigne : "),s.instructions,x("p",{class:"activity-ar-instruction",lang:"ar",dir:"rtl"},ad(s.type))),c,o,x("div",{class:"row activity-actions"},p,g),l);M.addEventListener("keydown",w=>{(w.ctrlKey||w.metaKey)&&w.key==="Enter"&&(w.preventDefault(),d())});let y=x("div",{class:"holo-frame",role:"dialog","aria-modal":"true","aria-labelledby":"holo-h",style:`--c:${Bi[e]}`},x("button",{type:"button",class:"holo-close","aria-label":"Fermer l\u2019activit\xE9 et revenir au portail",onclick:()=>mr(`#/m/${e}/s/${t}`)},"\u2715"),M);mt.holo.replaceChildren(y),mt.holo.hidden=!1,document.body.classList.add("holo-open"),m()}function pm(){let i=location.hash.replace(/^#\/?/,"").split("/").filter(Boolean),e={};return i[0]==="m"&&vr(i[1])&&(e.mi=+i[1],i[2]==="s"&&qi(e.mi,i[3])&&(e.si=+i[3],i[4]==="a"&&/^[1-4]$/.test(i[5]||"")?e.ai=+i[5]:i[4]==="bilan"&&(e.bilan=!0))),e}var Ch="";function zi(){let i=Zt.active();Rh(i);let e=pm();fm(i,e),Mb(),document.body.classList.toggle("gated",!i);let t=[e.mi,e.si,e.ai,e.bilan].join("/");if(rn&&t!==Ch&&((Ch!==""||location.hash.length>2)&&Ne.play(e.ai?"open":"whoosh"),e.ai?rn.focusActivity(e.mi,e.si):e.si?rn.focusSession(e.mi,e.si):e.mi?rn.focusModule(e.mi):rn.focusHub()),Ch=t,dm(),!i){Ih(),mt.panel.hidden=!0,Ph();return}mt.panel.hidden=!1;let n=e.si?e.bilan?Tb(i,e.mi,e.si):Eb(i,e.mi,e.si):e.mi?wb(i,e.mi):Sb(i);if(mt.panel.replaceChildren(x("div",{class:"panel-in glass"},n)),mt.panel.scrollTop=0,e.ai)Ab(i,e.mi,e.si,e.ai),setTimeout(()=>mt.holo.querySelector("h1")?.focus({preventScroll:!0}),50);else{Ih();let r=mt.panel.querySelector("h1");r&&r.focus({preventScroll:!0})}Ph();let s=e.ai?`Activit\xE9 ${e.ai} de la s\xE9ance ${e.si}`:e.si?`Portail de la s\xE9ance ${e.si}, module ${e.mi}`:e.mi?`\xCEle du module ${e.mi}`:"Place centrale";_b(s)}function Ph(){if(!rn)return;let i=!mt.panel.hidden&&!document.body.classList.contains("holo-open")&&!document.body.classList.contains("gated")&&window.innerWidth>760;rn.setInset(i?Math.round(mt.panel.getBoundingClientRect().width+16):0)}window.addEventListener("resize",Ph);window.addEventListener("hashchange",zi);document.addEventListener("keydown",i=>{if(i.key!=="Escape"||document.querySelector(".modal-bg"))return;let e=pm();e.ai||e.bilan?mr(`#/m/${e.mi}/s/${e.si}`):e.si?mr(`#/m/${e.mi}`):e.mi&&mr("#/")});dd(document);om(document);/[?&]test=1/.test(location.search)&&(window.__ip={store:Zt,CATALOG:zn,ACTIVITIES:pi,engineOf:Gc,world:rn});zi();requestAnimationFrame(()=>{let i=document.querySelector(".loader");i&&(i.classList.add("gone"),setTimeout(()=>i.remove(),700))});})();
