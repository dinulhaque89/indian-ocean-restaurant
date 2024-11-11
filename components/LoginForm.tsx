"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Mail, Eye, EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Direct integration with Auth0
    window.location.href = isSignUp 
      ? `/api/auth/login?screen_hint=signup&email=${encodeURIComponent(email)}`
      : `/api/auth/login?email=${encodeURIComponent(email)}`;
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/login?connection=google-oauth2';
  };

  const handleFacebookLogin = () => {
    window.location.href = '/api/auth/login?connection=facebook';
  };

  const handleGuestLogin = () => {
    sessionStorage.setItem('guestUser', 'true');
    window.location.href = '/menu/starters';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleFacebookLogin}
          >
            <Facebook className="h-5 w-5 text-blue-600" />
            Continue with Facebook
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <Mail className="h-5 w-5" />
            Continue with Google
          </Button>

          <div className="relative">
            <Separator className="my-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-2 text-muted-foreground text-sm">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            {isSignUp ? (
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignUp(false)}
              >
                Already have an account? Sign in
              </Button>
            ) : (
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignUp(true)}
              >
                Don't have an account? Sign up
              </Button>
            )}
          </div>

          <Separator className="my-4" />

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}