document.addEventListener('DOMContentLoaded', () =>{

    // all the required elements
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = getTotalAmount();
    renderExpenses();
    updateTotalAmount();

    // to submit the form
    expenseForm.addEventListener('submit', (e) =>{

        e.preventDefault();

        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name === "" || isNaN(amount) || amount <= 0){
            
            return ;
        }
        
        const newExpense = {
            id: Date.now(),
            name,
            amount
        };

        expenses.push(newExpense);
        saveExpensesToLocal();
        renderExpenses();
        updateTotalAmount();


        // to clear input
        expenseNameInput.value = "";
        expenseAmountInput.value = "";
    });


    // to render expenses
    function renderExpenses(){
        expenseList.innerHTML = "";

        expenses.forEach(expense =>{

            const li = document.createElement('li');

            li.innerHTML = `

                <span>${expense.name} - $${expense.amount.toFixed(2)}</span>
                <button data-id="${expense.id}">Delete</button>
            
            `;

            expenseList.appendChild(li);
        })
    }

    //to save expenses to local storage
    function saveExpensesToLocal(){
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // to calculate the total amount
    function getTotalAmount(){
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    // to update total amount
    function updateTotalAmount(){
        totalAmount = getTotalAmount();
        totalAmountDisplay.textContent = `${totalAmount.toFixed(2)}`;
    }

    // to delete an expense
    expenseList.addEventListener('click', (e) =>{

        if(e.target.tagName !== 'BUTTON') return;

        const expenseId = parseInt(e.target.getAttribute('data-id'));

        expenses = expenses.filter(expense => expense.id !== expenseId);
        e.target.parentElement.remove();
        console.log(expenses);

        renderExpenses();
        saveExpensesToLocal();
        updateTotalAmount();
    });
});