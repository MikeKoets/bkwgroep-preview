export const images = {
  craft: {
    variants: [
      {
        src: 'craft-480.webp',
        width: 480,
        height: 387,
      },
      {
        src: 'craft-800.webp',
        width: 800,
        height: 645,
      },
      {
        src: 'craft-1200.webp',
        width: 1200,
        height: 968,
      },
      {
        src: 'craft-1570.webp',
        width: 1570,
        height: 1266,
      },
    ],
  },
  maintenance: {
    variants: [
      {
        src: 'maintenance-480.webp',
        width: 480,
        height: 388,
      },
      {
        src: 'maintenance-800.webp',
        width: 800,
        height: 646,
      },
      {
        src: 'maintenance-1176.webp',
        width: 1176,
        height: 950,
      },
    ],
  },
  locks: {
    variants: [
      {
        src: 'locks-480.webp',
        width: 480,
        height: 382,
      },
      {
        src: 'locks-800.webp',
        width: 800,
        height: 636,
      },
      {
        src: 'locks-1200.webp',
        width: 1200,
        height: 955,
      },
      {
        src: 'locks-1599.webp',
        width: 1599,
        height: 1272,
      },
    ],
  },
  insulation: {
    variants: [
      {
        src: 'insulation-480.webp',
        width: 480,
        height: 395,
      },
      {
        src: 'insulation-800.webp',
        width: 800,
        height: 659,
      },
      {
        src: 'insulation-1160.webp',
        width: 1160,
        height: 955,
      },
    ],
  },
  property: {
    variants: [
      {
        src: 'property-480.webp',
        width: 480,
        height: 395,
      },
      {
        src: 'property-800.webp',
        width: 800,
        height: 658,
      },
      {
        src: 'property-1200.webp',
        width: 1200,
        height: 986,
      },
      {
        src: 'property-1540.webp',
        width: 1540,
        height: 1266,
      },
    ],
  },
  workshop: {
    variants: [
      {
        src: 'workshop-480.webp',
        width: 480,
        height: 355,
      },
      {
        src: 'workshop-800.webp',
        width: 800,
        height: 592,
      },
      {
        src: 'workshop-1200.webp',
        width: 1200,
        height: 888,
      },
      {
        src: 'workshop-1600.webp',
        width: 1600,
        height: 1185,
      },
    ],
  },
  team: {
    variants: [
      {
        src: 'team-480.webp',
        width: 480,
        height: 360,
      },
      {
        src: 'team-800.webp',
        width: 800,
        height: 600,
      },
      {
        src: 'team-1200.webp',
        width: 1200,
        height: 900,
      },
      {
        src: 'team-1600.webp',
        width: 1600,
        height: 1200,
      },
    ],
  },
  fleet: {
    variants: [
      {
        src: 'fleet-480.webp',
        width: 480,
        height: 366,
      },
      {
        src: 'fleet-800.webp',
        width: 800,
        height: 610,
      },
      {
        src: 'fleet-1200.webp',
        width: 1200,
        height: 915,
      },
      {
        src: 'fleet-1600.webp',
        width: 1600,
        height: 1220,
      },
    ],
  },
  detail: {
    variants: [
      {
        src: 'detail-480.webp',
        width: 480,
        height: 382,
      },
      {
        src: 'detail-800.webp',
        width: 800,
        height: 636,
      },
      {
        src: 'detail-1200.webp',
        width: 1200,
        height: 954,
      },
    ],
  },
} as const

export type ImageName = keyof typeof images
