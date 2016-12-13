ValuePlacementView = Backbone.View.extend({

	el: "#setup",

	initialize : function(){
	},

	render : function(params){
		this.params = params;
		$(this.el).html(this.template(params));
		return this;
	},

	events : {
		"click #back-to-setup" : 'showPreviousProcedure',
		"submit #matrix-prep"  : 'showNextProcedure'
	},

	showPreviousProcedure : function(ev){
		toastr.info("Returned to initial setup");
		setupView.render();
	},

	showNextProcedure : function(ev){
		toastr.success("Next procedure : Goal selection");
		vectorCollected = collectObjectiveVector(this.params);
		matrixCollected = collectConstraintMatrix(this.params);
		matrixCollected.push(vectorCollected);
		
		preparationView.render(this.params,matrixCollected,"maximize");

		$("#prepa-tab").click();
		return false;
	}

});

function collectObjectiveVector(params){
	vars = parseInt(params.variables);

	inputs = $(".objectiveElement");
	vector = [];
	for(i=0;i<vars;i++)
		vector.push(parseInt($(inputs[i]).val()));

	vector.push(0);

	return vector;
}

function collectConstraintMatrix(params){

	matrixInputs = $(".matrixElement");
	matrixValueInputs = $(".matrixElementValue");
	var constraintMatrix = [];
	var constraintVector = [];
	variables = parseInt(params.variables);
	constraints = parseInt(params.constraints);

	for(i=0;i<constraints;i++){
		
		for(j=0;j<variables;j++){
			index = i * variables + j;
			constraintVector.push(parseInt($(matrixInputs[index]).val()));
		}

		constraintVector.push(parseInt($(matrixValueInputs[i]).val()));
		constraintMatrix.push(constraintVector);
		constraintVector = [];

	}
	return constraintMatrix;
}