var Account = (function() {
    var a = CISCO.ui.build,
    d = CISCO.ui.captcha.init("#captcha-container"),
    c = CISCO.ui.inputBalloon;
    function f() {
        var h = [],
        g = d.getToken(),
        b = d.getResponse();
        if (!Util.isNoE(g)) {
            h.push({
                name: "X-Cisco-HN-Captcha-Challenge-Token",
                value: g
            })
        }
        if (!Util.isNoE(b)) {
            h.push({
                name: "X-Cisco-HN-Captcha-Response",
                value: b
            })
        }
        return h
    }
    return {
        hasCaptcha: d.hasCaptha,
        create: function(g, h, b) {
            CLOUD.send({
                url: webroot||'/' + "cloud/user-service/rest/accounts",
                headers: f(),
                type: "POST",
                data: g,
                cb: h,
                cbError: function(j) {
                    /*var i = JSON.parse(j.responseText);
                    if (b) {
                        return b(i.errors[0].error)
                    } else {
                        CISCO.ui.alert(i.errors[0].error.message);
                        return false
                    }*/
                }
            })
        },
        validate: function(b, i, h) {
            var g = {};
            g.verification = {};
            g.verification.status = "ACCEPTED";
            g.verification.parameters = [];
            if (h) {
                g.verification.parameters.push(h)
            }
            jQuery.ajax({
                beforeSend: function(j) {
                    j.setRequestHeader("X-Cisco-HN-Client-Type-Id", GLOBAL.getCiscoHNClientID());
                    j.setRequestHeader("accept", "application/json")
                },
                type: "PUT",
                data: JSON.stringify(g),
                url: webroot||'/' + "cloud/user-service/rest/verifications/" + b + webroot||'/' + "status/",
                success: i,
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                error: function(k) {
                    if (k.status == 409 && k.statusText == "Conflict" || k.status == 404 && k.statusText == "Not Found") {
                        CISCO.ui.alert(CISCO.login.strings.changePasswordTokenInvalid, CISCO.login.strings.changePasswordTokenInvalidTitle,
                        function() {
                            window.top.location.href = webroot||'/' + ""
                        })
                    } else {
                        var j = JSON.parse(k.responseText);
                        CISCO.ui.alert(j.errors[0].error.message)
                    }
                }
            })
        },
        loginErrorHandler: function(m) {
            CISCO.ui.wait(false);
            var i;
            var o = CISCO.login.strings;
            var g = null;
            try {
                g = JSON.parse(m.responseText).errors[0].error.code
            } catch(j) {
                return false
            }
            switch (m.status) {
            case 400:
                switch (g) {
                case "CAPTCHA_REQUIRED":
                    i = o.invalidCloudLogin;
                    d.show();
                    break;
                case "INVALID_PARAMETER":
                default:
                    i = o.invalidCloudLogin;
                    break
                }
                d.getCaptcha();
                break;
            case 403:
                switch (g) {
                case "ACCOUNT_DISABLED":
                    i = o.accountDisabled;
                    break;
                case "ACCOUNT_PENDING":
                    function n(p) {
                        $("#email-not-validated #email-not-validated-content").removeClass("none sending sent failed");
                        $("#email-not-validated #email-not-validated-content").addClass(p)
                    }
                    function l() {
                        $("#email-not-validated .cancel, #email-not-validated .submit").removeAttr("disabled")
                    }
                    var k;
                    var b = {
                        cancelClose: true,
                        onSubmit: function() {
                            n("sending");
                            $("#email-not-validated .cancel, #email-not-validated .submit").attr("disabled", "disabled");
                            jQuery.ajax({
                                beforeSend: function(p) {
                                    p.setRequestHeader("X-Cisco-HN-Client-Type-Id", GLOBAL.getCiscoHNClientID());
                                    p.setRequestHeader("accept", "application/json")
                                },
                                type: "POST",
                                data: JSON.stringify({
                                    verification: {
                                        type: "ACCOUNT_CREATION",
                                        parameters: [{
                                            parameter: {
                                                name: "username",
                                                value: $("#username").val()
                                            }
                                        }]
                                    }
                                }),
                                url: webroot||'/' + "cloud/user-service/rest/verifications",
                                success: function(p) {
                                    n("sent");
                                    $("#email-not-validated .cancel").removeAttr("disabled");
                                    setTimeout(function() {
                                        k.close()
                                    },
                                    4000)
                                },
                                contentType: "application/json; charset=UTF-8",
                                dataType: "json",
                                error: function(p) {
                                    n("failed");
                                    l()
                                }
                            })
                        }
                    };
                    k = CISCO.ui.dialog($("#email-not-validated"), b);
                    n("none");
                    l();
                    k.show();
                    return true;
                case "INVALID_ACCOUNT_CREDENTIALS":
                    i = o.invalidCloudLogin;
                    d.getCaptcha();
                    break;
                case "CAPTCHA_INCORRECT":
                    c.add({
                        els:
                        d.elements.elCaptchaResponse,
                        balloonContent: a.DIV({
                            "class": "flow"
                        },
                        [a.SPAN({
                            "class": "icon warning"
                        }), a.SPAN({
                            "class": "msg"
                        },
                        o.captchaIncorrect)])
                    },
                    true);
                    c.hide(10000);
                    d.getCaptcha();
                    return true;
                    break;
                case "ACCOUNT_LOCKED_OUT":
                    window.top.location.href = "account-lockout.html";
                    break
                }
            case 404:
                switch (g) {
                case "ACCOUNT_NOT_FOUND":
                    i = o.accountNotFound;
                    d.getCaptcha();
                    break
                }
            }
            if (i != null) {
                var h = $("#username");
                c.add({
                    els: h,
                    isBlankOkOnBlur: false,
                    balloonContent: a.DIV({
                        "class": "flow"
                    },
                    [a.SPAN({
                        "class": "icon warning"
                    }), a.SPAN({
                        "class": "msg"
                    },
                    i.replace("{username}", h.val()))])
                },
                true);
                c.hide(7000);
                return true
            }
            return false
        },
        captcha: d,
        onlineLogin: function e(h, g, i) {
            if (!i) {
                i = Account.loginErrorHandler
            }
            CISCO.ui.wait();
            var b = null;
            if (d.hasCaptcha) {
                b = f()
            }
            CLOUD.send({
                url: webroot + "cloud/user-service/rest/sessions",
                headers: b,
                type: "POST",
                data: {
                    session: {
                        account: {
                            username: h,
                            password: g
                        }
                    }
                },
                cb: function(k, j) {
                    $.cookie("user-auth-token", k.session.token, {
                        expires: null,
                        path: webroot || webroot||'/' + ""
                    });
                    $.cookie("admin-auth", null, {
                        path: webroot || '/'
                    });
                    $.cookie("user-name", $("#remember-me:checked").length > 0 ? h: "", {
                        expires: new Date().addYears(10),
                        path: webroot||'/' + ""
                    });
                    GLOBAL.discoverAuthority(function() {
                        if (GLOBAL.isBehindAuthority() && !GLOBAL.getAuthorityNetworkID()) {
                            var m = $.cookie("rp");
                            $.cookie("rp", null, {
                                path: webroot || '/'
                            });
                            if (m) {
                                function l(n) {
                                    JNAP.send({
                                        action: "http://cisco.com/jnap/ownednetwork/SetNetworkOwner ",
                                        data: {
                                            ownerSessionToken: $.cookie("user-auth-token"),
                                            friendlyName: n.friendlyName()
                                        },
                                        cb: function(p, o) {
                                            if (p.result == "OK") {
                                                GLOBAL.discoverAuthority(function() {
                                                    if (GLOBAL.isBehindAuthority()) {
                                                        if (!GLOBAL.getAuthorityNetworkID()) {
                                                            GLOBAL.setRemoteSetting(true,
                                                            function() {
                                                                window.location.replace(webroot||'/' + "ui/dynamic/welcome.html")
                                                            })
                                                        } else {
                                                            GLOBAL.setRemoteSetting(true,
                                                            function() {
                                                                window.location.replace(webroot||'/' + "")
                                                            })
                                                        }
                                                    } else {
                                                        window.location.replace(webroot||'/' + "ui/dynamic/no-associated-router.html")
                                                    }
                                                })
                                            } else {
                                                GLOBAL.setRemoteSetting(true,
                                                function() {
                                                    window.location.replace(webroot||'/' + "ui/dynamic/welcome.html")
                                                })
                                            }
                                        },
                                        disableDefaultJnapErrHandler: true,
                                        disableDefaultAjaxErrHandler: true,
                                        disableDefaultRebootErrHandler: true,
                                        useAdminAuth: true,
                                        adminPasswordOverride: "Basic " + window.btoa("admin:" + $.trim(m))
                                    })
                                }
                                m = window.atob(m);
                                CISCO.deviceManager.getAuthorityDevice(l)
                            } else {
                                GLOBAL.setRemoteSetting(true,
                                function() {
                                    window.location.replace(webroot||'/' + "ui/dynamic/welcome.html")
                                })
                            }
                        } else {
                            GLOBAL.setRemoteSetting(true,
                            function() {
                                window.location.replace(webroot||'/' + "")
                            })
                        }
                    })
                },
                cbError: i
            })
        }
    }
} ());