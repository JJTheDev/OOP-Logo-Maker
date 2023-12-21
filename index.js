const filesystem = require("./node_modules/graceful-fs/graceful-fs");
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");
// Imports the graceful-fs, inquirer, Circle, Square, and Triangle modules.
// Defines a Svg class that has a constructor with three methods for rendering and setting the text and shape elements in the SVG string.

// Defines array of 'questions' using the 'inquirer' library with the following questions.
// Each question is an object that specifies the properties of TEXT, TEXT COLOR, SHAPE COLOR, and Pixel Image.
const questions = [
  {
    type: "input",
    name: "text",
    message: "TEXT: Enter up to (3) Characters:",
  },
  {
    type: "input",
    name: "textColor",
    message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "input",
    name: "shapeColor",
    message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "list",
    name: "pixel-image",
    message: "Choose which Pixel Image you would like?",
    choices: ["Circle", "Square", "Triangle"],
  },
];

// Function to write data to file
function writeToFile(fileName, data) {
  console.log("Writing [" + data + "] to file [" + fileName + "]");
  filesystem.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Congratulations, you have Generated a logo.svg!");
  });
}

async function init() {
  console.log("Starting init");
  var svgString = "";
  var svg_file = "logo.svg";

  // Prompt the user for answers
  const answers = await inquirer.prompt(questions);

  //user text
  var user_text = "";
  if (answers.text.length > 0 && answers.text.length < 4) {
    // 1-3 chars, valid entry
    user_text = answers.text;
  } else {
    // 0 or 4+ chars, invalid entry
    console.log(
      "Invalid user text field detected! Please enter 1-3 Characters, no more and no less"
    );
    return;
  }
  console.log("User text: [" + user_text + "]");
  //user font color
  user_font_color = answers["textColor"];
  console.log("User font color: [" + user_font_color + "]");
  //user shape color
  user_shape_color = answers.shapeColor;
  console.log("User shape color: [" + user_shape_color + "]");
  //user shape type
  let userShapeType = answers["pixel-image"];
  console.log("User entered shape = [" + userShapeType + "]");

  //user shape
  let user_shape;
  if (userShapeType === "Square") {
    user_shape = new Square(
      answers.shapeColor,
      answers.textColor,
      answers.text
    );
    console.log("User selected Square shape");
  } else if (userShapeType === "Circle") {
    user_shape = new Circle(
      answers.shapeColor,
      answers.textColor,
      answers.text
    );
    console.log("User selected Circle shape");
  } else if (userShapeType === "Triangle") {
    user_shape = new Triangle(
      answers.shapeColor,
      answers.textColor,
      answers.text
    );
    console.log("User selected Triangle shape");
  } else {
    console.log("Invalid shape!");
  }

  // Create a new Svg instance and add the shape and text elements to it
  var svg = user_shape.render();

  //Print shape to log
  console.log("Displaying shape:\n\n" + svg);
  //document.getElementById("svg_image").innerHTML = svg;

  console.log("Shape generation complete!");
  console.log("Writing shape to file...");
  writeToFile(svg_file, svg);
}
init();
