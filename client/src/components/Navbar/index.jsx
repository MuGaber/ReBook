import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import './style.scss'

import Favicon from '../../assets/favicon.ico'
import { UserContext } from '../../providers/user'
import { Menu, Segment, Button, Dropdown, Image } from 'semantic-ui-react'

//

const Navbar = ({ history, location }) => {
  const { userData, logoutUser } = useContext(UserContext)
  const [activeItem, setActiveItem] = useState(location.pathname.slice(1))

  const handleMenuItemClick = (e, { name }) => {
    setActiveItem(name)
    history.push(`/${name}`)
  }

  return (
    <Segment inverted className='nav-bar__segment'>
      <Menu inverted secondary>
        <Menu.Item className='rebook-name'>
          <img src={Favicon} alt='favicon' />
          ReBook
        </Menu.Item>

        <Menu.Item name='' active={activeItem === ''} onClick={handleMenuItemClick}>
          Home
        </Menu.Item>

        <Menu.Item
          name='search'
          active={activeItem === 'search'}
          onClick={handleMenuItemClick}
        />

        {userData.isAuthenticated && userData.user && (
          <Menu.Item
            name='library'
            active={activeItem === 'library'}
            onClick={handleMenuItemClick}
          />
        )}

        <Menu.Menu position='right'>
          <Menu.Item>
            {userData.isAuthenticated && userData.user ? (
              <Dropdown
                pointing='top left'
                trigger={
                  <>
                    <Image
                      avatar
                      src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                    />
                    {userData.user.username}
                  </>
                }
                options={[
                  {
                    key: 'sign-out',
                    text: 'Sign Out',
                    icon: 'sign out',
                    onClick: () => logoutUser()
                  }
                ]}
              />
            ) : (
              <>
                <Button
                  as='a'
                  className='nav-button log-in'
                  color='green'
                  inverted
                  onClick={() => history.push('/login')}
                >
                  Log In
                </Button>

                <Button
                  as='a'
                  inverted
                  className='nav-button sign-up'
                  onClick={() => history.push('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default withRouter(Navbar)
