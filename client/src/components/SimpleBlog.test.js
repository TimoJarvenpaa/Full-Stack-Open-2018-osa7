import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Timo Järvenpää',
      likes: 1
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = simpleBlogComponent.find('.content')
    const likesDiv = simpleBlogComponent.find('.likes')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking the button twice calls event handler twice', () => {

    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Timo Järvenpää',
      likes: 2
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})