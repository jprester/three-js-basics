export const configOptions = {
  environmentType: "development",
  sceneEnvironment: "night",
  night: {
    name: "night",
    sky: "sky_night",
    environmentMap: "env_night",
    cityLights: true,
    windowLights: true,
    spotLights: true,
    fog: {
      color: 0x12122a,
      start: 0,
      end: 80,
    },
    sun: {
      color: 0x8b79ff,
      intensity: 0.1,
      x: 1,
      y: 0.5,
      z: 0.25,
    },
    ambient: {
      color: 0x1b2c80,
      intensity: 0.5,
    },
  },
  day: {
    name: "day",
    sky: "sky_day",
    environmentMap: "env_day",
    cityLights: false,
    windowLights: false,
    spotLights: false,
    fog: {
      color: 0xaf6a3b,
      start: -500,
      end: 2700,
    },
    sun: {
      color: 0xffa25e,
      intensity: 2,
      x: 1,
      y: 0.2,
      z: 0.65,
    },
    ambient: {
      color: 0x825233,
      intensity: 0.65,
    },
  },
};
