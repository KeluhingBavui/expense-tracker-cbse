import React from 'react';
import { axios } from '@/lib/axios';
import { Field as CurrencyField, List } from '@/components/settings/Currency';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Separator } from '@/components/ui/separator';
import LanguageField from '@/components/settings/LanguageField';
import ThemeField from '@/components/settings/ThemeField';
import NotificationsChannelCard from '@/components/settings/NotificationsChannelCard';
import NotificationsTypeCard from '@/components/settings/NotificationsTypeCard';

import { getTranslations } from 'next-intl/server';

const fetchSettings = async (userId: string) => {
  const { data } = await axios.get(`/settings`, {
    params: { userId },
  });
  return data;
};

const SettingsPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const settings = await fetchSettings(session?.user.id!);
  const t = await getTranslations('Settings');

  return (
    <div className="p-4">
      <h1 className="font-bold text-4xl my-2">{t('settings')}</h1>
      <h2 className="font-semibold text-2xl mt-4"> {t('generalSettings')}</h2>
      <Separator className="h-[3px] bg-white mb-4" />
      <div className="grid grid-cols-2 items-start">
        <div className="grid gap-8">
          <LanguageField language={settings.language} label={t('language')} />
          <ThemeField theme={settings.theme} label={t('theme')} />
          <CurrencyField
            currency={settings.currency}
            label={t('currency')}
            changeLabel={t('changeLabel')}
          />
          <Separator className="my-2" />
          <h2 className="font-semibold text-2xl">
            {t('notificationSettings')}
          </h2>
          <NotificationsChannelCard
            settings={settings}
            sessionUserId={session?.user.id!}
            notificationsChannelDescription={t(
              'notificationsChannelDescription'
            )}
            notificationsChannelEmailLabel={t('enableEmail')}
            notificationsChannelLabel={t('notificationsChannel')}
            notificationsChannelWebLabel={t('enableWeb')}
          />
          <NotificationsTypeCard
            settings={settings}
            sessionUserId={session?.user.id!}
          />
        </div>
        <List />
      </div>
    </div>
  );
};

export default SettingsPage;
