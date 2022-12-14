
export const checkGameEnd = (pattern, movableColor) => {
    let result = true;
    var oppositeColor = movableColor === 'white' ? 'black' : 'white';

    for (let i = 0; i < pattern.length; i++) {
        pattern[i].forEach((square, index) => {
            console.log(square.status);
            if (square.status === oppositeColor) {
                return result = false;
            }
        })
    }
    return result;
}

export const playableControl = (currentCords, pattern, movableColor) => {

    var beatablePieces = [];
    var gamePattern = cleanPlayables(pattern);
    var oppositeColor = movableColor === 'white' ? 'black' : 'white';
    for (let i = 0; i < gamePattern.length; i++) {
        gamePattern[i].forEach((square, index) => {
            // one square back control (x - 1 check)
            if (square.cords[0] === (currentCords[0] - 1) && square.cords[1] === currentCords[1]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i - 1] !== 'undefined' && (gamePattern[i - 1][index].status === 'empty' || gamePattern[i - 1][index].status === 'playable')) {
                    beatablePieces.push(square.cords);
                    gamePattern[i - 1][index].status = 'playable';
                }

            }

            //one square forward control (x + 1 check)
            if (square.cords[0] === (currentCords[0] + 1) && square.cords[1] === currentCords[1]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i + 1] !== 'undefined' && (gamePattern[i + 1][index].status === 'empty' || gamePattern[i + 1][index].status === 'playable')) {
                    beatablePieces.push(square.cords);
                    gamePattern[i + 1][index].status = 'playable';
                }

            }


            //one square right control (y + 1 check)
            if (square.cords[1] === (currentCords[1] - 1) && square.cords[0] === currentCords[0]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i][index - 1] !== 'undefined' && (gamePattern[i][index - 1].status === 'empty' || gamePattern[i][index - 1].status === 'playable')) {
                    beatablePieces.push(square.cords);
                    gamePattern[i][index - 1].status = 'playable';
                }

            }

            //one square left control (y - 1 check)
            if (square.cords[1] === (currentCords[1] + 1) && square.cords[0] === currentCords[0]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i][index + 1] !== 'undefined' && (gamePattern[i][index + 1].status === 'empty' || gamePattern[i][index + 1].status === 'playable')) {
                    beatablePieces.push(square.cords);
                    gamePattern[i][index + 1].status = 'playable';
                }

            }

        });
    }


    return {'gamePattern': gamePattern, 'beatablePieces': beatablePieces};
}

export const cleanPlayables = (pattern) => {

    for (let i = 0; i < pattern.length; i++) {
        pattern[i].forEach((square, index) => {
            square.status = square.status === 'playable' ? 'empty' : square.status;
        });
    }

    return pattern;
}

export const updatePatternViaMove = (pattern, clickedPiece, clickedSquare, color, beatablePieces) => {
    var clickedSquareXminus = [clickedSquare[0] - 1, clickedSquare[1]];
    var clickedSquareYminus = [clickedSquare[0], clickedSquare[1] - 1];
    var clickedSquareXplus = [clickedSquare[0] + 1, clickedSquare[1]];
    var clickedSquareYplus = [clickedSquare[0], clickedSquare[1] + 1];
    var changeColor = true;
    for (let i = 0; i < pattern.length; i++) {
        pattern[i].forEach((square, index) => {

            //Setting status of clicked square
            if (square.cords[0] === clickedSquare[0] && square.cords[1] === clickedSquare[1]) {
                square.status = color;
            }

            //Setting status of beated square
            for (let j = 0; j < beatablePieces.length; j++) {

                if (JSON.stringify(beatablePieces[j]) === JSON.stringify(square.cords)
                    &&
                    (JSON.stringify(beatablePieces[j]) === JSON.stringify(clickedSquareXminus)
                        || JSON.stringify(beatablePieces[j]) === JSON.stringify(clickedSquareYminus)
                        || JSON.stringify(beatablePieces[j]) === JSON.stringify(clickedSquareXplus)
                        || JSON.stringify(beatablePieces[j]) === JSON.stringify(clickedSquareYplus))) {
                    square.status = 'empty';
                    changeColor = false;
                }
            }

            //Cleaning clicked piece
            if (square.cords[0] === clickedPiece[0] && square.cords[1] === clickedPiece[1]) {
                square.status = 'empty'
            }
        });
    }

    return {
        pattern : cleanPlayables(pattern),
        color: changeColor ? color === 'white' ? 'black' : 'white' : color
    };
}
