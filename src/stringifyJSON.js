// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  /*
	

  */

  if(obj === null) return 'null';
  else if(typeof obj === 'number' || typeof obj === 'boolean' ) return obj.toString();
  result = '';
  if(typeof obj === 'string') return '"'+obj+'"';
  else if(typeof obj === "object"){
  	//If obj is an array
  	if(Array.isArray(obj)){
  		//Starting
  		result = result.concat('[');
  		//For every element
  		for(var i = 0; i < obj.length; i++){
  			//add comma from the second element
  			if(i !== 0) result = result.concat(',');
  			//If it is an object, we call recursively
  			if(typeof obj[i] === 'object'){
  				result = result.concat(stringifyJSON(obj[i]));
  			//If it is a string, we wrap it with "" 
  			}else if(typeof obj[i] === 'string'){
  				result = result.concat('"'+obj[i]+'"');
  			//Otherwise, we just add element to result
  			}else{
  				result = result.concat(obj[i]);
  			}
  		}
  		//Closing
  		result = result.concat(']');
  	//If obj is a object
  	}else{
  		//Starting
  		result = result.concat('{');
  		//for each property
  		for(var key in obj){
  			//We skip if current value is undefined or function
  			if(typeof obj[key] === 'undefined' || typeof obj[key] === 'function'){
		  		continue;
		  	}
		  	//We concat ',' for from the second property
  			if(key !== Object.keys(obj)[0]) result = result.concat(',');
  			//If the value is an object again,
  			if(typeof obj[key] === 'object'){
  				//If it is a null, we concat null
  				if(obj[key] === null)  result = result.concat('"'+key+'":null');
  				//Otherwise, we recurrsively call
  				else result = result.concat('"'+key+'":'+stringifyJSON(obj[key]));
  			//If the value is not an object,
  			}else{
  				//If the value is type of string
  				if(typeof obj[key] === 'string') result = result.concat('"'+key+'":"'+obj[key]+'"');
  				//Otherwise, we just concat
  				else result = result.concat('"'+key+'":'+obj[key]);
  			}
  		}
  		//closing
  		result = result.concat('}');
  	}
  	return result;

  }
  if(Array.isArray(obj)) result = "[".concat(result+"]");
  if(typeof obj === 'object' && !Array.isArray(obj)) result = result.concat("}");
  return result;
};
 