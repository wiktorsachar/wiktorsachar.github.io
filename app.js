/* Chess board. Program is to choose at random one of the chess piece (except the pawn) and place it 
at the random spot on the board. After placing any piece (except first one) check all present pieces move 
ranges and see if any can reach other piece. Is so Give that pieces position and quit program. 
author: Wiktor Sacharczuk,
github: https://github.com/wiktorsachar
purpose: exercise for Javascript Developer Studies, Bialystok University of Technology,
v3*/

class Draw {
  constructor() {
    this.board = new Chessboard();
  }
  chessboard(canvasId) {
    let canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      let column = 0;
      let row = 0;
      let fieldColorSwitch = 1;
      let darkColor = "#998013";
      let lightColor = "#f2e5ab";
      let size = 50;
      for (let i = 0; i < 64; i++) {
        if (fieldColorSwitch === 1) {
          ctx.fillStyle = darkColor;
          ctx.fillRect(column, row, size, size);
          fieldColorSwitch = 0;
        } else {
          ctx.fillStyle = lightColor;
          ctx.fillRect(column, row, size, size);
          fieldColorSwitch = 1;
        }
        column = column + size;
        if (column === size * 8) {
          column = 0;
          row = row + size;
          if (fieldColorSwitch === 0) {
            fieldColorSwitch = 1;
          } else {
            fieldColorSwitch = 0;
          }
        }
      }
    }
  }
  figure(canvasId, position, type, color) {
    let canvas = document.getElementById(canvasId);
    let size = 50;
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      const figure = new Image();
      figure.src = `./figures/${type}${color}.svg`;
      figure.onload = function() {
        ctx.drawImage(figure, position.x * size, position.y * size, size, size);
      };
    }
  }
  coordinatesX(canvasId) {
    let canvas = document.getElementById(canvasId);
    let size = 50;
    let x = 25;
    let y = 396;
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = "#564203";
        ctx.font = "bold 12px serif";
        ctx.fillText(this.board.coordinateConventerX(i), x, y);
        x = x + size;
      }
    }
  }
  coordinatesY(canvasId) {
    let canvas = document.getElementById(canvasId);
    let size = 50;
    let x = 4;
    let y = 25;
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      for (let j = 0; j < 8; j++) {
        ctx.fillStyle = "#564203";
        ctx.font = "bold 12px serif";
        ctx.fillText(this.board.coordinateConventerY(j), x, y);
        y = y + size;
      }
    }
  }
  init(canvasId, firstPosition, secondPosition, firstType, secondType) {
    this.chessboard(canvasId);
    this.coordinatesX(canvasId);
    this.coordinatesY(canvasId);
    this.figure(canvasId, firstPosition, firstType, "white");
    this.figure(canvasId, secondPosition, secondType, "black");
  }
}

class Chessboard {
  coordinateConventerX(positionX) {
    let x;
    switch (positionX) {
      case 0:
        x = "A";
        break;
      case 1:
        x = "B";
        break;
      case 2:
        x = "C";
        break;
      case 3:
        x = "D";
        break;
      case 4:
        x = "E";
        break;
      case 5:
        x = "F";
        break;
      case 6:
        x = "G";
        break;
      case 7:
        x = "H";
        break;
      default:
        break;
    }
    return x;
  }
  coordinateConventerY(positionY) {
    let y;
    switch (positionY) {
      case 0:
        y = "8";
        break;
      case 1:
        y = "7";
        break;
      case 2:
        y = "6";
        break;
      case 3:
        y = "5";
        break;
      case 4:
        y = "4";
        break;
      case 5:
        y = "3";
        break;
      case 6:
        y = "2";
        break;
      case 7:
        y = "1";
        break;
      default:
        break;
    }
    return y;
  }
  coordinateConventer(position) {
    if (!position) {
      return "FALSE";
    } else {
      return (
        this.coordinateConventerX(position.x) +
        this.coordinateConventerY(position.y)
      );
    }
  }
  create() {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }
}

class Figures {
  rook(board, position) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if ((y === position.y || x === position.x) && board[y][x] === "E") {
          return { x, y };
        }
      }
    }
    return false;
  }
  bishop(board, position) {
    let amplitude = -position.y;
    for (let y = 0; y < board.length; y++) {
      let firstExpectedX = position.x - amplitude;
      let secondExpectedX = position.x + amplitude;
      if (
        firstExpectedX > -1 &&
        firstExpectedX < 8 &&
        board[y][firstExpectedX] === "E"
      ) {
        return {
          x: firstExpectedX,
          y
        };
      }
      if (
        secondExpectedX > -1 &&
        secondExpectedX < 8 &&
        board[y][secondExpectedX] === "E"
      ) {
        return {
          x: secondExpectedX,
          y
        };
      }
      amplitude++;
    }
    return false;
  }
  queen(board, position) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if ((y === position.y || x === position.x) && board[y][x] === "E") {
          return { x, y };
        }
      }
    }
    let amplitude = -position.y;
    for (let y = 0; y < board.length; y++) {
      let firstExpectedX = position.x - amplitude;
      let secondExpectedX = position.x + amplitude;
      if (
        firstExpectedX > -1 &&
        firstExpectedX < 8 &&
        board[y][firstExpectedX] === "E"
      ) {
        return {
          x: firstExpectedX,
          y
        };
      }
      if (
        secondExpectedX > -1 &&
        secondExpectedX < 8 &&
        board[y][secondExpectedX] === "E"
      ) {
        return {
          x: secondExpectedX,
          y
        };
      }
      amplitude++;
    }
    return false;
  }
  horse(board, position) {
    if (position.y - 2 > -1) {
      if (
        position.x - 1 > -1 &&
        board[position.y - 2][position.x - 1] === "E"
      ) {
        return {
          x: position.x - 1,
          y: position.y - 2
        };
      }
      if (position.x + 1 < 8 && board[position.y - 2][position.x + 1] === "E") {
        return {
          x: position.x + 1,
          y: position.y - 2
        };
      }
    }
    if (position.y - 1 > -1) {
      if (
        position.x - 2 > -1 &&
        board[position.y - 1][position.x - 2] === "E"
      ) {
        return {
          x: position.x - 2,
          y: position.y - 1
        };
      }
      if (position.x + 2 < 8 && board[position.y - 1][position.x + 2] === "E") {
        return {
          x: position.x + 2,
          y: position.y - 1
        };
      }
    }
    if (position.y + 1 < 8) {
      if (
        position.x - 2 > -1 &&
        board[position.y + 1][position.x - 2] === "E"
      ) {
        return {
          x: position.x - 2,
          y: position.y + 1
        };
      }
      if (position.x + 2 < 8 && board[position.y + 1][position.x + 2] === "E") {
        return {
          x: position.x + 2,
          y: position.y + 1
        };
      }
    }
    if (position.y + 2 < 8) {
      if (
        position.x - 1 > -1 &&
        board[position.y + 2][position.x - 1] === "E"
      ) {
        return {
          x: position.x - 1,
          y: position.y + 2
        };
      }
      if (position.x + 1 < 8 && board[position.y + 2][position.x + 1] === "E") {
        return {
          x: position.x + 1,
          y: position.y + 2
        };
      }
    }
    return false;
  }
  king(board, position) {
    if (position.y - 1 > -1) {
      if (board[position.y - 1][position.x] === "E") {
        return {
          x: position.x,
          y: position.y - 1
        };
      }
      if (board[position.y - 1][position.x - 1] === "E") {
        return {
          x: position.x - 1,
          y: position.y - 1
        };
      }
      if (board[position.y - 1][position.x + 1] === "E") {
        return {
          x: position.x + 1,
          y: position.y - 1
        };
      }
    }
    if (position.y + 1 < 8) {
      if (board[position.y + 1][position.x] === "E") {
        return {
          x: position.x,
          y: position.y + 1
        };
      }
      if (board[position.y + 1][position.x - 1] === "E") {
        return {
          x: position.x - 1,
          y: position.y + 1
        };
      }
      if (board[position.y + 1][position.x + 1] === "E") {
        return {
          x: position.x + 1,
          y: position.y + 1
        };
      }
    }
    if (position.x - 1 > -1) {
      if (board[position.y][position.x - 1] === "E") {
        return {
          x: position.x - 1,
          y: position.y
        };
      }
      if (board[position.y][position.x + 1] === "E") {
        return {
          x: position.x + 1,
          y: position.y
        };
      }
    }
    return false;
  }
  random() {
    const figures = [this.rook, this.bishop, this.horse, this.queen, this.king];
    let randomizer = () => Math.floor(Math.random() * 5);
    let firstFigure = randomizer();
    let secondFigure = randomizer();
    while (firstFigure === secondFigure) {
      secondFigure = randomizer();
    }
    return {
      firstFigure: figures[firstFigure],
      secondFigure: figures[secondFigure]
    };
  }
}

class PositionRandomizer {
  randomizer() {
    return Math.floor(Math.random() * 8);
  }
  init() {
    return {
      x: this.randomizer(),
      y: this.randomizer()
    };
  }
}

class App {
  constructor(canvasId) {
    this.chessboard = new Chessboard();
    this.figures = new Figures();
    this.position = new PositionRandomizer();
    this.render = new Draw();
    this.canvasId = canvasId;
  }
  setPositions() {
    let firstFigure = this.position.init();
    let secondFigure = this.position.init();
    while (
      firstFigure.x === secondFigure.x &&
      firstFigure.y === secondFigure.y
    ) {
      secondFigure = this.position.init();
    }
    return {
      firstFigure,
      secondFigure
    };
  }
  prepareBoard(enemyPosition) {
    let board = this.chessboard.create();
    board[enemyPosition.y][enemyPosition.x] = "E";
    return board;
  }
  init() {
    let positions = this.setPositions();
    let figures = this.figures.random();
    let firstBeating = this.prepareBoard(positions.firstFigure);
    let secondBeating = this.prepareBoard(positions.secondFigure);
    let firstResult = figures.firstFigure(secondBeating, positions.firstFigure);
    let secondResult = figures.secondFigure(
      firstBeating,
      positions.secondFigure
    );
    this.render.init(
      this.canvasId,
      positions.firstFigure,
      positions.secondFigure,
      figures.firstFigure.name,
      figures.secondFigure.name
    );
    document.getElementById("first_figure").innerHTML = `First figure is: ${
      figures.firstFigure.name
    }, at ${this.chessboard.coordinateConventer(positions.firstFigure)}.`;
    document.getElementById("second_figure").innerHTML = `Second figure is: ${
      figures.secondFigure.name
    }, at ${this.chessboard.coordinateConventer(positions.secondFigure)}.`;
    document.getElementById("first_beating").innerHTML =
      "First figure can beat second figure: " +
      this.chessboard.coordinateConventer(firstResult);
    document.getElementById("second_beating").innerHTML =
      "Second figure can beat first figure: " +
      this.chessboard.coordinateConventer(secondResult);
  }
}

const app = new App("chessboard");

//https://github.com/wiktorsachar