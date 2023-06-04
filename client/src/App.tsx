import { createContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { gapi } from 'gapi-script'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SingleProductPage from './features/products/SingleProductPage'
import UseTheme from './utils/hooks/UseTheme'
import AddProductForm from './features/products/AddProductForm'
import UsersList from './features/users/UsersList'
import UpdateProductForm from './features/products/UpdateProductForm'
import Dashboard from './pages/Dashboard'
import RequireAuth from './components/RequireAuth'

import SignUp from './features/auth/SignUpForm'
import Login from './features/auth/LoginForm'
import ShoppingCartPage from './features/cart/ShoppingCartPage'
import SearchProductsMobilePage from './features/products/SearchProductsMobile'
import UserProfilePage from './features/users/UserProfilePage'
import ProductList from './features/products/ProductList'
import OrderPage from './features/orders/OrderPage'
import NewUserAddress from './features/address/NewUserAddress'
import BlogPage from './features/blog/BlogPage'

export const ThemeContext = createContext({
  toggleColorMode: () => {
    /**/
  }
})

const App = () => {
  const { colorMode, theme } = UseTheme()

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <main
          style={{
            background: theme.palette.mode === 'dark' ? 'black' : ''
          }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/products/:productId" element={<SingleProductPage />} />
              <Route path="cart" element={<ShoppingCartPage />} />
              <Route path="search" element={<SearchProductsMobilePage />} />
              <Route path="/category/:categoryId" element={<ProductList />} />
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="/auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<SignUp />} />
              </Route>
              <Route path="details" element={<NewUserAddress />} />
              {/**protectd routes */}
              <Route element={<RequireAuth />}>
                <Route path="orders" element={<OrderPage />} />
                <Route path="edit/:productId" element={<UpdateProductForm />} />
                <Route path="dashboard">
                  <Route index element={<Dashboard />} />
                  <Route path="create" element={<AddProductForm />} />
                </Route>
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":userId" element={<SingleProductPage />} />
                  <Route path="create" element={<AddProductForm />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<p>error:404</p>} />
          </Routes>
        </main>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App
