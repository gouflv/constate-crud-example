import React from 'react'

const BuildComponentTree = providers => {
  if (providers.length === 1) {
    return providers[0][0]
  }
  const [A, paramsA] = providers.shift()
  const [B, paramsB] = providers.shift()

  return BuildComponentTree([
    [
      ({ children }) => (
        <A {...(paramsA || {})}>
          <B {...(paramsB || {})}>{children}</B>
        </A>
      )
    ],
    ...providers
  ])
}

export default wrappers =>
  BuildComponentTree(wrappers.map(wrapper => [wrapper]))
