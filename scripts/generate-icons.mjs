// Gera os ícones PWA (icon-192.png e icon-512.png) sem dependências externas.
// Desenha o "mark" da logo: fundo azul com um balão/gota branco e um ponto azul.
import zlib from 'node:zlib'
import { writeFileSync } from 'node:fs'

const BLUE = [11, 44, 138] // #0b2c8a
const WHITE = [255, 255, 255]

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

function makePng(size) {
  const w = size
  const h = size
  // RGBA raw, com filtro 0 por linha
  const stride = w * 4
  const raw = Buffer.alloc((stride + 1) * h)

  const cx = w / 2
  const cy = h * 0.46
  const r = w * 0.30 // raio do balão

  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0 // filtro none
    for (let x = 0; x < w; x++) {
      let col = BLUE

      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      // corpo do balão (círculo branco)
      if (dist <= r) col = WHITE
      // "cauda" do balão, um triângulo apontando para baixo-esquerda
      const tailTop = cy + r * 0.4
      if (
        y >= tailTop &&
        y <= cy + r * 1.25 &&
        x >= cx - r * 0.55 &&
        x <= cx + (cy + r * 1.25 - y) * 0.6
      ) {
        col = WHITE
      }
      // ponto azul central
      if (dist <= r * 0.34) col = BLUE

      const o = y * (stride + 1) + 1 + x * 4
      raw[o] = col[0]
      raw[o + 1] = col[1]
      raw[o + 2] = col[2]
      raw[o + 3] = 255
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const idat = zlib.deflateSync(raw, { level: 9 })

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

writeFileSync(new URL('../public/icon-192.png', import.meta.url), makePng(192))
writeFileSync(new URL('../public/icon-512.png', import.meta.url), makePng(512))
console.log('Ícones PWA gerados: public/icon-192.png, public/icon-512.png')
