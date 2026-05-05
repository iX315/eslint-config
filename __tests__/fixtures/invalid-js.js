// Invalid JS code that should trigger lint errors
// - Has semicolons
// - Has double quotes
// - Has 4 space indent
// - Has trailing spaces
// - Has tabs
// - Exceeds 120 characters on next line
const message = "hello world";

function greet(name) {
    console.log(`Hello, ${name}`);
    return true;
}

const veryLongVariableName = 'this is a very long line that definitely exceeds one hundred and twenty characters limit set in our config'

export { greet }
