// Armazenamento local da imagem da carteirinha (persiste no dispositivo via
// localStorage). A imagem é guardada como dataURL JPEG já redimensionado.

const STORAGE_KEY = 'carteirinha.image.v1'

export function loadCarteirinhaImage() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function saveCarteirinhaImage(dataUrl) {
  // Pode lançar QuotaExceededError se a imagem for grande demais.
  localStorage.setItem(STORAGE_KEY, dataUrl)
}

export function clearCarteirinhaImage() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignora */
  }
}

// Lê o arquivo, redimensiona e comprime para um dataURL JPEG, mantendo o
// tamanho sob controle para caber no localStorage.
export function fileToResizedDataUrl(file, { maxDim = 1600, quality = 0.85 } = {}) {
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
