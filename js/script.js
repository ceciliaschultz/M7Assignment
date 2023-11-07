// M7 Assignment
// Maria Cecilia Schultz

const $ = (id) => document.getElementById(id)

// GET ADD EMPLOYEE FORM AND EMPLOYEE TABLE FROM THE DOM
let form = $('addForm')
let employees = $('employees')


// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault(); 

    // INSERT A NEW ROW AT THE END OF THE EMPLOYEES TABLE
    let row = employees.insertRow()

    // INSERT A CELL FOR EACH ITEM WITHIN THE NEW ROW
    // APPEND THE TEXT VALUES AS TEXT NODES WITHIN THE CELLS
    addToEmployees(row,'id')
    addToEmployees(row,'name')
    addToEmployees(row,'extension')
    addToEmployees(row,'email')
    addToEmployees(row,'department')

    // Add 'X' delete button to table row
    let cell = row.insertCell()
    let delBtn = document.createElement('button') // create button
    delBtn.className = 'btn btn-danger btn-sm float-end' // bootstrap classes
    delBtn.appendChild(document.createTextNode('X'))  // APPEND TEXT NODE TO DELETE BUTTON
    cell.appendChild(delBtn)     // append button to cell


    // refresh Employee  count
    refreshEmployeeCount()
    
    // RESET THE FORM
    form.reset()

    // SET FOCUS BACK TO THE ID TEXT BOX
    $('id').focus()

});



// Add a cell to the current table row
function addToEmployees(row,elementName) {
    let cell = row.insertCell()
    let value = $(elementName).value
    let textNode = document.createTextNode(value)
    cell.appendChild(textNode)

}

// Refresh the Employee count display
function refreshEmployeeCount() {
    let empCount = $('employees').rows.length -1  // subtract 1 to account for table header 

    // display employee count only if there are employees
    let empCountValue = "" // init
    if (empCount>0) {  
        empCountValue= `(${empCount})`  // "(count)"
    } 
    $('empCount').value = empCountValue
}

// DELETE EMPLOYEE
employees.addEventListener('click', (e) => {
    let elementClicked= e.target;  // this is HTMLButtonElement if the delete button is clicked
    let isButtonClicked = elementClicked instanceof HTMLButtonElement  // was the delete button clicked?

    // Proceed with employee deletion only if the delete button was clicked
    if (!isButtonClicked) {
        return; 
    }

    // Delete button was clicked, proceed
    if (confirm('Are you sure you want to delete this employee record?')) { // confirm proceed with employee deletion
         // get row index for the row clicked
         // note this will be 1 for the first td because the header th counts
        let rowIdx = elementClicked.parentElement.parentElement.rowIndex;
        console.log(`rowIdx= ${rowIdx}`)

        employees.deleteRow(rowIdx) // delete employee of row clicked
        refreshEmployeeCount()      // refresh employee count display
    }

})