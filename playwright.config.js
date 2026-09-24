import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', use: { ...devices['Pixel 7'] } },
    ],
    // Testa o build de produção (com pré-renderização), não o servidor de dev.
    webServer: {
        command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        // Credenciais falsas do EmailJS: o envio é interceptado nos testes e
        // nenhum e-mail real sai, mesmo se existir um .env local.
        env: {
            VITE_EMAILJS_SERVICE_ID: 'service_test',
            VITE_EMAILJS_TEMPLATE_ID: 'template_test',
            VITE_EMAILJS_PUBLIC_KEY: 'public_key_test',
        },
    },
});
