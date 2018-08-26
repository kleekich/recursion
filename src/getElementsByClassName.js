// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  /*
	we can use helper function to build our list
  */
  var result = [];
  helper(result, className, window.document.body);
  return result;
};

var helper = function(result, className, current){
	//if current element has class, and it has our target class, we add to our list
	if(current.classList && current.classList.contains(className)) result.push(current);
	if(current.childNodes){
		//For each child node,
		_.each(current.childNodes, function(node){
			//We recursively call helper function
			helper(result, className, node);
		});
	}
};

  

