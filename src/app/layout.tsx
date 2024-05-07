import { DevtoolsProvider } from '@providers/devtools';
import { GitHubBanner, Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { notificationProvider, RefineSnackbarProvider } from '@refinedev/mui';
import routerProvider from '@refinedev/nextjs-router';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';

import { ColorModeContextProvider } from '@contexts/color-mode';
import { authProvider } from '@providers/auth-provider';
import { dataProvider } from '@providers/data-provider';

export const metadata: Metadata = {
    title: 'Refine',
    description: 'Generated by create refine app',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = cookies();
    const theme = cookieStore.get('theme');
    const defaultMode = theme?.value === 'dark' ? 'dark' : 'light';

    return (
        <html lang="en">
            <body>
                <Suspense>
                    <RefineKbarProvider>
                        <ColorModeContextProvider defaultMode={defaultMode}>
                            <RefineSnackbarProvider>
                                <DevtoolsProvider>
                                    <Refine
                                        routerProvider={routerProvider}
                                        authProvider={authProvider}
                                        dataProvider={dataProvider}
                                        notificationProvider={
                                            notificationProvider
                                        }
                                        resources={[
                                            {
                                                name: 'books',
                                                list: '/books',
                                                create: '/books/create',
                                                edit: '/books/edit/:id',
                                                show: '/books/show/:id',
                                            },
                                            {
                                                name: 'users',
                                                list: '/users',
                                                create: '/users/create',
                                                edit: '/users/edit/:id',
                                                show: '/users/show/:id',
                                            },
                                        ]}
                                        options={{
                                            syncWithLocation: true,
                                            warnWhenUnsavedChanges: true,
                                            useNewQueryKeys: true,
                                            projectId: 'gEcL5b-ZWr9ex-s09jBf',
                                        }}
                                    >
                                        {children}
                                        <RefineKbar />
                                    </Refine>
                                </DevtoolsProvider>
                            </RefineSnackbarProvider>
                        </ColorModeContextProvider>
                    </RefineKbarProvider>
                </Suspense>
            </body>
        </html>
    );
}
