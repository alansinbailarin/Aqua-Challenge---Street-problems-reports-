export default defineNuxtRouteMiddleware(async (to, from) => {
  const { currentUser } = useFirebaseAuth();

  const user = await currentUser();

  if (user && to.path !== "/") {
    return navigateTo("/");
  }
});
