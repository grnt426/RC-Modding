(window.webpackJsonp = window.webpackJsonp || []).push([
    [19], {
        626: function(t, e, a) {
            "use strict";
            var s = {
                data: function() {
                    return {
                        panelContainerPosition: 0,
                        activePanel: 0,
                        panelCount: 0,
                        leftControl: !0,
                        rightControl: !0,
                        activeChild: null
                    }
                },
                props: {
                    child: {
                        type: Boolean,
                        default: !1
                    },
                    panel: {
                        type: Number,
                        default: 1
                    },
                    theme: {
                        type: String,
                        default: "none"
                    }
                },
                methods: {
                    movePanelToLeft: function() {
                        this.movePanel(-1)
                    },
                    movePanelToRight: function() {
                        this.movePanel(1)
                    },
                    movePanel: function(t) {
                        var e = this.panelContainerPosition - 298 * t,
                            a = 298 * -(this.panelCount - 1);
                        this.leftControl = e < 0, this.rightControl = e > a, this.panelContainerPosition = e <= 0 && e >= a ? e : this.panelContainerPosition
                    },
                    showChild: function(t) {
                        this.activeChild = t
                    },
                    hideChild: function() {
                        this.activeChild = null
                    }
                },
                mounted: function() {
                    this.$refs.panelContainer && (this.panelCount = this.$refs.panelContainer.childElementCount, this.movePanel(this.panel - 1))
                }
            };
            e.a = s
        },
        681: function(t, e, a) {
            t.exports = a.p + "img/large-v-white.3949599.png"
        },
        732: function(t, e, a) {
            "use strict";
            a.r(e);
            var s = a(70),
                i = a.n(s),
                n = a(6),
                r = a.n(n),
                o = a(3),
                c = a.n(o),
                l = a(622),
                u = a(682),
                d = a.n(u),
                v = a(628),
                p = a.n(v),
                m = a(629),
                h = a.n(m),
                f = a(683),
                _ = a.n(f),
                y = a(5);

            function g(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function b(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? g(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : g(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }

            function C(t) {
                return k.apply(this, arguments)
            }

            function k() {
                return (k = r()(c.a.mark((function t(e) {
                    var a, s, i, n;
                    return c.a.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return a = (new TextEncoder).encode(_()(e)), t.next = 3, window.crypto.subtle.digest("SHA-1", a);
                            case 3:
                                return s = t.sent, i = Array.from(new Uint8Array(s)), n = i.map((function(t) {
                                    return t.toString(16).padStart(2, "0")
                                })).join(""), t.abrupt("return", n);
                            case 7:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }
            var w = function() {
                    function t() {
                        p()(this, t), this.systems = [], this.systemsToRepaint = new Set([]), this.blackholes = [], this.sectors = [], this.sectorHash = "", this.hasToRepaintSectors = !1, this.radars = [], this.radarsHash = "", this.hasToRepaintRadars = !1, this.detectedObjects = [], this.hasToRepaintDetectedObjects = !1
                    }
                    return h()(t, [{
                        key: "update",
                        value: function(t) {

                            try {
                                if(y.a.state.granite) {
                                    let granite = y.a.state.granite;

                                    granite.postData(t, "incr_update", "/incr_update");
                                }
                            }
                            catch(err) {
                                console.error("ERROR: Went wrong in processing update: " + err);
                            }

                            if (t.global_galaxy && (this.createSystem(t.global_galaxy.stellar_systems), this.updateSectors(t.global_galaxy.sectors), this.blackholes = t.global_galaxy.blackholes), t.global_galaxy_system && this.updateSystems([t.global_galaxy_system], {}), t.faction_faction && (this.updateSystems([], t.faction_faction.contacts), this.updateRadars(t.faction_faction.radars)), t.detected_objects && this.updateDetectedObjects(t.detected_objects), t.faction_faction_contact) {
                                var e = i()({}, t.faction_faction_contact.system_id, t.faction_faction_contact.contact);
                                this.updateSystems([], e)
                            }
                            t.global_galaxy_sector && this.updateSectors(t.global_galaxy_sector)
                        }
                    }, {
                        key: "createSystem",
                        value: function(t) {
                            this.systems = t.map((function(t) {
                                return b(b({}, t), {
                                    visibility: 0
                                })
                            })), this.systemsToRepaint = new Set(t.map((function(t) {
                                return t.id
                            })))
                        }
                    }, {
                        key: "updateSystems",
                        value: function(t, e) {
                            var a = this,
                                s = y.a.state.game.player.faction;
                            this.systems = this.systems.map((function(i) {
                                var n = t.find((function(t) {
                                    return i.id === t.id
                                }));
                                return n = n ? b(b({}, i), n) : b({}, i), e[n.id] && (n.visibility = e[n.id].value), n.faction === s && (n.visibility = 5), JSON.stringify(n) !== JSON.stringify(i) && a.systemsToRepaint.add(n.id), n
                            }))
                        }
                    }, {
                        key: "updateSectors",
                        value: function(t) {
                            var e = this;
                            C(t).then((function(a) {
                                a !== e.sectorHash && (e.sectors = t, e.hasToRepaintSectors = !0)
                            }))
                        }
                    }, {
                        key: "updateRadars",
                        value: function(t) {
                            var e = this;
                            C(t).then((function(a) {
                                a !== e.radarsHash && (e.radars = t, e.hasToRepaintRadars = !0)
                            }))
                        }
                    }, {
                        key: "forceRedrawRadars",
                        value: function() {
                            this.hasToRepaintRadars = !0
                        }
                    }, {
                        key: "updateDetectedObjects",
                        value: function(t) {
                            var e = (y.a.state.game.player.characters || []).map((function(t) {
                                return t.id
                            }));
                            this.detectedObjects = t.filter((function(t) {
                                return !e.includes(t.character_id)
                            })), this.hasToRepaintDetectedObjects = !0
                        }
                    }]), t
                }(),
                x = a(61),
                $ = a(627),
                P = a(618),
                O = a.n(P),
                S = a(700),
                T = a(687),
                M = a.n(T),
                j = a(688),
                A = a(8),
                E = a(22),
                N = a.n(E),
                D = a(659),
                I = a.n(D);

            function L() {
                return [{
                    key: "neutral",
                    color: "#ffffff"
                }].concat(y.a.state.game.data.faction).reduce((function(t, e) {
                    var a = I()(e.color),
                        s = parseInt(a.toHex(), 16),
                        i = parseInt(a.lighten(20).toHex(), 16),
                        n = parseInt(a.darken(20).toHex(), 16);
                    return t[e.key] = {
                        hex: {
                            normal: s,
                            lighter: i,
                            darker: n
                        },
                        material: {
                            normal: new $.MeshBasicMaterial({
                                color: s,
                                transparent: !0,
                                side: $.FrontSide
                            }),
                            lighter: new $.MeshBasicMaterial({
                                color: i,
                                transparent: !0,
                                side: $.FrontSide
                            }),
                            darker: new $.MeshBasicMaterial({
                                color: n,
                                transparent: !0,
                                side: $.FrontSide
                            })
                        }
                    }, t
                }), {})
            }

            function B() {
                return R.apply(this, arguments)
            }

            function R() {
                return (R = r()(c.a.mark((function t() {
                    var e, a, s;
                    return c.a.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return e = new $.FontLoader, s = (a = [{
                                    name: "nunito300",
                                    path: "fonts/nunito-regular.json"
                                }, {
                                    name: "nunito800",
                                    path: "fonts/nunito-black-regular.json"
                                }, {
                                    name: "montserrat700",
                                    path: "fonts/montserrat-bold-regular.json"
                                }]).map((function(t) {
                                    return new Promise((function(a) {
                                        return e.load(t.path, (function(t) {
                                            return a(t)
                                        }))
                                    }))
                                })), t.abrupt("return", Promise.all(s).then((function(t) {
                                    return t.reduce((function(t, e, s) {
                                        return t[a[s].name] = e, t
                                    }), {})
                                })));
                            case 4:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }

            function z(t) {
                return "geometry" in t && "material" in t
            }

            function F(t) {
                z(t) && [].concat(t.material).forEach((function(t) {
                    t.dispose()
                }))
            }

            function H(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    a = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                    s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                t && (z(t) && (t.geometry && a && t.geometry.dispose(), s && F(t)), e && Promise.resolve().then((function() {
                    t.parent && t.parent.remove(t)
                })))
            }

            function q(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    removeFromParent: !0,
                    destroyGeometry: !0,
                    destroyMaterial: !0
                };
                t.traverse((function(t) {
                    H(t, e.removeFromParent, e.destroyGeometry, e.destroyMaterial)
                }))
            }
            var G = a(631),
                V = a.n(G),
                Z = a(632),
                K = a.n(Z),
                U = a(633),
                W = a.n(U),
                Y = function() {
                    function t(e, a) {
                        p()(this, t), this.map = e, this.log = e.log, this.shown = !1, this.group = new $.Group, this.name = a, this.group.name = this.name, this.colors = L(this.map), this.animationCallbacks = [];
                        var s = y.a.state.game.time,
                            i = y.a.state.game.data.speed.find((function(t) {
                                return t.key === s.speed
                            })).factor;
                        this.progress = function(t, a, s) {
                            if (!t) return 0;
                            if (a <= 0) return 1;
                            var n = e.timeOffset + Date.now() - t;
                            return i * n / (18e4 * s)
                        }
                    }
                    var e, a, s;
                    return h()(t, [{
                        key: "children",
                        get: function() {
                            return this.group.children
                        }
                    }, {
                        key: "getGroupByName",
                        value: function(t) {
                            return this.find((function(e) {
                                return e.name === t
                            }))
                        }
                    }, {
                        key: "find",
                        value: function(t) {
                            return this.group.children.find(t)
                        }
                    }, {
                        key: "_create",
                        value: (s = r()(c.a.mark((function t() {
                            return c.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        throw new Error("not implemented");
                                    case 1:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        }))), function() {
                            return s.apply(this, arguments)
                        })
                    }, {
                        key: "_update",
                        value: (a = r()(c.a.mark((function t() {
                            return c.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        throw new Error("not implemented");
                                    case 1:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        }))), function() {
                            return a.apply(this, arguments)
                        })
                    }, {
                        key: "update",
                        value: (e = r()(c.a.mark((function t(e) {
                            return c.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        this.children.length ? this.shown && y.a.state.game.time.is_running && this._update(e) : (this.log("creating"), this._create(e));
                                    case 1:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        }))), function(t) {
                            return e.apply(this, arguments)
                        })
                    }, {
                        key: "refresh",
                        value: function() {
                            this.onZ(this.map.camera.position.z)
                        }
                    }, {
                        key: "onZ",
                        value: function(t) {
                            var e = Math.abs(t - this.map.maxZ) < .2,
                                a = !1;
                            this.group.children.forEach((function(s) {
                                "number" == typeof s.userData.near && "number" == typeof s.userData.far && (t >= s.userData.near && t <= s.userData.far ? (s.visible = !0, a = s.name) : !0 !== s.visible || e || (s.visible = !1))
                            })), this.shown = a
                        }
                    }]), t
                }();

            function Q(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }! function(t) {
                V()(a, t);
                var e = Q(a);

                function a(t) {
                    return p()(this, a), e.call(this, t, "Crosshair")
                }
                h()(a, [{
                    key: "_create",
                    value: function() {
                        var t = new $.MeshBasicMaterial({
                                color: 0
                            }),
                            e = new $.BufferGeometry,
                            a = new Float32Array([0, .2, 0, 0, -.2, 0, 0, 0, 0, .4, 0, 0, -.4, 0, 0]);
                        e.setAttribute("position", new $.BufferAttribute(a, 3));
                        var s = new $.Line(e, t);
                        s.position.set(0, 0, -10), this.map.camera.add(s), this.map.scene.add(this.map.camera), this.group.add(new $.Group)
                    }
                }, {
                    key: "onZ",
                    value: function() {}
                }])
            }(Y);
            var J = a(660),
                X = a.n(J),
                tt = a(690),
                et = a.n(tt),
                at = a(643);

            function st(t, e, a) {
                for (var s = [], i = new $.BufferAttribute(new Float32Array([t, 0, 0]), 3), n = 0; n < e.length; n += 1) {
                    var r = (new $.Vector2).subVectors(e[n - 1 < 0 ? e.length - 1 : n - 1], e[n]),
                        o = (new $.Vector2).subVectors(e[n + 1 === e.length ? 0 : n + 1], e[n]),
                        c = .5 * (o.angle() - r.angle()),
                        l = o.angle() + .5 * Math.PI,
                        u = Math.tan(c - .5 * Math.PI),
                        d = (new $.Matrix4).set(1, 0, 0, 0, -u, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                        v = l,
                        p = (new $.Matrix4).set(Math.cos(v), -Math.sin(v), 0, 0, Math.sin(v), Math.cos(v), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                        m = (new $.Matrix4).set(1, 0, 0, e[n].x, 0, 1, 0, e[n].y, 0, 0, 1, 0, 0, 0, 0, 1),
                        h = i.clone().applyMatrix4(d).applyMatrix4(p).applyMatrix4(m);
                    s.push(new $.Vector2(h.getX(0), h.getY(0)))
                }
                var f = s.reduce((function(t, e) {
                    return t.concat(e.x, e.y, a)
                }), []);
                return f.push(f[0], f[1], f[2]), f
            }

            function it(t) {
                return nt.apply(this, arguments)
            }

            function nt() {
                return (nt = r()(c.a.mark((function t(e) {
                    var a, s, i, n, r, o, l, u = arguments;
                    return c.a.wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return a = u.length > 1 && void 0 !== u[1] ? u[1] : .1, s = u.length > 2 ? u[2] : void 0, i = u.length > 3 ? u[3] : void 0, n = st(a, e, s), (r = new at.MeshLine).setPoints(n), o = new at.MeshLineMaterial(i), l = new $.Mesh(r, o), t.abrupt("return", l);
                            case 9:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }

            function rt(t) {
                for (var e = new $.Path, a = 0; a < t.length; a += 1) {
                    var s = t[a],
                        i = t[(a + 1) % t.length],
                        n = [];
                    n[0] = new $.Vector2(s[0][0], s[0][1]), n[1] = new $.Vector2(s[2][0] + s[0][0], s[2][1] + s[0][1]), n[2] = new $.Vector2(i[1][0] + i[0][0], i[1][1] + i[0][1]), n[3] = new $.Vector2(i[0][0], i[0][1]), 0 === a && e.moveTo(n[0].x, n[0].y), e.bezierCurveTo(n[1].x, n[1].y, n[2].x, n[2].y, n[3].x, n[3].y)
                }
                return e.closePath(), e
            }

            function ot(t) {
                var e = t.map((function(t) {
                    var e = t.x,
                        a = t.y,
                        s = t.radius;
                    return new window.paper.Path.Circle({
                        center: new window.paper.Point(e, a),
                        radius: s,
                        fillColor: "white"
                    })
                }));
                if (!e.length) return [];
                var a = et()(e),
                    s = a[0],
                    i = a.slice(1).reduce((function(t, e) {
                        return t.unite(e)
                    }), s);
                if (void 0 === i.segments) {
                    var n = i.exportJSON({
                        asString: !1
                    });
                    return N()(n, 2)[1].children.map((function(t) {
                        return rt(N()(t, 2)[1].segments)
                    }))
                }
                var r = i.exportJSON({
                    asString: !1
                });
                return [rt(N()(r, 2)[1].segments)]
            }

            function ct(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }
            var lt = function(t) {
                V()(i, t);
                var e, a, s = ct(i);

                function i(t) {
                    var e;
                    return p()(this, i), e = s.call(this, t, "Radar"), window.paper.install(X()(e)), window.paper.setup([1e3, 1e3]), e
                }
                return h()(i, [{
                    key: "_create",
                    value: (a = r()(c.a.mark((function t() {
                        return c.a.wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    this.createRadar(), this.resetRepaint(), this.refresh();
                                case 3:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    }))), function() {
                        return a.apply(this, arguments)
                    })
                }, {
                    key: "_update",
                    value: (e = r()(c.a.mark((function t() {
                        return c.a.wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    this.map.data.hasToRepaintRadars && (q(this.getGroupByName("radar")), this.group.children = this.group.children.filter((function(t) {
                                        return "radar" !== t.name
                                    })), this.createRadar(), this.resetRepaint(), this.refresh());
                                case 1:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    }))), function() {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "resetRepaint",
                    value: function() {
                        this.map.data.hasToRepaintRadars = !1
                    }
                }, {
                    key: "onZ",
                    value: function(t) {
                        Y.prototype.onZ.call(this, t)
                    }
                }, {
                    key: "createRadar",
                    value: function() {
                        var t = this,
                            e = new $.Group;
                        if (e.name = "radar", Object.assign(e.userData, {
                            near: 20,
                            far: 200
                        }), "radar" === y.a.state.game.mapOptions.mode) {
                            var a = Object.values(this.map.data.radars).reduce((function(t, e) {
                                return (t[e.faction_id] = t[e.faction_id] || []).push(e.disk), t
                            }), {});
                            Object.entries(a).forEach((function(a) {
                                var s = N()(a, 2),
                                    i = s[0],
                                    n = s[1],
                                    r = y.a.state.game.victory.factions.find((function(t) {
                                        return t.id === parseInt(i, 10)
                                    })),
                                    o = r.id === y.a.state.game.player.faction_id,
                                    c = t.colors[r.key];
                                o ? ot(n).forEach((function(t) {
                                    var a = t.getLength(),
                                        s = a > 30 ? a / 3 : 10,
                                        i = 2 / a,
                                        n = t.getPoints(s),
                                        r = {
                                            color: c.hex.normal,
                                            transparent: !0,
                                            lineWidth: .02,
                                            dashArray: i,
                                            dashRatio: .2,
                                            dashOffset: 0
                                        };
                                    it(n, 0, A.a.MAP.Z_FLOOR, r).then((function(t) {
                                        e.add(t)
                                    }));
                                    var o = {
                                        color: c.hex.normal,
                                        transparent: !0,
                                        lineWidth: .03,
                                        dashArray: i,
                                        dashRatio: .95,
                                        dashOffset: .88 * i
                                    };
                                    it(n, 0, A.a.MAP.Z_FLOOR, o).then((function(t) {
                                        e.add(t)
                                    }));
                                    var l = {
                                        color: c.hex.darker,
                                        lineWidth: .025
                                    };
                                    it(n, .15, A.a.MAP.Z_FLOOR, l).then((function(t) {
                                        e.add(t)
                                    }));
                                    var u = new $.ShapePath;
                                    u.subPaths = [t];
                                    var d = new $.ShapeGeometry(u.toShapes()),
                                        v = new $.Mesh(d, c.material.normal.clone());
                                    v.material.opacity = .12, v.position.set(0, 0, A.a.MAP.Z_FLOOR), e.add(v)
                                })) : ot(n).forEach((function(t) {
                                    var a = t.getLength(),
                                        s = a > 30 ? a / 3 : 10,
                                        i = t.getPoints(s),
                                        n = {
                                            color: c.hex.normal,
                                            lineWidth: .025
                                        };
                                    it(i, 0, A.a.MAP.Z_FLOOR, n).then((function(t) {
                                        e.add(t)
                                    }))
                                }))
                            }))
                        }
                        this.group.add(e)
                    }
                }]), i
            }(Y);

            function ut(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }
            var dt = function(t) {
                    V()(a, t);
                    var e = ut(a);

                    function a(t) {
                        return p()(this, a), e.call(this, t, "DetectedObject")
                    }
                    return h()(a, [{
                        key: "_create",
                        value: function() {
                            this.createDetectedObjects(), this.resetRepaint(), this.refresh()
                        }
                    }, {
                        key: "_update",
                        value: function() {
                            this.map.data.hasToRepaintDetectedObjects && (q(this.getGroupByName("detected-objects")), this.group.children = this.group.children.filter((function(t) {
                                return "detected-objects" !== t.name
                            })), this.createDetectedObjects(), this.resetRepaint(), this.refresh())
                        }
                    }, {
                        key: "resetRepaint",
                        value: function() {
                            this.map.data.hasToRepaintDetectedObjects = !1
                        }
                    }, {
                        key: "createDetectedObjects",
                        value: function() {
                            var t = this,
                                e = new $.Group;
                            e.name = "detected-objects", Object.assign(e.userData, {
                                near: 20,
                                far: 200
                            }), this.map.data.detectedObjects.forEach((function(a) {
                                var s = a.angle,
                                    i = a.position,
                                    n = i.x,
                                    r = i.y,
                                    o = a.faction,
                                    c = t.map.materials.sprites.characters[o].character.clone();
                                c.position.set(n, r, A.a.MAP.Z_CHARACTER_NEAR_SPRITE), c.material = c.material.clone(), c.material.rotation = s, e.add(c)
                            })), this.group.add(e)
                        }
                    }]), a
                }(Y),
                vt = a(636),
                pt = a.n(vt);

            function mt(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }

            function ht(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .2,
                    a = new pt.a,
                    s = a.data(t.points).padding(0);
                try {
                    return a.data(s).padding(e)
                } catch (t) {
                    return [s]
                }
            }
            var ft = function(t) {
                    V()(a, t);
                    var e = mt(a);

                    function a(t) {
                        return p()(this, a), e.call(this, t, "Sector")
                    }
                    return h()(a, [{
                        key: "_create",
                        value: function() {
                            this.createSectors("near"), this.createSectors("medium"), this.createSectors("far"), this.resetRepaint()
                        }
                    }, {
                        key: "_update",
                        value: function() {
                            this.map.data.hasToRepaintSectors && (this.group.children.forEach((function(t) {
                                return q(t)
                            })), this.group.children = [], this.createSectors("near"), this.createSectors("medium"), this.createSectors("far"), this.refresh(), this.resetRepaint())
                        }
                    }, {
                        key: "resetRepaint",
                        value: function() {
                            this.map.data.hasToRepaintSectors = !1
                        }
                    }, {
                        key: "createSectors",
                        value: function(t) {
                            var e = this,
                                a = {
                                    near: {
                                        near: 20,
                                        far: 80,
                                        offset: .15,
                                        line: .05,
                                        opacity: .05
                                    },
                                    medium: {
                                        near: 80,
                                        far: 200,
                                        offset: .15,
                                        line: .1,
                                        opacity: .05
                                    },
                                    far: {
                                        near: 200,
                                        far: this.map.maxZ,
                                        offset: .3,
                                        line: .2,
                                        opacity: .12
                                    }
                                },
                                s = new $.Group;
                            s.name = "sector-".concat(t), Object.assign(s.userData, {
                                near: a[t].near,
                                far: a[t].far
                            }), this.map.data.sectors.forEach((function(i) {
                                var n = i.owner ? e.colors[i.owner] : e.colors.neutral,
                                    r = i.owner ? e.colors[i.owner].material.darker : e.map.materials.lightGrey;
                                if (ht(i, a[t].offset).forEach((function(e) {
                                    var i = e.reduce((function(t, e) {
                                        var a = N()(e, 2),
                                            s = a[0],
                                            i = a[1];
                                        return t.concat([s, i, A.a.MAP.Z_SECTOR_NEAR])
                                    }), []);
                                    i.push(i[0], i[1], i[2]);
                                    for (var r = 3; r < i.length - 3; r += 3) {
                                        var o = new at.MeshLineMaterial({
                                                color: n.hex.darker,
                                                transparent: !0,
                                                lineWidth: a[t].line
                                            }),
                                            c = new at.MeshLine;
                                        c.setPoints(i.slice(r - 3, r + 3));
                                        var l = new $.Mesh(c, o);
                                        l.material.opacity = .5, s.add(l)
                                    }
                                })), ht(i, a[t].offset).forEach((function(e) {
                                    var i = e.map((function(t) {
                                            var e = N()(t, 2),
                                                a = e[0],
                                                s = e[1];
                                            return new $.Vector2(a, s)
                                        })),
                                        n = new $.Shape(i),
                                        o = new $.ShapeBufferGeometry(n),
                                        c = new $.Mesh(o, r.clone());
                                    c.position.setZ(A.a.MAP.Z_SECTOR_FAR), c.material.opacity = a[t].opacity, s.add(c)
                                })), "far" === t) {
                                    var o = [i.centroid[0], i.centroid[1], A.a.MAP.Z_SECTOR_FAR_LABEL],
                                        c = e.sectorLabel(i.name, o, n.hex.lighter, 1.5);
                                    c.gameObject = {
                                        type: "sector",
                                        data: i.id
                                    }, s.add(c)
                                }
                            })), this.group.add(s)
                        }
                    }, {
                        key: "sectorLabel",
                        value: function(t, e, a) {
                            var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10,
                                i = new $.Group,
                                n = new $.MeshBasicMaterial({
                                    color: a,
                                    side: $.FrontSide
                                }),
                                r = this.map.fonts.nunito800.generateShapes(t.toUpperCase(), s),
                                o = new $.ShapeBufferGeometry(r),
                                c = new $.Vector3;
                            o.computeBoundingBox(), o.boundingBox.getSize(c);
                            var l = e[0] - o.boundingBox.max.x / 2,
                                u = e[1] - o.boundingBox.max.y / 2,
                                d = e[2],
                                v = new $.Mesh(o, n);
                            v.position.set(l, u, d), v.userData.hoverable = !0, i.add(v);
                            var p = 5,
                                m = new $.PlaneGeometry(c.x + 2 * p, c.y + 2 * p, 32),
                                h = new $.Mesh(m, this.map.materials.white.clone());
                            return h.position.set(l + c.x / 2, u + c.y / 2, d - .01), h.material.opacity = 0, h.userData.hoverable = !0, i.add(h), i
                        }
                    }]), a
                }(Y),
                _t = a(691),
                yt = a(692);

            function gt(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }
            var bt = function(t) {
                V()(a, t);
                var e = gt(a);

                function a(t) {
                    return p()(this, a), e.call(this, t, "Skydome")
                }
                return h()(a, [{
                    key: "_create",
                    value: function() {
                        var t = {
                                x: this.map.size / 2,
                                y: this.map.size / 2,
                                z: -250
                            },
                            e = new $.Group;
                        Object.assign(e.userData, {
                            near: -1 / 0,
                            far: 1 / 0
                        });
                        var a = function() {},
                            s = function(t) {
                                throw t
                            },
                            i = new $.LoadingManager;
                        new _t.a(i).setMaterialOptions({
                            ignoreZeroRGBs: !0
                        }).setPath("./map/skydome/").load("skybowl_001_LL.mtl", (function(n) {
                            n.preload(), Object.entries(n.materials).forEach((function(t) {
                                var e = N()(t, 2)[1];
                                e.alphaTest = 0, e.transparent = !0, e.fog = !1
                            })), new yt.a(i).setMaterials(n).setPath("./map/skydome/").load("skybowl_001_LL.obj", (function(a) {
                                a.rotateX(Math.PI / 2), a.position.x = t.x, a.position.y = t.y, a.position.z = t.z, a.scale.set(330, 330, 330), a.name = "skydome", e.add(a)
                            }), a, s)
                        })), this.group.add(e)
                    }
                }, {
                    key: "_update",
                    value: function() {
                        this.log("updating ".concat(this.group.name))
                    }
                }]), a
            }(Y);

            function Ct(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }
            var kt = new $.RingGeometry(1e-4, .5, 32),
                wt = new $.RingGeometry(1e-4, 2, 32),
                xt = ["population", "visibility", "radar"],
                $t = function(t) {
                    V()(a, t);
                    var e = Ct(a);

                    function a(t) {
                        return p()(this, a), e.call(this, t, "System")
                    }
                    return h()(a, [{
                        key: "_create",
                        value: function() {
                            var t = this;
                            this.mode = y.a.state.game.mapOptions.mode, this.groups = xt.reduce((function(e, a) {
                                return e[a] = t.group.clone(), e
                            }), {}), this.group = this.groups[this.mode], xt.forEach((function(e) {
                                e !== t.mode && (t.map.scene.add(t.groups[e]), t.groups[e].visible = !1)
                            })), this.createSystems(!0), this.resetRepaint()
                        }
                    }, {
                        key: "_update",
                        value: function() {
                            var t = this,
                                e = y.a.state.game.mapOptions.mode;
                            this.mode !== e && (this.mode = e, this.group = this.groups[e], xt.forEach((function(a) {
                                t.groups[a].visible = a === e
                            })), this.refresh()), this.map.data.systemsToRepaint.size > 0 && (this.createSystems(), this.refresh(), this.resetRepaint())
                        }
                    }, {
                        key: "resetRepaint",
                        value: function() {
                            this.map.data.systemsToRepaint.clear()
                        }
                    }, {
                        key: "createSystems",
                        value: function() {
                            var t = this,
                                e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                            xt.forEach((function(a) {
                                var s = t.groups[a].children.find((function(t) {
                                        return "systems-near" === t.name
                                    })),
                                    i = t.groups[a].children.find((function(t) {
                                        return "systems-far" === t.name
                                    }));
                                s || ((s = new $.Group).name = "systems-near", Object.assign(s.userData, {
                                    near: 20,
                                    far: 200
                                })), i || ((i = new $.Group).name = "systems-far", Object.assign(i.userData, {
                                    near: 200,
                                    far: t.map.maxZ
                                }));
                                var n = t.map.gameData.stellar_system.reduce((function(t, e) {
                                    return t[e.key] = new $.RingGeometry(2e-4, .2 * e.display_size_factor, 32), t
                                }), {});
                                t.map.data.systems.forEach((function(r) {
                                    var o = "system-".concat(r.id);
                                    if (y.a.state.game.galaxy.tutorial_id && "inhabited_neutral" === r.status && 2 === r.sector_id && (r.faction = "myrmezir", r.owner = "Myrmezir", r.status = "inhabited_dominion"), e || t.map.data.systemsToRepaint.has(r.id)) {
                                        e || (q(s.children.find((function(t) {
                                            return t.userData.name === o
                                        }))), q(i.children.find((function(t) {
                                            return t.userData.name === o
                                        }))));
                                        var c = t.nearSystem(r, o, a);
                                        s.add(c);
                                        var l = t.farSystem(r, o, n);
                                        i.add(l)
                                    }
                                })), t.groups[a].add(s), t.groups[a].add(i)
                            }))
                        }
                    }, {
                        key: "nearSystem",
                        value: function(t, e, a) {
                            var s = new $.Group;
                            s.name = "system-near", s.userData.name = e, s.gameObject = {
                                type: "system",
                                data: t
                            };
                            var i = t.faction ? t.faction : "neutral",
                                n = this.colors[i],
                                r = 0 === t.visibility ? "unknown" : "known",
                                o = ["uninhabitable", "uninhabited"].includes(t.status) ? "uninhabited" : "inhabited",
                                c = y.a.state.game.data.population_class.find((function(e) {
                                    return e.key === t.class
                                })),
                                l = new $.Mesh(kt, this.map.materials.white.clone());
                            l.visible = !1, l.position.set(t.position.x, t.position.y, A.a.MAP.Z_SYSTEM_NEAR_STAR - .01), l.material.opacity = .12, l.userData.hoverable = !0, l.userData.showOnHover = !0, s.add(l);
                            var u = this.map.materials.sprites.systems[t.type][o][r].clone();
                            if (u.position.set(t.position.x, t.position.y, A.a.MAP.Z_SYSTEM_NEAR_STAR), u.userData.hoverable = !0, s.add(u), ["inhabited_dominion", "inhabited_player"].includes(t.status)) {
                                var d = "inhabited_dominion" === t.status ? "dominion" : "player",
                                    v = this.map.materials.sprites.systems[t.type].factions[i][d][r].clone();
                                v.position.set(t.position.x, t.position.y, A.a.MAP.Z_SYSTEM_NEAR_STAR + .01), s.add(v)
                            }
                            var p = this.map.playerSystems.find((function(e) {
                                    return e.id === t.id
                                })),
                                m = this.map.playerDominions.find((function(e) {
                                    return e.id === t.id
                                })),
                                h = ["inhabited_neutral", "inhabited_dominion"].includes(t.status) ? "".concat(t.name, "*") : t.name;
                            if (m || p || !t.owner && 0 === t.visibility) {
                                var f = !!t.owner;
                                s.add(this.createSystemLabel(t, {
                                    x: .46,
                                    y: -.12
                                }, h, f, {
                                    fontSize: .25,
                                    textColor: this.map.materials.black,
                                    bckColor: n.material.darker,
                                    zIndex: A.a.MAP.Z_SYSTEM_NEAR_LABEL
                                }))
                            } else if (s.add(this.createSystemLabel(t, {
                                x: .46,
                                y: .08
                            }, h, !1, {
                                fontSize: .25,
                                textColor: this.map.materials.black,
                                bckColor: n.material.darker,
                                zIndex: A.a.MAP.Z_SYSTEM_NEAR_LABEL
                            })), t.owner) s.add(this.createSystemLabel(t, {
                                x: .46,
                                y: -.3
                            }, t.owner, !1, {
                                fontSize: .18,
                                textColor: this.map.materials.black,
                                bckColor: n.material.lighter,
                                zIndex: A.a.MAP.Z_SYSTEM_NEAR_LABEL
                            }));
                            else {
                                var _ = 0 === t.score ? this.map.vm.$t("galaxy.map.uninhabitable") : "".concat(t.score, " ").concat(this.map.vm.$tc("galaxy.map.orbit", t.score));
                                s.add(this.createSystemLabel(t, {
                                    x: .46,
                                    y: -.3
                                }, _, !1, {
                                    fontSize: .18,
                                    textColor: this.map.materials.black,
                                    bckColor: n.material.lighter,
                                    zIndex: A.a.MAP.Z_SYSTEM_NEAR_LABEL
                                }))
                            }
                            if ("visibility" === a) {
                                if (t.visibility > 0) {
                                    s.add(this.createSystemLabel(t, {
                                        x: .26,
                                        y: .26
                                    }, "".concat(t.visibility), !0, {
                                        fontSize: .15,
                                        textColor: this.map.materials.white,
                                        zIndex: A.a.MAP.Z_SYSTEM_NEAR_LABEL
                                    }));
                                    var g = new $.RingGeometry(1e-4, .25 * t.visibility, 128),
                                        b = new $.Mesh(g, n.material.normal.clone());
                                    b.position.set(t.position.x, t.position.y, A.a.MAP.Z_SYSTEM_NEAR_STAR - .01), b.material.opacity = .25, s.add(b)
                                }
                            } else if ("population" === a && c && t.visibility > 2) {
                                s.add(this.createSystemLabel(t, {
                                    x: .26,
                                    y: .26
                                }, "".concat(c.points), !0, {
                                    fontSize: .15,
                                    textColor: this.map.materials.white,
                                    zIndex: A.a.MAP.Z_SYSTEM_NEAR_LABEL
                                }));
                                var C = new $.RingGeometry(1e-4, .15 * c.points, 128),
                                    k = new $.Mesh(C, n.material.normal.clone());
                                k.position.set(t.position.x, t.position.y, A.a.MAP.Z_SYSTEM_NEAR_STAR - .01), k.material.opacity = .25, s.add(k)
                            }
                            return s
                        }
                    }, {
                        key: "farSystem",
                        value: function(t, e, a) {
                            var s = new $.Group;
                            s.name = "system-far", s.userData.name = e;
                            var i = a[t.type],
                                n = t.faction ? this.colors[t.faction].material.lighter : this.map.materials.white,
                                r = 0 === t.visibility ? .5 : 1,
                                o = new $.Mesh(i, n.clone());
                            o.position.set(t.position.x, t.position.y, A.a.MAP.Z_SYSTEM_FAR_STAR), o.material.opacity = r, s.add(o);
                            var c = this.map.playerSystems.find((function(e) {
                                    return e.id === t.id
                                })),
                                l = this.map.playerDominions.find((function(e) {
                                    return e.id === t.id
                                }));
                            if (c || l) {
                                var u = y.a.state.game.player.faction,
                                    d = new $.Mesh(wt, this.colors[u].material.normal.clone());
                                d.position.set(t.position.x, t.position.y, A.a.MAP.Z_SYSTEM_FAR_OWN), d.material.opacity = .2, s.add(d)
                            }
                            return s
                        }
                    }, {
                        key: "createSystemLabel",
                        value: function(t, e, a, s, i) {
                            var n = {
                                    type: "system",
                                    data: t
                                },
                                r = {
                                    x: t.position.x + e.x,
                                    y: t.position.y + e.y
                                };
                            return this.createLabel(r, a, s, n, i)
                        }
                    }, {
                        key: "createLabel",
                        value: function(t, e, a, s, i) {
                            var n = new $.Group;
                            n.gameObject = s, n.userData.hoverable = !0, a || (n.visible = !1, n.userData.showOnHover = !0);
                            var r = this.map.fonts.nunito800.generateShapes(e.toUpperCase(), i.fontSize),
                                o = new $.ShapeBufferGeometry(r),
                                c = new $.Vector3;
                            o.computeBoundingBox(), o.boundingBox.getSize(c);
                            var l = t.x,
                                u = t.y,
                                d = i.zIndex,
                                v = new $.Mesh(o, i.textColor);
                            if (v.position.set(l, u, d), n.add(v), i.bckColor) {
                                var p = new $.PlaneGeometry(c.x + .2, c.y + .2, 32),
                                    m = new $.Mesh(p, i.bckColor);
                                m.position.set(l + c.x / 2, u + c.y / 2, d - .01), n.add(m)
                            }
                            return n
                        }
                    }]), a
                }(Y);

            function Pt(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }
            var Ot = function(t) {
                    V()(a, t);
                    var e = Pt(a);

                    function a(t) {
                        return p()(this, a), e.call(this, t, "Blackhole")
                    }
                    return h()(a, [{
                        key: "_create",
                        value: function() {
                            this.createBlackolesNear(), this.createBlackolesFar()
                        }
                    }, {
                        key: "_update",
                        value: function() {}
                    }, {
                        key: "createBlackolesNear",
                        value: function() {
                            var t = this,
                                e = this.getGroupByName("blackholes"),
                                a = A.a.MAP.Z_BLACKHOLE;
                            e || ((e = new $.Group).name = "blackholes-near", Object.assign(e.userData, {
                                near: 20,
                                far: 200
                            })), this.map.data.blackholes.forEach((function(s) {
                                var i = s.radius,
                                    n = s.position,
                                    r = s.name,
                                    o = t.map.materials.white,
                                    c = t.map.materials.black;
                                [
                                    [1e-4, i, c, .5, 0],
                                    [i + .1, i + .12, o, .1, .01],
                                    [i - .06, i - .1, o, .3, .01],
                                    [i - .32, i - .3, o, .26, .01],
                                    [i - .52, i - .5, o, .22, .01],
                                    [i - .72, i - .7, o, .18, .01],
                                    [i - .92, i - .9, o, .14, .01],
                                    [i - 1.12, i - 1.1, o, .1, .01],
                                    [i - 1.32, i - 1.3, o, .06, .01],
                                    [i - 1.52, i - 1.5, o, .03, .01],
                                    [1e-4, i / 4 * 1, c, .4, 0],
                                    [1e-4, i / 4 * 2, c, .4, 0],
                                    [1e-4, i / 4 * 3, c, .4, 0]
                                ].forEach((function(t) {
                                    var s = N()(t, 5),
                                        i = s[0],
                                        r = s[1],
                                        o = s[2],
                                        c = s[3],
                                        l = s[4],
                                        u = new $.RingGeometry(i, r, 128),
                                        d = new $.Mesh(u, o.clone());
                                    d.position.set(n.x, n.y, a + l), d.material.opacity = c, e.add(d)
                                }));
                                var l = t.map.fonts.nunito800.generateShapes(r.toUpperCase(), .4),
                                    u = new $.ShapeBufferGeometry(l),
                                    d = new $.Vector3;
                                u.computeBoundingBox(), u.boundingBox.getSize(d);
                                var v = new $.Mesh(u, t.map.materials.white.clone());
                                v.position.set(n.x - d.x / 2, n.y - d.y / 2, a + .01), e.add(v);
                                var p = t.map.vm.$t("galaxy.map.blackhole").toUpperCase(),
                                    m = t.map.fonts.nunito800.generateShapes(p, .2),
                                    h = new $.ShapeBufferGeometry(m),
                                    f = new $.Vector3;
                                h.computeBoundingBox(), h.boundingBox.getSize(f);
                                var _ = new $.Mesh(h, t.map.materials.white.clone());
                                _.position.set(n.x - d.x / 2, n.y + .35, a + .01), _.material.opacity = .5, e.add(_);
                                var y = [new $.Vector3(n.x - d.x / 2 + f.x + .1, n.y + .45, a + .01), new $.Vector3(n.x - d.x / 2 + f.x + 1, n.y + .45, a + .01)],
                                    g = (new $.BufferGeometry).setFromPoints(y),
                                    b = new $.Line(g, t.map.materials.white.clone());
                                b.material.opacity = .5, e.add(b);
                                var C = [new $.Vector3(n.x - d.x / 2 - .6, n.y - .4, a + .01), new $.Vector3(n.x - d.x / 2 + .4, n.y - .4, a + .01)],
                                    k = (new $.BufferGeometry).setFromPoints(C),
                                    w = new $.Line(k, t.map.materials.white.clone());
                                w.material.opacity = .5, e.add(w)
                            })), this.group.add(e)
                        }
                    }, {
                        key: "createBlackolesFar",
                        value: function() {
                            var t = this,
                                e = this.getGroupByName("blackholes"),
                                a = A.a.MAP.Z_BLACKHOLE;
                            e || ((e = new $.Group).name = "blackholes-far", Object.assign(e.userData, {
                                near: 200,
                                far: this.map.maxZ
                            })), this.map.data.blackholes.forEach((function(s) {
                                var i = s.radius,
                                    n = s.position,
                                    r = t.map.materials.white,
                                    o = t.map.materials.black;
                                [
                                    [1e-4, i, o, 1, 0],
                                    [i - .06, i - .2, r, 1, .01],
                                    [1e-4, i / 4 * 1, o, .6, 0],
                                    [1e-4, i / 4 * 2, o, .6, 0],
                                    [1e-4, i / 4 * 3, o, .6, 0]
                                ].forEach((function(t) {
                                    var s = N()(t, 5),
                                        i = s[0],
                                        r = s[1],
                                        o = s[2],
                                        c = s[3],
                                        l = s[4],
                                        u = new $.RingGeometry(i, r, 128),
                                        d = new $.Mesh(u, o.clone());
                                    d.position.set(n.x, n.y, a + l), d.material.opacity = c, e.add(d)
                                }))
                            })), this.group.add(e)
                        }
                    }]), a
                }(Y),
                St = a(693),
                Tt = a.n(St),
                Mt = a(698),
                jt = a.n(Mt);

            function At(t) {
                var e = function() {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function() {
                    var a, s = W()(t);
                    if (e) {
                        var i = W()(this).constructor;
                        a = Reflect.construct(s, arguments, i)
                    } else a = s.apply(this, arguments);
                    return K()(this, a)
                }
            }

            function Et(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return t.map((function(t) {
                    var a = N()(t, 2),
                        s = a[0],
                        i = a[1];
                    return new $.Vector3(s, i, e)
                }))
            }
            var Nt, Dt, It = {},
                Lt = function(t) {
                    V()(a, t);
                    var e = At(a);

                    function a(t) {
                        var s;
                        p()(this, a), (s = e.call(this, t, "Character")).coordsText = "", s.pathfinder = s.createPathFinder(), s.names = {};
                        var i = new $.RingGeometry(1e-4, .6, 32);
                        return s.cache = {
                            hoverMesh: new $.Mesh(i, s.map.materials.white012)
                        }, s
                    }
                    return h()(a, [{
                        key: "_create",
                        value: function() {
                            var t = {
                                    near: 20,
                                    far: 200
                                },
                                e = new $.Group;
                            e.name = "hover-path", Object.assign(e.userData, t);
                            var a = new $.LineBasicMaterial({
                                    color: 16777215,
                                    opacity: .25,
                                    transparent: !0
                                }),
                                s = Et([]),
                                i = (new $.BufferGeometry).setFromPoints(s),
                                n = new $.Line(i, a);
                            this.line = n, e.add(n), this.group.add(e);
                            var r = new $.Group;
                            r.name = "moving-characters", Object.assign(r.userData, t), this.group.add(r);
                            var o = new $.Group;
                            o.name = "character-names-on-map", Object.assign(o.userData, t), this.group.add(o);
                            var c = new $.Group;
                            c.name = "characters-on-map", Object.assign(c.userData, t), this.group.add(c)
                        }
                    }, {
                        key: "_update",
                        value: function() {
                            this.showMovingCharacters()
                        }
                    }, {
                        key: "showMovingCharacters",
                        value: function() {
                            var t = this,
                                e = [],
                                a = y.a.state.game.player.characters.reduce((function(a, s) {
                                    if ("on_board" !== s.status) return a;
                                    var i = s.actions.queue.filter((function(t) {
                                        return "jump" === t.type
                                    })).map((function(a) {
                                        var i, n, r, o, c, l, u, d, v, p = t.map.data.systems.find((function(t) {
                                                return t.id === a.data.source
                                            })),
                                            m = t.map.data.systems.find((function(t) {
                                                return t.id === a.data.target
                                            })),
                                            h = (i = {
                                                x: p.position.x,
                                                y: p.position.y
                                            }, n = {
                                                x: m.position.x,
                                                y: m.position.y
                                            }, r = .3, o = i, l = (c = n).x - o.x, u = c.y - o.y, d = Math.sqrt(l * l + u * u), v = (d - r) / d, n.x = o.x + l * v, n.y = o.y + u * v, i.x = c.x + (o.x - c.x) * v, i.y = c.y + (o.y - c.y) * v, {
                                                p1: i,
                                                p2: n,
                                                length: d
                                            });
                                        return a.data.name = s.name, a.data.id = s.id, a.data.type = s.type, a.data.faction = s.owner.faction, a.data.line = h, e.push("(".concat(h.p1.x, ";").concat(h.p1.y, ")")), e.push("(".concat(h.p2.x, ";").concat(h.p2.y, ")")), a
                                    }));
                                    return i.length && a.push(i), a
                                }), []),
                                s = e.join("/");
                            if (s !== this.coordsText) {
                                this.coordsText = s;
                                for (var i = this.getGroupByName("moving-characters"); i.children.length;) {
                                    H(i.children.pop(), !0, !0, !1)
                                }
                                a.forEach((function(e) {
                                    for (var a = e[0].data.faction, s = 1; s < e.length; s += 1) {
                                        var n = e[s].data.line;
                                        It[a] || (It[a] = new at.MeshLineMaterial({
                                            color: t.colors[a].hex.normal,
                                            transparent: !0,
                                            lineWidth: .05,
                                            opacity: .6
                                        }));
                                        var r = It[a],
                                            o = new at.MeshLine;
                                        o.setPoints([n.p1.x, n.p1.y, A.a.MAP.Z_CHARACTER_NEAR_LINE, n.p2.x, n.p2.y, A.a.MAP.Z_CHARACTER_NEAR_LINE]);
                                        var c = new $.Mesh(o, r);
                                        i.add(c)
                                    }
                                }))
                            }
                            var n = this.getGroupByName("character-names-on-map"),
                                r = y.a.state.game.player.characters.map((function(t) {
                                    return t.name
                                })),
                                o = y.a.state.game.player.characters.map((function(t) {
                                    return t.id
                                })),
                                c = y.a.state.game.player.characters.map((function(t) {
                                    return t.owner.faction
                                }));
                            r.forEach((function(e, a) {
                                if (!(e in t.names)) {
                                    var s = t.characterLabel(o[a], e, t.colors[c[a]], A.a.MAP.Z_CHARACTER_NEAR_LABEL);
                                    t.names[e] = s, n.add(s)
                                }
                            })), Object.keys(this.names).forEach((function(e) {
                                t.names[e].visible = y.a.state.game.mapOptions.showCharacterLabel && r.includes(e)
                            }));
                            var l = this.getGroupByName("characters-on-map"),
                                u = Date.now();
                            if (this.lastDrawAt || (this.lastDrawAt = u), u - this.lastDrawAt > 80) {
                                for (this.lastDrawAt = u; l.children.length;) {
                                    H(l.children.pop())
                                }
                                a.forEach((function(e) {
                                    var a = e[0],
                                        s = a.data,
                                        i = s.name,
                                        n = s.faction,
                                        r = s.line,
                                        o = a.total_time,
                                        c = a.remaining_time,
                                        u = a.started_at,
                                        d = t.progress(u, c, o);
                                    d = Math.min(d, 100), d = Math.max(d, 0);
                                    var v = r.p1.x + d * (r.p2.x - r.p1.x),
                                        p = r.p1.y + d * (r.p2.y - r.p1.y),
                                        m = [v, p],
                                        h = [r.p2.x, r.p2.y];
                                    t.names[i].position.set(v, p, .5);
                                    var f = new at.MeshLineMaterial({
                                            color: t.colors[n].hex.normal,
                                            lineWidth: .05
                                        }),
                                        _ = new at.MeshLine;
                                    _.setPoints([].concat(m, [A.a.MAP.Z_CHARACTER_NEAR_LINE], h, [A.a.MAP.Z_CHARACTER_NEAR_LINE]));
                                    var y = new $.Mesh(_, f);
                                    l.add(y);
                                    var g = t.cache.hoverMesh.clone();
                                    g.visible = !1, g.position.set(v, p, A.a.MAP.Z_SYSTEM_NEAR_HOVER), Object.assign(g.userData, {
                                        showOnHover: !0
                                    }), l.add(g);
                                    var b = Math.atan2(r.p2.y - r.p1.y, r.p2.x - r.p1.x) + 2 * Math.PI,
                                        C = t.map.materials.sprites.characters[n][e[0].data.type].clone();
                                    C.position.set(v, p, A.a.MAP.Z_CHARACTER_NEAR_SPRITE), C.material = C.material.clone(), C.material.rotation = b, C.userData.hoverable = !0, C.gameObject = {
                                        type: "character",
                                        data: e[0].data.id
                                    }, l.add(C)
                                }))
                            }
                            var d = this.getGroupByName("idle-characters");
                            d && q(d), (d = new $.Group).name = "idle-characters", Object.assign(d.userData, {
                                near: 20,
                                far: 200
                            }), this.group.add(d);
                            var v = y.a.state.game.player.characters.filter((function(t) {
                                return "on_board" === t.status && "idle" === t.action_status
                            })).reduce((function(t, e) {
                                return t[e.system] = [].concat(O()(t[e.system] || []), [e]), t
                            }), {});
                            Object.values(v).forEach((function(e) {
                                e.forEach((function(e, a) {
                                    t.names[e.name].children[1].geometry.computeBoundingBox();
                                    var s = t.names[e.name].children[1].geometry.boundingBox,
                                        i = Math.abs(s.max.x) + Math.abs(s.min.x) + .8,
                                        n = Math.abs(s.max.y) + Math.abs(s.min.y) - .68,
                                        r = .46 * a;
                                    t.names[e.name].visible = y.a.state.game.mapOptions.showCharacterLabel, t.names[e.name].position.set(e.position.x - i, e.position.y - s.max.y - n - r, A.a.MAP.Z_SYSTEM_NEAR_STAR)
                                }))
                            }))
                        }
                    }, {
                        key: "setHoverPath",
                        value: function(t) {
                            t.length ? this.hoverPath = !0 : this.hoverPath = !1;
                            var e = Et(t);
                            this.line.geometry.setFromPoints(e), this.line.geometry.computeBoundingSphere()
                        }
                    }, {
                        key: "getSelected",
                        value: function() {
                            return y.a.state.game.player.characters.find((function(t) {
                                return t.id === y.a.state.game.selectedCharacter.id
                            }))
                        }
                    }, {
                        key: "getPosition",
                        value: function(t) {
                            return null === t.actions.virtual_position ? y.a.state.game.selectedCharacter.system : t.actions.virtual_position
                        }
                    }, {
                        key: "computePath",
                        value: function(t, e) {
                            var a = this;
                            if (t === e) return [];
                            for (var s = this.pathfinder.find(t, e), i = [], n = function(t) {
                                var e = a.map.data.systems.find((function(e) {
                                        return e.id === s[t].id
                                    })),
                                    n = a.map.data.systems.find((function(e) {
                                        return e.id === s[t + 1].id
                                    }));
                                i.push({
                                    p1: {
                                        x: e.position.x,
                                        y: e.position.y
                                    },
                                    p2: {
                                        x: n.position.x,
                                        y: n.position.y
                                    },
                                    source: n.id,
                                    target: e.id
                                })
                            }, r = s.length - 2; r >= 0; r -= 1) n(r);
                            return i
                        }
                    }, {
                        key: "hoverPathTo",
                        value: function(t) {
                            var e = this.getSelected(),
                                a = this.getPosition(e);
                            if (a !== t.id) {
                                this.displayedTravelPath = this.computePath(a, t.id);
                                var s = this.displayedTravelPath.reduce((function(t, e) {
                                    var a = e.p1,
                                        s = e.p2;
                                    return t.concat([
                                        [s.x, s.y],
                                        [a.x, a.y]
                                    ])
                                }), []);
                                this.setHoverPath(s)
                            }
                        }
                    }, {
                        key: "hideHoverPath",
                        value: function() {
                            this.setHoverPath([])
                        }
                    }, {
                        key: "characterLabel",
                        value: function(t, e, a, s) {
                            var i = new $.Group,
                                n = this.map.fonts.nunito800.generateShapes(e.toUpperCase(), .25),
                                r = new $.ShapeBufferGeometry(n),
                                o = new $.Vector3;
                            r.computeBoundingBox(), r.boundingBox.getSize(o);
                            var c = new $.Mesh(r, a.material.darker);
                            c.position.set(.5, -.15, s), i.add(c);
                            var l = new $.PlaneGeometry(o.x + .2, o.y + .2, 32),
                                u = new $.Mesh(l, this.map.materials.black100);
                            return u.position.set(.5 + o.x / 2, -.03, s - .05), u.userData.hoverable = !0, u.gameObject = {
                                type: "character",
                                data: t
                            }, i.add(u), i
                        }
                    }, {
                        key: "createPathFinder",
                        value: function() {
                            var t = y.a.state.game,
                                e = t.systems,
                                a = t.galaxy;
                            this.log("create pathfinder");
                            var s = jt()();
                            return e.forEach((function(t) {
                                s.addNode(t.id)
                            })), a.edges.forEach((function(t) {
                                s.addLink(t.s1.id, t.s2.id, {
                                    s1: t.s1,
                                    s2: t.s2,
                                    weight: t.weight
                                })
                            })), Tt.a.nba(s, {
                                distance: function(t, e, a) {
                                    return a.data.weight
                                }
                            })
                        }
                    }], [{
                        key: "canHoverPath",
                        value: function() {
                            var t = y.a.state.game.selectedCharacter;
                            return !!t && !("on_board" !== t.status || "docking" === t.action_status || "spy" === t.type && t.spy.cover.value < y.a.state.game.data.constant[0].cover_threshold)
                        }
                    }]), a
                }(Y),
                Bt = function() {
                    function t(e) {
                        var a = this,
                            s = e.scene,
                            i = e.camera,
                            n = e.renderer,
                            r = e.$root,
                            o = e.vm,
                            c = e.data,
                            l = e.fov,
                            u = e.$socket,
                            d = e.$toasted;
                        p()(this, t), this.isDev = "development" === A.a.MODE, this.log = this.isDev ? console.log : function() {}, this.scene = s, this.camera = i, this.camera.updateProjectionMatrix(), this.$root = r, this.$socket = u, this.$toasted = d, this.vm = o, this.data = c, this.renderer = n, this.requestAnimationFrame = null, this.inSystem = null, this.moving = !1, this.hovercaster = new $.Raycaster, this.textureLoader = new $.TextureLoader, this.windowHeight = 100, this.windowWidth = 100, this.onWindowResize(), this.controls = new S.a(this.camera, n.domElement), this.controls.enableKeys = !0, this.controls.keyPanSpeed = 30, this.controls.enableDamping = !0, this.controls.dampingFactor = .2, this.size = y.a.state.game.galaxy.size;
                        var v = this.size / 2,
                            m = [{
                                x: 1 / 0,
                                y: 1 / 0
                            }, {
                                x: -1 / 0,
                                y: -1 / 0
                            }];
                        this.data.systems.forEach((function(t) {
                            var e = t.position,
                                a = e.x,
                                s = e.y;
                            a < m[0].x && (m[0].x = a), a > m[1].x && (m[1].x = a), s < m[0].y && (m[0].y = s), s > m[1].y && (m[1].y = s)
                        })), this.maxZ = v / Math.tan(l / 2 * (Math.PI / 180)), this.maxZ = Math.max(this.maxZ, 330), this.minZ = 30, this.initialZ = A.a.MAP.Z_DEFAULT, this.lastZ = A.a.MAP.Z_DEFAULT, this.systemZ = 4;
                        var h = new $.Vector3(m[0].x, m[0].y, 0),
                            f = new $.Vector3(m[1].x, m[1].y, 20),
                            _ = new $.Vector3;
                        this.constrainPan = function() {
                            _.copy(a.controls.target), a.controls.target.clamp(h, f), _.sub(a.controls.target), a.camera.position.sub(_)
                        }, this.controls.addEventListener("change", this.constrainPan.bind(this)), this.controls.addEventListener("end", (function() {
                            y.a.commit("game/updateMapPosition", {
                                x: Math.round(a.camera.position.x),
                                y: Math.round(a.camera.position.y),
                                z: Math.round(a.camera.position.z)
                            })
                        })), this.controls.screenSpacePanning = !0, this.controls.enableRotate = this.isDev, this.controls.addEventListener("change", this.onControlChange.bind(this)), this.mouse = new $.Vector2(1, 1), this.mouseLastPosition = {}, document.addEventListener("mousemove", this.onMouseMove.bind(this), !1), this.renderer.domElement.addEventListener("pointerdown", this.onMouseDown.bind(this), !0), this.renderer.domElement.addEventListener("pointerup", this.onMouseUp.bind(this), !0), this.renderer.domElement.addEventListener("contextmenu", this.onMouseUp.bind(this), !0);
                        var g = new $.AmbientLight(16777215);
                        this.scene.add(g);
                        var b, C, k, w, x, P, T, M, j, E, N, D, I = this.playerSystems.length ? this.playerSystems[0].position : {
                                x: v,
                                y: v
                            },
                            B = I.x,
                            R = I.y;
                        this.setCameraPosition(B, R, this.initialZ), this.camera.zoom = 1, this.blocks = [], this.materials = (b = this, C = L(), k = new $.MeshBasicMaterial({
                            color: 15132390,
                            transparent: !0,
                            side: $.FrontSide
                        }), w = new $.MeshBasicMaterial({
                            color: 12566463,
                            transparent: !0,
                            side: $.FrontSide
                        }), x = new $.MeshBasicMaterial({
                            color: 0,
                            transparent: !0,
                            side: $.FrontSide
                        }), P = b.textureLoader.load("map/systems/uninhabited.png"), T = b.textureLoader.load("map/systems/inhabited.png"), M = b.textureLoader.load("map/systems/player.png"), j = b.textureLoader.load("map/systems/dominion.png"), E = [].concat(O()(b.gameData.faction), [{
                            key: "neutral"
                        }]), N = b.gameData.stellar_system.reduce((function(t, e) {
                            var a = .4 * e.display_size_factor,
                                s = new $.SpriteMaterial({
                                    map: P,
                                    opacity: .5
                                }),
                                i = new $.Sprite(s);
                            i.transparent = !0, i.scale.set(a, a, 1);
                            var n = new $.SpriteMaterial({
                                    map: P,
                                    opacity: 1
                                }),
                                r = new $.Sprite(n);
                            r.scale.set(a, a, 1), r.transparent = !0;
                            var o = new $.SpriteMaterial({
                                    map: T,
                                    opacity: .5
                                }),
                                c = new $.Sprite(o);
                            c.scale.set(a, a, 1), c.transparent = !0;
                            var l = new $.SpriteMaterial({
                                    map: T,
                                    opacity: 1
                                }),
                                u = new $.Sprite(l);
                            return u.scale.set(a, a, 1), u.transparent = !0, t[e.key] = {}, t[e.key].uninhabited = {
                                known: r,
                                unknown: i
                            }, t[e.key].inhabited = {
                                known: u,
                                unknown: c
                            }, t[e.key].factions = E.reduce((function(t, e) {
                                var s = C[e.key],
                                    i = new $.SpriteMaterial({
                                        map: M,
                                        opacity: .5,
                                        color: s.hex.darker
                                    }),
                                    n = new $.Sprite(i);
                                n.transparent = !0, n.scale.set(a, a, 1);
                                var r = new $.SpriteMaterial({
                                        map: M,
                                        opacity: 1,
                                        color: s.hex.darker
                                    }),
                                    o = new $.Sprite(r);
                                o.transparent = !0, o.scale.set(a, a, 1);
                                var c = new $.SpriteMaterial({
                                        map: j,
                                        opacity: .5,
                                        color: s.hex.darker
                                    }),
                                    l = new $.Sprite(c);
                                l.transparent = !0, l.scale.set(a, a, 1);
                                var u = new $.SpriteMaterial({
                                        map: j,
                                        opacity: 1,
                                        color: s.hex.darker
                                    }),
                                    d = new $.Sprite(u);
                                return d.transparent = !0, d.scale.set(a, a, 1), t[e.key] = {
                                    player: {
                                        known: o,
                                        unknown: n
                                    },
                                    dominion: {
                                        known: d,
                                        unknown: l
                                    }
                                }, t
                            }), {}), t
                        }), {}), D = {
                            character: b.textureLoader.load("map/characters/character.png"),
                            admiral: b.textureLoader.load("map/characters/admiral.png"),
                            spy: b.textureLoader.load("map/characters/spy.png"),
                            speaker: b.textureLoader.load("map/characters/speaker.png")
                        }, {
                            white: k,
                            lightGrey: w,
                            black: x,
                            sprites: {
                                systems: N,
                                characters: y.a.state.game.data.faction.reduce((function(t, e) {
                                    var a = C[e.key];
                                    return t[e.key] = {}, Object.keys(D).forEach((function(s) {
                                        var i = new $.SpriteMaterial({
                                                map: D[s],
                                                color: a.hex.lighter
                                            }),
                                            n = new $.Sprite(i);
                                        n.transparent = !0, n.scale.set(.5, .5, 1), t[e.key][s] = n
                                    })), t
                                }), {})
                            }
                        }), this.timeOffset = y.a.state.game.time.now_monotonic - Date.now(), this.$root.$on("map:centerToSystem", (function(t) {
                            a.centerToSystem(t, A.a.MAP.Z_DEFAULT, 600)
                        })), this.$root.$on("map:centerToCharacter", (function(t) {
                            if (t.system) a.centerToSystem(t.system, A.a.MAP.Z_DEFAULT, 600);
                            else {
                                var e = y.a.state.game.data.speed.find((function(t) {
                                        return t.key === y.a.state.game.time.speed
                                    })).factor,
                                    s = t.actions.queue[0],
                                    i = s.data.source_position,
                                    n = s.data.target_position,
                                    r = e * (a.timeOffset + Date.now() - s.started_at) / (18e4 * s.total_time),
                                    o = i.x + r * (n.x - i.x),
                                    c = i.y + r * (n.y - i.y);
                                a.move(o, c, A.a.MAP.Z_DEFAULT, 600, "centerToCharacter")
                            }
                        })), this.$root.$on("map:hidePath", (function() {
                            a.getBlockByName("Character").hideHoverPath()
                        })), this.$root.$on("map:addAction", (function(t, e) {
                            a.addCharacterAction(t, e)
                        }))
                    }
                    var e, a;
                    return h()(t, [{
                        key: "playerSystems",
                        get: function() {
                            return y.a.state.game.player.stellar_systems
                        }
                    }, {
                        key: "playerDominions",
                        get: function() {
                            return y.a.state.game.player.dominions
                        }
                    }, {
                        key: "gameData",
                        get: function() {
                            return y.a.state.game.data
                        }
                    }, {
                        key: "init",
                        value: (a = r()(c.a.mark((function t() {


                            // The client re-entered the game
                            if(y.a.state.granite){

                                y.a.state.granite.debug("Previously loaded. Checking if same instance...");

                                // If they switched game instances, then we need to reset some state.
                                if(y.a.state.granite.loadedInstance !== y.a.state.game.auth.instance) {
                                    y.a.state.granite.debug("Different instance. Loading diff.");
                                    let prevData = y.a.state.granite;
                                    prevData.snapshotTime = false;
                                    prevData.lastSentSys = "";
                                    prevData.loadedInstance = y.a.state.game.auth.instance;
                                    prevData.awaitingSectorDelay = true;
                                    prevData.knownSystems = [];
                                    y.a.state.granite.getData(y.a.state.granite.checkGalaxyRequest, "/galaxy/" + y.a.state.game.auth.instance);
                                }
                            }
                            else {
                                y.a.state.granite = {
                                    url:"http://localhost:8080", awaitingSectorDelay:true, knownSystems:[], keepAlive:0,
                                    lastSentSys:"", playerUpdateTime:0, data:t, snapshotTime:0, response:false, sendAllGalacticData:false,
                                    loadedInstance:y.a.state.game.auth.instance };

                                y.a.state.granite.postData = function(data, type, path = "/update") {
                                    let xhr = new XMLHttpRequest();
                                    xhr.open("POST", y.a.state.granite.url + path);
                                    xhr.timeout = 2000;
                                    xhr.setRequestHeader("Content-Type", "application/json");
                                    xhr.send(JSON.stringify({"type":type, "data":data, "instance":y.a.state.game.auth.instance}));
                                }

                                y.a.state.granite.debug = function(data) {
                                    let xhr = new XMLHttpRequest();
                                    xhr.open("POST", y.a.state.granite.url + "/debug");
                                    xhr.timeout = 200;
                                    xhr.setRequestHeader("Content-Type", "application/json");
                                    xhr.send(data);
                                }

                                y.a.state.granite.getData = function(callback, query) {
                                    let xhr = new XMLHttpRequest();
                                    xhr.open("GET", y.a.state.granite.url + query);
                                    xhr.onreadystatechange = function() {
                                        if (xhr.readyState == XMLHttpRequest.DONE) {
                                            callback(xhr.responseText, y.a.state);
                                        }
                                    }
                                    xhr.timeout = 2000;
                                    xhr.send();
                                }

                                y.a.state.granite.checkGalaxyRequest = function(res, state) {
                                    state.granite.response = true;

                                    // the API /galaxy/id sends TRUE if it finds the data, otherwise false. So, we want to send
                                    // galaxy data only if we get back FALSE, with care taken to not respond on empty responses.
                                    state.granite.sendAllGalacticData = res ? !(res.toLowerCase() === "true") : false;
                                };

                                y.a.state.granite.debug("Beginning mod loading sequence...");

                                // check if we need to export the entire galaxy, which is expensive
                                y.a.state.granite.getData(y.a.state.granite.checkGalaxyRequest, "/galaxy/" + y.a.state.game.auth.instance);

                                y.a.state.granite.updater = setInterval(
                                    function() {
                                        try {

                                            let granite = y.a.state.granite;

                                            if(granite.response) {
                                                granite.response = false;

                                                if(granite.sendAllGalacticData) {
                                                    granite.postData(y.a.state.game.galaxy, "galaxy");
                                                }

                                                granite.sendAllGalacticData = false;

                                                // regardless, we can now send snapshots as we should have a destination for them.
                                                granite.snapshotTime = Date.now();
                                            }

                                            // Wait to send sectors until they are loaded (can take some time)
                                            if(granite.awaitingSectorDelay) {
                                                if(y.a.state.game.galaxy.sectors) {
                                                    granite.awaitingSectorDelay = false;
                                                    granite.postData(y.a.state.game.galaxy.sectors, "sectors");
                                                }
                                            }

                                            if(y.a.state.game.player !== undefined && y.a.state.game.player !== null && y.a.state.game.player.account_id != null) {

                                                if(granite.snapshotTime) {

                                                    // 5 mins in milliseconds = 5 mins * 60 seconds * 1000 milliseconds
                                                    if(Date.now() - granite.snapshotTime > 60 * 1010) {
                                                        let c = y.a.state.game.galaxy;
                                                        let gal = {rand:Math.random(), "time":c.receivedAt, sectors:c.sectors, stellar_systems:c.stellar_systems, players:c.players};
                                                        granite.postData(gal, "galaxy_snapshot");
                                                        granite.snapshotTime = Date.now();
                                                    }
                                                }

                                                if(y.a.state.game.selectedSystem != null) {
                                                    let sys = y.a.state.game.selectedSystem;
                                                    if(granite.lastSentSys !== sys.name) {
                                                        granite.postData(sys, "selectsystem");
                                                        granite.lastSentSys = sys.name;
                                                    }
                                                }
                                                else {
                                                    granite.playerUpdateTime += 1;
                                                    granite.keepAlive += 1;

                                                    if(granite.keepAlive % 100 === 0)
                                                        granite.debug("Keep Alive");

                                                    /*if(granite.playerUpdateTime % 20 === 0 && granite.thing) {
                                                        granite.debug("About to send player data...");
                                                        granite.debug(granite);


                                                        y.a.state.granite.postData(
                                                            {
                                                                "credits":y.a.state.granite.thing.player.state.game.player.credit.value, "creditIn":y.a.state.granite.data.state.game.player.credit.change,
                                                                "tech":y.a.state.granite.thing.player.state.game.player.technology.value, "techIn":y.a.state.granite.thing.state.game.player.technology.change,
                                                                "ideo":y.a.state.granite.thing.player.state.game.player.ideology.value, "ideoIn":y.a.state.granite.thing.state.game.player.ideology.change,
                                                            },
                                                            "player"
                                                        );


                                                        y.a.state.granite.postData(
                                                            {
                                                                "credits":y.a.state.granite.data.player.state.game.player.credit.value, "creditIn":y.a.state.granite.data.state.game.player.credit.change,
                                                                "tech":y.a.state.granite.data.player.state.game.player.technology.value, "techIn":y.a.state.granite.data.state.game.player.technology.change,
                                                                "ideo":y.a.state.granite.data.player.state.game.player.ideology.value, "ideoIn":y.a.state.granite.data.state.game.player.ideology.change,
                                                            },
                                                            "player"
                                                        );

                                                    }*/
                                                }
                                            }
                                            else {
                                                //granite.debug("No game loaded; ignoring...");
                                            }
                                        }
                                        catch(err) {
                                            y.a.state.granite.postData(err, "crash");
                                        }
                                    },
                                    100
                                );
                            }

                            var e, a = this;
                            return c.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return e = {
                                            begin: function() {},
                                            end: function() {}
                                        }, this.isDev && ((e = new M.a).setMode(0), e.domElement.setAttribute("id", "threejs-stats"), document.body.appendChild(e.domElement)), t.next = 4, B();
                                    case 4:
                                        this.fonts = t.sent, this.sceneInit(), this.mapUpdate = !0,
                                            function t() {
                                                if (j.a.update(), a.mapUpdate) {
                                                    e.begin(), a.controls.update();
                                                    var s = a.camera.position.z;
                                                    a.blocks.forEach((function(t) {
                                                        t.update(), t.animationCallbacks.forEach((function(t) {
                                                            var e = t.far,
                                                                a = t.near,
                                                                i = t.cb;
                                                            s < e && s >= a && i()
                                                        }))
                                                    })), a.renderer.render(a.scene, a.camera), e.end(), a.requestAnimationFrame = requestAnimationFrame(t)
                                                } else a.requestAnimationFrame = requestAnimationFrame(t)
                                            }();
                                    case 9:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        }))), function() {
                            return a.apply(this, arguments)
                        })
                    }, {
                        key: "destroy",
                        value: function() {
                            if (this.isDev) {
                                var t = document.getElementById("threejs-stats");
                                t.parentNode.removeChild(t)
                            }
                            this.unbindEvents()
                        }
                    }, {
                        key: "bindEvents",
                        value: function() {
                            var t = this;
                            setTimeout((function() {
                                t.onWindowResize()
                            }), 0), this.$root.$on("enterSystem", (function(e) {
                                t.enterSystem(e)
                            })), this.$root.$on("exitSystem", (function() {
                                t.exitSystem()
                            })), window.addEventListener("resize", this.onWindowResize.bind(this), !1)
                        }
                    }, {
                        key: "unbindEvents",
                        value: function() {
                            cancelAnimationFrame(this.requestAnimationFrame), window.removeEventListener("resize", this.onWindowResize), document.removeEventListener("change", this.onControlChange), document.removeEventListener("mousemove", this.onMouseMove), this.renderer.domElement.removeEventListener("pointerdown", this.onMouseDown), this.renderer.domElement.removeEventListener("pointerup", this.onMouseUp), this.renderer.domElement.removeEventListener("contextmenu", this.onMouseUp), this.controls.removeEventListener("change", this.constrainPan)
                        }
                    }, {
                        key: "onMouseDown",
                        value: function(t) {
                            this.onClick(t, "down")
                        }
                    }, {
                        key: "onMouseUp",
                        value: function(t) {
                            this.onClick(t, "up")
                        }
                    }, {
                        key: "onClick",
                        value: function(t, e) {
                            var a;
                            switch (t.button) {
                                case 1:
                                    a = "middle";
                                    break;
                                case 2:
                                    a = "right";
                                    break;
                                default:
                                    a = "left"
                            }
                            if (t.ctrlKey && "left" === a && (a = "right"), "down" === e && (this.mouseLastPosition = {
                                x: t.clientX,
                                y: t.clientY
                            }), "up" === e && !this.inSystem) {
                                if (Nt) {
                                    var s = Nt.gameObject;
                                    if ("system" === s.type) {
                                        var i = s.data;
                                        "left" === a ? y.a.dispatch("game/openSystem", {
                                            vm: this.vm,
                                            id: i.id
                                        }) : this.addCharacterAction("jump", {
                                            system: i
                                        })
                                    } else if ("character" === s.type) {
                                        var n = s.data;
                                        "left" === a && y.a.dispatch("game/selectCharacter", {
                                            vm: this.vm,
                                            id: n
                                        })
                                    }
                                } else "left" === a && this.mouseLastPosition.x === t.clientX && this.mouseLastPosition.y === t.clientY && y.a.dispatch("game/unselectCharacter");
                                this.mouseLastPosition = {}
                            }
                        }
                    }, {
                        key: "onWindowResize",
                        value: function() {
                            this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.camera.aspect = this.windowWidth / this.windowHeight, this.camera.updateProjectionMatrix(), this.renderer.setSize(this.windowWidth, this.windowHeight)
                        }
                    }, {
                        key: "onControlChange",
                        value: function() {
                            if (!this.moving) {
                                1 !== this.camera.zoom && (this.camera.zoom = 1);
                                var t = this.camera.position;
                                if (t.z > this.maxZ ? this.setCameraPosition(t.x, t.y, this.maxZ) : t.z < this.minZ && this.setCameraPosition(t.x, t.y, this.minZ), this.inSystem) {
                                    var e = this.inSystem.position,
                                        a = e.x,
                                        s = e.y;
                                    this.setCameraPosition(a, s, this.systemZ)
                                }
                                this.onZ(this.camera.position.z)
                            }
                        }
                    }, {
                        key: "onZ",
                        value: function(t) {
                            this.blocks.forEach((function(e) {
                                return e.onZ(t)
                            }))
                        }
                    }, {
                        key: "onMouseMove",
                        value: function(t) {
                            if (t.preventDefault(), !this.inSystem) {
                                this.mouse.x = t.clientX / this.windowWidth * 2 - 1, this.mouse.y = -t.clientY / this.windowHeight * 2 + 1, this.hovercaster.setFromCamera(this.mouse, this.camera);
                                for (var e = [{
                                    block: "System",
                                    group: "systems-near"
                                }, {
                                    block: "Character",
                                    group: "characters-on-map"
                                }, {
                                    block: "Character",
                                    group: "character-names-on-map"
                                }, {
                                    block: "Sector",
                                    group: "sector-far"
                                }], a = 0; a < e.length; a += 1) {
                                    var s = e[a],
                                        i = this.getBlockByName(s.block);
                                    if (i) {
                                        if ("Sector" === s.block && i.shown !== s.group) break;
                                        if ("System" === s.block && Nt) {
                                            var n = this.hovercaster.intersectObjects([Nt].concat(O()(Nt.children)), !0);
                                            if (n.length) {
                                                var r, o, c;
                                                if (n[0].object.parent.id === Nt.id) break;
                                                if (null !== (r = n[0]) && void 0 !== r && null !== (o = r.object) && void 0 !== o && null !== (c = o.parent) && void 0 !== c && c.gameObject) {
                                                    Nt = n[0].object.parent;
                                                    break
                                                }
                                            }
                                        }
                                        if (i) {
                                            var l = i.getGroupByName(s.group).children,
                                                u = this.hovercaster.intersectObjects(l, !0).filter((function(t) {
                                                    var e;
                                                    return null === (e = t.object.userData) || void 0 === e ? void 0 : e.hoverable
                                                }));
                                            if (u.length > 0) {
                                                for (var d = u[0].object; d && !("gameObject" in d);) d = d.parent;
                                                var v = Nt && d.id === Nt.id;
                                                if (d) {
                                                    if (v) break;
                                                    "sector" === d.gameObject.type && y.a.commit("game/addMapOverlay", d.gameObject), this.hideHover(), this.showHover(d, s.block);
                                                    break
                                                }
                                                this.hideHover()
                                            } else this.hideHover()
                                        }
                                    }
                                }
                            }
                        }
                    }, {
                        key: "sceneInit",
                        value: function() {
                            var t = this,
                                e = [new bt(this), new Ot(this), new lt(this), new dt(this), new ft(this), new $t(this), new Lt(this)];
                            Promise.all(e.map((function(e) {
                                return e.update({}).then((function(a) {
                                    e.group.children.forEach((function(t) {
                                        t.visible = !1
                                    })), t.blocks.push(e), t.scene.add(e.group)
                                }))
                            })))
                        }
                    }, {
                        key: "addCharacterAction",
                        value: function(t) {
                            var e = this,
                                a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (y.a.state.game.selectedCharacter) {
                                var s = a.character,
                                    i = a.system,
                                    n = this.getBlockByName("Character"),
                                    r = [],
                                    o = y.a.state.game.selectedCharacter.actions.virtual_position,
                                    c = y.a.state.game.selectedCharacter.id,
                                    l = n.computePath(o, i.id);
                                l.length && (r.push.apply(r, O()(l.map((function(t) {
                                    return {
                                        type: "jump",
                                        data: {
                                            source: t.source,
                                            target: t.target
                                        }
                                    }
                                })))), o = r[r.length - 1].data.target), ["fight", "sabotage", "assassination", "conversion"].includes(t) && r.push({
                                    type: t,
                                    data: {
                                        target: o,
                                        target_character: s
                                    }
                                }), ["colonization", "conquest", "raid", "loot", "infiltrate", "make_dominion", "encourage_hate"].includes(t) && r.push({
                                    type: t,
                                    data: {
                                        target: o
                                    }
                                }), this.$socket.player.push("add_character_actions", {
                                    character_id: c,
                                    actions: r
                                }).receive("error", (function(t) {
                                    e.$toastError(t.reason)
                                }))
                            }
                        }
                    }, {
                        key: "showHover",
                        value: function(t, e) {
                            (Nt = t, t.children.filter((function(t) {
                                return !0 === t.userData.showOnHover
                            })).forEach((function(t) {
                                t.visible = !0
                            })), "System" === e && Lt.canHoverPath()) && this.getBlockByName("Character").hoverPathTo(t.gameObject.data)
                        }
                    }, {
                        key: "hideHover",
                        value: function() {
                            if (Nt) {
                                "sector" === Nt.gameObject.type && y.a.commit("game/clearMapOverlay");
                                var t = Nt.children;
                                !Nt.name && Nt.parent && (t = Nt.parent.children), t.filter((function(t) {
                                    return !0 === t.userData.showOnHover
                                })).forEach((function(t) {
                                    t.visible = !1
                                })), Nt = void 0, this.getBlockByName("Character").hideHoverPath()
                            }
                        }
                    }, {
                        key: "centerToSystem",
                        value: function(t, e, a) {
                            var s = this.data.systems.find((function(e) {
                                return e.id === t
                            }));
                            s && this.move(s.position.x, s.position.y, e, a, "centerToSystem")
                        }
                    }, {
                        key: "setCameraPosition",
                        value: function(t, e) {
                            var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.camera.position.z;
                            this.camera.position.set(t, e, a), this.camera.lookAt(new $.Vector3(t, e, 0)), this.controls.target = new $.Vector3(t, e, 0)
                        }
                    }, {
                        key: "move",
                        value: (e = r()(c.a.mark((function t(e, a) {
                            var s, i, n, r = this,
                                o = arguments;
                            return c.a.wrap((function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        if (s = o.length > 2 && void 0 !== o[2] ? o[2] : this.camera.position.z, i = o.length > 3 ? o[3] : void 0, n = o.length > 4 ? o[4] : void 0, !this.moving) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return", Promise.resolve());
                                    case 5:
                                        if (this.moving = n, i) {
                                            t.next = 10;
                                            break
                                        }
                                        return this.setCameraPosition(e, a, s), this.moving = !1, t.abrupt("return", Promise.resolve());
                                    case 10:
                                        return t.abrupt("return", new Promise((function(t) {
                                            new j.a.Tween(r.camera.position).to({
                                                x: e,
                                                y: a,
                                                z: s
                                            }, i).easing(j.a.Easing.Cubic.InOut).onComplete((function() {
                                                r.moving = !1, t()
                                            })).onUpdate((function(t) {
                                                var e = t.x,
                                                    a = t.y,
                                                    s = t.z;
                                                r.camera.lookAt(new $.Vector3(e, a, 0)), r.controls.target = new $.Vector3(e, a, 0), r.onZ(s)
                                            })).start()
                                        })));
                                    case 11:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        }))), function(t, a) {
                            return e.apply(this, arguments)
                        })
                    }, {
                        key: "moveRel",
                        value: function(t, e) {
                            var a = this.camera.position;
                            this.setCameraPosition(a.x + t, a.y + e)
                        }
                    }, {
                        key: "enterSystem",
                        value: function(t) {
                            var e = this;
                            this.inSystem = t, this.camera.position.z !== this.systemZ && (this.lastZ = this.camera.position.z);
                            var a = t.position;
                            this.vm.$ambiance.sound("system-open"), this.move(a.x, a.y, this.systemZ, 500, "enterSystem"), setTimeout((function() {
                                y.a.commit("game/finishSystemTransition"), e.mapUpdate && (e.mapUpdate = !1)
                            }), 500)
                        }
                    }, {
                        key: "exitSystem",
                        value: function() {
                            var t = this.lastZ || this.initialZ;
                            this.mapUpdate = !0, this.inSystem = null, this.lastZ = null, this.vm.$ambiance.sound("system-close"), this.move(this.camera.position.x, this.camera.position.y, t, 500, "exitSystem")
                        }
                    }, {
                        key: "getBlockByName",
                        value: function(t) {
                            return this.blocks.find((function(e) {
                                return e.group.name === t
                            }))
                        }
                    }]), t
                }(),
                Rt = a(626),
                zt = {
                    name: "sector-card",
                    mixins: [Rt.a],
                    props: {
                        sector: {
                            type: Object,
                            required: !0
                        }
                    },
                    computed: {
                        totalPoints: function() {
                            return this.sector.division.reduce((function(t, e) {
                                return t + e.points
                            }), 0)
                        }
                    },
                    methods: {
                        getOwner: function(t) {
                            return t || "neutral"
                        },
                        ownerTheme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    }
                },
                Ft = a(42),
                Ht = Object(Ft.a)(zt, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container"
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, [t.sector.owner ? a("svgicon", {
                        attrs: {
                            name: "faction/" + t.getOwner(t.sector.owner) + "-small"
                        }
                    }) : t._e()], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large nowrap"
                    }, [t._v("\n        " + t._s(t.sector.name) + "\n      ")])])]), t._v(" "), a("div", {
                        staticClass: "card-body"
                    }, [a("div", {
                        staticClass: "card-illustration"
                    }, [a("img", {
                        attrs: {
                            src: "data/sectors/default.jpg"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "marker",
                        class: "force-" + t.ownerTheme(t.sector.owner)
                    }), t._v(" "), a("div", {
                        staticClass: "marker-label"
                    }, [t._v("\n        " + t._s(t.sector.victory_points) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "card-information"
                    }, [a("div", {
                        staticClass: "card-panel-controls"
                    }, [t.leftControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-left"
                        },
                        on: {
                            click: t.movePanelToLeft
                        }
                    }) : a("div"), t._v(" "), t.rightControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-right"
                        },
                        on: {
                            click: t.movePanelToRight
                        }
                    }) : a("div")], 1), t._v(" "), a("div", {
                        staticClass: "card-panel-window"
                    }, [a("div", {
                        ref: "panelContainer",
                        staticClass: "card-panel-container",
                        style: {
                            left: t.panelContainerPosition + "px"
                        }
                    }, [a("div", {
                        staticClass: "card-panel"
                    }, [a("h2", [t._v(t._s(t.$t("card.sector.repartition")))]), t._v(" "), t._l(t.sector.division, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "ship-skills"
                        }, [a("div", {
                            staticClass: "skills-text"
                        }, [a("div", [t._v(t._s(t.$t("data.faction." + t.getOwner(e.faction) + ".name")))]), t._v(" "), a("div", [a("strong", [t._v(t._s(e.points))])])]), t._v(" "), a("div", {
                            staticClass: "skills-line"
                        }, [a("span", {
                            class: "force-color-" + t.ownerTheme(e.faction),
                            style: "width: " + e.points / t.totalPoints * 100 + "%;"
                        })])])
                    }))], 2)])])])])])
                }), [], !1, null, null, null).exports,
                qt = {
                    name: "universe-map",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            modes: [{
                                key: "population",
                                icon: "layers"
                            }, {
                                key: "visibility",
                                icon: "eye"
                            }, {
                                key: "radar",
                                icon: "disc"
                            }]
                        }
                    },
                    computed: {
                        view: function() {
                            return this.$store.state.game.view
                        },
                        mapOptions: function() {
                            return this.$store.state.game.mapOptions
                        },
                        mapPosition: function() {
                            return this.$store.state.game.mapPosition
                        },
                        activeSector: function() {
                            var t = this;
                            return this.$store.state.game.mapOverlay && "sector" === this.$store.state.game.mapOverlay.type ? this.$store.state.game.galaxy.sectors.find((function(e) {
                                return e.id === t.$store.state.game.mapOverlay.data
                            })) : null
                        }
                    },
                    methods: {
                        updateMapOptions: function(t, e) {
                            e !== this.mapOptions.mode && (this.$store.commit("game/updateMapOptions", {
                                key: t,
                                value: e
                            }), this.data.forceRedrawRadars())
                        }
                    },
                    mounted: function() {
                        var t = this;
                        return r()(c.a.mark((function e() {
                            var a, s, i, n;
                            return c.a.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return "fast" === t.$store.state.game.time.speed && t.updateMapOptions("mode", "radar"), a = t.$refs.mapcontainer, 30, s = new $.PerspectiveCamera(30, a.clientWidth / a.clientHeight, 1, 1500), i = new $.Scene, (n = new $.WebGLRenderer({
                                            antialias: !0
                                        })).setSize(a.clientWidth, a.clientHeight), a.appendChild(n.domElement), Dt = new Bt({
                                            scene: i,
                                            camera: s,
                                            renderer: n,
                                            fov: 30,
                                            $root: t.$root,
                                            vm: t,
                                            data: t.data,
                                            $socket: t.$socket,
                                            $$toasted: t.$$toasted
                                        }), e.next = 11, Dt.init();
                                    case 11:
                                        Dt.onZ(s.position.z), Dt.bindEvents(), n.setClearColor(0, 1);
                                    case 14:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })))()
                    },
                    beforeDestroy: function() {
                        Dt.destroy()
                    },
                    components: {
                        SectorCard: Ht
                    }
                },
                Gt = Object(Ft.a)(qt, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "map" === this.view,
                            expression: "this.view === 'map'"
                        }],
                        staticClass: "map-options"
                    }, [a("div", {
                        staticClass: "map-options-group"
                    }, [a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("galaxy.map.modes.character-label"),
                            expression: "$t(`galaxy.map.modes.character-label`)"
                        }],
                        staticClass: "map-options-item",
                        class: {
                            "is-active": t.mapOptions.showCharacterLabel
                        },
                        on: {
                            click: function(e) {
                                return t.updateMapOptions("showCharacterLabel", !t.mapOptions.showCharacterLabel)
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "map-options-group"
                    }, t._l(t.modes, (function(e) {
                        return a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("galaxy.map.modes." + e.key),
                                expression: "$t(`galaxy.map.modes.${mode.key}`)"
                            }],
                            key: e.key,
                            staticClass: "map-options-item",
                            class: {
                                "is-active": e.key === t.mapOptions.mode
                            },
                            on: {
                                click: function(a) {
                                    return t.updateMapOptions("mode", e.key)
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: e.icon
                            }
                        })], 1)
                    })), 0)]), t._v(" "), t._m(0), t._v(" "), a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "map" === this.view,
                            expression: "this.view === 'map'"
                        }],
                        staticClass: "map-position"
                    }, [a("div", {
                        staticClass: "map-position-xy"
                    }, [t._v("\n      " + t._s(t.mapPosition.x) + ":" + t._s(t.mapPosition.y) + "\n    ")])]), t._v(" "), t.activeSector ? a("div", {
                        staticClass: "map-overlay"
                    }, [a("sector-card", {
                        attrs: {
                            sector: t.activeSector
                        }
                    })], 1) : t._e(), t._v(" "), a("div", {
                        ref: "mapcontainer"
                    })])
                }), [function() {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "map-cross"
                    }, [e("div", {
                        staticClass: "map-cross-a"
                    }), this._v(" "), e("div", {
                        staticClass: "map-cross-b"
                    })])
                }], !1, null, null, null).exports,
                Vt = {
                    name: "empire-overall-panel",
                    computed: {
                        player: function() {
                            return this.$store.state.game.player
                        }
                    }
                },
                Zt = {
                    name: "empire-possessions-panel",
                    computed: {
                        player: function() {
                            return this.$store.state.game.player
                        },
                        possessions: function() {
                            var t = this.player.stellar_systems.concat(this.player.dominions);
                            return this.$store.state.game.galaxy.sectors.map((function(e) {
                                var a = t.filter((function(t) {
                                    return t.sector_id === e.id
                                }));
                                return {
                                    id: e.id,
                                    name: e.name,
                                    systems: a
                                }
                            })).filter((function(t) {
                                return t.systems.length > 0
                            }))
                        },
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        }
                    },
                    methods: {
                        openSystem: function(t) {
                            this.$emit("close"), this.$store.dispatch("game/openSystem", {
                                vm: this,
                                id: t
                            })
                        }
                    }
                },
                Kt = {
                    name: "faction-panel",
                    data: function() {
                        return {
                            activePanel: "overall",
                            panels: ["overall", "possessions"]
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        }
                    },
                    methods: {
                        open: function(t) {},
                        close: function() {
                            this.$emit("close")
                        }
                    },
                    components: {
                        Overall: Object(Ft.a)(Vt, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "panel-content is-small"
                            }, [a("v-scrollbar", {
                                staticClass: "has-padding"
                            }, [a("h1", {
                                staticClass: "panel-default-title"
                            }, [t._v("\n      " + t._s(t.$t("panel.empire.overall_title")) + "\n    ")]), t._v(" "), a("section", [a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.system_count")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t.player.stellar_systems.length) + "/" + t._s(t.player.max_systems.value) + "\n        ")])]), t._v(" "), a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.dominion_count")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t.player.dominions.length) + "/" + t._s(t.player.max_dominions.value) + "\n        ")])]), t._v(" "), a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.dominion_rate")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(100 * t.player.dominion_rate.value) + "%\n        ")])])]), t._v(" "), a("hr", {
                                staticClass: "panel-default-hr"
                            }), t._v(" "), a("section", [a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.credit_income")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t._f("float")(t.player.credit.change, 1, !0)) + "\n        ")])]), t._v(" "), a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.technology_income")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t._f("float")(t.player.technology.change, 1, !0)) + "\n        ")])]), t._v(" "), a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.ideology_income")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t._f("float")(t.player.ideology.change, 1, !0)) + "\n        ")])])]), t._v(" "), a("hr", {
                                staticClass: "panel-default-hr"
                            }), t._v(" "), a("section", [a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.lex_count")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t.player.doctrines.length) + "\n        ")])]), t._v(" "), a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.policy_count")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t.player.policies.length) + "/" + t._s(t.player.max_policies) + "\n        ")])]), t._v(" "), a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n          " + t._s(t.$t("panel.empire.patent_count")) + "\n        ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n          " + t._s(t.player.patents.length) + "\n        ")])])])])], 1)
                        }), [], !1, null, null, null).exports,
                        Possessions: Object(Ft.a)(Zt, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "panel-content is-large"
                            }, [a("v-scrollbar", {
                                staticClass: "has-padding"
                            }, t._l(t.possessions, (function(e) {
                                return a("section", {
                                    key: "sector-" + e.id
                                }, [a("h1", {
                                    staticClass: "panel-default-title"
                                }, [t._v("\n        " + t._s(e.name) + "\n        "), a("span", [t._v("\n          " + t._s(t.$tc("panel.empire.systems", e.systems.length, {
                                    number: e.systems.length
                                })) + "\n        ")])]), t._v(" "), t._l(e.systems, (function(e) {
                                    return a("div", {
                                        key: e.id,
                                        staticClass: "pcb-system",
                                        on: {
                                            click: function(a) {
                                                return t.openSystem(e.id)
                                            }
                                        }
                                    }, [a("div", {
                                        staticClass: "icon"
                                    }, [a("svgicon", {
                                        attrs: {
                                            name: "stellar_system/" + e.type
                                        }
                                    })], 1), t._v(" "), a("div", {
                                        staticClass: "name"
                                    }, [t._v("\n          " + t._s(e.name) + "\n          "), "inhabited_dominion" === e.status ? a("span", {
                                        staticClass: "is-small"
                                    }, [t._v("\n            (" + t._s(t.$t("panel.empire.dominion")) + ")\n          ")]) : t._e(), t._v(" "), e.governor ? a("svgicon", {
                                        attrs: {
                                            name: "agent/" + e.governor.type
                                        }
                                    }) : t._e()], 1), t._v(" "), a("div", {
                                        staticClass: "resource-toast"
                                    }, [a("div", {
                                        staticClass: "header"
                                    }, [t._v("\n            " + t._s(t._f("integer")(e.production)) + "\n            "), a("svgicon", {
                                        attrs: {
                                            name: "resource/production"
                                        }
                                    })], 1), t._v(" "), a("div", {
                                        directives: [{
                                            name: "show",
                                            rawName: "v-show",
                                            value: e.queue > 0,
                                            expression: "system.queue > 0"
                                        }],
                                        staticClass: "toast active",
                                        domProps: {
                                            innerHTML: t._s(t.$t("panel.empire.items_in_queue", {
                                                number: e.queue
                                            }))
                                        }
                                    }), t._v(" "), a("div", {
                                        directives: [{
                                            name: "show",
                                            rawName: "v-show",
                                            value: 0 === e.queue,
                                            expression: "system.queue === 0"
                                        }],
                                        staticClass: "toast"
                                    }, [t._v("\n            " + t._s(t.$t("panel.empire.empty_queue")) + "\n          ")])]), t._v(" "), a("div", {
                                        staticClass: "resource-toast"
                                    }, [a("div", {
                                        staticClass: "header"
                                    }, [t._v("\n            " + t._s(t._f("integer")(e.workforce)) + "\n            "), a("svgicon", {
                                        attrs: {
                                            name: "resource/population"
                                        }
                                    }), t._v(" /\n            " + t._s(t._f("integer")(e.habitation)) + "\n            "), a("svgicon", {
                                        attrs: {
                                            name: "resource/habitation"
                                        }
                                    })], 1), t._v(" "), a("div", {
                                        staticClass: "toast",
                                        class: {
                                            active: e.happiness > 0
                                        }
                                    }, [a("strong", [t._v(t._s(t._f("integer")(e.happiness)))]), t._v("\n            " + t._s(t.$t("panel.empire.stability")) + "\n          ")])]), t._v(" "), a("div", {
                                        staticClass: "resource"
                                    }, [e.credit > 0 ? [t._v("\n            " + t._s(t._f("integer")(e.credit)) + "\n            "), a("svgicon", {
                                        attrs: {
                                            name: "resource/credit"
                                        }
                                    })] : t._e()], 2), t._v(" "), a("div", {
                                        staticClass: "resource"
                                    }, [e.technology > 0 ? [t._v("\n            " + t._s(t._f("integer")(e.technology)) + "\n            "), a("svgicon", {
                                        attrs: {
                                            name: "resource/technology"
                                        }
                                    })] : t._e()], 2), t._v(" "), a("div", {
                                        staticClass: "resource"
                                    }, [e.ideology > 0 ? [t._v("\n            " + t._s(t._f("integer")(e.ideology)) + "\n            "), a("svgicon", {
                                        attrs: {
                                            name: "resource/ideology"
                                        }
                                    })] : t._e()], 2), t._v(" "), a("div", {
                                        staticClass: "resource-toast"
                                    }, [a("div", {
                                        staticClass: "header"
                                    }, [t._v("\n            " + t._s(t._f("integer")(e.defense)) + "\n            "), a("svgicon", {
                                        attrs: {
                                            name: "resource/defense"
                                        }
                                    })], 1), t._v(" "), a("div", {
                                        directives: [{
                                            name: "show",
                                            rawName: "v-show",
                                            value: e.radar > 1,
                                            expression: "system.radar > 1"
                                        }],
                                        staticClass: "toast active"
                                    }, [t._v("\n            " + t._s(t.$t("panel.empire.active_radar")) + "\n          ")]), t._v(" "), a("div", {
                                        directives: [{
                                            name: "show",
                                            rawName: "v-show",
                                            value: e.radar <= 1,
                                            expression: "system.radar <= 1"
                                        }],
                                        staticClass: "toast"
                                    }, [t._v("\n            " + t._s(t.$t("panel.empire.inactive_radar")) + "\n          ")])])])
                                }))], 2)
                            })), 0)], 1)
                        }), [], !1, null, null, null).exports
                    }
                },
                Ut = Object(Ft.a)(Kt, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-container is-left",
                        class: t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("div", {
                        staticClass: "panel-navbar"
                    }, t._l(t.panels, (function(e) {
                        return a("button", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.right",
                                value: t.$t("panel.empire." + e),
                                expression: "$t(`panel.empire.${panel}`)",
                                modifiers: {
                                    right: !0
                                }
                            }],
                            key: e,
                            class: {
                                "is-active": t.activePanel === e
                            },
                            on: {
                                click: function(a) {
                                    t.activePanel = e
                                }
                            }
                        })
                    })), 0), t._v(" "), a("overall", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "overall" === t.activePanel,
                            expression: "activePanel === 'overall'"
                        }]
                    }), t._v(" "), a("possessions", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "possessions" === t.activePanel,
                            expression: "activePanel === 'possessions'"
                        }],
                        on: {
                            close: t.close
                        }
                    })], 1)
                }), [], !1, null, null, null).exports,
                Wt = {
                    name: "operation-agents-panel",
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        onboards: function() {
                            return this.$store.state.game.player.characters.filter((function(t) {
                                return "on_board" === t.status
                            }))
                        },
                        governors: function() {
                            return this.$store.state.game.player.characters.filter((function(t) {
                                return "governor" === t.status
                            }))
                        }
                    },
                    methods: {
                        openGovernor: function(t) {
                            this.$emit("close"), this.$store.dispatch("game/openSystem", {
                                vm: this,
                                id: t.system
                            }), this.$store.dispatch("game/openCharacter", {
                                vm: this,
                                id: t.id
                            })
                        },
                        openCharacter: function(t) {
                            this.$emit("close"), this.$root.$emit("map:centerToCharacter", t), this.$store.dispatch("game/openCharacter", {
                                vm: this,
                                id: t.id
                            })
                        }
                    }
                },
                Yt = Object(Ft.a)(Wt, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-content is-small"
                    }, [a("v-scrollbar", {
                        staticClass: "has-padding"
                    }, [a("section", [a("h1", {
                        staticClass: "panel-default-title"
                    }, [t._v("\n        " + t._s(t.$t("panel.operations.onboard")) + "\n        "), a("span", [t._v(t._s(t.$t("panel.operations.onboard_subtitle")))])]), t._v(" "), t._l(t.onboards, (function(e) {
                        return a("div", {
                            key: "onboard-" + e.id,
                            staticClass: "pcb-character",
                            on: {
                                click: function(a) {
                                    return t.openCharacter(e)
                                }
                            }
                        }, [a("div", {
                            staticClass: "icon"
                        }, [a("svgicon", {
                            attrs: {
                                name: "agent/" + e.type
                            }
                        })], 1), t._v(" "), a("div", {
                            staticClass: "name"
                        }, [a("strong", [t._v(t._s(e.name))]), t._v("\n          " + t._s(t.$t("data.character." + e.type + ".specializations." + e.specialization)) + "\n        ")]), t._v(" "), a("div", {
                            staticClass: "level"
                        }, [t._v("\n          " + t._s(t.$t("panel.operations.level", {
                            level: e.level
                        })) + "\n        ")])])
                    })), t._v(" "), 0 === t.onboards.length ? a("div", {
                        staticClass: "pcb-character-empty"
                    }, [t._v("\n        " + t._s(t.$t("panel.operations.no_onboard")) + "\n      ")]) : t._e()], 2), t._v(" "), a("hr", {
                        staticClass: "panel-default-hr"
                    }), t._v(" "), a("section", [a("h1", {
                        staticClass: "panel-default-title"
                    }, [t._v("\n        " + t._s(t.$t("panel.operations.governors")) + "\n        "), a("span", [t._v(t._s(t.$t("panel.operations.governors_subtitle")))])]), t._v(" "), t._l(t.governors, (function(e) {
                        return a("div", {
                            key: "governor-" + e.id,
                            staticClass: "pcb-character",
                            on: {
                                click: function(a) {
                                    return t.openGovernor(e)
                                }
                            }
                        }, [a("div", {
                            staticClass: "icon"
                        }, [a("svgicon", {
                            attrs: {
                                name: "agent/" + e.type
                            }
                        })], 1), t._v(" "), a("div", {
                            staticClass: "name"
                        }, [a("strong", [t._v(t._s(e.name))]), t._v("\n          " + t._s(t.$t("data.character." + e.type + ".specializations." + e.specialization)) + "\n        ")]), t._v(" "), a("div", {
                            staticClass: "level"
                        }, [t._v("\n          " + t._s(t.$t("panel.operations.level", {
                            level: e.level
                        })) + "\n        ")])])
                    })), t._v(" "), 0 === t.governors.length ? a("div", {
                        staticClass: "pcb-character-empty"
                    }, [t._v("\n        " + t._s(t.$t("panel.operations.no_governors")) + "\n      ")]) : t._e()], 2), t._v(" "), a("div", {
                        staticClass: "anchor"
                    })])], 1)
                }), [], !1, null, null, null).exports;

            function Qt(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }
            var Jt = {
                    name: "fight-report",
                    props: {
                        report: String
                    },
                    computed: {
                        content: function() {
                            try {
                                return JSON.parse(this.report)
                            } catch (t) {
                                this.$toastError(t)
                            }
                            return {}
                        },
                        faction: function() {
                            return this.$store.state.game.faction
                        },
                        characters: function() {
                            return this.content.initial.attackers.concat(this.content.initial.defenders)
                        }
                    },
                    methods: {
                        getShip: function(t) {
                            var e = this.characters.find((function(e) {
                                    return e.id === t.character
                                })),
                                a = e.army.tiles.find((function(e) {
                                    return e.id === t.tile
                                }));
                            return function(t) {
                                for (var e = 1; e < arguments.length; e++) {
                                    var a = null != arguments[e] ? arguments[e] : {};
                                    e % 2 ? Qt(Object(a), !0).forEach((function(e) {
                                        i()(t, e, a[e])
                                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Qt(Object(a)).forEach((function(e) {
                                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                                    }))
                                }
                                return t
                            }({
                                theme: this.$store.getters["game/themeByKey"](e.owner.faction)
                            }, a.ship)
                        },
                        computeStrikes: function(t) {
                            var e = t.reduce((function(t, e) {
                                return e.strikes.reduce((function(t, e) {
                                    return "missed" === e.action ? t.missed += 1 : "hit" === [].includes(e.action) ? t.hit += 1 : "hit_and_crashed" === e.action && (t.hit_and_crashed += 1), t.damages += e.damages, t
                                }), t)
                            }), {
                                missed: 0,
                                hit: 0,
                                hit_and_crashed: 0,
                                damages: 0
                            });
                            return this.$tmd("panel.operations.fight_strike", {
                                damages: Math.round(e.damages),
                                hit_count: e.hit + e.hit_and_crashed,
                                missed_count: e.missed,
                                crashed_count: e.hit_and_crashed
                            })
                        },
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    }
                },
                Xt = Object(Ft.a)(Jt, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "fight-report"
                    }, [t._l(["attackers", "defenders"], (function(e) {
                        return a("div", {
                            key: e
                        }, [a("div", {
                            staticClass: "title"
                        }, [t._v("\n      " + t._s(t.$t("panel.operations.fight_side_" + e)) + "\n    ")]), t._v(" "), t._l(t.content.initial[e], (function(e, s) {
                            return a("div", {
                                key: e.id
                            }, [s > 0 ? a("div", [t._v(t._s(t.$t("panel.operations.fight_and")))]) : t._e(), t._v(" "), a("span", {
                                class: "theme-" + t.theme(e.owner.faction)
                            }, [t._v("\n        " + t._s(t.$t("data.character." + e.type + ".specializations." + e.specialization)) + "\n        "), a("strong", [t._v("\n          " + t._s(e.name) + "\n        ")]), t._v("\n        " + t._s(t.$t("panel.operations.fight_lvl", {
                                lvl: e.level
                            })) + "\n      ")]), t._v("\n      " + t._s(t.$t("panel.operations.fight_under_owner")) + "\n      "), a("strong", {
                                class: "theme-" + t.theme(e.owner.faction)
                            }, [t._v("\n        " + t._s(e.owner.name) + "\n      ")]), t._v(" :\n      "), t._l(e.army.tiles, (function(s, i) {
                                return a("div", {
                                    key: i
                                }, ["filled" === s.ship_status ? [a("strong", {
                                    class: "theme-" + t.theme(e.owner.faction)
                                }, [t._v("\n            " + t._s(t.$t("data.ship." + s.ship.key + ".name")) + "\n            [" + t._s(s.id) + "]\n          ")]), t._v("\n          " + t._s(t.$t("panel.operations.fight_lvl", {
                                    lvl: s.ship.level
                                })) + "\n        ")] : t._e()], 2)
                            }))], 2)
                        }))], 2)
                    })), t._v(" "), a("div", {
                        staticClass: "title"
                    }, [t._v("\n    " + t._s(t.$t("panel.operations.fight_course")) + "\n  ")]), t._v(" "), t._l(t.content.battle, (function(e, s) {
                        return a("div", {
                            key: "round-" + s,
                            staticClass: "round"
                        }, [a("div", {
                            staticClass: "round-title"
                        }, [t._v("\n      " + t._s(s + 1) + "\n    ")]), t._v(" "), a("div", {
                            staticClass: "round-content"
                        }, t._l(e, (function(e, s) {
                            return a("div", {
                                key: "action-" + s
                            }, ["transfer" === e.type && "field" === e.data.target ? [a("strong", {
                                class: "theme-" + t.getShip(e.source).theme
                            }, [t._v("\n            " + t._s(t.$t("data.ship." + t.getShip(e.source).key + ".name")) + "\n            [" + t._s(e.source.tile) + "]\n          ")]), t._v("\n          " + t._s(t.$t("panel.operations.fight_arrival")) + "\n        ")] : "transfer" === e.type && "army" === e.data.target ? [a("strong", {
                                class: "theme-" + t.getShip(e.source).theme
                            }, [t._v("\n            " + t._s(t.$t("data.ship." + t.getShip(e.source).key + ".name")) + "\n            [" + t._s(e.source.tile) + "]\n          ")]), t._v("\n          " + t._s(t.$t("panel.operations.fight_leave")) + "\n        ")] : "destroyed" === e.type ? [a("strong", {
                                class: "theme-" + t.getShip(e.source).theme
                            }, [t._v("\n            " + t._s(t.$t("data.ship." + t.getShip(e.source).key + ".name")) + "\n            [" + t._s(e.source.tile) + "]\n          ")]), t._v("\n          " + t._s(t.$t("panel.operations.fight_destroyed")) + "\n        ")] : "escaping" === e.type ? [a("strong", {
                                class: "theme-" + t.getShip(e.source).theme
                            }, [t._v("\n            " + t._s(t.$t("data.ship." + t.getShip(e.source).key + ".name")) + "\n            [" + t._s(e.source.tile) + "]\n          ")]), t._v("\n          " + t._s(t.$t("panel.operations.fight_fly")) + "\n        ")] : "attack" === e.type ? [a("strong", {
                                class: "theme-" + t.getShip(e.source).theme
                            }, [t._v("\n            " + t._s(t.$t("data.ship." + t.getShip(e.source).key + ".name")) + "\n            [" + t._s(e.source.tile) + "]\n          ")]), t._v("\n          " + t._s(t.$t("panel.operations.fight_attacks", {
                                attack_count: e.data.actions.length
                            })) + "\n          "), a("strong", {
                                class: "theme-" + t.getShip(e.data.target).theme
                            }, [t._v("\n            " + t._s(t.$t("data.ship." + t.getShip(e.data.target).key + ".name")) + "\n            [" + t._s(e.data.target.tile) + "]\n          ")]), t._v(" "), a("span", {
                                domProps: {
                                    innerHTML: t._s(t.computeStrikes(e.data.actions))
                                }
                            })] : void 0], 2)
                        })), 0)])
                    }))], 2)
                }), [], !1, null, null, null).exports,
                te = {
                    name: "operation-reports-panel",
                    props: {
                        initial: {
                            type: Number,
                            default: 0
                        }
                    },
                    data: function() {
                        return {
                            reports: [],
                            current: null
                        }
                    },
                    methods: {
                        loadReports: function() {
                            var t = this;
                            this.$socket.player.push("get_reports", {}).receive("ok", (function(e) {
                                if (t.reports = e.reports.map((function(e) {
                                    return e.metadata = t.parseMetadata(e.metadata), e
                                })), 0 !== t.initial) {
                                    var a = t.reports.find((function(e) {
                                        return e.id === t.initial
                                    }));
                                    t.toggleReport(a)
                                }
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        },
                        toggleReport: function(t) {
                            this.current = null !== this.current && this.current.id === t.id ? null : t
                        },
                        deleteReport: function(t) {
                            var e = this;
                            this.$socket.player.push("hide_report", {
                                report_id: t
                            }).receive("ok", (function() {
                                e.current = null, e.loadReports()
                            })).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        },
                        parseMetadata: function(t) {
                            try {
                                return JSON.parse(t)
                            } catch (t) {
                                this.$toastError(t)
                            }
                            return {}
                        },
                        formatName: function(t) {
                            if ("fight" === t.type) {
                                var e = t.metadata.scale,
                                    a = "fight_scale_xsmall";
                                return e > 2e3 && (a = "fight_scale_xxbig"), e > 1e3 && (a = "fight_scale_xbig"), e > 600 && (a = "fight_scale_big"), e > 300 && (a = "fight_scale_medium"), e > 100 && (a = "fight_scale_small"), this.$t("report.".concat(a), {
                                    name: t.metadata.system
                                })
                            }
                            var s = t.metadata.status;
                            return this.$t("report.".concat(t.type, "_").concat(s), {
                                name: t.metadata.system
                            })
                        }
                    },
                    mounted: function() {
                        this.loadReports()
                    },
                    components: {
                        FightReport: Xt
                    }
                },
                ee = {
                    name: "operations-panel",
                    data: function() {
                        return {
                            activePanel: "characters",
                            panels: ["characters", "reports"],
                            initialReport: 0
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        }
                    },
                    methods: {
                        open: function(t) {
                            t && t.reportId && (this.initialReport = t.reportId, this.activePanel = "reports")
                        },
                        close: function() {
                            this.$emit("close")
                        }
                    },
                    components: {
                        Agents: Yt,
                        Reports: Object(Ft.a)(te, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "panel-content is-medium"
                            }, [a("v-scrollbar", {
                                staticClass: "has-padding"
                            }, [t.current ? a("div", {
                                staticClass: "report"
                            }, [a("div", {
                                staticClass: "report-toolbox"
                            }, [a("div", {
                                staticClass: "button",
                                on: {
                                    click: function(e) {
                                        t.current = null
                                    }
                                }
                            }, [a("div", [t._v(t._s(t.$t("panel.operations.return")))])]), t._v(" "), a("div", {
                                staticClass: "button",
                                on: {
                                    click: function(e) {
                                        return t.deleteReport(t.current.id)
                                    }
                                }
                            }, [a("div", [t._v(t._s(t.$t("panel.operations.delete")))])])]), t._v(" "), "fight" === t.current.type ? a("fight-report", {
                                attrs: {
                                    report: t.current.report
                                }
                            }) : t._e()], 1) : t._l(t.reports, (function(e, s) {
                                return a("div", {
                                    key: "report-" + s,
                                    staticClass: "pcb-report",
                                    class: {
                                        active: t.current && t.current.id === e.id
                                    },
                                    on: {
                                        click: function(a) {
                                            return t.toggleReport(e)
                                        }
                                    }
                                }, [a("div", {
                                    staticClass: "icon"
                                }, [a("svgicon", {
                                    attrs: {
                                        name: "action/" + e.type
                                    }
                                })], 1), t._v(" "), a("div", {
                                    staticClass: "title"
                                }, [a("strong", [t._v(t._s(t.formatName(e)))]), t._v("\n          " + t._s(t.$t("report." + e.metadata.result)) + "\n        ")])])
                            }))], 2)], 1)
                        }), [], !1, null, null, null).exports
                    }
                },
                ae = Object(Ft.a)(ee, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-container is-right",
                        class: t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, ["characters" === t.activePanel ? a("agents", {
                        on: {
                            close: t.close
                        }
                    }) : t._e(), t._v(" "), "reports" === t.activePanel ? a("reports", {
                        attrs: {
                            initial: t.initialReport
                        }
                    }) : t._e(), t._v(" "), a("div", {
                        staticClass: "panel-navbar"
                    }, t._l(t.panels, (function(e) {
                        return a("button", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.right",
                                value: t.$t("panel.operations." + e),
                                expression: "$t(`panel.operations.${panel}`)",
                                modifiers: {
                                    right: !0
                                }
                            }],
                            key: e,
                            class: {
                                "is-active": t.activePanel === e
                            },
                            on: {
                                click: function(a) {
                                    t.activePanel = e
                                }
                            }
                        })
                    })), 0)], 1)
                }), [], !1, null, null, null).exports,
                se = {
                    name: "ranking-overall",
                    props: {
                        players: Array
                    },
                    methods: {
                        getTheme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        },
                        openPlayer: function(t) {
                            this.$store.dispatch("game/openPlayer", {
                                vm: this,
                                id: t
                            })
                        }
                    }
                },
                ie = Object(Ft.a)(se, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-content is-medium"
                    }, [a("v-scrollbar", {
                        staticClass: "has-padding"
                    }, [a("h1", {
                        staticClass: "panel-default-title"
                    }, [t._v(t._s(t.$t("panel.ranking.overall_title")))]), t._v(" "), a("table", {
                        staticClass: "panel-table ranking-table"
                    }, t._l(t.players, (function(e, s) {
                        return a("tr", {
                            key: e.player_id
                        }, [a("td", [t._v("\n          #" + t._s(s + 1) + "\n        ")]), t._v(" "), a("td", {
                            staticClass: "name",
                            class: "theme-" + t.getTheme(e.faction),
                            on: {
                                click: function(a) {
                                    return t.openPlayer(e.player_id)
                                }
                            }
                        }, [t._v("\n          " + t._s(e.player_name) + "\n        ")]), t._v(" "), a("td", {
                            domProps: {
                                innerHTML: t._s(t.$t("panel.ranking.possession_count", {
                                    value: t.$options.filters.integer(e.total_systems)
                                }))
                            }
                        }), a("td", {
                            domProps: {
                                innerHTML: t._s(t.$t("panel.ranking.billion_population", {
                                    value: t.$options.filters.float(e.total_population, 1)
                                }))
                            }
                        }), t._v(" "), a("td", {
                            staticClass: "highlighted align-right"
                        }, [t._v("\n          " + t._s(t._f("integer")(e.points)) + "\n          "), a("span", {
                            staticClass: "small"
                        }, [t._v("pts")])])])
                    })), 0), t._v(" "), a("div", {
                        staticClass: "anchor"
                    })])], 1)
                }), [], !1, null, null, null).exports,
                ne = {
                    name: "ranking-best-system",
                    props: {
                        players: Array,
                        type: String
                    },
                    computed: {
                        typeName: function() {
                            return "prod" === this.type ? "production" : this.type
                        }
                    },
                    methods: {
                        getTheme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        },
                        openPlayer: function(t) {
                            this.$store.dispatch("game/openPlayer", {
                                vm: this,
                                id: t
                            })
                        }
                    }
                },
                re = {
                    name: "ranking-panel",
                    data: function() {
                        return {
                            activePanel: "overall",
                            panels: ["overall", "prod", "credit", "technology", "ideology", "workforce"],
                            players: []
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        sortedPlayers: function() {
                            var t = this.players,
                                e = "";
                            switch (this.activePanel) {
                                case "overall":
                                    e = "points";
                                    break;
                                case "prod":
                                    e = "best_prod";
                                    break;
                                case "credit":
                                    e = "best_credit";
                                    break;
                                case "technology":
                                    e = "best_technology";
                                    break;
                                case "ideology":
                                    e = "best_ideology";
                                    break;
                                case "workforce":
                                    e = "best_workforce";
                                    break;
                                default:
                                    return ""
                            }
                            return t.sort((function(t, a) {
                                return a[e] - t[e]
                            }))
                        }
                    },
                    methods: {
                        open: function(t) {
                            this.loadStats()
                        },
                        loadStats: function() {
                            var t = this;
                            this.$socket.global.push("get_stats", {}).receive("ok", (function(e) {
                                t.players = e.players
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        },
                        close: function() {
                            this.$emit("close")
                        }
                    },
                    components: {
                        Overall: ie,
                        BestSystem: Object(Ft.a)(ne, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "panel-content is-medium"
                            }, [a("v-scrollbar", {
                                staticClass: "has-padding"
                            }, [a("h1", {
                                staticClass: "panel-default-title"
                            }, [t._v(t._s(t.$t("panel.ranking." + t.typeName + "_title")))]), t._v(" "), a("table", {
                                staticClass: "panel-table ranking-table"
                            }, t._l(t.players, (function(e, s) {
                                return a("tr", {
                                    key: e.player_id
                                }, [a("td", [t._v("\n          #" + t._s(s + 1) + "\n        ")]), t._v(" "), a("td", {
                                    staticClass: "name",
                                    class: "theme-" + t.getTheme(e.faction),
                                    on: {
                                        click: function(a) {
                                            return t.openPlayer(e.player_id)
                                        }
                                    }
                                }, [t._v("\n          " + t._s(e.player_name) + "\n        ")]), t._v(" "), a("td", {
                                    staticClass: "highlighted align-right"
                                }, [t._v("\n          " + t._s(t._f("integer")(e["best_" + t.type])) + "\n          "), a("svgicon", {
                                    attrs: {
                                        name: "resource/" + t.typeName
                                    }
                                })], 1)])
                            })), 0), t._v(" "), a("div", {
                                staticClass: "anchor"
                            })])], 1)
                        }), [], !1, null, null, null).exports
                    }
                },
                oe = Object(Ft.a)(re, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-container is-right",
                        class: t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("overall", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "overall" === t.activePanel,
                            expression: "activePanel === 'overall'"
                        }],
                        attrs: {
                            players: t.sortedPlayers
                        }
                    }), t._v(" "), a("best-system", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: ["prod", "credit", "technology", "ideology", "workforce"].includes(t.activePanel),
                            expression: "['prod', 'credit', 'technology', 'ideology', 'workforce'].includes(activePanel)"
                        }],
                        attrs: {
                            type: t.activePanel,
                            players: t.sortedPlayers
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "panel-navbar"
                    }, t._l(t.panels, (function(e) {
                        return a("button", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.right",
                                value: t.$t("panel.ranking." + e),
                                expression: "$t(`panel.ranking.${panel}`)",
                                modifiers: {
                                    right: !0
                                }
                            }],
                            key: e,
                            class: {
                                "is-active": t.activePanel === e
                            },
                            on: {
                                click: function(a) {
                                    t.activePanel = e
                                }
                            }
                        })
                    })), 0)], 1)
                }), [], !1, null, null, null).exports,
                ce = {
                    name: "faction-about-panel",
                    computed: {
                        faction: function() {
                            return this.$store.state.game.faction
                        }
                    }
                },
                le = {
                    name: "faction-overall-panel",
                    computed: {
                        faction: function() {
                            return this.$store.state.game.faction
                        },
                        victory: function() {
                            return this.$store.state.game.victory
                        },
                        factionData: function() {
                            var t = this;
                            return this.$store.state.game.data.faction.find((function(e) {
                                return e.key === t.faction.key
                            }))
                        }
                    }
                };

            function ue(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function de(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? ue(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : ue(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var ve, pe = {
                    name: "faction-players-panel",
                    computed: {
                        onlinePlayersCount: function() {
                            return this.$store.getters["game/onlinePlayersNumber"]
                        },
                        faction: function() {
                            return this.$store.state.game.faction
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        players: function() {
                            var t = this.$store.state.game.onlinePlayers;
                            return this.faction.players.map((function(e) {
                                var a = e.id in t;
                                return de(de({}, e), {
                                    isOnline: a
                                })
                            }))
                        }
                    },
                    methods: {
                        openPlayer: function(t) {
                            this.$store.dispatch("game/openPlayer", {
                                vm: this,
                                id: t
                            })
                        },
                        sendMessage: function(t) {
                            this.$root.$emit("togglePanel", "messenger", {
                                initConversation: t
                            })
                        }
                    }
                },
                me = {
                    name: "faction-panel",
                    data: function() {
                        return {
                            activePanel: "overall",
                            panels: ["overall", "player"]
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        }
                    },
                    methods: {
                        open: function(t) {},
                        close: function() {
                            this.$emit("close")
                        }
                    },
                    components: {
                        About: Object(Ft.a)(ce, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "panel-content is-small"
                            }, [a("v-scrollbar", [a("section", {
                                staticClass: "panel-content-sheet"
                            }, [a("h1", {
                                staticClass: "header"
                            }, [a("svgicon", {
                                attrs: {
                                    name: "faction/" + t.faction.key
                                }
                            }), t._v(" "), a("div", {
                                staticClass: "title"
                            }, [t._v("\n          " + t._s(t.$t("data.faction." + t.faction.key + ".name")) + "\n        ")])], 1), t._v(" "), a("div", {
                                staticClass: "body"
                            }, [t._v("\n        " + t._s(t.$t("data.faction." + t.faction.key + ".description")) + "\n      ")])])])], 1)
                        }), [], !1, null, null, null).exports,
                        Overall: Object(Ft.a)(le, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "panel-content is-small"
                            }, [a("v-scrollbar", {
                                staticClass: "has-padding"
                            }, [a("h1", {
                                staticClass: "panel-default-title"
                            }, [t._v("\n      " + t._s(t.$t("panel.faction.overall_title")) + "\n    ")]), t._v(" "), a("div", {
                                staticClass: "panel-content-number-bloc"
                            }, [a("div", {
                                staticClass: "label"
                            }, [t._v("\n        " + t._s(t.$t("panel.faction.player_count")) + "\n      ")]), t._v(" "), a("div", {
                                staticClass: "value"
                            }, [t._v("\n        " + t._s(t.faction.players.length) + "\n      ")])]), t._v(" "), a("h1", {
                                staticClass: "panel-default-title"
                            }, [t._v("\n      " + t._s(t.$t("page.instance.tradition")) + "\n    ")]), t._v(" "), t._l(t.factionData.traditions, (function(e) {
                                return a("div", {
                                    key: e.key,
                                    staticClass: "panel-content-text-bloc"
                                }, [a("div", {
                                    staticClass: "header"
                                }, [a("strong", [t._v(t._s(t.$t("data.tradition." + e.key + ".name")))]), t._v(" "), a("span", [t._v(t._s(t.$t("data.tradition." + e.key + ".bonus")))])]), t._v(" "), a("div", {
                                    staticClass: "body"
                                }, [t._v("\n        " + t._s(t.$t("data.tradition." + e.key + ".description")) + "\n      ")])])
                            }))], 2)], 1)
                        }), [], !1, null, null, null).exports,
                        Player: Object(Ft.a)(pe, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "panel-content is-small"
                            }, [a("v-scrollbar", {
                                staticClass: "has-padding"
                            }, [a("h1", {
                                staticClass: "panel-default-title"
                            }, [t._v("\n      " + t._s(t.onlinePlayersCount) + "/" + t._s(t.faction.players.length) + "\n      "), a("span", [t._v(t._s(t.$t("panel.faction.online_players")))])]), t._v(" "), t._l(t.players, (function(e) {
                                return a("div", {
                                    key: e.id,
                                    staticClass: "pcb-player"
                                }, [a("div", {
                                    staticClass: "squared"
                                }, [a("span", {
                                    directives: [{
                                        name: "tooltip",
                                        rawName: "v-tooltip",
                                        value: t.$t("panel.faction.online"),
                                        expression: "$t('panel.faction.online')"
                                    }, {
                                        name: "show",
                                        rawName: "v-show",
                                        value: e.isOnline,
                                        expression: "p.isOnline"
                                    }]
                                }, [t._v("\n          ◉\n        ")])]), t._v(" "), a("div", {
                                    staticClass: "large",
                                    on: {
                                        click: function(a) {
                                            return t.openPlayer(e.id)
                                        }
                                    }
                                }, [a("strong", [t._v(t._s(e.name))])]), t._v(" "), a("div", {
                                    staticClass: "squared"
                                }, [a("span", {
                                    directives: [{
                                        name: "tooltip",
                                        rawName: "v-tooltip",
                                        value: t.$t("card.profile.contact"),
                                        expression: "$t('card.profile.contact')"
                                    }, {
                                        name: "show",
                                        rawName: "v-show",
                                        value: e.id !== t.player.id,
                                        expression: "p.id !== player.id"
                                    }],
                                    on: {
                                        click: function(a) {
                                            return t.sendMessage(e.id)
                                        }
                                    }
                                }, [t._v("\n          ↦\n        ")])])])
                            }))], 2)], 1)
                        }), [], !1, null, null, null).exports
                    }
                },
                he = Object(Ft.a)(me, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-container is-left",
                        class: t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("div", {
                        staticClass: "panel-navbar"
                    }, t._l(t.panels, (function(e) {
                        return a("button", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.right",
                                value: t.$t("panel.faction." + e),
                                expression: "$t(`panel.faction.${panel}`)",
                                modifiers: {
                                    right: !0
                                }
                            }],
                            key: e,
                            class: {
                                "is-active": t.activePanel === e
                            },
                            on: {
                                click: function(a) {
                                    t.activePanel = e
                                }
                            }
                        })
                    })), 0), t._v(" "), a("overall", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "overall" === t.activePanel,
                            expression: "activePanel === 'overall'"
                        }]
                    }), t._v(" "), a("player", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "player" === t.activePanel,
                            expression: "activePanel === 'player'"
                        }]
                    }), t._v(" "), a("about", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "about" === t.activePanel,
                            expression: "activePanel === 'about'"
                        }]
                    })], 1)
                }), [], !1, null, null, null).exports,
                fe = {
                    name: "conversations",
                    computed: {
                        instanceId: function() {
                            return this.$store.state.game.auth.instance
                        },
                        conversations: function() {
                            return this.$store.getters["portal/conversations"](this.instanceId)
                        },
                        profile: function() {
                            return this.$store.state.game.player
                        }
                    },
                    methods: {
                        getConversationName: function(t) {
                            var e = this;
                            if (t.is_group) return "".concat(t.name, " (").concat(t.members.length, ")");
                            var a = t.members.find((function(t) {
                                    return t.iid !== e.profile.id
                                })),
                                s = this.$store.state.game.galaxy.players[a.iid],
                                i = this.$store.getters["game/themeByKey"](s.faction);
                            return '<span class="is-color-'.concat(i, '">').concat(a.name, "</span>")
                        }
                    }
                },
                _e = Object(Ft.a)(fe, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("v-scrollbar", {
                        staticClass: "has-padding"
                    }, [a("h1", {
                        staticClass: "panel-default-title"
                    }, [t._v("\n    " + t._s(t.$t("panel.messenger.messenger")) + "\n    "), a("div", {
                        staticClass: "group-button"
                    }, [a("div", {
                        staticClass: "button squared",
                        on: {
                            click: function(e) {
                                return t.$emit("new", "conversation")
                            }
                        }
                    }, [a("div", [t._v("+")])]), t._v(" "), a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.$emit("new", "group")
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("panel.messenger.new.group")))])])])]), t._v(" "), t._l(t.conversations, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "conversation-item",
                            class: {
                                "is-active": e.unread > 0
                            },
                            on: {
                                click: function(a) {
                                    return t.$emit("open", e.id)
                                }
                            }
                        }, [a("span", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: e.unread > 0,
                                expression: "conversation.unread > 0"
                            }],
                            staticClass: "conversation-item-unread"
                        }, [t._v("\n      " + t._s(e.unread) + "\n    ")]), t._v(" "), a("span", {
                            staticClass: "conversation-item-name",
                            domProps: {
                                innerHTML: t._s(t.getConversationName(e))
                            }
                        }), t._v(" "), a("span", {
                            staticClass: "conversation-item-date"
                        }, [t._v("\n      " + t._s(t._f("datetime-long")(e.last_message_update)) + "\n    ")])])
                    }))], 2)
                }), [], !1, null, null, null).exports,
                ye = {
                    name: "profile-select",
                    props: {
                        multiple: {
                            type: Boolean,
                            default: !1
                        },
                        instanceId: {
                            type: Number,
                            required: !0
                        },
                        label: {
                            type: String,
                            required: !1
                        },
                        initials: {
                            type: Array,
                            default: function() {
                                return []
                            }
                        },
                        discardedIds: {
                            type: Array,
                            default: function() {
                                return []
                            }
                        }
                    },
                    data: function() {
                        return {
                            options: [],
                            value: null
                        }
                    },
                    computed: {
                        filteredOptions: function() {
                            var t = this;
                            return this.options.filter((function(e) {
                                return !t.discardedIds.includes(e.id)
                            }))
                        }
                    },
                    methods: {
                        fetchOptions: function(t, e) {
                            var a = this;
                            return r()(c.a.mark((function s() {
                                var i, n;
                                return c.a.wrap((function(s) {
                                    for (;;) switch (s.prev = s.next) {
                                        case 0:
                                            if (!t.length) {
                                                s.next = 8;
                                                break
                                            }
                                            return e(!0), s.next = 4, a.$axios.get("/profile/search/".concat(a.instanceId, "/").concat(t));
                                        case 4:
                                            i = s.sent, n = i.data, a.options = n.map((function(t) {
                                                return {
                                                    label: t.name,
                                                    id: t.id
                                                }
                                            })), e(!1);
                                        case 8:
                                        case "end":
                                            return s.stop()
                                    }
                                }), s)
                            })))()
                        },
                        input: function(t) {
                            this.$emit("input", t)
                        }
                    },
                    mounted: function() {
                        this.options = this.initials
                    }
                },
                ge = Object(Ft.a)(ye, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "custom-select"
                    }, [a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.label,
                            expression: "label"
                        }],
                        staticClass: "custom-select-label"
                    }, [t._v("\n    " + t._s(t.label) + "\n  ")]), t._v(" "), a("div", {
                        staticClass: "custom-select-input"
                    }, [a("v-select", {
                        attrs: {
                            options: t.filteredOptions,
                            filterable: !1,
                            multiple: t.multiple
                        },
                        on: {
                            search: t.fetchOptions,
                            input: t.input
                        },
                        model: {
                            value: t.value,
                            callback: function(e) {
                                t.value = e
                            },
                            expression: "value"
                        }
                    }, [a("template", {
                        slot: "no-options"
                    }, [t._v("\n        " + t._s(t.$t("toast.error.select_no_result")) + "\n      ")])], 2)], 1)])
                }), [], !1, null, null, null).exports,
                be = {
                    name: "conversation",
                    data: function() {
                        return {
                            newMessage: "",
                            isInputLocked: !1,
                            isLoadingMessage: !1,
                            view: "message",
                            newMember: null
                        }
                    },
                    props: {
                        conversationId: Number
                    },
                    computed: {
                        instanceId: function() {
                            return this.$store.state.game.auth.instance
                        },
                        conversation: function() {
                            return this.$store.getters["portal/conversation"](this.conversationId)
                        },
                        profile: function() {
                            return this.$store.state.game.player
                        },
                        isConversationAdmin: function() {
                            var t = this;
                            return this.conversation.members.find((function(e) {
                                return e.iid === t.profile.id
                            })).is_admin
                        },
                        factionProfiles: function() {
                            return this.$store.state.game.faction.players.map((function(t) {
                                return {
                                    label: t.name,
                                    id: t.id
                                }
                            }))
                        }
                    },
                    methods: {
                        loadConversation: function(t) {
                            var e = this;
                            return r()(c.a.mark((function a() {
                                return c.a.wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            return e.isLoadingMessage = !0, a.next = 3, e.$store.dispatch("portal/loadConversation", t);
                                        case 3:
                                            e.isLoadingMessage = !1;
                                        case 4:
                                        case "end":
                                            return a.stop()
                                    }
                                }), a)
                            })))()
                        },
                        loadConversationNextPage: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if ("message" !== t.view || !t.conversation || t.isLoadingMessage || t.conversation.isLastPage) {
                                                e.next = 5;
                                                break
                                            }
                                            return t.isLoadingMessage = !0, e.next = 4, t.$store.dispatch("portal/loadConversation", t.conversation.id);
                                        case 4:
                                            t.isLoadingMessage = !1;
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        },
                        sendMessage: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                var a;
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (t.isInputLocked || "" === t.newMessage) {
                                                e.next = 7;
                                                break
                                            }
                                            return a = t.newMessage, t.isInputLocked = !0, t.newMessage = "", e.next = 6, t.$axios.post("/messenger/".concat(t.profile.id, "/").concat(t.conversationId), {
                                                content_raw: a
                                            });
                                        case 6:
                                            t.isInputLocked = !1;
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        },
                        addMember: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                var a, s, i;
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (t.isInputLocked || !t.newMember) {
                                                e.next = 10;
                                                break
                                            }
                                            return a = t.newMember.id, t.isInputLocked = !0, t.newMember = null, e.next = 6, t.$axios.put("/messenger/".concat(t.profile.id, "/").concat(t.conversationId, "/add/").concat(a));
                                        case 6:
                                            s = e.sent, i = s.data, t.$store.commit("portal/updateConversationMembers", {
                                                id: i.conversation.id,
                                                members: i.conversation.members
                                            }), t.isInputLocked = !1;
                                        case 10:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        },
                        removePlayer: function(t) {
                            var e = this;
                            return r()(c.a.mark((function a() {
                                var s, i;
                                return c.a.wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            if (e.isInputLocked || !t) {
                                                a.next = 8;
                                                break
                                            }
                                            return e.isInputLocked = !0, a.next = 4, e.$axios.delete("/messenger/".concat(e.profile.id, "/").concat(e.conversationId, "/remove/").concat(t));
                                        case 4:
                                            s = a.sent, i = s.data, e.$store.commit("portal/updateConversationMembers", {
                                                id: i.conversation.id,
                                                members: i.conversation.members
                                            }), e.isInputLocked = !1;
                                        case 8:
                                        case "end":
                                            return a.stop()
                                    }
                                }), a)
                            })))()
                        },
                        getConversationName: function(t) {
                            var e = this;
                            return t.is_group ? "".concat(t.name, " (").concat(t.members.length, ")") : t.members.find((function(t) {
                                return t.iid !== e.profile.id
                            })).name
                        },
                        getPlayerTheme: function(t, e) {
                            if (!e) return t;
                            var a = this.$store.state.game.galaxy.players[e],
                                s = this.$store.getters["game/themeByKey"](a.faction);
                            return '<span class="is-color-'.concat(s, '">').concat(t, "</span>")
                        },
                        openPlayer: function(t) {
                            this.$store.dispatch("game/openPlayer", {
                                vm: this,
                                id: t
                            })
                        }
                    },
                    mounted: function() {
                        this.loadConversation(this.conversationId)
                    },
                    components: {
                        ProfileSelect: ge
                    }
                },
                Ce = Object(Ft.a)(be, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("v-scrollbar", {
                        staticClass: "has-padding",
                        on: {
                            "ps-y-reach-end": t.loadConversationNextPage
                        }
                    }, [a("h1", {
                        staticClass: "panel-default-title"
                    }, [t._v("\n    " + t._s(t.getConversationName(t.conversation)) + "\n    "), a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "message" === t.view,
                            expression: "view === 'message'"
                        }],
                        staticClass: "group-button"
                    }, [t.conversation.is_group && !t.conversation.is_faction ? a("div", {
                        staticClass: "button squared",
                        on: {
                            click: function(e) {
                                t.view = "settings"
                            }
                        }
                    }, [a("div", [a("svgicon", {
                        attrs: {
                            name: "options"
                        }
                    })], 1)]) : t._e(), t._v(" "), a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.$emit("close")
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("panel.messenger.return")))])])]), t._v(" "), a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "settings" === t.view,
                            expression: "view === 'settings'"
                        }],
                        staticClass: "group-button"
                    }, [a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                t.view = "message"
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("panel.messenger.return")))])])])]), t._v(" "), "message" === t.view ? [a("div", {
                        staticClass: "conversation-form-textarea"
                    }, [a("textarea", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.newMessage,
                            expression: "newMessage"
                        }],
                        attrs: {
                            placeholder: t.$t("panel.messenger.your_message")
                        },
                        domProps: {
                            value: t.newMessage
                        },
                        on: {
                            input: function(e) {
                                e.target.composing || (t.newMessage = e.target.value)
                            }
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "conversation-form-button"
                    }, [a("button", {
                        attrs: {
                            disabled: t.isInputLocked
                        },
                        on: {
                            click: t.sendMessage
                        }
                    }, [a("div", [t._v(t._s(t.$t("panel.messenger.send")))])])]), t._v(" "), t._l(t.conversation.messages, (function(e) {
                        return a("div", {
                            key: "message-" + e.id,
                            staticClass: "message-item"
                        }, [a("div", {
                            staticClass: "message-item-metadata"
                        }, [a("strong", {
                            domProps: {
                                innerHTML: t._s(t.getPlayerTheme(e.name, e.pid))
                            },
                            on: {
                                click: function(a) {
                                    return t.openPlayer(e.pid)
                                }
                            }
                        }), t._v(",\n        " + t._s(t._f("datetime-long")(e.date)) + "\n      ")]), t._v(" "), a("div", {
                            staticClass: "message-item-content",
                            domProps: {
                                innerHTML: t._s(e.content_html)
                            }
                        })])
                    })), t._v(" "), t.isLoadingMessage && !t.conversation.messages.length ? a("div", {
                        staticClass: "message-item"
                    }, [a("div", {
                        staticClass: "message-item-loading"
                    }, [t._v("\n        " + t._s(t.$t("panel.messenger.loading")) + "\n      ")])]) : t._e()] : [t._l(t.conversation.members, (function(e) {
                        return a("div", {
                            key: e.id,
                            staticClass: "pcb-player"
                        }, [a("div", {
                            staticClass: "squared"
                        }, [a("span", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("panel.messenger.admin"),
                                expression: "$t('panel.messenger.admin')"
                            }, {
                                name: "show",
                                rawName: "v-show",
                                value: e.is_admin,
                                expression: "member.is_admin"
                            }]
                        }, [t._v("\n          ♦\n        ")])]), t._v(" "), a("div", {
                            staticClass: "large",
                            on: {
                                click: function(a) {
                                    return t.openPlayer(e.iid)
                                }
                            }
                        }, [a("strong", [t._v(t._s(e.name))])]), t._v(" "), a("div", {
                            staticClass: "squared"
                        }, [a("span", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("panel.messenger.remove_from_group"),
                                expression: "$t('panel.messenger.remove_from_group')"
                            }, {
                                name: "show",
                                rawName: "v-show",
                                value: t.isConversationAdmin && !e.is_admin && t.conversation.members.length > 2,
                                expression: "isConversationAdmin && !member.is_admin && conversation.members.length > 2"
                            }],
                            on: {
                                click: function(a) {
                                    return t.removePlayer(e.iid)
                                }
                            }
                        }, [t._v("\n          ×\n        ")])])])
                    })), t._v(" "), t.isConversationAdmin ? [a("div", {
                        staticClass: "conversation-form-select"
                    }, [a("profile-select", {
                        attrs: {
                            instanceId: t.instanceId,
                            initials: t.factionProfiles,
                            discardedIds: t.conversation.members.map((function(t) {
                                return t.iid
                            }))
                        },
                        model: {
                            value: t.newMember,
                            callback: function(e) {
                                t.newMember = e
                            },
                            expression: "newMember"
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "conversation-form-button"
                    }, [a("button", {
                        attrs: {
                            disabled: t.isInputLocked
                        },
                        on: {
                            click: t.addMember
                        }
                    }, [a("div", [t._v(t._s(t.$t("panel.messenger.add_to_group")))])])])] : t._e()]], 2)
                }), [], !1, null, null, null).exports,
                ke = {
                    name: "new-conversation",
                    data: function() {
                        return {
                            member: null,
                            members: [],
                            message: "",
                            name: "",
                            isFaction: !1,
                            isInputLocked: !1
                        }
                    },
                    props: {
                        mode: String,
                        initialPlayer: Object
                    },
                    computed: {
                        instanceId: function() {
                            return parseInt(this.$store.state.game.auth.instance, 10)
                        },
                        profile: function() {
                            return this.$store.state.game.player
                        },
                        factionProfiles: function() {
                            return this.$store.state.game.faction.players.map((function(t) {
                                return {
                                    label: t.name,
                                    id: t.id
                                }
                            }))
                        }
                    },
                    methods: {
                        create: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                var a, s, i, n, r, o, l, u, d, v;
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!t.isInputLocked && "" !== t.message) {
                                                e.next = 2;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 2:
                                            if ("conversation" !== t.mode) {
                                                e.next = 24;
                                                break
                                            }
                                            if (a = null, !t.initialPlayer || !t.initialPlayer.id) {
                                                e.next = 8;
                                                break
                                            }
                                            a = t.initialPlayer.id, e.next = 11;
                                            break;
                                        case 8:
                                            if (t.member) {
                                                e.next = 10;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 10:
                                            a = t.member.id;
                                        case 11:
                                            if (a) {
                                                e.next = 13;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 13:
                                            return s = t.message, t.isInputLocked = !0, t.message = "", e.next = 18, t.$axios.post("/messenger/new/".concat(t.profile.id, "/").concat(t.instanceId), {
                                                content_raw: s,
                                                to: a
                                            });
                                        case 18:
                                            i = e.sent, n = i.data, t.$emit("open", n.cid), t.isInputLocked = !1, e.next = 40;
                                            break;
                                        case 24:
                                            if ("group" !== t.mode) {
                                                e.next = 40;
                                                break
                                            }
                                            if (t.name && (t.isFaction || 0 !== t.members.length)) {
                                                e.next = 27;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 27:
                                            return r = t.message, o = t.name, l = t.members.map((function(t) {
                                                return t.id
                                            })), u = t.isFaction ? {
                                                profiles_ids: [],
                                                name: o,
                                                content_raw: r,
                                                faction: t.$store.state.game.faction.id
                                            } : {
                                                profiles_ids: l,
                                                name: o,
                                                content_raw: r
                                            }, t.isInputLocked = !0, t.message = "", t.name = "", e.next = 36, t.$axios.post("/messenger/new/".concat(t.profile.id, "/").concat(t.instanceId, "/group"), u);
                                        case 36:
                                            d = e.sent, v = d.data, t.$emit("open", v.cid), t.isInputLocked = !1;
                                        case 40:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        }
                    },
                    components: {
                        ProfileSelect: ge
                    }
                },
                we = {
                    name: "messenger-panel",
                    data: function() {
                        return {
                            activePanel: "messenger",
                            panels: ["messenger"],
                            mode: "conversations",
                            openConversationId: null,
                            newMode: null,
                            initialPlayer: {}
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        }
                    },
                    methods: {
                        open: function(t) {
                            var e = this;
                            return r()(c.a.mark((function a() {
                                return c.a.wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            t && t.initConversation && e.$socket.global.push("get_player", {
                                                player_id: t.initConversation
                                            }).receive("ok", (function(t) {
                                                var a = t.player;
                                                e.newConversation("conversation"), e.initialPlayer = a
                                            }));
                                        case 1:
                                        case "end":
                                            return a.stop()
                                    }
                                }), a)
                            })))()
                        },
                        openConversation: function(t) {
                            this.openConversationId = t, this.$socket.profile.push("read_conv", {
                                cid: t
                            }), this.mode = "conversation"
                        },
                        closeConversation: function() {
                            this.openConversationId = null, this.mode = "conversations"
                        },
                        newConversation: function(t) {
                            this.newMode = t, this.initialPlayer = {}, this.mode = "new"
                        },
                        close: function() {
                            this.closeConversation(), this.$emit("close")
                        }
                    },
                    components: {
                        Conversations: _e,
                        Conversation: Ce,
                        NewConversation: Object(Ft.a)(ke, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("v-scrollbar", {
                                staticClass: "has-padding"
                            }, [a("h1", {
                                staticClass: "panel-default-title"
                            }, [t._v("\n    " + t._s(t.$t("panel.messenger.new." + t.mode)) + "\n    "), a("div", {
                                staticClass: "button",
                                on: {
                                    click: function(e) {
                                        return t.$emit("close")
                                    }
                                }
                            }, [a("div", [t._v(t._s(t.$t("panel.messenger.return")))])])]), t._v(" "), "group" === t.mode ? [a("div", {
                                staticClass: "conversation-form-input"
                            }, [a("input", {
                                directives: [{
                                    name: "model",
                                    rawName: "v-model",
                                    value: t.name,
                                    expression: "name"
                                }],
                                attrs: {
                                    placeholder: t.$t("panel.messenger.group_name")
                                },
                                domProps: {
                                    value: t.name
                                },
                                on: {
                                    input: function(e) {
                                        e.target.composing || (t.name = e.target.value)
                                    }
                                }
                            })]), t._v(" "), a("label", {
                                staticClass: "conversation-form-checkbox",
                                attrs: {
                                    for: "isFaction"
                                }
                            }, [a("input", {
                                directives: [{
                                    name: "model",
                                    rawName: "v-model",
                                    value: t.isFaction,
                                    expression: "isFaction"
                                }],
                                attrs: {
                                    type: "checkbox",
                                    id: "isFaction"
                                },
                                domProps: {
                                    checked: Array.isArray(t.isFaction) ? t._i(t.isFaction, null) > -1 : t.isFaction
                                },
                                on: {
                                    change: function(e) {
                                        var a = t.isFaction,
                                            s = e.target,
                                            i = !!s.checked;
                                        if (Array.isArray(a)) {
                                            var n = t._i(a, null);
                                            s.checked ? n < 0 && (t.isFaction = a.concat([null])) : n > -1 && (t.isFaction = a.slice(0, n).concat(a.slice(n + 1)))
                                        } else t.isFaction = i
                                    }
                                }
                            }), t._v("\n      " + t._s(t.$t("panel.messenger.faction_group")) + "\n    ")]), t._v(" "), a("div", {
                                directives: [{
                                    name: "show",
                                    rawName: "v-show",
                                    value: !t.isFaction,
                                    expression: "!isFaction"
                                }],
                                staticClass: "conversation-form-select"
                            }, [a("profile-select", {
                                attrs: {
                                    instanceId: t.instanceId,
                                    initials: t.factionProfiles,
                                    discardedIds: [t.profile.id],
                                    multiple: !0
                                },
                                model: {
                                    value: t.members,
                                    callback: function(e) {
                                        t.members = e
                                    },
                                    expression: "members"
                                }
                            })], 1)] : [a("div", {
                                staticClass: "conversation-form-select"
                            }, [t.initialPlayer.id ? [t._v("\n        " + t._s(t.$t("panel.messenger.contact_player", {
                                player: t.initialPlayer.name
                            })) + "\n      ")] : a("profile-select", {
                                attrs: {
                                    instanceId: t.instanceId,
                                    initials: t.factionProfiles,
                                    discardedIds: [t.profile.id]
                                },
                                model: {
                                    value: t.member,
                                    callback: function(e) {
                                        t.member = e
                                    },
                                    expression: "member"
                                }
                            })], 2)], t._v(" "), a("div", {
                                staticClass: "conversation-form-textarea"
                            }, [a("textarea", {
                                directives: [{
                                    name: "model",
                                    rawName: "v-model",
                                    value: t.message,
                                    expression: "message"
                                }],
                                attrs: {
                                    placeholder: t.$t("panel.messenger.your_message")
                                },
                                domProps: {
                                    value: t.message
                                },
                                on: {
                                    input: function(e) {
                                        e.target.composing || (t.message = e.target.value)
                                    }
                                }
                            })]), t._v(" "), a("div", {
                                staticClass: "conversation-form-button"
                            }, [a("button", {
                                attrs: {
                                    disabled: t.isInputLocked
                                },
                                on: {
                                    click: t.create
                                }
                            }, [a("div", [t._v(t._s(t.$t("panel.messenger.send")))])])])], 2)
                        }), [], !1, null, null, null).exports
                    }
                },
                xe = Object(Ft.a)(we, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-container is-left",
                        class: t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("div", {
                        staticClass: "panel-navbar"
                    }, t._l(t.panels, (function(e) {
                        return a("button", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.right",
                                value: t.$t("panel.messenger." + e),
                                expression: "$t(`panel.messenger.${panel}`)",
                                modifiers: {
                                    right: !0
                                }
                            }],
                            key: e,
                            class: {
                                "is-active": t.activePanel === e
                            },
                            on: {
                                click: function(a) {
                                    t.activePanel = e
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "panel-content is-small"
                    }, [a("conversations", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "conversations" === t.mode,
                            expression: "mode === 'conversations'"
                        }],
                        on: {
                            open: t.openConversation,
                            new: t.newConversation
                        }
                    }), t._v(" "), "conversation" === t.mode ? a("conversation", {
                        attrs: {
                            conversationId: t.openConversationId
                        },
                        on: {
                            close: t.closeConversation
                        }
                    }) : t._e(), t._v(" "), "new" === t.mode ? a("new-conversation", {
                        attrs: {
                            mode: t.newMode,
                            initialPlayer: t.initialPlayer
                        },
                        on: {
                            open: t.openConversation,
                            close: t.closeConversation
                        }
                    }) : t._e()], 1)])
                }), [], !1, null, null, null).exports,
                $e = function(t, e, a) {
                    var s = new Date(t).getTime(),
                        i = (Date.now() - s) / 1e3 * a,
                        n = (Date.now() - e.receivedAt) / 1e3 * a;
                    return e.now.value + e.now.change * n - i
                },
                Pe = function(t, e) {
                    var a = e,
                        s = Math.floor(e / t.days_in_month / t.months_in_year);
                    a -= s * t.days_in_month * t.months_in_year;
                    var i = Math.floor(a / t.days_in_month);
                    return a -= i * t.days_in_month, {
                        year: s,
                        month: i,
                        day: Math.floor(a)
                    }
                },
                Oe = {
                    data: function() {
                        return {
                            mixinInterval: void 0,
                            mixinWorker: void 0
                        }
                    },
                    computed: {
                        time: function() {
                            return this.$store.state.game.time
                        },
                        speed: function() {
                            var t = this;
                            return this.$store.state.game.data.speed.find((function(e) {
                                return e.key === t.time.speed
                            }))
                        },
                        utInSeconds: function() {
                            return this.speed.factor / this.$config.TIME.UNIT_TIME_DIVIDER
                        }
                    },
                    methods: {
                        startWorker: function() {
                            var t = this;
                            this.mixinWorker = setInterval((function() {
                                t.time.is_running && (t.updateValue(t.utInSeconds * (t.getTime() - t.mixinInterval) / 1e3), t.mixinInterval = t.getTime())
                            }), 1e3 / this.$config.TIME.REFRESH_RATE)
                        },
                        stopWorker: function() {
                            clearInterval(this.mixinWorker)
                        },
                        updateValue: function(t) {
                            return t
                        },
                        getTime: function() {
                            return Date.now()
                        },
                        correctValue: function(t) {
                            this.updateValue(this.utInSeconds * (this.getTime() - t) / 1e3)
                        }
                    },
                    mounted: function() {
                        this.mixinInterval = this.getTime(), this.startWorker()
                    },
                    destroyed: function() {
                        this.stopWorker()
                    }
                },
                Se = {
                    name: "dynamic-value",
                    mixins: [{
                        mixins: [Oe],
                        data: function() {
                            return {
                                value: 0
                            }
                        },
                        props: {
                            initial: Object
                        },
                        watch: {
                            initial: function(t) {
                                this.value = t.value
                            }
                        },
                        methods: {
                            updateValue: function(t) {
                                this.initial.value <= 0 && this.initial.change <= 0 ? this.value = 0 : this.value += t * this.initial.change
                            }
                        },
                        mounted: function() {
                            this.value = this.initial.value
                        }
                    }]
                },
                Te = Object(Ft.a)(Se, (function() {
                    var t = this.$createElement;
                    return (this._self._c || t)("span", [this._v(this._s(this._f("integer")(this.value)))])
                }), [], !1, null, null, null).exports,
                Me = {
                    name: "character-card",
                    mixins: [Rt.a],
                    props: {
                        character: Object,
                        diff: {
                            type: Object,
                            required: !1
                        },
                        isDead: {
                            type: Boolean,
                            default: !1
                        },
                        cooldown: {
                            type: Object,
                            required: !1
                        },
                        receivedAt: {
                            type: Number,
                            required: !1
                        },
                        noAction: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    computed: {
                        tickToMilisecondFactor: function() {
                            return this.$store.getters["game/tickToMilisecondFactor"]
                        },
                        speed: function() {
                            return this.$store.state.game.time.speed
                        },
                        assignment: function() {
                            return this.$store.state.game.assignment
                        },
                        constant: function() {
                            return this.$store.state.game.data.constant[0]
                        },
                        playerId: function() {
                            return this.$store.state.game.player.id
                        },
                        charactersLimit: function() {
                            var t = this,
                                e = this.$store.state.game.player[{
                                    admiral: "max_admirals",
                                    spy: "max_spies",
                                    speaker: "max_speakers"
                                } [this.character.type]].value;
                            return {
                                current: this.$store.state.game.player.characters.filter((function(e) {
                                    return e.type === t.character.type
                                })).length,
                                max: e
                            }
                        },
                        data: function() {
                            var t = this;
                            return this.$store.state.game.data.character.find((function(e) {
                                return e.key === t.character.type
                            }))
                        },
                        nextLevelExperience: function() {
                            return Math.round(10 * (this.character.level + 1) + Math.pow((this.character.level + 1) / 2, 2.5))
                        },
                        group: function() {
                            var t = this;
                            return "on_board" === this.character.status ? Object.keys(this.$store.state.game.charactersGroup).find((function(e) {
                                return t.$store.state.game.charactersGroup[e] === t.character.id
                            })) : null
                        }
                    },
                    methods: {
                        hire: function() {
                            var t = this;
                            "for_hire" === this.character.status && this.$socket.player.push("hire_character", {
                                character: this.character
                            }).receive("ok", (function() {
                                t.$emit("hired", t.character)
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        },
                        activate: function() {
                            if (this.assignment) {
                                var t = this.$refs.card.getBoundingClientRect();
                                this.$emit("assign", {
                                    systemId: this.assignment.systemId,
                                    character: this.character,
                                    mode: this.assignment.mode,
                                    box: t
                                })
                            }
                        },
                        manage: function() {
                            "governor" !== this.character.status && "on_board" !== this.character.status || this.$emit("manage", this.character)
                        },
                        select: function() {
                            "governor" !== this.character.status && "on_board" !== this.character.status || this.$emit("select", this.character)
                        },
                        deactivate: function() {
                            var t = this;
                            "governor" !== this.character.status && "on_board" !== this.character.status || this.$socket.player.push("deactivate_character", {
                                character_id: this.character.id
                            }).receive("ok", (function() {
                                t.$emit("deactivated", t.character)
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        },
                        dismiss: function() {
                            if ("in_deck" === this.character.status) {
                                var t = this.$refs.card.getBoundingClientRect();
                                this.$emit("dismiss", {
                                    character: this.character,
                                    box: t
                                })
                            }
                        },
                        specialization: function(t) {
                            return "data.character.".concat(t.type, ".specializations.").concat(t.specialization)
                        }
                    },
                    components: {
                        DynamicValue: Te
                    }
                },
                je = Object(Ft.a)(Me, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        ref: "card",
                        staticClass: "card-container",
                        class: "f-" + t.theme,
                        on: {
                            click: t.select
                        }
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "agent/" + t.character.type
                        }
                    }), t._v(" "), a("span", {
                        staticClass: "level"
                    }, [t.diff ? [t._v("\n          " + t._s(t._f("obfuscate")(t.diff.level, t.diff.level, "?")) + "\n        ")] : [t._v("\n          " + t._s(t._f("obfuscate")(t.character.level, t.character.level, "?")) + "\n        ")]], 2), t._v(" "), a("span", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.group,
                            expression: "group"
                        }],
                        staticClass: "group"
                    }, [t._v("\n        " + t._s(t.group) + "\n      ")])], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large nowrap"
                    }, [t.isDead ? a("span", [t._v("(✝)")]) : t._e(), t._v("\n        " + t._s(t.character.name) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "title-small nowrap"
                    }, [t._v("\n        " + t._s(t.$t(t.specialization(t.character))) + "\n      ")])])]), t._v(" "), a("div", {
                        staticClass: "card-body"
                    }, [a("div", {
                        staticClass: "card-illustration"
                    }, [a("img", {
                        attrs: {
                            src: "data/agents/" + t.character.illustration
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "card-information"
                    }, [a("div", {
                        staticClass: "card-panel-controls"
                    }, [t.leftControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-left"
                        },
                        on: {
                            click: t.movePanelToLeft
                        }
                    }) : a("div"), t._v(" "), t.rightControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-right"
                        },
                        on: {
                            click: t.movePanelToRight
                        }
                    }) : a("div")], 1), t._v(" "), a("div", {
                        staticClass: "card-panel-window"
                    }, [a("div", {
                        ref: "panelContainer",
                        staticClass: "card-panel-container",
                        style: {
                            left: t.panelContainerPosition + "px"
                        }
                    }, [a("div", {
                        staticClass: "card-panel"
                    }, [a("div", {
                        staticClass: "is-sparse-y"
                    }, [null === t.character.experience ? a("div", [t._v("\n                ░░░ ░░░░░░░\n              ")]) : a("div", ["governor" === t.character.status ? a("dynamic-value", {
                        attrs: {
                            initial: t.character.experience
                        }
                    }) : a("span", [t._v("\n                  " + t._s(t._f("integer")(t.character.experience.value)) + "\n                ")]), t._v(" "), t.diff && t.diff.experience.value - t.character.experience.value > 0 ? a("span", {
                        staticClass: "card-diff"
                    }, [t._v("\n                  +" + t._s(t._f("integer")(t.diff.experience.value - t.character.experience.value)) + "\n                ")]) : t._e(), t._v("\n                / " + t._s(t._f("integer")(t.nextLevelExperience)) + "\n                "), a("strong", [t._v("XP")])], 1), t._v(" "), a("div", [t._v("\n                " + t._s(t.$t("data.culture." + t.character.culture + ".kind")) + "\n              ")])]), t._v(" "), a("div", {
                        staticClass: "is-sparse-y"
                    }, [a("div", [a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.character.protection"),
                            expression: "$t('card.character.protection')"
                        }],
                        staticClass: "simple-bonus"
                    }, [t._v("\n                  " + t._s(t._f("obfuscate")(t.character.protection, t.character.protection, "░░")) + "\n                  "), t.diff && t.diff.protection - t.character.protection > 0 ? a("span", {
                        staticClass: "card-diff"
                    }, [t._v("\n                    +" + t._s(t._f("integer")(t.diff.protection - t.character.protection)) + "\n                  ")]) : t._e(), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "agent/protection"
                        }
                    })], 1), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.character.determination"),
                            expression: "$t('card.character.determination')"
                        }],
                        staticClass: "simple-bonus"
                    }, [t._v("\n                  " + t._s(t._f("obfuscate")(t.character.determination, t.character.determination, "░░")) + "\n                  "), t.diff && t.diff.determination - t.character.determination > 0 ? a("span", {
                        staticClass: "card-diff"
                    }, [t._v("\n                    +" + t._s(t._f("integer")(t.diff.determination - t.character.determination)) + "\n                  ")]) : t._e(), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "agent/determination"
                        }
                    })], 1)]), t._v(" "), a("div", [a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.character.salary"),
                            expression: "$t('card.character.salary')"
                        }],
                        staticClass: "simple-bonus"
                    }, [t._v("\n                  " + t._s(t.character.level * t.constant.character_level_wages) + "\n                  "), t.diff && (t.diff.level - t.character.level) * t.constant.character_level_wages > 0 ? a("span", {
                        staticClass: "card-diff"
                    }, [t._v("\n                    +" + t._s(t._f("integer")((t.diff.level - t.character.level) * t.constant.character_level_wages)) + "\n                  ")]) : t._e(), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1)])]), t._v(" "), a("hr"), t._v(" "), t.character.skills ? t._l(t.character.skills, (function(e, s) {
                        return a("div", {
                            key: s
                        }, [0 === s ? a("h2", [t._v(t._s(t.$t("card.character.agent")))]) : t._e(), t._v(" "), 3 === s ? a("h2", [t._v(t._s(t.$t("card.character.governor")))]) : t._e(), t._v(" "), a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.left",
                                value: t.$t("data.character." + t.character.type + ".skills[" + s + "].description"),
                                expression: "$t(`data.character.${character.type}.skills[${i}].description`)",
                                modifiers: {
                                    left: !0
                                }
                            }],
                            staticClass: "is-sparse-y",
                            class: {
                                "character-skill-active": t.data.specializations[s].key === t.character.specialization
                            }
                        }, [a("div", [t._v(t._s(t.$t("data.character." + t.character.type + ".skills[" + s + "].name")))]), t._v(" "), a("div", {
                            staticClass: "character-skill-points"
                        }, [t.diff && e !== t.diff.skills[s] ? t._l(12, (function(t) {
                            return a("span", {
                                key: t,
                                class: {
                                    active: t <= e, strong: t === e, lvlup: t === e + 1, inactive: t > e + 1
                                }
                            })
                        })) : t._l(12, (function(t) {
                            return a("span", {
                                key: t,
                                class: {
                                    active: t <= e, strong: t === e, inactive: t > e
                                }
                            })
                        }))], 2)])])
                    })) : t._l([0, 1, 2, 3, 4, 5], (function(e) {
                        return a("div", {
                            key: e
                        }, [0 === e ? a("h2", [t._v(t._s(t.$t("card.character.agent")))]) : t._e(), t._v(" "), 3 === e ? a("h2", [t._v(t._s(t.$t("card.character.governor")))]) : t._e(), t._v(" "), a("div", {
                            staticClass: "is-sparse-y"
                        }, [a("div", [t._v(t._s(t.$t("data.character." + t.character.type + ".skills[" + e + "].name")))]), t._v(" "), a("div", {
                            staticClass: "character-skill-points"
                        }, t._l(12, (function(t) {
                            return a("span", {
                                key: t,
                                staticClass: "hidden"
                            })
                        })), 0)])])
                    }))], 2), t._v(" "), a("div", {
                        staticClass: "card-panel"
                    }, [a("h2", [t._v(t._s(t.$t("card.character.about")))]), t._v(" "), a("p", [a("strong", [t._v(t._s(t._f("obfuscate")(t.character.gender, t.character.gender, "░░░░")))]), t._v(" de\n              "), a("strong", [t._v(t._s(t._f("obfuscate")(t.character.age, t.character.age, "░░")))]), t._v(" ans.\n            ")]), t._v(" "), a("p", [t._v("\n              Originaire des régions\n              "), a("strong", [t._v("\n                " + t._s(t.$t("data.culture." + t.character.culture + ".name")) + "\n              ")]), t._v(".\n            ")])])])])])]), t._v(" "), t.child || t.noAction ? t._e() : a("div", {
                        staticClass: "card-action"
                    }, [a("div", {
                        staticClass: "card-action-button"
                    }, [t.character.on_sold ? a("div", {
                        staticClass: "button disabled"
                    }, [a("div", {
                        staticClass: "dashed"
                    }, [t._v("\n          " + t._s(t.$t("card.character.on_sold")) + "\n        ")])]) : "for_hire" === t.character.status ? a("div", {
                        staticClass: "button",
                        on: {
                            click: t.hire
                        }
                    }, [a("div", [t._v(t._s(t.$t("card.character.hire")))]), t._v(" "), t.character.credit_cost > 0 ? a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.character.credit_cost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1) : t._e(), t._v(" "), t.character.technology_cost > 0 ? a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.character.technology_cost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/technology"
                        }
                    })], 1) : t._e(), t._v(" "), t.character.ideology_cost > 0 ? a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.character.ideology_cost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1) : t._e()]) : "in_deck" === t.character.status && t.assignment ? [t.cooldown && 0 != t.cooldown.value ? a("div", {
                        staticClass: "button disabled"
                    }, [a("div", {
                        staticClass: "dashed"
                    }, [t.receivedAt && "fast" !== t.speed ? [t._v("\n              " + t._s(t.$t("card.character.locked_character_date", {
                        date: t.$options.filters["luxon-std"](t.receivedAt + t.cooldown.value * t.tickToMilisecondFactor)
                    })) + "\n            ")] : [t._v("\n              " + t._s(t.$t("card.character.locked_character")) + "\n            ")]], 2)]) : t.charactersLimit.current < t.charactersLimit.max ? a("div", {
                        staticClass: "button",
                        on: {
                            click: t.activate
                        }
                    }, [a("div", [t._v(t._s(t.$t("card.character.deploy")))])]) : a("div", {
                        staticClass: "button disabled"
                    }, [a("div", {
                        staticClass: "dashed"
                    }, [t._v(t._s(t.$t("card.character." + t.character.type + "_limit_reached")))])])] : "in_deck" !== t.character.status || t.assignment ? "governor" === t.character.status && t.character.owner.id === t.playerId ? a("div", {
                        staticClass: "button",
                        on: {
                            click: t.deactivate
                        }
                    }, [a("div", [t._v(t._s(t.$t("card.character.recall")))])]) : t._e() : a("div", {
                        staticClass: "button",
                        on: {
                            click: t.dismiss
                        }
                    }, [a("div", [t._v(t._s(t.$t("card.character.fire")))])])], 2)])])
                }), [], !1, null, null, null).exports,
                Ae = {
                    name: "action-overview",
                    props: {
                        data: Object
                    },
                    computed: {
                        probaSpace: function() {
                            var t = this.data.attacker + this.data.defender !== 0 ? this.data.attacker / (this.data.attacker + this.data.defender) : .5,
                                e = this.data.result ? 100 * this.data.result : null;
                            return {
                                ratio: 100 * t,
                                min: 100 * Math.max(t - .2 + .01 * Math.min(this.data.attackerModifier, 20), 0),
                                max: 100 * Math.min(t + .2, 1),
                                result: e
                            }
                        }
                    },
                    methods: {}
                },
                Ee = Object(Ft.a)(Ae, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "overview"
                    }, [a("div", {
                        staticClass: "overview-value"
                    }, [t._v("\n    " + t._s(t._f("integer")(t.data.attacker)) + "\n    "), a("svgicon", {
                        attrs: {
                            name: t.data.attackerIcon
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "overview-container"
                    }, [a("div", {
                        staticClass: "overview-space"
                    }, [a("div", {
                        staticClass: "overview-ground",
                        class: [{
                            "is-dashed": null === t.data.defender
                        }, "overview-theme-left-" + t.data.defenderTheme, "overview-theme-right-" + t.data.attackerTheme]
                    }, [a("div", {
                        staticStyle: {
                            width: "5%"
                        }
                    }), t._v(" "), a("div", {
                        staticStyle: {
                            width: "45%"
                        }
                    }), t._v(" "), a("div", {
                        staticStyle: {
                            width: "45%"
                        }
                    }), t._v(" "), a("div", {
                        staticStyle: {
                            width: "5%"
                        }
                    })]), t._v(" "), null !== t.data.defender ? a("div", {
                        staticClass: "overview-range",
                        style: "\n          left: " + t.probaSpace.min + "%;\n          width: " + (t.probaSpace.max - t.probaSpace.min) + "%;\n        "
                    }) : t._e(), t._v(" "), null !== t.data.defender ? a("div", {
                        staticClass: "overview-ratio",
                        style: "left: " + t.probaSpace.ratio + "%;"
                    }) : t._e(), t._v(" "), t.probaSpace.result ? a("div", {
                        staticClass: "overview-result",
                        style: "left: " + t.probaSpace.result + "%;"
                    }) : t._e()])]), t._v(" "), a("div", {
                        staticClass: "overview-value"
                    }, [null !== t.data.defender ? [t._v(t._s(t._f("integer")(t.data.defender)))] : [t._v("?")], t._v(" "), a("svgicon", {
                        attrs: {
                            name: t.data.defenderIcon
                        }
                    })], 2)])
                }), [], !1, null, null, null).exports,
                Ne = {
                    name: "infiltration-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop", "cover"];
                            return this.data.spy.current.level > this.data.spy.previous.level && t.push("level"), [t, ["spy"]]
                        },
                        overview: function() {
                            var t;
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "action/infiltrate_alt",
                                attackerModifier: this.data.spy.previous.level,
                                attackerTheme: this.theme(this.data.spy.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "resource/counter_intelligence",
                                defenderTheme: this.theme(null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        cover: function() {
                            return Math.round(this.data.spy.previous.spy.cover.value - this.data.spy.current.spy.cover.value)
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee
                    }
                },
                De = Object(Ft.a)(Ne, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/infiltrate_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.infiltration." + t.data.side + ".title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.infiltration." + t.data.side + ".description." + t.data.outcome, {
                                spy: t.data.spy.current.name,
                                system: t.data.system.name,
                                player: t.data.system.owner ? t.data.system.owner.name : t.$t("galaxy.system.properties.autonomous_system"),
                                contact: t.data.contact_count
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.spy.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("spy") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("character-card", {
                        attrs: {
                            character: t.data.spy.previous,
                            diff: t.data.spy.current,
                            theme: t.theme(t.data.spy.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("cover") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.cover_lost", {
                                cover: t.cover
                            }))
                        }
                    })]) : t._e()])])])
                }), [], !1, null, null, null).exports,
                Ie = {
                    name: "assassination-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop"];
                            return "attacker" === this.data.side && (t.push("cover"), this.data.spy.current.level > this.data.spy.previous.level && t.push("level")), [t, ["spy"],
                                ["target"]
                            ]
                        },
                        overview: function() {
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "action/assassination_alt",
                                attackerModifier: this.data.spy.previous.level,
                                attackerTheme: this.theme(this.data.spy.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "agent/protection",
                                defenderTheme: this.theme(this.data.target.owner.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        cover: function() {
                            return Math.round(this.data.spy.previous.spy.cover.value - this.data.spy.current.spy.cover.value)
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee
                    }
                },
                Le = Object(Ft.a)(Ie, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/assassination_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.assassination.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.assassination.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                spy: t.data.spy.current.name,
                                spy_player: t.data.spy.current.owner.name,
                                target: t.data.target.name,
                                target_player: t.data.target.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.spy.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("cover") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.cover_lost", {
                                cover: t.cover
                            }))
                        }
                    })]) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("spy") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.spy.previous,
                            diff: "attacker" === t.data.side ? t.data.spy.current : null,
                            theme: t.theme(t.data.spy.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("target") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.target")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.target,
                            theme: t.theme(t.data.target.owner.faction)
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                Be = {
                    name: "make-dominion-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop"];
                            return "attacker" === this.data.side && this.data.speaker.current.level > this.data.speaker.previous.level && t.push("level"), [t, ["speaker"]]
                        },
                        overview: function() {
                            var t;
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "action/make_dominion_alt",
                                attackerModifier: this.data.speaker.previous.level,
                                attackerTheme: this.theme(this.data.speaker.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "resource/happiness",
                                defenderTheme: this.theme(null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        systemOwnerName: function() {
                            return this.data.system.owner ? this.data.system.owner.name : this.$t("galaxy.system.properties.autonomous_system")
                        },
                        systemOwnerFaction: function() {
                            var t;
                            return null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee
                    }
                },
                Re = Object(Ft.a)(Be, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/make_dominion_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.make_dominion.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.make_dominion.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                system_player: t.systemOwnerName,
                                speaker: t.data.speaker.current.name,
                                speaker_player: t.data.speaker.current.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.speaker.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("speaker") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.speaker.previous,
                            diff: "attacker" === t.data.side ? t.data.speaker.current : null,
                            theme: t.theme(t.data.speaker.current.owner.faction)
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                ze = {
                    name: "encourage-hate-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop"];
                            return "attacker" === this.data.side && this.data.speaker.current.level > this.data.speaker.previous.level && t.push("level"), this.data.system_penalty > 0 && t.push("penalty"), [t, ["speaker"]]
                        },
                        overview: function() {
                            var t;
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "action/encourage_hate_alt",
                                attackerModifier: this.data.speaker.previous.level,
                                attackerTheme: this.theme(this.data.speaker.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "resource/happiness",
                                defenderTheme: this.theme(null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        systemOwnerName: function() {
                            return this.data.system.owner ? this.data.system.owner.name : this.$t("galaxy.system.properties.autonomous_system")
                        },
                        systemOwnerFaction: function() {
                            var t;
                            return null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee
                    }
                },
                Fe = Object(Ft.a)(ze, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/encourage_hate_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.encourage_hate.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.encourage_hate.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                system_player: t.systemOwnerName,
                                speaker: t.data.speaker.current.name,
                                speaker_player: t.data.speaker.current.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.speaker.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("penalty") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "resource/happiness"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.penalty", {
                                penalty: t.data.system_penalty
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("speaker") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.speaker.previous,
                            diff: "attacker" === t.data.side ? t.data.speaker.current : null,
                            theme: t.theme(t.data.speaker.current.owner.faction)
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                He = {
                    name: "conversion-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop"];
                            return "attacker" === this.data.side && this.data.speaker.current.level > this.data.speaker.previous.level && t.push("level"), [t, ["speaker"],
                                ["target"]
                            ]
                        },
                        overview: function() {
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "action/conversion_alt",
                                attackerModifier: this.data.speaker.previous.level,
                                attackerTheme: this.theme(this.data.speaker.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "agent/determination",
                                defenderTheme: this.theme(this.data.target.owner.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        cover: function() {
                            return Math.round(this.data.speaker.previous.speaker.cover.value - this.data.speaker.current.speaker.cover.value)
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee
                    }
                },
                qe = Object(Ft.a)(He, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/conversion_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.conversion.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.conversion.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                speaker: t.data.speaker.current.name,
                                speaker_player: t.data.speaker.current.owner.name,
                                target: t.data.target.name,
                                target_player: t.data.target.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.speaker.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("cover") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.cover_lost", {
                                cover: t.cover
                            }))
                        }
                    })]) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("speaker") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.speaker.previous,
                            diff: "attacker" === t.data.side ? t.data.speaker.current : null,
                            theme: t.theme(t.data.speaker.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("target") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.target")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.target,
                            theme: t.theme(t.data.target.owner.faction)
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                Ge = a(701),
                Ve = a.n(Ge),
                Ze = {
                    name: "ship-card",
                    mixins: [Rt.a],
                    props: {
                        shipKey: String,
                        ship: {
                            type: Object,
                            required: !1
                        },
                        initialXP: {
                            type: Number,
                            default: 0
                        },
                        system: {
                            type: Object,
                            required: !1
                        },
                        showCost: {
                            type: Boolean,
                            default: !1
                        },
                        disabled: {
                            type: String,
                            required: !1
                        }
                    },
                    computed: {
                        tickToSecondFactor: function() {
                            return this.$store.getters["game/tickToSecondFactor"]
                        },
                        shipData: function() {
                            var t = this;
                            return this.$store.state.game.data.ship.find((function(e) {
                                return e.key === t.shipKey
                            }))
                        },
                        experience: function() {
                            return void 0 === this.ship ? this.initialXP : this.ship.experience
                        },
                        level: function() {
                            return void 0 === this.ship ? 0 : "hidden" === this.ship.level ? "?" : this.ship.level
                        },
                        morale: function() {
                            var t = this.$store.state.game.data.constant[0];
                            return t.army_unit_base_morale + this.level * t.army_unit_morale_per_level
                        },
                        units: function() {
                            var t = this;
                            return O()(Array(this.shipData.unit_count).keys()).map((function(e) {
                                var a = {
                                        x: t.shipData.unit_pattern[2 * e],
                                        y: t.shipData.unit_pattern[2 * e + 1]
                                    },
                                    s = t.ship ? t.ship.units[e].hull : t.shipData.unit_hull;
                                return {
                                    position: a,
                                    hull: s,
                                    status: s / t.shipData.unit_hull
                                }
                            }))
                        },
                        unitHandling: function() {
                            return this.ship ? Math.round(Math.min(this.shipData.unit_handling + .5 * this.ship.level, 95)) : this.shipData.unit_handling
                        },
                        unitInterception: function() {
                            return this.ship && this.shipData.unit_interception > 0 ? Math.round(Math.min(this.shipData.unit_interception + .5 * this.ship.level, 95)) : this.shipData.unit_interception
                        },
                        unitShield: function() {
                            return this.ship && this.shipData.unit_shield > 0 ? Math.round(Math.min(this.shipData.unit_shield + .5 * this.ship.level, 95)) : this.shipData.unit_shield
                        },
                        unitEnergyStrikes: function() {
                            var t = this;
                            return this.ship ? this.shipData.unit_energy_strikes.map((function(e) {
                                return Math.round(e * (1 + .01 * t.ship.level))
                            })) : this.shipData.unit_energy_strikes
                        },
                        unitExplosiveStrikes: function() {
                            var t = this;
                            return this.ship ? this.shipData.unit_explosive_strikes.map((function(e) {
                                return Math.round(e * (1 + .01 * t.ship.level))
                            })) : this.shipData.unit_explosive_strikes
                        }
                    },
                    methods: {
                        width: function(t, e) {
                            return "width: ".concat(t / e * 100, "%")
                        },
                        formatPercent: function(t) {
                            return 0 === t ? "—" : "".concat(t, "%")
                        },
                        formatList: function(t) {
                            var e = Ve()(t, (function(t) {
                                    return t
                                })),
                                a = "";
                            return Object.entries(e).forEach((function(t) {
                                var e = N()(t, 2),
                                    s = e[0],
                                    i = e[1];
                                a += 1 === i.length ? ", ".concat(s) : ", ".concat(i.length, "×").concat(s)
                            })), 0 === a.length ? "—" : a.substr(2)
                        }
                    }
                },
                Ke = Object(Ft.a)(Ze, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "ship/" + t.shipKey
                        }
                    }), t._v(" "), a("span", {
                        staticClass: "level"
                    }, [t._v(t._s(t.level + 1))])], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large nowrap"
                    }, [t._v("\n        " + t._s(t.$t("data.ship." + t.shipKey + ".name")) + "\n      ")]), t._v(" "), void 0 !== t.ship && "capital" == t.shipData.class ? a("div", {
                        staticClass: "title-small"
                    }, [t._v("\n        " + t._s(t.ship.name) + "\n      ")]) : t._e()])]), t._v(" "), a("div", {
                        staticClass: "card-body"
                    }, [a("div", {
                        staticClass: "card-illustration"
                    }, [t.disabled ? a("div", {
                        staticClass: "locked-item"
                    }, [a("svgicon", {
                        staticClass: "locked-icon",
                        attrs: {
                            name: "unlock"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "locked-reason",
                        domProps: {
                            innerHTML: t._s(t.disabled)
                        }
                    })], 1) : a("img", {
                        attrs: {
                            src: "data/ships/" + t.shipData.illustration
                        }
                    }), t._v(" "), t.disabled ? t._e() : t._l(t.units, (function(e, s) {
                        return a("svgicon", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("card.ship.hull_status", {
                                    current: e.hull,
                                    max: t.shipData.unit_hull
                                }),
                                expression: "$t(`card.ship.hull_status`, { current: unit.hull, max: shipData.unit_hull })"
                            }],
                            key: "ship-unit-" + s,
                            staticClass: "ship-unit",
                            style: {
                                top: e.position.x,
                                left: e.position.y,
                                opacity: "" + e.status
                            },
                            attrs: {
                                name: "ship/unit"
                            }
                        })
                    })), t._v(" "), a("div", {
                        staticClass: "toast is-bottom"
                    }, [a("span", [t._v(t._s(t.morale) + " " + t._s(t.$t("card.ship.morale")))])])], 2), t._v(" "), a("div", {
                        staticClass: "card-information"
                    }, [a("div", {
                        staticClass: "card-panel-controls"
                    }, [t.leftControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-left"
                        },
                        on: {
                            click: t.movePanelToLeft
                        }
                    }) : a("div"), t._v(" "), t.rightControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-right"
                        },
                        on: {
                            click: t.movePanelToRight
                        }
                    }) : a("div")], 1), t._v(" "), a("div", {
                        staticClass: "card-panel-window"
                    }, [a("div", {
                        ref: "panelContainer",
                        staticClass: "card-panel-container",
                        style: {
                            left: t.panelContainerPosition + "px"
                        }
                    }, [a("div", {
                        staticClass: "card-panel"
                    }, [a("div", {
                        staticClass: "is-sparse-y"
                    }, [a("div", [a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.ship.repair"),
                            expression: "$t(`card.ship.repair`)"
                        }],
                        staticClass: "simple-bonus"
                    }, [t._v("\n                  " + t._s(t.shipData.unit_repair_coef * t.shipData.unit_count) + "\n                  "), a("svgicon", {
                        attrs: {
                            name: "ship/repair"
                        }
                    })], 1), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.ship.bombing"),
                            expression: "$t(`card.ship.bombing`)"
                        }],
                        staticClass: "simple-bonus"
                    }, [t._v("\n                  " + t._s(t.shipData.unit_raid_coef * t.shipData.unit_count) + "\n                  "), a("svgicon", {
                        attrs: {
                            name: "ship/raid"
                        }
                    })], 1), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.ship.invasion"),
                            expression: "$t(`card.ship.invasion`)"
                        }],
                        staticClass: "simple-bonus"
                    }, [t._v("\n                  " + t._s(t.shipData.unit_invasion_coef * t.shipData.unit_count) + "\n                  "), a("svgicon", {
                        attrs: {
                            name: "ship/invasion"
                        }
                    })], 1)]), t._v(" "), a("div", [a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.ship.maintenance"),
                            expression: "$t(`card.ship.maintenance`)"
                        }],
                        staticClass: "simple-bonus"
                    }, [t._v("\n                  " + t._s(t.shipData.maintenance_cost) + "\n                  "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1)])]), t._v(" "), a("hr"), t._v(" "), a("div", {
                        staticClass: "ship-skills"
                    }, [a("div", {
                        staticClass: "skills-text"
                    }, [a("div", [t._v(t._s(t.$t("card.ship.hull")))]), t._v(" "), a("div", [a("strong", [t._v(t._s(t.shipData.unit_hull))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "ship/hull"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "skills-line"
                    }, [a("span", {
                        style: t.width(100 * Math.log(t.shipData.unit_hull), 1e3)
                    })])]), t._v(" "), a("div", {
                        staticClass: "ship-skills"
                    }, [a("div", {
                        staticClass: "skills-text"
                    }, [a("div", [t._v(t._s(t.$t("card.ship.maneuverability")))]), t._v(" "), a("div", [a("strong", [t._v(t._s(t.formatPercent(t.unitHandling)))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "ship/handling"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "skills-line"
                    }, [a("span", {
                        style: t.width(t.unitHandling, 100)
                    })])]), t._v(" "), a("div", {
                        staticClass: "ship-skills"
                    }, [a("div", {
                        staticClass: "skills-text"
                    }, [a("div", [t._v(t._s(t.$t("card.ship.energy_strikes")))]), t._v(" "), a("div", [a("strong", [t._v(t._s(t.formatList(t.unitEnergyStrikes)))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "ship/energy_strikes"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "skills-line"
                    }, t._l(t.unitEnergyStrikes, (function(e, s) {
                        return a("span", {
                            key: "energy-strike-" + t.shipKey + "-" + s,
                            style: t.width(e, 400)
                        })
                    })), 0)]), t._v(" "), a("div", {
                        staticClass: "ship-skills"
                    }, [a("div", {
                        staticClass: "skills-text"
                    }, [a("div", [t._v(t._s(t.$t("card.ship.explosive_strikes")))]), t._v(" "), a("div", [a("strong", [t._v(t._s(t.formatList(t.unitExplosiveStrikes)))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "ship/explosive_strikes"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "skills-line"
                    }, t._l(t.unitExplosiveStrikes, (function(e, s) {
                        return a("span", {
                            key: "explosive-strike-" + t.shipKey + "-" + s,
                            style: t.width(e, 400)
                        })
                    })), 0)]), t._v(" "), a("div", {
                        staticClass: "ship-skills"
                    }, [a("div", {
                        staticClass: "skills-text"
                    }, [a("div", [t._v(t._s(t.$t("card.ship.shields")))]), t._v(" "), a("div", [a("strong", [t._v(t._s(t.formatPercent(t.unitShield)))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "ship/shield"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "skills-line"
                    }, [a("span", {
                        style: t.width(t.unitShield, 100)
                    })])]), t._v(" "), a("div", {
                        staticClass: "ship-skills"
                    }, [a("div", {
                        staticClass: "skills-text"
                    }, [a("div", [t._v(t._s(t.$t("card.ship.flak")))]), t._v(" "), a("div", [a("strong", [t._v(t._s(t.formatPercent(t.unitInterception)))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "ship/interception"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "skills-line"
                    }, [a("span", {
                        style: t.width(t.unitInterception, 100)
                    })])])]), t._v(" "), a("div", {
                        staticClass: "card-panel"
                    }, [a("h2", [t._v(t._s(t.$t("card.ship.about")))])])])])])]), t._v(" "), [t.showCost ? a("div", {
                        staticClass: "card-cost"
                    }, [a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.shipData.production)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "resource/production"
                        }
                    }), t._v(" "), t.system ? [t._v("\n          (" + t._s(t._f("counter")(t.shipData.production / t.system.production.value * t.tickToSecondFactor)) + ")\n        ")] : t._e()], 2), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.shipData.credit_cost)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.shipData.technology_cost)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "resource/technology"
                        }
                    })], 1)]) : t._e()]], 2)
                }), [], !1, null, null, null).exports,
                Ue = {
                    name: "resource-detail",
                    props: {
                        title: String,
                        value: Number,
                        details: [Object, Array],
                        minimum: {
                            type: Array,
                            required: !1
                        },
                        precision: {
                            type: Number,
                            default: 1
                        },
                        description: {
                            type: String,
                            default: void 0
                        }
                    },
                    computed: {
                        objectDetails: function() {
                            if (!Array.isArray(this.details)) {
                                var t = this.details;
                                return Object.keys(t).forEach((function(e) {
                                    t[e] = t[e].filter((function(t) {
                                        return 0 !== t.value
                                    })), 0 === t[e].length && delete t[e]
                                })), t
                            }
                        }
                    }
                },
                We = Object(Ft.a)(Ue, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "resource-detail"
                    }, [a("div", {
                        staticClass: "label-value main"
                    }, [a("span", [t.description ? a("span", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.description,
                            expression: "description"
                        }],
                        staticClass: "info"
                    }, [t._v("\n        ?\n      ")]) : t._e(), t._v("\n      " + t._s(t.title) + "\n    ")]), t._v(" "), void 0 !== t.value ? a("span", [t._v("\n      " + t._s(t._f("float")(t.value, t.precision)) + "\n    ")]) : t._e()]), t._v(" "), Array.isArray(t.details) ? [t._l(t.details, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "label-value",
                            class: {
                                active: e.active
                            }
                        }, ["separator" === e ? [a("hr")] : [a("span", [t._v("\n          " + t._s(e.reason) + "\n        ")]), t._v(" "), Number.isInteger(e.value) ? a("span", [t._v("\n          " + t._s(t._f("float")(e.value, t.precision)) + "\n        ")]) : a("span", [t._v("\n          " + t._s(e.value) + "\n        ")])]], 2)
                    })), t._v(" "), 0 === Object.keys(t.details).length ? a("div", {
                        staticClass: "label-value"
                    }, [a("span", [t._v(t._s(t.$t("resource-detail.unknown_detail")))]), t._v(" "), a("span", [t._v("░░")])]) : t._e()] : [t._l(t.objectDetails, (function(e, s) {
                        return a("div", {
                            key: s
                        }, [a("div", {
                            staticClass: "label-value-subtitle"
                        }, [t._v("\n        " + t._s(t.$t("resource-detail.type." + s)) + "\n      ")]), t._v(" "), t._l(e, (function(e, i) {
                            return a("div", {
                                key: i,
                                staticClass: "label-value",
                                class: {
                                    active: e.active
                                }
                            }, [a("span", ["building" === s ? [t._v("\n            " + t._s(t.$t("data.building." + e.reason + ".name")) + "\n          ")] : "misc" === s ? [t._v("\n            " + t._s(t.$t("resource-detail.misc." + e.reason)) + "\n          ")] : "happiness_penalties" === s ? [t._v("\n            " + t._s(t.$t("resource-detail.happiness_penalties." + e.reason)) + "\n          ")] : "doctrine" === s ? [t._v("\n            " + t._s(t.$t("data.doctrine." + e.reason + ".name")) + "\n          ")] : "tradition" === s ? [t._v("\n            " + t._s(t.$t("data.tradition." + e.reason + ".name")) + "\n          ")] : "ship" === s ? [t._v("\n            " + t._s(t.$t("data.ship." + e.reason + ".name")) + "\n          ")] : [t._v(t._s(e.reason))]], 2), t._v(" "), a("span", [t._v("\n          " + t._s(t._f("float")(e.value, t.precision)) + "\n        ")])])
                        }))], 2)
                    })), t._v(" "), 0 === Object.keys(t.details).length ? a("div", {
                        staticClass: "label-value"
                    }, [t._v("\n      —\n    ")]) : t._e()], t._v(" "), t.minimum && t.minimum.length > 0 ? [a("div", {
                        staticClass: "label-value-subtitle"
                    }, [t._v("\n      " + t._s(t.$t("resource-detail.minimum.title")) + "\n    ")]), t._v(" "), a("div", {
                        staticClass: "label-value"
                    }, [a("span", [t._v(t._s(t.$t("resource-detail.minimum." + t.minimum[0].reason)))]), t._v(" "), a("span", [t._v(t._s(t.$t("resource-detail.minimum.min", [t.minimum[0].value])))])])] : t._e()], 2)
                }), [], !1, null, null, null).exports,
                Ye = {
                    name: "army",
                    props: {
                        character: Object,
                        theme: String,
                        diff: {
                            type: Object,
                            default: null
                        },
                        halign: {
                            type: String,
                            default: "left"
                        },
                        valign: {
                            type: String,
                            default: "bottom"
                        },
                        context: {
                            type: String,
                            default: "display"
                        },
                        isIdleAndAtHome: {
                            type: Boolean,
                            default: !1
                        },
                        hasHeader: {
                            type: Boolean,
                            default: !0
                        }
                    },
                    data: function() {
                        return {
                            hoveredTile: void 0,
                            armyLineSize: 3,
                            reactions: ["flee", "fight_back", "defend", "attack_enemies", "attack_everyone"]
                        }
                    },
                    computed: {
                        shipsData: function() {
                            return this.$store.state.game.data.ship
                        },
                        activeTile: function() {
                            var t = this.$store.state.game.production;
                            return t && "ship" === t.data.type && t.data.targetId === this.character.id ? t.data.tileId : 0
                        }
                    },
                    methods: {
                        clickTile: function(t) {
                            var e = this;
                            "selection" === this.context && ("empty" === this.character.army.tiles[t - 1].ship_status && this.isIdleAndAtHome && (this.$store.state.game.selectedSystem ? this.toggleProduction(t) : this.$store.dispatch("game/openSystem", {
                                vm: this,
                                id: this.character.system
                            }).then((function() {
                                e.toggleProduction(t)
                            }))))
                        },
                        toggleProduction: function(t) {
                            if ("selection" === this.context) {
                                var e = this.activeTile;
                                e && this.$store.commit("game/clearProduction"), e !== t && (this.$ambiance.sound("open-production"), this.$store.commit("game/prepareProduction", {
                                    systemId: this.character.system,
                                    data: {
                                        type: "ship",
                                        targetId: this.character.id,
                                        tileId: t
                                    }
                                }))
                            }
                        },
                        updateReaction: function(t) {
                            var e = this;
                            "selection" === this.context && "admiral" === this.character.type && this.$socket.player.push("update_reaction", {
                                character_id: this.character.id,
                                reaction: t
                            }).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        },
                        destroyShip: function(t) {
                            var e = this;
                            "selection" === this.context && "admiral" === this.character.type && this.$socket.player.push("destroy_ship", {
                                character_id: this.character.id,
                                tile_id: t
                            }).receive("ok", (function() {
                                e.leaveTile()
                            })).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        },
                        getTileIndex: function(t, e) {
                            return (t - 1) * this.armyLineSize + e
                        },
                        getTile: function(t, e) {
                            var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                            return a ? this.diff.army ? this.diff.army.tiles[this.getTileIndex(t, e) - 1] : {
                                id: 0,
                                ship_status: "empty",
                                ship: null
                            } : this.character.army.tiles[this.getTileIndex(t, e) - 1]
                        },
                        getTileLife: function(t, e) {
                            var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                                s = this.getTile(t, e, a),
                                i = this.shipsData.find((function(t) {
                                    return t.key === s.ship.key
                                })),
                                n = i.unit_hull * i.unit_count,
                                r = s.ship.units.reduce((function(t, e) {
                                    return e.hull + t
                                }), 0);
                            return r / n * 100
                        },
                        enterTile: function(t) {
                            "hidden" !== t.ship && (this.hoveredTile = t)
                        },
                        leaveTile: function() {
                            this.hoveredTile = void 0
                        }
                    },
                    components: {
                        ResourceDetail: We,
                        ShipCard: Ke
                    }
                },
                Qe = Object(Ft.a)(Ye, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "army-container",
                        class: "context-" + t.context
                    }, [t.hasHeader ? [a("div", {
                        staticClass: "army-reactions",
                        class: "is-" + t.halign
                    }, [t.character.army.reaction ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip.left",
                            value: t.$t("character_reaction." + t.character.army.reaction),
                            expression: "$t(`character_reaction.${character.army.reaction}`)",
                            modifiers: {
                                left: !0
                            }
                        }],
                        staticClass: "item active"
                    }, [a("svgicon", {
                        attrs: {
                            name: "reaction/" + t.character.army.reaction
                        }
                    })], 1) : a("div", {
                        staticClass: "item active"
                    }, [t._v("\n        ?\n      ")]), t._v(" "), "selection" === t.context ? a("div", {
                        staticClass: "hidden"
                    }, t._l(t.reactions, (function(e) {
                        return a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.left",
                                value: t.$t("character_reaction." + e),
                                expression: "$t(`character_reaction.${reaction}`)",
                                modifiers: {
                                    left: !0
                                }
                            }],
                            key: e,
                            staticClass: "item",
                            on: {
                                click: function(a) {
                                    return t.updateReaction(e)
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: "reaction/" + e
                            }
                        })], 1)
                    })), 0) : t._e()]), t._v(" "), a("div", {
                        staticClass: "army-header"
                    }, [a("div", [t.character.army.repair_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n            " + t._s(t._f("integer")(t.character.army.repair_coef.value)) + "\n            "), a("svgicon", {
                        attrs: {
                            name: "ship/repair"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.army_repair"),
                            precision: 0,
                            value: t.character.army.repair_coef.value,
                            details: t.character.army.repair_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n          ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/repair"
                        }
                    })], 1), t._v(" "), t.character.army.raid_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n            " + t._s(t._f("integer")(t.character.army.raid_coef.value)) + "\n            "), a("svgicon", {
                        attrs: {
                            name: "ship/raid"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.army_raid"),
                            precision: 0,
                            value: t.character.army.raid_coef.value,
                            details: t.character.army.raid_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n          ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/raid"
                        }
                    })], 1), t._v(" "), t.character.army.invasion_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n            " + t._s(t._f("integer")(t.character.army.invasion_coef.value)) + "\n            "), a("svgicon", {
                        attrs: {
                            name: "ship/invasion"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.army_invasion"),
                            precision: 0,
                            value: t.character.army.invasion_coef.value,
                            details: t.character.army.invasion_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n          ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/invasion"
                        }
                    })], 1)], 1), t._v(" "), a("div", [t.character.army.maintenance ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n            " + t._s(t._f("integer")(t.character.army.maintenance.value)) + "\n            "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.army_maintenance"),
                            precision: 0,
                            value: t.character.army.maintenance.value,
                            details: t.character.army.maintenance.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1)], 1)])] : t._e(), t._v(" "), t._l(t.character.army.tiles.length / t.armyLineSize, (function(e) {
                        return a("div", {
                            key: e,
                            staticClass: "army-line"
                        }, [a("div", {
                            staticClass: "header"
                        }, [t._v("\n      " + t._s(t.$t("galaxy.selection.view.line_short", {
                            n: e
                        })) + "\n    ")]), t._v(" "), t._l(t.armyLineSize, (function(s) {
                            return a("div", {
                                key: t.getTileIndex(e, s)
                            }, ["filled" === t.getTile(e, s).ship_status ? [a("div", {
                                staticClass: "tile",
                                class: {
                                    "is-destroyed": t.diff && "empty" === t.getTile(e, s, !0).ship_status
                                },
                                on: {
                                    mouseenter: function(a) {
                                        t.enterTile(t.getTile(e, s))
                                    },
                                    mouseleave: t.leaveTile
                                }
                            }, ["hidden" !== t.getTile(e, s).ship ? a("svgicon", {
                                staticClass: "tile-icon is-rotated",
                                attrs: {
                                    name: "ship/" + t.getTile(e, s).ship.key
                                }
                            }) : a("svgicon", {
                                staticClass: "tile-icon is-rotated",
                                attrs: {
                                    name: "ship/frame_ship_hidden"
                                }
                            }), t._v(" "), a("div", {
                                staticClass: "tile-level"
                            }, ["hidden" !== t.getTile(e, s).ship && "hidden" !== t.getTile(e, s).ship.level ? [t.diff ? "empty" !== t.getTile(e, s, !0).ship_status ? [t._v("\n                " + t._s(t.getTile(e, s, !0).ship.level + 1) + "\n              ")] : t._e() : [t._v("\n                " + t._s(t.getTile(e, s).ship.level + 1) + "\n              ")]] : [t._v("?")]], 2), t._v(" "), "hidden" !== t.getTile(e, s).ship && "hidden" !== t.getTile(e, s).ship.units ? a("div", {
                                staticClass: "life-container"
                            }, [t.diff ? [a("div", {
                                staticClass: "life-content is-fadded",
                                style: {
                                    height: t.getTileLife(e, s) + "%"
                                }
                            }), t._v(" "), "empty" !== t.getTile(e, s, !0).ship_status ? [a("div", {
                                staticClass: "life-content",
                                style: {
                                    height: t.getTileLife(e, s, !0) + "%"
                                }
                            })] : t._e()] : [a("div", {
                                staticClass: "life-content",
                                style: {
                                    height: t.getTileLife(e, s) + "%"
                                }
                            })]], 2) : t._e(), t._v(" "), "selection" === t.context ? a("div", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip.bottom",
                                    value: t.$t("card.ship.scrap_ship"),
                                    expression: "$t('card.ship.scrap_ship')",
                                    modifiers: {
                                        bottom: !0
                                    }
                                }],
                                staticClass: "tile-toast is-hidden bottom right is-active",
                                on: {
                                    click: function(a) {
                                        t.destroyShip(t.getTile(e, s).id)
                                    }
                                }
                            }, [a("svgicon", {
                                attrs: {
                                    name: "close"
                                }
                            })], 1) : t._e()], 1)] : t._e(), t._v(" "), "planned" === t.getTile(e, s).ship_status ? [a("div", {
                                staticClass: "tile",
                                on: {
                                    mouseenter: function(a) {
                                        t.enterTile(t.getTile(e, s))
                                    },
                                    mouseleave: t.leaveTile
                                }
                            }, [a("svgicon", {
                                staticClass: "tile-icon is-rotated is-transparent",
                                attrs: {
                                    name: "ship/" + t.getTile(e, s).ship.key
                                }
                            }), t._v(" "), a("div", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip.bottom",
                                    value: t.$t("card.ship.under_production"),
                                    expression: "$t('card.ship.under_production')",
                                    modifiers: {
                                        bottom: !0
                                    }
                                }],
                                staticClass: "tile-toast bottom left"
                            }, [a("svgicon", {
                                attrs: {
                                    name: "options"
                                }
                            })], 1)], 1)] : t._e(), t._v(" "), "empty" === t.getTile(e, s).ship_status ? [a("div", {
                                staticClass: "tile",
                                class: {
                                    "is-hoverable": t.isIdleAndAtHome, "is-active": t.isIdleAndAtHome && !1, "has-dashed-background": "selection" === t.context && !t.isIdleAndAtHome, "is-active": t.activeTile === t.getTile(e, s).id
                                },
                                on: {
                                    click: function(a) {
                                        t.clickTile(t.getTileIndex(e, s))
                                    }
                                }
                            }, ["selection" !== t.context || t.isIdleAndAtHome ? t._e() : a("svgicon", {
                                staticClass: "tile-icon is-transparent is-small",
                                attrs: {
                                    name: "unlock"
                                }
                            })], 1)] : t._e()], 2)
                        }))], 2)
                    })), t._v(" "), t.hoveredTile ? a("div", {
                        staticClass: "army-ship-card",
                        class: "is-" + t.valign + " is-" + t.halign
                    }, [a("ship-card", {
                        attrs: {
                            shipKey: t.hoveredTile.ship.key,
                            ship: t.hoveredTile.ship,
                            theme: t.theme
                        }
                    })], 1) : t._e()], 2)
                }), [], !1, null, null, null).exports,
                Je = {
                    name: "sabotage-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop"];
                            return "attacker" === this.data.side && (t.push("cover"), this.data.spy.current.level > this.data.spy.previous.level && t.push("level")), [t, ["spy"],
                                ["target", "target-army"]
                            ]
                        },
                        overview: function() {
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "action/sabotage_alt",
                                attackerModifier: this.data.spy.previous.level,
                                attackerTheme: this.theme(this.data.spy.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "agent/protection",
                                defenderTheme: this.theme(this.data.target.previous.owner.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        cover: function() {
                            return Math.round(this.data.spy.previous.spy.cover.value - this.data.spy.current.spy.cover.value)
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee,
                        Army: Qe
                    }
                },
                Xe = Object(Ft.a)(Je, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/sabotage_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.sabotage.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.sabotage.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                spy: t.data.spy.current.name,
                                spy_player: t.data.spy.current.owner.name,
                                target: t.data.target.current.name,
                                target_player: t.data.target.current.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.spy.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("cover") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.cover_lost", {
                                cover: t.cover
                            }))
                        }
                    })]) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("spy") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.spy.previous,
                            diff: "attacker" === t.data.side ? t.data.spy.current : null,
                            theme: t.theme(t.data.spy.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("target") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.target")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.target.current,
                            theme: t.theme(t.data.target.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("target-army") ? a("div", {
                        staticClass: "box-notification-bloc is-army",
                        class: "f-" + t.theme(t.data.target.current.owner.faction)
                    }, [a("army", {
                        attrs: {
                            "has-header": !1,
                            context: "display",
                            character: t.data.target.previous,
                            diff: t.data.target.current
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                ta = {
                    name: "colonization-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text"];
                            return this.data.admiral.current.level > this.data.admiral.previous.level && t.push("level"), [t, ["admiral", "admiral-army"]]
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        Army: Qe
                    }
                },
                ea = Object(Ft.a)(ta, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/colonization_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.colonization.title", {
                                system: t.data.system.name
                            }))
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.colonization.description", {
                                system: t.data.system.name,
                                admiral: t.data.admiral.current.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.admiral.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("character-card", {
                        attrs: {
                            character: t.data.admiral.previous,
                            diff: t.data.admiral.current,
                            theme: t.theme(t.data.admiral.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral-army") ? a("div", {
                        staticClass: "box-notification-bloc is-army",
                        class: "f-" + t.theme(t.data.admiral.current.owner.faction)
                    }, [a("army", {
                        attrs: {
                            "has-header": !1,
                            context: "display",
                            character: t.data.admiral.previous,
                            diff: t.data.admiral.current
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                aa = {
                    name: "conquest-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop", "log"];
                            return "attacker" === this.data.side && this.data.admiral.current.level > this.data.admiral.previous.level && t.push("level"), [t, ["admiral", "admiral-army"]]
                        },
                        overview: function() {
                            var t;
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "ship/invasion",
                                attackerModifier: this.data.admiral.previous.level,
                                attackerTheme: this.theme(this.data.admiral.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "resource/defense",
                                defenderTheme: this.theme(null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        systemOwnerName: function() {
                            return this.data.system.owner ? this.data.system.owner.name : this.$t("galaxy.system.properties.autonomous_system")
                        },
                        systemOwnerFaction: function() {
                            var t;
                            return null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee,
                        Army: Qe
                    }
                },
                sa = Object(Ft.a)(aa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/conquest_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.conquest.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.conquest.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                system_player: t.systemOwnerName,
                                admiral: t.data.admiral.current.name,
                                admiral_player: t.data.admiral.current.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("log") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.siege_logs", {
                                damaged_building: t.data.siege_logs.damaged_building,
                                population_lost: t.$options.filters.float(t.data.siege_logs.population_lost, 3)
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.admiral.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.admiral.previous,
                            diff: "attacker" === t.data.side ? t.data.admiral.current : null,
                            theme: t.theme(t.data.admiral.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral-army") ? a("div", {
                        staticClass: "box-notification-bloc is-army",
                        class: "f-" + t.theme(t.data.admiral.current.owner.faction)
                    }, [a("army", {
                        attrs: {
                            "has-header": !1,
                            context: "display",
                            character: t.data.admiral.previous,
                            diff: t.data.admiral.current
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                ia = {
                    name: "raid-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop", "log"];
                            return "attacker" === this.data.side && this.data.admiral.current.level > this.data.admiral.previous.level && t.push("level"), [t, ["admiral", "admiral-army"]]
                        },
                        overview: function() {
                            var t;
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "ship/raid",
                                attackerModifier: this.data.admiral.previous.level,
                                attackerTheme: this.theme(this.data.admiral.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "resource/defense",
                                defenderTheme: this.theme(null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        systemOwnerName: function() {
                            return this.data.system.owner ? this.data.system.owner.name : this.$t("galaxy.system.properties.autonomous_system")
                        },
                        systemOwnerFaction: function() {
                            var t;
                            return null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee,
                        Army: Qe
                    }
                },
                na = Object(Ft.a)(ia, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/raid_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.raid.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.raid.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                system_player: t.systemOwnerName,
                                admiral: t.data.admiral.current.name,
                                admiral_player: t.data.admiral.current.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("log") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.siege_logs", {
                                damaged_building: t.data.siege_logs.damaged_building,
                                population_lost: t.$options.filters.float(t.data.siege_logs.population_lost, 3)
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.admiral.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.admiral.previous,
                            diff: "attacker" === t.data.side ? t.data.admiral.current : null,
                            theme: t.theme(t.data.admiral.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral-army") ? a("div", {
                        staticClass: "box-notification-bloc is-army",
                        class: "f-" + t.theme(t.data.admiral.current.owner.faction)
                    }, [a("army", {
                        attrs: {
                            "has-header": !1,
                            context: "display",
                            character: t.data.admiral.previous,
                            diff: t.data.admiral.current
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                ra = {
                    name: "loot-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = ["text", "bop", "log", "loot"];
                            return "attacker" === this.data.side && this.data.admiral.current.level > this.data.admiral.previous.level && t.push("level"), [t, ["admiral", "admiral-army"]]
                        },
                        overview: function() {
                            var t;
                            return {
                                attacker: this.data.balance_of_power.attack,
                                attackerIcon: "ship/loot",
                                attackerModifier: this.data.admiral.previous.level,
                                attackerTheme: this.theme(this.data.admiral.previous.owner.faction),
                                defender: this.data.balance_of_power.defense,
                                defenderIcon: "resource/defense",
                                defenderTheme: this.theme(null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction),
                                result: this.data.balance_of_power.result
                            }
                        },
                        systemOwnerName: function() {
                            return this.data.system.owner ? this.data.system.owner.name : this.$t("galaxy.system.properties.autonomous_system")
                        },
                        systemOwnerFaction: function() {
                            var t;
                            return null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ActionOverview: Ee,
                        Army: Qe
                    }
                },
                oa = Object(Ft.a)(ra, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/loot_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.loot.title", {
                                system: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.outcome." + t.data.side + "." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.loot.description." + t.data.side + "." + t.data.outcome, {
                                system: t.data.system.name,
                                system_player: t.systemOwnerName,
                                admiral: t.data.admiral.current.name,
                                admiral_player: t.data.admiral.current.owner.name
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("log") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.siege_logs", {
                                damaged_building: t.data.siege_logs.damaged_building,
                                population_lost: t.$options.filters.float(t.data.siege_logs.population_lost, 3)
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("loot") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.siege_loot", {
                                credit: t.$options.filters.integer(t.data.loot.credit),
                                technology: t.$options.filters.integer(t.data.loot.technology),
                                ideology: t.$options.filters.integer(t.data.loot.ideology)
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("bop") ? a("div", {
                        staticClass: "box-notification-action toolbox-actions"
                    }, [a("action-overview", {
                        attrs: {
                            data: t.overview
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("level") ? a("div", {
                        staticClass: "box-notification-bloc is-boxed"
                    }, [a("svgicon", {
                        attrs: {
                            name: "bookmark"
                        }
                    }), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.level_gained", {
                                level: t.data.admiral.current.level
                            }))
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("h2", [t._v(t._s(t.$t("notification.box.attacker")))]), t._v(" "), a("character-card", {
                        attrs: {
                            character: t.data.admiral.previous,
                            diff: "attacker" === t.data.side ? t.data.admiral.current : null,
                            theme: t.theme(t.data.admiral.current.owner.faction)
                        }
                    })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral-army") ? a("div", {
                        staticClass: "box-notification-bloc is-army",
                        class: "f-" + t.theme(t.data.admiral.current.owner.faction)
                    }, [a("army", {
                        attrs: {
                            "has-header": !1,
                            context: "display",
                            character: t.data.admiral.previous,
                            diff: t.data.admiral.current
                        }
                    })], 1) : t._e()])])])
                }), [], !1, null, null, null).exports,
                ca = {
                    name: "fight-notif",
                    props: {
                        data: Object
                    },
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    computed: {
                        tabs: function() {
                            var t = this.data.admirals.map((function(t, e) {
                                return ["admiral-".concat(e), "admiral-army-".concat(e)]
                            }));
                            return [
                                ["text"]
                            ].concat(t)
                        },
                        systemOwnerName: function() {
                            return this.data.system.owner ? this.data.system.owner.name : this.$t("galaxy.system.properties.autonomous_system")
                        },
                        systemOwnerFaction: function() {
                            var t;
                            return null === (t = this.data.system.owner) || void 0 === t ? void 0 : t.faction
                        }
                    },
                    methods: {
                        theme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        },
                        scaleText: function(t) {
                            return t > 2e3 ? "xxbig" : t > 1e3 ? "xbig" : t > 600 ? "big" : t > 300 ? "medium" : t > 100 ? "small" : "xsmall"
                        },
                        openReport: function(t) {
                            this.$root.$emit("togglePanel", "operations", {
                                reportId: t
                            })
                        }
                    },
                    components: {
                        CharacterCard: je,
                        Army: Qe
                    }
                },
                la = Object(Ft.a)(ca, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/fight_alt"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$tmd("report.fight_scale_" + t.scaleText(t.data.scale), {
                                name: t.data.system.name
                            }))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [t._v("\n      " + t._s(t.$t("notification.box.fight.outcome." + t.data.outcome)) + "\n    ")])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("div", {
                        staticClass: "box-notification-tab-buttons"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "box-notification-tab-button",
                            class: {
                                active: t.activeTab === s
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0), t._v(" "), a("div", {
                        staticClass: "box-notification-tab-item"
                    }, [t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$tmd("notification.box.fight.description", {
                                system: t.data.system.name,
                                system_player: t.systemOwnerName,
                                admiral_count: t.data.admirals.length
                            }))
                        }
                    }) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("text") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("button", {
                        staticClass: "default-button",
                        on: {
                            click: function(e) {
                                return t.openReport(t.data.report_id)
                            }
                        }
                    }, [a("div", [t._v("\n            " + t._s(t.$t("notification.box.fight.report")) + "\n          ")])])]) : t._e(), t._v(" "), t._l(t.data.admirals, (function(e, s) {
                        return [t.tabs[t.activeTab].includes("admiral-" + s) ? a("div", {
                            key: "admiral-" + s,
                            staticClass: "box-notification-bloc"
                        }, [a("h2", [t._v(t._s(t.$t("notification.box.fight." + e.side + "." + e.status)))]), t._v(" "), a("character-card", {
                            attrs: {
                                character: e.previous,
                                diff: e.has_died ? null : e.current,
                                theme: t.theme(e.current.owner.faction),
                                isDead: e.has_died
                            }
                        })], 1) : t._e(), t._v(" "), t.tabs[t.activeTab].includes("admiral-army-" + s) ? a("div", {
                            key: "admiral-army-" + s,
                            staticClass: "box-notification-bloc is-army",
                            class: "f-" + t.theme(e.current.owner.faction)
                        }, [a("army", {
                            attrs: {
                                "has-header": !1,
                                context: "display",
                                character: e.previous,
                                diff: e.current
                            }
                        })], 1) : t._e()]
                    }))], 2)])])
                }), [], !1, null, null, null).exports,
                ua = {
                    name: "notif-dispatcher",
                    props: {
                        notification: Object
                    },
                    components: {
                        InfiltrationNotif: De,
                        AssassinationNotif: Le,
                        MakeDominionNotif: Re,
                        EncourageHateNotif: Fe,
                        ConversionNotif: qe,
                        SabotageNotif: Xe,
                        ColonizationNotif: ea,
                        ConquestNotif: sa,
                        RaidNotif: na,
                        LootNotif: oa,
                        FightNotif: la
                    }
                },
                da = Object(Ft.a)(ua, (function() {
                    var t = this.$createElement;
                    return (this._self._c || t)(this.notification.key.replace(/[_]/g, "-") + "-notif", {
                        tag: "component",
                        attrs: {
                            data: this.notification.data
                        }
                    })
                }), [], !1, null, null, null).exports,
                va = {
                    name: "event-panel",
                    data: function() {
                        return {
                            activePanel: "player",
                            panels: ["player"],
                            currentPage: 1,
                            maxPage: 2,
                            loading: !1,
                            events: []
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        time: function() {
                            return this.$store.state.game.time
                        },
                        speed: function() {
                            var t = this;
                            return this.$store.state.game.data.speed.find((function(e) {
                                return e.key === t.time.speed
                            }))
                        },
                        utInSeconds: function() {
                            return this.speed.factor / this.$config.TIME.UNIT_TIME_DIVIDER
                        },
                        calendar: function() {
                            return this.$store.state.game.data.calendar.find((function(t) {
                                return "tetrarch" === t.key
                            }))
                        },
                        groupedEvents: function() {
                            return this.groupByMonth(this.events)
                        }
                    },
                    methods: {
                        open: function(t) {
                            this.currentPage = 1, this.maxPage = 2, this.loading = !1, this.events = [], this.loadEvents()
                        },
                        close: function() {
                            this.loading = !0, this.$emit("close")
                        },
                        loadEvents: function() {
                            var t = this;
                            !this.loading && this.currentPage <= this.maxPage && (this.loading = !0, this.$socket.player.push("get_events", {
                                page: this.currentPage
                            }).receive("ok", (function(e) {
                                var a, s = e.events.map((function(e) {
                                    var a = $e(e.inserted_at, t.time, t.utInSeconds),
                                        s = Pe(t.calendar, a);
                                    return e.calendarDate = s, e.data = JSON.parse(e.data), "global" === e.type && (e.data.old_faction = e.data.old_faction ? t.$t("data.faction.".concat(e.data.old_faction, ".name")) : "", e.data.new_faction = e.data.new_faction ? t.$t("data.faction.".concat(e.data.new_faction, ".name")) : ""), e
                                }));
                                (a = t.events).push.apply(a, O()(s)), t.currentPage += 1, t.maxPage = e.total_pages, t.loading = !1
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            })))
                        },
                        groupByMonth: function(t) {
                            var e = t.reduce((function(t, e) {
                                var a = "".concat(e.calendarDate.month).padStart(2, "0"),
                                    s = "".concat(e.calendarDate.year, "-").concat(a);
                                return t[s] || (t[s] = []), t[s].push(e), t
                            }), {});
                            return Object.keys(e).sort((function(t, e) {
                                return e.localeCompare(t)
                            })).map((function(t) {
                                return e[t]
                            }))
                        }
                    },
                    components: {
                        NotifDispatcher: da
                    }
                },
                pa = Object(Ft.a)(va, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "panel-container is-right",
                        class: t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("div", {
                        staticClass: "panel-content is-small"
                    }, [a("v-scrollbar", {
                        staticClass: "has-padding",
                        on: {
                            "ps-y-reach-end": t.loadEvents
                        }
                    }, [a("h1", {
                        staticClass: "panel-default-title"
                    }, [t._v(t._s(t.$t("panel.event.title")))]), t._v(" "), t._l(t.groupedEvents, (function(e, s) {
                        return a("div", {
                            key: s
                        }, [a("h2", {
                            staticClass: "event-title"
                        }, [t._v("\n          " + t._s(t.$t("data.calendar." + t.calendar.key + ".months_prefix[" + e[0].calendarDate.month % 6 + "]")) + t._s(t.$t("data.calendar." + t.calendar.key + ".months_name[" + Math.floor(e[0].calendarDate.month / 6) + "]")) + " " + t._s(e[0].calendarDate.year) + "\n        ")]), t._v(" "), t._l(e, (function(i, n) {
                            return a("div", {
                                key: s + "-" + n,
                                staticClass: "event-item"
                            }, [a("span", {
                                staticClass: "event-day"
                            }, [e[n - 1] && e[n - 1].calendarDate.day === i.calendarDate.day ? t._e() : a("div", {
                                staticClass: "event-day-number"
                            }, [t._v("\n              " + t._s(i.calendarDate.day + 1) + "\n            ")])]), t._v(" "), a("span", {
                                staticClass: "event-text"
                            }, ["text" === i.type ? a("span", {
                                domProps: {
                                    innerHTML: t._s(t.$tmd("notification.text." + i.key, i.data))
                                }
                            }) : "box" === i.type ? [a("svgicon", {
                                attrs: {
                                    name: "action/" + i.key
                                }
                            }), t._v(" "), a("svgicon", {
                                directives: [{
                                    name: "show",
                                    rawName: "v-show",
                                    value: "defender" === i.data.side,
                                    expression: "event.data.side === 'defender'"
                                }],
                                attrs: {
                                    name: "resource/defense"
                                }
                            }), t._v(" "), a("span", {
                                domProps: {
                                    innerHTML: t._s(t.$tmd("notification.short_box." + i.key, {
                                        system: i.data.system.name
                                    }))
                                }
                            }), t._v(" "), i.data.outcome ? [a("span", {
                                staticClass: "event-text-outcome"
                            }, ["fight" === i.key ? [t._v("\n                    " + t._s(t.$t("notification.box.fight.outcome." + i.data.outcome)) + "\n                  ")] : [t._v("\n                    " + t._s(t.$t("notification.box.outcome." + i.data.side + "." + i.data.outcome)) + "\n                  ")]], 2)] : t._e()] : "faction" === i.type ? a("span", {
                                domProps: {
                                    innerHTML: t._s(t.$t("event.faction." + i.key, i.data))
                                }
                            }) : "global" === i.type ? a("span", {
                                domProps: {
                                    innerHTML: t._s(t.$t("event.global." + i.key, i.data))
                                }
                            }) : t._e()], 2), t._v(" "), a("span", {
                                staticClass: "event-date"
                            }, [t._v(t._s(t._f("datetime-long")(i.inserted_at)))]), t._v(" "), "box" === i.type ? a("div", {
                                staticClass: "box-notification-item"
                            }, [a("notif-dispatcher", {
                                attrs: {
                                    notification: i
                                }
                            })], 1) : t._e()])
                        }))], 2)
                    }))], 2)], 1), t._v(" "), a("div", {
                        staticClass: "panel-navbar"
                    }, t._l(t.panels, (function(e) {
                        return a("button", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.right",
                                value: t.$t("panel.ranking." + e),
                                expression: "$t(`panel.ranking.${panel}`)",
                                modifiers: {
                                    right: !0
                                }
                            }],
                            key: e,
                            class: {
                                "is-active": t.activePanel === e
                            },
                            on: {
                                click: function(a) {
                                    t.activePanel = e
                                }
                            }
                        })
                    })), 0)])
                }), [], !1, null, null, null).exports,
                ma = {
                    name: "chat",
                    data: function() {
                        return {
                            newChatMessage: ""
                        }
                    },
                    computed: {
                        mapOverlay: function() {
                            return this.$store.state.game.mapOverlay
                        },
                        faction: function() {
                            return this.$store.state.game.faction
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        reversedChat: function() {
                            return this.faction.chat.slice(0).reverse()
                        },
                        visibleLinesCount: function() {
                            return this.$store.state.game.selectedSystem ? 1 : 5
                        }
                    },
                    watch: {
                        reversedChat: function() {
                            this.$ambiance.sound("new-chat-message")
                        }
                    },
                    methods: {
                        sendChatMessage: function() {
                            var t = this;
                            this.newChatMessage.length > 0 && this.$socket.faction.push("push_chat_message", {
                                from: this.player.name,
                                message: this.newChatMessage
                            }).receive("ok", (function() {
                                t.newChatMessage = ""
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        }
                    }
                },
                ha = Object(Ft.a)(ma, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.mapOverlay,
                            expression: "!mapOverlay"
                        }],
                        staticClass: "chat-container"
                    }, [a("div", {
                        staticClass: "chat-input-box"
                    }, [a("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.newChatMessage,
                            expression: "newChatMessage"
                        }],
                        staticClass: "chat-input",
                        attrs: {
                            placeholder: t.$t("in_game_chat.placeholder")
                        },
                        domProps: {
                            value: t.newChatMessage
                        },
                        on: {
                            keyup: function(e) {
                                return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.sendChatMessage(e)
                            },
                            input: function(e) {
                                e.target.composing || (t.newChatMessage = e.target.value)
                            }
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "chat-messages",
                        class: "show-" + t.visibleLinesCount + "-lines"
                    }, t._l(t.reversedChat, (function(e, s) {
                        return a("div", {
                            key: s,
                            staticClass: "chat-message"
                        }, [a("strong", [t._v(t._s(e.from))]), t._v("\n      " + t._s(e.message) + "\n    ")])
                    })), 0)])
                }), [], !1, null, null, null).exports,
                fa = {
                    name: "notification-center",
                    computed: {
                        textNotifs: function() {
                            return this.$store.state.game.textNotifications.slice().reverse()
                        },
                        boxNotifs: function() {
                            return this.$store.state.game.boxNotifications
                        },
                        currentBoxNotif: function() {
                            return this.boxNotifs.length > 0 ? this.boxNotifs[0] : null
                        }
                    },
                    methods: {
                        discardAndCenterTextNotif: function(t) {
                            t.system_id && this.openSystem(t.system_id), this.$store.commit("game/discardTextNotification", t.id)
                        },
                        openSystem: function(t) {
                            this.$store.dispatch("game/openSystem", {
                                vm: this,
                                id: t
                            })
                        },
                        closeCurrentBoxNotif: function() {
                            this.$store.commit("game/discardFirstBoxNotification")
                        }
                    },
                    mounted: function() {
                        var t = this;
                        ve = setInterval((function() {
                            var e = Date.now();
                            t.textNotifs.forEach((function(a) {
                                e - a.timestamp > 3e4 && t.$store.commit("game/discardTextNotification", a.id)
                            }))
                        }), 1e3)
                    },
                    beforeDestroy: function() {
                        clearInterval(ve)
                    },
                    components: {
                        NotifDispatcher: da
                    }
                },
                _a = Object(Ft.a)(fa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "notification-center"
                    }, [a("div", {
                        staticClass: "text-notification-container",
                        class: {
                            "is-hidden": 0 === t.textNotifs.length
                        }
                    }, [a("div", {
                        staticClass: "text-notification-items"
                    }, t._l(t.textNotifs, (function(e) {
                        return a("div", {
                            key: e.id,
                            staticClass: "text-notification-item",
                            domProps: {
                                innerHTML: t._s(t.$tmd("notification.text." + e.key, e.data))
                            },
                            on: {
                                click: function(a) {
                                    return t.discardAndCenterTextNotif(e)
                                }
                            }
                        })
                    })), 0), t._v(" "), t.textNotifs.length - 1 > 0 ? a("div", {
                        staticClass: "text-notification-counter"
                    }, [t._v("\n      " + t._s(t.textNotifs.length - 1) + "+\n    ")]) : t._e()]), t._v(" "), a("div", {
                        staticClass: "box-notification-container",
                        class: {
                            "is-hidden": 0 === t.boxNotifs.length
                        }
                    }, [t.boxNotifs.length > 0 ? a("div", {
                        staticClass: "box-notification-item"
                    }, [a("notif-dispatcher", {
                        attrs: {
                            notification: t.currentBoxNotif
                        }
                    }), t._v(" "), t.currentBoxNotif.system_id ? a("button", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip.left",
                            value: t.$t("notification.box.center_system"),
                            expression: "$t('notification.box.center_system')",
                            modifiers: {
                                left: !0
                            }
                        }],
                        staticClass: "box-notification-system",
                        on: {
                            click: function(e) {
                                return t.openSystem(t.currentBoxNotif.system_id)
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "disc"
                        }
                    })], 1) : t._e(), t._v(" "), a("div", {
                        staticClass: "box-notification-footer"
                    }, [a("div", {
                        staticClass: "button",
                        on: {
                            click: t.closeCurrentBoxNotif
                        }
                    }, [t._v("\n          " + t._s(t.$t("notification.box.close")) + "\n          "), t.boxNotifs.length > 1 ? [t._v("\n            (+" + t._s(t.boxNotifs.length - 1) + ")\n          ")] : t._e()], 2)])], 1) : t._e()])])
                }), [], !1, null, null, null).exports,
                ya = a(35);

            function ga(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function ba(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? ga(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : ga(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var Ca = {
                    name: "card-complex-bonus",
                    props: {
                        bonus: Array,
                        body: {
                            type: Object,
                            required: !1
                        },
                        system: {
                            type: Object,
                            required: !1
                        },
                        player: {
                            type: Object,
                            required: !1
                        }
                    },
                    computed: {
                        bonuses: function() {
                            var t = this;
                            return this.bonus.map((function(e) {
                                var a = t.bonusIn.find((function(t) {
                                        return e.from === t.key
                                    })),
                                    s = t.bonusOut.find((function(t) {
                                        return e.to === t.key
                                    }));
                                return ba(ba({}, e), {
                                    bonusIn: a,
                                    bonusOut: s
                                })
                            }))
                        },
                        bonusIn: function() {
                            return this.$store.state.game.data.bonus_pipeline_in
                        },
                        bonusOut: function() {
                            return this.$store.state.game.data.bonus_pipeline_out
                        }
                    },
                    methods: {
                        mul: function(t, e) {
                            if ("?" !== e) {
                                var a = t * e;
                                return ya.a.mixed(a, 1, !0)
                            }
                            return "?"
                        },
                        formatMixedOrString: function(t) {
                            return "string" == typeof t ? t : ya.a.mixed(t, 1, !0)
                        }
                    }
                },
                ka = Object(Ft.a)(Ca, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", t._l(t.bonuses, (function(e) {
                        return a("div", {
                            key: e.key,
                            staticClass: "complex-bonus"
                        }, ["none" === e.bonusIn.from ? [a("div", [t._v("\n        " + t._s(t.$t("data.bonus_pipeline_out." + e.to + ".name")) + "\n      ")]), t._v(" "), a("div", [a("strong", [t._v(t._s(t._f("mixed")(e.value, 1, !0)))]), t._v(" "), a("svgicon", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: "resource/resource" !== e.bonusOut.icon,
                                expression: "bonus.bonusOut.icon !== 'resource/resource'"
                            }],
                            attrs: {
                                name: e.bonusOut.icon
                            }
                        })], 1)] : "stellar_body" === e.bonusIn.from ? [a("div", [t._v("\n        " + t._s(t.$t("data.bonus_pipeline_out." + e.to + ".name")) + "\n        ("), a("strong", [t._v("\n          " + t._s(t._f("mixed")(e.value)) + " ×\n          "), t.body ? [t._v(t._s(t.body[e.bonusIn.from_key]))] : t._e(), t._v(" "), a("svgicon", {
                            attrs: {
                                name: e.bonusIn.icon
                            }
                        })], 2), t._v(")\n      ")]), t._v(" "), a("div", [t.body ? a("strong", [t._v(t._s(t.mul(e.value, t.body[e.bonusIn.from_key])))]) : a("strong", [t._v("?")]), t._v(" "), a("svgicon", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: "resource/resource" !== e.bonusOut.icon,
                                expression: "bonus.bonusOut.icon !== 'resource/resource'"
                            }],
                            attrs: {
                                name: e.bonusOut.icon
                            }
                        })], 1)] : ["stellar_system", "player", "army", "spy", "speaker"].includes(e.bonusIn.from) ? [e.from === e.to ? [a("div", [t._v("\n          " + t._s(t.$t("data.bonus_pipeline_out." + e.to + ".name")) + "\n        ")]), t._v(" "), a("div", [a("strong", [t._v("\n            " + t._s(t._f("signed")(100 * e.value)) + "%\n          ")]), t._v(" "), a("svgicon", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: "resource/resource" !== e.bonusOut.icon,
                                expression: "bonus.bonusOut.icon !== 'resource/resource'"
                            }],
                            attrs: {
                                name: e.bonusOut.icon
                            }
                        })], 1)] : [a("div", [t._v("\n          " + t._s(t.$t("data.bonus_pipeline_out." + e.to + ".name")) + "\n          ("), a("strong", [t._v("\n            " + t._s(t._f("mixed")(e.value)) + " ×\n            "), t.system ? [t._v(t._s(t.system[e.bonusIn.from_key].value))] : t._e(), t._v(" "), a("svgicon", {
                            attrs: {
                                name: e.bonusIn.icon
                            }
                        })], 2), t._v(")\n        ")]), t._v(" "), a("div", [t.system ? a("strong", [t._v(t._s(t.mul(e.value, t.system[e.bonusIn.from_key].value)))]) : a("strong", [t._v("?")]), t._v(" "), a("svgicon", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: "resource/resource" !== e.bonusOut.icon,
                                expression: "bonus.bonusOut.icon !== 'resource/resource'"
                            }],
                            attrs: {
                                name: e.bonusOut.icon
                            }
                        })], 1)]] : [t._v("\n      " + t._s(t.$t("card.complex_bonus.not_implemented")) + "\n    ")]], 2)
                    })), 0)
                }), [], !1, null, null, null).exports,
                wa = {
                    name: "building-card",
                    mixins: [Rt.a],
                    props: {
                        buildingKey: String,
                        level: Number,
                        body: {
                            type: Object,
                            required: !1
                        },
                        system: {
                            type: Object,
                            required: !1
                        },
                        showCost: {
                            type: Boolean,
                            default: !1
                        },
                        disabled: {
                            type: String,
                            required: !1
                        }
                    },
                    computed: {
                        buildingData: function() {
                            var t = this;
                            return this.$store.state.game.data.building.find((function(e) {
                                return e.key === t.buildingKey
                            }))
                        },
                        levelData: function() {
                            return this.buildingData.levels[this.level - 1]
                        },
                        tickToSecondFactor: function() {
                            return this.$store.getters["game/tickToSecondFactor"]
                        }
                    },
                    components: {
                        CardComplexBonus: ka
                    }
                },
                xa = Object(Ft.a)(wa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "building/" + t.buildingKey
                        }
                    }), t._v(" "), a("span", {
                        staticClass: "level"
                    }, [t._v(t._s(t.level))])], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large nowrap"
                    }, [t._v("\n        " + t._s(t.$t("data.building." + t.buildingKey + ".name")) + "\n      ")]), t._v(" "), a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.buildingData.workforce > 0,
                            expression: "buildingData.workforce > 0"
                        }],
                        staticClass: "title-small"
                    }, [t._v("\n        " + t._s(t.buildingData.workforce) + "\n        "), a("svgicon", {
                        staticClass: "text-icon",
                        attrs: {
                            name: "resource/population"
                        }
                    }), t._v("\n        " + t._s(t.$t("card.building.mobilized")) + "\n      ")], 1)])]), t._v(" "), a("div", {
                        staticClass: "card-body"
                    }, [a("div", {
                        staticClass: "card-illustration"
                    }, [t.disabled ? a("div", {
                        staticClass: "locked-item"
                    }, [a("svgicon", {
                        staticClass: "locked-icon",
                        attrs: {
                            name: "unlock"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "locked-reason",
                        domProps: {
                            innerHTML: t._s(t.disabled)
                        }
                    })], 1) : a("img", {
                        attrs: {
                            src: "data/buildings/" + t.buildingData.illustration
                        }
                    }), t._v(" "), "unique_body" === t.buildingData.limitation ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.building.limited_hint"),
                            expression: "$t('card.building.limited_hint')"
                        }],
                        staticClass: "toast"
                    }, [t._v("\n        " + t._s(t.$t("card.building.limited")) + "\n      ")]) : t._e(), t._v(" "), "unique_system" === t.buildingData.limitation ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.building.unique_hint"),
                            expression: "$t('card.building.unique_hint')"
                        }],
                        staticClass: "toast"
                    }, [t._v("\n        " + t._s(t.$t("card.building.unique")) + "\n      ")]) : t._e()]), t._v(" "), a("div", {
                        staticClass: "card-information"
                    }, [a("div", {
                        staticClass: "card-panel-controls"
                    }, [t.leftControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-left"
                        },
                        on: {
                            click: t.movePanelToLeft
                        }
                    }) : a("div"), t._v(" "), t.rightControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-right"
                        },
                        on: {
                            click: t.movePanelToRight
                        }
                    }) : a("div")], 1), t._v(" "), a("div", {
                        staticClass: "card-panel-window"
                    }, [a("div", {
                        ref: "panelContainer",
                        staticClass: "card-panel-container",
                        style: {
                            left: t.panelContainerPosition + "px"
                        }
                    }, [a("div", {
                        staticClass: "card-panel"
                    }, [a("blockquote", [t._v("\n              " + t._s(t.$t("data.building." + t.buildingKey + ".quote")) + "\n            ")]), t._v(" "), a("card-complex-bonus", {
                        attrs: {
                            bonus: t.levelData.bonus,
                            body: t.body,
                            system: t.system
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "card-panel"
                    }, [a("h2", [t._v(t._s(t.$t("card.building.about")))]), t._v(" "), a("p", [t._v(t._s(t.$t("data.building." + t.buildingKey + ".description")))])])])])])]), t._v(" "), t.showCost ? a("div", {
                        staticClass: "card-cost"
                    }, [a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n      " + t._s(t._f("integer")(t.levelData.production)) + "\n      "), a("svgicon", {
                        attrs: {
                            name: "resource/production"
                        }
                    }), t._v(" "), t.system ? [t._v("\n        (" + t._s(t._f("counter")(t.levelData.production / t.system.production.value * t.tickToSecondFactor)) + ")\n      ")] : t._e()], 2), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n      " + t._s(t._f("integer")(t.levelData.credit)) + "\n      "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1)]) : t._e()])
                }), [], !1, null, null, null).exports,
                $a = {
                    name: "patent-card",
                    mixins: [Rt.a],
                    props: {
                        patent: Object,
                        costFactor: Number
                    },
                    computed: {
                        cost: function() {
                            return this.patent.cost * (1 + this.costFactor)
                        }
                    },
                    methods: {
                        purchase: function(t) {
                            this.$emit("purchase", t)
                        }
                    },
                    components: {
                        BuildingCard: xa,
                        ShipCard: Ke
                    }
                },
                Pa = Object(Ft.a)($a, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "patent/" + t.patent.key
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large"
                    }, [t._v("\n        " + t._s(t.$t("data.patent." + t.patent.key + ".name")) + "\n      ")])])]), t._v(" "), a("div", {
                        staticClass: "card-body"
                    }, [a("div", {
                        staticClass: "card-illustration"
                    }, [a("img", {
                        attrs: {
                            src: "data/patents/" + t.patent.illustration
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "card-information"
                    }, [a("div", {
                        staticClass: "card-panel-controls"
                    }, [t.leftControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-left"
                        },
                        on: {
                            click: function(e) {
                                return t.movePanelToLeft()
                            }
                        }
                    }) : a("div"), t._v(" "), t.rightControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-right"
                        },
                        on: {
                            click: function(e) {
                                return t.movePanelToRight()
                            }
                        }
                    }) : a("div")], 1), t._v(" "), a("div", {
                        staticClass: "card-panel-window"
                    }, [a("div", {
                        ref: "panelContainer",
                        staticClass: "card-panel-container",
                        style: {
                            left: t.panelContainerPosition + "px"
                        }
                    }, [a("div", {
                        staticClass: "card-panel"
                    }, [a("blockquote", [t._v("\n              " + t._s(t.$t("data.patent." + t.patent.key + ".quote")) + "\n            ")]), t._v(" "), t._l(t.patent.unlock, (function(e) {
                        return a("div", {
                            key: "unlock-" + t.patent.key + "-" + e.key,
                            staticClass: "complex-bonus",
                            on: {
                                mouseover: function(a) {
                                    return t.showChild({
                                        type: e.type,
                                        key: e.key,
                                        level: e.level
                                    })
                                },
                                mouseleave: function(e) {
                                    return t.hideChild()
                                }
                            }
                        }, ["building" === e.type ? a("div", [a("span", {
                            domProps: {
                                innerHTML: t._s(t.$t("card.patent.unlocks_something", {
                                    something: t.$t("data.building." + e.key + ".name")
                                }))
                            }
                        }), t._v(" "), e.level > 1 ? a("span", {
                            domProps: {
                                innerHTML: t._s(t.$t("card.patent.level_hint", {
                                    lvl: e.level
                                }))
                            }
                        }) : t._e()]) : t._e(), t._v(" "), "ship" === e.type ? a("div", {
                            domProps: {
                                innerHTML: t._s(t.$t("card.patent.unlocks_something", {
                                    something: t.$t("data.ship." + e.key + ".name")
                                }))
                            }
                        }) : t._e()])
                    })), t._v(" "), t.patent.info ? a("div", {
                        staticClass: "complex-bonus"
                    }, [a("div", [t._v(t._s(t.$t("data.patent_info." + t.patent.info)))])]) : t._e()], 2), t._v(" "), a("div", {
                        staticClass: "card-panel"
                    }, [a("h2", [t._v(t._s(t.$t("card.patent.about")))]), t._v(" "), a("p", [t._v(t._s(t.$t("data.patent." + t.patent.key + ".description")))])])])])])]), t._v(" "), t.child ? t._e() : a("div", {
                        staticClass: "card-action"
                    }, [a("div", {
                        staticClass: "card-action-button"
                    }, ["locked" === t.patent.status ? a("div", {
                        staticClass: "button disabled"
                    }, [a("div", {
                        staticClass: "dashed"
                    }, [t._v(t._s(t.$t("card.patent.locked")))]), t._v(" "), a("div", {
                        staticClass: "dashed icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.cost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/technology"
                        }
                    })], 1)]) : t._e(), t._v(" "), "available" === t.patent.status ? a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.purchase(t.patent.key)
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("card.patent.buy")))]), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.cost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/technology"
                        }
                    })], 1)]) : t._e(), t._v(" "), "purchased" === t.patent.status ? a("div", {
                        staticClass: "button active",
                        class: "f-" + t.theme
                    }, [a("div", [t._v(t._s(t.$t("card.patent.purchased")))])]) : t._e()])]), t._v(" "), t.child || null === t.activeChild ? t._e() : a("div", {
                        staticClass: "card-child"
                    }, ["building" === t.activeChild.type ? a("building-card", {
                        attrs: {
                            child: !0,
                            buildingKey: t.activeChild.key,
                            level: t.activeChild.level,
                            theme: t.theme,
                            showCost: !0
                        }
                    }) : t._e(), t._v(" "), "ship" === t.activeChild.type ? a("ship-card", {
                        attrs: {
                            child: !0,
                            shipKey: t.activeChild.key,
                            theme: t.theme,
                            showCost: !0
                        }
                    }) : t._e()], 1)])
                }), [], !1, null, null, null).exports,
                Oa = {
                    name: "doctrine-card",
                    mixins: [Rt.a],
                    props: {
                        doctrine: Object,
                        emptyPolicies: Boolean,
                        costFactor: Number
                    },
                    computed: {
                        player: function() {
                            return this.$store.state.game.player
                        },
                        cost: function() {
                            return this.doctrine.cost * (1 + this.costFactor)
                        }
                    },
                    methods: {
                        purchase: function(t) {
                            this.$emit("purchase", t)
                        },
                        choose: function(t) {
                            this.$emit("choose", t)
                        }
                    },
                    components: {
                        CardComplexBonus: ka
                    }
                },
                Sa = Object(Ft.a)(Oa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "doctrine/" + t.doctrine.key
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large"
                    }, [t._v("\n        " + t._s(t.$t("data.doctrine." + t.doctrine.key + ".name")) + "\n      ")])])]), t._v(" "), a("div", {
                        staticClass: "card-body"
                    }, [a("div", {
                        staticClass: "card-illustration"
                    }, [a("img", {
                        attrs: {
                            src: "data/doctrines/" + t.doctrine.illustration
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "card-information"
                    }, [a("div", {
                        staticClass: "card-panel-controls"
                    }, [t.leftControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-left"
                        },
                        on: {
                            click: function(e) {
                                return t.movePanelToLeft()
                            }
                        }
                    }) : a("div"), t._v(" "), t.rightControl ? a("svgicon", {
                        staticClass: "card-panel-control",
                        attrs: {
                            name: "caret-right"
                        },
                        on: {
                            click: function(e) {
                                return t.movePanelToRight()
                            }
                        }
                    }) : a("div")], 1), t._v(" "), a("div", {
                        staticClass: "card-panel-window"
                    }, [a("div", {
                        ref: "panelContainer",
                        staticClass: "card-panel-container",
                        style: {
                            left: t.panelContainerPosition + "px"
                        }
                    }, [a("div", {
                        staticClass: "card-panel"
                    }, [a("blockquote", [t._v("\n              " + t._s(t.$t("data.doctrine." + t.doctrine.key + ".quote")) + "\n            ")]), t._v(" "), a("card-complex-bonus", {
                        attrs: {
                            bonus: t.doctrine.bonus,
                            player: t.player
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "card-panel"
                    }, [a("h2", [t._v(t._s(t.$t("card.doctrine.about")))]), t._v(" "), a("div", [t._v(t._s(t.$t("data.doctrine." + t.doctrine.key + ".description")))])])])])])]), t._v(" "), t.child ? t._e() : a("div", {
                        staticClass: "card-action"
                    }, [a("div", {
                        staticClass: "card-action-button"
                    }, ["locked" === t.doctrine.status ? a("div", {
                        staticClass: "button disabled"
                    }, [a("div", {
                        staticClass: "dashed"
                    }, [t._v(t._s(t.$t("card.doctrine.locked")))]), t._v(" "), a("div", {
                        staticClass: "dashed icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.cost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1)]) : t._e(), t._v(" "), "available" === t.doctrine.status ? a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.purchase(t.doctrine.key)
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("card.doctrine.buy")))]), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.cost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1)]) : t._e(), t._v(" "), "purchased" === t.doctrine.status ? [t.emptyPolicies ? a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.choose(t.doctrine.key)
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("card.doctrine.choose_lex")))])]) : a("div", {
                        staticClass: "button disabled"
                    }, [a("div", {
                        staticClass: "dashed"
                    }, [t._v(t._s(t.$t("card.doctrine.no_lex_slot")))])])] : t._e(), t._v(" "), "chosen" === t.doctrine.status ? a("div", [a("div", {
                        staticClass: "button active",
                        class: "f-" + t.theme
                    }, [a("div", [t._v(t._s(t.$t("card.doctrine.active")))])])]) : t._e()], 2)])])
                }), [], !1, null, null, null).exports,
                Ta = [{
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "centerSystem",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        building: "hab_open_poor"
                    },
                    action: "openSystem",
                    validate: function(t) {
                        return t.stellar_systems[0].habitation > 8
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        building: "university_open"
                    },
                    action: null,
                    validate: function(t) {
                        return t.technology.change > 0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        patent: "citadel"
                    },
                    action: null,
                    validate: function(t) {
                        return t.patents.length > 0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        building: "ideo_open"
                    },
                    action: "openSystem",
                    validate: function(t) {
                        return t.ideology.change > 0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        doctrine: "agent"
                    },
                    action: null,
                    validate: function(t) {
                        return t.doctrines.length > 0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function(t) {
                        return t.policies.length > 0
                    }
                }, {
                    boxes: {},
                    action: "openSystem",
                    validate: function(t) {
                        return t.characters.filter((function(t) {
                            return "on_board" === t.status
                        })).length > 0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        building: "hab_open_poor"
                    },
                    action: null,
                    validate: function(t) {
                        return t.stellar_systems[0].habitation > 30
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        patent: "infra_open_1"
                    },
                    action: null,
                    validate: function(t) {
                        return t.stellar_systems[0].happiness > 0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        building: "factory_orbital"
                    },
                    action: null,
                    validate: function(t) {
                        return t.stellar_systems[0].credit > 100
                    }
                }, {
                    boxes: {
                        building: "mine_dome"
                    },
                    action: null,
                    validate: function(t) {
                        return t.stellar_systems[0].production > 200
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function(t) {
                        return t.credit.change > 200 && t.ideology.change > 50 && t.technology.change > 50
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        patent: "shipyard_1"
                    },
                    action: null,
                    validate: function(t) {
                        return t.patents.includes("shipyard_1")
                    }
                }, {
                    boxes: {
                        building: "shipyard_1_orbital"
                    },
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        patent: "fighter_3"
                    },
                    action: null,
                    validate: function(t) {
                        return t.patents.includes("fighter_3")
                    }
                }, {
                    boxes: {
                        ship: "fighter_3"
                    },
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "centerClosestDominion",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "openClosestDominion",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        patent: "transport_1"
                    },
                    action: null,
                    validate: function(t) {
                        return t.patents.includes("transport_1")
                    }
                }, {
                    boxes: {
                        ship: "transport_1"
                    },
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        doctrine: "system_1"
                    },
                    action: null,
                    validate: function(t) {
                        return t.max_systems.value >= 2
                    }
                }, {
                    boxes: {},
                    action: "centerClosestSystem",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "openClosestSystem",
                    validate: function(t) {
                        return t.stellar_systems.length >= 2
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "centerEnnemyDominion",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "openEnnemyDominion",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        doctrine: "speaker_2"
                    },
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "centerEnnemyDominion",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: "openEnnemyDominion",
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {
                        doctrine: "dominion_1"
                    },
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }, {
                    boxes: {},
                    action: null,
                    validate: function() {
                        return !0
                    }
                }],
                Ma = {
                    name: "tutorial",
                    data: function() {
                        return {
                            isTutorialFinished: !1,
                            ennemyDominionId: null
                        }
                    },
                    computed: {
                        stepCounter: function() {
                            return this.$store.state.game.tutorialStep
                        },
                        step: function() {
                            return Ta[this.stepCounter]
                        },
                        isLastStep: function() {
                            return this.stepCounter + 1 >= Ta.length
                        },
                        isStepValid: function() {
                            return this.step.validate(this.player)
                        },
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        mainSystem: function() {
                            return this.$store.state.game.player.stellar_systems[0]
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        progression: function() {
                            var t = this,
                                e = [23, 8, 8, 9, 10, 1].reduce((function(e, a) {
                                    return e.progression ? e : t.stepCounter < e.cursor + a ? (e.progression = (t.stepCounter - e.cursor + 1) / a * 100, e) : (e.cursor += a, e)
                                }), {
                                    cursor: 0,
                                    progression: null
                                }).progression;
                            return e
                        }
                    },
                    methods: {
                        nextStep: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!t.isStepValid) {
                                                e.next = 9;
                                                break
                                            }
                                            if (t.isLastStep) {
                                                e.next = 8;
                                                break
                                            }
                                            if (t.$store.commit("game/tutorialNextStep"), !t.step.action) {
                                                e.next = 6;
                                                break
                                            }
                                            return e.next = 6, t.doAction(t.step.action);
                                        case 6:
                                            e.next = 9;
                                            break;
                                        case 8:
                                            t.isTutorialFinished = !0;
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        },
                        prevStep: function() {
                            this.stepCounter > 0 && this.$store.commit("game/tutorialPrevStep")
                        },
                        closeTutorial: function() {
                            this.isTutorialFinished = !0
                        },
                        doAction: function(t) {
                            var e = this;
                            return r()(c.a.mark((function a() {
                                return c.a.wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            a.t0 = t, a.next = "centerSystem" === a.t0 ? 3 : "openSystem" === a.t0 ? 5 : "centerClosestDominion" === a.t0 ? 7 : "openClosestDominion" === a.t0 ? 13 : "centerClosestSystem" === a.t0 ? 15 : "openClosestSystem" === a.t0 ? 21 : "centerEnnemyDominion" === a.t0 ? 23 : "openEnnemyDominion" === a.t0 ? 29 : 31;
                                            break;
                                        case 3:
                                            return e.$root.$emit("map:centerToSystem", e.mainSystem.id), a.abrupt("break", 32);
                                        case 5:
                                            return e.$store.dispatch("game/openSystem", {
                                                vm: e,
                                                id: e.mainSystem.id
                                            }), a.abrupt("break", 32);
                                        case 7:
                                            if (!e.$store.state.game.selectedSystem) {
                                                a.next = 11;
                                                break
                                            }
                                            return e.$store.dispatch("game/closeSystem", e), a.next = 11, e.wait(600);
                                        case 11:
                                            return e.$root.$emit("map:centerToSystem", e.getClosestSystemId("inhabited_neutral")), a.abrupt("break", 32);
                                        case 13:
                                            return e.$store.dispatch("game/openSystem", {
                                                vm: e,
                                                id: e.getClosestSystemId("inhabited_neutral")
                                            }), a.abrupt("break", 32);
                                        case 15:
                                            if (!e.$store.state.game.selectedSystem) {
                                                a.next = 19;
                                                break
                                            }
                                            return e.$store.dispatch("game/closeSystem", e), a.next = 19, e.wait(600);
                                        case 19:
                                            return e.$root.$emit("map:centerToSystem", e.getClosestSystemId("uninhabited")), a.abrupt("break", 32);
                                        case 21:
                                            return e.$store.dispatch("game/openSystem", {
                                                vm: e,
                                                id: e.getClosestSystemId("uninhabited")
                                            }), a.abrupt("break", 32);
                                        case 23:
                                            if (!e.$store.state.game.selectedSystem) {
                                                a.next = 27;
                                                break
                                            }
                                            return e.$store.dispatch("game/closeSystem", e), a.next = 27, e.wait(600);
                                        case 27:
                                            return e.$root.$emit("map:centerToSystem", e.ennemyDominionId), a.abrupt("break", 32);
                                        case 29:
                                            return e.$store.dispatch("game/openSystem", {
                                                vm: e,
                                                id: e.ennemyDominionId
                                            }), a.abrupt("break", 32);
                                        case 31:
                                            return a.abrupt("break", 32);
                                        case 32:
                                        case "end":
                                            return a.stop()
                                    }
                                }), a)
                            })))()
                        },
                        getClosestSystemId: function(t) {
                            var e = this,
                                a = this.mainSystem.position;
                            return this.$store.state.game.galaxy.stellar_systems.filter((function(e) {
                                return e.status === t
                            })).sort((function(t, s) {
                                return e.distance(a, t.position) - e.distance(a, s.position)
                            }))[0].id
                        },
                        initEnnemyDominionId: function() {
                            var t = this.$store.state.game.galaxy.stellar_systems.filter((function(t) {
                                return 2 === t.sector_id && "inhabited_neutral" === t.status
                            }));
                            this.ennemyDominionId = t[Math.floor(Math.random() * t.length)].id
                        },
                        distance: function(t, e) {
                            var a = t.x,
                                s = t.y,
                                i = e.x,
                                n = e.y;
                            return Math.sqrt(Math.pow(a - i, 2) + Math.pow(s - n, 2))
                        },
                        wait: function(t) {
                            return new Promise((function(e) {
                                return setTimeout(e, t)
                            }))
                        }
                    },
                    mounted: function() {
                        this.initEnnemyDominionId()
                    },
                    components: {
                        BuildingCard: xa,
                        PatentCard: Pa,
                        DoctrineCard: Sa,
                        ShipCard: Ke
                    }
                },
                ja = Object(Ft.a)(Ma, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return t.isTutorialFinished ? t._e() : a("div", {
                        staticClass: "notification-center is-tutorial"
                    }, [a("div", {
                        staticClass: "box-notification-container"
                    }, [a("div", {
                        staticClass: "box-notification-header"
                    }, [a("svgicon", {
                        attrs: {
                            name: "layers"
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name",
                        domProps: {
                            innerHTML: t._s(t.$t("tutorial.step" + t.stepCounter + ".title"))
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "outcome"
                    }, [a("div", {
                        staticClass: "generic-progress-container is-animated"
                    }, [a("div", {
                        staticClass: "generic-progress-bar",
                        style: "width: " + t.progression + "%;"
                    })])])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-tabs"
                    }, [a("v-scrollbar", {
                        staticClass: "box-notification-tab-item"
                    }, [a("div", {
                        staticClass: "box-notification-bloc",
                        domProps: {
                            innerHTML: t._s(t.$t("tutorial.step" + t.stepCounter + ".content"))
                        }
                    }), t._v(" "), Object.keys(t.step.boxes).includes("building") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("building-card", {
                        attrs: {
                            child: !0,
                            buildingKey: t.step.boxes.building,
                            level: 1,
                            theme: t.theme
                        }
                    })], 1) : t._e(), t._v(" "), Object.keys(t.step.boxes).includes("patent") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("patent-card", {
                        attrs: {
                            patent: t.$store.state.game.data.patent.find((function(e) {
                                return e.key === t.step.boxes.patent
                            })),
                            costFactor: 1,
                            theme: t.theme
                        }
                    })], 1) : t._e(), t._v(" "), Object.keys(t.step.boxes).includes("doctrine") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("doctrine-card", {
                        attrs: {
                            doctrine: t.$store.state.game.data.doctrine.find((function(e) {
                                return e.key === t.step.boxes.doctrine
                            })),
                            costFactor: 1,
                            theme: t.theme
                        }
                    })], 1) : t._e(), t._v(" "), Object.keys(t.step.boxes).includes("ship") ? a("div", {
                        staticClass: "box-notification-bloc"
                    }, [a("ship-card", {
                        attrs: {
                            child: !0,
                            shipKey: t.step.boxes.ship,
                            theme: t.theme
                        }
                    })], 1) : t._e()])], 1), t._v(" "), a("div", {
                        staticClass: "box-notification-footer"
                    }, [t.isStepValid ? a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.nextStep()
                            }
                        }
                    }, [t.isLastStep ? [t._v("\n          " + t._s(t.$t("tutorial.end_tutorial")) + "\n        ")] : [t._v("\n          " + t._s(t.$t("tutorial.next_step")) + "\n        ")]], 2) : a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("tutorial.next_step_tooltip"),
                            expression: "$t(`tutorial.next_step_tooltip`)"
                        }],
                        staticClass: "button disabled"
                    }, [t._v("\n        " + t._s(t.$t("tutorial.next_step")) + "\n      ")]), t._v(" "), t.stepCounter > 0 ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("tutorial.prev_step_tooltip"),
                            expression: "$t(`tutorial.prev_step_tooltip`)"
                        }],
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.prevStep()
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "caret-left"
                        }
                    })], 1) : a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("tutorial.close_tooltip"),
                            expression: "$t(`tutorial.close_tooltip`)"
                        }],
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.closeTutorial()
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "close"
                        }
                    })], 1)])])])
                }), [], !1, null, null, null).exports,
                Aa = {
                    name: "settings",
                    data: function() {
                        return {
                            waiting: !1
                        }
                    },
                    computed: {
                        isTutorial: function() {
                            return this.$store.state.game.galaxy.tutorial_id
                        },
                        instanceId: function() {
                            return this.$store.state.game.auth.instance
                        }
                    },
                    methods: {
                        close: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                var a, s;
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            t.waiting || (t.waiting = !0, a = t.$store.state.game.auth, (s = t.isTutorial) && t.$socket.global.push("kill_instance", {}), t.$ambiance.changeContext("portal"), t.$socket.leaveGame(), t.$store.commit("game/clear"), s ? t.$router.push("/play/tutorial") : a ? t.$router.push("/instance/".concat(a.instance)) : t.$router.push("/play"));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        }
                    },
                    mounted: function() {
                        var t = this;
                        x.a.$on("signal:close_game", (function() {
                            t.close()
                        }))
                    }
                },
                Ea = Object(Ft.a)(Aa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "settings"
                    }, [a("ul", [a("li", {
                        on: {
                            click: t.close
                        }
                    }, [t.isTutorial ? [t._v("\n        " + t._s(t.$t("in_game_settings.exit_tutorial")) + "\n      ")] : [t._v("\n        " + t._s(t.$t("in_game_settings.exit")) + "\n      ")]], 2)]), t._v(" "), a("ul", [a("li", {
                        on: {
                            click: function(e) {
                                return t.$emit("close")
                            }
                        }
                    }, [t._v("\n      " + t._s(t.$t("in_game_settings.back")) + "\n    ")])])])
                }), [], !1, null, null, null).exports,
                Na = {
                    name: "calendar",
                    mixins: [Oe],
                    data: function() {
                        return {
                            now: 0
                        }
                    },
                    computed: {
                        calendar: function() {
                            return this.$store.state.game.data.calendar.find((function(t) {
                                return "tetrarch" === t.key
                            }))
                        },
                        date: function() {
                            return Pe(this.calendar, this.now)
                        }
                    },
                    watch: {
                        time: function(t) {
                            this.now = t.now.value
                        }
                    },
                    methods: {
                        updateValue: function(t) {
                            this.now += this.time.now.change * t
                        }
                    },
                    mounted: function() {
                        this.now = this.time.now.value
                    }
                },
                Da = Object(Ft.a)(Na, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "navbar-calendar navbar-central-box"
                    }, [a("div", {
                        staticClass: "date"
                    }, [a("div", {
                        staticClass: "day"
                    }, [t._v("\n      " + t._s(t.date.day + 1) + "\n    ")]), t._v(" "), a("div", {
                        staticClass: "month"
                    }, [t._v("\n      " + t._s(t.$t("data.calendar." + t.calendar.key + ".months_prefix[" + t.date.month % 6 + "]")) + t._s(t.$t("data.calendar." + t.calendar.key + ".months_name[" + Math.floor(t.date.month / 6) + "]")) + "\n    ")]), t._v(" "), a("div", {
                        staticClass: "year"
                    }, [t._v("\n      " + t._s(t.date.year) + "\n    ")])])])
                }), [], !1, null, null, null).exports,
                Ia = {
                    data: function() {
                        return {
                            activeTab: void 0,
                            counter: 0
                        }
                    },
                    props: {
                        defaultTab: {
                            type: String,
                            required: !1
                        },
                        height: Number
                    },
                    computed: {
                        tabs: function() {
                            return []
                        }
                    },
                    methods: {
                        switchTab: function(t) {
                            this.tabs.includes(t) && (this.activeTab = t, this.counter += 1)
                        },
                        close: function() {
                            this.$emit("close")
                        }
                    },
                    mounted: function() {
                        void 0 === this.defaultTab || "" === this.defaultTab ? this.switchTab(this.tabs[0]) : this.switchTab(this.defaultTab)
                    }
                },
                La = {
                    name: "progress-value",
                    mixins: [Oe],
                    data: function() {
                        return {
                            value: void 0
                        }
                    },
                    props: {
                        current: Number,
                        total: Number,
                        increase: Number,
                        blockAtEnd: {
                            type: Boolean,
                            default: !1
                        },
                        cursor: {
                            type: Number,
                            required: !1
                        },
                        receivedAt: {
                            type: Number,
                            required: !1
                        }
                    },
                    computed: {
                        percentValue: function() {
                            return "".concat(this.value / this.total * 100, "%")
                        },
                        percentCursor: function() {
                            return "".concat(this.cursor / this.total * 100, "%")
                        }
                    },
                    watch: {
                        current: function(t) {
                            this.value = t
                        }
                    },
                    methods: {
                        updateValue: function(t) {
                            this.value += t * this.increase, this.value > this.total && (this.blockAtEnd || (this.value = 0), this.$emit("finished"))
                        }
                    },
                    mounted: function() {
                        this.value = this.current, this.receivedAt && this.correctValue(this.receivedAt)
                    }
                },
                Ba = Object(Ft.a)(La, (function() {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "generic-progress-container"
                    }, [e("div", {
                        staticClass: "generic-progress-bar",
                        style: {
                            width: this.percentValue
                        }
                    }), this._v(" "), this.cursor ? e("div", {
                        staticClass: "generic-progress-cursor",
                        style: {
                            left: this.percentCursor
                        }
                    }) : this._e()])
                }), [], !1, null, null, null).exports;

            function Ra(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function za(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? Ra(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Ra(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var Fa = {
                    name: "character-market-mini-panel",
                    mixins: [Ia],
                    data: function() {
                        return {
                            showCommon: !1,
                            showRemarkable: !1,
                            showExceptional: !1
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        speed: function() {
                            return this.$store.state.game.time.speed
                        },
                        tickToMilisecondFactor: function() {
                            return this.$store.getters["game/tickToMilisecondFactor"]
                        },
                        tabs: function() {
                            return ["admiral", "spy", "speaker"]
                        },
                        characterMarket: function() {
                            return this.$store.state.game.character_market
                        }
                    },
                    methods: {
                        characterByType: function(t) {
                            var e = this;
                            return t ? this.characterMarket.slots.find((function(e) {
                                return e.key === t
                            })).data.reduce((function(t, a) {
                                var s = a.data,
                                    i = a.key;
                                if (!e.showCommon && !e.showRemarkable && !e.showExceptional || "common" === i && e.showCommon || "remarkable" === i && e.showRemarkable || "exceptional" === i && e.showExceptional) {
                                    var n = s.map((function(t) {
                                        var a = e.characterMarket.receivedAt + t.cooldown.value * e.tickToMilisecondFactor;
                                        return za(za({}, {
                                            rank: i,
                                            timestamp: a
                                        }), t)
                                    }));
                                    return t.concat(n)
                                }
                                return t
                            }), []) : []
                        }
                    },
                    watch: {
                        characterMarket: {
                            deep: !0,
                            handler: function() {
                                return this.$store.state.game.character_market
                            }
                        }
                    },
                    components: {
                        CharacterCard: je,
                        ProgressValue: Ba
                    }
                },
                Ha = Object(Ft.a)(Fa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "mp-container inverted",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "mp-header"
                    }, [a("div", {
                        staticClass: "mph-title"
                    }, [t._v("\n      " + t._s(t.$t("minipanel.character_market.title")) + "\n    ")]), t._v(" "), a("div", {
                        staticClass: "mph-nav"
                    }, t._l(t.characterMarket.slots, (function(e) {
                        return a("div", {
                            key: e.key,
                            staticClass: "mph-nav-item",
                            class: {
                                active: t.activeTab === e.key
                            },
                            on: {
                                click: function(a) {
                                    return t.switchTab(e.key)
                                }
                            }
                        }, [t._v("\n        " + t._s(t.$tc("data.character." + e.key + ".name", 2)) + "\n      ")])
                    })), 0), t._v(" "), a("div", {
                        staticClass: "mph-filter"
                    }, [a("div", {
                        staticClass: "mph-filter-item",
                        class: {
                            active: t.showCommon, inactive: !t.showCommon && (t.showRemarkable || t.showExceptional)
                        },
                        on: {
                            click: function(e) {
                                t.showCommon = !t.showCommon
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$t("data.character_rank.common.name")) + "\n        " + t._s(t.$t("data.character_rank.common.star")) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "mph-filter-item",
                        class: {
                            active: t.showRemarkable, inactive: !t.showRemarkable && (t.showCommon || t.showExceptional)
                        },
                        on: {
                            click: function(e) {
                                t.showRemarkable = !t.showRemarkable
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$t("data.character_rank.remarkable.name")) + "\n        " + t._s(t.$t("data.character_rank.remarkable.star")) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "mph-filter-item",
                        class: {
                            active: t.showExceptional, inactive: !t.showExceptional && (t.showRemarkable || t.showCommon)
                        },
                        on: {
                            click: function(e) {
                                t.showExceptional = !t.showExceptional
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$t("data.character_rank.exceptional.name")) + "\n        " + t._s(t.$t("data.character_rank.exceptional.star")) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "mph-close-button",
                        on: {
                            click: t.close
                        }
                    })]), t._v(" "), a("v-scrollbar", {
                        staticClass: "mp-scrollbar",
                        attrs: {
                            settings: {
                                wheelPropagation: !1,
                                suppressScrollY: !0,
                                useBothWheelAxes: !0
                            }
                        }
                    }, [a("div", {
                        staticClass: "mp-content",
                        style: {
                            height: t.height + "px"
                        }
                    }, [a("div", {
                        staticClass: "mpc-stack-list"
                    }, t._l(t.characterByType(t.activeTab), (function(e, s) {
                        var i = e.rank,
                            n = e.timestamp,
                            r = e.nth,
                            o = e.cooldown,
                            c = e.character;
                        return a("div", {
                            key: s,
                            staticClass: "character-stack"
                        }, [a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: "fast" !== t.speed ? t.$t("minipanel.character_market.turnover", {
                                    date: t.$options.filters["luxon-std"](n)
                                }) : "",
                                expression: "speed !== 'fast'\n              ? $t('minipanel.character_market.turnover', { date: $options.filters['luxon-std'](timestamp) })\n              : ''"
                            }],
                            staticClass: "character-stack-cooldown"
                        }, [a("progress-value", {
                            attrs: {
                                receivedAt: t.characterMarket.receivedAt,
                                current: o.value,
                                total: o.initial,
                                increase: -1
                            }
                        })], 1), t._v(" "), a("div", {
                            staticClass: "character-stack-label"
                        }, [a("span", {
                            staticClass: "nth"
                        }, [t._v(t._s(r))]), t._v(" "), a("span", {
                            staticClass: "stars"
                        }, [t._v(t._s(t.$t("data.character_rank." + i + ".star")))])]), t._v(" "), c ? a("character-card", {
                            attrs: {
                                character: c
                            },
                            on: {
                                hire: t.close
                            }
                        }) : t._e()], 1)
                    })), 0)])])], 1)
                }), [], !1, null, null, null).exports,
                qa = {
                    name: "victory-mini-panel",
                    mixins: [Ia],
                    data: function() {
                        return {
                            victories: ["conquest", "population", "visibility"],
                            milestones: [0, 2, 3, 5]
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        tickToMilisecondFactor: function() {
                            return this.$store.getters["game/tickToMilisecondFactor"]
                        },
                        ownFaction: function() {
                            return this.$store.state.game.faction
                        },
                        victory: function() {
                            return this.$store.state.game.victory
                        },
                        ownVictory: function() {
                            var t = this;
                            return this.victory.factions.find((function(e) {
                                return e.key === t.ownFaction.key
                            }))
                        },
                        orderedFactions: function() {
                            return Array.from(this.victory.factions).sort((function(t, e) {
                                return e.victory_points - t.victory_points
                            }))
                        },
                        timestamp: function() {
                            return this.victory.receivedAt + this.victory.ut_time_left * this.tickToMilisecondFactor
                        }
                    },
                    methods: {
                        factionsInMilestone: function(t, e) {
                            return this.victory.factions.filter((function(a) {
                                return a[t].index === e
                            }))
                        },
                        factionsPointsInMilestone: function(t, e) {
                            var a = this;
                            return this.victory.factions.map((function(s) {
                                var i = a.ownFaction.key === s.key || "visibility_track" !== t || a.victory.winner ? s[t].points : "?";
                                return {
                                    reason: a.$t("data.faction.".concat(s.key, ".name")),
                                    value: "".concat(i, " / ").concat(s[t].milestones[e])
                                }
                            }))
                        },
                        getTheme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        },
                        numberToRoman: function(t) {
                            switch (t) {
                                case 1:
                                    return "I";
                                case 2:
                                    return "II";
                                case 3:
                                    return "III";
                                case 4:
                                    return "IV";
                                case 5:
                                    return "V";
                                default:
                                    return "-"
                            }
                        }
                    },
                    components: {
                        ResourceDetail: We
                    }
                },
                Ga = Object(Ft.a)(qa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "mp-container inverted",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "mp-header"
                    }, [a("div", {
                        staticClass: "mph-title"
                    }, [t._v("\n      " + t._s(t.$t("minipanel.victory.title")) + "\n    ")]), t._v(" "), a("div", {
                        staticClass: "mph-close-button",
                        on: {
                            click: t.close
                        }
                    })]), t._v(" "), a("v-scrollbar", {
                        staticClass: "mp-scrollbar",
                        attrs: {
                            settings: {
                                wheelPropagation: !1,
                                suppressScrollY: !0,
                                useBothWheelAxes: !0
                            }
                        }
                    }, [a("div", {
                        staticClass: "mp-content",
                        style: {
                            height: t.height + "px"
                        }
                    }, [a("div", {
                        staticClass: "victory-tracks"
                    }, [t._l(t.victories, (function(e, s) {
                        return a("div", {
                            key: e,
                            staticClass: "victory-tracks-lines"
                        }, [a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.right",
                                value: t.$t("data.victory." + e + ".description"),
                                expression: "$t(`data.victory.${victory}.description`)",
                                modifiers: {
                                    right: !0
                                }
                            }],
                            staticClass: "victory-tracks-header",
                            domProps: {
                                innerHTML: t._s(t.$tmd("data.victory." + e + ".name"))
                            }
                        }), t._v(" "), t._l(t.milestones, (function(i, n) {
                            return a("div", {
                                key: "l" + s + "-" + n,
                                staticClass: "victory-tracks-rows",
                                class: ["is-" + n, {
                                    "is-active": !0
                                }]
                            }, [a("v-popover", {
                                attrs: {
                                    trigger: "hover"
                                }
                            }, [a("div", {
                                staticClass: "content"
                            }), t._v(" "), a("resource-detail", {
                                attrs: {
                                    slot: "popover",
                                    precision: 0,
                                    title: t.$t("data.victory." + e + ".points"),
                                    details: t.factionsPointsInMilestone(e + "_track", n)
                                },
                                slot: "popover"
                            })], 1), t._v(" "), a("div", {
                                staticClass: "track",
                                class: {
                                    "is-active": t.ownVictory[e + "_track"].points >= t.ownVictory[e + "_track"].milestones[n]
                                }
                            }), t._v(" "), a("div", {
                                staticClass: "factions"
                            }, t._l(t.factionsInMilestone(e + "_track", n), (function(e) {
                                return a("div", {
                                    directives: [{
                                        name: "tooltip",
                                        rawName: "v-tooltip",
                                        value: t.$t("data.faction." + e.key + ".name"),
                                        expression: "$t(`data.faction.${f.key}.name`)"
                                    }],
                                    key: "l" + s + "-" + n + "-" + e.key,
                                    staticClass: "faction-item",
                                    class: ["f-" + t.getTheme(e.key)]
                                }, [a("svgicon", {
                                    attrs: {
                                        name: "faction/" + e.key + "-small"
                                    }
                                })], 1)
                            })), 0), t._v(" "), 0 !== i ? [a("div", {
                                staticClass: "points",
                                class: {
                                    "is-active": t.ownVictory[e + "_track"].points >= t.ownVictory[e + "_track"].milestones[n]
                                }
                            }, t._l(i, (function(e) {
                                return a("span", {
                                    key: "s" + s + "-" + n + "-" + e
                                }, [t._v("\n                  ★\n                ")])
                            })), 0)] : t._e()], 2)
                        }))], 2)
                    })), t._v(" "), a("div", {
                        staticClass: "victory-factions"
                    }, [t._l(t.orderedFactions, (function(e, s) {
                        return a("div", {
                            key: e.key,
                            staticClass: "victory-factions-item",
                            class: ["f-" + t.getTheme(e.key)]
                        }, [a("div", {
                            staticClass: "header"
                        }, [a("div", {
                            staticClass: "rank"
                        }, [t._v(t._s(t.numberToRoman(s + 1)))]), t._v(" "), a("div", {
                            staticClass: "title"
                        }, [t._v(t._s(t.$t("data.faction." + e.key + ".name")))])]), t._v(" "), a("div", {
                            staticClass: "body"
                        }, t._l(12, (function(s) {
                            return a("span", {
                                key: "f" + e.key + "-c" + s,
                                class: {
                                    "is-active": s <= e.victory_points
                                }
                            }, [t._v("\n                ★\n              ")])
                        })), 0)])
                    })), t._v(" "), a("div", {
                        staticClass: "victory-time-limit"
                    }, [a("h2", [t._v(t._s(t.$t("minipanel.victory.time-limit")))]), t._v(" "), a("p", [t._v(t._s(t._f("luxon-std")(t.timestamp)))])])], 2)], 2)])])], 1)
                }), [], !1, null, null, null).exports,
                Va = {
                    name: "faction-select",
                    props: {
                        multiple: {
                            type: Boolean,
                            default: !1
                        },
                        label: {
                            type: String,
                            required: !1
                        },
                        factions: {
                            type: Array,
                            required: !0
                        }
                    },
                    data: function() {
                        return {
                            options: [],
                            value: null
                        }
                    },
                    methods: {
                        input: function(t) {
                            this.$emit("input", t)
                        }
                    },
                    mounted: function() {
                        this.options = this.factions
                    }
                },
                Za = Object(Ft.a)(Va, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "custom-select"
                    }, [a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.label,
                            expression: "label"
                        }],
                        staticClass: "custom-select-label"
                    }, [t._v("\n    " + t._s(t.label) + "\n  ")]), t._v(" "), a("div", {
                        staticClass: "custom-select-input"
                    }, [a("v-select", {
                        attrs: {
                            options: t.options,
                            filterable: !1,
                            multiple: t.multiple
                        },
                        on: {
                            input: t.input
                        },
                        model: {
                            value: t.value,
                            callback: function(e) {
                                t.value = e
                            },
                            expression: "value"
                        }
                    }, [a("template", {
                        slot: "no-options"
                    }, [t._v("\n        " + t._s(t.$t("toast.error.select_no_result")) + "\n      ")])], 2)], 1)])
                }), [], !1, null, null, null).exports,
                Ka = {
                    name: "counter",
                    mixins: [Oe],
                    data: function() {
                        return {
                            value: void 0
                        }
                    },
                    props: {
                        current: Number,
                        receivedAt: {
                            type: Number,
                            required: !1
                        }
                    },
                    watch: {
                        current: function(t) {
                            this.value = t
                        }
                    },
                    computed: {
                        tickToSecondFactor: function() {
                            return this.$store.getters["game/tickToSecondFactor"]
                        }
                    },
                    methods: {
                        updateValue: function(t) {
                            this.value += -1 * t, this.value <= 0 && (this.value = 0, this.$emit("finished"))
                        },
                        convertToSeconds: function(t) {
                            return Math.round(t * this.tickToSecondFactor)
                        }
                    },
                    mounted: function() {
                        this.value = this.current, this.receivedAt && this.correctValue(this.receivedAt)
                    }
                },
                Ua = Object(Ft.a)(Ka, (function() {
                    var t = this.$createElement;
                    return (this._self._c || t)("span", [this._v(this._s(this._f("counter")(this.convertToSeconds(this.value))))])
                }), [], !1, null, null, null).exports,
                Wa = {
                    name: "closed-character-card",
                    mixins: [Rt.a],
                    props: {
                        character: Object
                    },
                    computed: {
                        army_tile_count: function() {
                            return this.$store.state.game.data.constant[0].army_tile_count
                        },
                        actions: function() {
                            if (!this.character.actions) return [];
                            var t = this.character.actions.queue.map((function(t) {
                                return t.type
                            }));
                            return t.slice(0, 10)
                        },
                        group: function() {
                            var t = this;
                            return Object.keys(this.$store.state.game.charactersGroup).find((function(e) {
                                return t.$store.state.game.charactersGroup[e] === t.character.id
                            }))
                        }
                    },
                    methods: {
                        select: function() {
                            "governor" !== this.character.status && "on_board" !== this.character.status || this.$emit("select", this.character)
                        }
                    },
                    components: {
                        Counter: Ua
                    }
                },
                Ya = Object(Ft.a)(Wa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container closed",
                        class: "f-" + t.theme,
                        on: {
                            click: t.select
                        }
                    }, [a("div", {
                        staticClass: "card-header"
                    }, ["on_board" === t.character.status && "admiral" === t.character.type ? a("div", {
                        staticClass: "card-header-army"
                    }, [t.character.army_size ? a("div", {
                        staticClass: "card-header-army-item is-faded",
                        style: {
                            height: t.character.army_size.planned / t.army_tile_count * 100 + "%"
                        }
                    }) : t._e(), t._v(" "), t.character.army_size ? a("div", {
                        staticClass: "card-header-army-item",
                        style: {
                            height: t.character.army_size.filled / t.army_tile_count * 100 + "%"
                        }
                    }) : t._e()]) : t._e(), t._v(" "), "on_board" === t.character.status && "spy" === t.character.type && t.character.is_discovered ? a("div", {
                        staticClass: "card-header-cover"
                    }, [a("svgicon", {
                        attrs: {
                            name: "agent/discovered"
                        }
                    })], 1) : t._e(), t._v(" "), a("div", {
                        staticClass: "card-header-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "agent/" + t.character.type
                        }
                    }), t._v(" "), a("span", {
                        staticClass: "level"
                    }, [t._v("\n        " + t._s(t.character.level) + "\n      ")]), t._v(" "), a("span", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.group,
                            expression: "group"
                        }],
                        staticClass: "group"
                    }, [t._v("\n        " + t._s(t.group) + "\n      ")])], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large nowrap"
                    }, [t._v("\n        " + t._s(t.character.name) + "\n      ")]), t._v(" "), t.actions.length ? a("div", {
                        staticClass: "title-actions"
                    }, [t.character.actions && "unknown_yet" !== t.character.actions.queue[0].remaining_time ? a("counter", {
                        staticClass: "counter",
                        attrs: {
                            current: t.character.actions.queue[0].remaining_time,
                            receivedAt: t.character.receivedAt
                        }
                    }) : t._e(), t._v(" "), t._l(t.actions, (function(e, s) {
                        return a("div", {
                            key: "c" + t.character.id + "-a" + s,
                            staticClass: "title-actions-item is-jump",
                            class: {
                                "is-action": "jump" !== e, "is-big": "jump" === e && 0 === s
                            }
                        })
                    }))], 2) : "docking" === t.character.action_status ? a("div", {
                        staticClass: "title-small"
                    }, [t._v("\n        " + t._s(t.$t("data.character_action_status." + t.character.action_status + ".name")) + "\n      ")]) : t._e()]), t._v(" "), "on_board" === t.character.status && t.character.actions && t.character.actions.queue.length && "jump" !== t.character.actions.queue[0].type ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip.left",
                            value: t.$t("data.character_action_status." + t.character.action_status + ".name"),
                            expression: "$t(`data.character_action_status.${character.action_status}.name`)",
                            modifiers: {
                                left: !0
                            }
                        }],
                        staticClass: "card-header-toast active"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/" + t.character.actions.queue[0].type
                        }
                    })], 1) : t._e()])])
                }), [], !1, null, null, null).exports,
                Qa = {
                    name: "market-sell",
                    data: function() {
                        return {
                            offerTypes: ["technology", "ideology", "character_deck", "board_character"],
                            allowedPlayers: [],
                            allowedFactions: [],
                            offerType: null,
                            deckAgent: null,
                            boardAgent: null,
                            amount: 1e3,
                            price: 0
                        }
                    },
                    computed: {
                        instanceId: function() {
                            return parseInt(this.$store.state.game.auth.instance, 10)
                        },
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        marketTaxe: function() {
                            return this.$store.state.game.data.constant[0].market_taxe
                        },
                        profile: function() {
                            return this.$store.state.game.player
                        },
                        profiles: function() {
                            var t = this.$store.state.game.galaxy.players;
                            return Object.keys(t).map((function(e) {
                                return {
                                    label: t[e].name,
                                    id: t[e].id
                                }
                            }))
                        },
                        factions: function() {
                            var t = this;
                            return this.$store.state.game.victory.factions.map((function(e) {
                                return {
                                    label: t.$t("data.faction.".concat(e.key, ".name")),
                                    id: e.id
                                }
                            }))
                        },
                        characters: function() {
                            return "character_deck" === this.offerType ? this.$store.state.game.player.character_deck.filter((function(t) {
                                var e = t.cooldown;
                                return !e || 0 === e.value
                            })).map((function(t) {
                                return t.character
                            })).filter((function(t) {
                                return !t.on_sold
                            })) : "board_character" === this.offerType ? this.$store.state.game.player.characters.filter((function(t) {
                                return "idle" === t.action_status && !t.on_sold
                            })) : []
                        },
                        offerValue: function() {
                            return this.offerType ? ["technology", "ideology"].includes(this.offerType) ? 10 * this.amount : "character_deck" === this.offerType ? this.deckAgent ? 5e4 * this.deckAgent.level : 0 : "board_character" === this.offerType && this.boardAgent ? 5e4 * this.boardAgent.level + 250 * this.boardAgent.army_maintenance : 0 : 0
                        },
                        fees: function() {
                            return this.offerValue * this.marketTaxe
                        }
                    },
                    watch: {
                        offerValue: function(t) {
                            this.price = t
                        }
                    },
                    methods: {
                        create: function() {
                            var t = this;
                            if (!Number.isInteger(this.price) || this.price < 0 || this.price > 1e10) this.$toastError("wrong_market_price");
                            else {
                                var e = {};
                                ["technology", "ideology"].includes(this.offerType) ? e.amount = Number.isInteger(this.amount) && this.amount > 0 ? this.amount : 0 : "character_deck" === this.offerType ? e.character_id = this.deckAgent.id : "board_character" === this.offerType && (e.character_id = this.boardAgent.id), this.$socket.player.push("create_offer", {
                                    type: this.offerType,
                                    data: e,
                                    price: this.price,
                                    allowed_players: this.allowedPlayers.map((function(t) {
                                        return t.id
                                    })),
                                    allowed_factions: this.allowedFactions.map((function(t) {
                                        return t.id
                                    }))
                                }).receive("ok", (function() {
                                    t.reset(), t.$emit("created")
                                })).receive("error", (function(e) {
                                    t.$toastError(e.reason)
                                }))
                            }
                        },
                        reset: function() {
                            this.allowedPlayers = [], this.allowedFactions = [], this.offerType = null, this.deckAgent = null, this.boardAgent = null, this.amount = 1e3, this.price = 0
                        }
                    },
                    components: {
                        ProfileSelect: ge,
                        FactionSelect: Za,
                        CharacterCard: je,
                        ClosedCharacterCard: Ya
                    }
                },
                Ja = Object(Ft.a)(Qa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "mp-content-wrapper"
                    }, [a("div", {
                        staticClass: "mpc-header is-sparse-x"
                    }, [a("div", [a("h2", [t._v(t._s(t.$t("minipanel.market.sell")))]), t._v(" "), t.offerType ? a("p", {
                        staticClass: "info",
                        on: {
                            click: t.reset
                        }
                    }, [t._v("\n        " + t._s(t.$t("minipanel.market.back")) + "\n      ")]) : t._e()])]), t._v(" "), t.offerType ? t._e() : a("div", [a("div", {
                        staticClass: "mpc-offers-list"
                    }, t._l(t.offerTypes, (function(e) {
                        return a("div", {
                            key: e,
                            staticClass: "mpc-offer-item is-header",
                            on: {
                                click: function(a) {
                                    t.offerType = e
                                }
                            }
                        }, [t._v("\n        " + t._s(t.$t("minipanel.market.types." + e)) + "\n      ")])
                    })), 0)]), t._v(" "), "character_deck" !== t.offerType || t.deckAgent ? t._e() : a("div", {
                        staticClass: "mpc-characters-list"
                    }, [t._l(t.characters, (function(e) {
                        return a("closed-character-card", {
                            key: e.id,
                            attrs: {
                                character: e,
                                theme: t.theme
                            },
                            nativeOn: {
                                click: function(a) {
                                    t.deckAgent = e
                                }
                            }
                        })
                    })), t._v(" "), 0 === t.characters.length ? a("span", [t._v("\n      " + t._s(t.$t("minipanel.market.characters_empty_state")) + "\n    ")]) : t._e()], 2), t._v(" "), "board_character" !== t.offerType || t.boardAgent ? t._e() : a("div", {
                        staticClass: "mpc-characters-list"
                    }, [t._l(t.characters, (function(e) {
                        return a("closed-character-card", {
                            key: e.id,
                            attrs: {
                                character: e,
                                theme: t.theme
                            },
                            nativeOn: {
                                click: function(a) {
                                    t.boardAgent = e
                                }
                            }
                        })
                    })), t._v(" "), 0 === t.characters.length ? a("span", [t._v("\n      " + t._s(t.$t("minipanel.market.characters_empty_state")) + "\n    ")]) : t._e()], 2), t._v(" "), ["technology", "ideology"].includes(t.offerType) || "character_deck" === t.offerType && t.deckAgent || "board_character" === t.offerType && t.boardAgent ? [a("div", {
                        staticClass: "mpc-form"
                    }, [a("div", {
                        staticClass: "mpc-form-bloc"
                    }, [
                        ["technology", "ideology"].includes(t.offerType) ? a("div", {
                            staticClass: "mpc-h-input"
                        }, [a("label", {
                            attrs: {
                                for: "mpc-quantity"
                            }
                        }, [t._v(t._s(t.$t("minipanel.market.quantity")))]), t._v(" "), a("div", {
                            staticClass: "mpc-h-input-i"
                        }, [a("input", {
                            directives: [{
                                name: "model",
                                rawName: "v-model.number",
                                value: t.amount,
                                expression: "amount",
                                modifiers: {
                                    number: !0
                                }
                            }],
                            attrs: {
                                id: "mpc-quantity"
                            },
                            domProps: {
                                value: t.amount
                            },
                            on: {
                                input: function(e) {
                                    e.target.composing || (t.amount = t._n(e.target.value))
                                },
                                blur: function(e) {
                                    return t.$forceUpdate()
                                }
                            }
                        }), t._v(" "), a("svgicon", {
                            attrs: {
                                name: "resource/" + t.offerType
                            }
                        })], 1)]) : t._e(), t._v(" "), "character_deck" === t.offerType ? a("div", {
                            staticClass: "mpc-character-input"
                        }, [a("closed-character-card", {
                            attrs: {
                                character: t.deckAgent,
                                theme: t.theme
                            }
                        })], 1) : t._e(), t._v(" "), "board_character" === t.offerType ? a("div", {
                            staticClass: "mpc-character-input"
                        }, [a("closed-character-card", {
                            attrs: {
                                character: t.boardAgent,
                                theme: t.theme
                            }
                        })], 1) : t._e(), t._v(" "), a("div", {
                            staticClass: "mpc-h-input"
                        }, [a("label", {
                            attrs: {
                                for: "mpc-price"
                            }
                        }, [t._v(t._s(t.$t("minipanel.market.price")))]), t._v(" "), a("div", {
                            staticClass: "mpc-h-input-i"
                        }, [a("input", {
                            directives: [{
                                name: "model",
                                rawName: "v-model.number",
                                value: t.price,
                                expression: "price",
                                modifiers: {
                                    number: !0
                                }
                            }],
                            attrs: {
                                id: "mpc-price"
                            },
                            domProps: {
                                value: t.price
                            },
                            on: {
                                input: function(e) {
                                    e.target.composing || (t.price = t._n(e.target.value))
                                },
                                blur: function(e) {
                                    return t.$forceUpdate()
                                }
                            }
                        }), t._v(" "), a("svgicon", {
                            attrs: {
                                name: "resource/credit"
                            }
                        })], 1)]), t._v(" "), a("div", {
                            staticClass: "mpc-h-input"
                        }, [a("label", {
                            attrs: {
                                for: "mpc-fees"
                            }
                        }, [t._v("\n            " + t._s(t.$t("minipanel.market.fees")) + " (" + t._s(t._f("float")(100 * t.marketTaxe, 1)) + "%)\n          ")]), t._v(" "), a("div", {
                            staticClass: "mpc-h-input-i"
                        }, [a("input", {
                            attrs: {
                                id: "mpc-fees",
                                disabled: "true"
                            },
                            domProps: {
                                value: t._f("integer")(t.fees)
                            }
                        }), t._v(" "), a("svgicon", {
                            attrs: {
                                name: "resource/credit"
                            }
                        })], 1)]), t._v(" "), a("div", {
                            staticClass: "mpc-h-input"
                        }, [a("label", {
                            attrs: {
                                for: "mpc-final"
                            }
                        }, [t._v("\n            " + t._s(t.$t("minipanel.market.final_price")) + "\n          ")]), t._v(" "), a("div", {
                            staticClass: "mpc-h-input-i"
                        }, [a("input", {
                            attrs: {
                                id: "mpc-final",
                                disabled: "true"
                            },
                            domProps: {
                                value: t._f("integer")(t.price + t.fees)
                            }
                        }), t._v(" "), a("svgicon", {
                            attrs: {
                                name: "resource/credit"
                            }
                        })], 1)]), t._v(" "), a("hr"), t._v(" "), a("div", {
                            staticClass: "mpc-v-input"
                        }, [0 === t.allowedFactions.length ? a("profile-select", {
                            attrs: {
                                label: t.$t("minipanel.market.allowed_players"),
                                instanceId: t.instanceId,
                                initials: t.profiles,
                                discardedIds: [t.profile.id],
                                multiple: !0
                            },
                            model: {
                                value: t.allowedPlayers,
                                callback: function(e) {
                                    t.allowedPlayers = e
                                },
                                expression: "allowedPlayers"
                            }
                        }) : t._e()], 1), t._v(" "), a("div", {
                            staticClass: "mpc-v-input"
                        }, [0 === t.allowedPlayers.length ? a("faction-select", {
                            attrs: {
                                label: t.$t("minipanel.market.allowed_factions"),
                                factions: t.factions,
                                multiple: !0
                            },
                            model: {
                                value: t.allowedFactions,
                                callback: function(e) {
                                    t.allowedFactions = e
                                },
                                expression: "allowedFactions"
                            }
                        }) : t._e()], 1)
                    ]), t._v(" "), a("div", {
                        staticClass: "mpc-form-bloc"
                    }, [a("button", {
                        staticClass: "mpc-button",
                        on: {
                            click: t.create
                        }
                    }, [a("div", [t._v(t._s(t.$t("minipanel.market.publish")))])])])])] : t._e()], 2)
                }), [], !1, null, null, null).exports,
                Xa = {
                    name: "spy",
                    props: {
                        character: Object
                    },
                    computed: {
                        constant: function() {
                            return this.$store.state.game.data.constant[0]
                        },
                        speed: function() {
                            return this.$store.state.game.time.speed
                        },
                        tickToMilisecondFactor: function() {
                            return this.$store.getters["game/tickToMilisecondFactor"]
                        },
                        isUndercover: function() {
                            return !!this.character.spy.cover && this.character.spy.cover.value > this.constant.cover_threshold
                        },
                        coverChange: function() {
                            return "idle" === this.character.action_status && this.character.spy.cover.value < 100 ? this.character.spy.cover.change : 0
                        },
                        tooltip: function() {
                            if ("fast" !== this.speed && this.character.spy.cover.value < 100 && "idle" === this.character.action_status) {
                                var t = ((this.character.spy.cover.value < this.constant.cover_threshold ? this.constant.cover_threshold : 100) - this.character.spy.cover.value) / this.character.spy.cover.change,
                                    e = this.character.receivedAt + t * this.tickToMilisecondFactor,
                                    a = this.$options.filters["luxon-std"](e);
                                return this.character.spy.cover.value < this.constant.cover_threshold ? this.$t("galaxy.selection.view.cover_timestamp", {
                                    date: a
                                }) : this.$t("galaxy.selection.view.max_cover_timestamp", {
                                    date: a
                                })
                            }
                            return ""
                        }
                    },
                    components: {
                        ResourceDetail: We,
                        ProgressValue: Ba
                    }
                },
                ts = Object(Ft.a)(Xa, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "spy-container"
                    }, [a("div", {
                        staticClass: "spy-header"
                    }, [t.character.spy.infiltrate_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.character.spy.infiltrate_coef.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "action/infiltrate_alt"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.spy_infiltration"),
                            precision: 0,
                            value: t.character.spy.infiltrate_coef.value,
                            details: t.character.spy.infiltrate_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n      ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/infiltrate_alt"
                        }
                    })], 1), t._v(" "), t.character.spy.assassination_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.character.spy.assassination_coef.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "action/assassination_alt"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.spy_assassination"),
                            precision: 0,
                            value: t.character.spy.assassination_coef.value,
                            details: t.character.spy.assassination_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n      ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/assassination_alt"
                        }
                    })], 1), t._v(" "), t.character.spy.sabotage_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.character.spy.sabotage_coef.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "action/sabotage_alt"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.spy_sabotage"),
                            precision: 0,
                            value: t.character.spy.sabotage_coef.value,
                            details: t.character.spy.sabotage_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n      ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/sabotage_alt"
                        }
                    })], 1)], 1), t._v(" "), a("div", {
                        staticClass: "spy-cover"
                    }, [a("div", {
                        staticClass: "spy-cover-icon"
                    }, [t.isUndercover ? a("svgicon", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("galaxy.selection.view.undercover"),
                            expression: "$t('galaxy.selection.view.undercover')"
                        }],
                        attrs: {
                            name: "agent/undercover"
                        }
                    }) : a("svgicon", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("galaxy.selection.view.discovered"),
                            expression: "$t('galaxy.selection.view.discovered')"
                        }],
                        staticClass: "is-active",
                        attrs: {
                            name: "agent/discovered"
                        }
                    })], 1), t._v(" "), t.character.spy.cover ? a("div", {
                        staticClass: "spy-cover-content"
                    }, [a("div", {
                        staticClass: "spy-cover-title"
                    }, [t.coverChange > 0 ? [t._v("\n          " + t._s(t.$t("galaxy.selection.view.cover_gain")) + "\n        ")] : [t._v("\n          " + t._s(t.$t("galaxy.selection.view.cover_locked")) + "\n        ")]], 2), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.tooltip,
                            expression: "tooltip"
                        }],
                        staticClass: "spy-cover-info"
                    }, [a("progress-value", {
                        attrs: {
                            current: t.character.spy.cover.value,
                            total: 100,
                            blockAtEnd: !0,
                            cursor: t.constant.cover_threshold,
                            increase: t.coverChange
                        }
                    })], 1)]) : a("div", {
                        staticClass: "spy-cover-content"
                    }, [a("div", {
                        staticClass: "spy-cover-info"
                    }, [a("progress-value", {
                        attrs: {
                            current: 0,
                            total: 100,
                            cursor: t.constant.cover_threshold,
                            increase: 0
                        }
                    })], 1)])])])
                }), [], !1, null, null, null).exports,
                es = {
                    name: "speaker",
                    props: {
                        character: Object
                    },
                    components: {
                        ResourceDetail: We,
                        ProgressValue: Ba
                    },
                    computed: {
                        speed: function() {
                            return this.$store.state.game.time.speed
                        },
                        tickToMilisecondFactor: function() {
                            return this.$store.getters["game/tickToMilisecondFactor"]
                        },
                        tooltip: function() {
                            if ("fast" !== this.speed && this.character.speaker.cooldown.value > 0) {
                                var t = this.character.receivedAt + this.character.speaker.cooldown.value * this.tickToMilisecondFactor,
                                    e = this.$options.filters["luxon-std"](t);
                                return this.$t("galaxy.selection.view.speaker_timestamp", {
                                    date: e
                                })
                            }
                            return ""
                        }
                    }
                },
                as = Object(Ft.a)(es, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "speaker-container"
                    }, [a("div", {
                        staticClass: "speaker-header"
                    }, [t.character.speaker.make_dominion_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.character.speaker.make_dominion_coef.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "action/make_dominion_alt"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.speaker_make_dominion"),
                            precision: 0,
                            value: t.character.speaker.make_dominion_coef.value,
                            details: t.character.speaker.make_dominion_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n      ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/make_dominion_alt"
                        }
                    })], 1), t._v(" "), t.character.speaker.encourage_hate_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.character.speaker.encourage_hate_coef.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "action/encourage_hate_alt"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.speaker_encourage_hate"),
                            precision: 0,
                            value: t.character.speaker.encourage_hate_coef.value,
                            details: t.character.speaker.encourage_hate_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n      ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/encourage_hate_alt"
                        }
                    })], 1), t._v(" "), t.character.speaker.conversion_coef ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.character.speaker.conversion_coef.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "action/conversion_alt"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.selection.view.speaker_conversion"),
                            precision: 0,
                            value: t.character.speaker.conversion_coef.value,
                            details: t.character.speaker.conversion_coef.details
                        },
                        slot: "popover"
                    })], 1) : a("div", {
                        staticClass: "def-list-prop"
                    }, [t._v("\n      ░░ "), a("svgicon", {
                        attrs: {
                            name: "ship/conversion_alt"
                        }
                    })], 1)], 1), t._v(" "), t.character.speaker.cooldown ? a("div", {
                        staticClass: "speaker-cooldown"
                    }, [t.character.speaker.cooldown.value > 0 ? [a("div", {
                        staticClass: "speaker-cooldown-status"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.selection.view.speaker_cooldown")) + "\n      ")]), t._v(" "), a("progress-value", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.tooltip,
                            expression: "tooltip"
                        }],
                        attrs: {
                            current: t.character.speaker.cooldown.initial - t.character.speaker.cooldown.value,
                            total: t.character.speaker.cooldown.initial,
                            increase: 1
                        }
                    })] : [a("div", {
                        staticClass: "speaker-cooldown-status"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.selection.view.speaker_ready")) + "\n      ")])]], 2) : a("div", {
                        staticClass: "speaker-cooldown"
                    }, [a("div", {
                        staticClass: "speaker-cooldown-status"
                    }, [t._v("\n      " + t._s(t.$t("galaxy.selection.view.speaker_ready")) + "\n    ")])])])
                }), [], !1, null, null, null).exports,
                ss = {
                    name: "market-mini-panel-offer",
                    props: {
                        offer: {
                            type: Object,
                            required: !0
                        },
                        button: {
                            type: String,
                            required: !0
                        }
                    },
                    data: function() {
                        return {
                            clicked: !1
                        }
                    },
                    computed: {
                        fees: function() {
                            return this.offer.value * this.$store.state.game.data.constant[0].market_taxe
                        },
                        finalPrice: function() {
                            return this.offer.price + this.fees
                        },
                        theme: function() {
                            var t = this.$store.state.game.galaxy.players[this.offer.profile.id];
                            return this.$store.getters["game/themeByKey"](t.faction)
                        }
                    },
                    methods: {
                        getPlayerTheme: function(t, e) {
                            return e ? '<span class="is-color-'.concat(theme, '">').concat(t, "</span>") : t
                        },
                        openPlayer: function(t) {
                            this.$store.dispatch("game/openPlayer", {
                                vm: this,
                                id: t
                            })
                        },
                        handelClick: function(t) {
                            this.clicked || (this.clicked = !0, this.$emit(t, this.offer.id))
                        }
                    },
                    components: {
                        ClosedCharacterCard: Ya,
                        CharacterCard: je,
                        Army: Qe,
                        Spy: ts,
                        Speaker: as
                    }
                },
                is = {
                    name: "market-mini-panel",
                    mixins: [Ia],
                    data: function() {
                        return {
                            offers: [],
                            ownOffers: []
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        tabs: function() {
                            return ["buy", "sell", "own"]
                        }
                    },
                    methods: {
                        fetch: function() {
                            var t = this;
                            this.$socket.player.push("get_offers", {}).receive("ok", (function(e) {
                                var a = e.offers;
                                t.offers = t.parseOffers(a)
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        },
                        fetchOwn: function() {
                            var t = this;
                            this.$socket.player.push("get_own_offers", {}).receive("ok", (function(e) {
                                var a = e.offers;
                                t.ownOffers = t.parseOffers(a)
                            })).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        },
                        cancel: function(t) {
                            var e = this;
                            this.$socket.player.push("cancel_offer", {
                                offer_id: t
                            }).receive("ok", (function() {
                                e.fetchOwn()
                            })).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        },
                        buy: function(t) {
                            var e = this;
                            this.$socket.player.push("buy_offer", {
                                offer_id: t
                            }).receive("ok", (function() {
                                e.fetch()
                            })).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        },
                        parseOffers: function(t) {
                            var e = this;
                            return t.map((function(t) {
                                return t.data = JSON.parse(t.data), t.profile = e.$store.state.game.galaxy.players[t.profile_id], t
                            }))
                        },
                        created: function() {
                            this.fetchOwn(), this.switchTab("own")
                        }
                    },
                    mounted: function() {
                        this.fetch(), this.fetchOwn()
                    },
                    components: {
                        MarketSell: Ja,
                        MarketOffer: Object(Ft.a)(ss, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "mpc-offer-item",
                                class: "theme-" + t.theme
                            }, [a("div", {
                                staticClass: "mpc-oi-header"
                            }, [a("span", {
                                staticClass: "mpc-oi-name"
                            }, [t._v("\n      #" + t._s(t.offer.id) + "\n      "), a("span", {
                                domProps: {
                                    innerHTML: t._s("<span class='is-color-" + t.theme + "'>" + t.offer.profile.name + "</span>")
                                },
                                on: {
                                    click: function(e) {
                                        return t.openPlayer(t.offer.profile.id)
                                    }
                                }
                            })]), t._v(" "), a("span", {
                                staticClass: "mpc-oi-date"
                            }, [t._v(t._s(t._f("date-short")(t.offer.inserted_at)))])]), t._v(" "), ["character_deck", "board_character"].includes(t.offer.type) ? a("div", {
                                staticClass: "flying"
                            }, [a("div", {
                                staticClass: "fl-content"
                            }, [a("character-card", {
                                attrs: {
                                    character: t.offer.data.character,
                                    theme: t.theme,
                                    noAction: !0
                                }
                            }), t._v(" "), "board_character" === t.offer.type ? a("div", {
                                staticClass: "fl-side-content"
                            }, ["admiral" === t.offer.data.character.type ? a("army", {
                                attrs: {
                                    theme: t.theme,
                                    valign: "top",
                                    halign: "right",
                                    context: "display",
                                    character: t.offer.data.character
                                }
                            }) : t._e(), t._v(" "), "spy" === t.offer.data.character.type ? a("spy", {
                                attrs: {
                                    character: t.offer.data.character
                                }
                            }) : t._e(), t._v(" "), "speaker" === t.offer.data.character.type ? a("speaker", {
                                attrs: {
                                    character: t.offer.data.character
                                }
                            }) : t._e()], 1) : t._e()], 1)]) : t._e(), t._v(" "), ["technology", "ideology"].includes(t.offer.type) ? a("div", {
                                staticClass: "card-container closed"
                            }, [a("div", {
                                staticClass: "card-header"
                            }, [a("div", {
                                staticClass: "card-header-icon"
                            }, [a("svgicon", {
                                attrs: {
                                    name: "resource/" + t.offer.type
                                }
                            })], 1), t._v(" "), a("div", {
                                staticClass: "card-header-content"
                            }, [a("div", {
                                staticClass: "title-large nowrap"
                            }, [t._v("\n          " + t._s(t._f("integer")(t.offer.data.amount)) + "\n          "), a("svgicon", {
                                staticClass: "has-no-background",
                                attrs: {
                                    name: "resource/" + t.offer.type
                                }
                            })], 1), t._v(" "), a("div", {
                                staticClass: "title-small nowrap"
                            }, [t._v("\n          " + t._s(t.offer.type) + "\n        ")])])])]) : a("closed-character-card", {
                                attrs: {
                                    character: t.offer.data.character,
                                    theme: t.theme
                                }
                            }), t._v(" "), "buy" === t.button ? a("button", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: t.$t("minipanel.market.tooltip", {
                                        price: t.$options.filters.integer(t.offer.price),
                                        fees: t.$options.filters.integer(t.fees)
                                    }),
                                    expression: "$t(\n      'minipanel.market.tooltip',\n      {price: $options.filters.integer(offer.price), fees: $options.filters.integer(fees)},\n    )"
                                }],
                                staticClass: "default-button",
                                attrs: {
                                    disabled: t.clicked
                                },
                                on: {
                                    click: function(e) {
                                        return t.handelClick("buy")
                                    }
                                }
                            }, [a("div", [t._v(t._s(t.$t("minipanel.market.buy")))]), t._v(" "), a("div", {
                                staticClass: "icon-value"
                            }, [t._v("\n      " + t._s(t._f("integer")(t.finalPrice)) + "\n      "), a("svgicon", {
                                attrs: {
                                    name: "resource/credit"
                                }
                            })], 1)]) : t._e(), t._v(" "), "cancel" === t.button ? a("button", {
                                staticClass: "default-button",
                                attrs: {
                                    disabled: t.clicked
                                },
                                on: {
                                    click: function(e) {
                                        return t.handelClick("cancel")
                                    }
                                }
                            }, [a("div", [t._v(t._s(t.$t("minipanel.market.cancel")))])]) : t._e()], 1)
                        }), [], !1, null, null, null).exports
                    }
                },
                ns = {
                    name: "topbar",
                    data: function() {
                        return {
                            isChatOpen: !1,
                            activeMiniPanel: {
                                name: ""
                            },
                            isMiniPanelOpen: !1,
                            miniPanels: [{
                                name: "character-market",
                                height: 490
                            }, {
                                name: "market",
                                height: 468
                            }, {
                                name: "victory",
                                height: 440
                            }]
                        }
                    },
                    computed: {
                        time: function() {
                            return this.$store.state.game.time
                        },
                        isDead: function() {
                            return this.$store.state.game.isDead
                        },
                        faction: function() {
                            return this.$store.state.game.faction
                        },
                        victory: function() {
                            return this.$store.state.game.victory
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        isTutorial: function() {
                            return this.$store.state.game.galaxy.tutorial_id
                        }
                    },
                    methods: {
                        switchChat: function() {
                            this.isChatOpen = !this.isChatOpen, this.$root.$emit("changeChatState", this.isChatOpen)
                        },
                        togglePanel: function(t) {
                            this.$root.$emit("togglePanel", t)
                        },
                        toggleMiniPanel: function(t) {
                            this.isMiniPanelOpen && this.activeMiniPanel.name === t ? this.closeMiniPanel() : this.openMiniPanel(t)
                        },
                        openMiniPanel: function(t) {
                            var e = this;
                            this.$root.$emit("closePanel"), this.$root.$emit("closeBottomMiniPanel"), this.animateCloseMiniPanelContainer().then((function() {
                                e.animateOpenMiniPanelContainer(t)
                            }))
                        },
                        closeMiniPanel: function() {
                            var t = this;
                            this.animateCloseMiniPanelContainer().then((function() {
                                t.isMiniPanelOpen = !1, t.activeMiniPanel = {
                                    name: ""
                                }
                            }))
                        },
                        animateOpenMiniPanelContainer: function(t) {
                            var e = this;
                            return new Promise((function(a) {
                                e.$ambiance.sound("mini-panel-open"), e.$refs.miniPanelsContainer.style.display = "flex", e.activeMiniPanel = e.miniPanels.find((function(e) {
                                    return e.name === t
                                })), e.isMiniPanelOpen = !0, new l.e({
                                    onComplete: function() {
                                        a()
                                    }
                                }).set(e.$refs.miniPanelsContainer, {
                                    top: "-".concat(e.activeMiniPanel.height, "px")
                                }).to(e.$refs.miniPanelsContainer, {
                                    top: "52px",
                                    ease: l.a.easeOut,
                                    duration: .8
                                }, 0)
                            }))
                        },
                        animateCloseMiniPanelContainer: function() {
                            var t = this;
                            return this.isMiniPanelOpen ? new Promise((function(e) {
                                t.$ambiance.sound("mini-panel-close");
                                var a = t;
                                if (t.isMiniPanelOpen) {
                                    var s = "-".concat(t.activeMiniPanel.height, "px");
                                    new l.e({
                                        onComplete: function() {
                                            a.$refs.miniPanelsContainer.style.display = "none", e()
                                        }
                                    }).to(t.$refs.miniPanelsContainer, {
                                        top: s,
                                        ease: l.a.linear,
                                        duration: .4
                                    }, 0)
                                } else e()
                            })) : Promise.resolve()
                        },
                        theme: function(t) {
                            return t ? "f-".concat(this.$store.getters["game/themeByKey"](t)) : "null"
                        }
                    },
                    mounted: function() {
                        var t = this;
                        this.$root.$on("openTopMiniPanel", (function(e) {
                            t.openMiniPanel(e)
                        })), this.$root.$on("closeTopMiniPanel", (function() {
                            t.closeMiniPanel()
                        }))
                    },
                    components: {
                        Calendar: Da,
                        CharacterMarketMiniPanel: Ha,
                        VictoryMiniPanel: Ga,
                        MarketMiniPanel: Object(Ft.a)(is, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "mp-container inverted",
                                class: "f-" + t.theme
                            }, [a("div", {
                                staticClass: "mp-header"
                            }, [a("div", {
                                staticClass: "mph-title"
                            }, [t._v("\n      " + t._s(t.$t("minipanel.market.title")) + "\n    ")]), t._v(" "), a("div", {
                                staticClass: "mph-nav"
                            }, t._l(t.tabs, (function(e) {
                                return a("div", {
                                    key: e,
                                    staticClass: "mph-nav-item",
                                    class: {
                                        active: t.activeTab === e
                                    },
                                    on: {
                                        click: function(a) {
                                            return t.switchTab(e)
                                        }
                                    }
                                }, [t._v("\n        " + t._s(t.$t("minipanel.market.tabs." + e)) + "\n      ")])
                            })), 0), t._v(" "), a("div", {
                                staticClass: "mph-close-button",
                                on: {
                                    click: t.close
                                }
                            })]), t._v(" "), a("v-scrollbar", {
                                staticClass: "mp-scrollbar",
                                attrs: {
                                    settings: {
                                        wheelPropagation: !1,
                                        suppressScrollY: !0,
                                        useBothWheelAxes: !0
                                    }
                                }
                            }, [a("div", {
                                staticClass: "mp-content",
                                style: {
                                    height: t.height + "px",
                                    padding: "25px"
                                }
                            }, ["buy" === t.activeTab ? [t.offers.length > 0 ? a("div", {
                                staticClass: "mpc-offers-list"
                            }, t._l(t.offers, (function(e) {
                                return a("market-offer", {
                                    key: e.id,
                                    attrs: {
                                        offer: e,
                                        button: "buy"
                                    },
                                    on: {
                                        buy: t.buy
                                    }
                                })
                            })), 1) : a("div", {
                                staticClass: "mpc-empty-state"
                            }, [a("h2", [t._v(t._s(t.$t("minipanel.market.empty_state_buy_title")))]), t._v(" "), a("p", [t._v(t._s(t.$t("minipanel.market.empty_state_buy_desc")))])])] : "sell" === t.activeTab ? a("market-sell", {
                                on: {
                                    created: t.created
                                }
                            }) : t._e(), t._v(" "), "own" === t.activeTab ? [t.ownOffers.length > 0 ? a("div", {
                                staticClass: "mpc-offers-list"
                            }, t._l(t.ownOffers, (function(e) {
                                return a("market-offer", {
                                    key: e.id,
                                    attrs: {
                                        offer: e,
                                        button: "cancel"
                                    },
                                    on: {
                                        cancel: t.cancel
                                    }
                                })
                            })), 1) : a("div", {
                                staticClass: "mpc-empty-state"
                            }, [a("h2", [t._v(t._s(t.$t("minipanel.market.empty_state_own_title")))]), t._v(" "), a("p", [t._v(t._s(t.$t("minipanel.market.empty_state_own_desc")))])])] : t._e()], 2)])], 1)
                        }), [], !1, null, null, null).exports
                    }
                },
                rs = Object(Ft.a)(ns, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "navbar-container"
                    }, [a("div", {
                        staticClass: "navbar top"
                    }, [a("div", {
                        staticClass: "navbar-left"
                    }, [t.isTutorial ? t._e() : a("div", {
                        staticClass: "navbar-main-button"
                    }, [a("div", {
                        staticClass: "navbar-main-button-toolbox"
                    }, [a("div", {
                        staticClass: "button",
                        class: {
                            active: t.isChatOpen
                        },
                        on: {
                            click: t.switchChat
                        }
                    }, [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "chat"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "navbar-main-button-icon",
                        on: {
                            click: function(e) {
                                return t.togglePanel("faction")
                            }
                        }
                    }, [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "faction/" + t.faction.key + "-small"
                        }
                    })], 1)]), t._v(" "), t.isTutorial ? t._e() : a("div", {
                        staticClass: "navbar-button-title",
                        on: {
                            click: function(e) {
                                return t.toggleMiniPanel("victory")
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$t("navbar.topbar.victory_panel")) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "navbar-center"
                    }, [a("calendar", {
                        nativeOn: {
                            click: function(e) {
                                return t.togglePanel("event")
                            }
                        }
                    }), t._v(" "), t.player.is_bankrupt ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip.bottom",
                            value: t.$t("navbar.topbar.bankrupt_tooltip"),
                            expression: "$t('navbar.topbar.bankrupt_tooltip')",
                            modifiers: {
                                bottom: !0
                            }
                        }],
                        staticClass: "headband"
                    }, [t._v("\n        " + t._s(t.$t("navbar.topbar.bankrupt")) + "\n      ")]) : t._e(), t._v(" "), t.$config.MODE && !t.time.is_running ? a("div", {
                        staticClass: "headband"
                    }, [t._v("\n        " + t._s(t.$t("navbar.topbar.supervisor_paused")) + "\n      ")]) : t._e(), t._v(" "), t.isDead ? a("div", {
                        staticClass: "headband"
                    }, [t._v("\n        " + t._s(t.$t("navbar.topbar.defeat")) + "\n      ")]) : t._e()], 1), t._v(" "), a("div", {
                        staticClass: "navbar-right"
                    }, [t.isTutorial ? t._e() : a("div", {
                        staticClass: "navbar-button-title",
                        on: {
                            click: function(e) {
                                return t.toggleMiniPanel("market")
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$t("navbar.topbar.market_panel")) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "navbar-button-title",
                        on: {
                            click: function(e) {
                                return t.toggleMiniPanel("character-market")
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$t("navbar.topbar.character_market_panel")) + "\n      ")]), t._v(" "), t.isTutorial ? t._e() : a("div", {
                        staticClass: "navbar-main-button"
                    }, [a("div", {
                        staticClass: "navbar-main-button-icon",
                        on: {
                            click: function(e) {
                                return t.togglePanel("ranking")
                            }
                        }
                    }, [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "ranking"
                        }
                    })], 1)])])]), t._v(" "), t.victory.winner ? a("div", {
                        staticClass: "victory-banner",
                        class: [{
                            open: t.victory.winner
                        }, t.theme(t.victory.winner)]
                    }, [a("div", {
                        staticClass: "victory-banner-background"
                    }), t._v(" "), a("div", {
                        staticClass: "victory-banner-content"
                    }, [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "faction/" + t.victory.winner
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "name"
                    }, [t._v("\n        " + t._s(t.$t("navbar.topbar.victory_of")) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "name"
                    }, [t._v("\n        " + t._s(t.$t("data.faction." + t.victory.winner + ".name")) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "action"
                    }, [t.victory.winner === t.faction.key ? [t._v("\n          " + t._s(t.$t("navbar.topbar.you_won")) + "\n        ")] : [t._v("\n          " + t._s(t.$t("navbar.topbar.you_lost")) + "\n        ")]], 2)], 1)]) : t._e(), t._v(" "), a("div", {
                        ref: "miniPanelsContainer",
                        staticClass: "mini-panels-container",
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.closeMiniPanel(e)
                            }
                        }
                    }, [t.isTutorial || "victory" !== t.activeMiniPanel.name ? t._e() : a("victory-mini-panel", {
                        attrs: {
                            height: t.activeMiniPanel.height
                        },
                        on: {
                            close: t.closeMiniPanel
                        }
                    }), t._v(" "), t.isTutorial || "market" !== t.activeMiniPanel.name ? t._e() : a("market-mini-panel", {
                        attrs: {
                            height: t.activeMiniPanel.height
                        },
                        on: {
                            close: t.closeMiniPanel
                        }
                    }), t._v(" "), "character-market" === t.activeMiniPanel.name ? a("character-market-mini-panel", {
                        attrs: {
                            height: t.activeMiniPanel.height
                        },
                        on: {
                            close: t.closeMiniPanel
                        }
                    }) : t._e()], 1)])
                }), [], !1, null, null, null).exports,
                os = a(630),
                cs = a(642),
                ls = {
                    name: "system-svg",
                    data: function() {
                        return {
                            orbitBoundary: {
                                min: 4,
                                max: 40
                            },
                            orbitSize: {
                                min: 10,
                                max: 50
                            },
                            starSize: [20, 30],
                            starSpecs: [{
                                colors: ["#d4f4ff"],
                                orbitSize: {
                                    min: 4,
                                    max: 50
                                },
                                type: "white_dwarf"
                            }, {
                                colors: ["#fa8064"],
                                orbitSize: {
                                    min: 6,
                                    max: 50
                                },
                                type: "red_dwarf"
                            }, {
                                colors: ["#ffd1a3"],
                                orbitSize: {
                                    min: 8,
                                    max: 50
                                },
                                type: "orange_dwarf"
                            }, {
                                colors: ["#ffe880"],
                                orbitSize: {
                                    min: 12,
                                    max: 50
                                },
                                type: "yellow_dwarf"
                            }, {
                                colors: ["#f2183c"],
                                orbitSize: {
                                    min: 16,
                                    max: 50
                                },
                                type: "red_giant"
                            }, {
                                colors: ["#1fa8ed"],
                                orbitSize: {
                                    min: 18,
                                    max: 50
                                },
                                type: "blue_giant"
                            }],
                            bodySpecs: [{
                                type: "habitable_planet",
                                size: [5, 10],
                                colors: ["#13b7bf", "#26a9c7", "#40b8f5", "#39a3db"]
                            }, {
                                type: "sterile_planet",
                                size: [5, 10],
                                colors: ["#feffd2", "#e9fefe", "#ede4c7"]
                            }, {
                                type: "gaseous_giant",
                                size: [10, 16],
                                colors: ["#fffe99", "#feffd2", "#fcf09a", "#f2ba85"]
                            }, {
                                type: "asteroid_belt",
                                size: [10, 16],
                                colors: ["#e3e3e3", "#f5f5f5", "#cceef0"]
                            }, {
                                type: "moon",
                                size: [2, 3],
                                colors: ["#9c9c9c", "#6a6a6a"]
                            }, {
                                type: "asteroid",
                                size: [5, 10],
                                colors: ["#9c9c9c", "#6a6a6a"]
                            }]
                        }
                    },
                    props: {
                        system: Object,
                        hoveredOrbit: Number
                    },
                    computed: {
                        systemData: function() {
                            var t = this;
                            return this.$store.state.game.data.stellar_system.filter((function(e) {
                                return e.key === t.system.type
                            }))[0]
                        },
                        stellarBodies: function() {
                            for (var t = this, e = new cs.a(this.system.id), a = 100 / this.system.bodies.length, s = this.starSpecs.find((function(e) {
                                return e.type === t.systemData.key
                            })), i = {
                                min: s.orbitSize.min,
                                max: a > s.orbitSize.max ? s.orbitSize.max : a
                            }, n = 0, r = [], o = function(a) {
                                var s = t.system.bodies[a],
                                    o = [],
                                    c = n + t.floatToInterval(e.next(), i.min, i.max);
                                n = c;
                                for (var l = t.bodySpecs.filter((function(t) {
                                    return t.type === s.type
                                })).map((function(a) {
                                    return t.takeRandomFromFloat(a.size, e.next())
                                })).shift(), u = t.bodySpecs.filter((function(t) {
                                    return t.type === s.type
                                })).map((function(a) {
                                    return t.takeRandomFromFloat(a.colors, e.next())
                                })).shift(), d = l / 3, v = function(a) {
                                    var i = s.bodies[a],
                                        n = d + 2;
                                    d = n, o.push({
                                        id: i.id,
                                        key: "b2-".concat(a + 1),
                                        position: n,
                                        type: i.type,
                                        rotation: t.floatToInterval(e.next(), 0, 360),
                                        rotationSpeed: t.floatToInterval(e.next(), 10, 40),
                                        size: t.bodySpecs.filter((function(t) {
                                            return t.type === i.type
                                        })).map((function(a) {
                                            return t.takeRandomFromFloat(a.size, e.next())
                                        })).shift(),
                                        color: t.bodySpecs.filter((function(t) {
                                            return t.type === i.type
                                        })).map((function(a) {
                                            return t.takeRandomFromFloat(a.colors, e.next())
                                        })).shift()
                                    })
                                }, p = 0; p < s.bodies.length; p += 1) v(p);
                                r.push({
                                    id: s.id,
                                    key: "b1-".concat(a + 1),
                                    position: c,
                                    type: s.type,
                                    rotation: t.floatToInterval(e.next(), 0, 360),
                                    rotationSpeed: t.floatToInterval(e.next(), 100, 500),
                                    size: l,
                                    color: u,
                                    subbodies: o
                                })
                            }, c = 0; c < this.system.bodies.length; c += 1) o(c);
                            return {
                                star: {
                                    color: s.colors[this.floatToInterval(e.next(), 0, s.colors.length - 1)],
                                    size: this.floatToInterval(e.next(), this.starSize[0], this.starSize[1]) * this.systemData.display_size_factor
                                },
                                bodies: r
                            }
                        }
                    },
                    methods: {
                        clickOrbit: function(t) {
                            this.system.contact.value >= 3 && this.$emit("clickOrbit", t)
                        },
                        closeProduction: function() {
                            this.$store.commit("game/clearProduction")
                        },
                        isOrbitHovered: function(t) {
                            return t === this.hoveredOrbit
                        },
                        floatToInterval: function(t, e, a) {
                            return Math.round(t * (a - e) + e)
                        },
                        takeRandomFromFloat: function(t, e) {
                            return t[this.floatToInterval(e, 0, t.length - 1)]
                        },
                        toPercentage: function(t) {
                            return (t * (this.orbitBoundary.max - this.orbitBoundary.min) + this.orbitBoundary.min) / 100
                        },
                        changeRotationSpace: function(t) {
                            return .75 * t - 45
                        },
                        darken: function(t) {
                            return I()(t).brighten(-25).toString()
                        },
                        lighten: function(t) {
                            return I()(t).brighten(25).toString()
                        }
                    },
                    mounted: function() {
                        var t = this,
                            e = new cs.a(this.system.id),
                            a = .5,
                            s = this.$refs,
                            i = s.circleMask,
                            n = s.svgBackground;
                        os.a.to(i, .5, {
                            attr: {
                                r: "50%"
                            },
                            ease: l.d.easeOut
                        }), os.a.to(n, .5, {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            opacity: 1,
                            ease: l.d.easeOut
                        }), this.stellarBodies.bodies && this.stellarBodies.bodies.forEach((function(s) {
                            a = t.floatToInterval(e.next(), 1, 5) / 10 + .3, os.a.to(t.$refs[s.key], a, {
                                rotation: "-360",
                                transformOrigin: "50% 50%",
                                ease: l.d.easeOut
                            })
                        }))
                    }
                },
                us = Object(Ft.a)(ls, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "system-svg",
                        on: {
                            click: t.closeProduction
                        }
                    }, [a("div", {
                        ref: "svgBackground",
                        staticClass: "svg-background"
                    }), t._v(" "), a("svg", {
                        attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "100%",
                            height: "100%"
                        }
                    }, [a("defs", [a("filter", {
                        attrs: {
                            id: "blur8"
                        }
                    }, [a("feGaussianBlur", {
                        attrs: {
                            in: "SourceGraphic",
                            stdDeviation: "8"
                        }
                    })], 1), t._v(" "), a("filter", {
                        attrs: {
                            id: "blur6"
                        }
                    }, [a("feGaussianBlur", {
                        attrs: {
                            in: "SourceGraphic",
                            stdDeviation: "6"
                        }
                    })], 1), t._v(" "), a("filter", {
                        attrs: {
                            id: "blur2"
                        }
                    }, [a("feGaussianBlur", {
                        attrs: {
                            in: "SourceGraphic",
                            stdDeviation: "2"
                        }
                    })], 1)]), t._v(" "), a("mask", {
                        attrs: {
                            id: "global-mask"
                        }
                    }, [a("circle", {
                        ref: "circleMask",
                        attrs: {
                            cx: "50%",
                            cy: "50%",
                            r: "0%",
                            fill: "white"
                        }
                    })]), t._v(" "), a("g", {
                        attrs: {
                            mask: "url(#global-mask)"
                        }
                    }, [t._l(9, (function(t) {
                        return a("circle", {
                            key: "cc-" + t,
                            staticClass: "aesthetic-circle",
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: 5 * t + "%"
                            }
                        })
                    })), t._v(" "), t._l(7, (function(e) {
                        return a("text", {
                            key: "ct-" + e,
                            staticClass: "aesthetic-circle-label",
                            attrs: {
                                x: 50.6 + 5 * e + "%",
                                y: "49.6%"
                            }
                        }, [t._v("\n        " + t._s(e * e * .5) + "ua\n      ")])
                    })), t._v(" "), a("circle", {
                        staticClass: "star-halo",
                        style: "fill: " + t.stellarBodies.star.color,
                        attrs: {
                            cx: "50%",
                            cy: "50%",
                            filter: "url(#blur6)",
                            r: t.stellarBodies.star.size + 10
                        }
                    }), t._v(" "), a("circle", {
                        staticClass: "star-white-halo",
                        attrs: {
                            cx: "50%",
                            cy: "50%",
                            filter: "url(#blur2)",
                            r: t.stellarBodies.star.size
                        }
                    }), t._v(" "), a("circle", {
                        staticClass: "star-main",
                        style: "fill: " + t.stellarBodies.star.color,
                        attrs: {
                            cx: "50%",
                            cy: "50%",
                            r: t.stellarBodies.star.size
                        }
                    }), t._v(" "), a("circle", {
                        staticClass: "star-main-darker",
                        style: "fill: " + t.lighten(t.stellarBodies.star.color),
                        attrs: {
                            cx: "50%",
                            cy: "50%",
                            filter: "url(#blur8)",
                            r: t.stellarBodies.star.size - 10
                        }
                    }), t._v(" "), t.system.contact.value > 0 ? [t._l(t.stellarBodies.bodies, (function(e) {
                        return a("circle", {
                            key: "h-" + e.key,
                            staticClass: "hover-circle",
                            class: {
                                hovered: t.isOrbitHovered(e.id)
                            },
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: t.toPercentage(e.position) + "%"
                            }
                        })
                    })), t._v(" "), t._l(t.stellarBodies.bodies, (function(e) {
                        return a("g", {
                            key: e.key,
                            ref: e.key,
                            refInFor: !0
                        }, [a("circle", {
                            staticClass: "invisible",
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: "50%"
                            }
                        }), t._v(" "), a("g", {
                            style: "\n              transform: rotate(" + t.changeRotationSpace(e.rotation) + "deg);\n              transform-origin: 50% 50%;\n            "
                        }, ["asteroid_belt" === e.type ? a("g", [a("circle", {
                            staticClass: "asteroid-belt",
                            style: "stroke-width: " + e.size + "; stroke: " + e.color,
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: t.toPercentage(e.position) + "%"
                            }
                        }), t._v(" "), t._l(e.subbodies, (function(s) {
                            return a("rect", {
                                key: s.key,
                                staticClass: "asteroid",
                                style: "\n                  fill: " + s.color + ";\n                  transform: rotate(" + t.changeRotationSpace(s.rotation) + "deg);\n                  transform-origin: 50% 50%;\n                ",
                                attrs: {
                                    y: "50%",
                                    x: 50 + t.toPercentage(e.position - 1) + "%",
                                    width: s.size,
                                    height: s.size
                                }
                            })
                        }))], 2) : a("g", [a("circle", {
                            staticClass: "primary-orbit short",
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: t.toPercentage(e.position) + "%"
                            }
                        }), t._v(" "), a("circle", {
                            staticClass: "primary-orbit medium",
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: t.toPercentage(e.position) + "%"
                            }
                        }), t._v(" "), a("circle", {
                            staticClass: "primary-orbit long",
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: t.toPercentage(e.position) + "%"
                            }
                        }), t._v(" "), a("circle", {
                            staticClass: "primary-body-halo",
                            attrs: {
                                cy: "50%",
                                filter: "url(#blur)",
                                cx: 50 + t.toPercentage(e.position) + "%",
                                r: e.size
                            }
                        }), t._v(" "), a("circle", {
                            staticClass: "primary-body",
                            style: "fill: " + e.color,
                            attrs: {
                                cy: "50%",
                                cx: 50 + t.toPercentage(e.position) + "%",
                                r: e.size
                            }
                        }), t._v(" "), a("circle", {
                            staticClass: "primary-body-darker",
                            style: "fill: " + t.darken(e.color),
                            attrs: {
                                filter: "url(#blur2)",
                                cy: "50%",
                                cx: 50 + t.toPercentage(e.position) + "%",
                                r: e.size - 3
                            }
                        }), t._v(" "), a("defs", [a("mask", {
                            attrs: {
                                maskUnits: "userSpaceOnUse",
                                maskContentUnits: "userSpaceOnUse",
                                id: e.key
                            }
                        }, [a("circle", {
                            attrs: {
                                cy: "50%",
                                cx: 50 + t.toPercentage(e.position) + "%",
                                r: e.size,
                                fill: "white"
                            }
                        })])]), t._v(" "), a("rect", {
                            staticClass: "primary-body-mask",
                            attrs: {
                                y: "47%",
                                width: "60px",
                                height: "60px",
                                x: 50 + t.toPercentage(e.position) + "%",
                                mask: "url(#" + e.key + ")"
                            }
                        }), t._v(" "), t._l(e.subbodies, (function(s) {
                            return a("g", {
                                key: s.key,
                                ref: s.key,
                                refInFor: !0
                            }, [a("g", {
                                style: "\n                    transform: rotate(" + t.changeRotationSpace(s.rotation) + "deg);\n                    transform-origin: " + (50 + t.toPercentage(e.position)) + "% 50%;\n                  "
                            }, [a("circle", {
                                staticClass: "secondary-body",
                                style: "fill: " + s.color,
                                attrs: {
                                    cy: "50%",
                                    cx: 50 + t.toPercentage(e.position + s.position) + "%",
                                    r: s.size
                                }
                            }), t._v(" "), a("circle", {
                                staticClass: "secondary-orbit",
                                attrs: {
                                    cx: 50 + t.toPercentage(e.position) + "%",
                                    cy: "50%",
                                    r: 4.1 * s.position + "px"
                                }
                            })])])
                        }))], 2)])])
                    })), t._v(" "), t._l(t.system.bodies, (function(e, s) {
                        return a("circle", {
                            key: "e-" + e.id,
                            staticClass: "event-circle",
                            attrs: {
                                cx: "50%",
                                cy: "50%",
                                r: t.toPercentage(t.stellarBodies.bodies[s].position) + "%"
                            },
                            on: {
                                click: function(a) {
                                    return t.clickOrbit([e])
                                },
                                mouseover: function(a) {
                                    return t.$emit("enterOrbit", e.id)
                                },
                                mouseleave: function(e) {
                                    return t.$emit("leaveOrbit")
                                }
                            }
                        })
                    }))] : [a("defs", [a("path", {
                        attrs: {
                            d: "M-200,0a200,200 0 1,0 400,0a200,200 0 1,0 -400,0",
                            id: "no-data-orbit"
                        }
                    })]), t._v(" "), a("circle", {
                        staticClass: "no-data-circle",
                        attrs: {
                            cx: "50%",
                            cy: "50%",
                            r: "195"
                        }
                    }), t._v(" "), a("g", {
                        ref: "noData",
                        style: "\n            transform: translate(50%, 50%);\n          "
                    }, [a("circle", {
                        staticClass: "invisible",
                        attrs: {
                            cx: "0",
                            cy: "0",
                            r: "50%"
                        }
                    }), t._v(" "), a("text", {
                        staticClass: "no-data-text"
                    }, [a("textPath", {
                        attrs: {
                            "xlink:href": "#no-data-orbit"
                        }
                    }, [t._v("\n              " + t._s(t.$t("galaxy.system.svg.no_data")) + "\n            ")])])])]], 2)])])
                }), [], !1, null, null, null).exports,
                ds = {
                    colonization: function(t, e, a) {
                        var s = e.vm,
                            i = e.system,
                            n = e.sectors,
                            r = e.selectedCharacter,
                            o = [],
                            c = "available";
                        return i.siege && o.push("fail_hint_siege"), a || o.push("fail_hint_system_limit"), this.hasCharacterColonizationShip(r) || o.push("fail_hint_no_transport"), this.isSystemTakeable(r, i, n) || o.push("fail_hint_untakeable"), this.hasSameActionOnSamePlace(r, i, "colonization") && o.push("fail_already_one_colonization"), o.length > 0 && (c = "unavailable", o = this.formatReasons("fail_hint_colonization", o, s)), t.push({
                            status: c,
                            icon: "colonization",
                            name: "colonize",
                            reasons: o
                        }), t
                    },
                    conquest: function(t, e, a) {
                        var s = e.vm,
                            i = e.system,
                            n = e.sectors,
                            r = e.selectedCharacter,
                            o = e.themes,
                            c = i.defense ? i.defense.value : null,
                            l = [],
                            u = "available",
                            d = {
                                attacker: r.army.invasion_coef.value,
                                attackerIcon: "ship/invasion",
                                attackerModifier: r.level,
                                attackerTheme: o.character,
                                defender: c,
                                defenderIcon: "resource/defense",
                                defenderTheme: o.system
                            };
                        return 0 === r.army.invasion_coef.value && l.push("fail_hint_invasion_coef"), this.hasCharacterShip(r) || l.push("fail_hint_no_ship"), this.isSystemTakeable(r, i, n) || l.push("fail_hint_untakeable"), i.siege && l.push("fail_hint_siege"), a || l.push("fail_hint_system_limit"), l.length > 0 && (u = "unavailable", l = this.formatReasons("fail_hint_conquest", l, s)), t.push({
                            status: u,
                            icon: "conquest",
                            name: "conquer",
                            reasons: l,
                            overview: d
                        }), t
                    },
                    raid: function(t, e, a) {
                        var s = e.vm,
                            i = e.system,
                            n = e.selectedCharacter,
                            r = [],
                            o = "available";
                        return 0 === n.army.raid_coef.value && r.push("fail_hint_raid_coef"), this.hasCharacterShip(n) || r.push("fail_hint_no_ship"), i.siege && r.push("fail_hint_siege"), r.length > 0 && (o = "unavailable", r = this.formatReasons("fail_hint_raid", r, s)), t.push({
                            status: o,
                            icon: "raid",
                            name: "raid",
                            reasons: r,
                            overview: a
                        }), t
                    },
                    loot: function(t, e, a) {
                        var s = e.vm,
                            i = e.system,
                            n = e.selectedCharacter,
                            r = [],
                            o = "available";
                        return 0 === n.army.raid_coef.value && r.push("fail_hint_raid_coef"), this.hasCharacterShip(n) || r.push("fail_hint_no_ship"), i.siege && r.push("fail_hint_siege"), r.length > 0 && (o = "unavailable", r = this.formatReasons("fail_hint_loot", r, s)), t.push({
                            status: o,
                            icon: "loot",
                            name: "loot",
                            reasons: r,
                            overview: a
                        }), t
                    },
                    infiltrate: function(t, e) {
                        var a = e.system,
                            s = e.selectedCharacter,
                            i = e.themes,
                            n = a.counter_intelligence ? a.counter_intelligence.value : null,
                            r = {
                                attacker: s.spy.infiltrate_coef.value,
                                attackerIcon: "action/infiltrate_alt",
                                attackerModifier: s.level,
                                attackerTheme: i.character,
                                defender: n,
                                defenderIcon: "resource/counter_intelligence",
                                defenderTheme: i.system
                            };
                        return t.push({
                            status: "available",
                            icon: "infiltrate",
                            name: "infiltrate",
                            reasons: "",
                            overview: r
                        }), t
                    },
                    encourageHate: function(t, e) {
                        var a = e.vm,
                            s = e.system,
                            i = e.selectedCharacter,
                            n = e.themes,
                            r = [],
                            o = "available",
                            c = s.happiness ? Math.max(s.happiness.value, 0) : null;
                        0 !== i.speaker.cooldown.value && r.push("fail_hint_speaker_cooldown"), 0 === i.speaker.encourage_hate_coef.value && r.push("fail_hint_encourage_hate_coef"), this.hasSameAction(i, "encourage_hate") && r.push("fail_hint_max_one_action"), r.length > 0 && (o = "unavailable", r = this.formatReasons("fail_hint_encourage_hate", r, a));
                        var l = {
                            attacker: i.speaker.encourage_hate_coef.value,
                            attackerIcon: "action/encourage_hate_alt",
                            attackerModifier: i.level,
                            attackerTheme: n.character,
                            defender: c,
                            defenderIcon: "resource/happiness",
                            defenderTheme: n.system
                        };
                        return t.push({
                            status: o,
                            icon: "encourage_hate",
                            name: "encourage_hate",
                            reasons: r,
                            overview: l
                        }), t
                    },
                    makeDominion: function(t, e, a) {
                        var s = e.vm,
                            i = e.system,
                            n = e.sectors,
                            r = e.selectedCharacter,
                            o = e.themes,
                            c = [],
                            l = "available",
                            u = i.happiness ? Math.max(i.happiness.value, 0) : null;
                        0 !== r.speaker.cooldown.value && c.push("fail_hint_speaker_cooldown"), a || c.push("fail_hint_dominion_limit"), this.isSystemTakeable(r, i, n) || c.push("fail_hint_untakeable"), 0 === r.speaker.make_dominion_coef.value && c.push("fail_hint_make_dominion_coef"), this.hasSameAction(r, "make_dominion") && c.push("fail_hint_max_one_action"), c.length > 0 && (l = "unavailable", c = this.formatReasons("fail_hint_make_dominion", c, s));
                        var d = {
                            attacker: r.speaker.make_dominion_coef.value,
                            attackerIcon: "action/make_dominion_alt",
                            attackerModifier: r.level,
                            attackerTheme: o.character,
                            defender: u,
                            defenderIcon: "resource/happiness",
                            defenderTheme: o.system
                        };
                        return t.push({
                            status: l,
                            icon: "make_dominion",
                            name: "make_dominion",
                            reasons: c,
                            overview: d
                        }), t
                    },
                    fight: function(t, e) {
                        var a = e.vm.$t("galaxy.system.actions.fight");
                        return t.actions.push({
                            status: "available",
                            icon: "fight",
                            name: "fight",
                            tooltip: a,
                            reasons: []
                        }), t
                    },
                    sabotage: function(t, e, a, s) {
                        var i = e.vm,
                            n = e.selectedCharacter,
                            r = e.system,
                            o = e.characterTheme,
                            c = null;
                        if (a.protection && r.counter_intelligence) {
                            var l, u, d = a.protection || 0,
                                v = (null === (l = r.counter_intelligence) || void 0 === l ? void 0 : l.value) || 0;
                            c = (null === (u = r.owner) || void 0 === u ? void 0 : u.faction_id) === a.owner.faction_id ? d + v : d
                        }
                        var p = i.$t("galaxy.system.actions.sabotage"),
                            m = [],
                            h = "available",
                            f = {
                                attacker: n.spy.sabotage_coef.value,
                                attackerIcon: "action/sabotage_alt",
                                attackerModifier: n.level,
                                attackerTheme: o,
                                defender: c,
                                defenderIcon: "agent/protection",
                                defenderTheme: s
                            };
                        return 0 === n.spy.sabotage_coef.value && m.push("fail_hint_sabotage_coeff"), this.hasSameAction(n, "sabotage") && m.push("fail_hint_max_one_action"), m.length > 0 && (h = "unavailable", m = this.formatReasons("fail_hint_sabotage", m, i)), t.actions.push({
                            status: h,
                            icon: "sabotage",
                            name: "sabotage",
                            tooltip: p,
                            reasons: m,
                            overview: f
                        }), t
                    },
                    assassination: function(t, e, a, s) {
                        var i = e.vm,
                            n = e.selectedCharacter,
                            r = e.system,
                            o = e.characterTheme,
                            c = null;
                        if (a.protection && r.counter_intelligence) {
                            var l, u, d = a.protection || 0,
                                v = (null === (l = r.counter_intelligence) || void 0 === l ? void 0 : l.value) || 0;
                            c = (null === (u = r.owner) || void 0 === u ? void 0 : u.faction_id) === a.owner.faction_id ? d + v : d
                        }
                        var p = i.$t("galaxy.system.actions.assassination"),
                            m = [],
                            h = "available",
                            f = {
                                attacker: n.spy.assassination_coef.value,
                                attackerIcon: "action/assassination_alt",
                                attackerModifier: n.level,
                                attackerTheme: o,
                                defender: c,
                                defenderIcon: "agent/protection",
                                defenderTheme: s
                            };
                        return 0 === n.spy.assassination_coef.value && m.push("fail_hint_assassination_coeff"), this.hasSameAction(n, "assassination") && m.push("fail_hint_max_one_action"), m.length > 0 && (h = "unavailable", m = this.formatReasons("fail_hint_assassination", m, i)), t.actions.push({
                            status: h,
                            icon: "assassination",
                            name: "assassination",
                            tooltip: p,
                            reasons: m,
                            overview: f
                        }), t
                    },
                    conversion: function(t, e, a, s, i) {
                        var n = e.vm,
                            r = e.selectedCharacter,
                            o = e.system,
                            c = e.characterTheme,
                            l = null;
                        if (a.determination && o.happiness) {
                            var u, d, v = a.determination || 0,
                                p = (null === (u = o.happiness) || void 0 === u ? void 0 : u.value) || 0;
                            l = (null === (d = o.owner) || void 0 === d ? void 0 : d.faction_id) === a.owner.faction_id ? v + p : v
                        }
                        var m = n.$t("galaxy.system.actions.conversion"),
                            h = [],
                            f = "available",
                            _ = {
                                attacker: r.speaker.conversion_coef.value,
                                attackerIcon: "action/conversion_alt",
                                attackerModifier: r.level,
                                attackerTheme: c,
                                defender: l,
                                defenderIcon: "agent/determination",
                                defenderTheme: i
                            };
                        return 0 === r.speaker.conversion_coef.value && h.push("fail_hint_conversion_coeff"), 0 !== r.speaker.cooldown.value && h.push("fail_hint_speaker_cooldown"), this.hasSameAction(r, "conversion") && h.push("fail_hint_max_one_action"), "admiral" === a.type && s.characters.filter((function(t) {
                            return "admiral" === t.type
                        })).length >= s.max_admirals.value && h.push("fail_hint_conversion_admiral"), "spy" === a.type && s.characters.filter((function(t) {
                            return "spy" === t.type
                        })).length >= s.max_spies.value && h.push("fail_hint_conversion_spy"), "speaker" === a.type && s.characters.filter((function(t) {
                            return "speaker" === t.type
                        })).length >= s.max_speakers.value && h.push("fail_hint_conversion_speaker"), h.length > 0 && (f = "unavailable", h = this.formatReasons("fail_hint_conversion", h, n)), t.actions.push({
                            status: f,
                            icon: "conversion",
                            name: "conversion",
                            tooltip: m,
                            reasons: h,
                            overview: _
                        }), t
                    },
                    hasCharacterColonizationShip: function(t) {
                        return !(!t.army || !Array.isArray(t.army.tiles)) && t.army.tiles.find((function(t) {
                            return t.ship && "transport_1" === t.ship.key
                        }))
                    },
                    hasCharacterShip: function(t) {
                        return !(!t.army || !Array.isArray(t.army.tiles)) && t.army.tiles.find((function(t) {
                            return "filled" === t.ship_status
                        }))
                    },
                    hasSameAction: function(t, e) {
                        return t.actions.queue.find((function(t) {
                            return t.type === e
                        }))
                    },
                    hasSameActionOnSamePlace: function(t, e, a) {
                        return t.actions.queue.find((function(t) {
                            return t.type === a && t.data.target === e.id
                        }))
                    },
                    isSystemTakeable: function(t, e, a) {
                        var s = a.find((function(t) {
                                return t.id === e.sector_id
                            })),
                            i = a.filter((function(e) {
                                return e.adjacent.includes(s.id) && e.owner === t.owner.faction
                            }));
                        return s.owner === t.owner.faction || i.length > 0
                    },
                    formatReasons: function(t, e, a) {
                        return a.$t("galaxy.system.actions.".concat(t)) + "<br>" + e.map((function(t) {
                            return "— " + a.$t("galaxy.system.actions.".concat(t))
                        })).join("<br>")
                    }
                },
                vs = {
                    name: "circle-progress-value",
                    mixins: [Oe],
                    data: function() {
                        return {
                            value: void 0
                        }
                    },
                    props: {
                        current: Number,
                        total: Number,
                        increase: Number,
                        width: Number,
                        size: Number,
                        theme: String
                    },
                    computed: {
                        radius: function() {
                            return this.size / 2
                        },
                        ratio: function() {
                            return this.value / this.total
                        },
                        dasharray: function() {
                            return "".concat(Math.PI * this.size * this.ratio, ", 1000")
                        }
                    },
                    watch: {
                        current: function(t) {
                            this.value = t
                        }
                    },
                    methods: {
                        updateValue: function(t) {
                            var e = this.value + t * this.increase;
                            this.increase > 0 && e > this.total && (e = 0, this.$emit("finished")), this.increase < 0 && e < 0 && (e = 0, this.$emit("finished")), this.value = e
                        }
                    },
                    mounted: function() {
                        this.value = this.current
                    }
                },
                ps = Object(Ft.a)(vs, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "generic-circle-progress-container",
                        class: "f-" + t.theme
                    }, [a("svg", {
                        attrs: {
                            width: t.size + 2 * t.width,
                            height: t.size + 2 * t.width
                        }
                    }, [a("circle", {
                        staticClass: "background",
                        attrs: {
                            r: t.radius,
                            cx: t.radius + t.width,
                            cy: t.radius + t.width,
                            "stroke-width": t.width
                        }
                    }), t._v(" "), a("circle", {
                        staticClass: "foreground",
                        attrs: {
                            r: t.radius,
                            cx: t.radius + t.width,
                            cy: t.radius + t.width,
                            "stroke-width": t.width + 1,
                            "stroke-dasharray": t.dasharray
                        }
                    })])])
                }), [], !1, null, null, null).exports,
                ms = {
                    name: "system-properties",
                    props: {
                        system: Object,
                        isOwnSystem: Boolean,
                        isOwnProperty: Boolean,
                        color: String
                    },
                    data: function() {
                        return {
                            hoveredAction: null
                        }
                    },
                    computed: {
                        selectedCharacter: function() {
                            return this.$store.state.game.selectedCharacter
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        populationClass: function() {
                            var t = this;
                            return this.$store.state.game.data.population_class.find((function(e) {
                                return e.key === t.system.population_class
                            }))
                        },
                        populationClasses: function() {
                            var t = this;
                            return this.$store.state.game.data.population_class.map((function(e) {
                                var a = e.key === t.populationClass.key,
                                    s = t.$t("data.population_class.".concat(e.key));
                                return {
                                    reason: t.$t("galaxy.system.pop_class.label", {
                                        label: s,
                                        pop: e.threshold
                                    }),
                                    value: e.points,
                                    active: a
                                }
                            })).reverse()
                        },
                        governorAction: function() {
                            var t = this.system.governor,
                                e = {
                                    character: t,
                                    actions: []
                                };
                            if (t && this.selectedCharacter) {
                                var a = {
                                    vm: this,
                                    selectedCharacter: this.selectedCharacter,
                                    system: this.system,
                                    theme: this.getTheme(this.selectedCharacter.owner.faction)
                                };
                                if ("spy" === this.selectedCharacter.type) {
                                    var s = this.getTheme(t.owner.faction);
                                    ds.assassination(e, a, t, s)
                                }
                            }
                            return e
                        }
                    },
                    methods: {
                        getTheme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        },
                        prepareGovernorAssignment: function() {
                            var t = this.system.id;
                            this.$root.$emit("openBottomMiniPanel", "character-deck"), this.$store.commit("game/prepareAssignment", {
                                systemId: t,
                                mode: "governor"
                            })
                        },
                        doCharacterAction: function(t, e) {
                            this.hoveredAction = null, this.$root.$emit("map:addAction", t, {
                                character: e,
                                system: this.system
                            })
                        },
                        openCharacter: function() {
                            this.$store.dispatch("game/openCharacter", {
                                vm: this,
                                id: this.system.governor.id
                            })
                        },
                        openPlayer: function() {
                            this.$store.dispatch("game/openPlayer", {
                                vm: this,
                                id: this.system.owner.id
                            })
                        },
                        groupContactDetails: function(t) {
                            return t.informer ? {
                                informer: t.informer.reduce((function(t, e) {
                                    var a = t.find((function(t) {
                                        return t.reason === e.reason
                                    }));
                                    return a ? a.value += 1 : t.push({
                                        reason: e.reason,
                                        value: e.value
                                    }), t
                                }), []),
                                explorer: t.explorer
                            } : t
                        }
                    },
                    mounted: function() {
                        (new l.e).set(this.$refs.container, {
                            top: -100
                        }).to(this.$refs.container, {
                            top: 50,
                            ease: l.a.easeOut,
                            duration: 1
                        }, 0)
                    },
                    components: {
                        ActionOverview: Ee,
                        ResourceDetail: We,
                        CircleProgressValue: ps,
                        Counter: Ua
                    }
                },
                hs = Object(Ft.a)(ms, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        ref: "container",
                        staticClass: "system-properties"
                    }, [a("div", {
                        staticClass: "header"
                    }, [t._v("\n    " + t._s(t.system.name) + "\n  ")]), t._v(" "), a("div", {
                        staticClass: "box-line info"
                    }, [
                        ["uninhabitable", "uninhabited"].includes(t.system.status) ? t._e() : a("div", {
                            staticClass: "box-aside left"
                        }, [t.system.defense ? a("v-popover", {
                            attrs: {
                                trigger: "hover"
                            }
                        }, [a("div", [a("svgicon", {
                            attrs: {
                                name: "resource/defense"
                            }
                        }), t._v("\n          " + t._s(t._f("integer")(t.system.defense.value)) + "\n        ")], 1), t._v(" "), a("resource-detail", {
                            attrs: {
                                slot: "popover",
                                title: t.$t("data.bonus_pipeline_in.sys_defense.name"),
                                value: t.system.defense.value,
                                details: t.system.defense.details
                            },
                            slot: "popover"
                        })], 1) : a("div", [a("svgicon", {
                            attrs: {
                                name: "resource/defense"
                            }
                        }), t._v("\n        ?\n      ")], 1)], 1), t._v(" "), a("div", {
                            staticClass: "owner"
                        }, [
                            ["uninhabitable", "uninhabited"].includes(t.system.status) ? t._e() : a("div", {
                                staticClass: "marker",
                                class: {
                                    "is-half": ["inhabited_neutral", "inhabited_dominion"].includes(t.system.status)
                                }
                            }), t._v(" "), ["uninhabitable", "uninhabited"].includes(t.system.status) ? t._e() : a("div", {
                                staticClass: "marker-label"
                            }, [t.system.population_class ? a("v-popover", {
                                attrs: {
                                    trigger: "hover"
                                }
                            }, [a("div", [t._v(t._s(t.populationClass.points))]), t._v(" "), a("resource-detail", {
                                attrs: {
                                    slot: "popover",
                                    title: t.$t("data.population_class." + t.populationClass.key),
                                    value: t.populationClass.points,
                                    precision: 0,
                                    description: t.$t("galaxy.system.pop_class.info"),
                                    details: t.populationClasses
                                },
                                slot: "popover"
                            })], 1) : a("span", [t._v("?")])], 1), t._v(" "), a("div", [
                                ["uninhabitable", "uninhabited"].includes(t.system.status) ? [a("div", {
                                    staticClass: "label"
                                }, [t._v(t._s(t.$t("galaxy.system.properties.not_claimed")))]), t._v(" "), a("div", {
                                    staticClass: "value"
                                }, [t._v("—")])] : t._e(), t._v(" "), "inhabited_neutral" === t.system.status ? [a("div", {
                                    staticClass: "label"
                                }, [t._v(t._s(t.$t("galaxy.system.properties.not_claimed")))]), t._v(" "), a("div", {
                                    staticClass: "value"
                                }, [t._v(t._s(t.$t("galaxy.system.properties.autonomous_system")))])] : t._e(), t._v(" "), "inhabited_dominion" === t.system.status ? [a("div", {
                                    staticClass: "label"
                                }, [t._v(t._s(t.$t("galaxy.system.properties.dominion_of")))]), t._v(" "), a("div", {
                                    staticClass: "value",
                                    on: {
                                        click: t.openPlayer
                                    }
                                }, [t._v("\n            " + t._s(t.system.owner.name) + "\n          ")])] : t._e(), t._v(" "), "inhabited_player" === t.system.status ? [a("div", {
                                    staticClass: "label"
                                }, [t._v(t._s(t.$t("galaxy.system.properties.system_of")))]), t._v(" "), a("div", {
                                    staticClass: "value",
                                    on: {
                                        click: t.openPlayer
                                    }
                                }, [t._v("\n            " + t._s(t.system.owner.name) + "\n          ")])] : t._e()
                            ], 2)
                        ]), t._v(" "), a("div", {
                            staticClass: "star"
                        }, [a("div", [a("div", {
                            staticClass: "value"
                        }, [t._v("\n          " + t._s(t.$t("data.stellar_system." + t.system.type + ".name")) + "\n        ")]), t._v(" "), a("div", {
                            staticClass: "label"
                        }, [t._v("\n          " + t._s(t._f("integer")(t.system.position.x)) + ":" + t._s(t._f("integer")(t.system.position.y)) + "\n        ")])])]), t._v(" "), a("div", {
                            staticClass: "box-aside right"
                        }, [a("v-popover", {
                            attrs: {
                                trigger: "hover"
                            }
                        }, [a("div", [a("svgicon", {
                            attrs: {
                                name: "eye"
                            }
                        }), t._v("\n          " + t._s(t.system.contact.value) + "\n        ")], 1), t._v(" "), a("resource-detail", {
                            attrs: {
                                slot: "popover",
                                title: t.$t("data.bonus_pipeline_in.sys_visibility.name"),
                                precision: 0,
                                value: t.system.contact.value,
                                details: t.groupContactDetails(t.system.contact.details),
                                minimum: t.system.contact.minimum
                            },
                            slot: "popover"
                        })], 1)], 1)
                    ]), t._v(" "), a("div", {
                        staticClass: "box-line yields"
                    }, [t.system.credit ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.system.credit.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("data.bonus_pipeline_in.sys_credit.name"),
                            description: t.$t("resource-description.credit"),
                            value: t.system.credit.value,
                            details: t.system.credit.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n        ░░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/credit"
                        }
                    })], 1)]), t._v(" "), t.system.technology ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.system.technology.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "resource/technology"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("data.bonus_pipeline_in.sys_technology.name"),
                            description: t.$t("resource-description.technology"),
                            value: t.system.technology.value,
                            details: t.system.technology.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n        ░░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/technology"
                        }
                    })], 1)]), t._v(" "), t.system.ideology ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n        " + t._s(t._f("integer")(t.system.ideology.value)) + "\n        "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("data.bonus_pipeline_in.sys_ideology.name"),
                            description: t.$t("resource-description.ideology"),
                            value: t.system.ideology.value,
                            details: t.system.ideology.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n        ░░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1)])], 1), t._v(" "), ["uninhabitable", "uninhabited"].includes(t.system.status) ? t._e() : [t.system.governor ? a("div", {
                        staticClass: "governor-box",
                        class: "force-" + t.color
                    }, [a("div", {
                        staticClass: "round-icon is-active has-hover",
                        on: {
                            click: t.openCharacter
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "agent/" + t.system.governor.type
                        }
                    }), t._v(" "), a("span", {
                        staticClass: "number"
                    }, [t._v("\n          " + t._s(t.system.governor.level) + "\n        ")])], 1), t._v(" "), t.governorAction.actions.length > 0 ? a("div", {
                        staticClass: "toolbox-actions"
                    }, [t._l(t.governorAction.actions, (function(e) {
                        return a("div", {
                            key: t.governorAction.character.id + "-" + e.name + "-actions",
                            staticClass: "actions"
                        }, ["available" === e.status ? a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: e.tooltip,
                                expression: "action.tooltip"
                            }],
                            staticClass: "actions-item is-active has-hover",
                            on: {
                                click: function(a) {
                                    return t.doCharacterAction(e.icon, t.governorAction.character.id)
                                },
                                mouseover: function(a) {
                                    t.hoveredAction = t.governorAction.character.id + "-" + e.name
                                },
                                mouseleave: function(e) {
                                    t.hoveredAction = null
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: "action/" + e.icon + "_alt"
                            }
                        })], 1) : t._e(), t._v(" "), "unavailable" === e.status ? a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: e.reasons,
                                expression: "action.reasons"
                            }],
                            staticClass: "actions-item is-disabled"
                        }, [a("svgicon", {
                            attrs: {
                                name: "action/" + e.icon + "_alt"
                            }
                        })], 1) : t._e()])
                    })), t._v(" "), t._l(t.governorAction.actions, (function(e) {
                        return a("div", {
                            key: t.governorAction.character.id + "-" + e.name + "-overview",
                            staticClass: "actions"
                        }, [e.overview && t.hoveredAction === t.governorAction.character.id + "-" + e.name ? a("action-overview", {
                            staticClass: "is-top-shifted",
                            attrs: {
                                data: e.overview
                            }
                        }) : t._e()], 1)
                    }))], 2) : t._e()]) : t.isOwnSystem ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip.bottom",
                            value: t.$t("galaxy.system.properties.deploy_governor"),
                            expression: "$t('galaxy.system.properties.deploy_governor')",
                            modifiers: {
                                bottom: !0
                            }
                        }],
                        staticClass: "governor-box round-icon has-hover",
                        on: {
                            click: function(e) {
                                return t.prepareGovernorAssignment()
                            }
                        }
                    }) : a("div", {
                        staticClass: "governor-box round-icon is-disabled"
                    }), t._v(" "), a("div", {
                        staticClass: "production-box"
                    }, [a("div", {
                        staticClass: "production-value"
                    }, [t.system.production ? a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n            " + t._s(t._f("integer")(t.system.production.value)) + "\n            "), a("svgicon", {
                        attrs: {
                            name: "resource/production"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("data.bonus_pipeline_in.sys_production.name"),
                            description: t.$t("resource-description.production"),
                            value: t.system.production.value,
                            details: t.system.production.details
                        },
                        slot: "popover"
                    })], 1) : [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n            ░░░\n            "), a("svgicon", {
                        attrs: {
                            name: "resource/production"
                        }
                    })], 1)]], 2), t._v(" "), t.isOwnProperty && t.system.queue && t.system.queue.queue.length > 0 ? a("div", {
                        staticClass: "production-counter"
                    }, [a("counter", {
                        attrs: {
                            current: this.system.queue.queue[0].remaining_prod / this.system.production.value,
                            receivedAt: t.system.receivedAt
                        }
                    })], 1) : t._e(), t._v(" "), t.system.queue ? a("div", {
                        staticClass: "round-icon",
                        class: {
                            "is-disabled": 0 === t.system.queue.queue.length, "has-hover": t.system.queue.queue.length > 0, "is-pulsing": t.system.queue.queue.length > 0
                        },
                        on: {
                            click: function(e) {
                                return t.$emit("toggleQueue")
                            }
                        }
                    }, [t.system.queue.queue.length > 0 ? [a("circle-progress-value", {
                        attrs: {
                            current: t.system.queue.queue[0].total_prod - t.system.queue.queue[0].remaining_prod,
                            total: t.system.queue.queue[0].total_prod,
                            increase: t.system.production.value,
                            size: 46,
                            width: 4,
                            theme: t.color
                        }
                    }), t._v(" "), "ship" === this.system.queue.queue[0].type ? a("svgicon", {
                        attrs: {
                            name: "ship/" + this.system.queue.queue[0].prod_key
                        }
                    }) : a("svgicon", {
                        attrs: {
                            name: "building/" + this.system.queue.queue[0].prod_key
                        }
                    }), t._v(" "), t.system.queue.queue.length - 1 > 0 ? a("span", {
                        staticClass: "number"
                    }, [t._v("\n            " + t._s(t.system.queue.queue.length - 1) + "\n          ")]) : t._e()] : t._e()], 2) : a("div", {
                        staticClass: "round-icon is-disabled"
                    })])]], 2)
                }), [], !1, null, null, null).exports,
                fs = {
                    name: "system-actions",
                    props: {
                        system: Object,
                        isOwnSystem: Boolean,
                        isOwnProperty: Boolean
                    },
                    data: function() {
                        return {
                            hoveredAction: null
                        }
                    },
                    computed: {
                        tutorialStep: function() {
                            return this.$store.state.game.tutorialStep
                        },
                        systemTheme: function() {
                            return this.system.owner ? this.getTheme(this.system.owner.faction) : null
                        },
                        selectedCharacterTheme: function() {
                            return this.selectedCharacter ? this.getTheme(this.selectedCharacter.owner.faction) : null
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        characters: function() {
                            return this.$store.state.game.player.characters
                        },
                        selectedCharacter: function() {
                            return this.$store.state.game.selectedCharacter
                        },
                        sectors: function() {
                            return this.$store.state.game.galaxy.sectors
                        },
                        actions: function() {
                            var t = [],
                                e = {
                                    vm: this,
                                    selectedCharacter: this.selectedCharacter,
                                    system: this.system,
                                    sectors: this.sectors,
                                    themes: {
                                        system: this.systemTheme,
                                        character: this.selectedCharacterTheme
                                    }
                                };
                            if (!this.selectedCharacter) return t;
                            if ("admiral" === this.selectedCharacter.type && !this.isOwnProperty && (null === this.system.owner && "uninhabited" === this.system.status && ds.colonization(t, e, this.hasSystemSlot), ["inhabited_neutral", "inhabited_dominion", "inhabited_player"].includes(this.system.status))) {
                                var a = this.system.defense ? this.system.defense.value : null,
                                    s = {
                                        attacker: this.selectedCharacter.army.raid_coef.value,
                                        attackerIcon: "ship/raid",
                                        attackerModifier: this.selectedCharacter.level,
                                        attackerTheme: e.themes.character,
                                        defender: a,
                                        defenderIcon: "resource/defense",
                                        defenderTheme: e.themes.system
                                    };
                                ds.conquest(t, e, this.hasSystemSlot, this.systemTheme), ds.raid(t, e, s), ds.loot(t, e, s)
                            }
                            return "spy" !== this.selectedCharacter.type || this.isOwnProperty || ["inhabited_neutral", "inhabited_dominion", "inhabited_player"].includes(this.system.status) && ds.infiltrate(t, e), "speaker" !== this.selectedCharacter.type || this.isOwnProperty || (["inhabited_neutral", "inhabited_dominion"].includes(this.system.status) && ds.makeDominion(t, e, this.hasDominionSlot), ["inhabited_neutral", "inhabited_dominion", "inhabited_player"].includes(this.system.status) && ds.encourageHate(t, e)), this.selectedCharacter.actions && this.selectedCharacter.actions.virtual_position !== this.system.id && t.push({
                                status: "available",
                                icon: "jump",
                                name: "move",
                                reasons: ""
                            }), t
                        },
                        systemCharacters: function() {
                            var t = this;
                            if (this.system.characters) {
                                var e = {
                                    vm: this,
                                    selectedCharacter: this.selectedCharacter,
                                    system: this.system,
                                    characterTheme: this.selectedCharacterTheme
                                };
                                return this.system.characters.map((function(a) {
                                    var s = {
                                            character: a,
                                            actions: []
                                        },
                                        i = t.getTheme(a.owner.faction);
                                    return t.selectedCharacter ? (t.selectedCharacter.owner.id !== a.owner.id && ("admiral" === t.selectedCharacter.type && "admiral" === a.type && ("idle" === t.selectedCharacter.action_status || "docking" === t.selectedCharacter.action_status && t.selectedCharacter.system === t.system.id) && ds.fight(s, e), "spy" === t.selectedCharacter.type && (ds.assassination(s, e, a, i), "admiral" === a.type && ds.sabotage(s, e, a, i)), "speaker" === t.selectedCharacter.type && ds.conversion(s, e, a, t.player, i)), s) : s
                                }))
                            }
                            return []
                        },
                        hasSystemSlot: function() {
                            return this.player.stellar_systems.length < this.player.max_systems.value
                        },
                        hasDominionSlot: function() {
                            return this.player.dominions.length < this.player.max_dominions.value
                        }
                    },
                    methods: {
                        getTheme: function(t) {
                            return this.$store.getters["game/themeByKey"](t)
                        },
                        clickCharacter: function(t) {
                            this.characters.find((function(e) {
                                return e.id === t.id
                            })) ? this.selectedCharacter && this.selectedCharacter.id === t.id ? this.$store.dispatch("game/unselectCharacter") : this.$store.dispatch("game/selectCharacter", {
                                vm: this,
                                id: t.id
                            }) : this.$store.dispatch("game/openCharacter", {
                                vm: this,
                                id: t.id
                            })
                        },
                        openPlayer: function(t) {
                            this.$store.dispatch("game/openPlayer", {
                                vm: this,
                                id: t
                            })
                        },
                        doAction: function(t) {
                            this.hoveredAction = null, this.$root.$emit("map:addAction", t, {
                                system: this.system
                            })
                        },
                        doCharacterAction: function(t, e) {
                            this.hoveredAction = null, this.$root.$emit("map:addAction", t, {
                                character: e,
                                system: this.system
                            })
                        },
                        prepareAgentAssignment: function() {
                            var t = this.system.id;
                            this.$root.$emit("openBottomMiniPanel", "character-deck"), this.$store.commit("game/prepareAssignment", {
                                systemId: t,
                                mode: "on_board"
                            })
                        }
                    },
                    mounted: function() {
                        (new l.e).set(this.$refs.container, {
                            css: {
                                opacity: 0
                            }
                        }).to(this.$refs.container, {
                            css: {
                                opacity: 1
                            },
                            ease: l.a.linear,
                            duration: 1
                        }, 0)
                    },
                    components: {
                        ActionOverview: Ee,
                        CircleProgressValue: ps,
                        Counter: Ua
                    }
                },
                _s = Object(Ft.a)(fs, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        ref: "container"
                    }, [t.actions.length > 0 ? a("div", {
                        staticClass: "system-actions top-shifted"
                    }, t._l(t.actions, (function(e) {
                        return a("div", {
                            key: e.icon,
                            staticClass: "action-item"
                        }, [a("div", {
                            staticClass: "action-item-container"
                        }, ["available" === e.status ? a("div", {
                            staticClass: "round-icon is-active has-hover",
                            on: {
                                click: function(a) {
                                    return t.doAction(e.icon)
                                },
                                mouseover: function(a) {
                                    t.hoveredAction = e.name
                                },
                                mouseleave: function(e) {
                                    t.hoveredAction = null
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: "action/" + e.icon + "_alt"
                            }
                        })], 1) : t._e(), t._v(" "), "unavailable" === e.status ? a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: e.reasons,
                                expression: "action.reasons"
                            }],
                            staticClass: "round-icon is-disabled"
                        }, [a("svgicon", {
                            attrs: {
                                name: "action/" + e.icon + "_alt"
                            }
                        })], 1) : t._e(), t._v(" "), e.overview && t.hoveredAction === e.name ? a("div", {
                            staticClass: "toolbox-actions"
                        }, [a("action-overview", {
                            attrs: {
                                data: e.overview
                            }
                        })], 1) : t._e(), t._v(" "), a("div", {
                            staticClass: "action-label"
                        }, [a("div", {
                            staticClass: "name"
                        }, [t._v(t._s(t.$t("galaxy.system.actions." + e.name)))])])])])
                    })), 0) : t._e(), t._v(" "), a("div", {
                        staticClass: "system-actions"
                    }, [t.isOwnSystem ? a("div", {
                        staticClass: "action-item"
                    }, [a("div", {
                        staticClass: "action-item-container"
                    }, [14 === t.tutorialStep ? a("div", {
                        staticClass: "tutorial-pointer is-right"
                    }) : t._e(), t._v(" "), a("div", {
                        staticClass: "round-icon has-hover",
                        on: {
                            click: function(e) {
                                return t.prepareAgentAssignment()
                            }
                        }
                    }), t._v(" "), a("div", {
                        staticClass: "action-label",
                        on: {
                            click: function(e) {
                                return t.prepareAgentAssignment()
                            }
                        }
                    }, [a("div", {
                        staticClass: "name"
                    }, [t._v(t._s(t.$t("galaxy.system.actions.deploy")))])])])]) : t._e(), t._v(" "), t._l(t.systemCharacters, (function(e) {
                        var s = e.character,
                            i = e.actions;
                        return a("div", {
                            key: s.id,
                            staticClass: "action-item"
                        }, [a("div", {
                            staticClass: "action-item-container",
                            class: ["force-" + t.getTheme(s.owner.faction), {
                                "is-active": null !== t.system.siege && s.id === t.system.siege.besieger_id
                            }]
                        }, [a("div", {
                            staticClass: "round-icon is-active has-hover",
                            class: {
                                "has-border": s.owner.id === t.player.id, "has-circle": t.selectedCharacter && t.selectedCharacter.id === s.id
                            },
                            on: {
                                click: function(e) {
                                    return t.clickCharacter(s)
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: "agent/" + s.type
                            }
                        }), t._v(" "), a("span", {
                            staticClass: "number"
                        }, [t._v("\n            " + t._s(s.level) + "\n          ")])], 1), t._v(" "), i.length > 0 ? a("div", {
                            staticClass: "toolbox-actions"
                        }, [t._l(i, (function(e) {
                            return a("div", {
                                key: s.id + "-" + e.name + "-overview",
                                staticClass: "actions"
                            }, [e.overview && t.hoveredAction === s.id + "-" + e.name ? a("action-overview", {
                                staticClass: "is-top-shifted",
                                attrs: {
                                    theme: t.getTheme(s.owner.faction),
                                    name: t.hoveredAction,
                                    data: e.overview
                                }
                            }) : t._e()], 1)
                        })), t._v(" "), t._l(i, (function(e) {
                            return a("div", {
                                key: s.id + "-" + e.name + "-actions",
                                staticClass: "actions"
                            }, ["available" === e.status ? a("div", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: e.tooltip,
                                    expression: "action.tooltip"
                                }],
                                staticClass: "actions-item is-active has-hover",
                                on: {
                                    click: function(a) {
                                        return t.doCharacterAction(e.icon, s.id)
                                    },
                                    mouseover: function(a) {
                                        t.hoveredAction = s.id + "-" + e.name
                                    },
                                    mouseleave: function(e) {
                                        t.hoveredAction = null
                                    }
                                }
                            }, [a("svgicon", {
                                attrs: {
                                    name: "action/" + e.icon + "_alt"
                                }
                            })], 1) : t._e(), t._v(" "), "unavailable" === e.status ? a("div", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: e.reasons,
                                    expression: "action.reasons"
                                }],
                                staticClass: "actions-item is-disabled"
                            }, [a("svgicon", {
                                attrs: {
                                    name: "action/" + e.icon + "_alt"
                                }
                            })], 1) : t._e()])
                        }))], 2) : t._e(), t._v(" "), a("div", {
                            staticClass: "action-label colored"
                        }, [a("div", {
                            staticClass: "name"
                        }, [t._v(t._s(s.name))]), t._v(" "), s.owner.id !== t.player.id ? a("div", {
                            staticClass: "info",
                            on: {
                                click: function(e) {
                                    return t.openPlayer(s.owner.id)
                                }
                            }
                        }, [t._v("\n            " + t._s(s.owner.name) + "\n          ")]) : t._e()])])])
                    }))], 2), t._v(" "), null !== t.system.siege ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("data.character_action_status." + t.system.siege.type + ".name"),
                            expression: "$t(`data.character_action_status.${system.siege.type}.name`)"
                        }],
                        staticClass: "siege"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/" + t.system.siege.type + "_alt"
                        }
                    }), t._v(" "), a("counter", {
                        staticClass: "counter",
                        attrs: {
                            current: t.system.siege.days.value,
                            receivedAt: t.system.receivedAt
                        }
                    }), t._v(" "), a("circle-progress-value", {
                        attrs: {
                            current: t.system.siege.days.value,
                            total: t.system.siege.duration,
                            increase: t.system.siege.days.change,
                            size: 98,
                            width: 4,
                            theme: t.systemTheme
                        }
                    })], 1) : t._e()])
                }), [], !1, null, null, null).exports,
                ys = {
                    name: "system-population",
                    data: function() {
                        return {
                            growth: [{
                                boundaries: [1, .06],
                                label: this.$t("galaxy.system.population.growth_0")
                            }, {
                                boundaries: [.06, .04],
                                label: this.$t("galaxy.system.population.growth_1")
                            }, {
                                boundaries: [.04, .02],
                                label: this.$t("galaxy.system.population.growth_2")
                            }, {
                                boundaries: [.02, .001],
                                label: this.$t("galaxy.system.population.growth_3")
                            }, {
                                boundaries: [.001, -.001],
                                label: this.$t("galaxy.system.population.growth_4")
                            }, {
                                boundaries: [-.001, -1],
                                label: this.$t("galaxy.system.population.growth_5")
                            }]
                        }
                    },
                    props: {
                        system: Object,
                        isOwnSystem: Boolean
                    },
                    computed: {
                        tutorialStep: function() {
                            return this.$store.state.game.tutorialStep
                        }
                    },
                    methods: {
                        growthToLabel: function() {
                            var t = this.system.population.change,
                                e = this.growth.find((function(e) {
                                    return t <= e.boundaries[0] && t > e.boundaries[1]
                                }));
                            return e ? e.label : ""
                        }
                    },
                    mounted: function() {
                        (new l.e).set(this.$refs.container, {
                            left: -500
                        }).to(this.$refs.container, {
                            left: 0,
                            ease: l.a.easeOut,
                            duration: .8
                        }, 0)
                    },
                    components: {
                        ResourceDetail: We,
                        ProgressValue: Ba
                    }
                },
                gs = Object(Ft.a)(ys, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        ref: "container",
                        staticClass: "system-population"
                    }, [
                        [4, 17].includes(t.tutorialStep) ? a("div", {
                            staticClass: "tutorial-pointer is-bottom"
                        }) : t._e(), t._v(" "), a("div", {
                            staticClass: "box-line header"
                        }, [a("strong", [t._v(t._s(t.$t("galaxy.system.population.workforce")))]), t._v(" "), t.system.population ? [t._v("\n      " + t._s(t.$t("galaxy.system.population.growth_adj", {
                            adj: t.growthToLabel()
                        })) + "\n    ")] : [t._v("\n      " + t._s(t.$t("galaxy.system.population.unknown_workforce")) + "\n    ")]], 2), t._v(" "), a("div", {
                            staticClass: "progres-container"
                        }, [t.system.population ? a("progress-value", {
                            attrs: {
                                current: t.system.population.value - Math.trunc(t.system.population.value),
                                total: 1,
                                increase: t.system.population.change
                            }
                        }) : a("progress-value", {
                            attrs: {
                                current: 0,
                                total: 0,
                                increase: 0
                            }
                        })], 1), t._v(" "), a("div", {
                            staticClass: "box-line"
                        }, [t.system.workforce ? a("v-popover", {
                            attrs: {
                                trigger: "hover"
                            }
                        }, [a("div", {
                            staticClass: "yield-box",
                            class: {
                                highlighted: t.system.used_workforce >= t.system.workforce
                            }
                        }, [t._v("\n        " + t._s(t.system.used_workforce) + "/" + t._s(t.system.workforce) + "\n        "), a("svgicon", {
                            attrs: {
                                name: "resource/population"
                            }
                        })], 1), t._v(" "), a("resource-detail", {
                            attrs: {
                                slot: "popover",
                                title: t.$t("galaxy.system.population.workforce"),
                                description: t.$t("resource-description.workforce"),
                                precision: 0,
                                details: [{
                                    reason: t.$t("galaxy.system.population.workforce_mobilized"),
                                    value: t.system.used_workforce
                                }, {
                                    reason: t.$t("galaxy.system.population.workforce_total"),
                                    value: t.system.workforce
                                }]
                            },
                            slot: "popover"
                        })], 1) : a("div", [a("div", {
                            staticClass: "yield-box"
                        }, [t._v("\n        ░░/░░ "), a("svgicon", {
                            attrs: {
                                name: "resource/population"
                            }
                        })], 1)]), t._v(" "), t.system.habitation ? a("v-popover", {
                            attrs: {
                                trigger: "hover"
                            }
                        }, [a("div", {
                            staticClass: "yield-box"
                        }, [t._v("\n        " + t._s(t.system.habitation.value) + "\n        "), a("svgicon", {
                            attrs: {
                                name: "resource/habitation"
                            }
                        })], 1), t._v(" "), a("resource-detail", {
                            attrs: {
                                slot: "popover",
                                title: t.$t("galaxy.system.population.habitation"),
                                description: t.$t("resource-description.habitation"),
                                precision: 0,
                                value: t.system.habitation.value,
                                details: t.system.habitation.details
                            },
                            slot: "popover"
                        })], 1) : a("div", [a("div", {
                            staticClass: "yield-box"
                        }, [t._v("\n        ░░░░ "), a("svgicon", {
                            attrs: {
                                name: "resource/habitation"
                            }
                        })], 1)]), t._v(" "), t.system.happiness ? a("v-popover", {
                            attrs: {
                                trigger: "hover"
                            }
                        }, [a("div", {
                            staticClass: "yield-box",
                            class: {
                                highlighted: t.system.happiness.value < 0
                            }
                        }, [t._v("\n        " + t._s(t._f("integer")(t.system.happiness.value)) + "\n        "), a("svgicon", {
                            attrs: {
                                name: "resource/happiness"
                            }
                        })], 1), t._v(" "), a("resource-detail", {
                            attrs: {
                                slot: "popover",
                                title: t.$t("galaxy.system.population.happiness"),
                                description: t.$t("resource-description.happiness"),
                                value: t.system.happiness.value,
                                details: t.system.happiness.details
                            },
                            slot: "popover"
                        })], 1) : a("div", [a("div", {
                            staticClass: "yield-box"
                        }, [t._v("\n        ░░░░ "), a("svgicon", {
                            attrs: {
                                name: "resource/happiness"
                            }
                        })], 1)])], 1)
                    ])
                }), [], !1, null, null, null).exports;

            function bs(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }
            var Cs = {
                    name: "system-population-status",
                    props: {
                        system: Object,
                        color: String
                    },
                    computed: {
                        populationStatus: function() {
                            return this.$store.state.game.data.population_status
                        },
                        currentPenalty: function() {
                            var t = this;
                            return this.system.population_status ? this.populationStatus.find((function(e) {
                                return e.key === t.system.population_status
                            })).penalty : "hidden"
                        },
                        maxHappiness: function() {
                            return this.populationStatus[0].display_max
                        },
                        minHappiness: function() {
                            return this.populationStatus[this.populationStatus.length - 1].display_min
                        },
                        totalHappiness: function() {
                            return Math.abs(this.maxHappiness) + Math.abs(this.minHappiness)
                        },
                        rangedHappiness: function() {
                            if (!this.system.happiness) return 0;
                            var t = Math.max(Math.min(this.system.happiness.value, this.maxHappiness), this.minHappiness);
                            return Math.abs(t - this.maxHappiness) / this.totalHappiness * 100
                        },
                        blockPopStatus: function() {
                            var t = this;
                            return this.populationStatus.map((function(e) {
                                return function(t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var a = null != arguments[e] ? arguments[e] : {};
                                        e % 2 ? bs(Object(a), !0).forEach((function(e) {
                                            i()(t, e, a[e])
                                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : bs(Object(a)).forEach((function(e) {
                                            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                                        }))
                                    }
                                    return t
                                }({
                                    width: Math.abs(e.display_min - e.display_max) / t.totalHappiness * 100
                                }, e)
                            }))
                        }
                    },
                    methods: {
                        formatTooltip: function(t, e, a, s) {
                            var i = "<strong>" + this.$t("data.population_status.".concat(t, ".name")) + "</strong><br>";
                            return "normal" !== t && (i += "— ".concat(this.$t("galaxy.system.pop_status.happiness", {
                                max: a,
                                min: e
                            }), "<br>")), i += "— ".concat(this.$t("galaxy.system.pop_status.productivity", {
                                penalty: s
                            }))
                        },
                        formatProductivity: function(t) {
                            return "number" == typeof t ? Math.round(100 * (1 - t)) : "░░"
                        }
                    }
                },
                ks = Object(Ft.a)(Cs, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "system-content-group"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.pop_status.title")) + "\n      ")]), t._v("\n      " + t._s(t.formatProductivity(t.currentPenalty)) + "%\n    ")]), t._v("\n\n    " + t._s(t.$t("data.population_status." + t.system.population_status + ".desc")) + "\n\n    "), a("div", {
                        staticClass: "system-content-group-pop-state"
                    }, t._l(t.blockPopStatus, (function(e) {
                        return a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.formatTooltip(e.key, e.display_min, e.display_max, t.formatProductivity(e.penalty)),
                                expression: "formatTooltip(ps.key, ps.display_min, ps.display_max, formatProductivity(ps.penalty))"
                            }],
                            key: e.key,
                            staticClass: "pop-state-item",
                            class: {
                                "is-active": e.key === t.system.population_status
                            },
                            style: {
                                width: e.width + "%"
                            }
                        }, [t._v("\n        " + t._s(t.formatProductivity(e.penalty)) + "%\n      ")])
                    })), 0), t._v(" "), a("div", {
                        staticClass: "generic-progress-container"
                    }, [a("div", {
                        staticClass: "generic-progress-bar",
                        style: "width: " + t.rangedHappiness + "%;"
                    })])])])
                }), [], !1, null, null, null).exports,
                ws = {
                    upgradeBuildingStatus: function(t, e, a, s) {
                        if (!s) return !1;
                        if (null === t.building_key || "new" === t.construction_status || "upgrade" === t.construction_status) return !1;
                        var i = t.building_level + 1;
                        if (i > s.levels.length) return !1;
                        var n = s.levels[i - 1].patent;
                        return (null === n || void 0 !== a.find((function(t) {
                            return t === n
                        }))) && !("asteroid" !== e.type && "moon" !== e.type && 1 !== t.id && i > e.tiles[0].building_level)
                    },
                    isBuildable: function(t, e, a) {
                        var s = a.playerPatents,
                            i = a.bodiesData,
                            n = a.buildingsData,
                            r = i.find((function(t) {
                                return t.key === e.type
                            }));
                        if (t && "empty" === t.building_status) {
                            if ("orbital" === r.biome) {
                                var o = n.filter((function(t) {
                                    return t.biome === r.biome
                                })).reduce((function(t, e) {
                                    return t.add(e.levels[0].patent)
                                }), new Set);
                                return Array.from(o).filter((function(t) {
                                    return s.some((function(e) {
                                        return e === t
                                    }))
                                })).length > 0
                            }
                            if (1 === t.id) {
                                var c = n.filter((function(t) {
                                    return t.biome === r.biome && "infrastructure" === t.type
                                })).reduce((function(t, e) {
                                    return t.add(e.levels[0].patent)
                                }), new Set);
                                return Array.from(c).filter((function(t) {
                                    return s.some((function(e) {
                                        return e === t
                                    }))
                                })).length > 0
                            }
                            return "empty" !== e.tiles[0].building_status
                        }
                        return !1
                    },
                    findEmptyTile: function(t, e, a, s, i) {
                        var n = this,
                            r = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                            o = t.reduce((function(t, s) {
                                if (!t.found && (t.lookingNext || s.uid === e)) {
                                    var r = t.lookingNext ? s.tiles.find((function(t) {
                                        return null === t.building_key
                                    })) : s.tiles.find((function(t) {
                                        return null === t.building_key && t.id > a
                                    }));
                                    if (r && n.isBuildable(r, s, i)) return {
                                        body: s,
                                        tile: r,
                                        found: !0,
                                        lookingNext: t.lookingNext
                                    };
                                    t.lookingNext = !0
                                }
                                return n.findEmptyTile(s.bodies, e, a, t, i, !1)
                            }), s);
                        if (r && !o.found) {
                            s.lookingNext = !0;
                            var c = this.findEmptyTile(t, "1", 0, s, i, !1);
                            c.found && c.body.uid !== e && c.tile.id !== a && (o = c)
                        }
                        return o
                    }
                };

            function xs(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function $s(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? xs(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : xs(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var Ps = {
                    name: "system-bodies-item",
                    data: function() {
                        return {
                            validBodies: ["habitable_planet", "sterile_planet", "moon", "asteroid"]
                        }
                    },
                    props: {
                        body: Object,
                        isOwnSystem: Boolean,
                        system: Object,
                        visibility: Number
                    },
                    computed: {
                        patents: function() {
                            return this.$store.state.game.player.patents
                        },
                        production: function() {
                            return this.$store.state.game.production
                        },
                        buildings: function() {
                            return this.$store.state.game.data.building
                        },
                        bodies: function() {
                            return this.$store.state.game.data.stellar_body
                        },
                        bodyData: function() {
                            var t = this;
                            return this.bodies.find((function(e) {
                                return e.key === t.body.type
                            }))
                        },
                        tiles: function() {
                            var t = this;
                            return O()(Array(8).keys()).map((function(e) {
                                var a = t.body.tiles[e],
                                    s = {
                                        tile: a,
                                        status: "",
                                        icon: "",
                                        level: "",
                                        classes: [],
                                        iconClasses: [],
                                        actions: []
                                    };
                                if (void 0 === a) return s.status = "nonexistent", s.classes.push("is-transparent"), s;
                                if ("infrastructure" === a.type && s.classes.push("is-important"), ["uninhabitable", "uninhabited"].includes(t.system.status)) return s.status = "hidden", s.classes.push("is-fadded"), s;
                                if (s.status = "visible", t.isOwnSystem) {
                                    if (t.production && "building" === t.production.data.type && t.production.data.targetId === t.body.uid && t.production.data.tileId === a.id && !a.building_key && s.classes.push("is-active"), a && "empty" === a.building_status) {
                                        var i = {
                                            playerPatents: t.patents,
                                            bodiesData: t.bodies,
                                            buildingsData: t.buildings
                                        };
                                        return ws.isBuildable(a, t.body, i) ? a.building_key ? (s.icon = "building/".concat(a.building_key), s.iconClasses.push("is-transparent"), s) : (s.icon = "building/frame_".concat(t.bodyData.biome), s.iconClasses.push("is-transparent"), t.isOwnSystem && s.classes.push("is-hoverable"), s) : (s.classes.push("has-dashed-background"), s.icon = "unlock", s.iconClasses.push("is-small"), s.iconClasses.push("is-transparent"), s)
                                    }
                                    s.icon = "building/".concat(a.building_key), s.level = a.building_level, "damaged" === a.building_status && (s.classes.push("has-dashed-background"), s.iconClasses.push("is-transparent"), "none" === a.construction_status && s.actions.push("repair"));
                                    var n = t.buildings.find((function(t) {
                                        return t.key === a.building_key
                                    }));
                                    n && (ws.upgradeBuildingStatus(a, t.body, t.patents, n) && s.actions.push("upgrade"), "infrastructure" !== n.type && "none" === a.construction_status && s.actions.push("delete"))
                                } else {
                                    if ("hidden" === a.building_status) return s.classes.push("is-fadded"), s;
                                    if ("empty" === a.building_status) return s;
                                    "damaged" === a.building_status && s.classes.push("has-dashed-background"), s.status = "visible", s.iconClasses.push("is-transparent"), s.icon = "hidden" === a.building_key ? "building/frame_".concat(t.bodyData.biome, "_hidden") : "building/".concat(a.building_key), s.level = "hidden" === a.building_level ? "?" : a.building_level
                                }
                                return s
                            }))
                        }
                    },
                    methods: {
                        enterTile: function(t, e, a) {
                            t && null !== t.building_key && this.$emit("enterTile", {
                                body: e,
                                tile: $s({}, t),
                                wantToUpgrade: a
                            })
                        },
                        leaveTile: function() {
                            this.$emit("leaveTile")
                        },
                        clickTile: function(t) {
                            if (this.isOwnSystem) {
                                var e = {
                                    playerPatents: this.patents,
                                    bodiesData: this.bodies,
                                    buildingsData: this.buildings
                                };
                                this.production && t && "building" === this.production.data.type && this.production.data.targetId === this.body.uid && this.production.data.tileId === t.id ? this.$store.commit("game/clearProduction") : ws.isBuildable(t, this.body, e) && null === t.building_key && (this.$ambiance.sound("open-production"), this.$store.commit("game/prepareProduction", {
                                    systemId: this.system.id,
                                    data: {
                                        type: "building",
                                        targetId: this.body.uid,
                                        tileId: t.id
                                    }
                                }))
                            }
                        },
                        buildTile: function(t, e) {
                            var a = this;
                            if (this.isOwnSystem) {
                                var s = "build" === e ? t.building_level + 1 : t.building_level;
                                this.$ambiance.sound("order-building"), this.$socket.player.push("order_building", {
                                    system_id: this.system.id,
                                    production_data: {
                                        type: e,
                                        target_id: this.body.uid,
                                        tile_id: t.id,
                                        prod_key: t.building_key,
                                        prod_level: s
                                    }
                                }).receive("error", (function(t) {
                                    a.$toastError(t.reason)
                                }))
                            }
                        },
                        removeTile: function(t) {
                            var e = this;
                            this.isOwnSystem && this.$socket.player.push("remove_building", {
                                system_id: this.system.id,
                                production_data: {
                                    target_id: this.body.uid,
                                    tile_id: t.id
                                }
                            }).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        }
                    }
                },
                Os = Object(Ft.a)(Ps, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return t.validBodies.includes(t.body.type) ? a("div", [a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "body-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "stellar_body/" + t.body.type
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "body-info"
                    }, [a("div", {
                        staticClass: "body-info-type"
                    }, [t._v("\n        " + t._s(t.$t("data.stellar_body." + t.body.type + ".name")) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "body-info-potentials"
                    }, [a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("data.bonus_pipeline_in.body_ind.name"),
                            expression: "$t(`data.bonus_pipeline_in.body_ind.name`)"
                        }],
                        staticClass: "potential-item",
                        class: "f-" + t.body.industrial_factor
                    }, [a("span", [t._v(t._s(t.body.industrial_factor))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "stellar_body/industrial_factor"
                        }
                    })], 1), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("data.bonus_pipeline_in.body_tec.name"),
                            expression: "$t(`data.bonus_pipeline_in.body_tec.name`)"
                        }],
                        staticClass: "potential-item",
                        class: "f-" + t.body.technological_factor
                    }, [a("span", [t._v(t._s(t.body.technological_factor))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "stellar_body/technological_factor"
                        }
                    })], 1), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("data.bonus_pipeline_in.body_act.name"),
                            expression: "$t(`data.bonus_pipeline_in.body_act.name`)"
                        }],
                        staticClass: "potential-item",
                        class: "f-" + t.body.activity_factor
                    }, [a("span", [t._v(t._s(t.body.activity_factor))]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "stellar_body/activity_factor"
                        }
                    })], 1)])]), t._v(" "), a("div", {
                        staticClass: "body-tiles"
                    }, t._l(t.tiles, (function(e, s) {
                        var i = e.tile,
                            n = e.status,
                            r = e.icon,
                            o = e.level,
                            c = e.classes,
                            l = e.iconClasses,
                            u = e.actions;
                        return a("div", {
                            key: s,
                            staticClass: "tile",
                            class: c,
                            on: {
                                click: function(e) {
                                    return t.clickTile(i)
                                }
                            }
                        }, ["visible" === n ? [a("svgicon", {
                            staticClass: "tile-icon",
                            class: l,
                            attrs: {
                                name: r
                            },
                            nativeOn: {
                                mouseenter: function(e) {
                                    return t.enterTile(i, t.body, !1)
                                },
                                mouseleave: function(e) {
                                    return t.leaveTile()
                                }
                            }
                        }), t._v(" "), ["none", "hidden"].includes(i.construction_status) ? t._e() : a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.bottom",
                                value: t.$t("card.building.production." + i.construction_status),
                                expression: "$t(`card.building.production.${tile.construction_status}`)",
                                modifiers: {
                                    bottom: !0
                                }
                            }],
                            staticClass: "tile-toast bottom left"
                        }, [a("svgicon", {
                            attrs: {
                                name: "options"
                            }
                        })], 1), t._v(" "), o ? a("div", {
                            staticClass: "tile-level"
                        }, [t._v("\n            " + t._s(o) + "\n          ")]) : t._e(), t._v(" "), t.isOwnSystem ? [u.includes("repair") ? a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("card.building.repair"),
                                expression: "$t('card.building.repair')"
                            }],
                            staticClass: "tile-toast top left is-active",
                            on: {
                                click: function(e) {
                                    return e.stopPropagation(), t.buildTile(i, "repair")
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: "check"
                            }
                        })], 1) : u.includes("upgrade") ? a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("card.building.upgrade"),
                                expression: "$t('card.building.upgrade')"
                            }],
                            staticClass: "tile-toast top left is-active",
                            on: {
                                click: function(e) {
                                    return e.stopPropagation(), t.buildTile(i, "build")
                                },
                                mouseenter: function(e) {
                                    return t.enterTile(i, t.body, !0)
                                },
                                mouseleave: function(e) {
                                    return t.leaveTile()
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: "caret-up"
                            }
                        })], 1) : t._e(), t._v(" "), u.includes("delete") ? a("div", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip.bottom",
                                value: t.$t("card.building.delete"),
                                expression: "$t('card.building.delete')",
                                modifiers: {
                                    bottom: !0
                                }
                            }],
                            staticClass: "tile-toast is-hidden bottom right is-active",
                            on: {
                                click: function(e) {
                                    return e.stopPropagation(), t.removeTile(i)
                                }
                            }
                        }, [a("svgicon", {
                            attrs: {
                                name: "close"
                            }
                        })], 1) : t._e()] : t._e()] : t._e()], 2)
                    })), 0)])]) : t._e()
                }), [], !1, null, null, null).exports,
                Ss = {
                    name: "system-bodies",
                    data: function() {
                        return {
                            hoveredTile: void 0
                        }
                    },
                    props: {
                        system: Object,
                        isOwnSystem: Boolean,
                        hoveredOrbit: Number,
                        color: String
                    },
                    computed: {
                        patents: function() {
                            return this.$store.state.game.player.patents
                        },
                        tutorialStep: function() {
                            return this.$store.state.game.tutorialStep
                        }
                    },
                    methods: {
                        enterTile: function(t) {
                            var e = t.body,
                                a = t.tile,
                                s = t.wantToUpgrade;
                            "hidden" !== a.building_key && (a.building_level = a.building_level ? a.building_level : 1, a.building_level = s ? a.building_level + 1 : a.building_level, this.hoveredTile = {
                                body: e,
                                tile: a,
                                showCost: s
                            })
                        },
                        leaveTile: function() {
                            this.hoveredTile = void 0
                        },
                        hasBuilding: function(t) {
                            return void 0 !== t.tiles.concat(t.bodies.reduce((function(t, e) {
                                return t.concat(e.tiles)
                            }), [])).find((function(t) {
                                return "empty" !== t.building_status && "hidden" !== t.building_status
                            }))
                        }
                    },
                    components: {
                        SystemBodiesItem: Os,
                        BuildingCard: xa,
                        SystemPopulationStatus: ks
                    }
                },
                Ts = Object(Ft.a)(Ss, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [t.system.population && "normal" !== t.system.population_status ? a("system-population-status", {
                        attrs: {
                            system: t.system,
                            color: t.color
                        }
                    }) : t._e(), t._v(" "), t._l(t.system.bodies, (function(e) {
                        return a("div", {
                            key: e.id,
                            staticClass: "system-content-group",
                            class: {
                                hovered: e.id === t.hoveredOrbit, active: t.hasBuilding(e)
                            },
                            on: {
                                mouseover: function(a) {
                                    return t.$emit("enterOrbit", e.id)
                                },
                                mouseleave: function(e) {
                                    return t.$emit("leaveOrbit")
                                }
                            }
                        }, [a("div", {
                            staticClass: "system-content-group-header"
                        }, [4 === e.id && [3, 5, 9, 16].includes(t.tutorialStep) || 1 === e.id && [18, 21].includes(t.tutorialStep) || 5 === e.id && [20].includes(t.tutorialStep) ? a("div", {
                            staticClass: "tutorial-pointer is-right"
                        }) : t._e(), t._v(" "), a("div", {
                            staticClass: "main"
                        }, [t._v("\n        " + t._s(e.name) + "\n        "), ["asteroid_belt", "gaseous_giant"].includes(e.type) ? a("span", {
                            staticClass: "small"
                        }, [t._v("\n          / " + t._s(t.$t("data.stellar_body." + e.type + ".name")) + "\n        ")]) : t._e()]), t._v(" "), "hidden" === e.population ? a("div", {
                            staticClass: "secondary"
                        }, [a("span", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("data.bonus_pipeline_in.body_pop.name"),
                                expression: "$t(`data.bonus_pipeline_in.body_pop.name`)"
                            }],
                            staticClass: "potential-item"
                        }, [a("span", [t._v("░░░")]), t._v(" "), a("svgicon", {
                            attrs: {
                                name: "stellar_body/population"
                            }
                        })], 1)]) : e.population > 0 ? a("div", {
                            staticClass: "secondary"
                        }, [a("span", {
                            directives: [{
                                name: "tooltip",
                                rawName: "v-tooltip",
                                value: t.$t("data.bonus_pipeline_in.body_pop.name"),
                                expression: "$t(`data.bonus_pipeline_in.body_pop.name`)"
                            }],
                            staticClass: "potential-item",
                            class: {
                                "f-1": e.population < 5, "f-5": e.population > 12
                            }
                        }, [a("span", [t._v(t._s(e.population))]), t._v(" "), a("svgicon", {
                            attrs: {
                                name: "stellar_body/population"
                            }
                        })], 1)]) : t._e()]), t._v(" "), a("system-bodies-item", {
                            attrs: {
                                body: e,
                                isOwnSystem: t.isOwnSystem,
                                system: t.system,
                                visibility: t.system.contact.value
                            },
                            on: {
                                enterTile: t.enterTile,
                                leaveTile: t.leaveTile
                            }
                        }), t._v(" "), t._l(e.bodies, (function(e) {
                            return a("system-bodies-item", {
                                key: e.uid,
                                attrs: {
                                    body: e,
                                    isOwnSystem: t.isOwnSystem,
                                    system: t.system,
                                    visibility: t.system.contact.value
                                },
                                on: {
                                    enterTile: t.enterTile,
                                    leaveTile: t.leaveTile
                                }
                            })
                        }))], 2)
                    })), t._v(" "), t.hoveredTile && 5 === t.system.contact.value ? a("div", {
                        staticClass: "system-building-card",
                        class: {
                            "has-margin-bottom": t.hoveredTile.showCost
                        }
                    }, [a("building-card", {
                        attrs: {
                            buildingKey: t.hoveredTile.tile.building_key,
                            level: t.hoveredTile.tile.building_level,
                            body: t.hoveredTile.body,
                            system: t.system,
                            theme: t.color,
                            showCost: t.hoveredTile.showCost
                        }
                    })], 1) : t._e()], 2)
                }), [], !1, null, null, null).exports,
                Ms = {
                    name: "population-value",
                    mixins: [Oe],
                    data: function() {
                        return {
                            value: void 0
                        }
                    },
                    props: {
                        initial: Object
                    },
                    computed: {
                        integerValue: function() {
                            return 1e9 * this.value
                        }
                    },
                    watch: {
                        initial: function(t) {
                            this.value = t.value
                        }
                    },
                    methods: {
                        updateValue: function(t) {
                            this.value += t * (this.initial.change / 50)
                        }
                    },
                    created: function() {
                        this.value = this.initial.value
                    }
                },
                js = Object(Ft.a)(Ms, (function() {
                    var t = this.$createElement;
                    return (this._self._c || t)("span", [this._v(this._s(this._f("integer")(this.integerValue)))])
                }), [], !1, null, null, null).exports,
                As = {
                    name: "system-details",
                    props: {
                        system: Object,
                        isOwnSystem: Boolean,
                        color: String
                    },
                    components: {
                        ResourceDetail: We,
                        PopulationValue: js
                    }
                },
                Es = Object(Ft.a)(As, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "system-content-group"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.infrastructure")) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [a("span", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("resource-description.mobility"),
                            expression: "$t(`resource-description.mobility`)"
                        }],
                        staticClass: "info"
                    }, [t._v("?")]), t._v("\n        " + t._s(t.$t("galaxy.system.details.mobility")) + "\n      ")]), t._v(" "), t.system.mobility ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.mobility.value)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/mobility"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.mobility"),
                            value: t.system.mobility.value,
                            details: t.system.mobility.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/mobility"
                        }
                    })], 1)])], 1), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.workforce")) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "details-value"
                    }, [a("div", {
                        staticClass: "yield-box large"
                    }, [t.system.population ? a("population-value", {
                        attrs: {
                            initial: t.system.population
                        }
                    }) : a("span", [t._v("░░░░░░░░░")]), t._v(" "), a("svgicon", {
                        attrs: {
                            name: "resource/population"
                        }
                    })], 1)])])]), t._v(" "), a("div", {
                        staticClass: "system-content-group"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.military")) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [a("span", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("resource-description.radar"),
                            expression: "$t(`resource-description.radar`)"
                        }],
                        staticClass: "info"
                    }, [t._v("?")]), t._v("\n        " + t._s(t.$t("galaxy.system.details.radar")) + "\n      ")]), t._v(" "), t.system.radar ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.radar.value)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/radar"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.radar"),
                            value: t.system.radar.value,
                            details: t.system.radar.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/radar"
                        }
                    })], 1)])], 1), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.fighters_init_xp")) + "\n      ")]), t._v(" "), t.system.fighter_lvl ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.fighter_lvl.value)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/fighter_lvl"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.experience"),
                            value: t.system.fighter_lvl.value,
                            details: t.system.fighter_lvl.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/fighter_lvl"
                        }
                    })], 1)])], 1), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.corvettes_init_xp")) + "\n      ")]), t._v(" "), t.system.corvette_lvl ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.corvette_lvl.value)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/corvette_lvl"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.experience"),
                            value: t.system.corvette_lvl.value,
                            details: t.system.corvette_lvl.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/corvette_lvl"
                        }
                    })], 1)])], 1), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.frigates_init_xp")) + "\n      ")]), t._v(" "), t.system.frigate_lvl ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.frigate_lvl.value)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/frigate_lvl"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.experience"),
                            value: t.system.frigate_lvl.value,
                            details: t.system.frigate_lvl.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/frigate_lvl"
                        }
                    })], 1)])], 1), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.capital_ships_init_xp")) + "\n      ")]), t._v(" "), t.system.capital_lvl ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.capital_lvl.value)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/capital_lvl"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.experience"),
                            value: t.system.capital_lvl.value,
                            details: t.system.capital_lvl.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/capital_lvl"
                        }
                    })], 1)])], 1)]), t._v(" "), a("div", {
                        staticClass: "system-content-group"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v("\n        " + t._s(t.$t("galaxy.system.details.visibility")) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [a("span", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("resource-description.counter_intelligence"),
                            expression: "$t(`resource-description.counter_intelligence`)"
                        }],
                        staticClass: "info"
                    }, [t._v("?")]), t._v("\n        " + t._s(t.$t("galaxy.system.details.counterintelligence")) + "\n      ")]), t._v(" "), t.system.counter_intelligence ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.counter_intelligence.value)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/counter_intelligence"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.counterintelligence"),
                            value: t.system.counter_intelligence.value,
                            details: t.system.counter_intelligence.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/counter_intelligence"
                        }
                    })], 1)])], 1), t._v(" "), a("div", {
                        staticClass: "system-content-group-item"
                    }, [a("div", {
                        staticClass: "details-label"
                    }, [a("span", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("resource-description.remove_contact"),
                            expression: "$t(`resource-description.remove_contact`)"
                        }],
                        staticClass: "info"
                    }, [t._v("?")]), t._v("\n        " + t._s(t.$t("galaxy.system.details.fixing")) + "\n      ")]), t._v(" "), t.system.remove_contact ? a("v-popover", {
                        staticClass: "details-value",
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.system.remove_contact.change)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/remove_contact"
                        }
                    })], 1), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("galaxy.system.details.fixing"),
                            value: t.system.remove_contact.change,
                            details: t.system.remove_contact.details
                        },
                        slot: "popover"
                    })], 1) : a("div", [a("div", {
                        staticClass: "yield-box"
                    }, [t._v("\n          ░░░ "), a("svgicon", {
                        attrs: {
                            name: "resource/remove_contact"
                        }
                    })], 1)])], 1)])])
                }), [], !1, null, null, null).exports,
                Ns = {
                    name: "system-state",
                    props: {
                        system: Object,
                        isOwnProperty: Boolean,
                        color: String
                    },
                    computed: {
                        constant: function() {
                            return this.$store.state.game.data.constant[0]
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        isLastSystem: function() {
                            return this.player.stellar_systems.length <= 1
                        },
                        ownerName: function() {
                            return this.system.owner ? this.system.owner.name : ""
                        },
                        abandonmentCost: function() {
                            return this.constant.abandonment_cost
                        },
                        transformCost: function() {
                            return this.constant.transform_initial_cost + this.player.transformed_system_count * this.constant.transform_additional_cost
                        }
                    },
                    methods: {
                        pushAction: function(t) {
                            var e = this;
                            this.$socket.player.push(t, {
                                system_id: this.system.id
                            }).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        }
                    },
                    components: {
                        SystemPopulationStatus: ks
                    }
                },
                Ds = Object(Ft.a)(Ns, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", [a("div", {
                        staticClass: "system-content-group"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v("\n        " + t._s(t.$t("system.system_owner_title")) + "\n      ")])]), t._v(" "), t.isOwnProperty ? a("div", {
                        staticClass: "system-content-group-info",
                        domProps: {
                            innerHTML: t._s(t.$tmd("system.status.own_" + t.system.status))
                        }
                    }) : a("div", {
                        staticClass: "system-content-group-info",
                        domProps: {
                            innerHTML: t._s(t.$tmd("system.status." + t.system.status, {
                                player: t.ownerName
                            }))
                        }
                    })]), t._v(" "), ["uninhabitable", "uninhabited"].includes(t.system.status) ? t._e() : a("system-population-status", {
                        attrs: {
                            system: t.system,
                            color: t.color
                        }
                    }), t._v(" "), t.isOwnProperty ? a("div", {
                        staticClass: "system-content-group"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v("\n        " + t._s(t.$t("system.system_state_title")) + "\n      ")])]), t._v(" "), "inhabited_player" === t.system.status ? [a("div", {
                        staticClass: "button",
                        class: {
                            disabled: t.isLastSystem
                        },
                        on: {
                            click: function(e) {
                                return t.pushAction("transform_system_to_dominion")
                            }
                        }
                    }, [a("div", {
                        class: {
                            dashed: t.isLastSystem
                        }
                    }, [t._v("\n          " + t._s(t.$t("system.transform_to_dominion")) + "\n        ")]), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.transformCost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "button",
                        class: {
                            disabled: t.isLastSystem
                        },
                        on: {
                            click: function(e) {
                                return t.pushAction("abandon_system")
                            }
                        }
                    }, [a("div", {
                        class: {
                            dashed: t.isLastSystem
                        }
                    }, [t._v("\n          " + t._s(t.$t("system.abandon_system")) + "\n        ")]), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.abandonmentCost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1)])] : t._e(), t._v(" "), "inhabited_dominion" === t.system.status ? [a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.pushAction("transform_dominion_to_system")
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("system.transform_to_system")))]), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.transformCost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "button",
                        on: {
                            click: function(e) {
                                return t.pushAction("abandon_dominion")
                            }
                        }
                    }, [a("div", [t._v(t._s(t.$t("system.abandon_dominion")))]), t._v(" "), a("div", {
                        staticClass: "icon-value"
                    }, [t._v("\n          " + t._s(t._f("integer")(t.abandonmentCost)) + "\n          "), a("svgicon", {
                        attrs: {
                            name: "resource/ideology"
                        }
                    })], 1)])] : t._e()], 2) : t._e()], 1)
                }), [], !1, null, null, null).exports,
                Is = {
                    name: "system-content",
                    data: function() {
                        return {
                            activeTab: 0
                        }
                    },
                    props: {
                        system: Object,
                        isOwnSystem: Boolean,
                        isOwnProperty: Boolean,
                        color: String,
                        hoveredOrbit: Number
                    },
                    computed: {
                        tabs: function() {
                            return ["uninhabitable", "uninhabited"].includes(this.system.status) ? [
                                ["bodies", "state"]
                            ] : [
                                ["bodies"],
                                ["details"],
                                ["state"]
                            ]
                        }
                    },
                    methods: {
                        enterOrbit: function(t) {
                            this.$emit("enterOrbit", t)
                        }
                    },
                    mounted: function() {
                        (new l.e).set(this.$refs.container, {
                            left: -500
                        }).to(this.$refs.container, {
                            left: 0,
                            ease: l.a.easeOut,
                            duration: 1
                        }, 0)
                    },
                    components: {
                        SystemBodies: Ts,
                        SystemDetails: Es,
                        SystemState: Ds
                    }
                },
                Ls = Object(Ft.a)(Is, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        ref: "container",
                        staticClass: "system-content-container"
                    }, [t.system.contact.value > 0 ? [t.tabs.length > 1 ? a("div", {
                        staticClass: "system-content-menu"
                    }, t._l(t.tabs, (function(e, s) {
                        return a("div", {
                            key: "tab-" + s,
                            staticClass: "system-tab-item",
                            class: {
                                active: s === t.activeTab
                            },
                            on: {
                                click: function(e) {
                                    t.activeTab = s
                                }
                            }
                        })
                    })), 0) : t._e(), t._v(" "), t.system.bodies.length > 0 ? a("v-scrollbar", {
                        staticClass: "system-content-scrollbar",
                        attrs: {
                            settings: {
                                wheelPropagation: !1
                            }
                        }
                    }, [t.activeTab >= 0 && t.tabs[t.activeTab].includes("bodies") ? a("system-bodies", {
                        attrs: {
                            system: t.system,
                            isOwnSystem: t.isOwnSystem,
                            color: t.color,
                            hoveredOrbit: t.hoveredOrbit
                        },
                        on: {
                            enterOrbit: t.enterOrbit,
                            leaveOrbit: function(e) {
                                return t.$emit("leaveOrbit")
                            }
                        }
                    }) : t._e(), t._v(" "), t.activeTab >= 0 && t.tabs[t.activeTab].includes("details") ? a("system-details", {
                        attrs: {
                            system: t.system,
                            isOwnSystem: t.isOwnSystem,
                            color: t.color
                        }
                    }) : t._e(), t._v(" "), t.activeTab >= 0 && t.tabs[t.activeTab].includes("state") ? a("system-state", {
                        attrs: {
                            system: t.system,
                            isOwnProperty: t.isOwnProperty,
                            color: t.color
                        }
                    }) : t._e()], 1) : a("div", {
                        staticClass: "system-content-orphan"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v(t._s(t.$t("system.empty_system.label")))])]), t._v(" "), a("p", [t._v(t._s(t.$t("system.empty_system.content")))])])] : [a("div", {
                        staticClass: "system-content-orphan"
                    }, [a("div", {
                        staticClass: "system-content-group-header"
                    }, [a("div", {
                        staticClass: "main"
                    }, [t._v(t._s(t.$t("system.hidden_system.label")))])]), t._v(" "), a("p", [t._v(t._s(t.$t("system.hidden_system.content")))])])]], 2)
                }), [], !1, null, null, null).exports,
                Bs = a(25),
                Rs = {
                    name: "closed-production-card",
                    mixins: [Rt.a],
                    props: {
                        production: Object,
                        systemId: Number
                    },
                    computed: {
                        speed: function() {
                            return this.$store.state.game.time.speed
                        }
                    },
                    methods: {
                        cancelProduction: function() {
                            var t = this;
                            this.$socket.player.push("cancel_production", {
                                system_id: this.systemId,
                                production_id: this.production.id
                            }).receive("error", (function(e) {
                                t.$toastError(e.reason)
                            }))
                        }
                    }
                },
                zs = Object(Ft.a)(Rs, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container closed",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, ["ship" === t.production.type ? a("svgicon", {
                        attrs: {
                            name: "ship/" + t.production.prod_key
                        }
                    }) : a("svgicon", {
                        attrs: {
                            name: "building/" + t.production.prod_key
                        }
                    }), t._v(" "), "building" === t.production.type ? a("span", {
                        staticClass: "level"
                    }, [t._v("\n        " + t._s(t.production.prod_level) + "\n      ")]) : t._e()], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large nowrap"
                    }, ["ship" === t.production.type ? [t._v("\n          " + t._s(t.$t("data.ship." + t.production.prod_key + ".name")) + "\n        ")] : ["building" === t.production.type && t.production.prod_level > 1 ? a("svgicon", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.building.production.upgrade"),
                            expression: "$t('card.building.production.upgrade')"
                        }],
                        staticClass: "title-toast",
                        attrs: {
                            name: "caret-up"
                        }
                    }) : "building_repairs" === t.production.type ? a("svgicon", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.building.production.repair"),
                            expression: "$t('card.building.production.repair')"
                        }],
                        staticClass: "title-toast",
                        attrs: {
                            name: "check"
                        }
                    }) : t._e(), t._v("\n          " + t._s(t.$t("data.building." + t.production.prod_key + ".name")) + "\n        ")]], 2), t._v(" "), "fast" !== t.speed ? a("div", {
                        staticClass: "title-small"
                    }, [t._v("\n        " + t._s(t._f("luxon-std")(t.production.timestamp)) + "\n      ")]) : t._e()]), t._v(" "), a("div", {
                        staticClass: "card-header-toast hidden"
                    }, [a("svgicon", {
                        attrs: {
                            name: "close"
                        },
                        on: {
                            click: t.cancelProduction
                        }
                    })], 1)])])
                }), [], !1, null, null, null).exports,
                Fs = {
                    name: "system-production",
                    data: function() {
                        return {
                            hoveredTile: {},
                            showAllShips: !1
                        }
                    },
                    props: {
                        system: Object,
                        color: String,
                        isQueueOpen: Boolean
                    },
                    computed: {
                        tickToMilisecondFactor: function() {
                            return this.$store.getters["game/tickToMilisecondFactor"]
                        },
                        production: function() {
                            return this.$store.state.game.production
                        },
                        character: function() {
                            return this.$store.state.game.selectedCharacter
                        },
                        patents: function() {
                            return this.$store.state.game.player.patents
                        },
                        productionType: function() {
                            return this.production ? this.production.data.type : ""
                        },
                        body: function() {
                            return "building" === this.productionType ? this.getBody(this.system, this.production.data.targetId) : null
                        },
                        tile: function() {
                            var t = this;
                            return "building" === this.productionType ? this.body.tiles.find((function(e) {
                                return e.id === t.production.data.tileId
                            })) : null
                        },
                        categories: function() {
                            var t = this,
                                e = this.items.reduce((function(e, a) {
                                    return "building" === t.productionType ? e.add(a.data.display) : e.add(a.data.class)
                                }), new Set);
                            return Array.from(e)
                        },
                        items: function() {
                            return "building" === this.productionType ? this.buildings : this.ships
                        },
                        productions: function() {
                            var t = this;
                            return this.system.queue.queue.reduce((function(e, a) {
                                e.prod += a.remaining_prod;
                                var s = e.prod / t.system.production.value;
                                return a.timestamp = Math.round(t.system.receivedAt + s * t.tickToMilisecondFactor), e.queue.push(a), e
                            }), {
                                queue: [],
                                prod: 0
                            }).queue
                        },
                        buildings: function() {
                            var t = this,
                                e = this.$store.state.game.data.stellar_body.find((function(e) {
                                    return e.key === t.body.type
                                })).biome;
                            return this.$store.state.game.data.building.filter((function(a) {
                                return a.biome === e && a.type === t.tile.type
                            })).map((function(e) {
                                var a = e.levels[0].patent,
                                    s = "buildable",
                                    i = "";
                                if (null !== a && !t.patents.some((function(t) {
                                    return t === a
                                }))) {
                                    var n = Bs.c.t("data.patent.".concat(a, ".name"));
                                    s = "locked", i = t.$t("production.patent_needed", {
                                        patentName: n
                                    })
                                }
                                return "unique_body" === e.limitation && t.body.tiles.find((function(t) {
                                    return t.building_key === e.key
                                })) && (s = "disabled", i = t.$t("production.unique_building")), "unique_system" === e.limitation && t.buildingExist(t.system.bodies, e.key) && (s = "disabled", i = t.$t("production.unique_system")), {
                                    data: e,
                                    status: s,
                                    message: i
                                }
                            }))
                        },
                        ships: function() {
                            var t = this,
                                e = this.$store.state.game.data.ship.map((function(e) {
                                    var a = e.shipyard,
                                        s = e.patent,
                                        i = "buildable",
                                        n = "";
                                    if (a && !t.buildingBuilt(t.system.bodies, a)) {
                                        var r = Bs.c.t("data.building.".concat(a, ".name"));
                                        i = "locked", n = t.$t("production.building_needed", {
                                            buildingName: r
                                        })
                                    }
                                    var o = t.$store.state.game.data.ship.filter((function(t) {
                                        return t.model === e.model && t.unit_count < e.unit_count
                                    })).every((function(e) {
                                        return t.patents.some((function(t) {
                                            return t === e.patent
                                        }))
                                    }));
                                    if (!(null === s || o && t.patents.some((function(t) {
                                        return t === s
                                    })))) {
                                        var c = Bs.c.t("data.patent.".concat(s, ".name"));
                                        i = "locked", n = t.$t("production.patent_needed", {
                                            patentName: c
                                        })
                                    }
                                    return {
                                        data: e,
                                        status: i,
                                        message: n
                                    }
                                }));
                            if (!this.showAllShips) {
                                var a = e.reduce((function(t, e) {
                                    return t[e.data.model] || (t[e.data.model] = []), t[e.data.model].push(e), t
                                }), {});
                                e = Object.keys(a).map((function(t) {
                                    var e = a[t].sort((function(t, e) {
                                            return e.data.unit_count - t.data.unit_count
                                        })),
                                        s = e.find((function(t) {
                                            return "locked" !== t.status
                                        }));
                                    return s || (s = e[e.length - 1]), s
                                }))
                            }
                            return e
                        }
                    },
                    methods: {
                        enterTile: function(t, e, a) {
                            this.hoveredTile = {
                                data: t,
                                message: e,
                                type: a
                            }
                        },
                        leaveTile: function() {
                            this.hoveredTile = {}
                        },
                        order: function(t, e, a) {
                            var s = this;
                            if ("buildable" === e) {
                                var i = "building" === a ? {
                                    target_id: this.body.uid,
                                    tile_id: this.tile.id,
                                    prod_key: t.key,
                                    prod_level: 1,
                                    type: "build"
                                } : {
                                    target_id: this.character.id,
                                    tile_id: this.production.data.tileId,
                                    prod_key: t.key
                                };
                                "building" === a ? this.$ambiance.sound("order-building") : this.$ambiance.sound("order-ship"), this.$socket.player.push("order_".concat(a), {
                                    system_id: this.system.id,
                                    production_data: i
                                }).receive("ok", (function() {
                                    s.nextTile()
                                })).receive("error", (function(t) {
                                    s.$toastError(t.reason)
                                }))
                            }
                        },
                        nextTile: function() {
                            var t = this;
                            if ("building" === this.productionType) {
                                var e = {
                                        playerPatents: this.patents,
                                        bodiesData: this.$store.state.game.data.stellar_body,
                                        buildingsData: this.$store.state.game.data.building
                                    },
                                    a = ws.findEmptyTile(this.system.bodies, this.body.uid, this.tile.id, {
                                        lookingNext: !1,
                                        found: !1
                                    }, e);
                                a.found ? this.$store.commit("game/prepareProduction", {
                                    systemId: this.systemId,
                                    data: {
                                        type: "building",
                                        targetId: a.body.uid,
                                        tileId: a.tile.id
                                    }
                                }) : this.$store.commit("game/clearProduction")
                            } else {
                                var s = this.character.army.tiles.find((function(e) {
                                    return e.id > t.production.data.tileId && "empty" === e.ship_status
                                }));
                                s || (s = this.character.army.tiles.find((function(t) {
                                    return t.id > 0 && "empty" === t.ship_status
                                }))), s && s.id !== this.production.data.tileId ? this.$store.commit("game/prepareProduction", {
                                    systemId: this.character.system,
                                    data: {
                                        type: "ship",
                                        targetId: this.character.id,
                                        tileId: s.id
                                    }
                                }) : this.$store.commit("game/clearProduction")
                            }
                        },
                        itemByCategory: function(t) {
                            return "building" === this.productionType ? this.items.filter((function(e) {
                                return e.data.display === t
                            })) : this.items.filter((function(e) {
                                return e.data.class === t
                            }))
                        },
                        getBody: function(t, e) {
                            for (var a = 0; a < t.bodies.length; a += 1) {
                                var s = t.bodies[a];
                                if (s.uid === e) return s;
                                var i = s.bodies.find((function(t) {
                                    return t.uid === e
                                }));
                                if (i) return i
                            }
                            return null
                        },
                        buildingExist: function(t, e) {
                            var a = this;
                            return t.reduce((function(t, s) {
                                var i = s.tiles.some((function(t) {
                                        return t.building_key === e
                                    })),
                                    n = a.buildingExist(s.bodies, e);
                                return t || i || n
                            }), !1)
                        },
                        buildingBuilt: function(t, e) {
                            var a = this;
                            return t.reduce((function(t, s) {
                                var i = s.tiles.some((function(t) {
                                        return t.building_key === e && "built" === t.building_status
                                    })),
                                    n = a.buildingBuilt(s.bodies, e);
                                return t || i || n
                            }), !1)
                        }
                    },
                    components: {
                        BuildingCard: xa,
                        ShipCard: Ke,
                        ClosedProductionCard: zs
                    }
                },
                Hs = {
                    name: "system-view",
                    data: function() {
                        return {
                            isQueueOpen: !1,
                            rerenderKey: 0,
                            hoveredOrbit: void 0
                        }
                    },
                    computed: {
                        color: function() {
                            return ["inhabited_player", "inhabited_dominion"].includes(this.system.status) ? this.$store.getters["game/themeByKey"](this.system.owner.faction) : "null"
                        },
                        system: function() {
                            return this.$store.state.game.selectedSystem
                        },
                        isOwnSystem: function() {
                            var t = this;
                            return this.$store.state.game.player.stellar_systems.some((function(e) {
                                return e.id === t.system.id
                            }))
                        },
                        isOwnDominion: function() {
                            var t = this;
                            return this.$store.state.game.player.dominions.some((function(e) {
                                return e.id === t.system.id
                            }))
                        },
                        isOwnProperty: function() {
                            return this.isOwnSystem || this.isOwnDominion
                        }
                    },
                    watch: {
                        system: function(t, e) {
                            t.id !== e.id && this.leaveOrbit()
                        }
                    },
                    methods: {
                        toggleProductionQueue: function() {
                            this.isOwnSystem && (this.$store.commit("game/clearProduction"), this.isQueueOpen = !this.isQueueOpen)
                        },
                        enterOrbit: function(t) {
                            this.hoveredOrbit = t
                        },
                        leaveOrbit: function() {
                            this.hoveredOrbit = void 0
                        },
                        handleResize: function() {
                            this.rerenderKey += 1
                        }
                    },
                    mounted: function() {
                        window.addEventListener("resize", this.handleResize)
                    },
                    beforeDestroy: function() {
                        window.removeEventListener("resize", this.handleResize)
                    },
                    components: {
                        SystemSvg: us,
                        SystemContent: Ls,
                        SystemProperties: hs,
                        SystemActions: _s,
                        SystemPopulation: gs,
                        SystemProduction: Object(Ft.a)(Fs, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return t.isQueueOpen || t.production ? a("div", {
                                staticClass: "system-production",
                                class: {
                                    "has-background": t.production
                                }
                            }, [t.production ? [a("div", {
                                staticClass: "system-production-header"
                            }, ["building" === t.productionType ? [a("svgicon", {
                                attrs: {
                                    name: "stellar_body/" + t.body.type
                                }
                            }), t._v(" "), a("span", [t._v(t._s(t.$t("production.build_on")))]), t._v(" "), a("strong", [t._v(t._s(t.body.name))])] : [a("svgicon", {
                                attrs: {
                                    name: "agent/admiral"
                                }
                            }), t._v(" "), a("span", [t._v(t._s(t.$t("production.order_for")))]), t._v(" "), a("strong", [t._v(t._s(t.character.name))]), t._v(" "), a("div", {
                                staticClass: "header-button",
                                on: {
                                    click: function(e) {
                                        t.showAllShips = !t.showAllShips
                                    }
                                }
                            }, [t.showAllShips ? a("span", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: t.$t("production.hide_all_ships"),
                                    expression: "$t('production.hide_all_ships')"
                                }]
                            }, [t._v("−")]) : a("span", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: t.$t("production.shows_all_ships"),
                                    expression: "$t('production.shows_all_ships')"
                                }]
                            }, [t._v("+")])])]], 2), t._v(" "), a("v-scrollbar", {
                                staticClass: "system-production-content",
                                attrs: {
                                    settings: {
                                        wheelPropagation: !1
                                    }
                                }
                            }, t._l(t.categories, (function(e) {
                                return a("div", {
                                    key: e,
                                    staticClass: "system-production-category"
                                }, t._l(t.itemByCategory(e), (function(e) {
                                    var s = e.data,
                                        i = e.status,
                                        n = e.message;
                                    return a("div", {
                                        key: s.key
                                    }, [a("div", {
                                        staticClass: "tile",
                                        class: {
                                            "is-hoverable": "buildable" === i, "has-dashed-background": "locked" === i
                                        },
                                        on: {
                                            click: function(e) {
                                                return t.order(s, i, t.productionType)
                                            },
                                            mouseenter: function(e) {
                                                return t.enterTile(s, n, t.productionType)
                                            },
                                            mouseleave: function(e) {
                                                return t.leaveTile()
                                            }
                                        }
                                    }, ["locked" === i ? a("svgicon", {
                                        staticClass: "tile-icon is-transparent is-small",
                                        attrs: {
                                            name: "unlock"
                                        }
                                    }) : ["building" === t.productionType ? a("svgicon", {
                                        staticClass: "tile-icon",
                                        class: {
                                            "is-transparent": "disabled" === i
                                        },
                                        attrs: {
                                            name: "building/" + s.key
                                        }
                                    }) : a("svgicon", {
                                        staticClass: "tile-icon",
                                        class: {
                                            "is-transparent": "disabled" === i
                                        },
                                        attrs: {
                                            name: "ship/" + s.key
                                        }
                                    })]], 2)])
                                })), 0)
                            })), 0), t._v(" "), "building" === t.hoveredTile.type ? a("div", {
                                staticClass: "system-production-building-card"
                            }, [a("building-card", {
                                attrs: {
                                    buildingKey: t.hoveredTile.data.key,
                                    level: 1,
                                    body: t.body,
                                    system: t.system,
                                    showCost: !0,
                                    theme: t.color,
                                    disabled: t.hoveredTile.message
                                }
                            })], 1) : t._e(), t._v(" "), "ship" === t.hoveredTile.type ? a("div", {
                                staticClass: "system-production-ship-card"
                            }, [a("ship-card", {
                                attrs: {
                                    shipKey: t.hoveredTile.data.key,
                                    showCost: !0,
                                    theme: t.color,
                                    system: t.system,
                                    disabled: t.hoveredTile.message,
                                    initialXP: 0
                                }
                            })], 1) : t._e()] : t.isQueueOpen && t.system.queue ? a("v-scrollbar", {
                                staticClass: "system-production-queue",
                                staticStyle: {
                                    width: "310px"
                                },
                                attrs: {
                                    settings: {
                                        wheelPropagation: !1
                                    }
                                }
                            }, t._l(t.productions, (function(e) {
                                return a("closed-production-card", {
                                    key: "production-" + e.id,
                                    attrs: {
                                        production: e,
                                        systemId: t.system.id,
                                        theme: t.color
                                    }
                                })
                            })), 1) : t._e()], 2) : t._e()
                        }), [], !1, null, null, null).exports
                    }
                },
                qs = {
                    name: "selection-view",
                    data: function() {
                        return {
                            hoveredAction: void 0
                        }
                    },
                    computed: {
                        constant: function() {
                            return this.$store.state.game.data.constant[0]
                        },
                        speed: function() {
                            return this.$store.state.game.time.speed
                        },
                        tickToMilisecondFactor: function() {
                            return this.$store.getters["game/tickToMilisecondFactor"]
                        },
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        character: function() {
                            return this.$store.state.game.selectedCharacter
                        },
                        playerCharacters: function() {
                            return this.$store.state.game.player.characters
                        },
                        shipsData: function() {
                            return this.$store.state.game.data.ship
                        },
                        isAtHome: function() {
                            var t = this;
                            return !!this.$store.state.game.player.stellar_systems.find((function(e) {
                                return e.id === t.character.system
                            })) || !!this.$store.state.game.player.dominions.find((function(e) {
                                return e.id === t.character.system
                            }))
                        },
                        isIdleAndAtHome: function() {
                            return !("spy" === this.character.type && this.character.spy.cover.value <= this.constant.cover_threshold) && (!("speaker" === this.character.type && this.character.speaker && this.character.speaker.cooldown.value > 0) && (["idle", "docking"].includes(this.character.action_status) && this.isAtHome))
                        },
                        isArmyFullLife: function() {
                            var t = this;
                            return "admiral" === this.character.type && this.character.army.tiles.every((function(e) {
                                if ("filled" !== e.ship_status) return !0;
                                var a = t.shipsData.find((function(t) {
                                        return t.key === e.ship.key
                                    })),
                                    s = a.unit_hull * a.unit_count;
                                return e.ship.units.reduce((function(t, e) {
                                    return e.hull + t
                                }), 0) === s
                            }))
                        },
                        queue: function() {
                            var t = this;
                            return this.character.actions.queue.reduce((function(e, a) {
                                var s = e.queue,
                                    i = e.timestamp;
                                if ("fast" !== t.speed)
                                    if ("unknown_yet" === a.remaining_time) a.timestamp = t.$t("galaxy.selection.view.unknown_action_time"), i = "unknown_yet";
                                    else if ("unknown_yet" === i) a.timestamp = t.$t("galaxy.selection.view.unknown_time"), i = "unknown_yet";
                                    else {
                                        var n = t.character.receivedAt + (i + a.remaining_time) * t.tickToMilisecondFactor;
                                        a.timestamp = t.$t("galaxy.selection.view.timestamp", {
                                            date: t.$options.filters["luxon-std"](n)
                                        }), i += a.remaining_time
                                    }
                                return s.push(a), {
                                    queue: s,
                                    timestamp: i
                                }
                            }), {
                                queue: [],
                                timestamp: 0
                            }).queue
                        }
                    },
                    watch: {
                        playerCharacters: function(t) {
                            var e = this;
                            t.find((function(t) {
                                return t.id === e.character.id
                            })) || this.$store.dispatch("game/unselectCharacter")
                        }
                    },
                    methods: {
                        close: function() {
                            this.$store.dispatch("game/unselectCharacter")
                        },
                        centerToPosition: function() {
                            this.$root.$emit("map:centerToCharacter", this.character)
                        },
                        clearAfter: function(t) {
                            var e = this;
                            t > 0 && this.$socket.player.push("clear_character_actions", {
                                character_id: this.character.id,
                                index: t
                            }).receive("ok", (function() {
                                e.leaveAction()
                            })).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        },
                        deactivate: function() {
                            var t = this;
                            if (this.isIdleAndAtHome) {
                                var e = this.character.id;
                                this.$store.dispatch("game/unselectCharacter"), this.$socket.player.push("deactivate_character", {
                                    character_id: e
                                }).receive("error", (function(e) {
                                    t.$toastError(e.reason)
                                }))
                            }
                        },
                        enterAction: function(t) {
                            t > 0 && (this.hoveredAction = t)
                        },
                        leaveAction: function() {
                            this.hoveredAction = void 0
                        }
                    },
                    mounted: function() {
                        (new l.e).set(this.$refs.container, {
                            right: -500,
                            opacity: 0
                        }).to(this.$refs.container, {
                            right: 0,
                            opacity: 1,
                            ease: l.a.easeOut,
                            duration: 1
                        }, 0)
                    },
                    components: {
                        CharacterCard: je,
                        CircleProgressValue: ps,
                        Army: Qe,
                        Spy: ts,
                        Speaker: as
                    }
                },
                Gs = {
                    name: "galaxy-container",
                    computed: {
                        selectedSystem: function() {
                            return this.$store.state.game.selectedSystem
                        },
                        selection: function() {
                            return this.$store.state.game.selectedCharacter
                        }
                    },
                    methods: {
                        closeStellarSystemView: function() {
                            this.$store.dispatch("game/closeSystem", this)
                        },
                        handleScroll: function(t) {
                            this.selectedSystem && !this.assignment && t.deltaY > 0 && this.closeStellarSystemView()
                        }
                    },
                    mounted: function() {
                        document.addEventListener("wheel", this.handleScroll)
                    },
                    destroyed: function() {
                        document.removeEventListener("wheel", this.handleScroll)
                    },
                    components: {
                        SystemView: Object(Ft.a)(Hs, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                class: "f-" + t.color
                            }, [a("div", {
                                staticClass: "stellar-system-view",
                                on: {
                                    click: function(e) {
                                        return t.$emit("closeStellarSystem")
                                    }
                                }
                            }), t._v(" "), t.system ? [a("system-production", {
                                attrs: {
                                    system: t.system,
                                    color: t.color,
                                    isQueueOpen: t.isQueueOpen
                                }
                            }), t._v(" "), a("div", {
                                staticClass: "system-content"
                            }, [a("system-actions", {
                                attrs: {
                                    isOwnSystem: t.isOwnSystem,
                                    isOwnProperty: t.isOwnProperty,
                                    system: t.system
                                }
                            }), t._v(" "), a("system-properties", {
                                attrs: {
                                    isOwnSystem: t.isOwnSystem,
                                    isOwnProperty: t.isOwnProperty,
                                    system: t.system,
                                    color: t.color
                                },
                                on: {
                                    toggleQueue: t.toggleProductionQueue
                                }
                            }), t._v(" "), a("system-svg", {
                                key: t.rerenderKey,
                                attrs: {
                                    hoveredOrbit: t.hoveredOrbit,
                                    system: t.system
                                },
                                on: {
                                    enterOrbit: t.enterOrbit,
                                    leaveOrbit: t.leaveOrbit
                                }
                            })], 1), t._v(" "), a("div", {
                                staticClass: "system-info"
                            }, [a("system-population", {
                                attrs: {
                                    isOwnSystem: t.isOwnSystem,
                                    system: t.system
                                }
                            }), t._v(" "), a("system-content", {
                                attrs: {
                                    isOwnSystem: t.isOwnSystem,
                                    isOwnProperty: t.isOwnProperty,
                                    system: t.system,
                                    color: t.color,
                                    hoveredOrbit: t.hoveredOrbit
                                },
                                on: {
                                    enterOrbit: t.enterOrbit,
                                    leaveOrbit: t.leaveOrbit
                                }
                            })], 1)] : t._e()], 2)
                        }), [], !1, null, null, null).exports,
                        SelectionView: Object(Ft.a)(qs, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                ref: "container",
                                staticClass: "selection-view-container",
                                class: "f-" + t.theme
                            }, [a("div", {
                                staticClass: "selection-view"
                            }, [a("div", {
                                staticClass: "selection-view-content"
                            }, [a("div", {
                                staticClass: "selection-status"
                            }, [a("div", {
                                staticClass: "selection-status-info",
                                domProps: {
                                    innerHTML: t._s(t.$tmd("galaxy.selection.view.state", {
                                        state: t.$t("data.character_action_status." + this.character.action_status + ".name")
                                    }))
                                }
                            }), t._v(" "), a("div", {
                                staticClass: "selection-status-actions"
                            }, [a("svgicon", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: t.$t("galaxy.selection.view.action_center"),
                                    expression: "$t('galaxy.selection.view.action_center')"
                                }],
                                attrs: {
                                    name: "disc"
                                },
                                on: {
                                    click: t.centerToPosition
                                }
                            }), t._v(" "), t.isIdleAndAtHome && !t.character.on_sold ? a("svgicon", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: t.$t("galaxy.selection.view.action_recall"),
                                    expression: "$t('galaxy.selection.view.action_recall')"
                                }],
                                attrs: {
                                    name: "drag"
                                },
                                on: {
                                    click: t.deactivate
                                }
                            }) : a("svgicon", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: t.$t("galaxy.selection.view.action_disabled"),
                                    expression: "$t('galaxy.selection.view.action_disabled')"
                                }],
                                staticClass: "disabled",
                                attrs: {
                                    name: "drag"
                                }
                            })], 1)]), t._v(" "), a("div", {
                                staticClass: "selection-actions"
                            }, [a("div", {
                                staticClass: "header"
                            }, [t._v("\n          " + t._s(t.$t("galaxy.selection.view.actions")) + "\n        ")]), t._v(" "), t.character.on_sold ? a("span", {
                                staticClass: "action-toast"
                            }, [t._v("\n          " + t._s(t.$t("galaxy.selection.view.on_sold")) + "\n        ")]) : t.character.on_strike ? a("span", {
                                staticClass: "action-toast"
                            }, [t._v("\n          " + t._s(t.$t("galaxy.selection.view.on_strike")) + "\n        ")]) : "spy" === t.character.type && t.character.spy.cover.value <= t.constant.cover_threshold ? a("span", {
                                staticClass: "action-toast"
                            }, [t._v("\n          " + t._s(t.$t("galaxy.selection.view.spy_discovered")) + "\n        ")]) : [a("div", t._l(t.queue, (function(e, s) {
                                return a("span", {
                                    directives: [{
                                        name: "tooltip",
                                        rawName: "v-tooltip",
                                        value: e.timestamp,
                                        expression: "action.timestamp"
                                    }],
                                    key: s,
                                    staticClass: "action-item",
                                    class: {
                                        faded: t.hoveredAction < s, clickable: s > 0
                                    },
                                    on: {
                                        mouseenter: function(e) {
                                            return t.enterAction(s)
                                        },
                                        mouseleave: t.leaveAction
                                    }
                                }, [0 === s && "unknown_yet" !== e.remaining_time ? [a("circle-progress-value", {
                                    attrs: {
                                        current: e.total_time - e.remaining_time,
                                        total: e.total_time,
                                        increase: 1,
                                        size: 20,
                                        width: 3,
                                        theme: t.theme
                                    }
                                }), t._v(" "), a("svgicon", {
                                    attrs: {
                                        name: "action/" + e.type
                                    }
                                }), t._v(" "), a("svgicon", {
                                    staticClass: "action-caret",
                                    attrs: {
                                        name: "caret-right"
                                    }
                                })] : [a("svgicon", {
                                    attrs: {
                                        name: "action/" + e.type
                                    },
                                    on: {
                                        click: function(e) {
                                            return t.clearAfter(s)
                                        }
                                    }
                                })]], 2)
                            })), 0), t._v(" "), 0 === t.character.actions.queue.length ? ["admiral" === t.character.type && t.character.army.repair_coef.value > 0 && !t.isArmyFullLife ? a("span", {
                                staticClass: "action-toast"
                            }, [t._v("\n              " + t._s(t.$t("galaxy.selection.view.ongoing_repair_work")) + "\n            ")]) : a("span", {
                                staticClass: "action-item"
                            })] : t._e()]], 2), t._v(" "), a("div", {
                                staticClass: "selection-data"
                            }, ["admiral" === t.character.type ? a("army", {
                                attrs: {
                                    theme: t.theme,
                                    context: "selection",
                                    character: t.character,
                                    isIdleAndAtHome: t.isIdleAndAtHome
                                }
                            }) : t._e(), t._v(" "), "spy" === t.character.type ? a("spy", {
                                attrs: {
                                    character: t.character
                                }
                            }) : t._e(), t._v(" "), "speaker" === t.character.type ? a("speaker", {
                                attrs: {
                                    character: t.character
                                }
                            }) : t._e()], 1)]), t._v(" "), a("div", {
                                staticClass: "selection-view-character"
                            }, [a("character-card", {
                                attrs: {
                                    closeable: !0,
                                    open: !0,
                                    character: t.character,
                                    theme: t.theme,
                                    lock: !0
                                }
                            })], 1), t._v(" "), a("div", {
                                staticClass: "selection-close",
                                on: {
                                    click: t.close
                                }
                            }, [t._v("\n      ×\n    ")])])])
                        }), [], !1, null, null, null).exports
                    }
                },
                Vs = Object(Ft.a)(Gs, (function() {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        attrs: {
                            id: "galaxy-container"
                        }
                    }, [this.selectedSystem ? e("system-view", {
                        on: {
                            closeStellarSystem: this.closeStellarSystemView
                        }
                    }) : this._e(), this._v(" "), this.selection ? e("selection-view") : this._e()], 1)
                }), [], !1, null, null, null).exports,
                Zs = {
                    name: "navbar-dynamic-value",
                    props: {
                        icon: String,
                        initial: Object
                    },
                    components: {
                        DynamicValue: Te
                    }
                },
                Ks = Object(Ft.a)(Zs, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "navbar-dynamic-value"
                    }, [a("div", {
                        staticClass: "label"
                    }, [a("svgicon", {
                        attrs: {
                            name: t.icon
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "values"
                    }, [a("div", {
                        staticClass: "value"
                    }, [a("dynamic-value", {
                        attrs: {
                            initial: t.initial
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "change"
                    }, [t._v("\n      " + t._s(t._f("signed")(t.initial.change)) + "\n    ")])])])
                }), [], !1, null, null, null).exports,
                Us = {
                    name: "navbar-maxed-value",
                    props: {
                        label: String,
                        value: Number,
                        maximum: Number
                    },
                    computed: {
                        isActive: function() {
                            return 0 !== this.maximum
                        },
                        position: function() {
                            return 0 === this.maximum ? 100 : this.value / this.maximum * 100
                        }
                    }
                },
                Ws = Object(Ft.a)(Us, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "navbar-maxed-value",
                        class: {
                            active: t.isActive
                        }
                    }, [a("div", {
                        staticClass: "value"
                    }, [t._v(t._s(t.value))]), t._v(" "), a("div", {
                        staticClass: "infos"
                    }, [a("div", {
                        staticClass: "label"
                    }, [t._v(t._s(t.label))]), t._v(" "), a("div", {
                        staticClass: "generic-progress-container"
                    }, [a("div", {
                        staticClass: "generic-progress-bar",
                        style: "width: " + t.position + "%;"
                    })])])])
                }), [], !1, null, null, null).exports,
                Ys = {
                    name: "navbar-panel-block",
                    data: function() {
                        return {
                            isOpen: !0
                        }
                    },
                    props: {
                        title: String
                    }
                },
                Qs = Object(Ft.a)(Ys, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "navbar-panel-block"
                    }, [a("div", {
                        staticClass: "navbar-panel-header",
                        on: {
                            click: function(e) {
                                t.isOpen = !t.isOpen
                            }
                        }
                    }, [a("h1", [a("span", [t._v(t._s(t.title))]), t._v(" "), a("svgicon", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.isOpen,
                            expression: "isOpen"
                        }],
                        staticClass: "icon",
                        attrs: {
                            name: "caret-down"
                        }
                    }), t._v(" "), a("svgicon", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isOpen,
                            expression: "!isOpen"
                        }],
                        staticClass: "icon",
                        attrs: {
                            name: "caret-up"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.isOpen,
                            expression: "isOpen"
                        }],
                        staticClass: "navbar-panel-content"
                    }, [t._t("default")], 2)])
                }), [], !1, null, null, null).exports,
                Js = {
                    name: "navbar-player",
                    computed: {
                        instanceId: function() {
                            return this.$store.state.game.auth.instance
                        },
                        activeProfile: function() {
                            return this.$store.state.portal.activeProfile
                        },
                        unreadMessages: function() {
                            return this.$store.getters["portal/unreadMessages"](this.instanceId)
                        }
                    },
                    methods: {
                        openPanel: function() {
                            this.$root.$emit("togglePanel", "messenger")
                        }
                    }
                },
                Xs = Object(Ft.a)(Js, (function() {
                    var t = this.$createElement,
                        e = this._self._c || t;
                    return e("div", {
                        staticClass: "navbar-player navbar-central-box",
                        on: {
                            click: this.openPanel
                        }
                    }, [e("div", {
                        staticClass: "navbar-player-image"
                    }, [e("img", {
                        attrs: {
                            src: "data/avatars/" + this.activeProfile.avatar
                        }
                    })]), this._v(" "), e("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: this.unreadMessages > 0,
                            expression: "unreadMessages > 0"
                        }],
                        staticClass: "navbar-player-message"
                    }, [this._v("\n    " + this._s(this.unreadMessages) + "\n  ")])])
                }), [], !1, null, null, null).exports,
                ti = {
                    name: "closed-system-card",
                    mixins: [Rt.a],
                    props: {
                        system: Object
                    },
                    methods: {
                        select: function() {
                            this.$emit("select", this.system)
                        }
                    }
                },
                ei = Object(Ft.a)(ti, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "card-container closed",
                        class: "f-" + t.theme,
                        on: {
                            click: t.select
                        }
                    }, [a("div", {
                        staticClass: "card-header"
                    }, [a("div", {
                        staticClass: "card-header-icon"
                    }, [a("svgicon", {
                        attrs: {
                            name: "stellar_system/" + t.system.type
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "card-header-content"
                    }, [a("div", {
                        staticClass: "title-large nowrap"
                    }, [t._v("\n        " + t._s(t.system.name) + "\n      ")]), t._v(" "), t.system.queue > 0 ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("card.closed_system.construction_queue"),
                            expression: "$t('card.closed_system.construction_queue')"
                        }],
                        staticClass: "title-actions"
                    }, t._l(t.system.queue, (function(t) {
                        return a("div", {
                            key: "build-" + t,
                            staticClass: "title-actions-item is-jump"
                        })
                    })), 0) : t._e()]), t._v(" "), t.system.siege ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip.left",
                            value: t.$t("data.character_action_status." + t.system.siege.type + ".name"),
                            expression: "$t(`data.character_action_status.${system.siege.type}.name`)",
                            modifiers: {
                                left: !0
                            }
                        }],
                        staticClass: "card-header-toast active colored"
                    }, [a("svgicon", {
                        attrs: {
                            name: "action/" + t.system.siege.type
                        }
                    })], 1) : t._e()])])
                }), [], !1, null, null, null).exports;

            function ai(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function si(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? ai(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : ai(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var ii = {
                    name: "character-deck-mini-panel",
                    mixins: [Ia],
                    data: function() {
                        return {
                            showAdmirals: !1,
                            showSpys: !1,
                            showSpeakers: !1,
                            flyingCard: null,
                            frozenCharacters: []
                        }
                    },
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        constant: function() {
                            return this.$store.state.game.data.constant[0]
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        characterDeck: function() {
                            var t = this,
                                e = this.player.character_deck;
                            return (this.showAdmirals || this.showSpys || this.showSpeakers) && (e = e.filter((function(e) {
                                return !!t.showAdmirals || "admiral" !== e.character.type
                            })).filter((function(e) {
                                return !!t.showSpys || "spy" !== e.character.type
                            })).filter((function(e) {
                                return !!t.showSpeakers || "speaker" !== e.character.type
                            }))), Array.from(e).sort((function(t, e) {
                                return e.character.experience.value - t.character.experience.value
                            }))
                        },
                        characters: function() {
                            return this.frozenCharacters.length > 0 ? this.frozenCharacters : this.characterDeck
                        }
                    },
                    methods: {
                        assign: function(t) {
                            var e = this,
                                a = t.systemId,
                                s = t.character,
                                i = t.mode,
                                n = t.box;
                            this.frozenCharacters = this.characterDeck, this.flyingCard = si({}, s);
                            var r = {
                                    top: n.top,
                                    left: n.left,
                                    transform: "rotate(0deg)",
                                    opacity: 1,
                                    display: "block"
                                },
                                o = "on_board" === i ? {
                                    top: n.top - 400,
                                    left: n.left + 100,
                                    transform: "rotate(10deg)",
                                    duration: .5
                                } : {
                                    top: n.top - 400,
                                    left: n.left - 100,
                                    transform: "rotate(-10deg)",
                                    duration: .5
                                };
                            new l.e({
                                onComplete: function() {
                                    e.flyingCard = null
                                }
                            }).set(this.$refs.flying, r).to(this.$refs.flying, o, 0).to(this.$refs.flying, {
                                opacity: 0,
                                display: "none",
                                duration: 1
                            }, 0), this.$socket.player.push("activate_character", {
                                system_id: a,
                                character_id: s.id,
                                mode: i
                            }).receive("ok", (function() {
                                setTimeout((function() {
                                    "on_board" === i && e.$store.dispatch("game/selectCharacter", {
                                        vm: e,
                                        id: s.id
                                    }), e.frozenCharacters = [], e.$emit("close")
                                }), 250)
                            })).receive("error", (function(t) {
                                e.flyingCard = null, e.$toastError(t.reason)
                            }))
                        },
                        dismiss: function(t) {
                            var e = this,
                                a = t.character,
                                s = t.box;
                            this.frozenCharacters = this.characterDeck, this.flyingCard = si({}, a);
                            var i = {
                                top: s.top,
                                left: s.left,
                                transform: "rotate(0deg)",
                                opacity: 1,
                                display: "block"
                            };
                            new l.e({
                                onComplete: function() {
                                    e.flyingCard = null, e.frozenCharacters = []
                                }
                            }).set(this.$refs.flying, i).to(this.$refs.flying, {
                                top: s.top + 500,
                                opacity: 0,
                                display: "none",
                                duration: .5
                            }, 0), this.$socket.player.push("dismiss_character", {
                                character_id: a.id
                            }).receive("error", (function(t) {
                                e.flyingCard = null, e.$toastError(t.reason)
                            }))
                        },
                        cardOpacity: function(t) {
                            return this.flyingCard && t.id === this.flyingCard.id ? 0 : 1
                        }
                    },
                    components: {
                        CharacterCard: je
                    }
                },
                ni = Object(Ft.a)(ii, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "mp-container",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "mp-header"
                    }, [a("div", {
                        staticClass: "mph-title"
                    }, [t._v("\n      " + t._s(t.$t("minipanel.character_deck.title")) + "\n      "), a("span", {
                        staticClass: "small"
                    }, [t._v("\n        " + t._s(t.player.character_deck.length) + "/" + t._s(t.constant.max_character_in_deck) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "mph-filter"
                    }, [a("div", {
                        staticClass: "mph-filter-item",
                        class: {
                            active: t.showAdmirals, inactive: !t.showAdmirals && (t.showSpys || t.showSpeakers)
                        },
                        on: {
                            click: function(e) {
                                t.showAdmirals = !t.showAdmirals
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$tc("data.character.admiral.name", 2)) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "mph-filter-item",
                        class: {
                            active: t.showSpys, inactive: !t.showSpys && (t.showAdmirals || t.showSpeakers)
                        },
                        on: {
                            click: function(e) {
                                t.showSpys = !t.showSpys
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$tc("data.character.spy.name", 2)) + "\n      ")]), t._v(" "), a("div", {
                        staticClass: "mph-filter-item",
                        class: {
                            active: t.showSpeakers, inactive: !t.showSpeakers && (t.showAdmirals || t.showSpys)
                        },
                        on: {
                            click: function(e) {
                                t.showSpeakers = !t.showSpeakers
                            }
                        }
                    }, [t._v("\n        " + t._s(t.$tc("data.character.speaker.name", 2)) + "\n      ")])]), t._v(" "), a("div", {
                        staticClass: "mph-close-button",
                        on: {
                            click: t.close
                        }
                    })]), t._v(" "), a("v-scrollbar", {
                        staticClass: "mp-scrollbar",
                        attrs: {
                            settings: {
                                wheelPropagation: !1,
                                suppressScrollY: !0,
                                useBothWheelAxes: !0
                            }
                        }
                    }, [a("div", {
                        staticClass: "mp-content",
                        style: {
                            height: t.height + "px"
                        }
                    }, [0 === t.characterDeck.length ? a("div", {
                        staticClass: "mpc-empty-state"
                    }, [a("h2", [t._v(t._s(t.$t("minipanel.character_deck.empty_state_title")))]), t._v(" "), a("p", [t._v(t._s(t.$t("minipanel.character_deck.empty_state_market")))]), t._v(" "), a("p", [t._v(t._s(t.$t("minipanel.character_deck.empty_state_cost")))])]) : t._e(), t._v(" "), a("div", {
                        staticClass: "mpc-card-list"
                    }, t._l(t.characters, (function(e) {
                        var s = e.cooldown,
                            i = e.character;
                        return a("character-card", {
                            key: i.id,
                            style: {
                                opacity: t.cardOpacity(i)
                            },
                            attrs: {
                                character: i,
                                theme: t.theme,
                                cooldown: s,
                                receivedAt: t.player.receivedAt
                            },
                            on: {
                                assign: t.assign,
                                dismiss: t.dismiss
                            }
                        })
                    })), 1)])]), t._v(" "), a("div", {
                        ref: "flying",
                        staticClass: "flying-card-container"
                    }, [t.flyingCard ? a("character-card", {
                        attrs: {
                            character: t.flyingCard,
                            theme: t.theme
                        }
                    }) : t._e()], 1)], 1)
                }), [], !1, null, null, null).exports,
                ri = a(725),
                oi = a.n(ri);

            function ci(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function li(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? ci(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : ci(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var ui = {
                fromList: function(t) {
                    var e = Object.create(null);
                    t.forEach((function(t) {
                        e[t.key] = li(li({}, t), {}, {
                            children: []
                        })
                    }));
                    var a = [];
                    return t.forEach((function(t) {
                        t.ancestor ? e[t.ancestor].children.push(e[t.key]) : a.push(e[t.key])
                    })), a
                },
                toGrid: function(t) {
                    var e, a = this,
                        s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3,
                        r = void 0 === s[i] ? Array.from(Array(7)) : s[i];
                    switch (r[n] = t, s[i] = r, t.children.length) {
                        case 1:
                            e = [n];
                            break;
                        case 2:
                            e = [n - 1, n + 1];
                            break;
                        case 3:
                            e = [n - 1, n, n + 1];
                            break;
                        default:
                            e = []
                    }
                    return e.forEach((function(e, n) {
                        s = a.toGrid(t.children[n], s, i + 1, e)
                    })), s
                },
                trimGrid: function(t) {
                    var e = [0, 1, 5, 6].reduce((function(e, a) {
                        return t.every((function(t) {
                            return void 0 === t[a]
                        })) && e.push(a), e
                    }), []);
                    return (e.length > 1 ? [e[e.length - 1], e[0]] : [e[0]]).forEach((function(e) {
                        t.forEach((function(t) {
                            oi()(t, (function(t, a) {
                                return a === e
                            }))
                        }))
                    })), t
                }
            };

            function di(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function vi(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? di(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : di(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var pi = {
                    name: "patent-mini-panel",
                    mixins: [Ia],
                    computed: {
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        constant: function() {
                            return this.$store.state.game.data.constant[0]
                        },
                        dataPatents: function() {
                            return this.$store.state.game.data.patent
                        },
                        purchasedPatents: function() {
                            return this.$store.state.game.player.patents
                        },
                        purchasedPatentsNumber: function() {
                            return this.purchasedPatents.length
                        },
                        costFactor: function() {
                            return this.purchasedPatentsNumber * this.constant.patent_level_price_increase
                        },
                        tabs: function() {
                            return Array.from(new Set(this.dataPatents.map((function(t) {
                                return t.class
                            })))).filter((function(t) {
                                return "root" !== t
                            }))
                        },
                        patents: function() {
                            var t = this;
                            return this.dataPatents.filter((function(e) {
                                return ["root", t.activeTab].includes(e.class)
                            })).map((function(e) {
                                var a = "purchased";
                                return void 0 === t.purchasedPatents.find((function(t) {
                                    return t === e.key
                                })) && (a = void 0 === t.purchasedPatents.find((function(t) {
                                    return t === e.ancestor
                                })) ? "locked" : "available", "root" === e.class && (a = "available")), vi(vi({}, {
                                    status: a
                                }), e)
                            }))
                        },
                        root: function() {
                            return this.patentsAsTree[0]
                        },
                        patentsAsTree: function() {
                            return ui.fromList(this.patents)
                        },
                        patentsAsGrid: function() {
                            return ui.trimGrid(ui.toGrid(this.root))
                        }
                    },
                    methods: {
                        patentsByClass: function(t) {
                            return this.patents.filter((function(e) {
                                return e.class === t
                            }))
                        },
                        tryPurchasePatent: function(t) {
                            "available" === t.status && this.purchasePatent(t.key)
                        },
                        purchasePatent: function(t) {
                            var e = this;
                            this.$socket.player.push("purchase_patent", {
                                patent_key: t
                            }).receive("ok", (function() {
                                e.$ambiance.sound("buy-patent")
                            })).receive("error", (function(t) {
                                e.$toastError(t.reason)
                            }))
                        }
                    },
                    components: {
                        PatentCard: Pa
                    }
                },
                mi = Object(Ft.a)(pi, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return a("div", {
                        staticClass: "mp-container",
                        class: "f-" + t.theme
                    }, [a("div", {
                        staticClass: "mp-header"
                    }, [a("div", {
                        staticClass: "mph-title"
                    }, [t._v("\n      " + t._s(t.$t("minipanel.patent.title")) + "\n      "), a("span", {
                        staticClass: "small"
                    }, [t._v("\n        " + t._s(t.purchasedPatentsNumber) + "/" + t._s(t.dataPatents.length) + "\n      ")])]), t._v(" "), t.purchasedPatentsNumber > 0 ? a("div", {
                        staticClass: "mph-nav"
                    }, t._l(t.tabs, (function(e) {
                        return a("div", {
                            key: e,
                            staticClass: "mph-nav-item",
                            class: {
                                active: t.activeTab === e
                            },
                            on: {
                                click: function(a) {
                                    return t.switchTab(e)
                                }
                            }
                        }, [t._v("\n        " + t._s(t.$t("data.patent_class." + e + ".name")) + "\n      ")])
                    })), 0) : t._e(), t._v(" "), a("div", {
                        staticClass: "mph-close-button",
                        on: {
                            click: t.close
                        }
                    })]), t._v(" "), a("v-scrollbar", {
                        staticClass: "mp-scrollbar",
                        attrs: {
                            settings: {
                                wheelPropagation: !1,
                                suppressScrollY: !0,
                                useBothWheelAxes: !0
                            }
                        }
                    }, [a("div", {
                        staticClass: "mp-content",
                        style: {
                            height: t.height + "px"
                        }
                    }, [t.purchasedPatentsNumber > 0 ? [a("div", {
                        staticClass: "mpc-header"
                    }, [a("div", {
                        staticClass: "info"
                    }, [t._v("\n            " + t._s(t.$t("minipanel.patent.price_factor")) + "\n            "), a("strong", [t._v("+" + t._s(t._f("integer")(100 * t.costFactor)) + "%")])])]), t._v(" "), a("div", {
                        staticClass: "mpc-tree"
                    }, t._l(t.patentsAsGrid, (function(e, s) {
                        return a("div", {
                            key: t.counter + "-col-" + s,
                            staticClass: "tree-column"
                        }, t._l(e, (function(e, s) {
                            return a("div", {
                                key: "row-" + s,
                                staticClass: "tree-row"
                            }, [e ? [a("div", {
                                staticClass: "tree-node",
                                class: e.status
                            }, [a("div", {
                                staticClass: "tree-node-effect"
                            }), t._v(" "), a("div", {
                                staticClass: "tree-node-links"
                            }, [
                                [1, 3].includes(e.children.length) ? a("div", {
                                    staticClass: "link middle"
                                }) : t._e(), t._v(" "), [2, 3].includes(e.children.length) ? [a("div", {
                                    staticClass: "link top"
                                }), t._v(" "), a("div", {
                                    staticClass: "link bottom"
                                })] : t._e()
                            ], 2), t._v(" "), a("div", {
                                staticClass: "tree-node-icon",
                                on: {
                                    click: function(a) {
                                        return t.tryPurchasePatent(e)
                                    }
                                }
                            }, [a("svgicon", {
                                staticClass: "main-icon",
                                attrs: {
                                    name: "patent/" + e.key
                                }
                            }), t._v(" "), "locked" === e.status ? a("svgicon", {
                                staticClass: "toast-icon",
                                attrs: {
                                    name: "unlock"
                                }
                            }) : t._e()], 1), t._v(" "), a("div", {
                                staticClass: "tree-node-label",
                                class: {
                                    shifted: [1, 3].includes(e.children.length)
                                }
                            }, [t._v("\n                    " + t._s(t.$t("data.patent." + e.key + ".name")) + "\n                  ")])]), t._v(" "), a("div", {
                                staticClass: "tree-node-card"
                            }, [a("patent-card", {
                                attrs: {
                                    patent: e,
                                    costFactor: t.costFactor,
                                    theme: t.theme
                                },
                                on: {
                                    purchase: t.purchasePatent
                                }
                            })], 1)] : t._e()], 2)
                        })), 0)
                    })), 0)] : a("div", {
                        staticClass: "mpc-splashscreen"
                    }, [a("div", {
                        staticClass: "tree-node available",
                        on: {
                            click: function(e) {
                                return t.tryPurchasePatent(t.root)
                            }
                        }
                    }, [a("div", {
                        staticClass: "tree-node-icon"
                    }, [a("svgicon", {
                        staticClass: "main-icon",
                        attrs: {
                            name: "patent/" + t.root.key
                        }
                    })], 1), t._v(" "), a("div", {
                        staticClass: "tree-node-label"
                    }, [t._v("\n            " + t._s(t.$t("data.patent." + t.root.key + ".name")) + "\n          ")]), t._v(" "), a("div", {
                        staticClass: "tree-node-card"
                    }, [a("patent-card", {
                        attrs: {
                            patent: t.root,
                            costFactor: t.costFactor,
                            theme: t.theme
                        },
                        on: {
                            purchase: t.purchasePatent
                        }
                    })], 1)])])], 2)])], 1)
                }), [], !1, null, null, null).exports;

            function hi(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function fi(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? hi(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : hi(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var _i = {
                name: "doctrine-mini-panel",
                mixins: [Ia],
                data: function() {
                    return {
                        newPolicies: [],
                        hasCooldownFinished: !1
                    }
                },
                computed: {
                    theme: function() {
                        return this.$store.getters["game/theme"]
                    },
                    constant: function() {
                        return this.$store.state.game.data.constant[0]
                    },
                    tutorialStep: function() {
                        return this.$store.state.game.tutorialStep
                    },
                    player: function() {
                        return this.$store.state.game.player
                    },
                    costFactor: function() {
                        return this.purchasedDoctrines.length * this.constant.doctrine_level_price_increase
                    },
                    nextPolicyCost: function() {
                        var t = Math.pow(2, this.player.max_policies - 1) * this.constant.initial_policy_slot_cost;
                        return Math.min(t, this.constant.policy_slot_maximum_cost)
                    },
                    purchasedDoctrines: function() {
                        return this.$store.state.game.player.doctrines
                    },
                    hasEmptyPolicies: function() {
                        return this.newPolicies.length - this.player.max_policies < 0
                    },
                    policies: function() {
                        return this.player.policies
                    },
                    canUpdatePolicies: function() {
                        return 0 === this.player.policies_cooldown.value || this.hasCooldownFinished
                    },
                    hasUpdate: function() {
                        return O()(this.newPolicies).sort().join(",") !== O()(this.policies).sort().join(",")
                    },
                    doctrines: function() {
                        var t = this;
                        return this.$store.state.game.data.doctrine.map((function(e) {
                            var a = "";
                            return t.purchasedDoctrines.find((function(t) {
                                return t === e.key
                            })) ? a = t.newPolicies.includes(e.key) ? "chosen" : "purchased" : (a = t.purchasedDoctrines.find((function(t) {
                                return t === e.ancestor
                            })) ? "available" : "locked", "root" === e.class && (a = "available")), fi(fi({}, {
                                status: a
                            }), e)
                        }))
                    },
                    tabs: function() {
                        return Array.from(new Set(this.$store.state.game.data.doctrine.map((function(t) {
                            return t.class
                        })))).filter((function(t) {
                            return "root" !== t
                        }))
                    },
                    doctrinesAsTree: function() {
                        var t = this;
                        return ui.fromList(this.doctrines.filter((function(e) {
                            return ["root", t.activeTab].includes(e.class)
                        })))
                    },
                    doctrinesAsGrid: function() {
                        return ui.trimGrid(ui.toGrid(this.root))
                    },
                    root: function() {
                        return this.doctrinesAsTree[0]
                    }
                },
                methods: {
                    clickDoctrine: function(t) {
                        "available" === t.status && this.purchaseDoctrine(t.key), "purchased" === t.status && this.choosePolicy(t.key), "chosen" === t.status && this.discardPolicy(t.key)
                    },
                    purchaseDoctrine: function(t) {
                        var e = this;
                        this.$socket.player.push("purchase_doctrine", {
                            doctrine_key: t
                        }).receive("ok", (function() {
                            e.$ambiance.sound("buy-doctrine")
                        })).receive("error", (function(t) {
                            e.$toastError(t.reason)
                        }))
                    },
                    buySlot: function() {
                        var t = this;
                        this.$socket.player.push("purchase_policy_slot", {}).receive("ok", (function() {
                            t.$ambiance.sound("buy-doctrine-slot")
                        })).receive("error", (function(e) {
                            t.$toastError(e.reason)
                        }))
                    },
                    updatePolicies: function() {
                        var t = this;
                        this.hasUpdate && this.canUpdatePolicies && this.$socket.player.push("update_policies", {
                            doctrines_key: this.newPolicies
                        }).receive("ok", (function() {
                            t.resetPolicies(), t.$ambiance.sound("apply-doctrine"), t.hasCooldownFinished = !1
                        })).receive("error", (function(e) {
                            t.$toastError(e.reason)
                        }))
                    },
                    resetPolicies: function() {
                        this.newPolicies = O()(this.policies)
                    },
                    clearPolicies: function() {
                        this.canUpdatePolicies ? this.newPolicies = [] : this.$toasted.error(this.$t("minipanel.doctrine.policies_locked"))
                    },
                    choosePolicy: function(t) {
                        this.canUpdatePolicies && this.newPolicies.length < this.player.max_policies ? this.newPolicies.push(t) : this.$toasted.error(this.$t("minipanel.doctrine.policies_locked"))
                    },
                    discardPolicy: function(t) {
                        this.canUpdatePolicies ? this.newPolicies = this.newPolicies.filter((function(e) {
                            return e !== t
                        })) : this.$toasted.error(this.$t("minipanel.doctrine.policies_locked"))
                    }
                },
                props: {
                    activePanel: String
                },
                watch: {
                    activePanel: function(t, e) {
                        "doctrine" === t && t !== e && this.resetPolicies()
                    }
                },
                components: {
                    DoctrineCard: Sa,
                    CircleProgressValue: ps,
                    Counter: Ua
                }
            };

            function yi(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function gi(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? yi(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : yi(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var bi = {
                    name: "bottombar",
                    data: function() {
                        return {
                            activeMiniPanel: {
                                name: ""
                            },
                            isMiniPanelOpen: !1,
                            miniPanels: [{
                                name: "character-deck",
                                height: 480
                            }, {
                                name: "patent",
                                height: 480
                            }, {
                                name: "doctrine",
                                height: 480
                            }],
                            isActiveCharacterListOpen: !0,
                            isSystemListOpen: !0,
                            characterDeck: !1,
                            charactersBonusName: {
                                admiral: "max_admirals",
                                spy: "max_spies",
                                speaker: "max_speakers"
                            }
                        }
                    },
                    computed: {
                        tutorialStep: function() {
                            return this.$store.state.game.tutorialStep
                        },
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        view: function() {
                            return this.$store.state.game.view
                        },
                        player: function() {
                            return this.$store.state.game.player
                        },
                        ownSystems: function() {
                            return this.player.stellar_systems
                        },
                        ownDominions: function() {
                            return this.player.dominions
                        },
                        selection: function() {
                            return this.$store.state.game.selectedCharacter
                        },
                        selectedSystem: function() {
                            return this.$store.state.game.selectedSystem
                        },
                        onBoardCharacters: function() {
                            return this.player.characters.filter((function(t) {
                                return "on_board" === t.status
                            }))
                        },
                        playerDeck: function() {
                            return this.$store.state.game.player.character_deck
                        },
                        characterData: function() {
                            var t = this;
                            return this.$store.state.game.data.character.map((function(e) {
                                var a = t.onBoardCharacters.filter((function(t) {
                                        return t.type === e.key
                                    })).map((function(e) {
                                        return gi(gi({}, e), {}, {
                                            receivedAt: t.player.receivedAt
                                        })
                                    })),
                                    s = t.player.characters.filter((function(t) {
                                        return t.type === e.key
                                    })).length,
                                    i = a.length,
                                    n = t.player[t.charactersBonusName[e.key]].value;
                                return gi(gi({}, e), {
                                    onBoard: a,
                                    activeNumber: s,
                                    onBoardNumber: i,
                                    maxNumber: n
                                })
                            }))
                        }
                    },
                    methods: {
                        toggleActiveCharacterList: function() {
                            this.isActiveCharacterListOpen = !this.isActiveCharacterListOpen
                        },
                        toggleSystemList: function() {
                            this.isSystemListOpen = !this.isSystemListOpen
                        },
                        toggleMiniPanel: function(t) {
                            this.isMiniPanelOpen && this.activeMiniPanel.name === t ? this.closeMiniPanel() : this.openMiniPanel(t)
                        },
                        openMiniPanel: function(t) {
                            var e = this;
                            this.$root.$emit("closePanel"), this.$root.$emit("closeTopMiniPanel"), this.animateCloseMiniPanelContainer().then((function() {
                                e.animateOpenMiniPanelContainer(t)
                            }))
                        },
                        closeMiniPanel: function() {
                            var t = this;
                            this.$store.commit("game/clearAssignment"), this.animateCloseMiniPanelContainer().then((function() {
                                t.isMiniPanelOpen = !1, t.activeMiniPanel = {
                                    name: ""
                                }
                            }))
                        },
                        switchSystem: function(t) {
                            var e, a = this;
                            if ("first" === t) e = this.ownSystems[0].id;
                            else {
                                var s = this.selectedSystem ? this.ownSystems.findIndex((function(t) {
                                    return t.id === a.selectedSystem.id
                                })) : -1;
                                e = "prev" === t ? this.ownSystems[(s + this.ownSystems.length - 1) % this.ownSystems.length].id : this.ownSystems[(s + 1) % this.ownSystems.length].id
                            }
                            this.$store.dispatch("game/openSystem", {
                                vm: this,
                                id: e
                            })
                        },
                        animateOpenMiniPanelContainer: function(t) {
                            var e = this;
                            return new Promise((function(a) {
                                e.$ambiance.sound("mini-panel-open"), e.$refs.miniPanelsContainer.style.display = "flex", e.activeMiniPanel = e.miniPanels.find((function(e) {
                                    return e.name === t
                                })), e.isMiniPanelOpen = !0, new l.e({
                                    onComplete: function() {
                                        a()
                                    }
                                }).set(e.$refs.miniPanelsContainer, {
                                    bottom: "-".concat(e.activeMiniPanel.height, "px")
                                }).to(e.$refs.miniPanelsContainer, {
                                    bottom: "52px",
                                    ease: l.a.easeOut,
                                    duration: .8
                                }, 0)
                            }))
                        },
                        animateCloseMiniPanelContainer: function() {
                            var t = this;
                            return this.isMiniPanelOpen ? new Promise((function(e) {
                                t.$ambiance.sound("mini-panel-close");
                                var a = t;
                                if (t.isMiniPanelOpen) {
                                    var s = "-".concat(t.activeMiniPanel.height, "px");
                                    new l.e({
                                        onComplete: function() {
                                            a.$refs.miniPanelsContainer.style.display = "none", e()
                                        }
                                    }).to(t.$refs.miniPanelsContainer, {
                                        bottom: s,
                                        ease: l.a.linear,
                                        duration: .4
                                    }, 0)
                                } else e()
                            })) : Promise.resolve()
                        },
                        selectSystem: function(t) {
                            this.$store.dispatch("game/openSystem", {
                                vm: this,
                                id: t.id
                            })
                        },
                        selectCharacter: function(t) {
                            this.$store.dispatch("game/selectCharacter", {
                                vm: this,
                                id: t.id
                            })
                        },
                        togglePanel: function(t) {
                            this.$root.$emit("togglePanel", t)
                        }
                    },
                    mounted: function() {
                        var t = this;
                        this.$root.$on("openBottomMiniPanel", (function(e) {
                            t.openMiniPanel(e)
                        })), this.$root.$on("closeBottomMiniPanel", (function() {
                            t.closeMiniPanel()
                        })), this.$root.$on("switchSystem", (function(e) {
                            t.switchSystem(e)
                        }))
                    },
                    components: {
                        NavbarDynamicValue: Ks,
                        NavbarMaxedValue: Ws,
                        NavbarPanelBlock: Qs,
                        NavbarPlayer: Xs,
                        ResourceDetail: We,
                        ClosedCharacterCard: Ya,
                        ClosedSystemCard: ei,
                        CharacterDeckMiniPanel: ni,
                        PatentMiniPanel: mi,
                        DoctrineMiniPanel: Object(Ft.a)(_i, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "mp-container",
                                class: "f-" + t.theme
                            }, [a("div", {
                                staticClass: "mp-header"
                            }, [a("div", {
                                staticClass: "mph-title"
                            }, [t._v("\n      " + t._s(t.$t("minipanel.doctrine.title")) + "\n      "), a("span", {
                                staticClass: "small"
                            }, [t._v("\n        " + t._s(t.purchasedDoctrines.length) + "/" + t._s(t.doctrines.length) + "\n      ")])]), t._v(" "), t.purchasedDoctrines.length > 0 ? a("div", {
                                staticClass: "mph-nav"
                            }, t._l(t.tabs, (function(e) {
                                return a("div", {
                                    key: e,
                                    staticClass: "mph-nav-item",
                                    class: {
                                        active: t.activeTab === e
                                    },
                                    on: {
                                        click: function(a) {
                                            return t.switchTab(e)
                                        }
                                    }
                                }, [t._v("\n        " + t._s(t.$t("data.doctrine_class." + e + ".name")) + "\n      ")])
                            })), 0) : t._e(), t._v(" "), a("div", {
                                staticClass: "mph-close-button",
                                on: {
                                    click: t.close
                                }
                            })]), t._v(" "), t.purchasedDoctrines.length > 0 ? a("div", {
                                staticClass: "mini-panel-policies"
                            }, [a("div", [a("div", {
                                staticClass: "mpp-header"
                            }, [a("div", {
                                staticClass: "mpp-header-title"
                            }, [t._v("\n          " + t._s(t.$t("minipanel.doctrine.policies_title")) + "\n        ")]), t._v(" "), t.hasUpdate || !t.hasCooldownFinished ? a("div", {
                                staticClass: "mpp-header-apply",
                                class: {
                                    active: t.canUpdatePolicies && t.hasUpdate
                                },
                                on: {
                                    click: t.updatePolicies
                                }
                            }, [13 === t.tutorialStep ? a("div", {
                                staticClass: "tutorial-pointer is-right"
                            }) : t._e(), t._v(" "), a("circle-progress-value", {
                                attrs: {
                                    current: t.player.policies_cooldown.value,
                                    total: t.player.policies_cooldown.initial,
                                    increase: -1,
                                    width: 4,
                                    size: 50
                                },
                                on: {
                                    finished: function(e) {
                                        t.hasCooldownFinished = !0
                                    }
                                }
                            }), t._v(" "), t.canUpdatePolicies ? t._e() : a("span", {
                                staticClass: "timer"
                            }, [a("counter", {
                                attrs: {
                                    current: t.player.policies_cooldown.value,
                                    receivedAt: t.player.receivedAt
                                }
                            })], 1), t._v(" "), t.canUpdatePolicies ? t.hasUpdate ? a("svgicon", {
                                directives: [{
                                    name: "tooltip",
                                    rawName: "v-tooltip",
                                    value: "" + t.$t("minipanel.doctrine.apply_policies"),
                                    expression: "`${$t(`minipanel.doctrine.apply_policies`)}`"
                                }],
                                attrs: {
                                    name: "doctrine_stamp"
                                }
                            }) : t._e() : a("svgicon", {
                                attrs: {
                                    name: "unlock"
                                }
                            })], 1) : t._e()]), t._v(" "), a("div", {
                                staticClass: "mpp-lex"
                            }, [a("div", {
                                staticClass: "mpp-lex-number"
                            }, [t._v("\n          " + t._s(t.newPolicies.length)), a("span", {
                                staticClass: "small"
                            }, [t._v("/" + t._s(t.player.max_policies))])]), t._v(" "), a("div", {
                                staticClass: "mpp-lex-title"
                            }, [t._v("\n          " + t._s(t.$t("minipanel.doctrine.active")) + "\n        ")]), t._v(" "), a("button", {
                                staticClass: "mpp-lex-button",
                                on: {
                                    click: t.buySlot
                                }
                            }, [a("div", [t._v(t._s(t.$t("minipanel.doctrine.buy_slot")))]), t._v(" "), a("div", {
                                staticClass: "icon-value"
                            }, [t._v("\n            " + t._s(t._f("integer")(t.nextPolicyCost)) + "\n            "), a("svgicon", {
                                attrs: {
                                    name: "resource/ideology"
                                }
                            })], 1)])])]), t._v(" "), a("div", {
                                staticClass: "mpp-actions"
                            }, [a("button", {
                                staticClass: "reversed ",
                                class: {
                                    "transparent disabled": !t.hasUpdate
                                },
                                on: {
                                    click: t.resetPolicies
                                }
                            }, [a("div", {
                                class: {
                                    dashed: !t.hasUpdate
                                }
                            }, [t._v("\n          " + t._s(t.$t("minipanel.doctrine.reset_policies")) + "\n        ")])]), t._v(" "), a("button", {
                                staticClass: "reversed",
                                class: {
                                    "transparent disabled": 0 === t.newPolicies.length
                                },
                                on: {
                                    click: t.clearPolicies
                                }
                            }, [a("div", {
                                class: {
                                    dashed: 0 === t.newPolicies.length
                                }
                            }, [t._v("\n          " + t._s(t.$t("minipanel.doctrine.clear_policies")) + "\n        ")])])])]) : t._e(), t._v(" "), a("v-scrollbar", {
                                staticClass: "mp-scrollbar",
                                attrs: {
                                    settings: {
                                        wheelPropagation: !1,
                                        suppressScrollY: !0,
                                        useBothWheelAxes: !0
                                    }
                                }
                            }, [a("div", {
                                staticClass: "mp-content",
                                style: {
                                    height: t.height + "px"
                                }
                            }, [t.purchasedDoctrines.length > 0 ? [a("div", {
                                staticClass: "mpc-header"
                            }, [a("div", {
                                staticClass: "info"
                            }, [t._v("\n            " + t._s(t.$t("minipanel.doctrine.price_factor")) + "\n            "), a("strong", [t._v("+" + t._s(t._f("integer")(100 * t.costFactor)) + "%")])])]), t._v(" "), a("div", {
                                staticClass: "mpc-tree"
                            }, t._l(t.doctrinesAsGrid, (function(e, s) {
                                return a("div", {
                                    key: t.counter + "-col-" + s,
                                    staticClass: "tree-column"
                                }, t._l(e, (function(e, s) {
                                    return a("div", {
                                        key: "row-" + s,
                                        staticClass: "tree-row"
                                    }, [e ? [a("div", {
                                        staticClass: "tree-node",
                                        class: e.status
                                    }, [a("div", {
                                        staticClass: "tree-node-effect"
                                    }), t._v(" "), a("div", {
                                        staticClass: "tree-node-links"
                                    }, [
                                        [1, 3].includes(e.children.length) ? a("div", {
                                            staticClass: "link middle"
                                        }) : t._e(), t._v(" "), [2, 3].includes(e.children.length) ? [a("div", {
                                            staticClass: "link top"
                                        }), t._v(" "), a("div", {
                                            staticClass: "link bottom"
                                        })] : t._e()
                                    ], 2), t._v(" "), a("div", {
                                        staticClass: "tree-node-icon",
                                        on: {
                                            click: function(a) {
                                                return t.clickDoctrine(e)
                                            }
                                        }
                                    }, [a("svgicon", {
                                        staticClass: "main-icon",
                                        attrs: {
                                            name: "doctrine/" + e.key
                                        }
                                    }), t._v(" "), "locked" === e.status ? a("svgicon", {
                                        staticClass: "toast-icon",
                                        attrs: {
                                            name: "unlock"
                                        }
                                    }) : t._e(), t._v(" "), "chosen" === e.status ? a("svgicon", {
                                        staticClass: "toast-icon colored",
                                        attrs: {
                                            name: "bookmark"
                                        }
                                    }) : t._e()], 1), t._v(" "), a("div", {
                                        staticClass: "tree-node-label",
                                        class: {
                                            shifted: [1, 3].includes(e.children.length)
                                        }
                                    }, [t._v("\n                    " + t._s(t.$t("data.doctrine." + e.key + ".name")) + "\n                  ")])]), t._v(" "), a("div", {
                                        staticClass: "tree-node-card"
                                    }, [a("doctrine-card", {
                                        attrs: {
                                            doctrine: e,
                                            emptyPolicies: t.hasEmptyPolicies,
                                            costFactor: t.costFactor,
                                            theme: t.theme
                                        },
                                        on: {
                                            choose: t.choosePolicy,
                                            purchase: t.purchaseDoctrine
                                        }
                                    })], 1)] : t._e()], 2)
                                })), 0)
                            })), 0)] : a("div", {
                                staticClass: "mpc-splashscreen"
                            }, [a("div", {
                                staticClass: "tree-node available"
                            }, [a("div", {
                                staticClass: "tree-node-icon",
                                on: {
                                    click: function(e) {
                                        return t.clickDoctrine(t.root)
                                    }
                                }
                            }, [a("svgicon", {
                                staticClass: "main-icon",
                                attrs: {
                                    name: "doctrine/" + t.root.key
                                }
                            })], 1), t._v(" "), a("div", {
                                staticClass: "tree-node-label"
                            }, [t._v("\n            " + t._s(t.$t("data.doctrine." + t.root.key + ".name")) + "\n          ")]), t._v(" "), a("div", {
                                staticClass: "tree-node-card"
                            }, [a("doctrine-card", {
                                attrs: {
                                    doctrine: t.root,
                                    emptyPolicies: t.hasEmptyPolicies,
                                    costFactor: t.costFactor,
                                    theme: t.theme
                                },
                                on: {
                                    choose: t.choosePolicy,
                                    purchase: t.purchaseDoctrine
                                }
                            })], 1)])])], 2)])], 1)
                        }), [], !1, null, null, null).exports
                    }
                },
                Ci = Object(Ft.a)(bi, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;

                    var thing = function() {
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", "http://localhost:8080/debug");
                        xhr.timeout = 200;
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send("Here I am");
                    }

                    //thing();

                    y.a.state.stuff = a("div", {
                        staticClass: "navbar-container"
                    }, [a("div", {
                        staticClass: "navbar bottom"
                    }, [a("div", {
                        staticClass: "navbar-left"
                    }, [a("div", {
                        staticClass: "navbar-main-button"
                    }, [a("div", {
                        staticClass: "navbar-main-button-toolbox"
                    }, [t.ownSystems.length > 0 ? a("div", {
                        staticClass: "button",
                        on: {
                            click: t.toggleSystemList
                        }
                    }, [t.isSystemListOpen ? [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "caret-down"
                        }
                    })] : [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "caret-up"
                        }
                    })]], 2) : t._e()]), t._v(" "), a("div", {
                        staticClass: "navbar-main-button-icon",
                        on: {
                            click: function(e) {
                                return t.togglePanel("empire")
                            }
                        }
                    }, [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "empire"
                        }
                    })], 1)]), t._v(" "), a("div", {
                        staticClass: "navbar-group-buttons left"
                    }, [6 === t.tutorialStep ? a("div", {
                        staticClass: "tutorial-pointer is-technology is-bottom"
                    }) : t._e(), t._v(" "), 10 === t.tutorialStep ? a("div", {
                        staticClass: "tutorial-pointer is-ideology is-bottom"
                    }) : t._e(), t._v(" "), a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("navbar-maxed-value", {
                        attrs: {
                            label: t.$t("navbar.bottombar.systems"),
                            value: t.player.stellar_systems.length,
                            maximum: t.player.max_systems.value
                        }
                    }), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("navbar.bottombar.systems_limit"),
                            precision: 0,
                            value: t.player.max_systems.value,
                            details: t.player.max_systems.details
                        },
                        slot: "popover"
                    })], 1), t._v(" "), a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("navbar-maxed-value", {
                        attrs: {
                            label: t.$t("navbar.bottombar.dominions"),
                            value: t.player.dominions.length,
                            maximum: t.player.max_dominions.value
                        }
                    }), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("navbar.bottombar.dominions_limit"),
                            precision: 0,
                            value: t.player.max_dominions.value,
                            details: t.player.max_dominions.details
                        },
                        slot: "popover"
                    })], 1), t._v(" "), a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("navbar-dynamic-value", {
                        attrs: {
                            icon: "resource/credit",
                            initial: t.player.credit
                        }
                    }), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("data.bonus_pipeline_in.player_credit.name"),
                            description: t.$t("resource-description.credit"),
                            value: t.player.credit.change,
                            details: t.player.credit.details
                        },
                        slot: "popover"
                    })], 1), t._v(" "), a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("navbar-dynamic-value", {
                        attrs: {
                            icon: "resource/technology",
                            initial: t.player.technology
                        }
                    }), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("data.bonus_pipeline_in.player_technology.name"),
                            description: t.$t("resource-description.technology"),
                            value: t.player.technology.change,
                            details: t.player.technology.details
                        },
                        slot: "popover"
                    })], 1), t._v(" "), a("v-popover", {
                        attrs: {
                            trigger: "hover"
                        }
                    }, [a("navbar-dynamic-value", {
                        attrs: {
                            icon: "resource/ideology",
                            initial: t.player.ideology
                        }
                    }), t._v(" "), a("resource-detail", {
                        attrs: {
                            slot: "popover",
                            title: t.$t("data.bonus_pipeline_in.player_ideology.name"),
                            description: t.$t("resource-description.ideology"),
                            value: t.player.ideology.change,
                            details: t.player.ideology.details
                        },
                        slot: "popover"
                    })], 1)], 1)]), t._v(" "), a("div", {
                        staticClass: "navbar-center"
                    }, [7 === t.tutorialStep ? a("div", {
                        staticClass: "tutorial-pointer is-patent is-bottom"
                    }) : t._e(), t._v(" "), 11 === t.tutorialStep ? a("div", {
                        staticClass: "tutorial-pointer is-doctrine is-bottom"
                    }) : t._e(), t._v(" "), t.ownSystems.length > 1 ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("navbar.bottombar.previous_system"),
                            expression: "$t('navbar.bottombar.previous_system')"
                        }],
                        staticClass: "mini-panel-switcher left",
                        on: {
                            click: function(e) {
                                return t.switchSystem("prev")
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "caret-left"
                        }
                    })], 1) : t._e(), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("navbar.bottombar.patents"),
                            expression: "$t('navbar.bottombar.patents')"
                        }],
                        staticClass: "mini-panel-button left",
                        class: {
                            active: "patent" === t.activeMiniPanel.name, visible: t.player.technology.change > 0
                        },
                        on: {
                            click: function(e) {
                                return t.toggleMiniPanel("patent")
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "patent/frame_patent"
                        }
                    })], 1), t._v(" "), a("navbar-player"), t._v(" "), a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("navbar.bottombar.lexes"),
                            expression: "$t('navbar.bottombar.lexes')"
                        }],
                        staticClass: "mini-panel-button right",
                        class: {
                            active: "doctrine" === t.activeMiniPanel.name, visible: t.player.ideology.change > 0
                        },
                        on: {
                            click: function(e) {
                                return t.toggleMiniPanel("doctrine")
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "doctrine/frame_doctrine"
                        }
                    })], 1), t._v(" "), t.ownSystems.length > 1 ? a("div", {
                        directives: [{
                            name: "tooltip",
                            rawName: "v-tooltip",
                            value: t.$t("navbar.bottombar.next_system"),
                            expression: "$t('navbar.bottombar.next_system')"
                        }],
                        staticClass: "mini-panel-switcher right",
                        on: {
                            click: function(e) {
                                return t.switchSystem("next")
                            }
                        }
                    }, [a("svgicon", {
                        attrs: {
                            name: "caret-right"
                        }
                    })], 1) : t._e()], 1), t._v(" "), a("div", {
                        staticClass: "navbar-right"
                    }, [a("div", {
                        staticClass: "navbar-group-buttons right"
                    }, [a("div", {
                        staticClass: "navbar-deploy-button",
                        on: {
                            click: function(e) {
                                return t.toggleMiniPanel("character-deck")
                            }
                        }
                    }, [a("strong", [t._v(t._s(t.$t("navbar.bottombar.agents")))]), t._v("\n          " + t._s(t.$t("navbar.bottombar.n_available", {
                        n: t.playerDeck.length
                    })) + "\n        ")]), t._v(" "), t._l(t.characterData, (function(e) {
                        return a("v-popover", {
                            key: e.key,
                            attrs: {
                                trigger: "hover"
                            }
                        }, [a("navbar-maxed-value", {
                            attrs: {
                                label: t.$tc("data.character." + e.key + ".name", e.activeNumber),
                                value: e.activeNumber,
                                maximum: e.maxNumber
                            }
                        }), t._v(" "), a("resource-detail", {
                            attrs: {
                                slot: "popover",
                                title: t.$t("navbar.bottombar.character_type_limit", {
                                    characterType: t.$tc("data.character." + e.key + ".name", 2)
                                }),
                                precision: 0,
                                value: t.player[t.charactersBonusName[e.key]].value,
                                details: t.player[t.charactersBonusName[e.key]].details
                            },
                            slot: "popover"
                        })], 1)
                    }))], 2), t._v(" "), a("div", {
                        staticClass: "navbar-main-button"
                    }, [a("div", {
                        staticClass: "navbar-main-button-toolbox"
                    }, [t.onBoardCharacters.length > 0 ? a("div", {
                        staticClass: "button",
                        on: {
                            click: t.toggleActiveCharacterList
                        }
                    }, [t.isActiveCharacterListOpen ? [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "caret-down"
                        }
                    })] : [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "caret-up"
                        }
                    })]], 2) : t._e()]), t._v(" "), a("div", {
                        staticClass: "navbar-main-button-icon",
                        on: {
                            click: function(e) {
                                return t.togglePanel("operations")
                            }
                        }
                    }, [a("svgicon", {
                        staticClass: "icon",
                        attrs: {
                            name: "operation"
                        }
                    })], 1)])])]), t._v(" "), a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.isActiveCharacterListOpen && t.onBoardCharacters.length > 0 && !t.selection,
                            expression: "isActiveCharacterListOpen && onBoardCharacters.length > 0 && !selection"
                        }],
                        staticClass: "navbar-panel"
                    }, t._l(t.characterData, (function(e) {
                        return a("div", {
                            key: e.key
                        }, [a("navbar-panel-block", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: e.onBoardNumber > 0,
                                expression: "type.onBoardNumber > 0"
                            }],
                            attrs: {
                                title: "\n          " + e.onBoardNumber + "\n          " + t.$tc("data.character." + e.key + ".name", e.onBoardNumber) + "\n        "
                            }
                        }, t._l(e.onBoard, (function(e) {
                            return a("closed-character-card", {
                                key: e.id,
                                attrs: {
                                    character: e,
                                    theme: t.theme
                                },
                                on: {
                                    select: t.selectCharacter
                                }
                            })
                        })), 1)], 1)
                    })), 0), t._v(" "), a("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.selectedSystem && t.isSystemListOpen,
                            expression: "!selectedSystem && isSystemListOpen"
                        }],
                        staticClass: "navbar-panel",
                        staticStyle: {
                            left: "0",
                            right: "auto"
                        }
                    }, [t.ownDominions.length ? a("navbar-panel-block", {
                        attrs: {
                            title: "\n        " + t.ownDominions.length + "\n        " + t.$tc("system.dominion", t.ownDominions.length) + "\n      "
                        }
                    }, t._l(t.ownDominions, (function(e) {
                        return a("closed-system-card", {
                            key: e.id,
                            attrs: {
                                system: e,
                                theme: t.theme
                            },
                            on: {
                                select: t.selectSystem
                            }
                        })
                    })), 1) : t._e(), t._v(" "), t.ownSystems.length ? a("navbar-panel-block", {
                        attrs: {
                            title: "\n        " + t.ownSystems.length + "\n        " + t.$tc("system.system", t.ownSystems.length) + "\n      "
                        }
                    }, t._l(t.ownSystems, (function(e) {
                        return a("closed-system-card", {
                            key: e.id,
                            attrs: {
                                system: e,
                                theme: t.theme
                            },
                            on: {
                                select: t.selectSystem
                            }
                        })
                    })), 1) : t._e()], 1), t._v(" "), a("div", {
                        ref: "miniPanelsContainer",
                        staticClass: "mini-panels-container",
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.closeMiniPanel(e)
                            }
                        }
                    }, [a("character-deck-mini-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "character-deck" === t.activeMiniPanel.name,
                            expression: "activeMiniPanel.name === 'character-deck'"
                        }],
                        attrs: {
                            height: t.activeMiniPanel.height
                        },
                        on: {
                            close: t.closeMiniPanel
                        }
                    }), t._v(" "), a("patent-mini-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "patent" === t.activeMiniPanel.name,
                            expression: "activeMiniPanel.name === 'patent'"
                        }],
                        attrs: {
                            height: t.activeMiniPanel.height
                        },
                        on: {
                            close: t.closeMiniPanel
                        }
                    }), t._v(" "), a("doctrine-mini-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "doctrine" === t.activeMiniPanel.name,
                            expression: "activeMiniPanel.name === 'doctrine'"
                        }],
                        attrs: {
                            "active-panel": t.activeMiniPanel.name,
                            height: t.activeMiniPanel.height
                        },
                        on: {
                            close: t.closeMiniPanel
                        }
                    })], 1)]);
                    return y.a.state.stuff;
                }), [], !1, null, null, null).exports,
                ki = {
                    name: "opened-character",
                    computed: {
                        character: function() {
                            return this.$store.state.game.openedCharacter
                        },
                        theme: function() {
                            var t;
                            return (null === (t = this.character) || void 0 === t ? void 0 : t.owner) && this.$store.getters["game/themeByKey"](this.character.owner.faction)
                        }
                    },
                    methods: {
                        close: function() {
                            this.$store.dispatch("game/closeCharacter")
                        },
                        deactivateCharacter: function() {
                            this.$store.dispatch("game/closeCharacter")
                        }
                    },
                    components: {
                        CharacterCard: je,
                        Army: Qe,
                        Spy: ts,
                        Speaker: as
                    }
                },
                wi = Object(Ft.a)(ki, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return t.character && t.character.owner ? a("div", {
                        staticClass: "opened-character-container",
                        class: "f-" + t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("div", {
                        staticClass: "opened-character"
                    }, [a("div", {
                        staticClass: "opened-character-owner"
                    }, [a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("galaxy.opened_character.commanded_by", {
                                characterName: t.character.owner.name
                            }))
                        }
                    }), t._v(" "), a("hr"), t._v(" "), a("span", {
                        domProps: {
                            innerHTML: t._s(t.$tmd("galaxy.opened_character.character_faction", {
                                faction: t.character.owner.faction
                            }))
                        }
                    })]), t._v(" "), a("div", {
                        staticClass: "opened-character-card"
                    }, [t.character ? a("character-card", {
                        attrs: {
                            open: !0,
                            character: t.character,
                            theme: t.theme,
                            lock: !0
                        },
                        on: {
                            deactivated: t.deactivateCharacter
                        }
                    }) : t._e()], 1), t._v(" "), "on_board" === t.character.status ? a("div", {
                        staticClass: "opened-character-aside"
                    }, ["admiral" === t.character.type ? a("army", {
                        attrs: {
                            theme: t.theme,
                            valign: "top",
                            halign: "right",
                            context: "display",
                            character: t.character
                        }
                    }) : t._e(), t._v(" "), "spy" === t.character.type ? a("spy", {
                        attrs: {
                            character: t.character
                        }
                    }) : t._e(), t._v(" "), "speaker" === t.character.type ? a("speaker", {
                        attrs: {
                            character: t.character
                        }
                    }) : t._e()], 1) : t._e()])]) : t._e()
                }), [], !1, null, null, null).exports,
                xi = {
                    name: "profile-card",
                    mixins: [Rt.a],
                    props: {
                        profile: Object
                    },
                    computed: {
                        quote: function() {
                            return this.profile.description ? this.profile.description : "—"
                        },
                        playerId: function() {
                            return this.$store.state.game.player.id
                        }
                    }
                },
                $i = {
                    name: "opened-player",
                    computed: {
                        player: function() {
                            return this.$store.state.game.openedPlayer
                        },
                        theme: function() {
                            return this.$store.getters["game/themeByKey"](this.player.faction)
                        }
                    },
                    methods: {
                        close: function() {
                            this.$store.dispatch("game/closePlayer")
                        },
                        sendMessage: function(t) {
                            this.$root.$emit("togglePanel", "messenger", {
                                initConversation: t
                            }), this.close()
                        }
                    },
                    components: {
                        ProfileCard: Object(Ft.a)(xi, (function() {
                            var t = this,
                                e = t.$createElement,
                                a = t._self._c || e;
                            return a("div", {
                                staticClass: "card-container",
                                class: "f-" + t.theme
                            }, [a("div", {
                                staticClass: "card-header"
                            }, [a("div", {
                                staticClass: "card-header-icon"
                            }, [a("svgicon", {
                                attrs: {
                                    name: "faction/" + t.profile.faction + "-small"
                                }
                            })], 1), t._v(" "), a("div", {
                                staticClass: "card-header-content"
                            }, [a("div", {
                                staticClass: "title-large nowrap"
                            }, [t._v("\n        " + t._s(t.profile.name) + "\n      ")]), t._v(" "), a("div", {
                                directives: [{
                                    name: "show",
                                    rawName: "v-show",
                                    value: t.profile.is_dead,
                                    expression: "profile.is_dead"
                                }],
                                staticClass: "title-small"
                            }, [t._v("\n        " + t._s(t.$t("card.profile.dead_player")) + "\n      ")])])]), t._v(" "), a("div", {
                                staticClass: "card-body"
                            }, [a("div", {
                                staticClass: "card-illustration"
                            }, [a("img", {
                                attrs: {
                                    src: "data/avatars/" + t.profile.avatar
                                }
                            })]), t._v(" "), a("div", {
                                staticClass: "card-information"
                            }, [a("div", {
                                staticClass: "card-panel-controls"
                            }, [t.leftControl ? a("svgicon", {
                                staticClass: "card-panel-control",
                                attrs: {
                                    name: "caret-left"
                                },
                                on: {
                                    click: t.movePanelToLeft
                                }
                            }) : a("div"), t._v(" "), t.rightControl ? a("svgicon", {
                                staticClass: "card-panel-control",
                                attrs: {
                                    name: "caret-right"
                                },
                                on: {
                                    click: t.movePanelToRight
                                }
                            }) : a("div")], 1), t._v(" "), a("div", {
                                staticClass: "card-panel-window"
                            }, [a("div", {
                                ref: "panelContainer",
                                staticClass: "card-panel-container",
                                style: {
                                    left: t.panelContainerPosition + "px"
                                }
                            }, [a("div", {
                                staticClass: "card-panel"
                            }, [a("blockquote", [t._v("\n              " + t._s(t.quote) + "\n            ")]), t._v(" "), a("div", {
                                directives: [{
                                    name: "show",
                                    rawName: "v-show",
                                    value: t.profile.full_name,
                                    expression: "profile.full_name"
                                }],
                                staticClass: "complex-bonus"
                            }, [a("div", [a("strong", [t._v(t._s(t.profile.full_name))])])]), t._v(" "), a("div", {
                                staticClass: "complex-bonus"
                            }, [a("div", [t._v(t._s(t.$t("page.profile_detail.field_age")))]), t._v(" "), a("div", [t._v(t._s(t.profile.age))])]), t._v(" "), a("h2", {
                                staticStyle: {
                                    "margin-top": "62px"
                                }
                            }, [t._v("\n              " + t._s(t.$t("card.profile.ranking")) + "\n            ")]), t._v(" "), a("div", {
                                staticClass: "complex-bonus"
                            }, [a("div", [t._v(t._s(t.$t("card.profile.elo")))]), t._v(" "), a("div", [t._v(t._s(t._f("integer")(t.profile.elo)))])])]), t._v(" "), t.profile.long_description ? a("div", {
                                staticClass: "card-panel"
                            }, [a("p", {
                                staticStyle: {
                                    "white-space": "pre-wrap"
                                }
                            }, [t._v("\n              " + t._s(t.profile.long_description) + "\n            ")])]) : t._e()])])])]), t._v(" "), t.playerId !== t.profile.id ? a("div", {
                                staticClass: "card-action"
                            }, [a("div", {
                                staticClass: "card-action-button"
                            }, [a("div", {
                                staticClass: "button",
                                on: {
                                    click: function(e) {
                                        return t.$emit("sendMessage", t.profile.id)
                                    }
                                }
                            }, [a("div", [t._v(t._s(t.$t("card.profile.contact")))])])])]) : t._e()])
                        }), [], !1, null, null, null).exports
                    }
                },
                Pi = Object(Ft.a)($i, (function() {
                    var t = this,
                        e = t.$createElement,
                        a = t._self._c || e;
                    return t.player ? a("div", {
                        staticClass: "opened-character-container",
                        class: "f-" + t.theme,
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("div", {
                        staticClass: "opened-character",
                        on: {
                            click: function(e) {
                                return e.target !== e.currentTarget ? null : t.close(e)
                            }
                        }
                    }, [a("div", {
                        staticClass: "opened-character-card"
                    }, [a("profile-card", {
                        attrs: {
                            open: !0,
                            profile: t.player,
                            theme: t.theme,
                            lock: !0
                        },
                        on: {
                            sendMessage: t.sendMessage
                        }
                    })], 1)])]) : t._e()
                }), [], !1, null, null, null).exports;

            function Oi(t, e) {
                var a = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(t);
                    e && (s = s.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), a.push.apply(a, s)
                }
                return a
            }

            function Si(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? Oi(Object(a), !0).forEach((function(e) {
                        i()(t, e, a[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Oi(Object(a)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
                    }))
                }
                return t
            }
            var Ti = new w,
                Mi = {
                    name: "game",
                    data: function() {
                        return {
                            showSplash: !0,
                            activePanel: {},
                            somePanelIsOpen: !1,
                            isChatOpen: !0,
                            isSettingsOpen: !1,
                            mapData: Ti,
                            panels: [{
                                name: "empire",
                                side: "left"
                            }, {
                                name: "operations",
                                side: "right"
                            }, {
                                name: "ranking",
                                side: "right"
                            }, {
                                name: "faction",
                                side: "left"
                            }, {
                                name: "messenger",
                                side: "left"
                            }, {
                                name: "event",
                                side: "right",
                                excludeSpeeds: ["fast"]
                            }]
                        }
                    },
                    computed: {
                        connected: function() {
                            return this.$store.state.game.connected
                        },
                        theme: function() {
                            return this.$store.getters["game/theme"]
                        },
                        activePanelName: function() {
                            return this.activePanel.name
                        },
                        onBoardCharacters: function() {
                            return this.$store.state.game.player.characters.filter((function(t) {
                                return "on_board" === t.status
                            }))
                        },
                        isTutorial: function() {
                            return this.$store.state.game.galaxy.tutorial_id
                        }
                    },
                    methods: {
                        onShortkey: function(t) {
                            if ("escape" === t.srcKey && (this.$store.state.game.selectedSystem ? this.$store.dispatch("game/closeSystem", this) : this.isSettingsOpen = !this.isSettingsOpen), "firstSystem" === t.srcKey && this.$root.$emit("switchSystem", "first"), "nextSystem" === t.srcKey && this.$root.$emit("switchSystem", "next"), t.srcKey.startsWith("selectGroup")) {
                                var e = t.srcKey.slice(-1);
                                if (this.$store.state.game.charactersGroup[e]) {
                                    var a = this.$store.state.game.charactersGroup[e];
                                    this.onBoardCharacters.find((function(t) {
                                        return t.id === a
                                    })) && this.$store.dispatch("game/selectCharacter", {
                                        vm: this,
                                        id: a
                                    })
                                }
                            }
                            if (this.$store.state.game.selectedCharacter) {
                                var s = this.$store.state.game.selectedCharacter;
                                if ("nextAgent" === t.srcKey) {
                                    var i = s ? this.onBoardCharacters.findIndex((function(t) {
                                            return t.id === s.id
                                        })) : -1,
                                        n = this.onBoardCharacters[(i + 1) % this.onBoardCharacters.length].id;
                                    this.$store.dispatch("game/selectCharacter", {
                                        vm: this,
                                        id: n
                                    })
                                }
                                if ("centerToCharacter" === t.srcKey && this.$root.$emit("map:centerToCharacter", s), t.srcKey.startsWith("createGroup")) {
                                    var r = t.srcKey.slice(-1);
                                    this.$store.commit("game/updateCharactersGroup", {
                                        key: r,
                                        characterId: s.id
                                    })
                                }
                            } ["ranking", "faction", "empire", "operations"].includes(t.srcKey) && this.$root.$emit("togglePanel", t.srcKey), ["patent", "doctrine"].includes(t.srcKey) && this.$root.$emit("openBottomMiniPanel", t.srcKey), ["character-market", "victory"].includes(t.srcKey) && this.$root.$emit("openTopMiniPanel", t.srcKey)
                        },
                        togglePanel: function(t, e) {
                            var a = this;
                            return r()(c.a.mark((function s() {
                                var i;
                                return c.a.wrap((function(s) {
                                    for (;;) switch (s.prev = s.next) {
                                        case 0:
                                            if (!(i = a.panels.find((function(e) {
                                                return e.name === t
                                            }))).excludeSpeeds || !i.excludeSpeeds.includes(a.$store.state.game.time.speed)) {
                                                s.next = 3;
                                                break
                                            }
                                            return s.abrupt("return");
                                        case 3:
                                            if (!a.somePanelIsOpen || a.activePanel.name !== t) {
                                                s.next = 8;
                                                break
                                            }
                                            return s.next = 6, a.closePanel();
                                        case 6:
                                            s.next = 10;
                                            break;
                                        case 8:
                                            return s.next = 10, a.openPanel(t, e);
                                        case 10:
                                        case "end":
                                            return s.stop()
                                    }
                                }), s)
                            })))()
                        },
                        openPanel: function(t, e) {
                            var a = this;
                            return r()(c.a.mark((function s() {
                                return c.a.wrap((function(s) {
                                    for (;;) switch (s.prev = s.next) {
                                        case 0:
                                            return s.next = 2, a.animateClosePanelContainer();
                                        case 2:
                                            a.$root.$emit("closeTopMiniPanel"), a.$root.$emit("closeBottomMiniPanel"), a.$store.commit("game/addOverlay", "panel"), a.animateOpenPanelContainer(t, e);
                                        case 6:
                                        case "end":
                                            return s.stop()
                                    }
                                }), s)
                            })))()
                        },
                        closePanel: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, t.animateClosePanelContainer();
                                        case 2:
                                            t.$store.commit("game/removeOverlay");
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        },
                        animateOpenPanelContainer: function(t, e) {
                            var a = this;
                            return new Promise((function(s) {
                                a.$ambiance.sound("panel-open"), a.activePanel = a.panels.find((function(e) {
                                    return e.name === t
                                })), a.somePanelIsOpen = !0, a.$refs[t].open(e);
                                var i = "left" === a.activePanel.side ? {
                                        left: "-100vw",
                                        right: "auto"
                                    } : {
                                        left: "auto",
                                        right: "-100vw"
                                    },
                                    n = "left" === a.activePanel.side ? {
                                        left: 0
                                    } : {
                                        right: 0
                                    };
                                new l.e({
                                    onComplete: function() {
                                        s()
                                    }
                                }).set(a.$refs.panelsContainer, i).to(a.$refs.panelsContainer, Si(Si({}, n), {}, {
                                    ease: l.a.easeOut,
                                    duration: .8
                                }), 0)
                            }))
                        },
                        animateClosePanelContainer: function() {
                            var t = this;
                            return this.somePanelIsOpen ? new Promise((function(e) {
                                t.$ambiance.sound("panel-close");
                                var a = "left" === t.activePanel.side ? {
                                    left: "-100vw"
                                } : {
                                    right: "-100vw"
                                };
                                new l.e({
                                    onComplete: function() {
                                        t.somePanelIsOpen = !1, t.activePanel = {}, e()
                                    }
                                }).to(t.$refs.panelsContainer, Si(Si({}, a), {}, {
                                    ease: l.a.linear,
                                    duration: .4
                                }), 0)
                            })) : Promise.resolve()
                        },
                        animateSplash: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                var a, s, i, n, r;
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return (new l.e).to(t.$refs.spsLogo, {
                                                opacity: 1,
                                                duration: 6
                                            }, 1).to(t.$refs.spsQuote, {
                                                opacity: 1,
                                                duration: 6
                                            }, 1), a = "quotes" in t.$i18n.messages[t.$i18n.locale], s = "", a ? (i = Object.keys(t.$i18n.messages[t.$i18n.locale].quotes).length, n = Math.floor(Math.random() * i), s = "\n          <p>".concat(t.$t("quotes[".concat(n, "].content")), "</p>\n          <footer>\n            ").concat(t.$t("quotes[".concat(n, "].author")), "<br/>\n            ").concat(t.$t("quotes[".concat(n, "].reference")), "\n          </footer>\n        ")) : s = "<p>Welcome</p>", e.next = 6, new Promise((function(t) {
                                                new d.a(".typing", {
                                                    strings: [s],
                                                    typeSpeed: 8,
                                                    showCursor: !1,
                                                    autoInsertCss: !1,
                                                    startDelay: 1e3,
                                                    loop: !1,
                                                    onComplete: function() {
                                                        setTimeout(t, 2e3)
                                                    }
                                                })
                                            }));
                                        case 6:
                                            r = setInterval((function() {
                                                t.connected && (clearInterval(r), t.hideSplash())
                                            }), 50);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        },
                        hideSplash: function() {
                            var t = this;
                            return r()(c.a.mark((function e() {
                                return c.a.wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, (new l.e).to(t.$refs.spsLogo, {
                                                opacity: 0,
                                                duration: 3
                                            }, 0).to(t.$refs.spsQuote, {
                                                opacity: 0,
                                                duration: 3
                                            }, 1).to(t.$refs.spsMain, {
                                                opacity: 0,
                                                duration: 2
                                            }, 3);
                                        case 2:
                                            t.showSplash = !1;
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })))()
                        }
                    },
                    mounted: function() {
                        var t = this;
                        return r()(c.a.mark((function e() {
                            return c.a.wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (x.a.$on("map/update", (function(e) {
                                            t.mapData.update(e)
                                        })), t.$socket.joinGame(), t.$store.dispatch("portal/initConversations", t.$store.state.game.auth.instance), "production" !== t.$config.MODE) {
                                            e.next = 8;
                                            break
                                        }
                                        return e.next = 6, t.animateSplash();
                                    case 6:
                                        e.next = 9;
                                        break;
                                    case 8:
                                        t.showSplash = !1;
                                    case 9:
                                        t.$root.$on("togglePanel", (function(e, a) {
                                            t.togglePanel(e, a)
                                        })), t.$root.$on("closePanel", (function() {
                                            t.closePanel()
                                        })), t.$root.$on("changeChatState", (function(e) {
                                            t.isChatOpen = e
                                        }));
                                    case 12:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })))()
                    },
                    components: {
                        Settings: Ea,
                        Chat: ha,
                        NotificationCenter: _a,
                        Tutorial: ja,
                        Topbar: rs,
                        GalaxyContainer: Vs,
                        Bottombar: Ci,
                        EmpirePanel: Ut,
                        OperationsPanel: ae,
                        RankingPanel: oe,
                        FactionPanel: he,
                        MessengerPanel: xe,
                        EventPanel: pa,
                        OpenedCharacter: wi,
                        OpenedPlayer: Pi,
                        UniverseMap: Gt
                    }
                },
                ji = Object(Ft.a)(Mi, (function() {
                    var t = this,
                        e = t.$createElement,
                        s = t._self._c || e;
                    return s("div", {
                        staticClass: "game-context"
                    }, [s("div", {
                        directives: [{
                            name: "shortkey",
                            rawName: "v-shortkey",
                            value: {
                                escape: ["esc"],
                                firstSystem: ["c"],
                                nextSystem: ["."],
                                nextAgent: [","],
                                centerToCharacter: ["space"],
                                patent: ["p"],
                                doctrine: ["l"],
                                "character-market": ["m"],
                                ranking: ["r"],
                                victory: ["v"],
                                faction: ["f"],
                                empire: ["s"],
                                operations: ["a"],
                                selectGroup1: ["1"],
                                createGroup1: ["ctrl", "1"],
                                selectGroup2: ["2"],
                                createGroup2: ["ctrl", "2"],
                                selectGroup3: ["3"],
                                createGroup3: ["ctrl", "3"],
                                selectGroup4: ["4"],
                                createGroup4: ["ctrl", "4"],
                                selectGroup5: ["5"],
                                createGroup5: ["ctrl", "5"],
                                selectGroup6: ["6"],
                                createGroup6: ["ctrl", "6"],
                                selectGroup7: ["7"],
                                createGroup7: ["ctrl", "7"],
                                selectGroup8: ["8"],
                                createGroup8: ["ctrl", "8"],
                                selectGroup9: ["9"],
                                createGroup9: ["ctrl", "9"]
                            },
                            expression: "{\n      escape: ['esc'],\n      firstSystem: ['c'],\n      nextSystem: ['.'],\n      nextAgent: [','],\n      centerToCharacter: ['space'],\n      patent: ['p'],\n      doctrine: ['l'],\n      'character-market': ['m'],\n      ranking: ['r'],\n      victory: ['v'],\n      faction: ['f'],\n      empire: ['s'],\n      operations: ['a'],\n      selectGroup1: ['1'],\n      createGroup1: ['ctrl', '1'],\n      selectGroup2: ['2'],\n      createGroup2: ['ctrl', '2'],\n      selectGroup3: ['3'],\n      createGroup3: ['ctrl', '3'],\n      selectGroup4: ['4'],\n      createGroup4: ['ctrl', '4'],\n      selectGroup5: ['5'],\n      createGroup5: ['ctrl', '5'],\n      selectGroup6: ['6'],\n      createGroup6: ['ctrl', '6'],\n      selectGroup7: ['7'],\n      createGroup7: ['ctrl', '7'],\n      selectGroup8: ['8'],\n      createGroup8: ['ctrl', '8'],\n      selectGroup9: ['9'],\n      createGroup9: ['ctrl', '9'],\n    }"
                        }],
                        class: "theme-" + t.theme,
                        on: {
                            shortkey: t.onShortkey
                        }
                    }, [s("settings", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.isSettingsOpen,
                            expression: "isSettingsOpen"
                        }],
                        on: {
                            close: function(e) {
                                t.isSettingsOpen = !t.isSettingsOpen
                            }
                        }
                    }), t._v(" "), t.showSplash ? s("div", {
                        ref: "spsMain",
                        staticClass: "splashscreen"
                    }, [s("div", {
                        staticClass: "container"
                    }, [s("div", {
                        ref: "spsLogo",
                        staticClass: "logo",
                        staticStyle: {
                            opacity: "0"
                        }
                    }, [s("img", {
                        attrs: {
                            src: a(681),
                            alt: "Rising Constellation"
                        }
                    })]), t._v(" "), s("div", {
                        ref: "spsQuote",
                        staticClass: "content",
                        staticStyle: {
                            opacity: "0"
                        }
                    }, [s("blockquote", {
                        staticClass: "typing"
                    })])])]) : t._e(), t._v(" "), t.connected ? s("div", {
                        staticClass: "game-container"
                    }, [s("topbar", {
                        ref: "topbar"
                    }), t._v(" "), s("chat", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isTutorial && t.isChatOpen,
                            expression: "!isTutorial && isChatOpen"
                        }]
                    }), t._v(" "), s("notification-center"), t._v(" "), t.isTutorial ? s("tutorial") : t._e(), t._v(" "), s("opened-character"), t._v(" "), s("opened-player"), t._v(" "), s("galaxy-container"), t._v(" "), s("universe-map", {
                        attrs: {
                            data: t.mapData
                        }
                    }), t._v(" "), s("div", {
                        ref: "panelsContainer",
                        staticClass: "panels-container"
                    }, [s("empire-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "empire" === t.activePanelName,
                            expression: "activePanelName === 'empire'"
                        }],
                        ref: "empire",
                        on: {
                            close: t.closePanel
                        }
                    }), t._v(" "), s("operations-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "operations" === t.activePanelName,
                            expression: "activePanelName === 'operations'"
                        }],
                        ref: "operations",
                        on: {
                            close: t.closePanel
                        }
                    }), t._v(" "), s("ranking-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isTutorial && "ranking" === t.activePanelName,
                            expression: "!isTutorial && activePanelName === 'ranking'"
                        }],
                        ref: "ranking",
                        on: {
                            close: t.closePanel
                        }
                    }), t._v(" "), s("faction-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isTutorial && "faction" === t.activePanelName,
                            expression: "!isTutorial && activePanelName === 'faction'"
                        }],
                        ref: "faction",
                        on: {
                            close: t.closePanel
                        }
                    }), t._v(" "), s("messenger-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isTutorial && "messenger" === t.activePanelName,
                            expression: "!isTutorial && activePanelName === 'messenger'"
                        }],
                        ref: "messenger",
                        on: {
                            close: t.closePanel
                        }
                    }), t._v(" "), s("event-panel", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isTutorial && "event" === t.activePanelName,
                            expression: "!isTutorial && activePanelName === 'event'"
                        }],
                        ref: "event",
                        on: {
                            close: t.closePanel
                        }
                    })], 1), t._v(" "), s("bottombar", {
                        ref: "bottombar"
                    })], 1) : t._e()], 1)])
                }), [], !1, null, null, null);
            e.default = ji.exports
        }
    }
]);