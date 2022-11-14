// ==UserScript==
// @name     Ticket Viewer
// @version            0.1
// @author 	Nikolai Smetannikov

// @updateURL    https://github.com/

// @include     https://support.parallels.com/Parallels/Pages/Ticket/Display.html?id=*
// @include     https://mysupport.corel.com/Pages/Ticket/Display.html?id=*

// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js

// @resource    bootstrapCSS https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css?5

// @require    file:////Users/pd-team/Visual Studio Code Projects/TicketViewer/ticketViewer.js
// @resource   ticketViewerCSS  file:////Users/pd-team/Visual Studio Code Projects/TicketViewer/ticketViewer.css


// @run-at       document-end

// @grant          GM_info
// @grant          GM_getResourceText
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest

// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_setClipboard

// ==/UserScript==

GM_addStyle(GM_getResourceText('ticketViewerCSS'));