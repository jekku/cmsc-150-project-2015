
window.CoreView = Backbone.View.extend({

	el : "#wrapper",

	initialize : function(){
		this.render();
	},

	render : function(){
		$(this.el).html(this.template());
		return this;
	}

});