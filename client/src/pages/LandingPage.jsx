import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, child, push } from "firebase/database";
import { database, pushData } from "../db";

export default function LandingPage() {
    //show all available rooms if there are any
    //input to create room + redirect to that room ( useNavigate )

    const [availableRooms, setAvailableRooms] = useState(null)

    useEffect(() => {
        const dispose = onValue(ref(database, "/rooms-list"), (snapshot) => {
            const roomList = snapshot.val();
            if (roomList) {
                setAvailableRooms(roomList);
            }
        });
        return () => {
            setAvailableRooms(null);
            dispose();
        }
    }, [])

    return <div><RoomList availableRooms={availableRooms} /><AddRoom /> </div>
}

function RoomList({ availableRooms }) {

    const navigate = useNavigate();

    if (!availableRooms) {
        return;
    }

    const joinRoom = (roomId) => {
        localStorage.setItem("room_key", roomId);
        navigate(`/${roomId}`);
    }

    return <div>
        {Object.entries(availableRooms).map(room => {
            return (
                <div>
                    <div>
                        {room[1].name}
                    </div>
                    <button onClick={() => joinRoom(room[1].key)}>
                        Join
                    </button>
                </div>
            )
        })}
    </div>
}

function AddRoom() {
    const [roomName, setRoomName] = useState(null);

    const createRoom = async () => {
        if (roomName) {
            const key = push(ref(database, "/rooms"), { "name": roomName }).key;
            await pushData("rooms-list", { "name": roomName, "key": key });
        }
    }

    return <div><input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} /> <button onClick={createRoom}>Create room</button></div>
}