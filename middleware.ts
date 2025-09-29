import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Lista de rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth/signin', '/auth/signup', '/'];

  // Permitir acesso às rotas públicas
  if (publicRoutes.includes(pathname))
  {
    return;
  }

  // Se não estiver autenticado, redirecionar para a home pública
  if (!req.auth)
  {
    return Response.redirect(new URL('/', req.url));
  }

  // Se estiver autenticado mas acessando a home, redirecionar para dashboard
  if (req.auth && pathname === '/')
  {
    return Response.redirect(new URL('/dashboard', req.url));
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
};