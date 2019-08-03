const DESK = document.getElementById("desk");

const Q_VERT = 8; // количество вертикалей
const Q_HOR = 8;  // количество горизонталей

/*
let Cell = {
  id: 0,
  pos_vert: 0,
  pos_hor: 0,
  color: 0,   // 0 - white, 1 - black
  status: -1   // -1 - white, 0  - blank, 1 - chk_white, 2 - chk_black, 3 - king_white, 4 - king_black
}
*/

const FREE = '';
const CHK_WHITE = 'url(image/WCh.png)';
const CHK_BLACK = 'url(image/BCh.png)';
const KING_WHITE = 'url(image/WK.png)';
const KING_BLACK = 'url(image/BK.png)';

var arrayDIV = [Q_VERT][Q_HOR];


function createArray(rows, columns){
  let arr = [columns];
  for(let i = 0; i < rows; i++){
    arr[i] = [];
  }
  return arr;
}


function initCells(){
  let index_cell = 1;
  let arrayCells = createArray(Q_VERT,Q_HOR);
  for (let i = 0; i < Q_VERT; i++){
    for(let j= 0; j < Q_HOR; j++){
      let c = {};
      c.id = index_cell;
      index_cell++;
      c.pos_hor = j+1;
      c.pos_vert = i+1;
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


function drawCells(width, height, cells){
  let arrayCells = initCells();
  let arrayStatus = createArray(Q_VERT,Q_HOR);
//  let height_cell = 50;
//  let width_cell = 50;
//  let height_desk = width_cell * Q_HOR + Q_HOR * 2;
//  let width_desk = height_cell * Q_VERT + Q_VERT * 2;

  for(let i = 1; i <= width; i++){
    for(let j = 1; j <= height; j++){
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
      cell.id = i + "_" + j;
      arrayStatus[Q_VERT-i][j-1] = cell; 
      DESK.appendChild(cell);
    }
  }
return arrayStatus;
}


arrayDIV = (drawCells(Q_HOR,Q_VERT,null));
console.log( arrayDIV );




