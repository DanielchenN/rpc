const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.join(__dirname, './proto/employee.proto')
const { paySalary } = require('./pay_salary.js');


const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
let employee_proto = grpc.loadPackageDefinition(packageDefinition)

function main() {
  let server = new grpc.Server()
  server.addService(employee_proto.employee.Employee.service, { paySalary })
  server.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()