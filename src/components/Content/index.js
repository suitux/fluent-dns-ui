import { withStyles } from '@material-ui/styles'
import styles from './styles'

const ContentComponent = ({ classes }) => {
    return (
        <div className={classes.contentContainer}>
            <div className={classes.tableContainer}>

            </div>
        </div>
    )
}

export const Content = withStyles(styles)(ContentComponent)
