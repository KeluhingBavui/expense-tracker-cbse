'use client';

import { useUserSession } from '@/hooks/useUserSession';
import { axios } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTheme } from 'next-themes';
import { Label } from '../ui/label';

const options = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const ThemeField = ({ theme, label }: { theme: string; label: string }) => {
  const { session } = useUserSession();
  const { setTheme } = useTheme();
  const [selectedtheme, setSelectedtheme] = useState<{
    value: string;
    label: string;
  } | null>({
    value: theme,
    label: options.find((option) => option.value === theme)?.label || '',
  });

  useEffect(() => {
    const updateTheme = async () => {
      try {
        await axios.put('/settings/updateTheme', null, {
          params: {
            userId: session?.user.id,
            newTheme: selectedtheme?.value || '', // Use fallback if selectedtheme is null
          },
        });
        // Set theme in NextJS
        if (selectedtheme?.value) {
          setTheme(selectedtheme.value);
        }
      } catch (error) {
        console.error('Error updating theme:', error);
        // Handle errors here
      }
    };

    updateTheme();
  }, [selectedtheme, session, setTheme]);

  const handleThemeChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedtheme(selectedOption);
  };

  return (
    <div>
      <Label className="text-md">{label}</Label>
      <Select
        options={options}
        defaultValue={selectedtheme}
        onChange={handleThemeChange}
        theme={(theme: { colors: any; }) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: selectedtheme?.value === 'dark' ? '#1f2937' : '#ffffff',
            neutral0: selectedtheme?.value === 'dark' ? '#1f2937' : '#ffffff',
            neutral80: selectedtheme?.value === 'dark' ? '#ffffff' : '#1f2937',
          },
        })}
      />
    </div>
  );
};

export default ThemeField;
