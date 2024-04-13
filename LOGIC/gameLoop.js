import {Ship, Gameboard, Player} from './battleshipsMain.js';

export let playerShips = [];

export class Game {
    constructor(){
        this.round = 0;
        this.playerBox = document.querySelector('.player');
        this.aiBox = document.querySelector('.AI');
        const PLAYER = new Player('yo');
        this.gameboardPlayer = new Gameboard(PLAYER);
        this.gameboardAI = new Gameboard('AI');
    }

    initiateGame(){
        for(let i = 0; i < 5; i++){
            const length = Math.floor(Math.random() * 5) + 1;
            const orientation = ['vertical', 'horizontal'][Math.floor(Math.random() * 2 )];
            const myShip = new Ship(length, orientation)
            playerShips.push(myShip);
        }
        this.gameboardPlayer.make_DOM_board(this.playerBox, this);
        this.gameboardAI.make_DOM_board(this.aiBox, this);
        this.gameboardPlayer.shipPlacement();
    }

    startBattle(){ 
        const enemyBoard = document.querySelector('.AI'); 
        for(const child of enemyBoard.children){
            if(child.classList.contains('box')){
                child.addEventListener('click', (event) => { 
                    if(this.round % 2 == 0){ 
                        const coordinates = event.target.id.split(',') 
                        this.gameboardAI.receiveAttack(coordinates) 
                    }
                });
        }}; 
    }
}







