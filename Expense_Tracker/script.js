document.addEventListener('DOMContentLoaded', ()=>{
    const expenseForm = document.querySelector('#expense-form');
    const expenseNameInput = document.querySelector("#expense-name");
    const expenseAmountInput = document.querySelector("#expense-amount");
    const addBtn = document.querySelector("#btn");
    const expenseList = document.querySelector("#expense-list");
    const totalAmountDisplay = document.querySelector("#total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderExpence();
    let totalAmount = calculateTotal();

    expenseForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id: Date.now(),
                name,
                amount
            }
    
            expenses.push(newExpense);
            console.log(expenses);
            
            saveExpensesToLocal();
            renderExpence(newExpense)
            updateTotal();

            expenseNameInput.value = ""
            expenseAmountInput.value = ""
        }

    })

    function renderExpence(){
        expenseList.innerHTML = ""
        expenses.forEach(expense => {
            const li = document.createElement('li')
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}" >Delete</button>
            `;
            expenseList.appendChild(li);
        })
    }

    function calculateTotal(){
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function updateTotal(){
        totalAmount = calculateTotal();
         totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function saveExpensesToLocal(){
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

    expenseList.addEventListener('click', (e)=>{
        if(e.target.tagName === 'BUTTON'){
            const id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== id);
            saveExpensesToLocal();
            renderExpence();
            updateTotal();
        }
    })
})