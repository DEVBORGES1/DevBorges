// Aplica o tema salvo antes da primeira pintura (evita piscar o tema escuro no claro).
// Arquivo externo porque a CSP (vercel.json) bloqueia scripts inline.
try {
    if (localStorage.getItem('theme') === 'light') document.documentElement.dataset.theme = 'light';
} catch {
    // Armazenamento bloqueado: fica o tema escuro padrão
}
