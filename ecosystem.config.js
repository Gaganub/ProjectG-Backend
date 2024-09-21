module.exports = {
    apps: [
      {
        name: "backend",
        script: "build/index.js",
        instances: 2,
        autorestart: false,
        watch: false,
      },
    ],
  };