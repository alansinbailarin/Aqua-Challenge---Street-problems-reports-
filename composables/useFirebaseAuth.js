import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export function useFirebaseAuth() {
  const { $toast } = useNuxtApp();
  const route = useRoute();
  const { $auth } = useNuxtApp();
  const userInfo = useLocalStorage(null, "userInfo");
  const token = useLocalStorage(null, "token");

  const register = async (email, password) => {
    const registerPromise = createUserWithEmailAndPassword(
      $auth,
      email,
      password
    );

    $toast.promise(registerPromise, {
      loading: "Registrando...",
      success: (response) => {
        const user = response.user;
        console.log(user);

        if (user) {
          navigateTo("/auth/login");
        }

        return "Registro exitoso. Redirigiendo...";
      },
      error: (error) => {
        console.error(error);
        return "Credenciales inválidas. Lo sentimos, parece ser que este email ya está en uso";
      },
    });
  };

  const login = async (email, password) => {
    const loginPromise = signInWithEmailAndPassword($auth, email, password);

    $toast.promise(loginPromise, {
      loading: "Iniciando sesión...",
      success: async (response) => {
        const user = response.user;

        if (user) {
          userInfo.value = user;
          token.value = userInfo.value.stsTokenManager.accessToken;
          await navigateTo("/");

          window.location.reload();
        }

        return "Inicio de sesión exitoso. Redirigiendo...";
      },
      error: (error) => {
        console.error(error);
        return "Credenciales incorrectas. Vaya, parece ser que las credenciales introducidas no son correctas.";
      },
    });
  };

  const logout = async () => {
    userInfo.value = null;
    token.value = null;
    await signOut($auth);

    await navigateTo("/auth/login");
  };

  const currentUser = () =>
    new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged($auth, (user) => {
        unsubscribe();
        console.log("Current user");
        watch(userInfo, async (newUserInfo, oldUserInfo) => {
          if (user !== null) {
            userInfo.value = user;

            if (userInfo.value && route.path === "/") {
              window.location.reload();
            }
          }
        });
        userInfo.value = user;
        resolve(user);
      });
    });

  return { register, login, logout, currentUser, userInfo };
}
