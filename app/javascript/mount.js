import React from 'react'
import { createRoot } from 'react-dom/client'

const mount = (Component, id) => {
  const container = document.getElementById(id)
  if (container) {
    const root = createRoot(container)
    const props = JSON.parse(container.getAttribute('data-props') || '{}')
    root.render(<Component {...props} />)
  }
}

export default mount
