const http = require("http");

const router = require("./routes/blogRoutes");
const app = require('./app');

const PORT = process.env.PORT || 3000;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

/*mongoose.connect("mongodb://localhost:27017", options).then(() => {
  console.log("Server successfully connected to database");
});*/

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});