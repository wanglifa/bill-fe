import { computed, defineComponent, PropType } from "vue";
import { EmojiSelect } from "./EmojiSelect";
import s from './Form.module.scss';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  }
})
export const FormItem = defineComponent({
  props: {
    label: {
      type: String as PropType<string>,
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date'>,
    },
    error: {
      type: String as PropType<string>,
    }
  },
  setup: (props, context) => {
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input 
            value={props.modelValue}
            onInput={(e: any) => {context.emit('update:modelValue', e.target.value)}}
          />
        case 'emojiSelect':
          return <EmojiSelect 
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={(value: string) => {context.emit('update:modelValue', value)}}
            class={[s.formItem, s.emojiList, s.error]}
          />
        case 'date':
          return <input />
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => (
      <div class={s.formRow}>
        <label class={s.formLabel}>
          {
            props.label && (
              <span class={s.formItem_name}>{props.label}</span>
            )
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          {
            props.error && (
              <div class={s.formItem_errorHint}>
                <span>{props.error}</span>
              </div>
            )
          }
        </label>
      </div>
    )
  }
})