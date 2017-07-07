webpackJsonp([2,0],{0:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var o=n(115),i=a(o),s=n(114),r=a(s),l=n(110),u=a(l),d=n(44),c=a(d),m=n(45),f=a(m),h="0.1",p=localStorage.getItem("localStorageVersion");h!==p&&(localStorage.clear(),localStorage.setItem("localStorageVersion",h));var v=new r.default({routes:[{path:"/search",component:c.default},{path:"/search-result",component:f.default},{path:"/",component:c.default}]});i.default.use(r.default),i.default.prototype.$routz=v,new i.default({el:"#app",router:v,template:"<App/>",components:{App:u.default}})},30:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){p.from.unshift(e),p.from.length=p.from.length>3?3:p.from.length,p.to.unshift(t),p.to.length=p.to.length>3?3:p.to.length}Object.defineProperty(t,"__esModule",{value:!0});var i=n(68),s=a(i),r=n(69),l=a(r),u=n(67),d=a(u),c=n(46),m=a(c),f=[],h="quickresult",p=JSON.parse(localStorage.getItem(h));p||(p={from:[],to:[]});var v=function(e){return e.SiteId||e.Name},_={fetch:function(e,t){return o(e,t),localStorage.setItem(h,(0,d.default)(p)),new l.default(function(n,a){m.default.post("api/search",{originId:v(e),destId:v(t)}).then(function(e){f=e.data,n(f.map(function(e){return(0,s.default)(e,{detailed:!1})}))})})},typeahead:function(e){return new l.default(function(t,n){m.default.post("api/typeahead",{searchstring:e}).then(function(e){t(e.data)})})},getResult:function(){return f},quickResult:function(){return p}};t.default=_},44:function(e,t,n){n(108);var a=n(24)(n(65),n(113),"data-v-7ec8f895",null);e.exports=a.exports},45:function(e,t,n){n(106);var a=n(24)(n(66),n(111),"data-v-11d5752e",null);e.exports=a.exports},64:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(44),i=a(o),s=n(45),r=a(s);t.default={name:"app",components:{SearchForm:i.default,SearchResult:r.default}}},65:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(30),i=a(o);t.default={name:"searchForm",data:function(){return{model:{from:{Name:""},fromTypeaheads:[],fromTypeaheadsActiveItem:void 0,fromTypeaheadsSearching:!1,to:{Name:""},toTypeaheads:[],toTypeaheadsActiveItem:void 0,toTypeaheadsSearching:!1},quickResult:i.default.quickResult(),searching:!1,error:""}},methods:{reset:function(e){console.log("reset",e),this.model[e+"Typeaheads"].splice(0,this.model[e+"Typeaheads"].length)},selectQuick:function(e,t){this.model[e]=t},selectTypeahead:function(e,t){console.log("selectTypeahead",e,t),this.model[e]=t},setActive:function(e,t,n){if(console.log("setActive",e,t,n),n&&(this.model[e+"TypeaheadsActiveItem"]=n),t){this.model[e+"TypeaheadsActiveItem"]||(this.model[e+"TypeaheadsActiveItem"]=this.model[e+"Typeaheads"][0]);var a=this.model[e+"Typeaheads"].indexOf(this.model[e+"TypeaheadsActiveItem"]);this.model[e+"TypeaheadsActiveItem"]=this.model[e+"Typeaheads"][a+t]}console.log("active",this.model[e+"TypeaheadsActiveItem"].Name)},search:function(){var e=this;this.searching=!0,i.default.fetch(this.model.to,this.model.from).then(function(){e.searching=!1,e.$routz.replace("/search-result")},function(t){e.error=t})},stationSearch:function(e){return i.default.typeahead(e)},changed:function(e){var t=this;this.model[e]={Name:this.model[e].Name},this.model[e].Name.length>2&&(this.model[e+"TypeaheadsSearching"]=!0,this.stationSearch(this.model[e].Name).then(function(n){t.model[e+"Typeaheads"]=n,t.model[e+"TypeaheadsActiveItem"]=void 0,t.model[e+"TypeaheadsSearching"]=!1},function(n){t.model[e+"TypeaheadsSearching"]=!1,t.error=n}))}}}},66:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(30),i=a(o);t.default={name:"searchResult",data:function(){return{result:i.default.getResult()}},filters:{origin:function(e){return e.LegList.Leg[0].Origin.name},destination:function(e){return e.LegList.Leg[e.LegList.Leg.length-1].Destination.name},time:function(e){return e.Leg[0].Origin.time+" ⇒ "+e.Leg[e.Leg.length-1].Destination.time},typeImg:function(e){return"static/"+e+"-icon.svg"}},created:function(){0===this.result.length&&this.$routz.push("search")}}},106:function(e,t){},107:function(e,t){},108:function(e,t){},110:function(e,t,n){n(107);var a=n(24)(n(64),n(112),null,null);e.exports=a.exports},111:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",e._l(e.result,function(t){return n("li",{on:{click:function(e){t.detailed=!t.detailed}}},[n("div",{staticClass:"header"},[n("h3",[e._v("\n        "+e._s(e._f("time")(t.LegList))+" "+e._s(t.dur)+" min\n      ")]),e._v(" "),n("h5",[n("span",[e._v(e._s(e._f("origin")(t)))]),e._v(" "),n("span",[e._v("-")]),e._v(" "),n("span",[e._v(e._s(e._f("destination")(t)))])]),e._v(" "),n("button",{staticClass:"expander"},[e._v("+")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.detailed,expression:"res.detailed"}],staticClass:"legList"},[e._l(t.LegList.Leg,function(a){return"WALK"!==a.type?[n("div",{attrs:{alt:a.name}},[n("img",{attrs:{src:e._f("typeImg")(a.type),width:"50"}}),e._v(" "),n("p",{staticClass:"time"},[e._v(e._s(a.Origin.time))]),e._v(" "),n("span",{staticClass:"line"},[e._v(e._s(a.line))])]),e._v(" "),a!==t.LegList.Leg[t.LegList.Leg.length-1]?n("p",{staticClass:"middle-station"},[e._v(e._s(a.Destination.name))]):e._e()]:e._e()})],2)])}))},staticRenderFns:[]}},112:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("header",[n("h1",[n("router-link",{attrs:{to:"/"}},[e._v("\n        SLapp\n      ")])],1)]),e._v(" "),n("router-view")],1)},staticRenderFns:[]}},113:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("form",{on:{submit:function(t){t.preventDefault(),e.search()}}},[n("div",{staticClass:"field-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.model.from.Name,expression:"model.from.Name"}],attrs:{type:"text",placeholder:"Från"},domProps:{value:e.model.from.Name},on:{input:[function(t){t.target.composing||(e.model.from.Name=t.target.value)},function(t){e.changed("from")}],keydown:[function(t){return"button"in t||!e._k(t.keyCode,"esc",27)?void e.reset("from"):null},function(t){return"button"in t||!e._k(t.keyCode,"down",40)?void e.setActive("from",1):null},function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?(t.preventDefault(),void e.selectTypeahead("from",e.model.fromTypeaheadsActiveItem)):null},function(t){return"button"in t||!e._k(t.keyCode,"up",38)?void e.setActive("from",-1):null}],blur:function(t){e.reset("from")}}}),e._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.model.fromTypeaheads.length||e.model.fromTypeaheadsSearching,expression:"model.fromTypeaheads.length || model.fromTypeaheadsSearching"}],staticClass:"typeahead-result"},[e.model.fromTypeaheadsSearching?n("li",[e._v("Söker")]):e._e(),e._v(" "),e._l(e.model.fromTypeaheads,function(t){return n("li",{staticClass:"typeahead-result-item",class:{"typeahead-result-item--active":t===e.model.fromTypeaheadsActiveItem},on:{mousedown:function(n){e.selectTypeahead("from",t)},mouseover:function(n){e.setActive("from",0,t)}}},[e._v("\n          "+e._s(t.Name)+"\n        ")])})],2),e._v(" "),n("div",{staticClass:"quick-wrapper"},e._l(e.quickResult.from,function(t){return n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(n){e.selectQuick("from",t)}}},[e._v(e._s(t.Name))])}))]),e._v(" "),n("div",{staticClass:"field-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.model.to.Name,expression:"model.to.Name"}],attrs:{type:"text",placeholder:"Till"},domProps:{value:e.model.to.Name},on:{input:[function(t){t.target.composing||(e.model.to.Name=t.target.value)},function(t){e.changed("to")}],keydown:[function(t){return"button"in t||!e._k(t.keyCode,"esc",27)?void e.reset("to"):null},function(t){return"button"in t||!e._k(t.keyCode,"down",40)?void e.setActive("to",1):null},function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?(t.preventDefault(),void e.selectTypeahead("to",e.model.toTypeaheadsActiveItem)):null},function(t){return"button"in t||!e._k(t.keyCode,"up",38)?void e.setActive("to",-1):null}],blur:function(t){e.reset("to")}}}),e._v(" "),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.model.toTypeaheads.length||e.model.toTypeaheadsSearching,expression:"model.toTypeaheads.length || model.toTypeaheadsSearching"}],staticClass:"typeahead-result"},[e.model.toTypeaheadsSearching?n("li",[e._v("Söker")]):e._e(),e._v(" "),e._l(e.model.toTypeaheads,function(t){return n("li",{staticClass:"typeahead-result-item",class:{"typeahead-result-item--active":t===e.model.toTypeaheadsActiveItem},on:{mousedown:function(n){e.selectTypeahead("to",t)},mouseover:function(n){e.setActive("to",0,t)}}},[e._v("\n          "+e._s(t.Name)+"\n        ")])})],2),e._v(" "),n("div",{staticClass:"quick-wrapper"},e._l(e.quickResult.to,function(t){return n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(n){e.selectQuick("to",t)}}},[e._v(e._s(t.Name))])}))]),e._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{disabled:e.searching}},[e._v("Sök")]),e._v(" "),e.searching?n("p",[e._v("Söker")]):e._e(),e._v(" "),e.error?n("p",[e._v(e._s(e.error))]):e._e()])])},staticRenderFns:[]}}});
//# sourceMappingURL=app.js.map