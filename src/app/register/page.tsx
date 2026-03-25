
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      return "Please fill in all fields.";
    }
    if (!/[A-Z]/.test(formData.password)) {
      return "Password must contain at least one uppercase character.";
    }
    if (!/[0-9]/.test(formData.password)) {
      return "Password must contain at least one number.";
    }
    if (!formData.password.endsWith("red")) {
      return "Password must end with the word 'red'.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F5FF]">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-headline font-bold">Create an Account</CardTitle>
          <CardDescription>Join the elite club of professional delayers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="FutureSloth" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="later@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="mt-2 p-3 bg-muted rounded-lg text-xs space-y-1 border border-border">
                <p className="font-semibold text-muted-foreground uppercase tracking-wider mb-2">Password Criteria:</p>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                  <span className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-muted-foreground'}>At least one uppercase character</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                  <span className={/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-muted-foreground'}>At least one number</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${formData.password.endsWith('red') ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                  <span className={formData.password.endsWith('red') ? 'text-green-600' : 'text-muted-foreground'}>Must end with the word "red"</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-secondary text-secondary-foreground h-12 text-lg rounded-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-headline">Finally you registered!</DialogTitle>
            <DialogDescription>
              You've taken the first step towards a more disorganized life. Welcome aboard!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleCloseSuccess} className="bg-secondary rounded-full px-8">
              OK, let's go
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
