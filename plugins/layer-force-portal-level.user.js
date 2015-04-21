// ==UserScript==
// @id             iitc-plugin-force-portal-level
// @name           IITC plugin: force display of portals at diff zoom levels
// @category       Info
// @version        0.0.1.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Display all portals at this level
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==

//CHANGELOG
/*
0.0.1 start
*/



@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////


// use own namespace for plugin
window.plugin.forcePortal = function() {};

    window.plugin.forcePortal.setupCSS = function() {
        $('<style>').prop('type', 'text/css').html(''
            + '#force_portal_select {'
            + ' position: absolute;'
            + ' top: 5px;'
            + ' left:300px;'
            + ' z-index: 2500;'
            + ' font-size:11px;'
            + ' font-family: "coda",arial,helvetica,sans-serif;'
            + ' background-color:#0E3C46;'
            + ' color:#ffce00;'
            + '}\n').appendTo('head');
	};

    window.plugin.forcePortal.setupSmartCSS = function() {
        $('<style>').prop('type', 'text/css').html(''
            + '#force_portal_select {'
            + ' top: 0px !important;'
            + ' right: 0px;'
            + ' left: auto !important;'
            + ' margin-right: 0;'
            + '}\n').appendTo('head');
    };

window.plugin.forcePortal.changeLevel = function()
{
    var myselect = document.getElementById("force_portal_select");
   	var level = myselect.options[myselect.selectedIndex].value;
    window.plugin.forcePortal.minLevel = level;
    if (level == '1') { 
            window.CONFIG_FORCE_PORTALS = false; 
    } else {
            window.CONFIG_FORCE_PORTALS = true;
        switch (level) {
            case '2':
                window.CONFIG_FORCE_PORTALS_LEVEL = 17;
                break;
            case '3':
                window.CONFIG_FORCE_PORTALS_LEVEL = 15;
                break;
            case '4':
                window.CONFIG_FORCE_PORTALS_LEVEL = 13;
                break;
            case '5':
                window.CONFIG_FORCE_PORTALS_LEVEL = 12;
                break;
            case '6':
                window.CONFIG_FORCE_PORTALS_LEVEL = 10;
                break;
            case '7':
                window.CONFIG_FORCE_PORTALS_LEVEL = 9;
                break;
            case '8':
                window.CONFIG_FORCE_PORTALS_LEVEL = 7;
                break;
        }
    }
};

var setup =  function() {
    window.CONFIG_FORCE_PORTALS = false;
    window.plugin.forcePortal.setupCSS();
    if (window.isSmartphone()) {
        window.plugin.forcePortal.setupSmartCSS();
    }
	$('body').append('<select onchange="window.plugin.forcePortal.changeLevel()" id="force_portal_select"><option value=1>Disabled</option><option value=2>All Unclaimed+</option><option value=3>All L1+</option><option value=4>All L2+</option><option value=5>All L3+</option><option value=6>All L4+</option><option value=7>All L5+</option><option value=8>All L6+</option></select>');
    var myselect = document.getElementById("force_portal_select");
    myselect.options.selectedIndex = 0;
};

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);



