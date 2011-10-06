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

var Bug = function(){
	return {
		_fields: {
		},
		update: function(){
			var $table = $("#jm-table");
			this.updateInstance($table);
			this.updateBrowser($table);
			this.updateOS($table);
			this.updateLanguage($table);
			this.updateSkin($table);
			this.updateScreenshot($table);
			this.updateLogin($table);
			this.updatePNR($table);
			
			this.updateSteps($table);
			this.updateError($table);
			this.updateCorrect($table);
			this.updateNote($table);
			this.submit();
		},		
		updateInstance: function($node){
			var $eles = $node.find(".js-instance :checked");
			this._fields["instance"] = this.stringifyCheckedValues($eles);
		},
		updateBrowser: function($node){
			var $eles = $node.find(".js-browser :checked");
			
			var values = this.stringifyCheckedValues($eles);
			var other = $node.find("#jm-browser-other").val();
			if(other){
				if(values){
					values += ", ";
				}
				values += other;
			}
			this._fields["browser"] = values;
		},
		updateOS: function($node){
			var $eles = $node.find(".js-os :checked");
			
			var values = this.stringifyCheckedValues($eles);
			var other = $node.find("#jm-os-other").val();
			if(other){
				if(values){
					values += ", ";
				}
				values += other;
			}
			this._fields["os"] = values;
		},
		updateLanguage: function($node){
			var $eles = $node.find(".js-language :checked");
			this._fields["language"] = this.stringifyCheckedValues($eles);
		},
		updateSkin: function($node){
			var $eles = $node.find(".js-skin :checked");
			this._fields["skin"] = this.stringifyCheckedValues($eles);
		},
		updateScreenshot: function($node){
			var checked = $node.find(".js-screenshot input").is(":checked");
			this._fields["screenshot"] = checked ? "ja" : "nein";
		},
		updateLogin: function($node){
			var user = $node.find(".js-login #jm-username").val();
			var pw = $node.find(".js-login #jm-password").val();
			if(user && pw){
				this._fields["login"] = user + " / " + pw;
			}
		},
		updatePNR: function($node){
			var $input = $node.find(".js-pnr input");
			this._fields["pnr"] = this.stringifyInputValue($input);
		},
		updateSteps: function($node){
			var $input = $node.find(".js-steps textarea");
			
			var value = '\n\nh2. *Wie (Reproduzierungsschritte)*\nSchritt-Für-Schritt-Beschreibung (1. 2. 3...), "von www.TUIfly.com bis zum Fehlerpunkt"\n'
			value += this.stringifyInputValue($input);
			this._fields["steps"] = value;
		},
		updateError: function($node){
			var $input = $node.find(".js-error textarea");
			
			var value = '\n\n{color:red}*Eigentliche Fehlerbeschreibung (Wie äußert sich der Fehler?)*{color}\n'
			value += this.stringifyInputValue($input);
			this._fields["error"] = value;
		},
		updateCorrect: function($node){
			var $input = $node.find(".js-correct textarea");
			
			var value = '\n\n{color:green}*Beschreibung des eigentlich erwarteten Verhaltens (Was soll geschehen?)*{color}\n'
			value += this.stringifyInputValue($input);
			this._fields["correct"] = value;
		},
		updateNote: function($node){
			var $input = $node.find(".js-note textarea");
			this._fields["note"] = "\n\n"+this.stringifyInputValue($input);
		},
		stringifyInputValue: function($input){
			return $input.val();
		},
		stringifyCheckedValues: function($list){
			var list = [];
			$list.each(function(){
				list.push($(this).val());
			})
			
			return list.join(", ");
		},
		submit: function(){
			var content = "||Wo|| ||\n";
			for(var field in this._fields){
				if(field === "steps" || field === "error" || field === "correct" || field === "note"){
					content += this._fields[field];
				} else {
					content += "|"+field+"|" + (this._fields[field] || " ") + "|\n";
				}
			}
			$("#description").html(content);
		}
	}
}();

var Message = function(){
	return {	
			sub: function(eventName, func){
				$(window).bind(eventName, func);
			},
	
			pub: function(eventName){
				$(window).trigger(eventName);
			}
		}
}();

var Controller = function(){
	Message.sub("updateBug", function(evt, data){ Bug.update() });
}();

var $desc = $("#descriptionFieldArea");
if($desc.length){
	var $helpIcon = $desc.find("#viewHelp");
	$helpIcon.after("<span id='jm-init'><img src='"+chrome.extension.getURL('/src/wizard.png')+"' /></span>");
	
	$("#jm-init").live("click", function(){
		$.ajax(chrome.extension.getURL('/src/template.html'), {dataType: "html", success: function(data){
			var $area = $desc.find("textarea:first");
			var $parent = $area.parent();
			$area.hide();
			$("#description-preview_link_div").hide();
			$("#viewHelp").hide();
			$("#jm-init").hide();
			$parent.append(data);
		}});
	})
	
	$("#jm-table").live("keyup", function(e){
		Message.pub("updateBug");
	});
	
	$("#jm-table").live("change", function(){
		Message.pub("updateBug");
	});
}