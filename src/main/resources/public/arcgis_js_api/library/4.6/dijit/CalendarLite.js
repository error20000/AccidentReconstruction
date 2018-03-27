//>>built
require({cache:{"url:dijit/templates/Calendar.html":'\x3cdiv class\x3d"dijitCalendarContainer dijitInline" role\x3d"presentation" aria-labelledby\x3d"${id}_mddb ${id}_year"\x3e\r\n\t\x3cdiv class\x3d"dijitReset dijitCalendarMonthContainer" role\x3d"presentation"\x3e\r\n\t\t\x3cdiv class\x3d\'dijitReset dijitCalendarArrow dijitCalendarDecrementArrow\' data-dojo-attach-point\x3d"decrementMonth"\x3e\r\n\t\t\t\x3cimg src\x3d"${_blankGif}" alt\x3d"" class\x3d"dijitCalendarIncrementControl dijitCalendarDecrease" role\x3d"presentation"/\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"decreaseArrowNode" class\x3d"dijitA11ySideArrow"\x3e-\x3c/span\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3cdiv class\x3d\'dijitReset dijitCalendarArrow dijitCalendarIncrementArrow\' data-dojo-attach-point\x3d"incrementMonth"\x3e\r\n\t\t\t\x3cimg src\x3d"${_blankGif}" alt\x3d"" class\x3d"dijitCalendarIncrementControl dijitCalendarIncrease" role\x3d"presentation"/\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"increaseArrowNode" class\x3d"dijitA11ySideArrow"\x3e+\x3c/span\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3cdiv data-dojo-attach-point\x3d"monthNode" class\x3d"dijitInline"\x3e\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\t\x3ctable cellspacing\x3d"0" cellpadding\x3d"0" role\x3d"grid" data-dojo-attach-point\x3d"gridNode"\x3e\r\n\t\t\x3cthead\x3e\r\n\t\t\t\x3ctr role\x3d"row"\x3e\r\n\t\t\t\t${!dayCellsHtml}\r\n\t\t\t\x3c/tr\x3e\r\n\t\t\x3c/thead\x3e\r\n\t\t\x3ctbody data-dojo-attach-point\x3d"dateRowsNode" data-dojo-attach-event\x3d"ondijitclick: _onDayClick" class\x3d"dijitReset dijitCalendarBodyContainer"\x3e\r\n\t\t\t\t${!dateRowsHtml}\r\n\t\t\x3c/tbody\x3e\r\n\t\x3c/table\x3e\r\n\t\x3cdiv class\x3d"dijitReset dijitCalendarYearContainer" role\x3d"presentation"\x3e\r\n\t\t\x3cdiv class\x3d"dijitCalendarYearLabel"\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"previousYearLabelNode" class\x3d"dijitInline dijitCalendarPreviousYear" role\x3d"button"\x3e\x3c/span\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"currentYearLabelNode" class\x3d"dijitInline dijitCalendarSelectedYear" role\x3d"button" id\x3d"${id}_year"\x3e\x3c/span\x3e\r\n\t\t\t\x3cspan data-dojo-attach-point\x3d"nextYearLabelNode" class\x3d"dijitInline dijitCalendarNextYear" role\x3d"button"\x3e\x3c/span\x3e\r\n\t\t\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/array dojo/_base/declare dojo/cldr/supplemental dojo/date dojo/date/locale dojo/date/stamp dojo/dom dojo/dom-class dojo/dom-attr dojo/_base/lang dojo/on dojo/sniff dojo/string ./_WidgetBase ./_TemplatedMixin dojo/text!./templates/Calendar.html ./a11yclick ./hccss".split(" "),function(c,k,n,v,p,w,x,q,y,h,z,r,t,u,A,B){var l=k("dijit.CalendarLite",[u,A],{templateString:B,dowTemplateString:'\x3cth class\x3d"dijitReset dijitCalendarDayLabelTemplate" role\x3d"columnheader" scope\x3d"col"\x3e\x3cspan class\x3d"dijitCalendarDayLabel"\x3e${d}\x3c/span\x3e\x3c/th\x3e',
dateTemplateString:'\x3ctd class\x3d"dijitReset" role\x3d"gridcell" data-dojo-attach-point\x3d"dateCells"\x3e\x3cspan class\x3d"dijitCalendarDateLabel" data-dojo-attach-point\x3d"dateLabels"\x3e\x3c/span\x3e\x3c/td\x3e',weekTemplateString:'\x3ctr class\x3d"dijitReset dijitCalendarWeekTemplate" role\x3d"row"\x3e${d}${d}${d}${d}${d}${d}${d}\x3c/tr\x3e',value:new Date(""),datePackage:"",dayWidth:"narrow",tabIndex:"0",dayOffset:-1,currentFocus:new Date,_setSummaryAttr:"gridNode",baseClass:"dijitCalendar dijitCalendarLite",
_isValidDate:function(a){return a&&!isNaN(a)&&"object"==typeof a&&a.toString()!=this.constructor.prototype.value.toString()},_getValueAttr:function(){var a=this._get("value");if(a&&!isNaN(a)){var b=new this.dateClassObj(a);b.setHours(0,0,0,0);b.getDate()<a.getDate()&&(b=this.dateModule.add(b,"hour",1));return b}return null},_setValueAttr:function(a,b){"string"==typeof a&&(a=w.fromISOString(a));a=this._patchDate(a);if(this._isValidDate(a)&&!this.isDisabledDate(a,this.lang)){if(this._set("value",a),
this.set("currentFocus",a),this._markSelectedDates([a]),this._created&&(b||"undefined"==typeof b))this.onChange(this.get("value"))}else this._set("value",null),this._markSelectedDates([])},_patchDate:function(a){if(a||0===a)a=new this.dateClassObj(a),a.setHours(1,0,0,0);return a},_setText:function(a,b){for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(a.ownerDocument.createTextNode(b))},_populateGrid:function(){var a=new this.dateClassObj(this.currentFocus);a.setDate(1);var a=this._patchDate(a),
b=a.getDay(),e=this.dateModule.getDaysInMonth(a),C=this.dateModule.getDaysInMonth(this.dateModule.add(a,"month",-1)),h=new this.dateClassObj,l=0<=this.dayOffset?this.dayOffset:n.getFirstDayOfWeek(this.lang);l>b&&(l-=7);if(!this.summary){var k=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,a);this.gridNode.setAttribute("summary",k[a.getMonth()])}this._date2cell={};c.forEach(this.dateCells,function(c,k){var g=k+l,f=new this.dateClassObj(a),d="dijitCalendar",m=0;g<b?(g=C-b+g+1,
m=-1,d+="Previous"):g>=b+e?(g=g-b-e+1,m=1,d+="Next"):(g=g-b+1,d+="Current");m&&(f=this.dateModule.add(f,"month",m));f.setDate(g);this.dateModule.compare(f,h,"date")||(d="dijitCalendarCurrentDate "+d);this.isDisabledDate(f,this.lang)?(d="dijitCalendarDisabledDate "+d,c.setAttribute("aria-disabled","true")):(d="dijitCalendarEnabledDate "+d,c.removeAttribute("aria-disabled"),c.setAttribute("aria-selected","false"));(m=this.getClassForDate(f,this.lang))&&(d=m+" "+d);c.className=d+"Month dijitCalendarDateTemplate";
d=f.valueOf();this._date2cell[d]=c;c.dijitDateValue=d;d=f.getDateLocalized?f.getDateLocalized(this.lang):f.getDate();this._setText(this.dateLabels[k],d);y.set(c,"aria-label",p.format(f,{selector:"date",formatLength:"long"}))},this)},_populateControls:function(){var a=new this.dateClassObj(this.currentFocus);a.setDate(1);this.monthWidget.set("month",a);var b=a.getFullYear()-1,e=new this.dateClassObj;c.forEach(["previous","current","next"],function(a){e.setFullYear(b++);this._setText(this[a+"YearLabelNode"],
this.dateLocaleModule.format(e,{selector:"year",locale:this.lang}))},this)},goToToday:function(){this.set("value",new this.dateClassObj)},constructor:function(a){this.dateModule=a.datePackage?h.getObject(a.datePackage,!1):v;this.dateClassObj=this.dateModule.Date||Date;this.dateLocaleModule=a.datePackage?h.getObject(a.datePackage+".locale",!1):p},_createMonthWidget:function(){return l._MonthWidget({id:this.id+"_mddb",lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode)},buildRendering:function(){var a=
this.dowTemplateString,b=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang),e=0<=this.dayOffset?this.dayOffset:n.getFirstDayOfWeek(this.lang);this.dayCellsHtml=t.substitute([a,a,a,a,a,a,a].join(""),{d:""},function(){return b[e++%7]});a=t.substitute(this.weekTemplateString,{d:this.dateTemplateString});this.dateRowsHtml=[a,a,a,a,a,a].join("");this.dateCells=[];this.dateLabels=[];this.inherited(arguments);x.setSelectable(this.domNode,!1);a=new this.dateClassObj(this.currentFocus);
this.monthWidget=this._createMonthWidget();this.set("currentFocus",a,!1)},postCreate:function(){this.inherited(arguments);this._connectControls()},_connectControls:function(){var a=h.hitch(this,function(a,e,c){this[a].dojoClick=!0;return z(this[a],"click",h.hitch(this,function(){this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus,e,c))}))});this.own(a("incrementMonth","month",1),a("decrementMonth","month",-1),a("nextYearLabelNode","year",1),a("previousYearLabelNode","year",-1))},_setCurrentFocusAttr:function(a,
b){var e=this.currentFocus,c=this._getNodeByDate(e);a=this._patchDate(a);this._set("currentFocus",a);this._date2cell&&0==this.dateModule.difference(e,a,"month")||(this._populateGrid(),this._populateControls(),this._markSelectedDates([this.value]));a=this._getNodeByDate(a);a.setAttribute("tabIndex",this.tabIndex);(this.focused||b)&&a.focus();c&&c!=a&&(r("webkit")?c.setAttribute("tabIndex","-1"):c.removeAttribute("tabIndex"))},focus:function(){this._setCurrentFocusAttr(this.currentFocus,!0)},_onDayClick:function(a){a.stopPropagation();
a.preventDefault();for(a=a.target;a&&!a.dijitDateValue&&0!==a.dijitDateValue;a=a.parentNode);a&&!q.contains(a,"dijitCalendarDisabledDate")&&this.set("value",a.dijitDateValue)},_getNodeByDate:function(a){return(a=this._patchDate(a))&&this._date2cell?this._date2cell[a.valueOf()]:null},_markSelectedDates:function(a){function b(a,b){q.toggle(b,"dijitCalendarSelectedDate",a);b.setAttribute("aria-selected",a?"true":"false")}c.forEach(this._selectedCells||[],h.partial(b,!1));this._selectedCells=c.filter(c.map(a,
this._getNodeByDate,this),function(a){return a});c.forEach(this._selectedCells,h.partial(b,!0))},onChange:function(){},isDisabledDate:function(){},getClassForDate:function(){}});l._MonthWidget=k("dijit.CalendarLite._MonthWidget",u,{_setMonthAttr:function(a){var b=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,a),e=6==r("ie")?"":"\x3cdiv class\x3d'dijitSpacer'\x3e"+c.map(b,function(a){return"\x3cdiv\x3e"+a+"\x3c/div\x3e"}).join("")+"\x3c/div\x3e";this.domNode.innerHTML=e+"\x3cdiv class\x3d'dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'\x3e"+
b[a.getMonth()]+"\x3c/div\x3e"}});return l});