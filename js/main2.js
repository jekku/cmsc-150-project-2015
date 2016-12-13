var AppRouter = Backbone.Router.extend({

	routes: {

		'' : '',

	},

	initialize : function(){
		window.foodSelectionView = new FoodSelectionView();
		window.solutionView = new SolutionView();
	}

});

	utils.loadTemplate(['FoodSelectionView','FoodDetailView','SolutionView'], function() {

	app = new AppRouter();
	Backbone.history.start();

});