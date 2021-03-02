module.exports = [
  { plugin: require('blipp') },
  {
    plugin: require('laabr'),
    options: {
      formats: { onPostStart: ':time :start :level :message' },
      tokens: { start: () => '[start]' },
      indent: 0,
    },
  },
];
