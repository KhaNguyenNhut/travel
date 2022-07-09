const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv/config');
const routers = require('./routers/api');
const bodyParser = require('body-parser');
const path = require('path');

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3002'],
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data);
  });
  // // socket listen orders
  // socket.on("send_orders", async (data) => {
  //   const orderModel = {
  //     foods: data.foods,
  //     totalPrice: data.totalPrice,
  //     table: data.table,
  //     notes: data.notes,
  //   };
  //   const response = await createOrder(orderModel);
  //   io.emit("receive_orders", response);
  //   io.to(data.table).emit("receive_table_order", response);
  // });
  // socket.on("send_update_order", async (data) => {
  //   await updateStatusOrder(data);
  //   io.to(data.table?._id).emit("receive_update_order", data);
  // });
  // // socket listen call servant
  // socket.on("call_servants", async (data) => {
  //   io.emit("receive_call_servants", data);
  // });
  // // socket listen checkouts
  // socket.on("send_checkout", async (data) => {
  //   const orderModel = {
  //     foods: data.foods,
  //     totalPrice: data.totalBill,
  //     table: data.table,
  //   };
  //   const response = await createBill(orderModel);
  //   io.to(data.table?._id).emit("receive_table_send_checkout", response);
  // });
});

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
  })
);

let allowCrossDomain = function (req, res, next) {
  res.header('Cross-Origin-Resource-Policy', 'http://localhost:3000');
  next();
};

app.use(allowCrossDomain);

app.use(express.json());

// const clientDir = path.resolve(__dirname, "uploads");
// app.use(express.static(clientDir));

//routers
app.use('/api', routers);

// DB connection
// mongoose.connect("mongodb://localhost:27017/travelApp", () => {
//   console.log("connected to DB !");
// });
mongoose.connect('mongodb://0.0.0.0:27017/travel').then(
  () => {
    console.log('connected to DB !');
  },
  (err) => {
    //Your error handling
    console.log(err);
  }
);

server.listen(3001, () => {
  console.log(`🚀 Server ready at http://localhost: 3001`);
});
