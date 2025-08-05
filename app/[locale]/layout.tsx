import type { Metadata } from 'next';
import '../../styles/globals.css'
import { ConditionalLayout } from '../../components/ConditionalLayout';
import { CartProvider } from './context/CartContext';
import { locales } from '../../i18n';
import LocaleLayoutProvider from '../../components/providers/LocaleLayoutProvider';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'EGLO',
  description: 'EGLO | Feels like home',
  icons: {
    icon: '/assets/images/icon.png?v=1',
    shortcut: '/assets/images/icon.png?v=1',
    apple: '/assets/images/icon.png?v=1',
  },
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <LocaleLayoutProvider locale={locale} messages={messages}>
      <CartProvider>
        <ConditionalLayout>
          {props.children}
        </ConditionalLayout>
      </CartProvider>
    </LocaleLayoutProvider>
  );
}