if (!CISCO) {
    CISCO = {}
}
CISCO.ui = CISCO.ui || {};
CISCO.ui.language = (function() {
    var f = [{
        value: "id",
        name: "Bahasa Indonesia"
    },
    {
        value: "da",
        name: "Dansk"
    },
    {
        value: "de",
        name: "Deutsch"
    },
    {
        value: "en-US",
        "default": true,
        name: "English (United States)"
    },
    {
        value: "es-ar",
        name: "Español (Argentina)"
    },
    {
        value: "es",
        name: "Español (España)"
    },
    {
        value: "fr",
        name: "Français (France)"
    },
    {
        value: "fr-CA",
        name: "Français (Canada)"
    },
    {
        value: "it",
        name: "Italiano"
    },
    {
        value: "nl",
        name: "Nederlands"
    },
    {
        value: "nb",
        name: "Norsk (bokmål)"
    },
    {
        value: "pl",
        name: "Polski"
    },
    {
        value: "pt",
        name: "Português (Brasil)"
    },
    {
        value: "pt-PT",
        name: "Português (Portugal)"
    },
    {
        value: "fi",
        name: "Suomi"
    },
    {
        value: "sv",
        name: "Svenska"
    },
    {
        value: "vi",
        name: "Tiếng Việt Nam"
    },
    {
        value: "tr",
        name: "Türkçe"
    },
    {
        value: "el",
        name: "Ελληνικά"
    },
    {
        value: "ru",
        name: "Русский"
    },
    {
        value: "ar",
        dir: "rtl",
        name: "العربية"
    },
    {
        value: "th",
        name: "ไทย"
    }],
    e = null,
    b = "languageRefresh";
    function c(h) {
        return h.language + Util.padIfNotNull("-", h.country)
    }
    function g(j) {
        var h = Util.fixNoE(j, "en-US").replace(/[\{\}]/gi, "").split("-");
        var i = {
            language: h[0]
        };
        if (h.length == 2) {
            i.country = h[1]
        }
        return i
    }
    function a(h) {
        $("html").attr("dir", Util.fixNoE(h, "ltr"))
    }
    function d(h) {
        e = h;
        var i = $.cookie(b);
        if (!Util.isNoE(i)) {
            i = i.split("\t");
            e.forEach(function(j, k) {
                var l = $(j);
                if (l[0].type == "checkbox") {
                    l.prop("checked", i[k] == "true")
                } else {
                    l.val(i[k])
                }
            });
            $.cookie(b, null)
        }
    }
    return {
        handleRefresh: d,
        init: function(m, s, j) {
            var u = $(m),
            w = null,
            q = (typeof CLOUD != "undefined") && GLOBAL.uiLoadedFromCloud() && $.cookie("user-auth-token") != null,
            p = {};
            if (u.length == 0) {
                return null
            }
            var o = "",
            k = Util.fixNoE($.cookie("ui-language"), $("html").attr("lang"));
            p.locale = g(k);
            if (s) {
                w = $(s)
            }
            function h(i) {
                CLOUD.send({
                    url: ( webroot || getWebRoot() ) + "cloud/user-service/rest/accounts/preferences",
                    type: "GET",
                    cb: i,
                    cbError: function() {
                        CISCO.ui.dialogError()
                    }
                })
            }
            function t(i) {
                var x = u.find('option[value="' + c(i) + '"]');
                if (x.length > 0) {
                    u.val(x[0].value)
                } else {
                    x = u.find('option[value^="' + i.language + '"]');
                    if (x.length > 0) {
                        u.val(x[0].value)
                    } else {
                        u.val("en-US")
                    }
                }
            }
            function l(i) {
                $(j).text(i ? CISCO.ui.button.strings.yes: CISCO.ui.button.strings.no)
            }
            function r(z) {
                var x = g(u.val()),
                A = !$.compare(x, p.locale);
                if (A) {
                    a(f[u[0].selectedIndex].dir);
                    $.cookie("ui-language", c(x), {
                        expires: null,
                        path: webroot||"/"
                    });
                    p.locale = x
                }
                if (q) {
                    var y = false;
                    if (s) {
                        var i = w.is(":checked");
                        y = (i != p.newsletterOptIn);
                        p.newsletterOptIn = i;
                        l()
                    }
                    if (y || A) {
                        CLOUD.send({
                            url: ( webroot || getWebRoot() ) + "cloud/user-service/rest/accounts/preferences",
                            type: "GET",
                            data: {
                                preferences: p
                            },
                            cb: function() {
                                if (A) {
                                    window.location.reload()
                                }
                            },
                            cbError: z
                        })
                    }
                } else {
                    if (A) {
                        if (e != null) {
                            var B = [];
                            e.forEach(function(C) {
                                var D = $(C);
                                if (D[0].type == "checkbox") {
                                    B.push(D.is(":checked") ? "true": "false")
                                } else {
                                    B.push(D.val())
                                }
                            });
                            $.cookie(b, B.join("\t"))
                        }
                        window.location.reload()
                    }
                }
            }
            for (var n = 0; n < f.length; n++) {
                var v = f[n];
                o += '<option value="' + v.value + '"';
                if (v.dir) {
                    o += ' dir="' + v.dir + '"'
                }
                o += ">" + v.name + "</option>"
            }
            u.html(o);
            t(p.locale);
            if (q) {
                h(function(x) {
                    if (!$.compare(x.preferences.locale, p.locale)) {
                        t(x.preferences.locale)
                    }
                    p = x.preferences;
                    if (s) {
                        if (q) {
                            var i = p.newsletterOptIn === "true";
                            l(i);
                            w.prop("checked", i)
                        }
                    }
                })
            }
            if (!s) {
                u.change(function() {
                    r(CISCO.ui.dialogError)
                })
            }
            a(f[u[0].selectedIndex].dir);
            return {
                savePreferences: r
            }
        },
        parse: g
    }
} ());
CISCO.ui.language.init("#language-select");