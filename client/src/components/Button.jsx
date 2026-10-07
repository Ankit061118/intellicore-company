import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { classNames } from '../utils/classNames.js'

const MotionLink = motion.create(Link)
const MotionAnchor = motion.a
const MotionButton = motion.button

const variantClasses = {
  primary: 'border-[rgb(165_180_252_/_42%)] text-white bg-[linear-gradient(112deg,#5559e8,#7c4be8_68%,#8b5cf6)] shadow-[0_8px_28px_rgb(99_102_241_/_25%),inset_0_1px_rgb(255_255_255_/_18%)] hover:bg-[linear-gradient(112deg,#696cf4,#8b5cf6_68%,#9b6aff)] hover:shadow-[0_10px_34px_rgb(99_102_241_/_38%),inset_0_1px_rgb(255_255_255_/_24%)]',
  secondary: 'border-[rgb(148_163_184_/_24%)] text-[#e2e8f0] bg-[rgb(17_24_39_/_56%)] hover:border-[rgb(6_182_212_/_55%)] hover:text-white hover:bg-[rgb(6_182_212_/_9%)]',
}

function Button({ as: Element, to, href, variant = 'primary', className, children, ...props }) {
  const prefersReducedMotion = useReducedMotion()
  const classes = classNames(
    'inline-flex min-h-[46px] items-center justify-center gap-3 px-[18px] py-0 border border-transparent rounded-lg text-[13px] font-semibold [transition:background_160ms_ease,color_160ms_ease,border-color_160ms_ease] cursor-pointer [backdrop-filter:blur(12px)]',
    variantClasses[variant],
    className,
  )
  const interactionProps = prefersReducedMotion || props.disabled
    ? {}
    : {
      whileHover: { y: -1.5, scale: 1.012 },
      whileFocus: { y: -1, scale: 1.006 },
      whileTap: { scale: 0.985 },
      transition: { type: 'spring', stiffness: 520, damping: 32 },
    }

  if (to) {
    return <MotionLink className={classes} to={to} {...interactionProps} {...props}>{children}</MotionLink>
  }

  if (href) {
    return <MotionAnchor className={classes} href={href} {...interactionProps} {...props}>{children}</MotionAnchor>
  }

  const Component = Element || 'button'
  if (Component === 'button') {
    return <MotionButton className={classes} type="button" {...interactionProps} {...props}>{children}</MotionButton>
  }

  return <Component className={classes} {...props}>{children}</Component>
}

export default Button