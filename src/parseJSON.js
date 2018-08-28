// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  	//if(json===undefined) return
 	if(json==='null') return null;

  	//string
	else if(json.charAt(0) === '"' && json.charAt(json.length-1)==='"'){
		return json.slice(1,json.length-1);
	}
	//boolean
	else if(json === 'true'){
	return true;
	}else if(json === 'false'){
		return false;
	}
  	//number
	else if(typeof parseFloat(json) === "number" && json.charAt(0) !== '[' && json.charAt(0) !== '{'){
		return parseFloat(json);
	}
	//Array
	else if(json.charAt(0) === '[' && json.charAt(json.length-1) === ']'){
		var res = [];
		//getting only elements separated by comma
		json = json.splice(0,1);
		json = json.splice(json.length-1, 1);
		//While we find any comma
		while(json.indexOf(',') !== -1){
			json = json.trim();
			var indexOfComma = json.indexOf(',');
			var el = json.slice(0, indexOfComma);
			//getting rid of this element+comma+space from json
			json = json.splice(0, indexOfComma+1);
			res.push(parseJSON(el));
		}
		json = json.trim();
		if(json.length > 0) res.push(parseJSON(json));
		return res;
	}
	//Object
	 else if(json.charAt(0) === '{' && json.charAt(json.length-1) === '}'){
			var res = {};
			//getting only properties separated by comma
			json = json.splice(0,1)
			json = json.splice(json.length-1, 1)
			json = json.trim();
		  	
			while(json.indexOf(':') !== -1){
				json = json.trim();
				var indexOfColon = json.indexOf(':');
				var key = json.slice(1, indexOfColon-1);
				json = json.slice(indexOfColon+1,json.length);
				json = json.trim();
				var indexOfComma = json.indexOf(',');

				var openAny = json.indexOf('[') !== -1 || json.indexOf('{') !== -1;
				var indexOfOpeningBracketSquare = json.indexOf('[') === -1? 0: json.indexOf('[');
				var indexOfOpeningBracketCurly = json.indexOf('{') === -1? 0: json.indexOf('{');
				
				var indexOfOpeningBracket = Math.min(indexOfOpeningBracketSquare,indexOfOpeningBracketCurly );
				//If there is another object or Array
				if( openAny  ){
					var indexOfClosingBracketSquare = json.indexOf(']') === -1? 0: json.indexOf(']');
					var indexOfClosingBracketCurly = json.indexOf('}') === -1? 0: json.indexOf('}');
					var indexOfClosingBracket = Math.max(indexOfClosingBracketSquare,indexOfClosingBracketCurly );

					res[key] = parseJSON(json.slice(indexOfOpeningBracket, indexOfClosingBracket+1));
					json = json.slice(indexOfClosingBracket+1);
					continue;
				}
				//If there is no more elements
				else if(indexOfComma === -1 && !openAny){
					var value = json.slice(0,json.length);
					json = json.splice(0,json.length);
				}
				//if there is another property,
				else if(indexOfComma !== -1 ){
					json = json.trim();
					var value = json.slice(0,indexOfComma);
					json = json.splice(0,indexOfComma+1);
				}
				//recursive call;
				res[key] = parseJSON(value);
				
			}
			if(json.length >0){
				var indexOfColon = json.indexOf(':');
			    var key = json.slice(1,indexOfColon-1);
			    json = json.splice(0,indexOfColon+2);
			    var value = json.slice(0);
			    res[key] = parseJSON(value);
			}
			return res;
		}
};

String.prototype.splice = function (index, count) {
  return this.slice(0,index) + this.slice(index + count);
}
