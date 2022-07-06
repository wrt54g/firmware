function getWebRoot(){
	var url = window.location.href.replace('ui/dynamic/', '').replace('http://', '');
	var arr = url.split('/');
	arr.splice(0, 1);
	arr.splice(arr.length - 1, 1);
	var ret = '/' + arr.join('/') + '/';
	ret = ret == '//' ? '/' : ret;
	return ret;
}
var webroot = getWebRoot() || '/';
if (typeof Object.create !== "function") {
    Object.create = function(c, a) {
        function b() {}
        b.prototype = c;
        if (typeof(a) === "object") {
            for (var d in a) {
                if (typeof(a[d].value) != "undefined") {
                    b[d] = a[d].value
                }
            }
        }
        return new b()
    }
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(g, b) {
        var d, c;
        if (this == null) {
            throw new TypeError(" this is null or not defined")
        }
        var f = Object(this);
        var a = f.length >>> 0;
        if ({}.toString.call(g) != "[object Function]") {
            throw new TypeError(g + " is not a function")
        }
        if (b) {
            d = b
        }
        c = 0;
        while (c < a) {
            var e;
            if (c in f) {
                e = f[c];
                g.call(d, e, c, f)
            }
            c++
        }
    }
} (function() {
    jQuery.fn.pushStack = function(b, d, a) {
        var c = this.constructor();
        if ((this instanceof jQuery.fn.init) && !(c instanceof jQuery.fn.init)) {
            c = new jQuery.fn.init()
        }
        if (jQuery.isArray(b)) {
            Array.prototype.push.apply(c, b)
        } else {
            jQuery.merge(c, b)
        }
        c.prevObject = this;
        c.context = this.context;
        if (d === "find") {
            c.selector = this.selector + (this.selector ? " ": "") + a
        } else {
            if (d) {
                c.selector = this.selector + "." + d + "(" + a + ")"
            }
        }
        return c
    }
} ());
yepnope({
    test: window.btoa && window.atob,
    nope: webroot + "ui/static/js/lib/webshim/base64.js"
});
$.webshims.setOptions({
    extendNative: false,
    "json-storage": false,
    es5: false,
    geolocation: false,
    canvas: false,
    forms: false,
    "forms-ext": false,
    mediaelement: false,
    details: false
});
$.webshims.polyfill();