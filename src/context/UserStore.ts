import {create} from 'zustand';

export type User = {
  name: string;
  email: string;
  picture: string;
};

export type UserStore = {
  user: User;
  updateUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    picture: 'https://picsum.photos/200',
  },
  updateUser: (user: User) => set({ user }),
}));