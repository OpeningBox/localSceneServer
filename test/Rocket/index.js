export default {
  name: '火箭喷射器',
  init,
  isGroup: false,
}

async function init(runtime, settings = {}) {
  this.settings = {
    force: {
      x: 0,
      y: 0.1,
    },
    scale: {
      x: 1,
      y: 1,
    },
    density: 1,
    stoppable: false,
    duration: 4,
    ...settings,
  };

  const { force, scale, density, duration } = this.settings

  this.getComponent("TransformComponent")
    .setData('scale', scale)

  this.addComponent('RenderComponent', {
    renders: {
      main: {
        type: 'animation',
        textureUrl: this.resolveRelativeUrl('./propellerAnimation.json'),
        speed: 0.2,
        zIndex: 0,
        transform: {
          scale: {
            x: 0.5,
            y: 0.5,
          },
          rotation: Math.PI / 2,
        },
        isVisible: true,
      },
    },
  })

  this.getComponent('BodyComponent')
    .setData('angularDamping', 1)

  const width = 0.5
  const height = 0.6

  this.addComponent('ColliderComponent', {
    shapes: {
      main: {
        type: 'polygon',
        vertices: [
          [-width / 2, -height / 2],
          [width / 2, -height / 2],
          [width / 2, height / 2],
          [-width / 2, height / 2],
        ],
        texture: {
          density,
          friction: 1,
        }
      }
    },
  });

  this.addComponent('SlotComponent', {
    slots: {
      center: {
        position: { x: 0, y: 0 }
      }
    }
  })

  this.addComponent('TaskComponent', {
    ratio: duration * 60,
    once: true,
    handler: function () {
      this.getComponent('ForceComponent').setData('force', { x: 0, y: 0 })
      this.getComponent('RenderComponent').setData('renders.main.speed', 0)
    }
  }).name = 'stopTask'

  this.addComponent('ForceComponent', {
    position: {
      x: 0,
      y: 0
    },
    force,
    isLocal: true,
  })

  this.getComponent('BodyComponent').setData('bullet', true)

  this.addComponent('EditorComponent', {
    template: `
/*
火箭是通过喷出气体来获得推进力。
*/
{
  // 火箭的推力大小（0 到 1000N）
  power: ${this.settings.force.y},

  // 火箭推力的持续时间（s）
  time:${this.settings.duration}
}`,
  });
  this.applySettings = function () {
    const {
      force, scale, time, power
    } = this.settings;
    if (typeof power === 'number' && power <= 1000 && power >= 0) {
      this.settings.force.y = power

      this.settings.duration = time

      this.getComponent('TransformComponent').setData('scale', scale)

      this.getComponent('ForceComponent').setData('force', force)

      this.removeComponent(this.getComponentByName('stopTask'))

      if (typeof time === 'number' && time >= 0) {
        this.addComponent('TaskComponent', {
          ratio: time * 60,
          once: true,
          handler: function () {
            this.getComponent('ForceComponent').setData('force', { x: 0, y: 0 })
            this.getComponent('RenderComponent').setData('renders.main.speed', 0)
          }
        }).name = 'stopTask'
      }
    } else {
      return 'power（推力）需要在0 到 1000之间'
    }
  }

  // this.applySettings()

}