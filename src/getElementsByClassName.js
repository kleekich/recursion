// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  /*
	we can use backtracking
  */
  var result = [];
  helper(result, className, window.document.body);
  return result;
};

var helper = function(result, className, current){
	if(current.classList && current.classList.contains(className)) result.push(current);
	if(current.childNodes){
		_.each(current.childNodes, function(node){
			helper(result, className, node);
		});
	}
};

  

