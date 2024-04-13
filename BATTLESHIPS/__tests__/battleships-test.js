import { Ship, Gameboard, Player } from '../LOGIC/battleshipsMain.js';

test('ship taking damage', () => {
    const myShip = new Ship(4, 'vertical');
    myShip.hit();
    expect(myShip.hits).toBe(1)
});

test('ship sinks', () => {
    const myShip = new Ship(3, 'vertical');
    for(let i = 0; i < 3; i++){
        myShip.hit()
    }
    expect(myShip.sunk).toBeTruthy();
});

test('gameboard places ships vertically', () => {
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'vertical');
    myGameboard.placeShip(myShip, [5, 7]);
    expect(typeof myGameboard.board[6,7]).toBe('object')
})

test('gameboard refuses to place vertical ship outside of board', () => {
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'vertical');
    expect( () => myGameboard.placeShip(myShip, [8, 7])).toThrow()
})

test('gameboard places ships horizontally', () => {
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'horizontal');
    myGameboard.placeShip(myShip, [5, 3]);
    expect(typeof myGameboard.board[5,4]).toBe('object')
})

test('gameboard refuses to place horizontal ship outside of board', () => {
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'horizontal');
    expect( () => myGameboard.placeShip(myShip, [8, 8])).toThrow()
})

test('ship is hit through gameboard receiveAttack method', () =>{
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'horizontal');
    myGameboard.placeShip(myShip, [5, 3]);
    myGameboard.receiveAttack([5,4])
    expect(myShip.hits).toBe(1)
});

test('missed shot is recorded', () => {
    const myGameboard = new Gameboard('test');
    myGameboard.receiveAttack([2, 2]);
    expect(myGameboard.board[2][2]).toBe(-1)
})

test('report when game is over', () => {
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'horizontal');
    myGameboard.placeShip(myShip, [5, 3]);
    myGameboard.receiveAttack([5,3]);
    myGameboard.receiveAttack([5,4]);
    myGameboard.receiveAttack([5,5]);
    expect(myGameboard.isGameOver()).toBeTruthy()
})

test('recognize when game is not over yet', () => {
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'horizontal');
    myGameboard.placeShip(myShip, [5, 3]);
    myGameboard.receiveAttack([5,3]);
    myGameboard.receiveAttack([5,4]);
    expect(myGameboard.isGameOver()).toBeFalsy();
})

test("can't place ship on top of another ship", () => {
    const myGameboard = new Gameboard('test');
    const myShip = new Ship(3, 'horizontal');
    myGameboard.placeShip(myShip, [5, 3]);
    const myShip2 = new Ship(2, 'vertical');
    expect( () => myGameboard.placeShip(myShip2, [5,4])).toThrow()
})





