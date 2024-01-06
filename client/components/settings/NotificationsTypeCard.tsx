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
        <CardTitle>Notifications Types</CardTitle>
        <CardDescription>
          Get control on which notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-5">
         
         
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsChannelCard;
