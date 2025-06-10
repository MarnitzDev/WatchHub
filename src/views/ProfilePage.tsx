import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState(user?.nickname || "");
    const [name, setName] = useState(user?.name || "");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to view your profile.</div>;
    }

    const handleSave = () => {
        // In a real application, you might want to update the user's metadata in Auth0 here
        // For now, we'll just update the local state
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Profile</h1>
            {isEditing ? (
                <>
                    <input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Nickname"
                    />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <p>Email: {user?.email}</p>
                    <p>Nickname: {nickname || "Not set"}</p>
                    <p>Name: {name || "Not set"}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default ProfilePage;
