window.dietMatrixTools = {

	getSelectedConstraints : function(selectedIndeces){
		
		partialVector = [];
		partialMatrix = [];

		for(i=0;i<nutritionalConstraints.length;i++){
			for(j=0;j<selectedIndeces.length;j++){

				switch(i){
					
					case 0:
						partialVector.push(foodlist[selectedIndeces[j]].calories);
					break;

					case 1:
						partialVector.push(foodlist[selectedIndeces[j]].cholesterol);
					break;

					case 2:
						partialVector.push(foodlist[selectedIndeces[j]].totalFat);
					break;

					case 3:
						partialVector.push(foodlist[selectedIndeces[j]].sodium);
					break;

					case 4:
						partialVector.push(foodlist[selectedIndeces[j]].carbohydrates)
					break;

					case 5:
						partialVector.push(foodlist[selectedIndeces[j]].dietaryfiber);
					break;

					case 6:
						partialVector.push(foodlist[selectedIndeces[j]].protein);
					break;

					case 7:
						partialVector.push(foodlist[selectedIndeces[j]].vitamina);
					break;

					case 8:
						partialVector.push(foodlist[selectedIndeces[j]].vitaminc);
					break;

					case 9:
						partialVector.push(foodlist[selectedIndeces[j]].calcium);
					break;

					case 10:
						partialVector.push(foodlist[selectedIndeces[j]].iron);
					break;

				}

			}
			partialMatrix.push(partialVector);
			partialVector = [];
		}

		return partialMatrix;		
	},

	getRightSideConstraints : function(selectedIndeces){
		partialMatrix = this.getSelectedConstraints(selectedIndeces);
		for(i=0;i<partialMatrix.length;i++){
			partialMatrix[i].push(window.nutritionalConstraints[i].minimum);
		}
		return partialMatrix;
	},

	getLeftSideConstraints : function(selectedIndeces){
		partialMatrix = this.getSelectedConstraints(selectedIndeces);
		for(i=0;i<partialMatrix.length;i++){
			for(j=0;j<partialMatrix[i].length;j++){
				partialMatrix[i][j]*=-1;
			}
			partialMatrix[i].push(window.nutritionalConstraints[i].maximum*(-1));
		}
		return partialMatrix;
	},

	getServingConstraints : function(selectedIndeces){
		length = selectedIndeces.length;
		partialVector = [];
		partialMatrix = [];

		for(i=0;i<selectedIndeces.length;i++){
			for(j=0;j<selectedIndeces.length;j++){
				if(i==j) partialVector.push(1);
				else     partialVector.push(0);
			}
			partialVector.push(0);
			partialMatrix.push(partialVector);
			partialVector= [];
		}

		for(i=0;i<selectedIndeces.length;i++){
			for(j=0;j<selectedIndeces.length;j++){
				if(i==j) partialVector.push(-1);
				else     partialVector.push(0);
			}
			partialVector.push(-10);
			partialMatrix.push(partialVector);
			partialVector= [];
		}


		return partialMatrix;
	},

	getObjectiveVector : function(selectedIndeces){
		objectiveVector = [];
		for(i=0;i<selectedIndeces.length;i++){
			objectiveVector.push(window.foodlist[selectedIndeces[i]].price);
		}

		objectiveVector.push(0);

		return objectiveVector;
	},

	buildInitialMatrix : function(selectedIndeces){

		finalMatrix = [];

		firstPartial = this.getRightSideConstraints(selectedIndeces);
		secondPartial = this.getLeftSideConstraints(selectedIndeces);
		thirdPartial = this.getServingConstraints(selectedIndeces);
		objectiveVector = this.getObjectiveVector(selectedIndeces);

		for(i=0;i<firstPartial.length;i++){
			finalMatrix.push(firstPartial[i]);
		}

		for(i=0;i<secondPartial.length;i++){
			finalMatrix.push(secondPartial[i]);
		}

		for(i=0;i<thirdPartial.length;i++){
			finalMatrix.push(thirdPartial[i]);
		}

		finalMatrix.push(objectiveVector);
		finalMatrix = matrixTools.xeroxMatrix(finalMatrix);

		parameters = {};
		parameters.variables = selectedIndeces.length;
		parameters.constraints = finalMatrix.length-1;

		finalMatrix = matrixTools.transpose(parameters,finalMatrix);
		matrixTools.negateBottomRow(parameters,finalMatrix);
		matrixTools.addSlack(parameters,finalMatrix);
	
		pack = {};
		pack.finalMatrix = finalMatrix;
		pack.parameters = parameters;

		return pack;

	}

};