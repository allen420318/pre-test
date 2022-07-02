import { fetcher } from '~/assets/js/fetcher.js'

export const login = async (data) => {
  const result = await fetcher('api/auth/login', 'POST', {
    account: data.account,
    password: data.password,
    confirm: true,
  })
  return result
}

export const personalInfo = async () => {
  const result = await fetcher('api/me', 'GET')
  return result
}

export const classList = async () => {
  const result = await fetcher('api/courses/fundraising', 'GET')
  return result
}

export const addCartItem = async (data) => {
  const result = await fetcher('api/carts', 'POST', {
    items: data,
    coupons: [],
  })
  return result
}

export const removeCartItem = async (data) => {
  const result = await fetcher('api/carts', 'DELETE', {
    items: data,
    coupons: [],
  })
  return result
}
