export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  const { currentUser, userInfo } = useFirebaseAuth();

  const user = await currentUser();

  if (!userInfo && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }
});
