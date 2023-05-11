import React from "react";
import LogoutButton from "../../../../components/LogoutButton";
import { User, useUserStore } from "../../../../context/UserStore";

type ProfileCardProps = {
  user: User;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { updateUser } = useUserStore();

  return (
    <div className="mb-4 w-full rounded-md bg-mm-foreground p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <img
          className="mr-4 h-16 w-16 rounded-full"
          src={user.profilePicture}
          alt={`${user.username}'s profile picture`}
        />
        <div>
          <h1 className="text-lg font-bold text-mm-text-white">{user.username}</h1>
          <p className="text-sm text-mm-text-dark">{user.email}</p>
        </div>
        <div className="block">
          {/* <button
            className="m-2 rounded-lg bg-mm-primary px-4 py-2 text-mm-text-white hover:bg-opacity-75"
            //   onClick={handleEditProfile}
          >
            Profil bearbeiten
          </button> */}
          <LogoutButton />
        </div>
      </div>
      <div className="flex justify-between"></div>
    </div>
  );
};

export default ProfileCard;
