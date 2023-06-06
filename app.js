let monthlyBudget = 0;
let expenses = [];

function addAmount() {
    const budgetInput = document.getElementById('budgetInput');
    monthlyBudget = parseFloat(budgetInput.value);
    budgetInput.value = '';

    updateRemainingBudget();
}

function addExpense() {
    const descriptionDetails = document.getElementById('descriptionDetails');
    const amountInput = document.getElementById('amountInput');
    const dateInput = document.getElementById('dateInput');
    const expense = {
        description: descriptionDetails.value,
        amount: parseFloat(amountInput.value),
        date: dateInput.value
    };
    expenses.push(expense);
    descriptionDetails.value = '';
    amountInput.value = '';
    dateInput.value = '';
    displayExpenses();
    updateRemainingBudget();
}

function displayExpenses() {
    const expenseTable = document.getElementById('expenseTable');
    const tbody = expenseTable.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const row = document.createElement('tr');
        const descriptionCell = document.createElement('td');
        const amountCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const action = document.createElement('td');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');
        editButton.addEventListener("click", function () {
            editExpense(i);
        });
        deleteButton.addEventListener("click", deleteExpense)
        descriptionCell.textContent = expense.description;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit";
        action.appendChild(editButton);
        action.appendChild(deleteButton);
        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(action);
        tbody.appendChild(row);
    }
}

function updateRemainingBudget() {
    const totalBudget = document.getElementById('totalBudget');
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const difference = monthlyBudget - totalExpense;
    totalBudget.textContent = difference.toFixed(2);
    totalBudget.className = difference >= 0 ? 'text-green' : 'text-red';
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
    updateRemainingBudget();
}

function editExpense(index) {
    var expense = expenses[index];
    var description = prompt("Enter a new description:", expense.description);
    if (description === null) {
        return;
    }
    var amount = prompt("Enter a new amount:", expense.amount);
    if (amount === null) {
        return;
    }
    var date = prompt("Enter a new date:", expense.date);
    if (date === null) {
        return;
    }

    expense.description = description;
    expense.amount = parseFloat(amount);
    expense.date = date;
    displayExpenses();
    updateRemainingBudget();
}