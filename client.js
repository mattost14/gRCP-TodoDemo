const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

client.createTodo({
  "id": -1,
  "text": "Do laundry"
}, (err, response) => {
  console.log("Received from server " + JSON.stringify(response))
})

// client.readTodos(null, (err, response) => {
//   if(response.items)
//     response.items.forEach(a => console.log(a.text))
// })


const call = client.readTodosStream();
call.on("data", item => {
  console.log("Streamed from server: " + JSON.stringify(item))
})
call.on("end", e => console.log("server done."))