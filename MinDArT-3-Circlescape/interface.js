let resetButton, saveButton, fsButton, toggleBut, vMin;

function calcDimensions() {
  if (width > height) {
    vMax = width / 100;
        vMin = height / 100;
  } else {
    vMax = height / 100;
    vMin = width / 100;
  }
}

function writeTextUI() {

  // TODO: REMOVE ELEMENTS

$(".interface").remove();
$(".select").remove();

newButton = createButton("New")
newButton.class("select");
newButton.position(width - (15 * vMax), height - (6 * vMax));
newButton.style('font-size', '2.6vmax');
newButton.style('height', '5vmax');
newButton.mousePressed(restart);


  saveButton = createButton("Save")
  saveButton.class("select");
  saveButton.style('font-size', '1.7vmax');
  saveButton.style('height', '5vmax');
  saveButton.position(width - (15 * vMax), height - (12 * vMax));
  saveButton.mousePressed(saveImg);

  //invert
  eraseBtn = createButton('Erase');
  eraseBtn.position(2 * vMax, height - (6 * vMax));
  eraseBtn.class("select");
  eraseBtn.style('font-size', '1.3vmax');
  eraseBtn.style('height', '5vmax');
  eraseBtn.style('width', '8vmax');
  eraseBtn.mousePressed(eraseToggle);

  //invert
  drawSmlBtn = createButton('Draw Small');
  drawSmlBtn.position(11 * vMax, height - (6 * vMax));
  drawSmlBtn.class("select");
  drawSmlBtn.style('font-size', '1.3vmax');
  drawSmlBtn.style('height', '5vmax');
  drawSmlBtn.style('width', '8vmax');
  drawSmlBtn.mousePressed(drawSml);

  //invert
  drawBigBtn = createButton('Draw Big');
  drawBigBtn.position(20 * vMax, height - (6 * vMax));
  drawBigBtn.class("select");
  drawBigBtn.style('font-size', '1.3vmax');
  drawBigBtn.style('height', '5vmax');
  drawBigBtn.style('width', '8vmax');
  drawBigBtn.mousePressed(drawBig);


// createSwatch();
}

// function createSwatch() {
//
//   $(".box").remove();
//   $(".toggle").remove();
//
//   swatch = [];
//   for (let i = 0; i < 3; i++) {
//     swatch[i] = createButton("");
//     swatch[i].position(((i * 7)) * vMax, height - (6 * vMax));
//     swatch[i].size(7 * vMax, 10.5 * vMax);
//     swatch[i].style("background-color", colours[colVersion][i]);
//         swatch[i].style("border-width", '6px');
//             swatch[i].style("border-color", "white");
//     swatch[i].class("box");
//     swatch[i].id("swatch" + i);
//     swatch[i].mousePressed(function() {
//      changeCol(i);
//     });
//   }
//   changeCol(currentC);
//
//
//
//   // toggleBut = createButton('Change Colours');
//   // toggleBut.mousePressed(function() {
//   //  changeCol(currentC+1);
//   // });
//   // toggleBut.class("toggle");
//   // toggleBut.id("ui4");
//   // toggleBut.position(3*vMax, height - (6 * vMax));
//   // toggleBut.style('width', '21vmax')
//   // toggleBut.style('font-size', '1.5vmax');
//   // toggleBut.style('height', '4vmax');
//
//       // toggleIt();
//
// }

function addFS(){
  $('.fsButton').remove();
  fsButton = createImg('assets/enterFS.png', "FULLSCREEN");
  fsButton.style('height', '4.5vMax');
  fsButton.class("fsButton");
  fsButton.position(width - (7.5 * vMax), 1.5 * vMax);
  fsButton.mousePressed(fs);
}

function fs(){
  fullscreen(1);
  $('.fsButton').remove();
}

function checkFS(){
  if (!fullscreen()){
  addFS();
}
}


function saveImg() {


  save('touchscape' + month() + day() + hour() + second() + '.jpg');
}
