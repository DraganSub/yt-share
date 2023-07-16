import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database, pushData } from "../db";

export default function LandingPage() {
    //show all available rooms if there are any
    //input to create room + redirect to that room ( useNavigate )

    const [availableRooms, setAvailableRooms] = useState(null)

    useEffect(() => {
        const dispose = onValue(ref(database, "/rooms"), (snapshot) => {
            const roomList = snapshot.val();
            if (roomList) {
                setAvailableRooms(roomList);
            }
        });
        return () => {
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

    const joinRoom = (event, roomId) => {
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
                    <button onClick={(e) => joinRoom(e, room[0])}>
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
            await pushData("rooms/", { "name": roomName })
        }
    }

    return <div><input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} /> <button onClick={createRoom}>Create room</button></div>
}