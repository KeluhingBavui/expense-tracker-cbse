'use client';

import React, { useState } from 'react';
import { Settings } from '@/types/settings';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '../ui/checkbox';

const NotificationsChannelCard: React.FC<{
  settings: Settings;
  sessionUserId: string;
}> = ({ settings, sessionUserId }) => {
  const [emailEnbld, setEmailEnbld] = useState(settings.emailEnbld);
  const [webEnbld, setWebEnbld] = useState(settings.webEnbld);

  const handleEmail = async () => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/v1/settings/updateEmailEnbld?userId=${sessionUserId}&newEmailEnbld=${!emailEnbld}`,
        {
          method: 'PUT',
        }
      );

      if (!res.ok) {
        throw new Error('Internal Server Error');
      }

      alert('Email toggled');
    } catch (error) {
      console.error(error);
      alert('Error enabling email');
    }
  };

  const handleWeb = async () => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/v1/settings/updateWebEnbld?userId=${sessionUserId}&newWebEnbld=${!webEnbld}`,
        {
          method: 'PUT',
        }
      );

      if (!res.ok) {
        throw new Error('Internal Server Error');
      }

      alert('Web toggled');
    } catch (error) {
      console.error(error);
      alert('Error enabling web');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications Channel</CardTitle>
        <CardDescription>
          Receive notifications on either your email or on the web system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-5">
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              onClick={() => {
                setWebEnbld(!webEnbld);
                handleWeb();
              }}
              checked={webEnbld}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable Web
              </label>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              onClick={() => {
                setEmailEnbld(!emailEnbld);
                handleEmail();
              }}
              checked={emailEnbld}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable Email
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsChannelCard;
