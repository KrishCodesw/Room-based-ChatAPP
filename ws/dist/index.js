"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allsockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            allsockets = allsockets.filter((user) => user.socket !== socket);
            allsockets.push({
                socket,
                username: parsedMessage.payload.username,
                roomId: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            // const usercurrentroom =allsockets.find((x)=>{x.socket==socket})
            let usercurrentroom = null;
            for (let i = 0; i < allsockets.length; i++) {
                if (allsockets[i].socket === socket) {
                    usercurrentroom = allsockets[i].roomId;
                    break;
                }
            }
            for (let i = 0; i < allsockets.length; i++) {
                if (allsockets[i].roomId == usercurrentroom) {
                    allsockets[i].socket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: parsedMessage.payload.message,
                            username: parsedMessage.payload.username
                        }
                    }));
                }
            }
        }
    });
    socket.on("close", () => {
        allsockets = allsockets.filter((user) => user.socket !== socket);
    });
});
// import Websocket , {WebSocketServer} from "ws";
// const wss=new WebSocketServer({port:8080})
// let usercount=0;
// const allsockets:Websocket[]=[];
// wss.on('connection',function connection(socket){
// allsockets.push(socket);
//     usercount=usercount+1;
//     console.log("User connected #"+usercount);
//     socket.on("message",(e)=>{                     //Whenever this socket recieves a message run this callback 
//         console.log("message recieved: "+e.toString());
//     allsockets.forEach(sockete => {
//          setTimeout(() => {
//             sockete.send(e.toString()+" : Sent from the server ")
//         }, 1000);
//     });
//          })
//          socket.on("disconnect",()=>{
//             allsockets.filter(x=>x!=socket)
//          })
// }) 
