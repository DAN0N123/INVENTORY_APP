import { playerShips, Game} from "./gameLoop.js";
import { blinkDiv } from "./randomFunctions.js";

export class Ship{
    static placeShipDOM(coordinates){
        const [y, x] = coordinates;
        try{
            const box = document.getElementById(`${y + 1}_${x}`)
            box.classList.add('ship');
            box.style.backgroundColor = 'black';
            box.style.backgroundImage = 'none';
        }catch{}
        
    }

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

    make_DOM_board(grid, game){
        this.DOM = grid;
        this.game = game;
        for(const row of this.board){
            let x = 0;
            for(const tile of row){
                const box = document.createElement('div');
                const y = this.board.indexOf(row) + 1;
                if(this.player === 'AI'){
                    box.id = `${y}_${x}_AI`
                }else{
                    box.id = `${y}_${x}`
                }
                
                box.classList.add('box');
                box.addEventListener('click', (event) => {
                    if(playerShips.length != 0){
                        const [y,x] = event.target.id.split('_')
                        console.log(y,x)
                        this.placeShip(playerShips[0], [Number(y) - 1, Number(x)])
                        playerShips.shift()
                    }
                })
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

    shipPlacement(){
        const playerBoard = document.querySelector('.player');
        playerBoard.addEventListener('mouseover', (event) => {
            if(playerShips.length != 0){
                for(const child of playerBoard.children){
                    if(child.classList.contains('box') && !child.classList.contains('ship')){
                        child.style.backgroundColor = 'none';
                        child.style.backgroundImage = "url('../MISC/water2.png')";
                    }
                }
                if(event.target.classList.contains('box')){
                const coordinates = event.target.id.split('_');
                const length = playerShips[0].length;
                const orientation = playerShips[0].orientation;
                if(orientation === 'horizontal'){
                    let tilesToColor = [event.target];
                    for(let i = 1; i < length; i++){
                        const id = `${coordinates[0]}_${Number(coordinates[1]) + i}`
                        const tile = document.getElementById(id);
                        tilesToColor.push(tile)
                    }
                    for(const tile of tilesToColor){
                        if(tile != null){
                            tile.style.backgroundImage = 'none'
                            tile.style.backgroundColor = 'black'
                        }
                        
                    }
                    tilesToColor = [];
                }else{
                    let tilesToColor = [event.target];
                    for(let i = 1; i < length; i++){
                        const id = `${Number(coordinates[0]) + i}_${coordinates[1]}`
                        const tile = document.getElementById(id);
                        tilesToColor.push(tile)
                    }
                    for(const tile of tilesToColor){
                        if(tile != null){
                            tile.style.backgroundImage = 'none'
                            tile.style.backgroundColor = 'black'
                        }
                        
                    }
                    tilesToColor = [];
                }
                }
            }
            
        })
    }

    placeShip(ship, coordinates){
        if((ship.orientation === 'vertical' && coordinates[0] + ship.length - 1 <= 9) && (coordinates[0] <= 9 && coordinates[1] <= 9) && !this.isShipInWay(ship, coordinates)){
            for(let i = 0; i < ship.length; i++){
                this.board[coordinates[0] + i][coordinates[1]] = ship;
                Ship.placeShipDOM([coordinates[0] + i, coordinates[1]]);
                this.shipPlacement();
                if(playerShips.length === 1){
                    this.game.startBattle()
                }
            }
        }else if((ship.orientation === 'horizontal' && coordinates[1] + ship.length - 1 <= 9) && (coordinates[0] <= 9 && coordinates[1] <= 9) && !this.isShipInWay(ship, coordinates)){
            for(let i = 0; i < ship.length; i++){
                this.board[coordinates[0]][coordinates[1] + i] = ship;
                Ship.placeShipDOM([coordinates[0], coordinates[1] + i]);
                this.shipPlacement();
                if(playerShips.length === 1){
                    this.game.startBattle()
                }
            }
        }else{
            blinkDiv(this.DOM)
            throw new Error(`error occured while placing ship / data: Ship - Length ${ship.length} Orientation ${ship.orientation}, Coordinates - ${coordinates}`)
        };
    }

    receiveAttack(coordinates){
        if(typeof this.board[coordinates[0] - 1][coordinates[1]] === 'object'){
            const myShip = this.board[coordinates[0]][coordinates[1]];
            myShip.hit()
            const box = this.DOM.getElementById(coordinates.join('_'));
            box.classList.add('hit');
            this.game.round++
        }else{
            this.board[coordinates[0] - 1][coordinates[1]] = -1;
            console.log(this.DOM)
            const box = this.DOM.querySelector(`#${coordinates.join('_')}`);
            box.classList.add('hit');
            box.classList.add('missed');
            this.game.round++
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

const newGame = new Game();
newGame.initiateGame()
