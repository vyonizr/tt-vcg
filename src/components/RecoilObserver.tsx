import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

interface IProps {
  node: any
  onChange: (value: any) => void
}

export default function RecoilObserver({ node, onChange }: IProps) {
  const value = useRecoilValue(node)
  useEffect(() => onChange(value), [onChange, value])
  return null
}
