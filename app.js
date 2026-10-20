import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { posts } from './posts.js';

const $ = (id) => document.getElementById(id);
const dialog = $('details');
const resumeUrl = './public/resume/Sadiq_Ali_Resume_2026.pdf';
const content = {
  projects: { title: 'Built for the real world.', label: '01 / SELECTED WORK', intro: 'Commercial platforms, client experiences, and applications. A selection from my full-stack and mobile work.', items: [
    ['E-COMMERCE / WEB', 'JerseyVerse', 'Sportswear commerce with product discovery, payment integration, and a secure checkout experience.', 'Next.js · React · Express.js · E-commerce', 'https://jerseyverse.co.in/'],
    ['BUSINESS PLATFORM / WEB', 'New Crescent Builders', 'A construction business platform with project showcases, quotation requests, and client enquiries.', 'React · Node.js · Business workflows', 'https://newcrescentbuilders.com/'],
    ['ARCHITECTURE / WEB', 'Ismail Architects', 'An architectural portfolio presenting project galleries and spatial design work.', 'React · Tailwind CSS · Responsive design', 'https://ismailarc.com/'],
    ['MOBILE / FAMILY DATA', 'Mifamily', 'A multi-generational family platform for lineage trees, relationship history, and generational archives.', 'React Native · Next.js · Express.js'],
    ['CREATIVE DEVELOPMENT / WEB', 'Zian Architects', 'An architectural showcase exploring spatial presentation and interactive 3D elements.', 'Next.js · Tailwind CSS · 3D visualization', 'https://zianarchitects.com/'],
    ['AGENCY / WEB', 'Zainova Technology Solution', 'An agency website featuring motion, service presentation, and lead enquiry workflows.', 'Next.js · Motion · Interface development', 'https://zainovatech.com/'],
    ['MOBILE / FOR FOUNDERS', 'Kaasukanukku', 'A life and a business. An expense tracker built specifically for founders to track personal and business expenses.', 'React Native · SQLite']
  ]},
  journey: { title: 'Always building forward.', label: '02 / THE JOURNEY', intro: 'From freelance projects to delivering client software and immersive web experiences.', items: [
    ['FEB 2026 — PRESENT', 'Software Associate · Zainova', 'End-to-end client software, web and mobile architecture, platform performance, Tier-2 technical support, and stakeholder coordination.'],
    ['AUG 2025 — FEB 2026', 'Web Developer · Robovision', 'Interactive 3D web applications, WebGL components, and responsive frontend experiences.'],
    ['AUG 2024 — JUL 2025', 'Freelance Web Developer', 'Full-stack commercial applications using React, Next.js, and Node.js, with a focus on usability and performance.'],
    ['JUN — JUL 2024', 'Frontend Intern · Edunet Foundation', 'Responsive components and interactive interfaces using JavaScript frameworks.']
  ]},
  certifications: { title: 'Certification', label: '03 / CERTIFICATION', intro: 'Learning that supports the things I build. The frames in the room are visual labels rather than reproductions of official certificates.', items: [
    ['IBM / 2024', 'Artificial Intelligence & Machine Learning', 'Foundations for understanding and building intelligent applications.'],
    ['GOOGLE / 2024', 'Python Programming Fundamentals', 'Python foundations for tools, automation, and applications.'],
    ['NPTEL / 2023', 'Database Management Systems', 'Relational data modelling and database fundamentals.'],
    ['NPTEL / 2023', 'Joy of Computing using Python', 'Programming and problem solving with Python.'],
    ['NPTEL / 2025', 'English for Competitive Examination', 'Continued learning in communication and language.']
  ]},
  experiments: { title: 'External Work', label: '04 / EXTERNAL WORK', intro: 'Client websites, mobile products, and ideas explored through code.', items: [
    ['AGENCY / WEB', 'Zainova Technology Solution', 'An agency website featuring motion, service presentation, and lead enquiry workflows.', 'Next.js · Motion · Interface development', 'https://zainovatech.com/'],
    ['ARCHITECTURE / WEB', 'Zian Architects', 'An architectural showcase exploring spatial presentation and interactive 3D elements.', 'Next.js · Tailwind CSS · 3D visualization', 'https://zianarchitects.com/'],
    ['MOBILE / FOR FOUNDERS', 'Kaasukanukku', 'A life and a business. An expense tracker built specifically for founders to track personal and business expenses.', 'React Native · SQLite'],
    ['THREE.JS / WEBGL', 'Solar System 3D', 'An interactive exploration of planets and spatial orbits.', 'Three.js · JavaScript', 'https://github.com/ASSA2004/3DSolarSystem'],
    ['GAME DEVELOPMENT', 'MazMagic 2D/3D', 'Maze generation and navigation, with 2D and 3D visualization.', 'Processing · Algorithms', 'https://github.com/ASSA2004/MazMagic2D'],
    ['PYTHON / PYGAME', 'MemoryBox', 'A memory sequence game with grid patterns and progressive difficulty.', 'Python · Pygame', 'https://github.com/ASSA2004/Mem_box_game'],
    ['INTERACTIVE WEB', 'Earlier 3D portfolio', 'An earlier exploration of immersive presentation and camera animation.', 'Three.js · WebGL', 'https://github.com/ASSA2004/PERSONAL-PORTFOLIO']
  ]},
  automation: { title: 'Make the repetitive simple.', label: 'NOTEBOOK / TOOLS & AUTOMATION', intro: 'Python applications and experiments for practical workflows.', items: [
    ['DESKTOP TOOL', 'Folder Scrapper', 'A Kivy desktop application for directory scraping and folder management.', 'Python · Kivy', 'https://github.com/ASSA2004/Scrapper'],
    ['MACHINE LEARNING', 'JobFit', 'A resume relevance matching application with a Flask backend.', 'Python · Flask · ML', 'https://github.com/ASSA2004/RES_TO_FIN'],
    ['LANGUAGE TOOL', 'Translator', 'A Streamlit translation application with voice recognition and speech translation.', 'Python · Streamlit', 'https://github.com/ASSA2004/Streamlit_Translator']
  ]},
  mobile: { title: 'Products that go with you.', label: 'PHONE / MOBILE DEVELOPMENT', intro: 'Cross-platform mobile applications with React Native.', items: [
    ['FOR FOUNDERS / EXPENSE TRACKING', 'Kaasukanukku', 'A life and a business. An expense tracker built specifically for founders to track personal and business expenses.', 'React Native · SQLite'],
    ['FAMILY & RELATIONSHIPS', 'Mifamily', 'A family data management platform for exploring multi-generational lineage and relational history.', 'React Native · Express.js · Data visualization']
  ]},
  education: { title: 'Where it began.', label: 'FRAME / EDUCATION', intro: 'A foundation in computer science and a habit of learning by building.', items: [['2022 — 2026', 'B.Tech · Computer Science Engineering', 'BSA Crescent Institute of Science & Technology. Software engineering, algorithms, full-stack development, and system design.'], ['2020 — 2022', 'Higher Secondary Certificate', 'Imam Shafi Higher Secondary School. Physics, chemistry, mathematics, and computer science.']]},
  about: { title: 'Hi, I’m Sadiq.', label: 'DESK / ABOUT ME', intro: 'A product developer based in Chennai, building full-stack web platforms, mobile apps, and interactive experiences.', items: [['PRODUCT DEVELOPMENT', 'From an idea to something useful.', 'I work with React, Next.js, React Native, Node.js, and Python. My portfolio spans commercial websites, e-commerce, automation, and creative 3D web development.'], ['HOW I WORK', 'Curiosity meets practical engineering.', 'I care about clear interfaces, dependable architecture, performance, and communicating with the people who use a product.']]},
  achievements: { title: 'Progress, one build at a time.', label: 'MEDAL / MILESTONES', intro: 'This medal is a studio symbol for learning and shipping. It is not presented as a competition award.', items: [['MILESTONE', 'Commercial products in use', 'Client projects across commerce, construction, architecture, and agency services.'], ['MILESTONE', 'A growing range of craft', 'Web platforms, mobile apps, Python tools, and interactive 3D experiences.']]},
  contact: { title: 'Let’s make something.', label: '05 / SAY HELLO', intro: 'Have a product idea, a project, or an opportunity? I’d love to hear about it.' },
  writes: { title: 'Writes', label: '06 / WRITES', intro: 'Notes on building, learning, and exploring.' },
  resume: { title: 'My resume', label: 'FILE STACK / RESUME', intro: 'Sadiq Ali · 2026' }
};
const names = { Laptop:'projects', Phone:'mobile', ResumeFolder:'resume', WorkBag:'journey', CertificateFrames:'certifications', EducationFrame:'education', Medal:'achievements', SolarSystem:'experiments', Notebook:'automation', ContactCard:'contact', Nameplate:'about', Desk:'about', DeskLamp:'theme' };
const titles = {projects:'Laptop / Selected work',mobile:'Phone / Mobile apps',journey:'My professional journey',certifications:'Frames / Certifications',education:'Education',achievements:'Milestones',experiments:'Solar system / External work',automation:'Notebook / Automation',contact:'Business card / Say hello',about:'Meet Sadiq',theme:'Lamp / Change the mood',resume:'File stack / My resume'};
let focusBefore;
const escapeText = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const readingTime = post => Math.max(1,Math.ceil(post.paragraphs.join(' ').split(/\s+/).length/220));
const postDate = post => post.publishedAt?`<time datetime="${escapeText(post.publishedAt)}">${new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(post.publishedAt+'T12:00:00Z'))}</time> · `:'';
function postParagraph(post,paragraph){
  let html=escapeText(paragraph);
  const phrases=Array.isArray(post.emphasis)?post.emphasis:(post.emphasis?[post.emphasis]:[]);
  for(const phrase of phrases)html=html.replace(escapeText(phrase),`<strong>${escapeText(phrase)}</strong>`);
  return `<p>${html}</p>`;
}
function writesList(){
  if(!posts.length)return '<div class="empty-state"><h3>No posts yet.</h3><p>New writing will appear here.</p></div>';
  const ordered=[...posts].sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));
  return `<div class="post-list">${ordered.map(post=>`<article class="post-card"><p class="post-meta">${postDate(post)}${escapeText(post.author)} · ${readingTime(post)} min read</p><h3><button class="post-title" data-post="${escapeText(post.id)}">${escapeText(post.title)} <span aria-hidden="true">↗</span></button></h3><p>${escapeText(post.excerpt)}</p></article>`).join('')}</div>`;
}
function openPost(id){
  const post=posts.find(item=>item.id===id);if(!post)return;
  openSection('writes',false);
  $('detail-body').innerHTML=`<button class="text-button back-writes" data-section="writes">← All Writes</button><article class="post-reader"><p class="post-meta">${postDate(post)}${escapeText(post.author)} · ${readingTime(post)} min read</p><h2 id="detail-title" tabindex="-1">${escapeText(post.title)}</h2>${post.paragraphs.map((paragraph,index)=>`${post.headingsBefore?.[index]?`<h3>${escapeText(post.headingsBefore[index])}</h3>`:''}${postParagraph(post,paragraph)}`).join('')}</article>`;
  $('detail-title').focus();
}
function entry(item) {
  const [label,title,description,tags,url] = item;
  return `<article class="entry"><small>${label}</small><h3>${title}</h3><p>${description}</p>${tags?`<div class="tags">${tags}</div>`:''}${url?`<a href="${url}" target="_blank" rel="noopener noreferrer">${url.includes('github.com')?'View source':'Visit website'} ↗</a>`:''}</article>`;
}
function openSection(key, move=true) {
  if (!content[key]) return;
  keys.clear();
  tween=null;
  if(controls)controls.enabled=false;
  if(document.pointerLockElement===canvas)document.exitPointerLock();
  if (move && !walking()) focusObject(key);
  const data = content[key];
  dialog.classList.toggle('resume-dialog',key==='resume');
  $('detail-number').textContent=data.label;
  $('detail-body').innerHTML=`<h2 id="detail-title">${data.title}</h2><p class="lead">${data.intro}</p>${(data.items||[]).map(entry).join('')}${key==='contact'?'<div class="contact-links"><a href="mailto:sadiqilaqidas@gmail.com">Email ↗</a><a href="https://www.linkedin.com/in/sadiq-ali-309215246" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/ASSA2004" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://wa.me/919791622030" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div><p class="notice">Based in Chennai, Tamil Nadu, India.</p>':''}`;
  if(key==='writes')$('detail-body').insertAdjacentHTML('beforeend',writesList());
  if(key==='resume'){
    $('detail-body').insertAdjacentHTML('beforeend',`<div class="resume-actions"><a href="${resumeUrl}" download="Sadiq_Ali_Resume_2026.pdf">Download PDF ↓</a><a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">Open separately ↗</a><button type="button" id="resume-view-toggle" aria-pressed="false">PDF viewer</button></div><div class="resume-page"><img src="./public/resume/page-1.webp" width="1072" height="1516" alt="Preview of Sadiq Ali’s 2026 resume. Use the PDF viewer or open separately for selectable text and links."></div><div class="resume-native" hidden></div><p class="notice">Page 1 of 1 · Original document. If the PDF viewer stays blank, use Page preview or Open separately.</p>`);
    const toggle=document.getElementById('resume-view-toggle');
    toggle.onclick=()=>{
      const native=dialog.querySelector('.resume-native'),show=native.hidden;
      native.hidden=!show;dialog.querySelector('.resume-page').hidden=show;
      toggle.textContent=show?'Page preview':'PDF viewer';toggle.setAttribute('aria-pressed',String(show));
      native.innerHTML=show?`<object data="${resumeUrl}#view=FitH" type="application/pdf" aria-label="Sadiq Ali resume PDF"><p>Your browser cannot embed PDFs. <a href="${resumeUrl}" target="_blank" rel="noopener noreferrer">Open the resume</a> or use Page preview.</p></object>`:'';
    };
  }
  if(!dialog.open){focusBefore=document.activeElement;dialog.showModal();}
  dialog.scrollTop=0;
}
document.addEventListener('click',e=>{
  const post=e.target.closest('[data-post]');if(post){openPost(post.dataset.post);return;}
  const b=e.target.closest('[data-section]');if(b){openSection(b.dataset.section);if(b.classList.contains('back-writes')){const heading=$('detail-title');heading.setAttribute('tabindex','-1');heading.focus();}}
});
function closePanel(){dialog.close();focusBefore?.focus();}
$('close').onclick=closePanel;$('back-room').onclick=closePanel;
dialog.addEventListener('click',e=>{if(e.target===dialog && e.clientX<dialog.getBoundingClientRect().left)closePanel();});
dialog.addEventListener('close',()=>{keys.clear();if(controls)controls.enabled=!walking();dialog.classList.remove('resume-dialog');$('detail-body').replaceChildren();focusBefore?.focus();invalidate();});
$('standard').onclick=()=>{
  focusBefore=document.activeElement;keys.clear();
  tween=null;if(controls)controls.enabled=false;
  if(document.pointerLockElement===canvas)document.exitPointerLock();
  dialog.classList.remove('resume-dialog');
  $('detail-number').textContent='THE PORTFOLIO INDEX';
  $('detail-body').innerHTML='<h2 id="detail-title">Take your own path.</h2><p class="lead">Everything in the room, in a simple index.</p><div class="index-grid">'+Object.entries(content).map(([key,data])=>`<button data-section="${key}">${data.label.split(' / ').pop()} ↗</button>`).join('')+'</div>';
  dialog.showModal();
};
function clock(){ $('clock').textContent=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' IST'; }clock();setInterval(clock,60000);

const canvas=$('scene');
const keys=new Set();
let renderer, controls, camera, room, raf=0, previous=0, tween, quality=false, night=false, hovered;
let immersive=false, navigation='orbit', yaw=0, pitch=0, capturedClick=false;
const obstacles=[];
function walking(){return immersive&&navigation==='walk';}
function walkPose(){camera.rotation.set(pitch,yaw,0,'YXZ');}
function resetWalk(){camera.position.set(.9,1.62,1.75);yaw=.20;pitch=-.08;walkPose();}
function setNavigation(mode){
  if(!camera)return;
  keys.clear();tween=null;navigation=mode;
  if(document.pointerLockElement===canvas)document.exitPointerLock();
  controls.enabled=!walking();camera.fov=walking()?70:36;camera.updateProjectionMatrix();
  if(walking())resetWalk();else{camera.position.copy(home);controls.target.copy(homeTarget);controls.update();}
  $('walk-mode').setAttribute('aria-pressed',String(mode==='walk'));
  $('orbit-mode').setAttribute('aria-pressed',String(mode==='orbit'));
  $('crosshair').hidden=!walking();$('capture-mouse').hidden=!walking();
  $('game-help').textContent=walking()?'WASD / ↑↓←→ move · Mouse look\nClick / E interact · Esc release':'Drag orbit · Scroll zoom\nClick objects to explore';
  $('aim-label').textContent='';resize();invalidate();
  $('scene-status').textContent=walking()?'Walk mode · eye level':'Drag to explore';
  canvas.setAttribute('aria-label',walking()?'Walking view: WASD or arrows to move, mouse look, E to interact. Escape releases mouse.':'Orbit view: drag to rotate, scroll to zoom, click objects for portfolio details.');
}
function setImmersive(value){
  immersive=value;document.body.classList.toggle('immersive',value);$('game-hud').hidden=!value;
  setNavigation(value?'walk':'orbit');
}
$('enter-room').onclick=()=>setImmersive(true);$('exit-room').onclick=()=>setImmersive(false);
$('walk-mode').onclick=()=>setNavigation('walk');$('orbit-mode').onclick=()=>setNavigation('orbit');
$('game-index').onclick=()=>$('standard').click();
function captureMouse(){
  if(!walking()||dialog.open)return;
  if(!canvas.requestPointerLock){mouseFallback();return;}
  try{const request=canvas.requestPointerLock();request?.catch(mouseFallback);}catch{mouseFallback();}
}
function mouseFallback(){$('game-help').textContent='WASD / ↑↓←→ move · Drag look\nClick / E interact';}
$('capture-mouse').onclick=captureMouse;
document.addEventListener('pointerlockchange',()=>{keys.clear();$('capture-mouse').hidden=!walking()||document.pointerLockElement===canvas;invalidate();});
document.addEventListener('pointerlockerror',mouseFallback);
function interact(section){
  if(section==='theme'){night=!night;scene.background.set(night?'#263a36':'#eeeae2');scene.getObjectByName('hemisphere').intensity=night?1.3:2.6;invalidate();}
  else if(section)openSection(section);
}
function centrePick(){if(!room)return null;camera.updateMatrixWorld();raycaster.setFromCamera(new THREE.Vector2(0,0),camera);const hit=raycaster.intersectObject(room,true)[0];return hit&&hit.distance<4?getSection(hit.object):null;}
function canStand(x,z){return x>=-2.35&&x<=2.35&&z>=-1.92&&z<=1.98&&!obstacles.some(b=>x>b.min.x-.18&&x<b.max.x+.18&&z>b.min.z-.18&&z<b.max.z+.18);}
document.addEventListener('mousemove',e=>{if(!walking()||dialog.open)return;if(document.pointerLockElement===canvas){yaw-=e.movementX*.002;pitch=THREE.MathUtils.clamp(pitch-e.movementY*.002,-1.35,1.35);walkPose();invalidate();}});
const scene=new THREE.Scene();
const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();
const home=new THREE.Vector3(7,6.5,9);const homeTarget=new THREE.Vector3(0,1,-.15);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const up=new THREE.Vector3(0,1,0);const forward=new THREE.Vector3();const right=new THREE.Vector3();const delta=new THREE.Vector3();
const tmpCenter=new THREE.Vector3();const bounds=new THREE.Box3();
const initialScale=matchMedia('(max-width: 700px)').matches?1:1.4;

function invalidate(){if(renderer&&!raf&&!document.hidden)raf=requestAnimationFrame(frame);}
function frame(time){
  raf=0;const dt=Math.min((time-previous)/1000||0,.05);previous=time;
  let active=false;
  if(walking()){
    if(keys.size&&!dialog.open){
      forward.set(-Math.sin(yaw),0,-Math.cos(yaw));right.set(Math.cos(yaw),0,-Math.sin(yaw));delta.set(0,0,0);
      if(keys.has('w')||keys.has('arrowup'))delta.add(forward);
      if(keys.has('s')||keys.has('arrowdown'))delta.sub(forward);
      if(keys.has('d')||keys.has('arrowright'))delta.add(right);
      if(keys.has('a')||keys.has('arrowleft'))delta.sub(right);
      delta.normalize().multiplyScalar(dt*1.6);
      if(canStand(camera.position.x+delta.x,camera.position.z))camera.position.x+=delta.x;
      if(canStand(camera.position.x,camera.position.z+delta.z))camera.position.z+=delta.z;
      camera.position.y=1.62;active=true;
    }
    const aimed=centrePick();$('aim-label').textContent=aimed?titles[aimed]+' · Click / E':'';
    renderer.render(scene,camera);if(active)invalidate();return;
  }
  if(keys.size&&!dialog.open){
    forward.subVectors(controls.target,camera.position);forward.y=0;forward.normalize();right.crossVectors(forward,up).normalize();delta.set(0,0,0);
    if(keys.has('w')||keys.has('arrowup'))delta.add(forward);
    if(keys.has('s')||keys.has('arrowdown'))delta.sub(forward);
    if(keys.has('d')||keys.has('arrowright'))delta.add(right);
    if(keys.has('a')||keys.has('arrowleft'))delta.sub(right);
    delta.normalize().multiplyScalar(dt*2.3);
    const nx=THREE.MathUtils.clamp(controls.target.x+delta.x,-2.3,2.3),nz=THREE.MathUtils.clamp(controls.target.z+delta.z,-2,2);
    delta.set(nx-controls.target.x,0,nz-controls.target.z);camera.position.add(delta);controls.target.add(delta);active=true;tween=null;
  }
  if(tween){
    const t=reduced.matches?1:Math.min((time-tween.start)/650,1),ease=1-Math.pow(1-t,3);
    camera.position.lerpVectors(tween.from,tween.to,ease);controls.target.lerpVectors(tween.targetFrom,tween.targetTo,ease);
    if(t===1)tween=null;else active=true;
  }
  controls.update();renderer.render(scene,camera);
  if(active)invalidate();
}
function goTo(position,target){if(!controls)return;tween={from:camera.position.clone(),to:position.clone(),targetFrom:controls.target.clone(),targetTo:target.clone(),start:performance.now()};invalidate();}
function focusObject(section){
  if(!room)return;
  const name=Object.keys(names).find(n=>names[n]===section),obj=room.getObjectByName(name);if(!obj)return;
  bounds.setFromObject(obj);bounds.getCenter(tmpCenter);tmpCenter.y=Math.max(.65,tmpCenter.y);
  goTo(tmpCenter.clone().add(new THREE.Vector3(3.5,3,5)),tmpCenter);
}
$('reset').onclick=()=>{if(walking()){resetWalk();invalidate();}else goTo(home,homeTarget);};
$('quality').onclick=()=>{quality=!quality;renderer?.setPixelRatio(quality?Math.min(devicePixelRatio,1.8):Math.min(devicePixelRatio,initialScale));$('quality').textContent=quality?'High quality':'Eco quality';invalidate();};
function getSection(obj){while(obj&&obj!==scene){if(names[obj.name])return names[obj.name];obj=obj.parent;}return null;}
function pick(e){if(!room||!camera)return null;camera.updateMatrixWorld();const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObject(room,true)[0];return hit?getSection(hit.object):null;}
let down;
canvas.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};capturedClick=document.pointerLockElement===canvas;canvas.focus({preventScroll:true});tween=null;});
canvas.addEventListener('pointermove',e=>{hovered=pick(e);canvas.style.cursor=hovered?'pointer':'grab';const tip=$('tooltip');if(hovered&&e.pointerType!=='touch'){const r=canvas.getBoundingClientRect();tip.textContent=titles[hovered];tip.style.display='block';tip.style.left=Math.min(e.clientX-r.left+12,r.width-180)+'px';tip.style.top=Math.max(40,e.clientY-r.top-35)+'px';}else tip.style.display='none';});
canvas.addEventListener('pointerleave',()=>{$('tooltip').style.display='none';});
canvas.addEventListener('pointermove',e=>{if(walking()&&document.pointerLockElement!==canvas&&down&&(e.buttons===1||e.pointerType==='touch')){yaw-=e.movementX*.004;pitch=THREE.MathUtils.clamp(pitch-e.movementY*.004,-1.35,1.35);walkPose();invalidate();}});
canvas.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){down=null;return;}down=null;if(walking()&&capturedClick){interact(centrePick());return;}const section=pick(e);if(section)interact(section);else if(walking())captureMouse();});
document.addEventListener('keydown',e=>{
  if(dialog.open||e.ctrlKey||e.metaKey||e.altKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
  const key=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(key)){e.preventDefault();keys.add(key);invalidate();}
  if(key==='e'&&walking()&&!e.repeat)interact(centrePick());
  if(key==='r')$('reset').click();
});
document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>keys.clear());
document.addEventListener('visibilitychange',()=>{keys.clear();if(document.hidden){cancelAnimationFrame(raf);raf=0;}else{previous=performance.now();invalidate();}});
function resize(){if(!renderer)return;const r=canvas.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();invalidate();}
try{
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,initialScale));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
  scene.background=new THREE.Color('#eeeae2');camera=new THREE.PerspectiveCamera(36,1,.1,70);camera.position.copy(home);
  controls=new OrbitControls(camera,canvas);controls.target.copy(homeTarget);controls.enableDamping=false;controls.enablePan=true;controls.minDistance=3;controls.maxDistance=17;controls.maxPolarAngle=Math.PI*.48;controls.minPolarAngle=.18;controls.minAzimuthAngle=-.05;controls.maxAzimuthAngle=Math.PI*.51;controls.addEventListener('change',invalidate);controls.addEventListener('start',()=>{tween=null;});
  const hemi=new THREE.HemisphereLight(0xfff5df,0x6d817c,2.6);hemi.name='hemisphere';scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xffe7cb,3.2);sun.position.set(3,8,5);scene.add(sun);
  const fill=new THREE.DirectionalLight(0xd6ebff,1.3);fill.position.set(-3,4,3);scene.add(fill);
  const ground=new THREE.Mesh(new THREE.CircleGeometry(4.1,64),new THREE.MeshBasicMaterial({color:0xd9d9c9}));ground.rotation.x=-Math.PI/2;ground.position.y=-.27;scene.add(ground);
  new ResizeObserver(resize).observe(canvas);resize();
  new GLTFLoader().load('./public/models/studio.glb',gltf=>{
    room=gltf.scene;scene.add(room);room.updateMatrixWorld(true);
    for(const name of ['Desk','Chair','WorkBag','Plant','SolarSystem']){const obj=room.getObjectByName(name);if(obj)obstacles.push(new THREE.Box3().setFromObject(obj));}
    room.traverse(obj=>{if(obj.isMesh){obj.frustumCulled=true;const mats=Array.isArray(obj.material)?obj.material:[obj.material];for(const mat of mats){if(mat.map)mat.map.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());}}});
    $('loader').classList.add('hidden');$('scene-status').textContent='Drag to explore';invalidate();
    window.portfolioDiagnostics=()=>({loaded:true,mode:immersive?navigation:'portfolio',mouseCaptured:document.pointerLockElement===canvas,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,section:dialog.open?$('detail-number').textContent:null,camera:camera.position.toArray(),target:controls.target.toArray(),pixelRatio:renderer.getPixelRatio()});
  },event=>{if(event.total){const pct=Math.round(event.loaded/event.total*100);$('progress').value=pct;$('load-label').textContent=pct===100?'Arranging the room…':`Unpacking the studio… ${pct}%`;}},()=>{ $('load-label').textContent='The room could not load. The portfolio index is still available.';$('scene-status').textContent='Portfolio available';});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();keys.clear();$('loader').classList.remove('hidden');$('load-label').textContent='3D paused. Reload to restore, or browse the portfolio below.';});
}catch(error){$('load-label').textContent='3D is unavailable on this device. Browse the portfolio instead.';$('scene-status').textContent='Standard view available';console.warn('3D initialization unavailable:',error.message);}
