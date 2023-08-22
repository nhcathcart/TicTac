import { useState } from "react";
import styles from "./TicTacToe.module.css";
import { motion } from "framer-motion";

export type Position = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export interface Board {
  "0": null | "X" | "O";
  "1": null | "X" | "O";
  "2": null | "X" | "O";
  "3": null | "X" | "O";
  "4": null | "X" | "O";
  "5": null | "X" | "O";
  "6": null | "X" | "O";
  "7": null | "X" | "O";
  "8": null | "X" | "O";
  currPlayer: "X" | "O";
  winner: null | "X" | "O";
}

export default function TicTacToe() {
  // The Tic Tac Toe board is represented as an object. Like so
  const positions: Position[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  const [boardState, setBoardState] = useState<Board>({
    "0": null,
    "1": null,
    "2": null,
    "3": null,
    "4": null,
    "5": null,
    "6": null,
    "7": null,
    "8": null,
    currPlayer: "X",
    winner: null,
  });

  const variants = {
    x: { opacity: 1, x: 0 },
    o: { opacity: 0, x: "-100%" },
  };

  function checkWin(board: any, player: "X" | "O") {
    const winners = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ];
    for (let i = 0; i < winners.length; i++) {
      if (
        board[winners[i][0]] === player &&
        board[winners[i][1]] === player &&
        board[winners[i][2]] === player
      ) {
        return true;
      }
    }
    return false;
  }

  function handleClick(position: Position, player: "X" | "O") {
    if (boardState[position] !== null || boardState.winner) return;
    const newBoard = { ...boardState };
    newBoard[position] = player;
    if (checkWin(newBoard, newBoard.currPlayer)) {
      newBoard.winner = player;
      setBoardState(newBoard);
      return 
    }
    newBoard.currPlayer = newBoard.currPlayer === "X" ? "O" : "X";
    setBoardState(newBoard);
    return
  }

  return (
    <>
      {/* SCOREBOARD */}
      <div className={styles.scoreBoardContainer}>
        <div className={styles.playerContainer} style={{ width: "20%" }}>
          <h1>X</h1>
        </div>
        <div
          className={styles.playerIndicatorContainer}
          style={{
            display: "flex",
            justifyContent:
              boardState.currPlayer === "X" ? "flex-start" : "flex-end",
            width: "80%",
          }}
        >
          <motion.div className={styles.playerIndicator} layout transition={{ duration: .4, type: "spring" }}/>
        </div>
        <div className={styles.playerContainer} style={{ width: "20%" }}>
          <h1>O</h1>
        </div>
      </div>
      {/* TICTAKTOEBOARD */}
      {boardState.winner && <h1>{`${boardState.winner} has won!!`}</h1>}
      <div className={styles.boardContainer}>
        <div className={styles.row0}>
          {positions.slice(0, 3).map((position, index) => (
            <div
              className={styles[`box${index}`]}
              key={position}
              onClick={() => handleClick(position, boardState.currPlayer)}
            >
              {boardState[position] && (
                <BoardCell player={boardState[position]} />
              )}
            </div>
          ))}
        </div>
        <div className={styles.row1}>
          {positions.slice(3, 6).map((position, index) => (
            <div
              className={styles[`box${index}`]}
              key={position}
              onClick={() => handleClick(position, boardState.currPlayer)}
            >
              {boardState[position] && (
                <BoardCell player={boardState[position]} />
              )}
            </div>
          ))}
        </div>
        <div className={styles.row2}>
          {positions.slice(6, 9).map((position, index) => (
            <div
              className={styles[`box${index}`]}
              key={position}
              onClick={() => handleClick(position, boardState.currPlayer)}
            >
              {boardState[position] && (
                <BoardCell player={boardState[position]} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

interface BoardCellProps {
  player: "X" | "O" | null;
}
export function BoardCell({ player }: BoardCellProps) {
  const isX = player === "X";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={.25}
      stroke="currentColor"
      height="100%"
      width="100%"
      className={styles.svgXO}
      style={{flexGrow: 0}}
    >
      {isX ? (
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
          key="x"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: .4 }}
        />
      ) : (
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth=".25"
          fill="none"
          key="circle"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1.01 }}
          transition={{ duration: .4 }}
        />
      )}
    </svg>
  );
}
