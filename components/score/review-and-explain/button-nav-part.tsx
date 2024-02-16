'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function ButtonNavigatePart({
  nextPartIndex,
  prevPartIndex
}: {
  nextPartIndex?: number;
  prevPartIndex?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (index: number) => {
    const params = new URLSearchParams();
    params.set('part', String(index));
    router.push(createUrl(pathname, params), { scroll: false });
  };

  return (
    <>
      {nextPartIndex && (
        <Button onClick={() => handleClick(nextPartIndex)}>Next</Button>
      )}
      {prevPartIndex && (
        <Button onClick={() => handleClick(prevPartIndex)}>Previous</Button>
      )}
    </>
  );
}

export default ButtonNavigatePart;
