import { create } from "zustand";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { UserType } from "src/objects/user/types";
import type { VNRecordType } from "src/types/general";

type UserState = {
  currentUser: UserType | null;
  users: Array<UserType> | null;
  userTypes: Array<VNRecordType> | null;
  isResponding: boolean;
};

type UserActions = {
  // For user
  setCurrentUser(user: UserType | null): void;
  setUsers(users: Array<UserType> | null): void;
  setUserTypes(userTypes: Array<VNRecordType> | null): void;
  addUsers(users: Array<UserType> | null): void;
  addUser(user: UserType): void;
  updateUser(user: UserType): void;
  deteteUser(user: UserType): void;
  updateIsResponding(status?: boolean): void;
  clearUsers(): void;
};

/**
 * Use this function to delete a user from a list.
 * @param list
 * @param user
 */
function deleteUserFromList(list: Array<UserType>, user: UserType | string) {
  let userId;

  if (typeof user === "string") {
    userId = user;
  } else {
    userId = user._id;
  }

  // Find index
  const userIndex = list.findIndex((user) => user._id === userId);

  // Delete
  list.splice(userIndex, 1);

  return list;
}

const initialState = {
  currentUser: null,
  users: null,
  userTypes: null,
  isResponding: false,
};

export const useUserState = create<UserState & UserActions>((set) => {
  return {
    ...initialState,
    updateIsResponding(status?: boolean) {
      set((state) => ({ ...state, isResponding: Boolean(status) }));
    },

    setCurrentUser(user) {
      set((state) => {
        return { ...state, currentUser: user };
      });
    },

    setUsers(users) {
      set((state) => {
        return { ...state, users: users };
      });
    },

    setUserTypes(userTypes) {
      set((state) => {
        return { ...state, userTypes };
      });
    },

    addUsers(users) {
      set((state) => {
        if (!users) return state;

        // Add users to global users
        if (state.users) state.users = state.users.concat(users);

        return {
          ...state,
          users: state.users,
        };
      });
    },

    addUser(user: UserType) {
      set((state) => {
        if (!state.users) state.users = [];

        // Push to global users
        state.users.push(user);

        return { ...state, users: state.users };
      });
    },

    updateUser(user: UserType) {
      set((state) => {
        if (!state.users) return state;
        if (!user) return state;

        const oldUserIndex = state.users.findIndex((t) => t._id === user._id);
        OtherUtils.replaceAt(state.users, oldUserIndex, user);

        return {
          ...state,
          users: state.users,
        };
      });
    },

    deteteUser(user: UserType) {
      set((state) => {
        if (!state.users) return state;

        // Delete from global store
        deleteUserFromList(state.users, user);

        return {
          ...state,
          users: state.users,
        };
      });
    },

    clearUsers() {
      set((state) => {
        return {
          ...state,
          ...initialState,
        };
      });
    },
  };
});
