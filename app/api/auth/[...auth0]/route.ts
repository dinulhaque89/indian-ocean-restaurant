import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/menu/starters',
    authorizationParams: {
      prompt: 'login',
    }
  }),
  logout: handleLogout({
    returnTo: '/'
  })
});