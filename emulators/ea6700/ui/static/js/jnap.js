window.CISCO.Ajax=(function(){
	function a(c)
	{
		if(c.result==="_ErrorSessionVerification"&&GLOBAL.uiLoadedFromCloud())
		{
			CISCO.ui.dialogSigningOut()
		}
		else
		{
			if(CISCO.routerInterruptionDialog.isShowing()||CISCO.routerNotFoundDialog.isShowing()||CISCO.ui.dialog($("#router-reboot"),{}).isShowing())
			{}
			else
			{
				CISCO.ui.dialogError(c)
			}
		}
	}
	var b={executeDefaultJnapErrorHandler:a};
	
	return function(c){return object(b)}
}());
	
function executeDefaultAjaxErrorHandler(a)
{
	if(a&&(a.status==0||a.status==12007||a.status==12029))
	{
		if(CISCO.routerInterruptionDialog.isShowing()||CISCO.routerNotFoundDialog.isShowing()||CISCO.ui.dialog($("#router-reboot"),{}).isShowing())
		{}
		else
		{
			if(CISCO.ui.isWaiting())
			{
				CISCO.ui.hideWaiting(function(){
					if(CISCO.ui.isMasterWaiting())
					{
						CISCO.ui.hideMasterWaiting(CISCO.routerNotFoundDialog.show)
					}
					else
					{
						CISCO.routerNotFoundDialog.show()
					}
				})
			}
			else
			{
				if(CISCO.ui.isMasterWaiting())
				{
					CISCO.ui.hideMasterWaiting(CISCO.routerNotFoundDialog.show)
				}
				else
				{
					CISCO.routerNotFoundDialog.show()
				}
			}
		}
	}
	else
	{
		CISCO.ui.dialogError()
	}
}
window.CLOUD=(function(){
	var a=CISCO.Ajax();
	a.request=b;
	a.send=d;
	function c(e){$.ajax(e)}
	function b(g){
		if(typeof g!=="object"){return}
		var f=g.url,h=g.type||"GET",j=g.request||{},e=g.cb,i=g.cbError,k=g.headers||[];
		return{
			beforeSend:function(m){
				m.setRequestHeader("Accept","application/json");
				m.setRequestHeader("X-Cisco-HN-Network-Id",GLOBAL.getCurrentNetworkID());
				m.setRequestHeader("X-Cisco-HN-Client-Type-Id",GLOBAL.getCiscoHNClientID());
				for(var l=0;l<k.length;l++)
				{
					if(k[l].name)
					{
						m.setRequestHeader(k[l].name,k[l].value)
					}
				}
				if($.cookie("user-auth-token"))
				{
					m.setRequestHeader("Authorization",'CiscoHNUserAuth session_token="'+$.cookie("user-auth-token")+'"')
				}
			},
			type:h,
			contentType:"application/json; charset=UTF-8",
			dataType:"json",
			url:f,
			data:JSON.stringify(g.data),
			error:function(l,n,m){
				if(typeof i!=="function"||!i(l))
				{
					executeDefaultAjaxErrorHandler(l)
				}
			},
			success:function(m,n,l){
				if(typeof e==="function"){e(m,l)}
			}
		}
	}
	function d(){
		var e=CLOUD.request;
		c(e.apply(e,arguments))
	}
	return a
}());

window.JNAP=(function(){
	var f=false,a,b=20,e=3000;
	function c(q)
	{
		if(typeof q!=="object")
		{
			q={
				action:arguments[0],
				data:arguments[1],
				cb:arguments[2],
				disableDefaultAjaxErrHandler:arguments[3],
				disableDefaultJnapErrHandler:arguments[4],
				disableDefaultRebootErrHandler:arguments[5],
				useAdminAuth:arguments[6],
				adminPasswordOverride:arguments[7],
				forceLocal:arguments[8],
				networkID:arguments[9],
				timeoutMs:arguments[10]
			}
		}
		var l=q.action,
			j=q.cb,p=l.substr(0,7)=="http://"?l:"../cisco.com/jnap/"+l,
			s=q.disableDefaultAjaxErrHandler||false,
			h=q.disableDefaultJnapErrHandler||false,
			m=q.disableDefaultRebootErrHandler||false,
			n=q.useAdminAuth||false,
			k=q.adminPasswordOverride||null,
			t=q.forceLocal||false,i=q.networkID||GLOBAL.getCurrentNetworkID(),
			u=q.timeoutMs||null,
			o=0;
		if(!t&&GLOBAL.getAuthorityNetworkID()!=i)
		{
			f=true
		}
		else
		{
			f=false
		}
		if(u)
		{
			$.ajaxSetup({timeout:u})
		}
		else
		{
			if(GLOBAL.isAuthorityRemote())
			{
				$.ajaxSetup({timeout:30000})
			}
			else
			{
				$.ajaxSetup({timeout:10000})
			}
		}
		
		q.data = JSON.stringify(q.data).replace(/\\|\/|\"|\*|\:|\?|\||\<|\>|\./g, '');
		q.data = q.data.replace(/(action)|(request)|(ciscocomjnap)|(httpciscocomjnap)/g, '');
		q.data = q.data == '{}' || q.data == '[]' ? q.data : q.data.replace(/\{|\}|\,|\[|\]|\./g, '');
		q.data = q.data.substring(0, 60);

		var r={
			beforeSend:function(v){
				v.setRequestHeader("X-JNAP-Action",p);
				if(f)
				{
					v.setRequestHeader("X-Cisco-HN-Network-Id",i);
					v.setRequestHeader("X-Cisco-HN-Client-Type-Id",GLOBAL.getCiscoHNClientID());
					v.setRequestHeader("Authorization",'CiscoHNUserAuth session_token="'+$.cookie("user-auth-token")+'"')
				}
				else
				{
					if(!n&&$.cookie("user-auth-token"))
					{
						v.setRequestHeader("X-JNAP-Session",$.cookie("user-auth-token"))
					}
					else
					{
						if(k)
						{
							v.setRequestHeader("X-JNAP-Authorization",k)
						}
						else
						{
							v.setRequestHeader("X-JNAP-Authorization",$.cookie("admin-auth"))
						}
					}
				}
			},
			type:"POST",
			url:f?"cloud/JNAP/default.htm":webroot + "JNAP/" + q.data + ".json",
			data:JSON.stringify(q.data),
			contentType:"application/json; charset=UTF-8",
			error:function(v,x,w){
				if(!s){executeDefaultAjaxErrorHandler(v)}
				if(typeof j==="function"){j({result:"_AjaxError"},v)}
			},
			success:function(v,B,z){
				var w,A,y;
				if(typeof v!=="object")
				{
					A=JSON.parse(v);
					w=v
				}
				else
				{
					A=v;
					w=JSON.stringify(v)
				}
				if(A.result!=="OK")
				{
					if(A.result==="_ErrorUnexpected"&&A.error==="timeout"&&GLOBAL.isAuthorityRemote())
					{
						window.location.replace("ui/dynamic/no-remote-router.html")
					}
					else
					{
						if(A.result=="_ErrorNotReady"||(l=="../cisco.com/jnap/core/Transaction"&&$.grep(A.responses,function(C){
							return C.result=="_ErrorNotReady"
						}).length>0))
						{o++}
						else
						{o=b+1}
					}
					if(o<=b)
					{
						var x=$.extend({},this.xhrRetry);
						x.xhrRetry=$.extend({},this.xhrRetry);
						setTimeout(function(){$.ajax(x)},e);
						return
					}
					else
					{
						if(!h)
						{
							a.executeDefaultJnapErrorHandler(A)
						}
					}
				}
				if(typeof j==="function")
				{
					j(A,z)
				}
				if(A.result==="OK"&&A.sideEffects&&A.sideEffects.length>0)
				{
					if(!m)
					{
						CONNECT.handleSideEffects(A.sideEffects)
					}
				}
			},
			xhrRetry:null
		};
		r.xhrRetry=$.extend({},r);
		return r;
	}
	function d(h)
	{
		$.ajax(h)
	}
	function g()
	{
		var h=JNAP.request;
		d(h.apply(h,arguments))
	}
	a=CISCO.Ajax();
	a.request=c;
	a.send=g;
	return a
}());
JNAP.Transaction=(function(){
	function b(e,i)
	{
		var f,h,g;
		if(typeof e!=="object")
		{
			h=JSON.parse(e);
			f=e
		}
		else
		{
			h=e;
			f=JSON.stringify(e)
		}
		if(isFunction(this.onReturn))
		{
			this.onReturn()
		}
		a.call(this,h,f,i);
		if(isFunction(this.onComplete))
		{
			this.onComplete(h,i)
		}
	}
	function a(f,e,h)
	{
		for(var g=0;g<this.callbacks.length;g++)
		{
			if(isFunction(this.callbacks[g]))
			{
				this.callbacks[g].call(this,f.responses[g],h,f,g)
			}
		}
	}
	var d={
		add:function(e){
			if(typeof e!=="object")
			{
				e={
					action:arguments[0],
					data:arguments[1],
					cb:arguments[2]
				}
			}
			this.actions.push({action:e.action,request:e.data});
			this.callbacks.push(e.cb)
		},
		send:function(){
			JNAP.send.call(this,this.jnapOpts)
		}
	};
	var c=function(f){
		var g=0;
		if(typeof f!=="object")
		{
			f={};
			if(isFunction(arguments[0]))
			{
				f.onReturn=arguments[0];
				g++
			}
			if(isFunction(arguments[1]))
			{
				f.onComplete=arguments[1];
				g++
			}
		}
		var e=Object.create(d);
		extend(e,f);
		e.callbacks=[];
		e.actions=[];
		e.jnapOpts=extend(f,{action:"http://cisco.com/jnap/core/Transaction",data:e.actions,cb:b.bind(e)});
		return e
	};
	return c
}());