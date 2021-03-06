import * as React from 'react';
import './ImageBlock.css';

const DEFAULTS = {
  stars: require('./star.png'),
  xo: require('./xo.png'),
};

/* Sizes available for image block */
const SIZES = {
  FIT: 'fit',
  ANDREW: 'andrew',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

interface Props {
  className?: string;
  image?: string;
  children?: any;
  size?: string;
  isSingle?: boolean;
  isFixed?: boolean;
  isStretched?: boolean;
  isDefault?: boolean;
  opacity?: number;
  height?: string;
  width?: string;
}

interface State {
  image: string;
  height: string;
  width: string;
  opacity: number;
  repeat: string;
  attachment: 'fixed' | 'scroll';
  size: string;
}

class ImageBlock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      image: DEFAULTS.xo,
      height: '100%',
      width: '100%',
      opacity: 0,
      repeat: 'no-repeat',
      attachment: 'scroll',
      size: 'auto',
    };
  }
  
  /**
   * Sets properties of the element as conditionally
   * rendering with a function would prove more verbose
   * 
   * Favors specific width and height of the element.
   */
  componentWillMount() {
    const { size, isSingle, isFixed, isStretched, 
            image, opacity, height, width } = this.props;
    let test = size || 'fit';
    switch (test.toLowerCase()) {
      case SIZES.LARGE:
        this.setState({ height: '90vh' });
        break;
      case SIZES.MEDIUM:
        this.setState({ height: '40vh' });
        break;
      case SIZES.SMALL:
        this.setState({ height: '20vh' });
        break;
      case SIZES.ANDREW:
        this.setState({ height: '5vh' });
        break;
      default:
        this.setState({ height: '100%' });
    }

    /* Set guaranteed element defaults */
    this.setState({
      repeat: isSingle ? 'no-repeat' : 'repeat',
      attachment: isFixed ? 'fixed' : 'scroll',
      size: isStretched ? 'cover' : 'auto',
      image: image ? image : DEFAULTS.xo,
      opacity: opacity ? opacity : 0,
    });

    /* Set conditional height and width with priority for size */
    if (height) { this.setState({ height: height }); }
    if (width) { this.setState({ width: width }); }
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${this.state.image})`,
          backgroundPosition: 'center center',
          backgroundAttachment: this.state.attachment,
          backgroundRepeat: this.state.repeat,
          backgroundSize: this.state.size,
          position: 'relative',
          width: this.state.width,
          height: this.state.height,
        }}
        className={`image-block ${this.props.className || ''}`}
      >
        <div 
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            left: 0,
            top: 0,
            width: this.state.width,
            height: this.state.height,
            opacity: this.state.opacity,
          }}
          className="image-block--overlay" 
        />
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
          }}
          className="image-block__content" 
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ImageBlock;