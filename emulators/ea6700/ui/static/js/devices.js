if (!window.CISCO) {
    window.CISCO = {}
}
window.CISCO.Device = (function() {
    var c, b = "userDeviceName",
    d = "userDeviceType";
    var a = {
        init: function(e) {
            this.data = e
        },
        deviceID: function() {
            var e = function() {
                return this.data.deviceID
            }.bind(this);
            return e()
        },
        knownMACAddresses: function() {
            var e = function() {
                return this.data.knownMACAddresses
            }.bind(this);
            return e()
        },
        manufacturer: function() {
            var e = function() {
                var f = this.data.model.manufacturer;
                if (!f) {
                    if (this.operatingSystem() == "OS X") {
                        f = "Apple"
                    } else {
                        f = ""
                    }
                }
                return f
            }.bind(this);
            return e()
        },
        modelNumber: function() {
            var e = function() {
                return this.data.model.modelNumber || ""
            }.bind(this);
            return e()
        },
        hardwareVersion: function() {
            var e = function() {
                return this.data.model.hardwareVersion
            }.bind(this);
            return e()
        },
        description: function() {
            var e = function() {
                return this.data.model.description
            }.bind(this);
            return e()
        },
        serialNumber: function() {
            var e = function() {
                return this.data.unit.serialNumber
            }.bind(this);
            return e()
        },
        firmwareVersion: function() {
            var e = function() {
                return this.data.unit.firmwareVersion
            }.bind(this);
            return e()
        },
        firmwareDate: function() {
            var e = function() {
                return this.data.unit.firmwareDate
            }.bind(this);
            return e()
        },
        operatingSystem: function() {
            var e = function() {
                return this.data.unit.operatingSystem
            }.bind(this);
            return e()
        },
        connections: function() {
            var e = function() {
                return this.data.connections
            }.bind(this);
            return e()
        },
        isAuthority: function() {
            var e = function() {
                return this.data.isAuthority
            }.bind(this);
            return e()
        },
        friendlyName: function() {
            var e = function() {
                var f = this.getCustomProperty(b);
                if (!f) {
                    f = this.data.friendlyName || this.data.model.modelNumber || CISCO.ui.strings.deviceList.networkDevice
                }
                return f
            }.bind(this);
            return e()
        },
        deviceType: function() {
            var e = function() {
                var i = this.getCustomProperty(d) || this.data.model.deviceType;
                if (!i) {
                    var f = this.data.friendlyName ? this.data.friendlyName.toLowerCase() : "",
                    h = this.manufacturer(),
                    g = this.modelNumber(),
                    j = this.operatingSystem();
                    if (h == "Cisco Systems, Inc.") {
                        if (g == "EA2700") {
                            i = "router-ea2700"
                        } else {
                            if (g == "EA3500") {
                                i = "router-ea3500"
                            } else {
                                if (g == "EA4500") {
                                    i = "router-ea4500"
                                } else {
                                    if (g == "EA6500") {
                                        i = "router-ea6500"
                                    }
                                }
                            }
                        }
                    } else {
                        if (f.indexOf("iphone") > -1 || f.indexOf("android") > -1) {
                            i = "smartphone"
                        } else {
                            if (f.indexOf("apple-tv") > -1 || f.indexOf("ipod") > -1) {
                                i = "digital-media-player"
                            } else {
                                if (f.indexOf("ipad") > -1) {
                                    i = "tablet-ereader"
                                } else {
                                    if (f.indexOf("laptop") > -1) {
                                        if (h == "Apple") {
                                            i = "laptop-mac"
                                        } else {
                                            i = "laptop-pc"
                                        }
                                    } else {
                                        if (f.indexOf("imac") > -1) {
                                            i = "desktop-mac"
                                        } else {
                                            if (j) {
                                                j = j.toLowerCase();
                                                if (j == "os x") {
                                                    i = "desktop-mac"
                                                } else {
                                                    if (j.indexOf("windows") == 0) {
                                                        i = "desktop-pc"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return i
            }.bind(this);
            return e()
        },
        isOnline: function() {
            var e = function() {
                return this.data.connections.length > 0
            }.bind(this);
            return e()
        },
        isGuest: function() {
            var e = function() {
                var f = 0;
                if (this.isOnline()) {
                    for (f = 0; f < this.data.connections.length; f++) {
                        if (!this.data.connections[f].wireless) {
                            return false
                        } else {
                            if (!this.data.connections[f].wireless.isGuest) {
                                return false
                            }
                        }
                    }
                    return true
                }
                return false
            }.bind(this);
            return e()
        },
        setUserName: function(f, e) {
            this.setCustomProperty(b, f);
            if (typeof e === "function") {
                e()
            }
        },
        setUserType: function(f, e) {
            this.setCustomProperty(d, f);
            if (typeof e === "function") {
                e()
            }
        },
        removeMe: function(e) {
			var f = {
				"result": "OK"
			};
			var ddids = $.cookie("CCC.deleteDeviceIDs") || [];
			ddids = typeof(ddids) == 'string' ? eval(ddids) : ddids;
			ddids.push( this.deviceID() );
			ddids = unique(ddids);
			$.cookie("CCC.deleteDeviceIDs",JSON.stringify(ddids),{path:webroot||'/'});
			window.setTimeout(function(){
				if (typeof e === "function") {
					e(f)
				}
			}, 1000);
            /*JNAP.send({
                action: "../cisco.com/jnap/devicelist/DeleteDevice",
                data: {
                    deviceID: this.deviceID()
                },
                cb: function(f) {
                    if (typeof e === "function") {
                        e(f)
                    }
                },
                disableDefaultJnapErrHandler: true
            })*/
        },
        getCustomProperty: function(e) {
            var f = function() {
                var g = 0,
                h = null;
                for (g = 0; g < this.data.properties.length; g++) {
                    if (this.data.properties[g].name == e) {
                        h = this.data.properties[g].value;
                        break
                    }
                }
                return h
            }.bind(this);
            return f()
        },
        setCustomProperty: function(e, f) {
			var mdids = $.cookie("CCC.modifiedDeviceIDs") || {};
			if( typeof(mdids) == 'string' )
				eval('mdids = ' + mdids + ';')
			mdids[this.deviceID()] = mdids[this.deviceID()] || {};
			mdids[this.deviceID()][e] = f;
			$.cookie("CCC.modifiedDeviceIDs",JSON.stringify(mdids),{path:webroot||'/'});
            /*JNAP.send({
                action: "../cisco.com/jnap/devicelist/SetDeviceProperties",
                data: {},
                cb: function(g) {
                    if (g.result == "OK") {}
                }
            })*/
        }
    };
    return function(e) {
        var f = Object.create(a);
        f.init.apply(f, arguments);
        return f
    }
})();
window.CISCO.deviceManager = (function() {
    var c = 0,
    b = 0,
    l = 30000,
    m = {},
    o = [],
    h = true;
    if (CISCO.Event) {
        CISCO.Event.connect("router.interruptionStarted",
        function() {
            h = false
        });
        CISCO.Event.connect("router.interruptionCompleted",
        function() {
            h = true
        })
    }
    function f(q, r) {
        var p = null;
        $.each(r.connections(),
        function() {
            if (this.macAddress == q) {
                p = this;
                return
            }
        });
        return p
    }
    function g(p, r) {
        function s(t, u) {
            if (t.result == "OK") {
                $.each(o,
                function() {
                    for (var w in m) {
                        var v = f(this.macAddress, m[w]);
                        if (v) {
                            v.negotiatedMbps = this.negotiatedMbps;
                            v.wireless = this.wireless
                        }
                    }
                });
                p()
            } else {
                if (null != r) {
                    r(t)
                }
            }
        }
        if (h) {
            var q = JNAP.Transaction({
                onComplete: s,
                disableDefaultJnapErrHandler: true,
                disableDefaultAjaxErrHandler: true,
                disableDefaultRebootErrHandler: true
            });
            q.add({
                action: "../cisco.com/jnap/devicelist/GetDevices",
                data: {
                    sinceRevision: c
                },
                cb: function(t) {
                    if (t.result == "OK") {
                        t.output.devices.forEach(function(u) {
                            m[u.deviceID] = CISCO.Device(u)
                        });

						var tmp = $.cookie("CCC.deleteDeviceIDs");
						if( tmp )
						{
							tmp = eval(tmp);
							if( tmp.length > 0 )
							{
								t.output.deletedDeviceIDs = $.merge(t.output.deletedDeviceIDs, tmp)
							}
						}
						
						var propoties = $.cookie("CCC.modifiedDeviceIDs");
						var tmpPropoty = {};
						if( typeof(propoties) == 'string' )
							eval('propoties = ' + propoties + ';');
						if( propoties )
						{
							for( var key in propoties )
							{
								for( var dID in m )
								{
									if( dID == key )
									{
										tmpPropoty = {
											"deviceID": dID,
											"lastChangeRevision": 125,
											"model": {
												"deviceType": m[dID].deviceType()
											},
											"unit": {
												"operatingSystem": m[dID].operatingSystem()
											},
											"isAuthority": m[dID].isAuthority(),
											"friendlyName": m[dID].friendlyName(),
											"knownMACAddresses": m[dID].knownMACAddresses(),
											"connections": m[dID].connections(),
											"properties": [{
												"name": "userDeviceName",
												"value": propoties[key].userDeviceName || m[dID].friendlyName()
											},{
												"name": "userDeviceType",
												"value": propoties[key].userDeviceType || m[dID].deviceType()
											}],
											"maxAllowedProperties": 16
										};
										m[dID] = CISCO.Device(tmpPropoty);
									}
								}
							}
						}

                        t.output.deletedDeviceIDs.forEach(function(u) {
                            delete m[u]
                        });
                        if (c != t.output.revision) {
                            CISCO.Event.fire("devices.revisionUpdated")
                        }
                        c = t.output.revision;
                        b = (new Date()).getTime();
                    }
                }
            });
            q.add({
                action: "../cisco.com/jnap/networkconnections/GetNetworkConnections",
                data: {},
                cb: function(t) {
                    if (t.result == "OK") {
                        o = t.output.connections
                    }
                }
            });
            q.send()
        }
    }
    function n(r) {
        if (typeof r != "object") {
            r = {
                cb: arguments[0],
                threshold: arguments[1],
                cbJNAPError: arguments[2]
            }
        }
        var q = r.cb,
        p = r.threshold,
        s = r.cbJNAPError;
        p = p || l;
        if ((new Date()).getTime() > (b + p) || 0 == b) {
            g(q, s)
        } else {
            q()
        }
    }
    function k(s) {
        if (typeof s != "object") {
            s = {
                cb: arguments[0],
                exclusions: arguments[1],
                threshold: arguments[2],
                cbError: arguments[3],
                doPollForChange: arguments[4]
            }
        }
        var q = s.cb,
        r = s.exclusions || {},
        p = s.threshold,
        u = s.cbError,
        t = !!s.doPollForChange,
        v = s.currentRevision || -1;
        if (t && v == -1) {
            s.currentRevision = v = c
        }
        n(function() {
            /*if (t && v == c) {
                setTimeout(function() {
                    k(s)
                },
                2500)
            } else {*/
                var w = [];
                for (var x in m) {
                    if ((r.excludeAuthority && m[x].isAuthority()) || (r.excludeOffline && m[x].data.connections.length < 1)) {
                        continue
                    }
                    w.push($.extend(true, {},
                    m[x]))
                }
                q(w);
            /*}*/
        },
        p, u)
    }
    function a(r) {
        if (typeof r != "object") {
            r = {
                cb: arguments[0],
                macAddress: arguments[1],
                threshold: arguments[2],
                cbError: arguments[3]
            }
        }
        var q = r.cb,
        s = r.macAddress,
        p = r.threshold,
        t = r.cbError;
        n(function() {
            var u = null;
            for (var w in m) {
                for (var v = 0; v < m[w].data.knownMACAddresses.length; v++) {
                    if (s == m[w].data.knownMACAddresses[v]) {
                        u = m[w];
                        break
                    }
                }
                if (u) {
                    break
                }
            }
            q(u)
        },
        p, t)
    }
    function i(r) {
        if (typeof r != "object") {
            r = {
                cb: arguments[0],
                matchDeviceID: arguments[1],
                threshold: arguments[2],
                cbError: arguments[3]
            }
        }
        var q = r.cb,
        t = r.matchDeviceID,
        p = r.threshold,
        s = r.cbError;
        n(function() {
            var u = null;
            for (var v in m) {
                if (m[v].deviceID() == t) {
                    u = m[v];
                    break
                }
            }
            q(u)
        },
        p, s)
    }
    function d(s) {
        if (typeof s != "object") {
            s = {
                cb: arguments[0],
                deviceTypes: arguments[1],
                threshold: arguments[2],
                cbError: arguments[3]
            }
        }
        var q = s.cb,
        r = s.deviceTypes,
        p = s.threshold,
        t = s.cbError;
        n(function() {
            var w = [];
            for (var v in m) {
                for (var u = 0; u < r.length; u++) {
                    if (r[u] == m[v].deviceType()) {
                        w.push(m[v]);
                        break
                    }
                }
            }
            q(w)
        },
        p, t)
    }
    function j(s) {
        if (typeof s != "object") {
            s = {
                cb: arguments[0],
                cbFilter: arguments[1],
                threshold: arguments[2],
                cbError: arguments[3]
            }
        }
        var r = s.cb,
        q = s.cbFilter,
        p = s.threshold,
        t = s.cbError;
        n(function() {
            var v = [];
            for (var u in m) {
                if (q(m[u])) {
                    v.push(m[u])
                }
            }
            r(v)
        },
        p, t)
    }
    function e(r) {
        if (typeof r != "object") {
            r = {
                cb: arguments[0],
                threshold: arguments[1],
                cbError: arguments[2]
            }
        }
        var q = r.cb,
        p = r.threshold,
        s = r.cbError;
        n(function() {
            var t = null;
            for (var u in m) {
                if (m[u].isAuthority()) {
                    t = m[u];
                    break
                }
            }
            q(t)
        },
        p, s)
    }
    return {
        getDevices: k,
        getDeviceByMACAddress: a,
        getDeviceByDeviceID: i,
        getDevicesByTypes: d,
        getDevicesByCallback: j,
        getAuthorityDevice: e
    }
} ());