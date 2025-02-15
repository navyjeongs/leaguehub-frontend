import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import LastVisitedBoardListsProvider from '@components/providers/LastVisitedBoardListsProvider';
import ProfileProvider from '@components/providers/ProfileProvider';
import MakeGameProvider from '@components/providers/MakeGameProvider';
import ChannelsProvider from '@components/providers/ChannelsProvider';
import Layout from '@components/layout';
import initMockAPI from '@mocks/index';
import ModalsProvider from '@components/providers/ModalProvider';
import ShowModals from '@components/Modal/showModals';

if (process.env.NODE_ENV === 'development') {
  initMockAPI();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChannelsProvider>
          <ProfileProvider>
            <LastVisitedBoardListsProvider>
              <MakeGameProvider>
                <ModalsProvider>
                  <ShowModals />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ModalsProvider>
              </MakeGameProvider>
            </LastVisitedBoardListsProvider>
          </ProfileProvider>
        </ChannelsProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
