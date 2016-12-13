window.matrixTools = {


	getBasicSolution : function (parameters,matrix){
	
		solutions = [];
		rowEnd = parameters.variables+parameters.constraints+1;

		rowHasSolution = true;
		foundSwitch = false;
		switchIndex = 0;

		for(i=0;i<rowEnd;i++){
			for(j=0;j<parameters.constraints+1;j++){
				//console.log(i + " " + j +  " " + matrix[j][i]);

				if(matrix[j][i]===0){
					continue;
				}

				else if(matrix[j][i]===1){
					if(!foundSwitch){
						foundSwitch = true;
						switchIndex = j;
						
					}
					else{
					
						rowHasSolution = false;
						break;
					}
				}

				else{
					rowHasSolution = false;
					break;
				}

			}
			if(!rowHasSolution) solutions.push(0);
			else solutions.push(matrix[switchIndex][rowEnd]);
			rowHasSolution = true;
			foundSwitch = false;
			switchIndex = 0;
		}
		
		return solutions;

	},

	getMostNegativeColumn : function(parameters,matrix){

		variables = parameters.variables;
		constraints = parameters.constraints;

		rowLength = variables+constraints+2;

		smallestNumberIndex = 0;


		for(i=1;i<(rowLength);i++){
			if(matrix[constraints][i]<matrix[constraints][smallestNumberIndex]){
				smallestNumberIndex = i;
			}
		}
		return smallestNumberIndex;
	},

	//make all B positive only
	findAppropriateTestRatio : function(index,parameters,matrix){
		variables = parameters.variables;
		constraints = parameters.constraints;
		rowLength = variables + constraints + 1;

		testRatio = Math.pow(2,31); //very big number
		pivotElementIndex = 0;

		for(i=0;i<constraints;i++){
			nextTestRatio = matrix[i][rowLength]/matrix[i][index];
			if(nextTestRatio<0) continue;

			if(nextTestRatio<testRatio){
				testRatio = nextTestRatio;
				pivotElementIndex = i;
			}
		}
	
		return pivotElementIndex;

	},

	normalizeRow : function(parameters,matrix,pivotElementXCoordinate,pivotElementYCoordinate){
		divisor = matrix[pivotElementXCoordinate][pivotElementYCoordinate];
		if(divisor==1) return;
		variables = parameters.variables;
		constraints = parameters.constraints;
		rowLength = variables+constraints+2;

		for(i=0;i<rowLength;i++){
			matrix[pivotElementXCoordinate][i]/=divisor;
		}
		
	},

	gaussJordanElimination : function(parameters,matrix,pivotElementXCoordinate,pivotElementYCoordinate){
		variables = parameters.variables;
		constraints = parameters.constraints;
		rowLength = variables+constraints+2;

		for(i=0;i<constraints+1;i++){
			if(i==pivotElementXCoordinate) continue;
			eliminant = matrix[i][pivotElementYCoordinate]*-1;
			for(j=0;j<rowLength;j++){
				matrix[i][j]+=(eliminant*matrix[pivotElementXCoordinate][j]);
			}
			
		}
	},

	bottomRowHasNegativeNumber : function(parameters,matrix){

		variables = parameters.variables;
		constraints = parameters.constraints;
		rowLength = variables+constraints+2;

		hasNegativeNumber = false;

		for(i=0;i<rowLength;i++){
			if(matrix[constraints][i]<0){
				hasNegativeNumber = true;
				break;
			}
		}
		return hasNegativeNumber;
	},

	xeroxMatrix : function(matrix){

		xeroxCopy = JSON.stringify(matrix);
		return JSON.parse(xeroxCopy);
			
	},

	transpose : function(parameters,matrix){

		transposedMatrix = [];
		vectorMember = [];

		for(i=0;i<parameters.variables+1;i++){
			
			for(j=0;j<parameters.constraints+1;j++){

				vectorMember.push(matrix[j][i]);
			}
			
			transposedMatrix.push(vectorMember);
			vectorMember = [];
		}

		matrix = transposedMatrix;

		swap1 = parseInt(parameters.variables);
		swap2 = parseInt(parameters.constraints);
		parameters.variables = swap2;
		parameters.constraints = swap1;

		return matrix;
	},

	addSlack : function(parameters,matrix){
		for(i=0;i<parameters.constraints+1;i++){
				temp = matrix[i].pop();
			for(j=0;j<parameters.constraints+1;j++){

				if(i!=j) matrix[i].push(0);
				else     matrix[i].push(1);
			}
				matrix[i].push(temp);
		}
	},

	negateBottomRow : function(parameters,matrix){

		for(i=0;i<parameters.variables;i++)
			if(matrix[parameters.constraints][i]!=0)
					matrix[parameters.constraints][i] = matrix[parameters.constraints][i]*-1;
	}

}