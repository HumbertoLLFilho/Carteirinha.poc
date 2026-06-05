// Gera a imagem da carteirinha (frente e verso) compondo a foto da pessoa e os
// dados sobre o template de arte, num canvas de tamanho fixo (CR80 paisagem).
//
// Para trocar pela arte oficial depois: substitua os SVGs em
// src/assets/template/ e ajuste as coordenadas em LAYOUT.

import frontTemplate from '../assets/template/front.svg'
import backTemplate from '../assets/template/back.svg'

// Dimensões do arquivo final (CR80 paisagem @ 300dpi).
export const CARD_WIDTH = 1011
export const CARD_HEIGHT = 638

// Layout da frente: caixa da foto e posição/estilo de cada campo.
const LAYOUT = {
  photo: { x: 44, y: 180, w: 260, h: 340, radius: 14 },
  fieldsX: 340,
  label: { font: '600 24px Arial, Helvetica, sans-serif', color: '#6b7280' },
  value: { font: '700 38px Arial, Helvetica, sans-serif', color: '#1c2440' },
  maxValueWidth: 620,
  fields: [
    { key: 'nome', label: 'Nome', labelY: 215, valueY: 255 },
    { key: 'documento', label: 'Documento', labelY: 305, valueY: 345 },
    { key: 'ra', label: 'RA', labelY: 395, valueY: 435 },
    { key: 'curso', label: 'Curso', labelY: 485, valueY: 525 },
  ],
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Falha ao carregar imagem do template/foto.'))
    img.src = src
  })
}

// Desenha a imagem cobrindo a caixa (cover), recortada nos cantos arredondados.
function drawCover(ctx, img, { x, y, w, h, radius = 0 }) {
  const scale = Math.max(w / img.width, h / img.height)
  const dw = img.width * scale
  const dh = img.height * scale
  const dx = x + (w - dw) / 2
  const dy = y + (h - dh) / 2

  ctx.save()
  roundedRectPath(ctx, x, y, w, h, radius)
  ctx.clip()
  ctx.drawImage(img, dx, dy, dw, dh)
  ctx.restore()

  // Borda sutil sobre a foto
  ctx.save()
  roundedRectPath(ctx, x, y, w, h, radius)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#cdd3e3'
  ctx.stroke()
  ctx.restore()
}

function roundedRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

// Trunca o texto com reticências para caber em maxWidth.
function fitText(ctx, text, maxWidth) {
  if (!text) return ''
  if (ctx.measureText(text).width <= maxWidth) return text
  let str = text
  while (str.length > 1 && ctx.measureText(str + '…').width > maxWidth) {
    str = str.slice(0, -1)
  }
  return str + '…'
}

function newCanvasCtx() {
  const canvas = document.createElement('canvas')
  canvas.width = CARD_WIDTH
  canvas.height = CARD_HEIGHT
  return { canvas, ctx: canvas.getContext('2d') }
}

async function renderFront({ photoDataUrl, fields }) {
  const { canvas, ctx } = newCanvasCtx()
  const template = await loadImage(frontTemplate)
  ctx.drawImage(template, 0, 0, CARD_WIDTH, CARD_HEIGHT)

  if (photoDataUrl) {
    const photo = await loadImage(photoDataUrl)
    drawCover(ctx, photo, LAYOUT.photo)
  }

  ctx.textBaseline = 'alphabetic'
  for (const f of LAYOUT.fields) {
    ctx.font = LAYOUT.label.font
    ctx.fillStyle = LAYOUT.label.color
    ctx.fillText(f.label, LAYOUT.fieldsX, f.labelY)

    ctx.font = LAYOUT.value.font
    ctx.fillStyle = LAYOUT.value.color
    const value = fitText(ctx, (fields?.[f.key] || '').trim(), LAYOUT.maxValueWidth)
    ctx.fillText(value, LAYOUT.fieldsX, f.valueY)
  }

  return canvas.toDataURL('image/jpeg', 0.9)
}

async function renderBack() {
  const { canvas, ctx } = newCanvasCtx()
  const template = await loadImage(backTemplate)
  ctx.drawImage(template, 0, 0, CARD_WIDTH, CARD_HEIGHT)
  return canvas.toDataURL('image/jpeg', 0.9)
}

// Gera frente e verso. `fields` = { nome, documento, ra, curso }.
export async function generateCarteirinha({ photoDataUrl, fields }) {
  const [front, back] = await Promise.all([
    renderFront({ photoDataUrl, fields }),
    renderBack(),
  ])
  return { front, back }
}
