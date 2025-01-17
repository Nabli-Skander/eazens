/*! shine.js - v0.2.6 - 2014-04-15
* http://bigspaceship.github.io/shine.js
* Copyright (c) 2014 Big Spaceship; Licensed MIT */

!function (a, b) {
    b.shinejs = a, Function.prototype.bind || (Function.prototype.bind = function (a) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1), c = this, d = function () {
        }, e = function () {
            return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        };
        return d.prototype = this.prototype, e.prototype = new d, e
    }), window.performance = window.performance || window.webkitPeformance || window.mozPeformance || {
        now: function () {
            return (new Date).getTime()
        }
    };
    var c, d;
    try {
        c = c || a || {}
    } catch (e) {
        c = {}
    }
    try {
        d = d || b || {}
    } catch (e) {
        d = {}
    }
    "undefined" != typeof define && define.amd && define([], function () {
        return c
    }), c.Color = function (a, b, c) {
        this.r = a || 0, this.g = b || 0, this.b = c || 0
    }, c.Color.colorFromHex = function (a) {
        var b = new c.Color;
        return b.parseHex(a), b
    }, c.Color.prototype.parseHex = function (a) {
        a = a.replace("#", "");
        var b = parseInt(a, 16);
        this.r = b >> 16 & 255, this.g = b >> 8 & 255, this.b = 255 & b
    }, c.Color.prototype.getRGBAString = function () {
        return "rgba(" + Math.round(this.r) + "," + Math.round(this.g) + "," + Math.round(this.b) + ", 1.0)"
    }, c.Config = function (a) {
        this.numSteps = 5, this.opacity = .15, this.opacityPow = 1.2, this.offset = .15, this.offsetPow = 1.8, this.blur = 40, this.blurPow = 1, this.shadowRGB = new c.Color(0, 0, 0), this.applyValues(a)
    }, c.Config.prototype.applyValues = function (a) {
        if (a) for (var b in this) b in a && (this[b] = a[b])
    }, c.Light = function (a) {
        this.position = a || new c.Point(0, 0), this.intensity = 1
    }, c.Point = function (a, b) {
        this.x = a || 0, this.y = b || 0
    }, c.Point.prototype.delta = function (a) {
        return new c.Point(a.x - this.x, a.y - this.y)
    }, c.Shadow = function (a) {
        this.position = new c.Point(0, 0), this.domElement = a, this.shadowProperty = "textShadow", this.fnHandleViewportUpdate = null, this.fnHandleWindowLoaded = this.handleWindowLoaded.bind(this), this.enableAutoUpdates(), this.handleViewportUpdate(), window.addEventListener("load", this.fnHandleWindowLoaded, !1)
    }, c.Shadow.prototype.destroy = function () {
        window.removeEventListener("load", this.fnHandleWindowLoaded, !1), this.disableAutoUpdates(), this.fnHandleWindowLoaded = null, this.domElement = null, this.position = null
    }, c.Shadow.prototype.draw = function (a, b) {
        var c = this.position.delta(a.position), d = Math.sqrt(c.x * c.x + c.y * c.y);
        d = Math.max(32, d);
        for (var e = [], f = 0; f < b.numSteps; f++) {
            var g = f / b.numSteps, h = Math.pow(g, b.opacityPow), i = Math.pow(g, b.offsetPow),
                j = Math.pow(g, b.blurPow), k = a.intensity * Math.max(0, b.opacity * (1 - h)), l = -b.offset * c.x * i,
                m = -b.offset * c.y * i, n = d * b.blur * j / 512, o = this.getShadow(b.shadowRGB, k, l, m, n);
            e.push(o)
        }
        this.drawShadows(e)
    }, c.Shadow.prototype.getShadow = function (a, b, c, d, e) {
        var f = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + b + ")";
        return f + " " + c + "px " + d + "px " + Math.round(e) + "px"
    }, c.Shadow.prototype.drawShadows = function (a) {
        this.domElement.style[this.shadowProperty] = a.join(", ")
    }, c.Shadow.prototype.enableAutoUpdates = function () {
        this.disableAutoUpdates();
        var a = this.fnHandleViewportUpdate = c.Timing.debounce(this.handleViewportUpdate, 1e3 / 15, this);
        document.addEventListener("resize", a, !1), window.addEventListener("resize", a, !1), window.addEventListener("scroll", a, !1)
    }, c.Shadow.prototype.disableAutoUpdates = function () {
        var a = this.fnHandleViewportUpdate;
        a && (this.fnHandleViewportUpdate = null, document.removeEventListener("resize", a, !1), window.removeEventListener("resize", a, !1), window.removeEventListener("scroll", a, !1))
    }, c.Shadow.prototype.handleViewportUpdate = function () {
        var a = this.domElement.getBoundingClientRect();
        this.position.x = a.left + .5 * a.width, this.position.y = a.top + .5 * a.height
    }, c.Shadow.prototype.handleWindowLoaded = function () {
        this.handleViewportUpdate()
    }, c.Splitter = function (a, b) {
        this.domElement = a, this.classPrefix = b || "", this.wrapperElement = document.createElement("div"), this.maskElement = document.createElement("div"), this.wordElements = [], this.elements = [], this.text = ""
    }, c.Splitter.prototype.split = function (a, b) {
        this.text = a || this.text, this.wordElements.length = 0, this.elements.length = 0, this.wrapperElement.className = this.classPrefix + "wrapper", this.wrapperElement.innerHTML = "", a && (this.domElement.textContent = this.text), b ? this.splitChildren(this.domElement, this.maskElement, this.wrapperElement, this.classPrefix) : this.splitText(this.domElement, this.maskElement, this.wrapperElement, this.classPrefix)
    }, c.Splitter.prototype.splitChildren = function (a, b, c, d) {
        for (var e = a.childNodes, f = 0; f < e.length; f++) {
            var g = e[f];
            1 === g.nodeType && (g.className += " " + d + "letter", c.appendChild(g), this.elements.push(g))
        }
        b.innerHTML = c.innerHTML, b.className = d + "mask", c.appendChild(b), a.innerHTML = "", a.appendChild(c)
    }, c.Splitter.prototype.splitText = function (a, b, c, d) {
        for (var e = a.textContent, f = e.length, g = null, h = 0; f > h; h++) {
            var i = e.charAt(h);
            if (g || (g = document.createElement("span"), g.className = d + "word", c.appendChild(g), this.wordElements.push(g)), i.match(/[\s]/)) {
                var j = document.createElement("span");
                j.className = d + "spacer", j.innerHTML = i, c.appendChild(j), g = null
            } else {
                var k = document.createElement("span");
                k.innerHTML = i, k.className = d + "letter", this.elements.push(k), g.appendChild(k), i.match(/[\W]/) && (g = null)
            }
        }
        b.innerHTML = c.innerHTML, b.className = d + "mask", c.appendChild(b), a.innerHTML = "", a.appendChild(c)
    }, c.StyleInjector = function () {
        this.injections = {}
    }, c.StyleInjector.instance_ = null, c.StyleInjector.getInstance = function () {
        return c.StyleInjector.instance_ || (c.StyleInjector.instance_ = new c.StyleInjector), c.StyleInjector.instance_
    }, c.StyleInjector.prototype.inject = function (a, b) {
        if (b = b || window.document, this.injections[a] !== b) {
            var c = document.createElement("style");
            c.type = "text/css", c.innerHTML = a;
            var d = b.getElementsByTagName("head")[0].firstChild;
            return b.getElementsByTagName("head")[0].insertBefore(c, d), this.injections[a] = b, c
        }
    }, c.Timing = function () {
    }, c.Timing.debounce = function (a, b, c) {
        var d = 0 / 0;
        return function () {
            b = b || 0, c = c || this;
            var e = arguments;
            isNaN(d) || clearTimeout(d), d = setTimeout(function () {
                a.apply(c, e)
            }, b)
        }
    }, c.Timing.throttle = function (a, b, c) {
        var d = 0 / 0, e = 0 / 0;
        return function () {
            b = b || 0, c = c || this;
            var f = window.performance.now(), g = arguments;
            !isNaN(d) && d + b > f ? (isNaN(e) || clearTimeout(e), e = setTimeout(function () {
                d = f, a.apply(c, g)
            }, b)) : (isNaN(e) || clearTimeout(e), d = f, a.apply(c, g))
        }
    }, c.Shine = function (a, b, d, e) {
        if (!a) throw new Error("No valid DOM element passed as first parameter");
        this.light = new c.Light, this.config = b || new c.Config, this.domElement = a, this.classPrefix = d || "shine-", this.shadowProperty = e || (this.elememtHasTextOnly(a) ? "textShadow" : "boxShadow"), this.shadows = [], this.splitter = new c.Splitter(a, this.classPrefix), this.areAutoUpdatesEnabled = !0, this.fnDrawHandler = null, this.updateContent()
    }, c.Shine.prototype.destroy = function () {
        this.disableAutoUpdates();
        for (var a = this.shadows.length - 1; a >= 0; a--) this.shadows[a].destroy();
        this.light = null, this.shadows = null, this.splitter = null, this.fnDrawHandler = null
    }, c.Shine.prototype.draw = function () {
        for (var a = this.shadows.length - 1; a >= 0; a--) this.shadows[a].draw(this.light, this.config)
    }, c.Shine.prototype.updateContent = function (a) {
        var b = this.areAutoUpdatesEnabled;
        this.disableAutoUpdates(), c.StyleInjector.getInstance().inject(this.getCSS()), this.shadows.length = 0, this.splitter.split(a, !a && !this.elememtHasTextOnly(this.domElement));
        for (var d = this.getPrefixed(this.shadowProperty), e = 0; e < this.splitter.elements.length; e++) {
            var f = this.splitter.elements[e], g = new c.Shadow(f);
            g.shadowProperty = d, this.shadows.push(g)
        }
        b && this.enableAutoUpdates(), this.draw()
    }, c.Shine.prototype.enableAutoUpdates = function () {
        this.disableAutoUpdates(), this.areAutoUpdatesEnabled = !0;
        var a = this.fnDrawHandler = this.draw.bind(this);
        window.addEventListener("scroll", a, !1), window.addEventListener("resize", a, !1);
        for (var b = this.shadows.length - 1; b >= 0; b--) {
            var c = this.shadows[b];
            c.enableAutoUpdates()
        }
    }, c.Shine.prototype.disableAutoUpdates = function () {
        this.areAutoUpdatesEnabled = !1;
        var a = this.fnDrawHandler;
        if (a) {
            this.fnDrawHandler = null, window.removeEventListener("scroll", a, !1), window.removeEventListener("resize", a, !1);
            for (var b = this.shadows.length - 1; b >= 0; b--) {
                var c = this.shadows[b];
                c.disableAutoUpdates()
            }
        }
    }, c.Shine.prototype.getCSS = function () {
        return "/* shine.js styles */.shine-wrapper { display: inline-block; position: relative; max-width: 100%;}.shine-word { display: inline-block; white-space: nowrap;}.shine-letter { position: relative; display: inline-block;}.shine-mask { position: absolute; top: 0; left: 0; right: 0; bottom: 0;}"
    }, c.Shine.prototype.getPrefixed = function (a) {
        for (var b = this.domElement || document.createElement("div"), c = b.style, d = ["webkit", "ms", "Moz", "Webkit", "O"], e = a.charAt(0).toUpperCase() + a.substring(1), f = 0; f < d.length; f++) {
            var g = d[f] + e;
            if (g in c) return g
        }
        return a
    }, c.Shine.prototype.isCSSPropertySupported = function (a, b) {
        var c = document.createElement("div"), d = c.style, e = ["-webkit-", "-ms-", "-moz-"];
        return d.cssText = e.join(a + ":" + b + ";"), !!d.length && (void 0 === document.documentMode || document.documentMode > 9)
    }, c.Shine.prototype.areFiltersSupported = function () {
        return this.isCSSPropertySupported("filter", "blur(2px)")
    }, c.Shine.prototype.elememtHasTextOnly = function (a) {
        var b = a.childNodes;
        if (!b || 0 === b.length) return !0;
        for (var c = 0; c < b.length; c++) if (3 !== b[c].nodeType) return !1;
        return !0
    }, d.Shine = d.Shine || c.Shine
}({}, function () {
    return this
}());
//# sourceMappingURL=shine.min.map
