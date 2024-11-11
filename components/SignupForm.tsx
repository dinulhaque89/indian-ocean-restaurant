"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

const passwordRequirements = [
  {
    regex: /.{8,}/,
    message: "At least 8 characters long"
  },
  {
    regex: /[A-Z]/,
    message: "Contains uppercase letter"
  },
  {
    regex: /[a-z]/,
    message: "Contains lowercase letter"
  },
  {
    regex: /[0-9]/,
    message: "Contains a number"
  },
  {
    regex: /[^A-Za-z0-9]/,
    message: "Contains special character"
  }
];

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requirements, setRequirements] = useState<boolean[]>(
    new Array(passwordRequirements.length).fill(false)
  );

  useEffect(() => {
    const newRequirements = passwordRequirements.map((req) =>
      req.regex.test(password)
    );
    setRequirements(newRequirements);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!requirements.every(Boolean)) {
      alert("Password doesn't meet all requirements!");
      return;
    }
    
    // Redirect to Auth0's universal login page with signup mode
    window.location.href = '/api/auth/login?screen_hint=signup';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <div className="text-sm text-muted-foreground">
              {passwordRequirements.map((req, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 ${
                    requirements[index] ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {requirements[index] ? "✓" : "×"} {req.message}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!requirements.every(Boolean) || password !== confirmPassword}
          >
            Create Account
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0"
              onClick={() => router.push('/auth/login')}
            >
              Sign in
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}