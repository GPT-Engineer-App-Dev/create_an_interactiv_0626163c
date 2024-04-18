import React, { useState } from "react";
import { Box, Button, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FaTimes, FaCircle } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    if (!calculateWinner(newBoard)) {
      setPlayer(player === "X" ? "O" : "X");
      if (isAIPlaying && player === "X") {
        const aiMove = calculateAIMove(newBoard);
        handleClick(aiMove);
      }
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const calculateAIMove = (board) => {
    const availableMoves = board.reduce((moves, cell, index) => {
      if (cell === null) moves.push(index);
      return moves;
    }, []);

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  const winner = calculateWinner(board);

  return (
    <Center h="100vh" flexDirection="column">
      <Heading mb={8}>Tic Tac Toe</Heading>
      <SimpleGrid columns={3} spacing={4} mb={8}>
        {board.map((cell, index) => (
          <Box key={index} w={20} h={20} bg="gray.100" display="flex" alignItems="center" justifyContent="center" fontSize="4xl" fontWeight="bold" cursor="pointer" onClick={() => handleClick(index)}>
            {cell === "X" ? <FaTimes color="red.500" /> : cell === "O" ? <FaCircle color="blue.500" /> : null}
          </Box>
        ))}
      </SimpleGrid>
      {winner ? (
        <Text fontSize="2xl" mb={4}>
          {winner === "X" ? "You win!" : "AI wins!"}
        </Text>
      ) : board.every((cell) => cell !== null) ? (
        <Text fontSize="2xl" mb={4}>
          It's a draw!
        </Text>
      ) : (
        <Text fontSize="2xl" mb={4}>
          {player === "X" ? "Your turn" : "AI's turn"}
        </Text>
      )}
      <Button onClick={resetGame} mr={4}>
        Reset Game
      </Button>
      <Button onClick={() => setIsAIPlaying(!isAIPlaying)} colorScheme={isAIPlaying ? "red" : "green"}>
        {isAIPlaying ? "Play with a Friend" : "Play with AI"}
      </Button>
    </Center>
  );
};

export default Index;
