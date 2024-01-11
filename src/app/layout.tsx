import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'r3f-lost-pixel',
  description:
    'Visual regression testing example with lost-pixel and react-three-fiber',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://rsms.me/' />
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      </head>
      <body className='bg-black text-white'>{children}</body>
    </html>
  );
}
