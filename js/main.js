/* Carmen Johnson
   Deliverable 2
   VFW Online
   6/7/2012
*/

var categories = ["shelter", "bedding", "cooking", "clothing", "firstaid"];
var items = 0;								// GLOBAL VARIABLE
var el = function(arg) { 					// METHOD FUNCTION
	return document.getElementById(arg); 	// RETURN OBJECT
};

var makeTitleCase = function(arg) {
	if (arg.length >= 1)
		return (arg.substr(0,1).toUpperCase() + arg.substr(1, arg.length));
	else return arg;
};

window.onload = function() {
	el('button').setAttribute('onclick', 'validate();');
	el('clearButton').setAttribute('onclick', 'clearlist();');
	el('clearform').setAttribute('onclick', 'clearForm();');
	
	var len = categories.length;
	for (i=0; i<len; i++) {
		var select = el('category');
		select.options[select.options.length] = new Option(makeTitleCase(categories[i]), categories[i]);
	}
	items = JSON.parse(jsonObject).length;
	display();
	//select.value = select.options[0].value;
};

// GLOBAL VARIABLE
var shelter = [ "tent", "ground cloth", "ground tarp", "extra stakes", "shade", "shade poles", "shade rope", "shade stakes", "axe",
				"hammer", "mat", "dust pan", "Dust brush" ];

// GLOBAL VARIABLE
var bedding = [ "sleeping bag", "sheets", "blankets", "pillow", "air mattress", "sleeping pad", "cot", "tarp", "air pump", "repair kit for air mattress",
				"utility bags for storage" ];

// GLOBAL VARIABLE
var cooking = [ "large water jug", "water bucket", "coolers", "ice", "thermos", "stove", "stove with fuel", "stove with propane", "matches",
				"lighter", "charcoal", "firewood", "buddy burner", "oven", "tin can", "box oven", "campfire grill", "barbeque grill",
				"fire starters", "newspapers", "tablecloth", "thumb tacks", "clips", "plates", "bowls", "paper plates", "paper bowls", "silverware",
				"plastic silverware", "measuring cups", "aluminium foil", "paper towels", "trash bags", "dish soap", "cloth pins", "cooking oil",
				"pam spray", "containers", "pot holders", "oven mitts", "pots", "frying pans", "pan lids", "soap", "tongs", "skewers", "grill forks",
				"can opener", "bottle opener", "folding table", "dutch oven", "pie irons", "mugs", "paper cups", "mixing bowls", "cutting board",
				"ziplock bags", "napkins", "dish pan", "dish rag", "towels", "scrub pad", "brillo", "seasonings", "sugar", "condiments", "potato peeler"];

// GLOBAL VARIABLE
var clothing = ["shoes", "boots", "jeans", "pants", "shirts", "belts", "t-shirts", "socks", "hat", "bandana", "sweatshirt", "underwear", "raincoat"];

// GLOBAL VARIABLE
var firstaid = ["medicine", "bandages", "adhesive tape", "antiseptic" ,"cotton", "tweezers", "scissors", "tissues", "sunscreen"];

// GLOBAL VARIABLE
var miscellaneous = ["funds", "games", "mp3 player", "gps", "books", "radio"];

function para(field, val) {																			// METHOD FUNCTION
	return "<p>" + "<strong>" + field + ": </strong>" + val + "</p>";								// RETURN STRING
}

function clearForm() {																				// METHOD FUNCTION
	el('name').value = "";																			// MATH
	el('quantity').value = "1";																		// MATH
	el('comments').value = "";																		// MATH
	el('date').value = "";
	el('important').checked = false;
	el('button').value = "Add Item!";
}

function display() {																						// METHOD FUNCTION
	var text = "";																							// LOCAL VARIABLE
	var itemsArray = JSON.parse(jsonObject);
	var len = itemsArray.length;																			// LOCAL VARIABLE & MATH
	
	for (i=0; i<len; i++) {																					// FOR LOOP
		text += "<div class='listitem'>" + 																	// MATH - (multi line statement)
				para("Category", itemsArray[i]['category']) + 
				para("Name", itemsArray[i]['name']) + 
				para("Quantity", itemsArray[i]['quantity']) + 
				para("Purchase By", itemsArray[i]['date']) +
				para("Important", itemsArray[i]['important']) +
				para("Comments", itemsArray[i]['comments']) + 
				"<a class='button' onclick='deleteItem("+ itemsArray[i]['idno'] +");'>Delete Item</a>" +
				"<a class='button' onclick='editItem("+ itemsArray[i]['idno'] +");'>Edit Item</a>" + 
				"<img src='images/" + itemsArray[i]['category'] + ".png' />" +
				"</div>";
	}
	el('listbox').innerHTML = text;																			// MATH
}

var update = function() {																					// METHOD FUNCTION
	// LOCAL VARIABLE
	var itemsArray = JSON.parse(jsonObject);
	var obj = { category:el('category').value, name:el('name').value, 
				quantity:el('quantity').value, idno:items, 
				date:el('date').value, comments:el('comments').value, 
				important:el('important').checked };
	var len = itemsArray.length;																			// LOCAL VAR
	var notAlreadyThere = true;																				// LOCAL VAR
	for (i=0; i<len; i++) {																											// FOR LOOP
		if (obj['name'].toLowerCase() == itemsArray[i]['name'].toLowerCase() && obj['category'] == itemsArray[i]['category']) {		// CONDITIONAL
			itemsArray[i]['quantity'] = obj['quantity'];																			// MATH
			itemsArray[i]['date'] = obj['date'];
			itemsArray[i]['important'] = obj['important'];
			itemsArray[i]['comments'] = obj['comments'];																			// MATH
			notAlreadyThere = false;																								// MATH
		}
	}
	if (notAlreadyThere) {																					// CONDITIONAL
		itemsArray.push(obj);																				// MATH
		jsonObject = JSON.stringify(itemsArray);
		clearForm();																						// METHOD - FUNCTION CALL
		items++;																							// MATH
	}
	display();																								// METHOD FUNCTION CALL
};

function validate() {																						// METHOD FUNCTION 
	el('button').value = "Add Item!";
	var targetArray;																						// LOCAL VARIABLE
	var option;																								// LOCAL VAR
	var cat = el('category').value;																			// LOCAL VAR
	if (cat == "shelter")																					// CONDITIONAL
		targetArray = shelter;																					// MATH
	else if (cat == "bedding")																				// CONDITIONAL
		targetArray = bedding;																					// MATH
	else if (cat == "cooking")																				// CONDITIONAL
		targetArray = cooking;																					// MATH
	else if (cat == "clothing")																				// CONDITIONAL
		targetArray = clothing;																					// MATH
	else if (cat == "firstaid")																			// CONDITIONAL
		targetArray = firstaid;																					// MATH
	else if (cat == "miscellaneous")																		// CONDITIONAL
		targetArray = miscellaneous;
		
		
	if ( el('name').value == "" || el('quantity').value == "" || el('comments').value == "" || el('date').value == "" )			// CONDITIONAL
		alert('All fields are required!');																						// OUTPUT
	else if ( targetArray.indexOf(el('name').value.toLowerCase()) == -1 ) {														// CONDITIONAL
		option = confirm("Err..the item you entered doesn't seem like one required for a camping trip. Add it anyway?");		// MATH
		if (option == true)	{																									// CONDITIONAL
			var item = el('success');
			item.innerHTML = "Item successfully added!";
			item.style.display = "block";
			window.setTimeout( function() { item.innerHTML = ""; item.style.display = "none"; }, 2400 );
			update();																											// METHOD FUNC CALL
		}
	}
	else { 
		var item = el('success');
		item.innerHTML = "Item successfully added!";
		item.style.display = "block";
		window.setTimeout( function() { item.innerHTML = ""; item.style.display = "none"; }, 2400 );
		update();																												// METHOD FUNC CALL
	}
};

function clearlist() {																						// METHOD FUNCTION
	var option = confirm("Are you sure you want to clear the entire list?");								// MATH
	var itemsArray = JSON.parse(jsonObject);
	if (option) {																							// CONDITIONAL
		var len = itemsArray.length;																		// LOCAL VARIABLE
		for (i=0; i<len; i++) {																				// FOR LOOP
			var temp = itemsArray.pop();																		// LOCAL VAR & MATH
		}
		jsonObject = JSON.stringify(itemsArray);
		display();																							// METHOD FUNC CALL
	}
}

function resetIndexes() {																					// METHOD FUNCTION
	var itemsArray = JSON.parse(jsonObject);
	var len = itemsArray.length;																			// LOCAL VARIABLE
	for (i=0; i<len; i++) {																					// FOR LOOP
		itemsArray[i]['idno'] = i;																			// MATH
	}
	jsonObject = JSON.stringify(itemsArray);
}

function deleteItem(idno) {																					// METHOD FUNCTION
	var itemsArray = JSON.parse(jsonObject);
	var option = confirm("Delete Item?");																	// MATH
	if (option) {																							// CONDITIONAL
		itemsArray.splice(idno, 1);																			// MATH
		jsonObject = JSON.stringify(itemsArray);
		resetIndexes();																						// METHOD FUNC CALL
		display();																							// METHOD FUNC CALL
	}
}

function editItem(idno) {																					// METHOD FUNC 
	var itemsArray = JSON.parse(jsonObject);
	el('category').value = itemsArray[idno]['category'];													// MATH
	el('name').value = itemsArray[idno]['name'];															// MATH
	el('quantity').value = itemsArray[idno]['quantity'];													// MATH
	el('comments').value = itemsArray[idno]['comments'];													// MATH
	el('date').value = itemsArray[idno]['date'];															// MATH
	el('important').value = itemsArray[idno]['important'];													// MATH
	el('button').value = "Edit!";
}	  