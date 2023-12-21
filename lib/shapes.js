class Shape {
  // Defines a class called Shape which has a constructor intializing 'color' and sets the 'color' value.

  constructor(shapeColor, textColor, text) {
    this.shapeColor = shapeColor;
    this.textColor = textColor;
    this.text = text;
    this.replacementToken = "#SHAPETYPE#";
  }

  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
    ${this.replacementToken}
    </svg>`;
  }
}
// Defines a Circle class that extends Shape and renders an SVG Circle with position, size, and fill color based on the current instance's properties.
class Circle extends Shape {
  constructor(shapeColor, textColor, text) {
    super(shapeColor, textColor, text);
  }
  render() {
    let blankShapeSVG = super.render();
    let [svgPrefix, closingSvgTag] = blankShapeSVG.split(this.replacementToken);
    let circleTag = `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.shapeColor}">`;
    return svgPrefix + circleTag + closingSvgTag;
  }
}

// Defines a Square class that extends Shape and renders an SVG Square with position, size, and fill color based on the current instance's properties.
class Square extends Shape {
  constructor(shapeColor, textColor, text) {
    super(shapeColor, textColor, text);
  }
  render() {
    let blankShapeSVG = super.render();
    let [svgPrefix, closingSvgTag] = blankShapeSVG.split(this.replacementToken);
    let squareTag = `<rect x="50" height="200" width="200" fill="${this.shapeColor}">`;
    return svgPrefix + squareTag + closingSvgTag;
  }
}
// Defines a Triangle(Polygon) class that extends Shape and renders an SVG Triangle(Polygon) with position, size, and fill color based on the current instance's properties.
class Triangle extends Shape {
  constructor(shapeColor, textColor, text) {
    super(shapeColor, textColor, text);
  }
  render() {
    let blankShapeSVG = super.render();
    let [svgPrefix, closingSvgTag] = blankShapeSVG.split(this.replacementToken);
    let triangleTag = `<polygon height="100%" width="100%" points="25,75 75,25 25,25" fill="${this.shapeColor}">`;
    return svgPrefix + triangleTag + closingSvgTag;
  }
}

module.exports = { Circle, Square, Triangle };
