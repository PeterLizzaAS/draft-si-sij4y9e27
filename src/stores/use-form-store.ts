import { useState } from 'react'

export const useFormStore = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<any>({})

  const nextStep = () => setStep((s) => Math.min(s + 1, 6))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))
  const updateData = (data: any) => setFormData((prev: any) => ({ ...prev, ...data }))

  return { step, setStep, nextStep, prevStep, formData, updateData }
}
