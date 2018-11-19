import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.skip('<Blog />', () => {

  const user = {
    id: '09876554321',
    name: 'testUser',
    username: 'test'
  }

  const blog = {
    id: 'abc1234567890',
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Timo Järvenpää',
    likes: 1,
    url: 'https://www.google.fi/',
    user: user
  }


  const mockHandler = jest.fn()

  let blogComponent

  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        updateBlogs={mockHandler}
        removeFromBlogs={mockHandler}
      />
    )
  })

  it('Only renders title and author by default', () => {

    const nameDiv = blogComponent.find('.defaultInfo')

    expect(nameDiv.text()).toContain(blog.title)
    expect(nameDiv.text()).toContain(blog.author)
    expect(nameDiv.text()).not.toContain(blog.likes)
    expect(nameDiv.text()).not.toContain(blog.url)
    expect(nameDiv.text()).not.toContain(blog.user.name)
  })

  it('After clicking the name, full details are displayed', () => {

    const nameDiv = blogComponent.find('.defaultInfo')
    nameDiv.simulate('click', { target: { tagName: 'DIV' } })

    const fullInfoDiv = blogComponent.find('.fullInfo')

    expect(fullInfoDiv.text()).toContain(blog.title)
    expect(fullInfoDiv.text()).toContain(blog.author)
    expect(fullInfoDiv.text()).toContain(blog.likes)
    expect(fullInfoDiv.text()).toContain(blog.url)
    expect(fullInfoDiv.text()).toContain(blog.user.name)
  })
})