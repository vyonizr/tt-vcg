import React, { Component, ErrorInfo, ReactNode } from 'react'
import { ERROR_MESSAGE } from '@/constants'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <h1 className='text-4xl'>{ERROR_MESSAGE.GENERAL}</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
