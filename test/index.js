export default {
  name: '高尔夫场景_2_火箭可以让击打地更远',
  init,
  inventory: [
    {
      id: '@golf/Polygon@~2.1.0',
      settings: {
        type: 'normal',
        density: 1,
      },
      name: '方块',
      toolsOptions: {
        move: true,
        rotate: true
      },
    },
    {
      id: '@golf/Circle@^1.0.0',
      settings: {
        radius: 1,
        type: 'normal',
        density: 1,
      },
      name: '圆球',
      toolsOptions: {
        move: true,
        rotate: true
      },
    },
    {
      id: "@power/Rocket@^1.0.0",
      settings: {
        force: {
          x: 0,
          y: 20,
        },
        scale: {
          x: 0.8,
          y: 0.8,
        },
        duration: 1
      },
      toolsOptions: {
        move: true,
        rotate: true,
        editSettings: true,
        delete: true,
      },
      name: '火箭推进器',
    }
  ]
}

async function init(runtime) {

  // 场景的风格化
  // const sceneStyle = 'sketch'
  const sceneStyle = 'normal'

  // 设置场景大小
  const width = 44
  const height = 22
  this.director.getCameraAll().forEach(it => {
    it.setSize(width, height)
    this.director.autoFill(it)
  })

  const offset = {
    x: 10,
    y: 0,
  }

  // 加载模型
  const [
    Polygon, empty, Machine, GolfBall, GolfTee, WorldBox, Flag
  ] = await this.director.loadModelList([
    'http://localhost:8080/public/test/entities/golf/Polygon/v1.0.0',
    this.resolveRelativeUrl('./Empty'),
    '@golf/Machine',
    '@golf/GolfBall@1.0.0',
    '@golf/GolfTee@1.0.0',
    'WorldBox@^1.0.0',
    'Flag@1.0.0'
  ])


  {
    const et = await this.director.createEntity(WorldBox, {
      width,
      height,
      visible: true
    })

    this.addChild(et)
  }

  // 地面
  {
    const g1 = await this.director.createEntity(Polygon, {
      fill: 0xD19826,
      type: sceneStyle,
      openSlot: false,
      move: false,
      rotate: false,
      vertices: [
        [-4, -0.1],
        [-4, 0.1],
        [4, 0.1],
        [4, -0.1]
      ]
    })

    g1.getComponent('BodyComponent').setData('bodyType', 'static')
    g1.getComponent('TransformComponent').setData('position', {
      x: -7 + offset.x,
      y: -5 + offset.y
    })
    g1.name = '左地面'
    this.addChild(g1)


    const g2 = await this.director.createEntity(Polygon, {
      fill: 0xD19826,
      type: sceneStyle,
      openSlot: false,
      move: false,
      rotate: false,
      vertices: [
        [-4, -0.1],
        [-4, 0.1],
        [4, 0.1],
        [4, -0.1]
      ]
    })
    g2.getComponent('BodyComponent').setData('bodyType', 'static')
    g2.getComponent('TransformComponent').setData('position', {
      x: 23 + offset.x,
      y: -5 + offset.y
    })
    g2.name = '右地面'
    this.addChild(g2)
  }


  // 高尔夫球托
  {
    const plate = await this.director.createEntity(GolfTee, {
      type: sceneStyle,
      thickness: 2,
      fill: 0xD19826,
      isStatic: false,
    })
    plate.getComponent('TransformComponent').setData('position', {
      x: -4 + offset.x,
      y: -5 + 0.12 + offset.y
    })
    plate.name = '高尔夫球托'
    this.addChild(plate)
  }


  // 高尔夫球
  {
    const golfBall = await this.director.createEntity(GolfBall, {
      radius: 0.4,
      density: 1,
      type: sceneStyle,
      openSlot: false,
      thickness: 6,
      fillAlpha: 0.5,
    })
    golfBall.getComponent('TransformComponent').setData('position', {
      x: -4 + offset.x,
      y: -5 + 0.21 + 0.8 + 0.4 + offset.y
    })
    golfBall.tags.add('player')
    golfBall.name = '高尔夫球'
    this.addChild(golfBall)
  }

  {
    // Flag
    const et = await this.director.createEntity(Flag)

    et.getComponent('TransformComponent')
      .setData('position', {
        x: 8 + 16 + offset.x,
        y: -5 + 0.15 + offset.y
      })

    et.name = 'flag'
    this.addChild(et)
  }


  // 击打装置
  {
    const m1 = await this.director.createEntity(Machine, {
      type: sceneStyle
    })
    m1.getComponent('TransformComponent').setData('position', {
      x: -6 + offset.x,
      y: 3.8 + offset.y
    })
    m1.name = '击打转轴'
    this.addChild(m1)
  }
}

