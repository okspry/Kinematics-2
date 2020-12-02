import { Arm } from "./Arm";

const canvas = document.getElementById("canvas");
const canvas2 = document.getElementById("canvas2");
const context = canvas.getContext("2d");
const context2 = canvas2.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas2.width = canvas.width;
canvas2.height = canvas.height;
const width = canvas.width;
const height = canvas.height;
let drawing = false;

const arm = Arm.create(width / 2, height / 2, 100, 0);
let angle = 0;
const arm2 = Arm.create(arm.getEndX(), arm.getEndY(), 100, 0.3);
const arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), 100, 1.3);

arm2.parent = arm;
arm3.parent = arm2;

let r = 0,
  g = 100,
  b = 200;
context2.lineWidth = 0.75;

update();
document.body.addEventListener("click", function () {
  drawing = !drawing;
});

function update() {
  if (drawing) {
    context2.beginPath();
    context2.moveTo(arm3.getEndX(), arm3.getEndY());
  }
  context.clearRect(0, 0, width, height);
  arm.angle = Math.sin(angle) * 2;
  arm2.angle = Math.cos(angle * 0.8777) * 2;
  arm3.angle = Math.cos(angle * 1.5) * 2;
  arm2.x = arm.getEndX();
  arm2.y = arm.getEndY();
  arm3.x = arm2.getEndX();
  arm3.y = arm2.getEndY();
  angle += 0.05;
  if (r < 255 && g < 255 && b < 255) {
    r += 1;
  } else {
    r = 0;
  }
  // if (g < 255) {
  //   g += 1;
  // } else {
  //   g = 0;
  // }
  // if (b < 255) {
  //   b += 1;
  // } else {
  //   b = 0;
  // }
  context2.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
  arm.render(context);
  arm2.render(context);
  arm3.render(context);

  if (drawing) {
    context2.lineTo(arm3.getEndX(), arm3.getEndY());
    context2.stroke();
  }
  requestAnimationFrame(update);
}
