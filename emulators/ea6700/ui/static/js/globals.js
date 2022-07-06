GLOBAL = (function() {
    var c = false,
    n = {
        applets: [{
            appletId: "691E0149-A1D4-450C-9922-82CAA65B16C0",
            name: "Device List",
            description: "View devices connected to your network",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/device_list/main.html",
            defaultPosition: 1,
            appletCategory: {
                appletCategoryId: "AFAC7A48-662B-4333-884F-D7F5496EAF12",
                name: "Smart Wi-Fi Tools",
                defaultPosition: 1
            }
        },
        {
            appletId: "6B749D0D-1E3B-4C2A-B0CE-D19EDA0225AC",
            name: "Parental Controls",
            description: "Restrict Internet access and content",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/parental_controls/main.html",
            defaultPosition: 3,
            appletCategory: {
                appletCategoryId: "AFAC7A48-662B-4333-884F-D7F5496EAF12",
                name: "Smart Wi-Fi Tools",
                defaultPosition: 1
            }
        },
        {
            appletId: "B24C693D-4DFF-417D-A10F-A8212051E60E",
            name: "Guest Access",
            description: "Give Internet access to guests in your home",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/guest_access/main.html",
            defaultPosition: 2,
            appletCategory: {
                appletCategoryId: "AFAC7A48-662B-4333-884F-D7F5496EAF12",
                name: "Smart Wi-Fi Tools",
                defaultPosition: 1
            }
        },
        {
            appletId: "BDBC8297-8982-4BCF-84EC-91783FF9013C",
            name: "Connectivity",
            description: "View and change basic router configuration",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/connectivity/main.html",
            defaultPosition: 1,
            appletCategory: {
                appletCategoryId: "68980747-C5AA-4C8B-AF53-FC1023DE2567",
                name: "Router Settings",
                defaultPosition: 2
            }
        },
        {
            appletId: "1BED1B78-87DA-4871-A731-8F54B7D3DC00",
            name: "Troubleshooting",
            description: "Access status reports and diagnostic functions",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/troubleshooting/main.html",
            defaultPosition: 2,
            appletCategory: {
                appletCategoryId: "68980747-C5AA-4C8B-AF53-FC1023DE2567",
                name: "Router Settings",
                defaultPosition: 2
            }
        },
        {
            appletId: "7B1F462B-1A78-4AF6-8FBB-0C221703BEA4",
            name: "Wireless",
            description: "View and change wireless configuration",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/wireless/main.html",
            defaultPosition: 3,
            appletCategory: {
                appletCategoryId: "68980747-C5AA-4C8B-AF53-FC1023DE2567",
                name: "Router Settings",
                defaultPosition: 2
            }
        },
        {
            appletId: "23FA4143-22B4-49D7-BDC5-3ED54EDF69CB",
            name: "Security",
            description: "View and change security configuration",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/security/main.html",
            defaultPosition: 4,
            appletCategory: {
                appletCategoryId: "68980747-C5AA-4C8B-AF53-FC1023DE2567",
                name: "Router Settings",
                defaultPosition: 2
            }
        },
        {
            appletId: "7C23A10B-3C02-4F64-B954-44A148144423",
            name: "Speed Test",
            description: "Test your speed",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/speed_test/main.html",
            defaultPosition: 5,
            appletCategory: {
                appletCategoryId: "AFAC7A48-662B-4333-884F-D7F5496EAF12",
                name: "Smart Wi-Fi Tools",
                defaultPosition: 1
            }
        },
        {
            appletId: "9BDB14C9-C328-40ED-89A9-A3A822B8B5D2",
            name: "Media Prioritization",
            description: "Prioritize devices and applications bandwidth",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/media_prioritization/main.html",
            defaultPosition: 4,
            appletCategory: {
                appletCategoryId: "AFAC7A48-662B-4333-884F-D7F5496EAF12",
                name: "Smart Wi-Fi Tools",
                defaultPosition: 1
            }
        },
        {
            appletId: "A2DB16C0-59B9-4C79-9BF2-E5A3A307F9C1",
            name: "USB Storage",
            description: "Access a USB storage device",
            isFree: true,
            deviceType: "ROUTER",
            version: "1.0.0.0",
            url: "ui/dynamic/applets/usb_storage/main.html",
            defaultPosition: 6,
            appletCategory: {
                appletCategoryId: "AFAC7A48-662B-4333-884F-D7F5496EAF12",
                name: "Smart Wi-Fi Tools",
                defaultPosition: 1
            }
        }]
    },
    t = null,
    x = false,
    k = null,
    u = [],
    r = null,
    a = null,
    l = null,
    g = {
        wanType: "DHCP"
    },
    q = null,
    o = null;
    function h(C) {
        JNAP.send({
            action: "../cisco.com/jnap/ownednetwork/GetOwnedNetworkID",
            data: {action:'GetOwnedNetworkID'},
            cb: function(E, D) {
                if (D.status == 200) {
                    if (E.result === "OK") {
                        x = true;
                        k = E.output.ownedNetworkID
                    } else {
                        x = false;
                        k = null
                    }
                } else {
                    x = false;
                    k = null
                }
                C()
            },
            disableDefaultAjaxErrHandler: true,
            disableDefaultJnapErrHandler: true,
            disableDefaultRebootErrHandler: true,
            forceLocal: true
        })
    }
    function j() {
        if (GLOBAL.uiLoadedFromCloud()) {
            d()
        } else {
            e()
        }
        console.warn("GLOBAL.initted");
        CISCO.Event.fire("GLOBAL.initted")
    }
    function y() {
        CISCO.ui.MainMenu.initialize();
        CISCO.ui.TopMenu.initialize(u)
    }
    function d() {
        if (r === "OK") {
            if (u.length == 0) {
                window.location.replace("ui/dynamic/no-associated-router.html")
            } else {
                if (!GLOBAL.getCurrentNetworkID()) {
					//alert('GLOBAL.getCurrentNetworkID() = ' + GLOBAL.getCurrentNetworkID());
                    window.location.replace("ui/dynamic/no-remote-router.html")
                } else {
                    CONNECT.initialize();
                    if (GLOBAL.getCurrentWanType() != "Bridge") {
                        CONNECT.initializeWidgets()
                    }
                    if (!GLOBAL.isAuthorityRemote()) {
                        OOKLA.check_bandwidth_calibration()
                    }
                    y()
                }
            }
        } else {
            if (r === "ACCOUNT_LOCKED_OUT") {
                window.location.replace("ui/dynamic/account-lockout.html")
            } else {
                CISCO.ui.dialogError({
                    result: r
                })
            }
        }
        a()
    }

    function e() {
        if (r === "OK") {
            CONNECT.initialize();
            if (GLOBAL.getCurrentWanType() != "Bridge") {
                CONNECT.initializeWidgets()
            }
            CISCO.util.checkInternetConnection(function(C) {
                if (C) {
                    OOKLA.check_bandwidth_calibration()
                }
            });
            y()
        }
        a()
    }

    function w(E) {
        var D = null != $.cookie("admin-auth"),
        C = null != $.cookie("user-auth-token");
		/*
        if (D == C) {
            CISCO.util.signOut()
        } else {*/
            if (D && GLOBAL.uiLoadedFromCloud()) {
                m(E)
            } else {
                if (GLOBAL.uiLoadedFromCloud()) {
                    p(E)
                } else {
                    m(E)
                }
            }
        /*}*/
    }
    function b(C) {
        C.add(function() {
            var D = this;
            CLOUD.send({
                url: "cloud/device-service/rest/accounts/self/networks",
                type: "GET",
                request: {},
                cb: function(F, E) {
                    u = F.networkAccountAssociations;
                    D.completed()
                },
                cbError: function(E) {
                    r = "ERROR_GET_NETWORKS";
                    D.failed()
                }
            })
        });
        C.add(function() {
            var D = this;
            CLOUD.send({
                url: ( webroot || getWebRoot() ) + "cloud/user-service/rest/accounts/self",
                type: "GET",
                request: {},
                cb: function(F, E) {
                    o = F.account;
                    D.completed()
                },
                cbError: function(E) {
                    D.failed()
                }
            })
        });
        C.add(function() {
            var D = this;
            $.ajax({
                url: "cloud/user-service/version.jsp",
                success: function(F, E) {
                    q = F;
                    D.completed()
                },
                error: function(E) {
                    D.failed()
                }
            })
        });
        C.add(function() {
            var D = this;
            s(function(E) {
                if (!E) {
                    D.failed()
                } else {
                    D.completed()
                }
            })
        })
    }
    function p(D) {
        r = "OK";
        a = D;
        var C = TaskManager({
            parallel: true,
            callback: function(E) {
                i()
            }
        });
        C.add(function() {
            var E = this;
            h(E.completed)
        });
        b(C);
        C()
    }
    function m(D) {
        r = "OK";
        a = D;
        u = [];
        var C = TaskManager({
            parallel: true,
            callback: function(E) {
                j()
            }
        });
        C.add(function() {
            var E = this;
            CISCO.deviceManager.getAuthorityDevice(function(F) {
                u.push({
                    networkAccountAssociation: {
                        network: {
                            friendlyName: F.friendlyName()
                        },
                        online: true
                    }
                });
                E.completed()
            })
        });
        C.add(function() {
            var E = this;
            CONNECT.AppletManager.initialize(function(F) {
                E.completed()
            })
        });
        C.add(function() {
            var E = this;
            s(function(F) {
                if (!F) {
                    r = "ERROR_FAIL_GET_DEVICE_INFO";
                    E.failed()
                } else {
                    E.completed()
                }
            })
        });
        C.add(function() {
            var E = this;
            A(function(F) {
                if (!F) {
                    r = "ERROR_FAIL_GET_WAN_SETTINGS";
                    E.failed()
                } else {
                    E.completed()
                }
            })
        });
        C()
    }
    function i(C) {
        C = C || false;
        if (r === "OK") {
            var D = TaskManager({
                parallel: true,
                callback: function(E) {
                    if (r === "OK" && u.length > 0 && !GLOBAL.getCurrentNetworkID()) {
                        var G = false,
                        F = 0;
                        for (F = 0; F < u.length; F++) {
                            if (k == u[F].networkAccountAssociation.network.networkId) {
                                GLOBAL.setCurrentNetworkID(u[F].networkAccountAssociation.network.networkId);
                                G = true;
                                break
                            }
                        }
                        if (!G) {
                            for (F = 0; F < u.length; F++) {
                                if (u[F].networkAccountAssociation.online) {
                                    if (!GLOBAL.getCurrentNetworkID() || u[F].networkAccountAssociation.defaultNetwork) {
                                        GLOBAL.setCurrentNetworkID(u[F].networkAccountAssociation.network.networkId);
                                        break
                                    }
                                }
                            }
                        }
                    }
                    CISCO.Event.fire("networkstatuses.complete");
                    if (!C) {
                        v()
                    }
                }
            });
            u.forEach(function(E) {
                D.add(function() {
                    var F = this,
                    G = E;
                    JNAP.send({
                        action: "../cisco.com/jnap/core/IsAdminPasswordDefault",
                        data: {},
                        cb: function(J, I) {
                            var H = false;
                            if (J.result == "OK") {
                                H = true
                            }
                            G.networkAccountAssociation.online = H;
                            F.completed()
                        },
                        disableDefaultAjaxErrHandler: true,
                        disableDefaultJnapErrHandler: true,
                        disableDefaultRebootErrHandler: true,
                        networkID: G.networkAccountAssociation.network.networkId
                    })
                })
            });
            D()
        } else {
            if (!C) {
                j()
            }
        }
    }
    function v() {
        if (r === "OK" && GLOBAL.getCurrentNetworkID()) {
            var C = TaskManager({
                parallel: true,
                callback: function(D) {
                    j()
                }
            });
            C.add(function() {
                var D = this;
                CONNECT.AppletManager.initialize(function(E) {
                    if (!E) {
                        r = "ERROR_GET_APPLET_LIST";
                        D.failed()
                    } else {
                        D.completed()
                    }
                })
            });
            C.add(function() {
                var D = this;
                s(function(E) {
                    if (!E) {
                        r = "ERROR_FAIL_GET_DEVICE_INFO";
                        D.failed()
                    } else {
                        D.completed()
                    }
                })
            });
            C.add(function() {
                var D = this;
                A(function(E) {
                    if (!E) {
                        r = "ERROR_FAIL_GET_WAN_SETTINGS";
                        D.failed()
                    } else {
                        D.completed()
                    }
                })
            });
            C()
        } else {
            j()
        }
    }
    function s(C) {
        l = null;
        JNAP.send({
            action: "../cisco.com/jnap/core/GetDeviceInfo",
            data: {action:'GetDeviceInfo'},
            cb: function(E, D) {
                var F = false;
                if (E.result == "OK") {
                    l = E.output;
                    F = true
                }
                CISCO.Event.fire("GLOBAL.getDeviceInfoComplete");
                if (typeof C === "function") {
                    C(F)
                }
            },
            disableDefaultAjaxErrHandler: true,
            disableDefaultJnapErrHandler: true,
            disableDefaultRebootErrHandler: true
        })
    }
    function A(C) {
        g = {
            wanType: ""
        };
        JNAP.send({
            action: "../cisco.com/jnap/router/GetWANSettings",
            data: {action:'GetWANSettings'},
            cb: function(E, D) {
                if (E.result == "OK") {
                    g = E.output;
                    C(true)
                } else {
                    C(false)
                }
            },
            disableDefaultAjaxErrHandler: true,
            disableDefaultJnapErrHandler: true,
            disableDefaultRebootErrHandler: true
        })
    }
    function z(G) {
        if (!l || !l.services) {
            return false
        }
        var C = true;
        for (var F = 0; F < G.length && C; F++) {
            var E = false;
            for (var D = 0; D < l.services.length; D++) {
                if (G[F] == l.services[D]) {
                    E = true;
                    break
                }
            }
            C = C && E
        }
        return C
    }
    function f(C) {
        var D = TaskManager({
            parallel: true,
            callback: function(E) {
                i(true);
                t = t ||
                function() {
                    C(u)
                };
                if (typeof C === "function") {
                    CISCO.Event.connect("networkstatuses.complete", t)
                }
            }
        });
        b(D);
        D()
    }
    function B(D, C) {
        //if (GLOBAL.areServicesSupported(["../cisco.com/jnap/ui/Settings"])) {
            if (GLOBAL.uiLoadedFromCloud() != D) {
                JNAP.send({
                    action: "../cisco.com/jnap/ui/SetRemoteSetting",
                    data: {/*
                        isEnabled: D
                    */},
                    cb: function(F, E) {
                        if (F.result === "OK") {
                            if (typeof C === "function") {
                                setTimeout(C, 2500)
                            }
                        }
                    },
                    forceLocal: !GLOBAL.uiLoadedFromCloud()
                });
                $.cookie("ui-proxy-path", null, {
                    path: webroot||"/"//,
                    //domain: "." + window.location.host
                });
                if (D) {
                    $.cookie("ui-proxy-path", "remote", {
                        path: webroot||"/"
                    });
                } else {
                    $.cookie("ui-proxy-path", "local", {
                        path: webroot||"/"
                    });
                }
				$.cookie('CCC.cloud', D ? 1 : 0, {
                        path: webroot||"/"
                });
                return
            }
        //}
        if (typeof C === "function") {
            C()
        }
    }
    return {
        discoverAuthority: h,
        initializeApplication: w,
        areServicesSupported: z,
        uiLoadedFromCloud: function() {
            return $.cookie("ui-proxy-path") == "remote"
        },
        isAuthorityRemote: function() {
            return GLOBAL.getAuthorityNetworkID() != GLOBAL.getCurrentNetworkID()
        },
        isBehindAuthority: function() {
            return x
        },
        getAuthorityNetworkID: function() {
            return k
        },
        getCurrentNetworkID: function() {
            return $.cookie("current-network-id");
        },
        setCurrentNetworkID: function(C) {
            $.cookie("current-network-id", C, {
                expires: null,
                path: webroot || "/"
            })
        },
        getCurrentNetworkModelName: function() {
            if (l) {
                return l.modelNumber
            }
            return null
        },
        getCurrentNetworkHardwareVersion: function() {
            if (l) {
                return l.hardwareVersion
            }
            return null
        },
        getCurrentNetworkFirmwareVersion: function() {
            if (l) {
                return l.firmwareVersion
            }
            return null
        },
        getCloudVersion: function() {
            return q
        },
        getUserFirstName: function() {
            return o.firstName
        },
        getUserLastName: function() {
            return o.lastName
        },
        getUserName: function() {
            return o.username
        },
        getFormattedUserName: function() {
            return o.firstName + Util.padIfNotNull(" ", Util.fixNoE(o.lastName, " ").substr(0, 1), ".")
        },
        getUserLocale: function() {
            return o.locale
        },
        setCloudAccount: function(C) {
            o = C
        },
        getLocalAppletList: function() {
            for (var D = 0; D < n.applets.length; D++) {
                var C = n.applets[D].url.replace("main.html", "config.json");
                $.ajax({
                    async: false,
                    url: C,
                    dataType: "json",
                    success: function(F, G, E) {
                        n.applets[D].name = F.name;
                        n.applets[D].description = F.description;
                        n.applets[D].appletCategory.name = F.categoryName
                    },
                    error: function(E, G, F) {}
                })
            }
            return n
        },
        getCurrentWanType: function() {
            return g.wanType
        },
        getCiscoHNClientID: function() {
            return "BB426FA7-16A9-5C1C-55AF-63A4167B26AD"
        },
        handleFirmwareUpdate: function(C) {
            s(C)
        },
        getDeviceInfo: s,
        updateUserDetails: f,
        setRemoteSetting: B
    }
} ());
OOKLA = (function() {
    var a;
    return {
        check_bandwidth_calibration: function() {
            CISCO.deviceManager.getAuthorityDevice(function(b) {
                a = b;
                if (!b.getCustomProperty("lastBandwidthCalibrationDate") || b.getCustomProperty("lastBandwidthCalibrationDate").length === 0) {
                    OOKLA.start_speed_test()
                }
            })
        },
        start_speed_test: function() {
            yepnope({
                load: "http://cisco.ookla.com/swfobject.js?2013-06-12",
                callback: function() {
                    swfobject.embedSWF("http://cisco.ookla.com/speedtest.swf?2013-06-15", "bandwidth-calibration", "0", "0", "7.0.0", null, {},
                    {
                        allowScriptAccess: "always"
                    },
                    {})
                }
            })
        },
        speed_test_started: function() {},
        speed_test_completed: function() {
            JNAP.send({
                action: "http://cisco.com/jnap/qos/GetQoSSettings",
                data: {action:'GetQoSSettings'},
                cb: function(c) {
					var pcs = $.cookie("CCC.qoSSettings");
					if( typeof(pcs) == 'string' )
						eval('pcs = ' + pcs + ';');
					if( pcs ) c.output = $.extend( {}, c.output, pcs );
                    if (c.result == "OK" && (c.output.upstreamBandwidthbps != 0 || c.output.downstreamBandwidthbps != 0)) {
                        var b = new Date();
                        a.setCustomProperty("lastBandwidthCalibrationDate", b.getTime().toString())
                    }
                },
                disableDefaultAjaxErrHandler: true,
                disableDefaultJnapErrHandler: true,
                disableDefaultRebootErrHandler: true
            })
        },
        speed_test_download_start: function() {
            JNAP.send({
                action: "http://cisco.com/jnap/qos/calibration/BeginDownloadCalibration",
                data: {},
                disableDefaultAjaxErrHandler: true,
                disableDefaultJnapErrHandler: true,
                disableDefaultRebootErrHandler: true
            })
        },
        speed_test_download_stop: function() {
            JNAP.send({
                action: "http://cisco.com/jnap/qos/calibration/EndDownloadCalibration",
                data: {},
                disableDefaultAjaxErrHandler: true,
                disableDefaultJnapErrHandler: true,
                disableDefaultRebootErrHandler: true
            })
        },
        speed_test_upload_start: function() {
            JNAP.send({
                action: "http://cisco.com/jnap/qos/calibration/BeginUploadCalibration",
                data: {},
                disableDefaultAjaxErrHandler: true,
                disableDefaultJnapErrHandler: true,
                disableDefaultRebootErrHandler: true
            })
        },
        speed_test_upload_stop: function() {
            JNAP.send({
                action: "http://cisco.com/jnap/qos/calibration/EndUploadCalibration",
                data: {},
                disableDefaultAjaxErrHandler: true,
                disableDefaultJnapErrHandler: true,
                disableDefaultRebootErrHandler: true
            })
        },
        speed_test_error: function() {
            a.setCustomProperty("lastBandwidthCalibrationDate", "")
        }
    }
} ());