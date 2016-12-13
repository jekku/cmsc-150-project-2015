var AppRouter = Backbone.Router.extend({

	routes: {

		'' : '',

	},

	initialize : function(){
		window.coreView = new CoreView();
		window.setupView = new SetupView();
		window.valuePlacementView = new ValuePlacementView();
		window.preparationView = new PreparationView();
		window.answerView = new AnswerView();
		setupView.render();

	}



});

	utils.loadTemplate(['CoreView','SetupView','ValuePlacementView','PreparationView','AnswerView'], function() {

	app = new AppRouter();
	Backbone.history.start();

});