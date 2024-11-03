const $canvas = document.querySelector('canvas');
const $width = ($canvas.width = window.innerWidth);
const $height = ($canvas.height = document.documentElement.clientHeight);
const $ctx = $canvas.getContext('2d');
$ctx.fillStyle = '#000';
$ctx.fillRect(0, 0, $width, $height);
let animationId;

const generaRandomChar = () => {
  const num = ~~(Math.random() * 129);
  return String.fromCharCode(num);
};

const nColumns = Math.floor($width / 20) + 1;
const columns = Array(nColumns).fill(0);

const frameRate = 33; 
let lastTime = 0;

const canvasMatrix = (time, fontSize, letterColor) => {
  if (time - lastTime > frameRate) {
    $ctx.fillStyle = '#0002';
    $ctx.fillRect(0, 0, $width, $height);
    $ctx.fillStyle = letterColor ?? '#0f0';
    $ctx.font = `${fontSize}pt monospace`;

    columns.forEach((y, index) => {
      const $text = generaRandomChar();
      const x = index * (fontSize + 10);
      $ctx.fillText($text, x, y);

      const limite = ~~(Math.random() * 10000) + 1;
      columns[index] = y > limite ? 0 : y + (fontSize + 5);
    });

    lastTime = time;
  }

  requestAnimationFrame(time => canvasMatrix(time, fontSize, letterColor));
};

const mediaSuperLarge = window.matchMedia(
  '(min-width: 5000px) and (max-width: 10000px)'
);
const mediaextraLarge = window.matchMedia(
  '(min-width: 3000px) and (max-width: 4999px)'
);
const mediaLarge = window.matchMedia(
  '(min-width: 2000px) and (max-width: 2999px)'
);
const mediaMedium = window.matchMedia(
  '(min-width: 1111px) and (max-width: 1999px)'
);
const mediaSmall = window.matchMedia(
  '(min-width: 0px) and (max-width: 1110px)'
);

const handleMediaChange = (mediaQuery, fontSize, letterColor) => {
  if (mediaQuery.matches) {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(time =>
      canvasMatrix(time, fontSize, letterColor)
    );
  }
};

mediaSuperLarge.addEventListener('change', e =>
  handleMediaChange(e, 40, '#0f0')
);
mediaextraLarge.addEventListener('change', e =>
  handleMediaChange(e, 30, '#0f0')
);
mediaLarge.addEventListener('change', e => handleMediaChange(e, 20, '#0f0'));
mediaMedium.addEventListener('change', e => handleMediaChange(e, 15, '#0f0'));
mediaSmall.addEventListener('change', e => handleMediaChange(e, 10, '#0f0'));

handleMediaChange(mediaSuperLarge, 40, '#0f0');
handleMediaChange(mediaextraLarge, 30, '#0f0');
handleMediaChange(mediaLarge, 20, '#0f0');
handleMediaChange(mediaMedium, 15, '#0f0');
handleMediaChange(mediaSmall, 10, '#0f0');

/* ======================= MEDIA  ======================= */

let w = window;

let currentOrientation = screen.orientation.type;

function handleOrientationChange() {
  const newOrientation = screen.orientation.type;

  if (
    newOrientation.startsWith('portrait') &&
    !currentOrientation.startsWith('portrait')
  ) {
    currentOrientation = newOrientation;
    location.reload();
  } else if (
    newOrientation.startsWith('landscape') &&
    !currentOrientation.startsWith('landscape')
  ) {
    currentOrientation = newOrientation;
    location.reload();
  }
}

screen.orientation.addEventListener('change', handleOrientationChange);

handleOrientationChange();