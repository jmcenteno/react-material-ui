const styles = {
  card: {
    '.card-media': {
      overflowY: 'hidden',
      cursor: 'pointer'
    },
    figure: {
      overflow: 'hidden',
      margin: 0,
      minHeight: 200,
      background: "url('/assets/img/spinner.svg') no-repeat 50% 50% #eee",
      backgroundSize: '100px auto'
    },
    'figure img': {
      width: '100%',
      display: 'block',
      transform: 'scale(1)',
      filter: 'grayscale(100%)',
      transition: '400ms ease-in-out'
    },
    ':hover figure img': {
      transform: 'scale(1.3)',
      filter: 'grayscale(0%)'
    },
    '.overlay': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      padding: 16,
      marginBottom: -32,
      background: 'rgba(0, 0, 0, 0.54)',
      transition: 'all 400ms ease-in-out'
    },
    '.overlay .title': {
      textTransform: 'capitalize',
      fontSize: '21px',
      fontWeight: 300,
      color: '#fff',
      opacity: 0.87,
      marginBottom: 4
    },
    '.overlay .subtitle': {
      fontSize: '14px',
      color: '#fff',
      opacity: 0.54
    },
    '.overlay .stars': {
      marginTop: 8,
      opacity: 0,
      transition: 'all 400ms ease-in-out'
    },
    ':hover .overlay': {
      marginBottom: 0
    },
    ':hover .overlay .stars': {
      opacity: 1
    }
  },
  animate: {
    animation: 'zoomIn 500ms ease-out'
  }
};

export default styles;
