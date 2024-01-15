"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const ResetPasswordPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
    } else {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (data) {
        setTimeout(() => {
          toast({ title: "Password updated successfully!" });
        }, 2000);
        router.push("/login");
      }
      if (error) {
        toast({ title: "There was an error updating your password." });
      }
    }
  };
  return (
    <form
      className="flex mt-10 items-center flex-col w-full max-w-sm content-center m-auto p-6 bg-sky-950 rounded-md"
      onSubmit={formSubmitHandler}
    >
      <h2 className="mb-4 font-bold text-2xl">Reset Password</h2>
      <Label className="mb-2 font-semibold self-start">Password</Label>
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <Label className="mb-2 mt-3 font-semibold self-start">
        Confrim Password
      </Label>
      <Input
        type="password"
        placeholder="password"
        value={passwordConfirmation}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPasswordConfirmation(e.target.value)
        }
      />
      <Button className="mt-2 w-full" size="sm" type="submit">
        Confirm
      </Button>
    </form>
  );
};

export default ResetPasswordPage;
