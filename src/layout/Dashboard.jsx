import React from 'react'

export default function Dashboard(props) {
  const { children, ...rest } = props;

  return (
    <div className="site">
      {children}
    </div>
  )
}
