import { createMuiTheme } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'

export default {
    dark: createMuiTheme({
        palette: {
            primary: blue,
            secondary: indigo,
            background: {
                default: '#eeeeee'
            }
        },
    })
}
