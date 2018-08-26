// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if(obj === null) return 'null';
  else if(typeof obj === 'number' || typeof obj === 'boolean' ) return obj.toString();
  result = '';
  //Each or reduce
  if(typeof obj === 'string') return result.concat('"').concat(obj).concat('"');
  else if(typeof obj === "object"){
  	if(Array.isArray(obj)){
  		result = result.concat('[');
  		for(var i = 0; i < obj.length; i++){
  			if(i !== 0) result = result.concat(',');
  			if(typeof obj[i] === 'object'){
  				result = result.concat(stringifyJSON(obj[i]));
  			}else if(typeof obj[i] === 'string'){
  				result = result.concat('"').concat(obj[i]).concat('"');
  			}else{
  				result = result.concat(obj[i]);
  			}
  		}
  		result = result.concat(']');
  	}else{
  		result = result.concat('{');
  		for(var key in obj){
  			if(typeof obj[key] === 'undefined' || typeof obj[key] === 'function'){
		  		continue;
		  	}
  			if(key !== Object.keys(obj)[0]) result = result.concat(',');
  			if(typeof obj[key] === 'object'){
  				if(obj[key] === null)  result = result.concat('"'+key+'":null');
  				else result = result.concat('"'+key+'":').concat(stringifyJSON(obj[key]));
  			}else{
  				if(typeof obj[key] === 'string') result = result.concat('"'+key+'":"').concat(obj[key].toString()).concat('"');
  				else result = result.concat('"'+key+'":').concat(obj[key]);
  			}
  		}
  		result = result.concat('}');
  	}
  	return result;





  	/*
  	if(!Array.isArray(obj))result = result.concat('{');
  	for(var key in obj){
  		//For array with more than one element, we need to insert comma after every 
  		if(Array.isArray(obj) && key !== '0') result = result.concat(',');
	  	if(!Array.isArray(obj) && typeof obj[key] === "object"){
	  		result = result.concat('"'+key+'"').concat(stringifyJSON(obj[key]));
	  	}else if(typeof obj[key] === "object"){
	  		result = result.concat(stringifyJSON(obj[key]));
	  	}else if(typeof obj[key] === undefined || typeof obj[key] === 'function'){
	  		continue;
	  	}else{
	  		if(typeof obj[key] === 'string') result = result.concat('"').concat(obj[key]).concat('"');
	  		else result = result.concat(obj[key]);

	  	}
	}
	*/
  }
  if(Array.isArray(obj)) result = "[".concat(result).concat("]");
  if(typeof obj === 'object' && !Array.isArray(obj)) result = result.concat("}");
  return result;
};
 