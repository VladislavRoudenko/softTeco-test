const minItem =  1;
const maxItem = 100000;

const array = [3, 2, 4, 5, 8, 1, 6];

console.log("Array:", array)

for (let i = minItem; i <= maxItem; i++) {
    if(!array.includes(i)) {
        console.log(`Result: ${7}`)
        break;
    }
}