var Food = function(name){
	this.name = name;
	this.setPrice = function(price){
		this.price = parseFloat(price);
	};
	this.setCalories = function(calories){
		this.calories = parseFloat(calories);
	};
	this.setCholesterol = function(cholesterol){
		this.cholesterol = parseFloat(cholesterol);
	};
	this.setTotalFat = function(totalFat){
		this.totalFat = parseFloat(totalFat);
	};
	this.setSodium = function(sodium){
		this.sodium = parseFloat(sodium);
	};
	this.setCarbohydrates = function(carbohydrates){
		this.carbohydrates = parseFloat(carbohydrates);
	};
	this.setDietaryfiber = function(dietaryfiber){
		this.dietaryfiber = parseFloat(dietaryfiber);
	};
	this.setProtein = function(protein){
		this.protein = parseFloat(protein);
	};
	this.setVitamina = function(vitamina){
		this.vitamina = parseFloat(vitamina);
	};
	this.setVitaminc = function(vitaminc){
		this.vitaminc = parseFloat(vitaminc);
	};
	this.setCalcium = function(calcium){
		this.calcium = parseFloat(calcium);
	};
	this.setIron = function(iron){
		this.iron = parseFloat(iron);
	};
	return this;
}

var NutrionalConstraint = function(name,minimum,maximum){
	this.name=name;
	this.minimum=minimum;
	this.maximum=maximum;
	return this;
}

var RecommendedFood = function(name,servings,cost){
	this.name = name;
	this.servings = servings;
	this.cost = cost;
	return this;
}
