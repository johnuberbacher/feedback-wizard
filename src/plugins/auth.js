import { getAuth, onAuthStateChanged } from "firebase/auth";

export const auth = getAuth();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener();
      resolve(user);
    }, reject);
  });
};

export const getUserEmail = async () => {
  const user = await getCurrentUser();
  return user ? user.email : null;
};