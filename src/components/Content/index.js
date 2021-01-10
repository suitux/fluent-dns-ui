import { withStyles } from '@material-ui/styles'
import styles from './styles'
import { DnsEntriesTable } from '../DnsEntriesTable'
import Typography from '@material-ui/core/Typography'

const ContentComponent = ({ classes }) => {
    return (
        <div className={classes.contentContainer}>
            <div className={classes.titleContainer}>
                <Typography variant={'h2'}>Fluent DNS</Typography>
            </div>
            <div className={classes.tableContainer}>
                <DnsEntriesTable />
            </div>
        </div>
    )
}

export const Content = withStyles(styles)(ContentComponent)
