CISCO.ui.helpMenu = (function() {
    var c = null,
    d = [],
    f = null,
    b = null;
    function e() {
        b = $("#help-dialog-wrapper");
        if (GLOBAL.areServicesSupported(["../cisco.com/jnap/ui/Settings"]) || GLOBAL.uiLoadedFromCloud()) {
            f = "help-remote.html"
        } else {
            f = "help-local.html"
        }
        h();
        $("#help-menu, #help-forgot-password").click(j);
        $("#help-menu-dialog .close-button").click(function() {
            c.close()
        });
        function k() {
            if (CISCO.browser.mobileSafariVersion > -1 && CISCO.browser.mobileSafariVersion < 5) {
                setTimeout(i, 500)
            } else {
                i()
            }
        }
        function i() {
            var o = $.cookie("current-applet"),
            l = b.find("nav");
            if (o && d.length !== 0 && b.find("#help-nav-list #" + o).length) {
                b.find("#help-nav-list #" + o).click();
                if (CISCO.browser.mobileSafariVersion == -1) {
                    var n = b.find("#help-nav-list #" + o).offset().top - l.offset().top,
                    m = l.scrollTop();
                    if (n > m + l.outerHeight()) {
                        l.scrollTop(n)
                    }
                }
            }
        }
        function j() {
            c = CISCO.ui.dialogHelp("#help-menu-dialog");
            if ($("#help-menu-dialog div.dialog-content div.help-content").children().length === 0) {
                h(i)
            }
            c.show();
            b.find("#help-nav-list #CiscoConnectCloud").click();
            k()
        }
        function g(n, m) {
            for (var l = 0; l < n.length; l++) {
                if (b.find("#help-nav-list #" + $(n[l]).attr("id")).length == 0) {
                    b.find("#help-nav-list").append(n[l])
                }
            }
            for (var l = 0; l < m.length; l++) {
                if (b.find('#help-menu-dialog div.dialog-content div[id="' + $(m[l]).attr("id") + '"]').length == 0) {
                    b.find("#help-menu-dialog div.dialog-content div.help-content").append(m[l])
                }
            }
            $("#help-menu-dialog > nav > ul > li").click(function() {
                $.each($("#help-nav-list").children(),
                function(p) {
                    $(this).removeClass("selected")
                });
                $(this).addClass("selected");
                if (b.find("#help-" + $(this).attr("id")).offset()) {
                    var o = b.find("#help-" + $(this).attr("id")).offset().top;
                    if (CISCO.browser.mobileSafariVersion > -1) {
                        $(document.body).scrollTop(o)
                    } else {
                        b.find("#help-menu-dialog div.dialog-content div.pad-horz-lrg").scrollTop(b.find("#help-menu-dialog div.dialog-content div.pad-horz-lrg").scrollTop() + o - b.find("#help-menu-dialog div.dialog-content div.pad-horz-lrg").offset().top)
                    }
                }
            });
            k();
            CISCO.ui.textOrphan()
        }
        function h() {
            function m(t, u, v) {
                l++;
                if (!v) {
                    d.splice(jQuery.inArray(u, d), 1)
                }
                if (l == t) {
                    $.each(d,
                    function(x) {
                        var y = this;
                        if (x > 0) {
                            r[x - 1] = p.formatObj(y)
                        }
                        var w = n.formatObj(y);
                        $.get(this.helpPath,
                        function(A) {
                            var z = w + A + "</div>";
                            q[x] = z;
                            s++;
                            if (s === d.length) {
                                g(r, q)
                            }
                        })
                    })
                }
            }
            function o(t, u) {
                $.ajax({
                    url: u.helpPath,
                    type: "HEAD",
                    error: function() {
                        m(t, u, false)
                    },
                    success: function() {
                        m(t, u, true)
                    }
                })
            }
            var q = [],
            r = [],
            p = '<li id="{appletId}">{name}</li>',
            n = '<div id="help-{appletId}">',
            l = 0,
            s = 0;
            if (typeof CONNECT === "object" && CONNECT.AppletManager) {
                d = $.extend([], CONNECT.AppletManager.getAppletList());
                $.each(d,
                function(t) {
                    this.helpPath = this.root + "help/" + f
                });
                d.splice(0, 0, {
                    appletId: "CiscoConnectCloud",
                    root: "ui/dynamic/default.htm",
                    name: "Cisco Connect Cloud",
                    helpPath: "ui/dynamic/" + f
                });
                $.each(d,
                function(t) {
					if( !/^undefined/.test( d[t].helpPath ) )
						o(d.length, d[t])
                })
            } else {
                $.get(webroot + "ui/dynamic/" + f,
                function(u) {
                    var t = '<div id="help-CiscoConnectCloud">' + u + "</div>";
                    q[0] = t;
                    g(r, q)
                })
            }
        }
    }
    function a() {
        return c.isShowing()
    }
    return {
        initialize: e,
        isShowing: a
    }
} ());