const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      },
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules: false
          }
        ]
      ],
      useBuiltIns: "usage"
    }
  ]
];

module.exports = { presets };
