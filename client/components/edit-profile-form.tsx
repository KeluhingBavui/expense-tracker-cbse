"use client";

import { Profile } from "@/types/profile";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type EditProfileFormProps = {
  profile: {
    id: string;
    name: string;
    age: number;
    gender: string;
    userId: string;
  };
  buttonStyle?: string;
  session: any;
};

async function updateProfile(
  profile: Profile,
  token: string
): Promise<Profile> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/${profile.userId}`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Error updating profile: ");
    }

    await response.json();
    alert("Profile updated successfully");
    return profile;
  } catch (error) {
    throw new Error("Error updating profile: " + error);
  }
}

const EditProfileForm: React.FC<EditProfileFormProps> = (props) => {
  const router = useRouter();

  const profile = {
    ...props.profile,
  };

  const [profileForm, setProfileForm] = useState(profile);
  const [open, setOpen] = useState(false);
  const genders = ["Male", "Female"];

  const handleSubmit = async () => {
    const reqBody: Profile = {
      id: profileForm.id,
      name: profileForm.name,
      age: profileForm.age,
      gender: profileForm.gender,
      userId: profileForm.userId,
    };

    await updateProfile(reqBody, props.session.access_token).then(() => {
      setOpen(false);
    });
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={props.buttonStyle}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Profile</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile-name" className="text-right">
              Name
            </Label>
            <Input
              id="profile-name"
              defaultValue={profileForm.name}
              type="text"
              className="col-span-3"
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile-age" className="text-right">
              Age
            </Label>
            <Input
              id="profile-age"
              defaultValue={profileForm.age}
              type="number"
              className="col-span-3"
              onChange={(e) =>
                setProfileForm((prev) => ({
                  ...prev,
                  age: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile-gender" className="text-right">
              Gender
            </Label>
            <Select
              defaultValue={profileForm.gender}
              onValueChange={(value) =>
                setProfileForm((prev) => ({ ...prev, gender: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 flex justify-center">
              <Button variant="default" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
