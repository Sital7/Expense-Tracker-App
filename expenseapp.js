document.addEventListener("DOMContentLoaded", () => {
    const expenseTypeSelect = document.getElementById("expense-type");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseDetailInput = document.getElementById("expense-detail");
    const recordExpenseButton = document.getElementById("record-expense");
    const expenseList = document.getElementById("expense-list");
    const totalExpense = document.getElementById("total-expense");

    const toggleExpensesButton = document.getElementById("toggle-expenses");
    const toggleTotalButton = document.getElementById("toggle-total");

    // Retrieve expenses from localStorage or initialize to an empty array
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${expense.type} - Rs ${expense.amount.toFixed(2)}<br>Detail: ${expense.detail}
            <button class="edit" onclick="editExpense(${index})">Edit</button>
            <button class="delete" onclick="deleteExpense(${index})">Delete</button>`;
            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpense.textContent = `Total: Rs ${total.toFixed(2)}`;
    }

    function saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function recordExpense() {
        const type = expenseTypeSelect.value;
        const amount = parseFloat(expenseAmountInput.value.trim());
        const detail = expenseDetailInput.value.trim();
    
        if (type && amount && detail) {
            expenses.push({ type, amount, detail });
            expenseTypeSelect.value = "";
            expenseAmountInput.value = "";
            expenseDetailInput.value = "";
            renderExpenses();
            calculateTotal();
            saveExpenses();
            alert("Expense Recorded Successfully!"); // Pop-up after recording the expense
        } else {
            alert("Please fill in all fields.");
        }
    }

    // Delete Expense
    window.deleteExpense = function(index) {
        
        expenses.splice(index, 1);
        renderExpenses();  
        calculateTotal();  
        saveExpenses();    
    }

    // Edit Expense
    window.editExpense = function(index) {
        const expense = expenses[index];
        expenseTypeSelect.value = expense.type;
        expenseAmountInput.value = expense.amount;
        expenseDetailInput.value = expense.detail;

        // Change the button text to "Update Expense"
        recordExpenseButton.innerHTML = "Update Expense";

        // When the user clicks the "Update Expense" button, update the expense
        recordExpenseButton.onclick = function () {
            const updatedType = expenseTypeSelect.value;
            const updatedAmount = parseFloat(expenseAmountInput.value.trim());
            const updatedDetail = expenseDetailInput.value.trim();

            if (updatedType && updatedAmount && updatedDetail) {
                // Update the expense at the given index with the new data
                expenses[index] = { type: updatedType, amount: updatedAmount, detail: updatedDetail };
                expenseTypeSelect.value = "";
                expenseAmountInput.value = "";
                expenseDetailInput.value = "";
                recordExpenseButton.innerHTML = "Record Expense"; 

                renderExpenses();  
                calculateTotal();  
                saveExpenses();    
                alert("Expense Updated Successfully!"); 
            } else {
                alert("Please fill in all fields.");
            }
        };
    }

    // Event listener for recording expenses
    recordExpenseButton.addEventListener("click", recordExpense);

    // Toggle show/hide expenses
    toggleExpensesButton.addEventListener("click", () => {
        if (expenseList.style.display === "none") {
            expenseList.style.display = "block";
            toggleExpensesButton.textContent = "Hide Expenses";
        } else {
            expenseList.style.display = "none";
            toggleExpensesButton.textContent = "Show Expenses";
        }
    });

    // Toggle show/hide total
    toggleTotalButton.addEventListener("click", () => {
        if (totalExpense.style.display === "none") {
            totalExpense.style.display = "block";
            toggleTotalButton.textContent = "Hide Total";
        } else {
            totalExpense.style.display = "none";
            toggleTotalButton.textContent = "Show Total";
        }
    });

    // Initial rendering of expenses and total
    renderExpenses();
    calculateTotal();
});
