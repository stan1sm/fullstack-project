import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeComponent from './HomeComponent.vue'

describe('HomeComponent', () => {
    it('renders the main heading', () => {
        const wrapper = mount(HomeComponent)
        const heading = wrapper.find('h1')

        // Check if the h1 element exists
        expect(heading.exists()).toBe(true)

        // Check if the h1 element contains the correct text
        expect(heading.text()).toBe('Marketplace Items go here')
    })
}) 