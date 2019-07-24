const DESK = document.getElementById("desk");

const Q_VERT = 8; // количество вертикалей
const Q_HOR = 8;  // количество горизонталей

/*
let Cell = {
  id: 0,
  pos_vert: 0,
  pos_hor: 0,
  color: 0,   // 0 - white, 1 - black
  status: 0   // 0 - blank, 1 - chk_white, 2 - chk_black, 3 - king_white, 4 - king_black
}
*/


function createArray(rows, columns){
  let arr = [columns];
  for(let i = 0; i < rows; i++){
    arr[i] = [];
  }
  return arr;
}


function initCells(){
  let index_cell = 1;
  let arrayCells = createArray(8,8);
  for (let i = 0; i < Q_HOR; i++){
    for(let j= 0; j < Q_VERT; j++){
      let c = {};
      c.id = index_cell;
      index_cell++;
      c.pos_hor = j+1;
      c.pos_vert = i+1;
      c.status = 0;
      if(((i + j) % 2) == 0) {
        c.color = 0; 
      } else {
        c.color = 1; 
      }
    arrayCells[i][j] = c;
    }
  }
  return arrayCells;
}


function drawCells(width, height, cells){
  let arrayCells = initCells();
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
      cell.id = i + "_" + j;
      DESK.appendChild(cell);
    }
  }
}


(drawCells(Q_HOR,Q_VERT,null));
