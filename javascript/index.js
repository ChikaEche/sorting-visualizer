let container = document.getElementById('container');
let elementContainer = [];
const array = [15,7,8,2,5, 35, 30];
for(let i = 0; i < array.length; i++) {
    let node  = document.createElement('div');
    node.style.height = (array[i] * 10) + 'px'
    elementContainer.push(node)
    container.appendChild(node)
}

let alterElements = (indexOne, indexTwo, heightOne, heightTwo) => {
    elementContainer[indexOne].style.backgroundColor = 'red';
    elementContainer[indexTwo].style.backgroundColor = 'blue';
    elementContainer[indexOne].style.height = (heightOne * 10) + 'px'
    elementContainer[indexTwo].style.height = (heightTwo * 10) + 'px'
}

let changeNodes = (array, endingIndex, count) => {
    for(endingIndex; endingIndex >= 0; endingIndex--) {
        for(let currentIndex = 0; currentIndex < endingIndex; currentIndex++) {
            if(array[currentIndex] > array[currentIndex + 1]) {
                const temp = array[currentIndex];
                array[currentIndex] = array[currentIndex + 1];
				array[currentIndex + 1] = temp;
				setTimeout((currentIdx = currentIndex) => {
                    console.log({currentIdx, currentIndex})
                    alterElements(
                        currentIdx, currentIdx + 1, array[currentIdx], array[currentIdx + 1]
                    )
                }, (1000 * count) + 500)
                changeNodes(array, endingIndex, ++count)
			}
        }
        //currentIndex = 0;
	}
}
changeNodes(array, array.length - 1, 1)
console.log(array)