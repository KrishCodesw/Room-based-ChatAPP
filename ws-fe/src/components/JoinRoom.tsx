import { useState } from "react";

interface JoinRoomProps {
  onJoin: (username: string, roomId: string) => void;
}

export default function JoinRoom({ onJoin }: JoinRoomProps) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && roomId.trim()) {
      onJoin(username.trim(), roomId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-white p-6 rounded-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Join Chat Room</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded-md text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Room ID"
          className="w-full p-2 rounded-md text-white"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
        >
          Join Room
        </button>
      </form>
    </div>
  );
}
