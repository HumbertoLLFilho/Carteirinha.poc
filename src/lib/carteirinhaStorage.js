// Armazenamento local dos dados da carteirinha (persiste no dispositivo via
// localStorage): foto da pessoa (dataURL JPEG redimensionado) + campos.

const STORAGE_KEY = 'carteirinha.data.v2'

const EMPTY = { photo: null, nome: '', documento: '', ra: '', curso: '', updatedAt: null }

export function loadCarteirinhaData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...EMPTY }
    return { ...EMPTY, ...JSON.parse(raw) }
  } catch {
    return { ...EMPTY }
  }
}

export function saveCarteirinhaData(data) {
  // Pode lançar QuotaExceededError se a foto for grande demais.
  const record = { ...EMPTY, ...data, updatedAt: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
}

export function clearCarteirinhaData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignora */
  }
}

// Lê o arquivo de imagem, redimensiona e comprime para um dataURL JPEG,
// mantendo o tamanho sob controle para caber no localStorage.
export function fileToResizedDataUrl(file, { maxDim = 1000, quality = 0.85 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Selecione um arquivo de imagem.'))
      return
    }

    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
      const width = Math.round(img.width * scale)
      const height = Math.round(img.height * scale)

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      resolve(canvas.toDataURL('image/jpeg', quality))
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Não foi possível ler a imagem.'))
    }

    img.src = url
  })
}
