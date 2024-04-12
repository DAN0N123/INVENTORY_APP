import {Ship, Gameboard, Player} from '../LOGIC/battleshipsMain.js';

export let playerShips = [];

export function mainGameLoop(){
    const playerBox = document.querySelector('.player');
    const aiBox = document.querySelector('.AI');
    const PLAYER = new Player('yo');
    const gameboardPlayer = new Gameboard(PLAYER);
    const gameboardAI = new Gameboard('AI');
    for(let i = 0; i < 5; i++){
        const length = Math.floor(Math.random() * 5) + 1;
        const orientation = ['vertical', 'horizontal'][Math.floor(Math.random() * 2 )];
        const myShip = new Ship(length, orientation)
        playerShips.push(myShip)
    }
    gameboardPlayer.make_DOM_board(playerBox, playerShips);
    gameboardAI.make_DOM_board(aiBox);
    shipPlacement(playerShips)
}
export function placeShipDOM(coordinates){
    const [y, x] = coordinates;
    const box = document.getElementById(`${y + 1},${x}`)
    box.classList.add('ship');
    box.style.backgroundColor = 'black';
    box.style.backgroundImage = 'none';
}
function shipPlacement(shipsList){
    const playerBoard = document.querySelector('.player');
    playerBoard.addEventListener('mouseover', (event) => {
        if(shipsList.length != 0){
            for(const child of playerBoard.children){
                if(child.classList.contains('box') && !child.classList.contains('ship')){
                    child.style.backgroundColor = 'none';
                    child.style.backgroundImage = "url('../MISC/water2.png')";
                }
            }
            if(event.target.classList.contains('box')){
            const coordinates = event.target.id.split(',')
            const length = shipsList[0].length;
            const orientation = shipsList[0].orientation;
            if(orientation === 'horizontal'){
                let tilesToColor = [event.target];
                for(let i = 1; i < length; i++){
                    const id = `${coordinates[0]},${Number(coordinates[1]) + i}`
                    const tile = document.getElementById(id);
                    tilesToColor.push(tile)
                }
                for(const tile of tilesToColor){
                    tile.style.backgroundImage = 'none'
                    tile.style.backgroundColor = 'black'
                }
                tilesToColor = [];
            }else{
                let tilesToColor = [event.target];
                for(let i = 1; i < length; i++){
                    const id = `${Number(coordinates[0]) + i},${coordinates[1]}`
                    const tile = document.getElementById(id);
                    tilesToColor.push(tile)
                }
                for(const tile of tilesToColor){
                    tile.style.backgroundImage = 'none'
                    tile.style.backgroundColor = 'black'
                }
                tilesToColor = [];
            }
            }
        }
        
    })
}
