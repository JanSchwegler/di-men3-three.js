import"./modulepreload-polyfill-B5Qt9EMX.js";import{R as Mt,V as l,C as vt,Q as X,d as ft,O as it,M as ot,L as Et,e as g,B as u,b as at,F as rt,a as s,f as V,c as z,g as It,T as q,h as Ht,D as Qt,E as Xt,S as At,W as Yt,A as Zt,G as Tt,P as zt}from"./three.module-DxaTYix-.js";import{S as Ct,O as Dt}from"./OrbitControls-DoAQgh4R.js";import{g as Rt}from"./lil-gui.module.min-Bc0DeA9g.js";const R=new Mt,m=new l,C=new l,d=new X,lt={X:new l(1,0,0),Y:new l(0,1,0),Z:new l(0,0,1)},et={type:"change"},ct={type:"mouseDown",mode:null},ht={type:"mouseUp",mode:null},pt={type:"objectChange"};class Lt extends vt{constructor(n,e=null){super(void 0,e);const o=new Gt(this);this._root=o;const i=new Ft;this._gizmo=i,o.add(i);const c=new Bt;this._plane=c,o.add(c);const t=this;function a(h,P){let Z=P;Object.defineProperty(t,h,{get:function(){return Z!==void 0?Z:P},set:function(D){Z!==D&&(Z=D,c[h]=D,i[h]=D,t.dispatchEvent({type:h+"-changed",value:D}),t.dispatchEvent(et))}}),t[h]=P,c[h]=P,i[h]=P}a("camera",n),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0);const f=new l,H=new l,A=new X,w=new X,_=new l,b=new X,Y=new l,v=new l,E=new l,x=0,S=new l;a("worldPosition",f),a("worldPositionStart",H),a("worldQuaternion",A),a("worldQuaternionStart",w),a("cameraPosition",_),a("cameraQuaternion",b),a("pointStart",Y),a("pointEnd",v),a("rotationAxis",E),a("rotationAngle",x),a("eye",S),this._offset=new l,this._startNorm=new l,this._endNorm=new l,this._cameraScale=new l,this._parentPosition=new l,this._parentQuaternion=new X,this._parentQuaternionInv=new X,this._parentScale=new l,this._worldScaleStart=new l,this._worldQuaternionInv=new X,this._worldScale=new l,this._positionStart=new l,this._quaternionStart=new X,this._scaleStart=new l,this._getPointer=jt.bind(this),this._onPointerDown=Ot.bind(this),this._onPointerHover=qt.bind(this),this._onPointerMove=kt.bind(this),this._onPointerUp=Wt.bind(this),e!==null&&this.connect()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(n){if(this.object===void 0||this.dragging===!0)return;n!==null&&R.setFromCamera(n,this.camera);const e=nt(this._gizmo.picker[this.mode],R);e?this.axis=e.object.name:this.axis=null}pointerDown(n){if(!(this.object===void 0||this.dragging===!0||n!=null&&n.button!==0)&&this.axis!==null){n!==null&&R.setFromCamera(n,this.camera);const e=nt(this._plane,R,!0);e&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(e.point).sub(this.worldPositionStart)),this.dragging=!0,ct.mode=this.mode,this.dispatchEvent(ct)}}pointerMove(n){const e=this.axis,o=this.mode,i=this.object;let c=this.space;if(o==="scale"?c="local":(e==="E"||e==="XYZE"||e==="XYZ")&&(c="world"),i===void 0||e===null||this.dragging===!1||n!==null&&n.button!==-1)return;n!==null&&R.setFromCamera(n,this.camera);const t=nt(this._plane,R,!0);if(t){if(this.pointEnd.copy(t.point).sub(this.worldPositionStart),o==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),c==="local"&&e!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),e.indexOf("X")===-1&&(this._offset.x=0),e.indexOf("Y")===-1&&(this._offset.y=0),e.indexOf("Z")===-1&&(this._offset.z=0),c==="local"&&e!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),i.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(c==="local"&&(i.position.applyQuaternion(d.copy(this._quaternionStart).invert()),e.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(this._quaternionStart)),c==="world"&&(i.parent&&i.position.add(m.setFromMatrixPosition(i.parent.matrixWorld)),e.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(m.setFromMatrixPosition(i.parent.matrixWorld))));else if(o==="scale"){if(e.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),C.set(a,a,a)}else m.copy(this.pointStart),C.copy(this.pointEnd),m.applyQuaternion(this._worldQuaternionInv),C.applyQuaternion(this._worldQuaternionInv),C.divide(m),e.search("X")===-1&&(C.x=1),e.search("Y")===-1&&(C.y=1),e.search("Z")===-1&&(C.z=1);i.scale.copy(this._scaleStart).multiply(C),this.scaleSnap&&(e.search("X")!==-1&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Y")!==-1&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Z")!==-1&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(o==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(m.setFromMatrixPosition(this.camera.matrixWorld));let f=!1;e==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(m.copy(this.rotationAxis).cross(this.eye))*a):(e==="X"||e==="Y"||e==="Z")&&(this.rotationAxis.copy(lt[e]),m.copy(lt[e]),c==="local"&&m.applyQuaternion(this.worldQuaternion),m.cross(this.eye),m.length()===0?f=!0:this.rotationAngle=this._offset.dot(m.normalize())*a),(e==="E"||f)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),c==="local"&&e!=="E"&&e!=="XYZE"?(i.quaternion.copy(this._quaternionStart),i.quaternion.multiply(d.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),i.quaternion.copy(d.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),i.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(et),this.dispatchEvent(pt)}}pointerUp(n){n!==null&&n.button!==0||(this.dragging&&this.axis!==null&&(ht.mode=this.mode,this.dispatchEvent(ht)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this.traverse(function(n){n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()})}attach(n){return this.object=n,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(et),this.dispatchEvent(pt),this.pointStart.copy(this.pointEnd))}getRaycaster(){return R}getMode(){return this.mode}setMode(n){this.mode=n}setTranslationSnap(n){this.translationSnap=n}setRotationSnap(n){this.rotationSnap=n}setScaleSnap(n){this.scaleSnap=n}setSize(n){this.size=n}setSpace(n){this.space=n}}function jt(r){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:r.button};{const n=this.domElement.getBoundingClientRect();return{x:(r.clientX-n.left)/n.width*2-1,y:-(r.clientY-n.top)/n.height*2+1,button:r.button}}}function qt(r){if(this.enabled)switch(r.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(r));break}}function Ot(r){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(r)),this.pointerDown(this._getPointer(r)))}function kt(r){this.enabled&&this.pointerMove(this._getPointer(r))}function Wt(r){this.enabled&&(this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(r)))}function nt(r,n,e){const o=n.intersectObject(r,!0);for(let i=0;i<o.length;i++)if(o[i].object.visible||e)return o[i];return!1}const K=new Xt,p=new l(0,1,0),dt=new l(0,0,0),ut=new ft,J=new X,tt=new X,Q=new l,mt=new ft,W=new l(1,0,0),L=new l(0,1,0),G=new l(0,0,1),$=new l,O=new l,k=new l;class Gt extends it{constructor(n){super(),this.isTransformControlsRoot=!0,this.controls=n,this.visible=!1}updateMatrixWorld(n){const e=this.controls;e.object!==void 0&&(e.object.updateMatrixWorld(),e.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):e.object.parent.matrixWorld.decompose(e._parentPosition,e._parentQuaternion,e._parentScale),e.object.matrixWorld.decompose(e.worldPosition,e.worldQuaternion,e._worldScale),e._parentQuaternionInv.copy(e._parentQuaternion).invert(),e._worldQuaternionInv.copy(e.worldQuaternion).invert()),e.camera.updateMatrixWorld(),e.camera.matrixWorld.decompose(e.cameraPosition,e.cameraQuaternion,e._cameraScale),e.camera.isOrthographicCamera?e.camera.getWorldDirection(e.eye).negate():e.eye.copy(e.cameraPosition).sub(e.worldPosition).normalize(),super.updateMatrixWorld(n)}}class Ft extends it{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const n=new ot({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),e=new Et({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),o=n.clone();o.opacity=.15;const i=e.clone();i.opacity=.5;const c=n.clone();c.color.setHex(16711680);const t=n.clone();t.color.setHex(65280);const a=n.clone();a.color.setHex(255);const f=n.clone();f.color.setHex(16711680),f.opacity=.5;const H=n.clone();H.color.setHex(65280),H.opacity=.5;const A=n.clone();A.color.setHex(255),A.opacity=.5;const w=n.clone();w.opacity=.25;const _=n.clone();_.color.setHex(16776960),_.opacity=.25,n.clone().color.setHex(16776960);const Y=n.clone();Y.color.setHex(7895160);const v=new g(0,.04,.1,12);v.translate(0,.05,0);const E=new u(.08,.08,.08);E.translate(0,.04,0);const x=new at;x.setAttribute("position",new rt([0,0,0,1,0,0],3));const S=new g(.0075,.0075,.5,3);S.translate(0,.25,0);function h(M,F){const I=new q(M,.0075,3,64,F*Math.PI*2);return I.rotateY(Math.PI/2),I.rotateX(Math.PI/2),I}function P(){const M=new at;return M.setAttribute("position",new rt([0,0,0,1,1,1],3)),M}const Z={X:[[new s(v,c),[.5,0,0],[0,0,-Math.PI/2]],[new s(v,c),[-.5,0,0],[0,0,Math.PI/2]],[new s(S,c),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new s(v,t),[0,.5,0]],[new s(v,t),[0,-.5,0],[Math.PI,0,0]],[new s(S,t)]],Z:[[new s(v,a),[0,0,.5],[Math.PI/2,0,0]],[new s(v,a),[0,0,-.5],[-Math.PI/2,0,0]],[new s(S,a),null,[Math.PI/2,0,0]]],XYZ:[[new s(new V(.1,0),w.clone()),[0,0,0]]],XY:[[new s(new u(.15,.15,.01),A.clone()),[.15,.15,0]]],YZ:[[new s(new u(.15,.15,.01),f.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new s(new u(.15,.15,.01),H.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},D={X:[[new s(new g(.2,0,.6,4),o),[.3,0,0],[0,0,-Math.PI/2]],[new s(new g(.2,0,.6,4),o),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new s(new g(.2,0,.6,4),o),[0,.3,0]],[new s(new g(.2,0,.6,4),o),[0,-.3,0],[0,0,Math.PI]]],Z:[[new s(new g(.2,0,.6,4),o),[0,0,.3],[Math.PI/2,0,0]],[new s(new g(.2,0,.6,4),o),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new s(new V(.2,0),o)]],XY:[[new s(new u(.2,.2,.01),o),[.15,.15,0]]],YZ:[[new s(new u(.2,.2,.01),o),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new s(new u(.2,.2,.01),o),[.15,0,.15],[-Math.PI/2,0,0]]]},wt={START:[[new s(new V(.01,2),i),null,null,null,"helper"]],END:[[new s(new V(.01,2),i),null,null,null,"helper"]],DELTA:[[new z(P(),i),null,null,null,"helper"]],X:[[new z(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new z(x,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new z(x,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},yt={XYZE:[[new s(h(.5,1),Y),null,[0,Math.PI/2,0]]],X:[[new s(h(.5,.5),c)]],Y:[[new s(h(.5,.5),t),null,[0,0,-Math.PI/2]]],Z:[[new s(h(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new s(h(.75,1),_),null,[0,Math.PI/2,0]]]},gt={AXIS:[[new z(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},bt={XYZE:[[new s(new It(.25,10,8),o)]],X:[[new s(new q(.5,.1,4,24),o),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new s(new q(.5,.1,4,24),o),[0,0,0],[Math.PI/2,0,0]]],Z:[[new s(new q(.5,.1,4,24),o),[0,0,0],[0,0,-Math.PI/2]]],E:[[new s(new q(.75,.1,2,24),o)]]},_t={X:[[new s(E,c),[.5,0,0],[0,0,-Math.PI/2]],[new s(S,c),[0,0,0],[0,0,-Math.PI/2]],[new s(E,c),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new s(E,t),[0,.5,0]],[new s(S,t)],[new s(E,t),[0,-.5,0],[0,0,Math.PI]]],Z:[[new s(E,a),[0,0,.5],[Math.PI/2,0,0]],[new s(S,a),[0,0,0],[Math.PI/2,0,0]],[new s(E,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new s(new u(.15,.15,.01),A),[.15,.15,0]]],YZ:[[new s(new u(.15,.15,.01),f),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new s(new u(.15,.15,.01),H),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new s(new u(.1,.1,.1),w.clone())]]},xt={X:[[new s(new g(.2,0,.6,4),o),[.3,0,0],[0,0,-Math.PI/2]],[new s(new g(.2,0,.6,4),o),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new s(new g(.2,0,.6,4),o),[0,.3,0]],[new s(new g(.2,0,.6,4),o),[0,-.3,0],[0,0,Math.PI]]],Z:[[new s(new g(.2,0,.6,4),o),[0,0,.3],[Math.PI/2,0,0]],[new s(new g(.2,0,.6,4),o),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new s(new u(.2,.2,.01),o),[.15,.15,0]]],YZ:[[new s(new u(.2,.2,.01),o),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new s(new u(.2,.2,.01),o),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new s(new u(.2,.2,.2),o),[0,0,0]]]},St={X:[[new z(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new z(x,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new z(x,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function T(M){const F=new it;for(const I in M)for(let j=M[I].length;j--;){const y=M[I][j][0].clone(),B=M[I][j][1],U=M[I][j][2],N=M[I][j][3],Pt=M[I][j][4];y.name=I,y.tag=Pt,B&&y.position.set(B[0],B[1],B[2]),U&&y.rotation.set(U[0],U[1],U[2]),N&&y.scale.set(N[0],N[1],N[2]),y.updateMatrix();const st=y.geometry.clone();st.applyMatrix4(y.matrix),y.geometry=st,y.renderOrder=1/0,y.position.set(0,0,0),y.rotation.set(0,0,0),y.scale.set(1,1,1),F.add(y)}return F}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=T(Z)),this.add(this.gizmo.rotate=T(yt)),this.add(this.gizmo.scale=T(_t)),this.add(this.picker.translate=T(D)),this.add(this.picker.rotate=T(bt)),this.add(this.picker.scale=T(xt)),this.add(this.helper.translate=T(wt)),this.add(this.helper.rotate=T(gt)),this.add(this.helper.scale=T(St)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(n){const o=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:tt;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let i=[];i=i.concat(this.picker[this.mode].children),i=i.concat(this.gizmo[this.mode].children),i=i.concat(this.helper[this.mode].children);for(let c=0;c<i.length;c++){const t=i[c];t.visible=!0,t.rotation.set(0,0,0),t.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),t.scale.set(1,1,1).multiplyScalar(a*this.size/4),t.tag==="helper"){t.visible=!1,t.name==="AXIS"?(t.visible=!!this.axis,this.axis==="X"&&(d.setFromEuler(K.set(0,0,0)),t.quaternion.copy(o).multiply(d),Math.abs(p.copy(W).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="Y"&&(d.setFromEuler(K.set(0,0,Math.PI/2)),t.quaternion.copy(o).multiply(d),Math.abs(p.copy(L).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="Z"&&(d.setFromEuler(K.set(0,Math.PI/2,0)),t.quaternion.copy(o).multiply(d),Math.abs(p.copy(G).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="XYZE"&&(d.setFromEuler(K.set(0,Math.PI/2,0)),p.copy(this.rotationAxis),t.quaternion.setFromRotationMatrix(ut.lookAt(dt,p,L)),t.quaternion.multiply(d),t.visible=this.dragging),this.axis==="E"&&(t.visible=!1)):t.name==="START"?(t.position.copy(this.worldPositionStart),t.visible=this.dragging):t.name==="END"?(t.position.copy(this.worldPosition),t.visible=this.dragging):t.name==="DELTA"?(t.position.copy(this.worldPositionStart),t.quaternion.copy(this.worldQuaternionStart),m.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),m.applyQuaternion(this.worldQuaternionStart.clone().invert()),t.scale.copy(m),t.visible=this.dragging):(t.quaternion.copy(o),this.dragging?t.position.copy(this.worldPositionStart):t.position.copy(this.worldPosition),this.axis&&(t.visible=this.axis.search(t.name)!==-1));continue}t.quaternion.copy(o),this.mode==="translate"||this.mode==="scale"?(t.name==="X"&&Math.abs(p.copy(W).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="Y"&&Math.abs(p.copy(L).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="Z"&&Math.abs(p.copy(G).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="XY"&&Math.abs(p.copy(G).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="YZ"&&Math.abs(p.copy(W).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="XZ"&&Math.abs(p.copy(L).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1)):this.mode==="rotate"&&(J.copy(o),p.copy(this.eye).applyQuaternion(d.copy(o).invert()),t.name.search("E")!==-1&&t.quaternion.setFromRotationMatrix(ut.lookAt(this.eye,dt,L)),t.name==="X"&&(d.setFromAxisAngle(W,Math.atan2(-p.y,p.z)),d.multiplyQuaternions(J,d),t.quaternion.copy(d)),t.name==="Y"&&(d.setFromAxisAngle(L,Math.atan2(p.x,p.z)),d.multiplyQuaternions(J,d),t.quaternion.copy(d)),t.name==="Z"&&(d.setFromAxisAngle(G,Math.atan2(p.y,p.x)),d.multiplyQuaternions(J,d),t.quaternion.copy(d))),t.visible=t.visible&&(t.name.indexOf("X")===-1||this.showX),t.visible=t.visible&&(t.name.indexOf("Y")===-1||this.showY),t.visible=t.visible&&(t.name.indexOf("Z")===-1||this.showZ),t.visible=t.visible&&(t.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),t.material._color=t.material._color||t.material.color.clone(),t.material._opacity=t.material._opacity||t.material.opacity,t.material.color.copy(t.material._color),t.material.opacity=t.material._opacity,this.enabled&&this.axis&&(t.name===this.axis||this.axis.split("").some(function(f){return t.name===f}))&&(t.material.color.setHex(16776960),t.material.opacity=1)}super.updateMatrixWorld(n)}}class Bt extends s{constructor(){super(new Ht(1e5,1e5,2,2),new ot({visible:!1,wireframe:!0,side:Qt,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(n){let e=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(e="local"),$.copy(W).applyQuaternion(e==="local"?this.worldQuaternion:tt),O.copy(L).applyQuaternion(e==="local"?this.worldQuaternion:tt),k.copy(G).applyQuaternion(e==="local"?this.worldQuaternion:tt),p.copy(O),this.mode){case"translate":case"scale":switch(this.axis){case"X":p.copy(this.eye).cross($),Q.copy($).cross(p);break;case"Y":p.copy(this.eye).cross(O),Q.copy(O).cross(p);break;case"Z":p.copy(this.eye).cross(k),Q.copy(k).cross(p);break;case"XY":Q.copy(k);break;case"YZ":Q.copy($);break;case"XZ":p.copy(k),Q.copy(O);break;case"XYZ":case"E":Q.set(0,0,0);break}break;case"rotate":default:Q.set(0,0,0)}Q.length()===0?this.quaternion.copy(this.cameraQuaternion):(mt.lookAt(m.set(0,0,0),Q,p),this.quaternion.setFromRotationMatrix(mt)),super.updateMatrixWorld(n)}}function Ut(){const r=document.querySelector("#canvas");if(!r){console.error("Canvas element not found.");return}const n=new At,e=new Yt({antialias:!0,canvas:r}),o=v(),i=E();n.add(i);let c;c=new Ct,document.body.appendChild(c.dom);const t=new Dt(o,e.domElement);t.listenToKeyEvents(window),t.enableDamping=!0,t.maxDistance=100,t.minDistance=1;const a=new Lt(o,e.domElement);a.addEventListener("dragging-changed",function(h){t.enabled=!h.value});const f=a.getHelper(),H=new Zt(5),A=new Tt(10,10,8947848,4473924),w=new Rt,_=document.createElement("div");_.style.fontSize="12px",_.style.padding="12px 4px",_.style.color="#ebebeb",_.style.lineHeight="1.3",_.innerHTML=`
        <strong>Controls:</strong><br>
        Orbit: Left Mouse Button<br>
        Zoom: Right Mouse Button<br>
        Pan: Right Mouse Button
    `,w.domElement.querySelector(".children").appendChild(_);const b={transformMode:"translate",space:"world",gizmoVisible:!0,axesHelper:!1,gridHelper:!0,centerCube(){t.target.set(0,0,0)},resetCube(){i.position.set(0,0,0),i.rotation.set(0,0,0),i.scale.set(1,1,1)}};w.add(b,"transformMode",["translate","rotate","scale"]).name("Transform Mode").onChange(h=>{a.setMode(h)}),w.add(b,"space",["world","local"]).name("Space").onChange(h=>{a.setSpace(h)}),w.add(b,"gizmoVisible").name("Show Gizmo").onChange(Y),w.add(b,"axesHelper").name("Show Axes").onChange(Y),w.add(b,"gridHelper").name("Show Grid").onChange(Y),w.add(b,"centerCube").name("Reset Pan"),w.add(b,"resetCube").name("Reset Cube Transform");function Y(){b.axesHelper?n.add(H):n.remove(H),b.gridHelper?n.add(A):n.remove(A),b.gizmoVisible?(n.add(f),a.attach(i)):a.detach()}Y(),window.addEventListener("resize",S,!1),S(),e.setAnimationLoop(x);function v(){const h=new zt(75,r.clientWidth/r.clientHeight,.1,1e3);return h.position.x=2,h.position.y=2,h.position.z=2,h}function E(){const h=new u(1,1,1),P=new ot({color:15511039});return new s(h,P)}function x(h){t.update(),c.update(),e.render(n,o)}function S(){const h=Math.min(window.devicePixelRatio,2),P=Math.round(r.clientWidth*h),Z=Math.round(r.clientHeight*h);e.setSize(P,Z,!1),r.width=P,r.height=Z,o.aspect=r.clientWidth/r.clientHeight,o.updateProjectionMatrix()}}Ut();