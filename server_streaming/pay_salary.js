let { employees } = require('./data.js');

function paySalary(call) {
    let employeeIdList = call.request.employeeIdList;
  
    employeeIdList.forEach(employeeId => {
      let employee =employees.find(r => r.id === employeeId) 
      if (employee != null) {
        let responseMessage = "Salary paid for ".concat(
          employee.firstName,
          ", ",
          employee.lastName);
        call.write({ message: responseMessage });
      }
      else{
        call.write({message: "Employee with Id " + employeeId + " not found in record"});
      }
  
    });
    call.end();
  
}
exports.paySalary = paySalary;