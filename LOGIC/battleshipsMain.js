class Ship{
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

class Gameboard{
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


    placeShip(ship, coordinates){
        if((ship.orientation === 'vertical' && coordinates[0] + ship.length <= 9) && (coordinates[0] < 9 && coordinates[1] < 9)){
            for(let i = 0; i < ship.length; i++){
                this.board[coordinates[0] + i][coordinates[1]] = ship;
            }
        }else if((ship.orientation === 'horizontal' && coordinates[1] + ship.length <= 9) && (coordinates[0] < 9 && coordinates[1] < 9)){
            for(let i = 0; i < ship.length; i++){
                this.board[coordinates[0]][coordinates[1] + i] = ship;
            }
        }else throw new Error("error occured while placing ship")
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

module.exports = { Ship, Gameboard };