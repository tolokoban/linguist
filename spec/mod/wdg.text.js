require("wdg.text",function(t,e,l){var a=function(){function e(){return a(l,arguments)}var l={en:{}},a=t("$").intl;return e.all=l,e}(),i=t("dom"),n=t("tfw.data-binding"),s=t("wdg.lang"),o=t("tfw.timer").laterAction,r=function(t){var e=this,l=!1,a=[],r=0,u=i.div("label"),v=i.tag("input"),d=new s({small:!0,visible:!0}),p=i.div("nowrap","thm-ele2","thn-bg3",[v,d]),c=i.div("datalist","thm-ele12");this._input=v;var f=i.elem(this,"div","wdg-text",[u,p,c]);n.bind(d,"value",function(t){v.value=e.value[t]||"",e.focus||v.focus()}),n.prop(this,"value")(function(t){if(null!==t&&void 0!==t||(t=""),"number"!=typeof t&&"boolean"!=typeof t||(t=""+t),"string"!=typeof t){v.value!=t[d.value]&&(v.value=t[d.value]);var l,a=[];for(l in t)a.push(l);d.subset=a,e.intl=!0}else v.value!=t&&(v.value=t),e.intl=!1;e.validate()}),n.propBoolean(this,"intl")(function(t){d.visible=t}),n.propEnum(["text","button","checkbox","color","date","datetime","email","file","hidden","image","month","password","radio","range","reset","search","submit","tel","time","url","week"])(this,"type")(function(t){i.att(v,{type:t}),"password"==t&&i.att(v,{autocomplete:"off"})}),n.propStringArray(this,"list")(function(t){i.clear(c),i.removeClass(f,"list"),Array.isArray(t)&&(t.forEach(function(t){i.add(c,i.div([t]))}),t.length>0&&i.att(f,"list"))}),n.propValidator(this,"validator")(this.validate.bind(this)),n.propBoolean(this,"valid")(function(t){null!==t&&e.validator?t?(i.addClass(f,"valid"),i.removeClass(f,"no-valid")):(i.removeClass(f,"valid"),i.addClass(f,"no-valid")):i.removeClass(f,"valid","no-valid")}),n.propBoolean(this,"enabled")(function(t){t?i.removeAtt(v,"disabled"):i.att(v,{disabled:t})}),n.propInteger(this,"size")(function(t){t<1?i.removeAtt(v,"size"):i.att(v,{size:t})}),n.propString(this,"label")(function(t){null===t||"string"==typeof t&&""==t.trim()?i.addClass(f,"no-label"):(i.removeClass(f,"no-label"),i.textOrHtml(u,t),"<html>"==t.substr(0,6)?i.att(u,{title:""}):i.att(u,{title:t}))}),n.propString(this,"placeholder")(function(t){i.att(v,{placeholder:t})}),n.propString(this,"width")(function(t){f.style.width=t}),n.propBoolean(this,"focus")(function(t){t?v.focus():v.blur()}),n.prop(this,"action"),n.propAddClass(this,"wide"),n.propRemoveClass(this,"visible","hide"),t=n.extend({action:!0,intl:!1,value:"",type:"text",placeholder:"",enabled:!0,validator:null,valid:!0,list:null,label:"",placeholder:"",size:10,width:"auto",focus:!1,wide:!1,visible:!0},t,this);var h=function(){if(i.removeClass(f,"list"),e.list&&0!=e.list.length){i.clear(c);var t=e.list,n=v.value.trim().toLowerCase();t=n.length>0?t.map(function(t,e){return[e,t.toLowerCase().indexOf(n)]}).filter(function(t){return t[1]>-1}).sort(function(t,l){var a=t[1]-l[1];if(0!=a)return a;var i=e.list[t[0]],n=e.list[l[0]];return i<n?-1:i>n?1:0}).map(function(t){var l=e.list[t[0]],a=t[1];return l.substr(0,a)+"<b>"+l.substr(a,n.length)+"</b>"+l.substr(a+n.length)}):t.sort(),r>0&&(t=t.slice(r).concat(t.slice(0,r))),a=t,t.forEach(function(a,n){var s=i.div();s.innerHTML=a,t[n]=s.textContent.trim(),i.add(c,s),i.on(s,{down:function(){l=!0},up:function(){l=!1,e.focus=!0},tap:function(){e.value=s.textContent.trim(),i.removeClass(f,"list")}})}),t.length>0?i.addClass(f,"list"):i.removeClass(f,"list")}},m=o(function(){e.intl?(e.value[d.value]=v.value,n.fire(e,"value",e.value)):e.value=v.value},300);v.addEventListener("keyup",function(t){13==t.keyCode?(t.preventDefault(),t.stopPropagation(),i.hasClass(f,"list")?(i.removeClass(f,"list"),e.value=a[0]):!1!==e.valid&&(n.fire(e,"value",v.value),n.fire(e,"action",v.value))):27==t.keyCode?(i.removeClass(f,"list"),r=0,t.preventDefault(),t.stopPropagation()):40==t.keyCode&&i.hasClass(f,"list")?(r=(r+1)%a.length,h(),t.preventDefault(),t.stopPropagation()):38==t.keyCode&&i.hasClass(f,"list")?(r=(r+a.length-1)%a.length,h(),t.preventDefault(),t.stopPropagation()):(r=0,h(),m.fire())}),v.addEventListener("blur",function(){e.intl?(e.value[d.value]=v.value,n.fire(e,"value",e.value)):e.value=v.value,l||i.removeClass(f,"list"),i.addClass(p,"thm-ele2"),i.removeClass(p,"thm-ele4"),i.addClass(v,"thm-bg3"),i.removeClass(v,"thm-bgSL"),n.fire(e,"focus",!1)}),v.addEventListener("focus",function(){e.selectAll(),i.removeClass(p,"thm-ele2"),i.addClass(p,"thm-ele4"),i.removeClass(v,"thm-bg3"),i.addClass(v,"thm-bgSL"),n.fire(e,"focus",!0)}),v.addEventListener("keydown",function(t){}),this.validate()};r.prototype.validate=function(){var t=this.validator;if(t)try{this.valid=t(this.value)}catch(e){console.error("[wdg.text:validate] Exception = ",e),console.error("[wdg.text:validate] Validator = ",t)}},r.prototype.selectAll=function(){var t=this._input;return t.setSelectionRange(0,t.value.length),!0},e.exports=r,e.exports._=a});
//# sourceMappingURL=wdg.text.js.map