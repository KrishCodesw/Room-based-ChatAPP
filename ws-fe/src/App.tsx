import { useState, useEffect, useRef } from "react";
import JoinRoom from "./components/JoinRoom";

interface ChatMessage {
  username: string;
  message: string;
}

function App() {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const ws = useRef<WebSocket | null>(null);

  const handleJoin = (uname: string, room: string) => {
    setUsername(uname);
    setRoomId(room);
    setJoined(true);
  };

  // Setup WebSocket
  useEffect(() => {
    if (joined) {
      ws.current = new WebSocket("ws://localhost:8080");

      ws.current.onopen = () => {
        console.log("Connected to WS server");
        ws.current?.send(
          JSON.stringify({
            type: "join",
            payload: {
              username,
              roomId,
            },
          })
        );
      };

      ws.current.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === "chat") {
            const newMessage: ChatMessage = parsed.payload;
            setMessages((prev) => [...prev, newMessage]);
          }
        } catch (err) {
          console.error("Invalid message:", event.data);
        }
      };

      ws.current.onclose = () => {
        console.log("Disconnected from WS server");
      };

      ws.current.onerror = (err) => {
        console.error("WS error:", err);
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [joined]);

  // Handle message send
  const sendMessage = () => {
    if (input.trim() === "") return;
    ws.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: input,
          username,
        },
      })
    );
    setInput("");
  };

  return (
    <>
      {!joined ? (
        <JoinRoom onJoin={handleJoin} />
      ) : (
        <div className="min-h-screen bg-black text-white p-4 flex flex-col">
          <h1 className="text-xl mb-2">Welcome {username} to Room {roomId}</h1>

          <div className="flex-1 overflow-y-auto border rounded p-2 mb-4 bg-black">
            {messages.map((msg, i) => (
              <div key={i} className="mb-1">
                <span className="font-bold">{msg.username}:</span> {msg.message}
              </div>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded-l bg-black text-white"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-white text-black h-full m-2   rounded-r hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
