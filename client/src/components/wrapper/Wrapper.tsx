import { ReactNode } from 'react'
import classes from './Wrapper.module.css'
const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className={classes.wrapper}>{children}</div>
}

export default Wrapper
