import { useState } from "react";

export default function MatrixGame() {
  const [matrix, setMatrix] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill("antiquewhite"))
  );
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    let isLastBox = false;
    if (matrix[row][col] === "antiquewhite") {
      const newMatrix = matrix.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? "green" : c))
      );
      setMatrix(newMatrix);
      setClickOrder([...clickOrder, { row, col }]);

      if (clickOrder.length === 8) {
        isLastBox = true;
      }
    }

    if (isLastBox) {
      triggerSequence(row, col);
    }
  };

  const triggerSequence = (row, col) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < clickOrder.length) {
        const { row, col } = clickOrder[index];
        setMatrix((prevMatrix) => {
          const newMatrix = prevMatrix.map((r, i) =>
            r.map((c, j) => (i === row && j === col ? "orange" : c))
          );
          return newMatrix;
        });
        index++;
      } else if (index === clickOrder.length) {
        setMatrix((prevMatrix) => {
          const newMatrix = prevMatrix.map((r, i) =>
            r.map((c, j) => (i === row && j === col ? "orange" : c))
          );
          return newMatrix;
        });
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div className="outer-div">
      {matrix.map((row, i) =>
        row.map((color, j) => (
          <div className="inner-div"
            key={`${i}-${j}`}
            onClick={() => handleClick(i, j)}
            style={{
              backgroundColor: color
            }}
          ></div>
        ))
      )}
    </div>
  );
}
