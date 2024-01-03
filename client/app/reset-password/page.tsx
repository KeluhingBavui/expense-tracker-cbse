"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (hasSubmitted) {
      toast({
        title: "Password Reset",
        description: "Check your email for a password reset link",
      });

      timeoutId = setTimeout(() => {
        setHasSubmitted(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hasSubmitted, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset`,
      });
      setEmail("");
      setHasSubmitted(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    }
  };

  return (
    <form
      className="flex mt-10 items-center flex-col w-full max-w-sm content-center m-auto p-6 bg-sky-950 rounded-md"
      onSubmit={handleSubmit}
    >
      <Label className="mb-2 font-bold text-2xl">Reset Password</Label>
      <Input
        type="email"
        placeholder="your email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Button className="mt-2 w-full" size="sm" type="submit">
        Reset
      </Button>
    </form>
  );
};

export default ResetPasswordPage;
