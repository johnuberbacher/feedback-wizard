import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, watchEffect } from "vue";

export const auth = getAuth();

export const currentUser = ref(null);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    let removeListener = onAuthStateChanged(auth, (user) => {
      currentUser.value = user;
      resolve(user);
    }, reject);
    // Set the initial value
    currentUser.value = auth.currentUser;
    // Watch for changes in the currentUser reference
    watchEffect(() => {
      removeListener();
      removeListener = onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
      });
    });
  });
};

export const getUserEmail = async () => {
  const user = await getCurrentUser();
  return user ? user.email : null;
};
