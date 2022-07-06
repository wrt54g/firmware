if (!CISCO) {
    CISCO = {}
}
CISCO.ui = CISCO.ui || {};
CISCO.ui.validation = CISCO.ui.validation || {};
CISCO.ui.init = function(a) {
    $(document).ready(function() {
        if (!GLOBAL.isAuthorityRemote()) {
            $(document.body).addClass("local-mode")
        }
        if (GLOBAL.areServicesSupported(["../cisco.com/jnap/ui/Settings"])) {
            $("body").addClass("embedded-ui-available");
            if (!GLOBAL.uiLoadedFromCloud()) {
                $("body").addClass("local-origin")
            }
            CISCO.util.checkInternetConnection(function(b) {
                //$(document.body).addClass(b ? "online-mode": "offline-mode")
                $(document.body).addClass("online-mode")
            })
        } else {
            //$(document.body).addClass(GLOBAL.uiLoadedFromCloud() ? "online-mode": "offline-mode")
            $(document.body).addClass("online-mode")
        }
        CISCO.ui.textOrphan();
        CISCO.Event.connect(["applet.launched", "dialog.open"],
        function() {
            CISCO.ui.textOrphan()
        });
        if (typeof a === "function") {
            a()
        }
    })
};
if (CISCO.Event) {
    CISCO.Event.connect("GLOBAL.initted",
    function() {
        CISCO.ui.init()
    })
}
CISCO.ui.fixIeForm = function(b) {
    var a = $(b);
    if (! (a[0] && a[0].tagName == "FIELDSET")) {
        a = a.find("fieldset:visible")
    }
    a.each(function() {
        var h = 0,
        g = 100,
        c = $(this).find(".row:visible"),
        f = null,
        e = 0,
        i = c.parent().width(),
        d = null;
        c.each(function() {
            d = $(this);
            if (this.tagName == "DIV") {
                f = d.children(":first:visible")[0];
                if (f) {
                    e = Util.getTextLength(f.innerHTML, f);
                    h = Math.max(h, e)
                }
                f = d.find("input, select, div.check-item")[0];
                if (f) {
                    g = Math.max(g, $(f).width())
                }
            }
        });
        h = Math.min(h + 6, i - g - 30);
        h = h + "px";
        c.each(function() {
            d = $(this);
            if (this.tagName == "DIV") {
                var j = d.children(":first:visible")[0];
                if (j) {
                    $(j).width(h)
                }
            }
        })
    })
};
CISCO.ui.errorCode = (function() {
    var a = null;
    function b(c) {
        if (a == null) {
            a = {
                _ErrorInvalidInput: "2112",
                _ErrorInvalidOutput: "2113",
                _ErrorNotReady: "2114",
                _ErrorTargetUnreachable: "2116",
                _ErrorUnauthorized: "2117",
                _ErrorUnexpected: "2118",
                _ErrorUnknownAction: "2119",
                _ErrorUnknownSession: "2120",
                _ErrorDisallowedAction: "2122",
                Error: "2123",
                ErrorCannotAuthenticateWithSessionToken: "2124",
                ErrorDeviceBusy: "2125",
                ErrorInvalidHostName: "2126",
                ErrorInvalidPassword: "2127",
                ErrorInvalidUsername: "2128",
                ErrorMissingDynDNSSettings: "2129",
                ErrorMissingMailExchangeSettings: "2130",
                ErrorMissingTZOSettings: "2131",
                ErrorSuperfluousDynDNSSettings: "2132",
                ErrorSuperfluousMailExchangeSettings: "2292",
                ErrorSuperfluousTZOSettings: "2133",
                ErrorCannotDeleteDevice: "2134",
                ErrorUnknownDevice: "2135",
                ErrorInvalidPropertyName: "2136",
                ErrorPropertyValueTooLong: "2137",
                ErrorTooManyProperties: "2138",
                ErrorInvalidHost: "2139",
                ErrorInvalidPacketSizeBytes: "2140",
                ErrorInvalidPingCount: "2141",
                ErrorInvalidDestinationMACAddress: "2142",
                ErrorInvalidSourceRestriction: "2143",
                ErrorMissingDestination: "2144",
                ErrorMultipleDestinations: "2145",
                ErrorDescriptionTooLong: "2149",
                ErrorInvalidPort: "2150",
                ErrorInvalidPortRange: "2151",
                ErrorNoPortRanges: "2152",
                ErrorRulesOverlap: "2153",
                ErrorTooManyPortRanges: "2154",
                ErrorTooManyRules: "2155",
                ErrorInvalidExternalPort: "2156",
                ErrorInvalidExternalPortRange: "2157",
                ErrorInvalidForwardedPort: "2159",
                ErrorInvalidForwardedPortRange: "2160",
                ErrorInvalidTriggerPort: "2161",
                ErrorInvalidTriggerPortRange: "2162",
                ErrorInvalidInternalPort: "2163",
                ErrorInvalidAutoUpdateWindowDurationMinutes: "2164",
                ErrorInvalidAutoUpdateWindowStartMinute: "2165",
                ErrorInvalidUpdateServerURL: "2166",
                ErrorCannotEnableGuestNetwork: "2167",
                ErrorGuestSSIDConflict: "2168",
                ErrorInvalidGuestPassword: "2169",
                ErrorInvalidGuestSSID: "2170",
                ErrorInvalidMaxSimultaneousGuests: "2171",
                ErrorInvalidClient: "2172",
                ErrorNetworkDisabled: "2173",
                ErrorUnsupportedLocale: "2174",
                ErrorTimeZoneDoesNotObserveDST: "2175",
                ErrorUnknownTimeZone: "2176",
                ErrorDuplicateMACAddresses: "2177",
                ErrorInvalidMACAddress: "2178",
                ErrorTooManyMACAddresses: "2179",
                ErrorCloudUnavailable: "2180",
                ErrorUnknownOwnerSession: "2181",
                ErrorBlockedURLTooLong: "2182",
                ErrorInvalidWANSchedule: "2183",
                ErrorTooManyBlockedURLs: "2184",
                ErrorInvalidWANType: "2187",
                ErrorInvalidIPv6WANType: "2188",
                ErrorInvalidBorderRelay: "2189",
                ErrorInvalidBorderRelayPrefixLength: "2190",
                ErrorInvalidPrefix: "2191",
                ErrorInvalidPrefixLength: "2192",
                ErrorMissingIPv6rdTunnelMode: "2193",
                ErrorMissingIPv6rdTunnelSettings: "2194",
                ErrorSuperfluousIPv6rdTunnelMode: "2195",
                ErrorSuperfluousIPv6rdTunnelSettings: "2196",
                ErrorInvalidFirstClientIPAddress: "2197",
                ErrorInvalidIPAddress: "2198",
                ErrorInvalidLastClientIPAddress: "2199",
                ErrorInvalidLeaseMinutes: "2200",
                ErrorInvalidNetworkPrefixLength: "2201",
                ErrorInvalidPrimaryDNSServer: "2202",
                ErrorInvalidReservationIPAddress: "2203",
                ErrorInvalidReservationMACAddress: "2204",
                ErrorInvalidSecondaryDNSServer: "2205",
                ErrorInvalidTertiaryDNSServer: "2206",
                ErrorInvalidWINSServer: "2207",
                ErrorMissingDHCPSettings: "2208",
                ErrorReservationDescriptionTooLong: "2209",
                ErrorReservationsOverlap: "2210",
                ErrorMissingMACAddress: "2211",
                ErrorSuperfluousMACAddress: "2212",
                ErrorDuplicateEntryName: "2213",
                ErrorInvalidDynamicRoutingEnabled: "2214",
                ErrorInvalidGateway: "2215",
                ErrorTooManyEntries: "2216",
                ErrorInvalidDomainName: "2217",
                ErrorInvalidMTU: "2218",
                ErrorInvalidMaxIdleMinutes: "2219",
                ErrorInvalidReconnectAfterSeconds: "2220",
                ErrorInvalidServer: "2221",
                ErrorMissingBridgeSettings: "2222",
                ErrorMissingPPPoESettings: "2223",
                ErrorMissingStaticSettings: "2224",
                ErrorMissingTPSettings: "2225",
                ErrorMissingTelstraSettings: "2226",
                ErrorSuperfluousBridgeSettings: "2227",
                ErrorSuperfluousPPPoESettings: "2228",
                ErrorSuperfluousStaticSettings: "2229",
                ErrorSuperfluousTPSettings: "2230",
                ErrorSuperfluousTelstraSettings: "2231",
                ErrorUnsupportedWANType: "2232",
                ErrorInvalidEntryCount: "2233",
                ErrorInvalidFirstEntryIndex: "2234",
                ErrorCannotDisableLocalConfiguration: "2235",
                ErrorAdminGroupMustHavePermission: "2240",
                ErrorFolderExists: "2241",
                ErrorInvalidName: "2242",
                ErrorInvalidPath: "2243",
                ErrorPathDoesNotExist: "2244",
                ErrorTooManyFolders: "2245",
                ErrorUnknownGroup: "2247",
                ErrorGroupExists: "2248",
                ErrorInvalidDescription: "2249",
                ErrorTooManyGroups: "2250",
                ErrorInvalidFullName: "2253",
                ErrorTooManyUsers: "2254",
                ErrorUnknownMemberOfGroup: "2255",
                ErrorUserExists: "2256",
                ErrorUnknownFolder: "2257",
                ErrorCannotDeleteGroup: "2258",
                ErrorCannotDeleteUser: "2259",
                ErrorUnknownUser: "2260",
                ErrorCannotEditGroup: "2261",
                ErrorCannotEditUser: "2262",
                ErrorInvalidServerName: "2263",
                ErrorUnsupportedEncoding: "2264",
                ErrorInvalidWorkgroup: "2265",
                ErrorInvalidAutoScanIntervalMinutes: "2266",
                ErrorInvalidBasicRate: "2267",
                ErrorInvalidBeaconInterval: "2268",
                ErrorInvalidDTIMInterval: "2269",
                ErrorInvalidFragmentationThreshold: "2270",
                ErrorInvalidRTSThreshold: "2271",
                ErrorInvalidTransmissionPower: "2272",
                ErrorInvalidWEPAuthentication: "2273",
                ErrorUnknownRadio: "2274",
                ErrorUnsupportedNRate: "2275",
                ErrorUnsupportedRate: "2276",
                ErrorInvalidKey: "2277",
                ErrorInvalidPassphrase: "2278",
                ErrorInvalidRADIUSPort: "2279",
                ErrorInvalidRADIUSServer: "2280",
                ErrorInvalidSSID: "2281",
                ErrorInvalidSharedKey: "2282",
                ErrorInvalidTXKey: "2283",
                ErrorMissingWEPSettings: "2284",
                ErrorMissingWPAEnterpriseSettings: "2285",
                ErrorMissingWPAPersonalSettings: "2286",
                ErrorUnsupportedChannel: "2287",
                ErrorUnsupportedMode: "2288",
                ErrorUnsupportedSecurity: "2289",
                ErrorInvalidClientPIN: "2290",
                ErrorWPSSessionAlreadyInProgress: "2291",
                ErrorWPSSessionNotInProgress: "2294",
                _ErrorSessionVerification: "2295",
                _ErrorAbortedAction: "2296",
                ErrorDisallowedRemoteCall: "2297",
                ErrorInvalidAdminPassword: "2298",
                ErrorInvalidDestinationIPAddress: "2299",
                ErrorInvalidInternalServerIPAddress: "2300",
                ErrorUnknownPartition: "2301",
                ErrorInvalidPortCount: "2302",
                ErrorConflictingApplicationRules: "2303",
                ErrorConflictingDeviceRules: "2304",
                ErrorInvalidDownstreamBandwidth: "2305",
                ErrorInvalidUpstreamBandwidth: "2306",
                ErrorTooManyApplicationRules: "2307",
                ErrorTooManyDeviceRules: "2308",
                ErrorReservationDescriptionInvalid: "2309",
                ErrorInvalidServiceName: "2310",
                ErrorUnknownStorageDevice: "2311",
                ErrorUnsupportedChannelWidth: "2312",
                ErrorWPSServerNotEnabled: "2313"
            }
        }
        return a[c] ? a[c] : c
    }
    return {
        errorStringToErrorCode: b
    }
})();
CISCO.ui.build = (function() {
    function c(d) {
        return (typeof d == "string" || typeof d == "number")
    }
    function b(e) {
        var g = document.createElement(e);
        var f = $($(g).outerHtml())[0];
        g = null;
        if (arguments[1]) {
            if (c(arguments[1])) {
                $(f).append(arguments[1])
            } else {
                if (isArray(arguments[1])) {
                    $(f).append(arguments[1])
                } else {
                    if (arguments[1].nodeType) {
                        $(f).append(arguments[1])
                    } else {
                        for (var d in arguments[1]) {
                            f[d == "class" ? "className": d] = arguments[1][d]
                        }
                    }
                }
            }
        }
        if (arguments[2]) {
            $(f).append(arguments[2])
        }
        return f
    }
    function a() {
        var e = "a br button div 61 h1 h2 h3 h4 h5 h6 iframe img input p pre span table tbody td th tr ul li".split(" ");
        var d = {};
        e.forEach(function(f) {
            d[f.toUpperCase()] = b.curry(f)
        });
        return d
    }
    return a()
} ());
CISCO.ui.associateButtons = function(d, b) {
    var c = !b ? null: $(b);
    function a(f) {
        if ((f.keyCode || f.which) != Util.keys.enter) {
            return true
        }
        if (c != null && !c.attr("disabled")) {
            c.click()
        }
        return false
    }
    $(d).bind("keydown", a)
};
CISCO.ui.onCheckChange = function(a, b) {
    $(a).change(function() {
        var d = $(this);
        var c = setTimeout(function() {
            clearTimeout(c);
            c = null;
            b(d.attr("checked") === "checked", d)
        },
        100)
    })
};
CISCO.ui.MainMenu = (function() {
    var b = CISCO.ui.build,
    c = $("#applet-shield-template").clone().attr({
        id: "",
        "class": "applet-shield"
    });
    function e(k) {}
    function d(m, l, n) {
        l = l || "";
        if (m) {
            var k = CONNECT.AppletManager.getAppletById(m);
            if (k) {
                CISCO.ui.MainMenu.launchApplet(k, l, n)
            } else {}
        }
    }
    function i(m, l, p) {
        l = l || "";
        var o = $("#applet-container"),
        k = m.url;
        CISCO.ui.showMasterWaiting();
        CISCO.ui.associateButtons("#applet-container input[type=text]");
        if (GLOBAL.uiLoadedFromCloud()) {
            CLOUD.send({
                url: "cloud/metrics-service/rest/metrics/simple",
                type: "POST",
                data: {
                    simpleMetrics: {
                        name: "APPLET_LAUNCHED",
                        value: m.appletId
                    }
                },
                cb: function(s, r) {},
                cbError: function(r) {
                    return true
                }
            })
        }
        CONNECT.setCurrentAppletId(m.appletId);
        if (m.url.substring(m.url.length - 9) === "main.html") {
            $.cookie("initial-tab", l, {
                expires: null,
                path: webroot || "/"
            });
            $.cookie("app-flag", p, {
                expires: null,
                path: webroot || "/"
            });
            o.empty().load(k,
            function(s, r, t) {
                if (t.status != 200) {
                    if (t.status == 0) {
                        CISCO.ui.hideMasterWaiting(CISCO.routerNotFoundDialog.show)
                    } else {
                        if ((t.status == 404 || t.status == 502) && GLOBAL.uiLoadedFromCloud()) {
                            CISCO.ui.dialogSigningOut()
                        } else {
                            CISCO.ui.dialogError()
                        }
                    }
                    h()
                } else {
                    o.find("> article > section").append(c.clone());
                    CISCO.Event.fire("applet.launched");
                    $("#applet-container article header div.close-button").click(h);
                    o.find("input:[type=radio],input:[type=checkbox]").checkBox({
                        hideInput: true,
                        addVisualElement: true,
                        addLabel: true
                    })
                }
            })
        } else {
            var q = "panel" + o.find("iframe").length;
            o.empty();
            var n = b.IFRAME({
                name: q,
                id: q,
                "class": "panel",
                src: k,
                seamless: "true",
                scrolling: "no"
            });
            o.append(n);
            CONNECT.setupAppletFrame(window[n.name], m, n)
        }
        $("body").removeClass("main-view");
        f();
        if (m.menuItem) {
            m.menuItem.addClass("selected")
        } else {
            $("#main-menu li").each(function() {
                if (this.innerText == m.name) {
                    $(this).addClass("selected")
                }
            })
        }
        $("body").addClass("applet-view");
        CISCO.Event.connect("applet.loaded", j);
        $("#nav-home").click(h)
    }
    function j() {
        $("#applet-container > article > section > .applet-shield").fadeOut(500);
        CISCO.ui.hideMasterWaiting()
    }
    function f() {
        $("#main-menu > li > ul > li.selected").removeClass("selected")
    }
    function h() {
        CISCO.ui.inputBalloon.hide();
        CISCO.Event.disconnect("applet.loaded", j);
        var k = $("#applet-container").find("iframe"),
        m = k.attr("name");
        try {
            delete window[m]
        } catch(l) {}
        CONNECT.setCurrentAppletId("");
        $("body").removeClass("applet-view");
        $("#applet-container > article > section > .applet-shield").fadeIn(500);
        setTimeout(function() {
            f();
            $("body").addClass("main-view");
            CISCO.Event.fire("applet.closed")
        },
        500);
        $("#applet-container article header div.close-button").unbind("close");
        $("#nav-home").unbind("click");
        if (CONNECT.shouldShowInternetRestoredDialog()) {
            CISCO.util.checkInternetConnection(function(n) {
                if (n) {
                    CONNECT.showInternetRestoredDialogIfNecessary()
                }
            })
        }
    }
    function g() {
        $(".close-panel").live("click", CISCO.ui.MainMenu.closeApplet);
        var l = CONNECT.AppletManager.getAppletList(),
        k = $("#main-menu"),
        m,
        n;
        k.show();
        l.forEach(function(o) {
            if (o.url) {
                m = a(o);
                if (document.getElementById(o.categoryId) === null) {
                    k.append($('<li id="{id}"><h2>{name}</h2><ul></ul></li>'.formatObj({
                        id: o.categoryId,
                        name: o.categoryName
                    })))
                }
                $("#" + o.categoryId).find("ul").append(m)
            }
        });
        CISCO.Event.connect("applet.unsupportedFirmware",
        function() {
            CISCO.ui.dialogServiceUnsupported()
        })
    }
    function a(k) {
        k.root = k.url.replace("main.html", "");
        k.root = k.root.replace("index.html", "");
        var m = '<li tooltip="{description}"><span style="background-image: url({root}/icon.png)" tooltip="{description}"></span>{name}</li>';
        var l = $(m.formatObj({
            root: k.root.replace(/dynamic/, "static"),
            description: k.description,
            name: k.name
        }));
        l.click(function(n) {
            k.menuItem = l;
            i(k);
            l.addClass("selected")
        });
        return l
    }
    return {
        initialize: g,
        launchApplet: i,
        launchAppletById: d,
        closeApplet: h
    }
} ());
CISCO.ui.TopMenu = (function() {
    var e = null,
    a = $("#routers-menu-title"),
    b = $("#routers-dropdown");
    function c(g, i, f) {
        var h = null,
        j = i;
        if (f) {
            h = $("<li>{friendlyName}</li>".formatObj({
                friendlyName: g
            }));
            h.click(function() {
                GLOBAL.setCurrentNetworkID(j);
                window.location.reload()
            })
        } else {
            h = $("<li>{friendlyName} [{offline}]</li>".formatObj({
                friendlyName: g,
                offline: CISCO.ui.common.strings.offlineLower
            }))
        }
        return h
    }
    function d(g) {
        function i(l) {
            if (!l) {
                return
            }
            l.sort(function(o, n) {
                if (o.networkAccountAssociation.network.networkId == GLOBAL.getCurrentNetworkID()) {
                    return - 1
                } else {
                    if (n.networkAccountAssociation.network.networkId == GLOBAL.getCurrentNetworkID()) {
                        return 1
                    } else {
                        var p = (o.networkAccountAssociation.network.friendlyName < n.networkAccountAssociation.network.friendlyName) ? -1 : (o.networkAccountAssociation.network.friendlyName == n.networkAccountAssociation.network.friendlyName ? 0 : 1);
                        if (o.networkAccountAssociation.online && n.networkAccountAssociation.online) {
                            return p
                        } else {
                            if (o.networkAccountAssociation.online) {
                                return - 1
                            } else {
                                if (n.networkAccountAssociation.online) {
                                    return 1
                                } else {
                                    return p
                                }
                            }
                        }
                    }
                }
            });
            a.html("{0}".format(l[0].networkAccountAssociation.network.friendlyName));
            b.empty();
            if (l.length > 1) {
                for (var m = 1; m < l.length; m++) {
                    b.append(c(l[m].networkAccountAssociation.network.friendlyName, l[m].networkAccountAssociation.network.networkId, l[m].networkAccountAssociation.online))
                }
            }
            var k = $("#edit-name-item li").clone();
            k.click(function() {
                var n = CONNECT.AppletManager.getAppletById("691E0149-A1D4-450C-9922-82CAA65B16C0");
                if (n) {
                    CISCO.ui.MainMenu.launchApplet(n, "", "edit-authority")
                }
            });
            b.append(k)
        }
        i(g);
        CISCO.Event.connect("cisco.defaultNetworkRenamed",
        function() {
            GLOBAL.updateUserDetails(i)
        });
        if (GLOBAL.uiLoadedFromCloud()) {
            CISCO.ui.appMyAccount.assignClick("#user-menu-my-account");
            CISCO.ui.appStoreMenu.assignClick("#app-store-menu");
            $("#user-menu-title").text(GLOBAL.getFormattedUserName())
        } else {
            $("#user-menu-my-account").remove()
        }
        $("#user-menu-about").click(h);
        $("#user-menu-sign-out").click(CISCO.util.signOut);
        function h() {
            if (e == null) {
                if (GLOBAL.uiLoadedFromCloud()) {
                    var k = "ui/static/";
                    k = k.replace("ui/default.htm", "");
                    k = k.replace("static/", "");
					k = '1.0.0.142014/1.0.0.157293';
                    $("#about-dialog-cloud-version").html(k);//.html(k + GLOBAL.getCloudVersion());
                    if (GLOBAL.getCurrentNetworkID()) {
                        $("#about-dialog-model-name").html(GLOBAL.getCurrentNetworkModelName());
                        $("#about-dialog-firmware-version").html(GLOBAL.getCurrentNetworkFirmwareVersion())
                    } else {
                        $("#about-dialog-firmware").remove()
                    }
                } else {
                    $("#about-dialog-model-name").html(GLOBAL.getCurrentNetworkModelName());
                    $("#about-dialog-firmware-version").html(GLOBAL.getCurrentNetworkFirmwareVersion());
                    $("#about-dialog-cloud").remove()
                }
                e = CISCO.ui.dialog("#user-menu-about-dialog");
                $("#user-menu-about-dialog .close-button").click(function() {
                    e.close()
                })
            }
            e.show()
        }
        $("html").addClass(GLOBAL.getCurrentNetworkModelName());
        if (CISCO.browser.browser === "iPad") {
            var j;
            function f(k) {
                if (j && this !== j[0]) {
                    j.removeClass("hover")
                }
                j = $(this);
                if (j.hasClass("hover")) {
                    setTimeout(function() {
                        j.removeClass("hover")
                    },
                    500)
                } else {
                    j.addClass("hover")
                }
            }
            $(".menu-children").on("touchstart", f)
        }
    }
    return {
        initialize: d
    }
} ());
CISCO.ui.Footer = (function() {
    var a = null,
    b = /^(\d+\.\d+\.\d+)\..+/;
    function d() {
        CISCO.util.checkInternetConnection(function(g) {
            if (!g) {
                if (a == null) {
                    a = CISCO.ui.dialog("#dialogs #third-party-license-local", {})
                }
                a.show()
            } else {
                var e = "cloud/ustatic/license/ciscoconnectcloud.html";
                if (!Util.isNoE(GLOBAL.getCurrentNetworkModelName())) {
                    var f = GLOBAL.getCurrentNetworkFirmwareVersion();
                    if (!Util.isNoE(f)) {
                        f = f.replace(b, "$1");
                        e = "cloud/ustatic/license/{0}v{1}-{2}.html".format(GLOBAL.getCurrentNetworkModelName().toLowerCase(), GLOBAL.getCurrentNetworkHardwareVersion().toLowerCase(), f)
                    }
                }
                window.open(e)
            }
        })
    }
    function c() {
        if (GLOBAL.uiLoadedFromCloud()) {
            $("a.terms-of-service").click(function() {
                var f = $("html").attr("lang");
                f = f.replace(/{{/g, "").replace(/}}/g, "");
                var e = "cloud/ustatic/termsofservice/1.0.0/termsofservice-{0}.html".format(f);
                window.open(e)
            })
        } else {
            $("a.terms-of-service + span.pipe, span.terms-of-service-wrapper, a.terms-of-service").hide()
        }
        $("a#third-party-licenses").click(d);
        $("a.terms-and-conditions").click(function() {
            var f = {
                parent: $("#error-dialog-wrapper"),
                isError: false
            };
            var g = $("html").attr("lang");
            g = g.replace(/{{/g, "").replace(/}}/g, "");
            var e = "cloud/ustatic/eula/2.16.12/EULA-{0}.html".format(g);
            $.ajax({
                url: e,
                success: function(h) {
                    var i = CISCO.ui.dialog($("#eula-dialog"), f);
                    $("#eula-dialog #eula-content").html(h);
                    i.show()
                },
                error: function() {
                    var h = CISCO.ui.dialog($("#link-unavailable-offline"), f);
                    h.show()
                }
            })
        });
        $("a.privacy-statement").click(function() {
            window.open("http://www.cisco.com/web/siteassets/legal/privacy.html")
        })
    }
    return {
        initialize: c
    }
} ());
CISCO.ui.progressBar = (function() {
    var b = "progress-bar",
    a = "div." + b;
    var c = function(g, f) {
        var d = false,
        e;
        if (g.length === 0) {
            e = "update called but found no matching elems"
        } else {
            if (!g.hasClass(b)) {
                e = "update called on element that is not a progress bar"
            } else {
                if ((f === undefined) || (isNaN(f)) || (f < 0) || (f > 100)) {
                    e = "update called invalid 'percent' value"
                } else {
                    d = true
                }
            }
        }
        if (e) {}
        return d
    };
    return {
        build: function() {
            var d = (typeof arguments[0] === "string" ? ("#" + arguments[0]) : arguments[0]) || a;
            $(d).html("<div></div>")
        },
        update: function(d) {
            var f, e = d.percent;
            if (d.id !== undefined) {
                f = $("#" + d.id)
            } else {
                if (d.element !== undefined) {
                    f = $(d.element)
                } else {
                    f = $(a)
                }
            }
            if (!c(f, e)) {
                return
            }
            f.find("div").css("width", e + "%")
        }
    }
})();
CISCO.ui.selectBox = (function() {
    return {
        handleMultiline: function() {
            var c, a, b;
            $("select").each(function() {
                c = $(this);
                a = c.attr("size");
                if ((a != 0) && (a != 1)) {
                    b = c.css("padding-left");
                    c.css({
                        background: "none",
                        "padding-right": b,
                        border: "1px solid #9d9ea0"
                    })
                }
            })
        }
    }
})();
CISCO.ui.signalStrength = (function() {
    var a = "div.signal-strength",
    b = "<ul><li></li><li></li><li></li><li></li><li></li></ul>";
    return {
        build: function() {
            $(a).append(b)
        }
    }
})();
CISCO.ui.spinner = (function() {
    var a = {
        build: function(b, c) {
            b = b || "div.spinner",
            c = c || 55;
            var d = $(b);
            d.addClass("spinner_" + c);
            return this.stop(b)
        },
        spin: function(b) {
            b = b || "div.spinner";
            var c = 55,
            d = $(b);
            if (d.hasClass("spinner_35")) {
                c = 35
            } else {
                if (d.hasClass("spinner_18")) {
                    c = 18
                }
            }
            d.html('<img class="animated-spinner" src="ui/static/images/spinner/Spinner_' + c + '.gif" />');
            return a
        },
        stop: function(b) {
            b = b || "div.spinner";
            var c = 55,
            d = $(b);
            if (d.hasClass("spinner_35")) {
                c = 35
            } else {
                if (d.hasClass("spinner_18")) {
                    c = 18
                }
            }
            d.html('<img class="static-spinner" src="ui/static/images/spinner/Static_' + c + '.png" />');
            return a
        }
    };
    return a
})();
CISCO.ui.wait = function(a) {
    if (!Util.isNoE(CISCO.ui.autoWaitHide)) {
        clearTimeout(CISCO.ui.autoWaitHide);
        CISCO.ui.autoWaitHide = null
    }
    if (Util.fixNoE(a, true)) {
        CISCO.ui.autoWaitHide = setTimeout(function() {
            CISCO.ui.wait(false)
        },
        10000);
        CISCO.ui.showWaiting()
    } else {
        CISCO.ui.hideWaiting()
    }
};
CISCO.ui.waitingMinTime = 500;
CISCO.ui.waitingStart = 0;
CISCO.ui.showWaiting = function() {
    CISCO.ui.inputBalloon.hide();
    CISCO.ui.waitingStart = (new Date()).getTime();
    $("body").addClass("waiting")
};
CISCO.ui.hideWaiting = function(a) {
    var b = CISCO.ui.waitingMinTime - ((new Date()).getTime() - CISCO.ui.waitingStart);
    if (b < 0) {
        b = 0
    }
    setTimeout(function() {
        $("body").removeClass("waiting");
        if (isFunction(a)) {
            a()
        }
    },
    b)
};
CISCO.ui.isWaiting = function() {
    return $("body").hasClass("waiting")
};
CISCO.ui.masterWaitingMinTime = 1000;
CISCO.ui.masterWaitingStart = 0;
CISCO.ui.showMasterWaiting = function() {
    CISCO.ui.masterWaitingStart = (new Date()).getTime();
    $("body").addClass("master-waiting")
};
CISCO.ui.hideMasterWaiting = function(a) {
    var b = CISCO.ui.masterWaitingMinTime - ((new Date()).getTime() - CISCO.ui.masterWaitingStart);
    if (b < 0) {
        b = 0
    }
    setTimeout(function() {
        $("body").removeClass("master-waiting");
        if (isFunction(a)) {
            a()
        }
    },
    b)
};
CISCO.ui.isMasterWaiting = function() {
    return $("body").hasClass("master-waiting")
};
CISCO.ui.switchTab = function(l, f, k, q, a) {
    var e = (l == "tab" ? ".tab-content": ".sub-tab-content"),
    c = (l == "tab" ? k.parents("li") : k),
    o = c.index();
    if (!c.hasClass("selected")) {
        var i = f.find(e).eq(o),
        d = c.find("span"),
        p = i.attr("id"),
        n = f.find("li.selected:first"),
        g = n.index(),
        b = (g > -1 ? f.find(e).eq(g) : null),
        m = (g > -1 ? n.find("span") : null),
        h = (g > -1 ? b.attr("id") : null),
        j = true;
        if (q.fireEvents) {
            j = a.fire({
                type: l,
                destIdx: o,
                destTab: d,
                destContent: i,
                destTabId: p,
                srcIdx: g,
                srcTab: m,
                srcContent: b,
                srcTabId: h
            })
        }
        if (j) {
            f.find(e).each(function(r) {
                if (r != o) {
                    $(this).hide()
                }
            });
            i.show();
            c.parents("ul").find("li").removeClass("selected");
            c.addClass("selected");
            CISCO.Event.fire("tab.changed", {
                destTabId: p
            })
        }
    }
};
CISCO.ui.tabs = (function() {
    return {
        init: function(a) {
            var b = null,
            c = 0;
            a = a || {
                fireEvents: false,
                initialTab: ""
            };
            if (!a.initialTab) {
                a.initialTab = ""
            }
            if (a.fireEvents) {
                b = eventBuilder("tab.changed")
            }
            $("section.tab-section:not(.setup)").each(function(d) {
                var f = $(this);
                var e = f.find(".tabs span");
                e.each(function(h) {
                    var g = $(this),
                    i = f.find(".tab-content").eq(h).attr("id");
                    if ((a.initialTab == "" && h == 0) || a.initialTab == i) {
                        var j = f.find(".tab-content").eq(h).show();
                        c = h;
                        if (a.fireEvents) {
                            b.fireInit = b.fire.curry({
                                type: "tab",
                                destTab: g.find("span"),
                                destIdx: h,
                                destContent: j,
                                destTabId: i,
                                srcIdx: -1,
                                srcContent: null,
                                srcTabId: null
                            })
                        }
                        CISCO.Event.fire("tab.changed", {
                            destTabId: i
                        })
                    }
                });
                if (f.on) {
                    f.on("click", ".tabs span",
                    function() {
                        CISCO.ui.switchTab("tab", f, $(this), a, b)
                    });
                    f.find(".tabs span").eq(c).click();
                    f.addClass("setup")
                }
            });
            $("div.sub-tab-section:not(.setup)").each(function() {
                var d = $(this);
                if (d.on) {
                    d.on("click", ".sub-tabs li:not(.separator)",
                    function() {
                        CISCO.ui.switchTab("subtab", d, $(this), a, b)
                    });
                    d.find(".sub-tabs li").eq(0).click();
                    d.addClass("setup")
                }
            });
            return b
        }
    }
})();
$.extend(CISCO.ui, {
    dialog: function(e, b) {
        e = $(e);
        b = b || {};
        var l = b.parent ? b.parent: $("#generic-dialog-wrapper"),
        h = b.dlgClass ? b.dlgClass: "generic-dialog",
        i = e.add(l),
        g = b.btns || e.find("> div.dialog-buttons"),
        k = null,
        d = $("#dialog-cache"),
        j = e.find(".dialog-body"),
        f = {
            close: function() {
                console.warn("close failed")
            },
            show: function() {
                console.warn("show failed")
            },
            submit: function() {
                console.warn("submit failed")
            },
            isShowing: function() {
                console.warn("isShowing failed")
            }
        };
        e.addClass("dialog");
        if (e && e.length) {
            if (e.parent()[0] !== d[0]) {
                var c = e[0].id,
                m = d.find("#" + c);
                if (c && m.length) {
                    m.remove()
                } else {
                    if (!c) {
                        console.warn("Dialog does not have id - so can not check for duplicates in cache")
                    }
                }
            }
        }
        if (b.isError) {
            if (l.children().length) {
                return f
            }
        }
        if (b.width) {
            e.css("width", b.width)
        } else {
            e.css("width", parseInt(j.css("width")) + (45 * (j.hasClass("exclamation") ? 3 : 2)))
        }
        var a = {
            close: function() {
                CISCO.Event.fire("dialog.close");
                if (CISCO.browser.mobileSafariVersion == -1) {
                    CISCO.ui.constrainKeysToEl.remove()
                }
                $("#dialog-cache").append(e);
                i.hide();
                $("body").removeClass(h);
                if (typeof b.onClose == "function") {
                    b.onClose.call(e)
                }
            },
            show: function() {
                if (b.isError) {
                    if (l.children().length) {
                        return false
                    }
                }
                CISCO.Event.fire("dialog.open");
                CISCO.ui.hideMasterWaiting();
                CISCO.ui.hideWaiting();
                if (CISCO.browser.mobileSafariVersion == -1) {
                    CISCO.ui.constrainKeysToEl.add("#" + e.attr("id"))
                }
                if (! (l.children() && (l.children().attr("id") == e.attr("id")))) {
                    l.empty().append(e);
                    $("body").addClass(h);
                    i.show();
                    if (typeof b.onShow == "function") {
                        b.onShow.call(e)
                    }
                }
            },
            submit: function() {
                if (!b.cancelClose) {
                    this.close()
                }
                if (typeof b.onSubmit == "function") {
                    b.onSubmit.call(e)
                }
            },
            cancel: function() {
                this.close();
                if (typeof b.onCancel == "function") {
                    b.onCancel.call(e)
                }
            },
            isShowing: function() {
                if (e.length == 0) {
                    return false
                }
                return l.children() && (l.children().attr("id") == e.attr("id"))
            }
        };
        g.find("> .submit").unbind("click");
        g.find("> .submit").click(function() {
            a.submit()
        });
        g.find("> .cancel").unbind("click");
        g.find("> .cancel").click(function() {
            a.cancel()
        });
        return a
    },
    dialogGenericError: function(a, d) {
        var b = {
            parent: $("#error-dialog-wrapper"),
            dlgClass: "error-dialog",
            isError: true
        };
        var c = CISCO.ui.dialog(a, b);
        if (!d) {
            c.show()
        }
        return c
    },
    dialogSigningOut: function() {
        var a = {
            parent: $("#error-dialog-wrapper"),
            dlgClass: "error-dialog",
            isError: true,
            onClose: function() {
                CISCO.util.signOut()
            }
        };
        var b = CISCO.ui.dialog($("#online-to-offline"), a);
        b.show()
    },
    dialogError: function(d, a) {
        var b = $("#generic-error").clone(),
        e,
        c = {
            parent: $("#error-dialog-wrapper"),
            dlgClass: "error-dialog",
            isError: true
        };
        if (a) {
            c.onClose = a
        }
        if (d) {
            b.find("#generic-error-value").text(d.result ? CISCO.ui.errorCode.errorStringToErrorCode(d.result.toString()) : d.toString())
        } else {
            b.find("#generic-error-value").text("")
        }
        b.find("#generic-error-technical-support").unbind("click");
        b.find("#generic-error-technical-support").click(function() {
            window.open("../homesupport.cisco.com/ciscoconnectcloud")
        });
        e = CISCO.ui.dialog(b, c);
        e.show();
        return e
    },
    dialogWarning: function(a) {
        var f = $("#generic-warning-dialog").clone(),
        d,
        b = {
            parent: $("#error-dialog-wrapper"),
            dlgClass: "error-dialog",
            isError: true
        };
        var e = f.find(".submit");
        var c = f.find(".cancel");
        e.text(a.submit ? a.submit: CISCO.ui.button.strings.yes);
        c.text(a.cancel ? a.cancel: CISCO.ui.button.strings.no);
        if (a.onClose) {
            b.onClose = a.onClose
        }
        if (a.onSubmit) {
            b.onSubmit = a.onSubmit
        }
        if (a.onCancel) {
            b.onCancel = a.onCancel
        }
        e.css("display", a.hideSubmit ? "none": "block");
        f.find(".warning-content").html((typeof a === "string") ? a: a.msg);
        d = CISCO.ui.dialog(f, b);
        d.show();
        return d
    },
    dialogServiceUnsupported: function() {
        var c = $("#firmware-update-required"),
        b,
        a = {
            parent: $("#generic-dialog-wrapper"),
            dlgClass: "generic-dialog",
            onClose: function() {
                CISCO.ui.MainMenu.closeApplet()
            }
        };
        b = CISCO.ui.dialog(c, a);
        b.show()
    },
    dialogHelp: function(a) {
        var c, b = {
            parent: $("#help-dialog-wrapper"),
            dlgClass: "help-dialog"
        };
        c = CISCO.ui.dialog(a, b);
        return c
    },
    alert: function(f, e, a) {
        var c = $("#generic-alert-dialog").clone(),
        d,
        b = {
            parent: $("#error-dialog-wrapper"),
            dlgClass: "error-dialog",
            isError: true
        };
        c.find(".warning-content").html(Util.padIfNotNull("<h2>", e, "</h2>") + "<div>" + f + "<br/></div>");
        if (a) {
            b.onClose = a
        }
        d = CISCO.ui.dialog(c, b);
        d.show();
        c.find(".cancel").focus();
        return d
    }
});
CISCO.ui.tooltip = (function() {
    var g = {},
    q = 0,
    o, r, n = 5,
    h = 8,
    l = null,
    c = null;
    function j() {
        o = $("#global-tooltip");
        if (!o || !o.length) {
            setTimeout(j, 1000)
        }
        $(document).scroll(a)
    }
    function a() {
        if (o.is(":visible")) {
            CISCO.ui.tooltip.setLocation(false, o, r, h, n)
        }
    }
    function m() {
        o.appendTo($("body"));
        var t = $(this),
        s = '<div class="tip"></div>' + Util.htmlEncode(t.attr("tooltip"));
        if (s) {
            q = setTimeout(function() {
                if (t === r) {
                    o.html(s);
                    CISCO.ui.tooltip.setLocation(false, o, r, h, n)
                }
            },
            1000)
        }
        r = t
    }
    function e() {
        if (q) {
            clearTimeout(q);
            q = 0
        }
    }
    function b() {
        e();
        o.fadeOut()
    }
    function f() {
        e();
        o.hide()
    }
    function k(t, s) {
        if (typeof s === "string") {
            s = $(s)
        }
        s[t]({
            click: f,
            mouseenter: m,
            mouseleave: b
        })
    }
    function p(u, s) {
        var t = $(u).container();
        if (s && t) {
            t.addClass("tooltip-" + s)
        }
        k.apply(this, ["on"].concat(Array.prototype.slice.apply(arguments)))
    }
    function i(s) {
        k.apply(this, ["off"].concat(Array.prototype.slice.apply(arguments)))
    }
    function d(x, E, u, v, t, A, F) {
        function D(G, H) {
            return (G.left + G.width < H.left + H.width || G.top + G.height < H.top + H.height)
        }
        if (!u) {
            return
        }
        A = A || true;
        var s = u.container(),
        B = u.coords(),
        w = false,
        C = false,
        y = u.offset(),
        z = u.getZIndex();
        if ((!s) || !(z >= 0)) {
            return
        }
        if (!F) {
            E.css("width", "10px").css("width", "auto").fadeIn()
        }
        if (!A) {
            u[0].scrollIntoView(true)
        }
        B.width = E.outerWidth();
        B.top += ((u.outerHeight() - E.outerHeight()) / 2) - s.scrollTop();
        B.left += u.outerWidth() + t - s.scrollLeft();
        if (s.hasClass("tooltip-side")) {
            w = true
        } else {
            if (s.hasClass("tooltip-top")) {
                C = true
            } else {
                if (D(s.coords(), B)) {
                    C = true
                } else {
                    w = true
                }
            }
        }
        if (w) {
            y.top = B.top;
            y.left = B.left
        } else {
            if (C) {
                y.top -= E.outerHeight() + v;
                y.left += ((u.outerWidth() - E.outerWidth()) / 2)
            }
        }
        E.css(y);
        E.toggleClass("left", w).toggleClass("down", C);
        if (!F) {
            c = {
                isValidationBalloon: x,
                tooltip: E,
                el: u,
                vertPad: v,
                horzPad: t,
                disableScrollIntoView: A
            };
            l = setTimeout(function() {
                d(x, E, u, v, t, A, true);
                clearTimeout(l)
            },
            500)
        }
    }
    $(window).resize(function() {
        if (c != null) {
            d(c.isValidationBalloon, c.tooltip, c.el, c.vertPad, c.horzPad, c.disableScrollIntoView, true)
        }
    });
    return {
        init: j,
        add: p,
        remove: i,
        setLocation: d
    }
} ());
CISCO.ui.getTextWidth = function(d, b) {
    var f = "textWidthTest",
    c = $("#" + f),
    a;
    if (c.length === 0) {
        c = $("body").append('<div id="' + f + '" style="position:absolute;color:transparent;display:block;"></div>').find("#" + f).eq(0)
    }
    c.html(d);
    for (var e in b) {
        c.css(e, b[e])
    }
    a = c.get(0).offsetWidth;
    c.remove();
    return a
};
CISCO.ui.getDeviceIcon = function(b) {
    var a = b.deviceType();
    if (a == "" || a == "-- Device Type Unknown --") {
        a = "generic-device"
    } else {
        switch (a) {
        case "Camera":
            a = "net-camera";
            break;
        case "Computer":
            a = "desktop-pc";
            break;
        case "GameConsole":
            a = "game-consoles";
            break;
        case "Infrastructure":
            if (b.isAuthority()) {
                a = "this-router"
            } else {
                a = "router-default"
            }
            break;
        case "MediaPlayer":
            a = "digital-media-player";
            break;
        case "Phone":
            a = "generic-cellphone";
            break;
        case "Printer":
            a = "printer-inkjet";
            break;
        case "Storage":
            a = "net-drive";
            break
        }
    }
    return a
};
$.extend(CISCO.ui.validation, (function() {
    var f = {
        alpha: function() {
            return {
                message: CISCO.ui.validation.strings.validCharacters,
                when: true,
                test: /[A-Za-z]/
            }
        },
        numeric: function() {
            return {
                message: CISCO.ui.validation.strings.validNumbers,
                when: true,
                test: /[0-9]/
            }
        },
        leadingWhitespace: function() {
            return {
                message: CISCO.ui.validation.strings.leadingWhitespace,
                when: true,
                test: /^\s/
            }
        },
        trailingWhiteSpace: function() {
            return {
                message: CISCO.ui.validation.strings.trailingWhitespace,
                when: true,
                test: /\s$/
            }
        }
    },
    b = {
        alpha: /[A-Za-z]/,
        numeric: /[0-9]/,
        hasLeadingWhitespace: /^\s/,
        hasTrailingWhiteSpace: /\s$/,
        isBlank: /^$/,
        isLengthTooLong: function(h, i) {
            return !! i && i.length && i.length > h
        },
        isLengthInRange: function(i, h, j) {
            return !! j && j.length && j.length >= i && j.length <= h
        },
        isUTF8LengthTooLong: function(h, i) {
            return !! i && typeof i.lengthInBytes == "function" && i.lengthInBytes() > h
        },
        isInRange: function a(i, h, k, j) {
            if (b.isBlank.test(j) && k === false) {
                return true
            } else {
                if ($.isNumeric(j)) {
                    var l = parseInt(j, 10);
                    if (l < i || l > h) {
                        return false
                    }
                } else {
                    return false
                }
            }
            return true
        },
        isGreaterThanOrEqualTo: function e(h, i) {
            if ($.isNumeric(i)) {
                var j = parseInt(i, 10);
                return j >= h
            } else {
                return false
            }
            return true
        },
        isWepKey: function d(l, i, h, k) {
            var j = false;
            switch (l.val()) {
            case "WEP-64":
                if (i == h.val()) {
                    j = /^([0-9A-Fa-f]{10})$/.test(k)
                } else {
                    j = /^(|[0-9A-Fa-f]{10})$/.test(k)
                }
                break;
            case "WEP-128":
                if (i == h.val()) {
                    j = /^([0-9A-Fa-f]{26})$/.test(k)
                } else {
                    j = /^(|[0-9A-Fa-f]{26})$/.test(k)
                }
                break
            }
            return j
        },
        isIPAddress: function(i, k) {
            var h = "";
            if (typeof i === "string") {
                h = i
            } else {
                if (i.is("div")) {
                    var j = Binder.fromDom(i.parent());
                    h = getObjVal(j, i.attr("name"))
                } else {
                    h = i.val()
                }
            }
            if (/^\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/.test(h)) {
                if (h === "127.0.0.1" || h === "255.255.255.255" || (h.split(".").join("") == 0 && !k)) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        },
        isIPv6Address: function(r) {
            var h = 0,
            q = -1,
            n = false,
            p = false,
            o = false,
            m = 0,
            k = 16;
            while (true) {
                var l;
                if (r.charAt(m) === ":") {
                    m++;
                    if ((r.charAt(m)) === ":") {
                        if (q != -1) {
                            break
                        }
                        n = true;
                        q = h;
                        m++
                    } else {
                        if (h === 0) {
                            break
                        }
                        n = false
                    }
                }
                l = m;
                for (;
                /[0-9A-Fa-f]{1}/.test(r.charAt(m)); m++) {}
                if (m > r.length) {
                    break
                } else {
                    if (r.charAt(m) === ".") {
                        o = b.isIPAddress(r.substr(l));
                        if (!o) {
                            break
                        }
                        if ((h + 4) > k) {
                            break
                        }
                        h += 4;
                        p = true;
                        n = true;
                        break
                    } else {
                        if (r.charAt(m) != ":" || m - l === 0) {
                            p = true
                        }
                    }
                }
                if (m - l > 4) {
                    break
                }
                if (l >= r.length) {
                    break
                } else {
                    if (/[0-9A-Fa-f]{1}/.test(r.charAt(l))) {
                        if ((h + 2) > k) {
                            break
                        }
                        h += 2;
                        n = true
                    }
                }
                if (p) {
                    break
                }
            }
            if (p && n && h > 0) {
                if (o || m === r.length) {
                    if (q !== -1 && h < k) {
                        return true
                    } else {
                        if (q === -1 && h === k) {
                            return true
                        }
                    }
                }
            }
            return false
        },
        isMACAddress: function(l) {
            var i = "";
            if (l.is("div")) {
                var m = Binder.fromDom(l.parent());
                i = getObjVal(m, l.attr("name"))
            } else {
                i = l.val()
            }
            if (/([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}/.test(i)) {
                if (i === "00:00:00:00:00:00") {
                    return false
                }
                var n = i.replace(/([0-9A-Fa-f]{2}):([0-9A-Fa-f]{2}:){4}[0-9A-Fa-f]{2}/, "$1"),
                k = parseInt(n, 16).toString(2),
                h = k.substr(k.length - 1);
                if (h === "1") {
                    return false
                }
                var j = n.substr(n.length - 1).toUpperCase();
                if (j != "0" && j != "2" && j != "4" && j != "6" && j != "8" && j != "A" && j != "C" && j != "E") {
                    return false
                }
                return true
            } else {
                return false
            }
        },
        isValidForSubnet: function(k, h) {
            var j = (k & h) >>> 0,
            i = (~h | j) >>> 0;
            return k != j && k != i
        },
        isHostValidForGivenRouterIPAddressAndSubnetMask: function(h, n, l) {
            var j = Util.dot2num(h),
            m = Util.dot2num(n),
            k = Util.dot2num(l),
            i = (j & k) >>> 0,
            o = (m & k) >>> 0;
            if (i != o) {
                return false
            } else {
                return CISCO.ui.validation.tests.isValidForSubnet(j, k)
            }
        },
        isRouterIPAddress: function(n, l) {
            if (b.isIPAddress(n, false)) {
                var m = Util.parseIPAddress(n),
                k = Util.parseIPAddress(l);
                if ($.isNumeric(m[0]) && $.isNumeric(m[1]) && $.isNumeric(m[2]) && $.isNumeric(m[3]) && $.isNumeric(k[0]) && $.isNumeric(k[1]) && $.isNumeric(k[2]) && $.isNumeric(k[3])) {
                    var j = parseInt(m[0], 10),
                    h = Util.dot2num(n),
                    i = Util.dot2num(l);
                    return (j >= 1 && j <= 223 && CISCO.ui.validation.tests.isValidForSubnet(h, i))
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        isSubnetMask: function(l, i, h) {
            var k = Util.parseIPAddress(l);
            if ($.isNumeric(k[0]) && $.isNumeric(k[1]) && $.isNumeric(k[2]) && $.isNumeric(k[3])) {
                var n = parseInt(k[0], 10),
                j = Util.dot2num(l),
                m = j.toString(2),
                o = m.indexOf("0");
                if (!i) {
                    i = 8
                }
                if (!h) {
                    h = 30
                }
                if (n != 0 && o >= i && o <= h) {
                    if (m.indexOf("1", o) == -1) {
                        return true
                    }
                }
                return false
            } else {
                return false
            }
        },
        isLastOctet: /^([1-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-4])$/,
        isDomainOrIpAddress: /^.+\..+$/,
        isHostName: /[^a-zA-Z0-9-]+|^-|-$/,
        isEmail: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        matchAnotherInput: function(i, h) {
            return h == i.val()
        },
        isWpaPassword: function(i) {
            var h = true;
            if (i.length == 64) {
                h = /^([0-9A-Fa-f]{64})$/.test(i)
            }
            return h
        },
        isWpsPin: function(i) {
            var h = false;
            if (i.length == 4 || i.length == 8 || i.length == 9) {
                if (i.length == 9) {
                    h = /^([0-9]{4}[\ \u002d\u00ad\u058a\u05be\u2010\u2011\u2013\u2013\u2014\u2015\u301c\u3030\ufe58\ufe63\uff0d][0-9]{4})$/.test(i)
                } else {
                    h = /^([0-9])+$/.test(i)
                }
            }
            return h
        },
        doesRangeOverlap: function(k, i, j, h) {
            return k <= h && j <= i
        },
        doPortRangesOverlap: function(h, p, m, o) {
            var n = {
                UDP: true,
                TCP: true,
                BOTH: true
            },
            l;
            delete b.doPortRangesOverlap.conflict;
            function k(i) {
                if (typeof i !== "string" || !n[i.toUpperCase()]) {
                    throw "protocol is invalid: " + i
                }
                return i.toUpperCase()
            }
            o = k(o);
            if (m === undefined) {
                m = p
            }
            for (var j = 0; j < h.length; j++) {
                l = k(h[j].protocol);
                if (! ((l === "UDP" && o === "TCP") || (l === "TCP" && o === "UDP"))) {
                    if (b.doesRangeOverlap(p, m, h[j].first, (h[j].last === undefined) ? h[j].first: h[j].last)) {
                        b.doPortRangesOverlap.conflict = {
                            first: p,
                            last: m,
                            protocol: o,
                            range: h[j],
                            rangeIndex: j
                        };
                        return true
                    }
                }
            }
            return false
        }
    },
    g = function(i) {
        var h = "";
        $.each(i,
        function() {
            h += "\\x" + this.lowCodepoint.toString(16).toUpperCase() + "-\\x" + this.highCodepoint.toString(16).toUpperCase()
        });
        return h
    },
    c = function(h) {
        if (typeof h === "string") {
            h = $(h)
        }
        h.find(".invalid").removeClass("invalid")
    };
    return {
        tests: b,
        rules: f,
        concatAllowedCharRanges: g,
        removeInvalidMarks: c
    }
} ()));
CISCO.ui.inputBalloon = (function() {
    var M = CISCO.ui.build,
    G, N = null,
    p = [],
    n = [],
    H = "",
    f = -5,
    j = 12,
    D = false,
    k = false,
    h = 0,
    l = null,
    g = null,
    L = false,
    s = null;
    if ($.browser.msie) {
        f = 10;
        j = 15
    }
    function t() {
        G.append('<div class="tip"></div>')
    }
    function J() {
        if (G) {
            return
        }
        G = $(CISCO.ui.build.DIV({
            id: "global-balloon",
            "class": "balloon left"
        }));
        document.body.appendChild(G[0]);
        G.click(function(b) {
            F();
            return $.cancelEvents(b)
        });
        G.mouseover(function() {
            D = true
        });
        G.mouseout(function() {
            D = false
        });
        $(window).resize(m);
        $("#scroll-container").scroll(m.curry(true));
        CISCO.Event.connect(["applet.loaded", "tab.changed", "applet.closed", "dialog.open", "dialog.close"],
        function(b) {
            F(10)
        })
    }
    function a(O, b) {
        z(O, O.els);
        if (b) {
            if (O.hasErrors) {
                O.isBlankOkOnBlur = false;
                O.originalValue = null;
                v(O, O.hasErrors);
                O.wasInvalid = true;
                O.els[0].focus();
                x(O, true)
            }
            return ! O.hasErrors
        } else {
            return ! I(O)
        }
    }
    function I(P) {
        var b = false,
        O = $(this),
        Q;
        P.els.each(function() {
            O = $(this);
            Q = O.val();
            if (K(P, Q) || u(P, Q)) {
                b = true
            }
            if (b) {
                return false
            }
        });
        return b
    }
    function K(P, Q) {
        var S = P.errors || [],
        b = false,
        R;
        for (var O = 0; O < S.length; O++) {
            R = S[O];
            b = w(R.test, R.when, Q);
            if (b) {
                break
            }
        }
        return b
    }
    function u(P, Q) {
        var R = P.required || [],
        b = false;
        for (var O = 0; O < R.length; O++) {
            b = !w(R[O].test, R[O].when, Q);
            if (b) {
                break
            }
        }
        return b
    }
    function v(b, P) {
        var O = b;
        if (b.els) {
            if (b.hasImmediateError && b.elContainer) {
                b.elContainer.removeClass("invalid");
                O = b.els
            } else {
                O = (b.elContainer ? b.elContainer: b.els)
            }
        }
        if (O.length > 0 && O[0].type == "checkbox") {
            O = O.parent().parent().find('[for="' + O[0].id + '"]')
        }
        if (P) {
            O.addClass("invalid")
        } else {
            O.removeClass("invalid");
            if (b.els) {
                b.els.removeClass("invalid")
            }
        }
    }
    function q(Q, b) {
        var P = Q.els,
        S = P.val(),
        T = P[0].id;
        var O = S === "";
        if ((S === Q.originalValue || O) && Q.isBlankOkOnBlur && b) {
            v(Q, false);
            c(Q);
            return
        }
        p.forEach(function(V) {
            if (E(V) && ( !! V.elCompareTo) && V.elCompareTo[0].id == T) {
                var U = V.els.val();
                if (V.wasInvalid || Q.wasInvalid) {
                    v(V, K(V, U));
                    V.wasInvalid = true;
                    V.originalValue = null
                }
            }
        });
        z(Q, P);
        if (Q.isChecklist && !O) {
            r(Q, P, S, !k)
        }
        if (!Q.hasErrors) {
            if (!Q.isChecklist) {
                c(Q)
            }
            v(Q, false)
        } else {
            var R = Q.wasInvalid || Q.hasImmediateError || (b && !(Q.isBlankOkOnBlur && O));
            if (R) {
                Q.originalValue = null;
                x(Q, !k, "debug");
                Q.wasInvalid = true
            }
            v(Q, R)
        }
    }
    function r(P, O, Q, b) {
        var R = P.required || [],
        S = P.suggested || [];
        if (!P.hasErrors) {
            R.forEach(function(T) {
                T.el.toggleClass("isValid", w(T.test, T.when, Q))
            });
            S.forEach(function(U, T) {
                U.el.toggleClass("isValid", w(U.test, U.when, Q))
            });
            G.html(P.balloonContent);
            t();
            x(P, b)
        }
    }
    function z(Q, P) {
        var U = Q.errors || [],
        O = false,
        S = P.val(),
        T;
        var R = false;
        for (var b = 0; b < U.length; b++) {
            T = U[b];
            O = w(T.test, T.when, S);
            if (O) {
                if (T.immediateError) {
                    R = true
                }
                if (!L) {
                    G.html(M.DIV({
                        "class": "flow"
                    },
                    [M.SPAN({
                        "class": "icon warning"
                    }), M.SPAN({
                        "class": "msg"
                    },
                    T.message)]));
                    t()
                }
                break
            }
        }
        Q.hasErrors = O;
        Q.hasImmediateError = R
    }
    function w(Q, b, P) {
        var O;
        if (!Q.test && typeof Q === "function") {
            O = b === Q(P)
        } else {
            if (typeof Q.test === "function") {
                O = b === Q.test(P)
            } else {
                console.warn("test is invalid")
            }
        }
        return O
    }
    function x(P, b) {
        var O = (P.elContainer && !P.hasImmediateError) ? P.elContainer: $(P.els[0]);
        if (!O || O.length == 0) {
            return
        }
        if (O[0].type == "checkbox") {
            O = $(O.parent().parent().find('[for="' + O[0].id + '"]'))
        }
        N = P;
        g = setTimeout(function() {
            var Q = O.getZIndex();
            if (Q >= 0) {
                G.css("z-index", Q + ($.browser.msie ? 5 : 1));
                s = O;
                CISCO.ui.tooltip.setLocation(true, G, O, f, j);
                if (b) {
                    G.stop().css("opacity", 1).show()
                } else {
                    G.stop().fadeIn()
                }
            }
            Util.closeTimer(g);
            if (P.autoHide) {
                F(7000)
            }
        },
        100)
    }
    function m(b) {
        if (G.is(":visible")) {
            CISCO.ui.tooltip.setLocation(true, G, s, f, j, b)
        }
    }
    function c(b) {
        if (N == b) {
            F();
            v(b, false);
            return
        }
    }
    function F(b) {
        N = null;
        if (!G) {
            return
        }
        if (b) {
            Util.closeTimer(l);
            if (b > 0) {
                l = setTimeout(function() {
                    F()
                },
                b)
            }
        } else {
            Util.closeTimer(g);
            Util.closeTimer(l);
            s = null;
            G.fadeOut()
        }
        D = false
    }
    function y(b) {
        var Q = b.required || [],
        R = b.suggested = b.suggested || [],
        O = [],
        P;
        b.isChecklist = (Q.length && R.length);
        Q.forEach(function(S) {
            if (b.isChecklist) {
                P = M.DIV({
                    "class": "required flow"
                },
                [M.SPAN({
                    "class": "icon"
                }), M.SPAN({
                    "class": "msg"
                },
                [M.SPAN(S.message), M.SPAN({
                    "class": "comment"
                },
                CISCO.ui.validation.strings.requiredChar)])])
            } else {
                P = M.DIV({
                    "class": "required flow"
                },
                [M.SPAN({
                    "class": "icon"
                }), M.SPAN({
                    "class": "msg"
                },
                S.message)])
            }
            O.push(P);
            S.el = $(P)
        });
        R.forEach(function(S) {
            P = M.DIV({
                "class": "suggested flow"
            },
            [M.SPAN({
                "class": "icon"
            }), M.SPAN({
                "class": "msg"
            },
            S.message)]);
            O.push(P);
            S.el = $(P)
        });
        if (b.isChecklist) {
            P = M.DIV({
                "class": "divider"
            },
            [M.SPAN({
                "class": "comment"
            },
            CISCO.ui.validation.strings.requiredChar), M.SPAN(CISCO.ui.validation.strings.required)]);
            O.push(P)
        }
        return O
    }
    function B(b) {
        if (typeof b !== "object") {
            return false
        }
        if (b.elContainer && typeof b.elContainer === "string") {
            b.elContainer = $(b.elContainer)
        }
        if (!b.els) {
            if (b.elContainer) {
                b.els = b.elContainer.children()
            } else {
                return false
            }
        } else {
            if (typeof b.els === "string") {
                b.els = $(b.els)
            }
        }
        if (typeof b.maxLen == "number") {
            b.els.each(function() {
                $(this).attr("maxlength", b.maxLen)
            })
        }
        if (typeof b.els.selector !== "string") {
            return false
        }
        return true
    }
    function d(O, b) {
        J();
        function Q(V) {
            var W = ["wasInvalid", "hasErrors", "isBlankOkOnBlur", "originalValue"];
            V.els.addClass("val-el");
            p.push(V);
            if ( !! V.balloonContent) {
                G.html(V.balloonContent);
                t()
            } else {
                V.balloonContent = y(V)
            }
            V.isValid = function(Y) {
                return a(V, Y)
            };
            V.isBlankOkOnBlur = Util.fixNoE(V.isBlankOkOnBlur, true);
            V.add = d.curry(V);
            V.show = x;
            V.hide = F;
            V.hasErrors = false;
            V.originalValue = V.els.val();
            V.wasInvalid = false;
            var T = {};
            Util.copyProps(T, V, W);
            if (V.groupContainer && !n.contains(V.groupContainer)) {
                n.push(V.groupContainer);
                $(V.groupContainer).find("input[type=text], input[type=radio], input[type=checkbox], select").focus(function() {
                    C(V.groupContainer)
                })
            }
            V.enable = function(Y) {
                Y = Util.fixNoE(Y, true);
                if (!Y) {
                    c(V)
                }
                V.els[Y ? "on": "off"]({
                    focus: U,
                    keyup: S,
                    blur: X
                });
                V.enabled = Y;
                Util.disable(V.els, !Y)
            };
            V.disable = function(Y) {
                Y = Util.fixNoE(Y, true);
                return V.enable(!Y)
            };
            V.enable(!V.els.prop("disabled"));
            function X() {
                if (!D) {
                    q(V, true)
                }
                k = false
            }
            V.reset = function(Y) {
                Util.copyProps(V, T, W);
                if (Y) {
                    V.els.val(V.originalValue)
                }
                v(V, false)
            };
            function S(Z) {
                k = Util.isKey(Z, Util.keys.tab);
                if (Z.altKey) {
                    var Y = setTimeout(function() {
                        q(V, false);
                        clearTimeout(Y)
                    },
                    500)
                } else {
                    if (Util.isTextChangeKey(Z)) {
                        q(V, false)
                    }
                }
                return true
            }
            function U(Y) {
                if (V.clearOnFocus) {
                    v(V, false);
                    F();
                    V.clearOnFocus = false
                }
                if (V.isComposite && (k || (V.elContainer.find(":first-child").is(V.els) && V.originalValue == O.els.val()))) {
                    Y.target.select()
                }
                if (s != null && Y.target != s) {
                    F()
                }
                q(V, false);
                k = false
            }
        }
        if (B(O)) {
            O.valItems = [];
            if (!O.group) {
                O.group = O.isComposite ? "comp" + (h++) : "default"
            }
            O.isValid = function(U) {
                var T = true;
                for (var S = 0; S < O.valItems.length; S++) {
                    T = T && O.valItems[S].isValid(U && T)
                }
                return T
            };
            var R = $.extend({},
            O);
            P(O.els);
            O.els.find(":not(.val-el)").on({
                focus: function() {
                    P(O.els.find(":not(.val-el"))
                }
            })
        }
        if ( !! b) {
            x(O, true)
        }
        function P(S) {
            S.each(function(U, V) {
                var T = $.extend({},
                R);
                T.els = $(V);
                Q(T);
                O.valItems.push(T)
            })
        }
        O.enable = function(S) {
            S = Util.fixNoE(S, true);
            O.els.each(function() {
                i($(this), S)
            })
        };
        O.reset = function(S) {
            O.els.each(function() {
                var T = this;
                p.forEach(function(U) {
                    if (T == (U.els[0])) {
                        U.reset( !! S)
                    }
                })
            })
        };
        O.disable = function(S) {
            S = Util.fixNoE(S, true);
            O.enable(!S)
        };
        O.message = function(S) {
            G.html(M.DIV([M.SPAN({
                "class": S["class"]
            }), M.SPAN(S.message)], true));
            t();
            x(O, true)
        };
        return O
    }
    function C(b) {
        if (H != b) {
            n.forEach(function(O) {
                if (O != b) {
                    v($(O).find(".invalid"), false);
                    c(O)
                }
            })
        }
        H = b
    }
    function E(b) {
        return (b.enabled && (b.validateDisabled || !b.els.is(":disabled")))
    }
    function o(O) {
        if (!O) {
            O = "default"
        }
        var b = true;
        L = false;
        p.forEach(function(Q) {
            if (E(Q) && Q.group == O) {
                var P = Q.isValid();
                Q.wasInvalid = true;
                v(Q, !P);
                Q.originalValue = null;
                Q.isBlankOkOnBlur = false;
                if ((!P) && b) {
                    L = true;
                    b = false;
                    if (Q.els[0].type != "checkbox") {
                        Q.els[0].focus()
                    }
                    x(Q, true)
                }
            }
        });
        L = false;
        return b
    }
    function A(O, b) {
        if (!O) {
            O = "default"
        }
        p.forEach(function(P) {
            if (P.group == O) {
                P.reset( !! b)
            }
        })
    }
    function i(b, O) {
        O = Util.fixNoE(O, true);
        $(b).each(function() {
            var P = this;
            p.forEach(function(Q) {
                if (P == (Q.els[0])) {
                    Q.enable(O)
                }
            })
        })
    }
    function e(b, O) {
        O = Util.fixNoE(O, true);
        i(b, !O)
    }
    return {
        init: J,
        add: d,
        show: x,
        hide: F,
        build: y,
        validate: o,
        enable: i,
        disable: e,
        reset: A,
        message: function(O) {
            currentMessage = null;
            var b = CISCO.ui.inputBalloon.add({
                els: O.els,
                clearOnFocus: true,
                hasErrors: O.hasErrors,
                autoHide: !!O.autoHide,
                balloonContent: M.DIV({
                    "class": "flow"
                },
                [M.SPAN({
                    "class": Util.fixNoE(O["class"], "icon warning")
                }), M.SPAN({
                    "class": "msg"
                },
                O.message)], true)
            },
            true);
            v(b, O.hasErrors);
            return b
        }
    }
} ());
CISCO.ui.buildInputValidBalloon = (function() {
    var a = CISCO.ui.validation.tests,
    b = CISCO.ui.validation.rules,
    d = CISCO.ui.validation.strings;
    var c = {
        numeric: "0-9",
        alpha: "a-zA-Z0-9",
        ascii: "\x20-\x7E",
        hex: "a-fA-F0-9",
        domainName: "a-zA-Z0-9.-",
        storageUserName: "a-zA-Z0-9_-",
        shareUserName: "a-zA-Z0-9 -"
    };
    function e(g, f, h) {
        return (g === f ? "": g + "-") + f + " " + (h == "numeric" ? d.digit: d.characters)
    }
    return function(f) {
        var g = $.extend({
            els: f.els,
            errors: [],
            required: [],
            suggested: [],
            isRequired: (f.type != "checked") && !!f.isRequired,
            groupContainer: f.groupContainer
        },
        f);
        if (g.isRequired) {
            g.errors.push({
                test: a.isBlank,
                when: true,
                message: d.inputIsRequired
            })
        }
        if (f.validCharSet) {
            if (c[f.validCharSet]) {
                g.errors.unshift({
                    test: new RegExp("[^" + c[f.validCharSet] + "]+"),
                    when: true,
                    message: d.invalidCharacters,
                    immediateError: true
                })
            } else {
                g.errors.unshift({
                    test: new RegExp("[^" + f.validCharSet + "]+"),
                    when: true,
                    message: d.invalidCharacters,
                    immediateError: true
                })
            }
        }
        if (f.whiteSpace === false) {
            g.errors.push(b.leadingWhitespace());
            g.errors.push(b.trailingWhiteSpace())
        }
        switch (f.validationType) {
        case "email":
            g.errors.push({
                test:
                a.isEmail,
                when: false,
                message: d.invalidEmailAddress
            });
            break;
        case "confirmEmail":
            g.errors.push({
                test:
                a.matchAnotherInput.curry(f.elCompareTo),
                when: false,
                message: d.emailDoesNotMatch
            });
            break;
        case "password":
            g.required.push({
                test:
                a.isLengthInRange.curry(f.minLen, f.maxLen),
                when: true,
                message: e(f.minLen, f.maxLen, f.validCharSet)
            });
            g.suggested.push(b.alpha());
            g.suggested.push(b.numeric());
            break;
        case "confirmPassword":
            g.errors.push({
                test:
                a.matchAnotherInput.curry(f.elCompareTo),
                when: false,
                message: d.passwordDoesNotMatch
            });
            break;
        case "utf8LengthTooLong":
            g.errors.push({
                test:
                a.isUTF8LengthTooLong.curry(f.maxLen),
                when: true,
                message: d.tooManyCharacters
            });
            break;
        case "ipAddress":
            g.errors.push({
                test:
                a.isIPAddress.curry(f.elContainer, f.allowZeroes),
                when: false,
                message: d.invalidIPAddress
            });
            break;
        case "ipv6Address":
            g.errors.push(b.leadingWhitespace());
            g.errors.push(b.trailingWhiteSpace());
            g.errors.push({
                test:
                a.isIPv6Address,
                when: false,
                message: d.invalidIPv6Address
            });
            break;
        case "routerIPAddress":
            g.errors.push({
                test:
                a.isRouterIPAddress.curry(f.elContainer, f.elInputSubnetMask),
                when: false,
                message: d.invalidIPAddress
            });
            break;
        case "subnetMask":
            g.errors.push({
                test:
                a.isSubnetMask.curry(f.elContainer, f.minNetworkPrefixLength, f.maxNetworkPrefixLength),
                when: false,
                message: d.invalidSubnetMask
            });
            break;
        case "macAddress":
            g.errors.push({
                test:
                a.isMACAddress.curry(f.elContainer),
                when: false,
                message: d.invalidMACAddress
            });
            break;
        case "lastOctet":
            g.errors.push({
                test:
                a.isLastOctet,
                when: false,
                message: d.invalidLastOctet
            });
            break;
        case "validHost":
            g.errors.push({
                test:
                a.isIPAddress.curry(f.elContainer, f.allowZeroes),
                when: false,
                message: d.invalidIPAddress
            });
            g.errors.push({
                test: a.isHostValidForGivenRouterIPAddressAndSubnetMask.curry(f.elContainer, f.elInputRouterIPAddress, f.elInputSubnetMask),
                when: false,
                message: d.invalidIPAddressSubnet
            });
            break;
        case "domainOrIpAddress":
            g.errors.push({
                test:
                a.isDomainOrIpAddress,
                when: false,
                message: d.invalidDomainOrIpAddress
            });
            break;
        case "hostName":
            g.errors.push({
                test:
                a.isHostName,
                when: true,
                message: d.invalidCharacters
            });
            break;
        case "checked":
            g.isRequired = false;
            g.errors.push({
                test: function() {
                    return g.els.attr("checked") == "checked"
                },
                when: false,
                message: f.message
            });
            break;
        default:
            if (typeof f.minLen == "number" && typeof f.maxLen == "number" && typeof f.validCharSet == "string") {
                g.errors.push({
                    test: a.isLengthInRange.curry(f.minLen, f.maxLen),
                    when: false,
                    message: e(f.minLen, f.maxLen, f.validCharSet)
                })
            } else {
                if (typeof f.minLen == "number" && typeof f.maxLen == "number") {
                    g.errors.push({
                        test: a.isLengthInRange.curry(f.minLen, f.maxLen),
                        when: false,
                        message: e(f.minLen, f.maxLen)
                    })
                } else {
                    if (typeof f.maxLen == "number") {
                        g.errors.push({
                            test: a.isLengthTooLong.curry(f.maxLen),
                            when: true,
                            message: d.tooManyCharacters
                        })
                    }
                }
            }
            if (typeof f.minVal == "number" && typeof f.maxVal == "number") {
                g.errors.push({
                    test: function(h) {
                        return a.isInRange(f.minVal, f.maxVal, f.isRequired, h)
                    },
                    when: false,
                    message: Util.outOfRangeMessage(f.minVal, f.maxVal)
                })
            } else {
                if (typeof f.minVal == "number") {
                    g.errors.push({
                        test: a.isGreaterThanOrEqualTo.curry(f.minVal),
                        when: false,
                        message: d.outOfRange
                    })
                }
            }
        }
        return CISCO.ui.inputBalloon.add(g)
    }
} ());
CISCO.ui.placeholders = (function() {
    function b() {
        return CISCO.ui.getDirection() == "ltr"
    }
    function a() {
        var c = $("input[type=password], input[type=text]");
        Util.whenReady("Styles Loaded",
        function() {
            c.each(function(e, f) {
                var d = $(f);
                if (d.attr("placeholder") != undefined) {
                    if (d.width() < 10) {
                        return null
                    }
                }
                return true
            });
            return true
        },
        function() {
            var g = CISCO.ui.isSmallWindow(),
            k = 0,
            q = 0.8,
            i = CISCO.browser.browser == "IE",
            h = CISCO.browser.browser == "Firefox",
            l = CISCO.browser.browser == "iPad",
            p = CISCO.browser.browser == "android",
            d = ((i || l || p) && !g);
            c.each(function(w, x) {
                var u = $(x);
                var v = u.attr("placeholder");
                function s() {
                    try {
                        var C = u.val();
                        if (x.type == "password") {
                            C = "H".repeat(C.length)
                        }
                        var B = 240;
                        var A = Util.getTextLength(C, x);
                        if (i) {
                            y.innerHTML = ((B - A - Util.getTextLength(v, x)) > 0) ? v: ""
                        } else {
                            z.css("visibility", ((B - A - Util.getTextLength(v, x)) > 0) ? "visible": "hidden")
                        }
                        if (d) {
                            if (u.val().trim() != "") {
                                z.css("text-align", b() ? "right": "left")
                            } else {
                                z.css("text-align", b() ? "left": "right")
                            }
                        }
                    } catch(D) {}
                }
                if (v != undefined) {
                    var y = document.createElement("label");
                    var z = $(y);
                    z.attr("for", x.id);
                    y.innerHTML = v;
                    if (g) {
                        z.insertBefore(x);
                        u.attr("placeholder", "");
                        $(x.parentNode).addClass("no-place-holder")
                    } else {
                        z.insertAfter(x);
                        $(x.parentNode).addClass("place-holder");
                        var t = Util.getTextLength(v, x);
                        k = Math.max(t / 240, k);
                        if (d) {
                            u.attr("placeholder", "")
                        }
                        u.on({
                            keyup: s
                        });
                        s()
                    }
                }
            });
            if (!g && k > q) {
                var r = h ? 11 : 12,
                f = h ? 7 : 8,
                n = Math.max(Math.round(r * q / k), f),
                m = n + "px",
                e = parseInt("c5", 16),
                j = parseInt("73", 16),
                o = "#" + Math.floor(e - (e - j) * (r - n) / (r - f)).toString(16).repeat(3);
                $(".place-holder").each(function(t, s) {
                    $(s).find("label").css("font-size", m).css("color", o)
                });
                if (!i) {
                    if (h) {
                        $("head").append('<style type="text/css" rel="stylesheet" >:-moz-placeholder { font-size: ' + m + " !important; color: " + o + " !important; }</style>")
                    } else {
                        CISCO.ui.modifyStylesheet([{
                            browser: "safari,chrome,iphone,android",
                            selector: "input::-webkit-input-placeholder",
                            changes: [["font-size", m], ["color", o]]
                        }])
                    }
                }
            }
        },
        true)
    }
    return {
        init: a
    }
} ());
CISCO.ui.modifyStylesheet = function(h) {
    var l = document.styleSheets;
    for (var e = 0; e < l.length; e++) {
        var k = l[e].cssRules || l[e].rules;
        for (var d = 0; d < k.length; d++) {
            for (var f = 0; f < h.length; f++) {
                var g = h[f];
                if (k[d].selectorText == g.selector) {
                    for (var b = 0; b < g.changes.length; b++) {
                        var a = g.changes[b];
                        if (g.browser.contains(CISCO.browser.browser)) {
                            k[d].style.setProperty(a[0], a[1])
                        }
                    }
                }
            }
        }
    }
};
CISCO.ui.applet = (function() {
    var a = [];
    function b(d) {
        a.push(d);
        function c() {
            CISCO.ui.MainMenu.launchApplet(d)
        }
        return {
            applet: d,
            assignClick: function(e) {
                $(e).click(c)
            },
            open: c
        }
    }
    return {
        add: b,
        applets: a
    }
} ());
CISCO.ui.appStoreMenu = CISCO.ui.applet.add({
    appletId: "E91E0149-A1D4-450C-9922-82CAA65B16CE",
    version: "1.0.0.0",
    name: "APP Store",
    isFree: true,
    url: "ui/dynamic/applets/app_store/main.html"
});
CISCO.ui.appMyAccount = CISCO.ui.applet.add({
    appletId: "26E3D44A-261C-4C18-B880-83EEA6B1D462",
    name: "{{My Account}}",
    isFree: true,
    description: "{{Manage your Cisco Connect Cloud Account}}",
    version: "1.0.0.0",
    url: "ui/dynamic/applets/my_account/main.html"
});
CISCO.ui.slideshow = (function() {
    return function(f) {
        var l = $(f.container);
        if (l.length != 1) {
            return null
        }
        var p = CISCO.ui.build,
        t = -1,
        c, j = [],
        a = (f.textWidth || 340),
        e = l[0],
        r = (f.delay || 7) * 1000,
        k = p.DIV({
            "class": "slide-back"
        }),
        i = p.DIV({
            "class": "slide-next"
        }),
        q = p.DIV({
            "class": "slide-center"
        }),
        s = p.DIV({
            "class": "slide-lights"
        }),
        h = p.DIV({
            "class": "slide-footer"
        },
        [s]),
        m = p.DIV({
            "class": "slide-caption"
        },
        f.caption),
        d = p.DIV({
            "class": "slide-panel"
        },
        [q, k, i, h, m]);
        e.appendChild(d);
        var n = $(s);
        $(k).click(function() {
            o( - 1)
        });
        $(i).click(function() {
            o()
        });
        f.slides.forEach(function(b, C) {
            var B = b.text.replace(/[\{\}]/g, ""),
            P = p.IMG({
                src: f.imagePath + b.image
            }),
            x = p.SPAN(),
            u = p.DIV({
                "class": "slide-text",
                innerHTML: "<p>/</p>"
            }),
            H = $(u),
            D = {
                elImage: $(P),
                elTextDiv: H,
                elLight: $(x)
            },
            M = [];
            g(D, true);
            q.appendChild(P);
            q.appendChild(u);
            var I = H.find("p"),
            y = Util.getTextLength("i\u00a0i", I) - Util.getTextLength("ii", I),
            L = B.split(" "),
            z = 0,
            K = false;
            L.forEach(function(Q) {
                var S = Q.indexOf("<em>"),
                U = Q.indexOf("</em>"),
                R = (S > 0 || K) && U < 0;
                if (R) {
                    Q += "</em>"
                }
                if (S != 0 && K) {
                    Q = "<em>" + Q
                }
                var T = Util.getTextLength(Q, I);
                M.push(T);
                z += T;
                K = R
            });
            z += (L.length - 1) * y;
            var v = Math.min(Math.ceil(z / 155), 4),
            O = [],
            G = 0,
            A = Math.min(Math.ceil(z / v), a);
            if (A == a) {
                v = Math.ceil(z / A)
            }
            for (var w = 0; w < v; w++) {
                O[w] = [];
                var N = 0;
                var J = 0;
                while (function() {
                    var Q = false;
                    if (G < L.length) {
                        if (O[w].length == 0) {
                            J = M[G];
                            Q = true
                        } else {
                            J = N + M[G] + y;
                            if (J > A + 75) {
                                Q = N < 85
                            } else {
                                if (J > A) {
                                    if (G == L.length - 1) {
                                        Q = w == v - 1
                                    } else {
                                        if (N < 85 || J + M[G + 1] + y < A + 75) {
                                            Q = true
                                        } else {
                                            Q = false
                                        }
                                    }
                                } else {
                                    Q = true
                                }
                            }
                        }
                    }
                    return Q
                } ()) {
                    N = J;
                    O[w].push(L[G]);
                    G++
                }
            }
            while (G < L.length) {
                O[v - 1].push(L[G]);
                G++
            }
            var F = [];
            O.forEach(function(Q) {
                F.push(Q.join("\u00a0"))
            });
            u.innerHTML = "<p>" + F.join("<br/>") + "</p>";
            s.appendChild(x);
            if (CISCO.browser.ieVersion == 8) {
                D.elImage.css("background-color", "#D0EEFF")
            }
            if (b.click) {
                if ($.isFunction(b.click)) {
                    D.elImage.click(b.click);
                    D.elText.click(b.click)
                } else {
                    var E = function() {
                        window.top.location.href = b.click
                    };
                    D.elImage.click(E);
                    D.elText.click(E)
                }
            }
            D.elLight.click(function() {
                o(C)
            });
            j.push(D)
        });
        $(s).css("width", (((j[0].elLight.width() + Util.pxToNum(j[0].elLight.css("margin-left")) + Util.pxToNum(j[0].elLight.css("margin-right"))) * j.length) + 12) + "px");
        o(0);
        function o(b) {
            var u = (j.length - 1);
            Util.closeTimer(c);
            n.find("span").removeClass("lit");
            if (t > -1) {
                g(j[t], true)
            }
            t = (Util.isNoE(b) ? t + 1 : (b == -1 ? t - 1 : b));
            t = (t < 0 ? u: (t > u ? 0 : t));
            g(j[t], false);
            j[t].elLight.addClass("lit");
            c = setTimeout(o, r)
        }
        function g(b, u) { [b.elImage, b.elTextDiv].forEach(function(v) {
                if (CISCO.browser.ieVersion == 8) {
                    v.css("display", u ? "none": "block")
                } else {
                    v.stop().fadeTo("slow", u ? 0 : 1)
                }
            })
        }
        return {
            stop: function() {
                Util.closeTimer(c)
            },
            start: o
        }
    }
} ());
CISCO.ui.showSlides = (function() {
    return function(a) {
        var c = CISCO.ui.slideResources.slideText,
        b = CISCO.ui.slideshow({
            container: "#slide-show",
            imagePath: webroot + "ui/static/images/slides/",
            slides: [{
                image: "Add_devices.png",
                text: c.addDevices
            },
            {
                image: "guest_access.png",
                text: c.guestAccess
            },
            {
                image: "parental_controls.png",
                text: c.parentalControls
            },
            {
                image: "app_store.png",
                text: c.appStore
            },
            {
                image: "remote_access.png",
                text: c.remoteAccess
            }],
            caption: a
        })
    }
} ());
$.extend($.expr[":"], {
    inline: function(b) {
        return $(b).css("display") === "inline"
    },
    block: function(b) {
        return $(b).css("display") === "block"
    }
});
CISCO.ui.textOrphan = function() {
    "h1,h2,h3,h4,p,div,li".split(",").forEach(function(b) {
        $(b + ":not(.text-orphan, .no-text-orphans, .no-text-orphans > *, .slide-text p, .check-item, .check-item > div, .word-break, .word-break > _2A, .row, .row > *, .device-icon-box, .device-icon-box > *, .device-icon )").each(function() {
            var k = this,
            h = $(k),
            d = 0,
            c = this.innerHTML.trim().replace(/\s/g, " ");
            if (!a(c, d,
            function(i) {
                k.innerHTML = i
            })) {
                if (h.find("input, select, a, table, div, p, h1, h2, button, ul, li").length == 0) {
                    var j = h.contents();
                    for (var f = 0; f < j.length && d < 22; f++) {
                        var e = j[j.length - f - 1];
                        if (e.nodeType == 3 && e.nodeValue != null) {
                            c = e.nodeValue.replace(/\s/g, " ");
                            var g = c.length + d;
                            if (g < 22) {
                                e.nodeValue = c.replace(/' '/g, "\u00a0")
                            } else {
                                a(c, d,
                                function(i) {
                                    e.nodeValue = i
                                })
                            }
                            d = g
                        }
                    }
                }
            }
            h.addClass("text-orphan")
        })
    });
    $(".form label").each(function() {
        this.innerHTML = this.innerHTML.replace(/ \:/g, "\u00a0:")
    });
    function a(c, b, e) {
        if (c.contains("<")) {
            return false
        }
        var f = c.split(" ");
        if (f.length > 6) {
            var h = 0;
            do {
                h++;
                b += f[f.length - h].length + 1
            } while ( h < 4 && b < 22 );
            if (h > 2) {
                h--;
                var d = f.slice(0, f.length - h);
                var g = f.slice(f.length - h, f.length);
                e(d.join(" ") + " " + g.join("\u00a0"))
            }
        }
        return true
    }
};
CISCO.ui.getDirection = function() {
    return $("html").attr("dir").replace(/[\{\}]/gi, "").split("-")
};
CISCO.ui.editFormClick = function(a, g, d, f) {
    var c = true;
    var e = $(a),
    b = function() {
        if (Util.fixNoE(f, true)) {
            CISCO.ui.fixIeForm(e)
        }
    };
    $(g).click(function() {
        var i = !e.hasClass("edit");
        if (i || !c) {
            e.toggleClass("edit");
            var h = $(this);
            if (c) {
                h.addClass("disabled");
                h.attr("disabled", true)
            } else {
                this.innerText = (i ? CISCO.ui.button.strings.cancel: CISCO.ui.button.strings.edit)
            }
            if (d) {
                d(i)
            }
            b()
        }
    });
    b()
};
CISCO.ui.isSmallWindow = function() {
    if (!$("body").hasClass("show-mobile")) {
        return false
    }
    var a = $(window);
    return a.width() < 1000 || a.height() < 500
};
if (CISCO.ui.isSmallWindow()) {
    $("html").addClass("small-window");
    var currentTextBox = null;
    $("input[type=text]").focus(function() {
        currentTextBox = this
    });
    $("input[type=text]").blur(function() {
        if (currentTextBox == this) {
            currentTextBox = null
        }
    });
    function forceView() {
        if (currentTextBox != null) {
            currentTextBox.parentNode.scrollIntoView()
        }
        setTimeout(forceView, 200)
    }
    forceView()
}
CISCO.ui.constrainKeysToEl = (function() {
    var e = CISCO.browser.browser == "IE",
    g;
    function b(i) {
        var h = !i;
        setTimeout(function() {
            var k = $("*:focus"),
            j;
            if ($(k).parents(g).length == 0) {
                j = $(g).find("input:visible, select:visible, button:visible, textarea:visible");
                if (j.length > 0) {
                    if (h) {
                        j.first().focus()
                    } else {
                        j.last().focus()
                    }
                } else {
                    $("#focus-fallback").focus()
                }
            }
        },
        0)
    }
    function c(h) {
        var i = (h.keyCode || h.which) == 9 && h.shiftKey;
        b(i)
    }
    function d(h) {
        h = h || window.event;
        if (e && (h.keyCode == 13 || h.which == 13) && ($(h.target).parents(g).length === 0 || !$(h.target).is("button:visible:enabled"))) {
            h.stopPropagation();
            h.preventDefault();
            return false
        }
    }
    function f(h) {
        g = h;
        $(document).bind("keydown", c);
        $(g).bind("keypress", d);
        $(document).bind("keypress", d)
    }
    function a() {
        $(document).unbind("keydown", c);
        $(g).unbind("keypress", d);
        $(document).unbind("keypress", d)
    }
    return {
        add: f,
        remove: a
    }
} ());
CISCO.ui.shield = (function() {
    function b(e, f) {
        var d;
        e.each(function(g, i) {
            var h = $(i);
            if (h.css("position") !== "relative") {
                if (f) {
                    h.css("position", "relative")
                } else {}
            }
            d = h.find(".shield");
            if (!d.length) {
                h.append('<div class="shield"></div>')
            }
        })
    }
    function c(e) {
        var d;
        e.each(function(f, g) {
            $(g).find(".shield").remove()
        })
    }
    function a(d, e) {
        if (typeof e == "undefined") {
            e = (d.find(".shield").length === 0)
        }
        if (e) {
            b(d)
        } else {
            c(d)
        }
    }
    return {
        raise: b,
        lower: c,
        toggle: a
    }
} ());
CISCO.ui.clearTbl = function(a) {
    a.find("tr").each(function(b) {
        if (b > 0) {
            $(this).remove()
        }
    })
};
CISCO.ui.setCheckboxTemplate = function(e) {
    var d = null,
    b = null,
    a = "",
    c = "",
    g = "",
    f = false;
    if (typeof e === "string") {
        e = $(e)
    }
    e.find('input:[type="checkbox-template"]').each(function() {
        d = $(this);
        b = d.parent();
        a = d.attr("name");
        c = d.attr("class");
        g = d.attr("checked");
        d.remove();
        d = $('<input type="checkbox" />');
        d.attr("name", a);
        d.attr("class", c);
        d.attr("checked", g);
        b.append(d);
        f = true
    });
    if (f) {
        e.find("input:[type=checkbox]").checkBox({
            hideInput: true,
            addVisualElement: true,
            addLabel: true
        })
    }
};