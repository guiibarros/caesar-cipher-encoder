window.onload = () => {
  const form = $('form')
  const textToEncode = $('.text-to-encode')
  const resultSection = $('.result-section')
  const textResult = $('.text-result')

  form.onsubmit = (event) => {
    event.preventDefault()
  
    const encodedText = ceasarCipherTextEncrypt(textToEncode.value)

    resetElements()

    resultSection.classList.remove('hide')
    textResult.value = encodedText
  }

  function resetElements() {
    textToEncode.value = ''
    textResult.value = ''
  }
}

const $ = (query) => {
  if (!query) {
    return document
  }

  return document.querySelector(query)
}

function ceasarCipherTextEncrypt(text, offset = 3) {
  if (offset < 0) {
    offset = 0
  }

  const maxCharCode = 123 // z
  const minCharCode = 97 // a
  const differenceBetweenCharCodeBoundaries = maxCharCode - minCharCode

  let cipherText = ''

  for (const char of text) {
    let charCodeOffset = char.charCodeAt() + offset

    if (charCodeOffset >= maxCharCode) {
      charCodeOffset -= differenceBetweenCharCodeBoundaries
    }

    const charOffset = String.fromCharCode(charCodeOffset)

    cipherText += char === ' ' ? ' ' : charOffset
  }

  return cipherText
}