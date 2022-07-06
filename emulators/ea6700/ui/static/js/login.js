$(document).ready(function(){
	var i=CISCO.ui.inputBalloon,a=$("#username"),d=$("#password"),e=false;
	function f()
	{
		var l=$("#adminPass").val();
		if(l.length==0){return}
		CISCO.ui.wait();
		var k=true;
		JNAP.send({
			action:"../../../cisco.com/jnap/core/CheckAdminPassword",
			data:{},
			cb:function(n,m){
				if(n.result=="OK")
				{
					$.cookie("admin-auth","Basic "+window.btoa("admin:"+l),{expires:null,path:webroot||"/"});
					$.cookie("user-auth-token",null,{path:webroot||'/'});
					GLOBAL.setRemoteSetting(false,function(){
						window.location.replace("../../")
					})
				}
				else
				{
					var o;
					switch(n.result){
						case"_ErrorUnauthorized":
							o=CISCO.login.strings.invalidRouterPassword;
							break;
						case"_AjaxError":
							if(k){}else{
								o=CISCO.login.strings.unexpectedError
							}
							break;
						default:
							o=CISCO.login.strings.unexpectedError;
							break
					}
					if(o!=null)
					{
						CISCO.ui.wait(false);
						CISCO.ui.inputBalloon.message({els:$("#adminPass"),message:o,autoHide:true});
						return false
					}
				}
				return true
			},
			disableDefaultJnapErrHandler:true,
			useAdminAuth:true,
			adminPasswordOverride:"Basic "+window.btoa("admin:"+l)
		})
	}
	function h()
	{
		if($("body").hasClass("connection-remote"))
		{
			$("#submit-login").click(b)
		}
		else
		{
			if($("body").hasClass("connection-local"))
			{
				$("#submit-login").click(f)
			}
		}
	}
	function c(k)
	{
		$("#submit-login").unbind("click");
		$("body").removeClass("connection-remote");
		$("body").removeClass("connection-local");
		if(k==="local")
		{
			$("body").addClass("connection-local")
		}
		else
		{
			if(k==="remote")
			{
				$("body").addClass("connection-remote")
			}
		}
		h()
	}
	
	function b()
	{
		if(!CISCO.ui.inputBalloon.validate())
		{return}
		CISCO.ui.wait();
		var l=$.trim(a.val()),k=$.trim(d.val());
		Account.onlineLogin(l,k)
	}
	function g()
	{
		if(e)
		{
			if(!$("body").hasClass("embedded-ui-available")||$("body").hasClass("connection-remote"))
			{
				CISCO.ui.showSlides(CISCO.ui.slideResources.captionLogin)
			}
			else
			{
				CISCO.ui.showSlides(CISCO.ui.slideResources.captionLocalLogin)
			}
		}
	}
	function j(l)
	{
		e=l;
		if(GLOBAL.uiLoadedFromCloud())
		{
			if(null!=$.cookie("user-name"))
			{
				a.val($.cookie("user-name"));
				$("#remember-me").attr("checked","checked");
				a.focus();
				d.focus()
			}
		}
		Util.trapEnter("#adminPass",f,function(){i.hide(100)});
		Util.trapEnter("#password",b,function(){i.hide(100)});
		var k=CISCO.ui.buildInputValidBalloon;
		k({els:$("#username"),isRequired:true});
		k({els:$("#password"),isRequired:true});
		h();
		$("#local-login").click(function(){
			c("local")
		});
		$("#remote-login").click(function(){
			c("remote")
		});
		CISCO.ui.associateButtons("input[type=text], input[type=password]","#submit-login");
		$(window).unload(function(){
			if(null==$.cookie("user-auth-token")&&null==$.cookie("admin-auth"))
			{
				$.cookie("ui-proxy-path",null);
				$.cookie("ui-proxy-path",null,{path:webroot||'/'})
			}
		});
		GLOBAL.getDeviceInfo(function(){
			CISCO.ui.init(g)
		});
		CISCO.ui.placeholders.init()
	}
	CISCO.util.checkInternetConnection(j);
});