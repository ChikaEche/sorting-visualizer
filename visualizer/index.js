let container = document.getElementById('container');
const blue = '#004FFF'
let prev1 = 0;
let prev2 = 0;
let elementContainer = [];
let array = [6,33,7,18,43,12,23];
for(let i = 0; i < array.length; i++) {
    let node  = document.createElement('div');
    const text = document.createElement('span');
    text.innerHTML = array[i];
    text.style.color = 'white'
    node.appendChild(text);
    node.style.height = (array[i] * 10) + 'px'
    elementContainer.push(node)
    container.appendChild(node)
}

const changeDivLetters = () => {
    for(let i = 0; i < array.length; i++) {
        elementContainer[i].lastChild.innerHTML = array[i];
        elementContainer[i].style.height = (array[i] * 10) + 'px'
    }
    changeNodes(array, array.length - 1, 1)
}

document.getElementById('button').onclick = () => {
    generateRandomArray();
}

const alterElements = (indexOne, indexTwo, heightOne, heightTwo) => {
    elementContainer[prev1].style.backgroundColor = blue;
    elementContainer[prev2].style.backgroundColor = blue;
    elementContainer[indexOne].style.backgroundColor = 'red';
    elementContainer[indexTwo].style.backgroundColor = 'blue';
    elementContainer[indexOne].style.height = (heightOne * 10) + 'px'
    elementContainer[indexTwo].style.height = (heightTwo * 10) + 'px'
    elementContainer[indexTwo].lastChild.innerHTML = heightTwo;
    elementContainer[indexOne].lastChild.innerHTML = heightOne;
    prev1 = indexOne;
    prev2 = indexTwo;
}

const enableButton = () => {
    document.getElementById('button').disabled = false;
}

const changeNodes = (array, endingIndex, count) => {
    document.getElementById('button').disabled = true
    for(endingIndex; endingIndex >= 0; endingIndex--) {
        for(let currentIndex = 0; currentIndex < endingIndex; currentIndex++) {
            if(array[currentIndex] > array[currentIndex + 1]) {
                const temp = array[currentIndex];
                array[currentIndex] = array[currentIndex + 1];
                array[currentIndex + 1] = temp;
                let arr1 = [...array]
				setTimeout((currentIdx = currentIndex, arr = arr1) => {
                    //console.log({currentIdx, currentIndex})
                    alterElements(
                        currentIdx, currentIdx + 1, arr[currentIdx], arr[currentIdx + 1]
                    )
                }, (1000 * count) + 500)
                ++count
            }
        }
        if (endingIndex === 0) {
            setTimeout(enableButton, (1000 * count) + 500)
        }
    }
}

let generateRandomArray = () => {
    let tempArray = new Array(7);
    for(let i = 0; i < tempArray.length; i++) {
        const randNum = (Math.random() * 20) + 1;
        tempArray[i] = Math.floor(randNum);
    }
    array = [...tempArray]
    changeDivLetters();
}
changeNodes(array, array.length - 1, 1)
