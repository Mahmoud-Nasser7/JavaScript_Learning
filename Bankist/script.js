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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = movements => {
  
    containerMovements.innerHTML = ``;
    movements.forEach((mov, i) => {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      let move = `
          <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin', move);
    });
};

const createUserName = accs => {
  accs.forEach(acc => {
    acc.UserName = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(e => e.slice(0, 1))
      .join('');
  });
};

createUserName(accounts);

const calcDisplayBalanc = account => {
  account.balance = account.movements.reduce(
    (acc, current) => acc + current,
    0
  );
  labelBalance.textContent = `${account.balance} €`;
};

const calcDisplaySummry = account => {
  let income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  let outcome = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${outcome * -1}€`;
  const interest = income * (account.interestRate / 100);
  labelSumInterest.textContent = `${Math.round(interest)}€`;
};

const updateUi= (currentAcount)=>{
  displayMovements(currentAcount.movements);
  calcDisplaySummry(currentAcount);
  calcDisplayBalanc(currentAcount);
}
let currentAcount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  try {
    currentAcount = accounts.find(
      acc => acc.UserName === inputLoginUsername.value
    );
    if (currentAcount.pin === Number(inputLoginPin.value)) {
      updateUi(currentAcount);
      containerApp.style.opacity = 1;
      labelWelcome.textContent = `Welcome Back ${currentAcount.owner}`;
    } else {
      console.log('no');
    }
  } catch (error) {
    console.log('No User');
  }
  inputLoginPin.value = '';
  inputLoginUsername.value = '';
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  let amount = Number(inputTransferAmount.value);
  let recevierAccount = accounts.find(
    acc => acc.UserName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    currentAcount.balance >= amount &&
    recevierAccount.UserName != currentAcount.UserName && recevierAccount
  ) {
    currentAcount.balance -= amount;
    recevierAccount.balance += amount;
    recevierAccount.movements.push(amount);
    currentAcount.movements.push(-amount);
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    updateUi(currentAcount);
  }

});


btnLoan.addEventListener("click",(e)=>{
  e.preventDefault();
 let amount = Number(inputLoanAmount.value);

 if(amount > 0 && currentAcount.movements.some(mov=> mov >= amount * 0.1)){
    currentAcount.movements.push(amount);
    updateUi(currentAcount); 
    inputLoanAmount.value = "";
 }
 else{
  inputLoanAmount.value = "";
 }
})



btnClose.addEventListener("click",(e)=>{
  e.preventDefault();
  if(inputCloseUsername.value == currentAcount.UserName && inputClosePin.value == currentAcount.pin){
    let index = accounts.findIndex(acc=> acc.UserName === currentAcount.UserName);
    accounts.splice(index , 1);
    containerApp.style.opacity = 0;

  }
  else{
    console.log("No");
    
  }
})

