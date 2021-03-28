/**
 * 
 * Sorting algrorithms
 */
const bubbleSort = (tempArr = array, endingIndex = array.length - 1, count = 1) => {
    document.getElementById('button').disabled = true
    document.getElementById('select').disabled = true
    for(endingIndex; endingIndex >= 0; endingIndex--) {
        for(let currentIndex = 0; currentIndex < endingIndex; currentIndex++) {
            if(array[currentIndex] > array[currentIndex + 1]) {
                const temp = tempArr[currentIndex];
                tempArr[currentIndex] = tempArr[currentIndex + 1];
                tempArr[currentIndex + 1] = temp;
                let arr1 = [...tempArr]
				setTimeout((currentIdx = currentIndex, arr = arr1) => {
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

const selectionSort = (tempArr = array, count = 1) => {
    document.getElementById('button').disabled = true
    document.getElementById('select').disabled = true
    let found = true;
    let index = 0;
    for(let startIndex = 0; startIndex < tempArr.length; startIndex++) {
        let minimum = array[startIndex];
        for(let currentIndex = startIndex + 1; currentIndex < tempArr.length; currentIndex++) {
            if(minimum > tempArr[currentIndex]) {
                minimum = tempArr[currentIndex];
                index = currentIndex;
                found = true
            }
        }
        if(found) {
            const temp = tempArr[index];
            tempArr[index] = tempArr[startIndex];
            tempArr[startIndex] = temp;
            let tempMin = index
            found = false
            let arr1 = [...tempArr]
            setTimeout((currentIdx = startIndex, min = tempMin, arr = arr1) => {
                alterElements(
                    currentIdx, min, arr[currentIdx], arr[min]
                )
            }, (1900 * count) + 500)
            ++count
        }
        if (startIndex === array.length - 1) {
            setTimeout(enableButton, (1900 * count))
        }
    }
}

// map to store and easily retrive the current sorting algorithm tom implement
let sortingAlgorithmMap = {
    'bubbleSort' : bubbleSort,
    'selectionSort': selectionSort
}

/**
 * Initializing divs with initial numbers and pre determined array
 */
let container = document.getElementById('container');
let choosenSortingAlgorithm = 'selectionSort'
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

//change the letters and height of divs when a new array is generated
const changeDivLetters = () => {
    for(let i = 0; i < array.length; i++) {
        elementContainer[i].lastChild.innerHTML = array[i];
        elementContainer[i].style.height = (array[i] * 10) + 'px'
    }
    sortingAlgorithmMap[choosenSortingAlgorithm]();
}

//listening for changes in the selection element and clicks in the button
document.getElementById('select').onchange = () => {
    //selects the required sorting algorithm
    switch(document.getElementById('select').selectedIndex) {
        case 0:
            choosenSortingAlgorithm = 'bubbleSort';
            document.getElementById('tittle').innerHTML = 'Bubble Sort'
            break;
        
        case 1:
            choosenSortingAlgorithm = 'selectionSort';
            document.getElementById('tittle').innerHTML = 'Selection Sort'
            break;
    }
}

document.getElementById('button').onclick = () => {
    generateRandomArray();
}

//change div heights and elements as values are beign swaped while sorting
const alterElements = (indexOne, indexTwo, heightOne, heightTwo) => {
    elementContainer[prev1].style.backgroundColor = blue;
    elementContainer[prev2].style.backgroundColor = blue;
    elementContainer[indexOne].style.backgroundColor = 'red';
    elementContainer[indexTwo].style.backgroundColor = 'green';
    elementContainer[indexOne].style.height = (heightOne * 10) + 'px'
    elementContainer[indexTwo].style.height = (heightTwo * 10) + 'px'
    elementContainer[indexTwo].lastChild.innerHTML = heightTwo;
    elementContainer[indexOne].lastChild.innerHTML = heightOne;
    prev1 = indexOne;
    prev2 = indexTwo;
}

//enable select  and button elements when sorting is done
const enableButton = () => {
    document.getElementById('button').disabled = false
    document.getElementById('select').disabled = false
}

//a function to generate a random array
let generateRandomArray = () => {
    let tempArray = new Array(7);
    for(let i = 0; i < tempArray.length; i++) {
        const randNum = (Math.random() * 20) + 1;
        tempArray[i] = Math.floor(randNum);
    }
    array = [...tempArray]
    changeDivLetters();
}

//initial call to bubble sort algorithm which is the default
sortingAlgorithmMap[choosenSortingAlgorithm]();
