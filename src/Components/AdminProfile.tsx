import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

interface ActivityLog {
    id: number;
    action: string;
    timestamp: Date;
    // Add more properties as needed
}

export const AdminProfile: React.FC = () => {
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    useEffect(() => {
        const fetchActivityLogs = async () => {
            try {
                const response = await axios.get('/api/activity-logs');
                setActivityLogs(response.data);
            } catch (error) {
                console.error('Error fetching activity logs:', error);
            }
        };

        fetchActivityLogs();
    }, []);

    const adminData = {
        name: 'Admin Name',
        profilePicture: 'url_of_profile_picture.jpg',
        email: 'email',
        role: 'Admin',
        phoneNumber: 'phone_number',
        address: 'address'
    };
    return (
        <div>
            <div style={{ width: '100%', }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={adminData.name} src={adminData.profilePicture} style={{ width: '100px', height: '100px', margin: '10px' }} />
                    <div style={{ flexBasis: 'row', justifyContent: 'center', }}>
                        <Typography variant="h5" color="textPrimary" align='center'>
                            {adminData.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {adminData.role}
                        </Typography>
                    </div>
                </div>
            </div>
            <Divider style={{ margin: '0 16px' }} />
            {/* <div style={{ display: 'flex', flexDirection: 'row', }}>
                <div style={{ display: 'flex', flexDirection: 'column', }}>
                    <Typography variant="h6" color="textPrimary">
                        Contact Information
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                        <strong>Email:</strong> {adminData.email}
                    </Typography>
                    {adminData.phoneNumber && (
                        <Typography variant="body1" color="textPrimary">
                            <strong>Phone Number:</strong> {adminData.phoneNumber}
                        </Typography>
                    )}
                    {adminData.address && (
                        <Typography variant="body1" color="textPrimary">
                            <strong>Address:</strong> {adminData.address}
                        </Typography>
                    )}

                </div>
                <Divider style={{ margin: '160px 16px' }} />
                <div >
                    <Typography variant="h6" color="textPrimary">Recent Activity Logs</Typography>
                    <List>
                        {(activityLogs || []).map((log) => (
                            <ListItem key={log.id}>
                                <ListItemText
                                    primary={log.action}
                                    secondary={log.timestamp.toLocaleString()}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div> */}

        </div>


    );
};

export default AdminProfile;