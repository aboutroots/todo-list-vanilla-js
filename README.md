# practical-js-course
notes and source code for PracticalJS course on https://watchandcode.com/
Additional notes are taken from Mozilla Developer tutorials.

Some of them are in English and some in Polish, becouse i'm bilingual but half a brain

## Scope
dla var to FUNKCJA, a nie blok! Scope w bloku mają tylko let i const.

### Reszta z dzielenia
% działa jak modulo, ale zawsze przejmuje znak pierwszego operandu
```javascript
-1 % 2 // -1
```

## Różnica między *==* a *===*
**==** castuje na ten sam typ, więc wychodzą dziwne rzeczy, np:

```javascript
1 == '1' // true
```
dlatego korzystamy z **===**

```javascript
1 === '1' // false
```

## ciekawsze pętle for
```javascript
for(let val of array){
    // zrob coś z val. Ta pętla przejdzie po elementach Arraya
}

for(let property in object){
    // zrób coś z atrybutem. Ta pętla przejdzie po atrybutach, a dla Arraya - po wszystkich komórkach w nim, w tym tych pustych.
}
```

### Operatory logiczne
są lazy, tak jak w Pythonie.
```javascript
var name = x && x.getName(); // sprawdzenie czy obiekt istnieje przed pobraniem nazwy
```

### ternary operator:
```javascript
var allowed = (age >= 18) ? true : false;
```

### Obiekty w JS
są podobne do słowników. Tworzy się je za pomocą '... = new
Object();' albo po prostu '... = {};'

```javascript
var obiekt = {
    name: 'Michal',
    name2: 'Popiel',
    details: {
        height: 197,
        weight: 84
    }
};
```

Dobieramy się do parametrów dwojako:
```javascript
obiekt['details']['height'] // 197
obiekt.details.height // 197
```

### Prototyp obiektu
żeby stworzyć gotowy obiekt, wykorzystać można fukncję robiącą 'prototyp':
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var me = new Person('Michal', 24)
```

### Array
Array definiujemy za pomocą var x = []; lub new Array(/size/)
**UWAGA!**: Możemy określać z góry rozmiar, więc mogą występowac komórki puste
(z wartością undefined). Można też odwoływać się do indeksów których jeszcze
nie ma! Array.length(); zwraca nam maxymalny index + 1, a nie faktyczną
ilość niepustych elementów! Przykłady:
```javascript
var x = [];
x[0] = 0;   // [ 0 ]
x[5] = 5;   // [ 0, , , , ,5 ]
x[2];       // undefined
x.length;   // 6
```

Dodawanie do arraya jest za pomocą a.push(item);

### Przekazywanie argumentów do funkcji:
```javascript
function add(x, y) {
    var total = x + y;
    return total;
}
```
**UWAGA!** Jeśli przekażemy mniej argumentów, to brakujące zostaną uznane za
undefined, i funkcja się wykona dla nich.
**UWAGA!** Jeśli przekażemy za dużo argumentów, to nadmiarowe zostaną pominięte.

## Closures

a closure is a stack frame which is allocated when a function starts its execution, and not freed after the function returns (as if a 'stack frame' were allocated on the heap rather than the stack!).

## Callback function

A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

Here is a quick example:
```javascript
function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);
```
---
# Practical JS notes

Przypomnienie o tym jak działa scope dla *var*:
```javascript
var x = 5;
function someFunc(){ // NOTE: no arguments are passed!
    console.log(x)   // Perfectly fine - i can 'look out' to read and write the variables
    var y = 5;
}
console.log(y)       // Error - not defined!
```
uwaga - to jest też **WRITE access**!!!

### Objects and methods
Definiowanie obiektu:
```javascript
var someObj = {
    name: 'Gordon',
    sayName: function() {
        console.log(this.name);
        console.log(this.age);
    },
    age: 23
}
```
Uwagi:
- Struktura słownika, ale klucze nie są stringami
- metoda to tak naprawdę **anonymous function** do której odwołuję się po kluczu słownikowym
- możnaby dodać nazwę tej funkcji, ale i tak nie da się do niej dostać po niej (?)
- kolejność properties nie ma znaczenia

### Negation
```javascript
!true //false
```

### Accessing objects:
Przez referencję:**Array, Function, Object**:
```javascript
obj = {x: 2}
obj_reference = obj
obj_reference.x = 3

obj.x // 3
```
Dlatego, że te trzy są **wszystkie obiektami, funkcja też** - czyli tak naprawdę nazwa obiektu to **wskaźnik** na obiekt!

Reszta - **prymitywy - przez wartość**.

> DO ZAPAMIĘTANIA: obiekty są przekazywane przez referencję, prymitywy przez wartość.

### Loops
```javascript
for (var i = 0; i < 3; i++){
    console.log(i)
}
```
### Comparisions
primitives - *if it looks like it, it is it* :
```javascript
1 === 1
true === true
'dupa' === 'dupa'
```
objects - memory address comparision:
```javascript
{} === {} // false. different objects, different addresses
obj = {}
obj_ref = obj
obj === obj_ref // true. the same address
```

### HTML Essentials
- DOM is how the browser is interpreting and presenting HTML. I can use JS to manipulate it.
- DOM tree - tree of all elements
- use \<script\> tag *on the bottom of body, so it loads after rendering html!*

### Accessing DOM in JS
...using *document* object. To find DOM element, give it some id or something; you can then use EventListener to assign function to run on event
```javascript
var element = document.getElementbyId('someElementID');

element.addEventListener(type, function(){  // type = f.e. 'click'
    // do sth
});
```
*or even better*, specify *onclick=...* attribute in html, where *...* could be JS function / method, and group all event methods in 'handlers' object
HTML:
```html
<button onclick='handlers.handleClickAndDoSth()'>
```
JS:
```javascript
var handlers = {
    handleClickAndDoSth: function() {dosth;}
};
```

### Debugger
use inline keyword **debugger;** in JS file. It will stop on the breakpoint when executing and Chrome will open debugging tools

### How to add elements to DOM
using **appendChild** method:
```javascript
var todoLi = document.createElement('li'); // initialization.
todoLi.textContent = 'whatever';
var desiredUl = document.querySelector('ul'); // or any other selector
desiredUl.appendChild(todoLi) // this is where the magic happens
```
### To clear contents of html object (f.e. clear all items of a list)
```javascript
element = document.//insert any selector here//
element.innerHTML = '';
```

### FOREACH bitchez, jednak jest
```javascript
someArray.forEach(callback, this);
```
param this can be omitted.
param position in callback also can be omitted.
```javascript
someArray = ['one', 'two']
someArray.forEach(function(item, position) {
    /* function body, do sth with item */
}, someThis);

// this is roughly equivalent to:
function forEach(myArray, myFunction){
    for(let item of myArray){
        myFunction(item);
    }
```

### Higher order functions and Callbacks
```javascript
function x(func){ // x is a higher order function
    func()        // func is a callback
}
```

### Event Delegation
Is a design pattern: all the event handling is delegated to the parent element.
It listens for events, and if some event occurs, we are processing that event to determine which child element was clicked.

Example -  i have a list like this:
```html
<ul id='myUl'>
    <li class='item'></li>
    <li class='item'></li>
    <li class='item'></li>
    <li class='item'></li>
</ul>
```
I want to process clicks on certain list items.

Instead of creating EventListener for every one of them (memory problems),
i can use one listener for the whole list, and process the event to determine what was clicked:
```javascript
var ul = document.getElementById('myUl')
ul = addEventListener('click', function(event){
    var clickedElem = event.target;
    if (clickedElem.className === 'item'){
        // make sure it is the right element and do sth with it
    }
})
```
> string to int: parseInt()

### ternary operator
```javascript
var x = (someCondition) ? valIfTrue : valIfFalse;
```

### Functions like 'any' and 'all' in Python:
*some* and *every*.
Those are methods of *array* object in JS. Usage - like any other
method being higher order function (f.e. forEach)
```javascript
var booleanValue = someArray.every(function(item){
    return (/* some condition with item */)
})
```

### Bind method
Call it on method / function  - > returns a copy of that function where
'this' is set to the first argument passed into bind
```javascript
var someFuncWithBindedThis = someFunc.bind(someObj);
someFuncWithBindedThis();
```
### Apply and call functions:
The same as bind, but are RUN IMMEDIATELY, not returning a function!!
Difference when calling original function with arguments:
```javascript
original(arg, arg2);  // all three have the same args, only different 'this'
original.apply(someThisReference, [arg, arg2]);  // args in array
original.call(someThisReference2, arg, arg2);     // no array
```
 > IMPORTANT! Once bounded, forever bounded - cannot bind, call or apply 
 > function that was previously bounded! (ofc its not throwing exc, becouse
 > *JS is retarded*)


### Understanding THIS
> THIS cheatsheet with examples:
> https://github.com/gordonmzhu/cheatsheet-js

Rules:
1. In a regular function (or if you're not in a function at all), this points to window. This is the default case.
2. When a function is called as a method, this points to the object that's on the left side of the dot.
3. In a function that's being called as a constructor, this points to the object that the constructor is creating.
4. When you explicitly set the value of this manually using bind, apply, or call, it's all up to you.
5. In a callback function, apply the above rules methodically.

