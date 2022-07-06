if(!window.CISCO)
{
	window.CISCO={}
}
CISCO.util = (function(){
	var a=15000,e=null,d=true;
	function b()
	{
		if(CLOUD && $.cookie("user-auth-token"))
		{
			CLOUD.send({
				url:( webroot || getWebRoot() ) + "cloud/user-service/rest/sessions",
				type:"delete",
				cbError:function(h,j,i){
					return true
				}
			})
		}
		$.cookie("admin-auth",null,{path:webroot||'/'});
		$.cookie("user-auth-token",null,{path:webroot||'/'});
		$.cookie("current-network-id",null,{path:webroot||'/'});
		$.cookie("current-applet",null,{path:webroot||'/'});
		$.cookie("ui-proxy-path",null);
		$.cookie("ui-proxy-path",null,{path:webroot||'/'});
		$.cookie("CCC.cloud",null,{path:webroot||'/'});
		

		window.location.replace(webroot||'/')
	}

	function c(h)
	{
		$.ajax({
			url:h.url,
			timeout:a,
			complete:function(i,j){
				if(i.status==200)
				{
					if(/content-type:\s+image\/png/i.test(i.getAllResponseHeaders()))
					{
						h.success()
					}
					else
					{
						h.error()
					}
				}
				else
				{
					h.error()
				}
			}
		})
	}
	
	// ping
	function g(h,j)
	{
		if(d||j)
		{
			var i=webroot + "cloud/ping.png";
			c({
				url:i+"?"+(new Date()).getTime(),
				success:function(){
					if(e==null||e==false)
					{
						e=true
					}
					if(typeof h==="function")
					{
						h(true)
					}
				},
				error:function(){
					if(e==null||e==true)
					{
						CISCO.Event.fire("cisco.wanDisconnected");
						e=false
					}
					if(typeof h==="function")
					{
						h(false)
					}
				}
			})
		}
	}
	
	function f()
	{
		CISCO.Event.connect("connection.disableCheck",function(){d=false});
		CISCO.Event.connect("connection.enableCheck",function(){d=true})
	}
	
	f();
	
	return{signOut:b,getImageTimeout:a,checkInternetConnection:g}
}());