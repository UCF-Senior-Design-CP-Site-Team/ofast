import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const activeLink = {
	display: "inline-block",
	margin: 2,
	fontWeight: 700, 
	letterSpacing: .8, 
	textDecoration: "none",
  color: "#dafffb",
	borderBottom: "3px solid #dafffb",
	// backgroundColor: "#dafffb",
	// backgroundImage: "radial-gradient(circle, #dafffb 70%, #04364a)",
	// backgroundClip: 'text',
  // WebkitBackgroundClip: 'text',
  // textFillColor: 'transparent',
}
const linkStyle = {
	display: "inline-block",
	margin: 2,
	fontWeight: 700, 
	letterSpacing: .8, 
	textDecoration: "none",
  color: "#dafffb",
}
interface LoggedUserProps {
	name: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LoggedInUser({name}: LoggedUserProps) {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<Box sx={{ flexGrow: 0, pl: 3}}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt={name} src="/static/images/avatar/2.jpg" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map((setting) => (
					<MenuItem key={setting} onClick={handleCloseUserMenu}>
						<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	)
}

function LogoTitle() {
	return (
		<Typography
			variant="h5"
			noWrap
			sx={{
				mr: 2,
				display: { xs: 'flex', md: 'flex' },
				flexGrow: 1,
				fontFamily: [
					'Kaushan Script', 
					'cursive'
				].join(','),
				fontWeight: 700,
				letterSpacing: '.2rem',
				color: '#dafffb',
				textDecoration: 'none',
			}}
		>
			<Link to="/" style={{color: "#dafffb", textDecoration: "none"}}>O(fast)</Link>
		</Typography>
	)
}

interface pagesProps {
	pages: string[]
}

function NavItems({pages}: pagesProps) {
	const location = useLocation();
	// const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	// {/* <Link style={ { ...location.pathname === `/${page}` ? activeLink : linkStyle} } to={`/${page}`}> */}
	// {page}
	// {/* </Link> */}
	// {/* <Link style={ { ...linkStyle} } to={`/${page}`}>{page}</Link> */}	
	return (
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end"}}>
			{pages.map((page) => (
				<Button
					component={Link}
					to={`/${page}`}
					key={page}
					onClick={handleCloseNavMenu}
					sx={{ ...location.pathname === `/${page}` ? activeLink : linkStyle }}
				>
					{page}
				</Button>
			))}
		</Box>
	)
}

function ResponsiveMenu({pages}: pagesProps) {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	return (
		<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleOpenNavMenu}
				color="inherit"
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorElNav}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
				sx={{
					display: { xs: 'block', md: 'none' },
				}}
			>
				{pages.map((page) => (
					<MenuItem key={page} onClick={handleCloseNavMenu}>
						<Typography textAlign="center">
							<Link style={ {textTransform: "capitalize", textDecoration: "none", color: "black"} } to={`/${page}`}>{page}</Link>
						</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	)
}

function GetStarted() {
	return (
		<Box sx={{ display: { xs: 'none', md: 'flex'}, justifyContent: "flex-end", pl: 3}}>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        sx={{
          backgroundColor: '#dafffb',
          color: '#04364a',
          borderRadius: 50,
					fontWeight: 700, 
          letterSpacing: .2,
					'&:hover': {
            backgroundColor: '#04364a',
            color: '#dafffb',
						border: '2px solid #dafffb'
          },
        }}
      >
        Get Started
      </Button>
    </Box>
	)
}

const before_pages = ['home', 'about', 'learn', 'solve'];
// const after_pages = ['home', 'about', 'learn', 'solve', 'submit'];
const settings = ['Profile', 'Groups', 'Logout'];

function NavBar() {

  return (
		<React.Fragment>
			<AppBar position="fixed">
				<Container maxWidth="xl">
					<Toolbar disableGutters >
						<ResponsiveMenu pages={before_pages}/>					
						<LogoTitle />
						<NavItems pages={before_pages}/>
						{/* <LoggedInUser name="Avatar" /> */}
						<GetStarted />
					</Toolbar>
				</Container>
			</AppBar>
			<Toolbar />
		</React.Fragment>
  );
}
export default NavBar;