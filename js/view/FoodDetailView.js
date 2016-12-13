window.FoodDetailView = Backbone.View.extend({

	el : "#food-details",

	initialize : function(foodIndex){
		this.render(foodIndex);
	},

	render : function(foodIndex){
		this.foodToDisplay = window.foodlist[foodIndex];
		$(this.el).html(this.template({foodToDisplay:this.foodToDisplay}));
		return this;
	},

	events : {
		"click #solve" : "procureDietPlan",
		"click #select-all" : "selectAll",
		"click #deselect-all" : "deselectAll"
	},

	deselectAll : function(){
		$(".food-checkbox").removeAttr("checked");
		$("#deselect-all").text("Select All");
		$("#deselect-all").attr("id","select-all");
	},

	selectAll : function(){
		$(".food-checkbox").attr("checked","");
		$("#select-all").text("Deselect All");
		$("#select-all").attr("id","deselect-all");
	},

	procureDietPlan : function(){
		selectedIndeces = [];

		$.each($(".food-checkbox"),function(){
			if(this.checked) selectedIndeces.push(parseInt($(this).val()));
		});

		if(selectedIndeces.length===0){
			toastr.warning("Please select some food items.");
			return;
		}


		pack = window.dietMatrixTools.buildInitialMatrix(selectedIndeces);
		matrixToSolve = pack.finalMatrix;
		parameters = pack.parameters;
		
		feasibilityCounter = 0;
		isFeasible = true;

		while(feasibilityCounter<100 && matrixTools.bottomRowHasNegativeNumber(parameters,matrixToSolve)){
			pivotColumnIndex = matrixTools.getMostNegativeColumn(parameters,matrixToSolve);
			pivotElementIndex = matrixTools.findAppropriateTestRatio(pivotColumnIndex,parameters,matrixToSolve);
			matrixTools.normalizeRow(parameters,matrixToSolve,pivotElementIndex,pivotColumnIndex);
			matrixTools.gaussJordanElimination(parameters,matrixToSolve,pivotElementIndex,pivotColumnIndex);
			feasibilityCounter++;
		}

		if(feasibilityCounter>=100) isFeasible = false;

		solution = matrixTools.getBasicSolution(parameters,matrixToSolve);

		if(isFeasible && !isNaN(solution[solution.length-1]) && solution[solution.length-1]>0) solutionView.render(matrixToSolve,selectedIndeces);
		else           toastr.error("Your desired diet seems to be infeasible. Please select more food items.");
	}

});