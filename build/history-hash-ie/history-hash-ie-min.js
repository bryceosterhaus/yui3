YUI.add("history-hash-ie",function(e,a){var n,t,o,i,r;e.UA.ie&&!e.HistoryBase.nativeHashChange&&(n=e.Do,t=YUI.namespace("Env.HistoryHash"),o=e.HistoryHash,i=t._iframe,r=e.config.win,o.getIframeHash=function(){var e,a;return i&&i.contentWindow?(e=o.hashPrefix,a=i.contentWindow.location.hash.substr(1),e&&0===a.indexOf(e)?a.replace(e,""):a):""},o._updateIframe=function(e,a){var n=i&&i.contentWindow&&i.contentWindow.document,t=n&&n.location;n&&t&&(a?t.replace("#"===e.charAt(0)?e:"#"+e):(n.open().close(),t.hash=e))},n.before(o._updateIframe,o,"replaceHash",o,!0),i||e.on("domready",function(){var a=o.getHash();i=t._iframe=e.Node.getDOMNode(e.Node.create('<iframe src="javascript:0" style="display:none" height="0" width="0" tabindex="-1" title="empty"/>')),e.config.doc.documentElement.appendChild(i),o._updateIframe(a||"#"),e.on("hashchange",function(e){a=e.newHash,o.getIframeHash()!==a&&o._updateIframe(a)},r),e.later(50,null,function(){var e=o.getIframeHash();e!==a&&o.setHash(e)},null,!0)}))},"@VERSION@",{requires:["history-hash","node-base"]});