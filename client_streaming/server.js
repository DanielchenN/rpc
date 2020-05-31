const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const { paySalary } = require('./pay_salary.js')
const { generateReport } = require('./generate_report.js')

const PROTO_PATH = path.join(__dirname, './proto/employee.proto')

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const employee_proto = grpc.loadPackageDefinition(packageDefinition).employee

function main() {
  let server = new grpc.Server()
  server.addService(employee_proto.Employee.service,
    { 
      paySalary: paySalary ,
      generateReport: generateReport 
    }
  )
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()