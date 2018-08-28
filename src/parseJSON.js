// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  	//Edge cases
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
		json = json.splice(0,1)
		json = json.splice(json.length-1, 1)
		
		//Error
		if (json.slice(json.length-1) === ',') {
	  		var errorLine = json.length-1;
	  		throw new SyntaxError('Unexpected token ] in JSON at position','JSON');
		}
	
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
			//error
			if (json.slice(json.length-1) === ',') {
		    	var errorLine = json.length-1;
		    	throw new SyntaxError('Unexpected token } in JSON at position','JSON');
		  	}
		  	
			while(json.indexOf(':') !== -1){
				json = json.trim();
				var indexOfColon = json.indexOf(':');
				var key = json.slice(1, indexOfColon-1);
				json = json.trim();
				json = json.slice(indexOfColon+1,json.length);
				json = json.trim();
				var indexOfComma = json.indexOf(',');
				var indexOfOpeningBracket = json.indexOf('{') || json.indexOf('[');
				//If there is no more elements
				if(indexOfComma === -1 && indexOfOpeningBracket === -1){
					var value = json.slice(0,json.length);
					json = json.splice(0,json.length);
				}
				//If there is another object
				else if(indexOfOpeningBracket!==-1 &&indexOfOpeningBracket<indexOfComma ){
					var indexOfOpenCurlyBracket = json.indexOf('{');
					var indexOfOpenSquareBracket = json.indexOf('[');
				}
				//if there is another property,
				else if(indexOfComma !== -1){
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
