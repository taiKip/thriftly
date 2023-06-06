import { cartItemType } from '../features/cart/cartSlice'
import { orderStatusType } from '../types/index'
import { sortDirectionType } from '../types'
export interface IReview {
  id: number
  rating: number
  title: string
  comment: string
  createdAt?: string
  username?: string
}
export interface IProduct {
  id: number
  imageUrl: string
  name: string
  price: number
  description?: string
  stock: number
  reviews?: IReview[]
  averageRating?: number
  categoryId?: number
}
export interface IQuantity {
  quantity: number
}

export interface ISelectProps {
  id: string
  content: string
}
export interface ISortConfig<T> {
  key: keyof T
  direction: 'asc' | 'desc'
}

//lower case because of database
export interface IUser {
  id: number
  name: string
  email: string
  password: string
  role: string
  status: string
  banned: boolean
}

export interface IAuthState {
  accessToken: string | null
  refreshToken: string | null
}
export interface ICategory {
  id?: number
  name: string
  image: string
  description: string
}

export interface IPage<T> {
  currentPage: number
  hasPreviousPage: boolean
  nextPage: boolean
  items: T[]
  totalItems: number
  totalPages: number
}
export interface IPageTitle {
  name: string
  description: string
}
export interface ICartItem {
  productId: number
  quantity: number
}

export interface IOrder {
  orderItems: ICartItem[]
  addressId: number | null
}
export interface ITableProps {
  title: string
  subheader: string
  headerCells: string[]
  orders: IOrder[] | []
}
export interface IError {
  status: number
  message: string
}
export interface IFile {
  fileUrl: string
}
export interface IError {
  data: ErrorDetail[]
  status: number
}
export interface ErrorDetail {
  httpStatus: string
  message: string
}
export interface IAddress {
  id: number
  name: string
  city: string
  street: string
  unitNumber: number
  zipCode: string
  phone: string
  isDefault: boolean
}
export interface IResponse {
  response: string
}
export interface IGoogleUser {
  access_token: string
  authuser: string
  expires_in: number
  prompt: string
  scope: string
  token_type: string
}
export interface IOrderItem {
  quantity: number
  total: number
  name: string
}
export interface IOrderResponse {
  orderId: number
  createdAt: string
  address: IAddress
  orderStatus: orderStatusType
  total: number
  orderItems: IOrderItem[]
}
export interface IQuery {
  categoryId: number
  pageNo: number
  pageSize: number
  sortDir: sortDirectionType
  sortBy: string
}
export interface ICartItems {
  quantity: number
  productId: number
}
