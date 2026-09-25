import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const isMobile = (testInfo) => testInfo.project.name === 'mobile';

test.describe('carregamento e SEO', () => {
    test('HTML pré-renderizado já traz o conteúdo principal', async ({ request }) => {
        const html = await (await request.get('/')).text();
        expect(html).toContain('<html lang="pt-BR">');
        expect(html).toMatch(/<h1[^>]*>.*João Vitor.*Pereira/s);
        expect(html).toContain('Nexus Labz');
        expect(html).toContain('https://devborges.vercel.app/og-image.jpg');
        expect(html).toContain('"@type": "Person"');
    });

    test('página carrega sem erros de console nem recursos quebrados', async ({ page }) => {
        const problems = [];
        page.on('console', (msg) => msg.type() === 'error' && problems.push(msg.text()));
        page.on('pageerror', (err) => problems.push(err.message));
        page.on('response', (res) => res.status() >= 400 && problems.push(`${res.status()} ${res.url()}`));

        await page.goto('/');
        await expect(page).toHaveTitle(/João Vitor Pereira/);
        await expect(page.getByRole('heading', { level: 1 })).toContainText('João Vitor');
        await page.waitForLoadState('networkidle');

        expect(problems).toEqual([]);
    });

    test('arquivos públicos existem', async ({ request }) => {
        for (const path of ['/curriculo-joao-vitor-pereira.pdf', '/resume-joao-vitor-pereira.pdf', '/og-image.jpg', '/robots.txt', '/sitemap.xml', '/favicon.svg']) {
            const res = await request.get(path);
            expect(res.status(), path).toBe(200);
        }
    });
});

test.describe('acessibilidade', () => {
    test('sem violações WCAG A/AA detectáveis pelo axe', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto('/');
        // Rola a página para que as seções com animação de entrada fiquem visíveis
        await page.evaluate(async () => {
            for (let y = 0; y < document.body.scrollHeight; y += 400) {
                window.scrollTo(0, y);
                await new Promise((r) => setTimeout(r, 50));
            }
        });
        await page.waitForTimeout(800);

        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} elemento(s)`);
        expect(summary).toEqual([]);
    });

    test('links externos abrem com rel="noopener"', async ({ page }) => {
        await page.goto('/');
        const unsafe = await page.$$eval('a[target="_blank"]', (links) =>
            links.filter((a) => !/noopener/.test(a.rel)).map((a) => a.href),
        );
        expect(unsafe).toEqual([]);
    });
});

test.describe('navegação', () => {
    test('menu desktop leva à seção e marca o link ativo', async ({ page }, testInfo) => {
        test.skip(isMobile(testInfo), 'menu desktop');
        await page.goto('/');
        const link = page.locator('.nav-links a[href="#projects"]');
        await link.click();
        await expect(page.locator('#projects .section-title')).toBeInViewport();
        await expect(link).toHaveAttribute('aria-current', 'location');
    });

    test('menu mobile abre, fecha com Esc e devolve o foco', async ({ page }, testInfo) => {
        test.skip(!isMobile(testInfo), 'menu mobile');
        await page.goto('/');
        const button = page.getByRole('button', { name: 'Abrir menu' });
        await button.click();

        const nav = page.locator('#mobile-nav');
        await expect(nav).toBeVisible();
        await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');
        expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

        await page.keyboard.press('Escape');
        await expect(nav).toBeHidden();
        await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
    });

    test('link do menu mobile navega e fecha o menu', async ({ page }, testInfo) => {
        test.skip(!isMobile(testInfo), 'menu mobile');
        await page.goto('/');
        await page.getByRole('button', { name: 'Abrir menu' }).click();
        await page.locator('#mobile-nav a[href="#contact"]').click();
        await expect(page.locator('#mobile-nav')).toBeHidden();
        await expect(page.locator('#contact .section-title')).toBeInViewport();
    });
});

test.describe('projetos', () => {
    test('home mostra os destaques e leva à lista completa', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#projects .project-card')).toHaveCount(3);
        await page.getByRole('link', { name: /Ver todos os projetos/ }).click();
        await expect(page).toHaveURL(/\/projects\/$/);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('Todos os projetos');
        await expect(page.locator('.project-card')).toHaveCount(5);
    });

    test('filtro da página de projetos mostra só a categoria escolhida', async ({ page }) => {
        await page.goto('/projects/');
        const tab = page.getByRole('button', { name: 'Mobile' });
        await tab.click();
        await expect(tab).toHaveAttribute('aria-pressed', 'true');
        await expect(page.locator('.project-card h3')).toHaveText(['App Vitale — Gestão de Pilates']);
    });

    test('card leva à página do projeto, com anterior e próximo', async ({ page }) => {
        await page.goto('/projects/');
        await page.getByRole('link', { name: /RCP — Sistema de Concursos/ }).click();
        await expect(page).toHaveURL(/\/projects\/rcp\/$/);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText('RCP — Sistema de Concursos');
        await expect(page.getByRole('link', { name: /Ver no GitHub/ })).toHaveAttribute('href', /RCP-Sistema-De-Concursos/);

        await page.getByRole('link', { name: /Projeto anterior/ }).click();
        await expect(page).toHaveURL(/\/projects\/vitale\/$/);
        await expect(page.getByRole('link', { name: /Próximo projeto/ })).toHaveAttribute('href', '/projects/rcp/');
    });

    test('projeto de cliente sem repositório público mostra aviso em vez do GitHub', async ({ page }) => {
        await page.goto('/projects/vitale/');
        await expect(page.locator('.project-page-header')).toContainText('Projeto para cliente · código privado');
        await expect(page.getByRole('link', { name: /Ver no GitHub/ })).toHaveCount(0);
        await expect(page.locator('.project-page img')).toHaveAttribute('alt', /Mockups do App Vitale/);
    });

    test('HTML pré-renderizado com SEO próprio', async ({ request }) => {
        const html = await (await request.get('/en/projects/rcp/')).text();
        expect(html).toContain('<html lang="en" data-project="rcp">');
        expect(html).toContain('<link rel="canonical" href="https://devborges.vercel.app/en/projects/rcp/" />');
        expect(html).toMatch(/<h1[^>]*>RCP — Exam Prep Platform/);
    });

    for (const path of ['/projects/', '/projects/nathiara/', '/en/projects/video/']) {
        test(`${path} sem erros de console e sem violações WCAG A/AA`, async ({ page }) => {
            const problems = [];
            page.on('console', (msg) => msg.type() === 'error' && problems.push(msg.text()));
            page.on('pageerror', (err) => problems.push(err.message));
            await page.goto(path);
            await page.waitForLoadState('networkidle');
            expect(problems).toEqual([]);

            const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
            expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} elemento(s)`)).toEqual([]);
        });
    }
});

test.describe('tema', () => {
    test('botão troca para o tema claro e a escolha persiste', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Ativar tema claro' }).click();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
        await expect(page.getByRole('button', { name: 'Ativar tema escuro' })).toBeVisible();

        await page.goto('/projects/');
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
        await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
        await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'light');
    });

    test('tema claro sem violações WCAG A/AA', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('theme', 'light'));
        await page.emulateMedia({ reducedMotion: 'reduce' });
        for (const path of ['/', '/projects/rcp/', '/cases/nexus/']) {
            await page.goto(path);
            await page.evaluate(async () => {
                for (let y = 0; y < document.body.scrollHeight; y += 400) {
                    window.scrollTo(0, y);
                    await new Promise((r) => setTimeout(r, 50));
                }
            });
            await page.waitForTimeout(800);
            const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
            expect(results.violations.map((v) => `${path} ${v.id}: ${v.nodes.length} elemento(s)`)).toEqual([]);
        }
    });
});

test.describe('habilidades', () => {
    test('filtro por categoria mostra só os itens da categoria', async ({ page }) => {
        await page.goto('/');
        const tab = page.getByRole('button', { name: 'Banco de Dados' });
        await tab.click();
        await expect(tab).toHaveAttribute('aria-pressed', 'true');

        const names = page.locator('#skills .skill-card h3');
        await expect(names).toHaveText(['PostgreSQL', 'MySQL', 'SQL Server', 'Supabase', 'MongoDB']);
    });
});

test.describe('formulário de contato', () => {
    const fill = async (page) => {
        await page.getByLabel('Seu nome').fill('Recrutadora Teste');
        await page.getByLabel('Seu e-mail').fill('teste@example.com');
        await page.getByLabel('Sua mensagem').fill('Olá! Vi seu portfólio.');
    };

    test('envio com sucesso limpa o formulário', async ({ page }) => {
        let payload;
        await page.route('https://api.emailjs.com/**', async (route) => {
            payload = route.request().postDataJSON();
            await route.fulfill({ status: 200, body: 'OK' });
        });
        await page.goto('/#contact');
        await fill(page);
        await page.getByRole('button', { name: 'Enviar Mensagem' }).click();

        await expect(page.getByRole('status')).toContainText('Mensagem enviada com sucesso');
        await expect(page.getByLabel('Seu nome')).toHaveValue('');
        expect(payload.template_params).toMatchObject({
            from_name: 'Recrutadora Teste',
            from_email: 'teste@example.com',
        });
    });

    test('falha no envio mostra erro e mantém os dados', async ({ page }) => {
        await page.route('https://api.emailjs.com/**', (route) => route.fulfill({ status: 500, body: 'erro' }));
        await page.goto('/#contact');
        await fill(page);
        await page.getByRole('button', { name: 'Enviar Mensagem' }).click();

        await expect(page.getByRole('status')).toContainText('Não foi possível enviar');
        await expect(page.getByLabel('Seu nome')).toHaveValue('Recrutadora Teste');
    });

    test('honeypot preenchido não envia nada', async ({ page }) => {
        let requests = 0;
        await page.route('https://api.emailjs.com/**', (route) => {
            requests += 1;
            return route.fulfill({ status: 200, body: 'OK' });
        });
        await page.goto('/#contact');
        await fill(page);
        await page.locator('input[name="website"]').evaluate((el) => { el.value = 'spam'; });
        await page.getByRole('button', { name: 'Enviar Mensagem' }).click();

        await expect(page.getByRole('status')).toContainText('Mensagem enviada com sucesso');
        expect(requests).toBe(0);
    });
});

test.describe('case study Nexus Labz', () => {
    test('HTML pré-renderizado com conteúdo e SEO próprios', async ({ request }) => {
        const res = await request.get('/cases/nexus/');
        expect(res.status()).toBe(200);
        const html = await res.text();
        expect(html).toContain('<link rel="canonical" href="https://devborges.vercel.app/cases/nexus/" />');
        expect(html).toMatch(/<h1[^>]*>Do zero à produção/);
        expect(html).toContain('Decisões técnicas');
    });

    test('card da Nexus leva ao case e o case volta às seções da home', async ({ page }, testInfo) => {
        await page.goto('/');
        await page.getByRole('link', { name: /Ler o case study/ }).click();
        await expect(page).toHaveURL(/\/cases\/nexus\/$/);
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Do zero à produção');

        if (!isMobile(testInfo)) {
            await page.locator('.nav-links a[href="/#projects"]').click();
            await expect(page).toHaveURL(/\/#projects$/);
            await expect(page.locator('#projects .section-title')).toBeInViewport();
        }
    });

    test('sem erros de console e sem violações WCAG A/AA', async ({ page }) => {
        const problems = [];
        page.on('console', (msg) => msg.type() === 'error' && problems.push(msg.text()));
        page.on('pageerror', (err) => problems.push(err.message));
        await page.goto('/cases/nexus/');
        await page.waitForLoadState('networkidle');
        expect(problems).toEqual([]);

        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} elemento(s)`)).toEqual([]);
    });
});

test.describe('versão em inglês', () => {
    const portugueseUi = ['Ver Projetos', 'Baixar Currículo', 'Sobre Mim', 'Meus Projetos', 'Enviar Mensagem', 'Ver no GitHub', 'Todos os direitos', 'Aberto a novas', 'Ler o case study', 'Voltar ao portfólio', 'Decisões técnicas'];

    for (const path of ['/en/', '/en/cases/nexus/']) {
        test(`${path} é pré-renderizada em inglês, sem textos de interface em português`, async ({ request }) => {
            const html = await (await request.get(path)).text();
            expect(html).toContain('<html lang="en">');
            expect(html).toContain('hreflang="pt-BR"');
            for (const text of portugueseUi) expect(html, text).not.toContain(text);
        });

        test(`${path} sem erros de console e sem violações WCAG A/AA`, async ({ page }) => {
            const problems = [];
            page.on('console', (msg) => msg.type() === 'error' && problems.push(msg.text()));
            page.on('pageerror', (err) => problems.push(err.message));
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await page.goto(path);
            await page.evaluate(async () => {
                for (let y = 0; y < document.body.scrollHeight; y += 400) {
                    window.scrollTo(0, y);
                    await new Promise((r) => setTimeout(r, 50));
                }
            });
            await page.waitForTimeout(800);
            expect(problems).toEqual([]);

            const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
            expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} elemento(s)`)).toEqual([]);
        });
    }

    test('troca de idioma leva à página equivalente', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: 'Read in English' }).click();
        await expect(page).toHaveURL(/\/en\/$/);
        await expect(page.getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible();

        await page.getByRole('link', { name: /Read the case study/ }).click();
        await expect(page).toHaveURL(/\/en\/cases\/nexus\/$/);
        await expect(page.getByRole('heading', { level: 1 })).toContainText('From zero to production');

        await page.getByRole('link', { name: 'Ler em português' }).click();
        await expect(page).toHaveURL(/\/cases\/nexus\/$/);
        await expect(page.getByRole('heading', { level: 1 })).toContainText('Do zero à produção');
    });

    test('botões de currículo apontam para o PDF de cada idioma', async ({ page }) => {
        await page.goto('/en/');
        await expect(page.getByRole('link', { name: 'Download Résumé' })).toHaveAttribute('href', '/resume-joao-vitor-pereira.pdf');
        await page.goto('/');
        await expect(page.getByRole('link', { name: 'Baixar Currículo' })).toHaveAttribute('href', '/curriculo-joao-vitor-pereira.pdf');
    });

    test('filtro e formulário funcionam em inglês', async ({ page }) => {
        await page.route('https://api.emailjs.com/**', (route) => route.fulfill({ status: 200, body: 'OK' }));
        await page.goto('/en/');
        await page.getByRole('button', { name: 'Databases' }).click();
        await expect(page.locator('#skills .skill-card h3')).toHaveCount(5);

        await page.getByLabel('Your name').fill('Recruiter');
        await page.getByLabel('Your email').fill('recruiter@example.com');
        await page.getByLabel('Your message').fill('Hi! Loved your portfolio.');
        await page.getByRole('button', { name: 'Send Message' }).click();
        await expect(page.getByRole('status')).toContainText('Message sent');
    });
});

test.describe('headers de segurança (vercel.json)', () => {
    // O preview do Vite não aplica o vercel.json: os headers são injetados nas respostas
    // HTML para verificar que a CSP não bloqueia nada que o site usa.
    const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf-8'));
    const globalHeaders = Object.fromEntries(
        vercel.headers.find((rule) => rule.source === '/(.*)').headers.map(({ key, value }) => [key.toLowerCase(), value]),
    );
    // upgrade-insecure-requests converteria http://localhost em https:// e quebraria o teste local
    globalHeaders['content-security-policy'] = globalHeaders['content-security-policy'].replace(/;\s*upgrade-insecure-requests/, '');

    test('CSP e demais headers estão definidos', () => {
        for (const header of ['content-security-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'x-frame-options']) {
            expect(globalHeaders[header], header).toBeTruthy();
        }
    });

    for (const path of ['/', '/en/', '/cases/nexus/', '/en/cases/nexus/']) {
        test(`${path} funciona sob a CSP, sem violações`, async ({ page }) => {
            const violations = [];
            page.on('console', (msg) => /Content Security Policy|Refused to/.test(msg.text()) && violations.push(msg.text()));
            await page.route('**/*', async (route) => {
                if (route.request().resourceType() !== 'document') return route.fallback();
                const response = await route.fetch();
                await route.fulfill({ response, headers: { ...response.headers(), ...globalHeaders } });
            });
            await page.route('https://api.emailjs.com/**', (route) => route.fulfill({ status: 200, body: 'OK' }));

            await page.goto(path);
            await page.waitForLoadState('networkidle');
            // Rola a página inteira para carregar imagens lazy e o módulo de animações
            await page.evaluate(async () => {
                for (let y = 0; y < document.body.scrollHeight; y += 500) {
                    window.scrollTo(0, y);
                    await new Promise((r) => setTimeout(r, 40));
                }
            });

            if (path === '/') {
                await page.getByLabel('Seu nome').fill('Teste CSP');
                await page.getByLabel('Seu e-mail').fill('csp@example.com');
                await page.getByLabel('Sua mensagem').fill('Mensagem de teste');
                await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
                await expect(page.getByRole('status')).toContainText('Mensagem enviada com sucesso');
            }

            await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
            expect(violations).toEqual([]);
        });
    }
});
