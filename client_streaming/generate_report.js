let { employees } = require('./data.js')
const _ = require('lodash')

function generateReport(call, cb) {
  let successfulReports = []
  let failedReports = []
  call.on('data', (employeeStream) => {
    let employeeId = employeeStream.id;
    let employee = _.find(employees, { id: employeeId });
    if (employee != null) {
      successfulReports.push(employee.firstName);
    } else {
      failedReports.push(employeeId);
    }
  })
  call.on('end',() => {
    cb(null, {
        successfulReports: successfulReports.join(),
        failedReports: failedReports.join()
    })
  })
}

exports.generateReport = generateReport