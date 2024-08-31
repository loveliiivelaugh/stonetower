import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { AuthProvider } from '../Auth/Auth';
import { AppRouter } from '../routes';
import { PageTransitionWrapper, ThemeProvider } from '../theme/ThemeProvider';


// *** NOTES ***
// ? AuthProvider ->
// ? QueryClientProvider ->
// ? ThemeProvider ->
// ? PageTransitionWrapper ->
// ? LocalizationProvider ->
// ? AppRouter ->

const queryClient = new QueryClient();

export const Providers = () => (
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <PageTransitionWrapper>
                        <AppRouter />
                    </PageTransitionWrapper>
                </LocalizationProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </AuthProvider>
);
