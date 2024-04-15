import {Game} from "./gameLoop.js";
import {Ship, Gameboard, Player} from './battleshipsMain.js';

export function blinkDiv(object) {
    object.classList.add('blinking');
    const overlay = object.querySelector('.overlay')
    overlay.classList.remove('hidden');
    overlay.classList.add('show')
    setTimeout(function() {
      overlay.classList.remove('show');
      overlay.classList.add('hidden')
      object.classList.remove('blinking');
    }, 100); 
}
  

export function closeDialog(){
  const dialog = document.querySelector('.dialog-container');
  dialog.style.display = 'none'
}

export function openDialog() {
  const dialog = document.querySelector('.dialog-container');
  dialog.style.display = 'block'
}

export function resetGame(){
    const domPlayerBoard = document.querySelector('.player');
    const domAiBoard = document.querySelector('.AI');
    domPlayerBoard.innerHTML = `<div class="numeric">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                                <div>8</div>
                                <div>9</div>
                                <div>10</div>
                            </div>
                            <div class="alphabetic">
                                <div>A</div>
                                <div>B</div>
                                <div>C</div>
                                <div>D</div>
                                <div>E</div>
                                <div>F</div>
                                <div>G</div>
                                <div>H</div>
                                <div>I</div>
                                <div>J</div>
                            </div>
                            <div class="overlay hidden"></div>
                            <div class="name"></div>`;
  domAiBoard.innerHTML = `<div class="numeric">
                          <div>1</div>
                          <div>2</div>
                          <div>3</div>
                          <div>4</div>
                          <div>5</div>
                          <div>6</div>
                          <div>7</div>
                          <div>8</div>
                          <div>9</div>
                          <div>10</div>
                        </div>
                        <div class="alphabetic">
                          <div>A</div>
                          <div>B</div>
                          <div>C</div>
                          <div>D</div>
                          <div>E</div>
                          <div>F</div>
                          <div>G</div>
                          <div>H</div>
                          <div>I</div>
                          <div>J</div>
                        </div>
                        <div class="overlay hidden"></div>
                        <div class="name"> AI </div>`;
  const newGame = new Game()
  newGame.initiateGame()
}