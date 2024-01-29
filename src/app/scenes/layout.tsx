import {type Metadata} from 'next';
import Link from 'next/link';
import {metadata as rootMetadata} from '../layout';

export const metadata = {
  ...rootMetadata,
  title: 'r3f scene',
} satisfies Metadata;

export default function SceneLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <div className='absolute size-full'>
        <Link
          className='absolute bottom-4 left-4 z-10 text-lg sm:bottom-8 sm:left-8'
          href='/'
        >
          {'<-'}
        </Link>
      </div>
      <div className='absolute size-full'>{children}</div>
    </>
  );
}
