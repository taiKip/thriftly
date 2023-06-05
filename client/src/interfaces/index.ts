import { cartItemType } from '../features/cart/cartSlice'
import { orderStatusType } from '../types'
import { sortDirectionType } from '../features/types'
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
export interface IOrderItem {
  productId: number
  quantity: number
}

export interface IOrder {
  orderItems: IOrderItem[]
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
export interface IQuery {
  categoryId?: number
  pageNo?: number
  pageSize?: number
  sortDir?: sortDirectionType
  sortBy?: string
}
export interface IResponse {
  response: string
}
