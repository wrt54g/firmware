Util = {
    isNull: function(a) {
        return (typeof a == "undefined") || (a == null)
    },
    isNoE: function(a) {
        return Util.isNull(a) || (typeof(a) == "string" && a.length == 0)
    },
    fixNull: function(a, b) {
        return a == null ? Util.fixNull(b, "") : a
    },
    fixNoE: function(a, b) {
        return Util.isNoE(a) ? Util.fixNull(b, "") : a
    },
    padIf: function(b, a, c) {
        return Util.isNoE(a) ? a: b + a + c
    },
    closeTimer: function(a) {
        if (!Util.isNoE(a)) {
            self.clearTimeout(a);
            a = null
        }
    },
    pxToNum: function(a) {
        var b = a.indexOf("px");
        if (b > 0) {
            return new Number(a.substr(0, b))
        }
        return 0
    },
    isKey: function(b, a) {
        return (b.which || b.keyCode) == (typeof(a) == "string" ? Util.keys(a) : a)
    },
    isTextChangeKey: function(c) {
        var b = (c.which || c.keyCode);
        var a = [8, 17, 18, 32, 45, 46, 59, 95, 106, 107, 109, 110, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222];
        return (b > 47 && b < 91) || (b >= 96 && b <= 105) || c.altKey || a.contains(b)
    },
    trapEnter: function(a, c, b) {
        return Util.trapKeys([Util.keys.enter], a, c, b)
    },
    trapKeys: function(d, a, c, b) {
        $(a).keydown(function(e) {
            var f = e.which || e.keyCode;
            if (d.contains(f)) {
                if (c) {
                    c()
                }
                return $.cancelEvents(e)
            }
            if (b) {
                b(f, e)
            }
            return true
        })
    },
    rootUrl: function() {
        var a = window.location.href;
        var b = Util.padIfNotNull("", Util.extract("", a, "://"), "://");
        return b + Util.extract(b, a + "default.htm", "default.htm") + "default.htm"
    },
    getUrlVars: function() {
        var b = {};
        var a = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(c, d, e) {
            b[d] = unescape(e)
        });
        return b
    },
    disable: function(a, b) {
        $(a).prop("disabled", b)
    },
    toggleDisabled: function(a) {
        Util.disable(a, Util.fixNoE($(a).attr("disabled")) != "disabled")
    },
    $g: function(a) {
        if (typeof(a) == "object") {
            return a
        }
        return document.getElementById(a)
    },
    padIfNotNull: function(c, a, d, b) {
        return Util.isNoE(a) ? Util.fixNoE(Util.fixNull(b)) : Util.fixNull(c) + a + Util.fixNull(d)
    },
    extract: function(d, a, f, e) {
        if (!Util.isNoE(a)) {
            var c = Util.isNoE(d) ? 0 : a.indexOf(d);
            if (c > -1) {
                c = c + d.length;
                var b = (Util.isNoE(f) ? a.Length: a.indexOf(f, c + 1));
                if (b > -1) {
                    return a.substr(c, b - c)
                }
            }
        }
        return Util.fixNoE(e, "")
    },
    getTextLength: function(e, c) {
        var f = document.createElement("span");
        var b = $(c);
        var d = $(f);
        d.css("visibility", "none").css("font-size", b.css("font-size"));
        d.css("font-family", b.css("font-family")).css("font-weight", b.css("font-weight"));
        f.innerHTML = e;
        document.body.appendChild(f);
        var a = d.width();
        document.body.removeChild(f);
        return a
    },
    loadScript: function(c, b, e) {
        if (!Util.loadScriptParams) {
            Util.loadScriptParams = {}
        }
        Util.loadScriptParams[c] = e;
        var d = document.getElementsByTagName("head")[0];
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = b;
        d.appendChild(a)
    },
    keys: {
        backspace: 8,
        tab: 9,
        enter: 13,
        shift: 16,
        ctrl: 17,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        cursorright: 39,
        down: 40,
        del: 46,
        numlock: 144,
        esc: 27
    },
    whenReady: function(c, h, b, g) {
        var f = 60;
        var e = null;
        var d = 0;
        function a() {
            var i = null;
            try {
                i = $.isFunction(h) ? h() : h
            } catch(j) {}
            if (!Util.isNoE(i)) {
                b(i);
                Util.closeTimer(e)
            } else {
                if (g || (d < f)) {
                    d++;
                    e = setTimeout(a, 100 + d)
                } else {
                    alert("Could not find: " + c)
                }
            }
        }
        a()
    },
    removeByVal: function(a, c) {
        var b = a.indexOf(c);
        return b > -1 ? a.slice(b, b + 1) : a
    },
    outOfRangeMessage: function(c, a) {
        var b = CISCO.ui.getDirection() == "ltr" ? "{2} [{1} - {0}]": "[{0} - {1}] {2}";
        return b.format(a, c, CISCO.ui.validation.strings.outOfRange)
    },
    parseIPAddress: function(a) {
        if (typeof a === "object" && a.is("select")) {
            return a.val().split(".")
        } else {
            if (typeof a === "object" && a.is("div")) {
                var b = [],
                c = Binder.fromDom(a.parent());
                return getObjVal(c, a.attr("name")).split(".")
            } else {
                return a.split(".")
            }
        }
    },
    dot2num: function(b) {
        var a = Util.parseIPAddress(b);
        return (((((( + a[0]) * 256) + ( + a[1])) * 256) + ( + a[2])) * 256) + ( + a[3])
    },
    num2dot: function(a) {
        var c = a % 256;
        for (var b = 3; b > 0; b--) {
            a = Math.floor(a / 256);
            c = a % 256 + "." + c
        }
        return c
    },
    fromPrefixLengthToSubnet: function(f) {
        function g(l) {
            return parseInt(l, 2)
        }
        var d = "11111111111111111111111111111111",
        a = "00000000000000000000000000000000",
        h = d.substring(0, f),
        i = a.substring(0, 32 - f),
        j = h.concat(i),
        b = j.substring(0, 8),
        e = j.substring(8, 16),
        k = j.substring(16, 24),
        c = j.substring(24, 32);
        return g(b) + "." + g(e) + "." + g(k) + "." + g(c)
    },
    fromSubnetToPrefixLength: function(c) {
        var a = Util.dot2num(c),
        b = a.toString(2);
        return b.indexOf("0")
    },
    utcTimeToDate: function(b) {
        var a = Date.parse(b);
        if (isNaN(a)) {
            var c = b.replace(/([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])T([0-9][0-9]):([0-9][0-9]):([0-9][0-9])Z/, "$1 $2 $3 $4 $5 $6").split(" ");
            return new Date(Date.UTC(parseInt(c[0], 10), parseInt(c[1], 10) - 1, parseInt(c[2], 10), parseInt(c[3], 10), parseInt(c[4], 10), parseInt(c[5], 10)))
        }
        return new Date(a)
    },
    utcTimeWithOffsetToString: function(b, a) {
        var c = new Date(b.getTime() + a);
        return CISCO.ui.common.strings.dayOfWeek[c.getUTCDay()] + ", " + Util.addALeadingZero(c.getUTCDate()) + " " + Util.addALeadingZero(CISCO.ui.common.strings.months[c.getUTCMonth()]) + " " + c.getUTCFullYear() + " " + Util.addALeadingZero(c.getUTCHours()) + ":" + Util.addALeadingZero(c.getUTCMinutes()) + ":" + Util.addALeadingZero(c.getUTCSeconds())
    },
    addALeadingZero: function(b) {
        var a = "" + b;
        if (a.length === 1) {
            return "0" + a
        }
        return a
    },
    currentTimeString: function() {
        return Util.utcToLocal(new Date())
    },
    utcToLocal: function(a) {
        return Util.utcTimeWithOffsetToString(a, a.getTimezoneOffset() * -60000)
    },
    timer: function() {
        var b = null,
        f = null;
        function g() {
            b = new Date();
            f = null
        }
        function e() {
            return (b != null && f == null)
        }
        function d() {
            if (b) {
                f = new Date()
            }
        }
        function c() {
            if (f) {
                return f.getTime() - b.getTime()
            } else {
                var h = new Date();
                return h.getTime() - b.getTime()
            }
        }
        function a() {
            if (f) {
                return Math.floor((f.getTime() - b.getTime()) / 1000)
            } else {
                var h = new Date();
                return Math.floor((h.getTime() - b.getTime()) / 1000)
            }
        }
        return {
            start: g,
            stop: d,
            getElapsedTimeMs: c,
            getElapsedTimeS: a,
            isRunning: e
        }
    },
    copyProps: function(c, a, b) {
        b.forEach(function(d) {
            if (!Util.isNull(a[d])) {
                c[d] = a[d]
            }
        })
    }
}; (function() {
    var a = document.createElement("div");
    Util.htmlEncode = function(b) {
        a.innerText = a.textContent = b;
        return a.innerHTML
    }
} ());
extend(String.prototype, {
    left: function left(a) {
        return this.substring(0, a)
    },
    contains: function contains(a) {
        return this.indexOf(a) > -1
    },
    stripRight: function stripRight(a) {
        return this.substring(0, this.length - a)
    },
    repeat: function repeat(a) {
        return new Array(isNaN(a) ? 1 : ++a).join(this)
    },
    ltrim: function ltrim() {
        var a = " \n\t";
        var b = 0;
        while (b < this.length && a.indexOf(this.charAt(b)) > -1) {
            b++
        }
        return this.substr(b)
    },
    rtrim: function rtrim() {
        var a = " \n\t";
        var b = this.length - 1;
        while (b > -1 && a.indexOf(this.charAt(b)) > -1) {
            b--
        }
        return this.substr(0, b + 1)
    },
    trim: function trim() {
        return this.ltrim().rtrim()
    },
    right: function right(a) {
        if (a > this.length) {
            return this
        }
        return this.substr(this.length - a)
    },
    hasUnicodeChar: function hasUnicodeChar() {
        var a = encodeURIComponent(this).match(/%[89ABab]/g);
        return !! (a && a.length)
    },
    lengthInBytes: function lengthInBytes() {
        var a = encodeURIComponent(this).match(/%[89ABab]/g);
        return this.length + (a ? a.length: 0)
    }
});
function isFunction(a) {
    return typeof a === "function"
}
function isArray(a) {
    return typeof a === "object" && a !== null && a.constructor === Array
}
Date.prototype.addYears = function(e) {
    var d = new Date(this);
    if (d.getMonth() == 1 && d.getDate() == 29) {
        d = d.addDays( - 1)
    }
    var c = Math.floor(e);
    var a = e - c;
    var b = d.setFullYear(d.getFullYear() + c);
    b = new Date(b);
    if (a > 0) {
        b = b.addMonths(a * 12)
    }
    return b
};
Date.prototype.addDays = function(a) {
    return new Date(this.getTime() + (a * 24 * 60 * 60 * 1000))
};
Date.prototype.addHours = function(a) {
    return new Date(this.getTime() + (a * 60 * 60 * 1000))
};
Date.prototype.addMonths = function(a) {
    var b = a > -1;
    var d = (b * a) % 12;
    var c = new Date(this);
    if ((b * a - d) > 0) {
        c = c.addYears((b * a - d) / 12)
    }
    c = c.addDays(b * Math.round(d * 30.44));
    if (b > 0 && this.getDate() > 28 && c.getDate() < 11) {
        c = c.addDays( - c.getDate())
    }
    return new Date(c)
};
Date.prototype.addMinutes = function(a) {
    return new Date(this.getTime() + a * 60 * 1000)
};
function object(a) {
    var b = Object.create(a);
    if (isFunction(b.initialize)) {
        Array.prototype.shift.call(arguments);
        b.initialize.apply(b, arguments)
    }
    return b
}
function extend(a, c) {
    for (var b in c) {
        a[b] = c[b]
    }
    return a
}
function require(src, callback) {
    function require_async() {
        var scriptEl = document.createElement("script"),
        headEl = document.getElementsByTagName("head")[0] || document.documentElement;
        scriptEl.onload = callback;
        scriptEl.src = src;
        headEl.appendChild(scriptEl)
    }
    function require_sync() {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange",
        function(evt) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    eval(xhr.responseText)
                } else {}
            }
        },
        false);
        xhr.open("GET", src, false);
        xhr.send(null)
    }
    if (isFunction(callback)) {
        require_async()
    } else {
        require_sync()
    }
}
extend(Function.prototype, {
    curry: function() {
        var a = Array.prototype.slice.apply(arguments),
        b = this;
        return function() {
            return b.apply(this, a.concat(Array.prototype.slice.apply(arguments)))
        }
    },
    bind: function(a) {
        var b = this;
        return function() {
            return b.apply(a, arguments)
        }
    },
    delay: function() {
        var d = this,
        b = arguments[0] || 0,
        c = arguments[1],
        a = Array.prototype.slice.apply(arguments, [2]);
        return setTimeout(function() {
            d.apply(c || d, a)
        },
        b, a)
    }
});
extend(Array.prototype, {
    find: function(b) {
        for (var a = 0; a < this.length; a++) {
            if (b(this[a])) {
                return this[a]
            }
        }
    },
    contains: function(a) {
        return this.some(function(b) {
            return b === a
        })
    },
    indexOf: function(b) {
        for (var a = 0; a < this.length; a++) {
            if (this[a] == b) {
                return a
            }
        }
        return - 1
    },
    append: function(b) {
        if (isArray(b)) {
            for (var c = 0,
            a = b.length; c < a; c++) {
                this.push(b[c])
            }
        } else {
            this.push(b)
        }
    },
    remove: function(b) {
        var a = this.indexOf(b);
        if (a > -1) {
            this.splice(a, 1)
        }
    }
});
var eventBuilder = function(b) {
    var a = [];
    return {
        connect: function(c) {
            a.push(c)
        },
        disconnect: function(d) {
            var c = a.indexOf(d);
            if (c !== -1) {
                a.splice(c, 1)
            }
        },
        fire: function() {
            var f = {
                cancelEvent: false
            },
            d = 0,
            c = [].slice.apply(arguments);
            c.unshift(f);
            while (d < a.length && !f.cancelEvent) {
                a[d].apply(undefined, c);
                d++
            }
            return ! f.cancelEvent
        }
    }
};
TaskManager = function(f) {
    var g = f.tasks || [],
    n = f.callback ||
    function() {},
    i = f.parallel || false;
    if (!isArray(g)) {
        throw new Error("Invalid task list")
    }
    if (!isFunction(n)) {
        throw new Error("Invalid callback")
    }
    var b = [];
    var k = [];
    var c = function(q, p, r) {
        return function() {
            q.apply({
                completed: p,
                failed: r
            },
            arguments)
        }
    };
    var o = function(s, p) {
        b[s] = true;
        k[s] = p;
        var q = b.every(function(t) {
            return t
        });
        if (q) {
            var r = k.every(function(t) {
                return t
            });
            d(r)
        }
    };
    function j() {
        for (var p = 0; p < g.length; p += 1) {
            b[p] = false;
            k[p] = false
        }
        g.forEach(function(r, q) {
            c(r, o.curry(q, true), o.curry(q, false))()
        })
    }
    var m = function(q, p) {
        if (!p) {
            d(false)
        } else {
            if (q + 1 === g.length) {
                d(true)
            } else {
                c(g[q + 1], m.curry(q + 1, true), m.curry(q + 1, false))()
            }
        }
    };
    function l() {
        c(g[0], m.curry(0, true), m.curry(0, false))()
    }
    function a(p) {
        g[g.length] = p
    }
    function e(p) {
        n = p
    }
    function d(p) {
        n(p)
    }
    var h = function() {
        if (g.length === 0) {
            d(true)
        } else { (i ? j: l)()
        }
    };
    h.add = a;
    h.setCallback = e;
    return h
};
TaskManager.asynchronousTask = function(a) {
    return function() {
        var b = this;
        a(function() {
            b.completed()
        })
    }
};
jQuery.fn.resetClass = jQuery.fn.resetClass ||
function() {
    var b = this;
    var a = arguments[0] || "";
    if (b.hasClass(a)) {
        b.removeClass(a)
    }
    b.addClass.delay(0, b, a)
};
jQuery.extend({
    compare: function(e, d) {
        var c = "[object Object]",
        f = "[object Array]",
        b = Object.prototype.toString.apply(e),
        a = Object.prototype.toString.apply(d);
        if (b !== a) {
            return false
        } else {
            if (b === c) {
                return $.compareObject(e, d)
            } else {
                if (a === f) {
                    return $.compareArray(e, d)
                }
            }
        }
        return (e === d)
    }
});
jQuery.extend({
    compareArray: function(e, d) {
        var c, a, f, h, g, b;
        if (e === d) {
            return true
        }
        if (e.length != d.length) {
            return false
        }
        c = jQuery.extend(true, [], e);
        a = jQuery.extend(true, [], d);
        c.sort();
        a.sort();
        for (f = 0, b = c.length; f < b; f += 1) {
            h = Object.prototype.toString.apply(c[f]);
            g = Object.prototype.toString.apply(a[f]);
            if (h !== g) {
                return false
            } else {
                if ($.compare(c[f], a[f]) === false) {
                    return false
                }
            }
        }
        return true
    }
});
jQuery.extend({
    compareObject: function(e, d) {
        var a, c, b;
        if (e === d) {
            return true
        } else {
            if (Object.keys(e).length !== Object.keys(d).length) {
                return false
            } else {
                for (a in e) {
                    if (e.hasOwnProperty(a)) {
                        if (typeof d[a] === "undefined") {
                            return false
                        } else {
                            c = Object.prototype.toString.apply(e[a]);
                            b = Object.prototype.toString.apply(d[a]);
                            if (c !== b) {
                                return false
                            }
                        }
                    }
                    if ($.compare(e[a], d[a]) === false) {
                        return false
                    }
                }
                return true
            }
        }
    }
});
jQuery.extend({
    delAttr: function(b) {
        var a = arguments.length == 2 && isArray(arguments[1]) ? arguments[1] : arguments;
        $.each(a,
        function() {
            if (this !== b) {
                delete(b[this])
            }
        })
    }
});
jQuery.extend({
    cancelEvents: function(a) {
        a.cancelBubble = true;
        a.stopPropagation();
        a.stopImmediatePropagation();
        return false
    }
}); (function() {
    var a = jQuery.fn.attr;
    jQuery.fn.attr = function() {
        var b = (arguments[0] == "checked") && (arguments.length == 2) && (( !! a.call(this, "checked")) != ( !! arguments[1])),
        c = a.apply(this, arguments);
        if (b) {
            this.trigger("change")
        }
        return c
    }
} ());
jQuery.fn.getZIndex = jQuery.fn.getZIndex ||
function() {
    var a = 0,
    b = this[0];
    if (!b) {
        return - 1
    }
    if (window.getComputedStyle) {
        a = document.defaultView.getComputedStyle(b, null).getPropertyValue("z-index")
    } else {
        if (b.currentStyle) {
            a = b.currentStyle["z-index"]
        }
    }
    if (!$.isNumeric(a)) {
        if (b === document.body) {
            return 0
        } else {
            return this.parent().getZIndex()
        }
    }
    return Number(a)
}; (function() {
    var a = jQuery.fn.click;
    jQuery.fn.click = function() {
        a.apply(this, arguments);
        if (arguments.length === 0 && CISCO.browser.browser == "IE" && CISCO.browser.ieVersion < 9) {
            $(this).trigger("change")
        }
    }
} ());
jQuery.fn.coords = function() {
    var a = this,
    b = a.offset();
    if (!b) {
        return
    }
    return {
        left: b.left,
        top: b.top,
        height: a.outerHeight(),
        width: a.outerWidth()
    }
};
jQuery.fn.container = function() {
    var c = this,
    a = c.parents(),
    d;
    for (var b = 0; b < a.length; b++) {
        d = $(a[b]);
        if (d.css("overflow") === "hidden" || d.css("overflow") === "scroll" || d.css("overflow") === "auto") {
            break
        }
    }
    return d
};
jQuery.fn.outerHtml = function() {
    return $(this).clone().wrap("<div></div>").parent().html()
};
jQuery.extend(jQuery.expr[":"], {
    "nth-of-type": function(c, b, a) {
        var d = a[3].split("+");
        return (b + 1 - (d[1] || 0)) % parseInt(d[0], 10) === 0
    }
});