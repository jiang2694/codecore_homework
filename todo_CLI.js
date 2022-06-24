const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const fs = require('fs');

function readTodoList(){
  //expect an array return
  if(fs.existsSync('todo.json') === true){
    try {
      let fileData = fs.readFileSync('todo.json');
      let parsedFileData = JSON.parse(fileData);
      if (Array.isArray(parsedFileData)) {
        return parsedFileData;
      }
    } catch (e) {
     console.log(e);
    }
  }
  return [];
}

function writeOrCreateFile(fileData) {
  //if there is no todojson file, create one
  if (fs.existsSync('todo.json') === false) {
    let createStream = fs.createWriteStream('todo.json');
    createStream.end();
  }
  fs.writeFile('todo.json', JSON.stringify(fileData), function (err) {
    if (err) throw err;
    todoStart();
  });
}

function todoStart() {
  readline.question(
    '(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit ',
    (input) => {
      handleAction(input);
    }
  )
}

function fallback() {
  console.log("We don't have this option, try again")
  todoStart();
}

function handleView() {
  let todolistData = readTodoList();
  if(todolistData.length > 0) {
    todolistData.forEach((item, index) => {
      console.log(
        index.toString() + ' [' + (item.complete ? '✓' : '') + '] ' + item.name
      );
    })
  } else {
    console.log("The list is empty");
  }
  todoStart()
}

function handleNew() {
  readline.question("What?", (input) => {
    if(input) {
      let newList = readTodoList();
      newList.push({ name: input, complete: false })
      writeOrCreateFile(newList);
    } else {
      console.log("Invaild value")
      //call this function again
      this.call();
    }
  })
}

function handleQuit() {
  console.log("See you next time!")
  readline.close();
}

function handleComplete(index) {
  let newList = readTodoList();
  if(index < newList.length && index >= 0 ) {
    newList[index].complete = true;
    writeOrCreateFile(newList);
    console.log('completed ' + newList[index].name)
  } else {
    console.log("Invaild value")
  }
  todoStart();
}

function handleDelete(index) {
  let newList = readTodoList();
  if(index < newList.length && index >= 0 ) {
    let newName = newList[index].name;
    newList.splice(index, 1);
    writeOrCreateFile(newList);
    console.log('deleted ' + newName);
  } else {
    console.log("Invaild value")
  }
  todoStart();
}


function handleAction(input) {
  if(input === 'v') {
    handleView();
  } else if(input === 'n') {
    handleNew();
  } else if(input === 'q') {
    handleQuit();
  } else if(input[0] === 'c') {
    //take the number only, c2 will take 2
    let userInput = input.substring(1)
    //if is a number
    if(!isNaN(userInput)) {
      //get the int of index
      let userInt = parseInt(userInput)
      handleComplete(userInt)
    } else {
      fallback();
    }
  } else if(input[0] === 'd') {
    let userInput = input.substring(1)
    //if is a number
    if(!isNaN(userInput)) {
      //get the int of index
      let userInt = parseInt(userInput)
      handleDelete(userInput)
    } else {
      fallback();
    }
  }
}

console.log('Welcome to Todo CLI!');
console.log('----------------------');
todoStart();