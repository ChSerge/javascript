// Незаконченный вариант, требующий переработки и оптимизации
const DESK = document.getElementById("desk");			// Доска

//const START = document.getElementById("start");			// кнопка 	<Начать игру>
const CONTINUE = document.getElementById("continue");	// кнопка	<Начать новую партию>
const GAMEOVER = document.getElementById("gameover");	// кнопка	<Завершить игру>

const PLAYER = document.getElementById("pl_move");	// эд\лемент "players"

const Q_VERT = 8; // количество вертикалей
const Q_HOR = 8;  // количество горизонталей

/*
let Cell = {
  id: 0,
  pos_x: 0,
  pos_y: 0,
  color: 0,   // 0 - white, 1 - black
  status: -1   // -1 - white, 0  - blank, 1 - chk_white, 2 - chk_black, 3 - king_white, 4 - king_black, 5 - pass
}
*/

const FREE = '';
const CHK_WHITE = 'url(image/WCh.png)';
const CHK_BLACK = 'url(image/BCh.png)';
const KING_WHITE = 'url(image/WK.png)';
const KING_BLACK = 'url(image/BK.png)';

var arrayDIV = [Q_VERT][Q_HOR];
var arrayCells = initCells();
var arrayMatch = initCells();
var stack = [];
var selStack = [];
var tourCount = 0;      // номер поля (этапа), составляющего ход
var curStatus = -1;     // текущий статус поля
var arrayMoves = [];
var arrayPath = [];
var turnOrder = false;    // очередность хода false - white, true - black, 
var id1 = 0;


function createArray(rows, columns){
  let arr = [columns];
  for(let i = 0; i < rows; i++){
    arr[i] = [];
  }
  return arr;
}


function initCells() {
  let index_cell = 1;
  let arrayCells = createArray(Q_VERT,Q_HOR);
  for (let i = 0; i < Q_VERT; i++){
    for(let j= 0; j < Q_HOR; j++){
      let c = {};
      c.id = index_cell;
      index_cell++;
      c.pos_x = j+1;
      c.pos_y = i+1;
      c.status = 0;
      if(((i + j) % 2) == 0) {
        c.color = 0; 
        c.status = -1; 
      } else if (i < 3) {
        c.color = 1; 
        c.status = 2; 
      } else if (i < 5) {
        c.color = 1; 
        c.status = 0; 
      } else {
        c.color = 1; 
        c.status = 1; 
      }
    arrayCells[i][j] = c;
    }
  }
  return arrayCells;
}


function copyArray(arraySource) {
  let buffer;
  let arrayRes = createArray(Q_VERT,Q_HOR);
  for (let i = 0; i < Q_VERT; i++) {
    for (let j = 0; j < Q_HOR; j++) {
      buffer = arraySource[i][j];
      arrayRes[i][j] = buffer;
    }
  }
  return arrayRes;
} 


function drawCells(width, height, cells) {
  let arrayStatus = createArray(Q_HOR, Q_VERT);

  for(let i = 1; i <= height; i++){
    for(let j = 1; j <= width; j++){
      let cell = document.createElement("div");
      cell.className = "cell";
      if(arrayCells[i-1][j-1].color == 0){
        cell.className = "cell_white";        
      } else { 
        cell.className = "cell_black";        
      }      
      if (arrayCells[i-1][j-1].status == 1) {
        cell.style.backgroundImage = CHK_WHITE;
      } else if (arrayCells[i-1][j-1].status == 2) {
        cell.style.backgroundImage = CHK_BLACK;
      } else if (arrayCells[i-1][j-1].status == 3) {
        cell.style.backgroundImage = KING_WHITE;
      } else if (arrayCells[i-1][j-1].status == 4) {
        cell.style.backgroundImage = KING_BLACK;
      } else {
        cell.style.backgroundImage = FREE;
      } 
      cell.id = String(Q_HOR-i+1) + String(j);
      arrayStatus[Q_VERT-i][j-1] = cell; 
      DESK.appendChild(cell);
    }
  }
  return arrayStatus;
}


function overturnArray(sourceArray, width, height) {
   let targetArray  = createArray(height,width);
   for (let i = 0; i < height; i++){
     for (let j = 0; j < width; j++){
       targetArray[i][j] = sourceArray[height-1- i][j]; 
     }
   }
   return targetArray;
}


function buttonListener(elem, idThis) {
  elem.addEventListener("click", idThis, true);
}


function elemListener(elem, idThis) {
  elem.addEventListener("click", idThis, true);
}


function elemRemoveListener(elem, idThis) {
  elem.removeEventListener("click", idThis);
}


function buttonRemoveListener(elem, idThis) {
  elem.removeEventListener("click", idThis);
}

	
function startThis() {
  console.log(`startThis ${this.id}`);
  buttonRemoveListener(START, startThis);
  break;
}

	
function continueThis() {
  console.log(`continueThis ${this.id}`);
  //continue;
}

	
function gameoverThis() {
  console.log(`gameoverThis ${this.id}`);
  //break;
}


function divListener() {
    let curTourCount = tourCount;
    for (let i = 1; i <= 8; i++){
      for (let j = 1; j <= 8; j++){
        if (arrayDIV[i-1][j-1].className == "cell_black") {  
          curStatus = arrayMatch[i-1][j-1].status;
          arrayDIV[i-1][j-1].addEventListener("click", addressThis, true);
        }  
      }
    }
}


function addressThis() {
  let x = -1; 
  let y = -1;
  let xx = 0; 
  let yy = 0;
  let jj = 0;

  console.log("this - ",this);
  y = Math.floor(Number(this.id) / 10);
  x = (Number(this.id) % 10);
  console.log(y, '-', x);
  if ((tourCount < 1) && (arrayMatch[y-1][x-1].status > 0)) {
    for (let i = 0; i <= (arrayMoves.length - 1); i++) {
      if (arrayMoves[i][0].id == arrayMatch[y-1][x-1].id) {
        id1 = arrayMoves[i][0].id;
        this.style.backgroundColor = 'yellow';
        //this.style.backgroundImage = FREE;
        selStack.push (this.id);

        stack.push(this.id);
        console.log(stack[tourCount]);
        console.log(stack);
        tourCount++;
        //endMove = false;
        return ;
      }  
    }
  } else if (tourCount > 0) {
      for (let i = 0; i <= (arrayMoves.length - 1); i++) {
        if ((arrayMoves[i][0].id == id1)) {
          for (let j = 0; j <= (arrayMoves[i].length - 1); j++) {
            if (arrayMoves[i][j].id == arrayMatch[y-1][x-1].id) {
              tourCount++;
              jj = arrayMoves[i].length - 1;
              console.log(`j - length ${j}-${jj}`);
              if (j == (arrayMoves[i].length - 1)) {
                for (n = 0; n <= (arrayPath[i].length - 1); n++) {
                  xx = arrayPath[i][n].pos_x - 1;
                  yy = Q_VERT - arrayPath[i][n].pos_y;
                  console.log(`yy-xx ${yy}-${xx}`);
                  arrayDIV[yy][xx].style.backgroundImage = FREE;
                  arrayDIV[yy][xx].style.backgroundColor = FREE;
                  arrayMatch[yy][xx].status = 0; 
                }
                let last = arrayPath[i].length - 1;
                xx = arrayPath[i][last].pos_x - 1;
                yy = Q_VERT - arrayPath[i][last].pos_y;
                  
                if (turnOrder) {
                  arrayMatch[yy][xx].status = 2; 
                  this.style.backgroundImage = CHK_BLACK;
                } else {
                  arrayMatch[yy][xx].status = 1; 
                  this.style.backgroundImage = CHK_WHITE;
                }
                endMove();
                return
              }
              this.style.backgroundColor = 'orange';
              selStack.push (this.id);
              stack.push(this.id);
              console.log(stack[tourCount]);
              console.log(stack);
              return 
            }
          }
        }
      }
  }  
}


function divRemoveListener() {
  let curTourCount = tourCount - 1;
  curStatus = -1;
  for(let i = 1; i <= 8; i++) {
    for(let j = 1; j <= 8; j++) {
      if(arrayDIV[i-1][j-1].className == "cell_black") {  
        curStatus = arrayMatch[i-1][j-1].status;
        arrayDIV[i-1][j-1].removeEventListener("click", addressThis);
      }      
    }
  }
}


function endMove () {
  turnOrder = !turnOrder;
  console.log("arrayMatch \n", arrayMatch);
  tourCount = 0;
  allMoves(Q_HOR, Q_VERT);
  console.log("arrayMoves\n", arrayMoves);
}  


function allMoves(width, height) {
  let enumCapture = 0; // счетчик взятых шашек за один ход
  let lengthM = 0;
  //let x, y;
  let own_chk, own_king, opp_chk, opp_king;

  clearArray();

  let arrayCopyMatch = copyArray(arrayMatch);

  arrayMoves = [];
  arrayPath = [];
  if (turnOrder) {
    PLAYER.style.backgroundColor = "black";
    own_chk = 2;
    own_king = 4
    opp_chk = 1;
    opp_king = 3;
  } else {
    PLAYER.style.backgroundColor = "white";
    own_chk = 1;
    own_king = 3;
    opp_chk = 2;
    opp_king = 4;
  }
  
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      // на этом поле шашка игрока, чей ход?
      if (arrayCopyMatch[y][x].status == own_chk || arrayCopyMatch[y][x].status == own_king) {  
        chkCapture (x, y, enumCapture, arrayCopyMatch);
      }
    }
  }     
  // просмотр соседних полей на предмет хода шашки
  lengthM = arrayMoves.length;
  console.log(`lengthM ${lengthM}`);
  if (lengthM == 0) {
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        chkMove (x, y, arrayCopyMatch);
      }
    }
  }
}


function chkMove (x, y, arrayCopyMatch) {
  let length0 = arrayMoves.length;
  if (turnOrder && (y >= 1 && x >= 1) && (arrayCopyMatch[y][x].status == 2) && (arrayCopyMatch[y-1][x-1].status == 0)) {
    addMove (x, y);
    length0 = arrayMoves.length - 1 ;
    arrayMoves[length0].push (arrayCopyMatch[y-1][x-1]);  
    arrayPath[length0].push (arrayCopyMatch[y-1][x-1]);  
  } 
  // вниз-вправо для шашки
  if (turnOrder && (y >= 1 && x <= 6) && (arrayCopyMatch[y][x].status == 2) && (arrayCopyMatch[y-1][x+1].status == 0)) {
    addMove (x, y);
    length0 = arrayMoves.length - 1 ;
    arrayMoves[length0].push (arrayCopyMatch[y-1][x+1]);
    arrayPath[length0].push (arrayCopyMatch[y-1][x+1]);  
  } 
  //вверх-влево для шашки
  if (!turnOrder && (y <= 6 && x >= 1 ) && (arrayCopyMatch[y][x].status == 1) && (arrayCopyMatch[y+1][x-1].status == 0)) {
    addMove (x, y);
    length0 = arrayMoves.length - 1 ;
    arrayMoves[length0].push (arrayCopyMatch[y+1][x-1]);
    arrayPath[length0].push (arrayCopyMatch[y+1][x-1]);  
  } 
  //вверх-вправо для шашки
  if (!turnOrder && (y <= 6 && x <= 6) && (arrayCopyMatch[y][x].status == 1) && (arrayCopyMatch[y+1][x+1].status == 0)) {
    addMove (x, y);
    length0 = arrayMoves.length - 1 ;
    arrayMoves[length0].push (arrayCopyMatch[y+1][x+1]);
    arrayPath[length0].push (arrayCopyMatch[y+1][x+1]);  
  }
}


function addMove (x, y) {
  let length0 = arrayMoves.length;
  arrayMoves[length0] = [];
  arrayPath[length0] = [];
  arrayMoves[length0].push (arrayMatch[y][x]);
  arrayPath[length0].push (arrayMatch[y][x]);
}


function chkCapture (x, y, enumCapture, arrayCopyMatch, it = 0) {
  let own_chk, own_king, opp_chk, opp_king;
  let terminal = 6;
  let pass = 5;
  let blank = 0;

  var x0 = 0;
  var y0 = 0;
  
  if (turnOrder) {
    own_chk = 2;
    own_king = 4
    opp_chk = 1;
    opp_king = 3;
  } else {
    own_chk = 1;
    own_king = 3;
    opp_chk = 2;
    opp_king = 4;
  }

  if (enumCapture == 0) {
    x0 = x;
    y0 = y;
  }

  // взятие шашкой вниз-влево
  if ((y >= 2 && x >= 2) && (arrayCopyMatch[y-1][x-1].status == opp_chk || arrayCopyMatch[y-1][x-1].status == opp_king) && (arrayCopyMatch[y-2][x-2].status == 0)) {
    ifNewMove (x, y, enumCapture, it);
    if (!arrayMoves.includes(arrayCopyMatch[y-2][x-2])) {
      if (it > 0) {
        arrayCopyMatch[y][x].status =  pass;
		  }
      arrayMoves[length0].push (arrayCopyMatch[y-2][x-2]);  
      arrayPath[length0].push (arrayCopyMatch[y-1][x-1]);  
      arrayPath[length0].push (arrayCopyMatch[y-2][x-2]); 
      arrayCopyMatch[y-2][x-2].status =  terminal;
      enumCapture++;
      chkCapture (x-2, y-2, enumCapture, arrayCopyMatch, 1);
    }
  }  
  // взятие шашкой вниз-вправо
  if ((y >= 2 && x <= 5) && (arrayCopyMatch[y-1][x+1].status == opp_chk || arrayCopyMatch[y-1][x+1].status == opp_king) && (arrayCopyMatch[y-2][x+2].status == 0)) {
    ifNewMove (x, y, enumCapture, it);
    if (!(arrayMoves.includes(arrayCopyMatch[y-2][x+2]))) {
      if (it > 0) {
          arrayCopyMatch[y][x].status =  pass;
	    }
      arrayMoves[length0].push (arrayCopyMatch[y-2][x+2]);  
      arrayPath[length0].push (arrayCopyMatch[y-1][x+1]);  
      arrayPath[length0].push (arrayCopyMatch[y-2][x+2]);  
      arrayCopyMatch[y-2][x+2].status =  terminal;
      enumCapture++;
      chkCapture (x+2, y-2, enumCapture, arrayCopyMatch, 1);
    }   
  } 
  // взятие шашкой вверх-влево
  if ((y <= 5 && x >= 2) && (arrayCopyMatch[y+1][x-1].status == opp_chk || arrayCopyMatch[y+1][x-1].status == opp_king) && (arrayCopyMatch[y+2][x-2].status == 0)) {
    ifNewMove (x, y, enumCapture, it);
    if (!(arrayMoves.includes(arrayCopyMatch[y+2][x-2]))) {
      if (it > 0) {
        arrayCopyMatch[y][x].status =  pass;
	    }
      arrayMoves[length0].push (arrayCopyMatch[y+2][x-2]);  
      arrayPath[length0].push (arrayCopyMatch[y+1][x-1]);  
      arrayPath[length0].push (arrayCopyMatch[y+2][x-2]);  
      arrayCopyMatch[y+2][x-2].status =  terminal;
      enumCapture++;
      chkCapture (x-2, y+2, enumCapture, arrayCopyMatch, 1);
    }
  }  
  // взятие шашкой вверх-вправо
  if ((y <= 5 && x <= 5) && (arrayCopyMatch[y+1][x+1].status == opp_chk || arrayCopyMatch[y+1][x+1].status == opp_king) && (arrayCopyMatch[y+2][x+2].status == 0)) {
      ifNewMove (x, y, enumCapture, it);
    if (!(arrayMoves.includes(arrayCopyMatch[y+2][x+2]))) {
      if (it > 0) {
        arrayCopyMatch[y][x].status =  pass;
	    }
      arrayMoves[length0].push (arrayCopyMatch[y+2][x+2]);  
      arrayPath[length0].push (arrayCopyMatch[y+1][x+1]);  
      arrayPath[length0].push (arrayCopyMatch[y+2][x+2]);  
      arrayCopyMatch[y+2][x+2].status =  terminal;
      enumCapture++;
      chkCapture (x+2, y+2, enumCapture, arrayCopyMatch, 1);
    }
  }  
}


function ifNewMove (x, y, enumCapture, it) {
  if (it == 0) {
    length0 = arrayMoves.length;
    arrayMoves[length0] = [];
    arrayMoves[length0].push (arrayMatch[y][x]);
    arrayPath [length0] = [];
    arrayPath [length0].push (arrayMatch[y][x]);
  }
}


function clearArray() {
  for (let i = 0; i < Q_VERT; i++) {
    for (let j = 0; j < Q_HOR; j++) {
      if (arrayMatch[i][j].status > 4) {
        arrayMatch[i][j].status = 0;
      }
    }
  }
}


function initGame() {
  arrayDIV = drawCells(Q_HOR, Q_VERT, null); 
  console.log("arrayDIV\n",arrayDIV); 
  arrayMatch = overturnArray(arrayCells, Q_HOR, Q_VERT); 
  console.log("arrayMatch\n", arrayMatch); 
  turnOrder = 0;
  allMoves(Q_HOR, Q_VERT);
  console.log("arrayMoves\n", arrayMoves);
  divListener();
}


function divListener() {
    let curTourCount = tourCount;
    for (let i = 1; i <= 8; i++){
      for (let j = 1; j <= 8; j++){
        if (arrayDIV[i-1][j-1].className == "cell_black") {  
          curStatus = arrayMatch[i-1][j-1].status;
          arrayDIV[i-1][j-1].addEventListener("click", addressThis, true);
        }  
      }
    }
}


let newGame = true;
let onceAgain = true;

arrayDIV = drawCells(Q_HOR, Q_VERT, null); 
console.log("arrayDIV\n",arrayDIV); 
arrayMatch = overturnArray(arrayCells, Q_HOR, Q_VERT); 
console.log("arrayCells\n", arrayCells); 
console.log("arrayMatch\n", arrayMatch); 

allMoves(Q_HOR, Q_VERT);
console.log("arrayMoves\n", arrayMoves);
divListener();
  


