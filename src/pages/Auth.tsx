
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const Auth = () => {
  const { user, signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onLoginSubmit = async (values) => {
    setIsLoading(true);
    setAuthError(null);
    const { error } = await signIn(values.email, values.password);
    if (error) {
      setAuthError(error.message);
    }
    setIsLoading(false);
  };

  const onSignupSubmit = async (values) => {
    setIsLoading(true);
    setAuthError(null);
    const { error } = await signUp(values.email, values.password);
    if (error) {
      setAuthError(error.message);
    }
    setIsLoading(false);
  };

  const onResetSubmit = async (values) => {
    setIsLoading(true);
    setAuthError(null);
    const { error } = await resetPassword(values.email);
    if (error) {
      setAuthError(error.message);
    } else {
      setResetSent(true);
    }
    setIsLoading(false);
  };

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <PasswordInput placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {authError && (
                        <div className="bg-destructive/15 text-destructive text-sm p-2 rounded-md">
                          {authError}
                        </div>
                      )}

                      <div className="text-sm text-right">
                        <Dialog open={openResetDialog} onOpenChange={setOpenResetDialog}>
                          <DialogTrigger asChild>
                            <Button variant="link" className="p-0 h-auto font-normal">
                              Forgot password?
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reset your password</DialogTitle>
                              <DialogDescription>
                                Enter your email address and we'll send you a link to reset your password.
                              </DialogDescription>
                            </DialogHeader>
                            {resetSent ? (
                              <div className="space-y-4">
                                <div className="bg-green-500/20 text-green-600 p-3 rounded-md">
                                  Check your email for a password reset link.
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="secondary">Close</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </div>
                            ) : (
                              <Form {...resetForm}>
                                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                                  <FormField
                                    control={resetForm.control}
                                    name="email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                          <Input placeholder="email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  {authError && (
                                    <div className="bg-destructive/15 text-destructive text-sm p-2 rounded-md">
                                      {authError}
                                    </div>
                                  )}
                                  
                                  <DialogFooter>
                                    <Button type="submit" disabled={isLoading}>
                                      {isLoading ? "Sending..." : "Send Reset Link"}
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </Form>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>
                    Enter your information to create a new account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <PasswordInput placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <PasswordInput placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {authError && (
                        <div className="bg-destructive/15 text-destructive text-sm p-2 rounded-md">
                          {authError}
                        </div>
                      )}

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="justify-center text-sm text-muted-foreground">
                  By creating an account, you agree to our 
                  <Button variant="link" className="p-0 h-auto font-normal mx-1">
                    Terms of Service
                  </Button>
                  and
                  <Button variant="link" className="p-0 h-auto font-normal ml-1">
                    Privacy Policy
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Auth;
