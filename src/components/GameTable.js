import {useDispatch, useSelector} from "react-redux";
import {setClickedPiece, setPlayableSquares, movePiece} from "../redux/GameSlice/GameSlice";


export const GameTable = () => {
    const pattern = useSelector(state => state.game.pattern);
    const pieces = useSelector(state => state.game.pieces);
    const playerStatus = useSelector(state => state.game.playerStatus);
    const currentClickedPiece = useSelector(state => state.game.clickedPiece);
    const moveableColor = useSelector(state => state.game.moveableColor);
    const dispatch = useDispatch();

    let keyIndex = 0;

    const handlePieceClick = (e, color, sqCoords) => {
        let clickedPiece = findPieceByCoords(sqCoords);
        dispatch(setClickedPiece(clickedPiece));
        document.querySelector('.selectedPiece')?.classList.remove('selectedPiece');
        e.currentTarget.classList.toggle('selectedPiece');
        dispatch(setPlayableSquares(clickedPiece));
    }

    const handleSquareClick = (e, square) => {
        if (square.status === 'playable') {
            dispatch(movePiece(square.cords))
            console.log(e.currentTarget.classList,square);
        }
    }

    const findPieceByCoords = (coords) => {
        let square = pieces.white.find(piece => JSON.stringify(piece.patternCords) === coords) || pieces.black.find(piece => JSON.stringify(piece.patternCords) === coords);
        return square;
    }

    return (<div className={`gameTable container d-flex pt-4`}>
        <div className={`boardWrapper w-75`}>
            {pattern.map((row) => {
                keyIndex++;
                return (<div key={keyIndex} className={`boardRow row m-0`}>
                    {row.map((square) => {
                        keyIndex++
                        return (<div key={keyIndex} onClick={(e) => { handleSquareClick(e,square) }}
                                     className={`boardSquare col p-0 d-flex h-100 ${square.cords} ${(square.cords[0] + square.cords[1]) % 2 === 0 ? `bg-light` : `bg-secondary`} ${square.status === `playable` ? `bg-playable` : ``}`}>
                            {pieces.white.find(piece => JSON.stringify(piece.patternCords) === JSON.stringify(square.cords)) ?
                                <img className={`piece w-75 m-auto`} alt={`white`}
                                     src={`/images/white.png`}
                                     onClick={(e) => {
                                         if (moveableColor === 'white') {
                                             handlePieceClick(e, 'white', JSON.stringify(square.cords));
                                         }
                                     }}/> : pieces.black.find(piece => JSON.stringify(piece.patternCords) === JSON.stringify(square.cords)) ?
                                    <img className={`piece w-75 m-auto`} alt={`black`}
                                         src={`/images/black.png`}
                                         onClick={(e) => {
                                             if (moveableColor === 'black') {
                                                 handlePieceClick(e, 'moveableColor', JSON.stringify(square.cords));
                                             }
                                         }}/> : '\u00A0'}
                        </div>)
                    })}
                </div>)
            })}
        </div>
        <div className={`infoWrapper w-25`}>
            <div>
                <p>White Plays</p>
                <img className={`w-50`} alt={`white`} src={`/images/white.png`}/>
            </div>
            <div>
                <p>Black Plays</p>
                <img className={`w-50`} alt={`black`} src={`/images/black.png`}/>
            </div>
        </div>
    </div>);

    // TODO : Piece aradan kaldırılacak white black tutuyorum zaten onlara göre yazdıracağım ekrana piecelerimi.
}


/*
    {pattern.map((value) => {
                return (
                    <div>
                        {value.map((val) => (
                            <div>
                                {val}
                            </div>
                        ))}
                    </div>
                )
            })
            }
*/
