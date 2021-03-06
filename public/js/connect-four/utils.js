/**
* Reusable utility functions from Connect Four.
*
* (Reusable largely in theory ;-))
*/

/**
* Determine if a row of the given matrix contains a winning 'streak', i.e.
* 4 or more of the same value (indicating, in this case, the same player's
* pieces) in a row.
*/
 /**

  * Reusable utility functions from Connect Four.

  * 

  * (Reusable largely in theory ;-))

  */

 

 /**

  * Determine if a row of the given matrix contains a winning 'streak', i.e.

  * 4 or more of the same value (indicating, in this case, the same player's

  * pieces) in a row.

  */

 

 //function checkDiagonalLeft(matrix,ArrayOfValues){


 //}


 function containsStreakOfValues(matrix) {

     var streak = null,

         streakOf = null,

         current = null;

     for (var i = 0; i < matrix.length; i++) {

         streak = 0;

         // Iterate backwards since in the Connect Four grid 0,0 is the *top*

         // left and we want to try from the bottom up

         for (var j = (matrix[i].length - 1); j >= 0; j--) {

             current = matrix[i][j];



             if (current) {

                 // if the space is not empty

                 if (current == streakOf){

                     // if the space is part of the current streak

                     streak++;

                 }

                 else{

                     streakOf = current;

                     streak = 1;

                     // we've started a new streak!

                 }

             }



             else {

                 streak = 0;

                 // the space is empty. starting back at 0

             }

             if (streak == 4) {

                 // That's a win!

                 return true;

             }

         }

     }

     // We've tried every row -- no luck.

     return false;

 }

/**
* Given a starting point and a grid, search the diagonals 'up' the virtual
* game space to see if a streak of 4 or more values exists.
*
* NB: It should be safe to limit the search to 'up' the virtual game space,
* since we start at the bottom and so should catch the first item of any
* diagonal run before we see the others.
*/
function searchDiagonally(x, y, grid) {
    var current = grid[x][y], //aka matrix
        iter_x = x,
        iter_y = y,
        max_x = grid.length - 1,
        streak = 0;

    // First, search decreasing in both indices -- upwards and to the left,
    // in the virtual game space.
    while ((iter_x >= 0) && (iter_y >= 0)) {
        if (grid[iter_x][iter_y] != current) {
            // The streak's been broken. Give up.
            break;
        }
        // Optimistic -- keep going.
        streak++;
        if (streak == 4) {
            // Winning condition reached!
            return true;
        }
        // Now increment and continue the search
        iter_x--;
        iter_y--;
    }
    // If we haven't found a match, try again in the other diagonal direction.
    // Reset the counters first.
    iter_x = x;
    iter_y = y;
    streak = 0;
    // This is upwards and to the right, in the virtual space.
    while ((iter_x <= max_x) && (iter_y >= 0)) {
        if (grid[iter_x][iter_y] != current) {
            // Streak broken. Give up.
            break;
        }
        // Optimistic...
        streak++;
        if (streak == 4) {
            // Winning condition reached!
            return true;
        }
        // Increment and continue the search.
        iter_x++;
        iter_y--;
    }
    // We've tried everything, no luck.
    return false;
}


/* This function determines if there exists a potential winning solution
* consisting of a column. Given a matrix, an empty array, and a number(1 or 2)
* corresponding to a player, it will return an x coordinate, a y coordinate and
* a value for a group of cells that could meet winning criteria
*
* This function operates very similarly to the ContainsStreakofValues function above
* with some minor changes :)
*/

function checkCol(matrix,ArrayOfValues,streakof){
    var streak = null,
        streakOf = streakof,
        current = null;
        

    for(var i=0; i<matrix.length;i++){
        streak = 0;
        ArrayOfValues = [];
        for(var j = (matrix[i].length -1); j>=0; j--){

            current = matrix[i][j];

            if (current){

              //if space is not empty
                if(current == streakOf){



                    ArrayOfValues.push([i,j,current])

                    
                    
                    streak++; //and then increment
                }
            

                else{

                    
                    
                    ArrayOfValues.push([i,j,current]);
                    ArrayOfValues = []; //clean up the array just in case
                     //push the new starting coordinates and value 

                    
                    
                    streak = 0;

                    //started new streak!
                }
            }

            else {
                
                streak = 0;
                ArrayOfValues = [];
            }

            if(streak == 3){


                
                ArrayOfValues.reverse(); //readability purposes

                
                
                
                //If the top part of the column is open, and it does not go
                //beyond the boundaries of the grid, 
                //then this can be considered
                //a valid solution
                
                

                if((j-1) > -1){

                    if(matrix[i][j-1] == (null||undefined)){

                        return ArrayOfValues;
                    }
                
                }

                
            }


        }

    }


}

/* Same methodology as above, but with row
* Similar to above, given a matrix, an empty array, and a specific steak value to
* look for, it will draw up potential solutions that manifest themselves in rows. 
*/

function checkForRows(matrix,ArrayOfValues,streakof){
    var streak = null,
        streakOf = streakof,
        current = null;

    for(var i=0; i<matrix.length;i++){
        streak = 0;
        ArrayOfValues = [];
        for(var j = (matrix[i].length -1); j>=0; j--){

            current = matrix[i][j];

            if (current){
                if(current == streakOf){

                    ArrayOfValues.push([i,j,current]);
                    streak++;
                }
            

                else{


                    

                    ArrayOfValues.push([i,j,current]);
                    ArrayOfValues = [];
                    
                    streak = 0;

                    
                    
                }
            }

            else {

                
                streak = 0;
                ArrayOfValues = [];
            }
            if(streak == 2){



                if((j-1) > -1){

                    if(matrix[i][j-1] == (null||undefined)){

                        if(matrix[i][j-2] == matrix[i][j]){
                            ArrayOfValues.push([i,j-2,matrix[i][j-2]]);

                            if(i == 5){

                                return ArrayOfValues;
                            }

                            if(matrix[i+1][j-1] != (null||undefined)){
                                return ArrayOfValues;
                            }
                            
                        }

                    }
                    if((j+2) < 7){

                        if(matrix[i][j+2] == (null||undefined)){

                            if(matrix[i][j+3] == matrix[i][j]){
                                ArrayOfValues.push([i,j+3,matrix[i][j+3]]);

                                if(i == 5){

                                    return ArrayOfValues;
                                }
                                
                                if(matrix[i+1][j+2] != (null||undefined)){

                                    return ArrayOfValues;
                                }

                            }

                        }
                    }     

                }

                if((j+2) < 7){

                    if(matrix[i][j+2] == (null||undefined)){

                        if(matrix[i][j+3] == matrix[i][j]){

                            ArrayOfValues.push([i,j+3,matrix[i][j+3]]);
                            if(i == 5){

                                return ArrayOfValues;
                            }
                            
                            if(matrix[i+1][j+2] != (null||undefined)){

                                return ArrayOfValues;
                            }
                        }

                    }
                }



            
            //Now we check for potential solutions that can be fragmented. that is,
            //neither a column or a row. Something like this, for example:
            // player 1 = 1;
            // player 2 = 2;
            // empty spot = 0;
            //
            // 0 0 0 0 0 0
            // 0 0 0 0 0 0 
            // 0 0 2 2 0 2 -->potential solution
            // 0 0 0 0 1 0
            // 0 1 0 1 1 0 --> this too

                
            }
            if(streak == 3){

                
                ArrayOfValues.reverse();
                
                //We begin at the bottom of the grid 
                

                if((j-1) > -1){ //if checking for a left value does not go beyond the array range

                    if(matrix[i][j-1] == (null||undefined)){

                        if(i == 5){
                            return ArrayOfValues;
                        }
                        if(matrix[i+1][j-1] != (null||undefined)){
                            return ArrayOfValues;
                        }
                        
                    }
                    if((j+3) < 7){

                        if(matrix[i][j+3] == (null||undefined)){
                            if(i == 5){
                                return ArrayOfValues;
                            }
                            if(matrix[i+1][j+3] != (null||undefined)){
                                return ArrayOfValues;
                            }
                            
                        }

                    }


                }

                if((j+3) < 7){

                    if(matrix[i][j+3] == (null||undefined)){

                        if(i == 5){

                            return ArrayOfValues;
                        }
                        if(matrix[i+1][j+3] != (null||undefined)){
                            return ArrayOfValues;
                        }
                    }
                }
                

                
                //If there is a valid solution for a row
            }


        }

    }


}

/* This function checks if there is a streak of 3 diagonals from bottom to top-right. If there is
// a streak of 3, see if it is valid. If so, return the ArrayOfValues that compose that solution. 
*/

function checkDiagonalRight(x,y,matrix,ArrayOfValues,streakof){

    var current = streakof, //aka matrix
        i = x,
        j = y,
        max_x = matrix.length - 1,
        streak = 0;

    while ((i <= max_x) && (j >= 0)) {

        if (matrix[i][j] != current) {
            // Streak broken. Give up.
            break;
        }
        // Optimistic...

        ArrayOfValues.push([i,j,current]);

        streak++;
        /*
        coming soon! if there is a streak of 2 diagonals, but there is a possibility of winning.
        for an example, see the above rows function(if streak == 2)
        if (streak == 2) {

            ArrayOfValues.reverse();

            if((j+3) <= 5){

                if((i-3) >= 0){

                    if(matrix[i-3][j+3] == matrix[i][j]){

                        if(matrix[i-2][j+2] == (null||undefined)){

                            ArrayOfValues.push([i,j,matrix[i-3][j+3]]);

                            return ArrayOfValues;
                        }

                    }
                    
                }
            }
        }
        */
        if (streak == 3) {
            
            ArrayOfValues.reverse();

            if((i+1) <= 6){

                if(matrix[i+1][j] != (null||undefined)){

                    if((j-1) >= 0) {

                        if(matrix[i+1][j-1] == (null||undefined)){

                            return ArrayOfValues;
                        }

                    }

                    
                    if((i-3) >= 0){

                        if((j+4) <= 5){

                            if(matrix[i-3][j+3] == (null||undefined)){

                                if(matrix[i-3][j+4] != (null||undefined)){

                                    return ArrayOfValues;
                                }

                                
                            }
                        }
                    }

                }
            }
            

            if((i-3) >= 0){

                if((j+4) <= 5){

                    if(matrix[i-3][j+3] == (null||undefined)){

                        if(matrix[i-3][j+4] != (null||undefined)){

                            return ArrayOfValues;
                        }
                        
                    }
                }
            }
            


        }
        // Increment and continue the search.
        i++;
        j--;
    }
    
}

/* This function checks if there is a streak of 3 diagonals from bottom to top-left. If there is
// a streak of 3, see if it is valid. If so, return the ArrayOfValues that compose that solution. 
*/

function checkDiagonalLeft(x,y,matrix,ArrayOfValues,streakof){

    var current = streakof, //aka matrix
        i = x,
        j = y,
        max_x = matrix.length - 1,
        streak = 0;

    //search decreasing in both indices -- upwards and to the left,
    // in the virtual game space.
    while ((i >= 0) && (j >= 0)) {
        if (matrix[i][j] != current) {
            // The streak's been broken. Give up.
            break;
        }
        
        ArrayOfValues.push([i,j,current]);

        streak++;

        if (streak == 3) {
            

             ArrayOfValues.reverse(); //this improves legibility

            
             if((i-1) >= 0 ){


                if(matrix[i-1][j] != (null||undefined)){

                    if((j-1) >= 0){

                        if(matrix[i-1][j-1] == (null||undefined)){

                            return ArrayOfValues;
                        }
                    }

                    
                    if((i+3) <= 6){

                        if((j+4) <= 5){

                            if(matrix[i+3][j+3] == (null||undefined)){

                                if(matrix[i+3][j+4] != (null||undefined)){

                                    return ArrayOfValues;
                                }
     
                            }
                        }
                    }
                } 
             }

             

             if((i+3) <= 6){

                if((j+4) <= 5){

                    if(matrix[i+3][j+3] == (null||undefined)){

                        if(matrix[i+3][j+4] != (null||undefined)){

                            return ArrayOfValues;
                        }
  
                    }
                }
             }

             
             
                   
        }
        // Now increment and continue the search
        i--;
        j--;
    }

}
