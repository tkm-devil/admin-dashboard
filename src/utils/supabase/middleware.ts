// src/utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/types/supabase';

export async function updateSession(request: NextRequest) {
  // Start with a response bound to the current request
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set cookies on both request and response
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });

          // Rebind updated cookies to the response
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 🔒 Don't put anything between client creation and getUser!
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth',
    '/about',
    '/contact',
    '/pricing',
    '/privacy',
    '/terms',
  ];

  const isPublicRoute = publicRoutes.includes(pathname) || 
                       pathname.startsWith('/api/') ||
                       pathname.startsWith('/_next');

  // If user is not authenticated and trying to access protected route
  if (!user && !isPublicRoute) {
    const authUrl = request.nextUrl.clone();
    authUrl.pathname = '/auth';
    authUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(authUrl);
  }

  // If user is authenticated and trying to access auth page
  if (user && pathname === '/auth') {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    return NextResponse.redirect(dashboardUrl);
  }

  // ✅ Return the response with updated cookies
  return response;
}