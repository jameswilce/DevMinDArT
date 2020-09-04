var colQty = 1;
var colWidth;
var colYtrack = [];
var drawActive = false;

var lineVersion = 0;
var vMax;
var div = 1;

var c1, c2, c3, c4;

var restart;
var sel = 0;

var colours = [
  ['#0D0A07', '#D9D0C7', '#F20C1F', '#BF1515'], // 4
  ['#030A8C', '#4ED98A', '#F2B705', '#D93E30'], // 5
  ['#345573', '#223240', '#F2913D', '#F24B0F'], // 4
  // ['#3981BF', '#1F628C', '#590808', '#D92929'], // 1
  ['#172426', '#455559', '#D9C3B0', '#F2DFCE'], // 5
  // ['#D97398','#A65398','#263F73','#5679A6'], // 0
  ['#3C5E73','#F2BBBB','#F24968','#F24444'], // 4
  ['#A60321','#D9043D','#F29F05','#D8BA7A'], // 5
  // ['#D9C6B0','#BF9C88','#8C2336','#D99B96'], // 3
  ['#3FA663','#2D7345','#3391A6','#262626'], // 5
  ['#F27ECA','#9726A6','#8F49F2','#6C2EF2'], // 4
  // ['#F27983','#A66F79','#F2C5BB','#F2B9B3'], // 0
  ['#080926','#162040','#364C59','#8DA69F'], // 4
  ['#F27999','#8C327D','#5AB5BF','#82D9B0'], // PINK
  // ['#5F6D73','#EBF2F1','#BFA688','#8C6F5E'], // 1
  ['#3C2D73','#131A40','#D97E6A','#BF7396'], // 4
  // ['#172D40','#7BA1A6','#F2B279','#D97B59'], // 0
  // ['#312F73','#0D0D0D','#F2C6A0','#E2DBD4'], // 3
  ['#314035','#5E7348','#A4BF69','#E0F2A0'], // 4
  // ['#6D808C','#FFFFFF','#D9AA8F','#F2CAB3'], // 0
  // ['#233059','#76A6A1','#e6b3b3','#BF3F3F'], // 1
 ['#a4fba6','#4ae54a', '#0f9200', '#006203'], // 4
 ['#192819','#2c4928','#719b25','#cbe368'], // 5
 ['#2d3157','#34c1bb','#badccc','#ffda4d'], // 4
 ['#81edf7','#00a4c0','#f70110','#6e0516'] // 5
];

var numPattern = [1, 2, 4, 8, 16, 32, 64, 128];
var numPattern2 = [1, 2, 3, 5, 8, 13, 21];

var sliderWords = ["none", "small", "medium", "large"]

var cc = 0; // currentColour
var toggle = 1;

var touchDownY;

var currentOrientation, storedOrientation, storedOrientationDegrees, rotateDirection;

function preload() {
  paper = loadImage('assets/paper1.jpg');
  audio = loadSound('assets/audio.mp3');
  click = loadSound('assets/click.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);



    // TODO: Instigate resizes for both of these
    fg = createGraphics(width, height);
    intermedia = createGraphics(width, height);
    fg.strokeWeight(1);
    fg.noFill();
    pixelDensity(1);

    var stbtn = $("<div />").appendTo("body");
    stbtn.addClass('startBtn');
    $('<p>Touch here to begin</p>').appendTo(stbtn);
    stbtn.mousedown(start);
    stbtn.mousemove(start);

    // TODO: Add event listeners? Replace p5.js ones?
}

function start() {
  $(".startBtn").remove();
  fullscreen(1);


  //todo, consider pausing audio context
  if (audio.isPlaying()) {} else {
    audio.loop(1);
  }

  sizeWindow();
  writeTextUI();
  restart();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  calcDimensions();


  writeTextUI();



  cc = floor(random(0, colours.length));
  restart();
  lineVersion = 0
}


function toggleIt() {

  toggle = !toggle;

  for (let i = 0; i < 2; i++) {
        swatch[i].position(((i * 9)+3) * vMax, height - (9 * vMax));
        swatch[i].size(9 * vMax, 6 * vMax);
  }

var n = 0;

if (toggle){
  n = 1;
}

  swatch[n].position(((toggle * 9)+3) * vMax, height - (15.5 * vMax));
  swatch[n].size(9 * vMax, 12.5 * vMax);
}




function restart() {
  cc++;
  if (cc >= colours.length) {
    cc = 0;
  }
  lineVersion++;
  if (lineVersion >= numPattern.length) {
    lineVersion = 0;
  }

  // clear both layers
  fg.clear();
  intermedia.clear();

  colQty = floor(random(1, 10));



  c1 = colours[cc][0];
  c2 = colours[cc][1];
  c3 = colours[cc][2];
  c4 = colours[cc][3];

  // make solid gradient, add smaller gradients
  from = color(c1);
  to = color(c2);

  for (var j = 0; j < height; j++) {
    intermedia.stroke(lerpColor(from, to, j / height));
    intermedia.line(0, j, width, j);
  }
  render();
  createSwatch();
}

function touchStarted() {
  touchDownY = mouseY;
}

function touchMoved() {


  // colQty = numPattern[slider1.value()];
  colQty = numPattern[lineVersion];

  colWidth = width / colQty;



  var tempSel = floor(mouseX / colWidth);
  if (sel != tempSel) {
    sel = floor(mouseX / colWidth)
    // OPTIONAL, essentially records mouseY again each time we move ot a new column.
    // touchDownY = mouseY;
  }

  drawActive = true;

  if (drawActive) {

    colYtrack[sel] = mouseY;

    from = color(c3);
    to = color(c4);

    if (toggle) {

      from = color(c3);
      to = color(c4);

    } else {
      from = color(c1);
      to = color(c2);
    }

      if (mouseY >= touchDownY) {
        for (var j = touchDownY; j < mouseY; j++) {
          fg.stroke(lerpColor(to, from, j / mouseY));
          fg.line((sel * colWidth), j, (sel * colWidth) + colWidth, j);
        }
      } else {
          for (var j = touchDownY; j > mouseY; j--) {
          fg.stroke(lerpColor(to, from, mouseY / j));
          fg.line((sel * colWidth), j, (sel * colWidth) + colWidth, j);
        }
      }

  }


  render();

}


function render() {
  intermedia.image(fg, 0, 0, width, height);
  blendMode(BLEND);
  image(paper, 0, 0, width, height);
  blendMode(MULTIPLY);
  image(intermedia, 0, 0, width, height);
  fill(255);
  blendMode(DIFFERENCE);
  textSize(width / 50);
  text(colours[cc][0], width - width / 5, height / 10);

}

function touchEnded() {
  drawActive = false;
}

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
}

function checkFS(){
  console.log("checking");
  if (!fullscreen()){
  addFS();
}
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sizeWindow();

  // removeElements();
  writeTextUI();
  render();
  checkFS();
}




function sizeWindow() {

  // image(background, 0, 0, width, height);

  if (width < height) {
    currentOrientation = "portrait";
  } else {
    currentOrientation = "landscape";
  }
  if (currentOrientation === storedOrientation) {
    stretchWindow();
  } else {

    if (window.orientation < storedOrientationDegrees) {
      direction = 1;
    } else {
      direction = -1;
    }

    if (abs(window.orientation - storedOrientationDegrees) == 270){
      direction = -direction;
    }

    rotateWindow(direction);


    storedOrientationDegrees = window.orientation;



  }
  storedOrientation = currentOrientation;


  calcDimensions();



}



function stretchWindow() {
  var newfg = createGraphics(windowWidth, windowHeight);
  newfg.image(fg, 0, 0, windowWidth, windowHeight);
  fg.resizeCanvas(windowWidth, windowHeight);
  fg = newfg;

  var newintermedia = createGraphics(windowWidth, windowHeight);
  newintermedia.image(intermedia, 0, 0, windowWidth, windowHeight);
  intermedia.resizeCanvas(windowWidth, windowHeight);
  intermedia = newintermedia;


}

function rotateWindow(direction) {
  var newfg = createGraphics(windowWidth, windowHeight);
  newfg.push();
  newfg.translate(width / 2, height / 2);
  newfg.rotate((PI / 2) * direction);
  newfg.translate(-height / 2, -width / 2);
  newfg.image(fg, 0, 0, windowHeight, windowWidth);
  newfg.pop()
  fg.resizeCanvas(windowWidth, windowHeight);
  fg = newfg;

  var newintermedia = createGraphics(windowWidth, windowHeight);
  newintermedia.push();
  newintermedia.translate(width / 2, height / 2);
  newintermedia.rotate((PI / 2) * direction);
  newintermedia.translate(-height / 2, -width / 2);
  newintermedia.image(intermedia, 0, 0, windowHeight, windowWidth);
  newintermedia.pop()
  intermedia.resizeCanvas(windowWidth, windowHeight);
  intermedia = newintermedia;



  // TODO: properly detect the orientation
  rotateDirection = rotateDirection * -1;
}

// //startSimulation and pauseSimulation defined elsewhere
// function handleVisibilityChange() {
//   if (document.hidden) {
//     audio.stop();
//   } else {
//     audio.loop(1);
//   }
// }
//
// document.addEventListener("visibilitychange", handleVisibilityChange, false);
