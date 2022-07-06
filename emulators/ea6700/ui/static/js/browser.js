if (!window.CISCO) {
    window.CISCO = {}
}
CISCO.browser = (function() {
    var m = "",
    p = false,
    k;
    function q(t) {
        return /Android/.test(t)
    }
    function f(t) {
        return t.match(/iPhone/) || t.match(/Mobile Safari/)
    }
    function n(t) {
        return t.match(/iPad/i)
    }
    function g(t) {
        return /Firefox/.test(t)
    }
    function l(u) {
        var t = -1;
        if (/Firefox[\/\s](\d+\.\d+)/.test(u)) {
            t = parseInt(RegExp.$1, 10)
        }
        return t
    }
    function b(t) {
        return /Chrome/.test(t)
    }
    function o(t) {
        return /Safari/.test(t)
    }
    function s(v) {
        var u = -1;
        var t = {
            533 : 5,
            531 : 4,
            528 : 4,
            525 : 3,
            523 : 3,
            522 : 3,
            419 : 2,
            417 : 2,
            416 : 2,
            412 : 2,
            312 : 1,
            125 : 1,
            100 : 1,
            85 : 1
        };
        if (/Safari\/(\d+\.)/.test(v + ".")) {
            var w = parseInt(RegExp.$1);
            if (/Version\/(\d+\.)/.test(v)) {
                return parseInt(RegExp.$1)
            }
            if (t[w]) {
                return t[w]
            }
        }
        if (/Safari (\d+\.)/.test(v)) {
            return parseInt(RegExp.$1)
        }
        return u
    }
    function c(u) {
        var t = -1;
        if (/iPad;.+CPU OS (\d+)_/.test(u)) {
            t = parseInt(RegExp.$1, 10)
        }
        return t
    }
    function h(t) {
        return d(t) > -1
    }
    function d(u) {
        var t = -1;
        if (/MSIE (\d+\.\d+);/.test(u)) {
            t = parseInt(RegExp.$1, 10)
        }
        return t
    }
    function i() {
        $.cookie("is_cookies_enabled", "enabled", {
            path: webroot || "/"
        });
        if ($.cookie("is_cookies_enabled") == "enabled") {
            $.cookie("is_cookies_enabled", null);
            return true
        } else {
            return false
        }
    }
    function a() {
        var t = navigator.userAgent;
        return /Android/.test(t) || t.match(/iPhone/) || t.match(/Mobile Safari/) || false
    }
    function r() {
        return ! p
    }
    function e(u) {
        var t = -1;
        k = u;
        if (q(u)) {
            m = "android";
            p = false
        } else {
            if (n(u)) {
                m = "iPad";
                p = true
            } else {
                if (f(u)) {
                    m = "iPod";
                    p = false
                } else {
                    if (h(u)) {
                        t = d(u);
                        m = "IE IE" + t;
                        p = (t >= 8)
                    } else {
                        if (g(u)) {
                            t = l(u);
                            m = "firefox firefox" + t;
                            p = (t >= 8)
                        } else {
                            if (b(u)) {
                                m = "chrome";
                                p = true
                            } else {
                                if (o(u)) {
                                    t = s(u);
                                    m = "safari safari" + t;
                                    p = (t >= 5)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function j() {
        e(navigator.userAgent);
        if (c(navigator.userAgent) > -1) {
            document.write('<link type="text/css" rel="stylesheet" href="ui/static/css/ipad.css" />');
            document.write('<meta name="viewport" content="width=1024" />')
        } else {
            document.write('<meta name="viewport" content="user-scalable=yes; width=device-width; initial-scale=0.75; maximum-scale=10.0" />')
        }
        $("html").addClass(m)
    }
    j();
    return {
        isCookiesEnabled: i,
        isBrowserInvalidMobile: a,
        isBrowserInvalid: r,
        ffVersion: l(k),
        ieVersion: d(k),
        safariVersion: s(k),
        mobileSafariVersion: c(k),
        browser: m.split(" ")[0]
    }
} ());