var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudokusolver(board, 0, 0, 9);
};

function isvalid(board, i, j, num, n)
{
    //row and column check
    for(let x=0;x<n;x++)
    {
        if(board[i][x]==num || board[x][j]==num)
        {
            return false;
        }
    }
    
    //submatrix check
    let rn = Math.sqrt(n);
    let subi = i- i % rn;
    let subj = j- j % rn;
    for(let x= subi; x < subi + rn ;x++)
    {
        for (let y = subj; y < subj + rn; y++)
        {
            if(board[x][y]==num){
                return false;
            }
        }
    }
    return true;    

}  

function sudokusolver( board, i, j, n)
{
    // base class
    if(i==n)
    {
        //print(board,n);
        FillBoard(board)
        return true;
    }

    // if we are not inside the board **
    if(j==n)
    {
        return sudokusolver(board,i+1,0,n);
    }

    //if cell is already filled.. move ahead
    if(board[i][j]!=0)
    {
        return sudokusolver(board,i,j+1,n);
    }

    //we try to fill the cell with an appropriate number

    for(let num=1;num<=9;num++)
    {
        // to check if num can be filled
        if(isvalid(board,i,j,num,n))
        {
            board[i][j]=num;
            let subAns= sudokusolver(board,i,j+1,n);
            if(subAns)
            {
                return true;
            }
            // backtracking -> undo the change
            board[i][j]=0;
        }
    }
    return false;
}