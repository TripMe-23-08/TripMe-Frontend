import { shallowMount } from '@vue/test-utils'
import ImageCard from '@/components/cards/ImageCard'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(ImageCard, {
      props: { msg }
    })

    expect(wrapper.text()).toMatch(msg)
  })
})
