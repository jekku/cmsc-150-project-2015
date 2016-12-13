SetupView = Backbone.View.extend({

	el: "#setup",

	initialize : function(){
	
	},

	render : function(){
		$(this.el).html(this.template());
		return this;
	},

	events : {
		'submit #setup-form' : 'showNextProcedure'
	},

	showNextProcedure : function(){

		varcount = $("#var-count").val();
		constcount = $("#constraint-count").val();

		parameter = {
			variables : parseInt(varcount),
			constraints : parseInt(constcount)
		};


		if(varcount==="" || constcount===""){
			console.log(varcount);
			console.log(constcount);
			toastr.warning("Please fill out the form.");
		}

		else{
			toastr.success("Next procedure : Indicate values.");
			valuePlacementView.render(parameter);
		}

		return false;
	}

});