(()=>{function v(i,e,...t){let n=document.createElement(i);if(e)for(let s in e){let r=e[s];r==null||r===!1||(s==="class"?n.className=r:s.startsWith("on")&&typeof r=="function"?n.addEventListener(s.slice(2),r):s==="value"?n.value=r:n.setAttribute(s,r===!0?"":String(r)))}return yh(n,t),n}function yh(i,e){for(let t of e)t==null||t===!1||(Array.isArray(t)?yh(i,t):i.append(t.nodeType?t:document.createTextNode(String(t))))}var kp=Math.random;function li(i,e=!0){let t=i.length,n=i.slice();for(let s=0;s<10;s++){n=i.slice();for(let r=t-1;r>0;r--){let a=Math.floor(kp()*(r+1));[n[r],n[a]]=[n[a],n[r]]}if(!e||t<2||n.some((r,a)=>r!==i[a]))break}return n}var at=i=>String(i??"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[’']/g,"'").replace(/\s+/g," ").trim(),Ui=i=>typeof i=="number"?String(Math.round(i*1e6)/1e6).replace(".",","):String(i);function Ia(i){let e=document.createElement("template");return e.innerHTML=i.trim(),e.content.firstElementChild}var Xn=()=>typeof document<"u"&&(document.body?.classList?.contains("reduced-motion")||typeof window<"u"&&window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches);function bh(){if(typeof window>"u"||typeof document>"u"||Xn())return;let i=document.createElement("canvas");i.className="confetti-canvas",i.setAttribute("aria-hidden","true"),Object.assign(i.style,{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",pointerEvents:"none",zIndex:"9999"}),document.body.append(i);let e=i.width=window.innerWidth||800,t=i.height=window.innerHeight||600,n=i.getContext&&i.getContext("2d");if(!n){i.remove();return}let s=["#f2b418","#2b3fc4","#c8431a","#15703f","#9159cf","#0a7467"],r=Array.from({length:60},()=>({x:e*(.2+Math.random()*.6),y:t*.35,vx:(Math.random()-.5)*12,vy:(Math.random()-.9)*14,size:Math.random()*7+4,color:s[Math.floor(Math.random()*s.length)],rot:Math.random()*360,vrot:(Math.random()-.5)*10,gravity:.38,alpha:1})),a=0;function o(){n.clearRect(0,0,e,t);let l=!1;for(let c of r)c.x+=c.vx,c.y+=c.vy,c.vy+=c.gravity,c.rot+=c.vrot,a>25&&(c.alpha-=.02),c.alpha>0&&(l=!0,n.save(),n.globalAlpha=Math.max(0,c.alpha),n.translate(c.x,c.y),n.rotate(c.rot*Math.PI/180),n.fillStyle=c.color,n.fillRect(-c.size/2,-c.size/2,c.size,c.size*.6),n.restore());a++,l&&a<90?requestAnimationFrame(o):i.remove()}requestAnimationFrame(o)}var pc="infoplay.v1",Eh=/^m[1-4]-s\d{1,2}-a[1-4]$/,Mh=/^[A-Za-z0-9_-]{1,64}$/;var Pa=()=>globalThis.crypto&&crypto.randomUUID?crypto.randomUUID():"id-"+Date.now().toString(36)+Math.random().toString(36).slice(2,10);function zp(){let i={};return{persistent:!1,get:e=>i[e]??null,set:(e,t)=>{i[e]=t},del:e=>{delete i[e]}}}function xc(){try{let i="__ip_test";return localStorage.setItem(i,"1"),localStorage.removeItem(i),{persistent:!0,get:e=>localStorage.getItem(e),set:(e,t)=>localStorage.setItem(e,t),del:e=>localStorage.removeItem(e)}}catch{return zp()}}var mc=()=>({schemaVersion:1,installationId:Pa(),profiles:[],activeProfileId:null,progressByProfile:{}}),fs=(i,e)=>String(i??"").replace(/[\u0000-\u001f\u007f<>]/g,"").trim().slice(0,e),Sh=i=>{let e=new Date(i);return isNaN(e)?new Date().toISOString():e.toISOString()};function wh(i,e=()=>!0){if(!i||typeof i!="object"||Array.isArray(i))return{ok:!1,error:"Le fichier ne contient pas une sauvegarde InfoPlay."};if(i.app!==void 0&&i.app!=="InfoPlay Maroc")return{ok:!1,error:"Ce fichier ne provient pas d\u2019InfoPlay Maroc."};if(i.schemaVersion!==1)return{ok:!1,error:"Version de sauvegarde non prise en charge ("+String(i.schemaVersion)+")."};if(!Array.isArray(i.profiles)||i.profiles.length>200)return{ok:!1,error:"Liste de profils invalide."};let t=[],n={},s=0,r=new Set;for(let a of i.profiles){if(!a||typeof a!="object"||typeof a.id!="string"||!Mh.test(a.id)||r.has(a.id)){s++;continue}let o=fs(a.displayName,24);if(!o){s++;continue}r.add(a.id),t.push({id:a.id,displayName:o,className:fs(a.className,12),createdAt:Sh(a.createdAt),preferences:gc(a.preferences)});let l=i.progressByProfile&&typeof i.progressByProfile=="object"?i.progressByProfile[a.id]:null,c={};if(l&&typeof l=="object")for(let u of Object.keys(l)){if(!Eh.test(u)||!e(u)){s++;continue}let h=Array.isArray(l[u]?.attempts)?l[u].attempts.slice(0,100):[],g=[];for(let m of h){if(!m||typeof m.id!="string"||!Mh.test(m.id)||typeof m.score!="number"||!isFinite(m.score)){s++;continue}g.push({id:m.id,score:Math.round(Math.min(5,Math.max(0,m.score))*10)/10,maxScore:5,completedAt:Sh(m.completedAt),contentVersion:Number.isInteger(m.contentVersion)&&m.contentVersion>0?m.contentVersion:1})}g.sort((m,x)=>m.completedAt.localeCompare(x.completedAt)),g.length&&(c[u]={attempts:g})}n[a.id]=c}return{ok:!0,data:{profiles:t,progressByProfile:n},ignored:s}}function gc(i){i=i&&typeof i=="object"?i:{};let e=Number(i.volume);return{reducedMotion:!!i.reducedMotion,largeText:!!i.largeText,highContrast:!!i.highContrast,soundEnabled:i.soundEnabled===void 0?!0:!!i.soundEnabled,hoverSound:!!i.hoverSound,volume:Number.isFinite(e)?Math.min(1,Math.max(0,e)):.45}}function Th(i=xc(),e=()=>!0){let t,n=!1;function s(){let l=i.get(pc);if(!l)return mc();try{let c=JSON.parse(l),u=wh({...c,app:void 0},e);if(!u.ok)throw new Error(u.error);return{schemaVersion:1,installationId:typeof c.installationId=="string"?c.installationId.slice(0,64):Pa(),profiles:u.data.profiles,progressByProfile:u.data.progressByProfile,activeProfileId:u.data.profiles.some(h=>h.id===c.activeProfileId)?c.activeProfileId:null}}catch{try{i.set(pc+".corrupt",l)}catch{}return n=!0,mc()}}t=s();let r=!1,a=()=>{try{i.set(pc,JSON.stringify(t)),r=!1}catch{r=!0}},o={get persistent(){return i.persistent!==!1&&!r},get recovered(){return n},state:()=>t,profiles:()=>t.profiles,active:()=>t.profiles.find(l=>l.id===t.activeProfileId)||null,setActive(l){t.activeProfileId=t.profiles.some(c=>c.id===l)?l:null,a()},logout(){t.activeProfileId=null,a()},createProfile(l,c=""){let u=fs(l,24);if(!u)throw new Error("Le pr\xE9nom ou pseudo est obligatoire.");if(t.profiles.length>=200)throw new Error("Trop de profils sur cet ordinateur.");let h={id:Pa().replace(/[^A-Za-z0-9_-]/g,"").slice(0,40),displayName:u,className:fs(c,12),createdAt:new Date().toISOString(),preferences:gc({})};return t.profiles.push(h),t.progressByProfile[h.id]={},t.activeProfileId=h.id,a(),h},updateProfile(l,c){let u=t.profiles.find(h=>h.id===l);if(u){if(c.displayName!==void 0){let h=fs(c.displayName,24);if(!h)throw new Error("Le pr\xE9nom ou pseudo est obligatoire.");u.displayName=h}c.className!==void 0&&(u.className=fs(c.className,12)),c.preferences&&(u.preferences=gc({...u.preferences,...c.preferences})),a()}},deleteProfile(l){t.profiles=t.profiles.filter(c=>c.id!==l),delete t.progressByProfile[l],t.activeProfileId===l&&(t.activeProfileId=null),a()},record(l,c){return(t.progressByProfile[l]||{})[c]},recordAttempt(l,c,u,h=1){if(!t.profiles.some(p=>p.id===l))throw new Error("Profil inconnu.");if(!Eh.test(c))throw new Error("Activit\xE9 inconnue.");let g=t.progressByProfile[l]||(t.progressByProfile[l]={}),m=g[c]||(g[c]={attempts:[]}),x={id:Pa().replace(/[^A-Za-z0-9_-]/g,"").slice(0,40),score:Math.round(Math.min(5,Math.max(0,u))*10)/10,maxScore:5,completedAt:new Date().toISOString(),contentVersion:h};return m.attempts.push(x),a(),m.attempts.length},first(l,c){let u=o.record(l,c);return u&&u.attempts.length?u.attempts[0].score:null},best(l,c){let u=o.record(l,c);return u&&u.attempts.length?Math.max(...u.attempts.map(h=>h.score)):null},exportJSON(l){let c=l?new Set(l):null,u=t.profiles.filter(g=>!c||c.has(g.id)),h={};for(let g of u)h[g.id]=t.progressByProfile[g.id]||{};return JSON.stringify({app:"InfoPlay Maroc",schemaVersion:1,exportedAt:new Date().toISOString(),installationId:t.installationId,profiles:u,progressByProfile:h},null,1)},importJSON(l){if(typeof l!="string"||l.length>5242880)return{ok:!1,error:"Fichier trop volumineux (maximum 5 Mo)."};let c;try{c=JSON.parse(l)}catch{return{ok:!1,error:"Fichier illisible : ce n\u2019est pas un JSON valide."}}let u=wh(c,e);if(!u.ok)return u;let h={ok:!0,profilesAdded:0,profilesMerged:0,attemptsAdded:0,ignored:u.ignored};for(let g of u.data.profiles){t.profiles.find(p=>p.id===g.id)?h.profilesMerged++:(t.profiles.push(g),t.progressByProfile[g.id]={},h.profilesAdded++);let x=t.progressByProfile[g.id]||(t.progressByProfile[g.id]={});for(let[p,d]of Object.entries(u.data.progressByProfile[g.id]||{})){let f=x[p]||(x[p]={attempts:[]}),b=new Set(f.attempts.map(S=>S.id));for(let S of d.attempts)b.has(S.id)||(f.attempts.push(S),h.attemptsAdded++);f.attempts.sort((S,_)=>S.completedAt.localeCompare(_.completedAt))}}return a(),h},resetAll(){t=mc(),a()},csv(l){let c=h=>(h=String(h??""),/^[=+\-@\t\r]/.test(h)&&(h="'"+h),'"'+h.replace(/"/g,'""')+'"'),u=[["Profil","Classe","Module","S\xE9ance","Activit\xE9","Titre","Premier essai","Meilleur essai","Nombre d\u2019essais"].map(c).join(";")];for(let h of t.profiles)for(let g of l){let m=(t.progressByProfile[h.id]||{})[g.id];!m||!m.attempts.length||u.push([h.displayName,h.className,g.moduleId,g.sessionId,g.id,g.title,String(m.attempts[0].score).replace(".",","),String(Math.max(...m.attempts.map(x=>x.score))).replace(".",","),m.attempts.length].map(c).join(";"))}return"\uFEFF"+u.join(`\r
`)}};return o}var wn=(i,e,t,n,s={})=>({mech:i,title:e,objective:t,data:n,...s}),ht=(i,e,t,n)=>wn("match",i,e,{pairs:t},n),Dt=(i,e,t,n,s)=>wn("sort",i,e,{cats:t,items:n},s),sn=(i,e,t,n={})=>wn("order",i,e,{steps:t,eq:n.eq,explain:n.explain},n),Rt=(i,e,t,n)=>wn("fill",i,e,{lines:t},n),It=(i,e,t,n)=>wn("quiz",i,e,{qs:t},n),Gt=(i,e,t,n,s={})=>wn("hot",i,e,{scene:t,prompts:n,lines:s.lines},s),Ah=(i,e,t,n,s)=>wn("asm",i,e,{parts:t,slots:n},s),Ch=(i,e,t,n,s)=>wn("net",i,e,{devices:t,links:n},s),Rh=(i,e,t,n)=>wn("robot",i,e,{levels:t},n),ps=(i,e,t,n,s)=>wn("prog:"+t,i,e,{mode:t,tasks:n},s),Ut=(i,e,t,n,s,r)=>wn("sim:"+t,i,e,{view:t,cfg:n,tasks:s},r),Ih={match:"Clique sur un \xE9l\xE9ment de la colonne de gauche, puis sur la r\xE9ponse qui lui correspond \xE0 droite. Pour changer, recommence avec le m\xEAme \xE9l\xE9ment.",sort:"Clique sur une carte, puis sur la cat\xE9gorie o\xF9 la ranger (tu peux aussi la faire glisser). Clique sur une carte rang\xE9e pour la reprendre.",order:"Remets les \xE9l\xE9ments dans le bon ordre avec les boutons \u25B2 et \u25BC, puis clique sur \xAB V\xE9rifier \xBB.",fill:"Dans chaque phrase, choisis dans la liste le mot ou l\u2019expression qui convient.",quiz:"Lis chaque question et choisis une seule r\xE9ponse.",hot:"Choisis une consigne dans la liste, puis clique sur la zone correspondante de l\u2019image (ou choisis-la dans la liste de zones).",asm:"Choisis un composant, puis clique sur l\u2019emplacement qui lui correspond dans le bo\xEEtier.",net:"Relie les \xE9quipements deux par deux en cliquant dessus. Ne branche que les c\xE2bles n\xE9cessaires.",robot:"Programme le robot niveau par niveau : ajoute des commandes, ex\xE9cute, corrige. Clique sur \xAB V\xE9rifier \xBB quand tu as fini.",prog:"R\xE9ponds en suivant l\u2019algorithme pas \xE0 pas, comme le ferait l\u2019ordinateur.",sim:"Fais l\u2019action demand\xE9e dans la simulation, puis clique sur \xAB Valider l\u2019\xE9tape \xBB. Rien de r\xE9el n\u2019est modifi\xE9 sur ton ordinateur."},Ph={match:"Commence par les associations dont tu es s\xFBr(e), les autres deviennent plus faciles.",sort:"Demande-toi ce que fait chaque \xE9l\xE9ment : il re\xE7oit, transforme, affiche ou conserve ?",order:"Rep\xE8re d\u2019abord la premi\xE8re et la derni\xE8re \xE9tape.",fill:"Relis la phrase \xE0 voix basse avec chaque proposition.",quiz:"\xC9limine d\u2019abord les r\xE9ponses qui n\u2019ont aucun rapport avec la question.",hot:"Regarde la forme, la position et le texte de chaque zone avant de cliquer.",asm:"Les indices d\xE9crivent la forme et la place de chaque emplacement.",net:"Chaque poste doit \xEAtre reli\xE9 au commutateur, pas directement aux autres.",robot:"Dessine le chemin sur une feuille puis traduis-le en commandes.",prog:"Note la valeur de chaque variable apr\xE8s chaque ligne.",sim:"Relis l\u2019\xE9tape : elle d\xE9crit exactement l\u2019\xE9tat attendu \xE0 la fin."};var Lh={id:1,title:"G\xE9n\xE9ralit\xE9s sur les syst\xE8mes informatiques",short:"Syst\xE8mes informatiques",icon:"\u{1F5A5}\uFE0F",color:"m1",sessions:[{title:"D\xE9finitions et vocabulaire de base",topics:["information","traitement","informatique","syst\xE8me informatique"],acts:[ht("Associe les d\xE9finitions","Associer chaque notion de base \xE0 sa d\xE9finition.",[["Information","\xC9l\xE9ment de connaissance (texte, nombre, image, son) que l\u2019on peut repr\xE9senter, conserver ou communiquer."],["Traitement","Op\xE9ration appliqu\xE9e \xE0 des informations pour obtenir un r\xE9sultat (calculer, trier, classer\u2026)."],["Informatique","Science du traitement automatique de l\u2019information par des ordinateurs."],["Syst\xE8me informatique","Ensemble form\xE9 du mat\xE9riel (ordinateur, p\xE9riph\xE9riques) et des logiciels qui traitent l\u2019information."],["Donn\xE9e","Information brute, avant tout traitement, comme la note 14 ou le mot \xAB Rabat \xBB."]]),Dt("Information ou traitement ?","Distinguer une information d\u2019une op\xE9ration de traitement.",["Information","Traitement"],[["25 \xB0C",0,"C\u2019est une donn\xE9e mesur\xE9e."],["La note 15/20",0,"C\u2019est une donn\xE9e."],["Le pr\xE9nom \xAB Salma \xBB",0,"C\u2019est une donn\xE9e de type texte."],["La ville de F\xE8s",0,"C\u2019est une donn\xE9e."],["Une photo de classe",0,"C\u2019est une information sous forme d\u2019image."],["Calculer une moyenne",1,"On transforme des donn\xE9es en r\xE9sultat."],["Trier des noms par ordre alphab\xE9tique",1,"Trier est une op\xE9ration."],["Convertir des dirhams en euros",1,"Op\xE9ration de calcul."],["Corriger les fautes d\u2019un texte",1,"Op\xE9ration de modification."],["Rechercher un mot dans un document",1,"Op\xE9ration sur l\u2019information."]]),Rt("Compl\xE9ter le sch\xE9ma Entr\xE9e \u2192 Traitement \u2192 Sortie","Placer les trois \xE9tapes du fonctionnement d\u2019un syst\xE8me informatique.",[["Les informations de d\xE9part (deux nombres tap\xE9s au clavier) constituent l\u2019[[entr\xE9e|sortie|traitement]].","Ce qui est fourni au syst\xE8me au d\xE9part s\u2019appelle l\u2019entr\xE9e."],["Additionner ces deux nombres est une op\xE9ration de [[traitement|entr\xE9e|sortie]].","Le calcul transforme les donn\xE9es."],["Le r\xE9sultat affich\xE9 \xE0 l\u2019\xE9cran est la [[sortie|entr\xE9e|donn\xE9e brute]].","Ce que le syst\xE8me restitue est la sortie."],["Dans l\u2019ordre logique, c\u2019est le [[traitement|r\xE9sultat|clavier]] qui transforme l\u2019information d\u2019entr\xE9e en information de sortie.","Le traitement est l\u2019\xE9tape interm\xE9diaire."],["Un correcteur re\xE7oit un texte (entr\xE9e), le corrige (traitement) et affiche un texte [[corrig\xE9|inchang\xE9|supprim\xE9]] (sortie).","La sortie est le r\xE9sultat du traitement."]]),It("Mission : le bulletin scolaire","Identifier entr\xE9e, traitement et sortie dans la production d\u2019un bulletin.",[["Pour calculer la moyenne de Sara, quelles sont les informations d\u2019entr\xE9e ?",["Ses notes dans chaque mati\xE8re et les coefficients","La moyenne finale","Le bulletin imprim\xE9","Le nom de l\u2019\xE9cole seulement"],"Les notes sont les donn\xE9es de d\xE9part."],["Quelle op\xE9ration constitue le traitement ?",["Multiplier chaque note par son coefficient, additionner, puis diviser par la somme des coefficients","\xC9crire le nom de l\u2019\xE9l\xE8ve","Imprimer la feuille","Brancher l\u2019imprimante"],"Le traitement transforme les notes en moyenne."],["Que repr\xE9sente la moyenne affich\xE9e sur le bulletin ?",["Une information de sortie, r\xE9sultat du traitement","Une information d\u2019entr\xE9e","Un logiciel","Un p\xE9riph\xE9rique"],"Elle est produite par le traitement."],["Le professeur corrige une note. Que faut-il refaire ?",["Relancer le traitement avec la note corrig\xE9e pour obtenir une nouvelle moyenne","Rien, la moyenne se corrige seule","Changer d\u2019ordinateur","Supprimer tous les bulletins"],"Une entr\xE9e modifi\xE9e impose un nouveau traitement."],["Le bulletin complet est produit par :",["Un syst\xE8me informatique (mat\xE9riel + logiciels + donn\xE9es)","Le seul clavier","La seule imprimante","Uniquement l\u2019\xE9cran"],"Plusieurs \xE9l\xE9ments travaillent ensemble."]])]},{title:"Sch\xE9ma fonctionnel d\u2019un ordinateur",topics:["entr\xE9e","traitement","sortie","stockage"],acts:[Dt("Construis le sch\xE9ma","Placer chaque \xE9l\xE9ment dans le bloc fonctionnel qui lui correspond.",["Entr\xE9e","Traitement","Sortie","Stockage"],[["Clavier",0,"Il envoie des informations \xE0 l\u2019ordinateur."],["Souris",0,"Elle envoie des positions et des clics."],["Scanner",0,"Il fait entrer une image dans l\u2019ordinateur."],["Processeur (CPU)",1,"Il ex\xE9cute les calculs."],["M\xE9moire vive (RAM)",1,"Elle contient ce que le processeur utilise en ce moment."],["\xC9cran",2,"Il affiche le r\xE9sultat."],["Haut-parleurs",2,"Ils restituent le son."],["Imprimante",2,"Elle produit le r\xE9sultat sur papier."],["Disque dur / SSD",3,"Il conserve les fichiers durablement."],["Cl\xE9 USB",3,"Elle conserve des fichiers et se transporte."]]),ht("Relie les p\xE9riph\xE9riques","Associer chaque p\xE9riph\xE9rique \xE0 son r\xF4le.",[["Clavier","Saisir du texte et des commandes"],["Souris","Pointer et s\xE9lectionner \xE0 l\u2019\xE9cran"],["\xC9cran","Afficher le r\xE9sultat sous forme visuelle"],["Imprimante","Produire le r\xE9sultat sur papier"],["Disque dur","Conserver durablement les fichiers"]]),sn("Le parcours de l\u2019information","Ordonner les \xE9tapes entre la frappe d\u2019une touche et l\u2019affichage.",["Tu tapes la touche A sur le clavier.","Le clavier envoie le signal \xE0 l\u2019unit\xE9 centrale.","Le processeur traite l\u2019information avec la m\xE9moire.","Le syst\xE8me pr\xE9pare l\u2019image de la lettre.","La lettre A s\u2019affiche sur l\u2019\xE9cran."],{explain:"Le chemin suit toujours entr\xE9e \u2192 traitement \u2192 sortie."}),Ut("Mission ordinateur","Simuler la saisie de deux nombres, leur addition, l\u2019affichage et l\u2019enregistrement.","calc",{},[["Saisis le nombre 12 dans la premi\xE8re case (entr\xE9e).",{a:12},"La saisie est l\u2019\xE9tape d\u2019entr\xE9e."],["Saisis le nombre 30 dans la deuxi\xE8me case.",{b:30},"Les deux donn\xE9es sont pr\xEAtes."],["Lance le traitement : clique sur \xAB Additionner \xBB.",{calc:!0},"Le processeur calcule 12 + 30."],["Fais afficher le r\xE9sultat sur l\u2019\xE9cran (sortie).",{shown:!0},"On ne peut afficher qu\u2019un r\xE9sultat d\xE9j\xE0 calcul\xE9."],["Conserve le r\xE9sultat dans le stockage.",{saved:!0},"Le stockage garde le r\xE9sultat apr\xE8s l\u2019extinction."]])]},{title:"P\xE9riph\xE9riques et unit\xE9 centrale",topics:["processeur","m\xE9moire vive","stockage","carte m\xE8re","p\xE9riph\xE9riques"],acts:[Gt("Reconnais les composants","Identifier les composants principaux sur un sch\xE9ma de l\u2019int\xE9rieur du bo\xEEtier.","pc",[["ram","Clique sur la m\xE9moire vive (RAM).","La RAM est form\xE9e de barrettes longues enfich\xE9es dans des fentes."],["cpu","Clique sur le processeur (CPU).","Le processeur est le cerveau qui ex\xE9cute les instructions."],["mobo","Clique sur la carte m\xE8re.","Elle relie tous les composants."],["ssd","Clique sur l\u2019unit\xE9 de stockage SSD.","Elle conserve les fichiers m\xEAme \xE9teinte."],["psu","Clique sur l\u2019alimentation.","Elle transforme le courant de la prise pour les composants."]]),Dt("Classe les p\xE9riph\xE9riques","Classer des p\xE9riph\xE9riques selon leur r\xF4le (entr\xE9e, sortie, les deux, stockage).",["Entr\xE9e","Sortie","Entr\xE9e et sortie","Stockage"],[["Souris",0,"Elle envoie des informations seulement."],["Microphone",0,"Il capte le son."],["Scanner",0,"Il num\xE9rise un document."],["Vid\xE9oprojecteur",1,"Il projette l\u2019image."],["Haut-parleurs",1,"Ils restituent le son."],["\xC9cran tactile",2,"Il affiche et re\xE7oit les touches."],["Casque avec micro",2,"Il \xE9coute et capte la voix."],["Imprimante multifonction",2,"Elle imprime (sortie) et num\xE9rise (entr\xE9e)."],["Cl\xE9 USB",3,"Elle conserve des fichiers."],["Disque dur externe",3,"Il conserve de grands volumes de donn\xE9es."]]),Ah("Assemble l\u2019ordinateur","Placer les composants au bon endroit dans le bo\xEEtier.",[{name:"Carte m\xE8re",icon:"\u{1F7E9}"},{name:"Processeur (CPU)",icon:"\u{1F532}"},{name:"M\xE9moire vive (RAM)",icon:"\u{1F4CF}"},{name:"Disque SSD",icon:"\u{1F4BE}"},{name:"Ventilateur",icon:"\u{1F300}"},{name:"Alimentation",icon:"\u{1F50C}"}],[{x:3,y:4,w:62,h:92,hint:"Grande plaque fix\xE9e au fond du bo\xEEtier, elle relie tous les composants",part:0,why:"la carte m\xE8re se fixe au fond du bo\xEEtier et re\xE7oit tous les autres composants."},{x:20,y:40,w:17,h:24,hint:"Support carr\xE9 au centre de la plaque",part:1,why:"le processeur se place dans le support (socket) de la carte m\xE8re."},{x:44,y:12,w:15,h:64,hint:"Fentes longues et fines \xE0 c\xF4t\xE9 du processeur",part:2,why:"les barrettes de RAM s\u2019enfichent dans les fentes de la carte m\xE8re."},{x:72,y:8,w:25,h:18,hint:"Baie de stockage au bord, reli\xE9e par un c\xE2ble de donn\xE9es",part:3,why:"le SSD se fixe dans une baie et se relie \xE0 la carte m\xE8re par c\xE2ble ; il ne se confond pas avec la RAM."},{x:18,y:10,w:22,h:24,hint:"Se pose au\u2011dessus du processeur pour \xE9vacuer la chaleur",part:4,why:"le ventilateur refroidit le processeur, qui chauffe beaucoup."},{x:72,y:64,w:25,h:30,hint:"Bloc en bas du bo\xEEtier qui re\xE7oit le courant de la prise",part:5,why:"l\u2019alimentation fournit le courant \xE0 tous les composants."}]),It("Mission d\xE9pannage","Choisir le mat\xE9riel adapt\xE9 \xE0 une situation et expliquer pourquoi.",[["L\u2019ordinateur est tr\xE8s lent quand on ouvre plusieurs programmes lourds. Quel composant ajouter en priorit\xE9 ?",["De la m\xE9moire vive (RAM)","Un second clavier","Un \xE9cran plus grand","Une imprimante"],"La RAM contient les programmes en cours d\u2019utilisation : plus elle est grande, plus l\u2019ordinateur respire."],["Le disque est plein : impossible d\u2019enregistrer de nouveaux fichiers. Que faire ?",["Lib\xE9rer de l\u2019espace ou ajouter un disque de stockage","Ajouter une souris","Changer le ventilateur","Brancher des haut-parleurs"],"Le stockage conserve les fichiers ; il manque de la place."],["Un \xE9l\xE8ve veut \xE9couter une vid\xE9o mais n\u2019entend rien. Quel p\xE9riph\xE9rique manque ?",["Des haut-parleurs ou un casque","Un scanner","Un microphone","Une imprimante"],"Le son est une sortie."],["L\u2019ordinateur chauffe beaucoup et ralentit. Quel \xE9l\xE9ment v\xE9rifier ?",["Le ventilateur de refroidissement (poussi\xE8re, panne)","Le clavier","La souris","Le fond d\u2019\xE9cran"],"Un mauvais refroidissement fait chauffer le processeur."],["Le professeur veut projeter la le\xE7on au tableau. Quel p\xE9riph\xE9rique de sortie choisir ?",["Un vid\xE9oprojecteur","Un scanner","Un microphone","Une webcam"],"Projeter une image est une sortie."]])]},{title:"Types de logiciels et domaines d\u2019application",topics:["logiciel de base","logiciel d\u2019application","domaines d\u2019utilisation"],acts:[ht("Associe les logiciels","Associer des logiciels courants \xE0 leur fonction.",[["Windows","Syst\xE8me d\u2019exploitation de nombreux PC : il g\xE8re le mat\xE9riel et lance les programmes"],["Android","Syst\xE8me d\u2019exploitation des t\xE9l\xE9phones et tablettes"],["Writer","Application pour r\xE9diger des documents"],["Calc","Application pour faire des calculs dans un tableau"],["Navigateur web","Application pour consulter des pages sur Internet"]]),Dt("Classe les logiciels","Distinguer logiciels de base et logiciels d\u2019application.",["Logiciel de base","Logiciel d\u2019application"],[["Windows",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["Linux",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["Android",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["macOS",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["iOS",0,"C\u2019est un syst\xE8me d\u2019exploitation."],["Writer",1,"Application de r\xE9daction."],["Calc",1,"Application de calcul."],["Navigateur web",1,"Application de navigation."],["Lecteur de musique",1,"Application multim\xE9dia."],["Logiciel de dessin",1,"Application graphique."]]),It("Trouve le bon outil","Choisir le logiciel adapt\xE9 \xE0 un besoin.",[["Tu dois \xE9crire une lettre \xE0 la directrice. Quel outil choisis\u2011tu ?",["Un traitement de texte","Un tableur","Un navigateur","Un lecteur de musique"],"Le traitement de texte sert \xE0 r\xE9diger."],["Tu veux calculer les moyennes de la classe. Quel outil ?",["Un tableur","Un traitement de texte","Un logiciel de dessin","Un lecteur vid\xE9o"],"Le tableur calcule avec des formules."],["Tu veux chercher des informations sur Internet. Quel outil ?",["Un navigateur web","Un tableur","Un traitement de texte","Un antivirus"],"Le navigateur affiche les pages web."],["Tu veux cr\xE9er une affiche illustr\xE9e. Quel outil ?",["Un logiciel de dessin ou de mise en page","Un tableur","Un syst\xE8me d\u2019exploitation","Un navigateur"],"On dessine et on dispose images et texte."],["Tu dois pr\xE9senter un expos\xE9 avec des diapositives. Quel outil ?",["Un logiciel de pr\xE9sentation","Un antivirus","Un tableur","Un lecteur audio"],"Il sert \xE0 projeter des diapositives."]]),Rt("Mission \xE9cole num\xE9rique","\xC9quiper une salle informatique avec les logiciels adapt\xE9s et justifier.",[["Pour que les ordinateurs fonctionnent, chaque poste doit d\u2019abord avoir un [[syst\xE8me d\u2019exploitation|tableur|navigateur]].","Sans lui, aucun autre logiciel ne peut tourner."],["Les \xE9l\xE8ves r\xE9digent leurs comptes rendus avec un [[traitement de texte|lecteur audio|antivirus]].","Il sert \xE0 \xE9crire et \xE0 mettre en forme."],["Le professeur de math\xE9matiques calcule les moyennes avec un [[tableur|navigateur|logiciel de dessin]].","Le tableur fait les calculs automatiquement."],["Pour faire des recherches sur Internet, on installe un [[navigateur web|traitement de texte|tableur]].","Il affiche les pages web."],["Pour cr\xE9er l\u2019affiche de la f\xEAte de l\u2019\xE9cole, on utilise un [[logiciel de dessin ou de mise en page|tableur|syst\xE8me d\u2019exploitation]].","Il permet d\u2019assembler image et texte."]])]}]};var Dh=i=>i.text.trim().split(`
`),Uh={id:2,title:"Les logiciels",short:"Les logiciels",icon:"\u{1F5C2}\uFE0F",color:"m2",groups:[{label:"Syst\xE8me d\u2019exploitation (6 h)",sessions:[1,2,3]},{label:"Traitement de texte (10 h)",sessions:[4,5,6,7,8]},{label:"Tableur (6 h)",sessions:[9,10,11]}],sessions:[{title:"Fonctionnalit\xE9s de base d\u2019un syst\xE8me d\u2019exploitation",topics:["gestion des programmes","des fichiers","des p\xE9riph\xE9riques","interface"],acts:[ht("Associe fonctions et d\xE9finitions","Relier chaque fonction d\u2019un syst\xE8me d\u2019exploitation \xE0 son r\xF4le.",[["Gestion des programmes","Lancer, arr\xEAter et r\xE9partir le temps du processeur entre les applications"],["Gestion de la m\xE9moire","Attribuer la m\xE9moire vive aux programmes en cours"],["Gestion des fichiers","Organiser, nommer, ranger et retrouver les donn\xE9es sur le stockage"],["Gestion des p\xE9riph\xE9riques","Dialoguer avec le clavier, la souris ou l\u2019imprimante gr\xE2ce aux pilotes"],["Interface utilisateur","Permettre \xE0 l\u2019utilisateur de dialoguer avec l\u2019ordinateur (bureau, fen\xEAtres, ic\xF4nes)"]]),It("Identifie les syst\xE8mes d\u2019exploitation","Reconna\xEEtre des exemples de syst\xE8mes d\u2019exploitation.",[["Lequel de ces logiciels est un syst\xE8me d\u2019exploitation ?",["Windows","Writer","Calc","Un navigateur web"],"Windows g\xE8re le mat\xE9riel et lance les autres logiciels."],["Quel syst\xE8me \xE9quipe la plupart des smartphones de la classe (hors iPhone) ?",["Android","Writer","Calc","Un tableur"],"Android est un syst\xE8me d\u2019exploitation pour t\xE9l\xE9phones et tablettes."],["Linux est :",["Un syst\xE8me d\u2019exploitation libre","Un traitement de texte","Un navigateur","Un type de cl\xE9 USB"],"Linux existe en de nombreuses versions gratuites."],["macOS est le syst\xE8me d\u2019exploitation :",["Des ordinateurs de la marque Apple","De toutes les imprimantes","Des cl\xE9s USB","Des routeurs uniquement"],"Chaque famille de machines a ses syst\xE8mes."],["Un syst\xE8me d\u2019exploitation s\u2019installe :",["Avant les logiciels d\u2019application, car ils en ont besoin pour fonctionner","Apr\xE8s chaque document cr\xE9\xE9","Uniquement dans l\u2019imprimante","Dans la souris"],"Il est la base sur laquelle tournent les applications."]]),Dt("Classe les responsabilit\xE9s","S\xE9parer ce que fait le syst\xE8me d\u2019exploitation et ce que fait une application.",["R\xF4le du syst\xE8me d\u2019exploitation","R\xF4le d\u2019une application"],[["G\xE9rer la m\xE9moire vive",0,"Il r\xE9partit la m\xE9moire entre les programmes."],["Lancer et arr\xEAter les programmes",0,"C\u2019est sa mission de base."],["G\xE9rer les fichiers et dossiers",0,"Il organise le stockage."],["Piloter l\u2019imprimante gr\xE2ce \xE0 son pilote",0,"Il fait le lien avec le mat\xE9riel."],["G\xE9rer les comptes des utilisateurs",0,"Il contr\xF4le les acc\xE8s."],["R\xE9diger une lettre",1,"T\xE2che d\u2019un traitement de texte."],["Calculer une moyenne",1,"T\xE2che d\u2019un tableur."],["Naviguer sur un site web",1,"T\xE2che d\u2019un navigateur."],["Dessiner un logo",1,"T\xE2che d\u2019un logiciel de dessin."],["Lire une vid\xE9o",1,"T\xE2che d\u2019un lecteur multim\xE9dia."]]),Rt("Mission OS","Choisir les bonnes actions pour lancer des applications, g\xE9rer des fichiers et du mat\xE9riel.",[["Pour ouvrir un programme, on double\u2011clique sur son [[ic\xF4ne|pilote|extension]] ; le syst\xE8me d\u2019exploitation le charge en m\xE9moire.","L\u2019ic\xF4ne est le point d\u2019entr\xE9e du programme."],["Quand on branche une cl\xE9 USB, le syst\xE8me la reconna\xEEt gr\xE2ce \xE0 un [[pilote|traitement de texte|fond d\u2019\xE9cran]].","Le pilote fait dialoguer syst\xE8me et mat\xE9riel."],["Pour retrouver un document, on passe par le [[gestionnaire de fichiers|tableur|navigateur]] du syst\xE8me.","Il montre dossiers et fichiers."],["Si deux programmes tournent ensemble, le syst\xE8me leur r\xE9partit la [[m\xE9moire et le temps du processeur|couleur du bureau|batterie de la souris]].","C\u2019est la gestion des programmes et de la m\xE9moire."],["Pour \xE9teindre proprement l\u2019ordinateur, on utilise la commande [[Arr\xEAter|Supprimer|Copier]] du menu D\xE9marrer.","Arr\xEAter ferme les programmes en s\xE9curit\xE9."]])]},{title:"Environnement d\u2019un syst\xE8me d\u2019exploitation",topics:["bureau","barre des t\xE2ches","menu D\xE9marrer","fen\xEAtres"],acts:[Gt("Explore le bureau","Rep\xE9rer les \xE9l\xE9ments de l\u2019environnement de travail.","desktop",[["start","Clique sur le bouton qui ouvre le menu D\xE9marrer.","Il se trouve \xE0 gauche de la barre du bas."],["taskbar","Clique sur la barre des t\xE2ches.","Elle montre les programmes ouverts."],["bin","Clique sur la corbeille.","Elle garde les fichiers supprim\xE9s."],["win","Clique sur une fen\xEAtre.","Une fen\xEAtre affiche le contenu d\u2019un programme."],["tray","Clique sur la zone de notification (heure).","Elle affiche l\u2019heure et l\u2019\xE9tat du syst\xE8me."]]),ht("Associe ic\xF4nes et r\xF4les","Relier chaque \xE9l\xE9ment \xE0 son r\xF4le.",[["\u{1F5D1}\uFE0F Corbeille","Contient les fichiers supprim\xE9s, qui peuvent \xEAtre restaur\xE9s"],["\u{1F4C1} Dossier","Regroupe des fichiers et d\u2019autres dossiers"],["\u{1F4C4} Fichier","Contient des donn\xE9es : texte, image, son\u2026"],["\u{1F517} Raccourci","Ouvre rapidement un programme ou un fichier situ\xE9 ailleurs"],["\u229E D\xE9marrer","Ouvre la liste des programmes et les commandes du syst\xE8me"]]),Ut("Manipule la fen\xEAtre","R\xE9duire, agrandir, restaurer et fermer une fen\xEAtre.","window",{init:{state:"normal"}},[["R\xE9duis la fen\xEAtre dans la barre des t\xE2ches.",{state:"min"},"R\xE9duire cache la fen\xEAtre mais le programme reste actif."],["Rouvre la fen\xEAtre depuis la barre des t\xE2ches.",{state:"normal"},"Un clic sur son bouton la fait r\xE9appara\xEEtre."],["Agrandis la fen\xEAtre pour occuper tout l\u2019\xE9cran.",{state:"max"},"Agrandir utilise tout l\u2019\xE9cran."],["Restaure la fen\xEAtre \xE0 sa taille pr\xE9c\xE9dente.",{state:"normal"},"Restaurer ram\xE8ne la taille habituelle."],["Ferme la fen\xEAtre.",{state:"closed"},"Fermer arr\xEAte le programme."]]),It("Mission Bureau","Choisir la bonne action sur le bureau dans une situation concr\xE8te.",[["Tu veux lancer un programme qui n\u2019est pas sur le bureau. O\xF9 cliques\u2011tu ?",["Sur le bouton D\xE9marrer","Sur la corbeille","Sur l\u2019horloge","Sur le bureau vide"],"Le menu D\xE9marrer liste les programmes install\xE9s."],["Tu as trop de fen\xEAtres ouvertes. Comment passer de l\u2019une \xE0 l\u2019autre ?",["En cliquant sur leurs boutons dans la barre des t\xE2ches","En vidant la corbeille","En changeant le fond d\u2019\xE9cran","En \xE9teignant l\u2019ordinateur"],"La barre des t\xE2ches liste les fen\xEAtres ouvertes."],["Tu as supprim\xE9 un fichier par erreur (il est dans la corbeille). Que faire ?",["Ouvrir la corbeille et restaurer le fichier","Red\xE9marrer l\u2019ordinateur","R\xE9installer le syst\xE8me","Renommer le bureau"],"La corbeille permet de restaurer."],["Comment conna\xEEtre l\u2019heure et l\u2019\xE9tat du r\xE9seau ?",["Regarder la zone de notification \xE0 droite de la barre des t\xE2ches","Ouvrir la corbeille","Agrandir une fen\xEAtre","Regarder le menu Fichier"],"La zone de notification donne ces informations."],["Tu veux un acc\xE8s rapide \xE0 un document souvent utilis\xE9. Quelle solution ?",["Cr\xE9er un raccourci sur le bureau","Supprimer le document","Imprimer le document","R\xE9duire la fen\xEAtre"],"Un raccourci \xE9vite de chercher le fichier."]])]},{title:"Gestion des fichiers et dossiers",topics:["fichier","dossier","extension","cr\xE9er, renommer, copier, d\xE9placer, supprimer"],acts:[It("Fichier, dossier ou raccourci ?","Identifier un fichier, un dossier et un raccourci.",[["Un fichier est :",["Un ensemble de donn\xE9es enregistr\xE9 sous un nom, par exemple devoir.docx","Un endroit qui contient seulement d\u2019autres \xE9l\xE9ments","Un c\xE2ble r\xE9seau","Un composant de la carte m\xE8re"],"Un fichier contient des donn\xE9es."],["Un dossier sert \xE0 :",["Regrouper et ranger des fichiers et d\u2019autres dossiers","Calculer des moyennes","Afficher une image \xE0 l\u2019\xE9cran","Imprimer sans papier"],"Les dossiers organisent le stockage."],["Un raccourci est :",["Un lien qui ouvre un \xE9l\xE9ment situ\xE9 ailleurs","Une copie compl\xE8te du fichier","Un virus","Un dossier vide"],"Il renvoie vers l\u2019original."],["Quelle ic\xF4ne repr\xE9sente un dossier ?",["\u{1F4C1}","\u{1F4C4}","\u{1F517}","\u{1F5BC}\uFE0F"],"Le dossier ressemble \xE0 une chemise."],["Si on supprime un raccourci, que devient le fichier d\u2019origine ?",["Il reste \xE0 son emplacement","Il est supprim\xE9 aussi","Il devient un dossier","Il change de nom"],"Seul le lien dispara\xEEt."]]),ht("Extensions et types de fichiers","Associer chaque extension au type de fichier.",[[".docx","Document de traitement de texte"],[".xlsx","Classeur de tableur"],[".jpg","Image (photo)"],[".mp3","Fichier audio"],[".mp4","Vid\xE9o"]]),Dt("Organise tes fichiers","Ranger des fichiers dans le bon dossier.",["Dossier Maths","Dossier Photos","Dossier Musique"],[["cours_geometrie.docx",0,"Un cours de g\xE9om\xE9trie va avec les math\xE9matiques."],["fractions.xlsx",0,"Des calculs de fractions : math\xE9matiques."],["theoreme_Pythagore.pdf",0,"Un th\xE9or\xE8me : math\xE9matiques."],["voyage_Marrakech.jpg",1,"Une photo de voyage."],["classe_2AC.png",1,"Une image de classe."],["portrait_Atlas.jpg",1,"Une photo."],["chanson_ecole.mp3",2,"Un fichier audio."],["concert.mp3",2,"Un fichier audio."],["rythme.wav",2,"Un fichier audio."],["hymne.mp3",2,"Un fichier audio."]]),Ut("Mission Explorateur","Cr\xE9er, renommer, copier, d\xE9placer, supprimer et restaurer dans un explorateur simul\xE9.","fs",{tree:{n:"Mes documents",k:[{n:"Cours",k:[{n:"maths.docx"}]},{n:"Photos",k:[{n:"plage.jpg"}]},{n:"notes.txt"},{n:"brouillon.txt"}]}},[["Cr\xE9e un nouveau dossier nomm\xE9 Sciences dans Mes documents (s\xE9lectionne le dossier racine, \xE9cris le nom, clique sur \xAB Nouveau dossier \xBB).",(i,e)=>!!e.find("Sciences")?.dir,"Un nouveau dossier se cr\xE9e l\xE0 o\xF9 l\u2019on est plac\xE9.",(i,e)=>e.mkdir("","Sciences")],["Renomme le fichier notes.txt en notes_2AC.txt.",(i,e)=>!!e.find("notes_2AC.txt")&&!e.find("notes.txt"),"Renommer change le nom sans changer le contenu.",(i,e)=>e.rename("notes.txt","notes_2AC.txt")],["Copie plage.jpg dans le dossier Sciences : l\u2019original doit rester dans Photos.",(i,e)=>!!e.find("Sciences/plage.jpg")&&!!e.find("Photos/plage.jpg"),"Copier cr\xE9e un double ; l\u2019original reste en place.",(i,e)=>e.copy("Photos/plage.jpg","Sciences")],["D\xE9place maths.docx du dossier Cours vers Sciences (couper puis coller).",(i,e)=>!!e.find("Sciences/maths.docx")&&!e.find("Cours/maths.docx"),"D\xE9placer retire le fichier de son ancien dossier.",(i,e)=>e.move("Cours/maths.docx","Sciences")],["Supprime brouillon.txt : il doit se retrouver dans la corbeille.",(i,e)=>e.inBin("brouillon.txt")&&!e.find("brouillon.txt"),"Un fichier supprim\xE9 va d\u2019abord dans la corbeille.",(i,e)=>e.remove("brouillon.txt")],["Restaure brouillon.txt depuis la corbeille.",(i,e)=>!!e.find("brouillon.txt")&&!e.inBin("brouillon.txt"),"Restaurer remet le fichier dans son dossier d\u2019origine.",(i,e)=>e.restore("brouillon.txt")]])]},{title:"Traitement de texte : fonctionnalit\xE9s et environnement",topics:["fonctions d\u2019un traitement de texte","ruban","espace de travail"],acts:[Gt("D\xE9couvre la fen\xEAtre","Identifier les zones de l\u2019environnement d\u2019un traitement de texte.","word",[["ribbon","Clique sur le ruban qui regroupe les outils.","Le ruban contient les boutons de commande."],["tabs","Clique sur la zone des onglets.","Chaque onglet regroupe des commandes d\u2019un m\xEAme domaine."],["page","Clique sur la feuille o\xF9 l\u2019on tape le texte.","C\u2019est la zone d\u2019\xE9dition du document."],["status","Clique sur la barre d\u2019\xE9tat.","Elle indique la page et le nombre de mots."],["title","Clique sur la barre de titre.","Elle affiche le nom du document."]]),ht("Commandes et ic\xF4nes","Associer chaque ic\xF4ne \xE0 sa commande.",[["\u{1F4BE}","Enregistrer le document"],["\u21A9","Annuler la derni\xE8re action"],["\u{1F5A8}","Imprimer le document"],["\u{1F4C2}","Ouvrir un document existant"],["\u{1F50D}","Rechercher un mot dans le texte"]]),Dt("\xC9dition, mise en forme ou insertion ?","Classer des commandes selon leur famille.",["\xC9dition","Mise en forme","Insertion"],[["Copier",0,"Copier modifie le contenu."],["Couper",0,"Couper retire du texte."],["Coller",0,"Coller ajoute du texte copi\xE9."],["Gras",1,"Change l\u2019aspect des lettres."],["Centrer",1,"Change la position du texte."],["Soulign\xE9",1,"Change l\u2019aspect des lettres."],["Image",2,"Ajoute un objet."],["Tableau",2,"Ajoute un objet."],["Forme",2,"Ajoute un objet."],["Num\xE9ro de page",2,"Ajoute un \xE9l\xE9ment dans la page."]]),Ut("Mission Word","Cr\xE9er, nommer et enregistrer un document virtuel.","office",{show:["type","save"]},[["Clique dans la page et tape le mot \xAB Bonjour \xBB.",{text:"~bonjour"},"La saisie cr\xE9e le contenu."],["\xC9cris le nom \xAB exposeMaroc \xBB dans la case du nom de fichier.",{name:"=exposeMaroc"},"Un nom clair permet de retrouver le document."],["Choisis le dossier \xAB Mes documents \xBB.",{folder:"Mes documents"},"Le dossier d\xE9termine o\xF9 le fichier sera rang\xE9."],["Clique sur Enregistrer.",{saved:!0},"Tant qu\u2019on n\u2019enregistre pas, le travail n\u2019est pas conserv\xE9 (l\u2019\xE9toile * le rappelle)."],["Ajoute le mot \xAB Maroc \xBB dans le texte, puis enregistre de nouveau.",i=>at(i.text).includes("maroc")&&i.saved,"Apr\xE8s une modification, il faut r\xE9enregistrer.",i=>{i.text="Bonjour Maroc",i.saved=!0}]])]},{title:"Saisie et \xE9dition",topics:["saisie au clavier","correction","s\xE9lectionner, copier, couper, coller"],acts:[It("Le clavier en situation","Conna\xEEtre le r\xF4le des touches principales.",[["Quelle touche efface le caract\xE8re \xE0 gauche du curseur ?",["Retour arri\xE8re (\u232B)","Suppr","Entr\xE9e","Tabulation"],"Retour arri\xE8re efface vers la gauche."],["Quelle touche donne une lettre majuscule quand on la maintient avec une lettre ?",["Maj (Shift)","Ctrl","Alt","\xC9chap"],"Maj sert aux majuscules."],["Pour passer \xE0 la ligne et cr\xE9er un nouveau paragraphe, on appuie sur :",["Entr\xE9e","Espace","Suppr","\xC9chap"],"Entr\xE9e valide la ligne."],["Quelle touche efface le caract\xE8re \xE0 droite du curseur ?",["Suppr","Retour arri\xE8re","Entr\xE9e","Maj"],"Suppr efface vers la droite."],["Pour s\xE9parer deux mots, on utilise :",["La barre d\u2019espace","Verr. Maj","Ctrl","Alt"],"L\u2019espace s\xE9pare les mots."]]),Rt("Corrige le texte tap\xE9 trop vite","Rep\xE9rer et corriger des fautes de frappe et d\u2019orthographe.",[["Le professeur [[explique|esplique|expliquer]] la le\xE7on aux \xE9l\xE8ves.","Verbe expliquer conjugu\xE9."],["Les \xE9l\xE8ves [[sont|son|sons]] dans la salle informatique.","Verbe \xEAtre : \xAB sont \xBB."],["Nous [[utilisons|utilisont|utilisions]] un ordinateur pour \xE9crire.","Pr\xE9sent : \xAB nous utilisons \xBB."],["Il faut [[enregistrer|enregistr\xE9|enregistrait]] le document avant de fermer.","Apr\xE8s \xAB il faut \xBB, on met l\u2019infinitif."],["Ce texte contient des [[fautes|fautent|faute]] \xE0 corriger.","Le nom au pluriel s\u2019\xE9crit \xAB fautes \xBB."]]),sn("Copier\u2011coller un mot","Ordonner les \xE9tapes pour copier un mot \xE0 un autre endroit.",["S\xE9lectionner le mot \xE0 copier.","Cliquer sur Copier (Ctrl + C).","Placer le curseur \xE0 l\u2019endroit voulu.","Cliquer sur Coller (Ctrl + V).","V\xE9rifier que le mot appara\xEEt \xE0 la nouvelle place."],{explain:"On s\xE9lectionne, on copie, on se place, on colle, puis on v\xE9rifie."}),Ut("Mission Secr\xE9taire","R\xE9diger un avis scolaire court.","office",{show:["type"]},[["\xC9cris le titre \xAB AVIS \xBB en majuscules.",i=>i.text.trim().startsWith("AVIS"),"Les majuscules s\u2019obtiennent avec Maj.",i=>{i.text="AVIS"}],["Passe \xE0 la ligne (touche Entr\xE9e) et \xE9cris : R\xE9union des parents le lundi",i=>i.text.includes(`
`)&&at(i.text).replace(/\s+/g," ").includes("avis reunion des parents le lundi"),"Entr\xE9e cr\xE9e un nouveau paragraphe.",i=>{i.text=`AVIS
R\xE9union des parents le lundi`}],["Ajoute \xE0 la suite : \xAB \xE0 17 h \xBB.",i=>at(i.text).includes("lundi a 17 h"),"L\u2019heure pr\xE9cise l\u2019information.",i=>{i.text=`AVIS
R\xE9union des parents le lundi \xE0 17 h`}],["Corrige : remplace \xAB lundi \xBB par \xAB mardi \xBB.",i=>!at(i.text).includes("lundi")&&at(i.text).includes("mardi a 17 h"),"Corriger \xE9vite de diffuser une erreur.",i=>{i.text=`AVIS
R\xE9union des parents le mardi \xE0 17 h`}],["Termine par une signature sur une nouvelle ligne : La direction",i=>Dh(i).length>=3&&at(Dh(i).at(-1))==="la direction","La signature se place \xE0 la fin.",i=>{i.text=`AVIS
R\xE9union des parents le mardi \xE0 17 h
La direction`}]])]},{title:"Mise en forme",topics:["gras, italique, soulign\xE9","police, taille, couleur","alignement"],acts:[ht("Effets et boutons","Associer chaque commande de mise en forme \xE0 son effet visible.",[["Gras (G)","Rend le texte plus \xE9pais"],["Italique (I)","Incline le texte"],["Soulign\xE9 (S)","Trace une ligne sous le texte"],["Centrer","Place le texte au milieu de la ligne"],["Couleur de police","Change la couleur des lettres"]]),Gt("Rep\xE8re les outils","Identifier la taille, la couleur et l\u2019alignement sur la barre d\u2019outils.","toolbar",[["size","Clique sur la zone de la taille de police.","Elle contient un nombre."],["color","Clique sur le bouton de la couleur du texte.","Le A color\xE9 change la couleur."],["alignC","Clique sur le bouton qui centre le texte.","Les traits sont au milieu."],["alignR","Clique sur le bouton qui aligne \xE0 droite.","Les traits sont coll\xE9s \xE0 droite."],["font","Clique sur la zone du nom de la police.","Elle est large et \xE0 gauche."]]),It("R\xE9pare le paragraphe","Corriger une mise en forme maladroite.",[["Le titre est petit et coll\xE9 \xE0 gauche. Pour le rendre bien visible, que faire ?",["L\u2019agrandir et le centrer","Le souligner cinq fois","Le mettre en blanc sur fond blanc","Le supprimer"],"Taille et alignement renforcent le titre."],["Tout le texte est en gras : on ne distingue plus l\u2019important. Que faire ?",["Garder le gras pour les mots importants seulement","Mettre aussi tout en italique","Tout souligner","R\xE9duire la taille \xE0 4"],"Le gras n\u2019a de sens que s\u2019il est rare."],["Le texte est en jaune clair sur fond blanc, illisible. Que faire ?",["Choisir une couleur fonc\xE9e et contrast\xE9e","Augmenter la luminosit\xE9 de l\u2019\xE9cran","Le souligner","Le mettre en italique"],"Le contraste permet la lecture."],["La date est mal plac\xE9e. Pour l\u2019aligner \xE0 droite, on utilise :",["Le bouton Aligner \xE0 droite","Le bouton Souligner","Le bouton Italique","Le bouton Enregistrer"],"L\u2019alignement se r\xE8gle avec les boutons d\u2019alignement."],["Le paragraphe est \xE9crit en taille 4, trop petit. Que faire ?",["Le s\xE9lectionner puis augmenter la taille (par exemple 12)","L\u2019imprimer en plus grand sans le changer","Le mettre en italique","Le centrer"],"La taille se change apr\xE8s s\xE9lection."]]),Ut("Mission Designer","Reproduire une annonce en respectant des consignes de mise en forme.","office",{show:["fmt"]},[["S\xE9lectionne le titre et mets-le en gras.",{"title.b":!0},"Le gras renforce un titre."],["Centre le titre.",{"title.al":"centre"},"Un titre est souvent centr\xE9."],["Mets le titre en taille 24.",{"title.sz":24},"Un titre est plus grand que le texte."],["Mets le titre en rouge.",{"title.col":"rouge"},"La couleur attire le regard (avec un bon contraste)."],["S\xE9lectionne le paragraphe et mets-le en italique.",{"para.i":!0},"L\u2019italique distingue un passage."]])]},{title:"Insertion d\u2019objets",topics:["image","tableau","formes"],acts:[It("Image, tableau ou forme ?","Identifier les objets que l\u2019on peut ins\xE9rer dans un document.",[["Quel objet permet d\u2019illustrer un texte avec une photo ?",["Une image","Un tableau","Une forme","Un saut de page"],"On ins\xE8re une image."],["Quel objet range des donn\xE9es en lignes et en colonnes ?",["Un tableau","Une image","Un titre","Une marge"],"Un tableau organise les donn\xE9es."],["Un cercle, un rectangle ou une fl\xE8che sont des :",["Formes","Images","Tableaux","Extensions"],"Ce sont des formes dessin\xE9es."],["Quel onglet contient les commandes pour ins\xE9rer image, tableau et forme ?",["Insertion","Accueil","R\xE9vision","Affichage"],"L\u2019onglet Insertion regroupe les objets."],["Pour num\xE9roter les pages, on choisit :",["Insertion puis Num\xE9ro de page","Accueil puis Gras","Affichage puis Zoom","R\xE9vision puis Orthographe"],"Le num\xE9ro de page est un \xE9l\xE9ment ins\xE9r\xE9."]]),ht("Objet et utilit\xE9","Associer chaque objet \xE0 son utilit\xE9.",[["Image","Illustrer ou d\xE9corer un document"],["Tableau","Pr\xE9senter des donn\xE9es organis\xE9es"],["Forme","Dessiner des fl\xE8ches, cadres ou symboles"],["Zone de texte","Placer un texte \xE0 un endroit libre de la page"],["Num\xE9ro de page","Rep\xE9rer chaque page du document"]]),sn("Compose l\u2019affiche","Organiser les \xE9l\xE9ments d\u2019une affiche de haut en bas.",["Titre de l\u2019affiche","Image principale","Texte de pr\xE9sentation","Tableau des horaires","Coordonn\xE9es de contact en bas de page"],{explain:"Une affiche se lit de haut en bas : le titre attire, l\u2019image illustre, le texte explique, le tableau pr\xE9cise, le contact conclut."}),Ut("Mission Affiche","Assembler une affiche \xE9ducative dans un \xE9diteur simul\xE9.","office",{show:["fmt","insert"],title:"Journ\xE9e de l\u2019informatique",para:"Venez d\xE9couvrir les ordinateurs de la salle 12 !"},[["Ins\xE8re une image.",{img:!0},"Une image attire l\u2019\u0153il."],["Ins\xE8re un tableau.",{table:!0},"Un tableau pr\xE9sente les horaires."],["Ins\xE8re une forme.",{shape:!0},"Une forme met en valeur une information."],["Centre le titre.",{"title.al":"centre"},"Un titre d\u2019affiche est centr\xE9."],["Mets le titre en taille 18 ou plus.",i=>i["title.sz"]>=18,"Le titre doit \xEAtre lisible de loin.",{"title.sz":24}]])]},{title:"Mise en page et impression",topics:["marges","orientation","format du papier","aper\xE7u","impression"],acts:[ht("R\xE9glages de page","Associer chaque r\xE9glage \xE0 sa signification.",[["Marges","Espaces blancs entre le texte et le bord de la page"],["Orientation","Portrait (vertical) ou paysage (horizontal)"],["Format du papier","Dimensions de la feuille : A4, A5\u2026"],["Nombre de copies","Combien d\u2019exemplaires imprimer"],["Aper\xE7u avant impression","Voir le rendu avant de gaspiller du papier"]]),Gt("La fen\xEAtre d\u2019impression","Rep\xE9rer les parties de la bo\xEEte de dialogue d\u2019impression.","printdlg",[["copies","Clique sur la zone du nombre de copies.","Elle contient un nombre."],["preview","Clique sur l\u2019aper\xE7u de la page.","Il montre la page avant impression."],["printbtn","Clique sur le bouton qui lance l\u2019impression.","Le gros bouton en bas \xE0 droite."],["printer","Clique sur la zone du choix de l\u2019imprimante.","Elle est tout en haut."],["orient","Clique sur la zone de l\u2019orientation.","Elle contient \xAB Portrait \xBB."]]),Rt("Configure selon la situation","Choisir les r\xE9glages d\u2019impression adapt\xE9s \xE0 un sc\xE9nario.",[["Pour imprimer un tableau tr\xE8s large, on choisit l\u2019orientation [[paysage|portrait|diagonale]].","Le paysage offre plus de largeur."],["Pour donner 30 exemplaires \xE0 la classe, on r\xE8gle le nombre de [[copies|marges|polices]] sur 30.","Le champ \xAB copies \xBB fixe le nombre d\u2019exemplaires."],["Pour \xE9conomiser l\u2019encre d\u2019un brouillon, on imprime en [[noir et blanc|couleur|3D]].","Le noir et blanc consomme moins d\u2019encre color\xE9e."],["Pour n\u2019imprimer que la page 2, on choisit l\u2019\xE9tendue [[page 2 uniquement|tout le document|aucune page]].","On limite l\u2019impression aux pages voulues."],["Avant d\u2019imprimer, on consulte l\u2019[[aper\xE7u|enregistrement|copier\u2011coller]] pour v\xE9rifier la mise en page.","L\u2019aper\xE7u \xE9vite le gaspillage."]]),Ut("Mission Impression","Pr\xE9visualiser un document virtuel et choisir les bons r\xE9glages.","office",{show:["print"],title:"Emploi du temps de la classe",para:"Lundi \xE0 vendredi, de 8 h \xE0 17 h."},[["Choisis l\u2019orientation paysage.",{orient:"paysage"},"Un emploi du temps large tient mieux en paysage."],["Choisis le format de papier A4.",{paper:"A4"},"A4 est le format courant des classes."],["Choisis des marges \xE9troites.",{margins:"\xE9troites"},"Des marges \xE9troites donnent plus de place au contenu."],["R\xE8gle le nombre de copies sur 3.",{copies:3},"Le champ copies fixe le nombre d\u2019exemplaires."],["Clique sur Imprimer (impression simul\xE9e).",{printed:!0},"On lance l\u2019impression apr\xE8s avoir v\xE9rifi\xE9 les r\xE9glages."]])]},{title:"Tableur : fonctionnalit\xE9s et environnement",topics:["cellule","ligne","colonne","feuille","classeur"],acts:[Gt("D\xE9couvre le tableur","Identifier les \xE9l\xE9ments de l\u2019espace de travail d\u2019un tableur.","sheet",[["colhead","Clique sur l\u2019en\u2011t\xEAte d\u2019une colonne.","Les colonnes portent des lettres."],["rowhead","Clique sur l\u2019en\u2011t\xEAte d\u2019une ligne.","Les lignes portent des num\xE9ros."],["fbar","Clique sur la barre de formule.","Elle montre le contenu de la cellule active."],["tabs","Clique sur les onglets de feuilles.","Un classeur peut contenir plusieurs feuilles."],["namebox","Clique sur la zone qui donne l\u2019adresse de la cellule.","Elle affiche par exemple B3."]]),ht("Vocabulaire du tableur","Associer chaque terme \xE0 sa d\xE9finition.",[["Cellule","Intersection d\u2019une ligne et d\u2019une colonne"],["Ligne","Suite horizontale de cellules, rep\xE9r\xE9e par un num\xE9ro"],["Colonne","Suite verticale de cellules, rep\xE9r\xE9e par une lettre"],["Feuille","Page de calcul contenant des cellules"],["Classeur","Fichier du tableur contenant une ou plusieurs feuilles"]]),Ut("Place les valeurs par adresse","Saisir des valeurs dans des cellules d\xE9sign\xE9es par leur adresse.","sheet",{rows:5,cols:4,init:{}},[["Dans la cellule A1, \xE9cris le mot Nom.",{c:"A1",v:"Nom"},"A1 : colonne A, ligne 1."],["Dans la cellule B1, \xE9cris le mot Note.",{c:"B1",v:"Note"},"B1 : colonne B, ligne 1."],["Dans la cellule A2, \xE9cris le pr\xE9nom Sara.",{c:"A2",v:"Sara"},"A2 : colonne A, ligne 2."],["Dans la cellule B2, \xE9cris le nombre 14.",{c:"B2",v:14},"B2 : colonne B, ligne 2."],["Dans la cellule B3, \xE9cris le nombre 12.",{c:"B3",v:12},"B3 : colonne B, ligne 3."]]),Rt("Mission Notes : construire le tableau","Concevoir un tableau de notes.",[["Dans un tableau de notes, on \xE9crit les noms des \xE9l\xE8ves dans une [[colonne|feuille|barre de formule]] (par exemple la colonne A).","Une colonne est verticale."],["Chaque \xE9l\xE8ve occupe une [[ligne|extension|police]] du tableau.","Une ligne est horizontale."],["La cellule \xE0 l\u2019intersection de la colonne B et de la ligne 4 s\u2019appelle [[B4|4B|B\u20114]].","On \xE9crit d\u2019abord la lettre, puis le num\xE9ro."],["La premi\xE8re ligne contient souvent les [[en\u2011t\xEAtes (titres des colonnes)|r\xE9sultats cach\xE9s|formules d\u2019impression]].","Elle nomme chaque colonne."],["Pour calculer le total des notes, on \xE9crira une [[formule|image|marge]] qui commence par le signe =.","Une formule d\xE9bute par =."]])]},{title:"Formules, adressage et fonctions",topics:["formule","adresse de cellule","plage","SOMME, MOYENNE, MAX, MIN"],acts:[ht("Adresses et plages","Associer chaque adresse \xE0 sa position.",[["A1","Colonne A, ligne 1 (coin sup\xE9rieur gauche)"],["B3","Colonne B, ligne 3"],["C5","Colonne C, ligne 5"],["D2","Colonne D, ligne 2"],["A1:A5","Plage : les cellules de A1 jusqu\u2019\xE0 A5"]]),Rt("Compl\xE8te les formules","Compl\xE9ter des formules simples.",[["Une formule commence toujours par le signe [[=|+|#]].","Le signe = annonce un calcul."],["Pour additionner A1 et B1, on \xE9crit =[[A1+B1|A1B1|A1 et B1]].","On relie les adresses avec +."],["Pour additionner les cellules de B2 \xE0 B6 : =[[SOMME(B2:B6)|SOMME(B2;B6)|ADD(B2\u2011B6)]]","Les deux\u2011points d\xE9signent la plage enti\xE8re."],["Pour la moyenne des cellules C2 \xE0 C6 : =[[MOYENNE(C2:C6)|MOYEN(C2;C6)|MOY(C2\u2011C6)]]","La fonction s\u2019appelle MOYENNE."],["Si B2 contient 10 et C2 contient 4, la formule =B2*C2 affiche [[40|14|6]].","Le signe * multiplie."]]),It("D\xE9bogue les formules","Trouver les erreurs dans des formules.",[[`Formule saisie : SOMME(B2:B6)
Que faut\u2011il corriger ?`,["Ajouter le signe = au d\xE9but","Remplacer B2:B6 par B2\u2011B6","Supprimer les parenth\xE8ses","Rien, c\u2019est correct"],"Sans =, le tableur lit du texte."],["En C1, la formule =A1+B1 avec A1 = 5 et B1 = 7. Quel r\xE9sultat s\u2019affiche ?",["12","57","5+7","#NOM?"],"Les cellules sont additionn\xE9es : 5 + 7 = 12."],[`Formule : =MOYENNE(B2:B5
Que manque\u2011t\u2011il ?`,["La parenth\xE8se fermante )","Un point\u2011virgule final","Une seconde parenth\xE8se ouvrante","Le signe $"],"Chaque parenth\xE8se ouverte doit \xEAtre ferm\xE9e."],["La formule =B2*C2 est recopi\xE9e une ligne plus bas. Elle devient :",["=B3*C3","=B2*C2","=B2*C3","=B3*C2"],"Les adresses relatives avancent d\u2019une ligne."],["Une cellule affiche #DIV/0! avec =A1/B1. Cause probable :",["B1 contient 0 ou est vide","A1 contient un grand nombre","Le signe / n\u2019existe pas","La feuille est trop grande"],"On ne peut pas diviser par z\xE9ro."]]),Ut("Mission Moyennes","Calculer des moyennes, un total et un maximum avec des formules.","sheet",{rows:6,cols:4,init:{A1:"Nom",B1:"Maths",C1:"Physique",D1:"Moyenne",A2:"Sara",B2:"14",C2:"12",A3:"Omar",B3:"10",C3:"14",A4:"Lina",B4:"18",C4:"12",A5:"Total"}},[["En D2, calcule la moyenne de Sara avec une formule (=MOYENNE(B2:C2)).",{c:"D2",v:13,f:"=MOYENNE(B2:C2)"},"En fran\xE7ais on \xE9crit MOYENNE et les arguments se s\xE9parent par ;."],["En D3, calcule la moyenne d\u2019Omar avec une formule.",{c:"D3",v:12,f:"=MOYENNE(B3:C3)"},"(10 + 14) / 2 = 12."],["En D4, calcule la moyenne de Lina avec une formule.",{c:"D4",v:15,f:"=MOYENNE(B4:C4)"},"(18 + 12) / 2 = 15."],["En B5, calcule le total des notes de Maths avec SOMME.",{c:"B5",v:42,f:"=SOMME(B2:B4)"},"14 + 10 + 18 = 42."],["En C5, trouve la meilleure note de Physique avec MAX.",{c:"C5",v:14,f:"=MAX(C2:C4)"},"MAX renvoie la plus grande valeur de la plage."]])]},{title:"Graphiques",topics:["diagramme en barres","courbe","diagramme circulaire","titre, axes, l\xE9gende"],acts:[Gt("Reconnais les graphiques","Identifier des types de graphiques et leurs \xE9l\xE9ments.","charts",[["bar","Clique sur le diagramme en barres.","Il compare des valeurs avec des rectangles."],["line","Clique sur la courbe.","Elle suit une \xE9volution."],["pie","Clique sur le diagramme circulaire.","Il montre des parts d\u2019un total."],["axis","Clique sur l\u2019axe horizontal du diagramme en barres.","L\u2019axe horizontal porte les cat\xE9gories."],["legend","Clique sur la l\xE9gende.","Elle explique les couleurs."]]),ht("Quel graphique pour quelles donn\xE9es ?","Choisir le type de graphique adapt\xE9 aux donn\xE9es.",[["Comparer les notes de 5 \xE9l\xE8ves","Diagramme en barres"],["Suivre la temp\xE9rature heure par heure","Courbe"],["Montrer la part de chaque sport pr\xE9f\xE9r\xE9 en pourcentage","Diagramme circulaire"],["Relier la taille et le poids de chaque \xE9l\xE8ve","Nuage de points"],["Garder une liste de noms et de num\xE9ros","Tableau seul (pas de graphique)"]]),Rt("Compl\xE8te les \xE9l\xE9ments du graphique","Compl\xE9ter titre, axes et l\xE9gende.",[["Un graphique doit avoir un [[titre|virus|pilote]] qui dit ce qu\u2019il montre.","Le titre explique le sujet."],["L\u2019axe horizontal affiche souvent les [[cat\xE9gories (par exemple les mati\xE8res)|num\xE9ros de ligne|noms de fichiers]].","Ce sont les \xE9l\xE9ments compar\xE9s."],["L\u2019axe vertical affiche l\u2019[[\xE9chelle (les valeurs)|auteur|imprimante]].","Il permet de lire les valeurs."],["La [[l\xE9gende|barre d\u2019\xE9tat|r\xE8gle]] explique la signification des couleurs ou des s\xE9ries.","Sans l\xE9gende, on ne sait pas quelle couleur correspond \xE0 quoi."],["Un diagramme circulaire convient pour montrer des [[parts d\u2019un total|\xE9volutions dans le temps|adresses]].","Chaque secteur est une part du tout."]]),Ut("Mission Statistiques","Construire et interpr\xE9ter un graphique \xE0 partir des moyennes d\u2019une classe.","chart",{data:[["Maths",14],["Fran\xE7ais",12],["Anglais",15],["SVT",11],["Physique",13]],init:{type:"courbe"}},[["Choisis le type de graphique le plus adapt\xE9 pour comparer les mati\xE8res.",{type:"barres"},"Des barres comparent bien plusieurs cat\xE9gories."],["Donne un titre qui contient le mot \xAB moyennes \xBB.",{title:"~moyennes"},"Le titre pr\xE9cise ce que montre le graphique."],["Affiche les titres des axes.",{axes:!0},"Les axes doivent \xEAtre nomm\xE9s."],["Affiche la l\xE9gende.",{legend:!0},"La l\xE9gende aide \xE0 lire les couleurs."],["Interpr\xE8te : quelle mati\xE8re a la meilleure moyenne ?",{answer:"Anglais"},"La barre la plus haute est celle d\u2019Anglais (15)."]])]}]};var Nh={id:3,title:"Algorithmique et programmation",short:"Algorithmique",icon:"\u{1F916}",color:"m3",groups:[{label:"Notion d\u2019algorithme (4 h)",sessions:[1,2]},{label:"Structures de contr\xF4le de base (6 h)",sessions:[3,4,5]},{label:"Langages de programmation (6 h)",sessions:[6,7,8]}],languageNote:"Langage cible des s\xE9ances 7 et 8 : Python (valeur par d\xE9faut \xE0 confirmer avec le programme de l\u2019\xE9tablissement).",sessions:[{title:"Notion d\u2019algorithme, constantes, variables et types",topics:["algorithme","instruction","donn\xE9e","constante","variable","type"],acts:[ht("Associe les notions","Relier algorithme, instruction, donn\xE9e, variable et constante \xE0 leur d\xE9finition.",[["Algorithme","Suite ordonn\xE9e d\u2019instructions qui r\xE9sout un probl\xE8me"],["Instruction","Action \xE9l\xE9mentaire de l\u2019algorithme"],["Donn\xE9e","Valeur utilis\xE9e ou produite par l\u2019algorithme"],["Variable","Zone de m\xE9moire nomm\xE9e dont la valeur peut changer"],["Constante","Valeur nomm\xE9e qui ne change pas pendant l\u2019ex\xE9cution"]]),Dt("Constante ou variable ?","Distinguer ce qui reste fixe de ce qui change.",["Constante","Variable"],[["\u03C0 (3,14)",0,"Sa valeur ne change pas."],["Le nombre de jours d\u2019une semaine (7)",0,"Valeur fixe."],["La TVA fix\xE9e \xE0 20 % dans le programme",0,"Valeur fix\xE9e une fois pour toutes."],["Le nombre d\u2019heures dans un jour (24)",0,"Valeur fixe."],["Le nombre de lettres de l\u2019alphabet latin (26)",0,"Valeur fixe."],["La note saisie par l\u2019\xE9l\xE8ve",1,"Elle change \xE0 chaque saisie."],["Le total qui augmente \xE0 chaque achat",1,"Il \xE9volue."],["L\u2019\xE2ge de l\u2019utilisateur",1,"Il d\xE9pend de la personne."],["Le r\xE9sultat d\u2019une addition",1,"Il d\xE9pend des nombres."],["Le score d\u2019un jeu",1,"Il change pendant la partie."]]),It("Quel type de donn\xE9e ?","Identifier entier, r\xE9el, cha\xEEne de caract\xE8res et bool\xE9en.",[["Quel est le type de la valeur 14 ?",["Entier","R\xE9el","Cha\xEEne de caract\xE8res","Bool\xE9en"],"14 est un nombre sans partie d\xE9cimale."],["Quel est le type de la valeur 3,75 ?",["R\xE9el","Entier","Cha\xEEne de caract\xE8res","Bool\xE9en"],"Elle a une partie d\xE9cimale."],["Quel est le type de la valeur \xAB Rabat \xBB ?",["Cha\xEEne de caract\xE8res","Entier","R\xE9el","Bool\xE9en"],"C\u2019est du texte."],["Quel est le type de la valeur Vrai ?",["Bool\xE9en","Entier","R\xE9el","Cha\xEEne de caract\xE8res"],"Un bool\xE9en vaut Vrai ou Faux."],["Quel est le type de la valeur \xAB 2026 \xBB \xE9crite entre guillemets ?",["Cha\xEEne de caract\xE8res","Entier","R\xE9el","Bool\xE9en"],"Entre guillemets, c\u2019est du texte, m\xEAme si ce sont des chiffres."]]),Rh("Mission robot","Ordonner des actions pour atteindre un objectif sur une grille.",[{grid:["S..G"],max:6},{grid:["S..","##.","..G"],max:9},{grid:["S.#.","#.#.","#...","###G"],max:12},{grid:["S...#","###.#","G...#"],max:14},{grid:["S..#.","##.#.",".....",".####","....G"],max:20}])]},{title:"Instructions de base : lire, \xE9crire, affecter",topics:["lecture","\xE9criture","affectation"],acts:[ht("Lire, \xE9crire, affecter","Associer chaque instruction \xE0 son effet.",[["Lire(a)","Saisir une valeur au clavier et la ranger dans a"],["\xC9crire(a)","Afficher la valeur de a \xE0 l\u2019\xE9cran"],["a \u2190 5","Ranger la valeur 5 dans a"],["a \u2190 a + 1","Augmenter a de 1"],['\xC9crire("Bonjour")',"Afficher le texte Bonjour tel quel"]]),Rt("Compl\xE8te les instructions","Compl\xE9ter des instructions de pseudo\u2011code.",[["Pour demander l\u2019\xE2ge \xE0 l\u2019utilisateur on \xE9crit : [[Lire|\xC9crire|Affecter]](age)","Lire attend une saisie."],["Pour afficher le r\xE9sultat on \xE9crit : [[\xC9crire|Lire|Fin]](resultat)","\xC9crire affiche une valeur."],["Pour mettre 10 dans n on \xE9crit : n [[\u2190|\u2192|\u2260]] 10","La fl\xE8che vers la gauche est l\u2019affectation."],["Pour doubler n on \xE9crit : n \u2190 [[n * 2|2n|n x 2 =]]","* est le signe de multiplication."],['Dans \xC9crire("Total"), le mot Total est [[un texte affich\xE9 tel quel|une variable|une constante num\xE9rique]].',"Entre guillemets, c\u2019est du texte."]]),ps("Simule les variables","Suivre la valeur des variables apr\xE8s des affectations successives.","predict",[[`a \u2190 5
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
\xC9crire(x)`,[4],"out","x re\xE7oit 4 puis 4 + 3."]]),sn("Mission calculatrice","\xC9crire dans l\u2019ordre un algorithme qui lit deux nombres et affiche leur somme.",["D\xE9but","Lire(a)","Lire(b)","s \u2190 a + b","\xC9crire(s)"],{eq:[[1,2]],explain:"On lit les deux nombres (dans un ordre indiff\xE9rent), on calcule la somme, puis on l\u2019affiche."})]},{title:"Structure s\xE9quentielle",topics:["instructions ex\xE9cut\xE9es l\u2019une apr\xE8s l\u2019autre"],acts:[sn("Ordonne l\u2019algorithme","Remettre dans l\u2019ordre un algorithme s\xE9quentiel.",["D\xE9but","Lire(rayon)","aire \u2190 3,14 * rayon * rayon","\xC9crire(aire)","Fin"],{explain:"On ne peut calculer l\u2019aire qu\u2019apr\xE8s avoir lu le rayon, et l\u2019afficher qu\u2019apr\xE8s l\u2019avoir calcul\xE9e."}),ps("Pr\xE9dis le r\xE9sultat","D\xE9terminer ce qu\u2019affiche un algorithme s\xE9quentiel.","predict",[[`Lire(a)
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
\xC9crire(r)`,[150],"out","20 % de 150 = 30."]]),Rt("Compl\xE8te et d\xE9bogue","R\xE9parer un algorithme s\xE9quentiel.",[["Ligne 1 : [[Lire|\xC9crire|Fin]](note1)","On lit d\u2019abord les donn\xE9es."],["Ligne 3 : moyenne \u2190 (note1 + note2) [[/|*|-]] 2","La moyenne de deux notes se calcule en divisant la somme par 2."],["Ligne 4 : [[\xC9crire|Lire|D\xE9but]](moyenne)","Le r\xE9sultat s\u2019affiche \xE0 la fin."],["Dans un algorithme s\xE9quentiel, les instructions sont ex\xE9cut\xE9es [[l\u2019une apr\xE8s l\u2019autre, dans l\u2019ordre|toutes en m\xEAme temps|dans un ordre al\xE9atoire]].","L\u2019ordre d\u2019\xE9criture est l\u2019ordre d\u2019ex\xE9cution."],["Si on \xE9crit \xC9crire(moyenne) avant de calculer moyenne, l\u2019algorithme est [[faux|plus rapide|meilleur]].","moyenne n\u2019a pas encore de valeur."]]),Hp("Mission distributeur","Calculer le total de plusieurs achats.")]},{title:"Structure s\xE9lective simple",topics:["condition","Si \u2026 Alors \u2026 FinSi"],acts:[Dt("Vrai ou faux ?","\xC9valuer des comparaisons.",["Vrai","Faux"],[["7 > 3",0,"7 est plus grand que 3."],["5 = 5",0,"Les deux valeurs sont \xE9gales."],["10 <= 10",0,"\u2264 accepte l\u2019\xE9galit\xE9."],["3 * 3 = 9",0,"3 \xD7 3 vaut bien 9."],["8 <> 2",0,"<> signifie \xAB diff\xE9rent de \xBB."],["2 + 2 = 5",1,"2 + 2 = 4."],["4 <> 4",1,"4 est \xE9gal \xE0 4, donc pas diff\xE9rent."],["9 < 1",1,"9 est plus grand que 1."],["15 >= 20",1,"15 est plus petit que 20."],["6 - 1 = 4",1,"6 \u2212 1 = 5."]]),ht("Condition et action","Associer une condition \xE0 l\u2019action qui lui correspond.",[["Si age < 18",'\xC9crire("Mineur")'],["Si temperature > 30",'\xC9crire("Il fait chaud")'],["Si solde = 0",'\xC9crire("Compte vide")'],["Si note >= 10",'\xC9crire("R\xE9ussi")'],['Si mdp = "ok"','\xC9crire("Acc\xE8s autoris\xE9")']]),Rt("Si \u2026 Alors \u2026 FinSi","Compl\xE9ter une structure s\xE9lective simple.",[["La structure s\xE9lective simple commence par [[Si|Pour|Lire]] suivi d\u2019une condition.","Si introduit la condition."],["Apr\xE8s la condition, on \xE9crit le mot [[Alors|Sinon|D\xE9but]].","Alors annonce l\u2019action."],["Le bloc se termine par [[FinSi|Fin|\xC9crire]].","FinSi ferme la structure."],["Les instructions entre Alors et FinSi ne sont ex\xE9cut\xE9es que si la condition est [[vraie|fausse|\xE9crite en minuscules]].","Une condition fausse saute le bloc."],["Si la condition est fausse, l\u2019algorithme [[passe directement apr\xE8s FinSi|s\u2019arr\xEAte avec une erreur|recommence au d\xE9but]].","On continue apr\xE8s FinSi."]]),ps("Mission acc\xE8s","Trouver les valeurs \xE0 saisir pour qu\u2019une r\xE8gle d\u2019acc\xE8s soit satisfaite.","run",[[`Lire(age)
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
FinSi`,"a est plus grand",[9,4],"Saisis d\u2019abord le plus grand nombre."]])]},{title:"Structure s\xE9lective compl\xE8te",topics:["Si \u2026 Alors \u2026 Sinon \u2026 FinSi"],acts:[ps("Quelle branche est ex\xE9cut\xE9e ?","Pr\xE9dire le r\xE9sultat d\u2019une structure s\xE9lective compl\xE8te.","predict",[[`Lire(n)
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
FinSi`,[18],"out","18 >= 18 est vrai."]]),Rt("Si \u2026 Sinon \u2026 FinSi","Compl\xE9ter des structures s\xE9lectives compl\xE8tes.",[['Si note >= 10 [[Alors|Sinon|FinSi]] \xC9crire("Admis")',"Alors suit la condition."],["Pour ex\xE9cuter autre chose quand la condition est fausse, on utilise [[Sinon|Alors|Lire]].","Sinon couvre le cas contraire."],["Dans Si \u2026 Alors \u2026 Sinon \u2026 FinSi, exactement [[un seul|les deux|aucun]] des deux blocs est ex\xE9cut\xE9.","Soit l\u2019un, soit l\u2019autre."],["Le contraire de la condition n > 0 est n [[<=|<|>=]] 0.","Si n n\u2019est pas strictement positif, alors n \u2264 0."],["Un algorithme qui affiche \xAB pair \xBB ou \xAB impair \xBB utilise une structure s\xE9lective [[compl\xE8te|simple sans Sinon|s\xE9quentielle]].","Il y a deux cas \xE0 traiter."]]),It("Corrige les erreurs de logique","Trouver et r\xE9parer des erreurs de logique.",[[`\xAB Admis si la note est d\u2019au moins 10. \xBB Quel est le d\xE9faut ?
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
\xC9crire("petit")`,["Sinon doit se trouver avant FinSi","x > 5 est interdit","Alors est de trop","\xC9crire est interdit apr\xE8s Si"],"FinSi ferme toute la structure, Sinon doit \xEAtre \xE0 l\u2019int\xE9rieur."]]),Dt("Mission bulletin","Classer des \xE9l\xE8ves en Admis ou Non admis selon la moyenne.",["Admis (moyenne \u2265 10)","Non admis (moyenne < 10)"],[["Moyenne 12",0,"12 \u2265 10."],["Moyenne 10",0,"10 \u2265 10."],["Moyenne 15,25",0,"15,25 \u2265 10."],["Moyenne 10,5",0,"10,5 \u2265 10."],["Moyenne 13",0,"13 \u2265 10."],["Moyenne 9,5",1,"9,5 < 10."],["Moyenne 7",1,"7 < 10."],["Moyenne 9,99",1,"9,99 < 10."],["Moyenne 4",1,"4 < 10."],["Moyenne 8",1,"8 < 10."]])]},{title:"Notion de programme",topics:["code source","programme","ex\xE9cution","r\xE9sultat"],acts:[ht("Le vocabulaire du programme","Associer les termes du cycle d\u2019un programme.",[["Code source","Texte des instructions \xE9crit par le programmeur"],["Programme","Ensemble d\u2019instructions compr\xE9hensibles par l\u2019ordinateur"],["Ex\xE9cution","Moment o\xF9 l\u2019ordinateur applique les instructions"],["R\xE9sultat (sortie)","Ce que le programme affiche ou produit"],["Interpr\xE9teur","Outil qui lit le code et le fait ex\xE9cuter"]]),sn("Du probl\xE8me au programme","Ordonner les \xE9tapes de la cr\xE9ation d\u2019un programme.",["Analyser le probl\xE8me","\xC9crire l\u2019algorithme","\xC9crire le code du programme","Ex\xE9cuter le programme","Tester et corriger les erreurs"],{explain:"Concevoir (analyser, algorithme), coder, ex\xE9cuter, puis tester et corriger."}),Gt("Lignes et instructions","Rep\xE9rer le r\xF4le de chaque ligne d\u2019un programme.","lines",[["l1","Clique sur la ligne qui demande une saisie \xE0 l\u2019utilisateur.","Lire demande une valeur."],["l2","Clique sur la ligne qui range directement la valeur 3 dans une variable.","C\u2019est une affectation."],["l3","Clique sur la ligne qui calcule le total.","Elle multiplie prix et quantit\xE9."],["l4","Clique sur la ligne qui affiche la variable total.","\xC9crire(total) montre le r\xE9sultat."],["l5","Clique sur la ligne qui affiche un texte fixe.","Le texte entre guillemets est affich\xE9 tel quel."]],{lines:["Lire(prix)","quantite \u2190 3","total \u2190 prix * quantite","\xC9crire(total)",'\xC9crire("Merci")']}),ps("Mission ex\xE9cution","Ex\xE9cuter un programme \xE9ducatif s\xE9curis\xE9 et trouver les bonnes valeurs.","run",[[`Lire(n)
\xC9crire(n * 2)`,18,[9],"Il double la valeur lue."],[`Lire(a)
Lire(b)
\xC9crire(a + b)`,25,[10,15],"Il additionne les deux valeurs."],[`Lire(x)
\xC9crire(x * x)`,49,[7],"Il calcule le carr\xE9."],[`Lire(c)
\xC9crire(c * 9 / 5 + 32)`,212,[100],"Conversion Celsius \u2192 Fahrenheit."],[`Lire(p)
\xC9crire(p - p * 20 / 100)`,80,[100],"Prix apr\xE8s une r\xE9duction de 20 %."]])]},{title:"Langages de programmation",topics:["langages","\xE9diteur / IDE","syntaxe"],acts:[ht("Reconnais les langages","Reconna\xEEtre des exemples de langages de programmation.",[["Python","Langage tr\xE8s utilis\xE9 pour d\xE9buter, \xE0 la syntaxe lisible"],["Scratch","Langage visuel qui assemble des blocs"],["JavaScript","Langage qui rend les pages web interactives"],["C","Langage proche de la machine, utilis\xE9 pour les syst\xE8mes"],["Pascal","Langage historique cr\xE9\xE9 pour enseigner la programmation"]]),Dt("Langage, IDE ou application ?","Distinguer un langage, un environnement de d\xE9veloppement et une application ordinaire.",["Langage de programmation","Environnement de d\xE9veloppement (IDE)","Application ordinaire"],[["Python",0,"On \xE9crit du code dans ce langage."],["JavaScript",0,"C\u2019est un langage."],["C",0,"C\u2019est un langage."],["IDLE",1,"\xC9diteur fourni avec Python."],["Thonny",1,"\xC9diteur pour d\xE9butants."],["Visual Studio Code",1,"\xC9diteur de code."],["Writer",2,"Traitement de texte, pas un outil de programmation."],["Calc",2,"Tableur."],["Lecteur de musique",2,"Application multim\xE9dia."],["Scratch",0,"Langage visuel."]]),Rt("Compl\xE8te le code Python","Compl\xE9ter de courts extraits de code source.",[['En Python, pour afficher un message on \xE9crit [[print|Ecrire|show]]("Bonjour").',"print affiche."],['Pour lire une valeur saisie on \xE9crit nom = [[input|read|lire]]("Ton nom ? ").',"input lit au clavier."],["En Python, l\u2019affectation s\u2019\xE9crit avec le signe [[=|\u2190|:=]], par exemple x = 5.","On utilise le signe =."],["Les commentaires commencent par le caract\xE8re [[#|//|--]].","En Python, # introduit un commentaire."],["Les fichiers Python ont l\u2019extension [[.py|.exe|.docx]].",".py d\xE9signe un programme Python."]]),It("Mission d\xE9bogage","R\xE9parer de simples erreurs de syntaxe.",[[`Quelle est l\u2019erreur ?
print("Bonjour"`,["Il manque la parenth\xE8se fermante )","print est interdit","Il manque un point\u2011virgule","Les guillemets sont inutiles"],"Chaque parenth\xE8se ouverte doit \xEAtre ferm\xE9e."],[`Quelle est l\u2019erreur ?
Print("Salut")`,["Python distingue majuscules et minuscules : il faut \xE9crire print","Il manque des guillemets","Salut est interdit","Il manque un deux\u2011points"],"Les noms de fonctions sont sensibles \xE0 la casse."],[`Quelle est l\u2019erreur ?
x = 5
print(y)`,["La variable y n\u2019a jamais re\xE7u de valeur","x est mal \xE9crit","print ne sait pas afficher","Il manque une parenth\xE8se"],"On ne peut utiliser que des variables d\xE9finies."],[`Quelle est l\u2019erreur ?
if x > 3
    print("grand")`,["Il manque les deux\u2011points : apr\xE8s la condition","if est interdit","x > 3 est faux","print est mal \xE9crit"],"La ligne du if se termine par :"],[`Quelle est l\u2019erreur ?
nom = input("Nom ? ")
 print(nom)`,["La deuxi\xE8me ligne commence par un espace (indentation inattendue)","input est interdit","nom est un mot r\xE9serv\xE9","Il manque un point"],"En Python, l\u2019indentation a un sens."]])]},{title:"Transcription d\u2019algorithme",topics:["pseudo\u2011code vers programme","comparaison des r\xE9sultats"],acts:[ht("Pseudo\u2011code \u2194 Python","Associer des instructions de pseudo\u2011code \xE0 leur transcription en Python.",[["\xC9crire(x)","print(x)"],["x \u2190 5","x = 5"],["Lire(n) (nombre entier)","n = int(input())"],["Si a > b Alors","if a > b:"],["Sinon","else:"]]),Rt("Compl\xE8te le programme","Compl\xE9ter le code d\u2019un programme traduit d\u2019un algorithme.",[['Ligne 1 : a = int([[input|print|lire]]("a ? "))',"input lit une saisie."],["Ligne 3 : s = a [[+|-|and]] b","Une somme utilise +."],["Ligne 4 : [[print|input|Ecrire]](s)","print affiche le r\xE9sultat."],["Pour tester l\u2019\xE9galit\xE9 en Python on \xE9crit if a [[==|=|:=]] b:","== compare, = affecte."],["Apr\xE8s le if et sa condition, on termine la ligne par [[:|;|.]]","Les deux\u2011points ouvrent le bloc."]]),It("Compare avec le r\xE9sultat attendu","R\xE9parer un programme pour qu\u2019il produise le r\xE9sultat attendu.",[[`Le programme doit afficher 10 pour a = 4 et b = 6. Quelle correction ?
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
print(a + c)`,["Remplacer c par b : la variable c n\u2019existe pas","Remplacer a par 7","Supprimer b","Ajouter print(7)"],"On ne peut utiliser que des variables d\xE9j\xE0 d\xE9finies."]]),sn("Mission finale : la moyenne","Transcrire l\u2019algorithme de calcul de moyenne en un petit programme Python.",["# Programme : moyenne de deux notes",'n1 = float(input("Note 1 : "))','n2 = float(input("Note 2 : "))',"moyenne = (n1 + n2) / 2",'print("Moyenne :", moyenne)'],{eq:[[1,2]],explain:"Commentaire, lecture des deux notes (ordre indiff\xE9rent), calcul, affichage."})]}]};function Hp(i,e){return{mech:"sim:vending",title:i,objective:e,data:{view:"vending",cfg:{items:[["jus","Jus",5,"\u{1F9C3}"],["gateau","G\xE2teau",3,"\u{1F370}"],["eau","Eau",2,"\u{1F4A7}"]]},tasks:[["Ach\xE8te 2 jus (5 DH l\u2019un), puis saisis le total \xE0 payer.",{jus:2,gateau:0,eau:0,total:10},"total \u2190 5 \xD7 2 = 10 DH."],["Ach\xE8te 1 jus et 1 g\xE2teau, puis saisis le total.",{jus:1,gateau:1,eau:0,total:8},"total \u2190 5 + 3 = 8 DH."],["Ach\xE8te 2 g\xE2teaux et 3 eaux, puis saisis le total.",{jus:0,gateau:2,eau:3,total:12},"total \u2190 2 \xD7 3 + 3 \xD7 2 = 12 DH."],["Ach\xE8te 3 jus, 1 g\xE2teau et 2 eaux, puis saisis le total.",{jus:3,gateau:1,eau:2,total:22},"total \u2190 15 + 3 + 4 = 22 DH."],["Ach\xE8te 1 jus, 2 g\xE2teaux et 4 eaux, puis saisis le total.",{jus:1,gateau:2,eau:4,total:19},"total \u2190 5 + 6 + 8 = 19 DH."]]}}}var Fh={id:4,title:"R\xE9seaux et Internet",short:"R\xE9seaux et Internet",icon:"\u{1F310}",color:"m4",sessions:[{title:"Notion de r\xE9seau informatique",topics:["r\xE9seau","poste","commutateur","liaison"],acts:[ht("Associe les \xE9l\xE9ments du r\xE9seau","Relier chaque \xE9l\xE9ment du r\xE9seau \xE0 sa d\xE9finition.",[["R\xE9seau informatique","Ensemble d\u2019ordinateurs et d\u2019\xE9quipements reli\xE9s pour \xE9changer des donn\xE9es"],["Ordinateur (poste)","Machine qui envoie ou re\xE7oit des informations sur le r\xE9seau"],["Commutateur (switch)","\xC9quipement qui relie plusieurs ordinateurs d\u2019un m\xEAme r\xE9seau"],["Liaison (c\xE2ble ou Wi\u2011Fi)","Moyen de transmission entre deux \xE9quipements"],["Imprimante r\xE9seau","P\xE9riph\xE9rique partag\xE9, accessible par plusieurs ordinateurs"]]),Gt("Identifie les \xE9quipements","Reconna\xEEtre les \xE9quipements d\u2019un sch\xE9ma de r\xE9seau local.","lan",[["switch","Clique sur le commutateur (switch).","Tous les c\xE2bles arrivent sur lui."],["printer","Clique sur l\u2019imprimante partag\xE9e.","Elle est reli\xE9e au switch comme les postes."],["server","Clique sur le serveur.","Il stocke des ressources partag\xE9es."],["pc","Clique sur l\u2019un des postes de travail.","Un poste est un ordinateur d\u2019utilisateur."],["link","Clique sur l\u2019un des c\xE2bles.","Un c\xE2ble relie un \xE9quipement au switch."]]),Ch("Construis le r\xE9seau de la salle","Relier des postes \xE0 un commutateur.",[{id:"sw",label:"Switch",icon:"\u21C4",x:50,y:50},{id:"p1",label:"PC 1",icon:"\u{1F5A5}",x:12,y:14},{id:"p2",label:"PC 2",icon:"\u{1F5A5}",x:12,y:82},{id:"p3",label:"PC 3",icon:"\u{1F5A5}",x:88,y:14},{id:"p4",label:"PC 4",icon:"\u{1F5A5}",x:88,y:82},{id:"p5",label:"PC 5",icon:"\u{1F5A5}",x:50,y:12}],[["p1","sw","chaque poste se branche sur le switch"],["p2","sw","chaque poste se branche sur le switch"],["p3","sw","chaque poste se branche sur le switch"],["p4","sw","chaque poste se branche sur le switch"],["p5","sw","chaque poste se branche sur le switch"]]),Ut("Mission : le r\xE9seau de la classe","Valider logiquement la connectivit\xE9 d\u2019un r\xE9seau local.","toggles",{init:{sw:!1,c1:!1,c2:!1,c3:!1,imp:!1},items:[["sw","Switch aliment\xE9","\u21C4"],["c1","C\xE2ble du PC 1 branch\xE9","\u{1F50C}"],["c2","C\xE2ble du PC 2 branch\xE9","\u{1F50C}"],["c3","C\xE2ble du PC 3 branch\xE9","\u{1F50C}"],["imp","Imprimante partag\xE9e allum\xE9e","\u{1F5A8}"]],status:i=>[["Le switch est aliment\xE9",i.sw],["PC 1 communique avec le r\xE9seau",i.sw&&i.c1],["PC 2 communique avec le r\xE9seau",i.sw&&i.c2],["PC 3 communique avec le r\xE9seau",i.sw&&i.c3],["L\u2019imprimante est utilisable depuis le r\xE9seau",i.sw&&i.imp]]},[["Le switch est \xE9teint : aucun PC ne communique. Alimente\u2011le.",{sw:!0},"Sans courant, le switch ne transmet rien."],["Branche le c\xE2ble du PC 1 pour qu\u2019il rejoigne le r\xE9seau.",{c1:!0},"Un poste a besoin d\u2019un c\xE2ble et d\u2019un switch allum\xE9."],["Branche aussi les PC 2 et 3 (sans d\xE9brancher le PC 1).",{c1:!0,c2:!0,c3:!0},"Chaque poste a son propre c\xE2ble."],["L\u2019imprimante partag\xE9e est \xE9teinte : allume\u2011la.",{imp:!0},"Un \xE9quipement \xE9teint n\u2019est pas joignable."],["Le technicien d\xE9place le PC 3 : d\xE9branche seulement son c\xE2ble.",{c3:!1,c1:!0,c2:!0,sw:!0,imp:!0},"Les autres postes continuent de fonctionner."]])]},{title:"Typologie et avantages des r\xE9seaux",topics:["LAN","MAN","WAN","partage de ressources"],acts:[Dt("LAN, MAN ou WAN ?","Classer des r\xE9seaux selon leur \xE9tendue g\xE9ographique.",["LAN","MAN","WAN"],[["Les ordinateurs d\u2019une salle d\u2019informatique",0,"Un seul local : r\xE9seau local."],["Le r\xE9seau d\u2019un coll\xE8ge",0,"Un seul site : r\xE9seau local."],["Deux ordinateurs reli\xE9s dans une maison",0,"Tr\xE8s petite zone."],["Le r\xE9seau reliant plusieurs \xE9coles d\u2019une m\xEAme ville",1,"\xC0 l\u2019\xE9chelle d\u2019une ville."],["Le r\xE9seau reliant les mairies d\u2019arrondissement d\u2019une ville",1,"\xC0 l\u2019\xE9chelle d\u2019une ville."],["Le r\xE9seau d\u2019une cha\xEEne de biblioth\xE8ques d\u2019une m\xEAme agglom\xE9ration",1,"\xC0 l\u2019\xE9chelle d\u2019une agglom\xE9ration."],["Internet",2,"R\xE9seau mondial."],["Le r\xE9seau d\u2019une banque entre plusieurs pays",2,"Plusieurs pays."],["Les c\xE2bles sous\u2011marins reliant les continents",2,"\xC9chelle intercontinentale."],["Le r\xE9seau d\u2019une compagnie a\xE9rienne pr\xE9sente dans plusieurs pays",2,"Plusieurs pays."]]),ht("Type de r\xE9seau et \xE9tendue","Associer chaque type de r\xE9seau \xE0 son \xE9tendue.",[["LAN","R\xE9seau local : une salle, un b\xE2timent"],["MAN","R\xE9seau m\xE9tropolitain : une ville"],["WAN","R\xE9seau \xE9tendu : pays et continents"],["PAN","R\xE9seau personnel : quelques m\xE8tres autour d\u2019une personne (Bluetooth)"],["Internet","R\xE9seau mondial de r\xE9seaux"]]),Rt("Les avantages du r\xE9seau","Compl\xE9ter les avantages du partage de ressources.",[["Un r\xE9seau permet de [[partager|effacer|\xE9teindre]] des ressources comme une imprimante.","Une seule imprimante peut servir \xE0 toute la classe."],["Les utilisateurs peuvent [[\xE9changer des fichiers|r\xE9parer la souris|changer le clavier]] rapidement.","Le r\xE9seau transporte les fichiers."],["Partager une seule connexion Internet permet d\u2019[[\xE9conomiser de l\u2019argent|augmenter la poussi\xE8re|supprimer les fichiers]].","Un seul abonnement peut servir \xE0 plusieurs postes."],["Un r\xE9seau facilite la [[communication|destruction|d\xE9connexion]] entre utilisateurs (messagerie, visioconf\xE9rence).","Communiquer est un avantage majeur."],["Les donn\xE9es importantes peuvent \xEAtre [[sauvegard\xE9es sur un serveur central|supprim\xE9es automatiquement|cach\xE9es dans la souris]].","Un serveur centralise et prot\xE8ge les donn\xE9es."]]),It("Mission : choisis la solution","Choisir la solution r\xE9seau adapt\xE9e \xE0 un sc\xE9nario scolaire.",[["Une salle de 20 PC doit partager une imprimante. Quelle solution ?",["Un r\xE9seau local (LAN) avec un switch","Un r\xE9seau mondial entre pays","Une cl\xE9 USB par poste","Aucun r\xE9seau"],"Un LAN suffit pour partager dans une salle."],["Un coll\xE8ge veut relier ses trois b\xE2timents voisins. Quelle solution ?",["Un LAN \xE9tendu \xE0 tout le coll\xE8ge, avec des switches reli\xE9s","Un r\xE9seau Bluetooth","Un seul c\xE2ble de PC en PC","Un r\xE9seau mondial"],"Le site reste unique : on \xE9tend le r\xE9seau local."],["Une acad\xE9mie veut relier les \xE9tablissements d\u2019une m\xEAme ville. Quelle solution ?",["Un r\xE9seau m\xE9tropolitain (MAN)","Un r\xE9seau personnel Bluetooth","Le r\xE9seau d\u2019une seule salle","Aucun r\xE9seau"],"Une ville correspond \xE0 l\u2019\xE9chelle d\u2019un MAN."],["Une entreprise a des bureaux \xE0 Casablanca et \xE0 Paris. Quelle solution ?",["Un r\xE9seau \xE9tendu (WAN), par exemple via Internet de fa\xE7on s\xE9curis\xE9e","Un LAN d\u2019une seule salle","Un r\xE9seau Bluetooth","Des cl\xE9s USB seulement"],"Deux pays : r\xE9seau \xE9tendu."],["Un \xE9l\xE8ve veut envoyer une photo de son t\xE9l\xE9phone vers l\u2019ordinateur sans fil, \xE0 1 m\xE8tre. Quelle solution ?",["Un r\xE9seau personnel (Bluetooth)","Un r\xE9seau mondial","Un r\xE9seau m\xE9tropolitain","Un c\xE2ble sous\u2011marin"],"Tr\xE8s courte distance : r\xE9seau personnel."]])]},{title:"D\xE9finition d\u2019Internet",topics:["Internet","Web","navigateur","site web","client / serveur"],acts:[ht("Internet, Web, navigateur, site","Distinguer les notions li\xE9es \xE0 Internet.",[["Internet","R\xE9seau mondial qui relie des millions de r\xE9seaux"],["Web","Service d\u2019Internet qui permet de consulter des pages li\xE9es entre elles"],["Navigateur","Logiciel qui affiche les pages web"],["Site web","Ensemble de pages web d\u2019un m\xEAme \xE9diteur"],["Serveur web","Ordinateur qui stocke les pages et les envoie \xE0 la demande"]]),Dt("Service ou infrastructure ?","Distinguer les services d\u2019Internet de son infrastructure mat\xE9rielle.",["Service d\u2019Internet","Infrastructure / mat\xE9riel"],[["Le Web",0,"Service qui affiche des pages."],["La messagerie \xE9lectronique",0,"Service d\u2019\xE9change de messages."],["La visioconf\xE9rence",0,"Service de communication."],["Le t\xE9l\xE9chargement de fichiers",0,"Service de transfert."],["La messagerie instantan\xE9e (chat)",0,"Service de discussion."],["Le c\xE2ble de fibre optique",1,"Support physique."],["Le routeur",1,"\xC9quipement du r\xE9seau."],["Un serveur (la machine)",1,"Mat\xE9riel qui h\xE9berge les services."],["Un satellite de t\xE9l\xE9communication",1,"Support physique."],["Le modem",1,"\xC9quipement d\u2019acc\xE8s."]]),Rt("Client, r\xE9seau, serveur","Compl\xE9ter le sch\xE9ma d\u2019une demande de page web.",[["Quand tu tapes une adresse, ton ordinateur joue le r\xF4le de [[client|serveur|routeur]].","Le client fait la demande."],["Ta demande traverse le [[r\xE9seau|clavier|scanner]] jusqu\u2019au serveur.","Le r\xE9seau transporte la requ\xEAte."],["Le [[serveur|navigateur|moniteur]] cherche la page demand\xE9e.","Le serveur stocke les pages."],["Le serveur envoie la [[r\xE9ponse (la page)|demande|facture]] vers ton ordinateur.","La r\xE9ponse contient la page."],["Enfin, le [[navigateur|serveur|c\xE2ble]] affiche la page \xE0 l\u2019\xE9cran.","Le navigateur affiche."]]),Ut("Mission : requ\xEAte et r\xE9ponse","Simuler la demande et la r\xE9ponse d\u2019une page web.","browser",{start:null,pages:{home:{url:"www.college.exemple",title:"Coll\xE8ge Al Atlas \u2013 Accueil",body:["Bienvenue sur le site du coll\xE8ge."],links:[["Cours d\u2019informatique","cours"]]},cours:{url:"www.college.exemple/cours",title:"Cours d\u2019informatique",body:["Chapitre 1 : les r\xE9seaux. Chapitre 2 : Internet."],links:[["Retour \xE0 l\u2019accueil","home"]]}}},[["Dans la barre d\u2019adresse, tape www.college.exemple",{urlInput:"=www.college.exemple"},"Le client pr\xE9pare sa demande."],["Envoie la requ\xEAte : clique sur \xAB Aller \xBB.",{page:"home"},"Le serveur r\xE9pond 200 OK et envoie la page."],["Clique sur le lien \xAB Cours d\u2019informatique \xBB.",{page:"cours"},"Un lien envoie une nouvelle requ\xEAte."],["Reviens \xE0 l\u2019accueil avec le bouton Retour.",{page:"home"},"Le navigateur garde l\u2019historique."],["Tape l\u2019adresse www.inconnu.exemple puis clique sur \xAB Aller \xBB.",{page:"404"},"Une adresse inexistante renvoie l\u2019erreur 404."]])]},{title:"Connexion \xE0 Internet",topics:["routeur","modem","Wi\u2011Fi","Ethernet","fournisseur d\u2019acc\xE8s"],acts:[Gt("Le routeur vu de l\u2019arri\xE8re","Identifier les \xE9l\xE9ments du routeur.","router",[["wifi","Clique sur une antenne Wi\u2011Fi.","Elle \xE9met et re\xE7oit les ondes radio."],["lan","Clique sur l\u2019un des ports Ethernet du r\xE9seau local (LAN).","Ils servent \xE0 brancher des ordinateurs."],["power","Clique sur le bouton et la prise d\u2019alimentation.","Il met l\u2019appareil sous tension."],["wan","Clique sur le port qui re\xE7oit la ligne vers Internet (WAN).","Il est isol\xE9 des ports du r\xE9seau local."],["leds","Clique sur les voyants lumineux.","Ils indiquent l\u2019\xE9tat de la connexion."]]),ht("Mat\xE9riel de connexion","Associer chaque \xE9quipement ou service \xE0 son r\xF4le.",[["Modem","Convertit le signal de l\u2019op\xE9rateur pour acc\xE9der \xE0 Internet"],["Routeur","Dirige les donn\xE9es entre le r\xE9seau local et Internet"],["Wi\u2011Fi","Connexion sans fil par ondes radio"],["C\xE2ble Ethernet","Connexion filaire entre un PC et le routeur"],["Fournisseur d\u2019acc\xE8s (FAI)","Soci\xE9t\xE9 qui fournit la connexion \xE0 Internet"]]),sn("Les \xE9tapes de la connexion","Ordonner les \xE9tapes de connexion d\u2019un ordinateur \xE0 Internet.",["Brancher le modem/routeur \xE0 la prise \xE9lectrique.","Brancher la ligne de l\u2019op\xE9rateur au modem.","Attendre que les voyants indiquent la connexion.","Connecter l\u2019ordinateur (c\xE2ble Ethernet, ou Wi\u2011Fi avec le mot de passe).","Ouvrir le navigateur et tester une page web."],{explain:"On alimente, on relie \xE0 l\u2019op\xE9rateur, on attend, on connecte le poste, puis on teste."}),Ut("Mission diagnostic","Diagnostiquer une panne de connexion simul\xE9e.","toggles",{init:{power:!1,line:!1,cable:!1,wifi:!1,pass:!1},items:[["power","Routeur aliment\xE9","\u{1F50C}"],["line","Ligne de l\u2019op\xE9rateur active","\u{1F4DE}"],["cable","C\xE2ble Ethernet branch\xE9 au PC","\u{1F517}"],["wifi","Wi\u2011Fi activ\xE9 sur le PC","\u{1F4F6}"],["pass","Bon mot de passe Wi\u2011Fi saisi","\u{1F511}"]],derive:i=>{i.internet=!!(i.power&&i.line&&(i.cable||i.wifi&&i.pass))},status:i=>[["Le routeur est sous tension",i.power],["La ligne de l\u2019op\xE9rateur fonctionne",i.line],["Le PC est reli\xE9 au routeur (c\xE2ble, ou Wi\u2011Fi avec bon mot de passe)",i.cable||i.wifi&&i.pass],["Acc\xE8s \xE0 Internet disponible",i.internet]]},[["Tous les voyants sont \xE9teints : alimente le routeur.",{power:!0},"Sans courant, rien ne fonctionne."],["Le voyant Internet est rouge : la ligne de l\u2019op\xE9rateur est coup\xE9e. R\xE9tablis la ligne (simulation).",{line:!0},"Sans ligne, le routeur ne peut pas atteindre Internet."],["Le PC essaie de se connecter en Wi\u2011Fi : active le Wi\u2011Fi du PC.",{wifi:!0},"Le Wi\u2011Fi doit \xEAtre activ\xE9 sur l\u2019ordinateur."],["Le Wi\u2011Fi refuse la connexion : saisis le bon mot de passe.",{pass:!0},"Un mot de passe incorrect bloque l\u2019acc\xE8s."],["V\xE9rifie : l\u2019acc\xE8s \xE0 Internet doit fonctionner.",{internet:!0},"Tous les maillons de la cha\xEEne sont en place."]])]},{title:"Service Web",topics:["navigateur","adresse URL","lien hypertexte","moteur de recherche"],acts:[Gt("Le navigateur","Identifier les contr\xF4les d\u2019un navigateur et la barre d\u2019adresse.","browser",[["urlbar","Clique sur la barre d\u2019adresse.","On y tape l\u2019adresse du site."],["tab","Clique sur l\u2019onglet.","Chaque onglet ouvre une page."],["reload","Clique sur le bouton qui actualise la page.","La fl\xE8che en cercle recharge la page."],["back","Clique sur le bouton Retour.","La fl\xE8che vers la gauche revient en arri\xE8re."],["pagezone","Clique sur la zone qui affiche le contenu de la page.","C\u2019est la grande zone sous la barre d\u2019adresse."]]),ht("Vocabulaire du Web","Associer chaque terme \xE0 sa d\xE9finition.",[["URL","Adresse d\u2019une page web"],["Onglet","Permet d\u2019ouvrir plusieurs pages dans une m\xEAme fen\xEAtre"],["Lien hypertexte","\xC9l\xE9ment cliquable qui m\xE8ne \xE0 une autre page"],["Moteur de recherche","Service qui trouve des pages \xE0 partir de mots\u2011cl\xE9s"],["Favoris (marque\u2011pages)","Liste d\u2019adresses enregistr\xE9es pour y revenir vite"]]),Rt("D\xE9code une adresse","Identifier les \xE9l\xE9ments d\u2019une URL.",[["Dans https://www.ecole.ma/cours/info.html, \xAB https \xBB est le [[protocole|nom de domaine|nom du fichier]].","Il indique comment dialoguer avec le serveur."],["\xAB www.ecole.ma \xBB est le [[nom de domaine (le serveur)|protocole|chemin du dossier]].","Il d\xE9signe le serveur."],["\xAB /cours/ \xBB indique le [[dossier (chemin)|protocole|domaine]].","C\u2019est le chemin dans le site."],["\xAB info.html \xBB est le nom de la [[page (le fichier)|domaine|protocole]].","C\u2019est la page demand\xE9e."],["Le \xAB https \xBB indique que la connexion est [[s\xE9curis\xE9e (chiffr\xE9e)|plus lente|d\xE9connect\xE9e]].","Le s signifie s\xE9curis\xE9."]]),Ut("Mission recherche","Trouver des informations dans un navigateur et un moteur de recherche enti\xE8rement simul\xE9s (hors ligne).","browser",{start:"search",pages:{search:{url:"recherche.exemple",title:"Moteur de recherche",body:["Tape des mots\u2011cl\xE9s puis clique sur Rechercher."],search:!0},rabat:{url:"www.maroc-info.exemple/rabat",title:"Rabat, capitale du Maroc",kw:"capitale maroc rabat administrative royaume",body:["Rabat est la capitale administrative du Royaume du Maroc."]},casa:{url:"www.maroc-info.exemple/casablanca",title:"Casablanca, ville \xE9conomique et grand port",kw:"casablanca port \xE9conomique ville maroc",body:["Casablanca est la plus grande ville et un port majeur."]},atlas:{url:"www.maroc-info.exemple/atlas",title:"Les montagnes de l\u2019Atlas",kw:"montagnes atlas neige maroc",body:["Les montagnes de l\u2019Atlas traversent le pays."]},ifrane:{url:"www.maroc-info.exemple/ifrane",title:"Ifrane, ville de neige",kw:"ifrane neige ville montagne hiver",body:["Ifrane est connue pour ses hivers froids."]},info:{url:"www.ecole.exemple/info",title:"Cours d\u2019informatique du coll\xE8ge",kw:"cours informatique ordinateur coll\xE8ge",body:["Le programme d\u2019informatique du coll\xE8ge."]}}},[["Cherche \xAB capitale Maroc \xBB et ouvre le r\xE9sultat qui donne le nom de la capitale.",{page:"rabat"},"Le bon r\xE9sultat contient les deux mots\u2011cl\xE9s."],["Reviens \xE0 la liste des r\xE9sultats avec le bouton Retour.",{page:"results"},"Retour ram\xE8ne \xE0 la page pr\xE9c\xE9dente."],["Cherche \xAB montagnes Atlas \xBB et ouvre le bon r\xE9sultat.",{page:"atlas"},"Les mots\u2011cl\xE9s guident vers la bonne page."],["Cherche \xAB port \xE9conomique Casablanca \xBB et ouvre le bon r\xE9sultat.",{page:"casa"},"Plus les mots\u2011cl\xE9s sont pr\xE9cis, meilleur est le r\xE9sultat."],["Cherche \xAB cours informatique \xBB et ouvre le r\xE9sultat du coll\xE8ge.",{page:"info"},"Choisis le r\xE9sultat qui correspond \xE0 la demande."]])]},{title:"E\u2011mail et chat p\xE9dagogique",topics:["destinataire","objet","message","pi\xE8ce jointe","chat"],acts:[Gt("Les parties d\u2019un e\u2011mail","Identifier destinataire, objet, message, pi\xE8ce jointe et bouton d\u2019envoi.","mail",[["to","Clique sur la zone du destinataire.","Elle contient l\u2019adresse de la personne."],["subject","Clique sur l\u2019objet du message.","Il r\xE9sume le sujet en quelques mots."],["body","Clique sur le corps du message.","C\u2019est le texte principal."],["attach","Clique sur la pi\xE8ce jointe.","Le trombone signale un fichier joint."],["send","Clique sur le bouton d\u2019envoi.","Il envoie le message."]]),Dt("E\u2011mail ou chat ?","Choisir le bon moyen de communication selon la situation.",["E\u2011mail","Chat p\xE9dagogique"],[["Envoyer un document officiel \xE0 un professeur",0,"\xC9crit formel avec pi\xE8ce jointe."],["\xC9crire une lettre avec objet et formule de politesse",0,"L\u2019e\u2011mail suit un cadre formel."],["Joindre un devoir en pi\xE8ce jointe",0,"Les pi\xE8ces jointes sont naturelles par e\u2011mail."],["R\xE9pondre plus tard, quand on a le temps",0,"L\u2019e\u2011mail n\u2019est pas instantan\xE9."],["Garder une trace \xE9crite formelle",0,"Un e\u2011mail se conserve."],["Discuter en direct avec un camarade pendant un exercice",1,"\xC9change en temps r\xE9el."],["Poser une question rapide en temps r\xE9el",1,"Message court et imm\xE9diat."],["Envoyer un petit message \xAB ok \xBB",1,"Message tr\xE8s court."],["Discuter \xE0 plusieurs en direct dans un groupe de classe",1,"Conversation de groupe."],["\xC9changer rapidement des messages courts",1,"Le chat est rapide et informel."]]),sn("Envoyer un e\u2011mail","Ordonner les \xE9tapes d\u2019envoi d\u2019un e\u2011mail.",["Ouvrir la messagerie.","Cliquer sur \xAB Nouveau message \xBB.","Saisir l\u2019adresse du destinataire et l\u2019objet.","R\xE9diger le message (et joindre un fichier).","Cliquer sur \xAB Envoyer \xBB."],{explain:"On ouvre, on cr\xE9e, on adresse, on r\xE9dige, puis on envoie."}),Ut("Mission : \xE9crire et envoyer (simulation)","R\xE9diger et envoyer un message simul\xE9, sans aucune transmission r\xE9elle.","mail",{},[["Dans \xAB \xC0 \xBB, \xE9cris prof.info@ecole.exemple",{to:"=prof.info@ecole.exemple"},"L\u2019adresse identifie le destinataire (adresse fictive)."],["\xC9cris un objet qui contient le mot \xAB devoir \xBB.",{subject:"~devoir"},"L\u2019objet r\xE9sume le sujet."],["R\xE9dige un message qui commence par \xAB Bonjour \xBB.",{body:"~bonjour"},"Une formule de politesse est de mise."],["Joins le fichier devoir.docx.",{att:!0},"La pi\xE8ce jointe accompagne le message."],["Clique sur Envoyer (simulation : rien n\u2019est transmis).",{sent:!0},"Le message simul\xE9 reste sur cet ordinateur."]])]},{title:"Avantages et inconv\xE9nients d\u2019Internet",topics:["avantages","risques","protection","comportement responsable"],acts:[Dt("Avantage, risque ou protection ?","Classer des situations li\xE9es \xE0 Internet.",["Avantage","Risque","Protection"],[["Trouver rapidement des informations",0,"Internet donne acc\xE8s au savoir."],["Communiquer avec des personnes \xE9loign\xE9es",0,"Il rapproche."],["\xC9tudier avec des ressources en ligne",0,"Il aide \xE0 apprendre."],["Les messages d\u2019hame\xE7onnage (phishing)",1,"Ils cherchent \xE0 voler des informations."],["Un virus t\xE9l\xE9charg\xE9 par erreur",1,"Il peut ab\xEEmer l\u2019ordinateur."],["Le harc\xE8lement en ligne",1,"Il fait souffrir."],["Utiliser un mot de passe fort",2,"Il prot\xE8ge un compte."],["Mettre \xE0 jour l\u2019antivirus",2,"Il bloque des menaces."],["Ne pas partager ses donn\xE9es personnelles",2,"Il prot\xE8ge la vie priv\xE9e."],["V\xE9rifier les sources avant de croire une information",2,"Il \xE9vite les fausses informations."]]),Gt("D\xE9tecte le message suspect","Rep\xE9rer les signes d\u2019un message d\u2019hame\xE7onnage.","phish",[["sender","Clique sur l\u2019adresse d\u2019exp\xE9diteur douteuse.","Une adresse inhabituelle imite une banque."],["urgent","Clique sur la phrase qui met la pression avec une menace.","L\u2019urgence et la menace sont des signes d\u2019arnaque."],["link","Clique sur le lien suspect.","Il peut mener \xE0 un faux site."],["ask","Clique sur la demande d\u2019informations confidentielles.","Une vraie banque ne demande jamais un mot de passe par message."],["greet","Clique sur la salutation impersonnelle.","\xAB Cher client \xBB montre que le message n\u2019est pas personnalis\xE9."]]),It("Choisis la bonne r\xE9action","Choisir la r\xE9ponse s\xFBre dans des sc\xE9narios en ligne.",[["Un message dit : \xAB Tu as gagn\xE9 un t\xE9l\xE9phone, donne ton mot de passe ! \xBB Que fais\u2011tu ?",["Je ne r\xE9ponds pas, je ne donne rien et je signale ou supprime le message","Je donne mon mot de passe pour recevoir le prix","Je transf\xE8re le message \xE0 tous mes contacts","Je clique sur le lien pour voir"],"Un mot de passe ne se partage jamais."],["Un inconnu te demande ton adresse et ta photo. Que fais\u2011tu ?",["Je refuse et j\u2019en parle \xE0 un adulte de confiance","Je lui envoie ma photo","Je lui donne mon adresse","Je lui demande plus de d\xE9tails"],"Il ne faut pas donner de donn\xE9es personnelles \xE0 un inconnu."],["Un camarade est moqu\xE9 dans le groupe de classe. Que fais\u2011tu ?",["Je ne participe pas, je soutiens mon camarade et je pr\xE9viens un adulte","Je rigole avec les autres","Je partage le message","Je quitte le groupe sans rien dire"],"Le respect et l\u2019aide sont essentiels."],["Un site demande de t\xE9l\xE9charger un programme gratuit inconnu pour voir une vid\xE9o. Que fais\u2011tu ?",["Je ne t\xE9l\xE9charge pas et je demande \xE0 l\u2019enseignant","Je t\xE9l\xE9charge tout de suite","J\u2019envoie le lien \xE0 mes amis","Je d\xE9sactive l\u2019antivirus"],"Un programme inconnu peut contenir un virus."],["Tu trouves une information choquante sans source. Que fais\u2011tu ?",["Je v\xE9rifie avec des sources fiables avant de la partager","Je la partage imm\xE9diatement","Je la crois car elle est choquante","Je l\u2019envoie \xE0 toute la classe"],"V\xE9rifier \xE9vite de propager de fausses informations."]]),sn("Mission cybercitoyen","R\xE9soudre un sc\xE9nario de cyberharc\xE8lement en respectant des comportements responsables.",["Ne pas r\xE9pondre sur le coup \xE0 la personne qui t\u2019agresse.","Garder une preuve (capture d\u2019\xE9cran).","Bloquer ou signaler le contact sur la plateforme.","En parler \xE0 un adulte de confiance (parent, enseignant).","Continuer \xE0 utiliser Internet avec prudence et respect."],{explain:"Rester calme, conserver des preuves, se prot\xE9ger, demander de l\u2019aide, puis poursuivre en s\xE9curit\xE9."})]}]};var Vp=[Lh,Uh,Nh,Fh],ci=Vp.map(i=>({...i,sessions:i.sessions.map((e,t)=>{let n={...e,id:`m${i.id}-s${t+1}`,moduleId:i.id,index:t+1,acts:[]};return n.acts=e.acts.map((s,r)=>({...s,id:`m${i.id}-s${t+1}-a${r+1}`,moduleId:i.id,sessionId:n.id,sessionIndex:t+1,index:r+1,version:1,type:s.mech.split(":")[0],instructions:s.instructions||Ih[s.mech.split(":")[0]],hint:s.hint||Ph[s.mech.split(":")[0]],estimatedMinutes:s.estimatedMinutes||(s.mech.startsWith("sim")||s.mech==="robot"?8:5),accessibilityAlternative:"Toutes les interactions se font \xE0 la souris ou au clavier (Tab, Entr\xE9e, Espace) ; les glisser\u2011d\xE9poser ont une alternative par clic."})),n})})),Gp=ci.flatMap(i=>i.sessions),ur=Gp.flatMap(i=>i.acts),Oh=new Map(ur.map(i=>[i.id,i])),Bh=i=>Oh.get(i),kh=i=>Oh.has(i),hr=i=>ci.find(e=>e.id===Number(i)),Ni=(i,e)=>hr(i)?.sessions[Number(e)-1],vc=ur.length*5;var qp={1:"\u0645\u0628\u0627\u062F\u0626 \u0639\u0627\u0645\u0629 \u062D\u0648\u0644 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A\u0629",2:"\u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A",3:"\u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u0628\u0631\u0645\u062C\u0629",4:"\u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0648\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A"},Wp={"m1-s1":"\u0627\u0644\u062A\u0639\u0631\u064A\u0641\u0627\u062A \u0648\u0627\u0644\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629","m1-s2":"\u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0648\u0638\u064A\u0641\u064A \u0644\u0644\u062D\u0627\u0633\u0648\u0628","m1-s3":"\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0637\u0631\u0641\u064A\u0629 \u0648\u0627\u0644\u0648\u062D\u062F\u0629 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629","m1-s4":"\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0648\u0645\u062C\u0627\u0644\u0627\u062A \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647\u0627","m2-s1":"\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s2":"\u0628\u064A\u0626\u0629 \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s3":"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A","m2-s4":"\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0646\u0635\u0648\u0635: \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0648\u0627\u0644\u0628\u064A\u0626\u0629","m2-s5":"\u0627\u0644\u0625\u062F\u062E\u0627\u0644 \u0648\u0627\u0644\u062A\u062D\u0631\u064A\u0631","m2-s6":"\u0627\u0644\u062A\u0646\u0633\u064A\u0642","m2-s7":"\u0625\u062F\u0631\u0627\u062C \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A","m2-s8":"\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0637\u0628\u0627\u0639\u0629","m2-s9":"\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A\u0629: \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0648\u0627\u0644\u0628\u064A\u0626\u0629","m2-s10":"\u0627\u0644\u0635\u064A\u063A \u0648\u0627\u0644\u0639\u0646\u0648\u0646\u0629 \u0648\u0627\u0644\u062F\u0648\u0627\u0644","m2-s11":"\u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629","m3-s1":"\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629 \u0648\u0627\u0644\u062B\u0648\u0627\u0628\u062A \u0648\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u0646\u0648\u0627\u0639","m3-s2":"\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629: \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0648\u0627\u0644\u0643\u062A\u0627\u0628\u0629 \u0648\u0627\u0644\u0625\u0633\u0646\u0627\u062F","m3-s3":"\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A\u0629","m3-s4":"\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u0634\u0631\u0637\u064A\u0629 \u0627\u0644\u0628\u0633\u064A\u0637\u0629","m3-s5":"\u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u0634\u0631\u0637\u064A\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629","m3-s6":"\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s7":"\u0644\u063A\u0627\u062A \u0627\u0644\u0628\u0631\u0645\u062C\u0629","m3-s8":"\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629 \u0625\u0644\u0649 \u0628\u0631\u0646\u0627\u0645\u062C","m4-s1":"\u0645\u0641\u0647\u0648\u0645 \u0627\u0644\u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A\u0629","m4-s2":"\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0648\u0641\u0648\u0627\u0626\u062F\u0647\u0627","m4-s3":"\u062A\u0639\u0631\u064A\u0641 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A","m4-s4":"\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A","m4-s5":"\u062E\u062F\u0645\u0629 \u0627\u0644\u0648\u064A\u0628","m4-s6":"\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0648\u0627\u0644\u062F\u0631\u062F\u0634\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629","m4-s7":"\u0641\u0648\u0627\u0626\u062F \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0645\u062E\u0627\u0637\u0631\u0647"},Xp={"m1-s1-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u062A\u0639\u0631\u064A\u0641\u0627\u062A","m1-s1-a2":"\u0645\u0639\u0644\u0648\u0645\u0629 \u0623\u0645 \u0645\u0639\u0627\u0644\u062C\u0629\u061F","m1-s1-a3":"\u0623\u0643\u0645\u0644 \u0645\u062E\u0637\u0637 \u0625\u062F\u062E\u0627\u0644 \u2190 \u0645\u0639\u0627\u0644\u062C\u0629 \u2190 \u0625\u062E\u0631\u0627\u062C","m1-s1-a4":"\u0645\u0647\u0645\u0629: \u0627\u0644\u0646\u0634\u0631\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u064A\u0629","m1-s2-a1":"\u0627\u0628\u0646\u0650 \u0627\u0644\u0645\u062E\u0637\u0637","m1-s2-a2":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0637\u0631\u0641\u064A\u0629","m1-s2-a3":"\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0629","m1-s2-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u062D\u0627\u0633\u0648\u0628","m1-s3-a1":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A","m1-s3-a2":"\u0635\u0646\u0651\u0641 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0637\u0631\u0641\u064A\u0629","m1-s3-a3":"\u0631\u0643\u0651\u0628 \u0627\u0644\u062D\u0627\u0633\u0648\u0628","m1-s3-a4":"\u0645\u0647\u0645\u0629 \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0639\u0637\u0644","m1-s4-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A","m1-s4-a2":"\u0635\u0646\u0651\u0641 \u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A","m1-s4-a3":"\u0627\u062E\u062A\u0631 \u0627\u0644\u0623\u062F\u0627\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629","m1-s4-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629","m2-s1-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0628\u0627\u0644\u062A\u0639\u0631\u064A\u0641\u0627\u062A","m2-s1-a2":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s1-a3":"\u0635\u0646\u0651\u0641 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A","m2-s1-a4":"\u0645\u0647\u0645\u0629 \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644","m2-s2-a1":"\u0627\u0633\u062A\u0643\u0634\u0641 \u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628","m2-s2-a2":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0628\u0623\u062F\u0648\u0627\u0631\u0647\u0627","m2-s2-a3":"\u062A\u0639\u0627\u0645\u0644 \u0645\u0639 \u0627\u0644\u0646\u0627\u0641\u0630\u0629","m2-s2-a4":"\u0645\u0647\u0645\u0629 \u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628","m2-s3-a1":"\u0645\u0644\u0641 \u0623\u0645 \u0645\u062C\u0644\u062F \u0623\u0645 \u0627\u062E\u062A\u0635\u0627\u0631\u061F","m2-s3-a2":"\u0627\u0645\u062A\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u0623\u0646\u0648\u0627\u0639\u0647\u0627","m2-s3-a3":"\u0646\u0638\u0651\u0645 \u0645\u0644\u0641\u0627\u062A\u0643","m2-s3-a4":"\u0645\u0647\u0645\u0629 \u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0645\u0644\u0641\u0627\u062A","m2-s4-a1":"\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0646\u0627\u0641\u0630\u0629","m2-s4-a2":"\u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0648\u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A","m2-s4-a3":"\u062A\u062D\u0631\u064A\u0631 \u0623\u0645 \u062A\u0646\u0633\u064A\u0642 \u0623\u0645 \u0625\u062F\u0631\u0627\u062C\u061F","m2-s4-a4":"\u0645\u0647\u0645\u0629 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0646\u0635\u0648\u0635","m2-s5-a1":"\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0641\u064A \u0648\u0636\u0639\u064A\u0629 \u0639\u0645\u0644\u064A\u0629","m2-s5-a2":"\u0635\u062D\u0651\u062D \u0627\u0644\u0646\u0635 \u0627\u0644\u0645\u0643\u062A\u0648\u0628 \u0628\u0633\u0631\u0639\u0629","m2-s5-a3":"\u0627\u0646\u0633\u062E \u0643\u0644\u0645\u0629 \u0648\u0627\u0644\u0635\u0642\u0647\u0627","m2-s5-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0633\u0643\u0631\u062A\u064A\u0631","m2-s6-a1":"\u0627\u0644\u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u0632\u0631\u0627\u0631","m2-s6-a2":"\u062D\u062F\u0651\u062F \u0627\u0644\u0623\u062F\u0648\u0627\u062A","m2-s6-a3":"\u0623\u0635\u0644\u062D \u0627\u0644\u0641\u0642\u0631\u0629","m2-s6-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0635\u0645\u0645","m2-s7-a1":"\u0635\u0648\u0631\u0629 \u0623\u0645 \u062C\u062F\u0648\u0644 \u0623\u0645 \u0634\u0643\u0644\u061F","m2-s7-a2":"\u0627\u0644\u0643\u0627\u0626\u0646 \u0648\u0641\u0627\u0626\u062F\u062A\u0647","m2-s7-a3":"\u0623\u0646\u0634\u0626 \u0627\u0644\u0645\u0644\u0635\u0642","m2-s7-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0644\u0635\u0642","m2-s8-a1":"\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0635\u0641\u062D\u0629","m2-s8-a2":"\u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629","m2-s8-a3":"\u0627\u0636\u0628\u0637 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0648\u0636\u0639\u064A\u0629","m2-s8-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629","m2-s9-a1":"\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A","m2-s9-a2":"\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A","m2-s9-a3":"\u0636\u0639 \u0627\u0644\u0642\u064A\u0645 \u062D\u0633\u0628 \u0627\u0644\u0639\u0646\u0648\u0627\u0646","m2-s9-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0646\u0642\u0637: \u0623\u0646\u0634\u0626 \u0627\u0644\u062C\u062F\u0648\u0644","m2-s10-a1":"\u0627\u0644\u0639\u0646\u0627\u0648\u064A\u0646 \u0648\u0627\u0644\u0646\u0637\u0627\u0642\u0627\u062A","m2-s10-a2":"\u0623\u0643\u0645\u0644 \u0627\u0644\u0635\u064A\u063A","m2-s10-a3":"\u0635\u062D\u0651\u062D \u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0635\u064A\u063A","m2-s10-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0639\u062F\u0644\u0627\u062A","m2-s11-a1":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629","m2-s11-a2":"\u0623\u064A \u0631\u0633\u0645 \u0644\u0623\u064A \u0628\u064A\u0627\u0646\u0627\u062A\u061F","m2-s11-a3":"\u0623\u0643\u0645\u0644 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A","m2-s11-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0625\u062D\u0635\u0627\u0621","m3-s1-a1":"\u0627\u0631\u0628\u0637 \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645","m3-s1-a2":"\u062B\u0627\u0628\u062A \u0623\u0645 \u0645\u062A\u063A\u064A\u0631\u061F","m3-s1-a3":"\u0645\u0627 \u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u061F","m3-s1-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0631\u0648\u0628\u0648\u062A","m3-s2-a1":"\u0627\u0642\u0631\u0623 \u0648\u0627\u0643\u062A\u0628 \u0648\u0623\u0633\u0646\u062F","m3-s2-a2":"\u0623\u0643\u0645\u0644 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A","m3-s2-a3":"\u062D\u0627\u0643\u0650 \u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A","m3-s2-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0622\u0644\u0629 \u0627\u0644\u062D\u0627\u0633\u0628\u0629","m3-s3-a1":"\u0631\u062A\u0651\u0628 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629","m3-s3-a2":"\u062A\u0648\u0642\u0651\u0639 \u0627\u0644\u0646\u062A\u064A\u062C\u0629","m3-s3-a3":"\u0623\u0643\u0645\u0644 \u0648\u0635\u062D\u0651\u062D","m3-s3-a4":"\u0645\u0647\u0645\u0629 \u0622\u0644\u0629 \u0627\u0644\u0628\u064A\u0639","m3-s4-a1":"\u0635\u062D\u064A\u062D \u0623\u0645 \u062E\u0637\u0623\u061F","m3-s4-a2":"\u0627\u0644\u0634\u0631\u0637 \u0648\u0627\u0644\u0641\u0639\u0644","m3-s4-a3":"\u0625\u0630\u0627\u2026 \u0625\u0630\u0646\u2026 \u0646\u0647\u0627\u064A\u0629 \u0625\u0630\u0627","m3-s4-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0648\u0644\u0648\u062C","m3-s5-a1":"\u0623\u064A \u0641\u0631\u0639 \u064A\u064F\u0646\u0641\u0651\u064E\u0630\u061F","m3-s5-a2":"\u0625\u0630\u0627\u2026 \u0648\u0625\u0644\u0627\u2026 \u0646\u0647\u0627\u064A\u0629 \u0625\u0630\u0627","m3-s5-a3":"\u0635\u062D\u0651\u062D \u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0645\u0646\u0637\u0642\u064A\u0629","m3-s5-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0646\u0634\u0631\u0629","m3-s6-a1":"\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s6-a2":"\u0645\u0646 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0625\u0644\u0649 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s6-a3":"\u0627\u0644\u0623\u0633\u0637\u0631 \u0648\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A","m3-s6-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u062A\u0646\u0641\u064A\u0630","m3-s7-a1":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0644\u063A\u0627\u062A","m3-s7-a2":"\u0644\u063A\u0629 \u0623\u0645 \u0628\u064A\u0626\u0629 \u062A\u0637\u0648\u064A\u0631 \u0623\u0645 \u062A\u0637\u0628\u064A\u0642\u061F","m3-s7-a3":"\u0623\u0643\u0645\u0644 \u0634\u064A\u0641\u0631\u0629 \u0628\u0627\u064A\u062B\u0648\u0646","m3-s7-a4":"\u0645\u0647\u0645\u0629 \u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0623\u062E\u0637\u0627\u0621","m3-s8-a1":"\u0627\u0644\u0634\u064A\u0641\u0631\u0629 \u0627\u0644\u0648\u0635\u0641\u064A\u0629 \u2194 \u0628\u0627\u064A\u062B\u0648\u0646","m3-s8-a2":"\u0623\u0643\u0645\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C","m3-s8-a3":"\u0642\u0627\u0631\u0646 \u0628\u0627\u0644\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0645\u0646\u062A\u0638\u0631\u0629","m3-s8-a4":"\u0627\u0644\u0645\u0647\u0645\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629: \u0627\u0644\u0645\u0639\u062F\u0644","m4-s1-a1":"\u0627\u0631\u0628\u0637 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0634\u0628\u0643\u0629","m4-s1-a2":"\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u062A\u062C\u0647\u064A\u0632\u0627\u062A","m4-s1-a3":"\u0627\u0628\u0646\u0650 \u0634\u0628\u0643\u0629 \u0627\u0644\u0642\u0627\u0639\u0629","m4-s1-a4":"\u0645\u0647\u0645\u0629: \u0634\u0628\u0643\u0629 \u0627\u0644\u0642\u0633\u0645","m4-s2-a1":"LAN \u0623\u0645 MAN \u0623\u0645 WAN\u061F","m4-s2-a2":"\u0646\u0648\u0639 \u0627\u0644\u0634\u0628\u0643\u0629 \u0648\u0646\u0637\u0627\u0642\u0647\u0627","m4-s2-a3":"\u0641\u0648\u0627\u0626\u062F \u0627\u0644\u0634\u0628\u0643\u0629","m4-s2-a4":"\u0645\u0647\u0645\u0629: \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0644","m4-s3-a1":"\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0627\u0644\u0648\u064A\u0628 \u0648\u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0648\u0627\u0644\u0645\u0648\u0642\u0639","m4-s3-a2":"\u062E\u062F\u0645\u0629 \u0623\u0645 \u0628\u0646\u064A\u0629 \u062A\u062D\u062A\u064A\u0629\u061F","m4-s3-a3":"\u0639\u0645\u064A\u0644 \u0648\u0634\u0628\u0643\u0629 \u0648\u062E\u0627\u062F\u0645","m4-s3-a4":"\u0645\u0647\u0645\u0629: \u0627\u0644\u0637\u0644\u0628 \u0648\u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629","m4-s4-a1":"\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u0648\u062C\u0651\u0647","m4-s4-a2":"\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644","m4-s4-a3":"\u0645\u0631\u0627\u062D\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644","m4-s4-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u062A\u0634\u062E\u064A\u0635","m4-s5-a1":"\u0627\u0644\u0645\u062A\u0635\u0641\u062D","m4-s5-a2":"\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u0648\u064A\u0628","m4-s5-a3":"\u0641\u0643\u0651\u0643 \u0639\u0646\u0648\u0627\u0646\u0627\u064B \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B","m4-s5-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0628\u062D\u062B","m4-s6-a1":"\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A","m4-s6-a2":"\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0645 \u062F\u0631\u062F\u0634\u0629\u061F","m4-s6-a3":"\u0623\u0631\u0633\u0644 \u0628\u0631\u064A\u062F\u0627\u064B \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B","m4-s6-a4":"\u0645\u0647\u0645\u0629: \u0627\u0643\u062A\u0628 \u0648\u0623\u0631\u0633\u0644 (\u0645\u062D\u0627\u0643\u0627\u0629)","m4-s7-a1":"\u0641\u0627\u0626\u062F\u0629 \u0623\u0645 \u062E\u0637\u0631 \u0623\u0645 \u062D\u0645\u0627\u064A\u0629\u061F","m4-s7-a2":"\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0645\u0634\u0628\u0648\u0647\u0629","m4-s7-a3":"\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0631\u0651\u0641 \u0627\u0644\u0635\u062D\u064A\u062D","m4-s7-a4":"\u0645\u0647\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0637\u0646 \u0627\u0644\u0631\u0642\u0645\u064A"},$p={Information:"\u0645\u0639\u0644\u0648\u0645\u0629",Traitement:"\u0645\u0639\u0627\u0644\u062C\u0629",Informatique:"\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u064A\u0627\u062A","Syst\xE8me informatique":"\u0646\u0638\u0627\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A",Donn\u00E9e:"\u0645\u0639\u0637\u0649",Entr\u00E9e:"\u0625\u062F\u062E\u0627\u0644",Sortie:"\u0625\u062E\u0631\u0627\u062C",Stockage:"\u062A\u062E\u0632\u064A\u0646",Clavier:"\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D",Souris:"\u0627\u0644\u0641\u0623\u0631\u0629",Scanner:"\u0627\u0644\u0645\u0627\u0633\u062D \u0627\u0644\u0636\u0648\u0626\u064A","Processeur (CPU)":"\u0627\u0644\u0645\u0639\u0627\u0644\u062C","M\xE9moire vive (RAM)":"\u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062D\u064A\u0629",\u00C9cran:"\u0627\u0644\u0634\u0627\u0634\u0629","Haut-parleurs":"\u0645\u0643\u0628\u0651\u0631\u0627\u062A \u0627\u0644\u0635\u0648\u062A",Imprimante:"\u0627\u0644\u0637\u0627\u0628\u0639\u0629","Disque dur / SSD":"\u0627\u0644\u0642\u0631\u0635 \u0627\u0644\u0635\u0644\u0628 / SSD","Cl\xE9 USB":"\u0645\u0641\u062A\u0627\u062D USB",Windows:"\u0648\u064A\u0646\u062F\u0648\u0632",Android:"\u0623\u0646\u062F\u0631\u0648\u064A\u062F",Linux:"\u0644\u064A\u0646\u0643\u0633",macOS:"\u0645\u0627\u0643 \u0623\u0648 \u0625\u0633",iOS:"\u0622\u064A \u0623\u0648 \u0625\u0633",Writer:"\u0645\u0639\u0627\u0644\u062C \u0627\u0644\u0646\u0635\u0648\u0635",Calc:"\u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062D\u0633\u0627\u0628\u064A","Navigateur web":"\u0645\u062A\u0635\u0641\u062D \u0627\u0644\u0648\u064A\u0628",Navigateur:"\u0645\u062A\u0635\u0641\u062D \u0627\u0644\u0648\u064A\u0628","Logiciel de dessin":"\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0631\u0633\u0645","Lecteur de musique":"\u0645\u0634\u063A\u0644 \u0627\u0644\u0645\u0648\u0633\u064A\u0642\u0649","Logiciel de pr\xE9sentation":"\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0639\u0631\u0648\u0636 \u0627\u0644\u062A\u0642\u062F\u064A\u0645\u064A\u0629",Algorithme:"\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629",Instruction:"\u062A\u0639\u0644\u064A\u0645\u0629",Variable:"\u0645\u062A\u063A\u064A\u0631",Constante:"\u062B\u0627\u0628\u062A",Python:"\u0628\u0627\u064A\u062B\u0648\u0646",Scratch:"\u0633\u0643\u0631\u0627\u062A\u0634",JavaScript:"\u062C\u0627\u0641\u0627\u0633\u0643\u0631\u064A\u0628\u062A",IDLE:"\u0628\u064A\u0626\u0629 IDLE",Thonny:"\u0645\u062D\u0631\u0631 \u062B\u0648\u0646\u064A","Visual Studio Code":"\u0641\u064A\u062C\u0648\u0627\u0644 \u0633\u062A\u0648\u062F\u064A\u0648 \u0643\u0648\u062F","Code source":"\u0627\u0644\u0634\u064A\u0641\u0631\u0629 \u0627\u0644\u0645\u0635\u062F\u0631\u064A\u0629",LAN:"\u0634\u0628\u0643\u0629 \u0645\u062D\u0644\u064A\u0629",MAN:"\u0634\u0628\u0643\u0629 \u062D\u0636\u0631\u064A\u0629",WAN:"\u0634\u0628\u0643\u0629 \u0648\u0627\u0633\u0639\u0629",PAN:"\u0634\u0628\u0643\u0629 \u0634\u062E\u0635\u064A\u0629",Internet:"\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A","R\xE9seau informatique":"\u0634\u0628\u0643\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A\u0629","Ordinateur (poste)":"\u062D\u0627\u0633\u0648\u0628 (\u0645\u062D\u0637\u0629 \u0639\u0645\u0644)","Commutateur (switch)":"\u0645\u0628\u062F\u0644 \u0627\u0644\u0634\u0628\u0643\u0629 (\u0633\u0648\u064A\u062A\u0634)","Liaison (c\xE2ble ou Wi\u2011Fi)":"\u0631\u0627\u0628\u0637 (\u0643\u0627\u0628\u0644 \u0623\u0648 \u0648\u0627\u064A \u0641\u0627\u064A)","Imprimante r\xE9seau":"\u0637\u0627\u0628\u0639\u0629 \u0634\u0628\u0643\u064A\u0629",Modem:"\u0645\u0648\u062F\u0645",Routeur:"\u0645\u0648\u062C\u0651\u0647","Wi\u2011Fi":"\u0648\u0627\u064A \u0641\u0627\u064A","C\xE2ble Ethernet":"\u0643\u0627\u0628\u0644 \u0625\u064A\u062B\u0631\u0646\u062A","Fournisseur d\u2019acc\xE8s (FAI)":"\u0645\u0632\u0648\u062F \u062E\u062F\u0645\u0629 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A",Serveur:"\u062E\u0627\u062F\u0645","Serveur web":"\u062E\u0627\u062F\u0645 \u0627\u0644\u0648\u064A\u0628",Microphone:"\u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646",Vid\u00E9oprojecteur:"\u0645\u0633\u0644\u0627\u0637 \u0641\u064A\u062F\u064A\u0648","\xC9cran tactile":"\u0634\u0627\u0634\u0629 \u0644\u0645\u0633\u064A\u0629","Casque avec micro":"\u0633\u0645\u0627\u0639\u0629 \u0631\u0623\u0633 \u0645\u0639 \u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646","Imprimante multifonction":"\u0637\u0627\u0628\u0639\u0629 \u0645\u062A\u0639\u062F\u062F\u0629 \u0627\u0644\u0648\u0638\u0627\u0626\u0641","Disque dur externe":"\u0642\u0631\u0635 \u0635\u0644\u0628 \u062E\u0627\u0631\u062C\u064A","Disque dur":"\u0627\u0644\u0642\u0631\u0635 \u0627\u0644\u0635\u0644\u0628","Disque SSD":"\u0642\u0631\u0635 SSD","Carte m\xE8re":"\u0627\u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u0623\u0645",Alimentation:"\u0648\u062D\u062F\u0629 \u0627\u0644\u062A\u063A\u0630\u064A\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629",Ventilateur:"\u0645\u0631\u0648\u062D\u0629 \u0627\u0644\u062A\u0628\u0631\u064A\u062F","Mot de passe":"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",Antivirus:"\u0645\u0636\u0627\u062F \u0627\u0644\u0641\u064A\u0631\u0648\u0633\u0627\u062A","Mise \xE0 jour":"\u062A\u062D\u062F\u064A\u062B","Pour calculer la moyenne de Sara, quelles sont les informations d\u2019entr\xE9e ?":"\u0644\u062D\u0633\u0627\u0628 \u0645\u0639\u062F\u0644 \u0633\u0627\u0631\u0629\u060C \u0645\u0627 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u062F\u062E\u0627\u0644\u061F","Ses notes dans chaque mati\xE8re et les coefficients":"\u0646\u0642\u0637\u0647\u0627 \u0641\u064A \u0643\u0644 \u0645\u0627\u062F\u0629 \u0648\u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A","La moyenne finale":"\u0627\u0644\u0645\u0639\u062F\u0644 \u0627\u0644\u0646\u0647\u0627\u0626\u064A","Le bulletin imprim\xE9":"\u0627\u0644\u0646\u0634\u0631\u0629 \u0627\u0644\u0645\u0637\u0628\u0648\u0639\u0629","Le nom de l\u2019\xE9cole seulement":"\u0627\u0633\u0645 \u0627\u0644\u0645\u062F\u0631\u0633\u0629 \u0641\u0642\u0637","Quelle op\xE9ration constitue le traitement ?":"\u0645\u0627 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u0645\u062B\u0644 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629\u061F","Multiplier chaque note par son coefficient, additionner, puis diviser par la somme des coefficients":"\u0636\u0631\u0628 \u0643\u0644 \u0646\u0642\u0637\u0629 \u0641\u064A \u0645\u0639\u0627\u0645\u0644\u0647\u0627 \u062B\u0645 \u0627\u0644\u062C\u0645\u0639 \u0648\u0627\u0644\u0642\u0633\u0645\u0629 \u0639\u0644\u0649 \u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A","\xC9crire le nom de l\u2019\xE9l\xE8ve":"\u0643\u062A\u0627\u0628\u0629 \u0627\u0633\u0645 \u0627\u0644\u062A\u0644\u0645\u064A\u0630","Imprimer la feuille":"\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0648\u0631\u0642\u0629","Brancher l\u2019imprimante":"\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0637\u0627\u0628\u0639\u0629","Que repr\xE9sente la moyenne affich\xE9e sur le bulletin ?":"\u0645\u0627\u0630\u0627 \u064A\u0645\u062B\u0644 \u0627\u0644\u0645\u0639\u062F\u0644 \u0627\u0644\u0645\u0639\u0631\u0648\u0636 \u0641\u064A \u0627\u0644\u0646\u0634\u0631\u0629\u061F","Une information de sortie, r\xE9sultat du traitement":"\u0645\u0639\u0644\u0648\u0645\u0629 \u0625\u062E\u0631\u0627\u062C \u0646\u0627\u062A\u062C\u0629 \u0639\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","Une information d\u2019entr\xE9e":"\u0645\u0639\u0644\u0648\u0645\u0629 \u0625\u062F\u062E\u0627\u0644","Un logiciel":"\u0628\u0631\u0646\u0627\u0645\u062C","Un p\xE9riph\xE9rique":"\u062C\u0647\u0627\u0632 \u0637\u0631\u0641\u064A","Le professeur corrige une note. Que faut-il refaire ?":"\u0635\u062D\u0651\u062D \u0627\u0644\u0623\u0633\u062A\u0627\u0630 \u0646\u0642\u0637\u0629\u061B \u0645\u0627\u0630\u0627 \u064A\u062C\u0628 \u0623\u0646 \u0646\u0639\u064A\u062F\u061F","Relancer le traitement avec la note corrig\xE9e pour obtenir une nouvelle moyenne":"\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0628\u0627\u0644\u0646\u0642\u0637\u0629 \u0627\u0644\u0645\u0635\u062D\u062D\u0629 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0645\u0639\u062F\u0644 \u062C\u062F\u064A\u062F","Rien, la moyenne se corrige seule":"\u0644\u0627 \u0634\u064A\u0621\u060C \u064A\u062A\u0635\u062D\u062D \u0627\u0644\u0645\u0639\u062F\u0644 \u0648\u062D\u062F\u0647","Changer d\u2019ordinateur":"\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0633\u0648\u0628","Supprimer tous les bulletins":"\u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0646\u0634\u0631\u0627\u062A","Le bulletin complet est produit par :":"\u062A\u064F\u0646\u062A\u062C \u0627\u0644\u0646\u0634\u0631\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0628\u0648\u0627\u0633\u0637\u0629:","Un syst\xE8me informatique (mat\xE9riel + logiciels + donn\xE9es)":"\u0646\u0638\u0627\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A: \u0639\u062A\u0627\u062F \u0648\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0648\u0628\u064A\u0627\u0646\u0627\u062A","Le seul clavier":"\u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0648\u062D\u062F\u0647\u0627","La seule imprimante":"\u0627\u0644\u0637\u0627\u0628\u0639\u0629 \u0648\u062D\u062F\u0647\u0627","Uniquement l\u2019\xE9cran":"\u0627\u0644\u0634\u0627\u0634\u0629 \u0641\u0642\u0637"},Yp={"\xC9l\xE9ment de connaissance (texte, nombre, image, son) que l\u2019on peut repr\xE9senter, conserver ou communiquer.":"\u0639\u0646\u0635\u0631 \u0645\u0639\u0631\u0641\u064A \u0645\u062B\u0644 \u0646\u0635 \u0623\u0648 \u0639\u062F\u062F \u0623\u0648 \u0635\u0648\u0631\u0629 \u0623\u0648 \u0635\u0648\u062A \u064A\u0645\u0643\u0646 \u062A\u0645\u062B\u064A\u0644\u0647 \u0623\u0648 \u062D\u0641\u0638\u0647 \u0623\u0648 \u0646\u0642\u0644\u0647.","Op\xE9ration appliqu\xE9e \xE0 des informations pour obtenir un r\xE9sultat (calculer, trier, classer\u2026).":"\u0639\u0645\u0644\u064A\u0629 \u062A\u064F\u0637\u0628\u0651\u064E\u0642 \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0646\u062A\u064A\u062C\u0629 \u0645\u062B\u0644 \u0627\u0644\u062D\u0633\u0627\u0628 \u0623\u0648 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0623\u0648 \u0627\u0644\u062A\u0635\u0646\u064A\u0641.","Science du traitement automatique de l\u2019information par des ordinateurs.":"\u0639\u0644\u0645 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0622\u0644\u064A\u0629 \u0644\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0628\u0648\u0627\u0633\u0637\u0629 \u0627\u0644\u062D\u0648\u0627\u0633\u064A\u0628.","Ensemble form\xE9 du mat\xE9riel (ordinateur, p\xE9riph\xE9riques) et des logiciels qui traitent l\u2019information.":"\u0645\u062C\u0645\u0648\u0639\u0629 \u062A\u062A\u0643\u0648\u0651\u0646 \u0645\u0646 \u0627\u0644\u0639\u062A\u0627\u062F \u0648\u0627\u0644\u0628\u0631\u0645\u062C\u064A\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0639\u0627\u0644\u062C \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A.","Information brute, avant tout traitement, comme la note 14 ou le mot \xAB Rabat \xBB.":"\u0645\u0639\u0644\u0648\u0645\u0629 \u062E\u0627\u0645 \u0642\u0628\u0644 \u0645\u0639\u0627\u0644\u062C\u062A\u0647\u0627\u060C \u0645\u062B\u0644 \u0627\u0644\u0646\u0642\u0637\u0629 14 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0631\u0628\u0627\u0637."},_c=i=>qp[i]||"",yc=i=>Wp[i]||"",bc=i=>Xp[i]||"",Mc=i=>$p[String(i).trim()]||Yp[String(i).trim()]||"",Zp={match:"\u0627\u062E\u062A\u0631 \u0639\u0646\u0635\u0631\u0627\u064B \u0645\u0646 \u0627\u0644\u0639\u0645\u0648\u062F \u0627\u0644\u0623\u064A\u0633\u0631\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0645\u0627 \u064A\u0642\u0627\u0628\u0644\u0647 \u0641\u064A \u0627\u0644\u0639\u0645\u0648\u062F \u0627\u0644\u0623\u064A\u0645\u0646. \u064A\u0645\u0643\u0646\u0643 \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0631\u0628\u0637 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0642\u0642.",sort:"\u0627\u062E\u062A\u0631 \u0628\u0637\u0627\u0642\u0629 \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629\u060C \u0623\u0648 \u0627\u0633\u062D\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0648\u0623\u0641\u0644\u062A\u0647\u0627. \u0644\u0646 \u062A\u0638\u0647\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0642\u0642.",order:"\u0631\u062A\u0651\u0628 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0628\u0627\u0633\u062A\u0639\u0645\u0627\u0644 \u0632\u0631\u064A \u0627\u0644\u0635\u0639\u0648\u062F \u0648\u0627\u0644\u0646\u0632\u0648\u0644\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \xAB\u062A\u062D\u0642\u0642\xBB.",fill:"\u0627\u062E\u062A\u0631 \u0627\u0644\u0643\u0644\u0645\u0629 \u0623\u0648 \u0627\u0644\u0639\u0628\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0641\u064A \u0643\u0644 \u0641\u0631\u0627\u063A\u060C \u062B\u0645 \u062A\u062D\u0642\u0642 \u0645\u0646 \u0625\u062C\u0627\u0628\u0627\u062A\u0643.",quiz:"\u0627\u0642\u0631\u0623 \u0627\u0644\u0633\u0624\u0627\u0644 \u0648\u0627\u062E\u062A\u0631 \u062C\u0648\u0627\u0628\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0641\u0642\u0637\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \xAB\u062A\u062D\u0642\u0642\xBB.",hot:"\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0629 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0641\u064A \u0627\u0644\u0635\u0648\u0631\u0629\u060C \u0623\u0648 \u0627\u0633\u062A\u0639\u0645\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0646\u0627\u0637\u0642.",asm:"\u0627\u062E\u062A\u0631 \u0645\u0643\u0648\u0651\u0646\u0627\u064B \u062B\u0645 \u0636\u0639\u0647 \u0641\u064A \u0645\u0643\u0627\u0646\u0647 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u062F\u0627\u062E\u0644 \u0627\u0644\u062D\u0627\u0633\u0648\u0628.",net:"\u0627\u062E\u062A\u0631 \u062C\u0647\u0627\u0632\u064A\u0646 \u0644\u0631\u0628\u0637\u0647\u0645\u0627 \u0628\u0643\u0627\u0628\u0644\u060C \u0648\u0627\u0631\u0628\u0637 \u0641\u0642\u0637 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0636\u0631\u0648\u0631\u064A\u0629.",robot:"\u0643\u0648\u0651\u0646 \u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0631\u0648\u0628\u0648\u062A \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629\u060C \u062B\u0645 \u0634\u063A\u0651\u0644\u0647 \u0648\u0635\u062D\u0651\u062D\u0647 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0642\u0642.",prog:"\u062A\u062A\u0628\u0651\u0639 \u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0629 \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629 \u0643\u0645\u0627 \u064A\u0641\u0639\u0644 \u0627\u0644\u062D\u0627\u0633\u0648\u0628\u060C \u062B\u0645 \u0623\u062F\u062E\u0644 \u0627\u0644\u0646\u062A\u064A\u062C\u0629.",sim:"\u0646\u0641\u0651\u0630 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u062D\u0627\u0643\u0627\u0629\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \xAB\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0645\u0631\u062D\u0644\u0629\xBB. \u0644\u0627 \u064A\u062A\u0645 \u062A\u063A\u064A\u064A\u0631 \u0623\u064A \u0634\u064A\u0621 \u062D\u0642\u064A\u0642\u064A \u0641\u064A \u0627\u0644\u062D\u0627\u0633\u0648\u0628."},zh=i=>Zp[i]||"";var Hh=globalThis.AudioContext||globalThis.webkitAudioContext,dr=null,ui={soundEnabled:!0,hoverSound:!1,volume:.45},Vh=i=>Math.min(1,Math.max(0,Number(i)||0));function jp(){return Hh?(dr||(dr=new Hh),dr.state==="suspended"&&dr.resume().catch(()=>{}),dr):null}function Wt(i,e,{delay:t=0,type:n="sine",gain:s=.12,endFreq:r=i}={}){if(!ui.soundEnabled||ui.volume<=0)return;let a=jp();if(!a)return;let o=a.currentTime+t,l=a.createOscillator(),c=a.createGain();l.type=n,l.frequency.setValueAtTime(i,o),l.frequency.exponentialRampToValueAtTime(Math.max(20,r),o+e);let u=s*Vh(ui.volume);c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,u),o+.012),c.gain.exponentialRampToValueAtTime(1e-4,o+e),l.connect(c),c.connect(a.destination),l.start(o),l.stop(o+e+.02)}var nt={configure(i={}){ui={...ui,...i,volume:Vh(i.volume??ui.volume)}},play(i){ui.soundEnabled&&(i==="click"?Wt(420,.055,{type:"triangle",gain:.06,endFreq:520}):i==="hover"&&ui.hoverSound?Wt(700,.035,{gain:.025,endFreq:760}):i==="snap"?Wt(587,.07,{type:"sine",gain:.08,endFreq:784}):i==="move"?Wt(440,.05,{type:"triangle",gain:.05,endFreq:520}):i==="hint"?Wt(659,.08,{type:"sine",gain:.06,endFreq:880}):i==="robot"?Wt(349,.06,{type:"sine",gain:.07,endFreq:440}):i==="success"?(Wt(523,.12,{gain:.1}),Wt(659,.14,{delay:.09,gain:.1}),Wt(784,.18,{delay:.18,gain:.11})):i==="error"?(Wt(240,.12,{type:"triangle",gain:.08,endFreq:190}),Wt(180,.16,{delay:.1,type:"triangle",gain:.07,endFreq:150})):i==="complete"&&(Wt(523,.12,{gain:.09}),Wt(659,.14,{delay:.08,gain:.1}),Wt(784,.16,{delay:.16,gain:.1}),Wt(1046,.22,{delay:.24,gain:.12}),Wt(1318,.32,{delay:.34,gain:.13,endFreq:1390})))}};function Gh(i=document){i.addEventListener("click",e=>{e.target.closest('button,a,[role="button"],input[type="checkbox"],input[type="radio"]')&&nt.play("click")},!0),i.addEventListener("pointerover",e=>{let t=e.target.closest('button,a,[role="button"]');t&&!t.contains(e.relatedTarget)&&nt.play("hover")},!0)}var La=i=>String.fromCharCode(65+i),Jp=[[/preuve|capture d.écran/i,"cyber-citizen",1],[/ne pas répondre|ignorer/i,"cyber-citizen",0],[/bloquer|signaler/i,"cyber-citizen",2],[/adulte de confiance|enseignant|parent/i,"cyber-citizen",3],[/vérifier les sources/i,"cyber-citizen",4],[/prudence et respect|\brespect\b/i,"cyber-citizen",5],[/imprimante.*(multifonction|réseau|partag)/i,"network",5],[/imprimante(?!.*(multifonction|réseau|partag))/i,"peripherals",3],[/scanner/i,"peripherals",4],[/souris/i,"peripherals",2],[/clavier/i,"peripherals",1],[/clé usb/i,"peripherals",5],[/casque.*micro|microphone|haut-parleurs?|lecteur de musique/i,"speakers",0],[/écran tactile|vidéoprojecteur|écran|moniteur/i,"peripherals",0],[/carte mère/i,"components",0],[/processeur|\bcpu\b/i,"components",1],[/mémoire vive|\bram\b/i,"components",2],[/disque dur externe|disque dur|disque.*ssd|\bssd\b/i,"components",3],[/alimentation/i,"components",4],[/ventilateur|refroidissement/i,"components",5],[/routeur|wi[ -]?fi|liaison.*(câble|wi)/i,"network",0],[/commutateur|\bswitch\b/i,"network",1],[/modem/i,"network",2],[/ordinateur\s*\(poste\)|\bordinateur( de bureau)?\b|unité centrale/i,"network",3],[/serveur/i,"network",4],[/windows|linux|android|macos|ios|système d.exploitation/i,"software",0],[/writer|\btraitement de texte\b|\bword\b/i,"software",1],[/\bcalc\b|\btableur\b|\bexcel\b/i,"software",2],[/logiciel de présentation|diaporama|diapositive|\bpowerpoint\b/i,"software",3],[/navigateur( web)?/i,"software",4],[/logiciel de dessin|mise en page|retouche/i,"software",5],[/mot de passe/i,"cyber",0],[/mise à jour/i,"cyber",1],[/antivirus|\bvirus\b/i,"cyber",2],[/e-?mail.*suspect|hameçonnage|phishing|courriel suspect/i,"cyber",3],[/lien inconnu|lien suspect|lien dangereux/i,"cyber",4],[/données personnelles|information privée/i,"cyber",5],[/partager.*connexion|partage.*internet/i,"network-scales",0],[/communication rapide|messagerie instantanée/i,"network-scales",1],[/travailler à plusieurs|collaboration en ligne/i,"network-scales",2],[/sauvegarde automatique|sauvegarde sur serveur/i,"network-scales",3],[/accès à distance|accès aux dossiers/i,"network-scales",4],[/partager.*imprimante|imprimante partagée/i,"network-scales",5],[/définir le problème/i,"algorithm-tools",0],[/décomposer en étapes/i,"algorithm-tools",1],[/ordonner les actions/i,"algorithm-tools",2],[/écrire le code|coder/i,"algorithm-tools",3],[/tester et corriger/i,"algorithm-tools",4],[/exécuter et vérifier/i,"algorithm-tools",5],[/donnée|information brute/i,"cs-concepts",0],[/traitement|programme en cours/i,"cs-concepts",1],[/résultat|information utile/i,"cs-concepts",2],[/mémoire de travail|stockage temporaire/i,"cs-concepts",3],[/mémoire de masse|stockage permanent/i,"cs-concepts",4],[/périphérique d.entrée|périphérique de sortie/i,"cs-concepts",5]];function Da(i){let e=Jp.find(([s])=>s.test(i));if(!e)return null;let[,t,n]=e;return v("span",{class:`item-art sheet-${t} cell-${n}`,role:"img","aria-label":`Illustration : ${i}`})}var Fi=i=>{let e=Mc(i);return v("span",{class:"visual-label"},Da(i),v("span",{class:"visual-text"},i,e?v("small",{class:"ar-sub",lang:"ar",dir:"rtl"},e):null))};function qh(i,e){let t=e.pairs.length,n=li([...Array(t).keys()]),s=Array(t).fill(null),r=null,a=v("p",{class:"hint-line","aria-live":"polite"}),o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("match-wires"),o.setAttribute("aria-hidden","true");let l=null,c=[],u=[],h=()=>{o.replaceChildren();let p=o.parentElement;if(!p)return;let d=p.getBoundingClientRect();s.forEach((f,b)=>{if(f==null)return;let S=n.indexOf(f);if(S<0)return;let _=c[b].getBoundingClientRect(),w=u[S].getBoundingClientRect(),C=_.right-d.left,L=_.top+_.height/2-d.top,T=w.left-d.left,M=w.top+w.height/2-d.top,y=document.createElementNS("http://www.w3.org/2000/svg","path"),P=Math.max(30,(T-C)*.45);y.setAttribute("d",`M ${C} ${L} C ${C+P} ${L}, ${T-P} ${M}, ${T} ${M}`),y.setAttribute("class","match-wire c"+b%6+(l===b?" new":"")),o.append(y)}),l=null},g=()=>{c.forEach((p,d)=>{let f=s[d];p.classList.toggle("sel",r===d),p.dataset.c=f==null?"":String(d%6),p.querySelector(".tag").textContent=f==null?"":La(n.indexOf(f)),p.setAttribute("aria-pressed",String(r===d)),p.setAttribute("aria-label",`${d+1}. ${e.pairs[d][0]}${f==null?"":", associ\xE9 \xE0 la r\xE9ponse "+La(n.indexOf(f))}`)}),u.forEach((p,d)=>{let f=s.indexOf(n[d]);p.dataset.c=f<0?"":String(f%6),p.querySelector(".tag").textContent=f<0?"":String(f+1)}),(globalThis.requestAnimationFrame||(p=>p()))(h)};function m(p,d){let f=s.indexOf(d);f>=0&&(s[f]=null),l=p,s[p]=d,r=null,a.textContent="Association r\xE9ussie ! Tu peux v\xE9rifier ton score.",nt.play("snap"),g()}e.pairs.forEach((p,d)=>{let f=v("button",{type:"button",class:"card pick match-draggable",draggable:"true",ondragstart:b=>{r=d,f.classList.add("dragging"),b.dataTransfer.setData("text/plain",String(d)),g()},ondragend:()=>{f.classList.remove("dragging")},onclick:()=>{r=r===d?null:d,r!=null&&nt.play("hover"),a.textContent=r==null?"":"Clique maintenant sur la bonne r\xE9ponse \xE0 droite (ou glisse-la).",g()}},v("span",{class:"grip-icon","aria-hidden":"true"},"\u283F"),v("span",{class:"num","aria-hidden":"true"},d+1),v("span",{class:"txt"},Fi(p[0])),v("span",{class:"tag","aria-hidden":"true"}));c.push(f)}),n.forEach((p,d)=>{let f=v("button",{type:"button",class:"card pick match-droptarget",ondragenter:b=>{b.preventDefault(),f.classList.add("drag-over")},ondragleave:()=>{f.classList.remove("drag-over")},ondragover:b=>b.preventDefault(),ondrop:b=>{b.preventDefault(),f.classList.remove("drag-over");let S=Number(b.dataTransfer.getData("text/plain"));Number.isInteger(S)&&e.pairs[S]&&m(S,p)},onclick:()=>{if(r==null){a.textContent="Clique d\u2019abord sur un \xE9l\xE9ment \xE0 gauche, ou fais-le glisser ici.";return}m(r,p)}},v("span",{class:"num","aria-hidden":"true"},La(d)),v("span",{class:"txt"},Fi(e.pairs[p][1])),v("span",{class:"tag","aria-hidden":"true"}));u.push(f)});let x=v("div",{class:"match-area"},o,v("div",{class:"two-col"},v("div",{class:"col"},c),v("div",{class:"col"},u)));return i.append(v("div",{class:"match-intro-banner"},v("span",{class:"banner-badge"},"\u{1F517} Cliquer-d\xE9poser ou Glisser-d\xE9poser"),v("span",{class:"banner-ar",lang:"ar",dir:"rtl"},"\u0627\u0646\u0642\u0631 \u0623\u0648 \u0627\u0633\u062D\u0628 \u0645\u0646 \u0627\u0644\u064A\u0633\u0627\u0631 \u0644\u0644\u0631\u0628\u0637 \u0645\u0639 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646")),x,a,v("div",{class:"row",style:"margin-top:.8rem"},v("button",{type:"button",class:"btn ghost small",onclick:()=>{s.fill(null),r=null,g(),nt.play("pop")}},"\u21BA R\xE9initialiser les liaisons"))),g(),{check(){let p=e.pairs.map((d,f)=>{let b=s[f]===f,S=s[f];return{ok:b,msg:b?`${d[0]} \u2192 ${d[1]}`:`${d[0]} correspond \xE0 : ${d[1]}${S==null?" (non associ\xE9)":""}`+(d[2]?" \u2014 "+d[2]:"")}});return{correct:p.filter(d=>d.ok).length,total:t,items:p,unanswered:s.filter(d=>d==null).length}},reveal(p){p.items.forEach((d,f)=>c[f].classList.add(d.ok?"ok":"ko"))},solve(){for(let p=0;p<t;p++)s[p]=p;g()}}}function Wh(i,e){let t=e.items,n=Array(t.length).fill(null),s=null,r=null,a=null,o=v("div",{class:"pool sort-pool","aria-label":"Cartes \xE0 classer"}),l=v("p",{class:"hint-line","aria-live":"polite"}),c=e.cats.map((m,x)=>{let p=v("div",{class:"bucket-body"}),d=v("span",{class:"bucket-count"},"0"),f=v("button",{type:"button",class:"bucket-head",onclick:()=>u(x)},v("span",{class:"bucket-title-box"},v("b",null,m),d),v("small",{class:"bucket-cta"},"\u{1F4E5} D\xE9poser ici (\u0636\u0639 \u0647\u0646\u0627)")),b=v("div",{class:"bucket sort-bucket","data-cat":x,ondragenter:S=>{S.preventDefault(),b.classList.add("drag-over")},ondragleave:S=>{b.contains(S.relatedTarget)||b.classList.remove("drag-over")},ondragover:S=>S.preventDefault(),ondrop:S=>{S.preventDefault(),b.classList.remove("drag-over");let _=Number(S.dataTransfer.getData("text/plain"));Number.isInteger(_)&&t[_]&&(n[_]=x,r=_,a=x,s=null,l.textContent="Carte class\xE9e avec succ\xE8s dans : "+m+".",nt.play("snap"),g())}},f,p);return{box:b,body:p,countBadge:d}});function u(m){if(s==null){l.textContent="S\xE9lectionne d\u2019abord une carte ci-dessus, puis clique ici.";return}n[s]=m,r=s,a=m,s=null,l.textContent="Carte class\xE9e !",nt.play("snap"),g()}let h=m=>v("button",{type:"button","data-idx":String(m),class:"chip sort-chip"+(Da(t[m][0])?" has-art":"")+(s===m?" sel":"")+(r===m?" just-dropped":""),draggable:"true","aria-pressed":String(s===m),ondragstart:x=>{x.currentTarget.classList.add("dragging"),x.dataTransfer.effectAllowed="move",x.dataTransfer.setData("text/plain",String(m))},ondragend:x=>{x.currentTarget.classList.remove("dragging"),i.querySelectorAll(".bucket").forEach(p=>p.classList.remove("drag-over"))},onclick:()=>{n[m]!=null?(n[m]=null,s=m,nt.play("pop"),l.textContent="Carte reprise. Tu peux la ranger ailleurs."):(s=s===m?null:m,s!=null&&nt.play("hover"),l.textContent=s==null?"":"Choisis la cat\xE9gorie o\xF9 ranger cette carte."),g()}},v("span",{class:"grip-icon","aria-hidden":"true"},"\u283F"),Fi(t[m][0]));function g(){o.replaceChildren(...t.map((m,x)=>x).filter(m=>n[m]==null).map(h)),o.children.length||o.append(v("p",{class:"pool-empty-msg"},"\u2728 Toutes les cartes sont class\xE9es ! Clique sur \xAB V\xE9rifier \xBB.")),c.forEach((m,x)=>{let p=t.map((d,f)=>f).filter(d=>n[d]===x);m.countBadge.textContent=String(p.length),m.box.classList.toggle("drop-pulse",a===x),m.box.classList.toggle("ready-to-drop",s!=null),m.body.replaceChildren(...p.map(h))}),r=null,a=null}return i.append(v("div",{class:"sort-instruction-bar"},v("span",{class:"banner-badge"},"\u{1F5C2}\uFE0F Classement interactif : Glisse ou clique sur une carte puis sur sa cat\xE9gorie"),v("span",{class:"banner-ar",lang:"ar",dir:"rtl"},"\u0627\u0633\u062D\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0623\u0648 \u0627\u0646\u0642\u0631 \u0639\u0644\u064A\u0647\u0627 \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0644\u0647\u0627")),o,v("div",{class:"buckets",style:""},c.map(m=>m.box)),l),g(),{check(){let m=t.map((x,p)=>({ok:n[p]===x[1],msg:`${x[0]} \u2192 ${e.cats[x[1]]}`+(x[2]?" \u2014 "+x[2]:"")+(n[p]==null?" (non class\xE9)":"")}));return{correct:m.filter(x=>x.ok).length,total:t.length,items:m,unanswered:n.filter(x=>x==null).length}},reveal(m){i.querySelectorAll(".bucket .chip").forEach(x=>{let p=x.dataset.idx!=null?Number(x.dataset.idx):-1;p>=0&&m.items[p]&&x.classList.add(m.items[p].ok?"ok":"ko")})},solve(){t.forEach((m,x)=>{n[x]=m[1]}),s=null,g()}}}function Xh(i,e){let t=e.steps.length,n=e.steps.map((l,c)=>c);(e.eq||[]).forEach((l,c)=>l.forEach(u=>{n[u]=1e3+c}));let s=li([...Array(t).keys()].map(l=>l));if((e.eq||[]).length){let l=0;for(;s.every((c,u)=>n[c]===n[u])&&l++<20;)s=li(s)}let r=v("ol",{class:"order"});function a(l){if(r.replaceChildren(...s.map((c,u)=>{let h=v("li",{class:"ord-row order-draggable-row",draggable:"true",ondragstart:g=>{h.classList.add("dragging"),g.dataTransfer.setData("text/plain",String(u))},ondragend:()=>h.classList.remove("dragging"),ondragenter:g=>{g.preventDefault(),h.classList.add("drag-over")},ondragleave:()=>h.classList.remove("drag-over"),ondragover:g=>g.preventDefault(),ondrop:g=>{g.preventDefault(),h.classList.remove("drag-over");let m=Number(g.dataTransfer.getData("text/plain"));if(Number.isInteger(m)&&m!==u){let x=s.splice(m,1)[0];s.splice(u,0,x),nt.play("move"),a()}}},v("span",{class:"grip-icon","aria-hidden":"true"},"\u283F"),v("span",{class:"num","aria-hidden":"true"},u+1),v("span",{class:"txt"},Fi(e.steps[c])),v("span",{class:"ord-btns"},v("button",{type:"button",class:"icon-btn","aria-label":`Monter l\u2019\xE9tape ${u+1}`,disabled:u===0,"data-f":u+":u",onclick:()=>o(u,-1)},"\u25B2"),v("button",{type:"button",class:"icon-btn","aria-label":`Descendre l\u2019\xE9tape ${u+1}`,disabled:u===t-1,"data-f":u+":d",onclick:()=>o(u,1)},"\u25BC")));return h})),l){let c=r.querySelector(`[data-f="${l}"]`)||r.querySelector("button:not([disabled])");c&&c.focus()}}function o(l,c){let u=l+c;[s[l],s[u]]=[s[u],s[l]],nt.play("move"),a(u+":"+(c<0?"u":"d"))}return i.append(v("div",{class:"sort-instruction-bar"},v("span",{class:"banner-badge"},"\u{1F522} Ordonner les \xE9tapes : Fais glisser les lignes ou utilise \u25B2 et \u25BC"),v("span",{class:"banner-ar",lang:"ar",dir:"rtl"},"\u0631\u062A\u0628 \u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0628\u0627\u0644\u0633\u062D\u0628 \u0623\u0648 \u0628\u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0633\u0647\u0645")),r),a(),{check(){let l=s.map((u,h)=>{let g=n[u]===n[h];return{ok:g,msg:`\xC9tape ${h+1} : ${e.steps[h]}`+(g?"":` (tu avais mis : ${e.steps[u]})`)}});return e.explain&&l.push({ok:!0,info:!0,msg:e.explain}),{correct:l.filter(u=>!u.info).filter(u=>u.ok).length,total:t,items:l,unanswered:0}},reveal(l){[...r.children].forEach((c,u)=>c.classList.add(l.items[u].ok?"ok":"ko"))},solve(){s=[...Array(t).keys()],a()}}}function $h(i,e){let t=[];return e.lines.map(s=>Array.isArray(s)?s:[s,""]).forEach(([s,r])=>{let a=v("p",{class:"fill-line"}),o=/\[\[(.+?)\]\]/g,l=0,c;for(;c=o.exec(s);){a.append(s.slice(l,c.index));let u=c[1].split("|"),h=t.length,g=v("select",{"aria-label":`R\xE9ponse ${h+1}`,onchange:()=>nt.play("click")},v("option",{value:""},"\u2014 choisir \u2014"),li(u).map(x=>v("option",{value:x},x))),m=v("span",{class:"fb"});a.append(g,m),t.push({sel:g,fb:m,ans:u[0],why:r,text:s.replace(/\[\[(.+?)\]\]/g,(x,p)=>p.split("|")[0])}),l=c.index+c[0].length}a.append(s.slice(l)),i.append(a)}),{check(){let s=t.map(r=>({ok:r.sel.value===r.ans,msg:`${r.text}`+(r.why?" \u2014 "+r.why:"")}));return{correct:s.filter(r=>r.ok).length,total:t.length,items:s,unanswered:t.filter(r=>!r.sel.value).length}},reveal(s){t.forEach((r,a)=>{let o=s.items[a].ok;r.sel.classList.add(o?"ok":"ko"),r.fb.textContent=o?" \u2714":" \u2716 \u2192 "+r.ans})},solve(){t.forEach(s=>{s.sel.value=s.ans})}}}var Kp=0;function Yh(i,e){let t=e.qs.map((n,s)=>{let[r,a,o]=n,l=r.split(`
`),c="q"+ ++Kp,u=li(a.map((f,b)=>b)),h=a.length===2&&a.some(f=>/vrai|صحيح/i.test(f))&&a.some(f=>/faux|خطأ/i.test(f)),g=/fausse|faux|intrus|erreur|mauvaise|n'est pas|ne doit pas|interdit/i.test(r),m=null;h?m=v("span",{class:"q-mode-badge tf"},"\u2696\uFE0F VRAI OU FAUX \xB7 \u0635\u062D\u064A\u062D \u0623\u0645 \u062E\u0637\u0623"):g?m=v("span",{class:"q-mode-badge false-mode"},"\u{1F6A8} Trouver la r\xE9ponse fausse / l\u2019intrus \xB7 \u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u062E\u0627\u0637\u0626\u0629"):m=v("span",{class:"q-mode-badge good-mode"},"\u{1F3AF} Trouver la bonne r\xE9ponse \xB7 \u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629");let x=u.map(f=>v("input",{type:"radio",name:c,value:String(f),onchange:()=>nt.play("click")})),p=u.map((f,b)=>{let S=a[f],_=/vrai|صحيح/i.test(S),w=/faux|خطأ/i.test(S);return v("label",{class:"opt quiz-card"+(h?_?" tf-vrai":w?" tf-faux":"":""),onclick:()=>{x[b].checked=!0,nt.play("click")}},x[b],v("span",{class:"opt-letter","aria-hidden":"true"},h?_?"\u2714":"\u2716":La(b)),Fi(S))}),d=Mc(l[0]);return i.append(v("fieldset",{class:"q quiz-fieldset"+(h?" is-tf":g?" is-find-false":"")},v("legend",null,v("span",{class:"q-num"},s+1),m,v("span",{class:"q-title-text"},l[0]),d?v("small",{class:"ar-sub",lang:"ar",dir:"rtl"},d):null),l.length>1?v("pre",{class:"code"},l.slice(1).join(`
`)):null,v("div",{class:"quiz-options-grid"+(h?" tf-grid":"")},p))),{inputs:x,labels:p,order:u,opts:a,why:o,text:l[0]}});return{check(){let n=t.map(s=>{let r=s.inputs.find(o=>o.checked);return{ok:!!r&&r.value==="0",msg:`${s.text} \u2192 ${s.opts[0]}.`+(s.why?" "+s.why:"")}});return{correct:n.filter(s=>s.ok).length,total:t.length,items:n,unanswered:t.filter(s=>!s.inputs.some(r=>r.checked)).length}},reveal(n){t.forEach(s=>{s.labels.forEach((r,a)=>{s.order[a]===0?r.classList.add("good"):s.inputs[a].checked&&r.classList.add("bad")})})},solve(){t.forEach(n=>{n.inputs[n.order.indexOf(0)].checked=!0})}}}var Pe=(i,e,t,n,s,r,a,o)=>["r",i,e,t,n,s,r,a,o],Ht=(i,e,t,n,s,r)=>["l",i,e,t,n,s,r||"ln"],Ua=(i,e,t,n,s,r,a)=>["c",i,e,t,n,s,r,a],Qp=(i,e,t,n,s)=>["t",i,e,t,n||14,s||""];var ot=(i,e)=>["raw",i,e],Zh=i=>["defs",i],Sc=(i,e,t,n,s)=>{let r=u=>[i+t*Math.cos(u),e+t*Math.sin(u)],[a,o]=r(n),[l,c]=r(s);return`M${i} ${e} L${a.toFixed(1)} ${o.toFixed(1)} A${t} ${t} 0 ${s-n>Math.PI?1:0} 1 ${l.toFixed(1)} ${c.toFixed(1)} Z`},jh={desktop:{w:600,h:360,alt:"V\xE9ritable bureau d\u2019ordinateur avec fond d\u2019\xE9cran, ic\xF4nes, corbeille, fen\xEAtre ouverte et barre des t\xE2ches compl\xE8te",shapes:[Zh(`
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
      `)],desc:{desk:"Fond du bureau (papier peint et surface de travail)",icon:"Ic\xF4nes du bureau (raccourcis Ce PC, Documents, Navigateur)",bin:"Corbeille (r\xE9cipient pour r\xE9cup\xE9rer ou supprimer d\xE9finitivement les fichiers)",win:"Fen\xEAtre active (Explorateur de fichiers affichant le contenu du dossier)",taskbar:"Barre des t\xE2ches (longue barre inf\xE9rieure contenant les programmes ouverts)",start:"Bouton D\xE9marrer (ic\xF4ne Windows \u229E en bas \xE0 gauche pour ouvrir le menu)",tray:"Zone de notification (affiche l\u2019horloge 14:30, le volume sonore et le Wi-Fi)"}},pc:{w:600,h:360,alt:"Vue int\xE9rieure r\xE9aliste d\u2019une tour d\u2019ordinateur ouverte : carte m\xE8re, processeur, ventilateur, barrettes de RAM, SSD et bloc d\u2019alimentation",shapes:[Zh(`
        <linearGradient id="mobo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#022c22"/>
        </linearGradient>
        <linearGradient id="psu-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      `),Pe(null,10,10,580,340,"c9"),ot("mobo",`
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
      `)],desc:{title:"Bande bleue tout en haut avec le nom du document et les boutons de contr\xF4le",tabs:"Deuxi\xE8me bande sup\xE9rieure avec les onglets (Fichier, Accueil, Insertion...)",ribbon:"Large bandeau d\u2019outils contenant les polices, tailles et styles de texte",ruler:"Fine r\xE8gle gradu\xE9e horizontale sous le ruban pour mesurer les marges",page:"Grande feuille blanche A4 au centre o\xF9 l\u2019on r\xE9dige le document",status:"Fine bande bleue tout en bas affichant le nombre de pages et de mots"}},toolbar:{w:600,h:120,alt:"Barre d\u2019outils d\xE9taill\xE9e de mise en forme du texte avec polices, gras, italique, alignements",shapes:[Pe(null,0,0,600,120,"c8"),Pe("font",14,30,130,36,"c0","Arial \u25BE",14),Pe("size",152,30,56,36,"c0","14 \u25BE",14),Pe("bold",224,30,36,36,"c5","G",18),Pe("italic",266,30,36,36,"c5","I",18),Pe("underline",308,30,36,36,"c5","S",18),Pe("color",358,30,44,36,"c4","A",20),Pe("alignL",420,30,36,36,"c6"),Ht("alignL",428,40,448,40),Ht("alignL",428,48,440,48),Ht("alignL",428,56,448,56),Pe("alignC",462,30,36,36,"c6"),Ht("alignC",470,40,490,40),Ht("alignC",474,48,486,48),Ht("alignC",470,56,490,56),Pe("alignR",504,30,36,36,"c6"),Ht("alignR",512,40,532,40),Ht("alignR",520,48,532,48),Ht("alignR",512,56,532,56)],desc:{font:"Menu d\xE9roulant pour choisir la police de caract\xE8res",size:"Menu pour modifier la taille du texte (en points)",bold:"Bouton Gras (lettre G) pour \xE9paissir le texte",italic:"Bouton Italique (lettre I) pour incliner le texte",underline:"Bouton Soulign\xE9 (lettre S) pour souligner les mots",color:"Bouton Couleur de police (lettre A avec barre color\xE9e)",alignL:"Bouton Aligner \xE0 gauche (traits align\xE9s \xE0 gauche)",alignC:"Bouton Centrer (traits centr\xE9s au milieu)",alignR:"Bouton Aligner \xE0 droite (traits align\xE9s \xE0 droite)"}},printdlg:{w:600,h:360,alt:"Bo\xEEte de dialogue compl\xE8te d\u2019impression avec s\xE9lection de l\u2019imprimante, nombre de copies, format et aper\xE7u",shapes:[Pe(null,50,10,500,340,"c0"),Pe(null,50,10,500,32,"c3","\u{1F5A8} Imprimer le document",14),Pe("printer",70,54,460,32,"c8","Imprimante : HP-LaserJet-Salle-Informatique",13),Pe("range",70,96,220,36,"c8","Pages : Toutes",14),Pe("copies",310,96,220,36,"c8","Nombre de copies : 1",14),Pe("orient",70,142,220,32,"c8","Orientation : Portrait",13),Pe("paper",310,142,220,32,"c8","Format papier : A4 (21 x 29,7 cm)",13),Pe("preview",70,186,220,150,"c2"),Pe(null,120,200,120,122,"c0"),Pe("printbtn",350,290,180,44,"c5","\u2714 Lancer l\u2019impression",15)],desc:{printer:"Menu sup\xE9rieur pour s\xE9lectionner l\u2019imprimante de destination",range:"Option d\u2019\xE9tendue des pages (Toutes, Page actuelle ou s\xE9lection)",copies:"Champ pour r\xE9gler le nombre de copies \xE0 imprimer",orient:"R\xE9glage de l\u2019orientation de la page (Portrait ou Paysage)",paper:"Choix du format de papier (A4, A3, Lettre...)",preview:"Cadre d\u2019aper\xE7u avant impression affichant la feuille simul\xE9e",printbtn:"Bouton principal bleu en bas \xE0 droite pour valider et imprimer"}},sheet:{w:600,h:360,alt:"Fen\xEAtre de tableur avec zone d\u2019adresse, barre de formule, en-t\xEAtes colonnes A-E et lignes 1-7",shapes:[ot("namebox",`
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
      `)],desc:{namebox:"Zone d\u2019adresse (en haut \xE0 gauche) affichant la r\xE9f\xE9rence de la cellule active (B3)",fbar:"Barre de formule (longue case sup\xE9rieure) pour saisir du texte ou une formule de calcul",colhead:"En-t\xEAtes de colonnes d\xE9sign\xE9es par des lettres majuscules (A, B, C, D, E)",rowhead:"En-t\xEAtes de lignes identifi\xE9es par des num\xE9ros (1, 2, 3, 4, 5, 6, 7)",cell:"Cellule individuelle du quadrillage \xE0 l\u2019intersection d\u2019une colonne et d\u2019une ligne",tabs:"Onglets de classeur situ\xE9s en bas \xE0 gauche pour naviguer entre les feuilles"}},charts:{w:600,h:360,alt:"Trois types de graphiques statistiques : histogramme \xE0 barres color\xE9es, courbe d\u2019\xE9volution et diagramme en secteurs",shapes:[Pe(null,8,8,584,344,"c0"),ot("bar",`
        <g transform="translate(30, 160)">
          <rect x="0" y="90" width="28" height="50" rx="3" fill="#3b82f6"/>
          <rect x="36" y="30" width="28" height="110" rx="3" fill="#10b981"/>
          <rect x="72" y="60" width="28" height="80" rx="3" fill="#f59e0b"/>
          <rect x="108" y="0" width="28" height="140" rx="3" fill="#8b5cf6"/>
        </g>
      `),Ht("axis",22,300,180,300,"ln"),Ht(null,22,300,22,140,"ln"),Pe("legend",40,316,130,24,"c8","\u25A0 Donn\xE9es 1",13),ot("line",`
        <g>
          <polyline points="230,260 275,190 320,230 365,150" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
          <circle cx="230" cy="260" r="5" fill="#b91c1c"/>
          <circle cx="275" cy="190" r="5" fill="#b91c1c"/>
          <circle cx="320" cy="230" r="5" fill="#b91c1c"/>
          <circle cx="365" cy="150" r="5" fill="#b91c1c"/>
        </g>
      `),Ht(null,215,300,390,300,"ln"),ot("pie",`
        <g transform="translate(0, 0)">
          <path d="${Sc(490,190,75,0,2.2)}" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
          <path d="${Sc(490,190,75,2.2,4.2)}" fill="#10b981" stroke="#fff" stroke-width="2"/>
          <path d="${Sc(490,190,75,4.2,2*Math.PI)}" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
        </g>
      `)],desc:{bar:"Histogramme en colonnes/barres verticales pour comparer des grandeurs",axis:"Axe horizontal et vertical servant de rep\xE8re pour les valeurs",legend:"L\xE9gende explicative d\xE9crivant les s\xE9ries de donn\xE9es repr\xE9sent\xE9es",line:"Graphique en courbe reliant des points pour montrer une \xE9volution dans le temps",pie:"Diagramme circulaire en secteurs (camembert) montrant la r\xE9partition d\u2019un tout"}},lan:{w:600,h:360,alt:"Topologie d\u2019un r\xE9seau local en \xE9toile avec commutateur switch central, postes clients, serveur et imprimante partag\xE9e",shapes:[Ht("link",300,180,110,70),Ht("link",300,180,110,290),Ht("link",300,180,490,70),Ht("link",300,180,490,290),Ht("link",300,180,300,40),Ht("link",300,180,300,320),ot("switch",`
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
      `),Pe("pc",70,40,80,60,"c8","\u{1F5A5} Poste 1",12),Pe("pc",70,260,80,60,"c8","\u{1F5A5} Poste 2",12),Pe("pc",450,40,80,60,"c8","\u{1F5A5} Poste 3",12),Pe("printer",450,260,80,60,"c7","\u{1F5A8} Imprimante",11),Pe("server",255,4,90,46,"c2","\u25A6 SERVEUR",12),Pe("pc",260,300,80,50,"c8","\u{1F5A5} Poste 4",12)],desc:{switch:"Commutateur central (Switch) o\xF9 convergent tous les c\xE2bles r\xE9seau RJ45",pc:"Ordinateur de travail connect\xE9 au r\xE9seau local pour partager des ressources",printer:"Imprimante r\xE9seau partag\xE9e accessible par tous les ordinateurs du LAN",server:"Serveur central h\xE9bergeant les donn\xE9es et services partag\xE9s de l\u2019\xE9tablissement",link:"C\xE2ble r\xE9seau Ethernet reliant chaque appareil directement au commutateur"}},router:{w:600,h:360,alt:"Panneau arri\xE8re r\xE9aliste d\u2019un routeur Wi-Fi avec antennes, port WAN Internet jaune, ports LAN bleus et boutons",shapes:[Pe("wifi",80,20,20,100,"c6"),Pe("wifi",500,20,20,100,"c6"),Pe(null,40,110,520,190,"c9"),Pe("wan",70,220,60,50,"c4","WAN",12),Pe("lan",150,220,46,50,"c5","LAN 1",10),Pe("lan",202,220,46,50,"c5","LAN 2",10),Pe("lan",254,220,46,50,"c5","LAN 3",10),Pe("lan",306,220,46,50,"c5","LAN 4",10),Pe("power",470,214,60,62,"c3","\u23FB",28),Ua("leds",90,150,8,"c2"),Ua("leds",120,150,8,"c2"),Ua("leds",150,150,8,"c4"),Ua("leds",180,150,8,"c6")],desc:{wifi:"Antennes sans-fil pour \xE9mettre et recevoir le signal Wi-Fi dans la pi\xE8ce",wan:"Prise jaune WAN (Internet) reliant le routeur au modem ou \xE0 la fibre optique",lan:"Prises bleues LAN pour brancher les ordinateurs et switchs par c\xE2ble r\xE9seau",power:"Bouton marche/arr\xEAt et prise d\u2019alimentation \xE9lectrique",leds:"Voyants lumineux indiquant l\u2019\xE9tat de l\u2019alimentation, d\u2019Internet et du Wi-Fi"}},browser:{w:600,h:360,alt:"Fen\xEAtre de navigateur web avec onglets, boutons de navigation, barre d\u2019adresse s\xE9curis\xE9e HTTPS et page web",shapes:[Pe(null,0,0,600,360,"c0"),Pe(null,0,0,600,38,"c9"),Pe("tab",10,6,160,32,"c0","\u{1F310} InfoPlay Maroc  \u2715",12),Pe("back",10,46,34,30,"c8","\u25C0",14),Pe("reload",50,46,34,30,"c8","\u27F3",16),Pe("urlbar",92,46,490,30,"c8","\u{1F512} https://www.infoplay.ma/cours",13),Pe("pagezone",10,88,580,262,"c1"),Pe(null,40,110,300,24,"c8"),Pe(null,40,148,480,14,"c8"),Pe(null,40,172,420,14,"c8")],desc:{tab:"Onglet du haut permettant de basculer entre plusieurs sites web ouverts",back:"Bouton Pr\xE9c\xE9dent (fl\xE8che vers la gauche) pour revenir \xE0 la page visit\xE9e avant",reload:"Bouton Actualiser (fl\xE8che circulaire) pour recharger le contenu de la page",urlbar:"Barre d\u2019adresse avec cadenas de s\xE9curit\xE9 HTTPS indiquant l\u2019URL du site",pagezone:"Zone principale d\u2019affichage o\xF9 appara\xEEt le contenu du site internet"}},mail:{w:600,h:360,alt:"Fen\xEAtre de r\xE9daction d\u2019un message \xE9lectronique avec destinataire, objet, corps du texte et pi\xE8ce jointe",shapes:[Pe(null,0,0,600,360,"c0"),Pe("to",20,20,560,30,"c8","\xC0 : professeur.informatique@ecole.ma",13),Pe("subject",20,58,560,30,"c8","Objet : Devoir S\xE9ance 4 \u2014 InfoPlay",13),Pe("body",20,96,560,150,"c1","Bonjour Monsieur, voici mon travail sur les r\xE9seaux informatiques.",13),Pe("attach",20,256,220,34,"c7","\u{1F4CE} expose_reseaux.docx (180 Ko)",12),Pe("send",430,304,150,42,"c5","\u2709 Envoyer le message",14)],desc:{to:"Champ destinataire (\xC0) contenant l\u2019adresse e-mail de la personne qui recevra le message",subject:"Champ Objet r\xE9sumant en quelques mots le sujet du message",body:"Corps du message : grande zone de saisie pour r\xE9diger le texte complet",attach:"Pi\xE8ce jointe : fichier joint au message (document, photo, devoir)",send:"Bouton Envoyer pour exp\xE9dier le message \xE9lectronique au destinataire"}},phish:{w:600,h:360,alt:"Simulation d\u2019un faux message d\u2019alerte (hame\xE7onnage / phishing) pour apprendre \xE0 d\xE9tecter les pi\xE8ges num\xE9riques",shapes:[Pe(null,0,0,600,360,"c0"),Pe("sender",20,14,560,28,"c8","Exp\xE9diteur : securite@banque-maroc-urgence.xyz",13),Pe("subject",20,48,560,28,"c8","Objet : URGENCE : Votre compte sera suspendu sous 24h !",13),Pe("greet",20,90,300,28,"c1","Cher client / Ch\xE8re cliente,",14),Pe("urgent",20,128,560,34,"c4","\u26A0 Attention : votre compte est bloqu\xE9 suite \xE0 une activit\xE9 suspecte.",13),Pe("ask",20,172,560,34,"c1","Veuillez saisir imm\xE9diatement votre mot de passe et votre code secret.",13),Pe("link",20,230,280,40,"c3","\u{1F517} Cliquer ici pour d\xE9bloquer votre compte",13),Qp(20,310,"Ne communiquez jamais vos mots de passe par message \xE9lectronique.",12,"muted")],desc:{sender:"Adresse d\u2019exp\xE9diteur suspecte imitant une entreprise connue",subject:"Objet alarmiste utilisant l\u2019urgence et la panique pour pi\xE9ger la victime",greet:"Formule de politesse g\xE9n\xE9rique (\xAB Cher client \xBB) montrant l\u2019absence de personnalisation",urgent:"Message de pression mena\xE7ant de bloquer le compte rapidement",ask:"Demande ill\xE9gitime d\u2019informations confidentielles et secr\xE8tes",link:"Bouton ou lien trompeur menant vers un faux site pirate destin\xE9 \xE0 voler les identifiants"}}},Jh=i=>[...new Set((i.shapes||[]).filter(e=>e[0]!=="t"&&e[0]!=="defs"&&e[1]).map(e=>e[1]))];var Na=i=>String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;");function em(i){let[e]=i;if(e==="defs")return`<defs>${i[1]}</defs>`;if(e==="raw")return`<g class="reg"${i[1]?` data-r="${i[1]}"`:""}>${i[2]}</g>`;if(e==="t")return`<text class="svt ${i[5]}" x="${i[1]}" y="${i[2]}" font-size="${i[4]}">${Na(i[3])}</text>`;let t=i[1]?` data-r="${i[1]}"`:"";if(e==="r"){let[,,n,s,r,a,o,l,c]=i;return`<g class="reg"${t}><rect x="${n}" y="${s}" width="${r}" height="${a}" rx="${o==="c0"||!o?4:6}" class="sv ${o||""}"/>${l?`<text class="svt" x="${n+r/2}" y="${s+a/2}" font-size="${c||14}" text-anchor="middle" dominant-baseline="central">${Na(l)}</text>`:""}</g>`}if(e==="c"){let[,,n,s,r,a,o,l]=i;return`<g class="reg"${t}><circle cx="${n}" cy="${s}" r="${r}" class="sv ${a||""}"/>${o?`<text class="svt" x="${n}" y="${s}" font-size="${l||14}" text-anchor="middle" dominant-baseline="central">${Na(o)}</text>`:""}</g>`}if(e==="l"){let[,,n,s,r,a,o]=i;return`<g class="reg"${t}>${i[1]?`<line x1="${n}" y1="${s}" x2="${r}" y2="${a}" class="hit"/>`:""}<line x1="${n}" y1="${s}" x2="${r}" y2="${a}" class="svl ${o||""}"/></g>`}return e==="p"?`<g class="reg"${t}><path d="${i[2]}" class="sv ${i[3]||""}"/></g>`:""}function Kh(i,e){let t=e.prompts,n=t.length,s=Array(n).fill(null),r=0,a=v("p",{class:"hint-line","aria-live":"polite"}),o=v("ol",{class:"prompts"}),l,c=[],u={},h=[];if(e.scene==="lines")h=e.lines.map((p,d)=>"l"+(d+1)),u=Object.fromEntries(h.map((p,d)=>[p,"Ligne "+(d+1)])),l=v("div",{class:"codebox",role:"group","aria-label":"Programme"},e.lines.map((p,d)=>v("button",{type:"button",class:"codeline","data-r":h[d],onclick:()=>m(h[d])},v("span",{class:"ln"},d+1),v("code",null,p))));else{let p=jh[e.scene];h=Jh(p),u=p.desc;let d=Ia(`<svg viewBox="0 0 ${p.w} ${p.h}" class="scene" role="img" aria-label="${Na(p.alt)}">${p.shapes.map(em).join("")}</svg>`);d.addEventListener("click",f=>{let b=f.target.closest("[data-r]");b&&m(b.getAttribute("data-r"))}),l=v("div",{class:"figure"},d),c=h.map((f,b)=>v("button",{type:"button",class:"chip","data-z":f,onclick:()=>m(f)},`Zone ${b+1} : ${u[f]}`))}let g=p=>e.scene==="lines"?u[p]:"Zone "+(h.indexOf(p)+1);function m(p){s[r]=p,nt.play("click");let d=s.findIndex((f,b)=>f==null&&b!==r);r=d>=0?d:r,a.textContent="R\xE9ponse enregistr\xE9e : "+g(p)+".",x()}function x(){o.replaceChildren(...t.map((p,d)=>v("li",{class:d===r?"cur":""},v("button",{type:"button",class:"prompt-btn","aria-current":d===r?"step":null,onclick:()=>{r=d,nt.play("hover"),x()}},p[1]),v("span",{class:"ans"},s[d]?g(s[d]):"\u2014")))),i.querySelectorAll("[data-r]").forEach(p=>{let d=p.getAttribute("data-r");p.classList.toggle("chosen",s.includes(d)),p.classList.toggle("active",s[r]===d)})}return i.append(v("div",{class:"hot"},v("div",null,l,e.scene==="lines"?null:v("details",{class:"alt"},v("summary",null,"Liste des zones (alternative accessible)"),v("div",{class:"chips"},c))),v("div",null,v("p",{class:"muted"},"\u{1F449} Clique directement sur l\u2019\xE9l\xE9ment correspondant dans l\u2019image ci-contre."),o)),a),x(),{check(){let p=t.map((d,f)=>({ok:s[f]===d[0],msg:`${d[1]} \u2192 ${u[d[0]]||d[0]}.`+(d[2]?" "+d[2]:"")}));return{correct:p.filter(d=>d.ok).length,total:n,items:p,unanswered:s.filter(d=>d==null).length}},reveal(p){o.querySelectorAll("li").forEach((d,f)=>{d.classList.add(p.items[f].ok?"ok":"ko")})},solve(){t.forEach((p,d)=>{s[d]=p[0]}),x()}}}function Qh(i,e){let t=e.slots.length,n=Array(t).fill(null),s=null,r=new Set,a=v("p",{class:"hint-line","aria-live":"polite"}),o=v("div",{class:"tray",role:"group","aria-label":"Composants disponibles"}),l=e.slots.map((x,p)=>v("button",{type:"button",class:"slot",style:`left:${x.x}%;top:${x.y}%;width:${x.w}%;height:${x.h}%`,onclick:()=>g(p)})),c=v("div",{class:"case3d"},l),u=v("input",{type:"range",min:"-25",max:"25",value:"-12","aria-label":"Faire pivoter la vue du bo\xEEtier",oninput:()=>{c.style.transform=`rotateY(${u.value}deg) rotateX(8deg)`}});c.style.transform="rotateY(-12deg) rotateX(8deg)";let h=li(e.parts.map((x,p)=>p));function g(x){if(n[x]!=null){r.delete(n[x]),s=n[x],n[x]=null,m();return}if(s==null){a.textContent="Choisis d\u2019abord un composant dans la liste.";return}n[x]=s,r.add(s),s=null,a.textContent="",m()}function m(){o.replaceChildren(...h.filter(x=>!r.has(x)).map(x=>v("button",{type:"button",class:"chip"+(Da(e.parts[x].name)?" has-art":"")+(s===x?" sel":""),"aria-pressed":String(s===x),onclick:()=>{s=s===x?null:x,m()}},Fi(e.parts[x].name)))),o.children.length||o.append(v("em",{class:"muted"},"Tous les composants sont pos\xE9s.")),l.forEach((x,p)=>{let d=n[p];x.className="slot"+(d!=null?" filled":"")+(p===0?" base":""),x.replaceChildren(d!=null?v("span",{class:"placed"},e.parts[d].name):v("span",{class:"slot-hint"},e.slots[p].hint)),x.setAttribute("aria-label",`Emplacement ${p+1} : ${e.slots[p].hint}${d!=null?". Contient : "+e.parts[d].name:". Vide"}`)})}return i.append(v("p",{class:"muted"},"Lis l\u2019indice de chaque emplacement, choisis le composant, puis clique sur l\u2019emplacement. Le curseur fait pivoter la vue."),o,v("div",{class:"stage"},c),v("label",{class:"rot"},"Vue : ",u),a),m(),{check(){let x=e.slots.map((p,d)=>({ok:n[d]===p.part,msg:`${e.parts[p.part].name} : ${p.why}`}));return{correct:x.filter(p=>p.ok).length,total:t,items:x,unanswered:n.filter(p=>p==null).length}},reveal(x){l.forEach((p,d)=>p.classList.add(x.items[d].ok?"ok":"ko"))},solve(){e.slots.forEach((x,p)=>{n[p]=x.part,r.add(x.part)}),m()}}}function ed(i,e){let t=(p,d)=>[p,d].sort().join("~"),n=new Set(e.links.map(p=>t(p[0],p[1]))),s=new Set,r=null,a=Object.fromEntries(e.devices.map(p=>[p.id,p])),o="http://www.w3.org/2000/svg",l=document.createElementNS(o,"svg");l.setAttribute("viewBox","0 0 100 100"),l.setAttribute("preserveAspectRatio","none"),l.setAttribute("class","netlines"),l.setAttribute("aria-hidden","true");let c=v("p",{class:"hint-line","aria-live":"polite"}),u=v("ul",{class:"netlist","aria-label":"C\xE2bles branch\xE9s"}),h=e.devices.map(p=>v("button",{type:"button",class:"node",style:`left:${p.x}%;top:${p.y}%`,onclick:()=>m(p.id)},v("span",{class:"ico"},p.icon),v("span",null,p.label))),g=v("div",{class:"netboard"},l,h);function m(p){if(r==null)r=p,c.textContent=`${a[p].label} s\xE9lectionn\xE9 : choisis l\u2019\xE9quipement \xE0 relier.`;else if(r===p)r=null,c.textContent="";else{let d=t(r,p);s.has(d)?(s.delete(d),c.textContent="C\xE2ble d\xE9branch\xE9."):(s.add(d),c.textContent="C\xE2ble branch\xE9."),r=null}x()}function x(p){for(;l.firstChild;)l.removeChild(l.firstChild);for(let d of s){let[f,b]=d.split("~"),S=document.createElementNS(o,"line");S.setAttribute("x1",a[f].x),S.setAttribute("y1",a[f].y),S.setAttribute("x2",a[b].x),S.setAttribute("y2",a[b].y),S.setAttribute("class","netline"+(p?n.has(d)?" ok":" ko":"")),l.append(S)}h.forEach((d,f)=>d.classList.toggle("sel",r===e.devices[f].id)),u.replaceChildren(...[...s].map(d=>{let[f,b]=d.split("~");return v("li",null,`${a[f].label} \u2194 ${a[b].label}`)})),s.size||u.append(v("li",{class:"muted"},"Aucun c\xE2ble pour le moment."))}return i.append(v("p",{class:"muted"},"Clique sur un \xE9quipement, puis sur celui auquel tu veux le relier. Clique de nouveau sur la m\xEAme paire pour retirer le c\xE2ble."),g,c,u),x(),{check(){let p=[...s].filter(b=>!n.has(b)).length,d=e.links.map(b=>({ok:s.has(t(b[0],b[1])),msg:`${a[b[0]].label} \u2194 ${a[b[1]].label}`+(b[2]?" : "+b[2]:"")}));p&&d.push({ok:!1,info:!0,msg:`${p} c\xE2ble(s) en trop : relie seulement ce qui est n\xE9cessaire.`});let f=d.filter(b=>!b.info&&b.ok).length;return{correct:Math.max(0,f-p),total:e.links.length,items:d,unanswered:s.size?0:1}},reveal(p){x(!0)},solve(){s.clear(),e.links.forEach(p=>s.add(t(p[0],p[1]))),x()}}}var Fa=[[0,1],[1,0],[0,-1],[-1,0]];function fr(i){let e=i.map(s=>s.split("")),t,n;return e.forEach((s,r)=>s.forEach((a,o)=>{a==="S"&&(t=[r,o]),a==="G"&&(n=[r,o])})),{g:e,start:t,goal:n,H:e.length,W:e[0].length}}function pr(i,e){let[t,n]=i.start,s=0,r=[{r:t,c:n,d:s}];for(let o of e){if(o==="G")s=(s+3)%4;else if(o==="D")s=(s+1)%4;else{let l=t+Fa[s][0],c=n+Fa[s][1];if(l<0||c<0||l>=i.H||c>=i.W||i.g[l][c]==="#")return r.push({r:t,c:n,d:s,bump:!0}),{trace:r,ok:!1,reason:"Le robot heurte un obstacle ou sort de la grille."};t=l,n=c}r.push({r:t,c:n,d:s})}let a=t===i.goal[0]&&n===i.goal[1];return{trace:r,ok:a,reason:a?"Objectif atteint !":"Le robot s\u2019est arr\xEAt\xE9 trop t\xF4t ou au mauvais endroit."}}function wc(i){let e=[[i.start[0],i.start[1],0,[]]],t=new Set([i.start.join()+",0"]);for(;e.length;){let[n,s,r,a]=e.shift();if(n===i.goal[0]&&s===i.goal[1])return a;for(let o of["A","G","D"]){let l=n,c=s,u=r;if(o==="G")u=(r+3)%4;else if(o==="D")u=(r+1)%4;else if(l+=Fa[r][0],c+=Fa[r][1],l<0||c<0||l>=i.H||c>=i.W||i.g[l][c]==="#")continue;let h=`${l},${c},${u}`;t.has(h)||(t.add(h),e.push([l,c,u,[...a,o]]))}}return null}var td=["\u25B6","\u25BC","\u25C0","\u25B2"],nd={A:"Avancer",G:"Pivoter \xE0 gauche",D:"Pivoter \xE0 droite"},id={A:"\u2B06 Avancer",G:"\u27F2 Gauche",D:"\u27F3 Droite"};function Oa(i,e){let t=e.levels.map(_=>({..._,...fr(_.grid),best:wc(fr(_.grid))})),n=t.map(()=>[]),s=t.map(()=>!1),r=0,a=null,o=v("div",{class:"lvtabs",role:"tablist"}),l=v("div",{class:"rgrid"}),c=v("ol",{class:"rseq","aria-label":"Programme du robot"}),u=v("p",{class:"hint-line","aria-live":"polite"});function h(_){let w=t[r];l.style.gridTemplateColumns=`repeat(${w.W}, 1fr)`,l.replaceChildren(...w.g.flatMap((C,L)=>C.map((T,M)=>{let y=_&&_.r===L&&_.c===M;return v("div",{class:"rcell"+(T==="#"?" wall":"")+(T==="G"?" goal":""),role:"img","aria-label":T==="#"?"obstacle":T==="G"?"objectif":T==="S"?"d\xE9part":"case libre"},T==="G"?"\u2691":T==="#"?"\u25A9":"",y?v("span",{class:`bot robot-dir-${_.d}`+(_.bump?" bump":"")+(_.victory?" victory":""),"aria-label":`robot orient\xE9 ${td[_.d]}`},v("i",null,td[_.d])):null)})))}function g(){o.replaceChildren(...t.map((_,w)=>v("button",{type:"button",role:"tab","aria-selected":String(w===r),class:"tab"+(w===r?" on":"")+(s[w]?" done":""),onclick:()=>{p(),r=w,d()}},`Niveau ${w+1}`+(s[w]?" \u2714":""))))}function m(){let _=n[r];c.replaceChildren(..._.map((w,C)=>v("li",null,id[w]))),_.length||c.append(v("li",{class:"muted"},"Programme vide")),x.textContent=`${_.length} / ${t[r].max} commandes`}let x=v("span",{class:"muted"});function p(){a&&(clearInterval(a),a=null)}function d(){g(),m(),h({r:t[r].start[0],c:t[r].start[1],d:0}),u.textContent=""}function f(_){if(n[r].length>=t[r].max){u.textContent="Programme complet : retire une commande ou simplifie.";return}n[r].push(_),m()}function b(){p();let _=t[r],w=pr(_,n[r]),C=0,L=()=>{w.ok&&(s[r]=!0),u.textContent=w.reason,g()};if(Xn()){h(w.trace[w.trace.length-1]),L();return}h(w.trace[0]),a=setInterval(()=>{C++,nt.play("robot");let T=C>=w.trace.length-1,M=w.trace[Math.min(C,w.trace.length-1)];h(T&&w.ok?{...M,victory:!0}:M),T&&(p(),w.ok&&nt.play("success"),L())},380)}let S=v("div",{class:"rbar"},["A","G","D"].map(_=>v("button",{type:"button",class:"btn","aria-label":nd[_],onclick:()=>f(_)},id[_])),v("button",{type:"button",class:"btn ghost",onclick:()=>{n[r].pop(),m()}},"\u232B Retirer la derni\xE8re"),v("button",{type:"button",class:"btn ghost",onclick:()=>{n[r]=[],p(),d()}},"Tout effacer"),v("button",{type:"button",class:"btn primary",onclick:b},"\u25B6 Ex\xE9cuter"));return i.append(v("p",{class:"muted"},"Le robot d\xE9marre tourn\xE9 vers la droite (\u25B6). Construis la suite de commandes, ex\xE9cute-la autant de fois que tu veux, puis clique sur \xAB V\xE9rifier \xBB quand tu as termin\xE9."),o,v("div",{class:"rwrap"},l,v("div",null,v("h3",{class:"small-h"},"Programme"),c,x)),S,u),d(),{check(){let _=t.map((w,C)=>({ok:s[C],msg:`Niveau ${C+1} : `+(s[C]?"r\xE9ussi.":"non r\xE9ussi.")+` Une solution en ${w.best.length} commandes : ${w.best.map(L=>nd[L].toLowerCase()).join(", ")}.`}));return{correct:s.filter(Boolean).length,total:t.length,items:_,unanswered:0}},reveal(){p()},solve(){t.forEach((_,w)=>{n[w]=[..._.best],s[w]=pr(_,n[w]).ok}),d()}}}var mr=/\s*(?:(\d+(?:[.,]\d+)?)|("[^"]*"|«[^»]*»)|([A-Za-zÀ-ÿ_][\wÀ-ÿ]*)|(<=|>=|<>|[-+*\/()<>=]))/y;function tm(i){let e=[];mr.lastIndex=0;let t;for(;mr.lastIndex<i.length&&(t=mr.exec(i));)if(t[1]!==void 0)e.push({t:"num",v:parseFloat(t[1].replace(",","."))});else if(t[2]!==void 0)e.push({t:"str",v:t[2].slice(1,-1)});else if(t[3]!==void 0){let n=t[3].toLowerCase();e.push(["mod","div","et","ou","non","vrai","faux"].includes(n)?{t:"kw",v:n}:{t:"id",v:t[3]})}else e.push({t:"op",v:t[4]});if(mr.lastIndex<i.trim().length&&i.slice(mr.lastIndex).trim())throw new Error("Expression illisible : "+i);return e}function Ec(i){let e=tm(i),t=0,n=()=>e[t],s=p=>n()&&n().t==="op"&&n().v===p,r=p=>n()&&n().t==="kw"&&n().v===p;function a(){let p=o();for(;r("ou");){t++;let d=o(),f=p;p=b=>f(b)||d(b)}return p}function o(){let p=l();for(;r("et");){t++;let d=l(),f=p;p=b=>f(b)&&d(b)}return p}function l(){if(r("non")){t++;let p=l();return d=>!p(d)}return c()}function c(){let p=u(),d=n();if(d&&d.t==="op"&&["=","<>","<",">","<=",">="].includes(d.v)){t++;let f=u(),b=d.v;return S=>{let _=p(S),w=f(S);switch(b){case"=":return _===w;case"<>":return _!==w;case"<":return _<w;case">":return _>w;case"<=":return _<=w;default:return _>=w}}}return p}function u(){let p=h();for(;s("+")||s("-");){let d=e[t++].v,f=h(),b=p;p=S=>{let _=b(S),w=f(S);return d==="+"?typeof _=="string"||typeof w=="string"?gr(_)+gr(w):_+w:_-w}}return p}function h(){let p=g();for(;;){let d=n(),f=null;if(d&&d.t==="op"&&(d.v==="*"||d.v==="/"))f=d.v;else if(d&&d.t==="kw"&&(d.v==="mod"||d.v==="div"))f=d.v;else break;t++;let b=g(),S=p;p=_=>{let w=S(_),C=b(_);if((f==="/"||f==="mod"||f==="div")&&C===0)throw new Error("Division par z\xE9ro");return f==="*"?w*C:f==="/"?w/C:f==="mod"?w%C:Math.trunc(w/C)}}return p}function g(){if(s("-")){t++;let p=g();return d=>-p(d)}return m()}function m(){let p=e[t++];if(!p)throw new Error("Expression incompl\xE8te");if(p.t==="num"||p.t==="str")return()=>p.v;if(p.t==="kw"&&p.v==="vrai")return()=>!0;if(p.t==="kw"&&p.v==="faux")return()=>!1;if(p.t==="id")return d=>{if(!(p.v in d))throw new Error("La variable \xAB "+p.v+" \xBB n\u2019a pas de valeur");return d[p.v]};if(p.t==="op"&&p.v==="("){let d=a();if(!s(")"))throw new Error("Parenth\xE8se fermante manquante");return t++,d}throw new Error("Symbole inattendu : "+p.v)}let x=a();if(t<e.length)throw new Error("Expression mal form\xE9e : "+i);return x}var gr=i=>typeof i=="number"?Ui(i):i===!0?"Vrai":i===!1?"Faux":String(i),nm=/^(algorithme\b.*|variables?\b.*|constantes?\b.*|d[ée]but|fin)$/i;function im(i){let e=i.split(`
`).map(r=>r.trim()).filter(r=>r&&!nm.test(r)),t=0;function n(r){let a=[];for(;t<e.length;){let o=e[t];if(r.some(c=>c.test(o)))return a;let l;if(l=/^lire\s*\((.*)\)$/i.exec(o))a.push({t:"read",vars:l[1].split(/[,;]/).map(c=>c.trim())}),t++;else if(l=/^[ée]crire\s*\((.*)\)$/i.exec(o))a.push({t:"write",e:Ec(l[1])}),t++;else if(l=/^si\s+(.+?)\s+alors$/i.exec(o)){t++;let c=n([/^sinon$/i,/^finsi$/i]),u=[];if(e[t]&&/^sinon$/i.test(e[t])&&(t++,u=n([/^finsi$/i])),!e[t]||!/^finsi$/i.test(e[t]))throw new Error("FinSi manquant");t++,a.push({t:"if",c:Ec(l[1]),yes:c,no:u})}else if(l=/^([A-Za-zÀ-ÿ_][\wÀ-ÿ]*)\s*(?:←|<-)\s*(.+)$/.exec(o))a.push({t:"set",v:l[1],e:Ec(l[2])}),t++;else throw new Error("Instruction inconnue : "+o)}return a}let s=n([]);if(t<e.length)throw new Error("Instruction inattendue : "+e[t]);return s}function Ba(i,e=[]){let t=Object.create(null),n=[],s=0,r=0;try{let a=im(i),o=l=>{for(let c of l){if(++r>5e3)throw new Error("Trop d\u2019instructions");if(c.t==="read")for(let u of c.vars){if(s>=e.length)throw new Error("Pas assez de valeurs saisies pour Lire("+u+")");let h=e[s++],g=typeof h=="number"?h:/^-?\d+([.,]\d+)?$/.test(String(h).trim())?parseFloat(String(h).replace(",",".")):String(h);t[u]=g}else c.t==="write"?n.push(gr(c.e(t))):c.t==="set"?t[c.v]=c.e(t):c.t==="if"&&o(c.c(t)?c.yes:c.no)}};o(a)}catch(a){return{out:n,vars:t,error:a.message}}return{out:n,vars:t}}function sd(i){let e=0;return i.split(`
`).map(t=>{let n=t.trim();/^(sinon|finsi)$/i.test(n)&&(e=Math.max(0,e-1));let s="  ".repeat(e)+n;return(/^si\s.+\salors$/i.test(n)||/^sinon$/i.test(n))&&e++,s}).join(`
`)}var rd=i=>String(i).split(/[;\s]+/).filter(e=>e!==""),ad=(i,e)=>at(String(i).replace(/["«»]/g,"")).replace(",",".")===at(String(e).replace(/["«»]/g,"")).replace(",",".");function od(i,e){let t=e.mode==="run",n=e.tasks.map((r,a)=>{let o=r[0],l=v("div",{class:"ptask"}),c=v("input",{type:"text",class:"ans",autocomplete:"off","aria-label":t?`Valeurs \xE0 saisir pour le programme ${a+1}`:`R\xE9ponse ${a+1}`,placeholder:t?"ex. 12 ou 4 7":"Ta r\xE9ponse"}),u=v("output",{class:"pout","aria-live":"polite"}),h,g,m,x;return t?(m=r[1],x=r[2],l.append(v("p",null,v("b",null,`${a+1}. `),"Trouve les valeurs \xE0 saisir pour que le programme affiche ",v("code",null,String(m)),"."),v("pre",{class:"code"},sd(o)),v("div",{class:"prow"},c,v("button",{type:"button",class:"btn small",onclick:()=>{let p=Ba(o,rd(c.value).map(d=>d));u.textContent=p.error?"\u26A0 "+p.error:"Affiche : "+(p.out.join(" ; ")||"(rien)")}},"\u25B6 Tester"),u))):(g=r[1],h=r[2],l.append(v("p",null,v("b",null,`${a+1}. `),h==="out"?"Qu\u2019affiche cet algorithme ?":`Quelle est la valeur de ${h} \xE0 la fin ?`,g.length?v("span",null," Valeurs saisies au clavier : ",v("code",null,g.map(Ui).join(" ; ")),"."):null),v("pre",{class:"code"},sd(o)),v("div",{class:"prow"},c))),i.append(l),{code:o,input:c,body:l,ask:h,inputs:g,target:m,sol:x,why:r[3]}}),s=r=>{let a=Ba(r.code,r.inputs||[]);return a.error?null:r.ask==="out"?a.out[0]:gr(a.vars[r.ask])};return{check(){let r=n.map(a=>{if(t){let h=Ba(a.code,rd(a.input.value)),g=!h.error&&h.out.length>0&&ad(h.out[0],a.target);return{ok:g,msg:g?`Programme : affiche ${a.target} avec \xAB ${a.input.value} \xBB.`:`Il fallait obtenir ${a.target}`+(a.input.value?` (tes valeurs \xAB ${a.input.value} \xBB donnent : ${h.error?h.error:h.out[0]??"rien"})`:"")+`. Exemple : ${a.sol.join(" ; ")}.`+(a.why?" "+a.why:"")}}let o=s(a),l=o!=null&&a.input.value.trim()!==""&&ad(a.input.value,o),c=Ba(a.code,a.inputs),u=Object.entries(c.vars).map(([h,g])=>`${h} = ${gr(g)}`).join(", ");return{ok:l,msg:`R\xE9sultat : ${o}. Variables \xE0 la fin : ${u}.`+(a.why?" "+a.why:"")}});return{correct:r.filter(a=>a.ok).length,total:n.length,items:r,unanswered:n.filter(a=>!a.input.value.trim()).length}},reveal(r){n.forEach((a,o)=>a.body.classList.add(r.items[o].ok?"ok":"ko"))},solve(){n.forEach(r=>{r.input.value=t?r.sol.join(" "):s(r)})}}}var za=i=>String.fromCharCode(65+i),ka=/\s*(?:(\d+(?:[.,]\d+)?)|"([^"]*)"|([A-Za-z]+\d+:[A-Za-z]+\d+)|([A-Za-z]+\d+)(?![A-Za-z(\d])|([A-Za-zÀ-ÿ.]+)(?=\s*\()|([-+*\/()^;]))/y,sm={SOMME:"sum",SUM:"sum",MOYENNE:"avg",AVERAGE:"avg",MAX:"max",MIN:"min",NB:"count",COUNT:"count"};function Ha(i,e,t=[]){i=i.toUpperCase();let n=e[i];if(n==null||n==="")return"";let s=String(n).trim();if(s[0]!=="=")return/^-?\d+([.,]\d+)?$/.test(s)?parseFloat(s.replace(",",".")):s;if(t.includes(i))return"#REF!";try{return am(s.slice(1),r=>Ha(r,e,[...t,i]))}catch(r){return String(r.message).startsWith("#")?r.message:"#NOM?"}}function rm(i,e){let t=/^([A-Za-z])(\d+)$/.exec(i),n=/^([A-Za-z])(\d+)$/.exec(e);if(!t||!n)throw new Error("#REF!");let s=Math.min(t[1].toUpperCase().charCodeAt(0),n[1].toUpperCase().charCodeAt(0)),r=Math.max(t[1].toUpperCase().charCodeAt(0),n[1].toUpperCase().charCodeAt(0)),a=Math.min(+t[2],+n[2]),o=Math.max(+t[2],+n[2]),l=[];for(let c=s;c<=r;c++)for(let u=a;u<=o;u++)l.push(String.fromCharCode(c)+u);return l}function am(i,e){let t=[];ka.lastIndex=0;let n;for(;ka.lastIndex<i.length&&(n=ka.exec(i))&&(n[1]!==void 0?t.push({t:"n",v:parseFloat(n[1].replace(",","."))}):n[2]!==void 0?t.push({t:"s",v:n[2]}):n[3]!==void 0?t.push({t:"r",v:n[3].toUpperCase()}):n[4]!==void 0?t.push({t:"c",v:n[4].toUpperCase()}):n[5]!==void 0?t.push({t:"f",v:n[5].toUpperCase()}):t.push({t:"o",v:n[6]}),!!n[0]););if(i.slice(ka.lastIndex).trim())throw new Error("#NOM?");let s=0,r=x=>t[s]&&t[s].t==="o"&&t[s].v===x,a=x=>{if(x==="")return 0;if(typeof x!="number")throw typeof x=="string"&&x.startsWith("#")?new Error(x):new Error("#VALEUR!");return x};function o(){let x=l();for(;r("+")||r("-");){let p=t[s++].v,d=l();x=p==="+"?a(x)+a(d):a(x)-a(d)}return x}function l(){let x=c();for(;r("*")||r("/");){let p=t[s++].v,d=c();if(p==="*")x=a(x)*a(d);else{if(a(d)===0)throw new Error("#DIV/0!");x=a(x)/a(d)}}return x}function c(){let x=u();for(;r("^");)s++,x=Math.pow(a(x),a(u()));return x}function u(){return r("-")?(s++,-a(u())):g()}function h(){let x=[];if(!r("("))throw new Error("#NOM?");if(s++,r(")"))return s++,x;for(;;){if(t[s]&&t[s].t==="r"){let[p,d]=t[s++].v.split(":");x.push(...rm(p,d).map(e))}else x.push(o());if(r(";")){s++;continue}if(r(")"))return s++,x;throw new Error("#NOM?")}}function g(){let x=t[s++];if(!x)throw new Error("#NOM?");if(x.t==="n"||x.t==="s")return x.v;if(x.t==="c")return e(x.v);if(x.t==="f"){let p=sm[x.v];if(!p)throw new Error("#NOM?");let f=h().filter(b=>typeof b=="number");if(p==="sum")return f.reduce((b,S)=>b+S,0);if(p==="count")return f.length;if(p==="avg"){if(!f.length)throw new Error("#DIV/0!");return f.reduce((b,S)=>b+S,0)/f.length}return f.length?p==="max"?Math.max(...f):Math.min(...f):0}if(x.t==="o"&&x.v==="("){let p=o();if(!r(")"))throw new Error("#NOM?");return s++,p}throw new Error("#NOM?")}let m=o();if(s<t.length)throw new Error("#NOM?");return m}var ld={noir:"#1d1d2b",rouge:"#c0392b",bleu:"#1f4fd8",vert:"#1b7f4b"},xr=(i,e,t,n)=>v("select",{"aria-label":n,onchange:s=>t(s.target.value)},i.map(s=>v("option",{value:String(s),selected:String(s)===String(e)},String(s))));function om(i,e,t){let n=t.cfg,s=new Set(n.show||[]),r={name:"",folder:"Bureau",text:"",saved:!1,sel:"title",img:!1,table:!1,shape:!1,orient:"portrait",margins:"normales",paper:"A4",copies:1,color:"couleur",printed:!1};for(let[w,C]of Object.entries(r))e[w]??=C;for(let w of["title","para"])e[w+".b"]??=!1,e[w+".i"]??=!1,e[w+".u"]??=!1,e[w+".al"]??="gauche",e[w+".sz"]??=12,e[w+".col"]??="noir";let a=s.has("fmt")||s.has("insert"),o=(w,C,L=!0)=>{e[w]=C,L&&(e.saved=!1),e.printed=w==="printed"?C:e.printed,_()},l=v("p",{class:"hint-line","aria-live":"polite"}),c=v("div",{class:"otitle"}),u=v("div",{class:"opage"}),h=v("div",{class:"otools"}),g=null;s.has("type")&&(g=v("textarea",{class:"otext",rows:"8","aria-label":"Page du document : zone de saisie",oninput:w=>{e.text=w.target.value,e.saved=!1,c.textContent=m()}}));let m=()=>`${e.saved&&e.name?e.name:e.name||"Document1"}${e.saved?"":" *"} \u2014 Traitement de texte`,x=(w,C,L)=>v("button",{type:"button",class:"tb","aria-label":L||C,"aria-pressed":"false","data-k":w,onclick:()=>o(e.sel+"."+w,!e[e.sel+"."+w])},C);s.has("fmt")&&h.append(v("div",{class:"tgrp"},v("span",{class:"lbl"},"Texte s\xE9lectionn\xE9 :"),...["title","para"].map(w=>v("button",{type:"button",class:"tb sel-"+w,"aria-pressed":"false",onclick:()=>o("sel",w,!1)},w==="title"?"Titre":"Paragraphe")),x("b","G","Gras"),x("i","I","Italique"),x("u","S","Soulign\xE9"),...["gauche","centre","droite"].map(w=>v("button",{type:"button",class:"tb al-"+w,"aria-label":"Aligner : "+w,"aria-pressed":"false",onclick:()=>o(e.sel+".al",w)},w==="gauche"?"\u21E4":w==="centre"?"\u2194":"\u21E5")),v("label",null,"Taille ",v("select",{"aria-label":"Taille de police",class:"szsel",onchange:w=>o(e.sel+".sz",Number(w.target.value))},[10,12,14,18,24,32].map(w=>v("option",{value:w},w)))),v("label",null,"Couleur ",v("select",{"aria-label":"Couleur du texte",class:"colsel",onchange:w=>o(e.sel+".col",w.target.value)},Object.keys(ld).map(w=>v("option",{value:w},w)))))),s.has("insert")&&h.append(v("div",{class:"tgrp"},v("span",{class:"lbl"},"Insertion :"),[["img","\u{1F5BC} Image"],["table","\u25A6 Tableau"],["shape","\u2605 Forme"]].map(([w,C])=>v("button",{type:"button",class:"tb wide","aria-pressed":"false","data-ins":w,onclick:()=>o(w,!e[w])},C))));let p,d,f=s.has("save")?v("div",{class:"tgrp"},v("label",null,"Nom du fichier ",p=v("input",{type:"text",maxlength:"30",autocomplete:"off",oninput:w=>{e.name=w.target.value.replace(/[^\w.\- ]/g,""),e.saved=!1,c.textContent=m()}})),v("label",null,"Dossier ",d=v("select",{"aria-label":"Dossier d\u2019enregistrement",onchange:w=>{e.folder=w.target.value,e.saved=!1}},["Bureau","Mes documents","T\xE9l\xE9chargements"].map(w=>v("option",{value:w},w)))),v("button",{type:"button",class:"btn small",onclick:()=>{e.name.trim()?(e.saved=!0,l.textContent=`Document \xAB ${e.name} \xBB enregistr\xE9 dans ${e.folder}.`):l.textContent="Donne un nom au document avant de l\u2019enregistrer.",_()}},"\u{1F4BE} Enregistrer")):null,b=null,S=v("div",{class:"pvw"});s.has("print")&&(b=v("div",{class:"tgrp printp"},v("label",null,"Orientation ",xr(["portrait","paysage"],e.orient,w=>o("orient",w,!1),"Orientation")),v("label",null,"Format ",xr(["A4","A5","Lettre"],e.paper,w=>o("paper",w,!1),"Format du papier")),v("label",null,"Marges ",xr(["normales","\xE9troites","larges"],e.margins,w=>o("margins",w,!1),"Marges")),v("label",null,"Copies ",v("input",{type:"number",min:"1",max:"99",value:e.copies,"aria-label":"Nombre de copies",oninput:w=>{e.copies=Math.max(1,Math.min(99,Number(w.target.value)||1))}})),v("label",null,"Couleur ",xr(["couleur","noir et blanc"],e.color,w=>o("color",w,!1),"Couleur d\u2019impression")),v("button",{type:"button",class:"btn small",onclick:()=>{e.printed=!0,l.textContent=`Impression simul\xE9e : ${e.copies} copie(s), ${e.paper}, ${e.orient}, marges ${e.margins}.`,_()}},"\u{1F5A8} Imprimer"),S));function _(){if(c.textContent=m(),g&&g.value!==e.text&&(g.value=e.text),a||s.has("print")){let L=(T,M,y)=>{let P=v(M,{class:"blk "+(e.sel===T&&s.has("fmt")?"selected":""),tabindex:"0",onclick:()=>o("sel",T,!1)},y);return Object.assign(P.style,{fontWeight:e[T+".b"]?"800":"400",fontStyle:e[T+".i"]?"italic":"normal",textDecoration:e[T+".u"]?"underline":"none",textAlign:e[T+".al"]==="gauche"?"left":e[T+".al"]==="centre"?"center":"right",fontSize:e[T+".sz"]*1.3+"px",color:ld[e[T+".col"]]}),P};u.replaceChildren(L("title","h3",n.title||"F\xEAte de l\u2019\xE9cole"),L("para","p",n.para||"Rendez-vous le samedi \xE0 15 h dans la cour. Entr\xE9e libre pour toutes les familles."),e.img?v("div",{class:"imgph"},"\u{1F5BC} Image"):null,e.table?v("table",{class:"mt"},v("tbody",null,v("tr",null,v("td",null,"Heure"),v("td",null,"Activit\xE9")),v("tr",null,v("td",null,"15 h"),v("td",null,"Jeux")))):null,e.shape?v("div",{class:"shape"},"\u2605"):null)}else g&&u.replaceChildren(g);h.querySelectorAll("[data-k]").forEach(L=>L.setAttribute("aria-pressed",String(!!e[e.sel+"."+L.dataset.k]))),h.querySelectorAll("[data-ins]").forEach(L=>L.setAttribute("aria-pressed",String(!!e[L.dataset.ins]))),h.querySelectorAll(".sel-title").forEach(L=>L.setAttribute("aria-pressed",String(e.sel==="title"))),h.querySelectorAll(".sel-para").forEach(L=>L.setAttribute("aria-pressed",String(e.sel==="para"))),["gauche","centre","droite"].forEach(L=>h.querySelectorAll(".al-"+L).forEach(T=>T.setAttribute("aria-pressed",String(e[e.sel+".al"]===L))));let w=h.querySelector(".szsel");w&&(w.value=String(e[e.sel+".sz"]));let C=h.querySelector(".colsel");if(C&&(C.value=e[e.sel+".col"]),p&&p!==document.activeElement&&(p.value=e.name),d&&(d.value=e.folder),b){b.querySelectorAll("select").forEach((O,G)=>{O.value=[e.orient,e.paper,e.margins,e.color][G]});let L=b.querySelector("input[type=number]");L&&(L.value=e.copies);let T=e.orient==="paysage",M=e.margins==="\xE9troites"?4:e.margins==="larges"?22:12,y=e.paper==="A5"?.82:1;S.replaceChildren(v("div",{class:"sheetp "+(T?"land":"port"),"aria-label":`Aper\xE7u ${e.paper} ${e.orient}`},v("div",{class:"inner"},`${e.paper} \xB7 ${e.orient}`,v("br"),`marges ${e.margins}`)));let P=S.firstChild;P.style.padding=M+"px",P.style.transform=`scale(${y})`}}return i.append(v("div",{class:"office"},c,s.has("fmt")||s.has("insert")?h:null,f,b,u,l)),_(),{refresh(){p&&(p.value=e.name),_()}}}function lm(i,e,t){let n=t.cfg;e.urlInput??="",e.page??=n.start??null,e.q??="";let s=[],r=[],a=p=>at(p).replace(/^https?:\/\//,"").replace(/\/$/,""),o=p=>Object.keys(n.pages).find(d=>a(n.pages[d].url)===a(p))||null,l=v("input",{type:"text",class:"urlin","aria-label":"Barre d\u2019adresse",autocomplete:"off",placeholder:"Tape une adresse",oninput:p=>{e.urlInput=p.target.value},onkeydown:p=>{p.key==="Enter"&&g()}}),c=v("div",{class:"bpage"}),u=v("ul",{class:"blog","aria-live":"polite"}),h=(p,d=!0)=>{d&&e.page&&e.page!==p&&s.push(e.page),e.page=p,p&&n.pages[p]&&(e.urlInput=n.pages[p].url),x()};function g(){let p=o(e.urlInput),d=e.urlInput.trim()||"(vide)";r.push(`Le navigateur (client) envoie une requ\xEAte \xE0 ${d}.`),r.push(p?"Le serveur r\xE9pond : 200 OK et envoie la page.":"Le serveur r\xE9pond : 404 \u2013 page introuvable."),h(p||"404")}function m(){let p=at(e.q).split(/\s+/).filter(d=>d.length>2);e.results=Object.keys(n.pages).filter(d=>n.pages[d].kw).map(d=>({id:d,s:p.filter(f=>at(n.pages[d].kw+" "+n.pages[d].title).includes(f)).length})).filter(d=>d.s>0).sort((d,f)=>f.s-d.s).slice(0,4),r.push("Requ\xEAte envoy\xE9e au moteur de recherche : \xAB "+e.q+" \xBB."),h("results"),e.urlInput="recherche.exemple/?q="+encodeURIComponent(e.q),l.value=e.urlInput}function x(){l.value=e.urlInput;let p=e.page,d;if(!p)d=[v("p",{class:"muted"},"Page vide : tape une adresse puis clique sur \xAB Aller \xBB.")];else if(p==="404")d=[v("h3",null,"Erreur 404"),v("p",null,"Le serveur n\u2019a pas trouv\xE9 la page demand\xE9e. V\xE9rifie l\u2019adresse.")];else if(p==="results")d=[v("h3",null,"R\xE9sultats"),...e.results?.length?e.results.map(f=>v("p",null,v("button",{type:"button",class:"link",onclick:()=>h(f.id)},n.pages[f.id].title),v("br"),v("small",{class:"muted"},n.pages[f.id].url))):[v("p",null,"Aucun r\xE9sultat.")],v("p",null,v("button",{type:"button",class:"link",onclick:()=>h(n.start)},"\u2190 Nouvelle recherche"))];else{let f=n.pages[p];d=[v("h3",null,f.title),(f.body||[]).map(b=>v("p",null,b)),f.search?v("div",{class:"prow"},v("input",{type:"text","aria-label":"Mots \xE0 rechercher",value:e.q,oninput:b=>{e.q=b.target.value},onkeydown:b=>{b.key==="Enter"&&m()}}),v("button",{type:"button",class:"btn small",onclick:m},"\u{1F50D} Rechercher")):null,(f.links||[]).map(([b,S])=>v("p",null,v("button",{type:"button",class:"link",onclick:()=>h(S)},b)))]}c.replaceChildren(...d),u.replaceChildren(...r.slice(-4).map(f=>v("li",null,f)))}return i.append(v("div",{class:"browser"},v("div",{class:"bbar"},v("button",{type:"button",class:"icon-btn","aria-label":"Retour",onclick:()=>{let p=s.pop();p&&(e.page=p,n.pages[p]&&(e.urlInput=n.pages[p].url),x())}},"\u25C0"),l,v("button",{type:"button",class:"btn small",onclick:g},"Aller")),c,v("p",{class:"small-h"},"\xC9changes client \u2194 serveur"),u)),x(),{refresh:x}}function cm(i,e,t){let s=t.cfg.data;e.type??="barres",e.title??="",e.axes??=!1,e.legend??=!1,e.answer??="";let r=v("div",{class:"chartfig"}),a=v("h4",{class:"ctitle"}),o=Math.max(...s.map(p=>p[1])),l=["c5","c4","c2","c6","c3"];function c(){a.textContent=e.title||"(sans titre)";let p="";if(e.type==="barres")s.forEach(([d,f],b)=>{let S=f/o*150;p+=`<rect class="sv ${l[b%5]}" x="${60+b*62}" y="${190-S}" width="44" height="${S}"/><text class="svt" x="${82+b*62}" y="${184-S}" font-size="12" text-anchor="middle">${f}</text>`});else if(e.type==="courbe"){let d=s.map(([,f],b)=>[70+b*62,190-f/o*150]);p+=`<polyline class="svl thick" fill="none" points="${d.map(f=>f.join(",")).join(" ")}"/>`+d.map(f=>`<circle class="sv c4" cx="${f[0]}" cy="${f[1]}" r="5"/>`).join("")}else{let d=s.reduce((b,S)=>b+S[1],0),f=-Math.PI/2;s.forEach(([,b],S)=>{let _=f+b/d*2*Math.PI,w=y=>[190+85*Math.cos(y),105+85*Math.sin(y)],[C,L]=w(f),[T,M]=w(_);p+=`<path class="sv ${l[S%5]}" d="M190 105 L${C.toFixed(1)} ${L.toFixed(1)} A85 85 0 ${_-f>Math.PI?1:0} 1 ${T.toFixed(1)} ${M.toFixed(1)} Z"/>`,f=_})}e.type!=="circulaire"?(p+=`<line class="svl" x1="48" y1="190" x2="${60+s.length*62}" y2="190"/><line class="svl" x1="48" y1="190" x2="48" y2="30"/>`,s.forEach(([d],f)=>{p+=`<text class="svt" x="${(e.type==="barres"?82:70)+f*62}" y="206" font-size="11" text-anchor="middle">${d}</text>`}),e.axes&&(p+=`<text class="svt" x="${60+s.length*31}" y="226" font-size="12" text-anchor="middle">Mati\xE8res</text><text class="svt" transform="translate(14 110) rotate(-90)" font-size="12" text-anchor="middle">Moyenne /20</text>`)):e.legend,e.legend&&(p+=s.map(([d],f)=>`<rect class="sv ${l[f%5]}" x="${e.type==="circulaire"?300:340}" y="${40+f*20}" width="12" height="12"/><text class="svt" x="${(e.type==="circulaire"?300:340)+18}" y="${50+f*20}" font-size="12">${d}</text>`).join("")),r.replaceChildren(Ia(`<svg viewBox="0 0 440 240" class="chart" role="img" aria-label="Graphique de type ${e.type} avec les moyennes par mati\xE8re">${p}</svg>`))}let u=v("input",{type:"text",maxlength:"60","aria-label":"Titre du graphique",placeholder:"Titre du graphique",oninput:p=>{e.title=p.target.value,c()}}),h=xr(["barres","courbe","circulaire"],e.type,p=>{e.type=p,c()},"Type de graphique"),g=v("select",{"aria-label":"Interpr\xE9tation",onchange:p=>{e.answer=p.target.value}},v("option",{value:""},"\u2014 choisir \u2014"),s.map(([p])=>v("option",{value:p},p))),m=v("input",{type:"checkbox",onchange:p=>{e.axes=p.target.checked,c()}}),x=v("input",{type:"checkbox",onchange:p=>{e.legend=p.target.checked,c()}});return i.append(v("div",{class:"chartbox"},v("table",{class:"mt"},v("thead",null,v("tr",null,v("th",null,"Mati\xE8re"),v("th",null,"Moyenne"))),v("tbody",null,s.map(([p,d])=>v("tr",null,v("td",null,p),v("td",null,d))))),v("div",{class:"ctl"},v("label",null,"Type : ",h),v("label",null,"Titre : ",u),v("label",{class:"chk"},m," Titres des axes"),v("label",{class:"chk"},x," L\xE9gende"),v("label",null,"La meilleure moyenne est en : ",g)),a,r)),c(),{refresh(){h.value=e.type,u.value=e.title,m.checked=e.axes,x.checked=e.legend,g.value=e.answer,c()}}}function um(i,e,t){let n=0,s=(T,M)=>{let y={id:++n,name:T.n,dir:!!T.k,kids:[],parent:M};return T.k&&(y.kids=T.k.map(P=>s(P,y))),y},r=s(t.cfg.tree,null),a=[],o=r,l=null,c=null,u=T=>{let M=r;if(!T)return M;for(let y of T.split("/"))if(M=M.kids.find(P=>at(P.name)===at(y)),!M)return null;return M},h=(T,M)=>{let y=M,P=1;for(;T.kids.some(O=>at(O.name)===at(y));)y=M+" ("+ ++P+")";return y},g=(T,M)=>{let y={id:++n,name:h(M,T.name),dir:T.dir,kids:[],parent:M};return y.kids=T.kids.map(P=>g(P,y)),y},m={find:u,inBin:T=>a.some(M=>at(M.n.name)===at(T)),mkdir(T,M){let y=u(T);return!y||!y.dir||!M.trim()?!1:(y.kids.push({id:++n,name:h(y,M.trim()),dir:!0,kids:[],parent:y}),_(),!0)},rename(T,M){let y=u(T);return!y||!y.parent||!M.trim()?!1:(y.name=h({kids:y.parent.kids.filter(P=>P!==y)},M.trim()),_(),!0)},copy(T,M){let y=u(T),P=u(M);return!y||!P||!P.dir?!1:(P.kids.push(g(y,P)),_(),!0)},move(T,M){let y=u(T),P=u(M);return!y||!P||!P.dir||!y.parent||P===y?!1:(y.parent.kids=y.parent.kids.filter(O=>O!==y),y.name=h(P,y.name),y.parent=P,P.kids.push(y),_(),!0)},remove(T){let M=u(T);return!M||!M.parent?!1:(M.parent.kids=M.parent.kids.filter(y=>y!==M),a.push({n:M,from:M.parent}),_(),!0)},restore(T){let M=a.findIndex(P=>at(P.n.name)===at(T));if(M<0)return!1;let[y]=a.splice(M,1);return y.n.name=h(y.from,y.n.name),y.from.kids.push(y.n),y.n.parent=y.from,_(),!0}},x=T=>{let M=[];for(;T&&T.parent;)M.unshift(T.name),T=T.parent;return M.join("/")},p=v("div",{class:"fslist",role:"tree","aria-label":"Explorateur de fichiers (simulation)"}),d=v("input",{type:"text",maxlength:"30","aria-label":"Nom du dossier ou du fichier",placeholder:"Nom\u2026"}),f=v("p",{class:"hint-line","aria-live":"polite"}),b=(T,M,y)=>v("button",{type:"button",role:"treeitem",class:"fsrow"+((y?l===T:o===T&&!l)?" on":""),style:`padding-left:${10+M*20}px`,onclick:()=>{y?l=T:(o=T,l=null),f.textContent="",_()}},(T.dir?"\u{1F4C1} ":"\u{1F4C4} ")+T.name);function S(T,M,y){y.push(b(T,M,!1)),T.kids.forEach(P=>S(P,M+1,y))}function _(){let T=[];S(r,0,T),T.push(v("div",{class:"fsbin"},"\u{1F5D1} Corbeille",a.length?"":" (vide)")),a.forEach(M=>T.push(b(M.n,1,!0))),p.replaceChildren(...T)}let w=()=>l||!o.parent?(f.textContent="S\xE9lectionne d\u2019abord un fichier ou un dossier (pas le dossier racine).",!1):!0,C=(T,M)=>v("button",{type:"button",class:"btn small",onclick:M},T),L=()=>o.dir?o:o.parent;return i.append(v("div",{class:"fsbox"},v("div",{class:"fsbar"},d,C("\u{1F4C1} Nouveau dossier",()=>{if(!d.value.trim()){f.textContent="\xC9cris un nom dans la case.";return}if(l)return;let T=L();T.kids.push({id:++n,name:h(T,d.value.trim()),dir:!0,kids:[],parent:T}),d.value="",_()}),C("\u270F Renommer",()=>{if(!w()||!d.value.trim()){d.value.trim()||(f.textContent="\xC9cris le nouveau nom dans la case.");return}m.rename(x(o),d.value),d.value=""}),C("\u29C9 Copier",()=>{w()&&(c={n:o,cut:!1},f.textContent=`\xAB ${o.name} \xBB copi\xE9.`)}),C("\u2702 Couper",()=>{w()&&(c={n:o,cut:!0},f.textContent=`\xAB ${o.name} \xBB coup\xE9.`)}),C("\u{1F4CB} Coller",()=>{if(!c){f.textContent="Rien \xE0 coller : copie ou coupe d\u2019abord un \xE9l\xE9ment.";return}let T=L();c.cut?(c.n.parent&&T!==c.n&&m.move(x(c.n),x(T)),c=null):T.kids.push(g(c.n,T)),_()}),C("\u{1F5D1} Supprimer",()=>{w()&&(m.remove(x(o)),o=r)}),C("\u21A9 Restaurer",()=>{if(!l){f.textContent="S\xE9lectionne un \xE9l\xE9ment dans la corbeille.";return}m.restore(l.name),l=null})),p,f)),_(),{...m,refresh:_}}function hm(i,e,t){let n=t.cfg,s=n.rows||6,r=n.cols||5,a={...n.init||{}},o={},l=p=>{let d=Ha(p,a);return typeof d=="number"?Ui(Math.round(d*1e6)/1e6):String(d)},c=v("output",{class:"fbarv","aria-live":"off"},""),u=v("output",{class:"namebox"},"A1"),h=()=>{for(let p in o)document.activeElement!==o[p]&&(o[p].value=l(p))},g=v("tr",null,v("th",null),...Array.from({length:r},(p,d)=>v("th",null,za(d)))),m=Array.from({length:s},(p,d)=>v("tr",null,v("th",null,d+1),...Array.from({length:r},(f,b)=>{let S=za(b)+(d+1),_=v("input",{type:"text",autocomplete:"off","aria-label":"Cellule "+S,spellcheck:"false"});return o[S]=_,_.addEventListener("focus",()=>{_.value=a[S]??"",u.textContent=S,c.textContent=a[S]??""}),_.addEventListener("input",()=>{c.textContent=_.value}),_.addEventListener("blur",()=>{a[S]=_.value,h()}),_.addEventListener("keydown",w=>{if(w.key==="Enter"){a[S]=_.value,h();let C=o[za(b)+(d+2)];C?C.focus():_.blur()}}),v("td",null,_)})));i.append(v("div",{class:"sheetbox"},v("p",{class:"muted"},"Tableur simplifi\xE9 : commence une formule par =, \xE9cris les fonctions en fran\xE7ais (SOMME, MOYENNE, MAX, MIN) et s\xE9pare les arguments par un point\u2011virgule ; (ex. =SOMME(B2:B4)). Valide avec Entr\xE9e."),v("div",{class:"fx"},u,v("span",{"aria-hidden":"true"},"\u0192x"),c),v("div",{class:"tablewrap"},v("table",{class:"grid"},v("thead",null,g),v("tbody",null,m))))),h();let x=p=>typeof p=="string"?at(p):p;return{refresh:h,checkCell(p){let d=p.c.toUpperCase();document.activeElement===o[d]&&(a[d]=o[d].value);let f=Ha(d,a),b=String(a[d]??"").trim();return(typeof p.v=="number"?typeof f=="number"&&Math.abs(f-p.v)<1e-9:x(f)===x(p.v))&&(!p.f||b.startsWith("="))},solveCell(p){a[p.c.toUpperCase()]=p.f?p.f:String(p.v),h()}}}var cd={office:om,browser:lm,chart:cm,fs:um,sheet:hm};var ud=/^[~=^]/;function dm(i,e){if(typeof i=="string"&&ud.test(i)){let t=i[0],n=i.slice(1),s=String(e??"");return t==="~"?at(s).includes(at(n)):t==="="?at(s)===at(n):s.includes(n)}return typeof i=="number"?Number(String(e??"").replace(",","."))===i:e===i}var fm=i=>typeof i=="string"&&ud.test(i)?i.slice(1):i;function pm(i,e,t){return typeof i=="function"?!!i(e,t):i&&i.c?t.checkCell(i):Object.entries(i).every(([n,s])=>dm(s,e[n]))}var mm={calc(i,e){e.a??=null,e.b??=null;let t=v("input",{type:"number",step:"any","aria-label":"Premier nombre",oninput:c=>o("a",c.target.value)}),n=v("input",{type:"number",step:"any","aria-label":"Deuxi\xE8me nombre",oninput:c=>o("b",c.target.value)}),s=v("p",{class:"hint-line","aria-live":"polite"}),r=v("output",{class:"screen"}),a=v("output",{class:"disk"});function o(c,u){e[c]=u===""?null:Number(u),e.calc=!1,e.shown=!1,e.saved=!1,l()}function l(){e.calc&&(e.res=e.a+e.b),r.textContent=e.shown?Ui(e.res):"\u2026",a.textContent=e.saved?"\u{1F4BE} somme.txt enregistr\xE9":"\u{1F4BE} (rien d\u2019enregistr\xE9)"}return i.append(v("div",{class:"flow"},v("div",{class:"blk"},v("h4",null,"\u2328 Entr\xE9e"),v("label",null,"Nombre 1 ",t),v("label",null,"Nombre 2 ",n)),v("div",{class:"arrow","aria-hidden":"true"},"\u2192"),v("div",{class:"blk"},v("h4",null,"\u2699 Traitement"),v("button",{type:"button",class:"btn small",onclick:()=>{e.a==null||e.b==null?s.textContent="Il faut d\u2019abord saisir les deux nombres.":(e.calc=!0,e.shown=!1,e.saved=!1,s.textContent="Somme calcul\xE9e dans le processeur."),l()}},"Additionner")),v("div",{class:"arrow","aria-hidden":"true"},"\u2192"),v("div",{class:"blk"},v("h4",null,"\u{1F5A5} Sortie"),r,v("button",{type:"button",class:"btn small",onclick:()=>{e.calc?(e.shown=!0,s.textContent=""):s.textContent="Rien \xE0 afficher : le traitement n\u2019a pas encore \xE9t\xE9 fait.",l()}},"Afficher")),v("div",{class:"blk"},v("h4",null,"\u{1F4BD} Stockage"),a,v("button",{type:"button",class:"btn small",onclick:()=>{e.calc?(e.saved=!0,s.textContent=""):s.textContent="Il n\u2019y a pas encore de r\xE9sultat \xE0 conserver.",l()}},"Enregistrer"))),s),l(),{refresh(){t.value=e.a??"",n.value=e.b??"",l()}}},window(i,e){e.state??="normal";let t=v("div",{class:"desk"}),n=v("div",{class:"tbar"}),s=a=>{e.state=a,r()};function r(){let a=e.state,o=v("div",{class:"mwin "+a,role:"group","aria-label":"Fen\xEAtre de d\xE9monstration"},v("div",{class:"mtitle"},v("span",null,"\u{1F4C4} Mon document"),v("span",{class:"mbtns"},v("button",{type:"button","aria-label":"R\xE9duire",onclick:()=>s("min")},"\u2013"),v("button",{type:"button","aria-label":a==="max"?"Restaurer":"Agrandir",onclick:()=>s(a==="max"?"normal":"max")},a==="max"?"\u2750":"\u25A1"),v("button",{type:"button","aria-label":"Fermer",class:"x",onclick:()=>s("closed")},"\u2715"))),v("div",{class:"mbody"},"Contenu du document\u2026"));t.replaceChildren(a==="closed"?v("div",{class:"closedmsg"},"La fen\xEAtre est ferm\xE9e.",v("button",{type:"button",class:"btn small",onclick:()=>s("normal")},"Rouvrir")):a==="min"?v("div",{class:"closedmsg"},"La fen\xEAtre est r\xE9duite : le programme continue dans la barre des t\xE2ches."):o),n.replaceChildren(v("span",{class:"start"},"\u229E"),a==="closed"?null:v("button",{type:"button",class:"tbtn"+(a!=="min"?" on":""),onclick:()=>s(a==="min"?"normal":"min")},"\u{1F4C4} Mon document"),v("span",{class:"clock"},"14:30"))}return i.append(t,n),r(),{refresh:r}},vending(i,e,t){let n=t.cfg.items;n.forEach(([l])=>{e[l]??=0}),e.total??=null;let s={},r=v("input",{type:"number",step:"any","aria-label":"Total \xE0 payer en dirhams",oninput:l=>{e.total=l.target.value===""?null:Number(l.target.value)}}),a=n.map(([l,c,u,h])=>(s[l]=v("output",{class:"count"},"0"),v("div",{class:"vrow"},v("span",{class:"ico"},h),v("span",{class:"lbl"},`${c} \u2014 ${u} DH`),v("button",{type:"button",class:"icon-btn","aria-label":`Retirer un ${c}`,onclick:()=>{e[l]=Math.max(0,e[l]-1),o()}},"\u2212"),s[l],v("button",{type:"button",class:"icon-btn","aria-label":`Ajouter un ${c}`,onclick:()=>{e[l]++,o()}},"+")))),o=()=>n.forEach(([l])=>{s[l].textContent=e[l]});return i.append(v("div",{class:"vend"},v("div",{class:"activity-hero vending-hero",role:"img","aria-label":"Illustration d\u2019un distributeur scolaire"}),a,v("label",{class:"vtot"},"Total \xE0 payer (DH) : ",r))),o(),{refresh(){o(),r.value=e.total??""}}},toggles(i,e,t){let n=t.cfg,s={},r=v("ul",{class:"status","aria-live":"polite"}),a=()=>{n.derive&&n.derive(e)},o=()=>{a();for(let[l]of n.items)s[l].checked=!!e[l];r.replaceChildren(...n.status(e).map(([l,c])=>v("li",{class:c?"ok":"ko"},(c?"\u2714 ":"\u2716 ")+l)))};return i.append(v("div",{class:"tgl"},n.items.map(([l,c,u])=>(s[l]=v("input",{type:"checkbox",onchange:h=>{e[l]=h.target.checked,o()}}),v("label",{class:"sw"},s[l],v("span",{class:"ico"},u),v("span",null,c))))),v("h4",{class:"small-h"},"\xC9tat du r\xE9seau"),r),o(),{refresh:o}},mail(i,e){e.to??="",e.subject??="",e.body??="",e.att??=!1,e.sent??=!1;let t=(u,h,g)=>(g.setAttribute("aria-label",h),g.addEventListener("input",m=>{e[u]=m.target.value,e.sent=!1,c()}),v("label",{class:"mrow"},v("span",null,h),g)),n=v("input",{type:"text",autocomplete:"off",placeholder:"adresse@ecole.exemple"}),s=v("input",{type:"text",autocomplete:"off"}),r=v("textarea",{rows:"5"}),a=v("p",{class:"hint-line","aria-live":"polite"}),o=v("button",{type:"button",class:"btn ghost small","aria-pressed":"false",onclick:()=>{e.att=!e.att,e.sent=!1,c()}}),l=v("button",{type:"button",class:"btn primary",onclick:()=>{e.to.trim()?e.subject.trim()?(e.sent=!0,a.textContent="Message simul\xE9 \xAB envoy\xE9 \xBB : rien n\u2019a quitt\xE9 cet ordinateur."):a.textContent="\xC9cris un objet pour que le destinataire comprenne le sujet.":a.textContent="Il manque l\u2019adresse du destinataire.",c()}},"\u2709 Envoyer");function c(){o.textContent=e.att?"\u{1F4CE} devoir.docx joint (retirer)":"\u{1F4CE} Joindre devoir.docx",o.setAttribute("aria-pressed",String(e.att))}return i.append(v("div",{class:"mailbox"},v("p",{class:"muted"},"Simulation : aucun message r\xE9el n\u2019est envoy\xE9 et aucune adresse r\xE9elle n\u2019est utilis\xE9e."),t("to","\xC0 (destinataire)",n),t("subject","Objet",s),t("body","Message",r),o,l,a)),c(),{refresh(){n.value=e.to,s.value=e.subject,r.value=e.body,c()}}},...cd};function hd(i,e){let t=JSON.parse(JSON.stringify(e.cfg?.init||{})),n=v("div",{class:"sim sim-"+e.view}),s=e.tasks.length,r=0,a=[],o=mm[e.view](n,t,{cfg:e.cfg||{}}),l=v("div",{class:"taskbox","aria-live":"polite"}),c=v("ul",{class:"steplog"}),u=v("button",{type:"button",class:"btn primary",onclick:g},"Valider l\u2019\xE9tape");function h(){l.replaceChildren(v("p",{class:"step-h"},r<s?`\xC9tape ${r+1} sur ${s}`:"Termin\xE9"),v("p",{class:"step-t"},r<s?e.tasks[r][0]:"Toutes les \xE9tapes sont faites : clique sur \xAB V\xE9rifier \xBB."),r<s?u:null)}function g(){if(r>=s)return;let m=e.tasks[r],x=pm(m[1],t,o);a.push({ok:x,msg:m[0]+(m[2]?" \u2014 "+m[2]:"")}),c.append(v("li",{class:x?"ok":"ko"},(x?"\u2714 R\xE9ussi. ":"\u2716 Pas encore tout \xE0 fait. ")+(m[2]||""))),r++,h()}return i.append(l,n,c),h(),{check(){return r<s?{incomplete:`Valide d\u2019abord les ${s-r} \xE9tape(s) restante(s) de la simulation.`}:{correct:a.filter(m=>m.ok).length,total:s,items:a,unanswered:0}},reveal(){u.disabled=!0},solve(){for(;r<s;){let m=e.tasks[r],x=m[3];if(typeof x=="function")x(t,o);else if(x&&typeof x=="object")Object.assign(t,x);else if(typeof m[1]!="function")if(m[1].c)o.solveCell(m[1]);else for(let[p,d]of Object.entries(m[1]))t[p]=fm(d);o.refresh&&o.refresh(),g()}}}}var gm={match:qh,sort:Wh,order:Xh,fill:$h,quiz:Yh,hot:Kh,asm:Qh,net:ed,robot:Oa,prog:od,sim:hd},Tc=i=>gm[i.split(":")[0]];function dd(i,e){if(!e||e<=0)return 0;let t=Math.round(Math.max(0,i)/e*5*10)/10;return Math.min(5,Math.max(0,t))}function fd(i){return i>=16?{label:"Tr\xE8s bien",tone:"top"}:i>=12?{label:"Bien",tone:"good"}:i>=10?{label:"En cours d\u2019acquisition",tone:"mid"}:{label:"\xC0 renforcer",tone:"low"}}var vr=i=>Math.round(i*10)/10,rn=i=>String(vr(i)).replace(".",",");function Oi(i,e){let t=0,n=0,s=0,r=0;for(let o of i.acts){let l=e(o.id)?.attempts||[];l.length&&(s++,t+=l[0].score,n+=Math.max(...l.map(c=>c.score)),r+=l.length)}let a=i.acts.length;return{first:vr(t),best:vr(n),done:s,n:a,tries:r,status:s===0?"todo":s===a?"done":"doing",max:a*5}}function hi(i,e){let t=0,n=0,s=0,r=0,a=0;for(let o of i.sessions){let l=Oi(o,e);t+=l.best,n+=l.first,s+=l.done,r+=l.n,l.status==="done"&&a++}return{best:vr(t),first:vr(n),done:s,n:r,max:r*5,pct:r?Math.round(s/r*100):0,sessionsDone:a}}var Ei={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jd=0,pu=1,Kd=2;var mu=1,Zs=2,Gn=3,ei=0,qt=1,en=2,Dn=0,Gi=1,Ai=2,gu=3,xu=4,Qd=5,_i=100,ef=101,tf=102,nf=103,sf=104,rf=200,af=201,of=202,lf=203,_o=204,yo=205,cf=206,uf=207,hf=208,df=209,ff=210,pf=211,mf=212,gf=213,xf=214,Qo=0,el=1,tl=2,qi=3,nl=4,il=5,sl=6,rl=7,vu=0,vf=1,_f=2,si=0,al=1,ol=2,ll=3,Ci=4,cl=5,ul=6,hl=7;var _u=300,is=301,ss=302,dl=303,fl=304,pa=306,Ds=1e3,vi=1001,bo=1002,an=1003,yf=1004;var ma=1005;var In=1006,pl=1007;var Ri=1008;var Un=1009,yu=1010,bu=1011,js=1012,ml=1013,Ii=1014,Nn=1015,Mn=1016,gl=1017,xl=1018,Js=1020,Mu=35902,Su=35899,wu=1021,Eu=1022,Sn=1023,Us=1026,Ks=1027,vl=1028,_l=1029,Tu=1030,yl=1031;var bl=1033,ga=33776,xa=33777,va=33778,_a=33779,Ml=35840,Sl=35841,wl=35842,El=35843,Tl=36196,Al=37492,Cl=37496,Rl=37808,Il=37809,Pl=37810,Ll=37811,Dl=37812,Ul=37813,Nl=37814,Fl=37815,Ol=37816,Bl=37817,kl=37818,zl=37819,Hl=37820,Vl=37821,Gl=36492,ql=36494,Wl=36495,Xl=36283,$l=36284,Yl=36285,Zl=36286;var Nr=2300,Mo=2301,vo=2302,tu=2400,nu=2401,iu=2402;var bf=3200,Mf=3201;var Au=0,Sf=1,ri="",Nt="srgb",Wi="srgb-linear",Fr="linear",it="srgb";var Vi=7680;var su=519,wf=512,Ef=513,Tf=514,Cu=515,Af=516,Cf=517,Rf=518,If=519,So=35044;var Ru="300 es",Rn=2e3,Or=2001;var zn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pd=1234567,Pr=Math.PI/180,Ns=180/Math.PI;function kn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function Iu(i,e){return(i%e+e)%e}function xm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function vm(i,e,t){return i!==e?(t-i)/(e-i):0}function Lr(i,e,t){return(1-t)*i+t*e}function _m(i,e,t,n){return Lr(i,e,1-Math.exp(-t*n))}function ym(i,e=1){return e-Math.abs(Iu(i,e*2)-e)}function bm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Mm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Sm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function wm(i,e){return i+Math.random()*(e-i)}function Em(i){return i*(.5-Math.random())}function Tm(i){i!==void 0&&(pd=i);let e=pd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Am(i){return i*Pr}function Cm(i){return i*Ns}function Rm(i){return(i&i-1)===0&&i!==0}function Im(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Lm(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),g=a((e-n)/2),m=r((n-e)/2),x=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*h,l*g,o*c);break;case"YZY":i.set(l*g,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*g,o*u,o*c);break;case"XZX":i.set(o*u,l*x,l*m,o*c);break;case"YXY":i.set(l*m,o*u,l*x,o*c);break;case"ZYZ":i.set(l*x,l*m,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Pu={DEG2RAD:Pr,RAD2DEG:Ns,generateUUID:kn,clamp:$e,euclideanModulo:Iu,mapLinear:xm,inverseLerp:vm,lerp:Lr,damp:_m,pingpong:ym,smoothstep:bm,smootherstep:Mm,randInt:Sm,randFloat:wm,randFloatSpread:Em,seededRandom:Tm,degToRad:Am,radToDeg:Cm,isPowerOfTwo:Rm,ceilPowerOfTwo:Im,floorPowerOfTwo:Pm,setQuaternionFromProperEuler:Lm,normalize:lt,denormalize:Cn},ne=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},bn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],g=r[a+0],m=r[a+1],x=r[a+2],p=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=g,e[t+1]=m,e[t+2]=x,e[t+3]=p;return}if(h!==p||l!==g||c!==m||u!==x){let d=1-o,f=l*g+c*m+u*x+h*p,b=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){let w=Math.sqrt(S),C=Math.atan2(w,f*b);d=Math.sin(d*C)/w,o=Math.sin(o*C)/w}let _=o*b;if(l=l*d+g*_,c=c*d+m*_,u=u*d+x*_,h=h*d+p*_,d===1-o){let w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],g=r[a+1],m=r[a+2],x=r[a+3];return e[t]=o*x+u*h+l*m-c*g,e[t+1]=l*x+u*g+c*h-o*m,e[t+2]=c*x+u*m+o*g-l*h,e[t+3]=u*x-o*h-l*g-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),g=l(n/2),m=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=g*u*h+c*m*x,this._y=c*m*h-g*u*x,this._z=c*u*x+g*m*h,this._w=c*u*h-g*m*x;break;case"YXZ":this._x=g*u*h+c*m*x,this._y=c*m*h-g*u*x,this._z=c*u*x-g*m*h,this._w=c*u*h+g*m*x;break;case"ZXY":this._x=g*u*h-c*m*x,this._y=c*m*h+g*u*x,this._z=c*u*x+g*m*h,this._w=c*u*h-g*m*x;break;case"ZYX":this._x=g*u*h-c*m*x,this._y=c*m*h+g*u*x,this._z=c*u*x-g*m*h,this._w=c*u*h+g*m*x;break;case"YZX":this._x=g*u*h+c*m*x,this._y=c*m*h+g*u*x,this._z=c*u*x-g*m*h,this._w=c*u*h-g*m*x;break;case"XZY":this._x=g*u*h-c*m*x,this._y=c*m*h-g*u*x,this._z=c*u*x+g*m*h,this._w=c*u*h+g*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],g=n+o+h;if(g>0){let m=.5/Math.sqrt(g+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>h){let m=2*Math.sqrt(1+n-o-h);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>h){let m=2*Math.sqrt(1+o-n-h);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{let m=2*Math.sqrt(1+h-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,g=Math.sin(t*u)/c;return this._w=a*h+this._w*g,this._x=n*h+this._x*g,this._y=s*h+this._y*g,this._z=r*h+this._z*g,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(md.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(md.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ac.copy(this).projectOnVector(e),this.sub(Ac)}reflect(e){return this.sub(Ac.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ac=new D,md=new bn,We=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],g=n[2],m=n[5],x=n[8],p=s[0],d=s[3],f=s[6],b=s[1],S=s[4],_=s[7],w=s[2],C=s[5],L=s[8];return r[0]=a*p+o*b+l*w,r[3]=a*d+o*S+l*C,r[6]=a*f+o*_+l*L,r[1]=c*p+u*b+h*w,r[4]=c*d+u*S+h*C,r[7]=c*f+u*_+h*L,r[2]=g*p+m*b+x*w,r[5]=g*d+m*S+x*C,r[8]=g*f+m*_+x*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,g=o*l-u*r,m=c*r-a*l,x=t*h+n*g+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let p=1/x;return e[0]=h*p,e[1]=(s*c-u*n)*p,e[2]=(o*n-s*a)*p,e[3]=g*p,e[4]=(u*t-s*l)*p,e[5]=(s*r-o*t)*p,e[6]=m*p,e[7]=(n*l-c*t)*p,e[8]=(a*t-n*r)*p,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Cc.makeScale(e,t)),this}rotate(e){return this.premultiply(Cc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Cc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Cc=new We;function Lu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pf(){let i=Br("canvas");return i.style.display="block",i}var gd={};function Fs(i){i in gd||(gd[i]=!0,console.warn(i))}function Lf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var xd=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vd=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dm(){let i={enabled:!0,workingColorSpace:Wi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===it&&(s.r=Qn(s.r),s.g=Qn(s.g),s.b=Qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===it&&(s.r=Ls(s.r),s.g=Ls(s.g),s.b=Ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?Fr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Fs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Fs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wi]:{primaries:e,whitePoint:n,transfer:Fr,toXYZ:xd,fromXYZ:vd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:xd,fromXYZ:vd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),i}var Qe=Dm();function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ms,wo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ms===void 0&&(ms=Br("canvas")),ms.width=e.width,ms.height=e.height;let s=ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Br("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Qn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qn(t[n]/255)*255):t[n]=Qn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Um=0,Os=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Rc(s[a].image)):r.push(Rc(s[a]))}else r=Rc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Rc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Nm=0,Ic=new D,Qt=class i extends zn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=vi,s=vi,r=In,a=Ri,o=Sn,l=Un,c=i.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=kn(),this.name="",this.source=new Os(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ic).x}get height(){return this.source.getSize(Ic).y}get depth(){return this.source.getSize(Ic).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_u)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ds:e.x=e.x-Math.floor(e.x);break;case vi:e.x=e.x<0?0:1;break;case bo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ds:e.y=e.y-Math.floor(e.y);break;case vi:e.y=e.y<0?0:1;break;case bo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=_u;Qt.DEFAULT_ANISOTROPY=1;var ct=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],g=l[1],m=l[5],x=l[9],p=l[2],d=l[6],f=l[10];if(Math.abs(u-g)<.01&&Math.abs(h-p)<.01&&Math.abs(x-d)<.01){if(Math.abs(u+g)<.1&&Math.abs(h+p)<.1&&Math.abs(x+d)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(c+1)/2,_=(m+1)/2,w=(f+1)/2,C=(u+g)/4,L=(h+p)/4,T=(x+d)/4;return S>_&&S>w?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=C/n,r=L/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=C/s,r=T/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=L/r,s=T/r),this.set(n,s,r,t),this}let b=Math.sqrt((d-x)*(d-x)+(h-p)*(h-p)+(g-u)*(g-u));return Math.abs(b)<.001&&(b=1),this.x=(d-x)/b,this.y=(h-p)/b,this.z=(g-u)/b,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Eo=class extends zn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Qt(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:In,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Os(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yt=class extends Eo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},kr=class extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var To=class extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hn=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(r,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Va.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Va.copy(n.boundingBox)),Va.applyMatrix4(e.matrixWorld),this.union(Va)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_r),Ga.subVectors(this.max,_r),gs.subVectors(e.a,_r),xs.subVectors(e.b,_r),vs.subVectors(e.c,_r),di.subVectors(xs,gs),fi.subVectors(vs,xs),Bi.subVectors(gs,vs);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Bi.z,Bi.y,di.z,0,-di.x,fi.z,0,-fi.x,Bi.z,0,-Bi.x,-di.y,di.x,0,-fi.y,fi.x,0,-Bi.y,Bi.x,0];return!Pc(t,gs,xs,vs,Ga)||(t=[1,0,0,0,1,0,0,0,1],!Pc(t,gs,xs,vs,Ga))?!1:(qa.crossVectors(di,fi),t=[qa.x,qa.y,qa.z],Pc(t,gs,xs,vs,Ga))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$n=[new D,new D,new D,new D,new D,new D,new D,new D],En=new D,Va=new Hn,gs=new D,xs=new D,vs=new D,di=new D,fi=new D,Bi=new D,_r=new D,Ga=new D,qa=new D,ki=new D;function Pc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ki.fromArray(i,r);let o=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),l=e.dot(ki),c=t.dot(ki),u=n.dot(ki);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Fm=new Hn,yr=new D,Lc=new D,Vn=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Fm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yr.subVectors(e,this.center);let t=yr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(yr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yr.copy(e.center).add(Lc)),this.expandByPoint(yr.copy(e.center).sub(Lc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Yn=new D,Dc=new D,Wa=new D,pi=new D,Uc=new D,Xa=new D,Nc=new D,ti=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yn.copy(this.origin).addScaledVector(this.direction,t),Yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Dc.copy(e).add(t).multiplyScalar(.5),Wa.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Dc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Wa),o=pi.dot(this.direction),l=-pi.dot(Wa),c=pi.lengthSq(),u=Math.abs(1-a*a),h,g,m,x;if(u>0)if(h=a*l-o,g=a*o-l,x=r*u,h>=0)if(g>=-x)if(g<=x){let p=1/u;h*=p,g*=p,m=h*(h+a*g+2*o)+g*(a*h+g+2*l)+c}else g=r,h=Math.max(0,-(a*g+o)),m=-h*h+g*(g+2*l)+c;else g=-r,h=Math.max(0,-(a*g+o)),m=-h*h+g*(g+2*l)+c;else g<=-x?(h=Math.max(0,-(-a*r+o)),g=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+g*(g+2*l)+c):g<=x?(h=0,g=Math.min(Math.max(-r,-l),r),m=g*(g+2*l)+c):(h=Math.max(0,-(a*r+o)),g=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+g*(g+2*l)+c);else g=a>0?-r:r,h=Math.max(0,-(a*g+o)),m=-h*h+g*(g+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Dc).addScaledVector(Wa,g),m}intersectSphere(e,t){Yn.subVectors(e.center,this.origin);let n=Yn.dot(this.direction),s=Yn.dot(Yn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,g=this.origin;return c>=0?(n=(e.min.x-g.x)*c,s=(e.max.x-g.x)*c):(n=(e.max.x-g.x)*c,s=(e.min.x-g.x)*c),u>=0?(r=(e.min.y-g.y)*u,a=(e.max.y-g.y)*u):(r=(e.max.y-g.y)*u,a=(e.min.y-g.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-g.z)*h,l=(e.max.z-g.z)*h):(o=(e.max.z-g.z)*h,l=(e.min.z-g.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Yn)!==null}intersectTriangle(e,t,n,s,r){Uc.subVectors(t,e),Xa.subVectors(n,e),Nc.crossVectors(Uc,Xa);let a=this.direction.dot(Nc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pi.subVectors(this.origin,e);let l=o*this.direction.dot(Xa.crossVectors(pi,Xa));if(l<0)return null;let c=o*this.direction.dot(Uc.cross(pi));if(c<0||l+c>a)return null;let u=-o*pi.dot(Nc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},rt=class i{constructor(e,t,n,s,r,a,o,l,c,u,h,g,m,x,p,d){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,g,m,x,p,d)}set(e,t,n,s,r,a,o,l,c,u,h,g,m,x,p,d){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=g,f[3]=m,f[7]=x,f[11]=p,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/_s.setFromMatrixColumn(e,0).length(),r=1/_s.setFromMatrixColumn(e,1).length(),a=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let g=a*u,m=a*h,x=o*u,p=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+x*c,t[5]=g-p*c,t[9]=-o*l,t[2]=p-g*c,t[6]=x+m*c,t[10]=a*l}else if(e.order==="YXZ"){let g=l*u,m=l*h,x=c*u,p=c*h;t[0]=g+p*o,t[4]=x*o-m,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=p+g*o,t[10]=a*l}else if(e.order==="ZXY"){let g=l*u,m=l*h,x=c*u,p=c*h;t[0]=g-p*o,t[4]=-a*h,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=p-g*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let g=a*u,m=a*h,x=o*u,p=o*h;t[0]=l*u,t[4]=x*c-m,t[8]=g*c+p,t[1]=l*h,t[5]=p*c+g,t[9]=m*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let g=a*l,m=a*c,x=o*l,p=o*c;t[0]=l*u,t[4]=p-g*h,t[8]=x*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*h+x,t[10]=g-p*h}else if(e.order==="XZY"){let g=a*l,m=a*c,x=o*l,p=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=g*h+p,t[5]=a*u,t[9]=m*h-x,t[2]=x*h-m,t[6]=o*u,t[10]=p*h+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Om,e,Bm)}lookAt(e,t,n){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),mi.crossVectors(n,hn),mi.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),mi.crossVectors(n,hn)),mi.normalize(),$a.crossVectors(hn,mi),s[0]=mi.x,s[4]=$a.x,s[8]=hn.x,s[1]=mi.y,s[5]=$a.y,s[9]=hn.y,s[2]=mi.z,s[6]=$a.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],g=n[9],m=n[13],x=n[2],p=n[6],d=n[10],f=n[14],b=n[3],S=n[7],_=n[11],w=n[15],C=s[0],L=s[4],T=s[8],M=s[12],y=s[1],P=s[5],O=s[9],G=s[13],j=s[2],Y=s[6],J=s[10],oe=s[14],K=s[3],pe=s[7],Me=s[11],Te=s[15];return r[0]=a*C+o*y+l*j+c*K,r[4]=a*L+o*P+l*Y+c*pe,r[8]=a*T+o*O+l*J+c*Me,r[12]=a*M+o*G+l*oe+c*Te,r[1]=u*C+h*y+g*j+m*K,r[5]=u*L+h*P+g*Y+m*pe,r[9]=u*T+h*O+g*J+m*Me,r[13]=u*M+h*G+g*oe+m*Te,r[2]=x*C+p*y+d*j+f*K,r[6]=x*L+p*P+d*Y+f*pe,r[10]=x*T+p*O+d*J+f*Me,r[14]=x*M+p*G+d*oe+f*Te,r[3]=b*C+S*y+_*j+w*K,r[7]=b*L+S*P+_*Y+w*pe,r[11]=b*T+S*O+_*J+w*Me,r[15]=b*M+S*G+_*oe+w*Te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],g=e[10],m=e[14],x=e[3],p=e[7],d=e[11],f=e[15];return x*(+r*l*h-s*c*h-r*o*g+n*c*g+s*o*m-n*l*m)+p*(+t*l*m-t*c*g+r*a*g-s*a*m+s*c*u-r*l*u)+d*(+t*c*h-t*o*m-r*a*h+n*a*m+r*o*u-n*c*u)+f*(-s*o*u-t*l*h+t*o*g+s*a*h-n*a*g+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],g=e[10],m=e[11],x=e[12],p=e[13],d=e[14],f=e[15],b=h*d*c-p*g*c+p*l*m-o*d*m-h*l*f+o*g*f,S=x*g*c-u*d*c-x*l*m+a*d*m+u*l*f-a*g*f,_=u*p*c-x*h*c+x*o*m-a*p*m-u*o*f+a*h*f,w=x*h*l-u*p*l-x*o*g+a*p*g+u*o*d-a*h*d,C=t*b+n*S+s*_+r*w;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/C;return e[0]=b*L,e[1]=(p*g*r-h*d*r-p*s*m+n*d*m+h*s*f-n*g*f)*L,e[2]=(o*d*r-p*l*r+p*s*c-n*d*c-o*s*f+n*l*f)*L,e[3]=(h*l*r-o*g*r-h*s*c+n*g*c+o*s*m-n*l*m)*L,e[4]=S*L,e[5]=(u*d*r-x*g*r+x*s*m-t*d*m-u*s*f+t*g*f)*L,e[6]=(x*l*r-a*d*r-x*s*c+t*d*c+a*s*f-t*l*f)*L,e[7]=(a*g*r-u*l*r+u*s*c-t*g*c-a*s*m+t*l*m)*L,e[8]=_*L,e[9]=(x*h*r-u*p*r-x*n*m+t*p*m+u*n*f-t*h*f)*L,e[10]=(a*p*r-x*o*r+x*n*c-t*p*c-a*n*f+t*o*f)*L,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*m-t*o*m)*L,e[12]=w*L,e[13]=(u*p*s-x*h*s+x*n*g-t*p*g-u*n*d+t*h*d)*L,e[14]=(x*o*s-a*p*s-x*n*l+t*p*l+a*n*d-t*o*d)*L,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*g+t*o*g)*L,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,g=r*c,m=r*u,x=r*h,p=a*u,d=a*h,f=o*h,b=l*c,S=l*u,_=l*h,w=n.x,C=n.y,L=n.z;return s[0]=(1-(p+f))*w,s[1]=(m+_)*w,s[2]=(x-S)*w,s[3]=0,s[4]=(m-_)*C,s[5]=(1-(g+f))*C,s[6]=(d+b)*C,s[7]=0,s[8]=(x+S)*L,s[9]=(d-b)*L,s[10]=(1-(g+p))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=_s.set(s[0],s[1],s[2]).length(),a=_s.set(s[4],s[5],s[6]).length(),o=_s.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Tn.copy(this);let c=1/r,u=1/a,h=1/o;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=h,Tn.elements[9]*=h,Tn.elements[10]*=h,t.setFromRotationMatrix(Tn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-s),g=(t+e)/(t-e),m=(n+s)/(n-s),x,p;if(l)x=r/(a-r),p=a*r/(a-r);else if(o===Rn)x=-(a+r)/(a-r),p=-2*a*r/(a-r);else if(o===Or)x=-a/(a-r),p=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=g,c[12]=0,c[1]=0,c[5]=h,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-s),g=-(t+e)/(t-e),m=-(n+s)/(n-s),x,p;if(l)x=1/(a-r),p=a/(a-r);else if(o===Rn)x=-2/(a-r),p=-(a+r)/(a-r);else if(o===Or)x=-1/(a-r),p=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=g,c[1]=0,c[5]=h,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=x,c[14]=p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_s=new D,Tn=new rt,Om=new D(0,0,0),Bm=new D(1,1,1),mi=new D,$a=new D,hn=new D,_d=new rt,yd=new bn,Pn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],g=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(g,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(g,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(g,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _d.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_d,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yd.setFromEuler(this),this.setFromQuaternion(yd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pn.DEFAULT_ORDER="XYZ";var Bs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},km=0,bd=new D,ys=new bn,Zn=new rt,Ya=new D,br=new D,zm=new D,Hm=new bn,Md=new D(1,0,0),Sd=new D(0,1,0),wd=new D(0,0,1),Ed={type:"added"},Vm={type:"removed"},bs={type:"childadded",child:null},Fc={type:"childremoved",child:null},Ct=class i extends zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new Pn,n=new bn,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new rt},normalMatrix:{value:new We}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(Md,e)}rotateY(e){return this.rotateOnAxis(Sd,e)}rotateZ(e){return this.rotateOnAxis(wd,e)}translateOnAxis(e,t){return bd.copy(e).applyQuaternion(this.quaternion),this.position.add(bd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Md,e)}translateY(e){return this.translateOnAxis(Sd,e)}translateZ(e){return this.translateOnAxis(wd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ya.copy(e):Ya.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(br,Ya,this.up):Zn.lookAt(Ya,br,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(Zn),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ed),bs.child=e,this.dispatchEvent(bs),bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vm),Fc.child=e,this.dispatchEvent(Fc),Fc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ed),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,e,zm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,Hm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),g=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),g.length>0&&(n.skeletons=g),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Ct.DEFAULT_UP=new D(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var An=new D,jn=new D,Oc=new D,Jn=new D,Ms=new D,Ss=new D,Td=new D,Bc=new D,kc=new D,zc=new D,Hc=new ct,Vc=new ct,Gc=new ct,Kn=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),An.subVectors(e,t),s.cross(An);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){An.subVectors(s,t),jn.subVectors(n,t),Oc.subVectors(e,t);let a=An.dot(An),o=An.dot(jn),l=An.dot(Oc),c=jn.dot(jn),u=jn.dot(Oc),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let g=1/h,m=(c*l-o*u)*g,x=(a*u-o*l)*g;return r.set(1-m-x,x,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Jn.x),l.addScaledVector(a,Jn.y),l.addScaledVector(o,Jn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Hc.setScalar(0),Vc.setScalar(0),Gc.setScalar(0),Hc.fromBufferAttribute(e,t),Vc.fromBufferAttribute(e,n),Gc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Hc,r.x),a.addScaledVector(Vc,r.y),a.addScaledVector(Gc,r.z),a}static isFrontFacing(e,t,n,s){return An.subVectors(n,t),jn.subVectors(e,t),An.cross(jn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),An.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ms.subVectors(s,n),Ss.subVectors(r,n),Bc.subVectors(e,n);let l=Ms.dot(Bc),c=Ss.dot(Bc);if(l<=0&&c<=0)return t.copy(n);kc.subVectors(e,s);let u=Ms.dot(kc),h=Ss.dot(kc);if(u>=0&&h<=u)return t.copy(s);let g=l*h-u*c;if(g<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ms,a);zc.subVectors(e,r);let m=Ms.dot(zc),x=Ss.dot(zc);if(x>=0&&m<=x)return t.copy(r);let p=m*c-l*x;if(p<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(n).addScaledVector(Ss,o);let d=u*x-m*h;if(d<=0&&h-u>=0&&m-x>=0)return Td.subVectors(r,s),o=(h-u)/(h-u+(m-x)),t.copy(s).addScaledVector(Td,o);let f=1/(d+p+g);return a=p*f,o=g*f,t.copy(n).addScaledVector(Ms,a).addScaledVector(Ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Za={h:0,s:0,l:0};function qc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=Iu(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=qc(a,r,e+1/3),this.g=qc(a,r,e),this.b=qc(a,r,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=Df[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return Qe.workingToColorSpace($t.copy(this),e),Math.round($e($t.r*255,0,255))*65536+Math.round($e($t.g*255,0,255))*256+Math.round($e($t.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace($t.copy(this),t);let n=$t.r,s=$t.g,r=$t.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Nt){Qe.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,s=$t.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(Za);let n=Lr(gi.h,Za.h,t),s=Lr(gi.s,Za.s,t),r=Lr(gi.l,Za.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ue;Ue.NAMES=Df;var Gm=0,Ln=class extends zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=Gi,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_o,this.blendDst=yo,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=su,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==_o&&(n.blendSrc=this.blendSrc),this.blendDst!==yo&&(n.blendDst=this.blendDst),this.blendEquation!==_i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==su&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},on=class extends Ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=vu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Pt=new D,ja=new ne,qm=0,Lt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=So,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ja.fromBufferAttribute(this,t),ja.applyMatrix3(e),this.setXY(t,ja.x,ja.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==So&&(e.usage=this.usage),e}};var zr=class extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Hr=class extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var et=class extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Wm=0,_n=new rt,Wc=new Ct,ws=new D,dn=new Hn,Mr=new Hn,Vt=new D,xt=class i extends zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lu(e)?Hr:zr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Wc.lookAt(e),Wc.updateMatrix(),this.applyMatrix4(Wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new et(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(dn.min,Mr.min),dn.expandByPoint(Vt),Vt.addVectors(dn.max,Mr.max),dn.expandByPoint(Vt)):(dn.expandByPoint(Mr.min),dn.expandByPoint(Mr.max))}dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Vt.fromBufferAttribute(o,c),l&&(ws.fromBufferAttribute(e,c),Vt.add(ws)),s=Math.max(s,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<n.count;T++)o[T]=new D,l[T]=new D;let c=new D,u=new D,h=new D,g=new ne,m=new ne,x=new ne,p=new D,d=new D;function f(T,M,y){c.fromBufferAttribute(n,T),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,y),g.fromBufferAttribute(r,T),m.fromBufferAttribute(r,M),x.fromBufferAttribute(r,y),u.sub(c),h.sub(c),m.sub(g),x.sub(g);let P=1/(m.x*x.y-x.x*m.y);isFinite(P)&&(p.copy(u).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(P),d.copy(h).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(P),o[T].add(p),o[M].add(p),o[y].add(p),l[T].add(d),l[M].add(d),l[y].add(d))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let T=0,M=b.length;T<M;++T){let y=b[T],P=y.start,O=y.count;for(let G=P,j=P+O;G<j;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let S=new D,_=new D,w=new D,C=new D;function L(T){w.fromBufferAttribute(s,T),C.copy(w);let M=o[T];S.copy(M),S.sub(w.multiplyScalar(w.dot(M))).normalize(),_.crossVectors(C,M);let P=_.dot(l[T])<0?-1:1;a.setXYZW(T,S.x,S.y,S.z,P)}for(let T=0,M=b.length;T<M;++T){let y=b[T],P=y.start,O=y.count;for(let G=P,j=P+O;G<j;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let g=0,m=n.count;g<m;g++)n.setXYZ(g,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let g=0,m=e.count;g<m;g+=3){let x=e.getX(g+0),p=e.getX(g+1),d=e.getX(g+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,p),a.fromBufferAttribute(t,d),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,p),c.fromBufferAttribute(n,d),o.add(u),l.add(u),c.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let g=0,m=t.count;g<m;g+=3)s.fromBufferAttribute(t,g+0),r.fromBufferAttribute(t,g+1),a.fromBufferAttribute(t,g+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(g+0,u.x,u.y,u.z),n.setXYZ(g+1,u.x,u.y,u.z),n.setXYZ(g+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,g=new c.constructor(l.length*u),m=0,x=0;for(let p=0,d=l.length;p<d;p++){o.isInterleavedBufferAttribute?m=l[p]*o.data.stride+o.offset:m=l[p]*u;for(let f=0;f<u;f++)g[x++]=c[m++]}return new Lt(g,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let g=c[u],m=e(g,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,g=c.length;h<g;h++){let m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let g=0,m=h.length;g<m;g++)u.push(h[g].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ad=new rt,zi=new ti,Ja=new Vn,Cd=new D,Ka=new D,Qa=new D,eo=new D,Xc=new D,to=new D,Rd=new D,no=new D,Ze=class extends Ct{constructor(e=new xt,t=new on){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){to.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(Xc.fromBufferAttribute(h,e),a?to.addScaledVector(Xc,u):to.addScaledVector(Xc.sub(t),u))}t.add(to)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(Ja.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Ja,Cd)===null||zi.origin.distanceToSquared(Cd)>(e.far-e.near)**2))&&(Ad.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Ad),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,g=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,p=g.length;x<p;x++){let d=g[x],f=a[d.materialIndex],b=Math.max(d.start,m.start),S=Math.min(o.count,Math.min(d.start+d.count,m.start+m.count));for(let _=b,w=S;_<w;_+=3){let C=o.getX(_),L=o.getX(_+1),T=o.getX(_+2);s=io(this,f,e,n,c,u,h,C,L,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{let x=Math.max(0,m.start),p=Math.min(o.count,m.start+m.count);for(let d=x,f=p;d<f;d+=3){let b=o.getX(d),S=o.getX(d+1),_=o.getX(d+2);s=io(this,a,e,n,c,u,h,b,S,_),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,p=g.length;x<p;x++){let d=g[x],f=a[d.materialIndex],b=Math.max(d.start,m.start),S=Math.min(l.count,Math.min(d.start+d.count,m.start+m.count));for(let _=b,w=S;_<w;_+=3){let C=_,L=_+1,T=_+2;s=io(this,f,e,n,c,u,h,C,L,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{let x=Math.max(0,m.start),p=Math.min(l.count,m.start+m.count);for(let d=x,f=p;d<f;d+=3){let b=d,S=d+1,_=d+2;s=io(this,a,e,n,c,u,h,b,S,_),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}};function Xm(i,e,t,n,s,r,a,o){let l;if(e.side===qt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ei,o),l===null)return null;no.copy(o),no.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(no);return c<t.near||c>t.far?null:{distance:c,point:no.clone(),object:i}}function io(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ka),i.getVertexPosition(l,Qa),i.getVertexPosition(c,eo);let u=Xm(i,e,t,n,Ka,Qa,eo,Rd);if(u){let h=new D;Kn.getBarycoord(Rd,Ka,Qa,eo,h),s&&(u.uv=Kn.getInterpolatedAttribute(s,o,l,c,h,new ne)),r&&(u.uv1=Kn.getInterpolatedAttribute(r,o,l,c,h,new ne)),a&&(u.normal=Kn.getInterpolatedAttribute(a,o,l,c,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let g={a:o,b:l,c,normal:new D,materialIndex:0};Kn.getNormal(Ka,Qa,eo,g.normal),u.face=g,u.barycoord=h}return u}var vt=class i extends xt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],g=0,m=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new et(c,3)),this.setAttribute("normal",new et(u,3)),this.setAttribute("uv",new et(h,2));function x(p,d,f,b,S,_,w,C,L,T,M){let y=_/L,P=w/T,O=_/2,G=w/2,j=C/2,Y=L+1,J=T+1,oe=0,K=0,pe=new D;for(let Me=0;Me<J;Me++){let Te=Me*P-G;for(let Fe=0;Fe<Y;Fe++){let Be=Fe*y-O;pe[p]=Be*b,pe[d]=Te*S,pe[f]=j,c.push(pe.x,pe.y,pe.z),pe[p]=0,pe[d]=0,pe[f]=C>0?1:-1,u.push(pe.x,pe.y,pe.z),h.push(Fe/L),h.push(1-Me/T),oe+=1}}for(let Me=0;Me<T;Me++)for(let Te=0;Te<L;Te++){let Fe=g+Te+Y*Me,Be=g+Te+Y*(Me+1),Je=g+(Te+1)+Y*(Me+1),je=g+(Te+1)+Y*Me;l.push(Fe,Be,je),l.push(Be,Je,je),K+=6}o.addGroup(m,K,M),m+=K,g+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function rs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Zt(i){let e={};for(let t=0;t<i.length;t++){let n=rs(i[t]);for(let s in n)e[s]=n[s]}return e}function $m(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Du(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}var ai={clone:rs,merge:Zt},Ym=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Tt=class extends Ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ym,this.fragmentShader=Zm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=$m(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Vr=class extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},xi=new D,Id=new ne,Pd=new ne,Ft=class extends Vr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ns*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ns*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,Id,Pd),t.subVectors(Pd,Id)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Es=-90,Ts=1,Ao=class extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ft(Es,Ts,e,t);s.layers=this.layers,this.add(s);let r=new Ft(Es,Ts,e,t);r.layers=this.layers,this.add(r);let a=new Ft(Es,Ts,e,t);a.layers=this.layers,this.add(a);let o=new Ft(Es,Ts,e,t);o.layers=this.layers,this.add(o);let l=new Ft(Es,Ts,e,t);l.layers=this.layers,this.add(l);let c=new Ft(Es,Ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),g=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=p,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,g,m),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Gr=class extends Qt{constructor(e=[],t=is,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Co=class extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Gr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new vt(5,5,5),r=new Tt({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Dn});r.uniforms.tEquirect.value=t;let a=new Ze(s,r),o=t.minFilter;return t.minFilter===Ri&&(t.minFilter=In),new Ao(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Mt=class extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}},jm={type:"move"},ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let p of e.hand.values()){let d=t.getJointPose(p,n),f=this._getHandJoint(c,p);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],g=u.position.distanceTo(h.position),m=.02,x=.005;c.inputState.pinching&&g>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&g<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var qr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Xi=class extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ro=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=So,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Kt=new D,Wr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),s=lt(s,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yi=class extends Ln{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},As,Sr=new D,Cs=new D,Rs=new D,Is=new ne,wr=new ne,Uf=new rt,so=new D,Er=new D,ro=new D,Ld=new ne,$c=new ne,Dd=new ne,$i=class extends Ct{constructor(e=new yi){if(super(),this.isSprite=!0,this.type="Sprite",As===void 0){As=new xt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ro(t,5);As.setIndex([0,1,2,0,2,3]),As.setAttribute("position",new Wr(n,3,0,!1)),As.setAttribute("uv",new Wr(n,2,3,!1))}this.geometry=As,this.material=e,this.center=new ne(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),Uf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Rs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Rs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;ao(so.set(-.5,-.5,0),Rs,a,Cs,s,r),ao(Er.set(.5,-.5,0),Rs,a,Cs,s,r),ao(ro.set(.5,.5,0),Rs,a,Cs,s,r),Ld.set(0,0),$c.set(1,0),Dd.set(1,1);let o=e.ray.intersectTriangle(so,Er,ro,!1,Sr);if(o===null&&(ao(Er.set(-.5,.5,0),Rs,a,Cs,s,r),$c.set(0,1),o=e.ray.intersectTriangle(so,ro,Er,!1,Sr),o===null))return;let l=e.ray.origin.distanceTo(Sr);l<e.near||l>e.far||t.push({distance:l,point:Sr.clone(),uv:Kn.getInterpolation(Sr,so,Er,ro,Ld,$c,Dd,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ao(i,e,t,n,s,r){Is.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(wr.x=r*Is.x-s*Is.y,wr.y=s*Is.x+r*Is.y):wr.copy(Is),i.copy(e),i.x+=wr.x,i.y+=wr.y,i.applyMatrix4(Uf)}var Io=class extends Qt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=an,u=an,h,g){super(null,a,o,l,c,u,s,r,h,g),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xr=class extends Lt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ps=new rt,Ud=new rt,oo=[],Nd=new Hn,Jm=new rt,Tr=new Ze,Ar=new Vn,$r=class extends Ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Jm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),Nd.copy(e.boundingBox).applyMatrix4(Ps),this.boundingBox.union(Nd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),Ar.copy(e.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(Ar)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Tr.geometry=this.geometry,Tr.material=this.material,Tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ar.copy(this.boundingSphere),Ar.applyMatrix4(n),e.ray.intersectsSphere(Ar)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ps),Ud.multiplyMatrices(n,Ps),Tr.matrixWorld=Ud,Tr.raycast(e,oo);for(let a=0,o=oo.length;a<o;a++){let l=oo[a];l.instanceId=r,l.object=this,t.push(l)}oo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Io(new Float32Array(s*this.count),s,this.count,vl,Nn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Yc=new D,Km=new D,Qm=new We,yn=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Yc.subVectors(n,t).cross(Km.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Yc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Qm.getNormalMatrix(e),s=this.coplanarPoint(Yc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Hi=new Vn,eg=new ne(.5,.5),lo=new D,zs=class{constructor(e=new yn,t=new yn,n=new yn,s=new yn,r=new yn,a=new yn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],g=r[6],m=r[7],x=r[8],p=r[9],d=r[10],f=r[11],b=r[12],S=r[13],_=r[14],w=r[15];if(s[0].setComponents(c-a,m-u,f-x,w-b).normalize(),s[1].setComponents(c+a,m+u,f+x,w+b).normalize(),s[2].setComponents(c+o,m+h,f+p,w+S).normalize(),s[3].setComponents(c-o,m-h,f-p,w-S).normalize(),n)s[4].setComponents(l,g,d,_).normalize(),s[5].setComponents(c-l,m-g,f-d,w-_).normalize();else if(s[4].setComponents(c-l,m-g,f-d,w-_).normalize(),t===Rn)s[5].setComponents(c+l,m+g,f+d,w+_).normalize();else if(t===Or)s[5].setComponents(l,g,d,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){Hi.center.set(0,0,0);let t=eg.distanceTo(e.center);return Hi.radius=.7071067811865476+t,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(lo.x=s.normal.x>0?e.max.x:e.min.x,lo.y=s.normal.y>0?e.max.y:e.min.y,lo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(lo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Hs=class extends Ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Po=new D,Lo=new D,Fd=new rt,Cr=new ti,co=new Vn,Zc=new D,Od=new D,Do=class extends Ct{constructor(e=new xt,t=new Hs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Po.fromBufferAttribute(t,s-1),Lo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Po.distanceTo(Lo);e.setAttribute("lineDistance",new et(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(s),co.radius+=r,e.ray.intersectsSphere(co)===!1)return;Fd.copy(s).invert(),Cr.copy(e.ray).applyMatrix4(Fd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,g=n.attributes.position;if(u!==null){let m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let p=m,d=x-1;p<d;p+=c){let f=u.getX(p),b=u.getX(p+1),S=uo(this,e,Cr,l,f,b,p);S&&t.push(S)}if(this.isLineLoop){let p=u.getX(x-1),d=u.getX(m),f=uo(this,e,Cr,l,p,d,x-1);f&&t.push(f)}}else{let m=Math.max(0,a.start),x=Math.min(g.count,a.start+a.count);for(let p=m,d=x-1;p<d;p+=c){let f=uo(this,e,Cr,l,p,p+1,p);f&&t.push(f)}if(this.isLineLoop){let p=uo(this,e,Cr,l,x-1,m,x-1);p&&t.push(p)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function uo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Po.fromBufferAttribute(o,s),Lo.fromBufferAttribute(o,r),t.distanceSqToSegment(Po,Lo,Zc,Od)>n)return;Zc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Zc);if(!(c<e.near||c>e.far))return{distance:c,point:Od.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Bd=new D,kd=new D,Yr=class extends Do{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Bd.fromBufferAttribute(t,s),kd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bd.distanceTo(kd);e.setAttribute("lineDistance",new et(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var bi=class extends Ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},zd=new rt,ru=new ti,ho=new Vn,fo=new D,Yi=class extends Ct{constructor(e=new xt,t=new bi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(s),ho.radius+=r,e.ray.intersectsSphere(ho)===!1)return;zd.copy(s).invert(),ru.copy(e.ray).applyMatrix4(zd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let g=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let x=g,p=m;x<p;x++){let d=c.getX(x);fo.fromBufferAttribute(h,d),Hd(fo,d,l,s,e,t,this)}}else{let g=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=g,p=m;x<p;x++)fo.fromBufferAttribute(h,x),Hd(fo,x,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Hd(i,e,t,n,s,r,a){let o=ru.distanceSqToPoint(i);if(o<t){let l=new D;ru.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Zr=class extends Qt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},jr=class extends Qt{constructor(e,t,n=Ii,s,r,a,o=an,l=an,c,u=Us,h=1){if(u!==Us&&u!==Ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let g={width:e,height:t,depth:h};super(g,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Os(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Jr=class extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Vs=class i extends xt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],u=t/2,h=Math.PI/2*e,g=t,m=2*h+g,x=n*2+r,p=s+1,d=new D,f=new D;for(let b=0;b<=x;b++){let S=0,_=0,w=0,C=0;if(b<=n){let M=b/n,y=M*Math.PI/2;_=-u-e*Math.cos(y),w=e*Math.sin(y),C=-e*Math.cos(y),S=M*h}else if(b<=n+r){let M=(b-n)/r;_=-u+M*t,w=e,C=0,S=h+M*g}else{let M=(b-n-r)/n,y=M*Math.PI/2;_=u+e*Math.sin(y),w=e*Math.cos(y),C=e*Math.sin(y),S=h+g+M*h}let L=Math.max(0,Math.min(1,S/m)),T=0;b===0?T=.5/s:b===x&&(T=-.5/s);for(let M=0;M<=s;M++){let y=M/s,P=y*Math.PI*2,O=Math.sin(P),G=Math.cos(P);f.x=-w*G,f.y=_,f.z=w*O,o.push(f.x,f.y,f.z),d.set(-w*G,C,w*O),d.normalize(),l.push(d.x,d.y,d.z),c.push(y+T,L)}if(b>0){let M=(b-1)*p;for(let y=0;y<s;y++){let P=M+y,O=M+y+1,G=b*p+y,j=b*p+y+1;a.push(P,O,G),a.push(O,j,G)}}}this.setIndex(a),this.setAttribute("position",new et(o,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var Ot=class i extends xt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],g=[],m=[],x=0,p=[],d=n/2,f=0;b(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new et(h,3)),this.setAttribute("normal",new et(g,3)),this.setAttribute("uv",new et(m,2));function b(){let _=new D,w=new D,C=0,L=(t-e)/n;for(let T=0;T<=r;T++){let M=[],y=T/r,P=y*(t-e)+e;for(let O=0;O<=s;O++){let G=O/s,j=G*l+o,Y=Math.sin(j),J=Math.cos(j);w.x=P*Y,w.y=-y*n+d,w.z=P*J,h.push(w.x,w.y,w.z),_.set(Y,L,J).normalize(),g.push(_.x,_.y,_.z),m.push(G,1-y),M.push(x++)}p.push(M)}for(let T=0;T<s;T++)for(let M=0;M<r;M++){let y=p[M][T],P=p[M+1][T],O=p[M+1][T+1],G=p[M][T+1];(e>0||M!==0)&&(u.push(y,P,G),C+=3),(t>0||M!==r-1)&&(u.push(P,O,G),C+=3)}c.addGroup(f,C,0),f+=C}function S(_){let w=x,C=new ne,L=new D,T=0,M=_===!0?e:t,y=_===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,d*y,0),g.push(0,y,0),m.push(.5,.5),x++;let P=x;for(let O=0;O<=s;O++){let j=O/s*l+o,Y=Math.cos(j),J=Math.sin(j);L.x=M*J,L.y=d*y,L.z=M*Y,h.push(L.x,L.y,L.z),g.push(0,y,0),C.x=Y*.5+.5,C.y=J*.5*y+.5,m.push(C.x,C.y),x++}for(let O=0;O<s;O++){let G=w+O,j=P+O;_===!0?u.push(j,j+1,G):u.push(j+1,j,G),T+=3}c.addGroup(f,T,_===!0?1:2),f+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Kr=class i extends Ot{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Qr=class i extends xt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new et(r,3)),this.setAttribute("normal",new et(r.slice(),3)),this.setAttribute("uv",new et(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let S=new D,_=new D,w=new D;for(let C=0;C<t.length;C+=3)m(t[C+0],S),m(t[C+1],_),m(t[C+2],w),l(S,_,w,b)}function l(b,S,_,w){let C=w+1,L=[];for(let T=0;T<=C;T++){L[T]=[];let M=b.clone().lerp(_,T/C),y=S.clone().lerp(_,T/C),P=C-T;for(let O=0;O<=P;O++)O===0&&T===C?L[T][O]=M:L[T][O]=M.clone().lerp(y,O/P)}for(let T=0;T<C;T++)for(let M=0;M<2*(C-T)-1;M++){let y=Math.floor(M/2);M%2===0?(g(L[T][y+1]),g(L[T+1][y]),g(L[T][y])):(g(L[T][y+1]),g(L[T+1][y+1]),g(L[T+1][y]))}}function c(b){let S=new D;for(let _=0;_<r.length;_+=3)S.x=r[_+0],S.y=r[_+1],S.z=r[_+2],S.normalize().multiplyScalar(b),r[_+0]=S.x,r[_+1]=S.y,r[_+2]=S.z}function u(){let b=new D;for(let S=0;S<r.length;S+=3){b.x=r[S+0],b.y=r[S+1],b.z=r[S+2];let _=d(b)/2/Math.PI+.5,w=f(b)/Math.PI+.5;a.push(_,1-w)}x(),h()}function h(){for(let b=0;b<a.length;b+=6){let S=a[b+0],_=a[b+2],w=a[b+4],C=Math.max(S,_,w),L=Math.min(S,_,w);C>.9&&L<.1&&(S<.2&&(a[b+0]+=1),_<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function g(b){r.push(b.x,b.y,b.z)}function m(b,S){let _=b*3;S.x=e[_+0],S.y=e[_+1],S.z=e[_+2]}function x(){let b=new D,S=new D,_=new D,w=new D,C=new ne,L=new ne,T=new ne;for(let M=0,y=0;M<r.length;M+=9,y+=6){b.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),_.set(r[M+6],r[M+7],r[M+8]),C.set(a[y+0],a[y+1]),L.set(a[y+2],a[y+3]),T.set(a[y+4],a[y+5]),w.copy(b).add(S).add(_).divideScalar(3);let P=d(w);p(C,y+0,b,P),p(L,y+2,S,P),p(T,y+4,_,P)}}function p(b,S,_,w){w<0&&b.x===1&&(a[S]=b.x-1),_.x===0&&_.z===0&&(a[S]=w/2/Math.PI+.5)}function d(b){return Math.atan2(b.z,-b.x)}function f(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],g=n[s+1]-u,m=(a-u)/g;return(s+m)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ne:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new rt;for(let m=0;m<=e;m++){let x=m/e;s[m]=this.getTangentAt(x,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),h=Math.abs(s[0].y),g=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),g<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let m=1;m<=e;m++){if(r[m]=r[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(s[m-1],s[m]),o.length()>Number.EPSILON){o.normalize();let x=Math.acos($e(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(o,x))}a[m].crossVectors(s[m],r[m])}if(t===!0){let m=Math.acos($e(r[0].dot(r[e]),-1,1));m/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(m=-m);for(let x=1;x<=e;x++)r[x].applyMatrix4(l.makeRotationAxis(s[x],m*x)),a[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Gs=class extends fn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ne){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),g=l-this.aX,m=c-this.aY;l=g*u-m*h+this.aX,c=g*h+m*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Uo=class extends Gs{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Uu(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,h){let g=(a-r)/c-(o-r)/(c+u)+(o-a)/u,m=(o-a)/u-(l-a)/(u+h)+(l-o)/h;g*=u,m*=u,s(a,o,g,m)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var po=new D,jc=new Uu,Jc=new Uu,Kc=new Uu,No=class extends fn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(po.subVectors(s[0],s[1]).add(s[0]),c=po);let h=s[o%r],g=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(po.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=po),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,x=Math.pow(c.distanceToSquared(h),m),p=Math.pow(h.distanceToSquared(g),m),d=Math.pow(g.distanceToSquared(u),m);p<1e-4&&(p=1),x<1e-4&&(x=p),d<1e-4&&(d=p),jc.initNonuniformCatmullRom(c.x,h.x,g.x,u.x,x,p,d),Jc.initNonuniformCatmullRom(c.y,h.y,g.y,u.y,x,p,d),Kc.initNonuniformCatmullRom(c.z,h.z,g.z,u.z,x,p,d)}else this.curveType==="catmullrom"&&(jc.initCatmullRom(c.x,h.x,g.x,u.x,this.tension),Jc.initCatmullRom(c.y,h.y,g.y,u.y,this.tension),Kc.initCatmullRom(c.z,h.z,g.z,u.z,this.tension));return n.set(jc.calc(l),Jc.calc(l),Kc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Vd(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function tg(i,e){let t=1-i;return t*t*e}function ng(i,e){return 2*(1-i)*i*e}function ig(i,e){return i*i*e}function Dr(i,e,t,n){return tg(i,e)+ng(i,t)+ig(i,n)}function sg(i,e){let t=1-i;return t*t*t*e}function rg(i,e){let t=1-i;return 3*t*t*i*e}function ag(i,e){return 3*(1-i)*i*i*e}function og(i,e){return i*i*i*e}function Ur(i,e,t,n,s){return sg(i,e)+rg(i,t)+ag(i,n)+og(i,s)}var ea=class extends fn{constructor(e=new ne,t=new ne,n=new ne,s=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ne){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ur(e,s.x,r.x,a.x,o.x),Ur(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fo=class extends fn{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ur(e,s.x,r.x,a.x,o.x),Ur(e,s.y,r.y,a.y,o.y),Ur(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ta=class extends fn{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oo=class extends fn{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},na=class extends fn{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Dr(e,s.x,r.x,a.x),Dr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bo=class extends fn{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Dr(e,s.x,r.x,a.x),Dr(e,s.y,r.y,a.y),Dr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ia=class extends fn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Vd(o,l.x,c.x,u.x,h.x),Vd(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ne().fromArray(s))}return this}},au=Object.freeze({__proto__:null,ArcCurve:Uo,CatmullRomCurve3:No,CubicBezierCurve:ea,CubicBezierCurve3:Fo,EllipseCurve:Gs,LineCurve:ta,LineCurve3:Oo,QuadraticBezierCurve:na,QuadraticBezierCurve3:Bo,SplineCurve:ia}),ko=class extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new au[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new au[s.type]().fromJSON(s))}return this}},sa=class extends ko{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ta(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new na(this.currentPoint.clone(),new ne(e,t),new ne(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new ea(this.currentPoint.clone(),new ne(e,t),new ne(n,s),new ne(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ia(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new Gs(e,t,n,s,r,a,o,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Zi=class extends sa{constructor(e){super(e),this.uuid=kn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new sa().fromJSON(s))}return this}};function lg(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Nf(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=fg(i,e,r,t)),i.length>80*t){o=1/0,l=1/0;let u=-1/0,h=-1/0;for(let g=t;g<s;g+=t){let m=i[g],x=i[g+1];m<o&&(o=m),x<l&&(l=x),m>u&&(u=m),x>h&&(h=x)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return ra(r,a,t,o,l,c,0),a}function Nf(i,e,t,n,s){let r;if(s===wg(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Gd(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Gd(a/n|0,i[a],i[a+1],r);return r&&qs(r,r.next)&&(oa(r),r=r.next),r}function ji(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(qs(t,t.next)||Et(t.prev,t,t.next)===0)){if(oa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ra(i,e,t,n,s,r,a){if(!i)return;!a&&r&&vg(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?ug(i,n,s,r):cg(i)){e.push(l.i,i.i,c.i),oa(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=hg(ji(i),e),ra(i,e,t,n,s,r,2)):a===2&&dg(i,e,t,n,s,r):ra(ji(i),e,t,n,s,r,1);break}}}function cg(i){let e=i.prev,t=i,n=i.next;if(Et(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),h=Math.min(o,l,c),g=Math.max(s,r,a),m=Math.max(o,l,c),x=n.next;for(;x!==e;){if(x.x>=u&&x.x<=g&&x.y>=h&&x.y<=m&&Ir(s,o,r,l,a,c,x.x,x.y)&&Et(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function ug(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Et(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,h=r.y,g=a.y,m=Math.min(o,l,c),x=Math.min(u,h,g),p=Math.max(o,l,c),d=Math.max(u,h,g),f=ou(m,x,e,t,n),b=ou(p,d,e,t,n),S=i.prevZ,_=i.nextZ;for(;S&&S.z>=f&&_&&_.z<=b;){if(S.x>=m&&S.x<=p&&S.y>=x&&S.y<=d&&S!==s&&S!==a&&Ir(o,u,l,h,c,g,S.x,S.y)&&Et(S.prev,S,S.next)>=0||(S=S.prevZ,_.x>=m&&_.x<=p&&_.y>=x&&_.y<=d&&_!==s&&_!==a&&Ir(o,u,l,h,c,g,_.x,_.y)&&Et(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;S&&S.z>=f;){if(S.x>=m&&S.x<=p&&S.y>=x&&S.y<=d&&S!==s&&S!==a&&Ir(o,u,l,h,c,g,S.x,S.y)&&Et(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;_&&_.z<=b;){if(_.x>=m&&_.x<=p&&_.y>=x&&_.y<=d&&_!==s&&_!==a&&Ir(o,u,l,h,c,g,_.x,_.y)&&Et(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function hg(i,e){let t=i;do{let n=t.prev,s=t.next.next;!qs(n,s)&&Of(n,t,t.next,s)&&aa(n,s)&&aa(s,n)&&(e.push(n.i,t.i,s.i),oa(t),oa(t.next),t=i=s),t=t.next}while(t!==i);return ji(t)}function dg(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&bg(a,o)){let l=Bf(a,o);a=ji(a,a.next),l=ji(l,l.next),ra(a,e,t,n,s,r,0),ra(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function fg(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Nf(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(yg(c))}s.sort(pg);for(let r=0;r<s.length;r++)t=mg(s[r],t);return t}function pg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function mg(i,e){let t=gg(i,e);if(!t)return e;let n=Bf(t,i);return ji(n,n.next),ji(t,t.next)}function gg(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(qs(i,t))return t;do{if(qs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Ff(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let h=Math.abs(s-t.y)/(n-t.x);aa(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&xg(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function xg(i,e){return Et(i.prev,i,e.prev)<0&&Et(e.next,i,i.next)<0}function vg(i,e,t,n){let s=i;do s.z===0&&(s.z=ou(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,_g(s)}function _g(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function ou(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function yg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ff(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Ir(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Ff(i,e,t,n,s,r,a,o)}function bg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Mg(i,e)&&(aa(i,e)&&aa(e,i)&&Sg(i,e)&&(Et(i.prev,i,e.prev)||Et(i,e.prev,e))||qs(i,e)&&Et(i.prev,i,i.next)>0&&Et(e.prev,e,e.next)>0)}function Et(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function qs(i,e){return i.x===e.x&&i.y===e.y}function Of(i,e,t,n){let s=go(Et(i,e,t)),r=go(Et(i,e,n)),a=go(Et(t,n,i)),o=go(Et(t,n,e));return!!(s!==r&&a!==o||s===0&&mo(i,t,e)||r===0&&mo(i,n,e)||a===0&&mo(t,i,n)||o===0&&mo(t,e,n))}function mo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function go(i){return i>0?1:i<0?-1:0}function Mg(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Of(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function aa(i,e){return Et(i.prev,i,i.next)<0?Et(i,e,i.next)>=0&&Et(i,i.prev,e)>=0:Et(i,e,i.prev)<0||Et(i,i.next,e)<0}function Sg(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Bf(i,e){let t=lu(i.i,i.x,i.y),n=lu(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Gd(i,e,t,n){let s=lu(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function oa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function lu(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wg(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var cu=class{static triangulate(e,t,n=2){return lg(e,t,n)}},Bn=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];qd(e),Wd(n,e);let a=e.length;t.forEach(qd);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,Wd(n,t[l]);let o=cu.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function qd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Wd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var la=class i extends xt{constructor(e=new Zi([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new et(s,3)),this.setAttribute("uv",new et(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,g=t.bevelEnabled!==void 0?t.bevelEnabled:!0,m=t.bevelThickness!==void 0?t.bevelThickness:.2,x=t.bevelSize!==void 0?t.bevelSize:m-.1,p=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3,f=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Eg,S,_=!1,w,C,L,T;f&&(S=f.getSpacedPoints(u),_=!0,g=!1,w=f.computeFrenetFrames(u,!1),C=new D,L=new D,T=new D),g||(d=0,m=0,x=0,p=0);let M=o.extractPoints(c),y=M.shape,P=M.holes;if(!Bn.isClockWise(y)){y=y.reverse();for(let se=0,te=P.length;se<te;se++){let ee=P[se];Bn.isClockWise(ee)&&(P[se]=ee.reverse())}}function G(se){let ee=10000000000000001e-36,Q=se[0];for(let me=1;me<=se.length;me++){let le=me%se.length,_e=se[le],Ve=_e.x-Q.x,ze=_e.y-Q.y,R=Ve*Ve+ze*ze,E=Math.max(Math.abs(_e.x),Math.abs(_e.y),Math.abs(Q.x),Math.abs(Q.y)),I=ee*E*E;if(R<=I){se.splice(le,1),me--;continue}Q=_e}}G(y),P.forEach(G);let j=P.length,Y=y;for(let se=0;se<j;se++){let te=P[se];y=y.concat(te)}function J(se,te,ee){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(te,ee)}let oe=y.length;function K(se,te,ee){let Q,me,le,_e=se.x-te.x,Ve=se.y-te.y,ze=ee.x-se.x,R=ee.y-se.y,E=_e*_e+Ve*Ve,I=_e*R-Ve*ze;if(Math.abs(I)>Number.EPSILON){let N=Math.sqrt(E),V=Math.sqrt(ze*ze+R*R),B=te.x-Ve/N,X=te.y+_e/N,q=ee.x-R/V,ae=ee.y+ze/V,ve=((q-B)*R-(ae-X)*ze)/(_e*R-Ve*ze);Q=B+_e*ve-se.x,me=X+Ve*ve-se.y;let ie=Q*Q+me*me;if(ie<=2)return new ne(Q,me);le=Math.sqrt(ie/2)}else{let N=!1;_e>Number.EPSILON?ze>Number.EPSILON&&(N=!0):_e<-Number.EPSILON?ze<-Number.EPSILON&&(N=!0):Math.sign(Ve)===Math.sign(R)&&(N=!0),N?(Q=-Ve,me=_e,le=Math.sqrt(E)):(Q=_e,me=Ve,le=Math.sqrt(E/2))}return new ne(Q/le,me/le)}let pe=[];for(let se=0,te=Y.length,ee=te-1,Q=se+1;se<te;se++,ee++,Q++)ee===te&&(ee=0),Q===te&&(Q=0),pe[se]=K(Y[se],Y[ee],Y[Q]);let Me=[],Te,Fe=pe.concat();for(let se=0,te=j;se<te;se++){let ee=P[se];Te=[];for(let Q=0,me=ee.length,le=me-1,_e=Q+1;Q<me;Q++,le++,_e++)le===me&&(le=0),_e===me&&(_e=0),Te[Q]=K(ee[Q],ee[le],ee[_e]);Me.push(Te),Fe=Fe.concat(Te)}let Be;if(d===0)Be=Bn.triangulateShape(Y,P);else{let se=[],te=[];for(let ee=0;ee<d;ee++){let Q=ee/d,me=m*Math.cos(Q*Math.PI/2),le=x*Math.sin(Q*Math.PI/2)+p;for(let _e=0,Ve=Y.length;_e<Ve;_e++){let ze=J(Y[_e],pe[_e],le);ge(ze.x,ze.y,-me),Q===0&&se.push(ze)}for(let _e=0,Ve=j;_e<Ve;_e++){let ze=P[_e];Te=Me[_e];let R=[];for(let E=0,I=ze.length;E<I;E++){let N=J(ze[E],Te[E],le);ge(N.x,N.y,-me),Q===0&&R.push(N)}Q===0&&te.push(R)}}Be=Bn.triangulateShape(se,te)}let Je=Be.length,je=x+p;for(let se=0;se<oe;se++){let te=g?J(y[se],Fe[se],je):y[se];_?(L.copy(w.normals[0]).multiplyScalar(te.x),C.copy(w.binormals[0]).multiplyScalar(te.y),T.copy(S[0]).add(L).add(C),ge(T.x,T.y,T.z)):ge(te.x,te.y,0)}for(let se=1;se<=u;se++)for(let te=0;te<oe;te++){let ee=g?J(y[te],Fe[te],je):y[te];_?(L.copy(w.normals[se]).multiplyScalar(ee.x),C.copy(w.binormals[se]).multiplyScalar(ee.y),T.copy(S[se]).add(L).add(C),ge(T.x,T.y,T.z)):ge(ee.x,ee.y,h/u*se)}for(let se=d-1;se>=0;se--){let te=se/d,ee=m*Math.cos(te*Math.PI/2),Q=x*Math.sin(te*Math.PI/2)+p;for(let me=0,le=Y.length;me<le;me++){let _e=J(Y[me],pe[me],Q);ge(_e.x,_e.y,h+ee)}for(let me=0,le=P.length;me<le;me++){let _e=P[me];Te=Me[me];for(let Ve=0,ze=_e.length;Ve<ze;Ve++){let R=J(_e[Ve],Te[Ve],Q);_?ge(R.x,R.y+S[u-1].y,S[u-1].x+ee):ge(R.x,R.y,h+ee)}}}z(),W();function z(){let se=s.length/3;if(g){let te=0,ee=oe*te;for(let Q=0;Q<Je;Q++){let me=Be[Q];be(me[2]+ee,me[1]+ee,me[0]+ee)}te=u+d*2,ee=oe*te;for(let Q=0;Q<Je;Q++){let me=Be[Q];be(me[0]+ee,me[1]+ee,me[2]+ee)}}else{for(let te=0;te<Je;te++){let ee=Be[te];be(ee[2],ee[1],ee[0])}for(let te=0;te<Je;te++){let ee=Be[te];be(ee[0]+oe*u,ee[1]+oe*u,ee[2]+oe*u)}}n.addGroup(se,s.length/3-se,0)}function W(){let se=s.length/3,te=0;ue(Y,te),te+=Y.length;for(let ee=0,Q=P.length;ee<Q;ee++){let me=P[ee];ue(me,te),te+=me.length}n.addGroup(se,s.length/3-se,1)}function ue(se,te){let ee=se.length;for(;--ee>=0;){let Q=ee,me=ee-1;me<0&&(me=se.length-1);for(let le=0,_e=u+d*2;le<_e;le++){let Ve=oe*le,ze=oe*(le+1),R=te+Q+Ve,E=te+me+Ve,I=te+me+ze,N=te+Q+ze;ke(R,E,I,N)}}}function ge(se,te,ee){l.push(se),l.push(te),l.push(ee)}function be(se,te,ee){Xe(se),Xe(te),Xe(ee);let Q=s.length/3,me=b.generateTopUV(n,s,Q-3,Q-2,Q-1);U(me[0]),U(me[1]),U(me[2])}function ke(se,te,ee,Q){Xe(se),Xe(te),Xe(Q),Xe(te),Xe(ee),Xe(Q);let me=s.length/3,le=b.generateSideWallUV(n,s,me-6,me-3,me-2,me-1);U(le[0]),U(le[1]),U(le[3]),U(le[1]),U(le[2]),U(le[3])}function Xe(se){s.push(l[se*3+0]),s.push(l[se*3+1]),s.push(l[se*3+2])}function U(se){r.push(se.x),r.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Tg(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new au[s.type]().fromJSON(s)),new i(n,e.options)}},Eg={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new ne(r,a),new ne(o,l),new ne(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],g=e[s*3],m=e[s*3+1],x=e[s*3+2],p=e[r*3],d=e[r*3+1],f=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-h),new ne(g,1-x),new ne(p,1-f)]:[new ne(o,1-l),new ne(u,1-h),new ne(m,1-x),new ne(d,1-f)]}};function Tg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Mi=class i extends Qr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Ji=class i extends Qr{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ni=class i extends xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,g=t/l,m=[],x=[],p=[],d=[];for(let f=0;f<u;f++){let b=f*g-a;for(let S=0;S<c;S++){let _=S*h-r;x.push(_,-b,0),p.push(0,0,1),d.push(S/o),d.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<o;b++){let S=b+c*f,_=b+c*(f+1),w=b+1+c*(f+1),C=b+1+c*f;m.push(S,_,C),m.push(_,w,C)}this.setIndex(m),this.setAttribute("position",new et(x,3)),this.setAttribute("normal",new et(p,3)),this.setAttribute("uv",new et(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ws=class i extends xt{constructor(e=new Zi([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new et(s,3)),this.setAttribute("normal",new et(r,3)),this.setAttribute("uv",new et(a,2));function c(u){let h=s.length/3,g=u.extractPoints(t),m=g.shape,x=g.holes;Bn.isClockWise(m)===!1&&(m=m.reverse());for(let d=0,f=x.length;d<f;d++){let b=x[d];Bn.isClockWise(b)===!0&&(x[d]=b.reverse())}let p=Bn.triangulateShape(m,x);for(let d=0,f=x.length;d<f;d++){let b=x[d];m=m.concat(b)}for(let d=0,f=m.length;d<f;d++){let b=m[d];s.push(b.x,b.y,0),r.push(0,0,1),a.push(b.x,b.y)}for(let d=0,f=p.length;d<f;d++){let b=p[d],S=b[0]+h,_=b[1]+h,w=b[2]+h;n.push(S,_,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Ag(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let a=t[e.shapes[s]];n.push(a)}return new i(n,e.curveSegments)}};function Ag(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}var ii=class i extends xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new D,g=new D,m=[],x=[],p=[],d=[];for(let f=0;f<=n;f++){let b=[],S=f/n,_=0;f===0&&a===0?_=.5/t:f===n&&l===Math.PI&&(_=-.5/t);for(let w=0;w<=t;w++){let C=w/t;h.x=-e*Math.cos(s+C*r)*Math.sin(a+S*o),h.y=e*Math.cos(a+S*o),h.z=e*Math.sin(s+C*r)*Math.sin(a+S*o),x.push(h.x,h.y,h.z),g.copy(h).normalize(),p.push(g.x,g.y,g.z),d.push(C+_,1-S),b.push(c++)}u.push(b)}for(let f=0;f<n;f++)for(let b=0;b<t;b++){let S=u[f][b+1],_=u[f][b],w=u[f+1][b],C=u[f+1][b+1];(f!==0||a>0)&&m.push(S,_,C),(f!==n-1||l<Math.PI)&&m.push(_,w,C)}this.setIndex(m),this.setAttribute("position",new et(x,3)),this.setAttribute("normal",new et(p,3)),this.setAttribute("uv",new et(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ca=class i extends xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],u=new D,h=new D,g=new D;for(let m=0;m<=n;m++)for(let x=0;x<=s;x++){let p=x/s*r,d=m/n*Math.PI*2;h.x=(e+t*Math.cos(d))*Math.cos(p),h.y=(e+t*Math.cos(d))*Math.sin(p),h.z=t*Math.sin(d),o.push(h.x,h.y,h.z),u.x=e*Math.cos(p),u.y=e*Math.sin(p),g.subVectors(h,u).normalize(),l.push(g.x,g.y,g.z),c.push(x/s),c.push(m/n)}for(let m=1;m<=n;m++)for(let x=1;x<=s;x++){let p=(s+1)*m+x-1,d=(s+1)*(m-1)+x-1,f=(s+1)*(m-1)+x,b=(s+1)*m+x;a.push(p,d,b),a.push(d,f,b)}this.setIndex(a),this.setAttribute("position",new et(o,3)),this.setAttribute("normal",new et(l,3)),this.setAttribute("uv",new et(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var ua=class extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},bt=class extends Ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Au,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var zo=class extends Ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ho=class extends Ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Cg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ki=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Vo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tu,endingEnd:tu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case nu:r=e,o=2*t-n;break;case iu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case nu:a=e,l=2*n-t;break;case iu:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,g=this._weightPrev,m=this._weightNext,x=(n-t)/(s-t),p=x*x,d=p*x,f=-g*d+2*g*p-g*x,b=(1+g)*d+(-1.5-2*g)*p+(-.5+g)*x+1,S=(-1-m)*d+(1.5+m)*p+.5*x,_=m*d-m*p;for(let w=0;w!==o;++w)r[w]=f*a[u+w]+b*a[c+w]+S*a[l+w]+_*a[h+w];return r}},Go=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),h=1-u;for(let g=0;g!==o;++g)r[g]=a[c+g]*h+a[l+g]*u;return r}},qo=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},pn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xo(t,this.TimeBufferType),this.values=xo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xo(e.times,Array),values:xo(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Vo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Nr:t=this.InterpolantFactoryMethodDiscrete;break;case Mo:t=this.InterpolantFactoryMethodLinear;break;case vo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nr;case this.InterpolantFactoryMethodLinear:return Mo;case this.InterpolantFactoryMethodSmooth:return vo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Cg(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===vo,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*n,g=h-n,m=h+n;for(let x=0;x!==n;++x){let p=t[h+x];if(p!==t[g+x]||p!==t[m+x]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,g=a*n;for(let m=0;m!==n;++m)t[g+m]=t[h+m]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=Mo;var Si=class extends pn{constructor(e,t,n){super(e,t,n)}};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=Nr;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends pn{constructor(e,t,n,s){super(e,t,n,s)}};Wo.prototype.ValueTypeName="color";var Xo=class extends pn{constructor(e,t,n,s){super(e,t,n,s)}};Xo.prototype.ValueTypeName="number";var $o=class extends Ki{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)bn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ha=class extends pn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new $o(this.times,this.values,this.getValueSize(),e)}};ha.prototype.ValueTypeName="quaternion";ha.prototype.InterpolantFactoryMethodSmooth=void 0;var wi=class extends pn{constructor(e,t,n){super(e,t,n)}};wi.prototype.ValueTypeName="string";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=Nr;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Yo=class extends pn{constructor(e,t,n,s){super(e,t,n,s)}};Yo.prototype.ValueTypeName="vector";var Zo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,g=c.length;h<g;h+=2){let m=c[h],x=c[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},kf=new Zo,jo=class{constructor(e){this.manager=e!==void 0?e:kf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};jo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xs=class extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Qi=class extends Xs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Qc=new rt,Xd=new D,$d=new D,Jo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=Un,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zs,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Xd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xd),$d.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($d),t.updateMatrixWorld(),Qc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Yd=new rt,Rr=new D,eu=new D,uu=class extends Jo{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Rr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Rr),eu.copy(n.position),eu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(eu),n.updateMatrixWorld(),s.makeTranslation(-Rr.x,-Rr.y,-Rr.z),Yd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yd,n.coordinateSystem,n.reversedDepth)}},$s=class extends Xs{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new uu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},es=class extends Vr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},hu=class extends Jo{constructor(){super(new es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ts=class extends Xs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new hu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ko=class extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ns=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Nu="\\[\\]\\.:\\/",Rg=new RegExp("["+Nu+"]","g"),Fu="[^"+Nu+"]",Ig="[^"+Nu.replace("\\.","")+"]",Pg=/((?:WC+[\/:])*)/.source.replace("WC",Fu),Lg=/(WCOD+)?/.source.replace("WCOD",Ig),Dg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fu),Ug=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fu),Ng=new RegExp("^"+Pg+Lg+Dg+Ug+"$"),Fg=["material","materials","bones","map"],du=class{constructor(e,t,n){let s=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rg,"")}static parseTrackName(e){let t=Ng.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Fg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yt.Composite=du;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zb=new Float32Array(1);var Zd=new rt,da=class{constructor(e,t,n=0,s=1/0){this.ray=new ti(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Bs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Zd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Zd),this}intersectObject(e,t=!0,n=[]){return fu(e,this,n,t),n.sort(jd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)fu(e[s],this,n,t);return n.sort(jd),n}};function jd(i,e){return i.distance-e.distance}function fu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)fu(r[a],e,t,!0)}}var Ys=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=$e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos($e(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var fa=class extends zn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ou(i,e,t,n){let s=Og(n);switch(t){case wu:return i*e;case vl:return i*e/s.components*s.byteLength;case _l:return i*e/s.components*s.byteLength;case Tu:return i*e*2/s.components*s.byteLength;case yl:return i*e*2/s.components*s.byteLength;case Eu:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case bl:return i*e*4/s.components*s.byteLength;case ga:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case va:case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:case El:return Math.max(i,16)*Math.max(e,8)/4;case Ml:case wl:return Math.max(i,8)*Math.max(e,8)/2;case Tl:case Al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Il:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Pl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ul:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Fl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ol:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case kl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case zl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Hl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Vl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Gl:case ql:case Wl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Xl:case $l:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Yl:case Zl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Og(i){switch(i){case Un:case yu:return{byteLength:1,components:1};case js:case bu:case Mn:return{byteLength:2,components:1};case gl:case xl:return{byteLength:2,components:4};case Ii:case ml:case Nn:return{byteLength:4,components:1};case Mu:case Su:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function cp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function kg(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,g=i.createBuffer();i.bindBuffer(l,g),i.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:g,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((m,x)=>m.start-x.start);let g=0;for(let m=1;m<h.length;m++){let x=h[g],p=h[m];p.start<=x.start+x.count+1?x.count=Math.max(x.count,p.start+p.count-x.start):(++g,h[g]=p)}h.length=g+1;for(let m=0,x=h.length;m<x;m++){let p=h[m];i.bufferSubData(c,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var zg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hg=`#ifdef USE_ALPHAHASH
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
#endif`,Vg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xg=`#ifdef USE_AOMAP
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
#endif`,$g=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yg=`#ifdef USE_BATCHING
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
#endif`,Zg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qg=`#ifdef USE_IRIDESCENCE
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
#endif`,e0=`#ifdef USE_BUMPMAP
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
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,c0=`#define PI 3.141592653589793
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
} // validated`,u0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,h0=`vec3 transformedNormal = objectNormal;
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
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,f0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,p0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,g0="gl_FragColor = linearToOutputTexel( gl_FragColor );",x0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,v0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,y0=`#ifdef USE_ENVMAP
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
#endif`,b0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,M0=`#ifdef USE_ENVMAP
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
#endif`,S0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,E0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,T0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,A0=`#ifdef USE_GRADIENTMAP
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
}`,C0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,R0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,P0=`uniform bool receiveShadow;
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
#endif`,L0=`#ifdef USE_ENVMAP
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
#endif`,D0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,U0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,N0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O0=`PhysicalMaterial material;
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
#endif`,B0=`struct PhysicalMaterial {
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
}`,k0=`
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
#endif`,z0=`#if defined( RE_IndirectDiffuse )
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
#endif`,H0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,X0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z0=`#if defined( USE_POINTS_UV )
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
#endif`,j0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,J0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Q0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ex=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tx=`#ifdef USE_MORPHTARGETS
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
#endif`,nx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ix=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ox=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lx=`#ifdef USE_NORMALMAP
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
#endif`,cx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ux=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,px=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,mx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_x=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wx=`float getShadowMask() {
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
}`,Ex=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tx=`#ifdef USE_SKINNING
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
#endif`,Ax=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cx=`#ifdef USE_SKINNING
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
#endif`,Rx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ix=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Px=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dx=`#ifdef USE_TRANSMISSION
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
#endif`,Ux=`#ifdef USE_TRANSMISSION
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
#endif`,Nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zx=`uniform sampler2D t2D;
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
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wx=`#include <common>
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
}`,Xx=`#if DEPTH_PACKING == 3200
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
}`,$x=`#define DISTANCE
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
}`,Yx=`#define DISTANCE
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
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`uniform float scale;
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
}`,Kx=`uniform vec3 diffuse;
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
}`,Qx=`#include <common>
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
}`,ev=`uniform vec3 diffuse;
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
}`,tv=`#define LAMBERT
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
}`,nv=`#define LAMBERT
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
}`,iv=`#define MATCAP
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
}`,sv=`#define MATCAP
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
}`,rv=`#define NORMAL
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
}`,av=`#define NORMAL
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
}`,ov=`#define PHONG
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
}`,lv=`#define PHONG
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
}`,cv=`#define STANDARD
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
}`,uv=`#define STANDARD
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
}`,hv=`#define TOON
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
}`,dv=`#define TOON
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
}`,fv=`uniform float size;
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
}`,pv=`uniform vec3 diffuse;
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
}`,mv=`#include <common>
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
}`,gv=`uniform vec3 color;
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
}`,xv=`uniform float rotation;
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
}`,vv=`uniform vec3 diffuse;
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
}`,Ye={alphahash_fragment:zg,alphahash_pars_fragment:Hg,alphamap_fragment:Vg,alphamap_pars_fragment:Gg,alphatest_fragment:qg,alphatest_pars_fragment:Wg,aomap_fragment:Xg,aomap_pars_fragment:$g,batching_pars_vertex:Yg,batching_vertex:Zg,begin_vertex:jg,beginnormal_vertex:Jg,bsdfs:Kg,iridescence_fragment:Qg,bumpmap_pars_fragment:e0,clipping_planes_fragment:t0,clipping_planes_pars_fragment:n0,clipping_planes_pars_vertex:i0,clipping_planes_vertex:s0,color_fragment:r0,color_pars_fragment:a0,color_pars_vertex:o0,color_vertex:l0,common:c0,cube_uv_reflection_fragment:u0,defaultnormal_vertex:h0,displacementmap_pars_vertex:d0,displacementmap_vertex:f0,emissivemap_fragment:p0,emissivemap_pars_fragment:m0,colorspace_fragment:g0,colorspace_pars_fragment:x0,envmap_fragment:v0,envmap_common_pars_fragment:_0,envmap_pars_fragment:y0,envmap_pars_vertex:b0,envmap_physical_pars_fragment:L0,envmap_vertex:M0,fog_vertex:S0,fog_pars_vertex:w0,fog_fragment:E0,fog_pars_fragment:T0,gradientmap_pars_fragment:A0,lightmap_pars_fragment:C0,lights_lambert_fragment:R0,lights_lambert_pars_fragment:I0,lights_pars_begin:P0,lights_toon_fragment:D0,lights_toon_pars_fragment:U0,lights_phong_fragment:N0,lights_phong_pars_fragment:F0,lights_physical_fragment:O0,lights_physical_pars_fragment:B0,lights_fragment_begin:k0,lights_fragment_maps:z0,lights_fragment_end:H0,logdepthbuf_fragment:V0,logdepthbuf_pars_fragment:G0,logdepthbuf_pars_vertex:q0,logdepthbuf_vertex:W0,map_fragment:X0,map_pars_fragment:$0,map_particle_fragment:Y0,map_particle_pars_fragment:Z0,metalnessmap_fragment:j0,metalnessmap_pars_fragment:J0,morphinstance_vertex:K0,morphcolor_vertex:Q0,morphnormal_vertex:ex,morphtarget_pars_vertex:tx,morphtarget_vertex:nx,normal_fragment_begin:ix,normal_fragment_maps:sx,normal_pars_fragment:rx,normal_pars_vertex:ax,normal_vertex:ox,normalmap_pars_fragment:lx,clearcoat_normal_fragment_begin:cx,clearcoat_normal_fragment_maps:ux,clearcoat_pars_fragment:hx,iridescence_pars_fragment:dx,opaque_fragment:fx,packing:px,premultiplied_alpha_fragment:mx,project_vertex:gx,dithering_fragment:xx,dithering_pars_fragment:vx,roughnessmap_fragment:_x,roughnessmap_pars_fragment:yx,shadowmap_pars_fragment:bx,shadowmap_pars_vertex:Mx,shadowmap_vertex:Sx,shadowmask_pars_fragment:wx,skinbase_vertex:Ex,skinning_pars_vertex:Tx,skinning_vertex:Ax,skinnormal_vertex:Cx,specularmap_fragment:Rx,specularmap_pars_fragment:Ix,tonemapping_fragment:Px,tonemapping_pars_fragment:Lx,transmission_fragment:Dx,transmission_pars_fragment:Ux,uv_pars_fragment:Nx,uv_pars_vertex:Fx,uv_vertex:Ox,worldpos_vertex:Bx,background_vert:kx,background_frag:zx,backgroundCube_vert:Hx,backgroundCube_frag:Vx,cube_vert:Gx,cube_frag:qx,depth_vert:Wx,depth_frag:Xx,distanceRGBA_vert:$x,distanceRGBA_frag:Yx,equirect_vert:Zx,equirect_frag:jx,linedashed_vert:Jx,linedashed_frag:Kx,meshbasic_vert:Qx,meshbasic_frag:ev,meshlambert_vert:tv,meshlambert_frag:nv,meshmatcap_vert:iv,meshmatcap_frag:sv,meshnormal_vert:rv,meshnormal_frag:av,meshphong_vert:ov,meshphong_frag:lv,meshphysical_vert:cv,meshphysical_frag:uv,meshtoon_vert:hv,meshtoon_frag:dv,points_vert:fv,points_frag:pv,shadow_vert:mv,shadow_frag:gv,sprite_vert:xv,sprite_frag:vv},Se={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},qn={basic:{uniforms:Zt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Zt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Zt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Zt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Zt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Zt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Zt([Se.points,Se.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Zt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Zt([Se.common,Se.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Zt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Zt([Se.sprite,Se.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:Zt([Se.common,Se.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:Zt([Se.lights,Se.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};qn.physical={uniforms:Zt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};var jl={r:0,b:0,g:0},as=new Pn,_v=new rt;function yv(i,e,t,n,s,r,a){let o=new Ue(0),l=r===!0?0:1,c,u,h=null,g=0,m=null;function x(S){let _=S.isScene===!0?S.background:null;return _&&_.isTexture&&(_=(S.backgroundBlurriness>0?t:e).get(_)),_}function p(S){let _=!1,w=x(S);w===null?f(o,l):w&&w.isColor&&(f(w,1),_=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(S,_){let w=x(_);w&&(w.isCubeTexture||w.mapping===pa)?(u===void 0&&(u=new Ze(new vt(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:rs(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,L,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),as.copy(_.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(_v.makeRotationFromEuler(as)),u.material.toneMapped=Qe.getTransfer(w.colorSpace)!==it,(h!==w||g!==w.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,h=w,g=w.version,m=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Ze(new ni(2,2),new Tt({name:"BackgroundMaterial",uniforms:rs(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(w.colorSpace)!==it,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||g!==w.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,h=w,g=w.version,m=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,_){S.getRGB(jl,Du(i)),n.buffers.color.setClear(jl.r,jl.g,jl.b,_,a)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,_=1){o.set(S),l=_,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(o,l)},render:p,addToRenderList:d,dispose:b}}function bv(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=g(null),r=s,a=!1;function o(y,P,O,G,j){let Y=!1,J=h(G,O,P);r!==J&&(r=J,c(r.object)),Y=m(y,G,O,j),Y&&x(y,G,O,j),j!==null&&e.update(j,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,_(y,P,O,G),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,P,O){let G=O.wireframe===!0,j=n[y.id];j===void 0&&(j={},n[y.id]=j);let Y=j[P.id];Y===void 0&&(Y={},j[P.id]=Y);let J=Y[G];return J===void 0&&(J=g(l()),Y[G]=J),J}function g(y){let P=[],O=[],G=[];for(let j=0;j<t;j++)P[j]=0,O[j]=0,G[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:G,object:y,attributes:{},index:null}}function m(y,P,O,G){let j=r.attributes,Y=P.attributes,J=0,oe=O.getAttributes();for(let K in oe)if(oe[K].location>=0){let Me=j[K],Te=Y[K];if(Te===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(Te=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(Te=y.instanceColor)),Me===void 0||Me.attribute!==Te||Te&&Me.data!==Te.data)return!0;J++}return r.attributesNum!==J||r.index!==G}function x(y,P,O,G){let j={},Y=P.attributes,J=0,oe=O.getAttributes();for(let K in oe)if(oe[K].location>=0){let Me=Y[K];Me===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(Me=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(Me=y.instanceColor));let Te={};Te.attribute=Me,Me&&Me.data&&(Te.data=Me.data),j[K]=Te,J++}r.attributes=j,r.attributesNum=J,r.index=G}function p(){let y=r.newAttributes;for(let P=0,O=y.length;P<O;P++)y[P]=0}function d(y){f(y,0)}function f(y,P){let O=r.newAttributes,G=r.enabledAttributes,j=r.attributeDivisors;O[y]=1,G[y]===0&&(i.enableVertexAttribArray(y),G[y]=1),j[y]!==P&&(i.vertexAttribDivisor(y,P),j[y]=P)}function b(){let y=r.newAttributes,P=r.enabledAttributes;for(let O=0,G=P.length;O<G;O++)P[O]!==y[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function S(y,P,O,G,j,Y,J){J===!0?i.vertexAttribIPointer(y,P,O,j,Y):i.vertexAttribPointer(y,P,O,G,j,Y)}function _(y,P,O,G){p();let j=G.attributes,Y=O.getAttributes(),J=P.defaultAttributeValues;for(let oe in Y){let K=Y[oe];if(K.location>=0){let pe=j[oe];if(pe===void 0&&(oe==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),oe==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),pe!==void 0){let Me=pe.normalized,Te=pe.itemSize,Fe=e.get(pe);if(Fe===void 0)continue;let Be=Fe.buffer,Je=Fe.type,je=Fe.bytesPerElement,z=Je===i.INT||Je===i.UNSIGNED_INT||pe.gpuType===ml;if(pe.isInterleavedBufferAttribute){let W=pe.data,ue=W.stride,ge=pe.offset;if(W.isInstancedInterleavedBuffer){for(let be=0;be<K.locationSize;be++)f(K.location+be,W.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let be=0;be<K.locationSize;be++)d(K.location+be);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let be=0;be<K.locationSize;be++)S(K.location+be,Te/K.locationSize,Je,Me,ue*je,(ge+Te/K.locationSize*be)*je,z)}else{if(pe.isInstancedBufferAttribute){for(let W=0;W<K.locationSize;W++)f(K.location+W,pe.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let W=0;W<K.locationSize;W++)d(K.location+W);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let W=0;W<K.locationSize;W++)S(K.location+W,Te/K.locationSize,Je,Me,Te*je,Te/K.locationSize*W*je,z)}}else if(J!==void 0){let Me=J[oe];if(Me!==void 0)switch(Me.length){case 2:i.vertexAttrib2fv(K.location,Me);break;case 3:i.vertexAttrib3fv(K.location,Me);break;case 4:i.vertexAttrib4fv(K.location,Me);break;default:i.vertexAttrib1fv(K.location,Me)}}}}b()}function w(){T();for(let y in n){let P=n[y];for(let O in P){let G=P[O];for(let j in G)u(G[j].object),delete G[j];delete P[O]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;let P=n[y.id];for(let O in P){let G=P[O];for(let j in G)u(G[j].object),delete G[j];delete P[O]}delete n[y.id]}function L(y){for(let P in n){let O=n[P];if(O[y.id]===void 0)continue;let G=O[y.id];for(let j in G)u(G[j].object),delete G[j];delete O[y.id]}}function T(){M(),a=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:M,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:p,enableAttribute:d,disableUnusedAttributes:b}}function Mv(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let m=0;for(let x=0;x<h;x++)m+=u[x];t.update(m,n,1)}function l(c,u,h,g){if(h===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<c.length;x++)a(c[x],u[x],g[x]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,u,0,g,0,h);let x=0;for(let p=0;p<h;p++)x+=u[p]*g[p];t.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Sv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Sn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){let T=L===Mn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Un&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Nn&&!T)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=x>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:g,maxTextures:m,maxVertexTextures:x,maxTextureSize:p,maxCubemapSize:d,maxAttributes:f,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:w,maxSamples:C}}function wv(i){let e=this,t=null,n=0,s=!1,r=!1,a=new yn,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,g){let m=h.length!==0||g||n!==0||s;return s=g,n=h.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,g){t=u(h,g,0)},this.setState=function(h,g,m){let x=h.clippingPlanes,p=h.clipIntersection,d=h.clipShadows,f=i.get(h);if(!s||x===null||x.length===0||r&&!d)r?u(null):c();else{let b=r?0:n,S=b*4,_=f.clippingState||null;l.value=_,_=u(x,g,S,m);for(let w=0;w!==S;++w)_[w]=t[w];f.clippingState=_,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,g,m,x){let p=h!==null?h.length:0,d=null;if(p!==0){if(d=l.value,x!==!0||d===null){let f=m+p*4,b=g.matrixWorldInverse;o.getNormalMatrix(b),(d===null||d.length<f)&&(d=new Float32Array(f));for(let S=0,_=m;S!==p;++S,_+=4)a.copy(h[S]).applyMatrix4(b,o),a.normal.toArray(d,_),d[_+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,d}}function Ev(i){let e=new WeakMap;function t(a,o){return o===dl?a.mapping=is:o===fl&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===dl||o===fl)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Co(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var er=4,zf=[.125,.215,.35,.446,.526,.582],cs=20,Bu=new es,Hf=new Ue,ku=null,zu=0,Hu=0,Vu=!1,ls=(1+Math.sqrt(5))/2,Qs=1/ls,Vf=[new D(-ls,Qs,0),new D(ls,Qs,0),new D(-Qs,0,ls),new D(Qs,0,ls),new D(0,ls,-Qs),new D(0,ls,Qs),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Tv=new D,Ql=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Tv}=r;ku=this._renderer.getRenderTarget(),zu=this._renderer.getActiveCubeFace(),Hu=this._renderer.getActiveMipmapLevel(),Vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,zu,Hu),this._renderer.xr.enabled=Vu,e.scissorTest=!1,Jl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),zu=this._renderer.getActiveCubeFace(),Hu=this._renderer.getActiveMipmapLevel(),Vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:In,minFilter:In,generateMipmaps:!1,type:Mn,format:Sn,colorSpace:Wi,depthBuffer:!1},s=Gf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Av(r)),this._blurMaterial=Cv(r,e,t)}return s}_compileMaterial(e){let t=new Ze(this._lodPlanes[0],e);this._renderer.compile(t,Bu)}_sceneToCubeUV(e,t,n,s,r){let l=new Ft(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,g=h.autoClear,m=h.toneMapping;h.getClearColor(Hf),h.toneMapping=si,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let p=new on({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),d=new Ze(new vt,p),f=!1,b=e.background;b?b.isColor&&(p.color.copy(b),e.background=null,f=!0):(p.color.copy(Hf),f=!0);for(let S=0;S<6;S++){let _=S%3;_===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[S],r.y,r.z)):_===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[S]));let w=this._cubeSize;Jl(s,_*w,S>2?w:0,w,w),h.setRenderTarget(s),f&&h.render(d,l),h.render(e,l)}d.geometry.dispose(),d.material.dispose(),h.toneMapping=m,h.autoClear=g,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===is||e.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ze(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Jl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Bu)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Vf[(s-r-1)%Vf.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Ze(this._lodPlanes[s],c),g=c.uniforms,m=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*cs-1),p=r/x,d=isFinite(r)?1+Math.floor(u*p):cs;d>cs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${cs}`);let f=[],b=0;for(let L=0;L<cs;++L){let T=L/p,M=Math.exp(-T*T/2);f.push(M),L===0?b+=M:L<d&&(b+=2*M)}for(let L=0;L<f.length;L++)f[L]=f[L]/b;g.envMap.value=e.texture,g.samples.value=d,g.weights.value=f,g.latitudinal.value=a==="latitudinal",o&&(g.poleAxis.value=o);let{_lodMax:S}=this;g.dTheta.value=x,g.mipInt.value=S-n;let _=this._sizeLods[s],w=3*_*(s>S-er?s-S+er:0),C=4*(this._cubeSize-_);Jl(t,w,C,3*_,2*_),l.setRenderTarget(t),l.render(h,Bu)}};function Av(i){let e=[],t=[],n=[],s=i,r=i-er+1+zf.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-er?l=zf[a-i+er-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,g=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,x=6,p=3,d=2,f=1,b=new Float32Array(p*x*m),S=new Float32Array(d*x*m),_=new Float32Array(f*x*m);for(let C=0;C<m;C++){let L=C%3*2/3-1,T=C>2?0:-1,M=[L,T,0,L+2/3,T,0,L+2/3,T+1,0,L,T,0,L+2/3,T+1,0,L,T+1,0];b.set(M,p*x*C),S.set(g,d*x*C);let y=[C,C,C,C,C,C];_.set(y,f*x*C)}let w=new xt;w.setAttribute("position",new Lt(b,p)),w.setAttribute("uv",new Lt(S,d)),w.setAttribute("faceIndex",new Lt(_,f)),e.push(w),s>er&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gf(i,e,t){let n=new Yt(i,e,t);return n.texture.mapping=pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Jl(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Cv(i,e,t){let n=new Float32Array(cs),s=new D(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:cs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function qf(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Wf(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Ku(){return`

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
	`}function Rv(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===dl||l===fl,u=l===is||l===ss;if(c||u){let h=e.get(o),g=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==g)return t===null&&(t=new Ql(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let m=o.image;return c&&m&&m.height>0||u&&m&&s(m)?(t===null&&(t=new Ql(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Iv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Fs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Pv(i,e,t,n){let s={},r=new WeakMap;function a(h){let g=h.target;g.index!==null&&e.remove(g.index);for(let x in g.attributes)e.remove(g.attributes[x]);g.removeEventListener("dispose",a),delete s[g.id];let m=r.get(g);m&&(e.remove(m),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function o(h,g){return s[g.id]===!0||(g.addEventListener("dispose",a),s[g.id]=!0,t.memory.geometries++),g}function l(h){let g=h.attributes;for(let m in g)e.update(g[m],i.ARRAY_BUFFER)}function c(h){let g=[],m=h.index,x=h.attributes.position,p=0;if(m!==null){let b=m.array;p=m.version;for(let S=0,_=b.length;S<_;S+=3){let w=b[S+0],C=b[S+1],L=b[S+2];g.push(w,C,C,L,L,w)}}else if(x!==void 0){let b=x.array;p=x.version;for(let S=0,_=b.length/3-1;S<_;S+=3){let w=S+0,C=S+1,L=S+2;g.push(w,C,C,L,L,w)}}else return;let d=new(Lu(g)?Hr:zr)(g,1);d.version=p;let f=r.get(h);f&&e.remove(f),r.set(h,d)}function u(h){let g=r.get(h);if(g){let m=h.index;m!==null&&g.version<m.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Lv(i,e,t){let n;function s(g){n=g}let r,a;function o(g){r=g.type,a=g.bytesPerElement}function l(g,m){i.drawElements(n,m,r,g*a),t.update(m,n,1)}function c(g,m,x){x!==0&&(i.drawElementsInstanced(n,m,r,g*a,x),t.update(m,n,x))}function u(g,m,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,g,0,x);let d=0;for(let f=0;f<x;f++)d+=m[f];t.update(d,n,1)}function h(g,m,x,p){if(x===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<g.length;f++)c(g[f]/a,m[f],p[f]);else{d.multiDrawElementsInstancedWEBGL(n,m,0,r,g,0,p,0,x);let f=0;for(let b=0;b<x;b++)f+=m[b]*p[b];t.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Dv(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Uv(i,e,t){let n=new WeakMap,s=new ct;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,g=n.get(o);if(g===void 0||g.count!==h){let M=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",M)};g!==void 0&&g.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],S=0;m===!0&&(S=1),x===!0&&(S=2),p===!0&&(S=3);let _=o.attributes.position.count*S,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let C=new Float32Array(_*w*4*h),L=new kr(C,_,w,h);L.type=Nn,L.needsUpdate=!0;let T=S*4;for(let y=0;y<h;y++){let P=d[y],O=f[y],G=b[y],j=_*w*4*y;for(let Y=0;Y<P.count;Y++){let J=Y*T;m===!0&&(s.fromBufferAttribute(P,Y),C[j+J+0]=s.x,C[j+J+1]=s.y,C[j+J+2]=s.z,C[j+J+3]=0),x===!0&&(s.fromBufferAttribute(O,Y),C[j+J+4]=s.x,C[j+J+5]=s.y,C[j+J+6]=s.z,C[j+J+7]=0),p===!0&&(s.fromBufferAttribute(G,Y),C[j+J+8]=s.x,C[j+J+9]=s.y,C[j+J+10]=s.z,C[j+J+11]=G.itemSize===4?s.w:1)}}g={count:h,texture:L,size:new ne(_,w)},n.set(o,g),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];let x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",g.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",g.size)}return{update:r}}function Nv(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let g=l.skeleton;s.get(g)!==c&&(g.update(),s.set(g,c))}return h}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var up=new Qt,Xf=new jr(1,1),hp=new kr,dp=new To,fp=new Gr,$f=[],Yf=[],Zf=new Float32Array(16),jf=new Float32Array(9),Jf=new Float32Array(4);function ir(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=$f[s];if(r===void 0&&(r=new Float32Array(s),$f[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ec(i,e){let t=Yf[e];t===void 0&&(t=new Int32Array(e),Yf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ov(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function Bv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function kv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function zv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Jf.set(n),i.uniformMatrix2fv(this.addr,!1,Jf),kt(t,n)}}function Hv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;jf.set(n),i.uniformMatrix3fv(this.addr,!1,jf),kt(t,n)}}function Vv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Zf.set(n),i.uniformMatrix4fv(this.addr,!1,Zf),kt(t,n)}}function Gv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function qv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function Wv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function Xv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function $v(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Yv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function Zv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function jv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function Jv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Xf.compareFunction=Cu,r=Xf):r=up,t.setTexture2D(e||r,s)}function Kv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||dp,s)}function Qv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||fp,s)}function e_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||hp,s)}function t_(i){switch(i){case 5126:return Fv;case 35664:return Ov;case 35665:return Bv;case 35666:return kv;case 35674:return zv;case 35675:return Hv;case 35676:return Vv;case 5124:case 35670:return Gv;case 35667:case 35671:return qv;case 35668:case 35672:return Wv;case 35669:case 35673:return Xv;case 5125:return $v;case 36294:return Yv;case 36295:return Zv;case 36296:return jv;case 35678:case 36198:case 36298:case 36306:case 35682:return Jv;case 35679:case 36299:case 36307:return Kv;case 35680:case 36300:case 36308:case 36293:return Qv;case 36289:case 36303:case 36311:case 36292:return e_}}function n_(i,e){i.uniform1fv(this.addr,e)}function i_(i,e){let t=ir(e,this.size,2);i.uniform2fv(this.addr,t)}function s_(i,e){let t=ir(e,this.size,3);i.uniform3fv(this.addr,t)}function r_(i,e){let t=ir(e,this.size,4);i.uniform4fv(this.addr,t)}function a_(i,e){let t=ir(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function o_(i,e){let t=ir(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function l_(i,e){let t=ir(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function c_(i,e){i.uniform1iv(this.addr,e)}function u_(i,e){i.uniform2iv(this.addr,e)}function h_(i,e){i.uniform3iv(this.addr,e)}function d_(i,e){i.uniform4iv(this.addr,e)}function f_(i,e){i.uniform1uiv(this.addr,e)}function p_(i,e){i.uniform2uiv(this.addr,e)}function m_(i,e){i.uniform3uiv(this.addr,e)}function g_(i,e){i.uniform4uiv(this.addr,e)}function x_(i,e,t){let n=this.cache,s=e.length,r=ec(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||up,r[a])}function v_(i,e,t){let n=this.cache,s=e.length,r=ec(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||dp,r[a])}function __(i,e,t){let n=this.cache,s=e.length,r=ec(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||fp,r[a])}function y_(i,e,t){let n=this.cache,s=e.length,r=ec(t,s);Bt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hp,r[a])}function b_(i){switch(i){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return u_;case 35668:case 35672:return h_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return v_;case 35680:case 36300:case 36308:case 36293:return __;case 36289:case 36303:case 36311:case 36292:return y_}}var qu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=t_(t.type)}},Wu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=b_(t.type)}},Xu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Gu=/(\w+)(\])?(\[|\.)?/g;function Kf(i,e){i.seq.push(e),i.map[e.id]=e}function M_(i,e,t){let n=i.name,s=n.length;for(Gu.lastIndex=0;;){let r=Gu.exec(n),a=Gu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Kf(t,c===void 0?new qu(o,i,e):new Wu(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Xu(o),Kf(t,h)),t=h}}}var tr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);M_(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Qf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var S_=37297,w_=0;function E_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var ep=new We;function T_(i){Qe._getMatrix(ep,Qe.workingColorSpace,i);let e=`mat3( ${ep.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case Fr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function tp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+E_(i.getShaderSource(e),o)}else return r}function A_(i,e){let t=T_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function C_(i,e){let t;switch(e){case al:t="Linear";break;case ol:t="Reinhard";break;case ll:t="Cineon";break;case Ci:t="ACESFilmic";break;case ul:t="AgX";break;case hl:t="Neutral";break;case cl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Kl=new D;function R_(){Qe.getLuminanceCoefficients(Kl);let i=Kl.x.toFixed(4),e=Kl.y.toFixed(4),t=Kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ya).join(`
`)}function P_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function L_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ya(i){return i!==""}function np(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ip(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var D_=/^[ \t]*#include +<([\w\d./]+)>/gm;function $u(i){return i.replace(D_,N_)}var U_=new Map;function N_(i,e){let t=Ye[e];if(t===void 0){let n=U_.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return $u(t)}var F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sp(i){return i.replace(F_,O_)}function O_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rp(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function B_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zs?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function k_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case is:case ss:e="ENVMAP_TYPE_CUBE";break;case pa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function z_(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===ss&&(e="ENVMAP_MODE_REFRACTION"),e}function H_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case vu:e="ENVMAP_BLENDING_MULTIPLY";break;case vf:e="ENVMAP_BLENDING_MIX";break;case _f:e="ENVMAP_BLENDING_ADD";break}return e}function V_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function G_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=B_(t),c=k_(t),u=z_(t),h=H_(t),g=V_(t),m=I_(t),x=P_(r),p=s.createProgram(),d,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ya).join(`
`),d.length>0&&(d+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ya).join(`
`),f.length>0&&(f+=`
`)):(d=[rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ya).join(`
`),f=[rp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?Ye.tonemapping_pars_fragment:"",t.toneMapping!==si?C_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,A_("linearToOutputTexel",t.outputColorSpace),R_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ya).join(`
`)),a=$u(a),a=np(a,t),a=ip(a,t),o=$u(o),o=np(o,t),o=ip(o,t),a=sp(a),o=sp(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,d=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["#define varying in",t.glslVersion===Ru?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ru?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let S=b+d+a,_=b+f+o,w=Qf(s,s.VERTEX_SHADER,S),C=Qf(s,s.FRAGMENT_SHADER,_);s.attachShader(p,w),s.attachShader(p,C),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function L(P){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(p)||"",G=s.getShaderInfoLog(w)||"",j=s.getShaderInfoLog(C)||"",Y=O.trim(),J=G.trim(),oe=j.trim(),K=!0,pe=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,w,C);else{let Me=tp(s,w,"vertex"),Te=tp(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+Y+`
`+Me+`
`+Te)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(J===""||oe==="")&&(pe=!1);pe&&(P.diagnostics={runnable:K,programLog:Y,vertexShader:{log:J,prefix:d},fragmentShader:{log:oe,prefix:f}})}s.deleteShader(w),s.deleteShader(C),T=new tr(s,p),M=L_(s,p)}let T;this.getUniforms=function(){return T===void 0&&L(this),T};let M;this.getAttributes=function(){return M===void 0&&L(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(p,S_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=w_++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=C,this}var q_=0,Yu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Zu(e),t.set(e,n)),n}},Zu=class{constructor(e){this.id=q_++,this.code=e,this.usedTimes=0}};function W_(i,e,t,n,s,r,a){let o=new Bs,l=new Yu,c=new Set,u=[],h=s.logarithmicDepthBuffer,g=s.vertexTextures,m=s.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M){return c.add(M),M===0?"uv":`uv${M}`}function d(M,y,P,O,G){let j=O.fog,Y=G.geometry,J=M.isMeshStandardMaterial?O.environment:null,oe=(M.isMeshStandardMaterial?t:e).get(M.envMap||J),K=oe&&oe.mapping===pa?oe.image.height:null,pe=x[M.type];M.precision!==null&&(m=s.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));let Me=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Te=Me!==void 0?Me.length:0,Fe=0;Y.morphAttributes.position!==void 0&&(Fe=1),Y.morphAttributes.normal!==void 0&&(Fe=2),Y.morphAttributes.color!==void 0&&(Fe=3);let Be,Je,je,z;if(pe){let st=qn[pe];Be=st.vertexShader,Je=st.fragmentShader}else Be=M.vertexShader,Je=M.fragmentShader,l.update(M),je=l.getVertexShaderID(M),z=l.getFragmentShaderID(M);let W=i.getRenderTarget(),ue=i.state.buffers.depth.getReversed(),ge=G.isInstancedMesh===!0,be=G.isBatchedMesh===!0,ke=!!M.map,Xe=!!M.matcap,U=!!oe,se=!!M.aoMap,te=!!M.lightMap,ee=!!M.bumpMap,Q=!!M.normalMap,me=!!M.displacementMap,le=!!M.emissiveMap,_e=!!M.metalnessMap,Ve=!!M.roughnessMap,ze=M.anisotropy>0,R=M.clearcoat>0,E=M.dispersion>0,I=M.iridescence>0,N=M.sheen>0,V=M.transmission>0,B=ze&&!!M.anisotropyMap,X=R&&!!M.clearcoatMap,q=R&&!!M.clearcoatNormalMap,ae=R&&!!M.clearcoatRoughnessMap,ve=I&&!!M.iridescenceMap,ie=I&&!!M.iridescenceThicknessMap,de=N&&!!M.sheenColorMap,Ce=N&&!!M.sheenRoughnessMap,we=!!M.specularMap,ye=!!M.specularColorMap,Ge=!!M.specularIntensityMap,F=V&&!!M.transmissionMap,ce=V&&!!M.thicknessMap,xe=!!M.gradientMap,Ae=!!M.alphaMap,he=M.alphaTest>0,re=!!M.alphaHash,Le=!!M.extensions,qe=si;M.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(qe=i.toneMapping);let gt={shaderID:pe,shaderType:M.type,shaderName:M.name,vertexShader:Be,fragmentShader:Je,defines:M.defines,customVertexShaderID:je,customFragmentShaderID:z,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:be,batchingColor:be&&G._colorsTexture!==null,instancing:ge,instancingColor:ge&&G.instanceColor!==null,instancingMorph:ge&&G.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:W===null?i.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:Wi,alphaToCoverage:!!M.alphaToCoverage,map:ke,matcap:Xe,envMap:U,envMapMode:U&&oe.mapping,envMapCubeUVHeight:K,aoMap:se,lightMap:te,bumpMap:ee,normalMap:Q,displacementMap:g&&me,emissiveMap:le,normalMapObjectSpace:Q&&M.normalMapType===Sf,normalMapTangentSpace:Q&&M.normalMapType===Au,metalnessMap:_e,roughnessMap:Ve,anisotropy:ze,anisotropyMap:B,clearcoat:R,clearcoatMap:X,clearcoatNormalMap:q,clearcoatRoughnessMap:ae,dispersion:E,iridescence:I,iridescenceMap:ve,iridescenceThicknessMap:ie,sheen:N,sheenColorMap:de,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:ye,specularIntensityMap:Ge,transmission:V,transmissionMap:F,thicknessMap:ce,gradientMap:xe,opaque:M.transparent===!1&&M.blending===Gi&&M.alphaToCoverage===!1,alphaMap:Ae,alphaTest:he,alphaHash:re,combine:M.combine,mapUv:ke&&p(M.map.channel),aoMapUv:se&&p(M.aoMap.channel),lightMapUv:te&&p(M.lightMap.channel),bumpMapUv:ee&&p(M.bumpMap.channel),normalMapUv:Q&&p(M.normalMap.channel),displacementMapUv:me&&p(M.displacementMap.channel),emissiveMapUv:le&&p(M.emissiveMap.channel),metalnessMapUv:_e&&p(M.metalnessMap.channel),roughnessMapUv:Ve&&p(M.roughnessMap.channel),anisotropyMapUv:B&&p(M.anisotropyMap.channel),clearcoatMapUv:X&&p(M.clearcoatMap.channel),clearcoatNormalMapUv:q&&p(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&p(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&p(M.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&p(M.iridescenceThicknessMap.channel),sheenColorMapUv:de&&p(M.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&p(M.sheenRoughnessMap.channel),specularMapUv:we&&p(M.specularMap.channel),specularColorMapUv:ye&&p(M.specularColorMap.channel),specularIntensityMapUv:Ge&&p(M.specularIntensityMap.channel),transmissionMapUv:F&&p(M.transmissionMap.channel),thicknessMapUv:ce&&p(M.thicknessMap.channel),alphaMapUv:Ae&&p(M.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Q||ze),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!Y.attributes.uv&&(ke||Ae),fog:!!j,useFog:M.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ue,skinning:G.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Fe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:qe,decodeVideoTexture:ke&&M.map.isVideoTexture===!0&&Qe.getTransfer(M.map.colorSpace)===it,decodeVideoTextureEmissive:le&&M.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(M.emissiveMap.colorSpace)===it,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===en,flipSided:M.side===qt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Le&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&M.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function f(M){let y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(let P in M.defines)y.push(P),y.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(b(y,M),S(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function b(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function S(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function _(M){let y=x[M.type],P;if(y){let O=qn[y];P=ai.clone(O.uniforms)}else P=M.uniforms;return P}function w(M,y){let P;for(let O=0,G=u.length;O<G;O++){let j=u[O];if(j.cacheKey===y){P=j,++P.usedTimes;break}}return P===void 0&&(P=new G_(i,y,M,r),u.push(P)),P}function C(M){if(--M.usedTimes===0){let y=u.indexOf(M);u[y]=u[u.length-1],u.pop(),M.destroy()}}function L(M){l.remove(M)}function T(){l.dispose()}return{getParameters:d,getProgramCacheKey:f,getUniforms:_,acquireProgram:w,releaseProgram:C,releaseShaderCache:L,programs:u,dispose:T}}function X_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function $_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ap(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function op(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,g,m,x,p,d){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:g,material:m,groupOrder:x,renderOrder:h.renderOrder,z:p,group:d},i[e]=f):(f.id=h.id,f.object=h,f.geometry=g,f.material=m,f.groupOrder=x,f.renderOrder=h.renderOrder,f.z=p,f.group=d),e++,f}function o(h,g,m,x,p,d){let f=a(h,g,m,x,p,d);m.transmission>0?n.push(f):m.transparent===!0?s.push(f):t.push(f)}function l(h,g,m,x,p,d){let f=a(h,g,m,x,p,d);m.transmission>0?n.unshift(f):m.transparent===!0?s.unshift(f):t.unshift(f)}function c(h,g){t.length>1&&t.sort(h||$_),n.length>1&&n.sort(g||ap),s.length>1&&s.sort(g||ap)}function u(){for(let h=e,g=i.length;h<g;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Y_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new op,i.set(n,[a])):s>=r.length?(a=new op,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Z_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ue};break;case"SpotLight":t={position:new D,direction:new D,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function j_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var J_=0;function K_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Q_(i){let e=new Z_,t=j_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new rt,a=new rt;function o(c){let u=0,h=0,g=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let m=0,x=0,p=0,d=0,f=0,b=0,S=0,_=0,w=0,C=0,L=0;c.sort(K_);for(let M=0,y=c.length;M<y;M++){let P=c[M],O=P.color,G=P.intensity,j=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*G,h+=O.g*G,g+=O.b*G;else if(P.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(P.sh.coefficients[J],G);L++}else if(P.isDirectionalLight){let J=e.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let oe=P.shadow,K=t.get(P);K.shadowIntensity=oe.intensity,K.shadowBias=oe.bias,K.shadowNormalBias=oe.normalBias,K.shadowRadius=oe.radius,K.shadowMapSize=oe.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=Y,n.directionalShadowMatrix[m]=P.shadow.matrix,b++}n.directional[m]=J,m++}else if(P.isSpotLight){let J=e.get(P);J.position.setFromMatrixPosition(P.matrixWorld),J.color.copy(O).multiplyScalar(G),J.distance=j,J.coneCos=Math.cos(P.angle),J.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),J.decay=P.decay,n.spot[p]=J;let oe=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,oe.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[p]=oe.matrix,P.castShadow){let K=t.get(P);K.shadowIntensity=oe.intensity,K.shadowBias=oe.bias,K.shadowNormalBias=oe.normalBias,K.shadowRadius=oe.radius,K.shadowMapSize=oe.mapSize,n.spotShadow[p]=K,n.spotShadowMap[p]=Y,_++}p++}else if(P.isRectAreaLight){let J=e.get(P);J.color.copy(O).multiplyScalar(G),J.halfWidth.set(P.width*.5,0,0),J.halfHeight.set(0,P.height*.5,0),n.rectArea[d]=J,d++}else if(P.isPointLight){let J=e.get(P);if(J.color.copy(P.color).multiplyScalar(P.intensity),J.distance=P.distance,J.decay=P.decay,P.castShadow){let oe=P.shadow,K=t.get(P);K.shadowIntensity=oe.intensity,K.shadowBias=oe.bias,K.shadowNormalBias=oe.normalBias,K.shadowRadius=oe.radius,K.shadowMapSize=oe.mapSize,K.shadowCameraNear=oe.camera.near,K.shadowCameraFar=oe.camera.far,n.pointShadow[x]=K,n.pointShadowMap[x]=Y,n.pointShadowMatrix[x]=P.shadow.matrix,S++}n.point[x]=J,x++}else if(P.isHemisphereLight){let J=e.get(P);J.skyColor.copy(P.color).multiplyScalar(G),J.groundColor.copy(P.groundColor).multiplyScalar(G),n.hemi[f]=J,f++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=g;let T=n.hash;(T.directionalLength!==m||T.pointLength!==x||T.spotLength!==p||T.rectAreaLength!==d||T.hemiLength!==f||T.numDirectionalShadows!==b||T.numPointShadows!==S||T.numSpotShadows!==_||T.numSpotMaps!==w||T.numLightProbes!==L)&&(n.directional.length=m,n.spot.length=p,n.rectArea.length=d,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=_+w-C,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=L,T.directionalLength=m,T.pointLength=x,T.spotLength=p,T.rectAreaLength=d,T.hemiLength=f,T.numDirectionalShadows=b,T.numPointShadows=S,T.numSpotShadows=_,T.numSpotMaps=w,T.numLightProbes=L,n.version=J_++)}function l(c,u){let h=0,g=0,m=0,x=0,p=0,d=u.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){let S=c[f];if(S.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(d),h++}else if(S.isSpotLight){let _=n.spot[m];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(d),_.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(d),m++}else if(S.isRectAreaLight){let _=n.rectArea[x];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(d),a.identity(),r.copy(S.matrixWorld),r.premultiply(d),a.extractRotation(r),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){let _=n.point[g];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(d),g++}else if(S.isHemisphereLight){let _=n.hemi[p];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(d),p++}}}return{setup:o,setupView:l,state:n}}function lp(i){let e=new Q_(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function ey(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new lp(i),e.set(s,[o])):r>=a.length?(o=new lp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var ty=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ny=`uniform sampler2D shadow_pass;
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
}`;function iy(i,e,t){let n=new zs,s=new ne,r=new ne,a=new ct,o=new zo({depthPacking:Mf}),l=new Ho,c={},u=t.maxTextureSize,h={[ei]:qt,[qt]:ei,[en]:en},g=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:ty,fragmentShader:ny}),m=g.clone();m.defines.HORIZONTAL_PASS=1;let x=new xt;x.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let p=new Ze(x,g),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mu;let f=this.type;this.render=function(C,L,T){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||C.length===0)return;let M=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Dn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let G=f!==Gn&&this.type===Gn,j=f===Gn&&this.type!==Gn;for(let Y=0,J=C.length;Y<J;Y++){let oe=C[Y],K=oe.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let pe=K.getFrameExtents();if(s.multiply(pe),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/pe.x),s.x=r.x*pe.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/pe.y),s.y=r.y*pe.y,K.mapSize.y=r.y)),K.map===null||G===!0||j===!0){let Te=this.type!==Gn?{minFilter:an,magFilter:an}:{};K.map!==null&&K.map.dispose(),K.map=new Yt(s.x,s.y,Te),K.map.texture.name=oe.name+".shadowMap",K.camera.updateProjectionMatrix()}i.setRenderTarget(K.map),i.clear();let Me=K.getViewportCount();for(let Te=0;Te<Me;Te++){let Fe=K.getViewport(Te);a.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),O.viewport(a),K.updateMatrices(oe,Te),n=K.getFrustum(),_(L,T,K.camera,oe,this.type)}K.isPointLightShadow!==!0&&this.type===Gn&&b(K,T),K.needsUpdate=!1}f=this.type,d.needsUpdate=!1,i.setRenderTarget(M,y,P)};function b(C,L){let T=e.update(p);g.defines.VSM_SAMPLES!==C.blurSamples&&(g.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,g.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Yt(s.x,s.y)),g.uniforms.shadow_pass.value=C.map.texture,g.uniforms.resolution.value=C.mapSize,g.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(L,null,T,g,p,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(L,null,T,m,p,null)}function S(C,L,T,M){let y=null,P=T.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)y=P;else if(y=T.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let O=y.uuid,G=L.uuid,j=c[O];j===void 0&&(j={},c[O]=j);let Y=j[G];Y===void 0&&(Y=y.clone(),j[G]=Y,L.addEventListener("dispose",w)),y=Y}if(y.visible=L.visible,y.wireframe=L.wireframe,M===Gn?y.side=L.shadowSide!==null?L.shadowSide:L.side:y.side=L.shadowSide!==null?L.shadowSide:h[L.side],y.alphaMap=L.alphaMap,y.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,y.map=L.map,y.clipShadows=L.clipShadows,y.clippingPlanes=L.clippingPlanes,y.clipIntersection=L.clipIntersection,y.displacementMap=L.displacementMap,y.displacementScale=L.displacementScale,y.displacementBias=L.displacementBias,y.wireframeLinewidth=L.wireframeLinewidth,y.linewidth=L.linewidth,T.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let O=i.properties.get(y);O.light=T}return y}function _(C,L,T,M,y){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===Gn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,C.matrixWorld);let G=e.update(C),j=C.material;if(Array.isArray(j)){let Y=G.groups;for(let J=0,oe=Y.length;J<oe;J++){let K=Y[J],pe=j[K.materialIndex];if(pe&&pe.visible){let Me=S(C,pe,M,y);C.onBeforeShadow(i,C,L,T,G,Me,K),i.renderBufferDirect(T,null,G,Me,C,K),C.onAfterShadow(i,C,L,T,G,Me,K)}}}else if(j.visible){let Y=S(C,j,M,y);C.onBeforeShadow(i,C,L,T,G,Y,null),i.renderBufferDirect(T,null,G,Y,C,null),C.onAfterShadow(i,C,L,T,G,Y,null)}}let O=C.children;for(let G=0,j=O.length;G<j;G++)_(O[G],L,T,M,y)}function w(C){C.target.removeEventListener("dispose",w);for(let T in c){let M=c[T],y=C.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}var sy={[Qo]:el,[tl]:sl,[nl]:rl,[qi]:il,[el]:Qo,[sl]:tl,[rl]:nl,[il]:qi};function ry(i,e){function t(){let F=!1,ce=new ct,xe=null,Ae=new ct(0,0,0,0);return{setMask:function(he){xe!==he&&!F&&(i.colorMask(he,he,he,he),xe=he)},setLocked:function(he){F=he},setClear:function(he,re,Le,qe,gt){gt===!0&&(he*=qe,re*=qe,Le*=qe),ce.set(he,re,Le,qe),Ae.equals(ce)===!1&&(i.clearColor(he,re,Le,qe),Ae.copy(ce))},reset:function(){F=!1,xe=null,Ae.set(-1,0,0,0)}}}function n(){let F=!1,ce=!1,xe=null,Ae=null,he=null;return{setReversed:function(re){if(ce!==re){let Le=e.get("EXT_clip_control");re?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ce=re;let qe=he;he=null,this.setClear(qe)}},getReversed:function(){return ce},setTest:function(re){re?W(i.DEPTH_TEST):ue(i.DEPTH_TEST)},setMask:function(re){xe!==re&&!F&&(i.depthMask(re),xe=re)},setFunc:function(re){if(ce&&(re=sy[re]),Ae!==re){switch(re){case Qo:i.depthFunc(i.NEVER);break;case el:i.depthFunc(i.ALWAYS);break;case tl:i.depthFunc(i.LESS);break;case qi:i.depthFunc(i.LEQUAL);break;case nl:i.depthFunc(i.EQUAL);break;case il:i.depthFunc(i.GEQUAL);break;case sl:i.depthFunc(i.GREATER);break;case rl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=re}},setLocked:function(re){F=re},setClear:function(re){he!==re&&(ce&&(re=1-re),i.clearDepth(re),he=re)},reset:function(){F=!1,xe=null,Ae=null,he=null,ce=!1}}}function s(){let F=!1,ce=null,xe=null,Ae=null,he=null,re=null,Le=null,qe=null,gt=null;return{setTest:function(st){F||(st?W(i.STENCIL_TEST):ue(i.STENCIL_TEST))},setMask:function(st){ce!==st&&!F&&(i.stencilMask(st),ce=st)},setFunc:function(st,Wn,On){(xe!==st||Ae!==Wn||he!==On)&&(i.stencilFunc(st,Wn,On),xe=st,Ae=Wn,he=On)},setOp:function(st,Wn,On){(re!==st||Le!==Wn||qe!==On)&&(i.stencilOp(st,Wn,On),re=st,Le=Wn,qe=On)},setLocked:function(st){F=st},setClear:function(st){gt!==st&&(i.clearStencil(st),gt=st)},reset:function(){F=!1,ce=null,xe=null,Ae=null,he=null,re=null,Le=null,qe=null,gt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},h={},g=new WeakMap,m=[],x=null,p=!1,d=null,f=null,b=null,S=null,_=null,w=null,C=null,L=new Ue(0,0,0),T=0,M=!1,y=null,P=null,O=null,G=null,j=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,oe=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(K)[1]),J=oe>=1):K.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),J=oe>=2);let pe=null,Me={},Te=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),Be=new ct().fromArray(Te),Je=new ct().fromArray(Fe);function je(F,ce,xe,Ae){let he=new Uint8Array(4),re=i.createTexture();i.bindTexture(F,re),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<xe;Le++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,he):i.texImage2D(ce+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,he);return re}let z={};z[i.TEXTURE_2D]=je(i.TEXTURE_2D,i.TEXTURE_2D,1),z[i.TEXTURE_CUBE_MAP]=je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[i.TEXTURE_2D_ARRAY]=je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),z[i.TEXTURE_3D]=je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),W(i.DEPTH_TEST),a.setFunc(qi),ee(!1),Q(pu),W(i.CULL_FACE),se(Dn);function W(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function ue(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function ge(F,ce){return h[F]!==ce?(i.bindFramebuffer(F,ce),h[F]=ce,F===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ce),F===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function be(F,ce){let xe=m,Ae=!1;if(F){xe=g.get(ce),xe===void 0&&(xe=[],g.set(ce,xe));let he=F.textures;if(xe.length!==he.length||xe[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Le=he.length;re<Le;re++)xe[re]=i.COLOR_ATTACHMENT0+re;xe.length=he.length,Ae=!0}}else xe[0]!==i.BACK&&(xe[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(xe)}function ke(F){return x!==F?(i.useProgram(F),x=F,!0):!1}let Xe={[_i]:i.FUNC_ADD,[ef]:i.FUNC_SUBTRACT,[tf]:i.FUNC_REVERSE_SUBTRACT};Xe[nf]=i.MIN,Xe[sf]=i.MAX;let U={[rf]:i.ZERO,[af]:i.ONE,[of]:i.SRC_COLOR,[_o]:i.SRC_ALPHA,[ff]:i.SRC_ALPHA_SATURATE,[hf]:i.DST_COLOR,[cf]:i.DST_ALPHA,[lf]:i.ONE_MINUS_SRC_COLOR,[yo]:i.ONE_MINUS_SRC_ALPHA,[df]:i.ONE_MINUS_DST_COLOR,[uf]:i.ONE_MINUS_DST_ALPHA,[pf]:i.CONSTANT_COLOR,[mf]:i.ONE_MINUS_CONSTANT_COLOR,[gf]:i.CONSTANT_ALPHA,[xf]:i.ONE_MINUS_CONSTANT_ALPHA};function se(F,ce,xe,Ae,he,re,Le,qe,gt,st){if(F===Dn){p===!0&&(ue(i.BLEND),p=!1);return}if(p===!1&&(W(i.BLEND),p=!0),F!==Qd){if(F!==d||st!==M){if((f!==_i||_!==_i)&&(i.blendEquation(i.FUNC_ADD),f=_i,_=_i),st)switch(F){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFunc(i.ONE,i.ONE);break;case gu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case gu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}b=null,S=null,w=null,C=null,L.set(0,0,0),T=0,d=F,M=st}return}he=he||ce,re=re||xe,Le=Le||Ae,(ce!==f||he!==_)&&(i.blendEquationSeparate(Xe[ce],Xe[he]),f=ce,_=he),(xe!==b||Ae!==S||re!==w||Le!==C)&&(i.blendFuncSeparate(U[xe],U[Ae],U[re],U[Le]),b=xe,S=Ae,w=re,C=Le),(qe.equals(L)===!1||gt!==T)&&(i.blendColor(qe.r,qe.g,qe.b,gt),L.copy(qe),T=gt),d=F,M=!1}function te(F,ce){F.side===en?ue(i.CULL_FACE):W(i.CULL_FACE);let xe=F.side===qt;ce&&(xe=!xe),ee(xe),F.blending===Gi&&F.transparent===!1?se(Dn):se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let Ae=F.stencilWrite;o.setTest(Ae),Ae&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),le(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?W(i.SAMPLE_ALPHA_TO_COVERAGE):ue(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(F){y!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),y=F)}function Q(F){F!==Jd?(W(i.CULL_FACE),F!==P&&(F===pu?i.cullFace(i.BACK):F===Kd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ue(i.CULL_FACE),P=F}function me(F){F!==O&&(J&&i.lineWidth(F),O=F)}function le(F,ce,xe){F?(W(i.POLYGON_OFFSET_FILL),(G!==ce||j!==xe)&&(i.polygonOffset(ce,xe),G=ce,j=xe)):ue(i.POLYGON_OFFSET_FILL)}function _e(F){F?W(i.SCISSOR_TEST):ue(i.SCISSOR_TEST)}function Ve(F){F===void 0&&(F=i.TEXTURE0+Y-1),pe!==F&&(i.activeTexture(F),pe=F)}function ze(F,ce,xe){xe===void 0&&(pe===null?xe=i.TEXTURE0+Y-1:xe=pe);let Ae=Me[xe];Ae===void 0&&(Ae={type:void 0,texture:void 0},Me[xe]=Ae),(Ae.type!==F||Ae.texture!==ce)&&(pe!==xe&&(i.activeTexture(xe),pe=xe),i.bindTexture(F,ce||z[F]),Ae.type=F,Ae.texture=ce)}function R(){let F=Me[pe];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function E(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function N(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function V(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function B(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function X(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function q(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(F){Be.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Be.copy(F))}function Ce(F){Je.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Je.copy(F))}function we(F,ce){let xe=c.get(ce);xe===void 0&&(xe=new WeakMap,c.set(ce,xe));let Ae=xe.get(F);Ae===void 0&&(Ae=i.getUniformBlockIndex(ce,F.name),xe.set(F,Ae))}function ye(F,ce){let Ae=c.get(ce).get(F);l.get(ce)!==Ae&&(i.uniformBlockBinding(ce,Ae,F.__bindingPointIndex),l.set(ce,Ae))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},pe=null,Me={},h={},g=new WeakMap,m=[],x=null,p=!1,d=null,f=null,b=null,S=null,_=null,w=null,C=null,L=new Ue(0,0,0),T=0,M=!1,y=null,P=null,O=null,G=null,j=null,Be.set(0,0,i.canvas.width,i.canvas.height),Je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:W,disable:ue,bindFramebuffer:ge,drawBuffers:be,useProgram:ke,setBlending:se,setMaterial:te,setFlipSided:ee,setCullFace:Q,setLineWidth:me,setPolygonOffset:le,setScissorTest:_e,activeTexture:Ve,bindTexture:ze,unbindTexture:R,compressedTexImage2D:E,compressedTexImage3D:I,texImage2D:ve,texImage3D:ie,updateUBOMapping:we,uniformBlockBinding:ye,texStorage2D:q,texStorage3D:ae,texSubImage2D:N,texSubImage3D:V,compressedTexSubImage2D:B,compressedTexSubImage3D:X,scissor:de,viewport:Ce,reset:Ge}}function ay(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,u=new WeakMap,h,g=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,E){return m?new OffscreenCanvas(R,E):Br("canvas")}function p(R,E,I){let N=1,V=ze(R);if((V.width>I||V.height>I)&&(N=I/Math.max(V.width,V.height)),N<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let B=Math.floor(N*V.width),X=Math.floor(N*V.height);h===void 0&&(h=x(B,X));let q=E?x(B,X):h;return q.width=B,q.height=X,q.getContext("2d").drawImage(R,0,0,B,X),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+V.width+"x"+V.height+") to ("+B+"x"+X+")."),q}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+V.width+"x"+V.height+")."),R;return R}function d(R){return R.generateMipmaps}function f(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(R,E,I,N,V=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let B=E;if(E===i.RED&&(I===i.FLOAT&&(B=i.R32F),I===i.HALF_FLOAT&&(B=i.R16F),I===i.UNSIGNED_BYTE&&(B=i.R8)),E===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(B=i.R8UI),I===i.UNSIGNED_SHORT&&(B=i.R16UI),I===i.UNSIGNED_INT&&(B=i.R32UI),I===i.BYTE&&(B=i.R8I),I===i.SHORT&&(B=i.R16I),I===i.INT&&(B=i.R32I)),E===i.RG&&(I===i.FLOAT&&(B=i.RG32F),I===i.HALF_FLOAT&&(B=i.RG16F),I===i.UNSIGNED_BYTE&&(B=i.RG8)),E===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(B=i.RG8UI),I===i.UNSIGNED_SHORT&&(B=i.RG16UI),I===i.UNSIGNED_INT&&(B=i.RG32UI),I===i.BYTE&&(B=i.RG8I),I===i.SHORT&&(B=i.RG16I),I===i.INT&&(B=i.RG32I)),E===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(B=i.RGB8UI),I===i.UNSIGNED_SHORT&&(B=i.RGB16UI),I===i.UNSIGNED_INT&&(B=i.RGB32UI),I===i.BYTE&&(B=i.RGB8I),I===i.SHORT&&(B=i.RGB16I),I===i.INT&&(B=i.RGB32I)),E===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(B=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(B=i.RGBA16UI),I===i.UNSIGNED_INT&&(B=i.RGBA32UI),I===i.BYTE&&(B=i.RGBA8I),I===i.SHORT&&(B=i.RGBA16I),I===i.INT&&(B=i.RGBA32I)),E===i.RGB&&(I===i.UNSIGNED_INT_5_9_9_9_REV&&(B=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(B=i.R11F_G11F_B10F)),E===i.RGBA){let X=V?Fr:Qe.getTransfer(N);I===i.FLOAT&&(B=i.RGBA32F),I===i.HALF_FLOAT&&(B=i.RGBA16F),I===i.UNSIGNED_BYTE&&(B=X===it?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(B=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(B=i.RGB5_A1)}return(B===i.R16F||B===i.R32F||B===i.RG16F||B===i.RG32F||B===i.RGBA16F||B===i.RGBA32F)&&e.get("EXT_color_buffer_float"),B}function _(R,E){let I;return R?E===null||E===Ii||E===Js?I=i.DEPTH24_STENCIL8:E===Nn?I=i.DEPTH32F_STENCIL8:E===js&&(I=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ii||E===Js?I=i.DEPTH_COMPONENT24:E===Nn?I=i.DEPTH_COMPONENT32F:E===js&&(I=i.DEPTH_COMPONENT16),I}function w(R,E){return d(R)===!0||R.isFramebufferTexture&&R.minFilter!==an&&R.minFilter!==In?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function C(R){let E=R.target;E.removeEventListener("dispose",C),T(E),E.isVideoTexture&&u.delete(E)}function L(R){let E=R.target;E.removeEventListener("dispose",L),y(E)}function T(R){let E=n.get(R);if(E.__webglInit===void 0)return;let I=R.source,N=g.get(I);if(N){let V=N[E.__cacheKey];V.usedTimes--,V.usedTimes===0&&M(R),Object.keys(N).length===0&&g.delete(I)}n.remove(R)}function M(R){let E=n.get(R);i.deleteTexture(E.__webglTexture);let I=R.source,N=g.get(I);delete N[E.__cacheKey],a.memory.textures--}function y(R){let E=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(E.__webglFramebuffer[N]))for(let V=0;V<E.__webglFramebuffer[N].length;V++)i.deleteFramebuffer(E.__webglFramebuffer[N][V]);else i.deleteFramebuffer(E.__webglFramebuffer[N]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[N])}else{if(Array.isArray(E.__webglFramebuffer))for(let N=0;N<E.__webglFramebuffer.length;N++)i.deleteFramebuffer(E.__webglFramebuffer[N]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let N=0;N<E.__webglColorRenderbuffer.length;N++)E.__webglColorRenderbuffer[N]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[N]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let I=R.textures;for(let N=0,V=I.length;N<V;N++){let B=n.get(I[N]);B.__webglTexture&&(i.deleteTexture(B.__webglTexture),a.memory.textures--),n.remove(I[N])}n.remove(R)}let P=0;function O(){P=0}function G(){let R=P;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),P+=1,R}function j(R){let E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function Y(R,E){let I=n.get(R);if(R.isVideoTexture&&_e(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&I.__version!==R.version){let N=R.image;if(N===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(N.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(I,R,E);return}}else R.isExternalTexture&&(I.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+E)}function J(R,E){let I=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&I.__version!==R.version){z(I,R,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+E)}function oe(R,E){let I=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&I.__version!==R.version){z(I,R,E);return}t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+E)}function K(R,E){let I=n.get(R);if(R.version>0&&I.__version!==R.version){W(I,R,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+E)}let pe={[Ds]:i.REPEAT,[vi]:i.CLAMP_TO_EDGE,[bo]:i.MIRRORED_REPEAT},Me={[an]:i.NEAREST,[yf]:i.NEAREST_MIPMAP_NEAREST,[ma]:i.NEAREST_MIPMAP_LINEAR,[In]:i.LINEAR,[pl]:i.LINEAR_MIPMAP_NEAREST,[Ri]:i.LINEAR_MIPMAP_LINEAR},Te={[wf]:i.NEVER,[If]:i.ALWAYS,[Ef]:i.LESS,[Cu]:i.LEQUAL,[Tf]:i.EQUAL,[Rf]:i.GEQUAL,[Af]:i.GREATER,[Cf]:i.NOTEQUAL};function Fe(R,E){if(E.type===Nn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===In||E.magFilter===pl||E.magFilter===ma||E.magFilter===Ri||E.minFilter===In||E.minFilter===pl||E.minFilter===ma||E.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,pe[E.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,pe[E.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,pe[E.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Me[E.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Me[E.minFilter]),E.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Te[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===an||E.minFilter!==ma&&E.minFilter!==Ri||E.type===Nn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Be(R,E){let I=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",C));let N=E.source,V=g.get(N);V===void 0&&(V={},g.set(N,V));let B=j(E);if(B!==R.__cacheKey){V[B]===void 0&&(V[B]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,I=!0),V[B].usedTimes++;let X=V[R.__cacheKey];X!==void 0&&(V[R.__cacheKey].usedTimes--,X.usedTimes===0&&M(E)),R.__cacheKey=B,R.__webglTexture=V[B].texture}return I}function Je(R,E,I){return Math.floor(Math.floor(R/I)/E)}function je(R,E,I,N){let B=R.updateRanges;if(B.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,I,N,E.data);else{B.sort((ie,de)=>ie.start-de.start);let X=0;for(let ie=1;ie<B.length;ie++){let de=B[X],Ce=B[ie],we=de.start+de.count,ye=Je(Ce.start,E.width,4),Ge=Je(de.start,E.width,4);Ce.start<=we+1&&ye===Ge&&Je(Ce.start+Ce.count-1,E.width,4)===ye?de.count=Math.max(de.count,Ce.start+Ce.count-de.start):(++X,B[X]=Ce)}B.length=X+1;let q=i.getParameter(i.UNPACK_ROW_LENGTH),ae=i.getParameter(i.UNPACK_SKIP_PIXELS),ve=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let ie=0,de=B.length;ie<de;ie++){let Ce=B[ie],we=Math.floor(Ce.start/4),ye=Math.ceil(Ce.count/4),Ge=we%E.width,F=Math.floor(we/E.width),ce=ye,xe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,Ge,F,ce,xe,I,N,E.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,q),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ae),i.pixelStorei(i.UNPACK_SKIP_ROWS,ve)}}function z(R,E,I){let N=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(N=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(N=i.TEXTURE_3D);let V=Be(R,E),B=E.source;t.bindTexture(N,R.__webglTexture,i.TEXTURE0+I);let X=n.get(B);if(B.version!==X.__version||V===!0){t.activeTexture(i.TEXTURE0+I);let q=Qe.getPrimaries(Qe.workingColorSpace),ae=E.colorSpace===ri?null:Qe.getPrimaries(E.colorSpace),ve=E.colorSpace===ri||q===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let ie=p(E.image,!1,s.maxTextureSize);ie=Ve(E,ie);let de=r.convert(E.format,E.colorSpace),Ce=r.convert(E.type),we=S(E.internalFormat,de,Ce,E.colorSpace,E.isVideoTexture);Fe(N,E);let ye,Ge=E.mipmaps,F=E.isVideoTexture!==!0,ce=X.__version===void 0||V===!0,xe=B.dataReady,Ae=w(E,ie);if(E.isDepthTexture)we=_(E.format===Ks,E.type),ce&&(F?t.texStorage2D(i.TEXTURE_2D,1,we,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,we,ie.width,ie.height,0,de,Ce,null));else if(E.isDataTexture)if(Ge.length>0){F&&ce&&t.texStorage2D(i.TEXTURE_2D,Ae,we,Ge[0].width,Ge[0].height);for(let he=0,re=Ge.length;he<re;he++)ye=Ge[he],F?xe&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,ye.width,ye.height,de,Ce,ye.data):t.texImage2D(i.TEXTURE_2D,he,we,ye.width,ye.height,0,de,Ce,ye.data);E.generateMipmaps=!1}else F?(ce&&t.texStorage2D(i.TEXTURE_2D,Ae,we,ie.width,ie.height),xe&&je(E,ie,de,Ce)):t.texImage2D(i.TEXTURE_2D,0,we,ie.width,ie.height,0,de,Ce,ie.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){F&&ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,we,Ge[0].width,Ge[0].height,ie.depth);for(let he=0,re=Ge.length;he<re;he++)if(ye=Ge[he],E.format!==Sn)if(de!==null)if(F){if(xe)if(E.layerUpdates.size>0){let Le=Ou(ye.width,ye.height,E.format,E.type);for(let qe of E.layerUpdates){let gt=ye.data.subarray(qe*Le/ye.data.BYTES_PER_ELEMENT,(qe+1)*Le/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,qe,ye.width,ye.height,1,de,gt)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,ye.width,ye.height,ie.depth,de,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,we,ye.width,ye.height,ie.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?xe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,ye.width,ye.height,ie.depth,de,Ce,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,we,ye.width,ye.height,ie.depth,0,de,Ce,ye.data)}else{F&&ce&&t.texStorage2D(i.TEXTURE_2D,Ae,we,Ge[0].width,Ge[0].height);for(let he=0,re=Ge.length;he<re;he++)ye=Ge[he],E.format!==Sn?de!==null?F?xe&&t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,ye.width,ye.height,de,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,he,we,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?xe&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,ye.width,ye.height,de,Ce,ye.data):t.texImage2D(i.TEXTURE_2D,he,we,ye.width,ye.height,0,de,Ce,ye.data)}else if(E.isDataArrayTexture)if(F){if(ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,we,ie.width,ie.height,ie.depth),xe)if(E.layerUpdates.size>0){let he=Ou(ie.width,ie.height,E.format,E.type);for(let re of E.layerUpdates){let Le=ie.data.subarray(re*he/ie.data.BYTES_PER_ELEMENT,(re+1)*he/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,re,ie.width,ie.height,1,de,Ce,Le)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Ce,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,ie.width,ie.height,ie.depth,0,de,Ce,ie.data);else if(E.isData3DTexture)F?(ce&&t.texStorage3D(i.TEXTURE_3D,Ae,we,ie.width,ie.height,ie.depth),xe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Ce,ie.data)):t.texImage3D(i.TEXTURE_3D,0,we,ie.width,ie.height,ie.depth,0,de,Ce,ie.data);else if(E.isFramebufferTexture){if(ce)if(F)t.texStorage2D(i.TEXTURE_2D,Ae,we,ie.width,ie.height);else{let he=ie.width,re=ie.height;for(let Le=0;Le<Ae;Le++)t.texImage2D(i.TEXTURE_2D,Le,we,he,re,0,de,Ce,null),he>>=1,re>>=1}}else if(Ge.length>0){if(F&&ce){let he=ze(Ge[0]);t.texStorage2D(i.TEXTURE_2D,Ae,we,he.width,he.height)}for(let he=0,re=Ge.length;he<re;he++)ye=Ge[he],F?xe&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,de,Ce,ye):t.texImage2D(i.TEXTURE_2D,he,we,de,Ce,ye);E.generateMipmaps=!1}else if(F){if(ce){let he=ze(ie);t.texStorage2D(i.TEXTURE_2D,Ae,we,he.width,he.height)}xe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Ce,ie)}else t.texImage2D(i.TEXTURE_2D,0,we,de,Ce,ie);d(E)&&f(N),X.__version=B.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function W(R,E,I){if(E.image.length!==6)return;let N=Be(R,E),V=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+I);let B=n.get(V);if(V.version!==B.__version||N===!0){t.activeTexture(i.TEXTURE0+I);let X=Qe.getPrimaries(Qe.workingColorSpace),q=E.colorSpace===ri?null:Qe.getPrimaries(E.colorSpace),ae=E.colorSpace===ri||X===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let ve=E.isCompressedTexture||E.image[0].isCompressedTexture,ie=E.image[0]&&E.image[0].isDataTexture,de=[];for(let re=0;re<6;re++)!ve&&!ie?de[re]=p(E.image[re],!0,s.maxCubemapSize):de[re]=ie?E.image[re].image:E.image[re],de[re]=Ve(E,de[re]);let Ce=de[0],we=r.convert(E.format,E.colorSpace),ye=r.convert(E.type),Ge=S(E.internalFormat,we,ye,E.colorSpace),F=E.isVideoTexture!==!0,ce=B.__version===void 0||N===!0,xe=V.dataReady,Ae=w(E,Ce);Fe(i.TEXTURE_CUBE_MAP,E);let he;if(ve){F&&ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ge,Ce.width,Ce.height);for(let re=0;re<6;re++){he=de[re].mipmaps;for(let Le=0;Le<he.length;Le++){let qe=he[Le];E.format!==Sn?we!==null?F?xe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,qe.width,qe.height,we,qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,Ge,qe.width,qe.height,0,qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,qe.width,qe.height,we,ye,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,Ge,qe.width,qe.height,0,we,ye,qe.data)}}}else{if(he=E.mipmaps,F&&ce){he.length>0&&Ae++;let re=ze(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Ge,re.width,re.height)}for(let re=0;re<6;re++)if(ie){F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,de[re].width,de[re].height,we,ye,de[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,de[re].width,de[re].height,0,we,ye,de[re].data);for(let Le=0;Le<he.length;Le++){let gt=he[Le].image[re].image;F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,gt.width,gt.height,we,ye,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,Ge,gt.width,gt.height,0,we,ye,gt.data)}}else{F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,we,ye,de[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,we,ye,de[re]);for(let Le=0;Le<he.length;Le++){let qe=he[Le];F?xe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,we,ye,qe.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,Ge,we,ye,qe.image[re])}}}d(E)&&f(i.TEXTURE_CUBE_MAP),B.__version=V.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ue(R,E,I,N,V,B){let X=r.convert(I.format,I.colorSpace),q=r.convert(I.type),ae=S(I.internalFormat,X,q,I.colorSpace),ve=n.get(E),ie=n.get(I);if(ie.__renderTarget=E,!ve.__hasExternalTextures){let de=Math.max(1,E.width>>B),Ce=Math.max(1,E.height>>B);V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?t.texImage3D(V,B,ae,de,Ce,E.depth,0,X,q,null):t.texImage2D(V,B,ae,de,Ce,0,X,q,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),le(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,N,V,ie.__webglTexture,0,me(E)):(V===i.TEXTURE_2D||V>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&V<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,N,V,ie.__webglTexture,B),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(R,E,I){if(i.bindRenderbuffer(i.RENDERBUFFER,R),E.depthBuffer){let N=E.depthTexture,V=N&&N.isDepthTexture?N.type:null,B=_(E.stencilBuffer,V),X=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=me(E);le(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,q,B,E.width,E.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,q,B,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,B,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,R)}else{let N=E.textures;for(let V=0;V<N.length;V++){let B=N[V],X=r.convert(B.format,B.colorSpace),q=r.convert(B.type),ae=S(B.internalFormat,X,q,B.colorSpace),ve=me(E);I&&le(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,ae,E.width,E.height):le(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,ae,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ae,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let N=n.get(E.depthTexture);N.__renderTarget=E,(!N.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),Y(E.depthTexture,0);let V=N.__webglTexture,B=me(E);if(E.depthTexture.format===Us)le(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,V,0);else if(E.depthTexture.format===Ks)le(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function ke(R){let E=n.get(R),I=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){let N=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),N){let V=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,N.removeEventListener("dispose",V)};N.addEventListener("dispose",V),E.__depthDisposeCallback=V}E.__boundDepthTexture=N}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");let N=R.texture.mipmaps;N&&N.length>0?be(E.__webglFramebuffer[0],R):be(E.__webglFramebuffer,R)}else if(I){E.__webglDepthbuffer=[];for(let N=0;N<6;N++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[N]),E.__webglDepthbuffer[N]===void 0)E.__webglDepthbuffer[N]=i.createRenderbuffer(),ge(E.__webglDepthbuffer[N],R,!1);else{let V=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=E.__webglDepthbuffer[N];i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,V,i.RENDERBUFFER,B)}}else{let N=R.texture.mipmaps;if(N&&N.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ge(E.__webglDepthbuffer,R,!1);else{let V=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,V,i.RENDERBUFFER,B)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(R,E,I){let N=n.get(R);E!==void 0&&ue(N.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&ke(R)}function U(R){let E=R.texture,I=n.get(R),N=n.get(E);R.addEventListener("dispose",L);let V=R.textures,B=R.isWebGLCubeRenderTarget===!0,X=V.length>1;if(X||(N.__webglTexture===void 0&&(N.__webglTexture=i.createTexture()),N.__version=E.version,a.memory.textures++),B){I.__webglFramebuffer=[];for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0){I.__webglFramebuffer[q]=[];for(let ae=0;ae<E.mipmaps.length;ae++)I.__webglFramebuffer[q][ae]=i.createFramebuffer()}else I.__webglFramebuffer[q]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){I.__webglFramebuffer=[];for(let q=0;q<E.mipmaps.length;q++)I.__webglFramebuffer[q]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(X)for(let q=0,ae=V.length;q<ae;q++){let ve=n.get(V[q]);ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&le(R)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let q=0;q<V.length;q++){let ae=V[q];I.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[q]);let ve=r.convert(ae.format,ae.colorSpace),ie=r.convert(ae.type),de=S(ae.internalFormat,ve,ie,ae.colorSpace,R.isXRRenderTarget===!0),Ce=me(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,de,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,I.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(I.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(B){t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,E);for(let q=0;q<6;q++)if(E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ue(I.__webglFramebuffer[q][ae],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,ae);else ue(I.__webglFramebuffer[q],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);d(E)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(X){for(let q=0,ae=V.length;q<ae;q++){let ve=V[q],ie=n.get(ve),de=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(de=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,ie.__webglTexture),Fe(de,ve),ue(I.__webglFramebuffer,R,ve,i.COLOR_ATTACHMENT0+q,de,0),d(ve)&&f(de)}t.unbindTexture()}else{let q=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(q=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(q,N.__webglTexture),Fe(q,E),E.mipmaps&&E.mipmaps.length>0)for(let ae=0;ae<E.mipmaps.length;ae++)ue(I.__webglFramebuffer[ae],R,E,i.COLOR_ATTACHMENT0,q,ae);else ue(I.__webglFramebuffer,R,E,i.COLOR_ATTACHMENT0,q,0);d(E)&&f(q),t.unbindTexture()}R.depthBuffer&&ke(R)}function se(R){let E=R.textures;for(let I=0,N=E.length;I<N;I++){let V=E[I];if(d(V)){let B=b(R),X=n.get(V).__webglTexture;t.bindTexture(B,X),f(B),t.unbindTexture()}}}let te=[],ee=[];function Q(R){if(R.samples>0){if(le(R)===!1){let E=R.textures,I=R.width,N=R.height,V=i.COLOR_BUFFER_BIT,B=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=n.get(R),q=E.length>1;if(q)for(let ve=0;ve<E.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,X.__webglMultisampledFramebuffer);let ae=R.texture.mipmaps;ae&&ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglFramebuffer);for(let ve=0;ve<E.length;ve++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(V|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(V|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,X.__webglColorRenderbuffer[ve]);let ie=n.get(E[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,I,N,0,0,I,N,V,i.NEAREST),l===!0&&(te.length=0,ee.length=0,te.push(i.COLOR_ATTACHMENT0+ve),R.depthBuffer&&R.resolveDepthBuffer===!1&&(te.push(B),ee.push(B),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ee)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let ve=0;ve<E.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,X.__webglColorRenderbuffer[ve]);let ie=n.get(E[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,X.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,X.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let E=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function me(R){return Math.min(s.maxSamples,R.samples)}function le(R){let E=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function _e(R){let E=a.render.frame;u.get(R)!==E&&(u.set(R,E),R.update())}function Ve(R,E){let I=R.colorSpace,N=R.format,V=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||I!==Wi&&I!==ri&&(Qe.getTransfer(I)===it?(N!==Sn||V!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),E}function ze(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=J,this.setTexture3D=oe,this.setTextureCube=K,this.rebindTextures=Xe,this.setupRenderTarget=U,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=le}function oy(i,e){function t(n,s=ri){let r,a=Qe.getTransfer(s);if(n===Un)return i.UNSIGNED_BYTE;if(n===gl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Su)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===yu)return i.BYTE;if(n===bu)return i.SHORT;if(n===js)return i.UNSIGNED_SHORT;if(n===ml)return i.INT;if(n===Ii)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===Mn)return i.HALF_FLOAT;if(n===wu)return i.ALPHA;if(n===Eu)return i.RGB;if(n===Sn)return i.RGBA;if(n===Us)return i.DEPTH_COMPONENT;if(n===Ks)return i.DEPTH_STENCIL;if(n===vl)return i.RED;if(n===_l)return i.RED_INTEGER;if(n===Tu)return i.RG;if(n===yl)return i.RG_INTEGER;if(n===bl)return i.RGBA_INTEGER;if(n===ga||n===xa||n===va||n===_a)if(a===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ga)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ga)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ml||n===Sl||n===wl||n===El)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===El)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Tl||n===Al||n===Cl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Tl||n===Al)return a===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Cl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rl||n===Il||n===Pl||n===Ll||n===Dl||n===Ul||n===Nl||n===Fl||n===Ol||n===Bl||n===kl||n===zl||n===Hl||n===Vl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Rl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Il)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ll)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Dl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ul)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ol)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Hl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gl||n===ql||n===Wl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Gl)return a===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ql)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xl||n===$l||n===Yl||n===Zl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$l)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var ly=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cy=`
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

}`,ju=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Jr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Tt({vertexShader:ly,fragmentShader:cy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new ni(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ju=class extends zn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,g=null,m=null,x=null,p=typeof XRWebGLBinding<"u",d=new ju,f={},b=t.getContextAttributes(),S=null,_=null,w=[],C=[],L=new ne,T=null,M=new Ft;M.viewport=new ct;let y=new Ft;y.viewport=new ct;let P=[M,y],O=new Ko,G=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let W=w[z];return W===void 0&&(W=new ks,w[z]=W),W.getTargetRaySpace()},this.getControllerGrip=function(z){let W=w[z];return W===void 0&&(W=new ks,w[z]=W),W.getGripSpace()},this.getHand=function(z){let W=w[z];return W===void 0&&(W=new ks,w[z]=W),W.getHandSpace()};function Y(z){let W=C.indexOf(z.inputSource);if(W===-1)return;let ue=w[W];ue!==void 0&&(ue.update(z.inputSource,z.frame,c||a),ue.dispatchEvent({type:z.type,data:z.inputSource}))}function J(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",oe);for(let z=0;z<w.length;z++){let W=C[z];W!==null&&(C[z]=null,w[z].disconnect(W))}G=null,j=null,d.reset();for(let z in f)delete f[z];e.setRenderTarget(S),m=null,g=null,h=null,s=null,_=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return g!==null?g:m},this.getBinding=function(){return h===null&&p&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",J),s.addEventListener("inputsourceschange",oe),b.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(L),p&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,ge=null,be=null;b.depth&&(be=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=b.stencil?Ks:Us,ge=b.stencil?Js:Ii);let ke={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};h=this.getBinding(),g=h.createProjectionLayer(ke),s.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),_=new Yt(g.textureWidth,g.textureHeight,{format:Sn,type:Un,depthTexture:new jr(g.textureWidth,g.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{let ue={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,ue),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new Yt(m.framebufferWidth,m.framebufferHeight,{format:Sn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),je.setContext(s),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function oe(z){for(let W=0;W<z.removed.length;W++){let ue=z.removed[W],ge=C.indexOf(ue);ge>=0&&(C[ge]=null,w[ge].disconnect(ue))}for(let W=0;W<z.added.length;W++){let ue=z.added[W],ge=C.indexOf(ue);if(ge===-1){for(let ke=0;ke<w.length;ke++)if(ke>=C.length){C.push(ue),ge=ke;break}else if(C[ke]===null){C[ke]=ue,ge=ke;break}if(ge===-1)break}let be=w[ge];be&&be.connect(ue)}}let K=new D,pe=new D;function Me(z,W,ue){K.setFromMatrixPosition(W.matrixWorld),pe.setFromMatrixPosition(ue.matrixWorld);let ge=K.distanceTo(pe),be=W.projectionMatrix.elements,ke=ue.projectionMatrix.elements,Xe=be[14]/(be[10]-1),U=be[14]/(be[10]+1),se=(be[9]+1)/be[5],te=(be[9]-1)/be[5],ee=(be[8]-1)/be[0],Q=(ke[8]+1)/ke[0],me=Xe*ee,le=Xe*Q,_e=ge/(-ee+Q),Ve=_e*-ee;if(W.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ve),z.translateZ(_e),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),be[10]===-1)z.projectionMatrix.copy(W.projectionMatrix),z.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{let ze=Xe+_e,R=U+_e,E=me-Ve,I=le+(ge-Ve),N=se*U/R*ze,V=te*U/R*ze;z.projectionMatrix.makePerspective(E,I,N,V,ze,R),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function Te(z,W){W===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(W.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;let W=z.near,ue=z.far;d.texture!==null&&(d.depthNear>0&&(W=d.depthNear),d.depthFar>0&&(ue=d.depthFar)),O.near=y.near=M.near=W,O.far=y.far=M.far=ue,(G!==O.near||j!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),G=O.near,j=O.far),O.layers.mask=z.layers.mask|6,M.layers.mask=O.layers.mask&3,y.layers.mask=O.layers.mask&5;let ge=z.parent,be=O.cameras;Te(O,ge);for(let ke=0;ke<be.length;ke++)Te(be[ke],ge);be.length===2?Me(O,M,y):O.projectionMatrix.copy(M.projectionMatrix),Fe(z,O,ge)};function Fe(z,W,ue){ue===null?z.matrix.copy(W.matrixWorld):(z.matrix.copy(ue.matrixWorld),z.matrix.invert(),z.matrix.multiply(W.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(W.projectionMatrix),z.projectionMatrixInverse.copy(W.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Ns*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(g===null&&m===null))return l},this.setFoveation=function(z){l=z,g!==null&&(g.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(O)},this.getCameraTexture=function(z){return f[z]};let Be=null;function Je(z,W){if(u=W.getViewerPose(c||a),x=W,u!==null){let ue=u.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let ge=!1;ue.length!==O.cameras.length&&(O.cameras.length=0,ge=!0);for(let U=0;U<ue.length;U++){let se=ue[U],te=null;if(m!==null)te=m.getViewport(se);else{let Q=h.getViewSubImage(g,se);te=Q.viewport,U===0&&(e.setRenderTargetTextures(_,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(_))}let ee=P[U];ee===void 0&&(ee=new Ft,ee.layers.enable(U),ee.viewport=new ct,P[U]=ee),ee.matrix.fromArray(se.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(se.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(te.x,te.y,te.width,te.height),U===0&&(O.matrix.copy(ee.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),ge===!0&&O.cameras.push(ee)}let be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&p){h=n.getBinding();let U=h.getDepthInformation(ue[0]);U&&U.isValid&&U.texture&&d.init(U,s.renderState)}if(be&&be.includes("camera-access")&&p){e.state.unbindTexture(),h=n.getBinding();for(let U=0;U<ue.length;U++){let se=ue[U].camera;if(se){let te=f[se];te||(te=new Jr,f[se]=te);let ee=h.getCameraImage(se);te.sourceTexture=ee}}}}for(let ue=0;ue<w.length;ue++){let ge=C[ue],be=w[ue];ge!==null&&be!==void 0&&be.update(ge,W,c||a)}Be&&Be(z,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),x=null}let je=new cp;je.setAnimationLoop(Je),this.setAnimationLoop=function(z){Be=z},this.dispose=function(){}}},os=new Pn,uy=new rt;function hy(i,e){function t(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function n(d,f){f.color.getRGB(d.fogColor.value,Du(i)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function s(d,f,b,S,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(d,f):f.isMeshToonMaterial?(r(d,f),h(d,f)):f.isMeshPhongMaterial?(r(d,f),u(d,f)):f.isMeshStandardMaterial?(r(d,f),g(d,f),f.isMeshPhysicalMaterial&&m(d,f,_)):f.isMeshMatcapMaterial?(r(d,f),x(d,f)):f.isMeshDepthMaterial?r(d,f):f.isMeshDistanceMaterial?(r(d,f),p(d,f)):f.isMeshNormalMaterial?r(d,f):f.isLineBasicMaterial?(a(d,f),f.isLineDashedMaterial&&o(d,f)):f.isPointsMaterial?l(d,f,b,S):f.isSpriteMaterial?c(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,t(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,t(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===qt&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,t(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===qt&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,t(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,t(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);let b=e.get(f),S=b.envMap,_=b.envMapRotation;S&&(d.envMap.value=S,os.copy(_),os.x*=-1,os.y*=-1,os.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),d.envMapRotation.value.setFromMatrix4(uy.makeRotationFromEuler(os)),d.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap&&(d.lightMap.value=f.lightMap,d.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,d.lightMapTransform)),f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,d.aoMapTransform))}function a(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,t(f.map,d.mapTransform))}function o(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function l(d,f,b,S){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*b,d.scale.value=S*.5,f.map&&(d.map.value=f.map,t(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,t(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,t(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function u(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function h(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function g(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,d.roughnessMapTransform)),f.envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function m(d,f,b){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===qt&&d.clearcoatNormalScale.value.negate())),f.dispersion>0&&(d.dispersion.value=f.dispersion),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=b.texture,d.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,d.specularIntensityMapTransform))}function x(d,f){f.matcap&&(d.matcap.value=f.matcap)}function p(d,f){let b=e.get(f).light;d.referencePosition.value.setFromMatrixPosition(b.matrixWorld),d.nearDistance.value=b.shadow.camera.near,d.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dy(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){let _=S.program;n.uniformBlockBinding(b,_)}function c(b,S){let _=s[b.id];_===void 0&&(x(b),_=u(b),s[b.id]=_,b.addEventListener("dispose",d));let w=S.program;n.updateUBOMapping(b,w);let C=e.render.frame;r[b.id]!==C&&(g(b),r[b.id]=C)}function u(b){let S=h();b.__bindingPointIndex=S;let _=i.createBuffer(),w=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,w,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,_),_}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(b){let S=s[b.id],_=b.uniforms,w=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let C=0,L=_.length;C<L;C++){let T=Array.isArray(_[C])?_[C]:[_[C]];for(let M=0,y=T.length;M<y;M++){let P=T[M];if(m(P,C,M,w)===!0){let O=P.__offset,G=Array.isArray(P.value)?P.value:[P.value],j=0;for(let Y=0;Y<G.length;Y++){let J=G[Y],oe=p(J);typeof J=="number"||typeof J=="boolean"?(P.__data[0]=J,i.bufferSubData(i.UNIFORM_BUFFER,O+j,P.__data)):J.isMatrix3?(P.__data[0]=J.elements[0],P.__data[1]=J.elements[1],P.__data[2]=J.elements[2],P.__data[3]=0,P.__data[4]=J.elements[3],P.__data[5]=J.elements[4],P.__data[6]=J.elements[5],P.__data[7]=0,P.__data[8]=J.elements[6],P.__data[9]=J.elements[7],P.__data[10]=J.elements[8],P.__data[11]=0):(J.toArray(P.__data,j),j+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,S,_,w){let C=b.value,L=S+"_"+_;if(w[L]===void 0)return typeof C=="number"||typeof C=="boolean"?w[L]=C:w[L]=C.clone(),!0;{let T=w[L];if(typeof C=="number"||typeof C=="boolean"){if(T!==C)return w[L]=C,!0}else if(T.equals(C)===!1)return T.copy(C),!0}return!1}function x(b){let S=b.uniforms,_=0,w=16;for(let L=0,T=S.length;L<T;L++){let M=Array.isArray(S[L])?S[L]:[S[L]];for(let y=0,P=M.length;y<P;y++){let O=M[y],G=Array.isArray(O.value)?O.value:[O.value];for(let j=0,Y=G.length;j<Y;j++){let J=G[j],oe=p(J),K=_%w,pe=K%oe.boundary,Me=K+pe;_+=pe,Me!==0&&w-Me<oe.storage&&(_+=w-Me),O.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=_,_+=oe.storage}}}let C=_%w;return C>0&&(_+=w-C),b.__size=_,b.__cache={},this}function p(b){let S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function d(b){let S=b.target;S.removeEventListener("dispose",d);let _=a.indexOf(S.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function f(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var nr=class{constructor(e={}){let{canvas:t=Pf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:g=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let x=new Uint32Array(4),p=new Int32Array(4),d=null,f=null,b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,w=!1;this._outputColorSpace=Nt;let C=0,L=0,T=null,M=-1,y=null,P=new ct,O=new ct,G=null,j=new Ue(0),Y=0,J=t.width,oe=t.height,K=1,pe=null,Me=null,Te=new ct(0,0,J,oe),Fe=new ct(0,0,J,oe),Be=!1,Je=new zs,je=!1,z=!1,W=new rt,ue=new D,ge=new ct,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Xe(){return T===null?K:1}let U=n;function se(A,k){return t.getContext(A,k)}try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",he,!1),U===null){let k="webgl2";if(U=se(k,A),U===null)throw se(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let te,ee,Q,me,le,_e,Ve,ze,R,E,I,N,V,B,X,q,ae,ve,ie,de,Ce,we,ye,Ge;function F(){te=new Iv(U),te.init(),we=new oy(U,te),ee=new Sv(U,te,e,we),Q=new ry(U,te),ee.reversedDepthBuffer&&g&&Q.buffers.depth.setReversed(!0),me=new Dv(U),le=new X_,_e=new ay(U,te,Q,le,ee,we,me),Ve=new Ev(_),ze=new Rv(_),R=new kg(U),ye=new bv(U,R),E=new Pv(U,R,me,ye),I=new Nv(U,E,R,me),ie=new Uv(U,ee,_e),q=new wv(le),N=new W_(_,Ve,ze,te,ee,ye,q),V=new hy(_,le),B=new Y_,X=new ey(te),ve=new yv(_,Ve,ze,Q,I,m,l),ae=new iy(_,I,ee),Ge=new dy(U,me,ee,Q),de=new Mv(U,te,me),Ce=new Lv(U,te,me),me.programs=N.programs,_.capabilities=ee,_.extensions=te,_.properties=le,_.renderLists=B,_.shadowMap=ae,_.state=Q,_.info=me}F();let ce=new Ju(_,U);this.xr=ce,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=te.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=te.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(J,oe,!1))},this.getSize=function(A){return A.set(J,oe)},this.setSize=function(A,k,$=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=A,oe=k,t.width=Math.floor(A*K),t.height=Math.floor(k*K),$===!0&&(t.style.width=A+"px",t.style.height=k+"px"),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(J*K,oe*K).floor()},this.setDrawingBufferSize=function(A,k,$){J=A,oe=k,K=$,t.width=Math.floor(A*$),t.height=Math.floor(k*$),this.setViewport(0,0,A,k)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(Te)},this.setViewport=function(A,k,$,Z){A.isVector4?Te.set(A.x,A.y,A.z,A.w):Te.set(A,k,$,Z),Q.viewport(P.copy(Te).multiplyScalar(K).round())},this.getScissor=function(A){return A.copy(Fe)},this.setScissor=function(A,k,$,Z){A.isVector4?Fe.set(A.x,A.y,A.z,A.w):Fe.set(A,k,$,Z),Q.scissor(O.copy(Fe).multiplyScalar(K).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(A){Q.setScissorTest(Be=A)},this.setOpaqueSort=function(A){pe=A},this.setTransparentSort=function(A){Me=A},this.getClearColor=function(A){return A.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(A=!0,k=!0,$=!0){let Z=0;if(A){let H=!1;if(T!==null){let fe=T.texture.format;H=fe===bl||fe===yl||fe===_l}if(H){let fe=T.texture.type,Ee=fe===Un||fe===Ii||fe===js||fe===Js||fe===gl||fe===xl,Ie=ve.getClearColor(),Re=ve.getClearAlpha(),Oe=Ie.r,He=Ie.g,De=Ie.b;Ee?(x[0]=Oe,x[1]=He,x[2]=De,x[3]=Re,U.clearBufferuiv(U.COLOR,0,x)):(p[0]=Oe,p[1]=He,p[2]=De,p[3]=Re,U.clearBufferiv(U.COLOR,0,p))}else Z|=U.COLOR_BUFFER_BIT}k&&(Z|=U.DEPTH_BUFFER_BIT),$&&(Z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",he,!1),ve.dispose(),B.dispose(),X.dispose(),le.dispose(),Ve.dispose(),ze.dispose(),I.dispose(),ye.dispose(),Ge.dispose(),N.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",On),ce.removeEventListener("sessionend",ph),Li.stop()};function xe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let A=me.autoReset,k=ae.enabled,$=ae.autoUpdate,Z=ae.needsUpdate,H=ae.type;F(),me.autoReset=A,ae.enabled=k,ae.autoUpdate=$,ae.needsUpdate=Z,ae.type=H}function he(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function re(A){let k=A.target;k.removeEventListener("dispose",re),Le(k)}function Le(A){qe(A),le.remove(A)}function qe(A){let k=le.get(A).programs;k!==void 0&&(k.forEach(function($){N.releaseProgram($)}),A.isShaderMaterial&&N.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,$,Z,H,fe){k===null&&(k=be);let Ee=H.isMesh&&H.matrixWorld.determinant()<0,Ie=Dp(A,k,$,Z,H);Q.setMaterial(Z,Ee);let Re=$.index,Oe=1;if(Z.wireframe===!0){if(Re=E.getWireframeAttribute($),Re===void 0)return;Oe=2}let He=$.drawRange,De=$.attributes.position,Ke=He.start*Oe,ut=(He.start+He.count)*Oe;fe!==null&&(Ke=Math.max(Ke,fe.start*Oe),ut=Math.min(ut,(fe.start+fe.count)*Oe)),Re!==null?(Ke=Math.max(Ke,0),ut=Math.min(ut,Re.count)):De!=null&&(Ke=Math.max(Ke,0),ut=Math.min(ut,De.count));let At=ut-Ke;if(At<0||At===1/0)return;ye.setup(H,Z,Ie,$,Re);let _t,ft=de;if(Re!==null&&(_t=R.get(Re),ft=Ce,ft.setIndex(_t)),H.isMesh)Z.wireframe===!0?(Q.setLineWidth(Z.wireframeLinewidth*Xe()),ft.setMode(U.LINES)):ft.setMode(U.TRIANGLES);else if(H.isLine){let Ne=Z.linewidth;Ne===void 0&&(Ne=1),Q.setLineWidth(Ne*Xe()),H.isLineSegments?ft.setMode(U.LINES):H.isLineLoop?ft.setMode(U.LINE_LOOP):ft.setMode(U.LINE_STRIP)}else H.isPoints?ft.setMode(U.POINTS):H.isSprite&&ft.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Fs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ft.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))ft.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Ne=H._multiDrawStarts,St=H._multiDrawCounts,tt=H._multiDrawCount,cn=Re?R.get(Re).bytesPerElement:1,ds=le.get(Z).currentProgram.getUniforms();for(let un=0;un<tt;un++)ds.setValue(U,"_gl_DrawID",un),ft.render(Ne[un]/cn,St[un])}else if(H.isInstancedMesh)ft.renderInstances(Ke,At,H.count);else if($.isInstancedBufferGeometry){let Ne=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,St=Math.min($.instanceCount,Ne);ft.renderInstances(Ke,At,St)}else ft.render(Ke,At)};function gt(A,k,$){A.transparent===!0&&A.side===en&&A.forceSinglePass===!1?(A.side=qt,A.needsUpdate=!0,Ra(A,k,$),A.side=ei,A.needsUpdate=!0,Ra(A,k,$),A.side=en):Ra(A,k,$)}this.compile=function(A,k,$=null){$===null&&($=A),f=X.get($),f.init(k),S.push(f),$.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),A!==$&&A.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();let Z=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let fe=H.material;if(fe)if(Array.isArray(fe))for(let Ee=0;Ee<fe.length;Ee++){let Ie=fe[Ee];gt(Ie,$,H),Z.add(Ie)}else gt(fe,$,H),Z.add(fe)}),f=S.pop(),Z},this.compileAsync=function(A,k,$=null){let Z=this.compile(A,k,$);return new Promise(H=>{function fe(){if(Z.forEach(function(Ee){le.get(Ee).currentProgram.isReady()&&Z.delete(Ee)}),Z.size===0){H(A);return}setTimeout(fe,10)}te.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let st=null;function Wn(A){st&&st(A)}function On(){Li.stop()}function ph(){Li.start()}let Li=new cp;Li.setAnimationLoop(Wn),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(A){st=A,ce.setAnimationLoop(A),A===null?Li.stop():Li.start()},ce.addEventListener("sessionstart",On),ce.addEventListener("sessionend",ph),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(k),k=ce.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,k,T),f=X.get(A,S.length),f.init(k),S.push(f),W.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Je.setFromProjectionMatrix(W,Rn,k.reversedDepth),z=this.localClippingEnabled,je=q.init(this.clippingPlanes,z),d=B.get(A,b.length),d.init(),b.push(d),ce.enabled===!0&&ce.isPresenting===!0){let fe=_.xr.getDepthSensingMesh();fe!==null&&dc(fe,k,-1/0,_.sortObjects)}dc(A,k,0,_.sortObjects),d.finish(),_.sortObjects===!0&&d.sort(pe,Me),ke=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,ke&&ve.addToRenderList(d,A),this.info.render.frame++,je===!0&&q.beginShadows();let $=f.state.shadowsArray;ae.render($,A,k),je===!0&&q.endShadows(),this.info.autoReset===!0&&this.info.reset();let Z=d.opaque,H=d.transmissive;if(f.setupLights(),k.isArrayCamera){let fe=k.cameras;if(H.length>0)for(let Ee=0,Ie=fe.length;Ee<Ie;Ee++){let Re=fe[Ee];gh(Z,H,A,Re)}ke&&ve.render(A);for(let Ee=0,Ie=fe.length;Ee<Ie;Ee++){let Re=fe[Ee];mh(d,A,Re,Re.viewport)}}else H.length>0&&gh(Z,H,A,k),ke&&ve.render(A),mh(d,A,k);T!==null&&L===0&&(_e.updateMultisampleRenderTarget(T),_e.updateRenderTargetMipmap(T)),A.isScene===!0&&A.onAfterRender(_,A,k),ye.resetDefaultState(),M=-1,y=null,S.pop(),S.length>0?(f=S[S.length-1],je===!0&&q.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?d=b[b.length-1]:d=null};function dc(A,k,$,Z){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Je.intersectsSprite(A)){Z&&ge.setFromMatrixPosition(A.matrixWorld).applyMatrix4(W);let Ee=I.update(A),Ie=A.material;Ie.visible&&d.push(A,Ee,Ie,$,ge.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Je.intersectsObject(A))){let Ee=I.update(A),Ie=A.material;if(Z&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ge.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ge.copy(Ee.boundingSphere.center)),ge.applyMatrix4(A.matrixWorld).applyMatrix4(W)),Array.isArray(Ie)){let Re=Ee.groups;for(let Oe=0,He=Re.length;Oe<He;Oe++){let De=Re[Oe],Ke=Ie[De.materialIndex];Ke&&Ke.visible&&d.push(A,Ee,Ke,$,ge.z,De)}}else Ie.visible&&d.push(A,Ee,Ie,$,ge.z,null)}}let fe=A.children;for(let Ee=0,Ie=fe.length;Ee<Ie;Ee++)dc(fe[Ee],k,$,Z)}function mh(A,k,$,Z){let H=A.opaque,fe=A.transmissive,Ee=A.transparent;f.setupLightsView($),je===!0&&q.setGlobalState(_.clippingPlanes,$),Z&&Q.viewport(P.copy(Z)),H.length>0&&Ca(H,k,$),fe.length>0&&Ca(fe,k,$),Ee.length>0&&Ca(Ee,k,$),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function gh(A,k,$,Z){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[Z.id]===void 0&&(f.state.transmissionRenderTarget[Z.id]=new Yt(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Mn:Un,minFilter:Ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));let fe=f.state.transmissionRenderTarget[Z.id],Ee=Z.viewport||P;fe.setSize(Ee.z*_.transmissionResolutionScale,Ee.w*_.transmissionResolutionScale);let Ie=_.getRenderTarget(),Re=_.getActiveCubeFace(),Oe=_.getActiveMipmapLevel();_.setRenderTarget(fe),_.getClearColor(j),Y=_.getClearAlpha(),Y<1&&_.setClearColor(16777215,.5),_.clear(),ke&&ve.render($);let He=_.toneMapping;_.toneMapping=si;let De=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),f.setupLightsView(Z),je===!0&&q.setGlobalState(_.clippingPlanes,Z),Ca(A,$,Z),_e.updateMultisampleRenderTarget(fe),_e.updateRenderTargetMipmap(fe),te.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let ut=0,At=k.length;ut<At;ut++){let _t=k[ut],ft=_t.object,Ne=_t.geometry,St=_t.material,tt=_t.group;if(St.side===en&&ft.layers.test(Z.layers)){let cn=St.side;St.side=qt,St.needsUpdate=!0,xh(ft,$,Z,Ne,St,tt),St.side=cn,St.needsUpdate=!0,Ke=!0}}Ke===!0&&(_e.updateMultisampleRenderTarget(fe),_e.updateRenderTargetMipmap(fe))}_.setRenderTarget(Ie,Re,Oe),_.setClearColor(j,Y),De!==void 0&&(Z.viewport=De),_.toneMapping=He}function Ca(A,k,$){let Z=k.isScene===!0?k.overrideMaterial:null;for(let H=0,fe=A.length;H<fe;H++){let Ee=A[H],Ie=Ee.object,Re=Ee.geometry,Oe=Ee.group,He=Ee.material;He.allowOverride===!0&&Z!==null&&(He=Z),Ie.layers.test($.layers)&&xh(Ie,k,$,Re,He,Oe)}}function xh(A,k,$,Z,H,fe){A.onBeforeRender(_,k,$,Z,H,fe),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(_,k,$,Z,A,fe),H.transparent===!0&&H.side===en&&H.forceSinglePass===!1?(H.side=qt,H.needsUpdate=!0,_.renderBufferDirect($,k,Z,H,A,fe),H.side=ei,H.needsUpdate=!0,_.renderBufferDirect($,k,Z,H,A,fe),H.side=en):_.renderBufferDirect($,k,Z,H,A,fe),A.onAfterRender(_,k,$,Z,H,fe)}function Ra(A,k,$){k.isScene!==!0&&(k=be);let Z=le.get(A),H=f.state.lights,fe=f.state.shadowsArray,Ee=H.state.version,Ie=N.getParameters(A,H.state,fe,k,$),Re=N.getProgramCacheKey(Ie),Oe=Z.programs;Z.environment=A.isMeshStandardMaterial?k.environment:null,Z.fog=k.fog,Z.envMap=(A.isMeshStandardMaterial?ze:Ve).get(A.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&A.envMap===null?k.environmentRotation:A.envMapRotation,Oe===void 0&&(A.addEventListener("dispose",re),Oe=new Map,Z.programs=Oe);let He=Oe.get(Re);if(He!==void 0){if(Z.currentProgram===He&&Z.lightsStateVersion===Ee)return _h(A,Ie),He}else Ie.uniforms=N.getUniforms(A),A.onBeforeCompile(Ie,_),He=N.acquireProgram(Ie,Re),Oe.set(Re,He),Z.uniforms=Ie.uniforms;let De=Z.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(De.clippingPlanes=q.uniform),_h(A,Ie),Z.needsLights=Np(A),Z.lightsStateVersion=Ee,Z.needsLights&&(De.ambientLightColor.value=H.state.ambient,De.lightProbe.value=H.state.probe,De.directionalLights.value=H.state.directional,De.directionalLightShadows.value=H.state.directionalShadow,De.spotLights.value=H.state.spot,De.spotLightShadows.value=H.state.spotShadow,De.rectAreaLights.value=H.state.rectArea,De.ltc_1.value=H.state.rectAreaLTC1,De.ltc_2.value=H.state.rectAreaLTC2,De.pointLights.value=H.state.point,De.pointLightShadows.value=H.state.pointShadow,De.hemisphereLights.value=H.state.hemi,De.directionalShadowMap.value=H.state.directionalShadowMap,De.directionalShadowMatrix.value=H.state.directionalShadowMatrix,De.spotShadowMap.value=H.state.spotShadowMap,De.spotLightMatrix.value=H.state.spotLightMatrix,De.spotLightMap.value=H.state.spotLightMap,De.pointShadowMap.value=H.state.pointShadowMap,De.pointShadowMatrix.value=H.state.pointShadowMatrix),Z.currentProgram=He,Z.uniformsList=null,He}function vh(A){if(A.uniformsList===null){let k=A.currentProgram.getUniforms();A.uniformsList=tr.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function _h(A,k){let $=le.get(A);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function Dp(A,k,$,Z,H){k.isScene!==!0&&(k=be),_e.resetTextureUnits();let fe=k.fog,Ee=Z.isMeshStandardMaterial?k.environment:null,Ie=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Wi,Re=(Z.isMeshStandardMaterial?ze:Ve).get(Z.envMap||Ee),Oe=Z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,He=!!$.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),De=!!$.morphAttributes.position,Ke=!!$.morphAttributes.normal,ut=!!$.morphAttributes.color,At=si;Z.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(At=_.toneMapping);let _t=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ft=_t!==void 0?_t.length:0,Ne=le.get(Z),St=f.state.lights;if(je===!0&&(z===!0||A!==y)){let Jt=A===y&&Z.id===M;q.setState(Z,A,Jt)}let tt=!1;Z.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==St.state.version||Ne.outputColorSpace!==Ie||H.isBatchedMesh&&Ne.batching===!1||!H.isBatchedMesh&&Ne.batching===!0||H.isBatchedMesh&&Ne.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ne.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ne.instancing===!1||!H.isInstancedMesh&&Ne.instancing===!0||H.isSkinnedMesh&&Ne.skinning===!1||!H.isSkinnedMesh&&Ne.skinning===!0||H.isInstancedMesh&&Ne.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ne.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ne.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ne.instancingMorph===!1&&H.morphTexture!==null||Ne.envMap!==Re||Z.fog===!0&&Ne.fog!==fe||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==q.numPlanes||Ne.numIntersection!==q.numIntersection)||Ne.vertexAlphas!==Oe||Ne.vertexTangents!==He||Ne.morphTargets!==De||Ne.morphNormals!==Ke||Ne.morphColors!==ut||Ne.toneMapping!==At||Ne.morphTargetsCount!==ft)&&(tt=!0):(tt=!0,Ne.__version=Z.version);let cn=Ne.currentProgram;tt===!0&&(cn=Ra(Z,k,H));let ds=!1,un=!1,cr=!1,wt=cn.getUniforms(),xn=Ne.uniforms;if(Q.useProgram(cn.program)&&(ds=!0,un=!0,cr=!0),Z.id!==M&&(M=Z.id,un=!0),ds||y!==A){Q.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),wt.setValue(U,"projectionMatrix",A.projectionMatrix),wt.setValue(U,"viewMatrix",A.matrixWorldInverse);let nn=wt.map.cameraPosition;nn!==void 0&&nn.setValue(U,ue.setFromMatrixPosition(A.matrixWorld)),ee.logarithmicDepthBuffer&&wt.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&wt.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),y!==A&&(y=A,un=!0,cr=!0)}if(H.isSkinnedMesh){wt.setOptional(U,H,"bindMatrix"),wt.setOptional(U,H,"bindMatrixInverse");let Jt=H.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),wt.setValue(U,"boneTexture",Jt.boneTexture,_e))}H.isBatchedMesh&&(wt.setOptional(U,H,"batchingTexture"),wt.setValue(U,"batchingTexture",H._matricesTexture,_e),wt.setOptional(U,H,"batchingIdTexture"),wt.setValue(U,"batchingIdTexture",H._indirectTexture,_e),wt.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&wt.setValue(U,"batchingColorTexture",H._colorsTexture,_e));let vn=$.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&ie.update(H,$,cn),(un||Ne.receiveShadow!==H.receiveShadow)&&(Ne.receiveShadow=H.receiveShadow,wt.setValue(U,"receiveShadow",H.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(xn.envMap.value=Re,xn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&k.environment!==null&&(xn.envMapIntensity.value=k.environmentIntensity),un&&(wt.setValue(U,"toneMappingExposure",_.toneMappingExposure),Ne.needsLights&&Up(xn,cr),fe&&Z.fog===!0&&V.refreshFogUniforms(xn,fe),V.refreshMaterialUniforms(xn,Z,K,oe,f.state.transmissionRenderTarget[A.id]),tr.upload(U,vh(Ne),xn,_e)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(tr.upload(U,vh(Ne),xn,_e),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&wt.setValue(U,"center",H.center),wt.setValue(U,"modelViewMatrix",H.modelViewMatrix),wt.setValue(U,"normalMatrix",H.normalMatrix),wt.setValue(U,"modelMatrix",H.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){let Jt=Z.uniformsGroups;for(let nn=0,fc=Jt.length;nn<fc;nn++){let Di=Jt[nn];Ge.update(Di,cn),Ge.bind(Di,cn)}}return cn}function Up(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function Np(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(A,k,$){let Z=le.get(A);Z.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),le.get(A.texture).__webglTexture=k,le.get(A.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:$,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,k){let $=le.get(A);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0};let Fp=U.createFramebuffer();this.setRenderTarget=function(A,k=0,$=0){T=A,C=k,L=$;let Z=!0,H=null,fe=!1,Ee=!1;if(A){let Re=le.get(A);if(Re.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(U.FRAMEBUFFER,null),Z=!1;else if(Re.__webglFramebuffer===void 0)_e.setupRenderTarget(A);else if(Re.__hasExternalTextures)_e.rebindTextures(A,le.get(A.texture).__webglTexture,le.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let De=A.depthTexture;if(Re.__boundDepthTexture!==De){if(De!==null&&le.has(De)&&(A.width!==De.image.width||A.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");_e.setupDepthRenderbuffer(A)}}let Oe=A.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Ee=!0);let He=le.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(He[k])?H=He[k][$]:H=He[k],fe=!0):A.samples>0&&_e.useMultisampledRTT(A)===!1?H=le.get(A).__webglMultisampledFramebuffer:Array.isArray(He)?H=He[$]:H=He,P.copy(A.viewport),O.copy(A.scissor),G=A.scissorTest}else P.copy(Te).multiplyScalar(K).floor(),O.copy(Fe).multiplyScalar(K).floor(),G=Be;if($!==0&&(H=Fp),Q.bindFramebuffer(U.FRAMEBUFFER,H)&&Z&&Q.drawBuffers(A,H),Q.viewport(P),Q.scissor(O),Q.setScissorTest(G),fe){let Re=le.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,Re.__webglTexture,$)}else if(Ee){let Re=k;for(let Oe=0;Oe<A.textures.length;Oe++){let He=le.get(A.textures[Oe]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Oe,He.__webglTexture,$,Re)}}else if(A!==null&&$!==0){let Re=le.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Re.__webglTexture,$)}M=-1},this.readRenderTargetPixels=function(A,k,$,Z,H,fe,Ee,Ie=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=le.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re){Q.bindFramebuffer(U.FRAMEBUFFER,Re);try{let Oe=A.textures[Ie],He=Oe.format,De=Oe.type;if(!ee.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ee.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-Z&&$>=0&&$<=A.height-H&&(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ie),U.readPixels(k,$,Z,H,we.convert(He),we.convert(De),fe))}finally{let Oe=T!==null?le.get(T).__webglFramebuffer:null;Q.bindFramebuffer(U.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(A,k,$,Z,H,fe,Ee,Ie=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=le.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re)if(k>=0&&k<=A.width-Z&&$>=0&&$<=A.height-H){Q.bindFramebuffer(U.FRAMEBUFFER,Re);let Oe=A.textures[Ie],He=Oe.format,De=Oe.type;if(!ee.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ee.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ke=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ke),U.bufferData(U.PIXEL_PACK_BUFFER,fe.byteLength,U.STREAM_READ),A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Ie),U.readPixels(k,$,Z,H,we.convert(He),we.convert(De),0);let ut=T!==null?le.get(T).__webglFramebuffer:null;Q.bindFramebuffer(U.FRAMEBUFFER,ut);let At=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Lf(U,At,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ke),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,fe),U.deleteBuffer(Ke),U.deleteSync(At),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,k=null,$=0){let Z=Math.pow(2,-$),H=Math.floor(A.image.width*Z),fe=Math.floor(A.image.height*Z),Ee=k!==null?k.x:0,Ie=k!==null?k.y:0;_e.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,$,0,0,Ee,Ie,H,fe),Q.unbindTexture()};let Op=U.createFramebuffer(),Bp=U.createFramebuffer();this.copyTextureToTexture=function(A,k,$=null,Z=null,H=0,fe=null){fe===null&&(H!==0?(Fs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),fe=H,H=0):fe=0);let Ee,Ie,Re,Oe,He,De,Ke,ut,At,_t=A.isCompressedTexture?A.mipmaps[fe]:A.image;if($!==null)Ee=$.max.x-$.min.x,Ie=$.max.y-$.min.y,Re=$.isBox3?$.max.z-$.min.z:1,Oe=$.min.x,He=$.min.y,De=$.isBox3?$.min.z:0;else{let vn=Math.pow(2,-H);Ee=Math.floor(_t.width*vn),Ie=Math.floor(_t.height*vn),A.isDataArrayTexture?Re=_t.depth:A.isData3DTexture?Re=Math.floor(_t.depth*vn):Re=1,Oe=0,He=0,De=0}Z!==null?(Ke=Z.x,ut=Z.y,At=Z.z):(Ke=0,ut=0,At=0);let ft=we.convert(k.format),Ne=we.convert(k.type),St;k.isData3DTexture?(_e.setTexture3D(k,0),St=U.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(_e.setTexture2DArray(k,0),St=U.TEXTURE_2D_ARRAY):(_e.setTexture2D(k,0),St=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let tt=U.getParameter(U.UNPACK_ROW_LENGTH),cn=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ds=U.getParameter(U.UNPACK_SKIP_PIXELS),un=U.getParameter(U.UNPACK_SKIP_ROWS),cr=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,_t.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,_t.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Oe),U.pixelStorei(U.UNPACK_SKIP_ROWS,He),U.pixelStorei(U.UNPACK_SKIP_IMAGES,De);let wt=A.isDataArrayTexture||A.isData3DTexture,xn=k.isDataArrayTexture||k.isData3DTexture;if(A.isDepthTexture){let vn=le.get(A),Jt=le.get(k),nn=le.get(vn.__renderTarget),fc=le.get(Jt.__renderTarget);Q.bindFramebuffer(U.READ_FRAMEBUFFER,nn.__webglFramebuffer),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,fc.__webglFramebuffer);for(let Di=0;Di<Re;Di++)wt&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,le.get(A).__webglTexture,H,De+Di),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,le.get(k).__webglTexture,fe,At+Di)),U.blitFramebuffer(Oe,He,Ee,Ie,Ke,ut,Ee,Ie,U.DEPTH_BUFFER_BIT,U.NEAREST);Q.bindFramebuffer(U.READ_FRAMEBUFFER,null),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||A.isRenderTargetTexture||le.has(A)){let vn=le.get(A),Jt=le.get(k);Q.bindFramebuffer(U.READ_FRAMEBUFFER,Op),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,Bp);for(let nn=0;nn<Re;nn++)wt?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,vn.__webglTexture,H,De+nn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,vn.__webglTexture,H),xn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Jt.__webglTexture,fe,At+nn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Jt.__webglTexture,fe),H!==0?U.blitFramebuffer(Oe,He,Ee,Ie,Ke,ut,Ee,Ie,U.COLOR_BUFFER_BIT,U.NEAREST):xn?U.copyTexSubImage3D(St,fe,Ke,ut,At+nn,Oe,He,Ee,Ie):U.copyTexSubImage2D(St,fe,Ke,ut,Oe,He,Ee,Ie);Q.bindFramebuffer(U.READ_FRAMEBUFFER,null),Q.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else xn?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(St,fe,Ke,ut,At,Ee,Ie,Re,ft,Ne,_t.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(St,fe,Ke,ut,At,Ee,Ie,Re,ft,_t.data):U.texSubImage3D(St,fe,Ke,ut,At,Ee,Ie,Re,ft,Ne,_t):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,fe,Ke,ut,Ee,Ie,ft,Ne,_t.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,fe,Ke,ut,_t.width,_t.height,ft,_t.data):U.texSubImage2D(U.TEXTURE_2D,fe,Ke,ut,Ee,Ie,ft,Ne,_t);U.pixelStorei(U.UNPACK_ROW_LENGTH,tt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,cn),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ds),U.pixelStorei(U.UNPACK_SKIP_ROWS,un),U.pixelStorei(U.UNPACK_SKIP_IMAGES,cr),fe===0&&k.generateMipmaps&&U.generateMipmap(St),Q.unbindTexture()},this.initRenderTarget=function(A){le.get(A).__webglFramebuffer===void 0&&_e.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?_e.setTextureCube(A,0):A.isData3DTexture?_e.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?_e.setTexture2DArray(A,0):_e.setTexture2D(A,0),Q.unbindTexture()},this.resetState=function(){C=0,L=0,T=null,Q.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}};var pp={type:"change"},eh={type:"start"},gp={type:"end"},nc=new ti,mp=new yn,fy=Math.cos(70*Pu.DEG2RAD),zt=new D,ln=2*Math.PI,dt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Qu=1e-6,sr=class extends fa{constructor(e,t=null){super(e,t),this.state=dt.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ei.ROTATE,MIDDLE:Ei.DOLLY,RIGHT:Ei.PAN},this.touches={ONE:Ti.ROTATE,TWO:Ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new bn,this._lastTargetPosition=new D,this._quat=new bn().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ys,this._sphericalDelta=new Ys,this._scale=1,this._panOffset=new D,this._rotateStart=new ne,this._rotateEnd=new ne,this._rotateDelta=new ne,this._panStart=new ne,this._panEnd=new ne,this._panDelta=new ne,this._dollyStart=new ne,this._dollyEnd=new ne,this._dollyDelta=new ne,this._dollyDirection=new D,this._mouse=new ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=my.bind(this),this._onPointerDown=py.bind(this),this._onPointerUp=gy.bind(this),this._onContextMenu=Sy.bind(this),this._onMouseWheel=_y.bind(this),this._onKeyDown=yy.bind(this),this._onTouchStart=by.bind(this),this._onTouchMove=My.bind(this),this._onMouseDown=xy.bind(this),this._onMouseMove=vy.bind(this),this._interceptControlDown=wy.bind(this),this._interceptControlUp=Ey.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pp),this.update(),this.state=dt.NONE}update(e=null){let t=this.object.position;zt.copy(t).sub(this.target),zt.applyQuaternion(this._quat),this._spherical.setFromVector3(zt),this.autoRotate&&this.state===dt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ln:n>Math.PI&&(n-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(zt.setFromSpherical(this._spherical),zt.applyQuaternion(this._quatInverse),t.copy(this.target).add(zt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=zt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=zt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(nc.origin.copy(this.object.position),nc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nc.direction))<fy?this.object.lookAt(this.target):(mp.setFromNormalAndCoplanarPoint(this.object.up,this.target),nc.intersectPlane(mp,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Qu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Qu||this._lastTargetPosition.distanceToSquared(this.target)>Qu?(this.dispatchEvent(pp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){zt.setFromMatrixColumn(t,0),zt.multiplyScalar(-e),this._panOffset.add(zt)}_panUp(e,t){this.screenSpacePanning===!0?zt.setFromMatrixColumn(t,1):(zt.setFromMatrixColumn(t,0),zt.crossVectors(this.object.up,zt)),zt.multiplyScalar(e),this._panOffset.add(zt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;zt.copy(s).sub(this.target);let r=zt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ne,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function py(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function my(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function gy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(gp),this.state=dt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function xy(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ei.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=dt.DOLLY;break;case Ei.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=dt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=dt.ROTATE}break;case Ei.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=dt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=dt.PAN}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(eh)}function vy(i){switch(this.state){case dt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case dt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case dt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function _y(i){this.enabled===!1||this.enableZoom===!1||this.state!==dt.NONE||(i.preventDefault(),this.dispatchEvent(eh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(gp))}function yy(i){this.enabled!==!1&&this._handleKeyDown(i)}function by(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=dt.TOUCH_ROTATE;break;case Ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=dt.TOUCH_PAN;break;default:this.state=dt.NONE}break;case 2:switch(this.touches.TWO){case Ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=dt.TOUCH_DOLLY_PAN;break;case Ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=dt.TOUCH_DOLLY_ROTATE;break;default:this.state=dt.NONE}break;default:this.state=dt.NONE}this.state!==dt.NONE&&this.dispatchEvent(eh)}function My(i){switch(this._trackPointer(i),this.state){case dt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case dt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case dt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case dt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=dt.NONE}}function Sy(i){this.enabled!==!1&&i.preventDefault()}function wy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ey(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var rr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var mn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Ty=new es(-1,1,1,-1,0,1),th=class extends xt{constructor(){super(),this.setAttribute("position",new et([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new et([0,2,0,0,2,0],2))}},Ay=new th,Pi=class{constructor(e){this._mesh=new Ze(Ay,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ty)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var ic=class extends mn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ai.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Pi(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ba=class extends mn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},sc=class extends mn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var rc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new ne);this._width=n.width,this._height=n.height,t=new Yt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Mn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ic(rr),this.copyPass.material.blending=Dn,this.clock=new ns}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ba!==void 0&&(a instanceof ba?n=!0:a instanceof sc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ac=class extends mn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ue}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var xp={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ue(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};var ar=class i extends mn{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ne(e.x,e.y):new ne(256,256),this.clearColor=new Ue(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Yt(r,a,{type:Mn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let h=new Yt(r,a,{type:Mn});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);let g=new Yt(r,a,{type:Mn});g.texture.name="UnrealBloomPass.v"+u,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),r=Math.round(r/2),a=Math.round(a/2)}let o=xp;this.highPassUniforms=ai.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Tt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ne(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ai.clone(rr.uniforms),this.blendMaterial=new Tt({uniforms:this.copyUniforms,vertexShader:rr.vertexShader,fragmentShader:rr.fragmentShader,blending:Ai,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ue,this._oldClearAlpha=1,this._basic=new on,this._fsQuad=new Pi(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ne(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Tt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}};ar.BlurDirectionX=new ne(1,0);ar.BlurDirectionY=new ne(0,1);var Ma={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var oc=class extends mn{constructor(){super(),this.uniforms=ai.clone(Ma.uniforms),this.material=new ua({name:Ma.name,uniforms:this.uniforms,vertexShader:Ma.vertexShader,fragmentShader:Ma.fragmentShader}),this._fsQuad=new Pi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Qe.getTransfer(this._outputColorSpace)===it&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===al?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ol?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ll?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ci?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ul?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===hl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===cl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ih='Nunito,"Segoe UI",system-ui,sans-serif',Cy='Cairo,Tahoma,"Segoe UI",system-ui,sans-serif';function Sa(i,e){let t=document.createElement("canvas");return t.width=i,t.height=e,t}function wa(i,{repeat:e=null}={}){let t=new Zr(i);return t.colorSpace=Nt,t.anisotropy=4,e&&(t.wrapS=t.wrapT=Ds,t.repeat.set(e,e)),t}function sh(i="#0a7467",e="#f2b418",t="#f7f2e8",n="#1c2340"){let r=Sa(256,256),a=r.getContext("2d");a.fillStyle=t,a.fillRect(0,0,256,256);let o=(l,c,u,h,g)=>{a.beginPath();for(let m=0;m<16;m++){let x=Math.PI/8*m-Math.PI/2,p=m%2?h:u;a.lineTo(l+Math.cos(x)*p,c+Math.sin(x)*p)}a.closePath(),a.fillStyle=g,a.fill(),a.lineWidth=4,a.strokeStyle=n,a.stroke()};for(let[l,c]of[[0,0],[256,0],[0,256],[256,256]])o(l,c,70,48,i);o(256/2,256/2,70,48,e);for(let[l,c]of[[256/2,0],[0,256/2],[256,256/2],[256/2,256]])a.beginPath(),a.moveTo(l,c-22),a.lineTo(l+22,c),a.lineTo(l,c+22),a.lineTo(l-22,c),a.closePath(),a.fillStyle="#c8431a",a.fill(),a.lineWidth=3,a.strokeStyle=n,a.stroke();return wa(r,{repeat:6})}function lc({title:i,sub:e="",ar:t="",color:n="#2b3fc4",pct:s=null}){let a=t?330:260,o=Sa(1024,a),l=o.getContext("2d"),c=46;if(l.beginPath(),l.roundRect(8,8,1008,a-16,c),l.fillStyle="rgba(14,18,40,.82)",l.fill(),l.lineWidth=8,l.strokeStyle=n,l.stroke(),l.fillStyle="#fff",l.font=`800 82px ${ih}`,l.textBaseline="top",l.textAlign="center",l.fillText(nh(l,i,944),1024/2,34),l.font=`700 50px ${ih}`,l.fillStyle="#ffd86b",l.fillText(nh(l,e,944),1024/2,130),t&&(l.font=`700 50px ${Cy}`,l.fillStyle="#c9d2ff",l.direction="rtl",l.fillText(nh(l,t,944),1024/2,196),l.direction="ltr"),s!=null){let h=a-48;l.fillStyle="rgba(255,255,255,.18)",l.beginPath(),l.roundRect(80,h,864,18,9),l.fill(),l.fillStyle=n==="#f2b418"?"#fff":"#7dffb0",l.beginPath(),l.roundRect(80,h,Math.max(18,864*s/100),18,9),l.fill()}let u=wa(o);return u.userData={aspect:1024/a},u}function nh(i,e,t){let n=String(e||"");if(i.measureText(n).width<=t)return n;for(;n.length>3&&i.measureText(n+"\u2026").width>t;)n=n.slice(0,-1);return n+"\u2026"}function Ea(i,{color:e="#fff",bg:t=null,size:n=256,font:s=800}={}){let r=Sa(n,n),a=r.getContext("2d");return t&&(a.beginPath(),a.arc(n/2,n/2,n/2-6,0,Math.PI*2),a.fillStyle=t,a.fill(),a.lineWidth=10,a.strokeStyle="#fff",a.stroke()),a.fillStyle=e,a.textAlign="center",a.textBaseline="middle",a.font=`${s} ${Math.round(n*(String(i).length>2?.42:.62))}px ${ih},"Segoe UI Emoji","Noto Color Emoji",sans-serif`,a.fillText(String(i),n/2,n/2+n*.04),wa(r)}function vp(){let e=Sa(64,64),t=e.getContext("2d"),n=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,.55)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),wa(e)}function rh(i="#7dffb0"){let e=Sa(512,320),t=e.getContext("2d"),n=t.createLinearGradient(0,0,0,320);n.addColorStop(0,"#16205a"),n.addColorStop(1,"#0b1030"),t.fillStyle=n,t.fillRect(0,0,512,320);let s=["si","alors","tant que","\xC9crire","Lire","pour","\u2190","fin"];t.font="700 26px Consolas,monospace";for(let r=0;r<9;r++){let a=26+r%3*22;t.fillStyle="rgba(255,255,255,.35)",t.fillText(String(r+1),8,40+r*31);for(let o=0;o<3;o++){let l=s[(r*3+o)%s.length];t.fillStyle=o===0?i:o===1?"#ffd86b":"#c9d2ff",t.fillText(l,a+24,40+r*31),a+=t.measureText(l).width+18}}return wa(e)}var Fn=(i,e={})=>new bt({color:i,roughness:.55,metalness:.08,...e}),Ta=(i,e=2.2)=>new bt({color:i,emissive:i,emissiveIntensity:e,roughness:.4});function pt(i,e,{x:t=0,y:n=0,z:s=0,cast:r=!0}={}){let a=new Ze(i,e);return a.position.set(t,n,s),a.castShadow=r,a.receiveShadow=!0,a}function cc(i="#c8431a"){let e=new Mt,t=Fn(i),n=Fn("#f7f2e8"),s=Fn("#1c2340");e.add(pt(new vt(.9,.75,.7),t,{y:.62})),e.add(pt(new vt(.62,.36,.05),n,{y:.66,z:.36}));let r=new Mt;r.position.y=1.28,e.add(r),r.add(pt(new vt(.78,.52,.62),n)),r.add(pt(new vt(.62,.3,.04),s,{z:.32}));let a=Ta("#7dffe0",3);r.add(pt(new ii(.07,12,8),a,{x:-.15,z:.35,cast:!1})),r.add(pt(new ii(.07,12,8),a,{x:.15,z:.35,cast:!1})),r.add(pt(new Ot(.025,.025,.3),s,{y:.4}));let o=pt(new ii(.08,12,8),Ta("#f2b418",3),{y:.58,cast:!1});r.add(o);for(let l of[-1,1]){e.add(pt(new Ot(.2,.2,.18,16).rotateZ(Math.PI/2),s,{x:l*.4,y:.2}));let c=pt(new Vs(.08,.36,4,8),t,{x:l*.56,y:.62});c.rotation.z=l*.25,e.add(c)}return e.userData={head:r,bulb:o,eyeM:a},e}function _p(){let i=new Mt,e=Fn("#e9ecf7"),t=Fn("#1c2340"),n=new bt({map:rh(),emissive:"#ffffff",emissiveMap:rh(),emissiveIntensity:.9});i.add(pt(new vt(2.6,1.7,.16),t,{y:2.05})),i.add(pt(new ni(2.4,1.5),n,{y:2.05,z:.085,cast:!1})),i.add(pt(new Ot(.09,.12,.9),e,{y:.95,z:-.05})),i.add(pt(new vt(1,.08,.6),e,{y:.5})),i.add(pt(new vt(1.9,.08,.6),e,{y:.5,z:1}));for(let r=0;r<4;r++)for(let a=0;a<12;a++)i.add(pt(new vt(.12,.05,.1),t,{x:-.8+a*.145,y:.56,z:.8+r*.13,cast:!1}));let s=new Mt;return s.position.set(1.9,0,-.1),i.add(s),s.add(pt(new vt(.7,1.7,1.3),e,{y:1.31})),s.add(pt(new vt(.04,.1,.1),Ta("#7dffb0",3),{x:.36,y:1.9,z:.4,cast:!1})),i.add(pt(new Vs(.11,.12,4,8).rotateX(Math.PI/2),e,{x:1.2,y:.58,z:1})),i}function yp(){let i=new Mt;return["#2b3fc4","#0a7467","#c8431a","#f2b418"].forEach((t,n)=>{let s=new Mt;s.position.set((n-1.5)*.55,1.2+n*.55,n%2*.3-n*.15),s.rotation.y=(n-1.5)*.18,s.add(pt(new vt(1.8,1.2,.06),Fn("#ffffff"))),s.add(pt(new vt(1.8,.2,.08),Ta(t,.9),{y:.5,cast:!1}));for(let r=0;r<3;r++)s.add(pt(new vt(1.2-r*.25,.08,.07),Fn("#c9d2ff"),{x:-.2+r*.1,y:.18-r*.22,cast:!1}));s.userData.base=s.position.y,s.userData.phase=n,i.add(s)}),i.userData.float=!0,i}function bp(){let i=new Mt,e=new Mt;e.position.y=2.1,i.add(e),e.add(pt(new Mi(1.15,2),Fn("#2b3fc4",{flatShading:!0}))),e.add(new Ze(new Mi(1.2,1),new on({color:"#9fd8ff",wireframe:!0,transparent:!0,opacity:.55})));let t=[],n=new Hs({color:"#ffd86b",transparent:!0,opacity:.8});for(let r=0;r<6;r++){let a=r/6*Math.PI*2,o=new D(Math.cos(a)*2.1,Math.sin(a*2)*.5,Math.sin(a)*2.1);e.add(pt(new Ji(.16),Ta("#f2b418",2.5),{x:o.x,y:o.y,z:o.z,cast:!1})),t.push(o)}let s=[];return t.forEach((r,a)=>{s.push(new D,r,r,t[(a+1)%t.length])}),e.add(new Yr(new xt().setFromPoints(s),n)),i.add(pt(new Ot(.12,.3,1,8),Fn("#6d3aa8"),{y:.5})),i.userData.spin=e,i}function Aa(i,e,t=0){let n=new Zi;return n.moveTo(-i,t),n.lineTo(-i,e),n.absarc(0,e,i,Math.PI,0,!0),n.lineTo(i,t),n.lineTo(-i,t),n}function ah(i,e,t,n,s=.25){let r=Aa(i,e);r.holes.push(Aa(i-t,e,t));let a=new la(r,{depth:s,bevelEnabled:!0,bevelSize:.04,bevelThickness:.04,bevelSegments:2,curveSegments:24});return a.translate(0,0,-s/2),pt(a,Fn(n,{roughness:.45}))}function oh(i,e,t=1,n="#c98b5a"){let s=new Ot(i,i*.25,e,10,4),r=s.attributes.position,a=t,o=()=>(a=a*16807%2147483647,a/2147483647);for(let l=0;l<r.count;l++){let c=r.getY(l);if(c>e/2-.01)continue;let u=1+(o()-.5)*.35;r.setX(l,r.getX(l)*u),r.setZ(l,r.getZ(l)*u),r.setY(l,c+(o()-.5)*.4)}return s.computeVertexNormals(),pt(s,Fn(n,{flatShading:!0,roughness:.9}))}var us={1:"#4a5fe0",2:"#13a190",3:"#e8683a",4:"#9159cf"},Mp={todo:"#7f8bc4",doing:"#f2b418",done:"#2fd17a"},lh=17,Ry=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function hc(){try{let i=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(i.getContext("webgl2")||i.getContext("webgl")))}catch{return!1}}function Sp(i,{modules:e,onPick:t,onHover:n,reduced:s}){let r=new nr({antialias:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),r.setSize(i.clientWidth,i.clientHeight),r.outputColorSpace=Nt,r.toneMapping=Ci,r.toneMappingExposure=1.05,r.shadowMap.enabled=!0,r.shadowMap.type=Zs,r.domElement.setAttribute("aria-hidden","true"),i.append(r.domElement);let a=new Xi;a.fog=new qr("#5a3d7e",90,260);let o=new Ft(50,i.clientWidth/i.clientHeight,.1,600);o.position.set(0,40,70);let l=new sr(o,r.domElement);l.enableDamping=!0,l.dampingFactor=.07,l.enablePan=!1,l.minDistance=6,l.maxDistance=75,l.maxPolarAngle=Math.PI*.47,l.minPolarAngle=Math.PI*.12,l.target.set(0,1,0),l.addEventListener("start",()=>{l.autoRotate=!1});let c=new Ze(new ii(400,32,16),new Tt({side:qt,depthWrite:!1,fog:!1,uniforms:{top:{value:new Ue("#0b1036")},mid:{value:new Ue("#3b2a78")},low:{value:new Ue("#f39a5b")}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 top; uniform vec3 mid; uniform vec3 low; varying vec3 vP; void main(){ float y = vP.y; vec3 deep = vec3(0.10, 0.07, 0.24); vec3 c = y > 0.12 ? mix(mid, top, smoothstep(0.12, 0.7, y)) : y > -0.02 ? mix(low, mid, smoothstep(-0.02, 0.12, y)) : mix(low, deep, smoothstep(-0.02, -0.35, y)); gl_FragColor = vec4(c, 1.0); }"}));a.add(c);let u=vp();{let N=new Float32Array(4200);for(let B=0;B<1400;B++){let X=Math.random()*Math.PI*2,q=Math.acos(Math.random()*.85+.15),ae=350;N.set([ae*Math.sin(q)*Math.cos(X),ae*Math.cos(q),ae*Math.sin(q)*Math.sin(X)],B*3)}let V=new xt;V.setAttribute("position",new Lt(N,3)),a.add(new Yi(V,new bi({size:2.2,map:u,transparent:!0,depthWrite:!1,fog:!1,color:"#fff7d6"})))}{let I=new bt({color:"#3a2457",flatShading:!0,roughness:1});for(let N=0;N<30;N++){let V=N/30*Math.PI*2+Math.random()*.12,B=200+Math.random()*25,X=30+Math.random()*22,q=new Ze(new Kr(26+Math.random()*16,X,6),I);q.position.set(Math.cos(V)*B,X/2-30,Math.sin(V)*B),q.rotation.y=Math.random()*3,a.add(q)}}a.add(new Qi("#c3ccff","#c98b5a",1));let h=new ts("#ffe0b5",2.4);h.position.set(28,40,18),h.castShadow=!0,h.shadow.mapSize.set(2048,2048),Object.assign(h.shadow.camera,{left:-32,right:32,top:32,bottom:-32,near:1,far:120}),h.shadow.bias=-5e-4,a.add(h);let g=new Mt;a.add(g);let m=new bt({color:"#c8643a",roughness:.8}),x=new bt({map:sh(),roughness:.6}),p=new Ze(new Ot(8,8,.7,64),[m,x,m]);p.receiveShadow=!0,p.position.y=-.35,g.add(p);let d=oh(8,7,7);d.position.y=-4.2,g.add(d);let f=new Mt;g.add(f);let b=new bt({color:"#f7f2e8",roughness:.6}),S=new Ze(new Ot(2.4,2.6,.6,8),b);S.position.y=.3,S.castShadow=S.receiveShadow=!0,f.add(S);let _=new Ze(new Ot(2.2,2.2,.05,8),new bt({color:"#4fd6ff",emissive:"#1aa6d9",emissiveIntensity:.9,roughness:.15,metalness:.2}));_.position.y=.58,f.add(_);let w=new Ze(new Ot(.3,.4,1.6,8),b);w.position.y=1.2,w.castShadow=!0,f.add(w);let C=new Ze(new Ji(.9,0),new bt({color:"#f2b418",emissive:"#f2b418",emissiveIntensity:1.6,flatShading:!0,roughness:.3}));C.position.y=3.4,f.add(C);let L=new Ze(new Mi(1.6,1),new on({color:"#ffe9a6",wireframe:!0,transparent:!0,opacity:.35}));L.position.y=3.4,f.add(L);let T=new $s("#ffcf6b",30,18,2);T.position.y=3.4,f.add(T);let M=uc(lc({title:"InfoPlay Maroc",sub:"Choisis une \xEEle pour commencer",ar:"\u0627\u062E\u062A\u0631 \u062C\u0632\u064A\u0631\u0629 \u0644\u062A\u0628\u062F\u0623",color:"#f2b418"}),10);M.position.y=7.2,g.add(M);let y=[],P={},O={},G=[],j={1:_p,2:yp,3:()=>{let I=cc("#c8431a");return I.scale.setScalar(1.7),I},4:bp};e.forEach((I,N)=>{let V=us[I.id],B=N/e.length*Math.PI*2+Math.PI/4,X=new D(Math.cos(B),0,Math.sin(B)),q=new Mt;q.position.copy(X).multiplyScalar(lh),q.position.y=.5,a.add(q);let ae=new Ze(new Ot(5,5,.5,12),[m,new bt({map:sh(V,"#f2b418"),roughness:.7}),m]);ae.receiveShadow=!0,ae.castShadow=!0,q.add(ae);let ve=oh(5,5.5,11+N*13);ve.position.y=-3,q.add(ve);let ie=new bt({color:V,emissive:V,emissiveIntensity:1.4}),de=new Ze(new ca(5.15,.09,8,72).rotateX(Math.PI/2),ie);de.position.y=.26,q.add(de);let Ce=j[I.id]();Ce.position.y=.25,Ce.rotation.y=Math.atan2(X.x,X.z),q.add(Ce);let we=uc(Ea(I.icon,{bg:V}),2);we.position.y=5.6,q.add(we);let ye=uc(lc({title:`Module ${I.id}`,sub:I.short||I.title,color:V,pct:0}),8.5);ye.position.y=8.2,q.add(ye);let Ge=new $s(V,10,14,2);Ge.position.set(0,3,0),q.add(Ge);let F=new Ze(new Ot(5.4,5.4,9,12),new on({visible:!1}));F.position.y=2.5,q.add(F),F.userData.target={type:"module",mi:I.id},y.push(F),P[I.id]={g:q,dir:X,ringMat:ie,lab:ye,lm:Ce,icon:we,color:V,base:q.position.y,phase:N*1.7,hover:0},Y(X,V);let ce=ah(1.3,1.7,.32,"#f7f2e8");ce.position.copy(X).multiplyScalar(7.2),ce.rotation.y=Math.atan2(X.x,X.z),g.add(ce);let xe=new Ze(new Ws(Aa(.98,1.7,.32),16),new on({color:V,transparent:!0,opacity:.35,side:en,depthWrite:!1}));xe.position.copy(ce.position),xe.rotation.copy(ce.rotation),g.add(xe),O[I.id]=J(I,q,X,V)});function Y(I,N){let B=new vt(1.4,.18,.9),X=new bt({color:"#f7f2e8",emissive:N,emissiveIntensity:.35,roughness:.5}),q=new $r(B,X,9);q.castShadow=!0,q.receiveShadow=!0;let ae=new Ct,ve=Math.atan2(I.x,I.z);for(let ie=0;ie<9;ie++){let de=(ie+.5)/9,Ce=8+de*(lh-5-8);ae.position.copy(I).multiplyScalar(Ce),ae.position.y=-.2+Math.sin(de*Math.PI)*.6,ae.rotation.set(0,ve,0),ae.updateMatrix(),q.setMatrixAt(ie,ae.matrix)}q.userData={dir:I,n:9,yaw:ve},G.push(q),a.add(q)}function J(I,N,V,B){let X=[],q=I.sessions.length,ae=Math.min(Math.PI*.95,.36*q),ve=Math.atan2(V.z,V.x);return I.sessions.forEach((ie,de)=>{let Ce=ve+(q===1?0:-ae/2+ae*de/(q-1)),we=new Mt;we.position.set(Math.cos(Ce)*3.6,.25,Math.sin(Ce)*3.6);let ye=new D(Math.cos(Ce),0,Math.sin(Ce));we.rotation.y=Math.atan2(ye.x,ye.z);let Ge=ah(.62,1,.14,"#f7f2e8",.16);we.add(Ge);let F=oe(Mp.todo),ce=new Ze(new Ws(Aa(.48,1,.14),20),F);ce.position.z=.01,we.add(ce);let xe=uc(Ea(String(ie.index),{bg:B}),.55);xe.position.y=1.95,we.add(xe);let Ae=new Ze(new vt(1.35,2.3,.6),new on({visible:!1}));Ae.position.y=1.05,we.add(Ae),Ae.userData.target={type:"session",mi:I.id,si:ie.index},y.push(Ae),we.visible=!1,we.scale.setScalar(.001),N.add(we),X.push({p:we,mat:F,outward:ye,hover:0,show:0})}),X}function oe(I){return new Tt({transparent:!0,depthWrite:!1,side:en,uniforms:{t:{value:0},col:{value:new Ue(I)},boost:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform float t; uniform vec3 col; uniform float boost; varying vec2 vUv; void main(){ vec2 c = vUv - vec2(0.0, 0.85); float r = length(c); float a = atan(c.y, c.x); float sw = sin(a*4.0 + r*10.0 - t*2.5)*0.5+0.5; float glow = 0.35 + 0.45*sw*(1.0-smoothstep(0.0,1.2,r)); gl_FragColor = vec4(col*(1.6+boost*1.5)*glow + vec3(0.15*boost), 0.75 + 0.2*boost); }"})}let K=(()=>{let N=new Float32Array(1140);for(let X=0;X<380;X++)N.set([(Math.random()-.5)*70,Math.random()*18-2,(Math.random()-.5)*70],X*3);let V=new xt;V.setAttribute("position",new Lt(N,3));let B=new Yi(V,new bi({size:.35,map:u,color:"#ffd98a",transparent:!0,depthWrite:!1,blending:Ai}));return a.add(B),B})(),pe=new rc(r);pe.addPass(new ac(a,o));let Me=new ar(new ne(i.clientWidth/2,i.clientHeight/2),.45,.5,.88);pe.addPass(Me),pe.addPass(new oc);let Te=new da,Fe=new ne,Be=null,Je=null,je=I=>{let N=r.domElement.getBoundingClientRect();Fe.set((I.clientX-N.left)/N.width*2-1,-((I.clientY-N.top)/N.height)*2+1),Te.setFromCamera(Fe,o);let V=Te.intersectObjects(y.filter(B=>z(B)),!1)[0];return V?V.object.userData.target:null},z=I=>{for(let N=I;N;N=N.parent)if(!N.visible)return!1;return!0},W=(I,N)=>I&&N&&I.type===N.type&&I.mi===N.mi&&I.si===N.si;r.domElement.addEventListener("pointermove",I=>{if(Xe)return;let N=je(I);W(N,Be)?N&&n&&n(N,I):(Be=N,r.domElement.style.cursor=N?"pointer":"",n&&n(N,I))}),r.domElement.addEventListener("pointerleave",()=>{Be=null,n&&n(null)}),r.domElement.addEventListener("pointerdown",I=>{Je=[I.clientX,I.clientY]}),r.domElement.addEventListener("pointerup",I=>{if(!Je||Xe)return;let N=Math.hypot(I.clientX-Je[0],I.clientY-Je[1]);if(Je=null,N<6){let V=je(I);V&&t(V)}});let ue=0,ge=null,be=null,ke=null,Xe=!1,U=!1;function se(I,N,V){if(l.autoRotate=!1,s()){o.position.copy(I),l.target.copy(N),l.update(),V&&V();return}ge={p0:o.position.clone(),t0:l.target.clone(),p1:I,t1:N,start:performance.now(),dur:1500,after:V},l.enabled=!1}function te(I){return P[I].g.position.clone()}function ee(I){for(let N in O)O[N].forEach(V=>{V.wanted=Number(N)===I,V.wanted&&(V.p.visible=!0)})}let Q={focusHub(){be=null,ke=null,ee(null),Xe=!1,U=!1,se(new D(0,19,50),new D(0,0,0),()=>{l.autoRotate=!s(),l.autoRotateSpeed=.35}),l.minDistance=14,l.maxDistance=75},focusModule(I){be=I,ke=null,ee(I),Xe=!1,U=!1;let N=te(I),V=P[I].dir;se(N.clone().add(V.clone().multiplyScalar(14)).add(new D(0,5,0)),N.clone().add(new D(0,1.6,0))),l.minDistance=6,l.maxDistance=30},focusSession(I,N){be=I,ke=N,ee(I),Xe=!1,U=!1;let V=O[I][N-1];if(!V)return;let X=te(I).clone().add(V.p.position);se(X.clone().add(V.outward.clone().multiplyScalar(4.6)).add(new D(0,1.7,0)),X.clone().add(new D(0,1.05,0))),l.minDistance=3,l.maxDistance=16},focusActivity(I,N){Q.focusSession(I,N),Xe=!0,U=!0;let V=()=>{l.autoRotate=!s(),l.autoRotateSpeed=.6};ge?ge.after=V:V()},setProgress(I){for(let N of e){let V=I[N.id];if(!V)continue;let B=P[N.id],X=lc({title:`Module ${N.id}`,sub:`${N.short||N.title} \xB7 ${V.pct} %`,color:B.color,pct:V.pct});B.lab.material.map.dispose(),B.lab.material.map=X,B.lab.material.needsUpdate=!0,O[N.id].forEach((q,ae)=>{q.mat.uniforms.col.value.set(Mp[V.sessions[ae+1]||"todo"])})}},burst(I=!1){let N=be?l.target.clone():new D(0,3.4,0);le(N,I?260:120,I)},setInset(I){I!==ue&&(ue=I,Q.resize())},resize(){let I=i.clientWidth,N=i.clientHeight,V=I+ue;o.aspect=V/N,ue?o.setViewOffset(V,N,ue,0,I,N):o.clearViewOffset(),o.updateProjectionMatrix(),r.setSize(I,N),pe.setSize(I,N),Me.setSize(I/2,N/2)},setHighlight(I){Be=I},camera:o,scene:a},me=[];function le(I,N,V){if(s())return;let B=new Float32Array(N*3),X=new Float32Array(N*3),q=[],ae=["#f2b418","#2fd17a","#4a5fe0","#e8683a","#ffffff","#9159cf"].map(de=>new Ue(de));for(let de=0;de<N;de++){B.set([I.x,I.y,I.z],de*3);let Ce=ae[de%ae.length];X.set([Ce.r,Ce.g,Ce.b],de*3);let we=new D(Math.random()-.5,Math.random()*.9+.4,Math.random()-.5).normalize().multiplyScalar(4+Math.random()*(V?7:4));q.push(we)}let ve=new xt;ve.setAttribute("position",new Lt(B,3)),ve.setAttribute("color",new Lt(X,3));let ie=new Yi(ve,new bi({size:V?.38:.3,map:u,vertexColors:!0,transparent:!0,depthWrite:!1,blending:Ai}));a.add(ie),me.push({pts:ie,vel:q,life:0})}let _e=new ns,Ve=0,ze=0,R=new Ct;function E(){ze=requestAnimationFrame(E),Ve++;let I=Math.min(_e.getDelta(),.05),N=_e.elapsedTime,V=s();if(!(U&&Ve%2)){if(ge){let B=Math.min(1,(performance.now()-ge.start)/ge.dur),X=Ry(B);if(o.position.lerpVectors(ge.p0,ge.p1,X),l.target.lerpVectors(ge.t0,ge.t1,X),B>=1){let q=ge;ge=null,l.enabled=!0,q.after&&q.after()}}if(l.update(),!V){C.rotation.y+=I*.8,C.position.y=3.4+Math.sin(N*1.5)*.18,L.rotation.y-=I*.3,L.rotation.x+=I*.15,M.position.y=7.2+Math.sin(N)*.12,M.material.opacity+=((be?0:1)-M.material.opacity)*Math.min(1,I*6),M.visible=M.material.opacity>.02;let B=K.geometry.attributes.position;for(let X=0;X<B.count;X++){let q=B.getY(X)+I*.4;q>16&&(q=-2),B.setY(X,q)}B.needsUpdate=!0;for(let X of G){let{dir:q,n:ae,yaw:ve}=X.userData;for(let ie=0;ie<ae;ie++){let de=(ie+.5)/ae,Ce=8+de*(lh-5-8);R.position.copy(q).multiplyScalar(Ce),R.position.y=-.2+Math.sin(de*Math.PI)*.6+Math.sin(N*2+ie*.7)*.08,R.rotation.set(0,ve,0),R.updateMatrix(),X.setMatrixAt(ie,R.matrix)}X.instanceMatrix.needsUpdate=!0}}for(let B in P){let X=P[B],q=Be&&Be.type==="module"&&Be.mi===Number(B);X.hover+=((q?1:0)-X.hover)*Math.min(1,I*8),V||(X.g.position.y=X.base+Math.sin(N*.8+X.phase)*.25),X.ringMat.emissiveIntensity=1.2+X.hover*2.5+(be===Number(B)?1:0),X.icon.position.y=5.6+(V?0:Math.sin(N*2+X.phase)*.15);let ae=X.lm;V||(ae.userData.spin&&(ae.userData.spin.rotation.y+=I*.4),ae.userData.float&&ae.children.forEach(ve=>{ve.position.y=ve.userData.base+Math.sin(N*1.4+ve.userData.phase)*.12}),ae.userData.head&&(ae.userData.head.rotation.y=Math.sin(N*.9)*.5,ae.userData.bulb.material.emissiveIntensity=2+Math.sin(N*5)*1.2))}for(let B in O)O[B].forEach((X,q)=>{let ae=X.wanted?1:0;if(X.show+=(ae-X.show)*Math.min(1,I*(V?60:5+q*.05)),X.show<.01&&!X.wanted){X.p.visible=!1,X.p.scale.setScalar(.001);return}let ve=Be&&Be.type==="session"&&Be.mi===Number(B)&&Be.si===q+1;X.hover+=((ve?1:0)-X.hover)*Math.min(1,I*8),X.p.scale.setScalar(Math.max(.001,X.show*(1+X.hover*.12)));let ie=ke===q+1&&be===Number(B);X.mat.uniforms.t.value=V?0:N,X.mat.uniforms.boost.value=Math.max(X.hover,ie?.7+(V?0:Math.sin(N*3)*.3):0)});for(let B=me.length-1;B>=0;B--){let X=me[B];X.life+=I;let q=X.pts.geometry.attributes.position;for(let ae=0;ae<X.vel.length;ae++){let ve=X.vel[ae];ve.y-=6*I,q.setXYZ(ae,q.getX(ae)+ve.x*I,q.getY(ae)+ve.y*I,q.getZ(ae)+ve.z*I)}q.needsUpdate=!0,X.pts.material.opacity=Math.max(0,1-X.life/2.2),X.life>2.2&&(a.remove(X.pts),X.pts.geometry.dispose(),X.pts.material.dispose(),me.splice(B,1))}pe.render()}}return window.addEventListener("resize",Q.resize),Q.focusHub(),E(),Q.dispose=()=>{cancelAnimationFrame(ze),window.removeEventListener("resize",Q.resize),r.dispose()},Q}function uc(i,e){let t=new $i(new yi({map:i,transparent:!0,depthWrite:!1})),n=i.userData?.aspect||1;return t.scale.set(e,e/n,1),t}var wp={A:"Avancer",G:"Pivoter \xE0 gauche",D:"Pivoter \xE0 droite"},Ep={A:"\u2B06 Avancer",G:"\u27F2 Gauche",D:"\u27F3 Droite"},Iy=i=>Math.PI/2-i*(Math.PI/2);function Tp(i,e){if(!hc())return Oa(i,e);let t=e.levels.map(z=>({...z,...fr(z.grid),best:wc(fr(z.grid))})),n=t.map(()=>[]),s=t.map(()=>!1),r=0,a=v("div",{class:"lvtabs",role:"tablist"}),o=v("div",{class:"robot3d-view",role:"img","aria-label":"Plateau du robot en 3D"}),l=v("ol",{class:"rseq","aria-label":"Programme du robot"}),c=v("span",{class:"muted"}),u=v("p",{class:"hint-line","aria-live":"polite"}),h=v("p",{class:"vh","aria-live":"polite"}),g=new nr({antialias:!0,alpha:!0});g.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),g.outputColorSpace=Nt,g.toneMapping=Ci,g.shadowMap.enabled=!0,g.shadowMap.type=Zs,o.append(g.domElement);let m=new Xi,x=new Ft(42,1.6,.1,100),p=new sr(x,g.domElement);p.enableDamping=!0,p.enablePan=!1,p.maxPolarAngle=Math.PI*.45,p.minDistance=4,p.maxDistance=22,m.add(new Qi("#dfe6ff","#c98b5a",1.3));let d=new ts("#fff1d6",2.2);d.position.set(6,10,4),d.castShadow=!0,d.shadow.mapSize.set(1024,1024),Object.assign(d.shadow.camera,{left:-8,right:8,top:8,bottom:-8}),m.add(d);let f=new Mt;m.add(f);let b=cc("#c8431a");b.scale.setScalar(.55),m.add(b);let S=new vt(.94,.2,.94),_=new vt(.9,.8,.9),w={a:new bt({color:"#f7f2e8",roughness:.7}),b:new bt({color:"#e9dfc9",roughness:.7}),wall:new bt({color:"#6b77a8",roughness:.6,flatShading:!0}),goal:new bt({color:"#f2b418",emissive:"#f2b418",emissiveIntensity:.6}),start:new bt({color:"#9fd8ff",roughness:.6})},C=null;function L(){f.clear();let z=t[r];z.g.forEach((Xe,U)=>Xe.forEach((se,te)=>{let ee=new Ze(S,se==="G"?w.goal:se==="S"?w.start:(U+te)%2?w.a:w.b);if(ee.position.set(te,-.1,U),ee.receiveShadow=!0,f.add(ee),se==="#"){let Q=new Ze(_,w.wall);Q.position.set(te,.4,U),Q.castShadow=Q.receiveShadow=!0,f.add(Q)}if(se==="G"){C=new Mt,C.position.set(te,0,U);let Q=new Ze(new Ot(.03,.03,1.1),new bt({color:"#1c2340"}));Q.position.y=.55,Q.castShadow=!0,C.add(Q);let me=new Ze(new ni(.45,.3),new bt({color:"#c1272d",side:en,emissive:"#c1272d",emissiveIntensity:.3}));me.position.set(.24,.95,0),C.add(me);let le=new $i(new yi({map:Ea("\u2605",{color:"#0a7467"}),transparent:!0}));le.scale.setScalar(.22),le.position.set(.24,.95,.01),C.add(le),f.add(C)}}));let W=(z.W-1)/2,ue=(z.H-1)/2,be=Math.max(z.W,z.H)*1.15+1.6,ke=new D(-.12,.8,.62).normalize();p.target.set(W,0,ue),x.position.set(W+ke.x*be,ke.y*be,ue+ke.z*be),p.update()}let T=null,M=0,y={x:0,z:0,yaw:0,y:0};function P(z,W=!1){y.x=z.c,y.z=z.r,y.yaw=Iy(z.d),y.y=0,O(W)}function O(){b.position.set(y.x,y.y,y.z),b.rotation.y=y.yaw}function G(z,W,ue){if(Xn()){P(z[z.length-1]),ue();return}let ge=0;P(z[0]);let be=()=>{if(ge++,ge>=z.length){W?j(ue):ue();return}let ke=z[ge-1],Xe=z[ge],U=0;Xe.d!==ke.d&&(U=((Xe.d-ke.d+4)%4===1?-1:1)*(Math.PI/2)),nt.play("robot"),T={from:{x:y.x,z:y.z,yaw:y.yaw},to:{x:Xe.c,z:Xe.r,yaw:y.yaw+U},bump:!!Xe.bump,start:performance.now(),dur:420,then:be}};be()}function j(z){nt.play("success"),T={victory:!0,start:performance.now(),dur:900,base:y.yaw,then:z}}function Y(){if(M=requestAnimationFrame(Y),!o.isConnected){K();return}let z=performance.now();if(T){let W=Math.min(1,(z-T.start)/T.dur),ue=W<.5?2*W*W:1-Math.pow(-2*W+2,2)/2;if(T.victory)y.y=Math.sin(W*Math.PI)*.6,y.yaw=T.base+ue*Math.PI*2;else if(T.bump){let ge=Math.sin(W*Math.PI),be=[[1,0],[0,1],[-1,0],[0,-1]][(Math.round((Math.PI/2-T.from.yaw)/(Math.PI/2))%4+4)%4];y.x=T.from.x+be[0]*ge*.25,y.z=T.from.z+be[1]*ge*.25}else y.x=T.from.x+(T.to.x-T.from.x)*ue,y.z=T.from.z+(T.to.z-T.from.z)*ue,y.yaw=T.from.yaw+(T.to.yaw-T.from.yaw)*ue,y.y=Math.abs(Math.sin(W*Math.PI))*.08;if(O(),W>=1){let ge=T;T=null,ge.victory&&(y.y=0,y.yaw=ge.base,O()),ge.then&&ge.then()}}C&&!Xn()&&(C.children[1].rotation.y=Math.sin(z/300)*.25),b.userData.head&&!Xn()&&(b.userData.bulb.material.emissiveIntensity=2+Math.sin(z/150)*1.2),p.update(),g.render(m,x)}function J(){let z=o.clientWidth||600,W=o.clientHeight||360;g.setSize(z,W,!1),x.aspect=z/W,x.updateProjectionMatrix()}let oe=new ResizeObserver(J);oe.observe(o);function K(){cancelAnimationFrame(M),oe.disconnect(),g.dispose()}function pe(){a.replaceChildren(...t.map((z,W)=>v("button",{type:"button",role:"tab","aria-selected":String(W===r),class:"tab"+(W===r?" on":"")+(s[W]?" done":""),onclick:()=>{T=null,r=W,Fe()}},`Niveau ${W+1}`+(s[W]?" \u2714":""))))}function Me(){let z=n[r];l.replaceChildren(...z.map(W=>v("li",null,Ep[W]))),z.length||l.append(v("li",{class:"muted"},"Programme vide")),c.textContent=`${z.length} / ${t[r].max} commandes`}function Te(){let z=t[r];h.textContent=`Niveau ${r+1} : grille de ${z.H} lignes et ${z.W} colonnes. D\xE9part ligne ${z.start[0]+1}, colonne ${z.start[1]+1}, robot tourn\xE9 vers la droite. Objectif ligne ${z.goal[0]+1}, colonne ${z.goal[1]+1}. Obstacles : ${z.g.flatMap((W,ue)=>W.map((ge,be)=>ge==="#"?`(${ue+1},${be+1})`:null)).filter(Boolean).join(" ")||"aucun"}.`}function Fe(){pe(),Me(),L(),P({r:t[r].start[0],c:t[r].start[1],d:0}),u.textContent="",Te()}function Be(z){if(n[r].length>=t[r].max){u.textContent="Programme complet : retire une commande ou simplifie.";return}n[r].push(z),Me()}function Je(){T=null;let z=t[r],W=pr(z,n[r]),ue=r;u.textContent="Ex\xE9cution\u2026",G(W.trace,W.ok,()=>{W.ok&&(s[ue]=!0),ue===r&&(u.textContent=W.reason),pe()})}let je=v("div",{class:"rbar"},["A","G","D"].map(z=>v("button",{type:"button",class:"btn","aria-label":wp[z],onclick:()=>Be(z)},Ep[z])),v("button",{type:"button",class:"btn ghost",onclick:()=>{n[r].pop(),Me()}},"\u232B Retirer la derni\xE8re"),v("button",{type:"button",class:"btn ghost",onclick:()=>{n[r]=[],T=null,Fe()}},"Tout effacer"),v("button",{type:"button",class:"btn primary",onclick:Je},"\u25B6 Ex\xE9cuter"));return i.append(v("p",{class:"muted"},"Le robot d\xE9marre tourn\xE9 vers la droite. Fais glisser la sc\xE8ne pour tourner autour du plateau. Construis la suite de commandes, ex\xE9cute-la, puis clique sur \xAB V\xE9rifier \xBB."),a,v("div",{class:"rwrap robot3d-wrap"},o,v("div",null,v("h3",{class:"small-h"},"Programme"),l,c)),je,u,h),Fe(),requestAnimationFrame(()=>{J(),Y()}),{check(){let z=t.map((W,ue)=>({ok:s[ue],msg:`Niveau ${ue+1} : `+(s[ue]?"r\xE9ussi.":"non r\xE9ussi.")+` Une solution en ${W.best.length} commandes : ${W.best.map(ge=>wp[ge].toLowerCase()).join(", ")}.`}));return{correct:s.filter(Boolean).length,total:t.length,items:z,unanswered:0}},reveal(){T=null},solve(){t.forEach((z,W)=>{n[W]=[...z.best],s[W]=pr(z,n[W]).ok}),Fe()},dispose:K}}var jt=Th(xc(),kh),Cp={match:"Associer",sort:"Classer",order:"Ordonner",fill:"Compl\xE9ter",quiz:"Questions",hot:"Rep\xE9rer",asm:"Assembler",net:"Relier",robot:"Robot 3D",prog:"Algorithme",sim:"Simulation"},dh={match:"\u{1F517}",sort:"\u{1F5C3}\uFE0F",order:"\u{1F522}",fill:"\u270F\uFE0F",quiz:"\u2753",hot:"\u{1F3AF}",asm:"\u{1F9E9}",net:"\u{1F578}\uFE0F",robot:"\u{1F916}",prog:"\u{1F9E0}",sim:"\u{1F5B1}\uFE0F"},Ly={todo:"Pas commenc\xE9e",doing:"En cours",done:"Termin\xE9e"},fh={sessions:ci.flatMap(i=>i.sessions)},oi=i=>e=>jt.record(i,e),or=i=>{location.hash=i},lr=i=>i?v("small",{class:"ar-sub",lang:"ar",dir:"rtl"},i):null,mt={world:document.getElementById("world"),hud:document.getElementById("hud"),panel:document.getElementById("panel"),holo:document.getElementById("holo"),gate:document.getElementById("gate"),tip:document.getElementById("tip"),live:document.getElementById("live")};function ch(i){let e=i?.preferences||{};document.body.classList.toggle("reduced-motion",!!e.reducedMotion),document.body.classList.toggle("large-text",!!e.largeText),document.body.classList.toggle("high-contrast",!!e.highContrast),nt.configure(e)}function Dy(i){let e=v("div",{class:"toast",role:"status"},i);document.body.append(e),setTimeout(()=>e.remove(),3200)}function Uy(i,e="Continuer"){return new Promise(t=>{let n=document.activeElement,s=o=>{a.remove(),n&&n.focus&&n.focus(),t(o)},r=v("button",{type:"button",class:"btn primary",onclick:()=>s(!0)},e),a=v("div",{class:"modal-bg",onkeydown:o=>{o.key==="Escape"&&(o.stopPropagation(),s(!1))}},v("div",{class:"modal",role:"alertdialog","aria-modal":"true","aria-label":i},v("p",null,i),v("div",{class:"row"},r,v("button",{type:"button",class:"btn ghost",onclick:()=>s(!1)},"Annuler"))));document.body.append(a),r.focus()})}var Rp=(i,e)=>v("div",{class:"bar",role:"progressbar","aria-valuenow":i,"aria-valuemin":0,"aria-valuemax":100,"aria-label":e},v("i",{style:`width:${i}%`})),Ny=i=>{mt.live.textContent="",setTimeout(()=>{mt.live.textContent=i},30)},tn=null;if(hc())try{tn=Sp(mt.world,{modules:ci,reduced:Xn,onPick:i=>{nt.play("snap"),or(i.type==="module"?`#/m/${i.mi}`:`#/m/${i.mi}/s/${i.si}`)},onHover:(i,e)=>{if(!i){mt.tip.hidden=!0;return}if(e&&!e.clientX)return;let t=jt.active(),n=t?oi(t.id):()=>null;if(i.type==="module"){let s=hr(i.mi),r=hi(s,n);mt.tip.replaceChildren(v("b",null,`${s.icon} Module ${s.id}`),v("span",null,s.title),v("small",null,`${r.pct} % \xB7 ${rn(r.best)}/${r.max} pts`))}else{let s=Ni(i.mi,i.si),r=Oi(s,n);mt.tip.replaceChildren(v("b",null,`S\xE9ance ${s.index}`),v("span",null,s.title),v("small",null,`${Ly[r.status]} \xB7 ${rn(r.best)}/20`))}e&&(mt.tip.style.left=e.clientX+16+"px",mt.tip.style.top=e.clientY+16+"px"),mt.tip.hidden=!1}})}catch(i){console.error(i),tn=null}tn||(mt.world.replaceChildren(v("div",{class:"no3d"},v("h1",null,"La 3D n\u2019est pas disponible"),v("p",null,"Ce navigateur ou cet ordinateur ne prend pas en charge WebGL. Tu peux utiliser toutes les activit\xE9s dans le mode classique, ou continuer ici avec la carte."),v("a",{class:"btn primary",href:"index.html#/dash"},"Ouvrir le mode classique"))),document.body.classList.add("no-webgl"));function Ip(){let i=jt.active();if(!tn||!i)return;let e=oi(i.id),t={};for(let n of ci){let s=hi(n,e);t[n.id]={pct:s.pct,sessions:Object.fromEntries(n.sessions.map(r=>[r.index,Oi(r,e).status]))}}tn.setProgress(t)}function Pp(i,e){let t=[v("a",{href:"#/"},"\u{1F3DD} Place centrale")];e.mi&&t.push(v("span",{"aria-hidden":"true"},"\u203A"),v("a",{href:`#/m/${e.mi}`},`Module ${e.mi}`)),e.si&&t.push(v("span",{"aria-hidden":"true"},"\u203A"),v("a",{href:`#/m/${e.mi}/s/${e.si}`},`S\xE9ance ${e.si}`)),e.ai&&t.push(v("span",{"aria-hidden":"true"},"\u203A"),v("span",{"aria-current":"page"},`Activit\xE9 ${e.ai}`));let n=null;if(i){let a=hi(fh,oi(i.id));n=v("span",{class:"hud-chip",title:"Points (meilleurs essais)"},"\u2B50 ",v("b",null,rn(a.best)),` / ${vc}`)}let s=i?v("button",{type:"button",class:"hud-btn","aria-pressed":String(i.preferences.soundEnabled),title:i.preferences.soundEnabled?"Couper les sons":"Activer les sons",onclick:()=>{jt.updateProfile(i.id,{preferences:{soundEnabled:!i.preferences.soundEnabled}}),ch(jt.active()),hs()}},i.preferences.soundEnabled?"\u{1F50A}":"\u{1F507}"):null,r=i?v("button",{type:"button",class:"hud-btn","aria-pressed":String(!!i.preferences.reducedMotion),title:"R\xE9duire les animations",onclick:()=>{jt.updateProfile(i.id,{preferences:{reducedMotion:!i.preferences.reducedMotion}}),ch(jt.active()),hs()}},i.preferences.reducedMotion?"\u23F8":"\u2728"):null;mt.hud.replaceChildren(v("div",{class:"hud-in"},v("a",{class:"hud-brand",href:"#/"},v("span",{class:"logo","aria-hidden":"true"},"\u{1F3AE}"),v("span",null,"InfoPlay ",v("b",null,"Immersif"))),v("nav",{class:"hud-crumbs","aria-label":"Fil d\u2019Ariane"},t),v("div",{class:"hud-right"},n,s,r,i?v("button",{type:"button",class:"hud-chip as-btn",title:"Changer d\u2019\xE9l\xE8ve",onclick:()=>{jt.logout(),hs()}},"\u{1F464} ",i.displayName):null,v("a",{class:"hud-btn wide",href:"index.html",title:"Revenir \xE0 la premi\xE8re page"},"\u21E6 Accueil"))))}function Fy(){let i=jt.active();if(mt.gate.hidden=!!i,i){mt.gate.replaceChildren();return}let e=v("input",{type:"text",id:"gname",maxlength:"24",required:!0,autocomplete:"off",placeholder:"Ton pr\xE9nom ou ton pseudo"}),t=v("p",{class:"hint-line",role:"alert"}),n=v("form",{onsubmit:r=>{r.preventDefault();try{jt.createProfile(e.value),nt.play("success"),hs()}catch(a){t.textContent=a.message}}},v("label",{class:"f",for:"gname"},"Comment t\u2019appelles-tu ?"),v("div",{class:"row"},e,v("button",{class:"btn primary",type:"submit"},"Entrer dans le monde \u2192")),t),s=jt.profiles();mt.gate.replaceChildren(v("div",{class:"gate-card glass",role:"dialog","aria-modal":"true","aria-labelledby":"gate-h"},v("p",{class:"eyebrow"},"Mode immersif 3D"),v("h1",{id:"gate-h",tabindex:"-1"},"Bienvenue dans le monde InfoPlay"),v("p",{class:"muted"},"Explore les 4 \xEEles de l\u2019informatique, traverse les portails des s\xE9ances et rel\xE8ve les d\xE9fis. Ta progression est la m\xEAme que dans le mode classique."),v("p",{class:"ar-lead",lang:"ar",dir:"rtl"},"\u0627\u0633\u062A\u0643\u0634\u0641 \u062C\u0632\u0631 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u064A\u0627\u062A \u0627\u0644\u0623\u0631\u0628\u0639 \u0648\u0627\u062F\u062E\u0644 \u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u062D\u0635\u0635"),s.length?v("div",null,v("h2",null,"Qui joue ?"),v("div",{class:"gate-profiles"},s.map(r=>{let a=hi(fh,oi(r.id));return v("button",{type:"button",class:"profile-btn",onclick:()=>{jt.setActive(r.id),nt.play("snap"),hs()}},v("b",null,r.displayName),v("span",{class:"pill"},`${rn(a.best)} / ${vc} pts`))})),v("p",{class:"or"},"ou cr\xE9e un nouveau profil")):null,n,v("p",{class:"notice"},"Pas de mot de passe : n\u2019\xE9cris ni ton nom complet, ni ton adresse, ni ton t\xE9l\xE9phone. Les r\xE9sultats restent dans ce navigateur."))),setTimeout(()=>(s.length?mt.gate.querySelector(".profile-btn"):e)?.focus(),30)}function Oy(i){let e=oi(i.id),t=hi(fh,e),n=ur.find(s=>!e(s.id)?.attempts.length);return[v("p",{class:"eyebrow"},"Place centrale"),v("h1",{tabindex:"-1"},`Salam ${i.displayName} \u{1F44B}`),v("p",{class:"muted"},"Fais glisser pour tourner autour du monde, fais rouler la molette pour zoomer, clique sur une \xEEle pour y voyager."),v("div",{class:"panel-stats"},v("div",null,v("b",null,`${t.pct} %`),v("span",null,"progression")),v("div",null,v("b",null,`${t.done}/${t.n}`),v("span",null,"activit\xE9s")),v("div",null,v("b",null,`${t.sessionsDone}/30`),v("span",null,"s\xE9ances"))),n?v("a",{class:"btn primary block",href:`#/m/${n.moduleId}/s/${n.sessionIndex}/a/${n.index}`},`\u25B6 Continuer : ${n.title}`):v("p",{class:"pill done"},"\u{1F3C6} Tout est termin\xE9 !"),v("h2",null,"Les 4 \xEEles"),v("div",{class:"island-list"},ci.map(s=>{let r=hi(s,e);return v("a",{class:"island-btn",href:`#/m/${s.id}`,style:`--c:${us[s.id]}`},v("span",{class:"em","aria-hidden":"true"},s.icon),v("span",null,v("b",null,`Module ${s.id} \u2014 ${s.short||s.title}`),lr(_c(s.id)),Rp(r.pct,`Module ${s.id} : ${r.pct} %`)),v("span",{class:"pct"},`${r.pct} %`))}))]}function By(i,e){let t=hr(e),n=oi(i.id),s=hi(t,n),r=o=>{let l=Oi(o,n);return v("a",{class:"portal-btn "+l.status,href:`#/m/${e}/s/${o.index}`},v("span",{class:"n"},l.status==="done"?"\u2713":o.index),v("span",null,v("b",null,o.title),lr(yc(o.id))),v("span",{class:"sc"},`${rn(l.best)}/20`))},a=t.groups?t.groups.flatMap(o=>[v("h3",{class:"group-h"},o.label),...o.sessions.map(l=>r(t.sessions[l-1]))]):t.sessions.map(r);return[v("p",{class:"eyebrow",style:`color:${us[e]}`},`\xCEle ${t.id}`),v("h1",{tabindex:"-1"},`${t.icon} ${t.title}`,lr(_c(t.id))),v("p",{class:"muted"},`${t.sessions.length} portails \xB7 ${rn(s.best)} / ${s.max} points`),Rp(s.pct,`Module ${t.id} : ${s.pct} %`),v("p",{class:"muted small"},"Chaque portail est une s\xE9ance. Couleur : bleu = \xE0 faire, or = en cours, vert = termin\xE9e."),t.languageNote?v("p",{class:"notice"},t.languageNote):null,v("div",{class:"portal-list"},a)]}function ky(i,e,t){let n=Ni(e,t),s=oi(i.id),r=Oi(n,s),a=n.acts.find(o=>!s(o.id)?.attempts.length)||n.acts[0];return[v("p",{class:"eyebrow",style:`color:${us[e]}`},`Module ${e} \xB7 Portail ${t}`),v("h1",{tabindex:"-1"},n.title,lr(yc(n.id))),v("p",{class:"muted"},v("b",null,"Notions : "),n.topics.join(", "),"."),v("div",{class:"act-cards"},n.acts.map(o=>{let l=s(o.id),c=l?.attempts.length?Math.max(...l.attempts.map(u=>u.score)):null;return v("a",{class:"act-card"+(c!=null?" done":""),href:`#/m/${e}/s/${t}/a/${o.index}`},v("span",{class:"ico","aria-hidden":"true"},dh[o.type]),v("span",null,v("small",null,`${o.index}. ${Cp[o.type]}`),v("b",null,o.title),lr(bc(o.id))),v("span",{class:"sc"},c!=null?`${rn(c)}/5`:`~${o.estimatedMinutes} min`))})),v("div",{class:"row"},v("a",{class:"btn primary",href:`#/m/${e}/s/${t}/a/${a.index}`},r.done?"\u25B6 Continuer":"\u25B6 Entrer dans le portail"),r.done?v("a",{class:"btn",href:`#/m/${e}/s/${t}/bilan`},"Bilan"):null),v("p",null,v("a",{href:`#/m/${e}`},"\u2190 Retour \xE0 l\u2019\xEEle"))]}function zy(i,e,t){let n=Ni(e,t),s=oi(i.id),r=Oi(n,s),a=fd(r.best),o=n.acts.filter(c=>{let u=s(c.id);return!u?.attempts.length||Math.max(...u.attempts.map(h=>h.score))<3}),l=Ni(e,t+1);return[v("p",{class:"eyebrow"},`Bilan \xB7 S\xE9ance ${t}`),v("h1",{tabindex:"-1"},n.title),v("div",{class:"panel-stats"},v("div",null,v("b",null,`${rn(r.best)}/20`),v("span",null,"meilleurs")),v("div",null,v("b",null,`${rn(r.first)}/20`),v("span",null,"premiers essais")),v("div",null,v("b",null,a.label),v("span",null,"niveau"))),v("div",{class:"act-cards"},n.acts.map(c=>{let u=s(c.id)?.attempts||[];return v("a",{class:"act-card"+(u.length?" done":""),href:`#/m/${e}/s/${t}/a/${c.index}`},v("span",{class:"ico","aria-hidden":"true"},dh[c.type]),v("span",null,v("b",null,c.title),v("small",null,`Essais : ${u.length}`)),v("span",{class:"sc"},u.length?`${rn(Math.max(...u.map(h=>h.score)))}/5`:"\u2014"))})),v("h2",null,o.length?"\xC0 revoir":"Bravo !"),o.length?v("ul",null,o.map(c=>v("li",null,v("a",{href:`#/m/${e}/s/${t}/a/${c.index}`},c.title)))):v("p",null,"Toutes les activit\xE9s sont ma\xEEtris\xE9es (au moins 3/5)."),v("div",{class:"row"},l?v("a",{class:"btn primary",href:`#/m/${e}/s/${t+1}`},"Portail suivant \u2192"):v("a",{class:"btn primary",href:`#/m/${e}`},"Retour \xE0 l\u2019\xEEle"))]}var gn=null;function uh(){gn&&gn.dispose&&gn.dispose(),gn=null,mt.holo.hidden=!0,mt.holo.replaceChildren(),document.body.classList.remove("holo-open")}function Hy(i,e,t,n){let s=Bh(`m${e}-s${t}-a${n}`);if(!s){or(`#/m/${e}/s/${t}`);return}uh();let r=oi(i.id),a=Ni(e,t),o=v("div",{class:`stage-card activity-${s.id}`}),l=v("div",{"aria-live":"polite"}),c=v("div",{class:"hintbox",hidden:!0},"\u{1F4A1} "+s.hint),u=!1,h=v("button",{type:"button",class:"btn primary",onclick:p},"\u2714 V\xE9rifier"),g=v("button",{type:"button",class:"btn ghost","aria-expanded":"false",onclick:()=>{c.hidden=!c.hidden,c.hidden||nt.play("hint"),g.setAttribute("aria-expanded",String(!c.hidden))}},"\u{1F4A1} Indice"),m=s.type==="robot"?Tp:Tc(s.mech);function x(){gn&&gn.dispose&&gn.dispose(),o.replaceChildren(),o.inert=!1,l.replaceChildren(),u=!1,h.disabled=!1,gn=m(o,s.data),window.__ip&&(window.__ip.eng=gn)}async function p(){if(u||!gn)return;let _=gn.check();if(_.incomplete){Dy(_.incomplete);return}if(_.unanswered>0&&!await Uy(`Il reste ${_.unanswered} r\xE9ponse(s) vide(s). V\xE9rifier quand m\xEAme ?`,"V\xE9rifier")||u)return;u=!0,h.disabled=!0;let w=dd(_.correct,_.total),C=jt.recordAttempt(i.id,s.id,w,s.version);gn.reveal&&gn.reveal(_),o.inert=!0,d(w,_,C),Ip(),Pp(jt.active(),{mi:e,si:t,ai:n})}function d(_,w,C){let L=r(s.id).attempts,T=L[0].score,M=Math.max(...L.map(Y=>Y.score)),y=_/5;nt.play(y>=.6?y===1?"complete":"success":"error"),y===1&&bh(),y>=.6&&tn&&tn.burst(y===1);let P=y===1?"Parfait ! \u{1F389}":y>=.8?"Tr\xE8s bien !":y>=.6?"Bien, tu y es presque.":y>=.4?"Pas mal, relis les explications.":"Courage : lis les explications puis r\xE9essaie.",O=y===1?"\u0645\u0645\u062A\u0627\u0632! \u0625\u062C\u0627\u0628\u0629 \u0643\u0627\u0645\u0644\u0629 \u0648\u0645\u062A\u0642\u0646\u0629 \u{1F389}":y>=.8?"\u0623\u062D\u0633\u0646\u062A \u062C\u062F\u0627\u064B! \u0623\u062F\u0627\u0621 \u0645\u062A\u0645\u064A\u0632 \u{1F44D}":y>=.6?"\u062C\u064A\u062F\u060C \u0627\u0642\u062A\u0631\u0628\u062A \u0645\u0646 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u062A\u0627\u0645\u0629 \u2728":y>=.4?"\u0644\u0627 \u0628\u0623\u0633\u060C \u0631\u0627\u062C\u0639 \u0627\u0644\u0634\u0631\u0648\u062D\u0627\u062A \u0648\u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u{1F504}":"\u0627\u0642\u0631\u0623 \u0627\u0644\u0634\u0631\u062D \u062C\u064A\u062F\u0627\u064B \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B \u{1F4AA}",G=Array.from({length:5},(Y,J)=>v("span",{class:"star"+(J<Math.round(_)?" filled":""),"aria-hidden":"true"},"\u2605")),j=n<4?`#/m/${e}/s/${t}/a/${n+1}`:`#/m/${e}/s/${t}/bilan`;l.replaceChildren(v("section",{class:"result"+(y===1?" perfect":""),"aria-label":"R\xE9sultat"},v("div",{class:"top"},v("div",{class:"score-box"},v("div",{class:"score"},rn(_),v("small",null," / 5")),v("div",{class:"star-rating",role:"img","aria-label":`${_} \xE9toiles sur 5`},...G)),v("div",null,v("h2",{style:"margin:0"},P),v("p",{class:"result-ar-msg",lang:"ar",dir:"rtl"},O),v("p",{class:"muted",style:"margin:0"},C===1?"Premier essai enregistr\xE9.":`Essai n\xB0 ${C} \xB7 premier essai : ${rn(T)}/5 \xB7 meilleur : ${rn(M)}/5`))),v("ul",{class:"fblist"},w.items.map(Y=>v("li",{class:Y.info?"info":Y.ok?"ok":"ko"},v("span",{class:"ic","aria-hidden":"true"},Y.info?"\u2139":Y.ok?"\u2714":"\u2716"),v("span",null,v("span",{class:"vh"},Y.info?"Information : ":Y.ok?"Correct : ":"\xC0 revoir : "),Y.msg)))),v("div",{class:"row"},v("button",{type:"button",class:"btn",onclick:()=>{x(),b.scrollTo({top:0})}},"\u21BB R\xE9essayer"),v("a",{class:"btn primary",href:j},n<4?"Activit\xE9 suivante \u2192":"Voir le bilan \u2192")))),l.firstChild.scrollIntoView({block:"nearest"})}let f=v("nav",{class:"dots","aria-label":"Activit\xE9s de la s\xE9ance"},a.acts.map(_=>v("a",{href:`#/m/${e}/s/${t}/a/${_.index}`,class:(_.index===n?"cur ":"")+(r(_.id)?.attempts.length?"done":""),"aria-label":`Activit\xE9 ${_.index} : ${_.title}`,"aria-current":_.index===n?"step":null},_.index))),b=v("div",{class:"holo-body"},v("div",{class:"holo-head"},v("div",null,v("p",{class:"eyebrow",style:`color:${us[e]}`},`${dh[s.type]} ${Cp[s.type]} \xB7 Module ${e} \xB7 S\xE9ance ${t}`),v("h1",{tabindex:"-1",id:"holo-h"},s.title,lr(bc(s.id)))),f),v("p",{class:"muted",style:"margin:.2rem 0"},v("b",null,"Objectif : "),s.objective,` \xB7 environ ${s.estimatedMinutes} min \xB7 note sur 5`),v("div",{class:"instr activity-brief"},v("b",null,"Consigne : "),s.instructions,v("p",{class:"activity-ar-instruction",lang:"ar",dir:"rtl"},zh(s.type))),c,o,v("div",{class:"row activity-actions"},h,g),l),S=v("div",{class:"holo-frame",role:"dialog","aria-modal":"true","aria-labelledby":"holo-h",style:`--c:${us[e]}`},v("button",{type:"button",class:"holo-close","aria-label":"Fermer l\u2019activit\xE9 et revenir au portail",onclick:()=>or(`#/m/${e}/s/${t}`)},"\u2715"),b);mt.holo.replaceChildren(S),mt.holo.hidden=!1,document.body.classList.add("holo-open"),x()}function Lp(){let i=location.hash.replace(/^#\/?/,"").split("/").filter(Boolean),e={};return i[0]==="m"&&hr(i[1])&&(e.mi=+i[1],i[2]==="s"&&Ni(e.mi,i[3])&&(e.si=+i[3],i[4]==="a"&&/^[1-4]$/.test(i[5]||"")?e.ai=+i[5]:i[4]==="bilan"&&(e.bilan=!0))),e}var Ap="";function hs(){let i=jt.active();ch(i);let e=Lp();Pp(i,e),Fy(),document.body.classList.toggle("gated",!i);let t=[e.mi,e.si,e.ai,e.bilan].join("/");if(tn&&t!==Ap&&(e.ai?tn.focusActivity(e.mi,e.si):e.si?tn.focusSession(e.mi,e.si):e.mi?tn.focusModule(e.mi):tn.focusHub()),Ap=t,Ip(),!i){uh(),mt.panel.hidden=!0,hh();return}mt.panel.hidden=!1;let n=e.si?e.bilan?zy(i,e.mi,e.si):ky(i,e.mi,e.si):e.mi?By(i,e.mi):Oy(i);if(mt.panel.replaceChildren(v("div",{class:"panel-in glass"},n)),mt.panel.scrollTop=0,e.ai)Hy(i,e.mi,e.si,e.ai),setTimeout(()=>mt.holo.querySelector("h1")?.focus({preventScroll:!0}),50);else{uh();let r=mt.panel.querySelector("h1");r&&r.focus({preventScroll:!0})}hh();let s=e.ai?`Activit\xE9 ${e.ai} de la s\xE9ance ${e.si}`:e.si?`Portail de la s\xE9ance ${e.si}, module ${e.mi}`:e.mi?`\xCEle du module ${e.mi}`:"Place centrale";Ny(s)}function hh(){if(!tn)return;let i=!mt.panel.hidden&&!document.body.classList.contains("holo-open")&&!document.body.classList.contains("gated")&&window.innerWidth>760;tn.setInset(i?Math.round(mt.panel.getBoundingClientRect().width+16):0)}window.addEventListener("resize",hh);window.addEventListener("hashchange",hs);document.addEventListener("keydown",i=>{if(i.key!=="Escape"||document.querySelector(".modal-bg"))return;let e=Lp();e.ai||e.bilan?or(`#/m/${e.mi}/s/${e.si}`):e.si?or(`#/m/${e.mi}`):e.mi&&or("#/")});Gh(document);/[?&]test=1/.test(location.search)&&(window.__ip={store:jt,CATALOG:ci,ACTIVITIES:ur,engineOf:Tc,world:tn});hs();requestAnimationFrame(()=>{let i=document.querySelector(".loader");i&&(i.classList.add("gone"),setTimeout(()=>i.remove(),700))});})();
