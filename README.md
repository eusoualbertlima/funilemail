# funilemail

Landing page simples para o produto "Funil Email Corretores".

## O que foi adicionado

- `index.html` com melhorias de acessibilidade (skip link, estados de foco, roles e ARIA), semântica (`header`, `main`, `footer`) e links externos seguros (`target="_blank" rel="noopener noreferrer"`).
- `styles.css` extraído do CSS inline com ajustes de foco e utilitários (`.visually-hidden`).
- Meta tags Open Graph, Twitter Card e JSON-LD (Product/Offer) para melhor SEO/social.
- Favicon placeholder e alguns ajustes semânticos (uso de `<del>` para preço antigo, `strong` para preço atual).

## Como visualizar localmente

1. Abra o arquivo `index.html` no navegador (por exemplo, via Live Server ou abrindo o arquivo diretamente).
2. Para testes de acessibilidade, pressione Tab para verificar os estados de foco e use a tecla para pular para o conteúdo com o link "Pular para o conteúdo".

## Próximos passos recomendados

- Adicionar uma imagem real para `og:image` e `favicon.ico` na raiz do projeto (ou usar o workflow `Generate OG Image` que cria `og-image.png` automaticamente a partir do `og-image-2.svg`).
- Integrar analytics (GTM/GA4) e tracking de conversões para o botão de compra (veja instruções abaixo).
- Adicionar testes automatizados (Lighthouse/Cypress) para verificar regressões de acessibilidade e performance.

## Analytics (GA4) — instruções rápidas

1. Crie uma propriedade GA4 no Google Analytics e pegue o Measurement ID (formato G-XXXXXXX).
2. No arquivo `index.html`, localize o snippet comentado que contém `GA_MEASUREMENT_ID` e substitua pelo seu ID, ou adicione o snippet no cabeçalho.

> Observação: o Measurement ID não é um segredo e pode ser adicionado diretamente ao HTML; se preferir automações, crie um secret `GA_MEASUREMENT_ID` e eu posso adicionar um workflow para injetar o ID durante um deploy (opcional).

## Protegendo a branch `main`

Recomendo proteger a branch `main` após revisar PRs. Passos:

1. Vá em Settings → Branches → Add rule → `main`.
2. Marque:
   - "Require pull request reviews before merging" (1+ approvals)
   - "Require status checks to pass before merging" e selecione **Lighthouse CI** e **Accessibility Checks** (quando disponíveis)
   - "Include administrators" / "Enforce for administrators"
   - Bloquear force pushes / allow deletions desmarcado

Essas regras impedem merges diretos e garantem qualidade via CI.

## QA Checklist (rápido)

- [ ] Testar foco por teclado (Tab) e verificar visibilidade do "Pular para o conteúdo" e estados de foco nos CTAs.
- [ ] Rodar Lighthouse (Performance >= 70, A11y >= 90, SEO >= 90)
- [ ] Checar Open Graph com o Facebook Debugger e Twitter Card Validator
- [ ] Testar em mobile: CTA fixo e layout responsivo
- [ ] Validar formulário de captura (modal) e evento `lead_submitted` no GA
- [ ] Verificar `og-image.png` (compatibilidade com redes sociais)
- [ ] Revisar A/B variants (localStorage) e monitoramento no GA (evento `ab_test_assigned`)

---

---

Se quiser, eu abro um PR com estes commits e separo por categoria (A11y / SEO / UI).

## Design & Conversão

- Novo hero com CTA primário destacado, subtítulo (lead) e ilustração SVG (`banner.svg`).
- Seção de prova social com depoimentos para aumentar conversões.
- Páginas de `tutorial.html` e `guia.html` adicionadas (esqueleto para documentação/instruções).
- A/B testing cliente (simples) adicionado: `ab.js` escolhe variação A/B e envia evento para `dataLayer`/`gtag` se presente.
- Modal de captura (acessível) adicionado: `subscribe.js` salva emails no `localStorage` e dispara evento `lead_submitted`.
- Preload de fonte e `theme-color` adicionados para melhorar LCP e sensação mobile.

---
