'use client';

import { useUserSession } from '@/hooks/useUserSession';
import { axios } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Label } from '../ui/label';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

const options = [
  { value: 'en', label: 'English' },
  { value: 'ms', label: 'Malay' },
  { value: 'zh', label: 'Mandarin' },
  { value: 'ta', label: 'Tamil' },
  { value: 'ar', label: 'Arabic' },
];

const LanguageField = ({
  language,
  label,
}: {
  language: string;
  label: string;
}) => {
  const { session } = useUserSession();
  const { theme: nextTheme } = useTheme();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<{
    value: string;
    label: string;
  } | null>({
    value: language,
    label: options.find((option) => option.value === language)?.label || '',
  });

  useEffect(() => {
    const updateLanguage = async () => {
      try {
        const response = await axios.put('/settings/updateLanguage', null, {
          params: {
            userId: session?.user.id,
            newLanguage: selectedLanguage?.value || '', // Use fallback if selectedLanguage is null
          },
        });
        router.push(`/${response.data.language}/settings`);
      } catch (error) {
        console.error('Error updating language:', error);
        // Handle errors here
      }
    };

    updateLanguage();
  }, [selectedLanguage, session]);

  const handleLanguageChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedLanguage(selectedOption);
  };

  return (
    <div>
      <Label className="text-md">{label}</Label>
      <Select
        options={options}
        defaultValue={selectedLanguage}
        onChange={handleLanguageChange}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: nextTheme === 'dark' ? '#1f2937' : '#ffffff',
            neutral0: nextTheme === 'dark' ? '#1f2937' : '#ffffff',
            neutral80: nextTheme === 'dark' ? '#ffffff' : '#1f2937',
          },
        })}
      />
    </div>
  );
};

export default LanguageField;
