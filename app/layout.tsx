import type { Metadata } from 'next';
import '../styles/globals.css'
import { ConditionalLayout } from '../components/ConditionalLayout';
import { CartProvider } from './context/CartContext';

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

export default async function Layout(props: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ConditionalLayout>
            {props.children}
          </ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}