AnswerView = Backbone.View.extend({

	el : "#answers",

	initialize : function(){
		this.answerSet = [];
		this.setIndex = 0;
	},

	render : function(){

		viewObjects = {
			tableau : this.answerSet[this.setIndex],
			params : this.uiParameters.params,
		}
		viewObjects.basicSolution = matrixTools.getBasicSolution(viewObjects.params,viewObjects.tableau);

		$(this.el).html(this.template(viewObjects));
		return this;
	},

	events : {

		"click #next" : "showNext",
		"click #prev" : "showPrev"

	},

	showNext : function(){
		
		if(this.setIndex<this.answerSet.length-1){
			this.setIndex++;
			this.render();
		}
		else{
			toastr.warning("This is already the final answer.");
		}
		console.log(this.setIndex);
	},

	showPrev : function(){
		
		if(this.setIndex>0){
			this.setIndex--;
			this.render();
		}
		else{
			toastr.warning("This is the intial tableau.");
		}
		console.log(this.setIndex);
	},

	prepare : function(params,table){
		uiParameters = {};
		console.log(params);
		console.log(table);
		uiParameters.params = params;
		uiParameters.table = table;
		this.uiParameters = uiParameters;
		this.simplexMethod();
	},

	simplexMethod : function(){
		
		params = this.uiParameters.params;
		table = this.uiParameters.table;
		
		this.answerSet.push(matrixTools.xeroxMatrix(table));

		while(matrixTools.bottomRowHasNegativeNumber(params,table)){
			pivotColumnIndex = matrixTools.getMostNegativeColumn(params,table);
			pivotElementIndex = matrixTools.findAppropriateTestRatio(pivotColumnIndex,params,table);
			matrixTools.normalizeRow(params,table,pivotElementIndex,pivotColumnIndex);
			matrixTools.gaussJordanElimination(params,table,pivotElementIndex,pivotColumnIndex);
			this.answerSet.push(matrixTools.xeroxMatrix(table));
		}

	}

});