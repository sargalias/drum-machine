module.exports = api => {
  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        // IE11
        // targets: {
        // ie: '11',
        // },
        // Modern browsers
        targets: '> 5%',
      },
    ],
  ];
  const plugins = ['@babel/plugin-syntax-dynamic-import'];

  const isTest = api.env('test');
  if (isTest) {
    plugins.push('dynamic-import-node');
  }

  return {
    presets,
    plugins,
  };
};
