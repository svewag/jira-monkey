/*
 
||Wo|| ||
|Instanz (Live, Stage, Devel)|devel | 
|Browser| im IE 6 geprüft|
|Betriebssytem (Win XP, Win 7,  Mac OS X) | Win XP|
|Sprache|de | 
|Screenshot/Screencast| ja |
|Skin (Consumer, Member, Agentur)|agent  | 
|Nutzername + Passwort|  -- | 
|Buchungsnummern (PNRs)| -- |

h2. *Wie (Reproduzierungsschritte)*
Schritt-Für-Schritt-Beschreibung (1. 2. 3...), "von www.TUIfly.com bis zum Fehlerpunkt"
# BookingList im IE 6 aufrufen

{color:red}*Eigentliche Fehlerbeschreibung (Wie äußert sich der Fehler?)*{color}
# Browser Update Leiste wird doppelt agezeigt

{color:green}*Beschreibung des eigentlich erwarteten Verhaltens (Was soll geschehen?)*{color}
# Update Leiste nur einmal anzeigen
 
 */

var $desc = $("#descriptionFieldArea");
if($desc.length){
	var $helpIcon = $desc.find("#viewHelp");
	$helpIcon.after("<span id='jm-init'>JM</span>");
	
	$("#jm-init").live("click", function(){
		$.ajax(chrome.extension.getURL('/src/template.html'), {dataType: "html", success: function(data){
			var $area = $desc.find("textarea:first");
			var $parent = $area.parent();
			$area.hide();
			$parent.append(data);
		}});
	})
}