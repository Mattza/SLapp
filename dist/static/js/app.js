webpackJsonp([2,0],[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var a=n(147),s=i(a),r=n(146),o=i(r),u=n(132),l=i(u),c=n(49),d=i(c),f=n(136),v=i(f),p=n(47),m=i(p),_=n(48),h=i(_),g=n(46),k=i(g),y=n(133),C=i(y),b=new o.default({routes:[{path:"/resultat",component:v.default},{path:"/storningar",component:m.default},{path:"/mina-resor",component:h.default},{path:"/om",component:k.default},{path:"/all",component:C.default},{path:"/",component:d.default}]});s.default.use(o.default),s.default.prototype.$routz=b,new s.default({el:"#app",router:b,template:"<App/>",components:{App:l.default}})},,,,,,,,,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=e.find(function(e){return t.Name===e.Name});n?(n.count++,n.date.push(+new Date)):(t.count=1,t.date=[+new Date],e.push(t))}function s(e,t){a(N.from,e),a(N.to,t)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(81),o=i(r),u=n(80),l=i(u),c=n(78),d=i(c),f=n(31),v=i(f),p=n(32),m=i(p),_=n(77),h=i(_),g=n(50),k=i(g),y="0.2",C=localStorage.getItem("localStorageVersion");y!==C&&(localStorage.clear(),localStorage.setItem("localStorageVersion",y));var b=!C,L=[],x="quickresult",N=JSON.parse(localStorage.getItem(x));N||(N={from:[{Name:"T-centralen",date:[]},{Name:"Slussen",date:[]},{Name:"Sundbyberg",date:[]}],to:[{Name:"T-centralen",date:[]},{Name:"Slussen",date:[]},{Name:"Sundbyberg",date:[]}]},localStorage.setItem(x,(0,h.default)(N)));var S="deviation",w=JSON.parse(localStorage.getItem(S))||[],M=function(e,t){if("Address"===t.Type){var n,i=e+"CoordLat",a=e+"CoordLong",s=e+"CoordName";return n={},(0,m.default)(n,i,t.Y/1e6),(0,m.default)(n,a,t.X/1e6),(0,m.default)(n,s,t.Name),n}var r=e+"Id";return(0,m.default)({},r,t.SiteId||t.Name)},R={fetch:function(e,t){return s(e,t),localStorage.setItem(x,(0,h.default)(N)),new v.default(function(n,i){var a={};(0,d.default)(a,M("origin",e)),(0,d.default)(a,M("dest",t)),k.default.post("api/search",a).then(function(e){L=e.data,n(L.map(function(e){return(0,d.default)(e,{detailed:!1})}))})})},typeahead:function(e){return new v.default(function(t,n){k.default.post("api/typeahead",{searchstring:e}).then(function(e){t(e.data)})})},deviations:function(){var e=(0,l.default)(o.default.mark(function e(t){var n;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.default.post("api/deviations",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}},e,void 0)}));return function(t){return e.apply(this,arguments)}}(),deviationGids:w,archiveDeviation:function(e){w.push(e.DevCaseGid),localStorage.setItem(S,(0,h.default)(w))},getResult:function(){return L},quickResult:function(){return N},firstTime:b};t.default=R},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){n(126);var i=n(4)(n(69),n(143),null,null);e.exports=i.exports},function(e,t,n){n(123);var i=n(4)(n(71),n(140),null,null);e.exports=i.exports},function(e,t,n){n(122);var i=n(4)(n(72),n(139),null,null);e.exports=i.exports},function(e,t,n){n(127);var i=n(4)(n(74),n(144),"data-v-7ec8f895",null);e.exports=i.exports},,,,,,,,,,,,,,,,,,,function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app",data:function(){return{leftOpen:!1,openLeft:function(){this.leftOpen=!0},closeLeft:function(){console.log(""),this.leftOpen=!1},links:[{link:"/",text:"Sökning"},{link:"/mina-resor",text:"Mina stationer"},{link:"/storningar",text:"Störningar"},{link:"/om",text:"Om SLapp"}]}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(49),s=i(a),r=n(47),o=i(r),u=n(48),l=i(u),c=n(46),d=i(c);t.default={name:"allPages",components:{searchform:s.default,deviations:o.default,mytrips:l.default,about:d.default}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n){var i;return function(){var a=this,s=arguments,r=function(){i=null,n||e.apply(a,s)},o=n&&!i;clearTimeout(i),i=setTimeout(r,t),o&&e.apply(a,s)}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(9),r=i(s);t.default={name:"deviations",props:["list"],data:function(){return{deviations:void 0,deviationGids:r.default.deviationGids}},methods:{onChange:a(function(e){var t=this;r.default.deviations({lineNumber:e.target.value}).then(function(e){t.deviations=e})},500),archive:function(e){r.default.archiveDeviation(e)},time:function(e){var t=e.split("T");if(t[0].slice(0,4)===""+(new Date).getFullYear()){var n=t[0].split("-"),i=["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];t[0]=n[2]+" "+i[parseInt(n[1])-1]}return t[0]+" "+t[1].slice(0,5)}},created:function(){var e=this;r.default.deviations().then(function(t){e.deviations=t})}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(32),s=i(a),r=n(9),o=i(r),u=function(e,t){return(0,s.default)({Name:e.Name,SiteId:e.SiteId},t,e.date)};t.default={name:"deviations",props:["list"],data:function(){return{quickResult:o.default.quickResult()}},computed:{stations:function(){var e=[];this.quickResult.from.forEach(function(t){e.push(u(t,"fromDate"))});var t=this.quickResult.from.filter(function(e){return!!e.SiteId}).map(function(e){return e.SiteId}),n=this.quickResult.from.map(function(e){return e.Name});return this.quickResult.to.forEach(function(i){i.SiteId?t.includes(i.SiteId)?e.find(function(e){return e.SiteId===i.SiteId}).toDate=i.date:(t.push(i.SiteId),e.push(u(i,"toDate"))):i.Name&&(n.includes(i.Name)?e.find(function(e){return e.Name===i.Name}).toDate=i.date:(n.push(i.Name),e.push(u(i,"toDate"))))}),e}},methods:{remove:function(e){console.log(e)}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"quick-result",props:["list"],computed:{filteredList:function(){var e=this,t=[];return this.list.filter(function(n){var i=e.trimName(n.Name);return!t.includes(i)&&(t.push(i),!0)}).sort(function(e,t){return e.date.length<t.date.length}).slice(0,6)}},methods:{click:function(e){this.$emit("select",e)},trimName:function(e){return e=e.charAt(0).toUpperCase()+e.slice(1),e=e.split("(")[0],e=e.trim()}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(9),s=i(a),r=n(135),o=i(r);t.default={name:"searchForm",components:{"search-input":o.default},data:function(){return{quickResult:s.default.quickResult(),firstTime:s.default.firstTime,model:{from:void 0,to:void 0},searching:!1,error:""}},computed:{searchEnabled:function(){return this.model.from&&this.model.from.Name&&this.model.to&&this.model.to.Name}},methods:{search:function(){var e=this;this.model.from.Name&&this.model.to.Name&&(this.searching=!0,s.default.fetch(this.model.from,this.model.to).then(function(){e.searching=!1,e.$routz.push("/resultat")},function(t){e.error=t}))},changeModel:function(e,t){this.model[e]=t}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(9),s=i(a),r=n(134),o=i(r);t.default={name:"search-input",components:{"quick-result":o.default},props:["placeholder","quickResult"],data:function(){return{typeaheadList:[],active:void 0,searching:!1,model:{Name:""}}},watch:{model:{handler:function(e){this.$emit("modelChange",this.model)},deep:!0}},methods:{changed:function(){var e=this;this.model.Name.length>2&&(this.searching=!0,s.default.typeahead(this.model.Name).then(function(t){e.typeaheadList=t,e.active=e.typeaheadList[0],e.searching=!1},function(t){e.searching=!1,e.error=t}))},reset:function(){this.typeaheadList.splice(0,this.typeaheadList.length)},setModel:function(e){this.model=e},selectTypeahead:function(){this.setModel(this.active),this.reset()},setActive:function(e,t){if(this.active=t||this.active||this.typeaheadList[0],e){var n=this.typeaheadList.indexOf(this.active);this.active=this.typeaheadList[n+e]}}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(9),s=i(a);t.default={name:"searchResult",data:function(){return{result:s.default.getResult(),getRealLegs:function(e){return e.LegList.Leg.filter(function(e){return"WALK"!==e.type})}}},filters:{origin:function(e){return e.LegList.Leg[0].Origin.name},destination:function(e){return e.LegList.Leg[e.LegList.Leg.length-1].Destination.name},time:function(e){return e.Leg[0].Origin.time+" ⇒ "+e.Leg[e.Leg.length-1].Destination.time},typeImg:function(e){return"static/"+e+"-icon.svg"}},created:function(){0===this.result.length&&this.$routz.push("/")}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,,,function(e,t,n){n(125);var i=n(4)(n(68),n(142),null,null);e.exports=i.exports},function(e,t,n){n(121);var i=n(4)(n(70),n(138),null,null);e.exports=i.exports},function(e,t,n){n(128);var i=n(4)(n(73),n(145),null,null);e.exports=i.exports},function(e,t,n){n(124);var i=n(4)(n(75),n(141),null,null);e.exports=i.exports},function(e,t,n){n(120);var i=n(4)(n(76),n(137),"data-v-11d5752e",null);e.exports=i.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{staticClass:"result"},e._l(e.result,function(t){return n("li",{staticClass:"result-item",on:{click:function(e){t.detailed=!t.detailed}}},[n("div",{staticClass:"preview"},[n("div",{staticClass:"preview-head"},[n("h3",[e._v("\n          "+e._s(e._f("time")(t.LegList))+"\n        ")]),e._v(" "),n("h5",[n("div",{staticClass:"no-break"},[e._v(e._s(e._f("origin")(t)))]),e._v(" "),n("div",{staticClass:"no-break"},[e._v(e._s(e._f("destination")(t)))])]),e._v(" "),t.detailed?e._e():n("button",{staticClass:"expander"},[e._v("+")]),e._v(" "),t.detailed?n("button",{staticClass:"expander"},[n("span",[e._v("-")])]):e._e()]),e._v(" "),n("div",{staticClass:"preview-sub"},[n("h4",[e._v("\n          "+e._s(t.dur)+" min\n        ")]),e._v(" "),n("div",{staticClass:"preview-legs"},e._l(e.getRealLegs(t),function(t){return n("div",{staticClass:"preview-leg"},[n("img",{staticClass:"preview-leg-img",attrs:{src:e._f("typeImg")(t.type)}}),e._v(" "),n("span",{staticClass:"preview-leg-text"},[e._v(e._s(t.line))])])}))])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.detailed,expression:"res.detailed"}],staticClass:"body"},[e._l(e.getRealLegs(t),function(i){return[n("div",{staticClass:"body-leg",attrs:{alt:i.name}},[n("div",{staticClass:"body-leg__first-col"},[n("div",{staticClass:"body-leg__icon"},[n("img",{staticClass:"body-leg__icon-img",attrs:{src:e._f("typeImg")(i.type)}}),e._v(" "),n("span",{staticClass:"body-leg__icon-text"},[e._v(e._s(i.line))])]),e._v(" "),n("div",[n("p",{staticClass:"time"},[e._v(e._s(i.Origin.time))]),e._v(" "),n("p",{staticClass:"time"},[e._v(e._s(i.Destination.time))])])]),e._v(" "),n("table",{staticClass:"body-leg__extras"},[n("tr",[e._m(0,!0),e._v(" "),n("td",[n("h5",[e._v(e._s(i.dir))])])]),e._v(" "),i!==t.LegList.Leg[t.LegList.Leg.length-1]?n("tr",[e._m(1,!0),e._v(" "),n("td",[n("h5",[e._v(e._s(i.Destination.name))])])]):e._e()])])]})],2)])}))},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td",[n("small",[e._v("Mot:")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("td",[n("small",[e._v("Byt vid:")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("searchform"),e._v(" "),n("deviations"),e._v(" "),n("mytrips"),e._v(" "),n("about")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Mina stationer")]),e._v(" "),n("div",{staticClass:"result"},e._l(e.stations,function(t){return n("div",{staticClass:"result-item",on:{click:function(n){e.remove(t)}}},[n("div",{staticClass:"preview"},[n("div",{staticClass:"preview-head"},[n("h3",[e._v(e._s(t.Name))]),e._v(" "),n("button",{staticClass:"expander"},[n("img",{attrs:{src:"static/trash-can.svg"},on:{click:function(t){e.openLeft()}}})])]),e._v(" "),n("div",{staticClass:"preview-body"},[t.fromDate?n("p",[e._v("Åkt från: "+e._s(t.fromDate.length)+" gånger")]):e._e(),e._v(" "),t.toDate?n("p",[e._v("Åkt till: "+e._s(t.toDate.length)+" gånger")]):e._e()])])])}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"searcher"},[n("h1",[e._v("Sök störningar")]),e._v(" "),n("h3",[e._v("Fyll i den linjen du vill ha information om!")]),e._v(" "),n("input",{attrs:{type:"number"},on:{input:e.onChange}})]),e._v(" "),n("div",{staticClass:"result"},e._l(e.deviations,function(t){return e.deviationGids.includes(t.DevCaseGid)?e._e():n("div",{key:t.DevCaseGid,staticClass:"result-item"},[n("h3",[e._v("\n        "+e._s(t.Header)+"\n      ")]),e._v(" "),n("p",[e._v(e._s(e.time(t.FromDateTime))+" - "+e._s(e.time(t.UpToDateTime)))]),e._v(" "),n("p",[e._v("Gäller "+e._s(t.Scope))]),e._v(" "),n("p",[e._v("\n        "+e._s(t.Details)+"\n      ")])])}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"field-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.model.Name,expression:"model.Name"}],attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.model.Name},on:{input:[function(t){t.target.composing||(e.model.Name=t.target.value)},function(t){e.changed()}],keydown:[function(t){return"button"in t||!e._k(t.keyCode,"esc",27)?void e.reset():null},function(t){return"button"in t||!e._k(t.keyCode,"down",40)?void e.setActive(1):null},function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?(t.preventDefault(),void e.selectTypeahead()):null},function(t){return"button"in t||!e._k(t.keyCode,"up",38)?void e.setActive(-1):null}],blur:function(t){e.reset()}}}),e._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.typeaheadList.length||e.searching,expression:"typeaheadList.length || searching"}],staticClass:"typeahead-result"},[e.searching?n("li",[e._v("Söker")]):e._e(),e._v(" "),e._l(e.typeaheadList,function(t){return n("li",{staticClass:"typeahead-result-item",class:{"typeahead-result-item--active":t===e.active},on:{mousedown:function(n){e.selectTypeahead(t)},mouseover:function(n){e.setActive(0,t)}}},[e._v("\n      "+e._s(t.Name)+"\n    ")])})],2),e._v(" "),n("quick-result",{attrs:{list:e.quickResult},on:{select:e.setModel}})],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:"/"===e.$route.path?"ad":"",attrs:{id:"app"}},[n("header",[n("img",{attrs:{src:"static/hamburger.svg"},on:{click:function(t){e.openLeft()}}}),e._v(" "),n("h1",{staticClass:"main-header-heading"},[n("router-link",{attrs:{to:"/"}},[e._v("\n        SLapp\n      ")])],1),e._v(" "),n("div")]),e._v(" "),n("router-view"),e._v(" "),n("aside",{staticClass:"left",class:{"left--is-open":e.leftOpen}},[n("div",{staticClass:"left__back-drop",on:{click:function(t){e.closeLeft()}}}),e._v(" "),n("div",{staticClass:"left__body"},[e._m(0),e._v(" "),e._l(e.links,function(t){return n("div",{on:{click:function(t){e.closeLeft()}}},[n("router-link",{staticClass:"left__link",attrs:{to:t.link}},[e._v(e._s(t.text))])],1)})],2)])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("h1",[e._v("Meny")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c||t;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h3",[e._v("\n    Hej!")]),e._v(" "),n("p",[e._v("Här tänkar jag skriva någon mysig text någon dag")])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.firstTime?n("div",{staticClass:"onboarding"},[n("h3",[e._v("Välkommen till den smarta SL-appen!")]),e._v(" "),n("p",[e._v("Denna app kommer successivt lära sig hur du söker och kommer kunna föreslå resmål.")]),e._v(" "),n("p")]):e._e(),e._v(" "),n("form",{on:{submit:function(t){t.preventDefault(),e.search()}}},[n("search-input",{attrs:{placeholder:"Från",quickResult:e.quickResult.from},on:{modelChange:function(t){e.changeModel("from",t)}}}),e._v(" "),n("search-input",{attrs:{placeholder:"Till",quickResult:e.quickResult.to},on:{modelChange:function(t){e.changeModel("to",t)}}}),e._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{disabled:e.searching||!e.searchEnabled}},[e._v("Sök")]),e._v(" "),e.searching?n("p",[e._v("Söker")]):e._e(),e._v(" "),e.error?n("p",[e._v(e._s(e.error))]):e._e()],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"quick-wrapper"},e._l(e.filteredList,function(t){return n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(n){e.click(t)}}},[e._v(e._s(e.trimName(t.Name)))])}))},staticRenderFns:[]}}]);
//# sourceMappingURL=app.js.map