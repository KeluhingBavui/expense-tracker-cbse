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

const NotificationsTypeCard: React.FC<{
  settings: Settings;
  sessionUserId: string;
}> = ({ settings, sessionUserId }) => {
  const [notificationTypes, setNotificationTypes] = useState(
    settings.notifTypes || []
  );

  const handleCheckboxChange = async (type: string, label: string) => {
    const updatedNotificationTypes = notificationTypes.includes(type)
      ? notificationTypes.filter((t) => t !== type)
      : [...notificationTypes, type];

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/settings/updateNotifTypes`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: sessionUserId,
            newNotifTypes: updatedNotificationTypes,
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Internal Server Error');
      }

      setNotificationTypes(updatedNotificationTypes);
      alert(
        `${label} ${
          updatedNotificationTypes.includes(type)
            ? 'notification enabled'
            : 'notification disabled'
        }`
      );
    } catch (error) {
      console.error(error);
      alert(`Error toggling ${type}`);
    }
  };

  const notificationTypeCheckboxes = [
    { type: 'EXP_SUM', label: 'Expense Summary' },
    { type: 'LOAN_CMPLTD', label: 'Loan Completed' },
    { type: 'LOAN_RMND', label: 'Loan Reminder' },
    { type: 'SAV_CMPLTD', label: 'Savings Completed' },
    { type: 'SAV_RMND', label: 'Savings Reminder' },
  ];

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
          {notificationTypeCheckboxes.map(({ type, label }) => (
            <div className="flex items-center space-x-2" key={type}>
              <Checkbox
                key={type}
                checked={notificationTypes.includes(type)}
                onClick={() => {
                  setNotificationTypes((prev) =>
                    prev.includes(type)
                      ? prev.filter((t) => t !== type)
                      : [...prev, type]
                  );
                  handleCheckboxChange(type, label);
                }}
              />
              <p>{label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTypeCard;
