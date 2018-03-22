/**
 * Created by Extra 
 * Description:实现拖拽绘制圆，仿百度缓冲区搜索样式
 * version: 1.0.0
 */
define("dextra/dijit/DrawDragCircle", [
        "require",
        "dojo/dom",
        "dojo/query",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/Evented",
        "dojo/on",
        "esri/graphic",
        "esri/layers/GraphicsLayer",
        "esri/Color",
        "esri/symbols/Font",
        "esri/geometry/Point",
        "esri/geometry/Circle",
        "esri/geometry/Polyline",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/TextSymbol",
        "esri/geometry/geometryEngine",
],
    function (require, dom, query, declare, lang, Evented, on,
              Graphic, GraphicsLayer,
              Color, Font, Point, Circle, Polyline, MarkerSymbol, PictureMarkerSymbol, LineSymbol, FillSymbol, TextSymbol, geometryEngine) {
        return declare(Evented, {
            declaredClass: "dextra.dijit.DrawDragCircle",
            defaults: {
                map: null,
                maxRadius: 5000,
                markerSymbol: new MarkerSymbol(MarkerSymbol.STYLE_SQUARE, 20,
                    new LineSymbol(LineSymbol.STYLE_SOLID,
                        new Color("#DC143C"), 2),
                    new Color("#FFA500")),
                dragButtonSymbol: new PictureMarkerSymbol({
                    "url": require.toUrl(Yunh.ImgFolderUrl + "select.png"),
                    "height": 21,
                    "width": 33
                }),
                lineSymbol: new LineSymbol(
                    LineSymbol.STYLE_SOLID,
                    new Color("#FFA500"), 2),
                fillSymbol: new FillSymbol(FillSymbol.STYLE_SOLID,
                    new LineSymbol(LineSymbol.STYLE_SOLID,
                        new Color([0, 155, 255, 0.55]), 2), new Color([0, 155, 255, 0.55])),
            },
            circleGraphic: null,
            circle: null,
            labelGraphic: null,
            dragGraphic: null,
            _measureLayer: null,
            _mapEvents: [],

            constructor: function (options) {
                declare.safeMixin(this.defaults, options);
                this._measureLayer = new GraphicsLayer();
                this.defaults.map.addLayer(this._measureLayer);
                this._initialMeasureLayer();

            },

            //初始化测量图层事件
            _initialMeasureLayer: function () {
                //开始拖拽绘制圆
                this._measureLayer.on("mouse-down", lang.hitch(this, function (evt) {
                    var graphic = evt.graphic;
                    if (graphic.symbol.type == "picturemarkersymbol") {
                        this.dragGraphic = graphic;
                        this.dragGraphic.isMouseDown = true;
                        this.defaults.map.disableMapNavigation();
                        graphic.getDojoShape().moveToFront();
                        this.defaults.map.setMapCursor("pointer");
                    }
                }));

                //提示可以拖拽
                this._measureLayer.on("mouse-over", lang.hitch(this, function (evt) {
                    var graphic = evt.graphic;
                    if (graphic.symbol.type == "picturemarkersymbol") {
                        this.defaults.map.setMapCursor("pointer");
                    }
                }));

                //恢复鼠标状态
                this._measureLayer.on("mouse-out", lang.hitch(this, function (evt) {
                    this.defaults.map.setMapCursor("default");
                }));
            },

            _initialMapEvents: function () {
                this._mapEvents = [];
                //拖拽绘制圆
                this._mapEvents.push(this.defaults.map.on("mouse-drag", lang.hitch(this, function (evt) {
                    if (this.dragGraphic != null && this.dragGraphic.isMouseDown) {
                        var dragGraphic = this.dragGraphic;
                        var dragPoint = evt.mapPoint;
                        if (this.centerPoint.y != dragPoint.y) {
                            dragPoint.setY(this.centerPoint.y);
                        }
                        var radius = this._calDistance(this.centerPoint, dragPoint);
                        if (radius <= this.defaults.maxRadius) {
                            this._measureLayer.remove(this.circleGraphic);
                            this.circle = this._createCircle(this.centerPoint, radius);
                            this.circleGraphic = new Graphic(this.circle, this.defaults.fillSymbol);
                            dragGraphic.setGeometry(dragPoint);

                            this.labelGraphic.setGeometry(dragPoint).setSymbol(this._createDistanceSymbol(radius))
                            this._measureLayer.add(this.circleGraphic);
                            this.circleGraphic.getDojoShape().moveToBack();
                            dragGraphic.getDojoShape().moveToFront();
                        }
                    }
                })));

                //触发"mouse-drag-end，通知拖拽结束
                this._mapEvents.push(this.defaults.map.on("mouse-drag-end", lang.hitch(this, function (evt) {
                    if (this.dragGraphic && this.dragGraphic.isMouseDown) {
                        this.emit("drag-end", { circle: this.circle });

                        this.dragGraphic.isMouseDown = false;
                        this.defaults.map.enableMapNavigation();
                        this.defaults.map.setMapCursor("default");
                    }
                })));
            },

            //取消上一次注册的map鼠标事件
            _unregistMapEvents: function () {
                for (var i = 0; i < this._mapEvents; i++) {
                    if (this._mapEvents[i]) {
                        this._mapEvents[i].remove();
                    }
                }
                this._mapEvents = [];
            },

            startDrawCircle: function (centerPoint) {
                this._unregistMapEvents();
                this.centerPoint = centerPoint;
                this.circle = this._createCircle(centerPoint, 500);
                var dragPoint = this._createDragBtnPoint(this.circle, centerPoint);

                this.circleGraphic = new Graphic(this.circle, this.defaults.fillSymbol);
                this.labelGraphic = new Graphic(dragPoint, this._createDistanceSymbol(500));
                var dragGraphic = new Graphic(dragPoint, this.defaults.dragButtonSymbol);

                this._measureLayer.add(this.circleGraphic);
                this._measureLayer.add(dragGraphic);
                this._measureLayer.add(this.labelGraphic);
                this._initialMapEvents();
            },

            removeCircle: function () {
                this.centerPoint = null;
                this.circleGraphic = null;
                this.labelGraphic = null;
                this._measureLayer.clear();
            },

            _createCircle: function (point, distance) {
                return new Circle(point, {
                    "radius": distance
                });
            },

            _createDragBtnPoint: function (geometry, center) {
                var extent = geometry.getExtent();
                var xmax = extent.xmax;
                return new Point([xmax, center.y], center.spatialReference)
            },

            _createDistanceSymbol: function (distance) {
                distance = distance.toFixed(0) + "m";
                var fontColor = new Color("#696969");
                var holoColor = new Color("#fff");
                var font = new Font("10pt", Font.STYLE_ITALIC, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Courier");
                var textSymbol = new TextSymbol(distance, font, fontColor);
                textSymbol.setOffset(10, 20).setHaloColor(holoColor).setHaloSize(2);
                textSymbol.setAlign(TextSymbol.ALIGN_MIDDLE);
                return textSymbol;
            },

            _calDistance: function (point1, point2) {
                var line = new Polyline(this.defaults.map.spatialReference);
                line.addPath([point1, point2]);
                return geometryEngine.distance(point1, point2, "meters");
            },
        });
    })