'use client';

import { useUserSession } from '@/hooks/useUserSession';
import { axios } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTheme } from 'next-themes';

const options = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const ThemeField = ({ theme }: { theme: string }) => {
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
        console.log(selectedtheme?.value);
        // Set theme in NextJS
        setTheme(selectedtheme?.value || 'light');
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
      <Select
        options={options}
        defaultValue={selectedtheme}
        onChange={handleThemeChange}
      />
    </div>
  );
};

export default ThemeField;
