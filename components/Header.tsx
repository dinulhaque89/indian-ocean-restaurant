'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleAuth = () => {
    if (user) {
      sessionStorage.removeItem('guestUser');
      window.location.href = '/api/auth/logout';
    } else {
      // Direct to Auth0 login
      window.location.href = '/api/auth/login';
    }
  };

  const handleSignup = () => {
    // Direct to Auth0 signup
    window.location.href = '/api/auth/signup?screen_hint=signup';
  };

  const handleGuestLogin = () => {
    sessionStorage.setItem('guestUser', 'true');
    window.location.href = '/menu/starters';
  };

  const handleGuestLogout = () => {
    sessionStorage.removeItem('guestUser');
    window.location.href = '/';
  };

  const displayName = user ? user.name : sessionStorage.getItem('guestUser') === 'true' ? 'Guest' : null;

  return (
    <header className="bg-beige p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="The Indian Ocean" width={86} height={91} />
      </Link>
      
      {isLoading ? (
        <Button disabled>Loading...</Button>
      ) : displayName ? (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Welcome, {displayName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {displayName === 'Guest' ? (
                <>
                  <DropdownMenuItem onClick={handleAuth}>
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGuestLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Exit Guest Mode
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={handleAuth}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button onClick={handleAuth}>Sign In</Button>
          <Button onClick={handleSignup} variant="outline">Sign Up</Button>
          <Button onClick={handleGuestLogin} variant="ghost">Guest Mode</Button>
        </div>
      )}
    </header>
  );
};

export default Header;