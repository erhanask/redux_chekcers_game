import {current} from "@reduxjs/toolkit";

export const playableControl = (currentCords, pattern, movableColor) => {

    var gamePattern = cleanPlayables(pattern);
    var oppositeColor = movableColor === 'white' ? 'black' : 'white';
    for (let i = 0; i < gamePattern.length; i++) {
        gamePattern[i].forEach((square, index) => {
            // one square back control (x - 1 check)
            if (square.cords[0] === (currentCords[0] - 1) && square.cords[1] === currentCords[1]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i - 1] !== 'undefined' && (gamePattern[i - 1][index].status === 'empty' || gamePattern[i - 1][index].status === 'playable')) {
                    gamePattern[i - 1][index].status = 'playable';
                }

            }

            //one square forward control (x + 1 check)
            if (square.cords[0] === (currentCords[0] + 1) && square.cords[1] === currentCords[1]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i + 1] !== 'undefined' && (gamePattern[i + 1][index].status === 'empty' || gamePattern[i + 1][index].status === 'playable')) {
                    gamePattern[i + 1][index].status = 'playable';
                }

            }


            //one square right control (y + 1 check)
            if (square.cords[1] === (currentCords[1] - 1) && square.cords[0] === currentCords[0]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i][index - 1] !== 'undefined' && (gamePattern[i][index - 1].status === 'empty' || gamePattern[i][index - 1].status === 'playable')) {
                    gamePattern[i][index - 1].status = 'playable';
                }

            }

            //one square left control (y - 1 check)
            if (square.cords[1] === (currentCords[1] + 1) && square.cords[0] === currentCords[0]) {

                if (square.status === 'empty' || square.status === 'playable') {
                    square.status = 'playable'
                } else if (square.status === oppositeColor && typeof gamePattern[i][index + 1] !== 'undefined' && (gamePattern[i][index + 1].status === 'empty' || gamePattern[i][index + 1].status === 'playable')) {
                    gamePattern[i][index + 1].status = 'playable';
                }

            }

        });
    }


    return gamePattern;
}

export const cleanPlayables = (pattern) => {

    for (let i = 0; i < pattern.length; i++) {
        pattern[i].forEach((square, index) => {
            square.status = square.status === 'playable' ? 'empty' : square.status;
        });
    }

    return pattern;
}

export const updatePatternViaMove = (pattern, clickedPiece, clickedSquare, color) => {
    console.log(current(pattern), current(clickedPiece), clickedSquare);

    for (let i = 0; i < pattern.length; i++) {
        pattern[i].forEach((square, index) => {

            //Setting status of clicked square
            if (square.cords[0] === clickedSquare[0] && square.cords[1] === clickedSquare[1]) {
                square.status = color;
            }

            //Cleaning clicked piece
            if (square.cords[0] === clickedPiece[0] && square.cords[1] === clickedPiece[1]) {
                square.status = 'empty'
            }
        });
    }

    return cleanPlayables(pattern);
}