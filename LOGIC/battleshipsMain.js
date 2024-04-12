import { mainGameLoop, placeShipDOM, playerShips} from "../LOGIC/DOMinteraction.js";

export class Ship{
    constructor(length, orientation){
        this.length = length;
        this.orientation = orientation;
        this.hits = 0;
        this.sunk = false;
    }
    hit(){
        this.hits++
        this.isSunk()
    }
    isSunk(){
        if(this.hits >= this.length){
            this.sunk = true;
        }
    }
}

export class Gameboard{

    constructor(player){
        this.player = player;
        this.board = [[0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0]]
    }

    make_DOM_board(grid){
        for(const row of this.board){
            let x = 0;
            for(const tile of row){
                const box = document.createElement('div');
                const y = this.board.indexOf(row) + 1;
                box.id = `${y},${x}`
                box.classList.add('box');
                if(playerShips != null){
                    box.addEventListener('click', (event) => {
                        if(playerShips.length != 0){
                            const [y,x] = event.target.id.split(',')
                            this.placeShip(playerShips[0], [Number(y) - 1, Number(x)])
                            playerShips.pop()
                        }
                    })
                }
                grid.appendChild(box);
                x++
            }
        }
    }
    isShipInWay(ship, coordinates){
        const y = coordinates[0];
        const x = coordinates[1];
        if(ship.orientation === 'horizontal'){
            for(let i = 0; i < ship.length; i++){
                if(typeof this.board[y][x + i] === 'object') return true
            }
        }else{
            for(let i = 0; i < ship.length; i++){
                if(typeof this.board[y + i][x] === 'object') return true
            }
        }
        return false

        
    }
    placeShip(ship, coordinates){
        if((ship.orientation === 'vertical' && coordinates[0] + ship.length - 1<= 9) && (coordinates[0] < 9 && coordinates[1] < 9) && !this.isShipInWay(ship, coordinates)){
            for(let i = 0; i < ship.length; i++){
                this.board[coordinates[0] + i][coordinates[1]] = ship;
                placeShipDOM([coordinates[0] + i, coordinates[1]]);
            }
        }else if((ship.orientation === 'horizontal' && coordinates[1] + ship.length - 1 <= 9) && (coordinates[0] < 9 && coordinates[1] < 9) && !this.isShipInWay(ship, coordinates)){
            for(let i = 0; i < ship.length; i++){
                this.board[coordinates[0]][coordinates[1] + i] = ship;
                placeShipDOM([coordinates[0], coordinates[1] + i]);
            }
        }else throw new Error(`error occured while placing ship / data: Ship - Length ${ship.length} Orientation ${ship.orientation}, Coordinates - ${coordinates}`)
    }

    receiveAttack(coordinates){
        if(typeof this.board[coordinates[0]][coordinates[1]] === 'object'){
            const myShip = this.board[coordinates[0]][coordinates[1]];
            myShip.hit()
        }else{
            this.board[coordinates[0]][coordinates[1]] = -1;
        }
    }

    isGameOver(){
        for(const row of this.board){
            for(const ship of row){
                if(typeof ship === 'object' && ship.hits !== ship.length){
                    return false
                }
            }
        }
        return true
    }
}

export class Player {
    constructor(name){
        this.name = name;
        this.ships = [];
        this.lost = false;
    }
}

mainGameLoop()


