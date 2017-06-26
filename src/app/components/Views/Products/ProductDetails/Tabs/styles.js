import { colors } from '../../../../../../theme';

const styles = {
  tabItemContainer: {
    backgroundColor: 'transparent',
    borderBottom: `solid 1px ${ colors.light }`,
    marginBottom: 24
  },
  tabRoot: {
    default: {
      width: 'auto',
      padding: '0 16px',
      borderBottomStyle: 'solid', 
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
      marginBottom: -2
    }
  },
  tabButtonStyle: {
    color: colors.dark
  },
  tabInkBarStyle: {
    display: 'none'
  }
};

styles.tabRoot.active = Object.assign({}, styles.tabRoot.default, {
  borderBottomColor: colors.danger
});

export default styles;
