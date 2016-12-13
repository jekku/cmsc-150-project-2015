$.ajax({
	type : "GET",
	url : "./data/foodlist.xml",
	dataType : "xml",

	success : function(xml){
		window.foodlist = [];
		$(xml).find('food').each(function(){
	
			foodToAdd = new Food($(this).find("name").text());
			foodToAdd.setPrice($(this).find("price").text());
			foodToAdd.setCalories($(this).find("calories").text());
			foodToAdd.setCholesterol($(this).find("cholesterol").text());
			foodToAdd.setTotalFat($(this).find("totalfat").text());
			foodToAdd.setSodium($(this).find("sodium").text());
			foodToAdd.setCarbohydrates($(this).find("carbohydrates").text());
			foodToAdd.setDietaryfiber($(this).find("dietaryFiber").text());
			foodToAdd.setProtein($(this).find("protein").text());
			foodToAdd.setVitamina($(this).find("vitamina").text());
			foodToAdd.setVitaminc($(this).find("vitaminc").text());
			foodToAdd.setCalcium($(this).find("calcium").text());
			foodToAdd.setIron($(this).find("iron").text());
			window.foodlist.push(foodToAdd);
		});
		toastr.success("Food List has loaded successfully!");
	},

	error : function(){
		toastr.error("Failed to load food database...");
	}
});

$.ajax({
	type : "GET",
	url : "./data/nutrition-constraints.xml",
	dataType : "xml",

	success : function(xml){

		window.nutritionalConstraints = [];

		$(xml).find('nutritionconstraint').each(function(){
			name = $(this).find("name").text();
			minimum = parseFloat($(this).find("minimum").text());
			maximum = parseFloat($(this).find("maximum").text());
			window.nutritionalConstraints.push(new NutrionalConstraint(name,minimum,maximum));
		});

		toastr.success("Recommended nutrition has loaded successfully!");
	},

	error : function(){
		toastr.error("Failed to load nutrition database...");
	}

})
