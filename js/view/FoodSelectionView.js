window.FoodSelectionView = Backbone.View.extend({

	el : "#wrapper",

	initialize : function(){
		this.render();
	},

	render : function(){
		
		$(this.el).html(this.template());
		window.foodDetailView = new FoodDetailView(0);
		return this;
	},

	events : {
		"change .food-checkbox" : "notifyChange",
		"hover .checkbox-label" : "seeFoodDetails"
	},

	notifyChange : function(ev){
		if(ev.currentTarget.checked){
			index = $(ev.currentTarget).attr("value");
			toastr.info(window.foodlist[index].name + " has been added to your diet plan.");
		}
		else{
			index = $(ev.currentTarget).attr("value");
			toastr.warning(window.foodlist[index].name + " has been removed from your diet plan.");
		}
	},

	seeFoodDetails : function(ev){
		index = $(ev.currentTarget).attr("value");
		window.foodDetailView.render(index);
	}	

});