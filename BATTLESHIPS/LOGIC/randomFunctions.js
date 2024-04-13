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
  