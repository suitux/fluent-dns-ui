import { withStyles } from '@material-ui/styles'
import styles from './styles'
import { DnsEntriesTable } from '../DnsEntriesTable'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import DnsProvider from '../../context/dns/DnsContext'

const ContentComponent = ({ classes }) => {

    return (
        <div className={classes.contentContainer}>
            <div className={classes.titleContainer}>
                <Typography variant={'h2'}>Fluent DNS</Typography>
            </div>
            <div className={classes.tableContainer}>
                <DnsProvider>
                    <DnsEntriesTable />
                </DnsProvider>
            </div>
        </div>
    )
}

export const Content = withStyles(styles)(ContentComponent)
