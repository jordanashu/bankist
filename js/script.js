///////////////////////////////////////////////////////////////////////
// ALL THE ELEMENTS SELECTING

// LABELS
const labelWelcome = document.getElementById("welcome");
const labelDate = document.getElementById("date");
const labelBalance = document.getElementById("balance__value");
const labelSumIn = document.getElementById("summary__value--in");
const labelSumOut = document.getElementById("summary__value--out");
const labelSumInterest = document.getElementById("summary__value--interest");
const labelTimer = document.querySelector(".timer");
const labelInvaild = document.querySelector(".label-invalid");

//CONTAINERS
const containerApp = document.getElementById("app");
const containerSignin = document.getElementById("signin");
const containerMovements = document.getElementById("movements");

//BUTTONS
const btnLogin = document.getElementById("login__btn");
const btnSignout = document.getElementById("signout__btn");
const btnLoan = document.getElementById("form__btn--loan");
const btnTransfer = document.getElementById("form__btn--transfer");

//INPUT FIELDS
const inputLoginUsername = document.getElementById("login__input--user");
const inputLoginPin = document.getElementById("login__input--pin");
const inputTransferTo = document.getElementById("form__input--to");
const inputTransferAmount = document.getElementById("form__input--amount");
const inputLoanAmount = document.getElementById("form__input--loan-amount");

///////////////////////////////////////////////////////////////////////
// ACCOUNTS
const account1 = {
  owner: "Ashutosh",
  pin: 1111,
  username: "as",
  movements: [1000, 340, -450, 32432, 123, -234, -324],
  movementsDates: [
    "2020-11-18 21:31:17",
    "2020-12-23 07:42:02",
    "2021-01-28 09:15:04",
    "2021-01-01 10:17:24",
    "2021-02-08 14:11:59",
    "2021-02-27 17:01:17",
    "2021-03-11 23:36:17",
  ],
};

const account2 = {
  owner: "Mukul",
  pin: 2222,
  username: "mr",
  movements: [234, 24524, -213, 12414, -23, -13, -1211],
  movementsDates: [
    "2019-11-01 13:15:33",
    "2019-11-30 09:48:16",
    "2019-12-25 06:04:23",
    "2020-01-25 14:18:46",
    "2020-02-05 16:33:06",
    "2020-04-10 14:43:26",
    "2020-06-25 18:49:59",
    "2021-02-26 12:01:20",
  ],
};

const account3 = {
  owner: "Seema Rajpoot",
  pin: 3333,
  username: "sr",
  movements: [124, 363, -2452, 14133, 1231, 123414, -124],
  movementsDates: [
    "2019-11-01 13:15:33",
    "2019-11-30 09:48:16",
    "2019-12-25 06:04:23",
    "2020-01-25 14:18:46",
    "2020-02-05 16:33:06",
    "2020-04-10 14:43:26",
    "2021-02-25 18:49:59",
    "2021-02-26 12:01:20",
  ],
};

const account4 = {
  owner: "Vinod Kumar Rajpoot",
  pin: 4444,
  username: "vkr",
  movements: [14124, 124, -124, 4647, 3257, -234, -34, -14, 2352],
  movementsDates: [
    "2019-11-18 21:31:17",
    "2019-12-23 07:42:02",
    "2020-01-28 09:15:04",
    "2020-04-01 10:17:24",
    "2021-02-08 14:11:59",
    "2021-02-27 17:01:17",
    "2021-02-11 23:36:17",
  ],
};

const accounts = [account1, account2, account3, account4];

let currentAccount = [];
let timer;

////////////////////////////////////////////////////////////////////////////
// DISPLAYING BALANCE
const displayBalance = (acc) => {
  let totalBalance = acc.movements.reduce((a, b) => a + b);
  labelBalance.textContent = `₹${totalBalance}`;
};

////////////////////////////////////////////////////////////////////////////
// DISPLAYING INPUT
const displayInput = (acc) => {
  let totalInput = acc.movements
    .filter((val) => val > 0)
    .reduce((a, b) => a + b);
  labelSumIn.textContent = `₹${totalInput}`;
};

////////////////////////////////////////////////////////////////////////////
// DISPLAYING OUTPUT
const displayOutput = (acc) => {
  let totalOutput = acc.movements
    .filter((val) => val < 0)
    .reduce((a, b) => a + b);
  labelSumOut.textContent = `₹${Math.abs(totalOutput)}`;
};

////////////////////////////////////////////////////////////////////////////
// DISPLAYING INTEREST
const displayInterest = (acc) => {
  const totalInterest = Math.floor(
    acc.movements
      .filter((data) => data > 0)
      .map((data) => data * 0.06)
      .reduce((a, b) => a + b)
  );
  labelSumInterest.textContent = `₹${totalInterest}`;
};

////////////////////////////////////////////////////////////////////////////
// DISPLAYING NAME AND DATE
const displayName = (acc) => {
  labelWelcome.textContent = `Hello, ${acc.owner.split(" ")[0]} 👋`;
  labelDate.textContent = `As of ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
};

// 🚩 If we want to loop two arrays in same method then we can use method for looping one and index for other.

////////////////////////////////////////////////////////////////////////////
// DISPLAYING MOVEMENTS
const displayMovements = (acc) => {
  containerMovements.innerHTML = "";

  acc.movements.map((data, i) => {
    let check = data > 0 ? "deposit" : "withdrawl";

    let displayDate = acc.movementsDates[i];

    if (!displayDate) {
      displayDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    }

    const html = `
    <div class="movement--card">
      <div class="card--type">
        <h3 class="${check}">${check.toUpperCase()}</h3>
        <h5>${displayDate}</h5>
      </div>
        <h1>₹${Math.abs(data)}</h1>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

////////////////////////////////////////////////////////////////////////////
// IMPLEMENTING TIMERS
const displayTimer = () => {
  let time = 600;
  const timer = setInterval(() => {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `You will be logged out in ${min}:${sec}`;
    time--;

    if (time === 0) {
      clearInterval(timer);
      containerApp.classList.add("hidden");
      containerSignin.classList.remove("hidden");
    }
    ////////////////////////////////////////////////////////////////////////////
    // IMPLEMENTING LOGOUT
    btnSignout.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(timer);
      containerApp.classList.add("hidden");
      containerSignin.classList.remove("hidden");
      labelInvaild.textContent = "";
      labelInvaild.classList.remove("invalid");
    });
  }, 1000);
};

////////////////////////////////////////////////////////////////////////////
// IMPLEMENTING TRANSFERS
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  let user = inputTransferTo.value.trim().toLowerCase();
  let amount = Number(inputTransferAmount.value);
  let transferTo = accounts.find((acc) => acc.username === user);

  if (
    transferTo &&
    amount > 0 &&
    amount < currentAccount.movements.reduce((a, b) => a + b)
  ) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);
    updateUI();
    inputTransferTo.value = inputTransferAmount.value = "";
    inputTransferAmount.blur();
  }
});

////////////////////////////////////////////////////////////////////////////
// IMPLEMENTING LOAN SYSTEM
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  let approved = false;
  let amount = Number(inputLoanAmount.value.trim());
  let displayDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  let html = `
    <div class="movement--card">
      <div class="card--type">
        <h3 class="pending">PENDING</h3>
        <h5>${displayDate}</h5>
      </div>
        <h1>₹${amount}</h1>
      </div>
    `;
  containerMovements.insertAdjacentHTML("afterbegin", html);
  setTimeout(() => {
    if (
      Number(currentAccount.movements.reduce((a, b) => a + b)) / 0.2 >=
      amount
    ) {
      currentAccount.movements.push(amount);
      updateUI();
      approved = true;
    }

    if (!approved) {
      console.log("helo");
      containerMovements.firstElementChild.remove();
    }
    inputLoanAmount.value = "";
    inputLoanAmount.blur();
  }, 5000);
});

////////////////////////////////////////////////////////////////////////////
// UPDATE UI
const updateUI = () => {
  displayBalance(currentAccount);
  displayInput(currentAccount);
  displayOutput(currentAccount);
  displayName(currentAccount);
  displayTimer();
  displayMovements(currentAccount);
  displayInterest(currentAccount);
  labelInvaild.textContent = "";
};

////////////////////////////////////////////////////////////////////////////
// IMPLEMENTING SIGNIN
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  accounts.find((acc) => {
    if (
      acc.username === inputLoginUsername.value.trim().toLowerCase() &&
      acc.pin === Number(inputLoginPin.value.trim())
    ) {
      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginPin.blur();
      currentAccount = acc;
      containerApp.classList.remove("hidden");
      containerSignin.classList.add("hidden");
      updateUI();
    } else {
      labelInvaild.textContent = "INVALID";
      labelInvaild.classList.add("invalid");
    }
  });
});
