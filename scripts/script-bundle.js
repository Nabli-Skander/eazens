/*! Skrollex */
!function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                throw new Error("Cannot find module '" + g + "'")
            }
            var j = c[g] = {exports: {}};
            b[g][0].call(j.exports, function (a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, j, j.exports, a, b, c, d)
        }
        return c[g].exports
    }

    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (a, b) {
            var d = c("html").hasClass("poor-browser");
            return !Modernizr.cssanimations || d ? (c(".scroll-in-animation").removeClass("scroll-in-animation"), void c(".scroll-animation").removeClass("scroll-animation")) : (c(".safari i.scroll-in-animation").removeClass("scroll-in-animation"), c(".safari i.scroll-animation").removeClass("scroll-animation"), void a.find(".scroll-in-animation, .scroll-animation").each(function () {
                var a = c(this), d = a.data("delay"), e = a.data("animation") + " animated css-animation-show",
                    f = function () {
                        d ? setTimeout(function () {
                            a.removeClass(e)
                        }, d) : a.removeClass(e)
                    }, g = function () {
                        d ? setTimeout(function () {
                            a.addClass(e)
                        }, d) : a.addClass(e)
                    }, h = g;
                b.players.addPlayer(a, h, f, g)
            }))
        }
    }, {}],
    2: [function (a, b) {
        "use strict";
        var c = [];
        c.addPlayer = function (a, b, d, e) {
            c.push(new function () {
                var f = !1, g = !1;
                this.$view = a, a.addClass("player").data("player-ind", c.length), this.play = function () {
                    f || (f = !0, g ? e() : (g = !0, b()))
                }, this.pause = function () {
                    f && (f = !1, d())
                }
            })
        }, b.exports = c
    }, {}],
    3: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (b) {
            var d = this, e = (a("../tools/tools.js"), a("../app/scroll-animation.js")), f = c(window),
                g = (c("html").hasClass("poor-browser"), new e(d, b));
            this.windowTopPos = void 0, this.windowBottomPos = void 0, this.windowH = void 0, this.scroll = function (a) {
                d.windowH = f.height(), d.windowTopPos = a, d.windowBottomPos = a + d.windowH, d.windowTopPos < b.topNav.state1Top() ? b.topNav.state1() : b.topNav.state2(), g.scroll();
                for (var c = 0; c < b.players.length; c++) {
                    var e = d.calcPosition(b.players[c].$view);
                    e.visible ? b.players[c].play() : b.players[c].pause()
                }
            }, this.calcPosition = function (a) {
                var b = a.height(), c = a.data("position"), e = c + b;
                return {top: c, bottom: e, height: b, visible: c < d.windowBottomPos && e > d.windowTopPos}
            }
        }
    }, {"../app/scroll-animation.js": 7, "../tools/tools.js": 11}],
    4: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function () {
            var b = (a("../app/app-share.js"), c("html").hasClass("poor-browser")), d = 4e3, e = 12e3, f = {scale: 1},
                g = {scale: 1.1}, h = [[f, g], [g, f]],
                i = [{or: "left top", xr: 0, yr: 0}, {or: "left center", xr: 0, yr: 1}, {
                    or: "right top",
                    xr: 2,
                    yr: 0
                }, {or: "right center", xr: 2, yr: 1}], j = h.length - 1, k = i.length - 1,
                l = TWEEN.Easing.Quartic.InOut, m = TWEEN.Easing.Linear.None;
            this.run = function (a) {
                function f(b, n) {
                    var o = a.get(b), p = c(o), q = p.data(), r = Math.round(Math.random() * j),
                        s = Math.round(Math.random() * k), t = h[r];
                    q.ssScale = t[0].scale, q.ssOrig = i[s], q.ssOpacity = b !== g || n ? 1 : 0, b !== g || n || new TWEEN.Tween(q).to({ssOpacity: 1}, d).easing(l).onComplete(function () {
                        a.each(function () {
                            c(this).data().ssOpacity = 1
                        })
                    }).start(), new TWEEN.Tween(q).to({ssScale: t[1].scale}, e).easing(m).start(), b > 0 ? new TWEEN.Tween({ssOpacity: 1}).to({ssOpacity: 0}, d).onUpdate(function () {
                        q.ssOpacity = this.ssOpacity
                    }).easing(l).delay(e - d).onStart(function () {
                        f(b - 1)
                    }).start() : new TWEEN.Tween(q).to({}, 0).easing(l).delay(e - d).onStart(function () {
                        f(g)
                    }).start()
                }

                if (!b) {
                    var g = a.length - 1;
                    f(g, !0)
                }
            }
        }
    }, {"../app/app-share.js": 5}],
    5: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = new function () {
            var a = -1 != navigator.appVersion.indexOf("Windows NT 6.1") || -1 != navigator.appVersion.indexOf("Windows NT 6.0") || -1 != navigator.appVersion.indexOf("Windows NT 5.1") || -1 != navigator.appVersion.indexOf("Windows NT 5.0"),
                b = c("html").hasClass("ie9"), d = c("html").hasClass("ie10"), e = c("html").hasClass("ie11"),
                f = c("html").hasClass("poor-browser"), g = c("html").hasClass("mobile"), h = function () {
                    return b || d || e && a ? 0 : e ? -.15 : f ? 0 : -.25
                }();
            this.force3D = g ? !1 : !0, this.parallaxMargin = function (a, b, c) {
                var d = c - (0 === b ? 0 : a.topNav.state2H);
                return Math.round(h * d)
            }
        };
    }, {}],
    6: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = new function () {
            function b(a) {
                var b, c, d = a.get(0);
                if ("img" === d.tagName.toLowerCase()) b = d.width, c = d.height; else if (d.naturalWidth) b = d.naturalWidth, c = d.naturalHeight; else {
                    var e = a.width();
                    a.css({width: "", height: ""}), b = a.width(), c = a.height(), a.css({width: e})
                }
                return {w: b, h: c}
            }

            var d, e = a("./app-share.js"), f = a("./themes.js"), g = a("../animation/slide-show.js"), h = new g,
                i = c("html").hasClass("poor-browser"), j = c("html").hasClass("mobile"), k = 60,
                l = c("#top-nav, .page-border, #dot-scroll"), m = c("#top-nav"), n = m.data("state1-colors"),
                o = m.data("state2-colors"), p = c("body"), q = c(".view");
            this.prepare = function (a) {
                if ("file:" !== window.location.protocol || c("body").hasClass("example-page") || c('<div class="file-protocol-alert alert colors-d background-80 heading fade in">	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> Upload files to web server and open template from web server. If template is opened from local file system, some links, functions and examples may work incorrectly.</div>').appendTo("body"), e.force3D === !0 && c("html").addClass("force3d"), i) {
                    var b = c("body>.bg");
                    b.each(function (a) {
                        a === b.length - 1 ? c(this).css("display", "block") : c(this).remove()
                    }), c(".view").each(function () {
                        var a = c(this).children(".bg");
                        a.each(function (b) {
                            b === a.length - 1 ? c(this).css("display", "block") : c(this).remove()
                        })
                    })
                }
                if (j) {
                    var f = c("body>img.bg"), g = f.length > 0 ? f : c(".view>img.bg");
                    if (g.length > 0) {
                        var h = c(g[0]);
                        c(".view").each(function () {
                            var a = c(this), b = a.children("img.bg");
                            b.length < 1 && h.clone().prependTo(a)
                        })
                    }
                    c("body>img.bg").remove()
                }
                d = c(".bg"), a()
            }, this.setup = function (a) {
                function b(a) {
                    for (var b = 0; b < f.colors; b++) {
                        var c = "colors-" + String.fromCharCode(65 + b).toLowerCase();
                        if (a.hasClass(c)) return c
                    }
                }

                var d = function (a) {
                    var b = a.css("background-color");
                    return b.match(/#/i) || b.match(/rgb\(/i) || b.match(/rgba.*,0\)/i)
                };
                c(".view.section-header").each(function () {
                    var a = c(this), b = a.nextAll(".view").first().children(".content");
                    b.length > 0 && d(b) && a.children(".content").addClass("skew-bottom-right")
                }), c(".view.section-footer").each(function () {
                    var a = c(this), b = a.prevAll(".view").first().children(".content");
                    b.length > 0 && d(b) && a.children(".content").addClass("skew-top-right")
                }), q.find(".content").filter(".skew-top-right, .skew-top-left, .skew-bottom-left, .skew-bottom-right").each(function () {
                    var a = c(this), e = a.parent();
                    if (a.hasClass("skew-top-right") || a.hasClass("skew-top-left")) {
                        var f = e.prevAll(".view").first().children(".content");
                        if (f.length > 0 && d(f)) {
                            var g = a.hasClass("skew-top-right") ? 1 : 2;
                            c('<div class="skew skew-top-' + (1 === g ? "right" : "left") + '"></div>').appendTo(a).css({
                                position: "absolute",
                                top: "0px",
                                width: "0px",
                                height: "0px",
                                "border-top-width": 2 === g ? k + "px" : "0px",
                                "border-right-width": "2880px",
                                "border-bottom-width": 1 === g ? k + "px" : "0px",
                                "border-left-width": "0px",
                                "border-style": "solid solid solid dashed",
                                "border-bottom-color": "transparent",
                                "border-left-color": "transparent"
                            }).addClass(b(f))
                        }
                    }
                    if (a.hasClass("skew-bottom-left") || a.hasClass("skew-bottom-right")) {
                        var h = e.nextAll(".view").first().children(".content");
                        if (h.length > 0 && d(h)) {
                            var g = a.hasClass("skew-bottom-left") ? 1 : 2;
                            c('<div class="skew skew-bottom-' + (1 === g ? "left" : "right") + '"></div>').appendTo(a).css({
                                position: "absolute",
                                bottom: "0px",
                                width: "0px",
                                height: "0px",
                                "border-top-width": 1 === g ? k + "px" : "0px",
                                "border-right-width": "0px",
                                "border-bottom-width": 2 === g ? k + "px" : "0px",
                                "border-left-width": "2880px",
                                "border-style": "solid dashed solid solid",
                                "border-top-color": "transparent",
                                "border-right-color": "transparent"
                            }).addClass(b(h))
                        }
                    }
                }), a()
            }, this.ungated = function () {
                c("body, .view").each(function () {
                    var a = c(this).children(".bg");
                    a.length > 1 && h.run(a)
                })
            }, this.tick = function () {
                d.each(function () {
                    var a, b, d, f, g = c(this), h = g.data();
                    void 0 !== h.ssOpacity ? (a = h.ssOpacity, b = h.ssOrig.xr, d = h.ssOrig.yr, f = h.ssOrig.or) : (a = 1, b = 1, d = 1, f = "center center");
                    var i = h.normalX + h.zoomXDelta * b,
                        j = h.normalY + h.zoomYDelta * d + (void 0 !== h.parallaxY ? h.parallaxY : 0),
                        k = h.normalScale * (void 0 !== h.ssScale ? h.ssScale : 1);
                    g.css(Modernizr.csstransforms3d && e.force3D ? {
                        transform: "translate3d(" + i + "px, " + j + "px, 0px) scale(" + k + ", " + k + ")",
                        opacity: a,
                        "transform-origin": f + " 0px"
                    } : {
                        transform: "translate(" + i + "px, " + j + "px) scale(" + k + ", " + k + ")",
                        opacity: a,
                        "transform-origin": f
                    })
                })
            }, this.buildSizes = function (a) {
                function d(a, c, d, e) {
                    var f = b(a), g = d / c > f.w / f.h ? d / f.w : c / f.h, h = f.w * g, i = f.h * g,
                        j = (h - f.w) / 2, k = (i - f.h) / 2, l = Math.round((d - h) / 2), m = Math.round((e - i) / 2),
                        n = a.data();
                    n.normalScale = g, n.normalX = l, n.normalY = m, n.zoomXDelta = j, n.zoomYDelta = k
                }

                var f = c(window), g = f.height(), h = f.width(), i = c("#top-nav:visible"),
                    j = g - (i.length > 0 ? a.topNav.state2H : 0), k = c(".page-border.bottom:visible"),
                    l = k.length > 0 ? k.height() : 0;
                c(".full-size, .half-size, .one-third-size").each(function () {
                    var a = c(this), b = parseInt(a.css({"padding-top": ""}).css("padding-top").replace("px", "")),
                        d = parseInt(a.css({"padding-bottom": ""}).css("padding-bottom").replace("px", "")),
                        e = j - (k.length > 0 ? l : 0), f = Math.ceil(e / 2), g = Math.ceil(e / 3),
                        h = a.hasClass("full-size") ? e : a.hasClass("half-size") ? f : g;
                    a.css({
                        "padding-top": b + "px",
                        "padding-bottom": d + "px"
                    }), (a.hasClass("stretch-height") || a.hasClass("stretch-full-height")) && a.css({height: ""});
                    var i = a.height();
                    if (h > i) {
                        var m = h - i - b - d;
                        0 > m && (m = 0);
                        var n = Math.round(m / 2), o = m - n, p = b + n, q = d + o;
                        a.css({"padding-top": p + "px", "padding-bottom": q + "px"})
                    }
                }), c(".stretch-height").each(function () {
                    var a = c(this), b = a.parent(), d = b.find(".stretch-height");
                    d.css("height", ""), a.outerWidth() < b.innerWidth() && d.css("height", b.innerHeight() + "px")
                }), c(".stretch-full-height").each(function () {
                    var a = c(this), b = a.parent(), d = b.find(".stretch-full-height");
                    if (d.css("height", ""), a.outerWidth() < b.innerWidth()) {
                        var e = b.innerHeight(), f = e > g ? e : g;
                        d.css("height", f + "px")
                    }
                }), q.each(function (b) {
                    var f = c(this), h = f.find(".content"), i = h.find(".skew.skew-top-right, .skew.skew-top-left"),
                        j = h.find(".skew.skew-bottom-left, .skew.skew-bottom-right"), k = h.width() + "px";
                    j.css({"border-left-width": k}), i.css({"border-right-width": k});
                    var l = f.height(), m = f.width(), n = function () {
                        var c, d = -1 * l, f = 0, h = g - l, i = g, j = e.parallaxMargin(a, b, d),
                            k = e.parallaxMargin(a, b, f), m = e.parallaxMargin(a, b, h), n = e.parallaxMargin(a, b, i),
                            o = function (a, b) {
                                return b + (a > 0 ? 0 : a)
                            }, p = function (a, b) {
                                var c = a + l;
                                return -b - (g > c ? 0 : c - g)
                            }, q = 0;
                        return c = o(d, j), c > q && (q = c), c = o(f, k), c > q && (q = c), c = o(h, m), c > q && (q = c), c = o(i, n), c > q && (q = c), c = p(d, j), c > q && (q = c), c = p(f, k), c > q && (q = c), c = p(h, m), c > q && (q = c), c = p(i, n), c > q && (q = c), l + 2 * q
                    }();
                    f.children("img.bg").each(function () {
                        d(c(this), n, m, l)
                    }), f.data("position", f.offset().top)
                }), c("section").each(function () {
                    var a = c(this);
                    a.data("position", a.offset().top)
                }), c("body").children("img.bg").each(function () {
                    d(c(this), g, h, g)
                })
            }, this.changeSection = function (a, b) {
                var d = c(b), e = d.data("border-colors");
                e ? (l.removeClass(f.colorClasses), l.addClass(e)) : p.hasClass("state2") && o ? (l.removeClass(f.colorClasses), l.addClass(o)) : n && (l.removeClass(f.colorClasses), l.addClass(n))
            }
        };
    }, {"../animation/slide-show.js": 4, "./app-share.js": 5, "./themes.js": 8}],
    7: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (b, d) {
            var e = c(".view"), f = a("./app-share.js"), g = c("html").hasClass("poor-browser");
            this.scroll = function () {
                g || e.each(function (a) {
                    var e = c(this), g = b.calcPosition(e);
                    if (g.visible) {
                        var h = g.top - b.windowTopPos;
                        e.children(".bg:not(.static)").each(function () {
                            var b = c(this).data();
                            b.parallaxY = f.parallaxMargin(d, a, h)
                        })
                    }
                })
            }
        }
    }, {"./app-share.js": 5}],
    8: [function (a, b) {
        "use strict";
        b.exports = new function () {
            var a = this;
            this.options = {
                angie: {style: "theme-angie", bgSync: ["**/*.txt", "**/*"], videoSync: []},
                lynda: {style: "theme-lynda", bgSync: ["**/*.txt", "**/*"], videoSync: []},
                alice: {style: "theme-alice", bgSync: ["**/*.txt", "**/*"], videoSync: []},
                lucy: {style: "theme-lucy", bgSync: ["**/*.txt", "**/*"], videoSync: []},
                mary: {style: "theme-alice", bgSync: ["**/*.txt", "**/*"], videoSync: []},
                suzi: {style: "theme-suzi", bgSync: ["**/*.txt", "**/*"], videoSync: []},
                viki: {style: "theme-viki", bgSync: ["**/*.txt", "**/*"], videoSync: []},
                luiza: {style: "theme-luiza", bgSync: ["**/*.txt", "**/*"], videoSync: []}
            }, this.names = {}, this.colors = 8, this.colorClasses = function () {
                for (var b = "", c = 0; c < a.colors; c++) {
                    var d = 0 === c ? "" : " ";
                    b += d + "colors-" + String.fromCharCode(65 + c).toLowerCase()
                }
                return b
            }()
        };
    }, {}],
    9: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (b) {
            function d() {
                q.css({height: D.height() - parseInt(p.css("top").replace("px", "")) - 30 + "px"})
            }

            function e() {
                "custom" !== u.val() && (c('<option value="custom">Custom</option>').appendTo(u), u.val("custom"), c.cookie.json = !1, c.cookie("themeSelect", "custom", {path: C}), c.cookie.json = !0)
            }

            function f() {
                for (var a = 0; A > a; a++) g(String.fromCharCode(65 + a).toLowerCase());
                j('<span><span class="primary-color"></span></span>', ".primary-color", "color", "input.primary-bg", "primary-bg", n), j('<span><span class="out-primary"></span></span>', ".out-primary", "opacity", "input.primary-out", "primary-out", h, i), j('<span><span class="success-color"></span></span>', ".success-color", "color", "input.success-bg", "success-bg", n), j('<span><span class="out-success"></span></span>', ".out-success", "opacity", "input.success-out", "success-out", h, i), j('<span><span class="info-color"></span></span>', ".info-color", "color", "input.info-bg", "info-bg", n), j('<span><span class="out-info"></span></span>', ".out-info", "opacity", "input.info-out", "info-out", h, i), j('<span><span class="warning-color"></span></span>', ".warning-color", "color", "input.warning-bg", "warning-bg", n), j('<span><span class="out-warning"></span></span>', ".out-warning", "opacity", "input.warning-out", "warning-out", h, i), j('<span><span class="danger-color"></span></span>', ".danger-color", "color", "input.danger-bg", "danger-bg", n), j('<span><span class="out-danger"></span></span>', ".out-danger", "opacity", "input.danger-out", "danger-out", h, i)
            }

            function g(a) {
                j('<span class="colors-' + a + '"><span class="bg-color"></span></span>', ".bg-color", "color", "input." + a + "-bg", a + "-bg", n), j('<span class="colors-' + a + '"><span class="text"></span></span>', ".text", "color", "input." + a + "-text", a + "-text", n), j('<span class="colors-' + a + '"><span class="highlight"></span></span>', ".highlight", "color", "input." + a + "-highlight", a + "-highlight", n), j('<span class="colors-' + a + '"><span class="link"></span></span>', ".link", "color", "input." + a + "-link", a + "-link", n), j('<span class="colors-' + a + '"><span class="heading"></span></span>', ".heading", "color", "input." + a + "-heading", a + "-heading", n), j('<span class="colors-' + a + '"><span class="out"></span></span>', ".out", "opacity", "input." + a + "-out", a + "-out", h, i)
            }

            function h(a) {
                return Math.round(100 * (1 - a))
            }

            function i(a) {
                return Math.round(a)
            }

            function j(a, b, d, f, g, h) {
                var i = c('<span class="getter"></span>').appendTo("body");
                c(a).appendTo(i);
                var j = i.find(b).css(d);
                i.remove(), j && h && (j = h(j)), B.lessVars[g] = j;
                var k = q.find(f);
                if (k.val(j), "color" === d) k.minicolors({
                    control: c(this).attr("data-control") || "hue",
                    defaultValue: c(this).attr("data-defaultValue") || "",
                    inline: "true" === c(this).attr("data-inline"),
                    letterCase: c(this).attr("data-letterCase") || "lowercase",
                    opacity: !1,
                    position: c(this).attr("data-position") || "top left",
                    change: function (a) {
                        e(), B.lessVars[g] = a, l()
                    },
                    show: function () {
                        var a = k.parent(), b = a.children(".minicolors-panel"), d = b.outerHeight(!0),
                            e = b.outerWidth(!0), f = c(window), g = f.width(), h = f.height(), i = b.offset(),
                            j = i.left - c(document).scrollLeft(), l = i.top - c(document).scrollTop();
                        j + e > g && (j = g - e - 5), l + d > h && (l = h - d - 2), 0 > l && (l = 2), b.css({
                            position: "fixed",
                            left: j + "px",
                            top: l + "px"
                        })
                    },
                    hide: function () {
                        k.parent().children(".minicolors-panel").css({position: "", left: "", top: ""})
                    },
                    theme: "bootstrap"
                }); else {
                    var m;
                    k.change(function () {
                        var a = c(this), b = a.val();
                        m && clearTimeout(m), e(), B.lessVars[g] = b, l()
                    })
                }
            }

            function k() {
                if (!B.isShowPanel) return void p.hide();
                if (Object.keys(w.names).length > 0) for (var a in w.names) c('<option value="' + a + '">' + w.names[a] + "</option>").appendTo(u); else u.remove(), c('<a class="button" href="#">Reset</a>').appendTo(q.find(".themes")).click(function (a) {
                    a.preventDefault(), c.cookie.json = !1, c.cookie("themeSelect", "", {path: C}), c.cookie.json = !0, B.hide(), y.gate(function () {
                        location.reload()
                    })
                });
                c.cookie.json = !1;
                var b = c.cookie("themeSelect");
                if (c.cookie.json = !0, "custom" === b) e(); else if (b) u.val(b); else {
                    var d = c("#factory-theme");
                    if (d.length > 0 && "hidden" === d.css("visibility")) {
                        var f = w.options[d.html()].style;
                        u.val(f), c.cookie.json = !1, c.cookie("themeSelect", f, {path: C}), c.cookie.json = !0
                    }
                }
                u.change(function () {
                    c(".options .themes select option[value=custom]").remove();
                    var a = c(this).val();
                    c.cookie.json = !1, c.cookie("themeSelect", a, {path: C}), c.cookie.json = !0, B.hide(), y.gate(function () {
                        location.reload()
                    })
                }), p.css({left: -1 * s + "px"}), r.click(function (a) {
                    a.preventDefault(), p.hasClass("on") ? B.hide() : B.show()
                }), q.find(".save-custom-css").click(function (a) {
                    a.preventDefault();
                    var b = t.find(".content");
                    if (c.cookie("saveAsLess")) {
                        var d = '@import "theme.less";\r\n\r\n';
                        for (var e in B.lessVars) d = d + "@" + e + ": " + B.lessVars[e] + ";\r\n", b.text(d)
                    } else o || l(), b.text(o.replace(/(\r\n|\r|\n)/g, "\r\n"));
                    new TWEEN.Tween({autoAlpha: 0, x: -450}).to({autoAlpha: 1, x: 0}, 400).onUpdate(function () {
                        t.css({
                            opacity: this.autoAlpha,
                            visibility: this.autoAlpha > 0 ? "visible" : "hidden"
                        }), t.css(Modernizr.csstransforms3d && z.force3D ? {transform: "translate3d(" + this.x + "px, 0px, 0px)"} : {transform: "translate(" + this.x + "px, 0px)"})
                    }).easing(TWEEN.Easing.Quadratic.Out).start()
                }), t.find(".close-panel").click(function (a) {
                    a.preventDefault(), new TWEEN.Tween({autoAlpha: 1, x: 0}).to({
                        autoAlpha: 0,
                        x: -450
                    }, 400).onUpdate(function () {
                        t.css({
                            opacity: this.autoAlpha,
                            visibility: this.autoAlpha > 0 ? "visible" : "hidden"
                        }), t.css(Modernizr.csstransforms3d && z.force3D ? {transform: "translate3d(" + this.x + "px, 0px, 0px)"} : {transform: "translate(" + this.x + "px, 0px)"})
                    }).easing(TWEEN.Easing.Linear.None).start()
                }), x.selectTextarea(t.find("textarea"));
                var g = v.css("background-image");
                if (!g || "none" == g) {
                    var h = c("img.bg");
                    h.length > 0 && v.css({
                        "background-image": "url('" + h.get(0).src + "')",
                        "background-position": "center center",
                        "background-size": "cover"
                    })
                }
            }

            function l(a) {
                var b = atob(customLess);
                c.cookie("lessVars", B.lessVars, {path: C}), m(b, function (b) {
                    if (!a) {
                        var d = "edit-mode-styles";
                        o = b;
                        var e = c("#" + d);
                        e.length < 1 ? (c('<style type="text/css" id="' + d + '">\n' + b + "</style>").appendTo("head"), c("#custom-css").remove()) : e[0].innerHTML ? e[0].innerHTML = o : e[0].styleSheet.cssText = o
                    }
                })
            }

            function m(a, b) {
                less.render(a, {
                    currentDirectory: "styles/themes/",
                    filename: "styles/themes/theme-default.less",
                    entryPath: "styles/themes/",
                    rootpath: "styles/themes/styles/themes/",
                    rootFilename: "styles/themes/theme-default.less",
                    relativeUrls: !1,
                    useFileCache: B.lessVars || less.globalVars,
                    compress: !1,
                    modifyVars: B.lessVars,
                    globalVars: less.globalVars
                }, function (a, c) {
                    b(c.css)
                })
            }

            function n(a) {
                function b(a) {
                    if (isNaN(a)) return "00";
                    var b = parseInt(a).toString(16);
                    return 1 == b.length ? "0" + b : b
                }

                if (-1 === a.indexOf("rgb")) return a;
                var c = a.match(/[^0-9]*([0-9]*)[^0-9]*([0-9]*)[^0-9]*([0-9]*)[^0-9]*/i);
                return "#" + b(c[1]) + b(c[2]) + b(c[3])
            }

            var o, p, q, r, s, t, u, v, w = a("../app/themes.js"), x = a("../tools/tools.js"),
                y = a("../widgets/loading.js"), z = a("../app/app-share.js"), A = w.colors, B = this, C = "",
                D = c(window), E = !1;
            this.lessVars = {}, this.isShowPanel = function () {
                var a = x.getUrlParameter("customize");
                return void 0 === a ? a = c.cookie("customize") : c.cookie("customize", "yes", {path: C}), a && c("#top-nav").length > 0 ? !0 : !1
            }(), this.show = function () {
                setTimeout(function () {
                    if (!E) {
                        E = !0, l(!0), f();
                        var a = q.find(".options-gate");
                        a.css({opacity: 0}), setTimeout(function () {
                            a.css({visibility: "hidden"})
                        }, 1e3)
                    }
                }, 550), p.css({left: "0px"}), p.addClass("on")
            }, this.hide = function () {
                p.css({left: -1 * s + "px"}), p.removeClass("on")
            }, B.isShowPanel ? c('<div id="customize-panel"></div>').appendTo("body").load("customize/customize.html #customize-panel>*", function (a, e) {
                "success" !== e && "notmodified" !== e ? (c("#customize-panel").remove(), b.afterConfigure()) : c.getScript("customize/custom-less.js", function (a, e) {
                    if ("success" !== e && "notmodified" !== e) c("#customize-panel").remove(), b.afterConfigure(); else {
                        p = c("#customize-panel"), q = p.find(".options"), r = p.find(".toggle-button"), s = q.width(), t = p.find(".custom-css"), u = q.find(".themes select"), v = q.find(".colors"), c.cookie.json = !0, k(), x.getUrlParameter("save-as-less") && c.cookie("saveAsLess", "yes", {path: C}), c.cookie.json = !1;
                        var g = c.cookie("themeSelect");
                        c.cookie.json = !0, "custom" === g && (E = !0, B.lessVars = c.cookie("lessVars"), l(), f(), q.find(".options-gate").css({visibility: "hidden"})), D.resize(d), d(), b.afterConfigure()
                    }
                })
            }) : b.afterConfigure()
        }
    }, {"../app/app-share.js": 5, "../app/themes.js": 8, "../tools/tools.js": 11, "../widgets/loading.js": 18}],
    10: [function (require, module, exports) {
        "use strict";
        var $ = jQuery;
        $(function () {
            !new function () {
                function onBodyHeightResize() {
                    buildSizes(), scrolling.scroll(tools.windowYOffset()), calcNavigationLinkTriggers()
                }

                function widgets($context) {
                    new ShowList($context, me), new Sliders($context), isMobile || $context.find(".hover-dir").each(function () {
                        $(this).hoverdir({speed: 300})
                    }), $context.find("a").click(function (a) {
                        var b = $(this);
                        b.data("toggle") || navigate(this.href, this.hash, a, b)
                    }), fluid.setup($context), new Map($context), new Counter($context, me), new ChangeColors($context), new Skillbar($context, me), $context.find("input,select,textarea").not("[type=submit]").jqBootstrapValidation(), new AjaxForm($context), new CssAnimation($context, me), $(".widget-tabs a").click(function (a) {
                        a.preventDefault(), $(this).tab("show")
                    }), $(".widget-tooltip").tooltip(), $(".widget-popover").popover(), $context.find("video").each(function () {
                        void 0 !== $(this).attr("muted") && (this.muted = !0)
                    }), $context.find(".open-overlay-window").each(function () {
                        var a = $(this), b = $(a.data("overlay-window")), c = new OverlayWindow(b);
                        a.click(function (a) {
                            a.preventDefault(), c.show()
                        })
                    }), isPoorBrowser ? $context.find(".tlt-loop").remove() : $context.find(".textillate").each(function () {
                        var $tlt = $(this);
                        $tlt.textillate(eval("(" + $tlt.data("textillate-options") + ")"))
                    })
                }

                function unwidgets(a) {
                    new Sliders(a, !0), a.find(".player").each(function () {
                        var a = $(this).data("player-ind");
                        me.players[a].pause(), me.players.splice(a, 1)
                    })
                }

                function navigate(a, b, c, d) {
                    var e = b ? a.replace(new RegExp(b + "$"), "") : a;
                    if (location === e && b && -1 === b.indexOf("!")) {
                        var f = $(b);
                        if (c && c.preventDefault(), f.length > 0) {
                            var g = f.offset().top - me.topNav.state2H, h = f.get(0).tagName.toLowerCase();
                            ("h1" === h || "h2" === h || "h3" === h || "h4" === h || "h5" === h || "h6" === h) && (g -= 20), 0 > g && (g = 0), tools.scrollTo(g)
                        } else tools.scrollTo(0)
                    } else if (c && a !== location + "#" && !d.attr("target")) {
                        var i = function () {
                            c.preventDefault(), me.topNav.state1(), loading.gate(function () {
                                window.location = a
                            })
                        };
                        d.hasClass("page-transition") ? i() : $pageTransition.each(function () {
                            var a = $(this).get(0);
                            $.contains(a, d[0]) && i()
                        })
                    }
                }

                function calcNavigationLinkTriggers() {
                    var a = $window.height(), b = a / 3;
                    sectionTriggers = [], $sections.each(function () {
                        var a = $(this), c = a.attr("id");
                        c && sectionTriggers.push({hash: "#" + c, triggerOffset: a.data("position") - b})
                    }), trigNavigationLinks(tools.windowYOffset())
                }

                function trigNavigationLinks(a) {
                    for (var b, c = 0; c < sectionTriggers.length; c++) sectionTriggers[c].triggerOffset < a && (b = sectionTriggers[c].hash);
                    if (b != lastActiveSectionHash) {
                        var d = location + b;
                        lastActiveSectionHash = b, $navLinks.each(function () {
                            var a = $(this);
                            this.href === d ? (a.addClass("active"), a.removeClass("target")) : a.removeClass("active")
                        }), app.changeSection(me, b)
                    }
                }

                function buildSizes() {
                    app.buildSizes(me), maxScrollPosition = $("body").height() - $window.height();
                    for (var a = 0; a < me.players.length; a++) {
                        var b = me.players[a].$view;
                        b.data("position", b.offset().top)
                    }
                }

                var Customize = require("./customize/customize.js"), TopNav = require("./widgets/top-nav.js"),
                    MenuToggle = require("./widgets/menu-toggle.js"), Players = require("./animation/players.js"),
                    Scrolling = require("./animation/scrolling.js"), tools = require("./tools/tools.js"),
                    ShowList = require("./widgets/show-list.js"), Gallery = require("./widgets/gallery.js"),
                    fluid = require("./widgets/fluid.js"), Counter = require("./widgets/counter.js"),
                    ChangeColors = require("./widgets/change-colors.js"), Sliders = require("./widgets/sliders.js"),
                    loading = require("./widgets/loading.js"), CssAnimation = require("./animation/css-animation.js"),
                    dotScroll = require("./widgets/dot-scroll.js"), Map = require("./widgets/map.js"),
                    Skillbar = require("./widgets/skillbar.js"), AjaxForm = require("./widgets/ajax-form.js"),
                    YoutubeBG = require("./widgets/youtube-bg.js"), VimeoBG = require("./widgets/vimeo-bg.js"),
                    VideoBG = require("./widgets/video-bg.js"), app = require("./app/app.js"),
                    OverlayWindow = require("./widgets/overlay-window.js"),
                    isPoorBrowser = $("html").hasClass("poor-browser"),
                    isAndroid43minus = $("html").hasClass("android-browser-4_3minus"),
                    $pageTransition = $(".page-transition"), me = this, $window = $(window), $sections = $("section"),
                    sectionTriggers = [], lastActiveSectionHash,
                    location = document.location.hash ? document.location.href.replace(new RegExp(document.location.hash + "$"), "") : document.location.href.replace("#", ""),
                    $navLinks = function () {
                        var a = jQuery();
                        return $("#top-nav .navbar-nav a").each(function () {
                            var b = $(this);
                            (!this.hash || this.href === location + this.hash && $("section" + this.hash).length > 0) && (a = a.add(b))
                        }), a
                    }(), isMobile = $("html").hasClass("mobile"), scrolling, maxScrollPosition,
                    ticker = new function () {
                        var a = this;
                        window.requestAnimFrame = function () {
                            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
                                window.setTimeout(a, 1e3 / 60)
                            }
                        }();
                        var b = -1;
                        this.pageIsReady = !1, function c() {
                            if (a.pageIsReady) {
                                var d = tools.windowYOffset();
                                b !== d && (scrolling.scroll(d), trigNavigationLinks(d)), b = d, TWEEN.update(), app.tick()
                            }
                            loading.queue.length > 0 && loading.queue.pop()(), requestAnimFrame(c)
                        }()
                    };
                this.topNav = void 0, this.players = Players, this.afterConfigure = function () {
                    var a = window.location.hash;
                    history && history.replaceState && history.replaceState("", document.title, window.location.pathname + window.location.search), new YoutubeBG, new VimeoBG, new VideoBG, app.prepare(function () {
                        loading.load(function () {
                            $navLinks = $navLinks.add(dotScroll.links()).click(function () {
                                $navLinks.removeClass("target"), $(this).addClass("target")
                            }), me.topNav = new TopNav, new MenuToggle, scrolling = new Scrolling(me), widgets($("body")), new Gallery(onBodyHeightResize, widgets, unwidgets);
                            var b = $window.width(), c = $window.height();
                            $window.resize(function () {
                                var a = $window.width(), d = $window.height();
                                (a !== b || d !== c) && (b = a, c = d, fluid.setup($("body")), onBodyHeightResize())
                            }), app.setup(function () {
                                var b = function () {
                                    buildSizes(), calcNavigationLinkTriggers(), ticker.pageIsReady = !0, $navLinks.each(function () {
                                        this.href == location && $(this).addClass("active")
                                    }), $(".bigtext").each(function () {
                                        $(this).bigtext()
                                    }), app.ungated(), setTimeout(function () {
                                        loading.ungate(), navigate(window.location.href, a)
                                    })
                                }, c = function () {
                                    for (var a = $(".non-preloading, .non-preloading img"), d = $("img").not(a), e = 0; e < d.length; e++) if (!(d[e].width && d[e].height || d[e].naturalWidth && d[e].naturalHeight)) return void setTimeout(c, 100);
                                    b()
                                };
                                c()
                            })
                        })
                    })
                };
                var animEnd = function (a, b, c, d, e) {
                    var f = 100, g = 1e3;
                    return a.each(function () {
                        var a = this;
                        if (c && !isAndroid43minus) {
                            var h = !1;
                            if ($(a).bind(b, function () {
                                return h = !0, $(a).unbind(b), d.call(a)
                            }), e >= 0 || void 0 === e) {
                                var i = void 0 === e ? 1e3 : g + f;
                                setTimeout(function () {
                                    h || ($(a).unbind(b), d.call(a))
                                }, i)
                            }
                        } else d.call(a)
                    })
                };
                $.fn.animationEnd = function (a, b) {
                    return animEnd(this, tools.animationEnd, Modernizr.cssanimations, a, b)
                }, $.fn.transitionEnd = function (a, b) {
                    return animEnd(this, tools.transitionEnd, Modernizr.csstransitions, a, b)
                }, $.fn.stopTransition = function () {
                    return this.css({
                        "-webkit-transition": "none",
                        "-moz-transition": "none",
                        "-ms-transition": "none",
                        "-o-transition": "none",
                        transition: "none"
                    })
                }, $.fn.cleanTransition = function () {
                    return this.css({
                        "-webkit-transition": "",
                        "-moz-transition": "",
                        "-ms-transition": "",
                        "-o-transition": "",
                        transition: ""
                    })
                }, $.fn.nonTransition = function (a) {
                    return this.stopTransition().css(a).cleanTransition()
                }, $.fn.transform = function (a, b) {
                    return this.css(tools.transformCss(a, b))
                }, $("video").each(function () {
                    void 0 !== $(this).attr("muted") && (this.muted = !0)
                }), new Customize(me)
            };
        })
    }, {
        "./animation/css-animation.js": 1,
        "./animation/players.js": 2,
        "./animation/scrolling.js": 3,
        "./app/app.js": 6,
        "./customize/customize.js": 9,
        "./tools/tools.js": 11,
        "./widgets/ajax-form.js": 12,
        "./widgets/change-colors.js": 13,
        "./widgets/counter.js": 14,
        "./widgets/dot-scroll.js": 15,
        "./widgets/fluid.js": 16,
        "./widgets/gallery.js": 17,
        "./widgets/loading.js": 18,
        "./widgets/map.js": 19,
        "./widgets/menu-toggle.js": 20,
        "./widgets/overlay-window.js": 21,
        "./widgets/show-list.js": 22,
        "./widgets/skillbar.js": 23,
        "./widgets/sliders.js": 24,
        "./widgets/top-nav.js": 25,
        "./widgets/video-bg.js": 26,
        "./widgets/vimeo-bg.js": 27,
        "./widgets/youtube-bg.js": 28
    }],
    11: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = new function () {
            var b = this, d = (a("../script.js"), c("html").hasClass("android-browser-4_3minus"));
            this.animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", this.transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend", this.transition = ["-webkit-transition", "-moz-transition", "-ms-transition", "-o-transition", "transition"], this.transform = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"], this.property = function (a, b, c) {
                for (var d = c ? c : {}, e = 0; e < a.length; e++) d[a[e]] = b;
                return d
            }, this.windowYOffset = function () {
                return null != window.pageYOffset ? window.pageYOffset : "CSS1Compat" === document.compatMode ? document.documentElement.scrollTop : document.body.scrollTop
            }, this.getUrlParameter = function (a) {
                for (var b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
                    var e = c[d].split("=");
                    if (e[0] == a) return decodeURI(e[1])
                }
            }, this.selectTextarea = function (a) {
                a.focus(function () {
                    var a = c(this);
                    a.select(), a.mouseup(function () {
                        return a.unbind("mouseup"), !1
                    })
                })
            };
            var e;
            this.time = function (a) {
                if (e) {
                    var b = Date.now();
                    console.log("==== " + (b - e) + " ms" + (a ? " | " + a : "")), e = b
                } else e = Date.now(), console.log("==== Timer started" + (a ? " | " + a : ""))
            }, this.scrollTo = function (a, c, d) {
                void 0 === d && (d = 1200), new TWEEN.Tween({y: b.windowYOffset()}).to({y: Math.round(a)}, d).onUpdate(function () {
                    window.scrollTo(0, this.y)
                }).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function () {
                    c && c()
                }).start()
            }, this.androidStylesFix = function (a) {
                d && (a.hide(), a.get(0).offsetHeight, a.show())
            }, this.transformCss = function (a, b) {
                var c = {
                    "-webkit-transform": a,
                    "-moz-transform": a,
                    "-ms-transform": a,
                    "-o-transform": a,
                    transform: a
                };
                return b && (c["-webkit-transform-origin"] = b, c["-moz-transform-origin"] = b, c["-ms-transform-origin"] = b, c["-o-transform-origin"] = b, c["transform-origin"] = b), c
            }
        };
    }, {"../script.js": 10}],
    12: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (b) {
            var d = a("./loading.js"), e = c(".gate .loader");
            b.find(".ajax-form").each(function () {
                var a = c(this);
                a.submit(function (b) {
                    a.find(".help-block ul").length < 1 && (e.addClass("show"), d.gate(function () {
                        var b = function (b) {
                            c('<div class="ajax-form-alert alert heading fade in text-center">	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> ' + b + "</div>").addClass(a.data("message-class")).appendTo("body"), d.ungate(), e.removeClass("show")
                        };
                        c.ajax({
                            type: a.attr("method"),
                            url: a.attr("action"),
                            data: a.serialize(),
                            success: function (c) {
                                a[0].reset(), b(c)
                            },
                            error: function (a) {
                                b("Error: " + a.responseCode)
                            }
                        })
                    }), b.preventDefault())
                })
            })
        }
    }, {"./loading.js": 18}],
    13: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (b) {
            var d = a("../app/themes.js");
            b.find(".change-colors").each(function () {
                for (var a, b = c(this), e = c(b.data("target")), f = b.find("a"), g = 0; g < d.colors; g++) {
                    var h = "colors-" + String.fromCharCode(65 + g).toLowerCase();
                    e.hasClass(h) && (a = h, f.each(function () {
                        var b = c(this);
                        b.data("colors") === a && b.addClass("active")
                    }))
                }
                f.click(function (b) {
                    b.preventDefault();
                    var d = c(this);
                    e.removeClass(a), a = d.data("colors"), e.addClass(a), f.removeClass("active"), d.addClass("active")
                })
            })
        }
    }, {"../app/themes.js": 8}],
    14: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (a, b) {
            var d = c("html").hasClass("poor-browser");
            d || a.find(".counter .count").each(function () {
                var a = c(this), d = parseInt(a.text()), e = {n: 0},
                    f = new TWEEN.Tween(e).to({n: d}, 1e3).onUpdate(function () {
                        a.text(Math.round(this.n))
                    }).easing(TWEEN.Easing.Quartic.InOut), g = function () {
                        f.stop()
                    }, h = function () {
                        e.n = 0, f.start()
                    }, i = h;
                b.players.addPlayer(a, i, g, h)
            })
        }
    }, {}],
    15: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = new function () {
            var a, b = c("html").hasClass("mobile"), d = c("body>section[id]");
            if (!b && d.length > 1) {
                var e = c("#dot-scroll");
                d.each(function () {
                    e.append('<li><a href="#' + c(this).attr("id") + '"><span></span></a></li>')
                }), a = e.find("a")
            } else a = jQuery();
            this.links = function () {
                return a
            }
        };
    }, {}],
    16: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = new function () {
            this.setup = function (a) {
                a.find(".fluid *").each(function () {
                    var a = c(this), b = a.parent(".fluid"), d = b.width(), e = a.attr("data-aspect-ratio");
                    e || (e = this.height / this.width, a.attr("data-aspect-ratio", e).removeAttr("height").removeAttr("width"));
                    var f = Math.round(d * e);
                    a.width(Math.round(d)).height(f), b.height(f)
                })
            }
        };
    }, {}],
    17: [function (require, module, exports) {
        "use strict";
        var $ = jQuery;
        module.exports = function (onBodyHeightResize, widgets, unwidgets) {
            var tools = require("../tools/tools.js"), OverlayWindow = require("./overlay-window.js"),
                $topNav = $("#top-nav");
            $(".gallery").each(function (i) {
                function openItem(a) {
                    $currentItem = a;
                    var b = a.children("a")[0].hash.replace("#!", "");
                    overlayWindow.show(b + " .item-content")
                }

                var $gallery = $(this), $overlay = $($gallery.data("overlay")),
                    overlayWindow = new OverlayWindow($overlay, widgets, unwidgets),
                    $overlayNext = $overlay.find(".next"), $overlayPrevios = $overlay.find(".previos"),
                    $overlayClose = $overlay.find(".cross"), isFilter = !1,
                    defaultGroup = $gallery.data("default-group") ? $gallery.data("default-group") : "all",
                    isNonFirstLayout = !1;
                defaultGroup || (defaultGroup = "all");
                var $grid = $gallery.find(".grid").shuffle({
                        group: defaultGroup,
                        speed: 500
                    }).on("filter.shuffle", function () {
                        isFilter = !0
                    }).on("layout.shuffle", function () {
                        isNonFirstLayout ? onBodyHeightResize(!0) : (onBodyHeightResize(), isNonFirstLayout = !0)
                    }).on("filtered.shuffle", function () {
                        isFilter && (isFilter = !1)
                    }), $btns = $gallery.find(".filter a"), $itemView = $gallery.find(".item-view"),
                    $all = $gallery.find(".filter a[data-group=all]"), $items = $grid.find(".item"),
                    currentGroup = defaultGroup, $currentItem;
                $gallery.find(".filter a[data-group=" + defaultGroup + "]").addClass("active"), $items.addClass("on"), $overlayClose.click(function () {
                    $currentItem = !1
                }), $btns.click(function (e) {
                    if (e.preventDefault(), !isFilter) {
                        var $this = $(this), isActive = $this.hasClass("active"),
                            group = isActive ? "all" : $this.data("group");
                        currentGroup !== group && (currentGroup = group, $btns.removeClass("active"), isActive ? $all.addClass("active") : $this.addClass("active"), $grid.shuffle("shuffle", group), $items.each(function () {
                            var $i = $(this), filter = eval($i.data("groups"));
                            "all" == group || -1 != $.inArray(group, filter) ? $i.addClass("on") : $i.removeClass("on")
                        }))
                    }
                }), $items.click(function (a) {
                    a.preventDefault(), openItem($(this))
                }), $overlayNext.click(function (a) {
                    if ($currentItem) {
                        a.preventDefault();
                        var b = $currentItem.nextAll(".on").first();
                        b.length < 1 && (b = $items.filter(".on").first()), openItem(b)
                    }
                }), $overlayPrevios.click(function (a) {
                    if ($currentItem) {
                        a.preventDefault();
                        var b = $currentItem.prevAll(".on").first();
                        b.length < 1 && (b = $items.filter(".on").last()), openItem(b)
                    }
                })
            })
        }
    }, {"../tools/tools.js": 11, "./overlay-window.js": 21}],
    18: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = new function () {
            var b = a("../tools/tools.js"), d = c(".gate"), e = d.find(".gate-bar"), f = d.find(".loader"),
                g = c("html").hasClass("android-browser-4_3minus"), h = this;
            this.queue = [], this.load = function (a) {
                var b = [], g = c(".non-preloading, .non-preloading img");
                c("*:visible:not(script)").not(g).each(function () {
                    var a = c(this), d = a[0].nodeName.toLowerCase(), e = a.css("background-image"), f = a.attr("src"),
                        g = a.data("loading");
                    if (g) b.push(g); else if ("img" === d && f && -1 === c.inArray(f, b)) b.push(f); else if ("none" != e) {
                        var h = e.match(/url\(['"]?([^'")]*)/i);
                        h && h.length > 1 && -1 === c.inArray(h[1], b) && b.push(h[1])
                    }
                });
                var i = 0;
                if (0 === b.length) a(); else {
                    f.addClass("show");
                    for (var j = 0, k = function () {
                        i++, j = i / b.length * 100, e.css({width: j + "%"}), i === b.length && (d.length < 1 ? a() : f.transitionEnd(function () {
                            f.removeClass("hided"), a()
                        }, 200).addClass("hided").removeClass("show"))
                    }, l = 0; l < b.length; l++) if ("function" == typeof b[l]) b[l](k); else {
                        var m = new Image;
                        c(m).one("load", function () {
                            h.queue.push(k)
                        }), m.src = b[l]
                    }
                }
            }, this.gate = function (a) {
                e.css({width: "0%"}), d.transitionEnd(function () {
                    a && a()
                }).css({opacity: 1, visibility: "visible"})
            }, this.ungate = function (a) {
                d.transitionEnd(function () {
                    g && b.androidStylesFix(c("body")), a && a()
                }).css({opacity: 0, visibility: "hidden"})
            }
        };
    }, {"../tools/tools.js": 11}],
    19: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (b) {
            var d = (a("../tools/tools.js"), a("./overlay-window.js"));
            "undefined" != typeof google && b.find(".map-open").each(function () {
                var a = c(this), b = c(a.data("map-overlay")), e = b.find(".map-canvas"), f = {
                    center: new google.maps.LatLng(e.data("latitude"), e.data("longitude")),
                    zoom: e.data("zoom"),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }, g = [];
                e.find(".map-marker").each(function () {
                    var a = c(this);
                    g.push({latitude: a.data("latitude"), longitude: a.data("longitude"), text: a.data("text")})
                }), e.addClass("close-map").wrap('<div class="map-view"></div>');
                var h = e.parent(), i = new d(b, !1, !1, function () {
                    new TWEEN.Tween({autoAlpha: 1}).to({autoAlpha: 0}, 500).onUpdate(function () {
                        h.css({opacity: this.autoAlpha, visibility: this.autoAlpha > 0 ? "visible" : "hidden"})
                    }).easing(TWEEN.Easing.Linear.None).start()
                }), j = !1;
                a.click(function (a) {
                    a.preventDefault(), i.show(!1, function () {
                        if (!j) {
                            j = !0;
                            for (var a = new google.maps.Map(e[0], f), d = function (b, c) {
                                var d = new google.maps.InfoWindow({content: c});
                                google.maps.event.addListener(b, "click", function () {
                                    d.open(a, b)
                                })
                            }, i = 0; i < g.length; i++) {
                                var k = new google.maps.Marker({
                                    map: a,
                                    position: new google.maps.LatLng(g[i].latitude, g[i].longitude)
                                }), l = g[i].text;
                                l && d(k, l)
                            }
                        }
                        var m = b.find(".overlay-control");
                        h.css({height: c(window).height() - m.height() + "px"}), new TWEEN.Tween({autoAlpha: 0}).to({autoAlpha: 1}, 500).onUpdate(function () {
                            h.css({opacity: this.autoAlpha, visibility: this.autoAlpha > 0 ? "visible" : "hidden"})
                        }).easing(TWEEN.Easing.Linear.None).start()
                    })
                })
            })
        }
    }, {"../tools/tools.js": 11, "./overlay-window.js": 21}],
    20: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function () {
            var a = c(".menu-toggle");
            a.click(function (a) {
                a.preventDefault();
                var b = c(this);
                if (b.hasClass("ext-nav-toggle")) {
                    var d = b.data("target"), e = c(d), f = c(d + ",#top-nav a:not(.menu-toggle),.page-border a"),
                        g = function () {
                            e.removeClass("show"), b.removeClass("show"), c("body").removeClass("ext-nav-show"), c("html, body").css({
                                overflow: "",
                                position: ""
                            }), f.unbind("click", g)
                        };
                    b.hasClass("show") ? (e.removeClass("show"), b.removeClass("show"), c("body").removeClass("ext-nav-show"), f.unbind("click", g)) : (e.addClass("show"), b.addClass("show"), c("body").addClass("ext-nav-show"), f.bind("click", g))
                } else b.hasClass("show") ? b.removeClass("show") : b.addClass("show")
            })
        }
    }, {}],
    21: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (a, b, d, e) {
            function f(a, b) {
                var d = c("html").hasClass("ie9") || c("html").hasClass("ie10");
                d ? (a.find("iframe").attr("src", ""), setTimeout(function () {
                    b()
                }, 300)) : b()
            }

            var g = a.find(".cross"), h = c(a.data("overlay-zoom")), i = a.find(".overlay-view"), g = a.find(".cross"),
                j = this;
            this.show = function (d, e) {
                var f = function () {
                    h.addClass("overlay-zoom"), a.transitionEnd(function () {
                        if (d) {
                            var f = a.find(".loader"), g = c('<div class="loaded-content"></div>');
                            f.addClass("show"), g.addClass("content-container").appendTo(i), g.load(d, function (a, c) {
                                function d() {
                                    b && b(g), g.addClass("show"), f.removeClass("show"), e && e()
                                }

                                if ("success" !== c && "notmodified" !== c) return void g.text(c);
                                var h = g.find("img"), i = h.length;
                                i > 0 ? h.load(function () {
                                    i--, 0 === i && d()
                                }) : d()
                            })
                        } else e && e()
                    }).addClass("show")
                };
                a.hasClass("show") ? j.hide(f) : f()
            }, this.hide = function (b) {
                h.removeClass("overlay-zoom"), a.removeClass("show"), setTimeout(function () {
                    var c = a.find(".loaded-content");
                    c.length > 0 ? (d && d(c), f(c, function () {
                        c.remove(), e && e(), b && b()
                    })) : (e && e(), b && b())
                }, 500)
            }, g.click(function (a) {
                a.preventDefault(), j.hide()
            })
        }
    }, {}],
    22: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (a) {
            a.find(".show-list").each(function () {
                c(this).wrapInner('<div class="wrapper"></div>').textillate({
                    loop: !0,
                    "in": {effect: "fadeInRight", reverse: !0},
                    out: {effect: "fadeOutLeft", sequence: !0},
                    selector: ".wrapper"
                })
            })
        }
    }, {}],
    23: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (a, b) {
            var d = c("html").hasClass("poor-browser");
            a.find(".skillbar").each(function () {
                var a = c(this), e = a.find(".skillbar-bar"), f = parseInt(a.attr("data-percent").replace("%", ""));
                if (d) e.css({width: f + "%"}); else {
                    var g = {width: 0}, h = new TWEEN.Tween(g).to({width: f}, 1e3).onUpdate(function () {
                        e.css({width: this.width + "%"})
                    }).easing(TWEEN.Easing.Quartic.Out), i = function () {
                        h.stop()
                    }, j = function () {
                        g.width = 0, h.start()
                    }, k = j;
                    b.players.addPlayer(a, k, i, j)
                }
            })
        }
    }, {}],
    24: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function (b, d) {
            if (d) return void b.find(".carousel, .slider").each(function () {
                c(this).slick("unslick")
            });
            a("../tools/tools.js");
            b.find(".slider").each(function () {
                var a = c(this);
                a.slick({autoplay: !0, dots: !0})
            }), b.find(".carousel").each(function () {
                var a = c(this);
                a.slick({
                    autoplay: !1,
                    dots: !0,
                    infinite: !0,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [{
                        breakpoint: 1e3,
                        settings: {dots: !0, slidesToShow: 2, slidesToScroll: 2}
                    }, {breakpoint: 480, settings: {dots: !0, slidesToShow: 1, slidesToScroll: 1}}]
                })
            })
        }
    }, {"../tools/tools.js": 11}],
    25: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function () {
            {
                var b = a("../tools/tools.js"), d = c("#top-nav"), e = c("body"), f = d.length > 0,
                    g = d.find(".navbar-collapse"), h = 20, i = f ? 89 : 0, j = f ? 49 : 0,
                    k = (a("../app/themes.js"), function () {
                        return f ? h : 0
                    }()), l = !1, m = !1, n = this;
                d.data("state1-colors"), d.data("state2-colors")
            }
            this.state1H = i, this.state2H = j, this.state1Top = function () {
                return k
            }, this.state1 = function () {
                f && !l && (e.removeClass("state2").addClass("state1"), l = !0, m = !1, b.androidStylesFix(d))
            }, this.state2 = function () {
                f && !m && (e.removeClass("state1").addClass("state2"), l = !1, m = !0, b.androidStylesFix(d))
            }, this.$menu = function () {
                return g
            }, f && (n.state1(), g.find("a:not(.dropdown-toggle)").click(function () {
                d.find(".navbar-collapse.in").collapse("hide"), d.find(".menu-toggle.navbar-toggle").removeClass("show")
            }), c(window).resize(function () {
                d.find(".navbar-collapse.in").collapse("hide"), d.find(".menu-toggle.navbar-toggle").removeClass("show")
            }))
        }
    }, {"../app/themes.js": 8, "../tools/tools.js": 11}],
    26: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function () {
            var a = c(".video-bg");
            if (!(a.length < 1)) {
                var b = function () {
                    var a = c("html").hasClass("mobile"), b = document.createElement("video"),
                        d = b.canPlayType ? b.canPlayType("video/mp4") : !1;
                    return d && !a
                }();
                return b ? void a.each(function () {
                    var a = c(this);
                    a.data("loading", function (b) {
                        var d = c('<video class="video-bg"></video>');
                        "yes" === a.data("mute") && (d[0].muted = !0);
                        var e = a.data("volume");
                        void 0 !== e && (d[0].volume = e / 100);
                        var f = function () {
                            var a = d.width(), e = d.height(), f = a / e, g = c(window), h = function () {
                                var a, b, c = g.width(), e = g.height(), h = c / e;
                                f > h ? (b = Math.ceil(e), a = Math.ceil(b * f)) : (a = Math.ceil(c), b = Math.ceil(a / f)), d.css({
                                    width: a + "px",
                                    height: b + "px",
                                    top: Math.round((e - b) / 2) + "px",
                                    left: Math.round((c - a) / 2) + "px"
                                })
                            };
                            g.resize(h), h(), d[0].play(), b()
                        };
                        d.on("ended", function () {
                            this.currentTime = 0, this.play(), this.ended && this.load()
                        });
                        var g = !0;
                        d.on("canplaythrough", function () {
                            g ? (g = !1, f()) : this.play()
                        }), d[0].src = a.data("video"), d[0].preload = "auto", a.after(d), a.remove()
                    })
                }) : void a.each(function () {
                    var a = c(this), b = a.data("alternative");
                    if (b) {
                        var d = c('<img alt class="bg" src="' + b + '"/>');
                        a.after(d).remove()
                    }
                })
            }
        }
    }, {}],
    27: [function (a, b) {
        "use strict";
        var c = jQuery;
        b.exports = function () {
            var a = c(".vimeo-bg");
            if (!(a.length < 1)) {
                if (c("html").hasClass("mobile")) return void a.each(function () {
                    var a = c(this), b = a.data("alternative");
                    if (b) {
                        var d = c('<img alt class="bg" src="' + b + '"/>');
                        a.after(d).remove()
                    }
                });
                var b = [];
                a.each(function (a) {
                    var d = c(this), e = d.attr("id");
                    e || (e = "vimeo-bg-" + a, d.attr("id", e)), d.data("loading", function (a) {
                        b[e] = a
                    })
                }), c.getScript("https://f.vimeocdn.com/js/froogaloop2.min.js").done(function () {
                    a.each(function () {
                        var a = c(this), d = a.attr("id"), e = function () {
                                var b = a.data("volume");
                                return void 0 === b ? 0 : b
                            }(), f = a.data("video"),
                            g = c('<iframe class="vimeo-bg" src="https://player.vimeo.com/video/' + f + "?api=1&badge=0&byline=0&portrait=0&title=0&autopause=0&player_id=" + d + '&loop=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                        a.after(g), a.remove(), g.attr("id", d);
                        var h = $f(g[0]);
                        h.addEvent("ready", function () {
                            var a = function (a) {
                                var b = c(window).width(), d = c(window).height(), e = g.width(), f = g.height(),
                                    h = e / f, i = b / d, j = function (c, e) {
                                        var f, i;
                                        h > a ? (i = Math.ceil(e), f = Math.ceil(i * h)) : (f = Math.ceil(c), i = Math.ceil(f / h)), g.css({
                                            width: f + "px",
                                            height: i + "px",
                                            top: Math.round((d - i) / 2) + "px",
                                            left: Math.round((b - f) / 2) + "px"
                                        })
                                    };
                                if (i > a) {
                                    var k = b, l = k / a;
                                    j(k, l)
                                } else {
                                    var l = d, k = l * a;
                                    j(k, l)
                                }
                            };
                            h.addEvent("finish", function () {
                                h.api("play")
                            });
                            var f = !0;
                            h.addEvent("play", function () {
                                f && (f = !1, b[d]())
                            }), h.api("setVolume", e), h.api("getVideoWidth", function (b) {
                                var d = b;
                                h.api("getVideoHeight", function (b) {
                                    var e = b, f = d / e;
                                    c(window).resize(function () {
                                        a(f)
                                    }), a(f), h.api("play")
                                })
                            })
                        })
                    })
                }).fail(function () {
                    console.log("Triggered ajaxError handler.")
                })
            }
        }
    }, {}],
    28: [function (require, module, exports) {
        "use strict";
        var $ = jQuery;
        module.exports = function () {
            var $youtubeBgs = $(".youtube-bg");
            if (!($youtubeBgs.length < 1)) {
                if ($("html").hasClass("mobile")) return void $youtubeBgs.each(function () {
                    var a = $(this), b = a.data("alternative");
                    if (b) {
                        var c = $('<img alt class="bg" src="' + b + '"/>');
                        a.after(c).remove()
                    }
                });
                var dones = [];
                $youtubeBgs.each(function (a) {
                    var b = $(this), c = b.attr("id");
                    c || (c = "youtube-bg-" + a, b.attr("id", c)), b.data("loading", function (a) {
                        dones[c] = a
                    })
                });
                var tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag), window.onYouTubeIframeAPIReady = function () {
                    $youtubeBgs.each(function () {
                        var $youtubeBg = $(this), videoId = $youtubeBg.data("video"), vol = $youtubeBg.data("volume"),
                            mute = $youtubeBg.data("mute"), elId = $youtubeBg.attr("id"), isNotDone = !0,
                            player = new YT.Player(elId, {
                                videoId: videoId,
                                playerVars: {
                                    html5: 1,
                                    controls: 0,
                                    showinfo: 0,
                                    modestbranding: 1,
                                    rel: 0,
                                    allowfullscreen: !0,
                                    iv_load_policy: 3,
                                    wmode: "transparent"
                                },
                                events: {
                                    onReady: function (event) {
                                        var resize = function () {
                                            var $iFrame = $(event.target.getIframe()), windowW = $(window).width(),
                                                windowH = $(window).height(), iFrameW = $iFrame.width(),
                                                iFrameH = $iFrame.height(), ifRatio = iFrameW / iFrameH,
                                                wRatio = windowW / windowH, vRatio = function () {
                                                    var r = $youtubeBg.data("ratio");
                                                    return void 0 === r ? ifRatio : eval(r)
                                                }(), setSize = function (a, b) {
                                                    var c, d;
                                                    ifRatio > vRatio ? (d = Math.ceil(b), c = Math.ceil(d * ifRatio)) : (c = Math.ceil(a), d = Math.ceil(c / ifRatio)), $iFrame.css({
                                                        width: c + "px",
                                                        height: d + "px",
                                                        top: Math.round((windowH - d) / 2) + "px",
                                                        left: Math.round((windowW - c) / 2) + "px"
                                                    })
                                                };
                                            if (wRatio > vRatio) {
                                                var vw = windowW, vh = vw / vRatio;
                                                setSize(vw, vh)
                                            } else {
                                                var vh = windowH, vw = vh * vRatio;
                                                setSize(vw, vh)
                                            }
                                        };
                                        $(window).resize(resize), resize(), event.target.setPlaybackQuality("highres"), void 0 !== vol && event.target.setVolume(vol), ("yes" === mute || void 0 === mute) && event.target.mute(), event.target.playVideo()
                                    }, onStateChange: function (a) {
                                        isNotDone && a.data === YT.PlayerState.PLAYING ? (isNotDone = !1, dones[elId]()) : a.data === YT.PlayerState.ENDED && a.target.playVideo()
                                    }
                                }
                            })
                    })
                }
            }
        }
    }, {}]
}, {}, [10]);
