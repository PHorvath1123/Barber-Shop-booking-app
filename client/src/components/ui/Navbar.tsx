import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {colorPalette as color} from '../../utils/colorPalette'

export default function Navbar(){

    //Under the breakpoint 'sm' set the drawer and the hamburger menu
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    //Drawer handlers
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
      };
    
      const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
      };
    
      const handleDrawerToggle = () => {
        if (!isClosing) {
          setMobileOpen(!mobileOpen);
        }
      };

    const menuItems = (
        <div>
            <List>
                {['Home', 'Appointment', 'Pricing'].map(menuItem => { 
                    return(
                        <ListItem key={menuItem}>
                            <ListItemButton>
                                <Link 
                                    to={`/${menuItem == 'Home' ? '' : menuItem}`} 
                                    onClick={handleDrawerClose}
                                    className= {menuItem == 'Appointment' ? "hover:text-[#c9371d] text-action" : 'hover:text-action'}>
                                        {menuItem}
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    )
                })}

                {['Services', 'Barbers', 'Contact'].map(menuItem => { 
                    return(
                        <ListItem key={menuItem}>
                            <ListItemButton>
                                <HashLink 
                                    to={`/#${menuItem}`} 
                                    onClick={handleDrawerClose}
                                    className="hover:text-action">
                                        {menuItem}
                                </HashLink>
                            </ListItemButton>
                        </ListItem>
                    )
                })};
            </List>
        </div>
    );

    return(
        <header>
            <nav className="flex justify-end gap-4 font-text uppercase text-sm pt-5 mb-[5rem]">
                {isMobile 
                    ?  <IconButton 
                            onClick={handleDrawerToggle} 
                            sx={{color: color.light,':hover': {color: color.action}}}>
                            <MenuIcon/>
                        </IconButton>
                    :   <div className="flex gap-4 pr-[1rem] pt-[1rem] md:pr-[5rem] md:gap-8 md:font-bold">
                            {['Home', 'Appointment', 'Pricing'].map(menuItem =>{
                                return(
                                    <Link 
                                        key={menuItem} 
                                        to={`/${menuItem == 'Home' ? '' : menuItem}`} 
                                        onClick={handleDrawerClose} 
                                        className= {menuItem == 'Appointment' ? "hover:text-[#c9371d] text-action" : 'hover:text-action'}>
                                            {menuItem}
                                    </Link>
                                )
                            })}
                            {['Services', 'Barbers', 'Contact'].map(menuItem =>{
                                return(
                                    <HashLink 
                                        to={`/#${menuItem}`} 
                                        key={menuItem} 
                                        onClick={handleDrawerClose} 
                                        className=  'hover:text-action'>
                                            {menuItem}
                                    </HashLink>
                                )
                            })}
                        </div>
                }
                <Drawer 
                    anchor="right"
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{keepMounted: true}}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: '45vw',
                            backgroundColor: color.light,
                            textTransform:'uppercase'
                        }
                      }}>
                        {menuItems}
                </Drawer>
            </nav>
        </header>
    );
};