const $ = (query, options = {
  all: false,
  relativeElement: null
}) => {
  if (!query) {
    return document
  }

  if (options.all) {
    return options.relativeElement?.querySelector(query) ?? document.querySelectorAll(query)
  }

  return options.relativeElement?.querySelector(query) ?? document.querySelector(query)
}

window.onload = () => {
  const forms = $('form', {
    all: true
  })

  forms.forEach(form => {
    form.onsubmit = (event) => {
      event.preventDefault()

      const targetText = $('.target-text', {
        relativeElement: form,
      })

      const targetOffset = $('.target-offset', {
        relativeElement: form,
      })

      const targetTextValue = targetText.value.toLowerCase()
      const targetOffsetValue = Number(targetOffset.value)
  
      const resultText = form.parentElement.classList.contains('encoder')
        ? caesarCipherTextEncode(targetTextValue, targetOffsetValue)
        : caesarCipherTextDecode(targetTextValue, targetOffsetValue)

      const resultSection = $('.result-section', {
        relativeElement: form.parentElement,
      })

      const resultTextElement = $('.result-text', {
        relativeElement: resultSection,
      })

      resultSection.classList.remove('hide')
      resultTextElement.value = resultText
    }
  })
}

function caesarCipherTextEncode(text, offset = 3) {
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

function caesarCipherTextDecode(text, offset = 3) {
  const maxCharCode = 123 // z
  const minCharCode = 97 // a
  const differenceBetweenCharCodeBoundaries = maxCharCode - minCharCode

  let cipherText = ''

  for (const char of text) {
    let charCodeOffset = char.charCodeAt() - offset

    if (charCodeOffset < minCharCode) {
      charCodeOffset += differenceBetweenCharCodeBoundaries
    }

    const charOffset = String.fromCharCode(charCodeOffset)

    cipherText += char === ' ' ? ' ' : charOffset
  }

  return cipherText
}