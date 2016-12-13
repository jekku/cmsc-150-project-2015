PreparationView = Backbone.View.extend({

	el : "#prepa",

	initialize : function(){
	
	},

	render : function(params,table,mode){
		
		this.params=params;
		this.table=table;
		this.displayableTable = matrixTools.xeroxMatrix(table);
		this.mode=mode;


		uiParams = {};
		uiParams.params = params;
		uiParams.table = this.displayableTable;
		uiParams.mode = this.mode;
		matrixTools.negateBottomRow(this.params,uiParams.table);
		matrixTools.addSlack(this.params,uiParams.table);
		uiParams.basicSolution = matrixTools.getBasicSolution(uiParams.params,uiParams.table);
		$(this.el).html(this.template(uiParams));
		return this;
	},

	events : {
		"submit #set-goal" : "proceedToSolving",
		"click #maximize-button" : "setToMax",
		"click #minimize-button" : "setToMin"
	},

	proceedToSolving : function(ev){
		console.log(this.params,this.displayableTable);
		answerView.initialize();
		answerView.prepare(this.params,this.displayableTable);
		answerView.render();
		$("#ans-tab").click();
		return false;
	},

	setToMax : function(){

		if(this.mode==="maximize"){
			toastr.warning("Already set to maximize.");
		}
		else{
			this.table = matrixTools.transpose(this.params,this.table);
			this.render(this.params,this.table,"maximize");
			toastr.info("Goal set to maximize.")
		}
	},

	setToMin : function(){
		if(this.mode==="minimize"){
			toastr.warning("Already set to minimize.");
		}
		else{
			this.table = matrixTools.transpose(this.params,this.table);
			this.render(this.params,this.table,"minimize");
			toastr.info("Goal set to minimize.")
		}
	}

});



