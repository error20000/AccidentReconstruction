
var Event = {
		trailChangePoint: function(){
			require(["dojo/Color","esri/Graphic"], 
					function (Color, Graphic) {
				on(dom.byId("btn"),"click", function () {
                    dom.byId("myDiv").innerHTML="div的内容被修改了";

                })

			});
		},
		trailChangeLine: function(){
			
		},
		trailChangeDash: function(){
			
		},
		trailChangeShape: function(){
			
		},
}