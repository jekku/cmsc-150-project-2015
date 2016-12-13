SolutionView = Backbone.View.extend({

	el : "#wrapper",

	initialize : function(){
	},

	render : function(solvedMatrix,selectedIndeces){


		zSolution = solvedMatrix[solvedMatrix.length-1][solvedMatrix[0].length-1];
		recommendedFood = [];
		selectedFoodCount = selectedIndeces.length;

		adjustingOffset = (2*selectedFoodCount)+22

		for(i=0;i<selectedIndeces.length;i++){
			servings = solvedMatrix[selectedIndeces.length][i+adjustingOffset];
			if(servings>0){
				recommended = foodlist[selectedIndeces[i]];
				individualPrice = recommended.price*solvedMatrix[selectedFoodCount][i+adjustingOffset];
				recommendedFood.push(new RecommendedFood(recommended.name,servings,individualPrice));
			}
		}


		viewObjects = {};
		viewObjects.dailyCost = zSolution;
		viewObjects.recommendedFood = recommendedFood;
		
		$(this.el).html(this.template(viewObjects));
		return this;
	},

	events :{
		"click #back-to-selection" : "backToSelection"
	},

	backToSelection : function(){
		foodSelectionView.render();
	}

});



