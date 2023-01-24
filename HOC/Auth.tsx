import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export const Auth = ({ children }: { children: ReactElement<any, any> }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
      return <div>Loading...</div>;
    },
  });
  if (status === 'loading') return <div>Loading...</div>;

  return children;
};
