import { playerShips, Game} from "./gameLoop.js";
import { blinkDiv, closeDialog, openDialog, resetGame} from "./randomFunctions.js";

const playAgainButton = document.querySelector('.playAgainButton');
playAgainButton.addEventListener('click', () => {
    closeDialog()
    resetGame()
})


export class Ship{
    static placeShipDOM(coordinates, isAi = false){
        const [y, x] = coordinates;
        try{
            if(isAi){
                const box = document.getElementById(`${y + 1}_${x}_AI`)
                box.classList.add('ship');
            }else{
                const box = document.getElementById(`${y + 1}_${x}`)
                box.classList.add('ship');
                box.style.backgroundColor = 'black';
                box.style.backgroundImage = 'none';
            }
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
        this.currentShips = 0;
        this.isAi = this.player.name === 'AI' ? true : false
    }

    make_DOM_board(grid, game){
        this.DOM = grid;
        this.game = game;
        for(const row of this.board){
            let x = 0;
            for(const tile of row){
                const box = document.createElement('div');
                const y = this.board.indexOf(row) + 1;
                if(this.player.name === 'AI'){
                    box.id = `${y}_${x}_AI`
                }else{
                    box.id = `${y}_${x}`
                }
                
                box.classList.add('box');
                if(!this.isAi){
                    box.addEventListener('click', (event) => {
                        console.log(playerShips)
                        if(playerShips.length != 0){
                            const [y,x] = event.target.id.split('_')
                            this.placeShip(playerShips[0], [Number(y) - 1, Number(x)])
                            if(playerShips.length != 0) playerShips.shift();
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
                Ship.placeShipDOM([coordinates[0] + i, coordinates[1]], this.isAi);
                this.shipPlacement();
                if(playerShips.length === 1 && !this.isAi){
                    playerShips.shift()
                    this.game.startBattle()
                }
            }
            this.currentShips++
        }else if((ship.orientation === 'horizontal' && coordinates[1] + ship.length - 1 <= 9) && (coordinates[0] <= 9 && coordinates[1] <= 9) && !this.isShipInWay(ship, coordinates)){
            for(let i = 0; i < ship.length; i++){
                this.board[coordinates[0]][coordinates[1] + i] = ship;
                Ship.placeShipDOM([coordinates[0], coordinates[1] + i], this.isAi);
                this.shipPlacement();
                if(playerShips.length === 1 && !this.isAi){
                    playerShips.shift()
                    this.game.startBattle()
                }
            }
            this.currentShips++
        }else{
            if(!this.isAi) blinkDiv(this.DOM);
            throw new Error(`error occured while placing ship / data: Ship - Length ${ship.length} Orientation ${ship.orientation}, Coordinates - ${coordinates}`);
        };
    }

    receiveAttack(coordinates){
        if(typeof this.board[coordinates[0] - 1][coordinates[1]] === 'object'){
            const myShip = this.board[coordinates[0] - 1][coordinates[1]];
            const box = document.getElementById(coordinates.join('_'));
            if(!box.classList.contains('hit')){
                myShip.hit()
                box.classList.add('hit');
                this.game.round++
                if(this.isGameOver()){
                    if(this.isAi) this.game.player.winGame(); else this.game.ai.winGame() 
                }
            }else{
                blinkDiv(this.DOM);
                return
            }
            
        }else{
            this.board[coordinates[0] - 1][coordinates[1]] = -1;
            const box = document.getElementById(coordinates.join('_'));
            if(!box.classList.contains('hit')){
                box.classList.add('hit');
                box.classList.add('missed');
                this.game.round++
                if(this.isGameOver()){
                    if(this.isAi) this.game.player.winGame(); else this.game.ai.winGame() 
                }
            }else{
                blinkDiv(this.DOM);
                return
            }
        }
        if(this.player.name === 'AI') {
            setTimeout(() => this.game.aiAttacks(), 1000)
        };
    }
    
    aiPlaceShips(){
        if(this.currentShips < 5){
            const length = Math.floor(Math.random() * 5) + 1;
            const orientation = ['vertical', 'horizontal'][Math.floor(Math.random() * 2 )];
            const myShip = new Ship(length, orientation);
            try{
                const y = Math.floor(Math.random() * 10);
                const x = Math.floor(Math.random() * 10);
                this.placeShip(myShip, [y,x]);
            }catch{};
            return this.aiPlaceShips();
        }else return;
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

    isGameLost(){
        for(const ship of this.ships){
            if(ship.sunk === false) return false;
        }return true
    }

    winGame(){
        const dialogText = document.querySelector('.shaker p');
        dialogText.textContent = `${this.name} has won the game!`
        openDialog()
    }
}

const newGame = new Game();
newGame.initiateGame()



