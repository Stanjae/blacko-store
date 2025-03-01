'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowRight} from '@mui/icons-material';
import { categoryMenu } from '@/utils/CategoryList';
import { IconButton, Paper } from '@mui/material';
import Link from 'next/link';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 278,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.info.light, 0.05),
    borderColor: alpha(theme.palette.info.light, 0.05),
    color:theme.palette.secondary.main,
    display:'flex',
    justifyContent:'space-between',
    '&:hover': {
      backgroundColor: alpha(theme.palette.info.main, 0.10),
      borderColor: alpha(theme.palette.info.light, 0.05),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '278px',
    },
  }));


const ChildMenuBar = ({categoryList, setCates}:{setCates:React.Dispatch<React.SetStateAction<{
  title: string;
  value: string;
}[] | null | undefined>>; categoryList:{title:string; value:string}[] | undefined | null})=>{

  return (
    <Paper onMouseLeave={()=> setCates(null)} elevation={0} component={'div'} className=' absolute top-10 left-[310px] z-[9999]'>
        {categoryList?.map((item, index) => (
          <Link style={{textDecoration:'none', color:'inherit'}}  key={index} href={`store?category=${item.value}`}>
            <MenuItem disableRipple>
            {item.title}
          
        </MenuItem>
        </Link>
        ))}
      </Paper>
  )
} 

export default function ItemsMenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [cates, setCates] = React.useState<{title: string; value: string}[] | null>()

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCates(null);
  };

  const handleShowChild = (lol:React.MouseEvent<HTMLLIElement, MouseEvent>, e:string)=>{
    lol.stopPropagation()
    const category = categoryMenu.find(c => c.title === e);
    if(category){
      setCates(category.categories)
    }
  }

  return (
    <div className=' relative'>
      <CustomButton
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        size='small'
        disableElevation
        onClick={handleClick}
        endIcon={anchorEl ? <KeyboardArrowDownIcon /> : <KeyboardArrowRight/>}
      >
        Categories
      </CustomButton>
      <StyledMenu 
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose} className=''
      >
        {categoryMenu.map((item, index) => (
          <MenuItem  onMouseOver={(e)=> handleShowChild(e, item.title)} key={index} onClick={handleClose} disableRipple>
          {item.icon}
          {item.title}
          <IconButton  className=' bg-transparent ml-auto'>{cates ? <KeyboardArrowRight/>: <KeyboardArrowDownIcon/>}</IconButton>
        </MenuItem>
        ))}
      </StyledMenu>
      {cates && <ChildMenuBar setCates={setCates} categoryList={cates}/>}
    </div>
  );
}
