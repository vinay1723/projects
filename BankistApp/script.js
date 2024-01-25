'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const movementsDate = document.querySelector('.movements__date');
const date = new Date();
labelDate.textContent = date.toDateString();
console.log(movementsDate.textContent);
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}"> ${i + 1}${type}</div>
    <div class="movements__date">${date.toLocaleDateString()}</div>
    <div class="movements__value"> ${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(account1.username);

const updateUI = function (acc) {
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}$`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}$`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}$`;
};

// calcDisplaySummary(account1.movements);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance} EUR`;
};
// calcDisplayBalance(account1.movements);

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent)
  );
  // console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI);
  console.log(movementsUI2);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// Coding Challenge #1
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  const dogsKateCorrected = dogsKate.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  console.log(dogsJuliaCorrected);
  const dogsCorrected = [...dogsJuliaCorrected, ...dogsKateCorrected];
  for (const [i, dog] of dogsCorrected.entries()) {
    dog >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old `)
      : console.log(`Dog number ${i + 1} is still a puppy`);
  }
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const calcAverageHumanAge = function (movements) {
  const calcDogAge = movements.map(function (mov) {
    if (mov <= 2) return mov * 2;
    else return 16 + mov * 4;
  });
  console.log(calcDogAge);
  const filterDogAge = calcDogAge.filter(function (mov) {
    if (mov > 18) return mov;
  });
  console.log(filterDogAge);
  const sumofDogAge = filterDogAge.reduce(function (acc, curr, i) {
    return acc + curr;
  });

  return sumofDogAge / movements.length;
  re;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
*/
/////////////////////////////////////////////////

/*

// SLICE
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(0, 3));

// SPLICE
console.log(arr.splice(3, 1));
console.log(arr.splice(-1));
console.log(arr);

//REVERSE
const arr1 = ['a', 'b', 'c', 'd'];
const arr2 = ['e', 'f', 'g', 'h'];
arr1.concat(arr2);
console.log(arr1.concat(arr2).reverse());

// CONCAT
const letters = arr1.concat(arr2);
console.log(letters);
console.log([...arr1, ...arr2]);

// JOIN
console.log(letters.join('-'));

// THE NEW 'at' METHOD
console.log(letters.slice(-1).at(0));
console.log(letters.at(letters.length - 1));
console.log('vinay'.at(-1));
console.log('vinay'.at(0));
const arr4 = [1, 2, 2, 2, 4, 5, 6, 7, 7, 8];
const Set1 = new Set([...arr4]);
console.log(Set1);
console.log(Set1.has(1));

//FOREACH LOOP
const moments = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const moment of moments) {
  console.log(`money got deposited ${moment}`);
}

for (const [i, moment] of moments.entries()) {
  console.log(`${1}:money got deposited ${moment}`);
}

// FOREACH  ITERATION

moments.forEach(function (movement) {
  console.log(`money got deposited ${movement}`);
});

moments.forEach(function (movement, i, arr) {
  console.log(`${i + 1}:money got deposited ${movement}`);
});

// ForEach for maps and sets
// Map iteration
const currency = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound Sterling'],
]);

console.log(currency.keys());
console.log(currency.values());

currency.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

// Set iteration

const srr = new Set([...moments]);

srr.forEach(function (val, _, map) {
  console.log(`${val}:${val}`);
});
*/

//

// More Ways of Creating and Filling Arrays

// 1.
/*
const bankDeopsitSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDeopsitSum);

// 2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

// prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

// 3
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //   cur > 0 ? (sums.deposit += cur) : (sums.withdrawals += cur);
      // }
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4
// this is a nice title = This Is a Nice Title
// const convertTileCase = function(title) ()
const convertTileCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTileCase('this is a nice title'));
console.log(convertTileCase('this is a LONG title but not too long'));
console.log(convertTileCase('and here is another title with an EXAMPLE')); */

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// 1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(
  mov => (mov.recommendedFood = Math.trunc(mov.weight ** 0.75 * 28))
);
console.log(dogs);

// 2
const dogSarah = dogs.find(mov => mov.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  dogSarah.curFood > dogSarah.recommendedFood
    ? `Sarah dog eating more than recommended`
    : `sarah dog eating less than recommended`
);

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')} dog's eat too much`);

console.log(`${ownersEatTooLittle.join(' and ')} dog's eat too little`);

// 5
