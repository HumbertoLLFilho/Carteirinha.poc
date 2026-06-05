# Carteirinha do Estudante (POC)

App para gerenciar carteirinhas de estudante. Esta primeira versão entrega a
**página inicial**, construída como **PWA** (Progressive Web App) — ou seja,
pode ser instalada no celular Android direto pelo navegador, abrindo em tela
cheia como um app nativo.

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (manifest + service worker)
- Sem libs de UI/ícones externas (ícones são SVG inline)

## Funcionalidades desta versão

- Header com logo **"carteirinha"**, menu e avatar
- Grade com os 7 atalhos: Carteirinha Digital, QRCode [Acesso], Carteirinha
  Física, Ofertas, Cadastro, Minha Foto, Notificações
- Barra inferior com 3 abas: **Início**, **Carteirinha** e **QR Code**
- Instalável como PWA (ícone, tela cheia, funciona offline)

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra a URL exibida (normalmente `http://localhost:5173`).

## Como gerar o build

```bash
npm run build      # gera a pasta dist/ (inclui manifest e service worker)
npm run preview    # serve o build de produção para conferência
```

> Os ícones do PWA (`public/icon-192.png` e `public/icon-512.png`) são gerados
> por `node scripts/generate-icons.mjs` e já estão versionados. Rode o script
> novamente caso queira regenerá-los.

## Como testar/instalar no celular Android

Um PWA só pode ser instalado a partir de uma origem segura (**HTTPS** ou
`localhost`). Você tem duas opções:

### Opção A — Publicar o build (recomendado)

Faça deploy da pasta `dist/` em qualquer hospedagem estática com HTTPS
(GitHub Pages, Netlify, Vercel, etc.). Depois, no celular:

1. Abra a URL publicada no **Chrome** do Android.
2. Toque no menu **⋮ → "Adicionar à tela inicial"** (ou no banner de instalação).
3. O app é instalado com ícone próprio e abre em tela cheia (standalone).

### Opção B — Servir na rede local

Para um teste rápido na mesma rede Wi‑Fi (sem instalar como app, pois sem HTTPS
o "Adicionar à tela inicial" pode não oferecer instalação completa):

```bash
npm run build
npm run preview   # já sobe com --host
```

Descubra o IP da máquina (ex.: `192.168.0.10`) e acesse
`http://192.168.0.10:4173` pelo navegador do celular.

## Estrutura

```
src/
├── main.jsx                # entry point
├── App.jsx                 # moldura de celular
├── pages/Home.jsx          # composição da página inicial
└── components/
    ├── Header.jsx          # topo: menu, logo, avatar
    ├── HomeGrid.jsx        # grade dos 7 atalhos
    ├── TabBar.jsx          # barra inferior (Início, Carteirinha, QR Code)
    └── icons.jsx           # ícones SVG inline
```

## Próximos passos

- Telas internas de cada atalho (Carteirinha Digital, QR Code, Cadastro, etc.)
- Cadastro/autenticação e backend
- Navegação entre páginas (react-router)
