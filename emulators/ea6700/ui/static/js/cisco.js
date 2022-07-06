if(!window.CONNECT)
{
	window.CONNECT={}
}
if(!window.CISCO)
{
	window.CISCO={}
}
var webroot = $.cookie('CCC.webroot') || getWebRoot();

function getWebRoot(){
	var url = window.location.href.replace('ui/dynamic/', '').replace('http://', '');
	var arr = url.split('/');
	arr.splice(0, 1);
	arr.splice(arr.length - 1, 1);
	var ret = '/' + arr.join('/') + '/';
	ret = ret == '//' ? '/' : ret;
	return ret;
}
/** 
 * Array unique function,同时将去掉null及undefined 
 * @param {Array} ary 需要进行unique的数组. 
 * @return {Array} 返回经过去重的新的数组， 
 * 不会修改原来的数组内容. 
 */  
function unique(ary) {  
    var i = 0,  
        gid='_'+(+new Date)+Math.random(),  
        objs = [],  
        hash = {  
            'string': {},  
            'boolean': {},  
            'number': {}  
        }, p, l = ary.length,  
        ret = [];  
    for (; i < l; i++) {  
        p = ary[i];  
        if (p == null) continue;  
        tp = typeof p;  
        if (tp in hash) {  
            if (!(p in hash[tp])) {  
                hash[tp][p] = 1;  
                ret.push(p);  
            }  
        } else {  
            if (p[gid]) continue;  
            p[gid]=1;  
            objs.push(p);  
            ret.push(p);  
        }  
    }  
    for(i=0,l=objs.length;i<l;i++) {  
        p=objs[i];  
        p[gid]=undefined;  
        delete p[gid];  
    }  
    return ret;  
}
window.CISCO.Event=(function(){
	var c={};
	
	function e(){
		var f=arguments[0],h=c[f]||[];
		for(var g=0;g<h.length;g++)
		{
			if(typeof h[g]==="function")
			{
				h[g].apply(undefined,arguments)
			}
			else
			{
				try{h[g]()}catch(j){}
			}
		}
	}
	function b(f,g)
	{
		d(f,function(h){
			c[h]=c[h]||[];
			var j=c[h].indexOf(g);
			if(j==-1)
			{
				c[h].push(g)
			}
		})
	}
	function a(f,g)
	{
		d(f,function(h){
			var k=c[h]||[];
			for(var j=0;j<k.length;j++)
			{
				if(g===k[j])
				{
					c[h].splice(j,1)
				}
			}
		})
	}
	function d(f,h)
	{
		if(isArray(f))
		{
			for(var g=0;g<f.length;g++)
			{
				h(f[g])
			}
		}
		else
		{
			h(f)
		}
	}
	
	return{fire:e,disconnect:a,connect:b}
}());
	
CISCO.helpManager=(function(){
	var e="",g;
	var f={
		"help-base":"../services-qa.cisco.com/redir/lego/help/default.htm",
		"main-view":"main_page_help.html",
		"device-view":"device_view_help.html"
	};
	function a(h)
	{
		return f[h]
	}
	function c()
	{
		function j()
		{
			var k;
			if(e.length===0)
			{
				k=a("help-base")+a("main-view")
			}
			else
			{
				if(g===undefined)
				{
					return undefined
				}
				k=g+(e.substr(0,1)==="/"?e.substr(1):e)
			}
			return k
		}
		function h(k)
		{
			$.ajax({url:k.url,processData:false,timeout:3000,success:function(l,n,m){
				k.onSuccess()
			},error:function(m,n,l){
				k.onFailure()
			}})
		}
		var i=j("online");
		if(i!==undefined)
		{
			window.open(i,"connect-help")
		}
	}
	function b(h)
	{
		if(h===undefined||typeof h!=="string"||h.length===0)
		{
			return undefined
		}
		if(h.substr(h.length-1)!=="/")
		{
			return h+"default.htm"
		}
		else
		{
			return h
		}
	}
	function d(h)
	{
		if(h===undefined||typeof h!=="string")
		{
			e=""
		}
		else
		{
			e=h
		}
	}
	
	return{
		setContext:d,
		context:function(h){
			if(!h){return d(h)}else{return e}
		},
		setBaseUrl:function(h){g=b(h)},
		getHelpUrl:a,
		launchHelp:c
	}
}());

window.CISCO.ready=(function(){
	function a(b){
		
		if(typeof b==="function")
		{
			b()
		}
		if(CISCO.routerNotFoundDialog.isShowing())
		{
			CISCO.routerNotFoundDialog.close()
		}
	}

	$(function(){
		$("#help").click(CISCO.helpManager.launchHelp);
		CISCO.helpManager.setBaseUrl(CISCO.helpManager.getHelpUrl("help-base"));
		CISCO.helpManager.context=CISCO.helpManager.getHelpUrl("main-view");
		if(GLOBAL.uiLoadedFromCloud())
		{
			$("body").addClass("connection-remote")
		}
		else
		{
			$("body").addClass("connection-local")
		}
		$("#dialogs").load(webroot + "ui/dynamic/dialogs.html",function(){
			CISCO.ui.tooltip.init();
			CISCO.ui.inputBalloon.init();
                $("body").addClass("local-origin" + (!$.cookie('CCC.cloud') ? ' embedded-ui-available' : ''));
				$('#dialogs').find('img[src^=ui]').each(function(index, element){
					$(element).attr( 'src', webroot + $(element).attr( 'src' ) );
				});
			/*CISCO.Event.connect("cisco.dialogsLoaded", function(){
				CONNECT.AppletManager.initialize(function(){
					CISCO.ui.MainMenu.initialize();
					CISCO.ui.helpMenu.initialize();
					CONNECT.widgetManager.setupWidgets()
					CISCO.ui.hideMasterWaiting();
				});
			});*/

			if(CISCO.ui.helpMenu)
			{
				CISCO.Event.connect("GLOBAL.getDeviceInfoComplete",function(){
					CISCO.ui.helpMenu.initialize()
				});
			}
			CISCO.routerNotFoundDialog=CISCO.ui.dialogGenericError($("#router-not-found"),true);
			CISCO.routerInterruptionDialog=CISCO.ui.dialogGenericError($("#router-interruption"),true);
			CISCO.internetRestoredDialog=CISCO.ui.dialogGenericError($("#internet-restored"),true);
			$("#router-not-found #router-not-found-retry").click(function(){
				CISCO.ui.showWaiting();
				a(function(){
					CISCO.ui.hideWaiting()
				});
			});
			$("#router-interruption #confirm").click(function(){
				CONNECT.handleRouterInterruption(false);
			});
			$("#internet-restored-yes").click(function(){
				CISCO.internetRestoredDialog.close();
				CISCO.util.signOut();
			});
			$("#internet-restored-no").click(function(){
				$.cookie("skip-internet-restored-dialog","skip",{path:webroot || "/"});
				CISCO.internetRestoredDialog.close();
			});
			CISCO.Event.fire("cisco.dialogsLoaded");
		});
		$("#dialogs").after('<div id="cache-images" style="width:0; height:0; overflow:hidden; position:fixed; top:0; left:0"><div>');
		$("#cache-images").load(webroot + "ui/dynamic/cache-images.html");
		$("#widget-copyright > *").clone().prependTo("#main-copyright");
		CISCO.ui.Footer.initialize();
		if( $.cookie('CCC.cloud') )
		{
			$(document.body).removeClass('connection-local').addClass('connection-remote');
			//$(document.body).removeClass('connection-local').addClass('connection-remote').append( $('<link>').attr('rel', 'stylesheet').attr('type', 'text/css').attr('href', webroot + 'cloud/resource/connect.css') );
			var url = webroot + 'cloud/resource/connect.css';
			var url1 = webroot + 'cloud/resource/ie.css';
			if (document.createStyleSheet)
			{
				document.createStyleSheet(url);
				document.createStyleSheet(url1);
			}
			else
			{
				$('<link rel="stylesheet" type="text/css" href="' + url + '" />').appendTo($(document.body));
				$('<link rel="stylesheet" type="text/css" href="' + url1 + '" />').appendTo($(document.body));
			}
		}
	});
})();