YUI.add("base-base",function(A){var K=A.Lang;function D(L){this._plugins={};}D.prototype={plug:function(T,L){if(T){if(K.isFunction(T)){this._plug(T,L);}else{if(K.isArray(T)){for(var O=0,S=T.length;O<S;O++){this.plug(T[O]);}}else{this._plug(T.fn,T.cfg);}}}return this;},unplug:function(O){if(O){this._unplug(O);}else{var L;for(L in this._plugins){if(this._plugins.hasOwnProperty(L)){this._unplug(L);}}}return this;},hasPlugin:function(L){return(this._plugins[L]&&this[L]);},_initPlugins:function(O){var T=this._getClasses(),L=[],U={},S,V,X,Y,W;for(V=T.length-1;V>=0;V--){S=T[V];Y=S._UNPLUG;if(Y){A.mix(U,Y,true);}X=S._PLUG;if(X){A.mix(L,X,true);}}for(W in L){if(L.hasOwnProperty(W)){if(!U[W]){this.plug(L[W]);}}}if(O&&O.plugins){this.plug(O.plugins);}},_destroyPlugins:function(){this._unplug();},_plug:function(S,L){if(S&&S.NS){var O=S.NS;L=L||{};L.host=this;if(this.hasPlugin(O)){this[O].setAttrs(L);}else{this[O]=new S(L);this._plugins[O]=S;}}},_unplug:function(S){var O=S,L=this._plugins;if(K.isFunction(S)){O=S.NS;if(O&&(!L[O]||L[O]!==S)){O=null;}}if(O){if(this[O]){this[O].destroy();delete this[O];}if(L[O]){delete L[O];}}}};D.plug=function(O,V,T){var W,U,L,S;if(O!==A.Base){O._PLUG=O._PLUG||{};if(!K.isArray(V)){if(T){V={fn:V,cfg:T};}V=[V];}for(U=0,L=V.length;U<L;U++){W=V[U];S=W.NAME||W.fn.NAME;O._PLUG[S]=W;}}};D.unplug=function(O,U){var V,T,L,S;if(O!==A.Base){O._UNPLUG=O._UNPLUG||{};if(!K.isArray(U)){U=[U];}for(T=0,L=U.length;T<L;T++){V=U[T];S=V.NAME;if(!O._PLUG[S]){O._UNPLUG[S]=V;}else{delete O._PLUG[S];}}}};A.namespace("Plugin").Host=D;var I=A.Object,J=".",F="destroy",Q="init",P="initialized",H="destroyed",C="initializer",B=Object.prototype.constructor,M="deep",R="shallow",G="value",N="destructor";function E(){A.Attribute.call(this);A.Plugin.Host.call(this);this._silentInit=this._silentInit||false;if(this._lazyAttrInit!==false){this._lazyAttrInit=true;}this.init.apply(this,arguments);}E._ATTR_CFG=A.Attribute._ATTR_CFG.concat("cloneDefaultValue");E.NAME="base";E.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};E.prototype={init:function(L){this._yuievt.config.prefix=this.name=this.constructor.NAME;if(!this._silentInit){this.publish(Q,{queuable:false,defaultFn:this._defInitFn});}if(L){if(L.on){this.on(L.on);}if(L.after){this.after(L.after);}}if(!this._silentInit){this.fire(Q,{cfg:L});}else{this._defInitFn({cfg:L});}return this;},destroy:function(){this.publish(F,{queuable:false,defaultFn:this._defDestroyFn});this.fire(F);return this;},_defInitFn:function(L){this._initHierarchy(L.cfg);this._initPlugins(L.cfg);if(!this._silentInit){this._set(P,true);}else{this._conf.add(P,G,true);}},_defDestroyFn:function(L){this._destroyHierarchy();this._destroyPlugins();this._set(H,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(T,O){var S=null,L;if(T.ATTRS){for(L in T.ATTRS){if(T.ATTRS.hasOwnProperty(L)){if(O[L]){S=S||{};S[L]=O[L];delete O[L];}}}}return S;},_initHierarchyData:function(){var S=this.constructor,O=[],L=[];while(S){O[O.length]=S;if(S.ATTRS){L[L.length]=S.ATTRS;}S=S.superclass?S.superclass.constructor:null;}this._classes=O;this._attrs=this._aggregateAttrs(L);},_aggregateAttrs:function(Y){var U,Z,T,L,a,O,W,S=E._ATTR_CFG,X=this._filteredMerge,V={};if(Y){for(O=Y.length-1;O>=0;--O){Z=Y[O];for(U in Z){if(Z.hasOwnProperty(U)){T=X(S,{},Z[U]);L=T.value;W=T.cloneDefaultValue;if(L){if((W===undefined&&(B===L.constructor||K.isArray(L)))||W===M||W===true){T.value=A.clone(L);}else{if(W===R){T.value=A.merge(L);}}}a=null;if(U.indexOf(J)!==-1){a=U.split(J);U=a.shift();}if(a&&V[U]&&V[U].value){I.setValue(V[U].value,a,L);}else{if(!a){if(!V[U]){V[U]=T;}else{X(S,V[U],T);}}}}}}}return V;},_initHierarchy:function(V){var S=this._lazyAttrInit,W,X,Y,T,O,U=this._getClasses(),L=this._getAttrCfgs();for(Y=U.length-1;Y>=0;Y--){W=U[Y];X=W.prototype;if(W._yuibuild&&W._yuibuild.exts&&!W._yuibuild.dynamic){for(T=0,O=W._yuibuild.exts.length;T<O;T++){W._yuibuild.exts[T].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(W,L),V,S);if(X.hasOwnProperty(C)){X.initializer.apply(this,arguments);}}},_destroyHierarchy:function(){var U,O,T,L,S=this._getClasses();for(T=0,L=S.length;T<L;T++){U=S[T];O=U.prototype;if(O.hasOwnProperty(N)){O.destructor.apply(this,arguments);}}},_filteredMerge:function(S,U,T){var O,L,V;for(O=0,L=S.length;O<L;++O){V=S[O];if(V in T){U[V]=T[V];}}return U;},toString:function(){return this.constructor.NAME+"["+A.stamp(this)+"]";}};A.mix(E,A.Attribute,false,null,1);A.mix(E,D,false,null,1);E.plug=D.plug;E.unplug=D.unplug;E.prototype.constructor=E;A.Base=E;},"@VERSION@",{requires:["attribute"]});YUI.add("base-build",function(C){var B=C.Base,A=C.Lang;B._buildCfg={aggregates:["ATTRS","_PLUG","_UNPLUG"]};B.build=function(D,I,M,L){var O=B.build,E=O._getClass(I,L),K=O._getAggregates(I,L),G=E._yuibuild.dynamic,J,H,F,N;if(G){if(K){for(J=0,H=K.length;J<H;++J){F=K[J];if(I.hasOwnProperty(F)){E[F]=A.isArray(I[F])?[]:{};}}C.aggregate(E,I,true,K);}}for(J=0,H=M.length;J<H;J++){N=M[J];if(K){C.aggregate(E,N,true,K);}C.mix(E,N,true,null,1);E._yuibuild.exts.push(N);}E.prototype.hasImpl=O._hasImpl;if(G){E.NAME=D;E.prototype.constructor=E;}return E;};C.mix(B.build,{_template:function(D){function E(){E.superclass.constructor.apply(this,arguments);var H=E._yuibuild.exts,F=H.length,G;for(G=0;G<F;G++){H[G].apply(this,arguments);}return this;}C.extend(E,D);return E;},_hasImpl:function(E){if(this.constructor._yuibuild){var G=this.constructor._yuibuild.exts,D=G.length,F;for(F=0;F<D;F++){if(G[F]===E){return true;}}}return false;},_getClass:function(D,E){var F=(E&&false===E.dynamic)?false:true,G=(F)?B.build._template(D):D;G._yuibuild={id:null,exts:[],dynamic:F};return G;},_getAggregates:function(D,E){var F=[],H=(E&&E.aggregates),I=D,G;while(I&&I.prototype){G=I._buildCfg&&I._buildCfg.aggregates;if(G){F=F.concat(G);}I=I.superclass?I.superclass.constructor:null;
}if(H){F=F.concat(H);}return F;}});},"@VERSION@",{requires:["base-base"]});YUI.add("base",function(A){},"@VERSION@",{use:["base-base","base-build"]});