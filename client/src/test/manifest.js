// components added to the manifest can be accessed in browser via /test/{componentName}

export default {
  Write: {
    components: require('../components/Write/Write'),
    props: {}
  },
  Memo: {
    components: require('../components/Memo/Memo'),
    props: {}
  }
};
