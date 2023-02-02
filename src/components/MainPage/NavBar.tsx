import { AppBar, Box, Toolbar, Typography, Button,IconButton, Badge } from '@mui/material'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
//HELPERS
import { useState, useEffect } from 'react';
import { useUser } from "../../UserContext"
//COMPONENTS
import InvitesList from '../User/Invites';
import Account from '../User/Account';
//types
import { InviteEnum } from '../../types/types';
import { Link } from 'react-router-dom';
import { urlOfHealthCheck } from '../../apiRoutes';
import { useUpdateSnackbar } from '../../SnackBarContext';

const Navbar = ({setShowModal, showModal}: {setShowModal: Function, showModal: boolean}): JSX.Element => {
    const [showInvitesList, setShowInvitesList] = useState(false)
    const [inviteTypeList, setInviteTypeList] = useState<InviteEnum>('friend' as InviteEnum)
    const [anchorForInviteList, setAnchorForInviteList] = useState<Element>()
    const user = useUser()
    const updateSnackbar = useUpdateSnackbar()
    let controller = new AbortController()

    const invitesNotSeen = (): number => {

        if(user.userInvites === undefined)return 0

        let newInvites: number = 0
        for(let i=0; i<user.userInvites?.length; i++){
            if(user.userInvites[i].seen_by_user_invited===false) newInvites++
        }

        return newInvites
    }

    const friendInvitesNotSeen = (): number => {

        if(user.userFriendInvites === undefined)return 0

        let newInvites: number = 0
        for(let i=0; i<user.userFriendInvites?.length; i++){
            if(user.userFriendInvites[i].seen_by_user_invited===false) newInvites++
        }

        return newInvites
    }

    const setMenuDetails = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, inviteType: InviteEnum) => {
        setShowInvitesList(!showInvitesList)
        setInviteTypeList(inviteType)
        setAnchorForInviteList(e.currentTarget)
    }

    useEffect(() => {
        const { signal } = controller
        fetch(urlOfHealthCheck,{
            method: "GET",
            signal,
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token") || ""
            }})
            .then(response => {
                if (!response.ok) {
                    updateSnackbar.addSnackBar({severity: "error", snackbarText: "Server is currently unavailable, server works only 21 first days of month(free plan) or is down for some other reason."})
                }
            })
            .catch(error=>{
                updateSnackbar.addSnackBar({severity: "error", snackbarText: "Server is currently unavailable, server works only 21 first days of month(free plan) or is down for some other reason."})
                console.log(error)
            })
        
        return () => {
            controller.abort()
        }    
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);

    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography  variant="h6" component={Link} replace to={`/`} sx={{ flexGrow: 1, textDecoration: 'none', color: "white" }}>
                                Oliphant
                        </Typography>
                            { !user.logged ?<Button onClick={() => setShowModal(!showModal)} color="inherit">Login</Button>:
                                (   
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
                                        <div style={{transform: "scale(0.85)"}}>
                                            <Account></Account>
                                        </div>
                                        <IconButton onClick={(e) => setMenuDetails(e, "friend" as InviteEnum)}>
                                            <Badge color="secondary" badgeContent={friendInvitesNotSeen()}>
                                                <PersonAddIcon ></PersonAddIcon> 
                                            </Badge>
                                        </IconButton>
                                        <IconButton  onClick={(e) => setMenuDetails(e, "channel" as InviteEnum)}>
                                            <Badge color="secondary" badgeContent={invitesNotSeen()}>
                                                <InsertInvitationIcon ></InsertInvitationIcon> 
                                            </Badge>
                                        </IconButton>    
                                        <InvitesList inviteType={inviteTypeList} isOpen={showInvitesList} setShowList={setShowInvitesList} anchorEl={anchorForInviteList} ></InvitesList>
                                    </Box>
                                )
                            }
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar;