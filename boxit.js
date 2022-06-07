//drawLine Function
let line = `━`;
function drawLine(number) {
  return line + line.repeat(number);
}

//drawTopBorder Function
let topLeftCorner = `┏`;
let topRightCorner = `┓`;
function drawTopBorder(number) {
  return topLeftCorner + line.repeat(number) + topRightCorner;
}

//drawMiddleBorde Function
let middleLeft = `┣`;
let middleRight = `┫`;
function drawMiddleBorde(number) {
  return middleLeft + line.repeat(number) + middleRight;
}

//drawBottomBorder Function
let BottomLeftCorner = `┗`;
let BottomRightCorner = `┛`;
function drawBottomBorder(number) {
  return BottomLeftCorner + line.repeat(number) + BottomRightCorner;
}

//drawBarsAround Function
let sideLine = `┃`;
function drawBarsAround(namestr) {
  return sideLine + `${namestr}` + sideLine;
}

//boxIt Function
const arr = process.argv.slice(2);
function boxIt(arr) {
  //find the longest length
  let maxlg = 0;
  for(i = 0; i < arr.length; i++) {
    if(arr[i].length > maxlg) {
      maxlg = arr[i].length;
    }
  }

  let result = '';
    result += drawTopBorder(maxlg) + `\n`
    if(maxlg !== 0) {
      for(i = 0; i < arr.length; i++){
        if (i == arr.length - 1) {
      result += drawBarsAround(arr[i]) + `\n`
        } else {
          result += drawBarsAround(arr[i]) + `\n`
          result += drawMiddleBorde(maxlg) + `\n`
        }
      } 
    } 
    result += drawBottomBorder(maxlg)  
    return result
}

console.log(boxIt(arr));
