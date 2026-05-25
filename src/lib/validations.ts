export function validateContainerNumber(cn: string): boolean {
  const CODES: Record<string, number> = {
    A: 10,
    B: 12,
    C: 13,
    D: 14,
    E: 15,
    F: 16,
    G: 17,
    H: 18,
    I: 19,
    J: 20,
    K: 21,
    L: 23,
    M: 24,
    N: 25,
    O: 26,
    P: 27,
    Q: 28,
    R: 29,
    S: 30,
    T: 31,
    U: 32,
    V: 34,
    W: 35,
    X: 36,
    Y: 37,
    Z: 38,
  }
  const cleanCn = cn.toUpperCase().replace(/\s/g, '')
  if (!/^[A-Z]{4}\d{7}$/.test(cleanCn)) return false
  let sum = 0
  for (let i = 0; i < 10; i++) {
    const c = cleanCn[i]
    const val = /\d/.test(c) ? parseInt(c, 10) : CODES[c]
    sum += val * Math.pow(2, i)
  }
  return (sum % 11) % 10 === parseInt(cleanCn[10], 10)
}

export function isEORIRequired(pod: string): boolean {
  if (!pod) return false
  const EU = ['NLRTM', 'DEHAM', 'BEANR', 'FRLEH', 'ESBCN', 'ITGOA', 'GBFXT']
  const US = ['USNYK', 'USLAX', 'USSAV', 'USBAL', 'USHOU']
  return [...EU, ...US].some((p) => pod.toUpperCase().includes(p))
}

export function validateNCM(ncm: string): boolean {
  const d = ncm.replace(/\D/g, '')
  return d.length >= 4 && d.length <= 8
}
