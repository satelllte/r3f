import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'r3f',
  description: 'A playground for react-three-fiber',
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
      <body className='bg-black text-white'>
        <div className='absolute h-full w-full'>
          <div className='absolute h-full w-full'>
            <h1 className='select-none px-4 pb-4 pt-16 text-2xl font-bold sm:px-8 sm:pt-16 sm:text-4xl'>
              r3f
            </h1>
          </div>
          <div className='absolute h-full w-full'>{children}</div>
        </div>
      </body>
    </html>
  );
}
