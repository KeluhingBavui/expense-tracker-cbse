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
  notificationsChannelLabel: string;
  notificationsChannelDescription: string;
  notificationsChannelWebLabel: string;
  notificationsChannelEmailLabel: string;
}> = ({
  settings,
  sessionUserId,
  notificationsChannelLabel,
  notificationsChannelDescription,
  notificationsChannelWebLabel,
  notificationsChannelEmailLabel,
}) => {
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

      alert(`Email notifications ${emailEnbld ? 'disabled' : 'enabled'}`);
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

      alert(`Web notifications ${webEnbld ? 'disabled' : 'enabled'}`);
    } catch (error) {
      console.error(error);
      alert('Error enabling web');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{notificationsChannelLabel}</CardTitle>
        <CardDescription>{notificationsChannelDescription}</CardDescription>
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
                {notificationsChannelWebLabel}
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
                {notificationsChannelEmailLabel}
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsChannelCard;
