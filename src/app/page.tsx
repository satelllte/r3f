import NextLink from 'next/link';

export default function () {
  return (
    <div>
      <h1 className='select-none p-4 text-2xl font-bold sm:p-8 sm:text-4xl'>
        r3f
      </h1>
      <div className='flex flex-col gap-2 px-4 sm:px-8'>
        <Link href='/scenes/cube'>scenes/cube</Link>
        <Link href='/scenes/icosahedron'>scenes/icosahedron</Link>
        <Link href='/scenes/plane'>scenes/plane</Link>
        <Link href='/scenes/torus'>scenes/torus</Link>
      </div>
    </div>
  );
}

function Link({
  href,
  children,
}: {
  readonly href: string;
  readonly children: string;
}) {
  return (
    <NextLink className='underline' href={href}>
      {children}
    </NextLink>
  );
}
