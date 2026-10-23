// Tests the real application logic with Three.js math and a small DOM/render adapter.
// Run: node test-controls.mjs. Browser rendering is checked separately.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from './vendor/three.module.js';
import { posts } from './posts.js';

const elements = new Map();
class Element {
  constructor(id='') {
    this.id=id; this.handlers={}; this.style={}; this.attributes={};
    this.hidden=false; this.open=false; this.tagName='BUTTON'; this.textContent='';
    const classes=new Set();
    this.classList={add:x=>classes.add(x),remove:x=>classes.delete(x),
      toggle:(x,on)=>on?classes.add(x):classes.delete(x),contains:x=>classes.has(x)};
  }
  addEventListener(type,fn){(this.handlers[type]??=[]).push(fn);}
  emit(type,event={}){for(const fn of this.handlers[type]||[])fn({target:this,...event});}
  setAttribute(k,v){this.attributes[k]=String(v);}
  focus(){document.activeElement=this;}
  click(){this.onclick?.({target:this});}
  showModal(){this.open=true;}
  close(){this.open=false;this.emit('close');}
  getBoundingClientRect(){return {left:0,top:0,width:900,height:650};}
  set innerHTML(value){this.html=value;}
  get innerHTML(){return this.html||'';}
  insertAdjacentHTML(_,value){this.html=(this.html||'')+value;}
  replaceChildren(){this.html='';}
  querySelector(selector){const el=get(selector);if(selector==='.resume-native'&&!el.initialized){el.hidden=true;el.initialized=true;}return el;}
}
function get(id){if(!elements.has(id))elements.set(id,new Element(id));return elements.get(id);}
const document=new Element();
document.body=new Element();document.hidden=false;document.activeElement=new Element();
document.getElementById=get;document.exitPointerLock=()=>{document.pointerLockElement=null;document.emit('pointerlockchange');};
let nextFrame=0,time=0;const frames=new Map();
class Renderer{
  constructor(){this.capabilities={getMaxAnisotropy:()=>4};this.info={render:{calls:0,triangles:0}};}
  setPixelRatio(v){this.ratio=v;}getPixelRatio(){return this.ratio;}
  setSize(){}render(scene,camera){scene.updateMatrixWorld();camera.updateMatrixWorld();}
}
class OrbitControls{
  constructor(camera){this.camera=camera;this.target=new THREE.Vector3();this.enabled=true;}
  addEventListener(){}update(){this.camera.lookAt(this.target);this.camera.updateMatrixWorld();}
}
class GLTFLoader{load(){}}
const window=new Element();
const context=vm.createContext({
  THREE:{...THREE,WebGLRenderer:Renderer},OrbitControls,GLTFLoader,posts,
  document,window,console,Intl,Date,Math,Set,devicePixelRatio:1,
  matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},
  performance:{now:()=>time},setInterval:()=>0,
  requestAnimationFrame:fn=>{frames.set(++nextFrame,fn);return nextFrame;},
  cancelAnimationFrame:id=>frames.delete(id)
});
const source=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8').replace(/^import .*;\r?$/gm,'');
vm.runInContext(source,context);
const run=code=>vm.runInContext(code,context);
function tick(n=1){for(let i=0;i<n;i++){time+=16;const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn(time));}}
function key(key,type='keydown'){document.emit(type,{key,preventDefault(){}});}
const position=()=>Array.from(run('camera.position.toArray()'));
const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);

run('setImmersive(true)');tick();
assert.equal(run('walking()'),false,'In 3D model, Orbit must be active by default');
assert.equal(run('controls.enabled'),true);
assert.equal(get('orbit-mode').attributes['aria-pressed'],'true');
assert.equal(get('walk-mode').attributes['aria-pressed'],'false');
get('walk-mode').click();tick();
assert.equal(run('walking()'),true,'Walk must be selectable');
assert.equal(run('controls.enabled'),false);
assert.equal(get('walk-mode').attributes['aria-pressed'],'true');
assert.equal(get('orbit-mode').attributes['aria-pressed'],'false');
const spawn=position();
key('w');tick(20);key('w','keyup');
assert.ok(position()[2]<spawn[2]-.3,'W should move forward at eye level');near(position()[1],1.62);
run('resetWalk()');key('ArrowUp');tick(20);key('ArrowUp','keyup');
const arrow=position();
run('resetWalk()');key('w');tick(20);key('w','keyup');
near(position()[2],arrow[2],.03);
run('resetWalk()');key('d');tick(10);key('d','keyup');assert.ok(position()[0]>spawn[0]);
run('resetWalk()');key('s');tick(10);key('s','keyup');assert.ok(position()[2]>spawn[2]);
run('resetWalk()');key('a');tick(10);key('a','keyup');assert.ok(position()[0]<spawn[0]);

run('resetWalk(); yaw=Math.PI/2');key('w');tick(10);key('w','keyup');assert.ok(position()[0]<spawn[0],'Movement follows mouse-look heading');
run('resetWalk()');document.pointerLockElement=get('scene');const beforeYaw=run('yaw');
document.emit('mousemove',{movementX:40,movementY:10});assert.ok(run('yaw')<beforeYaw);
run("openSection('resume')");tick();assert.equal(document.pointerLockElement,null);
assert.equal(get('details').open,true);assert.equal(get('details').classList.contains('resume-dialog'),true);
assert.match(get('detail-body').innerHTML,/Sadiq_Ali_Resume_2026\.pdf/);
assert.match(get('detail-body').innerHTML,/page-1\.webp/);
const stopped=position();key('w');tick(20);assert.deepEqual(position(),stopped,'Resume must pause movement');
get('resume-view-toggle').click();assert.equal(get('.resume-native').hidden,false);
get('resume-view-toggle').click();assert.equal(get('.resume-native').hidden,true);
run('closePanel()');assert.equal(get('details').open,false);assert.equal(run('keys.size'),0);
run("setNavigation('orbit')");tick();assert.equal(run('controls.enabled'),true);
run("setNavigation('walk')");tick();assert.equal(run('controls.enabled'),false);
run('setImmersive(false)');tick();assert.equal(run('walking()'),false);
assert.equal(document.body.classList.contains('immersive'),false);
assert.equal(run('names.ResumeFolder'),'resume');assert.equal(run('names.WorkBag'),'journey');
run("openSection('writes')");assert.match(get('detail-body').innerHTML,/data-post=/);
assert.ok(!get('detail-body').innerHTML.includes(posts[0].paragraphs[0]),'Writes starts with a list, not the full article');
run(`openPost('${posts[0].id}')`);
assert.match(get('detail-body').innerHTML,/All Writes/);
assert.match(get('detail-body').innerHTML,/understanding why we are creating it in the first place/);
run("openSection('projects')");
assert.match(get('detail-body').innerHTML,/https:\/\/kaasukanukku-olive\.vercel\.app\/KaasuKanukku\.apk/);
assert.match(get('detail-body').innerHTML,/https:\/\/kaasukanukku-olive\.vercel\.app\/app\//);
assert.match(get('detail-body').innerHTML,/>APK ↗<\/a>/);
assert.match(get('detail-body').innerHTML,/>PWA ↗<\/a>/);
run("closePanel(); setImmersive(true); setNavigation('walk'); resetWalk()");key('w');document.emit('visibilitychange');
assert.equal(run('keys.size'),0);
assert.equal(run('canStand(-2.5,0)'),false);assert.equal(run('canStand(0,2.1)'),false);
run('obstacles.push(new THREE.Box3(new THREE.Vector3(-1,0,-1),new THREE.Vector3(1,1,0)))');
assert.equal(run('canStand(0,-.5)'),false);
assert.equal(run('canStand(1.5,1)'),true);
console.log('PASS: Orbit active by default in 3D model, Walk selectable, WASD/arrows, relative walking, eye height, mouse look, modal pause, resume views, mode switches, file mapping, Writes, bounds, obstacles.');
