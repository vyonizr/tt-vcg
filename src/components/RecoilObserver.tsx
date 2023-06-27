import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

interface IProps {
  node: any
  onChange: (value: any) => void
}

// https://recoiljs.org/docs/guides/testing/
export default function RecoilObserver({ node, onChange }: IProps) {
  const value = useRecoilValue(node)
  useEffect(() => onChange(value), [onChange, value])
  return null
}
