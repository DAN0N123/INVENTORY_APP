import {Ship, Gameboard, Player} from './battleshipsMain.js';

export let playerShips = [];

export class Game {
    constructor(){
        playerShips = [];
        this.round = 0;
        this.playerBox = document.querySelector('.player');
        this.aiBox = document.querySelector('.AI');
        // const PLAYER = new Player(prompt('Enter your username: '));
        const PLAYER = new Player('Felipe');
        const AI = new Player('AI');
        this.player = PLAYER;
        this.ai = AI;
        this.gameboardPlayer = new Gameboard(PLAYER);
        this.gameboardAI = new Gameboard(AI);
        const playerNameBox = this.playerBox.querySelector('.name');
        playerNameBox.textContent = PLAYER.name;
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
        this.gameboardAI.aiPlaceShips()
        for(const child of this.aiBox.children){
            if(child.classList.contains('box')){
                child.addEventListener('click', (event) => { 
                    if(this.round % 2 == 0){ 
                        const coordinates = event.target.id.split('_') 
                        this.gameboardAI.receiveAttack(coordinates) 
                    }
                });
        }}; 
    }

    aiAttacks(){
        const boxesLeft = [];
        for(const box of this.playerBox.children){
            if(box.classList.contains('box') && !box.classList.contains('hit')){
                boxesLeft.push(box)
            }
        };
        const target = boxesLeft[Math.floor(Math.random() * boxesLeft.length)];
        this.gameboardPlayer.receiveAttack(target.id.split('_'));
    }

}







