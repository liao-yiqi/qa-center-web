<script lang="ts">
import { computed, createVNode, defineComponent, resolveComponent } from 'vue'
import svg from './useSvg.vue'
type Props = {
  iconClass: string
  className?: string
  color?: string
  size?: StrNum
}
export default defineComponent(
  (props: Props) => {
    const { iconClass, className, color, size = 14 } = props
    const iconStyle = computed(() => {
      return {
        fontSize: size + 'px',
        color: color,
      }
    })
    if (props.iconClass.indexOf('el-icon-') === 0) {
      const names = iconClass.split('el-icon-')
      return () =>
        createVNode(
          'el-icon',
          { class: 'icon el-icon', style: iconStyle.value },
          [createVNode(resolveComponent(names[1]))]
        )
    } else {
      return () =>
        createVNode(svg, {
          iconClass: iconClass,
          size: size,
          color: color,
          className: className,
        })
    }
  },
  {
    props: ['className', 'color', 'iconClass', 'size'],
  }
)
</script>
