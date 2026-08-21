import { Link } from 'react-router-dom';

// One wrapper over the button classes already in components.css. The styling is
// unchanged, this only decides which classes apply and which element renders.
const VARIANTS = {
  primary: 'btn-primary',
  outline: 'btn-outline',
};

// The two variants sit at opposite ends by default: primary is compact until the
// -lg modifier, outline starts wide and shrinks with --sm. Each one names its own
// size class so the caller can just say "sm" or "lg".
const SIZES = {
  primary: { sm: '', lg: 'btn-primary-lg' },
  outline: { sm: 'btn-outline--sm', lg: '' },
};

const Button = ({
  as,
  variant = 'primary',
  size = 'lg',
  icon: Icon,
  iconPosition = 'end',
  iconClassName = 'icon',
  className = '',
  children,
  ...rest
}) => {
  // A router Link when given `to`, a plain anchor when given `href`, otherwise a
  // real <button>. `as` overrides all of it, which is how the work card renders a
  // button-looking <span> inside a Link without nesting two anchors.
  // eslint-disable-next-line react-hooks/static-components -- picking an existing element type, not defining a new component
  const Element = as || (rest.to ? Link : rest.href ? 'a' : 'button');

  const classes = [VARIANTS[variant], SIZES[variant][size], className].filter(Boolean).join(' ');

  const iconNode = Icon ? <Icon className={iconClassName} aria-hidden="true" /> : null;

  return (
    <Element
      className={classes}
      {...(Element === 'button' && rest.type === undefined ? { type: 'button' } : null)}
      {...rest}
    >
      {iconPosition === 'start' && iconNode}
      {children}
      {iconPosition === 'end' && iconNode}
    </Element>
  );
};

export default Button;
