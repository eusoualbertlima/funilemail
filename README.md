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

- Adicionar uma imagem real para `og:image` e `favicon.ico` na raiz do projeto.
- Integrar analytics (GTM/GA4) e tracking de conversões para o botão de compra.
- Adicionar testes automatizados (Lighthouse/Cypress) para verificar regressões de acessibilidade e performance.

---

Se quiser, eu abro um PR com estes commits e separo por categoria (A11y / SEO / UI).